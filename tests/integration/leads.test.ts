import { randomUUID } from "node:crypto";
import { eq, sql } from "drizzle-orm";
import { afterAll, beforeAll, beforeEach, describe, expect, inject, it } from "vitest";
import { leads } from "../../src/db/schema";
import { createDb, type DbHandle } from "../../src/lib/db/client";
import {
  MAX_NOTIFICATION_ATTEMPTS,
  deliverLeadNotification,
  processDueNotifications,
  type NotificationDeps,
} from "../../src/lib/leads/notifications";
import { submitLead, type SubmitLeadContext } from "../../src/lib/leads/service";
import { LEAD_RULES } from "../../src/lib/rate-limit";
import { createStubMailer, validLead, type StubMailer } from "../helpers/fixtures";

let handle: DbHandle;
let stub: StubMailer;
let scheduled: string[];

const ctx = (overrides: Partial<SubmitLeadContext> = {}): SubmitLeadContext => ({
  db: handle.db,
  clientAddress: "203.0.113.10",
  rateLimitSalt: "integration-test-salt-integration-test-salt",
  privacyNoticeVersion: "test-v1",
  scheduleNotification: (id) => scheduled.push(id),
  ...overrides,
});

const deps = (): NotificationDeps => ({
  db: handle.db,
  mailer: stub.mailer,
  to: "owner@example.com",
  from: "Сайт <site@example.com>",
  brandName: null,
});

const countLeads = async () =>
  Number((await handle.db.execute<{ n: string }>(sql`select count(*)::int as n from leads`)).rows[0]!.n);
const getLead = async (id: string) => (await handle.db.select().from(leads).where(eq(leads.id, id)))[0]!;

beforeAll(() => {
  handle = createDb(inject("databaseUrl"), { max: 6 });
});
afterAll(async () => {
  await handle.pool.end();
});
beforeEach(async () => {
  await handle.db.execute(sql`truncate leads, rate_limit_buckets, lead_audit_log restart identity`);
  stub = createStubMailer();
  scheduled = [];
});

describe("schema", () => {
  it("applies the migrations: tables and constraints exist", async () => {
    const tables = await handle.db.execute<{ table_name: string }>(
      sql`select table_name from information_schema.tables where table_schema = 'public' order by 1`,
    );
    expect(tables.rows.map((r) => r.table_name)).toEqual(["lead_audit_log", "leads", "rate_limit_buckets"]);
  });

  it("refuses a lead without any contact at the database level too", async () => {
    await expect(
      handle.db
        .execute(sql`insert into leads (request_id, name, business_name, city, goal, privacy_notice_version, dedupe_key)
        values (gen_random_uuid(), 'Ab', 'Ab', 'Ab', 'other', 'v', 'k')`),
    ).rejects.toThrow();
  });
});

describe("submitLead: durable, idempotent capture", () => {
  it("stores a valid lead with a pending notification and schedules the alert after commit", async () => {
    const result = await submitLead(validLead(), ctx());
    expect(result.status).toBe("created");
    if (result.status !== "created") return;
    const row = await getLead(result.id);
    expect(row.notificationStatus).toBe("pending");
    expect(row.notificationAttempts).toBe(0);
    expect(row.businessName).toBe("Тестова пекарна (фиктивни данни)");
    expect(row.message).toBe("Тестово съобщение за автоматизирани тестове.\nВтори ред.");
    expect(row.privacyNoticeVersion).toBe("test-v1");
    expect(row.status).toBe("new");
    expect(scheduled).toEqual([result.id]);
  });

  it("accepts phone-only and email-only requests, rejects neither", async () => {
    const phoneOnly = await submitLead(validLead({ email: "", message: "a" }), ctx());
    const emailOnly = await submitLead(validLead({ phone: null, message: "b" }), ctx());
    const neither = await submitLead(validLead({ email: "", phone: "  ", message: "c" }), ctx());
    expect(phoneOnly.status).toBe("created");
    expect(emailOnly.status).toBe("created");
    expect(neither).toEqual({ status: "invalid", errors: { email: "contact_required", phone: "contact_required" } });
    expect(await countLeads()).toBe(2);
  });

  it("rejects an injection-like profile URL without storing anything", async () => {
    const result = await submitLead(validLead({ profileUrl: "javascript:alert(1)" }), ctx());
    expect(result).toEqual({ status: "invalid", errors: { profileUrl: "invalid_profile" } });
    expect(await countLeads()).toBe(0);
  });

  it("maps the same requestId to one lead and one alert", async () => {
    const lead = validLead();
    const first = await submitLead(lead, ctx());
    const second = await submitLead(lead, ctx());
    expect(first.status).toBe("created");
    expect(second.status).toBe("duplicate");
    expect(second.status === "duplicate" && first.status === "created" && second.id === first.id).toBe(true);
    expect(await countLeads()).toBe(1);
    expect(scheduled).toHaveLength(1);
  });

  it("is idempotent under concurrent retries of one request", async () => {
    const lead = validLead();
    const results = await Promise.all(Array.from({ length: 5 }, () => submitLead(lead, ctx())));
    expect(results.filter((r) => r.status === "created")).toHaveLength(1);
    expect(results.filter((r) => r.status === "duplicate")).toHaveLength(4);
    expect(new Set(results.map((r) => ("id" in r ? r.id : null))).size).toBe(1);
    expect(await countLeads()).toBe(1);
    expect(scheduled).toHaveLength(1);
  });

  it("deduplicates identical submissions without a requestId (no-JS double submit)", async () => {
    const lead = validLead({ requestId: undefined });
    const results = await Promise.all([submitLead(lead, ctx()), submitLead(lead, ctx()), submitLead(lead, ctx())]);
    expect(results.filter((r) => r.status === "created")).toHaveLength(1);
    expect(await countLeads()).toBe(1);
  });

  it("stores honeypot hits flagged and suppressed, without alerting", async () => {
    const result = await submitLead(validLead(), ctx({ honeypot: "http://spam.example" }));
    expect(result).toMatchObject({ status: "created", suppressed: true });
    if (result.status !== "created") return;
    const row = await getLead(result.id);
    expect(row.notificationStatus).toBe("suppressed");
    expect(row.spamReason).toBe("honeypot");
    expect(scheduled).toEqual([]);
    const report = await processDueNotifications(deps(), { includeFailed: true });
    expect(report.processed).toBe(0);
  });

  it("ignores arbitrary client fields such as prices", async () => {
    const result = await submitLead(validLead({ price: 1, status: "won", notificationStatus: "sent" }), ctx());
    expect(result.status).toBe("created");
    if (result.status !== "created") return;
    const row = await getLead(result.id);
    expect(row.status).toBe("new");
    expect(row.notificationStatus).toBe("pending");
  });
});

describe("rate limiting", () => {
  it("allows the burst limit per client, then answers rate_limited; other clients are unaffected", async () => {
    const burst = LEAD_RULES[0]!.limit;
    for (let i = 0; i < burst; i++) {
      const r = await submitLead(validLead({ message: `m${i}` }), ctx({ clientAddress: "198.51.100.7" }));
      expect(r.status).toBe("created");
    }
    const limited = await submitLead(validLead({ message: "over" }), ctx({ clientAddress: "198.51.100.7" }));
    expect(limited.status).toBe("rate_limited");
    expect(limited.status === "rate_limited" && limited.retryAfterSeconds > 0).toBe(true);
    const other = await submitLead(validLead({ message: "other" }), ctx({ clientAddress: "198.51.100.8" }));
    expect(other.status).toBe("created");
  });

  it("never stores the raw client address", async () => {
    await submitLead(validLead(), ctx({ clientAddress: "192.0.2.55" }));
    const keys = await handle.db.execute<{ key: string }>(sql`select key from rate_limit_buckets`);
    expect(keys.rows.length).toBeGreaterThan(0);
    for (const { key } of keys.rows) expect(key).not.toContain("192.0.2.55");
  });
});

describe("owner notification: outbox, retry and outage", () => {
  it("sends the alert once and records it", async () => {
    const r = await submitLead(validLead(), ctx());
    if (r.status !== "created") throw new Error("expected created");
    expect(await deliverLeadNotification(deps(), r.id)).toBe("sent");
    expect(await deliverLeadNotification(deps(), r.id)).toBe("skipped");
    const row = await getLead(r.id);
    expect(row.notificationStatus).toBe("sent");
    expect(row.notificationAttempts).toBe(1);
    expect(row.lastNotificationAt).not.toBeNull();
    expect(stub.sent).toHaveLength(1);
    expect(stub.sent[0]!.replyTo).toBe("test.lead@example.com");
    expect(stub.sent[0]!.idempotencyKey).toBe(`lead-alert-${r.id}`);
    expect(stub.sent[0]!.text).toContain("Тестова пекарна (фиктивни данни)");
  });

  it("keeps the lead and a recoverable pending alert when mail is down, then retries idempotently", async () => {
    const r = await submitLead(validLead(), ctx());
    if (r.status !== "created") throw new Error("expected created");
    stub.failWith("mail_http_503");
    expect(await deliverLeadNotification(deps(), r.id)).toBe("retry_scheduled");
    let row = await getLead(r.id);
    expect(row.notificationStatus).toBe("pending");
    expect(row.notificationAttempts).toBe(1);
    expect(row.notificationLastError).toBe("mail_http_503");
    expect(row.notificationNextAttemptAt.getTime()).toBeGreaterThan(Date.now());

    // Not due yet: a retry run does nothing.
    stub.failWith(null);
    expect((await processDueNotifications(deps())).processed).toBe(0);

    // Time passes (backoff elapsed): the retry delivers it exactly once.
    await handle.db.execute(sql`update leads set notification_next_attempt_at = now() - interval '1 second'`);
    expect(await processDueNotifications(deps())).toMatchObject({ processed: 1, sent: 1 });
    expect(await processDueNotifications(deps())).toMatchObject({ processed: 0 });
    row = await getLead(r.id);
    expect(row.notificationStatus).toBe("sent");
    expect(row.notificationLastError).toBeNull();
    expect(stub.sent).toHaveLength(1);
  });

  it("marks the alert failed after the maximum attempts; an operator retry still delivers it", async () => {
    const r = await submitLead(validLead(), ctx());
    if (r.status !== "created") throw new Error("expected created");
    await handle.db.execute(sql`update leads set notification_attempts = ${MAX_NOTIFICATION_ATTEMPTS - 1}`);
    stub.failWith("mail_timeout");
    expect(await deliverLeadNotification(deps(), r.id)).toBe("failed");
    expect((await getLead(r.id)).notificationStatus).toBe("failed");
    expect((await processDueNotifications(deps())).processed).toBe(0);
    stub.failWith(null);
    expect(await processDueNotifications(deps(), { includeFailed: true })).toMatchObject({ sent: 1 });
    expect((await getLead(r.id)).notificationStatus).toBe("sent");
  });

  it("never sends twice when two senders race for the same lead", async () => {
    const r = await submitLead(validLead(), ctx());
    if (r.status !== "created") throw new Error("expected created");
    stub.delayMs(150);
    const outcomes = await Promise.all([deliverLeadNotification(deps(), r.id), deliverLeadNotification(deps(), r.id)]);
    expect(outcomes.sort()).toEqual(["sent", "skipped"]);
    expect(stub.sent).toHaveLength(1);
  });

  it("records a missing recipient as a retryable failure, not a crash", async () => {
    const r = await submitLead(validLead(), ctx());
    if (r.status !== "created") throw new Error("expected created");
    expect(await deliverLeadNotification({ ...deps(), to: null }, r.id)).toBe("retry_scheduled");
    expect((await getLead(r.id)).notificationLastError).toBe("no_recipient_configured");
  });
});

describe("database outage", () => {
  it("reports unavailable (never success) when the database cannot be reached", async () => {
    const down = createDb("postgres://postgres:postgres@127.0.0.1:1/unreachable", { connectionTimeoutMillis: 2_000 });
    try {
      const result = await submitLead(validLead({ requestId: randomUUID() }), ctx({ db: down.db }));
      expect(result).toEqual({ status: "unavailable" });
      expect(scheduled).toEqual([]);
    } finally {
      await down.pool.end();
    }
  });
});
