/**
 * Deliver owner alerts that are due (pending past their backoff), or every
 * undelivered one with --include-failed. Idempotent: delivered alerts are skipped.
 *   pnpm leads:retry [--include-failed] [--limit 50]
 * Uses the same mail settings as the site (MAIL_PROVIDER, NOTIFICATION_EMAIL_TO, …).
 */
import { parseServerEnv } from "../src/lib/config/env";
import { createDb } from "../src/lib/db/client";
import { processDueNotifications } from "../src/lib/leads/notifications";
import { createMailer } from "../src/lib/mail";
import { audit, parseArgs, requireDatabaseUrl } from "./lib/cli";

const { flags } = parseArgs(process.argv.slice(2));
const env = parseServerEnv(process.env);
const { db, pool } = createDb(requireDatabaseUrl(), { max: 1 });
try {
  const report = await processDueNotifications(
    { db, mailer: createMailer(env), to: env.notificationEmailTo, from: env.mail.from, brandName: env.brandName },
    { includeFailed: flags["include-failed"] === true, limit: Number(flags.limit ?? 50) },
  );
  await audit(db, "notification_retry", null, { ...report, includeFailed: flags["include-failed"] === true });
  console.info(
    `Processed ${report.processed}: sent ${report.sent}, retry scheduled ${report.retryScheduled}, failed ${report.failed}, skipped ${report.skipped}.`,
  );
  if (report.failed > 0 || report.retryScheduled > 0) process.exitCode = 1;
} finally {
  await pool.end();
}
