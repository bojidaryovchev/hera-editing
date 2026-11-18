import { sql } from "drizzle-orm";
import { bigserial, check, index, integer, jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/** Sales pipeline stage, set from the admin panel (decision L32) or the operator CLI. */
export const leadStatus = pgEnum("lead_status", ["new", "contacted", "qualified", "proposal", "won", "lost"]);

/**
 * Owner-alert delivery state. The lead row itself is the outbox: a valid lead is
 * committed with `pending`, and delivery/retries move it to `sent` or `failed`.
 * `suppressed` = stored but deliberately not alerted (honeypot hit), so a real
 * person who tripped the honeypot is never silently lost.
 */
export const notificationStatus = pgEnum("notification_status", ["pending", "sent", "failed", "suppressed"]);

export const leadGoal = pgEnum("lead_goal", ["awareness", "consistency", "enquiries", "other", "unsure"]);

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
    notificationNextAttemptAt: timestamp("notification_next_attempt_at", { withTimezone: true }).notNull().defaultNow(),
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

/*
 * The contact@ mailbox (decision L32). Every message to the mailbox address arrives through Resend's webhook and is
 * recorded here first, so it can be answered from the admin panel and the answer leaves as contact@; replies are
 * recorded after they are sent. A thread is one correspondent: a message from anyone else starts its own thread.
 */
export const mailDirection = pgEnum("mail_direction", ["in", "out"]);
export const mailThreadStatus = pgEnum("mail_thread_status", ["open", "done"]);

export type MailAttachmentInfo = { filename: string; size: number; contentType: string };

export const mailThreads = pgTable(
  "mail_threads",
  {
    /** Eight uppercase hex characters: short enough to read out from a URL. */
    id: text("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    lastMessageAt: timestamp("last_message_at", { withTimezone: true }).notNull().defaultNow(),
    subject: text("subject").notNull(),
    /** The subject without reply and forward prefixes, lowercased: how a fresh message about the same thing joins. */
    subjectKey: text("subject_key").notNull(),
    /**
     * The ONE mailbox the first message's From named, parsed and lowercased (src/lib/mailbox/address.ts), never the
     * raw header. A From that did not parse is kept flattened for display and can never be answered from the panel.
     */
    correspondent: text("correspondent").notNull(),
    correspondentName: text("correspondent_name"),
    status: mailThreadStatus("status").notNull().default("open"),
    /** The enquiry this conversation is about, when it started from the enquiries screen. */
    leadId: uuid("lead_id").references(() => leads.id, { onDelete: "set null" }),
  },
  (t) => [
    index("mail_threads_last_idx").on(t.lastMessageAt),
    index("mail_threads_match_idx").on(t.correspondent, t.status, t.subjectKey),
    index("mail_threads_lead_idx").on(t.leadId),
    check("mail_threads_id_shape", sql`${t.id} ~ '^[0-9A-F]{8}$'`),
  ],
);

export const mailMessages = pgTable(
  "mail_messages",
  {
    /** Resend's id for the message (received or sent): a retried webhook can never store it twice. */
    id: text("id").primaryKey(),
    threadId: text("thread_id")
      .notNull()
      .references(() => mailThreads.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
    direction: mailDirection("direction").notNull(),
    fromAddress: text("from_address").notNull(),
    /** Stored as one header-shaped string, because that is what it is. */
    toAddresses: text("to_addresses").notNull(),
    subject: text("subject").notNull(),
    bodyText: text("body_text"),
    /** Kept as received; the panel never renders it, only its flattened text (stored-XSS rule). */
    bodyHtml: text("body_html"),
    /** The RFC 5322 Message-ID, and the In-Reply-To it carried: how replies find their thread. */
    messageId: text("message_id"),
    inReplyTo: text("in_reply_to"),
    attachments: jsonb("attachments").$type<MailAttachmentInfo[]>(),
  },
  (t) => [
    index("mail_messages_thread_idx").on(t.threadId, t.createdAt),
    index("mail_messages_message_id_idx").on(t.messageId),
    check("mail_messages_text_len", sql`${t.bodyText} is null or char_length(${t.bodyText}) <= 200000`),
    check("mail_messages_html_len", sql`${t.bodyHtml} is null or char_length(${t.bodyHtml}) <= 500000`),
  ],
);

export type MailThread = typeof mailThreads.$inferSelect;
export type MailMessageRow = typeof mailMessages.$inferSelect;
