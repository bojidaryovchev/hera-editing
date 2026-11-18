import { and, asc, eq, inArray, isNull, lt, lte, or, sql } from "drizzle-orm";
import { leads, type Lead } from "@/db/schema";
import type { Db } from "@/lib/db/client";
import { errorCode, logEvent } from "@/lib/log";
import { MailDeliveryError, type Mailer } from "@/lib/mail";
import { buildAlert } from "./email";

/** Attempts before a notification is marked failed (an operator can still retry it). */
export const MAX_NOTIFICATION_ATTEMPTS = 6;

/** Delay before attempt n+1, by attempts made so far: 1 min, 5 min, 15 min, 1 h, 6 h. */
const BACKOFF_SECONDS = [60, 5 * 60, 15 * 60, 60 * 60, 6 * 60 * 60];

/** How long a sender holds a lead before another process may try it. */
const LOCK_SECONDS = 120;

export type NotificationDeps = {
  db: Db;
  mailer: Mailer;
  to: string | null;
  from: string;
  brandName: string | null;
};

export type DeliveryOutcome = "sent" | "retry_scheduled" | "failed" | "skipped";

/**
 * Send the owner alert for one lead, at most once concurrently: the row is claimed
 * with a short lock, so the post-response attempt, the cron and the CLI never race.
 */
export async function deliverLeadNotification(
  deps: NotificationDeps,
  leadId: string,
  options: { includeFailed?: boolean } = {},
): Promise<DeliveryOutcome> {
  const statuses = options.includeFailed ? (["pending", "failed"] as const) : (["pending"] as const);
  const claimed = await deps.db
    .update(leads)
    .set({
      notificationLockedUntil: sql`now() + make_interval(secs => ${LOCK_SECONDS})`,
      notificationAttempts: sql`${leads.notificationAttempts} + 1`,
      lastNotificationAt: sql`now()`,
      updatedAt: sql`now()`,
    })
    .where(
      and(
        eq(leads.id, leadId),
        inArray(leads.notificationStatus, [...statuses]),
        or(isNull(leads.notificationLockedUntil), lt(leads.notificationLockedUntil, sql`now()`)),
      ),
    )
    .returning();

  const lead = claimed[0];
  if (!lead) return "skipped";

  try {
    if (!deps.to) throw new MailDeliveryError("no_recipient_configured");
    const alert = buildAlert(lead, { brandName: deps.brandName });
    await deps.mailer.send({
      to: deps.to,
      from: deps.from,
      subject: alert.subject,
      text: alert.text,
      html: alert.html,
      replyTo: lead.email,
      idempotencyKey: `lead-alert-${lead.id}`,
    });
    await deps.db
      .update(leads)
      .set({
        notificationStatus: "sent",
        notificationLockedUntil: null,
        notificationLastError: null,
        updatedAt: sql`now()`,
      })
      .where(eq(leads.id, lead.id));
    logEvent("info", "lead_notification_sent", {
      leadId: lead.id,
      attempts: lead.notificationAttempts,
      provider: deps.mailer.provider,
    });
    return "sent";
  } catch (error) {
    return recordFailure(
      deps.db,
      lead,
      error instanceof MailDeliveryError ? error.code : errorCode(error, "mail_error"),
    );
  }
}

async function recordFailure(db: Db, lead: Lead, code: string): Promise<DeliveryOutcome> {
  const attempts = lead.notificationAttempts;
  const exhausted = attempts >= MAX_NOTIFICATION_ATTEMPTS;
  const delay = BACKOFF_SECONDS[Math.min(attempts - 1, BACKOFF_SECONDS.length - 1)] ?? 60;
  await db
    .update(leads)
    .set({
      notificationStatus: exhausted ? "failed" : "pending",
      notificationLockedUntil: null,
      notificationLastError: code.slice(0, 60),
      notificationNextAttemptAt: sql`now() + make_interval(secs => ${delay})`,
      updatedAt: sql`now()`,
    })
    .where(eq(leads.id, lead.id));
  logEvent(exhausted ? "error" : "warn", exhausted ? "lead_notification_failed" : "lead_notification_retry_scheduled", {
    leadId: lead.id,
    attempts,
    code,
  });
  return exhausted ? "failed" : "retry_scheduled";
}

export type RetryReport = { processed: number; sent: number; retryScheduled: number; failed: number; skipped: number };

/** Deliver every notification that is due (used by the CLI and the protected cron route). */
export async function processDueNotifications(
  deps: NotificationDeps,
  options: { limit?: number; includeFailed?: boolean } = {},
): Promise<RetryReport> {
  const limit = options.limit ?? 50;
  const statuses = options.includeFailed ? (["pending", "failed"] as const) : (["pending"] as const);
  const due = await deps.db
    .select({ id: leads.id })
    .from(leads)
    .where(
      and(
        inArray(leads.notificationStatus, [...statuses]),
        options.includeFailed ? sql`true` : lte(leads.notificationNextAttemptAt, sql`now()`),
        or(isNull(leads.notificationLockedUntil), lt(leads.notificationLockedUntil, sql`now()`)),
      ),
    )
    .orderBy(asc(leads.createdAt))
    .limit(limit);

  const report: RetryReport = { processed: 0, sent: 0, retryScheduled: 0, failed: 0, skipped: 0 };
  for (const { id } of due) {
    const outcome = await deliverLeadNotification(deps, id, { includeFailed: options.includeFailed });
    report.processed += 1;
    if (outcome === "sent") report.sent += 1;
    else if (outcome === "retry_scheduled") report.retryScheduled += 1;
    else if (outcome === "failed") report.failed += 1;
    else report.skipped += 1;
  }
  return report;
}
