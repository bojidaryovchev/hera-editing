# Claude Code master implementation prompt

You are implementing the marketing website described by the documents in this folder. **Read `README.md` then all files under `research/`, `product/`, `website/`, `handoff/` before writing application code.** The files are the sole product-spec source of truth. Respect their precedence, exclusions, copy and testable acceptance criteria.

## Objective
Deliver a **production-quality Bulgarian-language agency website** that sells recurring end-to-end **organic** social media management for businesses in Bulgaria, including own-equipment filming, ideation, editing, scheduling/publishing after approval, and reporting. The primary conversion is a reliable individual-quotation request. No creator/streamer market or editing SaaS.

## Execution rules
1. Do not ask to re-open settled scope decisions. Identify **only genuine launch inputs**, security/legal approvals and missing authentic portfolio assets. Use explicit configuration and safe fallbacks, not invented facts.
2. Start by briefly reporting existing repo state, technical risks, proposed file tree and an implementation/checklist plan. If target repo already has assets/layout, reuse genuinely useful elements. Do not destroy unrelated code.
3. Build the smallest maintainable architecture meeting the contract: Next.js App Router + TS + Tailwind + Drizzle + PostgreSQL + Zod. Repo-stored typed content; no unnecessary CMS, auth, CRM, social publishing APIs, e-commerce or automated quotation engine.
4. Follow page specs exactly. All marketing copy must be native, idiomatic Bulgarian. Use Bulgarian meta and real, verified facts only. Do not fake testimonials, customer cases, team portraits, results or price data.
5. Design to high quality: cinematic editorial / Swiss typographic clarity, responsive large monitors and mobile, original video poster/player treatment, accessible and performant; implement media placeholders during development that are clearly labeled and cannot be mistaken for portfolio on production.
6. Make the lead pipeline work end-to-end, not just a decorative form: server validation, deduplication, durable DB insertion, mail alert/outbox/retry, anti-spam/rate limit, safe errors, privacy handling, test coverage. Never show success without DB durability.
7. Implement legally neutral privacy/cookie infrastructure and mark owner/legal-input placeholders as release blockers; don't invent policies, consent bases or real company details. Disable marketing trackers unless consent/config is validated.
8. Deliver all URLs, metadata, noindex controls, canonical, sitemap/robots, structured data only for verified entities; use original copy, avoid keyword stuffing.
9. Keep test suite rigorous: unit, DB integration, Playwright user flows, accessibility checks, responsive screenshots. Run build, typecheck, lint and tests and **fix failures**. Document any unavoidable external credential blockers.
10. Deliver a RELEASE_CHECKLIST.md mapping every criterion in `website/04-acceptance-tests.md` to proof, plus a concise list of owner-provided launch inputs.

## Suggested milestones
- **M0 Audit & plan:** inspect repository, assess dependencies, configure env validation and tests.
- **M1 UX foundation:** design system, layouts, mobile navigation, hero/page scaffolding, Bulgarian copy.
- **M2 Content proof:** all marketing routes, package cards, process, FAQ, case publishing rules, accessible media.
- **M3 Conversion backend:** DB migrations, form, validation, email outbox/notifications, retry, rate limiting and tests.
- **M4 SEO, privacy and performance:** metadata, structured data, consent preference controls, video optimization and QA.
- **M5 Review & release handoff:** responsive screenshots, regression tests, production checklist, live-input gates.

## Stop conditions
Do **not** claim production-ready if unverified legal details, real contact information, required secret credentials or rights-cleared actual assets are missing. It is acceptable to finish a deployable **staging** site with explicitly labeled content gates. Do not substitute made-up details or use false portfolio proofs to pass acceptance.

## Response required after implementation
- Summary of what was built and what was excluded.
- Routes and key user flow.
- Commands run and pass/fail counts.
- DB migration and deployment/env setup.
- Link/path to screenshots and code changes.
- Outstanding **owner inputs** and **legal/signoff** blockers, with precise next action.
