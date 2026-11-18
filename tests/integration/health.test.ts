import { sql } from "drizzle-orm";
import { afterAll, beforeAll, beforeEach, describe, expect, inject, it } from "vitest";
import { GET } from "../../src/app/api/health/route";
import { resetServerEnvCache } from "../../src/lib/config/env";
import { closeDb, createDb, type DbHandle } from "../../src/lib/db/client";

let handle: DbHandle;

beforeAll(async () => {
  Object.assign(process.env, {
    APP_ENV: "test",
    DATABASE_URL: inject("databaseUrl"),
    MAIL_PROVIDER: "dev",
    NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    RATE_LIMIT_SALT: "health-test-salt-health-test-salt-health",
  });
  resetServerEnvCache();
  await closeDb();
  handle = createDb(inject("databaseUrl"));
});

afterAll(async () => {
  await handle.pool.end();
  await closeDb();
});

beforeEach(async () => {
  await handle.db.execute(
    sql`truncate mail_messages, mail_threads, leads, rate_limit_buckets, lead_audit_log restart identity`,
  );
});

/** A Bulgarian lead with the given alert state, created `minutesAgo` minutes ago. */
async function lead(status: "pending" | "sent" | "failed", minutesAgo: number) {
  await handle.db.execute(sql`insert into leads
    (request_id, name, business_name, city, goal, email, privacy_notice_version, dedupe_key, notification_status, created_at)
    values (gen_random_uuid(), 'Иван', 'Фирма', 'София', 'other', 'ivan@example.com', 'test-v1', gen_random_uuid()::text,
      ${status}::notification_status, now() - make_interval(mins => ${minutesAgo}))`);
}

describe("GET /api/health", () => {
  it("is 200 when the database is up and no alert is stuck", async () => {
    await lead("sent", 120);
    await lead("pending", 5);
    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, database: "up", notifications: "ok" });
    expect(res.headers.get("cache-control")).toBe("no-store");
  });

  it("is 503 when an alert has been pending for over 30 minutes", async () => {
    await lead("pending", 45);
    const res = await GET();
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, database: "up", notifications: "backlog" });
  });

  it("is 503 when an alert has failed, and it never reveals counts or lead data", async () => {
    await lead("failed", 1);
    const res = await GET();
    expect(res.status).toBe(503);
    const body = JSON.stringify(await res.json());
    expect(body).not.toMatch(/\d|Иван|example\.com/);
  });
});
