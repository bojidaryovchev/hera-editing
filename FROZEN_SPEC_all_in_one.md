# Bulgarian Social Media Agency — Frozen Website Specification v1.0

**Snapshot: 2026-11-07.** This is a consolidated view; source-of-truth is the matching folder files.


---

# FILE: README.md

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


---

# FILE: research/01-market-and-competitors.md

# Market research and competitor matrix
**Verified on:** 2026-11-07 using publicly accessible pages. Published package prices are snapshots, not a comparable quote and not evidence of agency profitability or market share.

## National demand context (official / secondary market data)
- National Statistical Institute (NSI), **ICT usage and e-commerce in enterprises — 2025**: 41.5% of surveyed Bulgarian enterprises reported using social media for their business; 38.7% of small (10–49 staff), 52.5% of medium (50–249), and 69.8% of large (250+) companies. **Survey scope excludes microbusinesses with fewer than 10 employees**; don't apply its percentage to all Bulgarian businesses. Source: https://www.nsi.bg/en/press-release/ict-usage-and-e-commerce-in-enterprises-8879
- DataReportal **Digital 2026: Bulgaria**, representing mainly late-2025 data: estimated **4.50 million social media user identities** (not unique people) in October 2025. Indicative advertising reach at end of 2025: Facebook 3.60m, Instagram 1.95m, TikTok 2.63m adults 18+. Ad reach ≠ verified monthly active users; platforms and demographics are not directly comparable. Source: https://datareportal.com/reports/digital-2026-bulgaria
- Bulgaria adopted the euro **2026-01-01**. Official dual display period ended 2026-08-08. Public quotes use EUR; tax/VAT statements need factual configuration. Source: https://economy-finance.ec.europa.eu/euro/eu-countries-and-euro/bulgaria-and-euro_en

## Competitor evidence matrix
| Brand & page | Observed offer | Public price snapshot | Implication |
|---|---|---|---|
| SocialDany — https://socialdany.com/bg/reels | Video-first Reels; 1 or 4 clips, or monthly filmed content; social posting sold separately | €120 per Reel; €380 for four from one shoot; €480/month for 4 Reels + 10 photos (min 3 mo); publishing/service add-on from €350/month | Clear filming limits, add-on logic, turnaround and revision policy |
| Next Level Digital — https://www.nextleveldigital.bg/bg/services | Packaged video production and social management | Silver €899.99 for 12 videos, no account mgmt; Gold €999.99 for 12 videos + 2 platforms; Platinum €1,299.99 for 20 videos + 3 platforms | Video volume alone is not end-to-end; explicitly show account mgmt inclusions |
| Wonder Digital — https://wonderdigital.bg/socialni-mrezhi/ | Social management with video separate | €200/month 4 Instagram static posts; €400/month 8 FB + IG posts from shared content; excludes video & community replies | Lower-end pricing isn't comparable with filming-led retainer |
| SEOMAX — https://seomax.bg/services/video-marketing/ | Script, on-location shoot, video edit; packages of 4, 8, 16 videos with quote | Public quantities, no fixed monthly prices on checked page | Custom quotes are normal, but packages convey scope |
| Bridges — https://bridges.bg/uslugi/poddryzhka-na-sotsialni-mrezhi/ | Publishing, design, copy, adapted reels, multi-platform | from 950 BGN /month for 20 posts; other tiers shown in BGN | Historic/legacy display in BGN should not be compared without inclusion and currency context |
| e-motion — https://e-motionbg.com/uslugi/sotsialni-mrezhi/ | Content + social service at several levels | Their indicative FAQ: €200–400 basic; €400–700 mid; from €800 premium | Market spans basic posting to full content production; scope matters more than headline amount |
| MC Productions — https://www.mcproductionsbg.com/prices.html | Low-cost basic editing and profile support; filming by quotation | €20 simple short-form edit; on-site filming custom | Pure editing/posting is commoditized and is not the positioning |

**Competitive interpretation:** Existing agencies already offer end-to-end and film+edit services. It is **not credible** to claim that this offer is unique in Bulgaria. A defendable, testable positioning is: *filming-first, accountable social presence with a single production-and-publishing team, clearly defined approvals and monthly delivery*. Differentiation must ultimately come from quality, process, vertical proof, and client service.

## Messaging gaps and opportunities — hypotheses, not verified pain prevalence
1. Owners may dislike coordinating a cameraman, editor, copywriter and social manager independently.
2. Content creation can fail without scheduled filming, a plan and approval workflow.
3. Low-price social management may exclude original video or community management.
4. Business owners need clarity on what they must contribute (staff on camera, permissions, feedback, access) and what agency handles.
5. Buyers need examples relevant to their sector and a transparent proposal, not abstract 'we grow your brand' language.

## Sales discovery interview framework
Interview at least 10 target businesses across 3–4 sectors before claiming validated fit. Ask: current social channels; who produces posts; budget range; biggest delay; filming access; willingness to appear on camera; content approval owner; seasonal peaks; whether enquiries can be attributed; what would make them cancel; last attempt to outsource; response to 4/8/12 deliverables. Record replies verbatim and segment by spend ability and production logistics.

## Competitive takeaways to implement
- Clear, concise agency offer rather than a vast service catalog.
- Real video showcase, ideally within first screen, **only when licensed original assets exist**.
- Service flow: research → plan → film → edit → approve → publish → learn.
- Scoping: unique videos, sessions, platform adaptations, revisions, reporting, travel, approvals, moderation.
- Quote CTA, intake form, FAQ, explicit no-guarantee language.
- Avoid generic stock photography claiming to be the agency's own team.

## Source notes
See direct links above. Public pages can change; refresh price evidence before commercial negotiations. Where source language/offer is ambiguous, verify during competitive calls rather than inferring inclusions.


---

# FILE: research/02-customer-segments-and-seo.md

# Target customers, demand hypotheses, and SEO plan

## Primary ICP
Bulgarian owner-operated or manager-led SMEs that serve customers locally or nationally; sell visually demonstrable services/products; can support on-site filming; have enough repeatable work for a monthly shoot; need credible recurring content; and can authorize a three-month or monthly retainer. This is a **target hypothesis**, not evidence that any segment is willing to pay.

**Strong first-call criteria:** has a functioning business and product-market demand; visible services/products; team/member can approve content within two working days; access to location; budget for sustained content; legal right to film premises/workers/customers; sensible travel radius. **Bad fit:** wants guaranteed virality/sales; refuses any approvals but expects unbounded liability; asks for daily filming on a tiny retainer; lacks rights to showcase materials; needs specialized regulated-content advertising without expert review; is far away with no travel budget.

## Ranked vertical hypotheses (heuristic)
Scoring dimensions 1–5: visual/story potential, repeatable topics, plausible budget, shoot logistics, and lead-to-value clarity. This is a **planning rubric**, not a surveyed market score.

| Priority | Vertical | Recurring content pillars | Risks to validate |
|---|---|---|---|
| 1 | Automotive detailing / workshops | before–after, processes, tips, team, services | car owner permissions; workshop noise and safety |
| 1 | Fitness studios / coaches / gyms | training tips, instructors, facilities, challenges | release forms and health claims |
| 1 | Restaurants / cafés / hospitality | preparation, seasonal menus, staff, atmosphere | time windows, crowded customers, modest margins |
| 2 | Beauty / salons | demonstrations, specialists, methods, customer results | before–after consent, sensitive personal imagery |
| 2 | Home improvement / interior / showrooms | process, transformations, testimonials, product demos | client property permissions, intermittent projects |
| 2 | Local retail / specialty stores | arrival, use cases, people, promotions | thin margin, high turnover |
| 3 | B2B professional services | expert tips, explainers, trust, hiring | lower visual material; approval/legal scrutiny |

**Launch choice:** present agency as industry-agnostic, but prospect into 2–3 of these verticals and gather evidence. Do not build fabricated 'industry portfolio' pages until there are relevant projects. Geographic targeting should start wherever filming team can feasibly visit at known cost; national quotes include travel.

## Buyer jobs-to-be-done
- 'I want our brand to look credible and active without doing production personally.'
- 'I need someone to decide what to post, arrive with equipment, make it, post it and report back.'
- 'We have activity worth showing but nobody organizes shoots.'
- 'I need a reliable outsourced team, not a different freelancer for every step.'

## SEO: intent map (no invented volumes)
**No real monthly search-volume, CPC or keyword-difficulty dataset was obtained.** Google results and competitors establish language used in-market, not quantitative demand. Validate via Google Keyword Planner with location Bulgaria, language Bulgarian, 12 months, de-duplicate singular/plural/word-order variants. Reference: https://support.google.com/google-ads/answer/7337243

| Intent | Keyword seeds in Bulgarian | Target route | Page treatment |
|---|---|---|---|
| Core high commercial | управление на социални мрежи; поддръжка на социални мрежи; агенция за социални мрежи | `/upravlenie-na-sotsialni-mrezhi` | Full service definition, steps, outcomes/limits, FAQ, quote |
| Full service | цялостно управление на социални мрежи; поддръжка на фейсбук и инстаграм | same core page | Supporting sections; avoid near-duplicate pages |
| Production part of offer | създаване на съдържание за социални мрежи; видеозаснемане за бизнес; заснемане на reels | `/video-sadarzhanie-za-biznes` | Explain filming within recurring management; quote main service |
| Commercial evaluation | цени управление на социални мрежи; поддръжка на социални мрежи цена | `/paketi` | Explain pricing drivers and package scopes, no false tariff |
| Local | управление на социални мрежи + real base city; агенция социални мрежи + city | Optional local section on service/contact | Publish only genuine operating geography; no doorway-city spam |
| Brand/nav | business brand name | `/` and `/za-nas` | Brand identity and entity data |
| Informational later | как да правим reels за бизнес; колко видеа месечно за бизнес; как се прави контент календар | future editorial backlog | Only if experienced team can publish valuable originals |

### SEO technical and editorial requirements
- Native Cyrillic titles/H1/copy with transliterated stable URLs; `lang=bg`; unique title/meta for each indexable page.
- SEO rendered on server, crawlable links, sitemap.xml and robots.txt, correct canonical and `og:locale=bg_BG`.
- Structured data: Organization; LocalBusiness only if genuine eligible business details exist; no fake Review/AggregateRating markup. Google doc: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Core keywords in page heading/narrative naturally; no stuffing or city-page clones.
- Testimonials, clients and video case studies need verified approvals and measurable methodology. Portfolio video thumbnails/transcripts helpful; no false `VideoObject` markup where video missing. Google video SEO: https://developers.google.com/search/docs/appearance/video
- Google Search Console and GA4 only after properly configured ownership and consent.

### Validation experiment (not a precondition for coding)
1. Export Keyword Planner data for the seed groups for Bulgaria (monthly volume bands, competition, bid ranges).
2. Interview 10 prospects and classify the top three recurring objections.
3. Run 20–30 qualified outreaches per selected vertical; track replies, meetings, quotes, close rate, CAC time.
4. Adjust selling language and package economics based on evidence without expanding v1 website features.

## Product SEO priorities for v1
P0: homepage, core service page, package scope page, contact, about, authentic work. P1: supporting on-site video production landing page with clearly subordinate position. P2: real case-study articles and guides. Avoid launching placeholder blogs and empty portfolios that harm trust.


---

# FILE: research/03-legal-and-platform-operating-rules.md

# Legal, publishing, and operational constraints (non-legal-advice research)

**Important:** This document turns observed requirements into product controls, not a claim of legal compliance. A Bulgarian privacy/IP lawyer and accountant should review real policies, contracts, rights and VAT status before launch.

## 1. Website lead forms / privacy
EU GDPR covers identifiable names, personal email addresses, phone numbers, website analytics identifiers and identifiable audiovisual material. Privacy notices must identify controller, purpose, legal basis, retention, recipient categories, rights and contact method. Do not treat generic 'I accept' as a universal lawful basis. A clear link/acknowledgement can be distinct from optional direct-marketing consent. No marketing opt-in required to submit a quote request.
- EU Commission GDPR application: https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/application-gdpr_en
- EU Commission information requirements: https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/obligations_en
- EDPB photos/video as personal data: https://www.edpb.europa.eu/sme/learn-the-basics/data-protection-basics_en

**Implementation rules:** minimize fields; encrypt in transit; restrict DB access; use auditable deletion/export process; document a retention period and exact legal basis with counsel. Do not send submitted data to marketing systems by default. Form anti-abuse must be privacy-aware. Suppress sensitive form content in exception telemetry and client analytics.

## 2. Analytics and cookies
- If GA4/Google marketing tags are added, non-essential storage and collection must be managed with suitable consent; Google offers basic consent mode that blocks tag loading before a choice. Implementation and choice design need legal review. Official docs: https://support.google.com/analytics/answer/14009635?hl=en and https://support.google.com/analytics/answer/13802165?hl=en
- In v1, implement consent **infrastructure and settings UI**. Keep optional analytics disabled until site owner supplies measurement IDs and approves compliant policy/CMP configuration. Essential functions and lead form work regardless of tracking preference. Do not inject advertising pixels by default.
- Keep 'Reject optional', 'Accept selected/optional', and 'Settings' accessible; no dark patterns.

## 3. Filming people and locations
Photos, voice and video with identifiable individuals are personal data; filming and publishing require a valid legal basis and, depending on context, image/personality/property permissions and appropriate notices. **Do not assume consent is always the sole lawful basis** or that entering premises authorizes an advertising shoot.
Operational checklist per shoot:
1. Client confirms authorization to film location, merchandise, logos, employees, customers and third-party materials.
2. Identify who can be filmed; obtain and record appropriate releases/notices where needed, especially for identifiable customers and minors.
3. Avoid capturing bystanders who have not been cleared; reshoot/blur or exclude.
4. Specify raw footage custody, access, retention, deletion after termination, and whether agency can reuse work in its own portfolio.
5. Client approves final media and legally sensitive claims before publishing.
6. Extra care in medical, financial, regulated, alcohol-related or other advertising-restricted categories; review platform and Bulgarian rules before any promise.

## 4. Copyright and music
- EU IP guidance: photographs, audiovisual edits, text and music can be copyrighted; attribution alone does not guarantee permission. https://intellectual-property-helpdesk.ec.europa.eu/news-events/news/intellectual-property-and-social-media-2020-01-23_en
- TikTok states commercial brand content should use commercial-cleared music; its general music catalogue may not grant commercial promotional rights. https://support.tiktok.com/en/business-and-creator/creator-and-business-accounts/commercial-use-of-music-on-tiktok
**Operational decision:** use original audio or media with explicit, documented platform/territory/commercial-use rights; per-platform licensing verification before cross-posting. Do not promise that trendy songs may legally be used for every business.

## 5. Account access / ownership
The **business retains ownership** of social pages, accounts, domains, ad accounts, original follower relationships and customer information. Use role-based delegated platform access where supported; never ask for personal passwords in a marketing website form or require password sharing. 2FA and least-privilege accounts mandatory. Keep platform permissions, authorized publishing and revocation/offboarding checklists. Google Business Profile explicitly supports manager roles without sharing passwords: https://support.google.com/business/answer/3403100?hl=en . Meta/TikTok exact roles and automation permissions must be verified in client onboarding because product interfaces change.

## 6. Definition of 'end-to-end' and limits
Core monthly scope is: initial strategy, content plan, on-site shoot(s), editing, subtitles, captions, asset adaptation, scheduled publication after approval, basic comments monitoring within agreed response window (if selected), KPI summary and monthly review. NOT automatically: ad spend, paid ads management, private inbox sales support, weekend/overnight coverage, crisis PR, influencer deals, talent actors, model releases handled without client cooperation, website SEO, content produced without access, or guaranteed business results.

## 7. Client contract must address
Scope/deliverable counts, channels and location; shoot hours, rescheduling/weather; content sign-off and deemed approval policy (do **not** auto-publish without agreed rules); revision rounds; payment timing/cancellation; VAT statement; usage and intellectual property licensing; agency portfolio reuse permission; confidentiality; raw material and account-access return; data processing roles and DPA if applicable; breach/escalation procedures; third-party music stock; paid ad exclusions; attribution limitations; client responsibilities; abuse/unlawful content refusal; no outcome guarantee.

## 8. Website legal page launch gates
- Authentic legal entity and trade name; legal contact information.
- Bulgarian privacy notice describing actual hosting/email/analytics/processors and retention.
- Cookie policy and working preferences for services actually loaded; no false cookie declaration.
- Terms only where reviewed and appropriate; do not fabricate boilerplate as 'legally compliant'.
- Test privacy rights contact and data deletion process.

## 9. Quote proposal caveats
Prices in EUR. The euro has been the national currency since 2026-01-01; the mandatory dual price display period ended 2026-08-08. https://economy-finance.ec.europa.eu/euro/eu-countries-and-euro/bulgaria-and-euro_en . Indicate VAT inclusion/exclusion based on actual company status and applicable requirements. A quote must show travel, number of shoots, number of **unique** videos vs cross-platform republishes, formats, channel count, moderation and revision limits.


---

# FILE: research/04-go-to-market-and-validation.md

# Bulgarian go-to-market plan and experiments

This plan is a proposed **customer-acquisition test**, not a sourced claim that any particular channel has a known CAC, close rate, or customer volume.

## First commercial wedge
Sell one recurring outcome to one locally accessible group at a time: **'You operate your business; we organize, shoot and publish the content.'** Begin with 2–3 visibly demonstrable verticals that fit your actual shooting radius. Do not build separate websites by industry. Make one website credible, then use direct proposals and approved samples to get early proof.

## Acquisition channel prioritization
1. **Direct warm relationships/referrals:** businesses your team already knows, existing company contacts, friendly owners, professional network. Low infrastructure, fast qualitative learning. Ask for introductions, not endorsements you cannot substantiate.
2. **Research-based local prospecting:** manually identify local businesses with visible products/operations but inconsistent content. Use public, appropriate business contact methods and individualized, truthful pitches; comply with Bulgarian/EU privacy and electronic marketing laws. Avoid scraping private details, mass unsolicited campaigns and deceptive personas.
3. **Partnerships:** web studios, photographers, brand designers, event/media partners whose customers need ongoing social content. Clarify referral terms, ownership, noncompete, and quality.
4. **Search intent / Google Business Profile:** establish an eligible real company listing if applicable. Google forbids ineligible online-only lead-generation profiles and misrepresentation: https://support.google.com/business/answer/13763036?hl=en . Build core SEO pages, acquire genuine citations/reviews without fabricated review exchanges.
5. **Paid search/social after measurement:** test a bounded ad budget only once the landing page, response workflow and consent/analytics are working. This is **marketing for the agency**, not part of the agency's promised service for clients.

## Prospect scoring rubric (0–2 each)
- Locality: within reasonable shooting radius (2), travel feasible for fee (1), unviable (0).
- Visual opportunity: daily/weekly demonstrable activity (2), moderate (1), little (0).
- Repeatable topics: many (2), occasional (1), scarce (0).
- Budget signal: signs of existing marketing spend/healthy operation (2), unsure (1), clearly inadequate (0). **Signal is not verified ability to pay.**
- Access: clear point of contact and filming permissions (2), unclear (1), impossible (0).
- Strategic fit: owner wants recurring outsourced workflow (2), one-off (1), unrelated need (0).

A score of 9+ is an outreach **priority heuristic**, not a statistically calibrated conversion predictor.

## Outreach experiment
- Choose three sectors, 20–30 businesses per sector. Record public website/social status, what could be filmed, primary hypothesis, actual contact channel, location, date and response—subject to applicable law.
- Build 3 distinct message angles: time saved, visual storytelling, consistent content and approval process.
- No fabricated 'I am a satisfied customer' personas or exaggerated results.
- Track: 1) qualified contacts, 2) conversations, 3) discovery calls, 4) viable quotations, 5) paid retainers, 6) realized first-month margin and delivery hours.
- After 10 conversations, refine the FAQ and pricing drivers. After 3 paid pilots, revisit public price display, packages, vertical emphasis and actual proof assets.

## Initial SEO and conversion experiments
- Use Bulgaria-targeted Google Keyword Planner export to rank clusters by likely intent, approximate volume and advertiser competition; do not claim any numbers without export. https://support.google.com/google-ads/answer/7337243
- Set up Search Console, define lead request as primary conversion (server DB truth), track `lead_form_success` only after durable insert, and attribute manually confirmed client origins.
- A/B test only after meaningful volume; otherwise conduct moderated usability interviews with 5 prospects and revise confusing phrasing.
- Record which pages generate meetings vs just clicks; a service page attracting editing-only buyers is a sign of poor positioning.

## Sales discovery call guide
1. What kinds of customers do you want to attract? What action should they take after seeing a post?
2. Which accounts do you use today? Who decides and who posts?
3. What content have you made in last 30 days? Why that amount?
4. What could we film at your business in one visit? Any people/permissions constraints?
5. Who will approve scripts and final edits, and within what timeframe?
6. What is an acceptable monthly budget and minimum engagement period?
7. What was disappointing about previous marketing providers? What would successful service feel like after 90 days?
8. Which platforms are relevant to your actual customers? What business signals can we track reliably?
9. Explain 4/8/12 *original video* options, not platform count multiplied by video count; check perceived value.

## Don't oversell
A new agency can credibly sell a disciplined production and publishing system, but not a proven claim of 'we will increase sales 3×' or 'daily viral content'. When the first client approves case materials, publish factual behind-the-scenes process and attributable metrics with time window, limitations and consent.


---

# FILE: product/01-service-model-and-economics.md

# Service model, packages and commercial economics

## Positioning
A recurring outsourced social presence team that can **come to the business, film original material, transform it into a planned monthly content calendar, publish it, and report clearly**. Not a promise of instant growth. Clients receive an operational production-and-distribution process.

## Deliverable dictionary
- **Unique short-form video**: one editorial concept and finished vertical video, typically 15–60 seconds, one primary 9:16 master, burned subtitles where relevant, captions, with 1 or 2 platform adaptations as agreed.
- **Platform variant**: edits or formatting needed to use the same creative on another platform; **not** counted as another unique video.
- **Photo / static post**: individually agreed deliverable, not automatically included in every tier.
- **Shoot**: one visit, one agreed location and maximum on-site production hours, including setup time; travel accounted separately.
- **Strategy**: customer/offer discovery, competitor review, channel recommendations, 3–4 content pillars and tone.
- **Monthly calendar**: scheduled publishing dates, platform, hook/concept, creative and approval status.
- **Publishing**: scheduled or manual publishing on delegated client accounts; fallback manual if native scheduler/API lacks a feature.
- **Reporting**: platform-native reach/view/watch/engagement and tracked enquiries when verifiably attributed; no unsupported ROI claims.
- **Community support**: optional bounded comments monitoring/flagging; public replies and inbox handling only if explicit in SOW.

## Sales-facing tier comparison: no public numerical price until economics validated
| | Старт | Растеж | Индивидуално |
|---|---|---|---|
| Intended for | First consistent presence | Businesses with weekly content needs | Multi-location / large production |
| Indicative unique short videos/month | 4 | 8 | Individually scoped, often 12+ |
| Filming | 1 shoot/month, agreed duration | 1–2 shoots/month | Custom |
| Platforms | Up to 2 selected | Up to 3 selected | Custom |
| Content strategy/calendar | Yes | Yes | Yes |
| Captions/subtitles/platform adaptations | Defined in quote | Defined in quote | Defined in quote |
| Publishing after approval | Yes | Yes | Yes |
| Monthly reporting | Basic | Expanded | Custom |
| Photo/static posts | If quoted | If quoted | If quoted |
| Paid ads budget/management | Excluded | Excluded | Separate future quote |
| Public price on site | 'По индивидуална оферта' | 'По индивидуална оферта' | 'По индивидуална оферта' |

These video and shoot quantities are **a product design hypothesis**, not a fixed sale commitment. Final SOW must define counts and constraints. No unlimited meetings/changes/support.

## Quote intake data
Collect name, company, locality, sector, existing profiles/site, contact (phone or email), goal, estimated budget *optional*, required platforms *optional*, and message. In discovery call establish: filming city and travel distance, accessibility & permissions, time on site, participant availability, number of locations, unique concepts, editing type, platform count, revision needs, intended posting frequency, approval latency, moderation scope, assets required, contract duration.

## Estimation formula
`estimated_monthly_delivery_cost = (strategy_hours + scripting_hours + shoot_hours + travel_hours + editing_hours + copy_and_adaptation_hours + publishing_hours + client_management_hours + reporting_hours + revisions_allowance_hours) × loaded_team_hourly_cost + cash_travel_cost + tools_and_media + subcontractors`

`quote_net_of_VAT = max(minimum_viable_retainer, estimated_monthly_delivery_cost / (1 - target_gross_margin))`

Set `loaded_team_hourly_cost` using wages/contractor costs, taxes, equipment depreciation, office/admin overhead and realistically billable hours. Decide target gross margin with the actual team, do not derive public prices from unverified salary assumptions. If staff rate varies by role, calculate sum of `hours_role × loaded_cost_role` instead of a single blended rate. Add an appropriate contingency or track project variance rather than hiding risk.

### Worked illustrative example — not a public quote
Assumptions: strategy 3 h; scripting 3 h; shoot 5 h; edit 12 h; adaptations/copy 4 h; publish/report/client/revisions 6 h; travel 2 h = **35 labour hours**. Blended loaded cost €18/h, other direct expenses €90; monthly cost = €720. At 35% target gross margin, required price ≈ **€1,108 net of VAT**. This example changes drastically with actual efficiency. If two monthly shoot days add another 5–10 h, raise the quote accordingly.

## Default service policy (proposed, requires commercial sign-off)
- 3-month recommended initial engagement for content testing and reliable scheduling; term and cancellation defined in signed SOW.
- One client point of contact for approvals, consolidated feedback (not 5 independent reviewers).
- Two consolidated correction rounds on each unique video; new direction or major reshoots outside scope.
- Calendar and scripts approved before filming; final creative before publishing.
- Standard working days/hours, emergency escalation separately agreed.
- Revisions and approval delays move delivery dates in a documented manner.
- Travel/base city charged after agreed service radius, determined in quote.
- Client responsible for access and proper filming permissions.
- Do not promise specific follower, lead, revenue, views, conversions or posting volume before a signed SOW.

## First 90-day operating cadence (proposed)
**Weeks 1–2:** discovery, audit, profiles, success metric baseline, access, content pillars, production schedule. **Weeks 3–4:** first shoot, script/creative drafts, approval, publish, gather initial signals. **Month 2:** steady cadence and monthly performance review. **Month 3:** reassess content themes, efficiency, engagement, client satisfaction and renewal viability.

## KPIs
Agency operations: qualified lead rate, response time, discovery call rate, proposal-to-close, gross margin per client, on-time delivery, revision count, recurring revenue, retention. Content: platform-native reach, watch time where available, saves/shares, engagement, profile visits, enquiries with explicit attribution. Explain that organic metrics are directional and that results vary.


---

# FILE: product/02-positioning-and-bulgarian-copy.md

# Positioning, language and Bulgarian-first copy

## Brand promise
**Business owners focus on operating their business; the agency plans, films, edits and manages its social presence.** No fake 'market leader' or 'X+ clients' claims.

## Tone
Professional, approachable, decisive, concrete. 'Вие/Вашият бизнес' across site unless actual brand deliberately approves informal tone. Use Bulgarian everyday terms alongside the phrases the audience searches for; explain 'Reels' simply. Avoid buzzwords, guaranteed results, aggressive scarcity and fake urgency.

## Homepage draft copy (editorially ready, replace brand-specific references)
**Eyebrow:** Съдържание и управление на социални мрежи за бизнеса

**H1:** Вашият бизнес има какво да покаже. Ние се грижим хората да го видят.

**Subhead:** Измисляме съдържанието, идваме да снимаме, монтираме видеата и управляваме публикациите Ви във Facebook, Instagram и TikTok. Всичко по ясен план и с Вашето одобрение.

**Primary CTA:** Поискайте оферта

**Secondary CTA:** Вижте как работим

**Proof strip:** Use only real customer logos/verified process numbers; otherwise replace with truthful service statements: `Стратегия • Заснемане • Монтаж • Публикуване • Отчет`.

**Problem section H2:** Добрата работа не винаги се вижда онлайн.
Body: Много бизнеси имат интересни продукти, услуги и хора, но нямат време постоянно да измислят, снимат и публикуват съдържание. Организираме този процес вместо Вас, за да изглежда присъствието Ви последователно и професионално.

**Service section H2:** Един екип. Целият процес.
Cards: (1) Проучваме бизнеса; (2) Планираме съдържанието; (3) Идваме и заснемаме; (4) Монтираме и подготвяме; (5) Публикуваме след одобрение; (6) Измерваме и подобряваме.

**Monthly CTA:** Нека създадем план за Вашия бизнес. Разкажете ни къде работите и какво искате да постигнете. Ще предложим обхват и индивидуална цена.

## Core service page
**H1:** Цялостно управление на социални мрежи за Вашия бизнес
**Lead:** От първата идея до публикуването — управляваме процеса, така че профилите Ви да бъдат поддържани с реално съдържание от Вашия бизнес.
**Sections:** What included; who it suits; first month; approval workflow; platform selection, not blanket coverage; package comparison; what affects quotation; FAQ; final CTA.

## Supporting production page (not a separate editing storefront)
**H1:** Оригинално видео съдържание, заснето във Вашия бизнес
**Lead:** Посещаваме обекта Ви, подготвяме кадрите и превръщаме един снимачен ден в поредица от кратки видеа за социалните Ви профили. Заснемането е част от услугата ни за цялостно управление.
**CTA:** Поискайте план за съдържание

## Package page
**H1:** Пакети според нуждите на Вашия бизнес
**Lead:** Няма две еднакви фирми. Можем да започнем с няколко видеа месечно или да изградим по-активен календар. Всяка оферта уточнява посещенията, броя оригинални видеа, платформите, корекциите и публикуването.
**On three cards:** Старт / Растеж / Индивидуално; quantities from product spec described as ориентировъчен обхват. Main buttons **Поискайте оферта**, never 'Купи' or 'Абонирай се'.

## Contact page
**H1:** Разкажете ни за бизнеса си
**Lead:** Няма нужда да имате готов план. Посочете с какво се занимавате и в кой град се намирате. Ще обсъдим какво съдържание има смисъл да създаваме и как би изглеждало месечното ни сътрудничество.
**Confirmation:** Получихме запитването Ви. Ще се свържем с Вас чрез предоставения контакт. (Don't promise reply within X hours unless team commits.)
**Error:** Не успяхме да изпратим запитването. Моля, опитайте отново или се свържете с нас по посочения телефон/имейл.

## FAQ content
- **Трябва ли сами да снимаме?** Не. При услугата с видеопродукция екипът ни идва със своя техника по предварителен график. Планираме какво ще се снима и кой трябва да участва.
- **Управлявате ли профилите и публикувате ли?** Да, за договорените платформи. Подготвяме съдържанието, изпращаме го за одобрение и публикуваме според календара.
- **Може ли да работим извън [град]?** Обслужваме бизнеси в България, като уточняваме логистиката и пътните разходи преди оферта. Do not publish a literal [city] placeholder.
- **Колко струва?** Зависи от броя оригинални видеа, снимачни посещения, локации, платформи и необходимото управление. След кратък разговор изпращаме конкретен обхват и цена.
- **Гарантирате ли повече продажби или последователи?** Не обещаваме конкретни числа. Поставяме измерими цели и предоставяме отчети, за да подобряваме съдържанието с времето.
- **Трябва ли да се появяваме във видеата?** Не винаги. Можем да покажем процеса, продуктите и мястото; някои идеи изискват говорител и се договарят предварително.
- **Поемате ли рекламния бюджет и съобщенията 24/7?** Платените кампании, рекламният бюджет и денонощното обслужване не са част от стандартния обхват.
- **Кой одобрява публикациите?** Вашият определен представител. Съгласуваме предварително календара и окончателните материали, преди да публикуваме.

## Metadata draft (brand name from env/config)
- Home title: `Управление на социални мрежи и видеосъдържание | {Brand}`
- Core service title: `Цялостно управление на социални мрежи за бизнеси | {Brand}`
- Supporting page title: `Видеозаснемане и съдържание за социални мрежи | {Brand}`
- Packages title: `Пакети за управление на социални мрежи | {Brand}`
- About title: `За нас | {Brand}`
- Contact title: `Поискайте оферта за социални мрежи | {Brand}`
Descriptions: ~130–160 chars, genuinely reflect each page; avoid guarantees and fictional geography.

## Claims rules
Never assert numbers of customers, projects, ROAS, awards, reviews, locations or prices unless owner provides supporting records. Agency name, physical location, people and phones are factual configuration, not creative copy.


---

# FILE: website/01-information-architecture.md

# Website information architecture and page-by-page requirements

## Mission and funnel
Visitor lands on service/portfolio/home → understands complete filming-to-publishing offer → sees trust through real footage, explicit process and transparent scope → evaluates typical package → submits qualified enquiry → gets confirmation → agency receives stored lead and notification → follows up manually. **There is no online checkout**.

## Routes (Bulgarian UI, ASCII transliterated slugs)
| Route | Page | Index? | Primary action | Priority |
|---|---|---|---|---|
| `/` | Homepage | yes | Ask for quote | P0 |
| `/upravlenie-na-sotsialni-mrezhi` | Main end-to-end service | yes | Ask for quote | P0 |
| `/video-sadarzhanie-za-biznes` | Filming as part of end-to-end service | yes | See core offer / quote | P1 |
| `/paketi` | Illustrative scope levels / pricing drivers | yes | Ask for quote | P0 |
| `/rabota` | Real portfolio overview | yes **only if real cases exist** | Quote | P0 content gate |
| `/rabota/[slug]` | Verified case-study detail | yes **only if genuine** | Quote | P1 |
| `/za-nas` | Team, method, values, actual base | yes | Quote | P0 |
| `/kontakti` | Quote enquiry form and verified contact | yes | Submit form | P0 |
| `/poveritelnost` | Privacy policy | yes | Privacy contact | P0 legal gate |
| `/biskvitki` | Cookie/privacy choices | yes | Manage optional preferences | P0 legal gate |
| `/_not-found` | Proper 404 | no | Return home | P0 |

**No empty published content:** hide `/rabota` navigation and return `noindex`/404 until actual rights-cleared assets/cases exist. Do not seed the site with fake case studies. The absence of a portfolio must not block the lead form or falsely imply experience. Avoid duplicate pages for each social platform in v1.

## Global navigation
Logo text/image (real brand) → Начало (optional when clicking logo), Услуга, Как работим (homepage anchor or service), Пакети, Проекти (conditional), За нас, Контакти; persistent visually prominent `Поискайте оферта`. On mobile: accessible menu with keyboard handling; all anchor links work. Sticky header transitions to compact layout. Primary CTA goes to `/kontakti` with `from` source optionally sent and displayed unobtrusively.

## Homepage ordered sections
1. **Hero**: Bulgarian headline, concise promise, primary quote CTA, secondary process scroll; visual: rights-cleared original vertical video montage/poster, or tasteful typography/composition if no genuine footage. No fake 'agency filmed X'.
2. **What problem you remove**: no time to brainstorm, film, edit and post; self-managed erratic content; but not fearmongering.
3. **What you actually do**: strategy → calendar → on-location recording → edit → approval → publication → monthly analysis. Six/seven discrete steps; each tells client and agency responsibility.
4. **Sample output/case work**: authentic clips with project label, business category and permission; link to detail page if exists. Entire module conditional on verified assets.
5. **What content can look like**: real category-neutral content formats: product walkthroughs, behind the scenes, expert tips, process demos, team introduction. No unsupported performance claims.
6. **Platforms**: Facebook, Instagram, TikTok selected by fit, with visual references; no claim every channel always included; Shorts conditional.
7. **Packages preview**: Старт (4 originals), Растеж (8), Индивидуално (custom), clearly illustrative; no public price claims.
8. **Why this model works**: one team, original media, planned shoot days, client approval, measurable reporting. No invented testimonials.
9. **FAQ**: six questions, expand/collapse accessible, machine-readable markup only if compliant and relevant.
10. **Final CTA**: short qualification prompt, button; optional contact phone if verified.
11. **Footer**: contact, company details, legal policies, socials (verified only), copyright current year.

## Main service page
- Hero and concise inclusions.
- 'Included' matrix: discovery, audience/content pillars, scripting, shoots, editing/subtitles, captions, native publishing, monthly reports; bounded community as separately agreed.
- Customer responsibilities: point of contact, premises access, filming rights, timely review, account permissions.
- First 30 days timeline and monthly cycle; no fixed result guarantee.
- Explicit supported channels and what is NOT included.
- Quote drivers and approach.
- FAQ + relevant CTA.

## Supporting video content page
- Explain preproduction → shoot → post-production in recurring package.
- Show 9:16 sample cards as real assets only; creative categories if no examples.
- Basic process for batching multiple ideas in one visit.
- Clarify shooting/travel costs in quote and the difference between unique videos and reformatting.
- CTA to the core service, not standalone edit checkout.

## Packages page
Cards show likely monthly scope and inclusions. Label volume as `Примерен обхват; конкретното предложение е индивидуално.` Distinguish one original creative from posting it on multiple channels. All tiers request a quote; none commit to unbounded shoots/platforms. FAQ: pricing factors, starting engagement duration, client participation, revisions, reporting, paid campaigns and travel.

## Portfolio overview and case detail (conditional)
Portfolio card: approved business name/category, 1 still, 1-sentence type of work, playable video with poster, link to case. Case page: situation, approved goals, agency responsibility, formats, content samples, measured outcomes **only with data and methodology**, permission/attribution. Do not claim campaign uplift without baseline and agreed reporting window. Video embed/player accessible; controls, captions where meaningful, no forced autoplay with sound. All video rights verified.

## About
Accurate real team, city/service model, real behind-the-scenes photos if possible, equipment/production approach without unsupported technical flex; quality and review process; reliable contact. If no headshots, use simple honest copy and illustrations/icons, not fake headshots or employee names.

## Contact
Form fields:
- `Име` required (2–100 chars)
- `Фирма / име на бизнеса` required (2–120)
- `Град` required (2–100)
- `Имейл` optional unless phone absent, valid format
- `Телефон` optional unless email absent; accept BG / international formatting, validate leniently; at least one contact mandatory
- `Сайт или профил в социалните мрежи` optional URL/profile text (max 250)
- `Какво искате да постигнете?` required; choices like Повече разпознаваемост, По-редовно съдържание, Повече запитвания, Друго/Не знам
- `Разкажете ни накратко за бизнеса` optional textarea (max 2000)
- `Колко често искате ново съдържание?` optional single choice Не знам/4/8/12+
- Non-ticked optional marketing checkbox **only if marketing mailing is implemented and legally reviewed**; otherwise omit.
- Required plain-language notice/link to privacy policy (acknowledgement, not unsupported consent basis); clear submit state.

Form behavior: progressive enhancement; errors inline; validation server + client; prevent double submit; visible success and accessible focus; retained input on recoverable errors; safe error messages; link/phone fallback; honeypot/spam handling; no attachments in v1.

## Footer and site-wide design
Global footer with factual phone/email/socials, legal entity info only after verification; small CTA; site map. Global optional cookie settings link; no blocking popups on scroll. Search not needed; no user accounts.

## Future roadmap not in v1
Real case studies / proof; 1–2 supported sector landing pages after evidence; blog/guides with original insights; appointment booking if team can maintain calendar; paid social campaigns as separate explicitly contracted capability; deep CRM; multilingual expansion; client portal.


---

# FILE: website/02-design-system.md

# Website visual design system and interaction requirements

## Direction — 'Cinematic editorial clarity'
Premium and lively because product is original media; credible and calm because customers are business owners buying a recurring partnership. Use a Swiss-influenced typographic grid, generous white space, restrained motion, strong video imagery, readable Bulgarian text. Avoid nightclub/gaming look, dark-only novelty, giant fake dashboards, generic smiling stock photos and fake testimonials.

## Suggested token baseline (change only with a documented design rationale)
```css
:root {
  --color-ink: #13191C;
  --color-paper: #F7F6F2;
  --color-white: #FFFFFF;
  --color-muted: #5B6265;
  --color-surface: #ECECE6;
  --color-line: #D7DAD5;
  --color-accent: #D9F568;
  --color-focus: #2055D6;
  --radius-card: 18px;
  --radius-button: 999px;
  --container-max: 1440px;
}
```
The lime accent is used sparingly for CTAs/highlights, with tested contrast for text/icons. Do not treat this as a final logo/brand identity; brand assets are a launch input. Pick self-hosted open fonts with verified Cyrillic coverage (e.g., Inter or Manrope; inspect licensing). Body 16–18px desktop; accessible hierarchy and line-height; strong Cyrillic line breaking.

## Layout
- Responsive mobile-first. Main max width approx 1280–1440px, but **hero and media use full viewport more effectively** on large monitors; don't leave a 600px-column island on a 4K display.
- Breakpoints implementation chosen to match Tailwind defaults; design review at 360, 390, 768, 1024, 1440, 1920 and 2560 px.
- Hero: desktop split of text/media with media large enough to demonstrate service; mobile stacked, CTA before lengthy visual; stable aspect ratios.
- Work showcase: editorial asymmetric video thumbnails, hover interaction optional, accessible card titles and predictable controls; desktop grids, mobile horizontal cards only if accessible.
- Consistent 8px-based spacing scale, max 65–80ch body copy for readability; purposeful whitespace.

## Hero media rules
- Show a poster immediately; video lazy loaded/intersection activated; avoid shipping huge unoptimized hero movies to all mobile users.
- No audible autoplay. If ambient muted preview used, ensure user preference `prefers-reduced-motion` and mobile data fallback supported. Explicit play/pause when videos run. Never start multiple videos at once.
- Use optimized MP4/H.264 or another widely supported format with poster/thumbnail, optional WebM; adaptive quality or CDN transformation if supplied. Video CDN choice is a deployment decision; don't hardwire paid media provider.
- All media must be real and rights-cleared; during development use clearly labeled placeholder boxes/mock media to be replaced by owner.

## Microinteractions
- Discreet headline fade-in and card reveals only when reduced-motion off; no scroll hijacking.
- Accessible accordion FAQ; visible focus; hover never sole indicator.
- Primary CTA clear contrast, always labeled, destination predictable.
- Form status states: idle, validating, submitting, success, error. No deceptive counters or popup countdowns.

## Accessibility
WCAG 2.2 AA intention: semantic headings; meaningful alt text; skip link; keyboard menu/accordion/video; focus visible; 4.5:1 body contrast and 3:1 large text/UI contrast as appropriate; reduced motion; subtitles/transcripts for meaningful videos; error descriptions announced; touch target sizing; accessible dialogs if any. Test with automated axe and manual keyboard/screen-reader checks.

## Performance goals
- Target Core Web Vitals at 75th percentile mobile: LCP <=2.5s, CLS <=0.1, INP <=200ms. Real-user results require monitoring; do not claim achieved based on lab only.
- Target Lighthouse mobile Perf >=90, SEO >=95, A11y >=95 on stable test setup, recognize network/video variance.
- Preload one critical font and hero poster only; images use responsive sizes, AVIF/WebP; no unnecessary motion libraries; code-split media viewer; defer marketing analytics by consent.

## Visual content hierarchy
1. Human-readable main claim.
2. Authentic work/process visual.
3. Scope and how it works.
4. Verification/trust without invention.
5. One clear quote action.

## Approval and delivery assets
Brand name, logo/SVG, legal entity data, brand colors (if overriding tokens), 3–8 original video clips with usage rights, 5–10 photos/frames, 2–4 verified company/team photos, contact channels, links to actual social accounts. If assets are absent, build layout with an obvious content gate rather than pretending fake assets are real.


---

# FILE: website/03-technical-and-functional-spec.md

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


---

# FILE: website/04-acceptance-tests.md

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


---

# FILE: handoff/02-launch-inputs-and-open-validation.md

# Facts to supply, unresolved research, and what can already be built

The v1.0 product and implementation requirements are frozen. These are **inputs**, **commercial hypotheses**, and **legal review items**, not reasons to rebuild the scope.

## A. Owner-provided factual launch inputs (must not be invented)
| Field | Used in | Action |
|---|---|---|
| Official agency/trading name and desired logo | header/footer/metadata | Supply or approve identity |
| Legal entity details / company ID and VAT treatment | privacy/footer/quotes | Owner/accountant verification |
| Domain and target hosting | canonicals, email and deployment | Set real URL and verified environment |
| Official email, phone, contact response owner | contact/footer/alert destination | Verify delivery and phone/links |
| Base filming city, travel service radius and minimum shoot feasibility | FAQ/service/quotations | Set real terms, avoid 'everywhere free' |
| Real team/member bios and authentic photography | About page | Provide approvals; otherwise omit individuals |
| 3–8 real media clips and rights clearances | hero/portfolio | Supply original footage/posters/release notes; otherwise stage with obvious placeholder |
| Real client names, quotes and business outcomes | case studies/testimonials | Explicit approvals; none by default |
| Hosting DB and email credentials | working production form | Provision secrets and test retries |
| Privacy controller/processor map, retention, lawful basis, cookie/analytics choices | legal pages | Lawyer/owner review and approval |

## B. Business hypotheses **not validated** (research backlog)
- Which Bulgarian vertical first has strongest paid demand for a filmed monthly retainer.
- What price and monthly volume produce acceptable realized gross margin at actual local labour/travel cost.
- How many unique videos/month clients value vs how many variants/cuts they think they're buying.
- Whether buyers prefer showing a public **starting price**; spec defaults to custom quote until evidence.
- Actual Bulgarian SEO monthly volumes/CPC/keyword difficulty; no measured data obtained. Keyword seed lists in SEO research are qualitative only.
- What proof (showreel, before/after workflow, industry case studies) most increases qualified lead conversion.
- Whether larger local businesses want paid ads or customer comment/inbox handling. Not in core website scope; sell only if ops exist.

## C. Practical validation without delaying build
1. Client interviews (10+) and production feasibility worksheet; a prospect can evaluate service before brand website is finished.
2. Export Bulgarian Google Keyword Planner keywords monthly volumes and CPC, map to existing pages; add pages only when a distinct search intent is proven.
3. Quote 3 simulated client cases using actual staff costs and realistic travel; review threshold margin; agree commercial copy and policy.
4. Ask 5 potential buyers to navigate wireframes and explain what they think is included; revise misleading copy before launch.
5. Pilot first client, get permission for footage and honest case results; then publish first real case.

## D. What Claude Code can complete with no further business decisions
Fully functioning responsive marketing site and Bulgarian copy; content model; package illustration; contact validation & DB pipeline; notification email abstraction; cookie settings infrastructure; SEO framework; staging media placeholders; tests; documentation; deployment configuration. Only actual external contacts, approved legal documents, commercial rights/claims and production secrets remain content/launch gates.

## E. Change control after freeze
A change to audience, paid ads inclusion, service model, price display, site features, or target countries requires an explicit v1.1 decision entry with rationale, expected business benefit, SEO/page effects, cost and regression tests. Copy refinements using authentic evidence and filling factual placeholders do **not** automatically reopen product scope.


---

# FILE: handoff/01-claude-code-master-prompt.md

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
