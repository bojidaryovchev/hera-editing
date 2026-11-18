# Bulgarian Social Media Agency — Build Specification v1.0

**Research snapshot:** 2026-11-07. **Status:** Website scope **frozen for implementation**; some business inputs/claims are **launch gates**, not permission to invent them.

## Mission
Build a premium, Bulgarian-language B2B agency marketing website selling **end-to-end recurring organic social media presence management** to **businesses in Bulgaria**. The agency is responsible for discovery, content strategy, ideas/scripts, filming with its own equipment, editing, captions/copy, scheduling/publishing, bounded ongoing channel management, and reporting. On-site production is central. A prospect requests a tailored monthly quote; the site does **not** sell fixed subscriptions online.

## Explicit exclusions
- No streamer, creator, gaming, podcast-only, global creator audience, or dedicated editing marketplace.
- No standalone video-editing storefront or freelancer marketplace.
- No promise of paid advertising management, guaranteed reach, viral growth, sales, 24/7 customer support, or limitless revisions.
- No client portal, scheduling automation for social networks, social account OAuth, SaaS product, ecommerce/cart, automated quotations, blog CMS, or complex staff admin in v1.
- No fake testimonials, portfolio samples presented as real client work, invented prices/metrics or customer logos.

## Contents
1. `research/01-market-and-competitors.md` — primary evidence, Bulgarian competitors, differentiated positioning.
2. `research/02-customer-segments-and-seo.md` — ICP hypotheses, customer problems, keyword clusters without invented volumes, geographic strategy.
3. `research/03-legal-and-platform-operating-rules.md` — consent, music, access, contract and delivery constraints.
4. `research/04-go-to-market-and-validation.md` — acquisition hypotheses and experiments.
5. `product/01-service-model-and-economics.md` — packages, unit economics, quote logic, policies.
6. `product/02-positioning-and-bulgarian-copy.md` — voice, messaging, homepage/service copy and FAQs.
7. `website/01-information-architecture.md` — pages, URL architecture, sections and behavior.
8. `website/02-design-system.md` — visual tokens, interaction, responsive and media rules.
9. `website/03-technical-and-functional-spec.md` — stack, schema, forms, data security, SEO, operations.
10. `website/04-acceptance-tests.md` — verifiable launch and regression gates.
11. `handoff/01-claude-code-master-prompt.md` — paste into Claude Code.
12. `handoff/02-launch-inputs-and-open-validation.md` — facts still needed, honest placeholder policy, validation experiments.

## Decision hierarchy
1. `README.md` scope and exclusions govern all other documents.
2. The `website/*` files are the **implementation contract**.
3. The `product/*` files define intended commercial messaging and operational limits.
4. `research/*` is evidence and hypotheses, **not** proof of achieved business outcomes.
5. The `handoff/*` files specify execution and honest release blockers.

## Core business decisions (frozen)
| Decision | v1.0 |
|---|---|
| Country / audience | Bulgarian businesses, Bulgarian-facing copy |
| Main offer | Recurring end-to-end **organic** social management including on-site content production |
| Other services | All filming, editing, copy and posting described as *components* of core offer |
| Pricing | 3 illustrative tiers, **custom price by enquiry**; no public price figures pending cost validation |
| Platforms | Facebook / Instagram / TikTok recommended based on each client; Shorts optional by quotation |
| Geography | Bulgaria; filming city/service radius explicitly confirmed before quotation; do not claim universal free travel |
| Paid ads and 24/7 community support | Not included in v1 offer; optionally quoted later, not marketed as included |
| Primary website conversion | Qualified quote request submitted, stored and alerted reliably |
| Language / currency | Bulgarian (`bg-BG`); EUR if prices later appear |
| Web technology | Next.js App Router, TypeScript, Tailwind, PostgreSQL, Drizzle ORM, Zod; content in code/MDX |
| Content proof | Only rights-cleared real agency materials; placeholders in dev, never misrepresented live |

## How to use
1. Review `handoff/02-launch-inputs-and-open-validation.md` and replace factual business placeholders when available.
2. Open an empty application repository with Claude Code.
3. Paste `handoff/01-claude-code-master-prompt.md` or point Claude Code to this entire folder.
4. Have Claude Code produce a design plan, execute implementation milestones, run tests, and prepare a release checklist.
5. Do **not** consider the site launch-ready until all mandatory `website/04-acceptance-tests.md` and asset/legal gates pass.

## What 'frozen' means
Feature scope, page architecture, interaction behavior, the service boundaries and acceptance criteria are decided. Unknown legal company details, brand, domain, sales contacts, footage rights and actual service economics are **factual launch inputs**—they are not guessed. SEO search-volume and customer willingness-to-pay claims are **unvalidated**, and are separately tracked rather than treated as facts.
