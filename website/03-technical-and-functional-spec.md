# Technical and functional implementation contract

## Stack and deployment
- **Next.js** stable supported release with **App Router**, TypeScript strict, React server components by default.
- **Tailwind CSS**, design tokens from design-system doc, modular accessible components. Do not introduce heavyweight animation/3D/carousel libraries unless justified and measured.
- **PostgreSQL** via `DATABASE_URL`, **Drizzle ORM** for schema/migrations. One minimal database used to durably capture leads and rate-limit submissions; don't add client account or CRM platform.
- **Zod** for shared validation, React Hook Form or native form with controlled client errors (choose smallest reliable solution).
- Contact email via **Resend or SMTP abstraction** behind environment variables; production notification destination configurable. Never expose credentials client-side.
- Host on Vercel or compatible Node runtime; use environment configuration. DB must be EU-region when feasible; actual transfers/processors recorded in privacy policy. Google Search Console ownership separately configured.
- Content for services/packages/FAQ/team/cases in typed data/MDX stored in repo; **no CMS admin panel** in v1. Cases source is explicitly approved content. Use server-side filtering so draft work never leaks.

## Suggested repository structure
```
app/
  (marketing)/page.tsx
  (marketing)/upravlenie-na-sotsialni-mrezhi/page.tsx
  (marketing)/video-sadarzhanie-za-biznes/page.tsx
  (marketing)/paketi/page.tsx
  (marketing)/rabota/page.tsx              # conditional publication
  (marketing)/rabota/[slug]/page.tsx        # conditional
  (marketing)/za-nas/page.tsx
  (marketing)/kontakti/page.tsx
  (marketing)/poveritelnost/page.tsx
  (marketing)/biskvitki/page.tsx
  api/leads/route.ts
  sitemap.ts
  robots.ts
components/{layout,media,marketing,forms,privacy}/
content/{services,packages,faq,projects}/
lib/{validation,db,mail,rate-limit,config,seo}/
db/{schema,migrations}/
tests/{unit,integration,e2e}/
public/{brand,images,posters,media}/
```
This is an illustrative layout; prefer conventions for actual installed Next.js version.

## Backend lead request contract
**Endpoint:** `POST /api/leads` (`application/json`) or equivalent server action with the same validations/requirements.

Input:
```
{
  "name": "string",
  "businessName": "string",
  "city": "string",
  "email": "string|null",
  "phone": "string|null",
  "profileUrl": "string|null",
  "goal": "awareness|consistency|enquiries|other|unsure",
  "volume": "unsure|4|8|12plus|null",
  "message": "string|null",
  "privacyNoticeAcknowledged": true,
  "sourcePath": "string|null",
  "utm": { "source": "...", "medium": "...", "campaign": "..." },
  "requestId": "UUID"
}
```
Server normalize, trim, length-cap; reject injection-like URLs and control characters where relevant; no raw HTML interpolation. Require one phone or email. Reject non-BG UI if not actual multilingual support. Ignore arbitrary client price fields. Validation returns field errors (400), 429 rate-limited (friendly message), 201 `{ id, ok: true }`, server error 500/503 with neutral message. Never include private details in error replies.

## Lead persistence and delivery reliability
DB `leads`: `id uuid PK`, `created_at timestamptz`, `name`, `business_name`, `city`, `email nullable`, `phone nullable`, `profile_url nullable`, `goal`, `volume nullable`, `message nullable`, `source_path nullable`, `utm_source/medium/campaign nullable`, `status enum('new','contacted','qualified','proposal','won','lost') default 'new'`, `notification_status('pending','sent','failed')`, `notification_attempts`, `last_notification_at`, `privacy_notice_version`. Unique `request_id` index to dedupe retries (either use ID as request ID or separate column). Add `lead_delivery` outbox if needed.

**Transaction logic:** validate → anti-spam → durable insert (idempotent on `requestId`) → create email notification job/outbox → acknowledge success after DB commit → attempt email and record status; failed emails must be retryable. **Never silently lose a valid lead because mail service is unavailable.** If DB unavailable, return failure, don't show success. Implement a lightweight secure CLI/cron export/retry path, not a public admin UI. DB retention policy decided with owner; sample cleanup job optional but never auto-delete without approved retention rules.

## Spam and abuse
- Invisible honeypot field: quietly suppress bot-only obvious hits; avoid discriminating legitimate assistive users.
- Basic rate limit per hashed request source/IP (salted rotating hash, short TTL) or compatible managed edge mechanism, no raw IP in application logs. Trust proxy headers only when platform supplies them reliably.
- Optional Cloudflare Turnstile only after key config, server-verified if used. Accessible no-CAPTCHA fallback if possible.
- CSRF/origin policy for same-site POST; HTTPS; request size limit <8KB; URL sanitization; escaping/parameterized DB queries; safe logging.
- No unverified third-party 'free form' endpoint, client-side email credentials, unsecured `/api/leads` GET list or public database browser.

## Data and security
- DB access server-only, least privilege; email and database secrets kept in deployment env. Audit dependencies and avoid leaking PII in analytics/events.
- Privacy policy reviewed with actual processors, region and retention. Support DSAR exports/deletion by a documented manual operator procedure. Logs pseudonymized/redacted.
- No customer login or staff login in v1. Use protected operational DB/CLI access only.

## SEO and structured data
- Site-wide correct `lang=bg`; translations not included.
- Every page unique server-rendered title, description, canonical, OpenGraph and Twitter card metadata with brand/site URL from verified config.
- `robots.ts`, `sitemap.ts`, noindex for error/draft/private routes; correct 404 statuses; no index of empty work page.
- Organization JSON-LD only with accurate name/URL/contact/socials; LocalBusiness conditional on real public-eligible address/service area. Breadcrumbs on internal pages if valid.
- Linkable HTML content without JS. Clean headings H1 once per page; readable copy; video/portfolio proper posters/captions and optional `VideoObject` only on genuine videos.
- Never invent star ratings, review counts, awards or structured-data claims.

## Analytics
- Event names (no personal fields): `cta_quote_click` (sourcePage), `lead_form_view`, `lead_form_attempt`, `lead_form_success`, `lead_form_error` (code only), `portfolio_video_play`, `package_interest` (tier).
- Optional GA4/GTM integration only after config and consent; defaults off. Set consent denied before loading nonessential tags, provide preferences and reject path. No PII in URLs or event properties.
- Server-side lead records are source of truth for form success; GA4 missing events must not affect lead persistence.

## Ops and environment variables
```
NEXT_PUBLIC_SITE_URL=<real HTTPS URL>
NEXT_PUBLIC_BRAND_NAME=<real company/agency brand>
NEXT_PUBLIC_CONTACT_EMAIL=<verified public email>
NEXT_PUBLIC_CONTACT_PHONE=<verified public phone>
DATABASE_URL=<secret Postgres URL>
NOTIFICATION_EMAIL_TO=<verified inbox>
MAIL_PROVIDER=resend|smtp|dev
RESEND_API_KEY=<secret if used>
# or SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS/SMTP_FROM
ANALYTICS_MEASUREMENT_ID=<optional; disabled without consent>
RATE_LIMIT_SALT=<random secret>
TURNSTILE_SITE_KEY=<optional>
TURNSTILE_SECRET_KEY=<optional>
```
Supply `.env.example` only with placeholders. Config validator fails fast when required production env missing; tests use isolated test DB and stub email transport; dev can run `MAIL_PROVIDER=dev` with safe explicit console preview (no live user PII logging in production).

## Media
Original footage uploaded to owned storage/CDN. Store lightweight site-ready masters/posters, not full raw recordings in git. Native lazy video players, poster with click-to-play, no 3rd-party embedded tracker without disclosure/consent. No copyrighted media or stock portrait passed as actual agency work.

## Observability and backups
Error reporting redacts PII; deployment alerts for failed form submissions, pending email outbox, DB connectivity; daily DB backups according to hosting policy. Document recovery and operator lead export in README. Basic uptime monitor optional; no need to implement monitoring product in app.

## Nonfunctional and engineering workflow
- Mobile-first, fast, WCAG 2.2 AA target; no layout shift from media; normalized URLs; no dead link.
- Unit tests Zod and pricing display config, integration tests Postgres/idempotency/outbox, Playwright form/SEO/navigation and responsive flows, axe accessibility smoke.
- CI: typecheck, lint, unit, integration with test DB, e2e with seeded real-looking **clearly fictional test data only** (never deployed as portfolio).
- Do not commit real customer info or secret config. All site content is editable without DB migrations.
