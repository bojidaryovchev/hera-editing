# Hera Editing website: implementation guide

The Bulgarian-language marketing site specified in [`../spec/README.md`](../spec/README.md) (the frozen v1.0
specification; do not edit it or the files listed in `spec/SHA256SUMS.txt`). This guide covers how the site is built, configured,
deployed and operated. What still blocks a production launch is listed in
[`release-checklist.md`](release-checklist.md).

**Status:** deployable as a **staging** site. Production builds refuse to run until the owner supplies the launch
inputs (domain, contacts, mail, secrets) and the lawyer-approved privacy notice.

## Architecture

- **Next.js 16 (App Router), TypeScript strict, React 19.** Every marketing page is prerendered at build time
  (static). `/kontakti` renders per request (it reads `?from=` and `?volume=` and issues a fresh request id), and the
  two API routes are dynamic.
- **Styling:** Tailwind CSS 4 tokens (`src/app/globals.css` `@theme`) plus plain component stylesheets in
  `src/styles/`. Fonts are self-hosted by `next/font` (Sofia Sans, Sofia Sans Extra Condensed, IBM Plex Mono).
- **Motion:** the homepage's scroll-driven edit uses GSAP, loaded after the page is interactive. With reduced
  motion, or if GSAP fails, the page shows the finished edit. The hero and the process hold still with CSS
  (`position: sticky` over room that `home.css` reserves), and ScrollTrigger never pins. The page therefore has its
  final length before GSAP arrives, and links to `#kak-rabotim`, reloads and Back land where they should (L39).
- **Content:** typed TypeScript modules in `src/content/` (no CMS). Every word on the site is there.
- **Leads:** Zod validation shared by the browser (React Hook Form) and the server; a server action and
  `POST /api/leads` share one pipeline (validation → anti-spam → durable insert → owner alert after commit).
  Postgres via Drizzle ORM; migrations in `src/db/migrations`.
- **Mail:** Resend, SMTP or a development outbox behind one interface (`src/lib/mail`).

```
src/
  app/                 routes, metadata files (sitemap, robots, opengraph-image), API routes
  components/          site shell, home, contact form, consent, portfolio
  content/             all copy, SEO titles, media, business facts, projects, legal texts
  db/                  Drizzle schema and SQL migrations
  lib/                 config validation, leads pipeline, mail, rate limit, security, SEO helpers, analytics
  styles/              component stylesheets
scripts/               operator CLIs (migrate, export, retry, DSAR), local database, e2e environment
tests/                 unit, integration (Postgres) and e2e (Playwright) tests
```

## Local development

Requirements: Node 22.12+ and pnpm 10 (`corepack enable`). No Docker: Postgres runs embedded from npm binaries.

```bash
pnpm install
pnpm db:dev                       # local Postgres in .data/pg on :54329, migrated; prints DATABASE_URL
# in a second terminal:
DATABASE_URL=postgres://postgres:postgres@127.0.0.1:54329/hera_dev MAIL_DEV_OUTBOX_DIR=.data/outbox pnpm dev
```

Copy [`../.env.example`](../.env.example) to `.env.local` for anything else. With `MAIL_PROVIDER=dev` (the
development default) owner alerts are written to the console or `MAIL_DEV_OUTBOX_DIR`, never sent.

## Commands

| Command                                                                       | What it does                                                                                                      |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `pnpm lint` / `pnpm typecheck` / `pnpm format:check`                          | ESLint, TypeScript, Prettier                                                                                      |
| `pnpm test`                                                                   | Unit and integration tests (integration starts a disposable Postgres)                                             |
| `pnpm test:e2e`                                                               | Builds two test variants, starts a disposable Postgres and four servers, runs Playwright (desktop, phone) and axe |
| `SCREENSHOTS=1 pnpm test:e2e responsive`                                      | Also saves full-page screenshots of every page at 7 widths to `qa/screenshots/full/`                              |
| `pnpm build` / `pnpm start`                                                   | Production build and server                                                                                       |
| `pnpm db:migrate`                                                             | Applies pending migrations to `DATABASE_URL`                                                                      |
| `pnpm leads:export --out leads.csv [--since 2026-11-01] [--format csv\|json]` | Exports leads for follow-up (personal data: store safely, delete when done)                                       |
| `pnpm leads:retry [--include-failed] [--limit 50]`                            | Delivers owner alerts that are due (or all undelivered); idempotent                                               |
| `pnpm leads:dsar find\|export\|delete\|status …`                              | Data-subject requests and pipeline status (see below; `--text` also searches English orders' briefs)              |

In CI the integration and e2e suites use `TEST_DATABASE_URL` (a database whose name contains `test`; it is wiped).

## Configuration

All variables are validated by `src/lib/config/env.ts`; errors name the variable, never the value.
[`../.env.example`](../.env.example) documents each one. Rules worth knowing:

- **Build time vs. run time.** Static pages read `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_BRAND_NAME`, the contacts,
  `ANALYTICS_*`, `PLACEHOLDER_MEDIA` and `APP_ENV` when they are built: rebuild after changing them. Database, mail,
  rate-limit, Turnstile and cron settings are read at run time.
- **Production refuses to build or start** (`next.config.ts`) without a valid https `NEXT_PUBLIC_SITE_URL`, the brand
  name, a public contact, `DATABASE_URL`, `NOTIFICATION_EMAIL_TO`, a real mail provider and `RATE_LIMIT_SALT`. It also
  refuses the draft privacy notice (`src/content/legal/privacy.ts`, `status: "approved"` once a lawyer signs off).
- **Environments:** `APP_ENV` (development, test, staging, production). On Vercel, production and preview
  deployments are detected without it. Everything but production is noindex and shows the "test version" bar.

## Deployment (Vercel or any Node host)

1. Create a Postgres database (EU region when feasible) and run `pnpm db:migrate` against it.
2. Set the production variables (see `.env.example`), including secrets: `DATABASE_URL`, `RATE_LIMIT_SALT`
   (32+ random characters), the mail provider's key, `CRON_SECRET`.
3. Deploy. `vercel.json` schedules `/api/cron/lead-notifications` daily at 06:00 UTC, the most Vercel's free plan
   allows; on a paid plan set it to every 15 minutes (`*/15 * * * *`). Elsewhere, call it from any scheduler with
   `Authorization: Bearer $CRON_SECRET`. It returns counts only, never lead data.
4. Verify Search Console ownership by DNS, or set `GOOGLE_SITE_VERIFICATION`, and submit `/sitemap.xml`.

### Staging, as running since 2026-11-18

- **Address:** `https://hera-editing.com` (www redirects to it), still in staging mode: noindex everywhere, the
  staging bar, labelled stock footage. It becomes production at launch by switching `APP_ENV` to `production`
  once the owner's inputs are in. `hera-editing-staging.vercel.app` and `hera-editing.vercel.app` serve the same
  build.
- **Vercel:** project `hera-editing` in the owner's personal team, deployed from every push to `main`. Functions
  run in Frankfurt (`fra1`, also in `vercel.json`), next to the database. Node comes from `engines`
  (`^22.12 || ^24`, so 24 on Vercel). Standard deployment protection: the site's addresses are public, preview
  builds and per-deploy URLs need a Vercel login. The free Hobby plan is for non-commercial use, so the live site
  needs Pro.
- **Settings** (names only; values live in Vercel): `APP_ENV=staging`, `NEXT_PUBLIC_SITE_URL`, `DATABASE_URL`,
  `RATE_LIMIT_SALT`, `CRON_SECRET`, `MAIL_PROVIDER=dev` and `ENABLE_EXPERIMENTAL_COREPACK=1`. While `MAIL_PROVIDER`
  is `dev`, enquiries are stored and their alert is logged redacted and retried. The corepack setting makes Vercel
  install with the pnpm version in `package.json`, so the 14-day release-age guard in `pnpm-workspace.yaml`
  applies there too.
- **Database:** Neon project `hera-editing-nonprod` (Frankfurt, Postgres 17), branch `staging`, database `hera`.
  The app connects through Neon's pooler (the `-pooler` host); migrations run with `pnpm db:migrate` over the
  direct connection string from the Neon console. Neon's proxy ignores the statement timeout the app sends when it
  connects, so the limit is set on the database: `ALTER DATABASE hera SET statement_timeout = '10s'` (do the same
  for production).
- **Mail:** `hera-editing.com` is registered with Resend (EU, sending and receiving; open and click tracking off),
  and its DNS records live in Vercel DNS: DKIM `resend._domainkey`, return path `send` (MX and SPF), relay
  `rsend`, receiving MX on the bare domain, and DMARC `p=none`.
- **Checked on the live site:** every page on desktop and phone (status, one H1, noindex, no sideways scroll, no
  console errors), headers, robots, sitemap, a test enquiry stored in the database, the retry job (refuses
  requests without its secret, processes with it) and `/api/health`. Lighthouse, mobile, from this machine
  (medians): home 93, contact 96, service 96, video 97, packages 94, about 97.

**Backups and recovery.** Neon keeps each branch's history for the project's restore window. For
`hera-editing-nonprod` that is 24 hours (the project's setting); choose production's window when that project is
created. Any moment inside the window can be restored into a new branch, without touching the live one.

- **Rehearsed on staging on 2026-11-18 at 22:37 UTC; it took under 20 seconds:**
  1. a snapshot of `staging` as it was at 12:00 UTC (in the console: Backup & restore; through the API, a snapshot
     with a `timestamp`), set to delete itself on 2026-11-21;
  2. the snapshot restored into a new branch, `restore-rehearsal`, without finalizing;
  3. read-only queries on the new branch showed the database as it was at 12:00. The same single lead was there
     (same id, same time), with 2 migrations instead of 3 and no `leads.locale` column, because migration 0002 was
     applied at about 21:30 UTC. `staging` was unchanged.

  The `restore-rehearsal` branch can be deleted in the console.

- **In an incident:**
  1. Find the last good moment, from the logs, `/api/health` and the leads' times.
  2. Restore that moment into a new branch as above, and check it with read-only queries.
  3. Then do one of two things:
     - copy the lost rows from it back into `staging`;
     - roll the whole database back by finalizing the restore (in the console, or `finalize_branch_restore`). The
       new branch takes over `staging`'s name and computes, so `DATABASE_URL` stays the same. The old branch is
       kept under a new name, and anything written after the restore point exists only there, so copy it over
       before deleting that branch.
  4. Once the window has passed, only the extra copy below can bring data back.
- **Extra copy:** `pg_dump --format=custom "$DATABASE_URL" > leads.dump`, restored with
  `pg_restore --clean -d "$DATABASE_URL" leads.dump`.

Leads are never deleted automatically: the retention period is an owner and legal decision.

## Leads: how an enquiry travels

1. The form validates in the browser and again on the server (same Zod schema). Honeypot, per-client rate limits
   (salted, hashed address; no raw IP is stored or logged), an origin check and an 8 KB body limit apply.
2. The lead is inserted idempotently on its `requestId` (a retry or double submit stores one lead). Success is
   shown only after the insert commits; if the database is down the visitor sees an error with the contact
   alternative, never success.
3. The owner alert is attempted after the response. If mail fails, the lead stays `pending` with a backoff; the cron
   route or `pnpm leads:retry` delivers it later, once.
4. **DSAR procedure:** find a person's leads (`leads:dsar find --email …`), export them (`export … --out person.json`)
   or delete one (`delete --id … --confirm`). Every action is recorded in `lead_audit_log` without personal data.

## Admin panel and the contact@ mailbox

Added on the owner's decision (design log L32), modelled on the owner's other sites (buy-a-vend, rent-a-vend).
Bulgarian, phone-first, never indexed (meta, `X-Robots-Tag`, robots.txt), with none of the public site's chrome.

- **Sign in** at `/admin/vhod` with `ADMIN_PASSWORD`. The session is a signed expiry in an http-only cookie scoped
  to `/admin` (12 hours, `ADMIN_SESSION_SECRET`); five attempts per quarter hour and twenty a day per client.
  Without the password every admin address answers 404. Every page and every server action checks the session
  itself.
- **Enquiries** (`/admin/zapitvaniya`): the stored quote requests with their pipeline status (new, in contact,
  qualified, proposal sent, won, lost; each change goes to `lead_audit_log`), and an answer by email from contact@,
  which opens a conversation tied to the enquiry.
- **Mailbox** (`/admin/poshta`): mail to `MAILBOX_ADDRESS` arrives through Resend's `email.received` webhook at
  `/api/inbound` and is recorded first (`mail_threads`, `mail_messages`), then copied to `NOTIFICATION_EMAIL_TO`
  when that is set (Reply-To the sender). The signature is checked over the exact bytes with a five-minute replay
  window; only mail to the mailbox's domain is recorded, never mail from it. The Resend account is shared with the
  owner's other sites, and Resend sends every inbound event to every webhook on it: each site keeps only its own. A thread is one sender: a reply joins by its References, or by subject on that sender's open thread.
  Answers go to the thread's parsed address only, with In-Reply-To and References, and are recorded after they are
  sent. Bodies are shown as text, never as the sender's HTML.
- **Setup:** verify the domain in Resend (sending and receiving; DNS in Vercel), add a webhook for `email.received`
  to `https://<site>/api/inbound`, then set `MAILBOX_ADDRESS`, `RESEND_WEBHOOK_SECRET`, `RESEND_API_KEY`,
  `MAIL_PROVIDER=resend` and `MAIL_FROM` (on the verified domain). While `MAIL_PROVIDER` is `dev` on staging or
  production, the panel records mail but refuses to send answers rather than pretend they left.
- **Data requests:** `pnpm leads:dsar find|export --email …` include the person's conversations;
  `pnpm leads:dsar delete-mail --email … --confirm` deletes them (deleting a lead leaves its conversations to this).

## English section (/en)

Remote video editing for business clients abroad (decisions L35–L38; plan in
[`strategy-remote-editing.md`](strategy-remote-editing.md)). Its own route group with its own root layout
(`src/app/(en)`, `lang="en"`), through the shared `SiteDocument` with `locale="en"`: the same fonts, stylesheet,
staging bar and consent, with the section's own header, footer and words. The pages are not translations of the
Bulgarian ones, so there is no hreflang. The Bulgarian pages change only by one footer link to `/en`.

- **Routes:** `/en` (offer home), `/en/wedding-editing`, `/en/youtube-editing`, `/en/real-estate-editing`,
  `/en/pricing`, `/en/how-it-works`, `/en/order` (the brief form, per request), `/en/work` (a 404 until samples are
  published), `/en/terms`, `/en/privacy`, `/en/cookies`, and an English 404 for any other `/en` address.
- **Content:** `src/content/en/`. Every number comes from `packages.ts` (strategy §5's packages, both waves; the add-ons,
  custom quotes, founding offer and payment), and `tests/unit/en-pricing.test.ts` holds it to the strategy.
  `terms.ts` is the client-facing part of [`contracts/terms-of-service.md`](contracts/terms-of-service.md) word for
  word (`tests/unit/en-terms.test.ts` compares them): change the document first, then the content file. Company facts
  in the terms, footer and privacy notice come from `src/content/business.ts` once `verified` (decision 10).
- **Samples:** add entries to `SAMPLES` in `src/content/en/samples.ts`: an unlisted YouTube or Vimeo link (the page
  links to it; nothing is embedded), a poster under `public/`, and every rights field (footage source, footage
  licence, music licence, permissions). Only `published: true` entries with all of them show; `kind: "demo"` is
  labelled "Demo edit". Then `/en/work`, the home and niche samples bands and the sitemap entry appear.
- **Orders:** the form validates with the same Zod rules as the server (`src/lib/validation/order.ts`, loaded on
  first touch); a server action and `POST /api/orders` share the leads pipeline with the Bulgarian form
  (`submitOrder` in `src/lib/leads/service.ts`): the same rate limits, idempotency, owner alert and retry. An order is
  a `leads` row with `locale = 'en'` and its brief in `details` (jsonb; migration `0002_en_orders`). Fields that do
  not belong to the chosen package are ignored. No card payment: the reply states the price and the start date.
- **Admin:** English orders appear in "Запитвания" with an EN badge; the enquiry shows the brief in Bulgarian labels
  (`src/content/admin-orders.ts`), and an answer goes out with an English subject.
- **Switches:** `EN_SECTION_ENABLED` (build time; off in production unless `true`, on elsewhere unless `false`): while
  off, `next.config.ts` rewrites every `/en` address to the site's 404, the sitemap and the Bulgarian footer leave it
  out, and `POST /api/orders` answers 404. `EN_EU_ORDERS` (per request, default `false`): orders from businesses in
  other EU states are refused with "We can't take orders from businesses in the EU yet."
- **Production gates:** with the section on, production refuses to build or start until `EN_TERMS.signedOff` and
  `EN_PRIVACY_NOTICE.status === "approved"` (`src/lib/en/release.ts`), and `/en/order` stays closed (404) while the
  terms are unsigned. The launch inputs are listed in [`release-checklist.md`](release-checklist.md).
- **Data requests:** `pnpm leads:dsar find|export --text "Jane Doe"` also searches the names, the message and every
  field of a brief (a couple's names, a listing address), case-insensitively; exports include the brief.
- **Tests:** `en-*.test.ts` in `tests/unit`, `tests/integration/orders.test.ts`, and `tests/e2e/en.spec.ts`, which also
  runs against a second e2e build with the section switched off (`.next-e2e-off`, served on :3203).

## Privacy, cookies and analytics

- The site sets one first-party cookie, `hera_consent`, and only once a visitor chooses (and only when an optional
  service exists to choose about).
- **Analytics is off** until `ANALYTICS_MEASUREMENT_ID` and `ANALYTICS_CONSENT_APPROVED=true` are both set (the
  owner's confirmation that the consent setup and notice were approved). Then Google Analytics 4 loads only after
  the visitor accepts, with all advertising signals denied and cookies limited to 13 months. Withdrawing (on
  `/biskvitki`) stops every further hit and removes its cookies.
- **Events** (only with consent, codes only, no personal data): `cta_quote_click` (page), `package_interest`
  (tier), `lead_form_view`, `lead_form_attempt`, `lead_form_success`, `lead_form_error` (code),
  `portfolio_video_play` (project slug). Leads never depend on analytics.
- **Cloudflare Turnstile** is optional: set both keys and the form renders the widget; the server then requires
  its token. It adds Cloudflare as a processor, which the privacy notice must name.

## Security

- Every response carries a Content Security Policy locked to the site (Google Analytics and Cloudflare hosts only
  when configured), HSTS on https, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY`,
  `Cross-Origin-Opener-Policy` and a restrictive `Permissions-Policy` (`src/lib/security/headers.ts`).
- The CSP allows inline scripts because the pages are static: per-request nonces would force every page to render
  on each request. Nothing user-supplied is ever rendered as HTML, and everything else is locked down.
- One admin panel at `/admin` (below), behind a password; no public lead listing (`GET /api/leads` is 405), secrets only in server environment
  variables, parameterised queries, logs without personal data.

## Updating content and media

- **Copy:** `src/content/*.ts`. Page titles and descriptions: `src/content/seo.ts` (unique per page, tested).
  Business facts: `src/content/business.ts`, set `verified: true` only after the owner checks every value (company
  details and social profiles then appear in the footer and the structured data).
- **Footage:** `src/content/media.ts`. Until the agency's own footage exists, development and previews show
  labelled stock and production shows a designed camera frame (never stock; `/placeholder-media/*` answers 404 in
  production). To use real footage, add the files (or CDN URLs: the CSP allows their host automatically), set
  `kind: "owner"` and `label`/`note` to `null`.
- **Portfolio:** add a project to `PROJECTS` in `src/content/projects/index.ts`. It is published only when
  `status: "approved"`, every rights flag is true and the client's approval (`approvedBy`, `approvedAt`) is recorded.
  Then `/rabota`, its case page, the menu link and the sitemap entries appear; results show only with a reporting
  window, a baseline and the method. Posters are site files under `public/` (or add the CDN to `images.remotePatterns`).
- **Share images** are generated at build time from each page's headline (`src/lib/site/og.tsx`).

## Testing

- **Unit** (`tests/unit`): validation, configuration, content rules, SEO and structured data, security headers,
  consent and analytics guards, portfolio publication rules, media and release gates.
- **Integration** (`tests/integration`): the leads pipeline against real Postgres: idempotency, outbox and retry,
  rate limits, the API route and the operator CLIs.
- **End-to-end** (`tests/e2e`, Playwright, Chromium at 1440 px and on a Pixel 7): every page (status, single H1,
  metadata, share image, no console errors, no dead links), the quote journeys including mail and database outages
  and the no-JavaScript form, consent and analytics (refusing means zero tracking requests), keyboard and menu
  behaviour, homepage links and Back with motion, the portfolio with fictional fixtures, motion and video controls,
  overflow at 7 widths, the wide-screen hero, and axe (WCAG 2.2 A/AA) on every page.

## Performance

Lighthouse, mobile preset (simulated slow 4G, 4× slower CPU), local production build without stock footage, 2026-11-17.
Medians of five runs; each before/after pair was measured back to back:

| Page    | HTTP/1.1 (`next start`) | HTTP/2 (local TLS proxy, as a production host serves) |
| ------- | ----------------------- | ----------------------------------------------------- |
| Home    | 82 → 89                 | 88 → 94                                               |
| Contact | 85 → 89                 | 87 → 95                                               |

Service, packages, video and about score 86–93 depending on the machine's load; their code did not change.
Accessibility 100, best practices 100, SEO 100 with production settings (previews are noindex by design).

What moved the two pages (`tests/unit/bundle-boundaries.test.ts` keeps Zod, the schema and GSAP out of the first
load):

- The Zod wrapper (`src/lib/validation/zod.ts`) exports named builders only. Re-exporting Zod's namespace kept all 64
  of its interface translations (341 KB unminified) in the contact page's script.
- The quote form loads Zod and the schema on the visitor's first focus or touch of the form, not with the page. The
  choices and limits it draws come from `lead-fields.ts`, which has no Zod. The server validates every request
  regardless, and if the rules fail to download the request goes through to that check.
- The form's "running in the browser" switch re-renders as a transition a frame after hydration, not synchronously
  inside it.
- The homepage loads GSAP after the first frame is painted and builds its timelines in a separate task. Before, on a
  fast connection, the library loaded and ran before the first paint, and Lighthouse charged it to the headline.

Local numbers are a proxy. They move several points with whatever else the machine is running, and the local server
speaks HTTP/1.1, which Lighthouse's simulation penalises (a new connection and slow start for each file). The deciding
check is PageSpeed Insights on the staging address; Core Web Vitals come from real visitors after launch.

## Trade-offs

- Repository content instead of a CMS: copy changes go through a commit and a build.
- Static pages for speed, at the cost of the CSP allowing inline scripts.
- Stock footage is allowed only in development and previews, always labelled; production shows designed frames
  until the agency's own footage exists.
- The test suites start an embedded Postgres (no Docker); CI uses a Postgres service instead.
