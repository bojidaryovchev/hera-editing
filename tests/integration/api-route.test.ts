import { mkdtempSync, readdirSync } from "node:fs";
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

import * as route from "../../src/app/api/leads/route";
import { resetServerEnvCache } from "../../src/lib/config/env";
import { closeDb, createDb, type DbHandle } from "../../src/lib/db/client";
import { LEAD_LIMITS } from "../../src/lib/validation/lead";
import { validLead } from "../helpers/fixtures";

let handle: DbHandle;
let outbox: string;

const baseEnv = () => ({
  APP_ENV: "test",
  DATABASE_URL: inject("databaseUrl"),
  MAIL_PROVIDER: "dev",
  MAIL_DEV_OUTBOX_DIR: outbox,
  NOTIFICATION_EMAIL_TO: "owner@example.com",
  NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
  RATE_LIMIT_SALT: "api-route-test-salt-api-route-test-salt",
  TRUST_PROXY: "true",
});

async function useEnv(env: Record<string, string>) {
  Object.assign(process.env, env);
  resetServerEnvCache();
  await closeDb();
}

let ip = 0;
const post = (body: unknown, init: { headers?: Record<string, string>; raw?: string; ip?: string } = {}) =>
  route.POST(
    new Request("http://localhost:3000/api/leads", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "http://localhost:3000",
        "x-real-ip": init.ip ?? `203.0.113.${(ip++ % 200) + 1}`,
        ...init.headers,
      },
      body: init.raw ?? JSON.stringify(body),
    }),
  );

const flushAfter = async () => {
  while (afterQueue.length) await afterQueue.shift()!();
};
const outboxFiles = () => readdirSync(outbox);

beforeAll(async () => {
  outbox = mkdtempSync(path.join(tmpdir(), "hera-outbox-"));
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

describe("POST /api/leads", () => {
  it("answers 201 { ok, id } only after the lead is stored, then sends one alert", async () => {
    const res = await post(validLead());
    expect(res.status).toBe(201);
    const body = (await res.json()) as { ok: boolean; id: string };
    expect(body.ok).toBe(true);
    const stored = await handle.db.execute<{ notification_status: string }>(
      sql`select notification_status from leads where id = ${body.id}`,
    );
    expect(stored.rows[0]?.notification_status).toBe("pending");
    const before = outboxFiles().length;
    await flushAfter();
    expect(outboxFiles().length - before).toBe(1);
    const after = await handle.db.execute<{ notification_status: string }>(
      sql`select notification_status from leads where id = ${body.id}`,
    );
    expect(after.rows[0]?.notification_status).toBe("sent");
  });

  it("returns the same id for a retried requestId and sends no duplicate alert", async () => {
    const lead = validLead();
    const a = await post(lead);
    const b = await post(lead);
    expect(a.status).toBe(201);
    expect(b.status).toBe(201);
    expect(((await a.json()) as { id: string }).id).toBe(((await b.json()) as { id: string }).id);
    const before = outboxFiles().length;
    await flushAfter();
    expect(outboxFiles().length - before).toBe(1);
  });

  it("answers 400 with field errors and never echoes submitted values", async () => {
    const res = await post(validLead({ email: "not-an-email", phone: "", name: "Секретно Име" }));
    expect(res.status).toBe(400);
    const text = await res.text();
    expect(JSON.parse(text)).toEqual({ ok: false, error: "validation", fieldErrors: { email: "invalid_email" } });
    expect(text).not.toContain("Секретно");
    expect(text).not.toContain("not-an-email");
  });

  it("rejects malformed JSON (400), other content types (415) and foreign origins (403)", async () => {
    expect((await post(null, { raw: "{" })).status).toBe(400);
    expect((await post(null, { raw: "[1,2]" })).status).toBe(400);
    expect((await post(validLead(), { headers: { "content-type": "text/plain" } })).status).toBe(415);
    expect((await post(validLead(), { headers: { origin: "https://evil.example" } })).status).toBe(403);
  });

  it("refuses bodies over 8 KB (413) but accepts the longest valid Cyrillic request", async () => {
    const huge = await post(validLead({ message: "a".repeat(9000) }));
    expect(huge.status).toBe(413);
    const longest = validLead({
      name: "Я".repeat(LEAD_LIMITS.name.max),
      businessName: "Ж".repeat(LEAD_LIMITS.businessName.max),
      city: "Щ".repeat(LEAD_LIMITS.city.max),
      profileUrl: "ф".repeat(LEAD_LIMITS.profileUrl.max),
      message: "ъ".repeat(LEAD_LIMITS.message.max),
    });
    expect(new TextEncoder().encode(JSON.stringify(longest)).byteLength).toBeLessThan(route.MAX_BODY_BYTES);
    expect((await post(longest)).status).toBe(201);
  });

  it("answers 429 with Retry-After once a client exceeds the burst limit", async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) {
      const res = await post(validLead({ message: `burst ${i}` }), { ip: "198.51.100.99" });
      statuses.push(res.status);
      if (res.status === 429) expect(Number(res.headers.get("retry-after"))).toBeGreaterThan(0);
    }
    expect(statuses).toEqual([201, 201, 201, 201, 201, 429]);
  });

  it("answers 503 with a neutral message when the database is down", async () => {
    await useEnv({ ...baseEnv(), DATABASE_URL: "postgres://postgres:postgres@127.0.0.1:1/unreachable" });
    const res = await post(validLead({ name: "Скрито Име" }));
    expect(res.status).toBe(503);
    const text = await res.text();
    expect(JSON.parse(text)).toEqual({ ok: false, error: "unavailable" });
    expect(text).not.toContain("Скрито");
    expect(afterQueue).toHaveLength(0);
  });

  it("exposes no way to read leads: only POST is exported", () => {
    expect(Object.keys(route).filter((k) => /^(GET|PUT|PATCH|DELETE|HEAD|OPTIONS)$/.test(k))).toEqual([]);
  });

  it("ignores a client-chosen id and stores its own", async () => {
    const res = await post(validLead({ id: randomUUID() }));
    expect(res.status).toBe(201);
  });
});
