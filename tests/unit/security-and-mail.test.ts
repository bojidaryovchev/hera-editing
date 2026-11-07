import { mkdtempSync, readFileSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import type { Lead } from "../../src/db/schema";
import { buildLeadAlert, escapeHtml, formatSofiaDateTime } from "../../src/lib/leads/email";
import { errorCode, sanitizeLogFields } from "../../src/lib/log";
import { createDevMailer } from "../../src/lib/mail/dev";
import { createResendMailer } from "../../src/lib/mail/resend";
import { MailDeliveryError } from "../../src/lib/mail/types";
import {
  BodyTooLargeError,
  clientAddress,
  isAllowedOrigin,
  rateLimitSubject,
  readBodyWithLimit,
} from "../../src/lib/security/request";

describe("client address and rate-limit subject", () => {
  const headers = new Headers({ "x-forwarded-for": "198.51.100.1, 10.0.0.1", "x-real-ip": "198.51.100.2" });

  it("ignores proxy headers unless they are trusted", () => {
    expect(clientAddress(headers, false)).toBeNull();
    expect(clientAddress(headers, true)).toBe("198.51.100.2");
    expect(clientAddress(new Headers({ "x-forwarded-for": "198.51.100.1, 10.0.0.1" }), true)).toBe("198.51.100.1");
  });

  it("hashes the address with a salt and rotates daily; the raw address never appears", () => {
    const day1 = new Date("2026-11-07T10:00:00Z");
    const day2 = new Date("2026-11-08T10:00:00Z");
    const a = rateLimitSubject("198.51.100.2", "salt-one", day1);
    expect(a).toMatch(/^[0-9a-f]{32}$/);
    expect(a).not.toContain("198");
    expect(rateLimitSubject("198.51.100.2", "salt-one", day1)).toBe(a);
    expect(rateLimitSubject("198.51.100.2", "salt-one", day2)).not.toBe(a);
    expect(rateLimitSubject("198.51.100.2", "salt-two", day1)).not.toBe(a);
    expect(rateLimitSubject(null, "salt-one", day1)).toBe("shared");
  });
});

describe("origin policy", () => {
  it("allows same-site and origin-less requests, refuses others", () => {
    const site = "https://agency.example";
    expect(isAllowedOrigin(null, site, "https://agency.example/api/leads")).toBe(true);
    expect(isAllowedOrigin("https://agency.example", site, "https://agency.example/api/leads")).toBe(true);
    expect(isAllowedOrigin("https://preview.vercel.app", site, "https://preview.vercel.app/api/leads")).toBe(true);
    expect(isAllowedOrigin("https://evil.example", site, "https://agency.example/api/leads")).toBe(false);
    expect(isAllowedOrigin("null", site, "https://agency.example/api/leads")).toBe(false);
  });
});

describe("body size limit", () => {
  const req = (body: string, headers: Record<string, string> = {}) =>
    new Request("http://x/api", { method: "POST", body, headers });

  it("reads small bodies and refuses large ones, by header or by stream", async () => {
    expect(await readBodyWithLimit(req("{}"), 10)).toBe("{}");
    await expect(readBodyWithLimit(req("x".repeat(20), { "content-length": "20" }), 10)).rejects.toBeInstanceOf(
      BodyTooLargeError,
    );
    await expect(readBodyWithLimit(req("x".repeat(20)), 10)).rejects.toBeInstanceOf(BodyTooLargeError);
  });
});

describe("owner alert email", () => {
  const lead = {
    id: "8f9e1c2a-1111-4222-8333-944445555666",
    name: "Иван <script>alert(1)</script>",
    businessName: "Тест & Син",
    city: "Варна",
    email: "ivan@example.com",
    phone: null,
    profileUrl: "javascript-free.example",
    goal: "enquiries",
    volume: "12plus",
    message: "Ред 1\nРед 2 \"кавички\"",
    sourcePath: "/paketi",
    utmSource: "fb",
    utmMedium: null,
    utmCampaign: "nov",
    privacyNoticeVersion: "v1",
    createdAt: new Date("2026-11-07T15:42:00Z"),
  } as unknown as Lead;

  it("escapes every submitted value in the HTML part", () => {
    const alert = buildLeadAlert(lead, { brandName: null });
    expect(alert.html).not.toContain("<script>");
    expect(alert.html).toContain("Иван &lt;script&gt;alert(1)&lt;/script&gt;");
    expect(alert.html).toContain("Тест &amp; Син");
    expect(alert.html).toContain("&quot;кавички&quot;");
  });

  it("uses the form's own labels, Bulgarian formats and Sofia time", () => {
    const alert = buildLeadAlert(lead, { brandName: "Пример" });
    expect(alert.subject).toBe("Ново запитване: Тест & Син, Варна");
    expect(alert.text).toContain("Какво искате да постигнете?: Повече запитвания");
    expect(alert.text).toContain("Колко често искате ново съдържание?: 12+ на месец");
    expect(alert.text).toContain("Телефон: —");
    expect(alert.text).toContain("Получено: 07.11.2026, 17:42");
    expect(alert.text).toContain("Кампания (UTM): fb / nov");
  });

  it("formats dates as dd.mm.yyyy, HH:MM", () => {
    expect(formatSofiaDateTime(new Date("2026-07-01T21:05:00Z"))).toBe("02.07.2026, 00:05");
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe("&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;");
  });
});

describe("mail providers", () => {
  const message = {
    to: "owner@example.com",
    from: "site@example.com",
    subject: "s",
    text: "t",
    html: "<p>t</p>",
    replyTo: "lead@example.com",
    idempotencyKey: "lead-alert-1",
  };

  it("sends through Resend with an idempotency key and maps failures to codes", async () => {
    const fetchImpl = vi.fn(async () => new Response("{}", { status: 200 }));
    await createResendMailer({ apiKey: "re_x", fetchImpl }).send(message);
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect((init.headers as Record<string, string>)["Idempotency-Key"]).toBe("lead-alert-1");
    expect(JSON.parse(String(init.body))).toMatchObject({ to: ["owner@example.com"], reply_to: "lead@example.com" });

    const failing = createResendMailer({ apiKey: "re_x", fetchImpl: async () => new Response("no", { status: 503 }) });
    await expect(failing.send(message)).rejects.toMatchObject({ code: "mail_http_503" });
    const offline = createResendMailer({
      apiKey: "re_x",
      fetchImpl: async () => {
        throw new TypeError("fetch failed");
      },
    });
    await expect(offline.send(message)).rejects.toBeInstanceOf(MailDeliveryError);
  });

  it("dev transport writes one outbox file per send and hides content outside development", async () => {
    const dir = mkdtempSync(path.join(tmpdir(), "hera-dev-mail-"));
    const log = vi.spyOn(console, "info").mockImplementation(() => {});
    const mailer = createDevMailer({ outboxDir: dir, revealContent: false });
    await mailer.send(message);
    await mailer.send(message);
    const files = readdirSync(dir);
    expect(files).toHaveLength(2);
    expect(JSON.parse(readFileSync(path.join(dir, files[0]!), "utf8"))).toMatchObject({ subject: "s" });
    expect(String(log.mock.calls[0]?.[0])).not.toContain("owner@example.com");
    log.mockRestore();
  });
});

describe("logging", () => {
  it("drops every non-allow-listed field, so personal data cannot be logged by accident", () => {
    expect(
      sanitizeLogFields({ leadId: "1", email: "a@b.c", name: "Иван", body: "{}", code: "mail_timeout", attempts: 2 }),
    ).toEqual({ leadId: "1", code: "mail_timeout", attempts: 2 });
  });

  it("reduces errors to short codes", () => {
    expect(errorCode(Object.assign(new Error("connect ECONNREFUSED 10.0.0.1:5432"), { code: "ECONNREFUSED" }))).toBe(
      "ECONNREFUSED",
    );
    expect(errorCode("boom")).toBe("unknown");
  });
});
