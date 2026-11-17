import { execFile } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { eq, sql } from "drizzle-orm";
import { afterAll, beforeAll, beforeEach, describe, expect, inject, it } from "vitest";
import { leadAuditLog, leads } from "../../src/db/schema";
import { createDb, type DbHandle } from "../../src/lib/db/client";
import { deliverLeadNotification } from "../../src/lib/leads/notifications";
import { submitLead } from "../../src/lib/leads/service";
import { createStubMailer, validLead } from "../helpers/fixtures";

const run = promisify(execFile);
const root = path.resolve(import.meta.dirname, "../..");
const tsxCli = path.join(root, "node_modules", "tsx", "dist", "cli.mjs");

let handle: DbHandle;
let work: string;

async function cli(script: string, args: string[], env: Record<string, string> = {}) {
  return run(process.execPath, [tsxCli, path.join(root, "scripts", script), ...args], {
    cwd: root,
    env: {
      ...process.env,
      APP_ENV: "test",
      DATABASE_URL: inject("databaseUrl"),
      MAIL_PROVIDER: "dev",
      MAIL_DEV_OUTBOX_DIR: path.join(work, "outbox"),
      NOTIFICATION_EMAIL_TO: "owner@example.com",
      OPERATOR: "integration-test",
      ...env,
    },
    timeout: 60_000,
  });
}

async function createLead(overrides: Record<string, unknown> = {}) {
  const r = await submitLead(validLead(overrides), {
    db: handle.db,
    clientAddress: null,
    rateLimitSalt: "cli-test-salt-cli-test-salt-cli-test-salt",
    privacyNoticeVersion: "test-v1",
  });
  if (r.status !== "created") throw new Error(`expected created, got ${r.status}`);
  return r.id;
}

beforeAll(() => {
  handle = createDb(inject("databaseUrl"), { max: 2 });
  work = mkdtempSync(path.join(tmpdir(), "hera-cli-"));
});
afterAll(async () => {
  await handle.pool.end();
});
beforeEach(async () => {
  await handle.db.execute(sql`truncate leads, rate_limit_buckets, lead_audit_log restart identity`);
});

describe("operator CLI", () => {
  it("leads:retry delivers a pending alert left by a mail outage, once", async () => {
    const id = await createLead();
    const stub = createStubMailer();
    stub.failWith("mail_http_503");
    await deliverLeadNotification(
      { db: handle.db, mailer: stub.mailer, to: "o@example.com", from: "s@example.com", brandName: null },
      id,
    );
    await handle.db.execute(sql`update leads set notification_next_attempt_at = now() - interval '1 second'`);

    const first = await cli("leads-retry.ts", []);
    expect(first.stdout).toContain("Processed 1: sent 1");
    const second = await cli("leads-retry.ts", []);
    expect(second.stdout).toContain("Processed 0");

    const [row] = await handle.db.select().from(leads).where(eq(leads.id, id));
    expect(row!.notificationStatus).toBe("sent");
    expect(readdirSync(path.join(work, "outbox")).filter((f) => f.startsWith(`lead-alert-${id}`))).toHaveLength(1);
    const audits = await handle.db.select().from(leadAuditLog);
    expect(audits.map((a) => a.action)).toEqual(["notification_retry", "notification_retry"]);
    expect(audits[0]!.actor).toBe("integration-test");
  }, 120_000);

  it("leads:export writes a CSV that neutralises spreadsheet formulas, and audits without PII", async () => {
    await createLead({ name: '=HYPERLINK("http://evil")', message: "+SUM(A1)" });
    const out = path.join(work, "export.csv");
    const res = await cli("leads-export.ts", ["--out", out]);
    expect(res.stdout).toContain("Exported 1 lead(s)");
    const csv = readFileSync(out, "utf8");
    expect(csv).toContain(`"'=HYPERLINK(""http://evil"")"`);
    expect(csv).toContain(`"'+SUM(A1)"`);
    const [entry] = await handle.db.select().from(leadAuditLog);
    expect(entry!.action).toBe("export");
    expect(JSON.stringify(entry!.details)).not.toContain("HYPERLINK");
  }, 120_000);

  it("leads:export refuses to print personal data to the terminal", async () => {
    await expect(cli("leads-export.ts", [])).rejects.toMatchObject({ code: 2 });
  }, 60_000);

  it("leads:dsar finds by phone digits, exports, and deletes with confirmation", async () => {
    const id = await createLead({ phone: "+359 888 765 432", email: "dsar@example.com" });
    // Same number typed differently: matched on digits only.
    const found = await cli("leads-dsar.ts", ["find", "--phone", "+359888765432"]);
    expect(found.stdout).toContain(id);

    const out = path.join(work, "person.json");
    await cli("leads-dsar.ts", ["export", "--email", "DSAR@example.com", "--out", out]);
    expect(JSON.parse(readFileSync(out, "utf8"))[0].id).toBe(id);

    await expect(cli("leads-dsar.ts", ["delete", "--id", id])).rejects.toMatchObject({ code: 2 });
    await cli("leads-dsar.ts", ["delete", "--id", id, "--confirm"]);
    expect(await handle.db.select().from(leads).where(eq(leads.id, id))).toEqual([]);

    const actions = (await handle.db.select().from(leadAuditLog)).map((a) => a.action);
    expect(actions).toEqual(["dsar_find", "dsar_export", "dsar_delete"]);
  }, 180_000);

  it("leads:dsar status moves a lead through the pipeline", async () => {
    const id = await createLead();
    await cli("leads-dsar.ts", ["status", "--id", id, "--set", "contacted"]);
    const [row] = await handle.db.select().from(leads).where(eq(leads.id, id));
    expect(row!.status).toBe("contacted");
    await expect(cli("leads-dsar.ts", ["status", "--id", id, "--set", "bogus"])).rejects.toMatchObject({ code: 2 });
  }, 120_000);
});
