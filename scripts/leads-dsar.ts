/**
 * Data-subject requests and pipeline status, by a documented operator procedure.
 *   pnpm leads:dsar find   --email a@b.bg | --phone "0888 123 456"
 *   pnpm leads:dsar export --email a@b.bg --out person.json
 *   pnpm leads:dsar delete --id <lead uuid> --confirm
 *   pnpm leads:dsar status --id <lead uuid> --set contacted|qualified|proposal|won|lost|new
 * Every action is written to lead_audit_log (without personal data).
 */
import { writeFileSync } from "node:fs";
import { eq, or, sql } from "drizzle-orm";
import { leadStatus, leads } from "../src/db/schema";
import { createDb } from "../src/lib/db/client";
import { audit, parseArgs, requireDatabaseUrl } from "./lib/cli";

const { positional, flags } = parseArgs(process.argv.slice(2));
const command = positional[0];
const fail = (msg: string): never => {
  console.error(msg);
  process.exit(2);
};

const { db, pool } = createDb(requireDatabaseUrl(), { max: 1 });

function matchPerson() {
  const email = typeof flags.email === "string" ? flags.email.trim().toLowerCase() : null;
  const phoneDigits = typeof flags.phone === "string" ? flags.phone.replace(/\D/g, "") : null;
  if (!email && !phoneDigits) fail("Pass --email or --phone.");
  const conditions = [];
  if (email) conditions.push(sql`lower(${leads.email}) = ${email}`);
  if (phoneDigits)
    conditions.push(sql`regexp_replace(coalesce(${leads.phone}, ''), '[^0-9]', '', 'g') = ${phoneDigits}`);
  return or(...conditions);
}

function requireId(): string {
  const id = typeof flags.id === "string" ? flags.id : "";
  if (!/^[0-9a-f-]{36}$/i.test(id)) fail("Pass --id <lead uuid>.");
  return id;
}

try {
  switch (command) {
    case "find": {
      const rows = await db
        .select({ id: leads.id, createdAt: leads.createdAt, status: leads.status })
        .from(leads)
        .where(matchPerson());
      for (const r of rows) console.info(`${r.id}  ${r.createdAt.toISOString()}  ${r.status}`);
      console.info(`${rows.length} lead(s) found.`);
      await audit(db, "dsar_find", null, { count: rows.length });
      break;
    }
    case "export": {
      const out = typeof flags.out === "string" ? flags.out : fail("Pass --out <file>.");
      const rows = await db.select().from(leads).where(matchPerson());
      writeFileSync(out, JSON.stringify(rows, null, 2), { encoding: "utf8", mode: 0o600 });
      console.info(`Wrote ${rows.length} lead(s) to ${out}.`);
      for (const r of rows) await audit(db, "dsar_export", r.id);
      break;
    }
    case "delete": {
      const id = requireId();
      if (flags.confirm !== true) fail("Deleting is permanent. Re-run with --confirm.");
      const deleted = await db.delete(leads).where(eq(leads.id, id)).returning({ id: leads.id });
      if (!deleted[0]) fail("No lead with that id.");
      await audit(db, "dsar_delete", id);
      console.info("Lead deleted. The audit log keeps only the id, time and operator.");
      break;
    }
    case "status": {
      const id = requireId();
      const next = flags.set;
      if (typeof next !== "string" || !(leadStatus.enumValues as readonly string[]).includes(next)) {
        fail(`--set must be one of ${leadStatus.enumValues.join(", ")}`);
      }
      const updated = await db
        .update(leads)
        .set({ status: next as (typeof leadStatus.enumValues)[number], updatedAt: sql`now()` })
        .where(eq(leads.id, id))
        .returning({ id: leads.id });
      if (!updated[0]) fail("No lead with that id.");
      await audit(db, "status_change", id, { status: String(next) });
      console.info(`Status set to ${String(next)}.`);
      break;
    }
    default:
      fail("Usage: leads:dsar find|export|delete|status (see the header of scripts/leads-dsar.ts).");
  }
} finally {
  await pool.end();
}
