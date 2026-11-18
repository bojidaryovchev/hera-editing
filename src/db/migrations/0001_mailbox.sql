CREATE TYPE "public"."mail_direction" AS ENUM('in', 'out');--> statement-breakpoint
CREATE TYPE "public"."mail_thread_status" AS ENUM('open', 'done');--> statement-breakpoint
CREATE TABLE "mail_messages" (
	"id" text PRIMARY KEY NOT NULL,
	"thread_id" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"direction" "mail_direction" NOT NULL,
	"from_address" text NOT NULL,
	"to_addresses" text NOT NULL,
	"subject" text NOT NULL,
	"body_text" text,
	"body_html" text,
	"message_id" text,
	"in_reply_to" text,
	"attachments" jsonb,
	CONSTRAINT "mail_messages_text_len" CHECK ("mail_messages"."body_text" is null or char_length("mail_messages"."body_text") <= 200000),
	CONSTRAINT "mail_messages_html_len" CHECK ("mail_messages"."body_html" is null or char_length("mail_messages"."body_html") <= 500000)
);
--> statement-breakpoint
CREATE TABLE "mail_threads" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_message_at" timestamp with time zone DEFAULT now() NOT NULL,
	"subject" text NOT NULL,
	"subject_key" text NOT NULL,
	"correspondent" text NOT NULL,
	"correspondent_name" text,
	"status" "mail_thread_status" DEFAULT 'open' NOT NULL,
	"lead_id" uuid,
	CONSTRAINT "mail_threads_id_shape" CHECK ("mail_threads"."id" ~ '^[0-9A-F]{8}$')
);
--> statement-breakpoint
ALTER TABLE "mail_messages" ADD CONSTRAINT "mail_messages_thread_id_mail_threads_id_fk" FOREIGN KEY ("thread_id") REFERENCES "public"."mail_threads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mail_threads" ADD CONSTRAINT "mail_threads_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "mail_messages_thread_idx" ON "mail_messages" USING btree ("thread_id","created_at");--> statement-breakpoint
CREATE INDEX "mail_messages_message_id_idx" ON "mail_messages" USING btree ("message_id");--> statement-breakpoint
CREATE INDEX "mail_threads_last_idx" ON "mail_threads" USING btree ("last_message_at");--> statement-breakpoint
CREATE INDEX "mail_threads_match_idx" ON "mail_threads" USING btree ("correspondent","status","subject_key");--> statement-breakpoint
CREATE INDEX "mail_threads_lead_idx" ON "mail_threads" USING btree ("lead_id");