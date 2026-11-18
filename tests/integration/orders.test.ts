import { mkdtempSync, readFileSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { sql } from "drizzle-orm";
import { afterAll, beforeAll, beforeEach, describe, expect, inject, it, vi } from "vitest";

const afterQueue = vi.hoisted(() => [] as Array<() => unknown>);
vi.mock("next/server", async (importOriginal) => {
  const mod = await importOriginal<typeof import("next/server")>();
  return {
    ...mod,
    after: (task: () => unknown) => {
      afterQueue.push(task);
    },
  };
});

import * as leadsRoute from "../../src/app/api/leads/route";
import * as route from "../../src/app/api/orders/route";
import { getLead, leadMeta, listLeads } from "../../src/lib/admin/leads";
import { resetServerEnvCache } from "../../src/lib/config/env";
import { closeDb, createDb, type DbHandle } from "../../src/lib/db/client";
import { orderRows } from "../../src/lib/leads/order-summary";
import { submitLead } from "../../src/lib/leads/service";
import { replyToLead } from "../../src/lib/mailbox/reply";
import { createStubMailer, validLead } from "../helpers/fixtures";

/*
 * The English order (decision L38) through the real pipeline and Postgres: POST /api/orders validates, applies the
 * EU rule, rate-limits, stores idempotently with locale "en" and the brief in `details`, and alerts the owner once;
 * it does not exist while orders are closed. The admin panel's queries show English orders beside Bulgarian ones.
 */

let handle: DbHandle;
let outbox: string;

const baseEnv = () => ({
  APP_ENV: "test",
  DATABASE_URL: inject("databaseUrl"),
  MAIL_PROVIDER: "dev",
  MAIL_DEV_OUTBOX_DIR: outbox,
  NOTIFICATION_EMAIL_TO: "owner@example.com",
  NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
  RATE_LIMIT_SALT: "orders-test-salt-orders-test-salt-orders",
  TRUST_PROXY: "true",
  EN_SECTION_ENABLED: "",
  EN_EU_ORDERS: "",
});

async function useEnv(env: Record<string, string>) {
  Object.assign(process.env, env);
  resetServerEnvCache();
  await closeDb();
}

/** A complete, clearly fictional order. */
const validOrder = (over: Record<string, unknown> = {}) => ({
  package: "wedding-highlight",
  name: "Test Person",
  businessName: "Test Films LLC (fictional)",
  email: `order.${randomUUID().slice(0, 8)}@example.com`,
  country: "US",
  vatNumber: "",
  businessConfirmed: true,
  footageUrl: "drive.google.com/drive/folders/fictional",
  deadline: "",
  references: "",
  music: "client",
  aiVisuals: "not_allowed",
  mustInclude: "Keep the grandmother's toast.",
  scope: "",
  couple: "Ann and Bob (fictional)",
  privacyNoticeAcknowledged: true,
  sourcePath: "/en/wedding-editing",
  utm: { source: "test", medium: null, campaign: null },
  requestId: randomUUID(),
  locale: "en",
  ...over,
});

let ip = 0;
const post = (body: unknown, init: { ip?: string; raw?: string; headers?: Record<string, string> } = {}) =>
  route.POST(
    new Request("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "http://localhost:3000",
        "x-real-ip": init.ip ?? `198.51.100.${(ip++ % 200) + 1}`,
        ...init.headers,
      },
      body: init.raw ?? JSON.stringify(body),
    }),
  );

const flushAfter = async () => {
  while (afterQueue.length) await afterQueue.shift()!();
};
type Row = { id: string; locale: string; city: string | null; goal: string | null; details: Record<string, unknown> };
const rowOf = async (id: string) =>
  (await handle.db.execute<Row>(sql`select id, locale, city, goal, details from leads where id = ${id}`)).rows[0];

beforeAll(async () => {
  outbox = mkdtempSync(path.join(tmpdir(), "hera-orders-"));
  handle = createDb(inject("databaseUrl"), { max: 2 });
  await useEnv(baseEnv());
});
afterAll(async () => {
  await closeDb();
  await handle.pool.end();
});
beforeEach(async () => {
  await handle.db.execute(
    sql`truncate mail_messages, mail_threads, leads, rate_limit_buckets, lead_audit_log restart identity`,
  );
  afterQueue.length = 0;
  await useEnv(baseEnv());
});

describe("POST /api/orders", () => {
  it("stores the order with locale en and its brief, answers 201 only after the insert, then alerts once", async () => {
    const res = await post(validOrder());
    expect(res.status).toBe(201);
    const { id } = (await res.json()) as { id: string };
    const row = await rowOf(id);
    expect(row).toMatchObject({ locale: "en", city: null, goal: null });
    expect(row!.details).toMatchObject({
      version: 1,
      package: "wedding-highlight",
      packageName: "Highlight from selects",
      priceUsd: 380,
      country: "US",
      businessConfirmed: true,
      niche: "wedding",
      wedding: { couple: "Ann and Bob (fictional)" },
    });

    const before = readdirSync(outbox).length;
    await flushAfter();
    const files = readdirSync(outbox).filter((f) => f.includes(id));
    expect(readdirSync(outbox).length - before).toBe(1);
    const alert = JSON.parse(readFileSync(path.join(outbox, files[0]!), "utf8")) as { subject: string; text: string };
    expect(alert.subject).toBe("Нова поръчка (EN): Test Films LLC (fictional), Съединени щати (US)");
    expect(alert.text).toContain("Пакет: Highlight from selects · $380");
    expect(alert.text).toContain("Имена на двойката: Ann and Bob (fictional)");
    expect(alert.text).toContain("Какво да има или да няма: Keep the grandmother's toast.");
  });

  it("is idempotent on the request id, and stores the same brief sent twice once", async () => {
    const order = validOrder();
    const a = await post(order);
    const b = await post(order);
    expect(((await a.json()) as { id: string }).id).toBe(((await b.json()) as { id: string }).id);
    const again = await post({ ...order, requestId: randomUUID() });
    expect(again.status).toBe(201);
    const count = await handle.db.execute<{ n: string }>(sql`select count(*) as n from leads`);
    expect(Number(count.rows[0]!.n)).toBe(1);
  });

  it("answers 400 with field codes, never echoing what was sent", async () => {
    const res = await post(validOrder({ email: "not-an-email", name: "Secret Name", package: "nope" }));
    expect(res.status).toBe(400);
    const text = await res.text();
    expect(JSON.parse(text)).toEqual({
      ok: false,
      error: "validation",
      fieldErrors: { package: "invalid_choice", email: "invalid_email" },
    });
    expect(text).not.toContain("Secret");
  });

  it("refuses businesses in other EU states while EN_EU_ORDERS is off, and takes them once it is on", async () => {
    const refused = await post(validOrder({ country: "DE" }));
    expect(refused.status).toBe(400);
    expect(await refused.json()).toMatchObject({ fieldErrors: { country: "eu_unavailable" } });
    expect((await post(validOrder({ country: "BG" }))).status).toBe(201);

    await useEnv({ ...baseEnv(), EN_EU_ORDERS: "true" });
    expect((await post(validOrder({ country: "DE" }))).status).toBe(201);
  });

  it("rate-limits one client like the quote form: five in ten minutes, then 429 with Retry-After", async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) statuses.push((await post(validOrder(), { ip: "203.0.113.77" })).status);
    expect(statuses).toEqual([201, 201, 201, 201, 201, 429]);
    const limited = await post(validOrder(), { ip: "203.0.113.77" });
    expect(Number(limited.headers.get("retry-after"))).toBeGreaterThan(0);
  });

  it("stores a honeypot hit without alerting the owner", async () => {
    const res = await post({ ...validOrder(), hp_note: "spam" });
    const { id } = (await res.json()) as { id: string };
    const r = await handle.db.execute<{ notification_status: string; spam_reason: string }>(
      sql`select notification_status, spam_reason from leads where id = ${id}`,
    );
    expect(r.rows[0]).toEqual({ notification_status: "suppressed", spam_reason: "honeypot" });
    expect(afterQueue).toHaveLength(0);
  });

  it("refuses other content types, other origins and oversized bodies", async () => {
    expect((await post(validOrder(), { headers: { "content-type": "text/plain" } })).status).toBe(415);
    expect((await post(validOrder(), { headers: { origin: "https://evil.example" } })).status).toBe(403);
    expect((await post(null, { raw: JSON.stringify({ x: "y".repeat(40 * 1024) }) })).status).toBe(413);
    expect((await post(null, { raw: "{not json" })).status).toBe(400);
  });

  it("does not exist while the section is off, or in production before the terms are signed off", async () => {
    await useEnv({ ...baseEnv(), EN_SECTION_ENABLED: "false" });
    expect((await post(validOrder())).status).toBe(404);
    await useEnv({ ...baseEnv(), APP_ENV: "production", EN_SECTION_ENABLED: "true" });
    expect((await post(validOrder())).status).toBe(404);
    const count = await handle.db.execute<{ n: string }>(sql`select count(*) as n from leads`);
    expect(Number(count.rows[0]!.n)).toBe(0);
  });

  it("leaves the Bulgarian quote API as it was: an English order there is refused", async () => {
    const res = await leadsRoute.POST(
      new Request("http://localhost:3000/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json", origin: "http://localhost:3000", "x-real-ip": "192.0.2.9" },
        body: JSON.stringify(validLead({ locale: "en" })),
      }),
    );
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: "validation", fieldErrors: { locale: "unsupported_locale" } });
  });
});

describe("the admin panel shows English orders (decision L32's enquiries)", () => {
  it("lists them beside Bulgarian requests, with locale, package and country, and opens their brief", async () => {
    const bg = await submitLead(validLead(), {
      db: handle.db,
      clientAddress: null,
      rateLimitSalt: "orders-test-salt-orders-test-salt-orders",
      privacyNoticeVersion: "test-v1",
    });
    expect(bg.status).toBe("created");
    const res = await post(validOrder({ package: "listing-video", country: "GB", listing: "12 Fictional Road" }));
    const { id } = (await res.json()) as { id: string };

    const list = await listLeads(handle.db);
    expect(list.map((l) => l.locale).sort()).toEqual(["bg", "en"]);
    const en = list.find((l) => l.locale === "en")!;
    expect(leadMeta(en)).toBe("Test Films LLC (fictional) · Listing video · GB");
    const bgItem = list.find((l) => l.locale === "bg")!;
    expect(leadMeta(bgItem)).toBe(`${bgItem.businessName} · Пловдив`);

    const lead = await getLead(handle.db, id);
    expect(lead?.details?.realEstate).toMatchObject({ listing: "12 Fictional Road" });
    const rows = orderRows(lead!.details!);
    expect(rows.find((r) => r.label === "Държава")?.value).toBe("Обединеното кралство (GB)");
    expect(rows.find((r) => r.label === "Адрес или име на обявата")?.value).toBe("12 Fictional Road");
  });

  it("answers an English order in English: the conversation's subject", async () => {
    const res = await post(validOrder());
    const lead = (await getLead(handle.db, ((await res.json()) as { id: string }).id))!;
    const stub = createStubMailer();
    const config = { address: "contact@hera.test", brandName: "Hera Editing", siteUrl: "http://localhost:3000" };
    const sent = await replyToLead(handle.db, stub.mailer, config, lead, "Hello! Here is your quote.");
    expect(sent.ok).toBe(true);
    expect(stub.sent[0]).toMatchObject({ to: lead.email, subject: "Your brief for Hera Editing" });
  });
});
