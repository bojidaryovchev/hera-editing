import { eq, sql } from "drizzle-orm";
import { afterAll, beforeAll, beforeEach, describe, expect, inject, it } from "vitest";
import { leadAuditLog, leads, mailMessages, mailThreads } from "../../src/db/schema";
import { listLeads, setLeadStatus } from "../../src/lib/admin/leads";
import { createDb, type DbHandle } from "../../src/lib/db/client";
import { submitLead } from "../../src/lib/leads/service";
import { handleInboundEmail, type InboundConfig } from "../../src/lib/mailbox/inbound";
import { replyToLead, replyToThread, REPLY_ERRORS } from "../../src/lib/mailbox/reply";
import { countAwaitingAnswer, getThread, listThreads, setThreadStatus } from "../../src/lib/mailbox/store";
import { signWebhook } from "../../src/lib/mailbox/webhook";
import { createStubMailer, validLead } from "../helpers/fixtures";

/*
 * The contact@ mailbox against a real Postgres (decision L32): what gets recorded, where it is filed, what is
 * refused, and how answers thread. Resend's Received Emails API is a stub; the webhook signature is real.
 */

let handle: DbHandle;
const SECRET = `whsec_${Buffer.from("integration-webhook-secret-32byt").toString("base64")}`;
const CONFIG: InboundConfig = {
  webhookSecret: SECRET,
  apiKey: "re_test",
  domain: "hera.test",
  address: "contact@hera.test",
  brandName: "Hera Editing",
  forwardTo: null,
};
const REPLY = { address: "contact@hera.test", brandName: "Hera Editing", siteUrl: "https://hera.test" };

type Email = {
  id: string;
  from: string;
  to?: string[];
  subject: string;
  text?: string | null;
  html?: string | null;
  messageId?: string;
  inReplyTo?: string;
  references?: string;
  createdAt?: string;
  attachments?: { filename: string; size: number; content_type: string }[];
};

let emails = new Map<string, Email>();
let fetchStatus = 200;

const fetchStub: typeof fetch = async (input) => {
  const id = decodeURIComponent(String(input).split("/").pop() ?? "");
  const e = emails.get(id);
  if (fetchStatus !== 200 || !e) return new Response("{}", { status: fetchStatus === 200 ? 404 : fetchStatus });
  const headers: Record<string, string> = {};
  if (e.inReplyTo) headers["In-Reply-To"] = e.inReplyTo;
  if (e.references) headers.References = e.references;
  return Response.json({
    object: "email",
    id: e.id,
    to: e.to ?? ["contact@hera.test"],
    from: e.from,
    created_at: e.createdAt ?? new Date().toISOString(),
    subject: e.subject,
    bcc: null,
    cc: null,
    reply_to: null,
    received_for: e.to ?? ["contact@hera.test"],
    html: e.html ?? null,
    text: e.text ?? "Здравейте, интересува ме видео.",
    headers,
    message_id: e.messageId ?? `<${e.id}@mail.example>`,
    attachments: e.attachments ?? [],
  });
};

/** Deliver one message the way Resend does: a signed email.received event naming it. */
async function deliver(e: Email, config: InboundConfig = CONFIG, mailer = createStubMailer().mailer) {
  emails.set(e.id, e);
  const payload = JSON.stringify({
    type: "email.received",
    created_at: new Date().toISOString(),
    data: {
      email_id: e.id,
      created_at: new Date().toISOString(),
      from: e.from,
      to: e.to ?? ["contact@hera.test"],
      bcc: [],
      cc: [],
      received_for: e.to ?? ["contact@hera.test"],
      message_id: e.messageId ?? `<${e.id}@mail.example>`,
      subject: e.subject,
      attachments: [],
    },
  });
  const t = Math.floor(Date.now() / 1000);
  const headers = {
    id: `msg_${e.id}`,
    timestamp: String(t),
    signature: signWebhook(config.webhookSecret, `msg_${e.id}`, t, payload),
  };
  return handleInboundEmail(payload, headers, config, { db: handle.db, mailer, fetchImpl: fetchStub });
}

const threads = () => handle.db.select().from(mailThreads);
const messages = () => handle.db.select().from(mailMessages);

beforeAll(() => {
  handle = createDb(inject("databaseUrl"), { max: 2 });
});
afterAll(async () => {
  await handle.pool.end();
});
beforeEach(async () => {
  emails = new Map();
  fetchStatus = 200;
  await handle.db.execute(
    sql`truncate mail_messages, mail_threads, leads, rate_limit_buckets, lead_audit_log restart identity`,
  );
});

describe("recording inbound mail", () => {
  it("records a message to contact@ in a new thread under the parsed sender, once", async () => {
    const first = await deliver({ id: "em_1", from: "Мария Петрова <Maria@Example.bg>", subject: "Оферта за видео" });
    expect(first).toMatchObject({ status: "recorded", reason: "no_forward_address" });
    const again = await deliver({ id: "em_1", from: "Мария Петрова <Maria@Example.bg>", subject: "Оферта за видео" });
    expect(again).toMatchObject({ status: "recorded" });

    const [t] = await threads();
    expect(t).toMatchObject({ correspondent: "maria@example.bg", correspondentName: "Мария Петрова", status: "open" });
    expect(t!.id).toMatch(/^[0-9A-F]{8}$/);
    const all = await messages();
    expect(all).toHaveLength(1);
    expect(all[0]).toMatchObject({ direction: "in", fromAddress: "maria@example.bg", subject: "Оферта за видео" });
  });

  it("files a reply by its References, and a fresh message with the same subject, into the open thread", async () => {
    await deliver({ id: "em_1", from: "maria@example.bg", subject: "Оферта", messageId: "<one@mail.example>" });
    await deliver({
      id: "em_2",
      from: "maria@example.bg",
      subject: "Re: нещо друго",
      references: "<one@mail.example>",
    });
    await deliver({ id: "em_3", from: "maria@example.bg", subject: "AW: Оферта" });
    expect(await threads()).toHaveLength(1);
    expect(await messages()).toHaveLength(3);
  });

  it("never lets another sender join a thread, even quoting its Message-ID or subject", async () => {
    await deliver({ id: "em_1", from: "maria@example.bg", subject: "Оферта", messageId: "<one@mail.example>" });
    await deliver({
      id: "em_2",
      from: "stranger@evil.example",
      subject: "Re: Оферта",
      references: "<one@mail.example>",
    });
    const all = await threads();
    expect(all.map((t) => t.correspondent).sort()).toEqual(["maria@example.bg", "stranger@evil.example"]);
  });

  it("files a header that dresses one address as another under the address it really carries", async () => {
    await deliver({ id: "em_1", from: '"<maria@example.bg>" <attacker@evil.example>', subject: "Оферта" });
    const [t] = await threads();
    expect(t!.correspondent).toBe("attacker@evil.example");
  });

  it("keeps a sender that does not parse, flattened, and never answers it", async () => {
    await deliver({ id: "em_1", from: "a@x.example, b@y.example", subject: "Двама" });
    const [t] = await threads();
    expect(t!.correspondent).toBe("a@x.example, b@y.example");
    const stub = createStubMailer();
    expect(await replyToThread(handle.db, stub.mailer, REPLY, t!.id, "Здравейте")).toEqual({
      ok: false,
      error: REPLY_ERRORS.unclear,
    });
    expect(stub.sent).toHaveLength(0);
  });

  it("reopens a finished conversation when they write again by reference, starts a new one by subject alone", async () => {
    await deliver({ id: "em_1", from: "maria@example.bg", subject: "Оферта", messageId: "<one@mail.example>" });
    const [t] = await threads();
    await setThreadStatus(handle.db, t!.id, "done");
    await deliver({ id: "em_2", from: "maria@example.bg", subject: "Re: Оферта", references: "<one@mail.example>" });
    expect((await getThread(handle.db, t!.id))!.status).toBe("open");
    await setThreadStatus(handle.db, t!.id, "done");
    await deliver({ id: "em_3", from: "maria@example.bg", subject: "Оферта" });
    expect(await threads()).toHaveLength(2);
  });
});

describe("refusing what is not ours", () => {
  it("answers a bad or missing signature with unauthorized and stores nothing", async () => {
    emails.set("em_1", { id: "em_1", from: "maria@example.bg", subject: "x" });
    const payload = JSON.stringify({ type: "email.received", data: { email_id: "em_1", from: "maria@example.bg" } });
    const t = Math.floor(Date.now() / 1000);
    const result = await handleInboundEmail(
      payload,
      { id: "m", timestamp: String(t), signature: "v1,bm90LWEtc2lnbmF0dXJl" },
      CONFIG,
      { db: handle.db, mailer: null, fetchImpl: fetchStub },
    );
    expect(result).toEqual({ status: "unauthorized" });
    expect(await messages()).toHaveLength(0);
  });

  it("ignores mail for another site's domain and mail from our own domain", async () => {
    expect(await deliver({ id: "em_1", from: "a@example.bg", to: ["info@connecto.example"], subject: "x" })).toEqual({
      status: "ignored",
      reason: "other_domain",
    });
    expect(await deliver({ id: "em_2", from: "Hera <contact@hera.test>", subject: "x" })).toEqual({
      status: "ignored",
      reason: "from_own_domain",
    });
    expect(await messages()).toHaveLength(0);
  });

  it("fails (so Resend retries) when the message cannot be fetched, and stores nothing", async () => {
    fetchStatus = 503;
    expect(await deliver({ id: "em_1", from: "maria@example.bg", subject: "x" })).toEqual({
      status: "failed",
      error: "fetch_http_503",
    });
    expect(await threads()).toHaveLength(0);
  });
});

describe("the copy to the owner's inbox", () => {
  it("forwards once the address exists: from contact@, reply goes to the customer, HTML never passed through", async () => {
    const stub = createStubMailer();
    const config = { ...CONFIG, forwardTo: "owner@gmail.example" };
    const result = await deliver(
      {
        id: "em_1",
        from: "Мария <maria@example.bg>",
        subject: "Оферта",
        html: "<script>alert(1)</script><p>Здравейте</p>",
      },
      config,
      stub.mailer,
    );
    expect(result.status).toBe("forwarded");
    expect(stub.sent).toHaveLength(1);
    const copy = stub.sent[0]!;
    expect(copy).toMatchObject({ to: "owner@gmail.example", replyTo: "maria@example.bg", subject: "Оферта" });
    expect(copy.from).toBe('"Мария чрез Hera Editing" <contact@hera.test>');
    expect(copy.html).not.toContain("<script>");
    expect(copy.text).toContain("От: Мария <maria@example.bg>");
  });

  it("never forwards to its own domain (a loop), and still records", async () => {
    const stub = createStubMailer();
    const result = await deliver(
      { id: "em_1", from: "maria@example.bg", subject: "x" },
      { ...CONFIG, forwardTo: "me@hera.test" },
      stub.mailer,
    );
    expect(result).toMatchObject({ status: "recorded", reason: "forward_to_own_domain" });
    expect(stub.sent).toHaveLength(0);
    expect(await messages()).toHaveLength(1);
  });
});

describe("answering from the panel", () => {
  it("replies to the parsed correspondent, threaded on their last message, and records it after sending", async () => {
    await deliver({
      id: "em_1",
      from: "Мария <maria@example.bg>",
      subject: "AW: Оферта",
      messageId: "<one@mail.example>",
    });
    const [t] = await threads();
    const stub = createStubMailer();
    expect(await replyToThread(handle.db, stub.mailer, REPLY, t!.id, "  Здравейте, Мария!\n\nЕто цените.  ")).toEqual({
      ok: true,
      threadId: t!.id,
    });
    const sent = stub.sent[0]!;
    expect(sent).toMatchObject({
      to: "maria@example.bg",
      from: '"Hera Editing" <contact@hera.test>',
      subject: "Re: Оферта",
    });
    expect(sent.headers).toEqual({ "In-Reply-To": "<one@mail.example>", References: "<one@mail.example>" });
    expect(sent.text).toBe("Здравейте, Мария!\n\nЕто цените.\n\n--\nHera Editing\nhera.test");
    const out = (await messages()).find((m) => m.direction === "out");
    expect(out).toMatchObject({ toAddresses: "maria@example.bg", inReplyTo: "<one@mail.example>" });
    expect(await countAwaitingAnswer(handle.db)).toBe(0);
  });

  it("refuses an empty or oversized answer, and records nothing when the send fails", async () => {
    await deliver({ id: "em_1", from: "maria@example.bg", subject: "Оферта" });
    const [t] = await threads();
    const stub = createStubMailer();
    expect(await replyToThread(handle.db, stub.mailer, REPLY, t!.id, "   ")).toEqual({
      ok: false,
      error: REPLY_ERRORS.empty,
    });
    expect((await replyToThread(handle.db, stub.mailer, REPLY, t!.id, "x".repeat(10_001))).ok).toBe(false);
    stub.failWith("mail_http_500");
    expect(await replyToThread(handle.db, stub.mailer, REPLY, t!.id, "Здравейте")).toEqual({
      ok: false,
      error: REPLY_ERRORS.failed,
    });
    expect((await messages()).filter((m) => m.direction === "out")).toHaveLength(0);
    expect(await countAwaitingAnswer(handle.db)).toBe(1);
  });

  it("answers an enquiry in a conversation tied to it, which the customer's reply joins", async () => {
    const created = await submitLead(validLead({ email: "maria@example.bg" }), {
      db: handle.db,
      clientAddress: null,
      rateLimitSalt: "mailbox-test-salt-mailbox-test-salt-mailbox",
      privacyNoticeVersion: "test-v1",
    });
    if (created.status !== "created") throw new Error(created.status);
    const [lead] = await handle.db.select().from(leads).where(eq(leads.id, created.id));
    const stub = createStubMailer();
    const result = await replyToLead(handle.db, stub.mailer, REPLY, lead!, "Благодарим за запитването!");
    expect(result.ok).toBe(true);
    expect(stub.sent[0]!.subject).toBe("Вашето запитване към Hera Editing");
    const [t] = await threads();
    expect(t).toMatchObject({ leadId: lead!.id, correspondent: "maria@example.bg" });

    await deliver({ id: "em_9", from: "maria@example.bg", subject: "Re: Вашето запитване към Hera Editing" });
    expect(await threads()).toHaveLength(1);
    expect((await getThread(handle.db, t!.id))!.messages.map((m) => m.direction)).toEqual(["out", "in"]);
    expect((await listThreads(handle.db, "open"))[0]).toMatchObject({ lastDirection: "in", messageCount: 2 });
  });
});

describe("enquiry status", () => {
  it("changes the status and records it without personal data", async () => {
    const created = await submitLead(validLead(), {
      db: handle.db,
      clientAddress: null,
      rateLimitSalt: "mailbox-test-salt-mailbox-test-salt-mailbox",
      privacyNoticeVersion: "test-v1",
    });
    if (created.status !== "created") throw new Error(created.status);
    expect(await setLeadStatus(handle.db, created.id, "proposal")).toBe(true);
    expect(await setLeadStatus(handle.db, "not-a-uuid", "won")).toBe(false);
    expect((await listLeads(handle.db, "proposal")).map((l) => l.id)).toEqual([created.id]);
    const audit = await handle.db.select().from(leadAuditLog);
    expect(audit).toEqual([
      expect.objectContaining({
        action: "status_change",
        leadId: created.id,
        actor: "admin-panel",
        details: { status: "proposal" },
      }),
    ]);
  });
});
