CREATE TYPE "public"."lead_goal" AS ENUM('awareness', 'consistency', 'enquiries', 'other', 'unsure');--> statement-breakpoint
CREATE TYPE "public"."lead_status" AS ENUM('new', 'contacted', 'qualified', 'proposal', 'won', 'lost');--> statement-breakpoint
CREATE TYPE "public"."lead_volume" AS ENUM('unsure', '4', '8', '12plus');--> statement-breakpoint
CREATE TYPE "public"."notification_status" AS ENUM('pending', 'sent', 'failed', 'suppressed');--> statement-breakpoint
CREATE TABLE "lead_audit_log" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"at" timestamp with time zone DEFAULT now() NOT NULL,
	"action" text NOT NULL,
	"lead_id" uuid,
	"actor" text NOT NULL,
	"details" jsonb
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"business_name" text NOT NULL,
	"city" text NOT NULL,
	"email" text,
	"phone" text,
	"profile_url" text,
	"goal" "lead_goal" NOT NULL,
	"volume" "lead_volume",
	"message" text,
	"source_path" text,
	"utm_source" text,
	"utm_medium" text,
	"utm_campaign" text,
	"privacy_notice_version" text NOT NULL,
	"status" "lead_status" DEFAULT 'new' NOT NULL,
	"spam_reason" text,
	"dedupe_key" text NOT NULL,
	"notification_status" "notification_status" DEFAULT 'pending' NOT NULL,
	"notification_attempts" integer DEFAULT 0 NOT NULL,
	"last_notification_at" timestamp with time zone,
	"notification_next_attempt_at" timestamp with time zone DEFAULT now() NOT NULL,
	"notification_locked_until" timestamp with time zone,
	"notification_last_error" text,
	CONSTRAINT "leads_request_id_unique" UNIQUE("request_id"),
	CONSTRAINT "leads_contact_present" CHECK ("leads"."email" is not null or "leads"."phone" is not null),
	CONSTRAINT "leads_name_len" CHECK (char_length("leads"."name") between 2 and 100),
	CONSTRAINT "leads_business_len" CHECK (char_length("leads"."business_name") between 2 and 120),
	CONSTRAINT "leads_city_len" CHECK (char_length("leads"."city") between 2 and 100),
	CONSTRAINT "leads_email_len" CHECK ("leads"."email" is null or char_length("leads"."email") <= 254),
	CONSTRAINT "leads_phone_len" CHECK ("leads"."phone" is null or char_length("leads"."phone") <= 40),
	CONSTRAINT "leads_profile_len" CHECK ("leads"."profile_url" is null or char_length("leads"."profile_url") <= 250),
	CONSTRAINT "leads_message_len" CHECK ("leads"."message" is null or char_length("leads"."message") <= 2000),
	CONSTRAINT "leads_attempts_nonneg" CHECK ("leads"."notification_attempts" >= 0)
);
--> statement-breakpoint
CREATE TABLE "rate_limit_buckets" (
	"key" text PRIMARY KEY NOT NULL,
	"window_start" timestamp with time zone NOT NULL,
	"count" integer NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE INDEX "lead_audit_lead_idx" ON "lead_audit_log" USING btree ("lead_id");--> statement-breakpoint
CREATE INDEX "lead_audit_at_idx" ON "lead_audit_log" USING btree ("at");--> statement-breakpoint
CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "leads_dedupe_idx" ON "leads" USING btree ("dedupe_key","created_at");--> statement-breakpoint
CREATE INDEX "leads_notification_due_idx" ON "leads" USING btree ("notification_status","notification_next_attempt_at");--> statement-breakpoint
CREATE INDEX "rate_limit_expires_idx" ON "rate_limit_buckets" USING btree ("expires_at");