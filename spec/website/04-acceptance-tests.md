# Build acceptance and release criteria (v1.0)

**P0** = launch blocking. **P1** = implement where specified and content exists; missing inputs may be explicitly deferred with a documented non-deceptive fallback. For every criterion produce a reproducible test result or screenshot/QA note, not just 'done'.

## A. Scope fidelity (P0)
- [ ] Site targets Bulgarian **businesses** and leads with recurring **end-to-end social management** including on-site creation.
- [ ] No creator/gaming/streaming positioning, standalone editing checkout, online shopping cart, automated social scheduler or paid ads promises.
- [ ] All business-facing UI copy is polished Bulgarian; site `lang=bg`.
- [ ] Package quantities clearly described as illustrative; no unverified prices, team size, project counts, results or client logos.
- [ ] 'End-to-end' refers to defined services; paid ads, travel, revisions, community replies and platform count explicitly bounded.

## B. Information architecture (P0)
- [ ] All required routes exist, correct nav/footer, CTA to `/kontakti` from every conversion section.
- [ ] Mobile menu keyboard accessible and Escape/focus behavior correct.
- [ ] Breadcrumbs and back links consistent where used.
- [ ] Empty or unapproved portfolio route does not look like fake case studies, is not linked publicly and is not indexed.
- [ ] 404 responds with actual not-found status and helpful route.

## C. Contact form and lead reliability (P0)
- [ ] Required name, business, city, goal plus email **or** phone; valid Bulgarian/international phone acceptance, valid email.
- [ ] Client-side and server-side validation agree. Input preserved after validation error, inline errors attached to fields, accessible status announcements.
- [ ] Submit button prevents duplicate sends; request idempotency proven by integration test.
- [ ] Valid enquiry stored in DB; notification job created; email attempt status recorded; success only after durable DB insertion.
- [ ] Simulated mail outage leaves recoverable pending/failed alert and displays success only if DB stored; retry idempotently processes notification.
- [ ] Simulated DB outage displays error with contact alternative and does **not** display fake success.
- [ ] Honeypot and rate limiting tested. No PII in browser analytics or public error logs.
- [ ] HTTPS, secrets server-only, URL escaped, query parameterized; no public list/export endpoint.
- [ ] Contact email and phone are actual verified values; link destinations function.

## D. UX/design/visual (P0)
- [ ] Screenshots reviewed at widths 360, 390, 768, 1024, 1440, 1920 and 2560px; no horizontal overflow or tiny centered hero at 1920+.
- [ ] Appropriate hero media fallback: valid authorized footage OR honest branded poster/design; no fake client footage.
- [ ] All interactive elements keyboard accessible; visible focus; logical heading hierarchy; screen reader alt and form labels.
- [ ] Color contrast verified; reduced-motion honored; videos can be paused, have accessible controls and do not autoplay with sound.
- [ ] Images are responsive and correctly optimized; posters prevent layout shift; not all mobile videos download before activation.

## E. Search and metadata (P0)
- [ ] `/sitemap.xml` includes only valid indexable pages; `/robots.txt` valid.
- [ ] Unique Bulgarian title, description, canonical; OpenGraph image alt and correct absolute URL for each indexable page.
- [ ] No JSON-LD factual claims without verified source; Organization with accurate data. No bogus reviews/rating schema.
- [ ] Crawlable SSR marketing text; actual H1 on each page, sensible internal links.
- [ ] Portfolio and assets not yet public are not indexed; no thin empty blogs or city landing spam.

## F. Privacy/legal launch gates (P0)
- [ ] Real legal company/trade details supplied and verified by owner.
- [ ] Privacy/cookie notices reviewed to match actual processors, retention, contact, collection and legal basis.
- [ ] Optional analytics blocked unless permission mechanism correctly configured. Reject option actually prevents nonessential tracking. Test with browser devtools/network.
- [ ] Cookie preferences accessible and persist appropriately; does not affect ability to request quotation.
- [ ] Agency contact form does not require marketing subscription consent.
- [ ] Real displayed videos/photos approved for commercial agency portfolio use, individual releases/privacy basis reviewed as appropriate; commercial audio licensed.
- [ ] No client passwords collected or embedded; social access process uses role-based delegated permissions.
- [ ] If quoted prices eventually displayed, EUR and VAT disclosures accurate; never fake sales terms.

## G. Performance and quality (P0 target)
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e`, build, DB migration smoke pass (or equivalent package manager scripts).
- [ ] At least 90 Lighthouse performance, 95 accessibility, 95 SEO on controlled representative mobile page **as targets**, document environment and any exceptions, never claim Core Web Vitals achieved without RUM.
- [ ] No browser console errors in ordinary browsing; server logs don't contain raw forms or credentials.
- [ ] Backup/restore procedure, operational notification retry and DB access documented and tested on staging.
- [ ] Core Web Vitals mobile p75 targets (monitor after launch): LCP <=2.5s, CLS <=0.1, INP <=200ms.

## H. Deliverables from Claude Code (P0)
- [ ] Source repo with clean commits, repeatable setup and env.example.
- [ ] README: architecture and deployment, tradeoffs, how to update copy/media, lead export/retry, privacy/cookie configuration.
- [ ] DB migrations, secure leads endpoint/server action, automated tests, sample config with no secrets.
- [ ] Screenshots at mobile/tablet/desktop and manual QA record.
- [ ] Release blockers list, separate from fixes already completed; user approval needed to unfreeze spec.
- [ ] No stock/fake customer assets or generic placeholder legal text silently promoted into production.

## Suggested end-to-end tests
1. Home → package card → contact form preselected interest (if used) → validation → stored record → alert logged → success.
2. Service page → lead form → mail service down → DB record still exists + notification retry works.
3. Same `requestId` submitted twice → one lead record, no duplicate owner notifications.
4. Phone-only vs email-only submissions; missing both rejected; invalid URL rejected.
5. Mobile keyboard flow, Escape nav, reduced-motion video setting, privacy Reject All.
6. Publish one *approved* case → sitemap includes it and preview works; mark draft/unapproved → disappears and does not appear in index/sitemap.
7. Disable optional analytics → browse all routes and submit lead → zero nonessential tracking calls.
