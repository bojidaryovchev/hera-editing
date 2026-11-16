# Keyword research and page map (measured, November 2026)

This file closes the open research item from `handoff/02` §B and §C.2: "Actual Bulgarian SEO monthly volumes/CPC/keyword
difficulty; no measured data obtained." It replaces the qualitative intent map in `research/02` §"SEO: intent map"
with measured demand. Nothing in the frozen v1.0 scope changes. The page-title changes proposed at the end replace
spec copy (CPY:61-68); the owner approved them on 2026-11-16 and they are applied (decision L26, locked by a test).

## Method

- **Data:**
  - Source: OpenSEO (DataForSEO, Google Ads-derived volumes).
  - Market: location Bulgaria (2100), language Bulgarian.
  - Pulled 2026-11-11.
  - Calls: three idea expansions (13 seeds), one metrics call (90 candidates) and one live SERP read (10 queries).
  - Cost: 594 credits.
- **Volumes:**
  - Average monthly searches, rounded by Google into buckets (10, 20, 30, 40, 50, 70, 90, 110, 140, 170, 210, 260, 320,
    390, 480, 590, 720…).
  - Google groups close variants, so the singular and plural of one phrase are **not added up**.
  - "—" means no measurable volume (below about 10 a month).
- **KD:** keyword difficulty, 0-100.
- **CPC:** what advertisers pay per click (EUR), a proxy for commercial value.
- **SERP readings:** live Google results for Bulgaria, desktop, read three times and merged.

## The headline finding

Bulgarian business owners search for this service as **„поддръжка на фейсбук страница“** (maintaining a Facebook
page), not as "social media management":

| Keyword | Volume | KD | CPC | Note |
|---|---:|---:|---:|---|
| поддръжка на фейсбук страница | 720 | 0 | 2.36 | Same cluster as the plural |
| поддръжка на фейсбук страници | 590 | 0 | 2.06 | Do not add to the above |
| поддръжка на социални мрежи | 40 | 7 | 0.89 | |
| маркетинг в социалните мрежи | 20 | 17 | 1.44 | |
| управление на социални мрежи | 10 | — | 0.90 | The spec's main term |
| управление на фейсбук страница | 10 | — | — | |
| поддръжка на инстаграм профил | 10 | — | 0.36 | |
| администриране на фейсбук страница | 10 | — | — | |
| агенция за социални мрежи | — | — | — | No measurable demand |

The core cluster is worth roughly **750-800 searches a month** nationally, at almost no difficulty and with a real
commercial CPC. It is small, so search will be one channel among several, but it is very winnable.

### Price intent (for `/paketi`)

| Keyword | Volume | KD | CPC |
|---|---:|---:|---:|
| поддръжка на социални мрежи цена | 30 | 7 | 1.10 |
| поддръжка на фейсбук страница цена / цени | 20 each | 40 | 1.06 |
| колко струва поддръжка на фейсбук страница | 10 | — | — |
| управление на социални мрежи цена / цени | — | — | — |

### Video intent (for `/video-sadarzhanie-za-biznes`)

| Keyword | Volume | KD | Note |
|---|---:|---:|---|
| видео заснемане / видеозаснемане | 210 each | 21 | Results are wedding and event studios with package prices |
| видео заснемане на сватба | 210 | 5 | Not our market |
| видеограф | 140 | 9 | Wedding videographers |
| видео монтаж | 40 | 44 | Editing services and apps |
| фото и видео заснемане | 30 | 22 | |
| видео продукция | 30 | — | |
| видео заснемане пловдив / варна | 30 / 20 | — / 34 | |
| видео за социални мрежи, рекламно видео, рекламен клип, корпоративно видео, видео маркетинг | 10 each | — to 38 | Right intent, tiny demand |
| заснемане на reels, reels за бизнес, фирмено видео, кратки видеа, продуктово видео | — | — | No measurable demand |

The video page will not be a traffic driver: the head terms belong to weddings and events. It stays a supporting page
(as IA:48 already says) that explains filming inside the monthly service and links to the main service page.

### Broad agency terms (not targeted)

| Keyword | Volume | KD | Why not |
|---|---:|---:|---|
| дигитален маркетинг | 1,600 | 19 | Informational, courses and definitions |
| маркетинг агенция | 390 | 45 | SEO and advertising agencies; local pack |
| дигитална агенция | 390 | 68 | Same, harder |
| агенция за дигитален маркетинг | 210 | 66 | Same |
| маркетинг агенция софия | 90 | 96 | Very hard |
| smm | 210 | 8 | English definitions and tools |
| реклама във фейсбук | 140 | 0 | Paid ads: not part of the service (FAQ q7) |
| ugc | 880 | 0 | Ambiguous, navigational |

### Local (pending the base city)

| Keyword | Volume | KD |
|---|---:|---:|
| маркетинг агенция варна | 260 | 21 |
| рекламна агенция варна | 260 | 5 |
| рекламна агенция бургас | 170 | 2 |
| рекламна агенция софия | 140 | 53 |
| рекламна агенция пловдив | 90 | 14 |
| маркетинг агенция пловдив / маркетингова агенция пловдив | 40 | — |
| поддръжка на фейсбук страница + град | — | — |

The "рекламна агенция + city" results are mostly print and signage shops (for Plovdiv: табели, печат), so the intent
is mixed. Local search is best served by a **Google Business Profile** and the real city on the contact and service
pages once the owner supplies it (handoff/02 §A). Spec IA:38 already rules out city doorway pages.

## What the results pages show

| Query | Who ranks (top results) | Features |
|---|---|---|
| поддръжка на фейсбук страница | Small agencies' service pages ("Поддръжка на Фейсбук страница – WebStation", "цени за поддръжка на facebook страници"), tip articles ("13 доказани практики…", "…в няколко бързи съвета"), Facebook pages | AI Overview, video |
| поддръжка на социални мрежи | Agency service pages (SS Studio, GetSEO, Social Book, Martin Kotsev) and benefit articles | AI Overview |
| поддръжка на социални мрежи цена | Price pages and guides ("Цени за управление на социални мрежи", "Колко струва поддръжката на социални мрежи в България?") | AI Overview, related searches |
| управление на социални мрежи | Agency pages (SS Studio, Update.bg Бургас, RE:Create, Step ahead) and courses | AI Overview, ads |
| видео заснемане | Wedding and event studios with package prices | Local pack, AI Overview, ads |

Every core query shows a Google **AI Overview**. Pages that answer plainly ("what is included", "how much it costs and
why") are the ones it quotes.

## Recommended page map

| Page | Primary target | Secondary | Treatment |
|---|---|---|---|
| `/` | Brand; "поддръжка на социални мрежи и видео за бизнеса" | поддръжка на фейсбук страница | Links to the service page with descriptive anchor text |
| `/upravlenie-na-sotsialni-mrezhi` | **поддръжка на фейсбук страница** (+ plural) | поддръжка на социални мрежи, управление на социални мрежи, поддръжка на инстаграм профил, маркетинг в социалните мрежи | Answer-first section "Какво включва поддръжката на фейсбук страница и Instagram"; FAQ |
| `/paketi` | поддръжка на социални мрежи цена | поддръжка на фейсбук страница цена/цени, колко струва… | "От какво зависи цената" up front. Honest: no tariff, scope examples, what drives the quote |
| `/video-sadarzhanie-za-biznes` | видео за социални мрежи, видеозаснемане за бизнес | рекламно видео, рекламен клип, корпоративно видео | Supporting page; does not chase wedding terms |
| `/kontakti` | Brand + "оферта" | (base city once known) | NAP and contact once verified |
| `/za-nas` | Brand | (base city, team) | Entity and trust signals |

Keep the spec's URLs. A slug carries little ranking weight, and changing routes is a v1.1 decision (handoff/02 §E).

### Titles (approved by the owner on 2026-11-16, applied)

| Page | Spec title (current) | Proposed title |
|---|---|---|
| Home | Управление на социални мрежи и видеосъдържание | Поддръжка на социални мрежи и видео за бизнеса |
| Service | Цялостно управление на социални мрежи за бизнеси | Поддръжка на фейсбук страница и социални мрежи за бизнеса |
| Packages | Пакети за управление на социални мрежи | Пакети за поддръжка на социални мрежи: от какво зависи цената |
| Video | Видеозаснемане и съдържание за социални мрежи | (keep) |

The H1s can stay as written. The search phrase goes in the title, the description, one H2 on the service page and
naturally in the copy. Use the Cyrillic „фейсбук“ in those places, as searchers type it; the body copy can keep
"Facebook".

## Later, once the site is live (P2, only with original material)

- A practical guide around the informational half of „поддръжка на фейсбук страница“: the tip articles that rank
  today show the demand.
- „идеи за сторита в инстаграм“ (1,000 a month, KD 0) and similar idea searches: top-of-funnel, mixed audience.
  Worth an article only if the team can publish genuinely useful originals (research/02 §P2).
- Track the core cluster in an OpenSEO rank tracker after launch (costs credits; set up once the domain exists).
