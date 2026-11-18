/**
 * Data-subject requests and pipeline status, by a documented operator procedure.
 *   pnpm leads:dsar find   --email a@b.bg | --phone "0888 123 456" | --text "Jane Doe"
 *   pnpm leads:dsar export --email a@b.bg --out person.json
 *   pnpm leads:dsar delete --id <lead uuid> --confirm
 *   pnpm leads:dsar delete-mail --email a@b.bg --confirm   (their contact@ conversations, decision L32)
 *   pnpm leads:dsar status --id <lead uuid> --set contacted|qualified|proposal|won|lost|new
 * Every action is written to lead_audit_log (without personal data). `find` and `export` cover the person's
 * conversations in the contact@ mailbox too (matched on the address they wrote from); deleting a lead leaves those to
 * `delete-mail`, which the operator runs for the same address.
 *
 * English orders (decision L38) are leads with locale "en": the same commands find, export and delete them, and an
 * export includes their whole brief (`details`). A brief can name other people (a couple, an agent, a listing's
 * address), so `--text` also searches the names, the message and every field of the brief, case-insensitively.
 */
import { writeFileSync } from "node:fs";
import { asc, eq, or, sql } from "drizzle-orm";
import { leadStatus, leads, mailMessages, mailThreads } from "../src/db/schema";
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
  const text = typeof flags.text === "string" ? flags.text.trim() : null;
  if (!email && !phoneDigits && !text) fail("Pass --email, --phone or --text.");
  if (text !== null && text.length < 3) fail("--text needs at least 3 characters.");
  const conditions = [];
  if (email) conditions.push(sql`lower(${leads.email}) = ${email}`);
  if (phoneDigits)
    conditions.push(sql`regexp_replace(coalesce(${leads.phone}, ''), '[^0-9]', '', 'g') = ${phoneDigits}`);
  if (text) {
    // A literal substring: LIKE's own wildcards in what the operator typed are escaped.
    const like = `%${text.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
    conditions.push(
      sql`(${leads.name} ilike ${like} or ${leads.businessName} ilike ${like} or coalesce(${leads.message}, '') ilike ${like} or coalesce(${leads.details}::text, '') ilike ${like})`,
    );
  }
  return or(...conditions);
}

const emailFlag = (): string | null => (typeof flags.email === "string" ? flags.email.trim().toLowerCase() : null);

/** The person's conversations in the mailbox: threads they wrote from (the parsed address), with every message. */
async function conversationsOf(email: string | null) {
  if (!email) return [];
  const threads = await db.select().from(mailThreads).where(eq(mailThreads.correspondent, email));
  return Promise.all(
    threads.map(async (t) => ({
      ...t,
      messages: await db
        .select()
        .from(mailMessages)
        .where(eq(mailMessages.threadId, t.id))
        .orderBy(asc(mailMessages.createdAt)),
    })),
  );
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
        .select({ id: leads.id, createdAt: leads.createdAt, status: leads.status, locale: leads.locale })
        .from(leads)
        .where(matchPerson());
      for (const r of rows) console.info(`${r.id}  ${r.createdAt.toISOString()}  ${r.status}  ${r.locale}`);
      console.info(`${rows.length} lead(s) found.`);
      const conversations = await conversationsOf(emailFlag());
      for (const c of conversations)
        console.info(`mail ${c.id}  ${c.lastMessageAt.toISOString()}  ${c.messages.length} message(s)`);
      if (emailFlag()) console.info(`${conversations.length} conversation(s) in the mailbox.`);
      await audit(db, "dsar_find", null, { count: rows.length, conversations: conversations.length });
      break;
    }
    case "export": {
      const out = typeof flags.out === "string" ? flags.out : fail("Pass --out <file>.");
      const rows = await db.select().from(leads).where(matchPerson());
      const conversations = await conversationsOf(emailFlag());
      writeFileSync(out, JSON.stringify({ leads: rows, conversations }, null, 2), { encoding: "utf8", mode: 0o600 });
      console.info(`Wrote ${rows.length} lead(s) and ${conversations.length} conversation(s) to ${out}.`);
      for (const r of rows) await audit(db, "dsar_export", r.id);
      if (conversations.length > 0) await audit(db, "dsar_export_mail", null, { count: conversations.length });
      break;
    }
    case "delete": {
      const id = requireId();
      if (flags.confirm !== true) fail("Deleting is permanent. Re-run with --confirm.");
      const deleted = await db.delete(leads).where(eq(leads.id, id)).returning({ id: leads.id });
      if (!deleted[0]) fail("No lead with that id.");
      await audit(db, "dsar_delete", id);
      console.info("Lead deleted. The audit log keeps only the id, time and operator.");
      console.info("Their email conversations, if any: pnpm leads:dsar delete-mail --email <address> --confirm");
      break;
    }
    case "delete-mail": {
      const email = emailFlag() ?? fail("Pass --email (the address they wrote from).");
      if (flags.confirm !== true) fail("Deleting is permanent. Re-run with --confirm.");
      const deleted = await db
        .delete(mailThreads)
        .where(eq(mailThreads.correspondent, email))
        .returning({ id: mailThreads.id });
      await audit(db, "dsar_delete_mail", null, { count: deleted.length });
      console.info(`${deleted.length} conversation(s) deleted, with their messages.`);
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
      fail("Usage: leads:dsar find|export|delete|delete-mail|status (see the header of scripts/leads-dsar.ts).");
  }
} finally {
  await pool.end();
}
