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
