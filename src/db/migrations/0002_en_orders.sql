CREATE TYPE "public"."lead_locale" AS ENUM('bg', 'en');--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "city" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "goal" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "locale" "lead_locale" DEFAULT 'bg' NOT NULL;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "details" jsonb;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_bg_fields" CHECK ("leads"."locale" <> 'bg' or ("leads"."city" is not null and "leads"."goal" is not null));--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_en_fields" CHECK ("leads"."locale" <> 'en' or ("leads"."details" is not null and "leads"."email" is not null));--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_details_size" CHECK ("leads"."details" is null or octet_length("leads"."details"::text) <= 32768);