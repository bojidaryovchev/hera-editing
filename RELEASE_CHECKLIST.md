# Release checklist (v1.0)

Every criterion in [`website/04-acceptance-tests.md`](website/04-acceptance-tests.md), mapped to its proof. **Status:**
✅ met and proven · ⚠️ met with a documented exception · ⛔ blocked by an owner or legal input (the site refuses to
build for production, or shows nothing, until it is supplied). Commands and suites are described in
[`docs/README.md`](docs/README.md).

**Verdict (2026-11-17):** ready for a **staging** deployment. Not production-ready until the owner inputs at the end
of this file are supplied; the production build refuses to run without them, by design.

## A. Scope fidelity

| Criterion                                                                                       | Status | Proof                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Targets Bulgarian businesses; recurring end-to-end management with on-site filming              | ✅     | Copy in `src/content/`; pages `/`, `/upravlenie-na-sotsialni-mrezhi`, `/video-sadarzhanie-za-biznes`                                                     |
| No creator/gaming/streaming positioning, editing checkout, cart, scheduler or paid-ads promises | ✅     | `tests/unit/content.test.ts`, `tests/unit/hygiene.test.ts`; FAQ states paid ads are not included                                                         |
| Polished Bulgarian copy, `lang=bg`                                                              | ✅     | `tests/e2e/site.spec.ts` (`lang`), register patterns in `tests/fixtures/copy-patterns.formal.json`; a native proofread by the owner is still recommended |
| Package quantities illustrative; no unverified prices, team size, counts, results or logos      | ✅     | `content.test.ts` "shows no price figure anywhere"; the volume note on every tier                                                                        |
| "End-to-end" bounded (ads, travel, revisions, community replies, platform count)                | ⛔     | Bounded on the service page and in FAQ; `SERVICE_TERMS.signedOff` stays `false` until the owner signs off the terms                                      |

## B. Information architecture

| Criterion                                                                  | Status | Proof                                                                                                                |
| -------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| All routes, navigation and footer, a quote CTA in every conversion section | ✅     | `site.spec.ts` (every page 200, no dead internal links), `navigation.spec.ts`                                        |
| Mobile menu keyboard accessible, Escape and focus correct                  | ✅     | `navigation.spec.ts` (phone: focus trapped, Escape closes, focus returns)                                            |
| Breadcrumbs and back links consistent                                      | ✅     | `navigation.spec.ts`; BreadcrumbList checked in `site.spec.ts`                                                       |
| Empty or unapproved portfolio: not fake, not linked, not indexed           | ✅     | `tests/unit/projects.test.ts` (publication rules, sitemap, menu); `portfolio.spec.ts`; draft → 404 in `site.spec.ts` |
| 404 with the real status and a way back                                    | ✅     | `site.spec.ts` "an unknown address answers 404"                                                                      |

## C. Contact form and lead reliability

| Criterion                                                                             | Status | Proof                                                                                                                                    |
| ------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Required name, business, city, goal, and email or phone; valid phone and email        | ✅     | `tests/unit/validation.test.ts`; `lead.spec.ts` (phone only, email only, neither)                                                        |
| Client and server validation agree; input kept; inline errors; announcements          | ✅     | One Zod schema for both; `lead.spec.ts` (errors, focus, no-JavaScript server validation); axe on the form with errors                    |
| No duplicate sends; idempotency proven by an integration test                         | ✅     | `tests/integration/leads.test.ts`; `lead.spec.ts` "the same request sent twice"                                                          |
| Stored, alert job created, attempt recorded; success only after the insert            | ✅     | Integration suite; `lead.spec.ts` (home → package → form → stored lead → alert in the outbox)                                            |
| Mail outage: recoverable pending alert, success only if stored, idempotent retry      | ✅     | Integration suite; `lead.spec.ts` "mail provider down" (server with SMTP down, then `leads:retry`)                                       |
| Database outage: error with the contact alternative, never a false success            | ✅     | `lead.spec.ts` "database down"                                                                                                           |
| Honeypot and rate limiting tested; no personal data in analytics or logs              | ✅     | Integration suite; `consent.spec.ts` "events carry pages, tiers and codes only"; log redaction in `tests/unit/security-and-mail.test.ts` |
| HTTPS, server-only secrets, escaping, parameterised queries, no public list or export | ✅     | HSTS and `upgrade-insecure-requests` (`tests/unit/next-config.test.ts`); Drizzle queries; `GET /api/leads` → 405 (`site.spec.ts`)        |
| Contact email and phone are real, verified values                                     | ⛔     | Owner input: `NEXT_PUBLIC_CONTACT_EMAIL` / `NEXT_PUBLIC_CONTACT_PHONE`                                                                   |

## D. UX, design and visual

| Criterion                                                                         | Status | Proof                                                                                                                                                                             |
| --------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Screenshots at 360–2560 px; no horizontal overflow; no tiny hero at 1920+         | ✅     | `responsive.spec.ts` (every page at 7 widths and every scroll position; the hero at 1920–3840 px); screenshots: `SCREENSHOTS=1 pnpm test:e2e responsive` → `qa/screenshots/full/` |
| Honest hero media fallback, no fake client footage                                | ✅     | `footage()` in `src/content/media.ts` and `tests/unit/media.test.ts`: production shows a designed frame, never stock; stock URLs answer 404 in production (`next-config.test.ts`) |
| Keyboard access, visible focus, headings, alt text, labels                        | ✅     | axe (WCAG 2.2 A/AA) on every page, desktop and phone (`a11y.spec.ts`); one H1 per page (`site.spec.ts`)                                                                           |
| Contrast, reduced motion, pausable videos, no autoplay with sound                 | ✅     | `tests/unit/tokens.test.ts`; axe; `motion.spec.ts`                                                                                                                                |
| Responsive, optimised images; posters prevent layout shift; videos load on demand | ✅     | `next/image`; format clips load on play (`preload="none"`); Lighthouse CLS 0 on every page                                                                                        |

## E. Search and metadata

| Criterion                                                                             | Status | Proof                                                                            |
| ------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------- |
| Valid `sitemap.xml` with only indexable pages; valid `robots.txt`                     | ✅     | `tests/unit/seo.test.ts`, `projects.test.ts`; `site.spec.ts`                     |
| Unique Bulgarian title, description, canonical; share image with alt and absolute URL | ✅     | `seo.test.ts`; `site.spec.ts` (every page, share image fetched)                  |
| JSON-LD only with verified facts; no ratings or reviews                               | ✅     | `seo.test.ts` (structured data); `site.spec.ts`                                  |
| Crawlable server-rendered text, one H1, sensible internal links                       | ✅     | Static pages; the form works without JavaScript (`lead.spec.ts`); `site.spec.ts` |
| Unpublished portfolio not indexed; no thin blogs or city pages                        | ✅     | Projects rules; noindex everywhere but production (`next-config.test.ts`)        |

## F. Privacy and legal launch gates

| Criterion                                                                   | Status | Proof                                                                                                                |
| --------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| Real legal company and trade details, verified                              | ⛔     | Owner input: `src/content/business.ts`, then `verified: true`                                                        |
| Privacy and cookie notices reviewed (processors, retention, contact, basis) | ⛔     | Lawyer: `src/content/legal/privacy.ts` stays `draft`, and production refuses to build (`tests/unit/release.test.ts`) |
| Optional analytics blocked unless configured; refusing prevents tracking    | ✅     | `consent.spec.ts` (refusing → zero Google requests across every page and a lead); env gate (`env.test.ts`)           |
| Cookie preferences accessible and kept; quotes unaffected                   | ✅     | `consent.spec.ts` (withdrawal on `/biskvitki`, the form works with any choice)                                       |
| No marketing consent required by the form                                   | ✅     | Only the privacy notice acknowledgement                                                                              |
| Displayed videos and photos approved, releases and music cleared            | ⛔     | Owner input: the agency's own footage (until then production shows designed frames, never stock)                     |
| No client passwords; role-based access                                      | ✅     | Service page: „Достъп до профилите чрез роли за управление. Никога не искаме пароли.“                                |
| Displayed prices with EUR and VAT disclosures                               | ✅ n/a | No prices are displayed (`content.test.ts`)                                                                          |

## G. Performance and quality

| Criterion                                                                  | Status | Proof                                                                                                                                                                                                                                                                                         |
| -------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| lint, typecheck, test, test:e2e, build, migration smoke                    | ✅     | All pass locally; `.github/workflows/ci.yml` runs them on every push (integration and e2e against Postgres)                                                                                                                                                                                   |
| Lighthouse ≥ 90 performance, ≥ 95 accessibility, ≥ 95 SEO (targets)        | ✅     | Live staging on Vercel (2026-11-18), Lighthouse mobile, medians: home 93, contact 96, service 96, video 97, packages 94, about 97; accessibility 100; SEO 100 in production (previews are noindex). Repeat with PageSpeed Insights at launch ([`docs/README.md`](docs/README.md#performance)) |
| No console errors; no raw forms or credentials in logs                     | ✅     | `site.spec.ts` (every page); log redaction tests                                                                                                                                                                                                                                              |
| Backup/restore, retry and database access documented and tested on staging | ⚠️     | Retry and database access tested on staging (2026-11-18): the cron route refuses without its secret and processes with it, `/api/health` reports the database up, a test enquiry was stored. Still to rehearse: a restore from a Neon point-in-time branch (console)                          |
| Core Web Vitals p75 (LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms)                 | ⏳     | Monitor real-user data after launch; never claimed from lab tests                                                                                                                                                                                                                             |

## H. Deliverables

| Criterion                                                                                                  | Status | Proof                                                                                                              |
| ---------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| Clean commits, repeatable setup, `.env.example`                                                            | ✅     | `main`, checked by CI on every push; [`.env.example`](.env.example)                                                |
| README: architecture, deployment, trade-offs, copy and media, lead export and retry, privacy configuration | ✅     | [`docs/README.md`](docs/README.md) (the root `README.md` is the frozen specification)                              |
| Migrations, secure endpoint and server action, automated tests, sample config without secrets              | ✅     | `src/db/migrations`, `src/app/api/leads`, `src/app/(site)/kontakti/actions.ts`, `tests/`                           |
| Screenshots and manual QA record                                                                           | ✅     | `qa/screenshots/full/` (generated); the owner reviewed the design at each gate (design workspace decisions L1–L30) |
| Release blockers listed separately from completed fixes                                                    | ✅     | This file (below)                                                                                                  |
| No stock or fake assets or placeholder legal text in production                                            | ✅     | Media, privacy and fixture gates (`media.test.ts`, `release.test.ts`, `projects.test.ts`, `next-config.test.ts`)   |

## Owner and legal inputs still needed (release blockers)

| Input                                                                                                      | Where it goes                                                                                                 | Until then                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Domain and production URL                                                                                  | `NEXT_PUBLIC_SITE_URL` (https)                                                                                | Done: `hera-editing.com` on Vercel DNS (2026-11-18), `www` redirects to it                                                                        |
| Brand name confirmation                                                                                    | `NEXT_PUBLIC_BRAND_NAME`                                                                                      | Production refuses to build                                                                                                                       |
| Verified public email and/or phone                                                                         | `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`                                                      | Production refuses to build; previews show a labelled gap                                                                                         |
| Hosting, Postgres (EU) and mail provider credentials; the alert inbox                                      | `DATABASE_URL`, `MAIL_PROVIDER` + key, `MAIL_FROM`, `NOTIFICATION_EMAIL_TO`, `RATE_LIMIT_SALT`, `CRON_SECRET` | Staging runs on Vercel + Neon (Frankfurt), mail domain registered with Resend. Still needed: Vercel Pro, the production database, the alert inbox |
| Legal entity, company ID (ЕИК), VAT status, address, base city, service area, social profiles              | `src/content/business.ts` → `verified: true`                                                                  | Hidden; no Organization details beyond the brand                                                                                                  |
| Privacy notice and cookie text reviewed by a lawyer (processors, regions, retention, rights, contact)      | `src/content/legal/privacy.ts` → `status: "approved"`; `src/content/legal/cookies.ts`                         | Production refuses to build                                                                                                                       |
| Service terms sign-off (travel, revisions, platforms, community management)                                | `src/content/terms.ts` → `signedOff: true`                                                                    | Flagged in previews                                                                                                                               |
| Lead retention period                                                                                      | Owner and lawyer; then the notice                                                                             | Leads are never deleted automatically                                                                                                             |
| The agency's own footage (about 12 s horizontal, five short vertical clips) with releases and music rights | `src/content/media.ts` → `kind: "owner"`                                                                      | Production shows designed frames                                                                                                                  |
| Team members and photos (optional)                                                                         | `src/content/about.ts`                                                                                        | The About page shows no individuals                                                                                                               |
| Approved case studies (optional)                                                                           | `src/content/projects/index.ts`                                                                               | `/rabota` stays unpublished (404, not linked)                                                                                                     |
| Analytics decision (optional)                                                                              | `ANALYTICS_MEASUREMENT_ID` + `ANALYTICS_CONSENT_APPROVED=true`                                                | No analytics, no cookie banner                                                                                                                    |
| Search Console ownership                                                                                   | DNS, or `GOOGLE_SITE_VERIFICATION`                                                                            | Submit `/sitemap.xml` after launch                                                                                                                |
