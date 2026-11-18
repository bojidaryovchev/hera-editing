# Spec coverage review (2026-11-18)

- **What was checked.** `BG_Social_Agency_Research_and_Build_Spec_v1.zip`: the 13 documents of the frozen v1.0
  specification, plus `FROZEN_SPEC_all_in_one.md`, which only joins them under a title line. The 13 files are
  byte-identical to [`spec/`](../spec/) and their checksums verify, so this is the spec the site was built from. Every
  document was read in full and compared with the code, the tests and `docs/`.
- **Verdict.** The website contract (`spec/website/01–04`) is covered. The [release checklist](release-checklist.md)
  maps all 48 acceptance criteria, and spot checks of the code agree with it. What is open:
  - five gaps that no document tracked (§1);
  - business work the spec asks for that is not planned yet (§2);
  - three points missing from the Bulgarian client contract (§3);
  - the launch inputs, which were already tracked (§6).
- **Progress (2026-11-19).** Since the review:
  - 1.1: the notice is drafted in Bulgarian and on `/en` (`b39ff93`). It is still a draft, with the controller and
    the privacy contact gated, and it awaits the owner's approval;
  - 1.2: `/api/health` answers 503 when alerts are stuck (`b39ff93`), and the monitor is owner question B12;
  - 1.3: fixed (`980b38d`);
  - §2 items 2–6, and §3: done (`0bd2db4`). They are the usability check in strategy §14, the templates and checklists
    in `docs/operations/`, the contract clauses, and `docs/contracts/dpa-bg.md`.

  Still open: 1.4, 1.5, and §2 item 1 (owner question C7).

- **Out of scope.** The remote-editing line and the English section `/en` are owner-approved changes (L35–L38). For
  `/en` only, they lift the spec's exclusions (creators, a global audience, an editing storefront) and three of its
  v1.0 rules (no public prices, Bulgarian copy with euro prices, no ecommerce). The Bulgarian pages still follow the
  spec.

## 1. Gaps that no document tracked

### 1.1 The privacy notice was a skeleton, not a draft (drafted since, in `b39ff93`)

- **Spec:** research/03 §1 and §8; website/04 F; handoff/02 §A.
- **Found:** six of the nine sections in `src/content/legal/privacy.ts` are still pending:
  - the controller;
  - the legal basis;
  - the retention period;
  - the processors and their regions;
  - the visitors' rights;
  - the privacy contact.

  The notice does not mention the contact@ mailbox (L32). The release gate holds: production refuses a draft notice.

- **The docs disagreed.** [business-owner-questions.md](business-owner-questions.md) B6 recommended approving "the
  drafts as they are" and said that L37 makes a lawyer optional. L37 covers only the contract drafts, and the release
  checklist and `development.md` still name a lawyer for this notice. B6 is now corrected.
- **Next:** Claude drafts every section except the company details:
  - the processors already in use: Vercel, Neon (Frankfurt) and Resend (EU), plus Cloudflare if Turnstile is
    switched on;
  - a proposed legal basis;
  - the proposed 12-month retention for enquiries that never became clients;
  - the rights, and the complaint route to the КЗЛД;
  - the mailbox paragraph.

  The owner then decides, as a separate decision, whether a lawyer reviews it. Keep it consistent with the privacy
  page that `/en` now has (`src/app/(en)/en/privacy/`): the same controller, processors and retention.

### 1.2 Nobody was told when enquiries stop arriving (health check added since, in `b39ff93`)

- **Spec:** website/03 "Observability and backups": "deployment alerts for failed form submissions, pending email
  outbox, DB connectivity".
- **Found:** the hooks exist. `/api/health` reports whether the database is up, and the retry job logs
  `lead_notification_backlog` when alerts are stuck. Nothing watches either of them:
  - no uptime monitor is set up;
  - the Vercel project has no log drain (checked 2026-11-18);
  - the retry job runs once a day on the Hobby plan.

  No document tracked this.

- **Next:**
  - add the alert backlog to `/api/health` (counts only), so that one check covers both the database and the alerts;
  - point a free uptime monitor at it, alerting the owner's address (question B4);
  - run the retry job every 15 minutes once the site is on Vercel Pro (question B9).

### 1.3 The footer's quote button credited every lead to the homepage (fixed)

- **Spec:** website/01 "Global navigation" (the `from` source) and website/03 (`sourcePath`).
- **Found:** `src/components/site/SiteFooter.tsx` linked to `quoteHref("/")` on every page. A lead sent from the footer
  was stored with `source_path` set to `/`, and the contact page told the visitor „Идвате от страницата: Начало“. L31
  (2) had fixed the same bug in the header and the menu.
- **Fixed** in `980b38d`: the footer button uses `QuoteLink`, and `tests/e2e/navigation.spec.ts` checks that it records
  the page.

### 1.4 Nothing on the homepage for approved work

- **Spec:**
  - website/01, homepage section 4: "Entire module conditional on verified assets";
  - research/01: a real video showcase "only when licensed original assets exist".
- **Found:** L23 left the module out because no assets exist yet. There is no conditional version either: once the
  first case is approved, it appears on `/rabota`, in the menu and in the sitemap, but not on the homepage.
- **Next:** a sample-work section that renders only when published projects exist. It is needed before the first case
  is published, not before launch.

### 1.5 No manual QA record

- **Spec:**
  - website/02 "Accessibility": automated axe _and_ manual keyboard and screen-reader checks;
  - website/04 H: "Screenshots at mobile/tablet/desktop and manual QA record".
- **Found:** the release checklist marked this ✅ on the strength of axe, Playwright and the owner's design gates.
  - Screenshots are generated on demand and not kept: `qa/screenshots/full/` is ignored by Git.
  - No keyboard or screen-reader pass is recorded anywhere.

  The checklist now shows ⚠️.

- **Next:**
  - one pass with the keyboard and NVDA on a desktop, and with TalkBack or VoiceOver on a phone;
  - write it down with the date, devices, browsers and results;
  - keep the screenshots from that run.

## 2. Business work the spec asks for, not planned yet (items 2–6 done since, in `0bd2db4`)

Most of it is planned:

- strategy §1 and §14 cover the 10 discovery calls, 20–30 approaches per sector using the spec's call guide, the pilots,
  the first case study and Hera's own social accounts;
- the keyword demand was measured with OpenSEO instead of Keyword Planner (L26).

These are not planned anywhere:

1. **Prices from real costs.**
   - The spec: product/01 sets the price from hours × loaded cost ÷ (1 − margin), with the margin set "with the actual
     team"; handoff/02 §C.3 asks for three sample quotes at real staff costs.
   - Where it stands: owner question C2 proposes €600, €1,000–1,050 and from €1,300 without asking for the owner's
     hours or costs. strategy §5.2 checks the margin only against the spec's illustrative €18 an hour.
   - Done: this is now owner question C7.
2. **A usability check before launch.** Five prospects walk through the site and say what they think is included
   (handoff/02 §C.4; research/04). The staging site is ready for it.
3. **A quote template.** It must state (research/03 §9):
   - the price in EUR, and the VAT status;
   - travel and the number of shoots;
   - original videos versus platform variants, and their formats;
   - the channels;
   - comment replies;
   - the correction rounds.

   Annex 1 of the contract is the nearest thing so far.

4. **An account-access checklist** (research/03 §5): delegated roles, two-factor authentication, least privilege, a
   record of who may publish, and revoking access at the end. Contract art. 7 covers only ownership and roles.
5. **A shoot checklist.** research/03 §3 has six points:
   - the client's authority to film the place, its logos and its people;
   - who may be filmed;
   - bystanders;
   - custody, retention and deletion of the raw footage;
   - final approval;
   - restricted sectors.

   The filming consent form covers the people. The strategy's sector checklists cover content rules, not the shoot.

6. **Prospect scoring** (research/04): six criteria, each scored 0–2, with 9 or more contacted first. They can become
   columns of the outreach list.

## 3. The Bulgarian client contract against research/03 §7 (done since, in `0bd2db4`)

[client-contract-bg.md](contracts/client-contract-bg.md) covers 15 of the 18 points. Two are covered in part, and one is
missing:

- **Raw footage (in part).** Art. 6(2) says who keeps it, but not how long it is kept or when it is deleted after the
  contract ends (research/03 §3.4).
- **Rescheduling a shoot (in part).** Art. 10(3) covers the weather, but not a client cancelling a shoot day late.
- **Breaches and escalation (missing).** Who tells whom, and how fast, when something goes wrong.

Also:

- Annex 1 has no line for comment replies, although art. 1(3) excludes them "unless agreed in Annex 1" and the strategy
  prices them as an add-on.
- The Bulgarian data processing agreement (Annex 2) is planned as a translation of the English one for remote editing
  ([contracts/README.md](contracts/README.md)). But this service processes different data: people filmed on the
  client's premises, delegated access to the client's accounts, and comments and messages if replies are sold. Its
  description of the processing needs writing, not only translating.

## 4. Covered

- **README (scope and exclusions).** On the Bulgarian pages, content tests guard against prices, creator positioning
  and promises about ads. The exceptions (L32, L35, L38) were approved by the owner and recorded, as handoff/02 §E
  requires, and L35–L38 lift the exclusions for `/en` only.
- **research/01 (market).**
  - Competitors re-checked in research/07 Part 2.
  - Positioning in strategy §2.
  - Its takeaways are on the site: one clear offer, the process, the scoping, the FAQ, no-guarantee wording and no
    stock footage.
- **research/02 (customers and SEO).** Measured keywords and the page map (research/05, L26); the SEO rules are tested
  in `seo.test.ts` and `site.spec.ts`.
- **research/03 (legal).** Covered:
  - consent and cookies;
  - no passwords;
  - the music clause in the contract;
  - the filming consent form;
  - the contract drafts.

  The gaps are in §1.1, §2 and §3.

- **research/04 (go-to-market).** strategy §8 and §14; the gaps are in §2.
- **product/01 (service model).** The tiers are on `/paketi`. The service terms await sign-off (decision 6, L21), and
  prices are proposed in strategy §5.
- **product/02 (copy).** The ready copy is used word for word:
  - the hero;
  - the problem and process headings;
  - the contact page, its confirmation and its error;
  - the eight FAQ questions.

  Three titles were replaced by the owner-approved titles from L26.

- **website/01 (information architecture).**
  - Every route exists, and the navigation follows the spec's order.
  - L23 records what was folded into or left out of the homepage, and L4 sets the service page order.
  - The packages FAQ covers all seven topics.
  - The form's fields, limits and choices match exactly.
- **website/02 (design system).**
  - The design direction is the owner's (decisions 1, 7, 12).
  - Videos: only one plays at a time, every clip has play and pause, and nothing autoplays with data saving or reduced
    motion on.
  - The Cyrillic fonts are self-hosted, under the OFL.
  - axe runs on every page, and Lighthouse was run on staging.
- **website/03 (technical).**
  - The schema is as specified: six statuses, the outbox fields, a unique request id and the privacy notice version.
  - The API answers 201, 400, 429 and 503.
  - Rate-limit keys are salted and rotated daily, and proxy headers are trusted only on Vercel.
  - Requests are checked for size (the 8 KB limit) and origin; a non-Bulgarian locale is refused, and unknown fields
    are dropped.
  - Every environment variable is in `.env.example`.
  - There are commands for export, retry and data requests (DSAR).
  - Backups are documented; the restore rehearsal is ⚠️ in the checklist.
- **website/04 (acceptance).** The release checklist; each of the seven suggested journeys has an end-to-end test.
- **handoff/01 (master prompt).** Milestones M0–M5 are done (L29, L31), with the release checklist and the list of
  owner inputs.
- **handoff/02 (launch inputs).**
  - §A is tracked in the release checklist and the owner questions.
  - §B: search volume is measured; the other hypotheses wait for the first calls.
  - §C: see §2 above.
  - §E: change control was followed.

## 5. Small deviations

- Two font families are preloaded (body and headline), where website/02 says "one critical font". The Lighthouse
  targets are met.
- The colour tokens differ from website/02's suggested baseline, which allows changes "with a documented design
  rationale". That rationale is spread across decisions 1, 7 and 12 rather than given per token. The lime and the
  focus blue are the spec's own.
- L32 lists five lead statuses, while the code, the admin panel and `development.md` use the spec's six.

## 6. Already tracked

The launch inputs are unchanged. They are in the [release checklist](release-checklist.md) (owner and legal inputs)
and in [business-owner-questions.md](business-owner-questions.md) B:

- the company;
- the base city and filming radius;
- the public contacts;
- the forwarding address;
- the service terms;
- the privacy notice;
- the agency's own footage;
- Vercel Pro;
- analytics;
- Search Console;
- a rehearsed database restore.
