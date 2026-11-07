import { sql } from "drizzle-orm";
import {
  bigserial,
  check,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/** Sales pipeline stage, updated by the operator CLI (no admin UI in v1). */
export const leadStatus = pgEnum("lead_status", [
  "new",
  "contacted",
  "qualified",
  "proposal",
  "won",
  "lost",
]);

/**
 * Owner-alert delivery state. The lead row itself is the outbox: a valid lead is
 * committed with `pending`, and delivery/retries move it to `sent` or `failed`.
 * `suppressed` = stored but deliberately not alerted (honeypot hit), so a real
 * person who tripped the honeypot is never silently lost.
 */
export const notificationStatus = pgEnum("notification_status", [
  "pending",
  "sent",
  "failed",
  "suppressed",
]);

export const leadGoal = pgEnum("lead_goal", [
  "awareness",
  "consistency",
  "enquiries",
  "other",
  "unsure",
]);

export const leadVolume = pgEnum("lead_volume", ["unsure", "4", "8", "12plus"]);

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    /** Client-generated idempotency key; a retried submission maps to the same lead. */
    requestId: uuid("request_id").notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),

    name: text("name").notNull(),
    businessName: text("business_name").notNull(),
    city: text("city").notNull(),
    email: text("email"),
    phone: text("phone"),
    profileUrl: text("profile_url"),
    goal: leadGoal("goal").notNull(),
    volume: leadVolume("volume"),
    message: text("message"),
    sourcePath: text("source_path"),
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    privacyNoticeVersion: text("privacy_notice_version").notNull(),

    status: leadStatus("status").notNull().default("new"),
    /** Why the lead is treated as likely spam (e.g. "honeypot"); null for normal leads. */
    spamReason: text("spam_reason"),
    /** SHA-256 of the normalised contact + message, for duplicate detection without a request id. */
    dedupeKey: text("dedupe_key").notNull(),

    notificationStatus: notificationStatus("notification_status").notNull().default("pending"),
    notificationAttempts: integer("notification_attempts").notNull().default(0),
    lastNotificationAt: timestamp("last_notification_at", { withTimezone: true }),
    notificationNextAttemptAt: timestamp("notification_next_attempt_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    notificationLockedUntil: timestamp("notification_locked_until", { withTimezone: true }),
    /** Short error code from the last failed attempt; never provider payloads or PII. */
    notificationLastError: text("notification_last_error"),
  },
  (t) => [
    index("leads_created_at_idx").on(t.createdAt),
    index("leads_dedupe_idx").on(t.dedupeKey, t.createdAt),
    index("leads_notification_due_idx").on(t.notificationStatus, t.notificationNextAttemptAt),
    check("leads_contact_present", sql`${t.email} is not null or ${t.phone} is not null`),
    check("leads_name_len", sql`char_length(${t.name}) between 2 and 100`),
    check("leads_business_len", sql`char_length(${t.businessName}) between 2 and 120`),
    check("leads_city_len", sql`char_length(${t.city}) between 2 and 100`),
    check("leads_email_len", sql`${t.email} is null or char_length(${t.email}) <= 254`),
    check("leads_phone_len", sql`${t.phone} is null or char_length(${t.phone}) <= 40`),
    check("leads_profile_len", sql`${t.profileUrl} is null or char_length(${t.profileUrl}) <= 250`),
    check("leads_message_len", sql`${t.message} is null or char_length(${t.message}) <= 2000`),
    check("leads_attempts_nonneg", sql`${t.notificationAttempts} >= 0`),
  ],
);

/**
 * Fixed-window rate-limit counters. Keys are salted, daily-rotated HMACs of the
 * client address; raw IPs are never stored.
 */
export const rateLimitBuckets = pgTable(
  "rate_limit_buckets",
  {
    key: text("key").primaryKey(),
    windowStart: timestamp("window_start", { withTimezone: true }).notNull(),
    count: integer("count").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  },
  (t) => [index("rate_limit_expires_idx").on(t.expiresAt)],
);

/**
 * Operator actions on leads (export, deletion, status change, manual retry).
 * Holds no personal data, so it survives a lead's deletion as proof it happened.
 */
export const leadAuditLog = pgTable(
  "lead_audit_log",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    at: timestamp("at", { withTimezone: true }).notNull().defaultNow(),
    action: text("action").notNull(),
    leadId: uuid("lead_id"),
    actor: text("actor").notNull(),
    details: jsonb("details").$type<Record<string, string | number | boolean | null>>(),
  },
  (t) => [index("lead_audit_lead_idx").on(t.leadId), index("lead_audit_at_idx").on(t.at)],
);

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
