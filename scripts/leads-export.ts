/**
 * Export leads to a file for follow-up in the owner's own tools.
 *   pnpm leads:export --out leads.csv [--since 2026-11-01] [--format csv|json]
 * The file contains personal data: store it safely and delete it when done.
 */
import { writeFileSync } from "node:fs";
import { asc, gte } from "drizzle-orm";
import { leads } from "../src/db/schema";
import { createDb } from "../src/lib/db/client";
import { audit, csvCell, parseArgs, requireDatabaseUrl } from "./lib/cli";

const { flags } = parseArgs(process.argv.slice(2));
const out = typeof flags.out === "string" ? flags.out : null;
if (!out) {
  console.error(
    "Pass --out <file>. Exports are written to a file, never to the terminal (they contain personal data).",
  );
  process.exit(2);
}
const format = flags.format === "json" ? "json" : "csv";
const since = typeof flags.since === "string" ? new Date(`${flags.since}T00:00:00Z`) : null;
if (since && Number.isNaN(since.getTime())) {
  console.error("--since must be a date like 2026-11-01");
  process.exit(2);
}

const COLUMNS = [
  "id",
  "createdAt",
  "status",
  "name",
  "businessName",
  "city",
  "email",
  "phone",
  "profileUrl",
  "goal",
  "volume",
  "message",
  "sourcePath",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "notificationStatus",
  "spamReason",
  "privacyNoticeVersion",
] as const;

const { db, pool } = createDb(requireDatabaseUrl(), { max: 1 });
try {
  const rows = await db
    .select()
    .from(leads)
    .where(since ? gte(leads.createdAt, since) : undefined)
    .orderBy(asc(leads.createdAt));
  const picked = rows.map((r) => Object.fromEntries(COLUMNS.map((c) => [c, r[c]])));
  const body =
    format === "json"
      ? JSON.stringify(picked, null, 2)
      : [COLUMNS.join(","), ...picked.map((r) => COLUMNS.map((c) => csvCell(r[c])).join(","))].join("\r\n");
  writeFileSync(out, format === "csv" ? String.fromCharCode(0xfeff) + body : body, { encoding: "utf8", mode: 0o600 });
  await audit(db, "export", null, { count: rows.length, format, since: since ? since.toISOString() : null });
  console.info(`Exported ${rows.length} lead(s) to ${out}. It contains personal data: keep it private.`);
} finally {
  await pool.end();
}
