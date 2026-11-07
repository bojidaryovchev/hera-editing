import { createHash, randomUUID } from "node:crypto";
import { and, eq, gt, sql } from "drizzle-orm";
import { leads } from "@/db/schema";
import type { Db } from "@/lib/db/client";
import { errorCode, logEvent } from "@/lib/log";
import { LEAD_RULES, SHARED_RULES, consumeRateLimit, purgeExpiredRateLimits } from "@/lib/rate-limit";
import { rateLimitSubject } from "@/lib/security/request";
import { validateLead, type LeadFieldErrors, type LeadInput } from "@/lib/validation/lead";

/** Identical submissions (same contact and message) inside this window count as one lead. */
export const DEDUPE_WINDOW_MINUTES = 10;

export type SubmitLeadResult =
  | { status: "created"; id: string; suppressed: boolean }
  | { status: "duplicate"; id: string }
  | { status: "invalid"; errors: LeadFieldErrors }
  | { status: "rate_limited"; retryAfterSeconds: number }
  | { status: "verification_failed" }
  | { status: "unavailable" };

export type SubmitLeadContext = {
  db: Db;
  clientAddress: string | null;
  rateLimitSalt: string;
  privacyNoticeVersion: string;
  /** Value of the invisible honeypot field, if the request had one. */
  honeypot?: unknown;
  /** Optional human verification (Turnstile), only when configured. */
  verifyHuman?: (() => Promise<boolean>) | null;
  /** Called after the lead is durably committed; schedules the owner alert. */
  scheduleNotification?: (leadId: string) => void;
  now?: Date;
};

export function dedupeKeyFor(lead: LeadInput): string {
  const parts = [
    lead.email?.toLowerCase() ?? "",
    lead.phone?.replace(/\D/g, "") ?? "",
    lead.name.toLowerCase(),
    lead.businessName.toLowerCase(),
    lead.city.toLowerCase(),
    lead.message ?? "",
  ];
  return createHash("sha256").update(parts.join("\u0000")).digest("hex");
}

export function isHoneypotTripped(value: unknown): boolean {
  if (value === undefined || value === null || value === false) return false;
  return typeof value === "string" ? value.trim().length > 0 : true;
}

/**
 * The quote-request pipeline: validate → (verify) → rate limit → idempotent, durable
 * insert → schedule the owner alert after commit. Success is only ever returned for
 * a lead that is committed in the database.
 */
export async function submitLead(raw: unknown, ctx: SubmitLeadContext): Promise<SubmitLeadResult> {
  const validation = validateLead(raw);
  if (!validation.ok) return { status: "invalid", errors: validation.errors };
  const lead = validation.data;
  const now = ctx.now ?? new Date();

  if (ctx.verifyHuman && !(await ctx.verifyHuman())) return { status: "verification_failed" };

  const spamReason = isHoneypotTripped(ctx.honeypot) ? "honeypot" : null;

  try {
    const subject = rateLimitSubject(ctx.clientAddress, ctx.rateLimitSalt, now);
    const decision = await consumeRateLimit(ctx.db, subject, ctx.clientAddress ? LEAD_RULES : SHARED_RULES, now);
    if (!decision.allowed) {
      logEvent("warn", "lead_rate_limited", { scope: ctx.clientAddress ? "client" : "shared" });
      return { status: "rate_limited", retryAfterSeconds: decision.retryAfterSeconds };
    }

    const requestId = lead.requestId ?? randomUUID();
    const dedupeKey = dedupeKeyFor(lead);

    const outcome = await ctx.db.transaction(async (tx) => {
      // Serialise identical submissions so two concurrent double-clicks cannot both insert.
      await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${dedupeKey}, 0))`);

      const sameRequest = await tx.select({ id: leads.id }).from(leads).where(eq(leads.requestId, requestId)).limit(1);
      if (sameRequest[0]) return { status: "duplicate", id: sameRequest[0].id } as const;

      const recent = await tx
        .select({ id: leads.id })
        .from(leads)
        .where(
          and(
            eq(leads.dedupeKey, dedupeKey),
            gt(leads.createdAt, sql`now() - make_interval(mins => ${DEDUPE_WINDOW_MINUTES})`),
          ),
        )
        .limit(1);
      if (recent[0]) return { status: "duplicate", id: recent[0].id } as const;

      const inserted = await tx
        .insert(leads)
        .values({
          requestId,
          name: lead.name,
          businessName: lead.businessName,
          city: lead.city,
          email: lead.email,
          phone: lead.phone,
          profileUrl: lead.profileUrl,
          goal: lead.goal,
          volume: lead.volume,
          message: lead.message,
          sourcePath: lead.sourcePath,
          utmSource: lead.utm.source,
          utmMedium: lead.utm.medium,
          utmCampaign: lead.utm.campaign,
          privacyNoticeVersion: ctx.privacyNoticeVersion,
          spamReason,
          dedupeKey,
          notificationStatus: spamReason ? "suppressed" : "pending",
        })
        .onConflictDoNothing({ target: leads.requestId })
        .returning({ id: leads.id });
      if (inserted[0]) return { status: "created", id: inserted[0].id, suppressed: spamReason !== null } as const;

      const raced = await tx.select({ id: leads.id }).from(leads).where(eq(leads.requestId, requestId)).limit(1);
      if (raced[0]) return { status: "duplicate", id: raced[0].id } as const;
      throw new Error("lead_insert_conflict");
    });

    // From here the lead is committed: success is truthful whatever happens to the alert.
    if (outcome.status === "created") {
      logEvent("info", "lead_created", { leadId: outcome.id, suppressed: outcome.suppressed });
      if (!outcome.suppressed) ctx.scheduleNotification?.(outcome.id);
    } else {
      logEvent("info", "lead_duplicate", { leadId: outcome.id, duplicate: true });
    }

    if (Math.random() < 0.02) void purgeExpiredRateLimits(ctx.db, now).catch(() => {});
    return outcome;
  } catch (error) {
    logEvent("error", "lead_submission_unavailable", { code: errorCode(error) });
    return { status: "unavailable" };
  }
}
