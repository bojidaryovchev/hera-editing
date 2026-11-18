# Business research: clients, prices, demand, platforms, channels (2026-11-18)

The evidence behind [docs/strategy.md](../strategy.md).

- **What it is.** Five desk studies, made in parallel on 2026-11-18 and merged here. Only four things changed:
  - the headings;
  - the paths of the project documents they cite, which moved into `spec/` and `docs/research/`;
  - one local file path;
  - one wrong citation. The doorway-page rule is in spec/research/02 (the SEO intent map), not "IA:38".
- **Who made them.** Each study was written by a research agent with web access, briefed to use primary sources
  wherever they exist:
  - laws on lex.bg and EUR-Lex;
  - Eurostat and NSI statistics;
  - platforms' own help and policy pages;
  - competitors' published pages;
  - measured search data from OpenSEO (DataForSEO, location Bulgaria).
- **The lead's checks.** The figures the strategy relies on most were then re-checked against the primary source. They
  are listed below.
- **Not legal or tax advice.** Part 5 §5 lists what a Bulgarian lawyer and accountant should confirm.

| Part | Question | Main sources |
|---|---|---|
| [Part 1](#part-1-who-could-buy-market-size-from-official-statistics) | Which Bulgarian businesses could pay for a filming-first monthly service, and where they are | Eurostat SBS and business demography 2024, NSI regional data, Eurostat/NSI ICT surveys 2023–2025 |
| [Part 2](#part-2-what-the-market-charges) | What agencies, freelancers and an in-house hire cost | 40+ published price pages, NSI wages Q3 2026, job ads |
| [Part 3](#part-3-what-people-search-for-and-what-competitor-sites-contain) | Whether sector, platform, city or price pages have search demand, and what 16 competitor sites contain | OpenSEO keyword metrics (462 keywords) and SERPs, competitor sites and sitemaps |
| [Part 4](#part-4-platforms-content-and-sector-rules) | Which platforms and content suit each sector, and the rules for filming, music and regulated sectors | platform help pages, laws, regulators, usage statistics |
| [Part 5](#part-5-outreach-google-business-profile-channels-and-contract-basics) | Whether and how Hera may approach businesses, the Google Business Profile, acquisition channels, VAT and contracts | ЗЕТ, ЗЕС, GDPR and EDPB, Google and platform policies, ЗДДС, ЗЗД, ЗАПСП |

**Conventions.**
- Euro throughout. Bulgaria adopted the euro on 2026-01-01, and leva are converted at 1.95583.
- Part 2 marks every figure:
  - **[P]**: published, read on the page;
  - **[S]**: secondary or unverified;
  - **[E]**: an estimate or calculation.
- Part 1 cites its sources as [E1], [N1] and so on, listed in its section 6.
- Estimates are labelled in every part. "My reading" marks an interpretation in Part 5.

**Limits.**
- The session's web-search allowance ran out while the studies were running. After that, the agents reached sources
  only through known URLs and links on official sites. Each part says where this left a gap:
  - Part 1: whether a 2026 ICT release exists;
  - Part 2: salary surveys and SME budgets;
  - Part 5: how Bulgarian SMEs choose providers.
- Some sites blocked automated reading and are marked where they appear: jobs.bg, Zaplatomer, Upwork,
  martinkotsev.com.
- The tables in Part 1 can be rebuilt from the Eurostat and NSI datasets listed in its section 6. The raw downloads
  were not kept.

## Checks by the lead (2026-11-18)

| Claim | Where | Re-checked against | Result |
|---|---|---|---|
| Food and beverage service (I56) enterprises, 2024: 19,441, of which 16,879 with 0–9 persons | Part 1 §1.0 | Eurostat API, `sbs_sc_ovw`, `ENT_NR` | Match |
| Firms with 10+ persons, 2023, Bulgaria / EU: any social media 38.0 / 61.1; social networks 37.2 / 59.0; multimedia sharing 13.2 / 31.5 | Part 1 §4.1 | Eurostat API, `isoc_cismt`, `GE10` | Match (38.04 / 61.11, 37.23 / 59.03, 13.23 / 31.53). The multimedia indicator is defined as "multimedia content sharing websites (e.g. YouTube, Flickr, Picasa, SlideShare)", not video in general |
| Firms with 10+ persons using social media in 2025: 41.5% | Part 1 §4.1; Part 5 §3.1 | Found independently by Part 1 (Eurostat) and Part 5 (NSI press release of 05.12.2025) | Consistent |
| Templa: Старт €549, Растеж €1,049, Brand Boss €1,790, Само Reels €790 (€690 in its FAQ) | Part 2 §1.2 | templa.bg pages | Match |
| Next Level Digital: Silver €899.99 (12 videos, no platform management), Gold €999.99 (12 videos, 2 platforms), Platinum €1,299.99 (20 videos, 3 platforms) | Part 2 §1.2 | nextleveldigital.bg/bg/pricing | Match |
| Average gross wage Q3 2026: €1,438 (+10.4% y/y); accommodation and food €896 / €902 / €930 (Jul–Sep) | Part 2 §3.1 | NSI release of 13.11.2026 | Match |
| „маркетинг за ресторанти“ and „тикток агенция“: no data; „реклама за салон за красота“ 30; „продуктова фотография“ 140 | Part 3 §1 | OpenSEO `get_keyword_metrics`, re-pulled 2026-11-18 | Match |
| „поддръжка на фейсбук страница“: 720 | Part 3 (repeating docs/research/05, pulled 2026-11-11) | Same re-pull | **590** (CPC €1.10, against €2.36 on 2026-11-11). These are adjacent buckets of Google's 12-month average, so read the core cluster as about 650–800 searches a month nationally, not more |
| Resend forbids "unsolicited messages of any kind, including cold outreach, purchased lists, or scraped contact data" | Part 5 §1.6 | resend.com/legal/acceptable-use (updated 2026-10-13) | Match |
| Mandatory VAT registration above €51,130 annual turnover, in force 01.01.2026 | Part 5 §4.1 | ЗДДС art. 96(1) on lex.bg | Match |
| Medical services by medical establishments are VAT-exempt | Used by the strategy (§5.3) | ЗДДС art. 39 т. 1 on lex.bg | Confirmed: "Освободена доставка е: 1. … извършването на здравни (медицински) услуги … от лечебни заведения" |
| "Забранява се пряката реклама на спиртни напитки" | Part 4, restaurants and bars | ЗЗ art. 55(1) on lex.bg | Match |
| "Медицинските специалисти, както и лечебните заведения, не могат да използват за своята дейност търговска реклама" | Part 4, clinics | ЗЗ art. 190(2) on lex.bg | Match |
| The primary-energy figure (kWh/m²) from the certificate "се отбелязва във всички обяви" | Part 4, real estate | ЗЕЕ on lex.bg | Match. The sentence is in the text; the article number (34(4)) is from Part 4 |
| Meta: commercial or non-personal use of music is prohibited without the appropriate licences | Part 4, music | Meta Music Guidelines (effective 26 Mar 2024) | Match |
| TikTok: business accounts must use the Commercial Sounds page or the Commercial Music Library, or pre-clear all music rights | Part 4, music | TikTok EEA Business Terms, clause 5(c) (July 2025) | Match |
| Epidemic Sound's business licence caps agencies at five end clients a month and USD 5m turnover | Part 4, music | epidemicsound.com business licence | **Not re-checked.** The page renders only with JavaScript |

---

## Part 1. Who could buy: market size from official statistics

### Summary

**Who can afford it.** 2024 is the latest final year. The test is marketing at 2–5% of turnover, so every count here is an estimate. Micro firms (0–9 persons) average €20–70k turnover in the target services, so €8k would be 12–39% of it. Buyers start at 10+ persons employed: about **10,900 firms** across the nine divisions.

| Sector | Firms with 10+ persons |
|---|---:|
| Retail (many are chains) | 3,766 |
| Food and beverage | 2,562 |
| Specialised construction | 1,412 |
| Health | 839 |
| Accommodation | 769 |
| Motor trade | 651 |
| Real estate | 505 |
| Personal services | 218 |
| Sports | 166 |

About 4,200 firms (20+ persons) can carry the €15k plan, and about 10,000 firms with 5–9 employees are a stretch pool. The named niches are small: dental ~175–245, hair/beauty ~70–130, agencies ~45–75, fitness ~25–40, car repair 245.

**Where.** Sofia has 30.7% of enterprises, 34.4% of firms with 10+ employees and 48% of turnover. Sofia, Plovdiv, Varna and Burgas together hold 58% of firms with 10+ employees. Estimated buyers: Sofia ~3,700, Plovdiv ~1,100, Varna ~900, Burgas ~900, the rest ~4,300. Burgas has 36% of tourist nights.

**Social media (firms with 10+ persons).**
- 2025: 41.5% used it (EU 63.6%); 38.7% at 10–49, 52.5% at 50–249, 69.8% at 250+.
- 2023: 29.3% used it for marketing (EU 50.7%); only 13.2% used video platforms (EU 31.5%).
- 2024: 25.6% paid for online ads.
- By sector (2025): hospitality 66.4%, retail 44.4%, construction 21.9%.
- Yet 71.1% of Bulgarian adults use social networks.

**Gaps.** No 0–1/2–9 turnover split. No size classes for the 4-digit codes. Districts only by NACE section. The ICT survey leaves out micro firms, health, sports and beauty. No official marketing-spend figures. I didn't check whether a 2026 ICT release is out (search allowance ran out).

---


Prepared 2026-11-18 (desk study; figures extracted 2026-11-18). Source IDs [E1], [N1] and so on are listed in section 6 with URLs and years. Service price assumed: €600–1,300 a month before VAT, about €8,000–15,000 a year.

### 0. Method, definitions, conversions

- **Enterprise.** All non-financial enterprises active for all or part of the year that filed an annual report with NSI or the National Revenue Agency. Sole traders (ЕТ) are included. This is NSI's metadata definition [N1].
- **Size classes.**
  - SBS tables use persons employed: 0–1, 2–9, 10–19, 20–49, 50–249, 250+. This includes working owners and unpaid family workers, counted by NSI in full-time equivalents.
  - Business demography ([E4], [E6]) uses employees instead: 0, 1–4, 5–9, 10+.
- **Net turnover** excludes VAT and excise.
- **"c"** means confidential. **"u"** means low reliability (not published).
- **Currency.**
  - Eurostat SBS values are published in EUR. The lev was pegged at 1.95583 per euro, so the conversion is exact.
  - NSI now publishes pre-2026 data in EUR converted at 1.95583. Bulgaria adopted the euro on 1 January 2026; see the note on [N2].
  - **NSI values still in BGN ([N6]–[N10]) are converted here at EUR = BGN / 1.95583.**
- **Average turnover per enterprise.** `Avg (EUR k) = Net turnover (EUR m) x 1,000 / Enterprises`. Example: I56, 10–19 persons employed, 2024: 685.8 x 1,000 / 1,655 = **€414.4k**.
- **Derived values.** "Derived" means calculated by subtraction from published totals, for example 10+ = Total − (0–9).
- **Year.**
  - 2024 final data are used: Eurostat SBS updated 2026-09-30, NSI published 2026-06-30.
  - NSI's 2025 preliminary release [N12] gives 484,201 non-financial enterprises including agriculture (+2.5%) and 2,284,729 persons employed (FTE).
  - 2025 by size class [N5]: 453,691 with up to 9 employed, 25,110 with 10–49, 4,622 with 50–249, 778 with 250+.
  - The 2025 data use NACE Rev. 2.1 (КИД-2025). NSI says comparison with earlier years is "inapplicable", so 2025 is only quoted as totals.

### 1. Enterprises, persons employed and turnover by size class, 2024

#### 1.0 Overview of the target sectors

| NACE | Activity | Enterprises | Persons employed | Net turnover (EUR m) | Avg / enterprise (EUR k) | Micro 0–9 mean (EUR k) | Enterprises 10+ | Mean of 10+ (EUR k, derived) | Share of turnover in 10+ | Enterprises 20+ | Enterprises with 5–9 employees (BD) |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| I56 | Food and beverage service | 19,441 | 106,726 | 3,390.9 | 174.4 | 60.5 | 2,562 | 925 | 70% | 907 | 2,416 |
| I561 | Restaurants, mobile food | 12,268 | 77,956 | 2,609.4 | 212.7 | 70.3 | 1,967 | 959 | 72% | 709 | |
| I563 | Bars, cafes | 6,337 | 21,624 | 514.5 | 81.2 | 42.3 | 457 | 581 | 52% | 130 | |
| I55 | Accommodation | 5,975 | 47,559 | 1,886.3 | 315.7 | 48.9 | 769 | 2,122 | 87% | 468 | 388 |
| I551 | Hotels | 3,956 | 43,997 | 1,806.0 | 456.5 | 64.4 | 742 | 2,155 | 89% | 457 | |
| S96 | Other personal services (proxy for S96.02) | 26,117 | 43,196 | 626.8 | 24.0 | 20.7 | 218 | 417 | 15% | 44 | 632 |
| R93 | Sports, amusement, recreation | 4,024 | 12,119 | 441.5 | 109.7 | 48.8 | 166 | 1,526 | 57% | 64 | 205 |
| R931 | Sports activities (proxy for R93.13) | 1,651 | 6,945 | 280.6 | 169.9 | 48.6 | 99 | 2,072 | 73% | 42 | |
| Q86 | Human health | 14,302 | 69,056 | 3,280.8 | 229.4 | 65.6 | 839 | 2,858 | 73% | 405 | 785 |
| Q862 | Medical and dental practice (proxy for Q86.23) | 12,381 | 39,463 | 1,565.3 | 126.4 | 66.8 | 568 | 1,366 | 50% | 238 | |
| G45 | Motor vehicle trade and repair | 17,965 | 54,009 | 8,634.8 | 480.6 | 154.1 | 651 | 9,167 | 69% | 226 | 978 |
| G451 | Sale of motor vehicles | 4,682 | 13,883 | 5,582.1 | 1,192.2 | 332.5 | 150 | 27,166 | 73% | c | |
| G452 | Maintenance and repair of motor vehicles (= G45.20) | 9,166 | 22,820 | 702.6 | 76.7 | 48.5 | 245 | 1,103 | 38% | 46 | |
| G47 | Retail trade | 92,606 | 306,275 | 29,582.3 | 319.4 | 96.9 | 3,766 | 5,569 | 71% | 1,417 | 4,602 |
| L68 | Real estate | 27,785 | 44,806 | 2,857.5 | 102.8 | 80.1 | 505 | 1,333 | 24% | 166 | 668 |
| L683 | Real estate on fee/contract (proxy for L68.31) | 6,529 | 12,887 | 521.1 | 79.8 | 57.7 | 138 | 1,104 | 29% | 51 | 175 |
| F43 | Specialised construction | 14,095 | 65,204 | 4,627.3 | 328.3 | 131.4 | 1,412 | 2,097 | 64% | 520 | |
| F432 | Electrical, plumbing, installation | 3,689 | 20,973 | 1,464.6 | 397.0 | 141.7 | 447 | 2,249 | 69% | 174 | |
| F433 | Building completion and finishing | 6,206 | 22,950 | 1,142.4 | 184.1 | 102.3 | 478 | 1,164 | 49% | 157 | |
| M73 | Advertising and market research (competitors) | 4,068 | 13,656 | 1,186.8 | 291.8 | 132.0 | 188 | 3,589 | 57% | 95 | 188 |
| M731 | Advertising | 3,477 | 9,982 | 1,004.0 | 288.8 | 133.3 | 152 | 3,690 | 56% | 70 | 162 |
| J591 | Film and video production (competitor context) | 1,217 | 3,766 | 321.1 | 263.8 | 138.9 | 56 | 2,853 | 50% | 26 | |

Sources: [E1] Eurostat `sbs_sc_ovw`, 2024; last column from [E4] `bd_size`, 2024, counted in employees. The whole business economy (B–S excluding O and S94) had 415,087 enterprises: 384,346 with 0–9 persons employed, 16,026 with 10–19, 9,350 with 20–49, 4,613 with 50–249 and 752 with 250+ [E1].

#### 1.1 Size-class tables (all from [E1], Bulgaria, 2024)

Turnover for 0–1 and 2–9 separately is confidential in every sector in 2021–2024; only the 0–9 sum is published.

**A. Enterprises**

| NACE | 0-1 | 2-9 | 0-9 | 10-19 | 20-49 | 50-249 | 250+ | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| I56 | 7,042 | 9,837 | 16,879 | 1,655 | 748 | 151 | 8 | 19,441 |
| I561 | 3,736 | 6,565 | 10,301 | 1,258 | 586 | c | c | 12,268 |
| I563 | 2,993 | 2,887 | 5,880 | 327 | 116 | 14 | 0 | 6,337 |
| I55 | 3,443 | 1,763 | 5,206 | 301 | 274 | 174 | 20 | 5,975 |
| I551 | 1,843 | 1,371 | 3,214 | 285 | 268 | 169 | 20 | 3,956 |
| S96 | 18,304 | 7,595 | 25,899 | 174 | c | c | 0 | 26,117 |
| R93 | 2,475 | 1,383 | 3,858 | 102 | 42 | 19 | 3 | 4,024 |
| R931 | 943 | 609 | 1,552 | 57 | 23 | 16 | 3 | 1,651 |
| Q86 | 7,101 | 6,362 | 13,463 | 434 | 242 | 138 | 25 | 14,302 |
| Q862 | 6,185 | 5,628 | 11,813 | 330 | 164 | 70 | 4 | 12,381 |
| G45 | 9,927 | 7,387 | 17,314 | 425 | 145 | 68 | 13 | 17,965 |
| G451 | 3,229 | 1,303 | 4,532 | c | 48 | 32 | c | 4,682 |
| G452 | 4,507 | 4,414 | 8,921 | 199 | c | 7 | c | 9,166 |
| G47 | 53,206 | 35,634 | 88,840 | 2,349 | 1,024 | 338 | 55 | 92,606 |
| L68 | 22,117 | 5,163 | 27,280 | 339 | 128 | c | c | 27,785 |
| L683 | 4,716 | 1,675 | 6,391 | 87 | 36 | c | c | 6,529 |
| F43 | 6,377 | 6,306 | 12,683 | 892 | 383 | c | c | 14,095 |
| F432 | 1,427 | 1,815 | 3,242 | 273 | 131 | c | c | 3,689 |
| F433 | 2,972 | 2,756 | 5,728 | 321 | 119 | 38 | 0 | 6,206 |
| M73 | 2,651 | 1,229 | 3,880 | 93 | 67 | 25 | 3 | 4,068 |
| M731 | 2,224 | 1,101 | 3,325 | 82 | 53 | 17 | 0 | 3,477 |
| J591 | 773 | 388 | 1,161 | 30 | c | c | 0 | 1,217 |

**B. Persons employed**

| NACE | 0-1 | 2-9 | 0-9 | 10-19 | 20-49 | 50-249 | 250+ | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| I56 | 6,181 | 37,834 | 44,015 | 21,907 | 22,014 | 12,630 | 6,160 | 106,726 |
| I561 | c | 26,112 | c | 16,716 | 17,298 | 9,618 | c | 77,956 |
| I563 | 2,720 | 10,221 | 12,941 | 4,292 | 3,296 | 1,095 | 0 | 21,624 |
| I55 | 2,938 | 6,333 | 9,271 | 4,029 | 8,493 | 17,757 | 8,009 | 47,559 |
| I551 | 1,583 | 5,210 | 6,793 | 3,815 | 8,356 | 17,024 | 8,009 | 43,997 |
| S96 | 17,060 | 22,390 | 39,450 | 2,200 | c | c | 0 | 43,196 |
| R93 | 2,071 | 4,546 | 6,617 | 1,313 | 1,211 | 1,974 | 1,004 | 12,119 |
| R931 | 789 | 2,050 | 2,839 | 722 | 672 | 1,708 | 1,004 | 6,945 |
| Q86 | 6,670 | 20,125 | 26,795 | 5,784 | 7,271 | 12,854 | 16,352 | 69,056 |
| Q862 | 5,852 | 17,524 | 23,376 | 4,382 | 4,928 | 5,137 | 1,640 | 39,463 |
| G45 | 9,036 | 23,892 | 32,928 | 5,474 | 4,355 | 6,363 | 4,889 | 54,009 |
| G451 | 2,857 | 3,995 | 6,852 | c | 1,483 | 3,002 | c | 13,883 |
| G452 | 4,202 | 14,155 | 18,357 | 2,481 | c | 552 | c | 22,820 |
| G47 | 48,317 | 113,824 | 162,141 | 30,803 | 29,910 | 30,878 | 52,543 | 306,275 |
| L68 | 16,908 | 15,942 | 32,850 | 4,445 | 3,667 | c | c | 44,806 |
| L683 | 3,902 | 5,070 | 8,972 | 1,172 | 1,101 | c | c | 12,887 |
| F43 | 5,572 | 24,072 | 29,644 | c | 11,312 | 10,794 | c | 65,204 |
| F432 | 1,272 | 7,314 | 8,586 | c | 3,889 | 3,503 | c | 20,973 |
| F433 | 2,640 | 10,137 | 12,777 | 4,212 | 3,516 | 2,445 | 0 | 22,950 |
| M73 | 2,329 | 4,061 | 6,390 | 1,215 | 2,034 | 2,452 | 1,565 | 13,656 |
| M731 | 1,958 | 3,613 | 5,571 | 1,067 | 1,593 | 1,751 | 0 | 9,982 |
| J591 | 654 | 1,233 | 1,887 | 391 | c | c | 0 | 3,766 |

**C. Net turnover (EUR m)**

| NACE | 0-9 | 10-19 | 20-49 | 50-249 | 250+ | Total |
|---|---:|---:|---:|---:|---:|---:|
| I56 | 1,021.9 | 685.8 | 788.1 | 542.8 | 352.5 | 3,390.9 |
| I561 | 723.8 | c | 632.7 | 421.0 | c | 2,609.4 |
| I563 | 248.8 | 122.3 | 103.2 | 40.2 | 0.0 | 514.5 |
| I55 | 254.6 | 141.0 | 337.3 | 780.8 | 372.6 | 1,886.3 |
| I551 | 206.9 | 132.6 | 329.9 | 764.0 | 372.6 | 1,806.0 |
| S96 | 535.9 | 49.3 | c | c | 0.0 | 626.8 |
| R93 | 188.1 | 43.5 | 38.6 | 132.1 | 39.1 | 441.5 |
| R931 | 75.4 | 23.7 | 21.4 | 120.9 | 39.1 | 280.6 |
| Q86 | 883.3 | 243.7 | 341.4 | 634.6 | 1,177.8 | 3,280.8 |
| Q862 | 789.4 | 184.0 | 207.9 | 236.9 | 147.2 | 1,565.3 |
| G45 | 2,667.3 | 763.8 | 1,359.8 | 2,714.4 | 1,129.4 | 8,634.8 |
| G451 | 1,507.1 | 450.5 | 1,081.0 | 1,809.0 | 734.4 | 5,582.1 |
| G452 | 432.3 | c | 75.4 | 88.0 | c | 702.6 |
| G47 | 8,609.2 | 3,186.6 | 3,588.8 | 5,213.8 | 8,983.8 | 29,582.3 |
| L68 | 2,184.1 | 287.6 | 202.4 | c | c | 2,857.5 |
| L683 | 368.8 | 51.4 | 44.6 | c | c | 521.1 |
| F43 | 1,666.3 | c | 775.3 | 1,308.3 | c | 4,627.3 |
| F432 | 459.3 | c | 303.9 | 305.0 | c | 1,464.6 |
| F433 | 586.0 | 197.5 | 198.5 | 160.4 | 0.0 | 1,142.4 |
| M73 | 512.1 | 137.5 | 287.0 | 198.5 | 51.7 | 1,186.8 |
| M731 | 443.2 | 127.1 | 262.4 | 171.3 | 0.0 | 1,004.0 |
| J591 | 161.3 | 40.8 | c | c | 0.0 | 321.1 |

**D. Average turnover per enterprise (EUR k) = C x 1,000 / A**

The last column is an estimate, not official. It is micro turnover per person employed x persons per 2–9 enterprise. It assumes 0–1 and 2–9 firms earn the same per person, so it probably understates 2–9 slightly.

| NACE | 0-9 | 10-19 | 20-49 | 50-249 | 250+ | Total | Implied 2-9 (ESTIMATE) |
|---|---:|---:|---:|---:|---:|---:|---:|
| I56 | 60.5 | 414.4 | 1,053.6 | 3,594.4 | 44,061.2 | 174.4 | 89 |
| I561 | 70.3 | c | 1,079.7 | c | c | 212.7 | c |
| I563 | 42.3 | 374.1 | 889.4 | 2,872.1 | - | 81.2 | 68 |
| I55 | 48.9 | 468.5 | 1,231.0 | 4,487.1 | 18,632.5 | 315.7 | 99 |
| I551 | 64.4 | 465.4 | 1,230.8 | 4,520.9 | 18,632.5 | 456.5 | 116 |
| S96 | 20.7 | 283.3 | c (20+ derived: 947) | c | - | 24.0 | 40 |
| R93 | 48.8 | 426.3 | 920.2 | 6,953.7 | 13,043.3 | 109.7 | 93 |
| R931 | 48.6 | 416.0 | 929.6 | 7,556.9 | 13,043.3 | 169.9 | 89 |
| Q86 | 65.6 | 561.6 | 1,410.7 | 4,598.6 | 47,110.4 | 229.4 | 104 |
| Q862 | 66.8 | 557.5 | 1,267.4 | 3,384.1 | 36,802.5 | 126.4 | 105 |
| G45 | 154.1 | 1,797.2 | 9,378.1 | 39,918.1 | 86,875.4 | 480.6 | 262 |
| G451 | 332.5 | c | 22,520.4 | 56,530.6 | c | 1,192.2 | 674 |
| G452 | 48.5 | c (at most 537, derived) | c | 12,572.9 | c | 76.7 | 76 |
| G47 | 96.9 | 1,356.6 | 3,504.7 | 15,425.5 | 163,342.0 | 319.4 | 170 |
| L68 | 80.1 | 848.2 | 1,581.5 | c | c | 102.8 | 205 |
| L683 | 57.7 | 591.3 | 1,240.0 | c | c | 79.8 | 124 |
| F43 | 131.4 | c (at most 984, derived) | 2,024.3 | c | c | 328.3 | 215 |
| F432 | 141.7 | c | 2,319.9 | c | c | 397.0 | 216 |
| F433 | 102.3 | 615.4 | 1,667.9 | 4,221.6 | - | 184.1 | 169 |
| M73 | 132.0 | 1,478.8 | 4,283.6 | 7,940.4 | 17,233.3 | 291.8 | 265 |
| M731 | 133.3 | 1,550.5 | 4,950.9 | 10,077.6 | - | 288.8 | 261 |
| J591 | 138.9 | 1,361.0 | c | c | - | 263.8 | 272 |

How the derived bounds were calculated:
- **G452, 10–19:** at most (270.3 − 88.0 − 75.4) / 199 = €537k.
- **F43, 10–19:** at most (2,961.0 − 775.3 − 1,308.3) / 892 = €984k.
- **S96, 20+:** (626.8 − 535.9 − 49.3) / 44 = €947k.

#### 1.2 The exact 4-digit codes requested (class totals only; no size breakdown is published at this level)

| NACE class | Activity | Enterprises 2023 | 2024 | Persons employed 2024 | Turnover 2024 (EUR m) | Avg / enterprise (EUR k) | Persons / enterprise |
|---|---|---:|---:|---:|---:|---:|---:|
| I56.10 | Restaurants and mobile food service | 11,766 | 12,268 | 77,956 | 2,609.4 | 212.7 | 6.35 |
| I56.30 | Beverage serving | 6,501 | 6,337 | 21,624 | 514.5 | 81.2 | 3.41 |
| I55.10 | Hotels and similar | 3,882 | 3,956 | 43,997 | 1,806.0 | 456.5 | 11.12 |
| S96.02 | Hairdressing and other beauty treatment | 14,650 | 15,904 | 25,773 | 209.6 | 13.2 | 1.62 |
| S96.04 | Physical well-being | 621 | 705 | 1,379 | 19.5 | 27.6 | 1.96 |
| R93.11 | Operation of sports facilities | 156 | 168 | 1,421 | 56.1 | 333.8 | 8.46 |
| R93.13 | Fitness facilities | 587 | 637 | 2,466 | 73.8 | 115.9 | 3.87 |
| Q86.21 | General medical practice | 3,432 | 3,401 | 8,828 | 306.5 | 90.1 | 2.60 |
| Q86.22 | Specialist medical practice | 3,508 | 3,614 | 17,442 | 772.5 | 213.8 | 4.83 |
| Q86.23 | Dental practice | 5,291 | 5,366 | 13,193 | 486.3 | 90.6 | 2.46 |
| G45.11 | Sale of cars and light vehicles | 4,110 | 4,459 | 12,767 | 5,061.9 | 1,135.2 | 2.86 |
| G45.20 | Maintenance and repair of motor vehicles | 8,766 | 9,166 | 22,820 | 702.6 | 76.7 | 2.49 |
| G45.32 | Retail of motor vehicle parts | 3,280 | 3,279 | 10,236 | 678.2 | 206.8 | 3.12 |
| L68.31 | Real estate agencies | 3,059 | 3,267 | 6,932 | 163.9 | 50.2 | 2.12 |
| L68.32 | Management of real estate, fee/contract | 3,099 | 3,262 | 5,955 | 357.1 | 109.5 | 1.83 |
| F41.10 | Development of building projects | 874 | 955 | 1,904 | 600.0 | 628.3 | 1.99 |
| F43.31 | Plastering | 156 | 170 | 1,120 | 43.1 | 253.4 | 6.59 |
| F43.32 | Joinery installation | 922 | 962 | 2,535 | 100.6 | 104.5 | 2.64 |
| F43.33 | Floor and wall covering | 451 | 473 | 2,258 | 123.5 | 261.2 | 4.77 |
| F43.34 | Painting and glazing | 105 | 104 | 320 | 11.3 | 108.6 | 3.08 |
| F43.39 | Other completion and finishing | 4,231 | 4,497 | 16,717 | 864.0 | 192.1 | 3.72 |
| G47.73 | Pharmacies | 2,210 | 2,197 | 13,040 | 1,856.0 | 844.8 | 5.94 |
| G47.75 | Cosmetics and toiletries retail | 1,776 | 1,879 | 6,276 | 595.2 | 316.8 | 3.34 |
| G47.59 | Furniture and lighting retail | 1,556 | 1,561 | 9,573 | 1,171.3 | 750.3 | 6.13 |
| G47.52 | Hardware, paints, glass (DIY) retail | 2,014 | 2,063 | 11,705 | 1,060.1 | 513.9 | 5.67 |
| G47.71 | Clothing retail | 8,884 | 8,754 | 22,027 | 1,140.4 | 130.3 | 2.52 |
| G47.64 | Sporting equipment retail | 632 | 623 | 2,962 | 316.2 | 507.6 | 4.75 |
| N79.11 | Travel agencies | 434 | 463 | 1,065 | 122.6 | 264.8 | 2.30 |
| N79.12 | Tour operators | 1,060 | 1,085 | 4,099 | 1,083.4 | 998.5 | 3.78 |
| P85.53 | Driving schools | 789 | 775 | 2,259 | 25.8 | 33.3 | 2.91 |
| M75.00 | Veterinary | 883 | 883 | 2,116 | 67.3 | 76.3 | 2.40 |
| M73.11 | Advertising agencies (competitors) | 2,811 | 2,944 | 8,457 | 684.6 | 232.5 | 2.87 |
| M73.12 | Media representation | 531 | 533 | 1,525 | 319.4 | 599.3 | 2.86 |
| M70.21 | PR and communication | 438 | 413 | 578 | 29.6 | 71.7 | 1.40 |
| M74.20 | Photography | 1,159 | 1,264 | 1,771 | 32.6 | 25.8 | 1.40 |
| J59.11 | Film and video production | 613 | 642 | 1,645 | 143.1 | 222.9 | 2.56 |
| J59.12 | Video post-production | 473 | 478 | 1,654 | 97.3 | 203.5 | 3.46 |

Source: [E2] Eurostat `sbs_ovw_act`, 2023–2024. G45.20 is identical to group G45.2, so it has full size classes in 1.1. Proxies used for the others: S96 for S96.02, R93.1 for R93.13, Q86.2 for Q86.23, L68.3 for L68.31.

#### 1.3 Trend 2021–2024 (nominal EUR, [E1])

| NACE | Enterprises 2021 | 2022 | 2023 | 2024 | Change | Turnover 2021 (EUR m) | 2024 (EUR m) | Change | Enterprises 10+ 2021 | 10+ 2024 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| I56 | 18,994 | 18,908 | 19,075 | 19,441 | +2.4% | 1,780.8 | 3,390.9 | +90.4% | 1,903 | 2,562 |
| I55 | 5,013 | 5,333 | 5,587 | 5,975 | +19.2% | 907.5 | 1,886.3 | +107.9% | 691 | 769 |
| S96 | 20,932 | 22,317 | 24,157 | 26,117 | +24.8% | 445.8 | 626.8 | +40.6% | 194 | 218 |
| R93 | 3,240 | 3,416 | 3,658 | 4,024 | +24.2% | 227.4 | 441.5 | +94.1% | 139 | 166 |
| Q86 | 13,427 | 13,711 | 14,065 | 14,302 | +6.5% | 1,918.6 | 3,280.8 | +71.0% | 748 | 839 |
| G45 | 16,018 | 16,396 | 17,193 | 17,965 | +12.2% | 5,563.8 | 8,634.8 | +55.2% | 638 | 651 |
| G47 | 90,997 | 92,704 | 92,333 | 92,606 | +1.8% | 20,241.6 | 29,582.3 | +46.1% | 3,695 | 3,766 |
| L68 | 23,959 | 25,309 | 26,451 | 27,785 | +16.0% | 1,944.2 | 2,857.5 | +47.0% | 489 | 505 |
| F43 | 11,414 | 12,177 | 13,147 | 14,095 | +23.5% | 2,578.2 | 4,627.3 | +79.5% | 1,263 | 1,412 |
| M73 | 3,763 | 3,779 | 3,928 | 4,068 | +8.1% | 817.0 | 1,186.8 | +45.3% | 177 | 188 |

The 2021 base is depressed by COVID-19 in hospitality, and 2022–2023 had high inflation.

#### 1.4 Cross-check against NSI's own tables (2024; [N1] enterprises, [N2] turnover in EUR thousand, [N3] persons employed)

| NSI section | Enterprises: total / 0–9 / 10–19 / 20–49 / 50–249 / 250+ | Turnover (EUR k): total / 0–9 / 10–19 / 20–49 / 50–249 / 250+ |
|---|---|---|
| I Accommodation and food | 25,416 / 22,085 / 1,956 / 1,022 / 325 / 28 | 5,277,297 / 1,276,509 / 826,769 / 1,125,358 / 1,323,519 / 725,142 |
| G Trade and motor repair | 135,930 / 128,400 / 4,393 / 2,202 / 832 / 103 | 110,566,658 / 30,386,854 / 15,563,131 / 16,665,175 / 24,285,289 / 23,666,209 |
| F Construction | 25,344 / 21,767 / 1,924 / 1,096 / 527 / 30 | 16,773,150 / 5,128,797 / 1,703,924 / 2,312,365 / 5,356,897 / 2,271,167 |
| L Real estate | 27,785 / 27,280 / 339 / 128 / c / c | 2,857,524 / 2,184,129 / 287,547 / 202,435 / c / c |
| Q Health and social work | 14,986 / 14,009 / 533 / 275 / 144 / 25 | 3,379,758 / 912,296 / 274,201 / 364,205 / 651,295 / 1,177,761 |
| R Arts and recreation | 6,116 / 5,700 / 211 / 120 / 73 / 12 | 3,890,231 / 389,924 / 253,598 / 1,176,285 / 1,161,226 / 909,198 |
| S96 Personal services | 26,117 / 25,899 / 174 / c / c / – | 626,796 / 535,855 / 49,294 / c / c / – |

- NSI section I equals Eurostat I55 + I56 exactly: 25,416 enterprises and €5,277m turnover. S96 is identical in both sources.
- In section R, gambling (R92) accounts for €3,307m of the €3,890m turnover [E2], so R is not a usable proxy for fitness.

### 2. Who can afford €8,000–15,000 a year (ESTIMATE: assumptions, not official statistics)

#### 2.1 Assumptions

1. The fee is €8,000 a year (entry plan) to €15,000 a year (top plan), before VAT. Firms not registered for VAT pay 20% more, and that includes most micro firms.
2. Marketing is 2–5% of turnover, all of which could go to this service. That is generous.
3. A size class counts as "able" if its average turnover clears the bar.
4. Firms with 5–9 employees are tested with an implied average: micro turnover per person employed x 7.5 persons. That gives €174k for food and beverage, €206k for accommodation, €102k for personal services, €213k for sports, €247k for health, €608k for motor trade, €398k for retail and €499k for real estate. Up to about 890 of these firms may also sit in the 10+ persons-employed classes.

**Turnover needed** = fee / marketing share:

| Fee | 2% | 3% | 5% |
|---|---:|---:|---:|
| €8,000 | €400k | €267k | €160k |
| €15,000 | €750k | €500k | €300k |

#### 2.2 Fee as a share of average turnover (2024)

| Sector | €8k as % of micro (0–9) average | €8k / €15k as % of 10–19 average |
|---|---:|---|
| I56 Food and beverage | 13.2% | 1.9% / 3.6% |
| I55 Accommodation | 16.4% | 1.7% / 3.2% |
| S96 Personal services | 38.6% | 2.8% / 5.3% |
| R93 Sports | 16.4% | 1.9% / 3.5% |
| Q86 Health | 12.2% | 1.4% / 2.7% |
| G45 Motor trade | 5.2% | 0.4% / 0.8% |
| G452 Car repair | 16.5% | at least 1.5% / 2.8% |
| G47 Retail | 8.3% | 0.6% / 1.1% |
| L68 Real estate | 10.0% | 0.9% / 1.8% |
| L683 Real estate on fee/contract | 13.9% | 1.4% / 2.5% |
| F433 Finishing works | 7.8% | 1.3% / 2.4% |

The average micro firm cannot pay. Firms with 10+ persons employed can.

#### 2.3 Estimated pools (2024)

| Sector | All enterprises | **Core pool**: 10+ persons employed | **Top-plan pool**: 20+ persons employed | **Stretch pool**: 5–9 employees (EUR 8k as % of implied average) | Upper bound |
|---|---:|---:|---:|---:|---:|
| I56 Food and beverage | 19,441 | **2,562** | 907 | 2,416 (4.6%) | ~4,980 |
| I55 Accommodation | 5,975 | **769** | 468 | 388 (3.9%) | ~1,160 |
| S96 Personal services | 26,117 | **218** | 44 | 632 (7.8%, excluded) | 218 |
| R93 Sports and recreation | 4,024 | **166** | 64 | 205 (3.8%) | ~370 |
| Q86 Health | 14,302 | **839** | 405 | 785 (3.2%) | ~1,620 |
| G45 Motor trade and repair | 17,965 | **651** | 226 | 978 (1.3%) | ~1,630 |
| G47 Retail | 92,606 | **3,766** | 1,417 | 4,602 (2.0%) | ~8,370 |
| L68 Real estate | 27,785 | **505** | 166 | 668 (1.6%) | ~1,170 |
| F43 Specialised construction | 14,095 | **1,412** | 520 | not published | 1,412 or more |
| **Total** | **222,310** | **10,888** | **4,217** | **10,042** | **~20,900 (~20,000 net of overlap)** |

Sub-groups within the core pool, with the number of 20+ firms in brackets:

| Sub-group | Firms with 10+ persons (20+) |
|---|---:|
| Restaurants | 1,967 (709) |
| Bars and cafes | 457 (130) |
| Catering | 138 |
| Hotels | 742 (457) |
| Sports activities (R93.1) | 99 (42) |
| Medical and dental practices (Q86.2) | 568 (238) |
| Car sales | 150 |
| Car repair | 245 (46) |
| Real estate on fee or contract (L68.3) | 138 (51) |
| Finishing works (F43.3) | 478 (157) |
| Installation trades (F43.2) | 447 (174) |

Sources: [E1], [E4].

#### 2.4 Estimates for the 4-digit niches

Method: the parent group's 10+ count is split in proportion to the class's share of the group's enterprises, persons employed and turnover. The three shares give the range. Source: [E1], [E2], 2024.

| Class | Parent group (10+) | Class share of group: enterprises / persons / turnover | Estimated firms with 10+ persons |
|---|---:|---|---:|
| S96.02 Hair and beauty | S96 (218) | 60.9% / 59.7% / 33.4% | ~70–130 |
| R93.13 Fitness | R93.1 (99) | 38.6% / 35.5% / 26.3% | ~25–40 |
| Q86.23 Dental | Q86.2 (568) | 43.3% / 33.4% / 31.1% | ~175–245 |
| L68.31 Real estate agencies | L68.3 (138) | 50.0% / 53.8% / 31.5% | ~45–75 |

Dental and fitness firms are smaller than their group's average, so the lower end of those ranges is more likely.

#### 2.5 Official cross-check: trade enterprises by turnover band (2024, [E3] `sbs_part_wtsct`)

| Group | Enterprises | Under €1m | €1m or more | of which €1–2m | €2–5m | €5m+ |
|---|---:|---:|---:|---:|---:|---:|
| G45 Motor trade and repair | 17,965 | 17,244 | **721** | 318 | 216 | 187 |
| G45.1 Car sales | 4,682 | 4,287 | **395** | 154 | 120 | 121 |
| G45.2 Car repair | 9,166 | 9,099 | **67** | 45 | c | 22 (€2m+) |
| G47 Retail | 92,606 | 89,092 | **3,514** | 1,891 | 1,031 | 592 |
| G47.5 Household equipment | 6,433 | 6,089 | 344 | 193 | 99 | 52 |
| G47.7 Other goods, specialised stores | 30,006 | 29,047 | 959 | 465 | 306 | 188 |

The lowest band (€0–1m) is too coarse for the €160–750k thresholds, but it confirms the order of magnitude of the core pools.

#### 2.6 Reading

- **Best fit:** food and beverage, hotels, health and real estate. They have high turnover per firm, a visual product and sizeable pools.
- **Retail:** the largest pool on paper, but many of those firms are chains with central marketing, and retail turnover is mostly the cost of goods.
- **The niches named in the brief are thin:** dental, beauty, fitness, real estate agencies and car repair (only 67 repair shops turn over €1m or more). Car dealers are stronger: 395 turn over €1m or more.
- **Home improvement** is mid-sized:
  - finishing works 478 firms and installation trades 447 (10+ persons);
  - developers (F41.10): 955 firms averaging €628k, of which 32 have 10+ persons;
  - DIY retail (G47.52): 2,063 firms averaging €514k.
- **Competitors are fragmented.** M73 has 4,068 firms; 95.4% are micro and only 188 have 10+ persons employed. Video production (J59.11 and J59.12) adds 1,120 firms, and photography (M74.20) adds 1,264.

### 3. Regional distribution

#### 3.1 Sofia, Plovdiv, Varna, Burgas and the rest (2024)

| Area | Enterprises | Share | 10+ employees | Share | Persons employed | Share | Turnover EUR m (NSI) | Share | Population | Share |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Sofia (capital city) | 127,627 | 30.7% | 9,830 | 34.4% | 847,555 | 38.0% | 127,976 | 48.3% | 1,295,931 | 20.1% |
| Plovdiv | 41,626 | 10.0% | 3,012 | 10.5% | 221,959 | 10.0% | 24,131 | 9.1% | 635,630 | 9.9% |
| Varna | 33,026 | 8.0% | 2,237 | 7.8% | 161,281 | 7.2% | 14,730 | 5.6% | 437,521 | 6.8% |
| Burgas | 29,916 | 7.2% | 1,628 | 5.7% | 116,360 | 5.2% | 14,332 | 5.4% | 388,919 | 6.0% |
| Rest (24 districts) | 182,892 | 44.1% | 11,895 | 41.6% | 880,970 | 39.5% | 83,580 | 31.6% | 3,679,359 | 57.2% |
| Bulgaria | 415,087 | 100% | 28,602 | 100% | 2,228,125 | 100% | 264,748 | 100% | 6,437,360 | 100% |

Sources:
- Enterprises and persons employed: [E5] `bd_hgnace_r`, B–S excluding O and S94.
- 10+ employees: [E6] `bd_size_r`.
- Turnover: [N6], 2024, in BGN thousand, converted at /1.95583. It covers all non-financial enterprises, with agriculture included and finance excluded.
- Population: [N6].

Enterprises are counted at their registered office.

#### 3.2 All 28 districts (2024)

| NUTS3 | District | Enterprises | 10+ employees | Persons employed | Population | Enterprises per 1,000 inhabitants | NSI turnover (BGN m) | EUR m | Turnover / enterprise (EUR k, indicative) |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| BG411 | Sofia (capital) | 127,627 | 9,830 | 847,555 | 1,295,931 | 98.5 | 250,299 | 127,976 | 1,003 |
| BG421 | Plovdiv | 41,626 | 3,012 | 221,959 | 635,630 | 65.5 | 47,197 | 24,131 | 580 |
| BG331 | Varna | 33,026 | 2,237 | 161,281 | 437,521 | 75.5 | 28,808 | 14,730 | 446 |
| BG341 | Burgas | 29,916 | 1,628 | 116,360 | 388,919 | 76.9 | 28,031 | 14,332 | 479 |
| BG413 | Blagoevgrad | 20,692 | 1,377 | 81,067 | 286,333 | 72.3 | 11,113 | 5,682 | 275 |
| BG344 | Stara Zagora | 15,182 | 994 | 90,523 | 288,736 | 52.6 | 15,600 | 7,976 | 525 |
| BG323 | Ruse | 11,297 | 811 | 57,406 | 186,093 | 60.7 | 15,013 | 7,676 | 679 |
| BG422 | Haskovo | 11,197 | 645 | 43,931 | 207,356 | 54.0 | 6,237 | 3,189 | 285 |
| BG321 | Veliko Tarnovo | 10,352 | 715 | 52,828 | 200,413 | 51.7 | 9,032 | 4,618 | 446 |
| BG423 | Pazardzhik | 10,313 | 768 | 54,636 | 223,494 | 46.1 | 8,648 | 4,422 | 429 |
| BG412 | Sofia district | 10,130 | 723 | 62,993 | 224,701 | 45.1 | 23,071 | 11,796 | 1,164 |
| BG314 | Pleven | 9,594 | 571 | 46,622 | 215,326 | 44.6 | 7,635 | 3,904 | 407 |
| BG332 | Dobrich | 7,600 | 396 | 28,221 | 145,207 | 52.3 | 5,664 | 2,896 | 381 |
| BG342 | Sliven | 6,959 | 418 | 30,963 | 169,299 | 41.1 | 5,319 | 2,719 | 391 |
| BG333 | Shumen | 6,568 | 443 | 34,693 | 149,279 | 44.0 | 6,551 | 3,349 | 510 |
| BG415 | Kyustendil | 6,204 | 343 | 25,492 | 106,131 | 58.5 | 3,370 | 1,723 | 278 |
| BG322 | Gabrovo | 5,996 | 451 | 35,655 | 93,817 | 63.9 | 5,819 | 2,975 | 496 |
| BG313 | Vratsa | 5,721 | 350 | 27,551 | 146,002 | 39.2 | 5,454 | 2,788 | 487 |
| BG414 | Pernik | 5,632 | 344 | 26,389 | 109,886 | 51.3 | 4,650 | 2,378 | 422 |
| BG425 | Kardzhali | 5,455 | 364 | 26,101 | 149,478 | 36.5 | 3,451 | 1,764 | 323 |
| BG315 | Lovech | 5,282 | 357 | 25,167 | 110,823 | 47.7 | 3,771 | 1,928 | 365 |
| BG424 | Smolyan | 5,200 | 384 | 27,452 | 90,534 | 57.4 | 3,186 | 1,629 | 313 |
| BG343 | Yambol | 4,991 | 315 | 23,762 | 105,429 | 47.3 | 4,261 | 2,179 | 437 |
| BG312 | Montana | 4,310 | 279 | 18,730 | 112,737 | 38.2 | 3,423 | 1,750 | 406 |
| BG324 | Razgrad | 4,075 | 233 | 17,813 | 99,459 | 41.0 | 4,206 | 2,150 | 528 |
| BG334 | Targovishte | 3,899 | 259 | 18,872 | 94,735 | 41.2 | 3,641 | 1,862 | 477 |
| BG325 | Silistra | 3,559 | 192 | 13,484 | 93,549 | 38.0 | 2,899 | 1,482 | 416 |
| BG311 | Vidin | 2,684 | 163 | 10,619 | 70,542 | 38.0 | 1,453 | 743 | 277 |
| BG | Bulgaria | 415,087 | 28,602 | 2,228,125 | 6,437,360 | 64.5 | 517,802 | 264,748 | 638 |

The last column mixes NSI non-financial turnover (agriculture included) with Eurostat counts, so it is indicative only.

#### 3.3 By sector (NACE section, 2024, [E5]): enterprises, with share of Bulgaria in brackets

| Section | Bulgaria | Sofia | Plovdiv | Varna | Burgas | Rest | Big-4 share |
|---|---:|---:|---:|---:|---:|---:|---:|
| I Accommodation and food | 25,416 | 4,951 (19.5%) | 2,114 (8.3%) | 1,799 (7.1%) | 3,712 (14.6%) | 12,840 (50.5%) | 49.5% |
| G Trade and motor repair | 135,930 | 32,394 (23.8%) | 14,831 (10.9%) | 9,924 (7.3%) | 9,962 (7.3%) | 68,819 (50.6%) | 49.4% |
| F Construction | 25,344 | 8,653 (34.1%) | 2,517 (9.9%) | 2,275 (9.0%) | 1,844 (7.3%) | 10,055 (39.7%) | 60.3% |
| K+L Finance and real estate | 33,551 | 13,261 (39.5%) | 3,205 (9.6%) | 3,580 (10.7%) | 2,867 (8.5%) | 10,638 (31.7%) | 68.3% |
| M+N Professional and administrative (incl. M73) | 62,706 | 30,385 (48.5%) | 5,563 (8.9%) | 5,415 (8.6%) | 3,504 (5.6%) | 17,839 (28.4%) | 71.6% |
| P+Q Education and health | 19,535 | 5,890 (30.2%) | 2,204 (11.3%) | 1,588 (8.1%) | 978 (5.0%) | 8,875 (45.4%) | 54.6% |
| R+S Recreation and personal services | 35,306 | 10,330 (29.3%) | 3,629 (10.3%) | 3,487 (9.9%) | 2,845 (8.1%) | 15,015 (42.5%) | 57.5% |

Persons employed in section I: Sofia 25.7%, Plovdiv 10.5%, Varna 10.2%, Burgas 13.7%. In section G: Sofia 37.2%. In P+Q: Sofia 39.6% [E5]. Below section level, no district breakdown is published.

#### 3.4 Physical premises (local units) by NUTS 2 region, 2024 ([E7]; NSI equivalent in [N4])

| Division | Local units | Yugozapaden (Sofia city + 4 districts) | Yuzhen tsentralen (Plovdiv + 4) | Severoiztochen (Varna + 3) | Yugoiztochen (Burgas + 3) | Severozapaden | Severen tsentralen |
|---|---:|---:|---:|---:|---:|---:|---:|
| I55 | 6,933 | 1,824 (26%) | 1,228 (18%) | 935 (13%) | 2,018 (29%) | 422 (6%) | 506 (7%) |
| I56 | 22,756 | 8,031 (35%) | 4,240 (19%) | 2,561 (11%) | 4,186 (18%) | 1,873 (8%) | 1,865 (8%) |
| S96 | 27,113 | 10,047 (37%) | 4,950 (18%) | 3,957 (15%) | 4,303 (16%) | 1,619 (6%) | 2,237 (8%) |
| R93 | 4,450 | 2,010 (45%) | 610 (14%) | 697 (16%) | 701 (16%) | 179 (4%) | 253 (6%) |
| Q86 | 15,700 | 5,520 (35%) | 3,185 (20%) | 2,011 (13%) | 2,048 (13%) | 1,433 (9%) | 1,503 (10%) |
| G45 | 19,452 | 6,833 (35%) | 4,094 (21%) | 2,385 (12%) | 2,537 (13%) | 1,641 (8%) | 1,962 (10%) |
| G47 | 112,852 | 35,392 (31%) | 23,235 (21%) | 14,657 (13%) | 18,276 (16%) | 10,202 (9%) | 11,090 (10%) |
| L68 | 28,888 | 13,265 (46%) | 4,071 (14%) | 4,325 (15%) | 4,075 (14%) | 1,261 (4%) | 1,891 (7%) |
| F43 | 14,280 | 6,218 (44%) | 2,294 (16%) | 1,786 (13%) | 1,901 (13%) | 848 (6%) | 1,233 (9%) |
| M73 | 4,172 | 2,670 (64%) | 413 (10%) | 458 (11%) | 356 (9%) | 93 (2%) | 182 (4%) |

Employment in these local units:
- Yugozapaden, the Sofia region, has 80% of M73 (advertising) employment and 54% of R93 (sports and recreation).
- Yugoiztochen, the Burgas region, has 30% of I55 (accommodation) employment.

#### 3.5 Tourism concentration, 2024 ([N6]; categorised establishments with 10+ beds)

| District | Establishments | Share | Nights | Share |
|---|---:|---:|---:|---:|
| Burgas | 1,001 | 24.7% | 9,905,089 | 35.8% |
| Varna | 409 | 10.1% | 4,752,786 | 17.2% |
| Sofia (capital) | 154 | 3.8% | 2,267,902 | 8.2% |
| Blagoevgrad | 253 | 6.2% | 1,786,125 | 6.5% |
| Dobrich | 193 | 4.8% | 1,749,331 | 6.3% |
| Plovdiv | 281 | 6.9% | 1,414,851 | 5.1% |
| Pazardzhik | 128 | 3.2% | 1,100,960 | 4.0% |
| Smolyan | 288 | 7.1% | 826,373 | 3.0% |
| Sofia district | 114 | 2.8% | 707,173 | 2.6% |
| Other 19 districts | 1,228 | 30.3% | 3,135,611 | 11.3% |
| Bulgaria | 4,049 | 100% | 27,646,201 | 100% |

#### 3.6 NSI district releases, 2024 (all non-financial enterprises, agriculture included)

| District | Enterprises | Micro / small / medium / large | Persons employed (FTE) | Net sales | Per enterprise |
|---|---:|---|---:|---:|---:|
| Sofia (capital) [N7] | 134,051 | 124,434 / 7,692 / 1,585 / 340 | 787,075 | BGN 250,071m = €127,859m | €954k |
| Plovdiv [N8] | 46,314 | 93.1% / 5.7% / 1.0% / 0.2% | 225,398 | BGN 46,884m = €23,971m | €518k |
| Varna [N9] | 35,601 | 93.3% / 5.6% / 1.0% / 0.1% | 150,031 | BGN 28,738m = €14,694m | €413k |
| Burgas [N10] | 33,551 | 94.7% / 4.5% / 0.7% / 0.1% | 120,073 | BGN 27,850m = €14,239m | €424k |

Other detail from the releases: 86% of Varna district's enterprises are in Varna municipality. Plovdiv has 15,141 trade and 19,995 services enterprises; Burgas has 10,157 trade and 16,866 services enterprises.

#### 3.7 Where the core pool sits (ESTIMATE)

Each sector's core pool is split by its persons-employed share per district; real estate uses the enterprise share instead. Inputs: [E1], [E5], [E6].

| Sector pool | Pool | Sofia | Plovdiv | Varna | Burgas | Rest |
|---|---:|---:|---:|---:|---:|---:|
| I (I55+I56) | 3,331 | 856 | 349 | 339 | 455 | 1,332 |
| G (G45+G47) | 4,417 | 1,645 | 418 | 304 | 242 | 1,808 |
| F (F43) | 1,412 | 502 | 131 | 124 | 100 | 554 |
| L (L68) | 505 | 200 | 48 | 54 | 43 | 160 |
| Q (Q86) | 839 | 332 | 91 | 70 | 40 | 306 |
| R+S (R93+S96) | 384 | 151 | 39 | 35 | 27 | 133 |
| **Total** | **10,888** | **3,686 (34%)** | **1,076 (10%)** | **925 (8%)** | **907 (8%)** | **4,293 (39%)** |
| Cross-check: split by share of all 10+ employee firms | | 3,742 | 1,147 | 852 | 620 | 4,528 |

### 4. Social media use by enterprises

Coverage: the survey covers only enterprises with 10+ persons employed, and excludes sections P, Q, R and S96. Dental, fitness and beauty are therefore not covered. Bulgaria publishes no micro-firm figures ([N11] notes; [E8]).

#### 4.1 By size class, Bulgaria vs EU-27 (% of enterprises)

| Indicator (year) | BG 10+ | BG 10–49 | BG 50–249 | BG 250+ | EU 10+ | EU 10–49 | EU 50–249 | EU 250+ |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Any social media (2025) | **41.5** | 38.7 | 52.5 | 69.8 | **63.6** | 60.6 | 76.2 | 89.1 |
| Any social media (2023) | 38.0 | 35.2 | 49.3 | 61.7 | 61.1 | 58.2 | 73.0 | 86.2 |
| Social networks (2023) | 37.2 | 34.5 | 47.9 | 61.2 | 59.0 | 56.0 | 71.4 | 84.9 |
| Multimedia sharing, e.g. YouTube (2023) | 13.2 | 11.0 | 22.6 | 29.1 | 31.5 | 28.8 | 41.9 | 59.2 |
| Two or more social media types (2023) | 13.6 | 11.5 | 22.3 | 30.8 | 31.6 | 28.6 | 42.8 | 61.6 |
| Social media to build image or market products (2023) | **29.3** | 27.0 | 38.3 | 51.8 | **50.7** | 47.6 | 62.6 | 76.4 |
| Same, as % of social media users (2023) | 77.1 | 76.6 | 77.7 | 84.0 | 84.2 | 83.4 | 86.3 | 88.9 |
| Social media for customer reviews (2023) | 20.6 | 19.1 | 27.2 | 30.9 | 30.5 | 28.8 | 36.7 | 46.9 |
| Social media for recruiting (2023) | 13.7 | 11.7 | 20.6 | 36.4 | 36.2 | 31.9 | 53.3 | 70.3 |
| Paid internet advertising (2024) | **25.6** | 24.2 | 32.4 | 35.2 | **32.6** | 30.6 | 40.1 | 50.5 |
| Targeted internet ads (2024) | 22.0 | 20.6 | 28.0 | 31.7 | 27.4 | 25.5 | 34.3 | 42.5 |
| Website (2025) | 49.7 | 45.1 | 69.6 | 85.7 | 79.0 | 76.7 | 89.7 | 95.7 |
| Website and social media (2025) | 32.6 | 29.0 | 47.2 | 65.8 | 58.2 | 54.7 | 73.4 | 87.8 |

Sources: [E8], [E10], [E12]. Bulgarian trend for "any social media": 33.8% (2019), 38.9% (2021), 38.0% (2023), 41.5% (2025).

#### 4.2 By sector, Bulgaria / EU-27 (% of enterprises with 10+ persons employed)

| Sector | Any social media 2025 | Social networks 2023 | Video sharing 2023 | Social media for marketing 2023 | Paid ads 2024 |
|---|---|---|---|---|---|
| All covered sectors | 41.5 / 63.6 | 37.2 / 59.0 | 13.2 / 31.5 | 29.3 / 50.7 | 25.6 / 32.6 |
| I Accommodation and food | **66.4** / 78.2 | 55.1 / 75.5 | 17.8 / 47.3 | 47.4 / 65.0 | 38.0 / 41.6 |
| I55 Accommodation | **72.1** / 86.9 | u / 83.3 | 22.7 / 55.1 | u / 75.7 | u / 56.9 |
| G45 Motor trade | 57.2 / 73.6 | 40.7 / 69.6 | 10.6 / 37.4 | 27.8 / 63.0 | 37.7 / 51.4 |
| G47 Retail | 44.4 / 69.7 | 41.6 / 65.4 | 14.3 / 35.7 | 33.6 / 58.4 | 29.0 / 40.7 |
| F Construction | 21.9 / 50.0 | 20.9 / 44.2 | 6.6 / 18.8 | 14.7 / 34.0 | 16.5 / 23.4 |
| L68 Real estate | u / 57.3 | u / 55.2 | u / 30.7 | u / 48.9 | u / 34.9 |
| M73–M75 Advertising and other professional | 53.1 / 79.1 | 54.2 / 77.4 | 28.5 / 47.7 | 48.1 / 67.7 | 34.2 / 39.4 |
| N79 Travel | 91.8 / 86.8 | 54.1 / 85.5 | u / 60.8 | 51.3 / 81.2 | 70.4 / 63.5 |

Sources: [E9], [E11]. I56 is not published separately. Small samples make the sector series volatile; for example, G45 went from 40.7% in 2023 to 57.2% in 2025.

#### 4.3 Context

- **Individuals.** 71.1% of Bulgarians aged 16–74 used social networks in 2025, up from 65.0% in 2024 and 60.1% in 2021. The EU figure for 2025 is 67.3% [E13].
- **NSI 2025 release [N11]:**
  - 41.5% of enterprises use social media; by size, 69.8% (250+), 38.7% (10–49) and 52.5% (50–249).
  - 49.7% have a website.
  - 16.2% sold online in 2024.
  - 8.5% use AI. Among AI users, 52.9% generate images, video or sound, and 36.1% use AI for marketing and sales. Cheap AI content tools are a competitive factor.
- NSI publishes enterprise ICT figures only nationally; its district ICT releases cover households.

### 5. Data gaps and caveats

1. **No micro split of turnover.** Turnover for 0–1 vs 2–9 persons is confidential in every sector, 2021–2024. The 2–9 and 5–9 averages in this report are estimates.
2. **No size classes at 4-digit level.** S96.02, R93.13, Q86.23 and L68.31 have class totals only. Several cells are also confidential: I56.1 10–19 turnover, G45.2 20–49 and 250+, F43 10–19 turnover, L68.3 50+.
3. **No turnover bands for services.** Only trade (G) is published by turnover band, and its lowest band is €0–1m.
4. **Thin regional detail.** Districts are published only by NACE section and by registered office. Division-level data exist only by NUTS 2. No district x division table was found (NSI Infostat was not queried). District turnover is published only for all sectors together.
5. **ICT survey coverage.** It covers firms with 10+ persons employed only, and excludes health, sports and personal services. I56 is not separate, and Bulgarian L68 values are unreliable. Social media types and purposes were last asked in 2023. Whether NSI has published 2026 ICT results was not checked because the web-search allowance ran out.
6. **No official marketing-spend statistic.** The 2–5% rule overstates the budget in low-margin retail and car sales.
7. **2025 data are not comparable.** They use NACE Rev. 2.1 and several target codes change.
8. **Coverage differs between sources.** Eurostat counts exclude agriculture and include finance; NSI "non-financial" counts are the reverse. Business demography counts employees, while SBS counts persons employed.

### 6. Sources (accessed 2026-11-18)

**Eurostat**

- [E1] `sbs_sc_ovw`, Enterprise statistics by size class and NACE Rev. 2, BG 2021–2024, updated 2026-09-30. https://ec.europa.eu/eurostat/databrowser/view/sbs_sc_ovw/default/table?lang=en
  - API: https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/sbs_sc_ovw?geo=BG&amp;lang=en
- [E2] `sbs_ovw_act`, Enterprises by detailed NACE Rev. 2 activity, 2023–2024. https://ec.europa.eu/eurostat/databrowser/view/sbs_ovw_act/default/table?lang=en
- [E3] `sbs_part_wtsct`, Trade (G) by turnover size class, 2024. https://ec.europa.eu/eurostat/databrowser/view/sbs_part_wtsct/default/table?lang=en
- [E4] `bd_size`, Business demography by size class and NACE, 2024. https://ec.europa.eu/eurostat/databrowser/view/bd_size/default/table?lang=en
- [E5] `bd_hgnace_r`, Business demography by NACE and NUTS 3, 2023–2024. https://ec.europa.eu/eurostat/databrowser/view/bd_hgnace_r/default/table?lang=en
- [E6] `bd_size_r`, Business demography by size class and NUTS 3, 2024. https://ec.europa.eu/eurostat/databrowser/view/bd_size_r/default/table?lang=en
- [E7] `sbs_r_nuts2021`, Local units by NUTS 2 and NACE, 2024. https://ec.europa.eu/eurostat/databrowser/view/sbs_r_nuts2021/default/table?lang=en
- [E8] `isoc_cismt`, Social media use by type and internet advertising, by size class, 2019–2025. https://ec.europa.eu/eurostat/databrowser/view/isoc_cismt/default/table?lang=en
- [E9] `isoc_cismtn2`, Same by NACE, 2023–2025. https://ec.europa.eu/eurostat/databrowser/view/isoc_cismtn2/default/table?lang=en
- [E10] `isoc_cismp`, Social media by purpose, by size class, 2023. https://ec.europa.eu/eurostat/databrowser/view/isoc_cismp/default/table?lang=en
- [E11] `isoc_cismpn2`, Social media by purpose, by NACE, 2023. https://ec.europa.eu/eurostat/databrowser/view/isoc_cismpn2/default/table?lang=en
- [E12] `isoc_ciweb`, Websites by size class, 2025. https://ec.europa.eu/eurostat/databrowser/view/isoc_ciweb/default/table?lang=en
- [E13] `tin00127`, Individuals using social networks, 2021–2025. https://ec.europa.eu/eurostat/databrowser/view/tin00127/default/table?lang=en

**NSI (НСИ)**

- [N1] Enterprises by section and size class, 2024 (published 30.06.2026). https://www.nsi.bg/en/statistical-data/379/1084
- [N2] Turnover by section and size class, 2024 (EUR). https://www.nsi.bg/en/statistical-data/379/1083
- [N3] Persons employed by section and size class, 2024. https://www.nsi.bg/en/statistical-data/379/1081
- [N4] Local units by section and NUTS 2, 2024. https://www.nsi.bg/en/statistical-data/378/1080
- [N5] Enterprises by size and NUTS 2, 2025 preliminary. https://www.nsi.bg/en/statistical-data/372/1066
- [N6] Regional statistics by district, 2020–2024. Bulgaria: https://www.nsi.bg/en/statistical-data/46/195
  - Districts: /46/167 to /46/194 on the same site, including Sofia (Stolitsa) /46/172, Plovdiv /46/179, Varna /46/192 and Burgas /46/193.
- [N7] Sofia (capital), non-financial enterprises 2024. https://www.nsi.bg/tsb/wp-content/uploads/2026/02/nf-2024-SOF_2.pdf
- [N8] Plovdiv 2024. https://www.nsi.bg/tsb/wp-content/uploads/2026/01/ACT_NF_2024_Plovdiv.pdf
- [N9] Varna 2024. https://www.nsi.bg/tsb/wp-content/uploads/2026/05/Press-release_20_NF2024.pdf
- [N10] Burgas 2024. https://www.nsi.bg/tsb/wp-content/uploads/2026/01/NF-2024-brgs.pdf
- [N11] ICT usage in enterprises, 2025. https://www.nsi.bg/index.php/file/32936/izpolzvane_na_informacionni_i_komunikacionni_tehnologii_v_predpriyatiyata.pdf
- [N12] Non-financial enterprises, 2025 preliminary (31.08.2026). https://www.nsi.bg/file/37726/deinost_na_nefinansovite_predpriyatiya.pdf

---

## Part 2. What the market charges

**Checked:** 2026-11-18 (every page below was downloaded or opened on this date unless marked otherwise).
**Purpose:** compare Hera Editing's planned offer (filming-first, 4 / 8 / 12 original short videos a month, publishing after approval, reporting, no ads, no community management; own cost model ≈ €1,100/month before VAT for 8 videos) with what the Bulgarian market publishes.

**Conventions**

- **[P] published fact**: copied from the cited page on 2026-11-18. **[S] secondary or unverified**: an agency blog's "market" claim, an aggregator, or a search-engine extract of a page I could not open. **[E] my estimate or calculation**.
- **Currency:** Bulgaria has used the euro since 2026-01-01. Prices still published in leva are converted at the fixed rate **1 EUR = 1.95583 BGN** and shown as "≈ €x".
- **VAT:** standard Bulgarian VAT is 20%. Each row says what the page states: *excl.*, *incl.*, *not VAT-registered (final)*, or *not stated*. A client that is not VAT-registered pays 20% more for a VAT-exclusive price; a VAT-registered client recovers it.
- **Method:** pages were fetched with curl and converted to text (WebFetch was used where curl failed). Figures were read from that text, not from search snippets, unless the row is marked [S].

---

### 0. Key numbers

| Question | Answer |
|---|---|
| Posting-only packages (static posts, little or no video) | **€30–510/month** [P], typically €150–350 |
| Design + posting, Reels edited from the client's own footage | **€150–820/month** [P] (Adline: €500–1,000 per network) |
| Video-led production (filming included, publishing mostly not) | **€200–900/month** [P] |
| Full production + management (filming, editing, publishing, reporting) | **€800–1,800/month** [P] (TikTok-ads packages up to €2,490) |
| Closest published match to Hera's 8-video month | Templa "Растеж" **€1,049 excl. VAT** (8 Reels + 8 posts, 1 shoot, comment and DM replies); Next Level Gold **€999.99** (12 videos, 2 platforms) [P] |
| Full-time in-house hire (SMM / content / video), employer cost | **≈ €1,310–1,900/month** for €1,100–1,600 gross, plus kit and software (≈ €1,400–2,100 all-in) [E from P/S inputs] |
| Employer social security | **18.92–19.62% of gross** (cap €2,300/month from 2026-08-01) [S, consistent across 3 accounting sources] |
| SME marketing spend | No Bulgarian survey found. Proxy: **25.6%** of BG firms with 10+ staff paid for internet ads in 2024 (EU 32.6%) [P, Eurostat] |

---

### 1. Agency and studio packages

#### 1.1 Re-check of the 7 competitors in `spec/research/01` (checked there on 2026-11-07)

| Competitor | spec/research/01 snapshot | 2026-11-18 | Change |
|---|---|---|---|
| SocialDany | €120/Reel; €380 for 4; €480/month (4 Reels + 10 photos, min 3 months); publishing from €350/month | Same | None |
| Next Level Digital | Silver €899.99 / Gold €999.99 / Platinum €1,299.99 | Same (also on /bg/pricing) | None |
| Wonder Digital | €200 (4 IG posts), €400 (8 FB+IG posts); video and replies excluded | Same. The full grid also shows IG 8 posts €350, IG 12 posts €480, IG+FB 4 posts €250, TikTok €85/video, +€50 per extra network, UGC packs | No price change; more tiers recorded |
| SEOMAX | 4 / 8 / 16 videos, quote only | Same ("Цената зависи от бизнеса и локацията") | None |
| Bridges | "from 950 BGN for 20 posts", other tiers in BGN | 650 / 950 / 1,600 лв (≈ €332 / €486 / €818). Still leva only; page `modified_time` 2024-04-13 | None |
| e-motion | €200–400 / €400–700 / from €800 (FAQ) | Same | None |
| MC Productions | €20 short edit; filming on request | Same. Also lists 10 edits a month €140, 1 profile €30/month, 3 profiles €100 | None (more lines recorded) |

#### 1.2 Published packages by tier

Column key: **Posts / Videos** per month; **Film** = filming on site included; **Ads** = paid-ads management; **CM** = community management (replies to comments and messages); **Rep** = reporting; **Min** = minimum term.

##### Tier A — Posting-only / budget (static posts; little or no original video)

| Provider (city) | Price / month [P] | Posts | Videos | Film | Platforms | Ads | CM | Rep | Min | VAT | Source |
|---|---|---|---|---|---|---|---|---|---|---|---|
| MC Productions | 1 profile €30; 3 profiles €100 | n/s | edits sold separately: €20 each, 10/month €140 | on request | IG/FB/TikTok | on request | n/s | n/s | n/s | n/s | [prices](http://www.mcproductionsbg.com/prices.html) |
| Timag | from 149 / 199 / 299 лв (≈ €76 / €102 / €153) | 4+ / 8+ / 12+ | gifs only | no | FB (+IG in top tier) | 2 / 4+ "ad posts" | "Диалог с потребителите" | n/s | n/s | n/s | [timag.eu/facebook](https://timag.eu/facebook/) |
| Ideo Group (Sofia) | 150 / 250 / 350 лв (≈ €77 / €128 / €179); premium 700 / 900 лв (≈ €358 / €460) | 2, 4, 5 a week; 1 or 3 a day | no | no | FB, IG, Pinterest | no | n/s | n/s | n/s | excl. ("без ДДС") | [ideogroup.bg/prices](https://www.ideogroup.bg/prices/) — top tier promises "1000 гарантирани нови фенове" |
| Unexa Digital (Varna) | from €150 | 4 | n/s | n/s | FB, IG, TikTok, YouTube, LinkedIn (service scope) | separate service | "комуникация с последователи" | monthly | n/s | n/s | [unexadigital.com](https://unexadigital.com/uslugi/razvitie-na-sotsialni-mreji/) |
| Moon (Plovdiv) | 390 / 690 / 990 лв (≈ €199 / €353 / €506) | 10 / 15 / 20 (+5 / 7 / 10 "позитивни поста") | no | no | "Включени социални мрежи"; PRO can clone to 2 more | **ad budget included**: 60 / 120 / 180 лв (≈ €31 / €61 / €92) | n/s | "Анализ на резултатите" | priced per month | **excl.** | [moon.bg](https://www.moon.bg/%D1%83%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BD%D0%B0-%D1%81%D0%BE%D1%86%D0%B8%D0%B0%D0%BB%D0%BD%D0%B8-%D0%BC%D1%80%D0%B5%D0%B6%D0%B8) |
| Wonder Digital (Sofia, Plovdiv) | IG: €200 (4), €350 (8), €480 (12); IG+FB one content: €250 (4), €400 (8); +€50 per extra network | 4–12 static / carousels | "не влиза в тези цени" | a shoot day "covers ~1.5 months" (priced separately) | IG, FB; TikTok €85/video; LinkedIn as extra network | 15% of budget, min €220/month | extra, by volume | monthly | **none**, 1-month notice | **not VAT-registered (final)** | [socialni-mrezhi](https://wonderdigital.bg/socialni-mrezhi/), [tseni](https://wonderdigital.bg/tseni/) |
| Flashgate (Plovdiv) | per item, **minimum €210/month**: text €12 (BG) / €14 (EN), image €4, publishing €5 | per order | — | — | Google, FB, LinkedIn, IG profiles | — | replies €8–16 a day | n/s | n/s | **excl.** | [flashgate.co](https://flashgate.co/geo-aeo/socialni-mrezhi/) |

##### Tier B — Design + posting, Reels edited from the client's footage (no filming)

| Provider (city) | Price / month [P] | Posts | Videos | Film | Platforms | Ads | CM | Rep | Min | VAT | Source |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Libre (Plovdiv) | 290 / 580 / 870 лв (≈ €148 / €297 / €445), shown as −20% from 348 / 696 / 1,044 лв | 10 / 20 / 30 | 0 / up to 2 / up to 5 Reels "обработка" | no | FB + IG | n/s | n/s | monthly | n/s | n/s | [libre.bg](https://libre.bg/%D1%83%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BD%D0%B0-%D1%81%D0%BE%D1%86%D0%B8%D0%B0%D0%BB%D0%BD%D0%B8%D1%82%D0%B5-%D0%BC%D1%80%D0%B5%D0%B6%D0%B8/) |
| Sitestation | BGN 450 / 850 (≈ €230 / €435); "Business" (25 posts) price blank | 5 / 12 | up to 3 / 5 Reels "предоставени от клиента" | no | FB + IG | Google ads in PRO | up to 3+3 / 5+5 comments+messages | PRO monthly analysis | n/s | **excl.** | [sitestation.eu](https://sitestation.eu/ceni-poddrajka-socialni-mreji-facebook-instagram/) |
| Bridges (Sofia) | from 650 / 950 / 1,600 лв (≈ €332 / €486 / €818) | 12 / 20 / 30 | "Обработка на видеа за Reels" | no | FB + IG | separate service | n/s | n/s | n/s | n/s | [bridges.bg](https://bridges.bg/uslugi/poddryzhka-na-sotsialni-mrezhi/) (page modified 2024-04-13) |
| SocialDany — management plan | from €350 | 12 | — | no | IG + FB | separate | n/s | "Кратък месечен отчет" | n/s | excl. "когато се дължи" | [socialdany.com/bg/prices](https://socialdany.com/bg/prices) |
| STONER (Sofia) | SEED €249; GROW €449 (new-client promo €404.10 for 6 months, **min 3 months**, until 31.12.2026); BLOOM €749 | 8 / 12 / up to 20 | 2 / 4 / 8 Reels; 0 / 8–12 / 12–20 Stories | not in these tiers: "Професионално заснемане" is listed only under STICK; Content Day (≤2 h) €180 and PRO (≤4 h) €300 are one-off extras | IG+FB; +TikTok from GROW | Meta Ads €150/month extra, budget separate | basic monitoring / yes / yes | monthly | 3 months (GROW promo) | n/s | [stoner.agency](https://stoner.agency/) |
| Silvia Zhivova Academy | €350 / €550 / €650 | 4 / 8 / 8 (+8 days of Stories) | 4 / 8 / 8 videos ≤1:30 "с материал предоставен от възложителя", re-posted to TikTok | no | FB, IG, TikTok | manages 1 paid ad (budget client's) | n/s | plan + statistics, online meeting | **3 months**; −10% for 12 months paid | **incl.** | [zhivovaacademy.com](https://zhivovaacademy.com/social-media) |
| Bo Arts Branding & Design | from €490 / €590 / €790 | 12 / 16 / 20 | Reels editing from 2nd tier; top tier: "от предоставени сурови кадри" | no | FB + IG | top tier: Meta Ads management fee included | top tier: inbox + community | monthly | n/s | n/s | [boartsdesign.com](https://boartsdesign.com/socialni-medii-paeketi-tseni/) |
| Templa (Plovdiv) — Старт | €549 | 8 | 4 Reels "от твоите материали" | no | FB + IG | — | — | monthly | **3 months**; −10% for 3 months prepaid | **excl.** | [templa.bg](https://templa.bg/poddrujka-na-socialni-mreji/) |
| e-motion — FAQ ranges | €200–400 (8–12 posts, 1 platform); €400–700 (15–20 posts + Reels, 2 platforms) | 8–20 | Reels in mid tier | n/s | IG, FB, TikTok, LinkedIn | separate | "по договорка" | monthly | none published | n/s | [e-motionbg.com](https://e-motionbg.com/uslugi/sotsialni-mrezhi/) |
| Adline (Varna) | "от 500 € до 1000 € на месец за 1 социална мрежа"; strategy €1,000 and content plan €250 one-off; €35/hour | n/s | n/s | n/s | per network (FB/IG/Telegram/TikTok/X/YouTube) | n/s | n/s | n/s | 6 months only for monthly consulting | n/s | [adline.bg](https://adline.bg/marketing-v-sotzialnite-mrezhi) |

##### Tier C — Video-led production (filming included; account management partly or not included)

| Provider (city) | Price / month [P] | Videos | Film | Publishing / mgmt | Other inclusions | Min | VAT | Source |
|---|---|---|---|---|---|---|---|---|
| RocketSales (TikTok) | €199 per channel | 4 TikToks | n/s | account setup and optimisation | ideas, reports; 14-day free trial | n/s | **excl.** | [rocketsales.bg](https://rocketsales.bg/bg/smo/tiktok) — template-like page, low confidence |
| ProPlay Agency | Business Pack **from €275** (Starter: 1 video €80 with "Концепция + заснемане + монтаж") | 4 | Starter yes; Business n/s | "Кратък план за публикуване" + social banners | prices "ориентировъчни" | n/s | n/s | [proplayagency.bg](https://proplayagency.bg/) (city not stated) |
| Wonder Digital — UGC | 4 for €304, 8 for €576, 12 for €816 (€76 / €72 / €68 each); single from €80 | 4 / 8 / 12 | by their creators, with the client's product shipped to them; on-site "уговаряме предварително" | organic use in the client's profiles included; ad rights extra | script approved before filming; up to 3 edit revisions; 7 working days | none | **not VAT-registered** | [ugc-video](https://wonderdigital.bg/ugc-video/), [tseni](https://wonderdigital.bg/tseni/) |
| SocialDany — Месечно съдържание | **€480** (one-off: €120 per Reel, €380 for 4) | 4 Reels ≤60 s + 10 photos | **yes**, one planned shoot a month (≤3 h); travel free to 30 km, then €0.25/km | not included (management from €350) | captions written; 2 revision rounds | **3 months** | excl. where due | [socialdany.com/bg/reels](https://socialdany.com/bg/reels) |
| 6th Frame Films (Sofia) | START €500 / GROW €700 / SCALE from €900 | START: 1 × ≤1:00 a week + 2 × ≤20 s a week + 1 × ≤2 min a month (≈ 14/month [E]); GROW ≈ 27; SCALE ≈ 46 [E] | **yes**: pro kit, script, lighting, audio, subtitles; drone from GROW | not mentioned (SCALE adds IG/FB ad optimisation) | first month free on the first order ("Получете един месец безплатно при пъра поръчка", sic) | n/s | n/s | [6th-frame.com](https://www.6th-frame.com/corporativni-klienti) |
| Templa — Само Reels | **€790** (the same site's FAQ says €690) | 6 Reels | **yes** ("заснемане, монтаж, hook-ове, субтитри и cover-и") | n/s | ideas and scripts | **3 months** | **excl.** | [templa.bg](https://templa.bg/poddrujka-na-socialni-mreji/), [FAQ](https://templa.bg/chesto-zadavani-vuprosi/) |
| Next Level Digital — Silver | **€899.99** | 12 | "Професионално видеопроизводство" (on-site filming not spelled out) | "Без управление на платформи" | basic analytics report, content calendar | none published; plan change from next cycle | n/s | [nextleveldigital.bg/bg/pricing](https://www.nextleveldigital.bg/bg/pricing) |

##### Tier D — Full production + management (filming, editing, publishing, reporting)

| Provider (city) | Price / month [P] | Posts | Videos | Film | Platforms | Ads | CM | Rep | Min | VAT | Source |
|---|---|---|---|---|---|---|---|---|---|---|---|
| e-motion — premium | "от 800 евро нагоре"; production packages 4 / 8 / 12 videos "от заснемане през монтаж до публикация" are quote-only | n/s | 4 / 8 / 12 | yes | 3+ | separate | by agreement | monthly | none published | n/s | [e-motionbg.com](https://e-motionbg.com/uslugi/sotsialni-mrezhi/) |
| SocialDany — content + management combined | **€830** [E: €480 + €350, two published plans] | 12 | 4 Reels + 10 photos | yes | IG + FB | — | n/s | monthly | 3 months (content plan) | excl. where due | as above |
| STONER — STICK | **from €900** | individual | "Повече платформи и видео" | **"Професионално заснемане"** | individual | "Paid campaigns" | by agreement | yes | n/s | n/s | [stoner.agency](https://stoner.agency/) |
| Next Level Digital — Gold | **€999.99** | n/s | 12 | as Silver | **2 platforms managed** | — | n/s | advanced analytics, monthly strategy call | none published | n/s | [pricing](https://www.nextleveldigital.bg/bg/pricing) |
| Templa — Растеж | **€1,049** | 8 | 8 Reels | **1 shoot a month** | FB + IG | — | **comments and DMs, Mon–Fri** | monthly + 30-min meeting | **3 months** | **excl.** | [templa.bg](https://templa.bg/poddrujka-na-socialni-mreji/) |
| Next Level Digital — Platinum | **€1,299.99** | n/s | 20 | as Silver | 3 platforms | paid-ads strategy consultation | n/s | full analytics panel, weekly calls | none published | n/s | [pricing](https://www.nextleveldigital.bg/bg/pricing) |
| Templa — Brand Boss | **€1,790** | 12 | 12 Reels | **2 shoots a month** | FB + IG + TikTok | **Meta ads managed** (budget separate) | priority communication | quarterly strategy | **3 months** | **excl.** | [templa.bg](https://templa.bg/poddrujka-na-socialni-mreji/) |
| Linkbox (TikTok ads, adjacent) | €690 / €1,290 / €2,490 ("ориентировъчни") | — | up to 2 ads / 5 / 10 TikToks | optional ("Видео заснемане или редакция") | TikTok | **yes, ads-led**; budget separate | — | monthly | "Без обвързващи договори" | n/s | [linkbox.bg](https://linkbox.bg/reklama-v-tiktok/) |

##### AI substitute (price floor, no filming)

| Provider | Price [P] | What | VAT | Source |
|---|---|---|---|---|
| Raboti (Sofia) | **€49/month for 4 videos, €79 for 8** | Short videos built by AI from the client's existing photos, offers and prices: "без заснемане"; no setup fee, no term | **excl.** | [raboti.bg](https://raboti.bg/ai-agenti/video-za-socialni-mrezhi/) |

##### Video-led agencies that publish scope but no price

| Provider | Published scope [P] | Source |
|---|---|---|
| SEOMAX (Plovdiv, Sofia) | Старт 4 / Растеж 8 / Лидер 16 videos a month; script, filming on your premises, editing, monthly strategy, results analysis; "конкретна оферта" | [seomax.bg](https://seomax.bg/services/video-marketing/) |
| Netpeak Bulgaria | Solo 1 / Start 4 / Smart 8 / Plus 10 / Max 12 videos; concept, phone-style filming, actor if needed, voice-over, subtitles; one-off or 3- or 6-month subscription | [netpeak.bg](https://netpeak.bg/services/short-videos/) |
| In Motion | Monthly video subscription ("Фиксирана цена" but not shown); 8–12 videos per shoot day; all of Bulgaria | [inmotion.bg](https://inmotion.bg/mesechen-abonament/) |
| NextGen Digital | Video-for-social table (1 long video, 2 Reels, combo, photo + video, 4 Reels with publishing) now says "по запитване". Older euro prices still appear in search snippets; not used | [nextgendigital.bg/цени](https://nextgendigital.bg/%D1%86%D0%B5%D0%BD%D0%B8/) |
| EVOL, AdExpert | No prices. EVOL mentions "стандартни тримесечни договори" and includes community management in the fee | [evol.bg](https://evol.bg/social-media-management/), [adexpert.bg](https://adexpert.bg/index.php/uslugi/upravlenie-na-sotsialni-mrezhi-smm/) |

#### 1.3 "Market price" claims published by agencies [S]

| Source (date) | Claim |
|---|---|
| [3 Lines Studio blog](https://3ls.bg/blog/upravlenie-na-socialni-mrezhi-cena/) (2026-07-17) | Basic €150–260 (8–12 posts, 1 platform); Standard €260–450 (16–20 posts, 2 platforms, Stories, comment replies); Full €450–750 (20+ posts, 3+ platforms, Reels/video, monthly report); ads management +€100–300. (The table header says "лв./мес." but the values are in EUR.) |
| [Marketing Toolbox](https://mktoolbox.com/blog/best-digital-marketing-agencies-in-bulgaria/) (2026-04-27, updated 2026-06-23) | Social media management: Basic €100–300, Standard €300–700, Advanced €700–1,500+; "most businesses … fall into the €1,500–€3,500/month range" for full-service digital. Its [SMM page](https://mktoolbox.com/social-media-marketing-agency-bulgaria/) says retainers "typically range from €500 to €3,000+". |
| [FreelanceBG blog](https://freelancebg.eu/blog/social-media-marketing-freelance-usluga) (2026-06-11) | Monthly management of 1–2 platforms €153–358; content + design €102–256 |

#### 1.4 Price per video [E]

Calculated from the published prices above. Packages differ in what else is included, so this is a rough guide only.

| Offer | €/month | Videos | €/video | Also included |
|---|---|---|---|---|
| 6th Frame START / GROW | 500 / 700 | ≈14 / ≈27 | ≈36 / ≈26 | filming, no publishing |
| Next Level Platinum / Silver / Gold | 1,299.99 / 899.99 / 999.99 | 20 / 12 / 12 | 65 / 75 / 83 | Gold and Platinum: 2–3 platforms managed |
| Wonder UGC 8 | 576 | 8 | 72 | product UGC, no publishing |
| SocialDany content plan | 480 | 4 | 120 | +10 photos, no publishing |
| Templa Растеж / Само Reels / Brand Boss | 1,049 / 790 / 1,790 | 8 / 6 / 12 | 131 / 132 / 149 | Растеж: +8 posts, replies; Brand Boss: +12 posts, ads |
| **Hera 4 / 8 / 12** (planned) | ≈600 / ≈1,100 / ≈1,300 | 4 / 8 / 12 | **150 / 138 / 108** | filming, editing, publishing, reporting; no ads, no CM |

#### 1.5 Where a €600–1,300 filming-first retainer sits [E]

- **The range overlaps the top of Tier C and most of Tier D.** It sits above posting-only (€30–510) and most design + posting packages (€150–820). It sits below the "full-service digital" retainers that one agency calls typical (€1,500–3,500), which include ads and SEO.
- **€600 for 4 filmed and published videos** is below SocialDany's €830 for the same combination (4 Reels + 12 posts, sold as two plans) and just above Templa Старт (€549, which only edits the client's own footage).
- **€1,100 for 8 is at the upper edge of parity:**
  - about 5% above Templa Растеж (€1,049 excl. VAT), which also answers comments and messages on weekdays;
  - about 10% above Next Level Gold (€999.99), which gives 12 videos and 2 managed platforms;
  - about 13% above Wonder's 8 UGC videos plus 8 IG+FB posts (€576 + €400 = €976). Wonder charges no VAT, so for a client that is not VAT-registered the gap is €1,320 vs €976.
- **The parity zone for 8 videos with publishing is about €950–1,050 excl. VAT.** Pricing at €1,100 needs visible extra value (on-site filming every month, approval workflow, quality), because the nearest rival includes community management that Hera excludes.
- **€1,300 for 12 videos** matches Next Level Platinum's price (which promises 20 videos) and is 27% below Templa Brand Boss (€1,790, which adds 2 shoots and ads management).

---

### 2. Freelancers

| Freelancer / marketplace | Service | Published price | Notes | VAT | Type | Source |
|---|---|---|---|---|---|---|
| Nikolay Florov (Sofia, own EOOD) | SMM for FB / IG / YouTube | Start 260 лв / €132.94; Business 340 лв / €173.84; Pro 560 лв / €286.33 per month | IG Start: 8 designed posts + 8 Stories, 1 promotion, community communication, monthly report; price applies to a **6-month contract** | n/s | [P] | [socialmediamarketing.pro](https://www.socialmediamarketing.pro/social-media-marketing) |
| Nikolay Florov | Video package | 340 лв / €173.84 per month | 12 videos ≤60 s a month from licensed stock or client material; filming "ще се обсъди допълнително"; 6-month contract | n/s | [P] | [video-sydyrjanie](https://www.socialmediamarketing.pro/social-media-marketing/video-sydyrjanie) |
| Martin Kotsev (web designer) | Posting subscription | 100 / 200 / 300 лв (€51.13 / €102.26 / €153.39) | 10 / 20 / 30 posts; FB → FB+IG → +1 network; hourly 20 лв (€10.23) | n/s | [P] | [mkotsev.com](https://mkotsev.com/social.php) |
| OLX ad, Plovdiv (private, 2026-04-15) | Social media management | "Социални мрежи — от 75 €/месец" | web and design freelancer | n/s | [P] | [olx.bg](https://www.olx.bg/d/ad/izrabotka-na-uebsaytove-dizayn-i-poddrazhka-na-sotsialni-mrezhi-CID555-ID9ZDKC.html) |
| OLX ad, Stara Zagora (private, 2024-03-03) | Edited social video | 120 лв (≈ €61) per video ≤60 s | subtitles, music, 1 revision; old ad | — | [P] | [olx.bg](https://www.olx.bg/d/ad/sadarzhanie-za-sotsialni-mrezhi-video-za-facebook-tiktok-i-instagram-CID555-ID9pDeE.html) |
| Sanya's world (UGC creator, VAT-registered company) | UGC videos | 1 = €150–190; 3 = €420 (€140 each); 10 = €750 (€75 each) | product by courier or a visit; fuel €50 within 150 km of Sofia; shooting with the client's kit €75/hour, min 8 h/month | **excl.** | [P] | [sanyasworld.com](https://sanyasworld.com/uslugi-i-ceni/) |
| MC Productions (micro-studio) | Short-form edit | €20 per ≤60 s; €140 for 10 a month | editing only | n/s | [P] | [prices](http://www.mcproductionsbg.com/prices.html) |
| Silvia Zhivova Academy (per item) | Single posts and videos | post €20; video €25 (no subtitles) / €30 (with subtitles); higher rows €35–80 on other networks | client's material | **incl.** | [P] | [zhivovaacademy.com](https://zhivovaacademy.com/social-media) |
| FreelanceBG directory (rates the freelancers set themselves, November 2026) | Hourly rates | Marketing / SMM: typical **€30–43/h**, median €35 (16 profiles). Video & photo: **€15–43/h**, median €20 (9 profiles). All categories: median €28/h, most €15–35 (65 profiles) | small samples | — | [P] (directory statistics) | [prices](https://freelancebg.eu/prices), [marketing](https://freelancebg.eu/category/marketing), [video](https://freelancebg.eu/category/video-foto) |
| FreelanceBG cost calculator ("150+ оферти") | Editing and filming | social video edit **€41–128 per video**; filming **€153–614 half day, €256–1,278 full day** | methodology not published | — | [S] | [calculator](https://freelancebg.eu/tools/video-editing-cost-calculator) |
| UGCBG blog (2026-08-12) | UGC video | 80–800 лв (≈ €41–409) per video; "realistic start" 150–300 лв (≈ €77–153); 3–5 videos 450–1,500 лв (≈ €230–767); ad rights +20–100% | | — | [S] | [ugcbg.eu](https://ugcbg.eu/blog/kolko-struva-ugc-video-v-balgariya-prez-2026-realni-stavki-po-format) |

**Spread [E]:**

- Monthly posting by a freelancer: **€51–290**, a 5–6× spread. Agencies charge €150–800 for comparable posting.
- One edited short video: **€20–128**. One filmed creator video: **€68–190**. A filming day: **€256–1,278** (calculator claim).
- Upwork and OLX gave no usable rate lists: Upwork returned 403, and most OLX service ads say "price on request".

**Assembling 8 videos a month from freelancers [E]:** one half-day shoot (€153–614) + 8 edits (8 × €41–128 = €328–1,024) + a posting freelancer (€75–290) ≈ **€560–1,930/month**. That excludes the owner's coordination time, and VAT where suppliers are registered. It overlaps Hera's price; the low end needs the cheapest supplier in every role.

---

### 3. The in-house alternative

#### 3.1 Official wage benchmarks [P]

NSI, *Employees and average wages and salaries – Q3 2026* (published 2026-11-13). Average monthly **gross** wage in EUR:

| Economic activity | Jul 2026 | Aug 2026 | Sep 2026 |
|---|---|---|---|
| **Total** (Q3 average **€1,438**, +10.4% y/y) | 1,445 | 1,411 | 1,458 |
| Professional, scientific and technical activities (includes advertising agencies) | 1,950 | 1,915 | 1,950 |
| Arts, entertainment and recreation | 1,296 | 1,309 | 1,391 |
| Information and communication (includes film/video, but dominated by IT) | 3,074 | 3,001 | 3,101 |
| Wholesale and retail trade | 1,286 | 1,251 | 1,283 |
| Accommodation and food service activities | 896 | 902 | 930 |

The 2026 minimum wage is **€620.20** (1,213 лв) [S: Finance Academy, netobruto.eu].

#### 3.2 Job ads that show salaries

**zaplata.bg, Marketing / Advertising / PR category, live on 2026-11-18 (all gross) [P]:**

| Role | City | Gross / month | Posted |
|---|---|---|---|
| Копирайтър / Content Writer | Plovdiv | €1,600–1,900 | 12 Nov |
| Специалист маркетинг и продажби (hotel chain) | Plovdiv | €1,200–1,500 | 9 Nov |
| Графичен дизайнер | Ruse | €1,000–1,400 | 22 Oct |
| Експерт дигитален маркетинг | Sofia | €2,000–2,100 | 5 Nov |
| Marketing Manager | Sofia | €1,900–2,200 | 23 Oct |
| Senior Performance/Growth Specialist | Sofia | €2,300–2,505 | 4 Nov |
| German- or Dutch-speaking Digital Marketing Specialist (language premium) | Sofia | €2,198–2,700 | 12 Nov |

No social-media-manager, videographer or video-editor ad with a salary was live on zaplata.bg that day. Source: [zaplata.bg/en/marketing-reklama-pr](https://www.zaplata.bg/en/marketing-reklama-pr/).

**jobs.bg [S].** jobs.bg blocks automated access (HTTP 403), so these figures come from search-engine extracts of jobs.bg category pages and were not opened directly:

| Role | Pay | Date |
|---|---|---|
| Мениджър социални мрежи | €1,100–1,500 gross | 06.10.2026 |
| Manager – Social Media & Business Development (Sofia) | €1,500–2,500 gross | Oct 2026 |
| PPC & Social Media Specialist (Varna) | €1,800–2,500 **net** | Oct 2026 |
| Видеомонтажист на short-form съдържание (Romanov Media, Sofia) | €1,300–1,600 gross | 23.06.2026 |
| Видеограф (hybrid; full-time, part-time or freelance) | €850–1,500 **net** + €250–400 signing bonus | 23.06.2026 |
| Видеооператор и монтажист, 4 hours a day | €350–400 **net** | 14.10.2026 |
| Създател на видео за социални мрежи, part-time | €615–920 **net** | 20.02.2026 |
| Social Media Video Editor, remote (zaplata.bg, Castle Marketing Strategies) | €500–1,000 gross | posted 04.09.2026, now expired |

Category pages: [Social Media Strategist / Specialist](https://www.jobs.bg/en/front_job_search.php?s_c%5B%5D=2373), [Видеомонтажист](https://www.jobs.bg/en/front_job_search.php?s_c%5B%5D=544), [Видеооператор](https://www.jobs.bg/en/front_job_search.php?s_c%5B%5D=546).

#### 3.3 Salary surveys [S, low confidence]

- **Zaplatomer.bg (Paylab Bulgaria).** The site blocked automated access (HTTP 202 with an empty body), so these come from search-engine extracts:
  - Marketing Specialist: "80% … earn between 917 EUR and 1,972 EUR monthly" (the extract says net), full range €820–3,013, €1,527 gross after 5 years;
  - Camera Operator: €497–1,098 (extract says net);
  - Social media specialist: €499–1,131;
  - Digital marketing specialist: €347–765 (78 respondents).
  
  The net and gross labels are inconsistent, so use these only as a rough check. [Marketing Specialist](https://www.zaplatomer.bg/en/salaryinfo/marketing-advertising-pr/marketing-specialist), [Camera Operator](https://www.zaplatomer.bg/en/salaryinfo/journalism-printing-arts-media/camera-operator).
- **Huzzle**, a remote-hiring platform: "A Social Media Manager in Bulgaria typically earns $1,000 – $3,200 per month". [huzzle.com](https://www.huzzle.com/hire/social-media-manager/in/bulgaria)
- **3LS blog:** an in-house junior SMM costs "600–800 EUR/мес." plus social security. That is below the national average wage and below every 2026 ad found, so treat it as understated.

#### 3.4 Employer social-security cost (2026) [S]

Three Bulgarian accounting and payroll sources agree; the rates were not checked against NRA/NOI directly.

- **Employer: 18.92–19.62% of gross** for staff born after 31.12.1959 in 3rd-category labour:
  - pension 8.22%, sickness and maternity 2.10%, unemployment 0.60%;
  - supplementary pension (УПФ) 2.80%, health 4.80%;
  - work accident 0.4–1.1% depending on the activity (0.4% for office work).
- **Employee:** 13.78%. **Income tax:** 10%.
- **Contribution cap:** €2,111.64 a month (January–July 2026), raised to **€2,300 from 2026-08-01** by the State Social Security Budget Act 2026 (adopted July 2026).
- **Sources:** [Finance Academy](https://blog.financeacademy.bg/trz-normativi) (2026-06-07), [netobruto.eu](https://netobruto.eu/osigyrovki.php), [suma.bg](https://suma.bg/maksimalen-osiguritelen-dohod-2026/) (2026-08-17, updated 2026-11-06).
- **Other employer costs, not quantified:** paid leave, the first days of sick leave, recruitment, equipment, software and management time.

#### 3.5 One in-house person vs an agency retainer [E]

Employer cost = gross × 1.1892 (office-activity rate, below the cap). Net-to-gross uses 13.78% employee contributions and 10% tax.

| Option | Monthly cost to the business | What it buys |
|---|---|---|
| Full-time SMM / content all-rounder at €1,100–1,600 gross | **€1,308–1,903**, plus kit and software ≈ €100–200 [E] → **≈ €1,400–2,100** | ≈170 working hours; one person's skills; filming quality depends on the kit bought |
| Full-time short-form video editor at €1,300–1,600 gross | **€1,546–1,903** | editing only; strategy, filming and posting still needed |
| Videographer at €850–1,500 net (≈ €1,095–1,933 gross) | **€1,303–2,299** | filming (and probably editing) |
| Part-time operator-editor, 4 h/day, €350–400 net (≈ €451–515 gross) | **€536–613** | ≈85 hours; cheaper than any agency, with no strategy or management layer |
| Freelancer assembly, 8 videos | **≈ €560–1,930** | the owner coordinates |
| Next Level Gold | €999.99 (VAT not stated) | 12 videos, 2 platforms |
| Templa Растеж | €1,049 excl. VAT (€1,259 incl.) | 8 Reels + 8 posts, 1 shoot, replies |
| **Hera, 8 videos** | **€1,100 excl. VAT**; €1,320 for a client that cannot recover VAT | 8 original videos: filming, editing, publishing after approval, reporting |

**Reading [E]:**

- For a VAT-registered client, a €1,100 retainer is **about 20–50% cheaper** than the all-in cost of one full-time hire (€1,400–2,100).
- For a client that is not VAT-registered, it is **about 5–37% cheaper** (€1,320 vs €1,400–2,100).
- A hire gives more hours and daily presence, but one person rarely covers strategy, on-site filming, editing, design and reporting at once.
- A **part-time hire (~€540–610)** or **one hospitality-sector salary (€896–930 gross, NSI)** is the more likely mental comparison for a café or restaurant owner, and both are below Hera's price.

---

### 4. What Bulgarian SMEs spend on marketing

| Indicator | Bulgaria | EU-27 | Source |
|---|---|---|---|
| Enterprises (10+ staff) paying to advertise on the internet, 2024 | **25.6%** (2023: 20.9%) | 32.6% | Eurostat ISOC_CISMT [P] |
| … small enterprises (10–49), 2024 | **24.2%** | 30.6% | same |
| … medium enterprises (50–249), 2024 | **32.4%** | 40.1% | same |
| Enterprises (10+) using any social media, 2025 | **41.5%** | 63.6% | Eurostat ISOC_CISMT; NSI press release [P] |
| … small enterprises (10–49), 2025 | **38.7%** | 60.6% | same |

Sources: Eurostat API, [ISOC_CISMT](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/ISOC_CISMT?geo=BG&geo=EU27_2020&format=JSON&lang=en); [NSI ICT 2025](https://www.nsi.bg/en/press-release/ict-usage-and-e-commerce-in-enterprises-8879). Both surveys exclude microbusinesses (under 10 staff), and Eurostat has no Bulgarian micro-enterprise rows for these indicators.

- **Budget as a share of revenue, or stated willingness to pay:** no credible Bulgarian survey was found (see gaps). Agencies do publish claims [S]:
  - Marketing Toolbox: "€1,500–€3,500/month" is the common full-service range;
  - Templa: "около 300 € месечен бюджет" is a sensible starting ad budget for local services;
  - 3LS: doing it yourself costs the owner 8–15 hours a month (≈ €260–450 of their time).
- **Reading [E]:** only about a quarter of Bulgarian firms with 10+ staff pay for any online advertising, and fewer than half use social media at all, far behind the EU. The paying market for a €600–1,300 monthly retainer is therefore a minority even among small firms. Prospects have to be pre-qualified on budget rather than assumed.

---

### 5. Gaps and caveats

1. **Search ran out mid-task.** The web-search limit shared by all agents in this session was used up before the salary and SME-spend parts could be searched in depth. Only direct page fetches and the Eurostat API were used after that. A follow-up session could close gaps 2–5.
2. **jobs.bg** (DataDome, 403) and **Zaplatomer/Paylab** (empty 202 responses) could not be opened. Their figures are search-engine extracts, marked [S]. Zaplatomer's net/gross labels are inconsistent.
3. **No Bulgarian SME survey** of marketing budgets as a share of revenue, or of willingness to pay for social media services. Eurostat gives only the share of firms that pay for online ads, not the amounts.
4. **Freelancer data is thin.** Upwork returned 403, and OLX service ads rarely show prices. The FreelanceBG directory statistics rest on 9–16 profiles per category.
5. **Social-security rates** come from secondary accounting sources (consistent with each other), not from NRA or NOI directly.
6. **Package comparability.** Platforms, filming, community management and VAT are often not stated (n/s). Several pages still show leva (Moon, Libre, Bridges, Timag, Ideo, Sitestation, Kotsev, Florov). Bridges was last modified in 2024. Templa shows two prices for the same Reels-only plan (€790 on the package page, €690 in the FAQ).
7. **Unreachable or removed:** The Journey Media (DNS failure), Craftio Xpress and viral-marketing.eu (domains gone), NetSoft (403), NextGen Digital (prices replaced by "по запитване"; older €230 / €410 figures exist only in search snippets).
8. **Excluded non-Bulgarian benchmark:** Everline Media Ltd (no Bulgarian address; site in English, Norwegian and Bosnian) publishes a very similar model: €500 for 4 Reels + 1 filming day, €1,000 for 10 + 2, €1,500 for 16 + 4. [everline-media.com](https://everline-media.com/services/social-media-and-video/)

---

### 6. Sources

All were checked on 2026-11-18. The page's own date is given where it shows one.

| Source | URL | Page date |
|---|---|---|
| SocialDany | https://socialdany.com/bg/reels ; https://socialdany.com/bg/prices | "Ценоразпис · 2026" |
| Next Level Digital | https://www.nextleveldigital.bg/bg/services ; /bg/pricing ; /bg/faq | © 2026 |
| Wonder Digital | https://wonderdigital.bg/socialni-mrezhi/ ; /tseni/ ; /ugc-video/ | — |
| SEOMAX | https://seomax.bg/services/video-marketing/ | — |
| Bridges | https://bridges.bg/uslugi/poddryzhka-na-sotsialni-mrezhi/ | modified 2024-04-13 |
| e-motion | https://e-motionbg.com/uslugi/sotsialni-mrezhi/ | — |
| MC Productions | http://www.mcproductionsbg.com/prices.html | — |
| Templa | https://templa.bg/poddrujka-na-socialni-mreji/ ; https://templa.bg/chesto-zadavani-vuprosi/ | home modified 2026-10-16 |
| STONER | https://stoner.agency/ | "SOFIA / 2026" |
| 6th Frame Films | https://www.6th-frame.com/corporativni-klienti | — |
| Silvia Zhivova Academy | https://zhivovaacademy.com/social-media | — |
| Bo Arts Branding & Design | https://boartsdesign.com/socialni-medii-paeketi-tseni/ | — |
| Libre | https://libre.bg/управление-на-социалните-мрежи/ | — |
| Moon | https://www.moon.bg/управление-на-социални-мрежи | © 2012–2026 |
| Sitestation | https://sitestation.eu/ceni-poddrajka-socialni-mreji-facebook-instagram/ | — |
| Unexa Digital | https://unexadigital.com/uslugi/razvitie-na-sotsialni-mreji/ | — |
| Adline | https://adline.bg/marketing-v-sotzialnite-mrezhi | © 2025 |
| Ideo Group | https://www.ideogroup.bg/prices/ | — |
| Timag | https://timag.eu/facebook/ | — |
| Flashgate | https://flashgate.co/geo-aeo/socialni-mrezhi/ | — |
| RocketSales | https://rocketsales.bg/bg/smo/tiktok | — |
| ProPlay Agency | https://proplayagency.bg/ | — |
| Linkbox | https://linkbox.bg/reklama-v-tiktok/ | — |
| Raboti | https://raboti.bg/ai-agenti/video-za-socialni-mrezhi/ | — |
| Netpeak | https://netpeak.bg/services/short-videos/ | — |
| In Motion | https://inmotion.bg/mesechen-abonament/ ; https://inmotion.bg/tiktok-reels/ | — |
| NextGen Digital | https://nextgendigital.bg/цени/ | — |
| EVOL ; AdExpert | https://evol.bg/social-media-management/ ; https://adexpert.bg/index.php/uslugi/upravlenie-na-sotsialni-mrezhi-smm/ | — |
| 3 Lines Studio blog | https://3ls.bg/blog/upravlenie-na-socialni-mrezhi-cena/ | 2026-07-17 |
| Marketing Toolbox | https://mktoolbox.com/blog/best-digital-marketing-agencies-in-bulgaria/ ; https://mktoolbox.com/social-media-marketing-agency-bulgaria/ | 2026-06-23 ; 2026-10-04 |
| Nikolay Florov | https://www.socialmediamarketing.pro/social-media-marketing (+ /video-sydyrjanie, /poddryjka-na-instagram-stranica/start-paket) | © 2024 |
| Martin Kotsev | https://mkotsev.com/social.php | — |
| Sanya's world | https://sanyasworld.com/uslugi-i-ceni/ | © 2026 |
| OLX.bg ads | https://www.olx.bg/d/ad/izrabotka-na-uebsaytove-dizayn-i-poddrazhka-na-sotsialni-mrezhi-CID555-ID9ZDKC.html ; https://www.olx.bg/d/ad/sadarzhanie-za-sotsialni-mrezhi-video-za-facebook-tiktok-i-instagram-CID555-ID9pDeE.html | 2026-04-15 ; 2024-03-03 |
| FreelanceBG | https://freelancebg.eu/prices ; /category/marketing ; /category/video-foto ; /tools/video-editing-cost-calculator ; /blog/social-media-marketing-freelance-usluga | Nov 2026 ; blog 2026-06-11 |
| UGCBG | https://ugcbg.eu/blog/kolko-struva-ugc-video-v-balgariya-prez-2026-realni-stavki-po-format | 2026-08-12 |
| NSI wages Q3 2026 | https://www.nsi.bg/en/press-release/employees-and-average-wages-and-salaries-third-quarter-of-2026-9213 (PDF: https://www.nsi.bg/en/file/39004/employees_and_average_wages_and_salaries.pdf) | 2026-11-13 |
| NSI ICT in enterprises 2025 | https://www.nsi.bg/en/press-release/ict-usage-and-e-commerce-in-enterprises-8879 | 2025 data |
| Eurostat ISOC_CISMT | https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/ISOC_CISMT?geo=BG&geo=EU27_2020&format=JSON&lang=en | 2023–2025 data |
| zaplata.bg | https://www.zaplata.bg/en/marketing-reklama-pr/ | live 2026-11-18 |
| jobs.bg (not opened, [S]) | https://www.jobs.bg/en/front_job_search.php?s_c%5B%5D=2373 ; …=544 ; …=546 | ads Feb–Oct 2026 |
| Zaplatomer (not opened, [S]) | https://www.zaplatomer.bg/en/salaryinfo/marketing-advertising-pr/marketing-specialist ; …/journalism-printing-arts-media/camera-operator | — |
| Huzzle | https://www.huzzle.com/hire/social-media-manager/in/bulgaria | — |
| Payroll rates | https://blog.financeacademy.bg/trz-normativi ; https://netobruto.eu/osigyrovki.php ; https://suma.bg/maksimalen-osiguritelen-dohod-2026/ | 2026-06-07 ; — ; 2026-11-06 |
| Everline Media (excluded, non-BG) | https://everline-media.com/services/social-media-and-video/ | © 2026 |

---

## Part 3. What people search for, and what competitor sites contain

- **Date:** 2026-11-18.
- **Market:** Google Bulgaria, Bulgarian (DataForSEO location 2100, language `bg`).
- **Project:** OpenSEO project "Hera Editing" (`05d71d0d-…`), default market.
- **Scope:** Read-only research. Nothing in the repository or the design workspace was changed.
- **Credits:** 221 spent (16,017 → 15,796) of the 1,500 budget.

### Key findings

1. **Beyond the core cluster in docs/research/05, no candidate page type shows real B2B demand.**
   - The core cluster is „поддръжка на фейсбук страница“ 720 + „…страници“ 590.
   - 462 new keywords were measured explicitly. Only 120 (26%) have any measurable volume, and most of those are
     10–30 a month.
   - The 27 keywords at 50 or more a month are tools, definitions, careers or adjacent services, not buyers of organic
     social media management.
2. **Sector pages: essentially no demand.**
   - Every „маркетинг за / социални мрежи за / видео за [sector]“ phrase for dentists, clinics, beauty, fitness, real
     estate, car dealers, cafés and shops returned nothing.
   - The only sector phrases with volume are „реклама за салон за красота“ 30, „реклама на хотел/хотели“ 20,
     „маркетинг в туризма“ 20, and „маркетинг за хотели“ and „реклама на ресторант“ at 10 each.
   - Their results pages are Pinterest idea boards, signage shops and guides, not agency pages.
3. **Platform pages: no demand for organic TikTok or Instagram management.**
   - „тикток агенция“, „тикток маркетинг“, „поддръжка на тикток“ and „управление на инстаграм“ all returned nothing.
     „поддръжка на инстаграм“ has 10.
   - What exists is paid-ads intent: „тикток реклама“ 20 and „реклама в инстаграм“ 20. These are TikTok Ads help pages
     and how-tos, and paid ads are outside v1.
   - Feature names also have volume: „reels“ 590, „youtube shorts“ 1,600.
   - UGC demand is on the creator side: „ugc creator“ 390, and „ugc creator bulgaria“ 40, where creator marketplaces
     rank.
4. **Adjacent commercial pockets:**
   - „продуктова фотография“ 140 plus „продуктов фотограф“ 30. Photo studios, guides and a local pack rank.
   - „видеограф цена“ 90, probably weddings.
   - „дигитална агенция пловдив/софия“ 40 each.
   - Price, audit and city questions about social media or reels („колко струва рийл“, „одит на социални мрежи“,
     „агенция за социални мрежи софия“) returned nothing.
5. **Competitors (16 sites assessed) commonly have, and Hera does not yet have:**

   | What | Sites |
   |---|---:|
   | A blog | 12/16 |
   | Named clients or a portfolio | 11/16 |
   | A free consultation or audit CTA | 9/16 |
   | Platform pages (mostly paid ads) | 9/16 |
   | A named team | 8/16 |
   | Testimonials | 7/16 |
   | Public prices | 6/16 |

   Sector pages for marketing (2/16), city pages (2/16), lead magnets (4/16) and a Google reviews widget (1/16) are
   rare.
6. **Closest positioning: Public Chapter (ex-Social Book, publicchapter.bg).**
   - Filming is included, on five networks.
   - Its service page has a 15-question FAQ and four case studies with numbers.
   - It names its team, including a videographer.
   - It publishes no price.
7. **SocialDany publishes 100 Bulgarian blog posts.**
   - They include about 15 sector video guides and about 15 cost guides ("Колко струва…").
   - Every URL has the same sitemap date (28–29 Sep 2026).
   - The cost and sector questions those posts answer show no measurable search volume.

### Method

- **Keyword metrics:**
  - Tool: OpenSEO `get_keyword_metrics`, with Google Ads-derived volume and DataForSEO Labs keyword difficulty and
    intent.
  - Three calls: 150 + 239 + 73 = 462 keywords.
  - Plus `research_keywords` with five wildcard seeds: „маркетинг за *“, „реклама на *“, „реклама за *“, „видео за *“
    and „* за социални мрежи“. They returned 240 idea rows.
  - Keywords already in docs/research/05 were **not re-queried**. Where the brief listed them, their 05 values are repeated
    and marked "(05)".
- **Columns:**
  - **Vol:** average monthly searches, in Google's buckets (10, 20, 30, 40, 50, 70, 90, 110, 140, 170, 210…).
  - **KD:** keyword difficulty, 0–100.
  - **CPC:** what advertisers pay per click, in EUR.
  - **Comp:** the Google Ads competition index, 0–1 (L / M / H).
  - **"—":** the tool returned the field as null.
  - **No data:** the tool returned no row for the keyword. That means below about 10 a month or absent from the dataset.
  - **Intent note:** my reading of the wording and, where checked, the results page. DataForSEO's machine label is shown
    in [brackets] where it matters.
- **SERPs:**
  - Tool: `get_serp_results`, desktop, Bulgaria.
  - Each query is read three times and merged. Positions are the best position across the reads.
  - 10 strategy queries were read, plus a re-read of docs/research/05's three core queries, used only to find competitor
    domains.
- **Competitors:**
  - Public homepages and selected pages via WebFetch, which returns a model's extraction of each page.
  - Public sitemaps via curl, for page counts and last-modified dates.
  - No forms were submitted and no logins used.

---

### 1. Keyword tables

#### 1a. Sector + social media / marketing / video

Rows with a returned row, sorted by volume:

| Keyword | Vol | KD | CPC | Comp | Intent note |
|---|---:|---:|---:|---|---|
| реклама за салон за красота | 30 | — | 2.68 | 0.14 L | Results: 7 Pinterest idea boards. Inspiration, not a buyer [informational] |
| реклама за магазин | 30 | 12 | 0.66 | 0.39 L | Results: signage and print makers, OLX/bazar classifieds (wildcard result) |
| реклама на хотел | 20 | 38 | — | 0.00 L | Results: Pinterest, a Croatian article, YouTube hotel ads. Inspiration |
| реклама на хотели | 20 | 41 | — | 0.04 L | Probably the same cluster as „реклама на хотел“; do not add |
| маркетинг в туризма | 20 | — | 0.69 | 0.05 L | Topic, course or definition intent |
| b2b маркетинг | 20 | — | — | 0.19 L | Generic, not a sector |
| маркетинг за хотели | 10 | — | — | 0.11 L | The only „маркетинг за [sector]“ with volume, besides online shop and small business |
| хотелски маркетинг | 10 | — | — | — | Informational |
| маркетинг в хотелиерството | 10 | — | 0.48 | 0.01 L | Informational |
| реклама за хотели | 10 | 41 | — | — | Same cluster as the hotel rows (wildcard) |
| безплатни сайтове за реклама на хотели | 10 | — | — | 0.00 | Listing sites, not agencies (wildcard) |
| реклама на къща за гости | 10 | — | — | 0.00 L | [navigational] |
| реклама на ресторант | 10 | — | 0.26 | 0.14 L | Results: Pinterest, guides, SaaS blogs, one ad-agency page (see §2) |
| реклама за ресторант | 10 | — | 0.83 | 0.34 M | |
| реклама за ресторант текст | 10 | — | — | 0.00 | Wants ad copy text (wildcard) |
| идеи за реклама на заведение | 10 | — | — | — | Ideas (wildcard) |
| реклама за заведение за бързо хранене | 10 | — | — | 0.00 | (wildcard) |
| restaurant marketing | 10 | — | — | 0.86 H | English term |
| реклама на салон за красота | 10 | — | 0.38 | 0.39 M | |
| идеи за реклама на фризьорски салон | 10 | 36 | — | 0.00 | Ideas (wildcard) |
| външна реклама за фризьорски салон | 10 | — | — | 0.00 | Signage (wildcard) |
| реклама за маникюр | 10 | 33 | — | 0.09 | (wildcard) |
| реклама за масажи | 10 | — | — | 0.00 | (wildcard) |
| маркетинг в здравеопазването | 10 | — | — | 0.00 L | Informational; the only health-sector phrase with volume |
| реклама на автосервиз | 10 | — | — | 0.00 L | |
| реклама на магазин | 10 | 12 | — | 0.12 L | |
| реклама на магазин за дрехи | 10 | — | — | 0.00 | (wildcard) |
| маркетинг за онлайн магазин | 10 | — | 1.01 | 0.86 H | E-commerce marketing (ads/SEO agencies) |
| реклама на онлайн магазин | 10 | — | 1.82 | 0.86 H | |
| реклама на туристическа агенция | 10 | — | — | 0.09 | (wildcard) |
| маркетинг за малък бизнес | 10 | — | — | — | |
| реклама на бизнес | 10 | — | — | 0.71 H | |
| реклама на фирма | 10 | — | 0.93 | 0.17 L | |
| безплатна реклама на фирма | 10 | — | — | 0.29 | (wildcard) |
| реклама на бизнеса си в интернет | 10 | — | 1.52 | 0.79 H | (wildcard) |
| реклама на вашия бизнес в интернет | 10 | — | — | 0.64 | (wildcard) |
| реклама на страница във фейсбук | 10 | — | 7.27 | 0.71 H | Paid page promotion (wildcard) |
| реклама на продукти | 10 | 38 | 1.07 | 0.43 M | (wildcard) |
| как се прави реклама на продукт | 10 | 38 | — | 0.43 | How-to (wildcard) |
| идеи за реклама на продукт | 10 | — | — | 0.00 | (wildcard) |
| заснемане на хотел | — | — | — | — | Row returned, volume null |
| маркетинг за хотели софия | — | — | — | — | Row returned, volume null (wildcard) |

**No data (no row returned), 113 keywords:**

- **Restaurants and cafés:** маркетинг за ресторанти, маркетинг за ресторант, маркетинг на ресторант, маркетинг ресторант,
  маркетинг на ресторанти, дигитален маркетинг за ресторанти, маркетинг агенция за ресторанти, ресторантьорски
  маркетинг, маркетинг в ресторантьорството, социални мрежи за ресторант, социални мрежи за ресторанти, поддръжка на
  социални мрежи за ресторанти, реклама на ресторанти, реклама ресторант, реклама на ресторант във фейсбук, видео за
  ресторант, видео реклама за ресторант, снимки за ресторант, заснемане на ресторант, фотография на храна, маркетинг за
  заведения, маркетинг на заведения, реклама на заведение, реклама на заведения, маркетинг за кафене, реклама на кафене.
- **Dental, clinics and medical:** маркетинг за стоматолози, маркетинг за дентална клиника, маркетинг за дентални
  клиники, реклама на дентална клиника, дентален маркетинг, dental marketing, маркетинг за зъболекари, реклама за
  зъболекар, реклама на зъболекар, реклама на стоматолог, маркетинг за стоматологична клиника, маркетинг за
  стоматологични кабинети, маркетинг стоматология, маркетинг за клиника, маркетинг за клиники, маркетинг клиника,
  медицински маркетинг, маркетинг в медицината, маркетинг на медицински услуги, маркетинг за лекари, реклама на клиника,
  маркетинг за медицински център, маркетинг за ветеринарна клиника, маркетинг за аптеки.
- **Beauty:** маркетинг за салон за красота, маркетинг за салони за красота, маркетинг салон за красота, реклама салон за
  красота, социални мрежи за салон за красота, видео за салон за красота, маркетинг за козметичен салон, реклама на
  козметичен салон, маркетинг за фризьорски салон, реклама на фризьорски салон, маркетинг за бюти салон.
- **Hotels and guest houses:** маркетинг за хотел, маркетинг хотел, маркетинг на хотели, hotel marketing, видео за хотел,
  маркетинг за къщи за гости.
- **Fitness:** маркетинг за фитнес, маркетинг фитнес, маркетинг за фитнес зала, маркетинг за фитнес клуб, маркетинг за
  фитнес треньори, реклама на фитнес, реклама на фитнес зала, реклама на фитнес клуб, видео за фитнес.
- **Real estate:** маркетинг за недвижими имоти, маркетинг недвижими имоти, маркетинг на недвижими имоти, маркетинг в
  недвижимите имоти, real estate marketing, маркетинг на имоти, маркетинг за брокери, маркетинг за агенция за недвижими
  имоти, реклама на недвижими имоти, реклама недвижими имоти, реклама на имот, реклама на имоти, видео за недвижими
  имоти, заснемане на имоти, видео заснемане на имоти, снимки на имоти, фотограф за недвижими имоти.
- **Auto:** маркетинг за автокъща, маркетинг за автокъщи, маркетинг автокъща, реклама на автокъща, маркетинг за
  автосервиз, маркетинг за детайлинг, реклама на автомивка.
- **Retail and SME:** маркетинг за магазин, реклама за малък бизнес, маркетинг за малкия бизнес, маркетинг за бизнеса,
  маркетинг за фирми, реклама за фирми.
- **Other sectors:** маркетинг за строителни фирми, реклама на строителна фирма, маркетинг за мебели, маркетинг за
  адвокати, маркетинг за счетоводители, маркетинг за образователни центрове, маркетинг за винарна.

**The wildcard expansions confirm the picture:**

- **„маркетинг за *“** returned only 5 rows in all: the three 10s above, „маркетинг за хотели софия“ (null) and
  „тестове по маркетинг за 11 клас“ 10.
- **„реклама на *“** (150 rows) is dominated by consumers looking up TV commercials: „реклама на ариана“ 90,
  „…на английски“ 70, „…на а1“ 50, „…на пепси“ 50, „…на кока кола“ 50. The phrase „реклама на X“ is not B2B wording.
- **„видео за *“** (43 rows) is weddings and how-tos: „видео за сватба“ 30 (KD 37), „фото и видео за сватба цени“ 30
  (KD 7), „видео за социални мрежи“ 10 (05).
- **„* за социални мрежи“** (3 rows): „видео за социални мрежи“ 10, „създаване на съдържание за социални мрежи“ 10, and
  „снимки за социални мрежи“ (null).

#### 1b. Platform-specific

| Keyword | Vol | KD | CPC | Comp | Intent note |
|---|---:|---:|---:|---|---|
| youtube shorts | 1,600 | 0 | 2.10 | 0.00 L | Feature name, consumers |
| reels | 590 | 43 | 0.45 | 0.02 L | Feature name [informational] |
| ugc creator | 390 | 1 | 1.92 | 0.43 M | People who want to be creators, or a search for a creator [navigational] |
| instagram reels | 210 | 44 | — | 0.01 L | Feature name |
| tiktok business | 110 | 30 | 0.66 | 0.33 L | TikTok's own business tools |
| инфлуенсър маркетинг | 70 | 7 | 1.56 | 0.06 L | Informational; adjacent service, not v1 |
| фейсбук реклама | 70 | 0 | 3.40 | 0.57 M | Paid ads (not v1); 05 has „реклама във фейсбук“ 140 |
| tiktok for business | 70 | — | 0.20 | 0.43 M | Navigational to TikTok |
| ugc creator bulgaria | 40 | — | 1.36 | 0.57 M | Results: creator directories and marketplaces (§2) |
| тикток видео | 40 | 17 | — | 0.00 L | Consumers |
| ugc content | 30 | 36 | 2.13 | 0.42 M | |
| рийлс | 30 | — | — | 0.03 L | Feature name |
| тикток реклама | 20 | 16 | 2.50 | 0.50 M | Results: TikTok Ads help, how-tos, paid-ads agencies (§2) |
| тик ток реклама | 20 | 16 | 1.67 | 0.29 L | Same cluster as above, probably |
| реклама в инстаграм | 20 | 8 | 1.45 | 0.50 M | Paid ads [navigational] |
| influencer marketing | 20 | 89 | 1.54 | 0.52 M | |
| ugc видео | 20 | — | 10.54 | 0.37 M | Highest CPC in the whole set, on tiny volume |
| ugc съдържание | 20 | — | — | 0.13 L | |
| tiktok реклама | 10 | — | 3.78 | 0.24 L | |
| tiktok marketing | 10 | — | — | 0.10 L | |
| тик ток маркетинг | 10 | — | — | — | |
| инстаграм маркетинг | 10 | 38 | — | 0.71 H | |
| instagram маркетинг | 10 | — | — | — | |
| instagram marketing | 10 | — | 1.07 | 0.75 H | |
| маркетинг в инстаграм | 10 | 38 | — | — | |
| инстаграм реклама | 10 | 8 | — | 0.29 L | |
| поддръжка на инстаграм | 10 | — | — | 0.14 L | Organic management, Instagram |
| поддръжка на facebook страница | 10 | — | — | 0.00 L | Latin spelling of the core term (the Cyrillic form has 720 in 05) |
| фейсбук маркетинг | 10 | 38 | 0.68 | 0.66 M | |
| facebook маркетинг | 10 | — | — | — | |
| linkedin маркетинг | 10 | — | — | 0.00 L | |
| инфлуенсър агенция | 10 | 37 | 2.35 | 0.45 M | |
| фейсбук мениджър | 10 | — | 1.63 | 0.29 L | Ambiguous (person or tool) |
| ugc агенция | — | — | — | — | Row returned, volume null |

**From docs/research/05 (not re-queried):** заснемане на reels —; поддръжка на инстаграм профил 10 (CPC 0.36); реклама във
фейсбук 140 (KD 0); ugc 880 (KD 0).

**No data, 45 keywords:**

- **TikTok:** тикток агенция, tiktok агенция, тик ток агенция, тикток маркетинг, tiktok маркетинг, маркетинг в тикток,
  поддръжка на тикток, поддръжка на tiktok, поддръжка на тик ток, поддръжка на тикток профил, управление на тикток,
  tiktok мениджър, тикток реклами, реклама в тикток, реклама в tiktok, реклама в тик ток, тикток бизнес, тикток за бизнес.
- **Instagram:** поддръжка на instagram, поддръжка на инстаграм страница, поддръжка на профил в инстаграм, управление на
  инстаграм, инстаграм мениджър, инстаграм за бизнес, instagram за бизнес.
- **Facebook:** facebook мениджър, фейсбук за бизнес, facebook за бизнес.
- **Combined, YouTube and LinkedIn:** поддръжка на фейсбук и инстаграм, поддръжка на youtube канал, youtube агенция,
  поддръжка на linkedin.
- **Reels and clips:** reels заснемане, заснемане на рийлс, reels за инстаграм, reels видео, видео reels, shorts видео,
  клипове за тикток, видео за тикток, тикток клипове, клипове за инстаграм, видео за инстаграм.
- **UGC:** ugc видеа, ugc креатор.

#### 1c. Service variants and buyer phrasing

| Keyword | Vol | KD | CPC | Comp | Intent note |
|---|---:|---:|---:|---|---|
| social media marketing | 1,900 | 0 | 1.72 | 0.02 L | Results: English guides and definitions only, no Bulgarian site (§2) |
| content manager | 880 | 0 | — | 0.01 L | Software or job title [navigational] |
| social media | 390 | 79 | 0.46 | 0.02 L | Definition |
| социални медии | 390 | 0 | — | 0.01 L | Definition |
| копирайтър | 210 | 0 | — | 0.05 L | Job or definition |
| маркетинг специалист | 210 | 0 | 0.93 | 0.25 L | Mostly jobs |
| content creator | 170 | 40 | 6.09 | 0.20 L | Career or definition; CPC suggests some hiring |
| продуктова фотография | 140 | 0 | 1.26 | 0.33 L | Results: photo studios, guides, local pack (§2); photo, not video |
| копирайтинг | 110 | 3 | 2.26 | 0.08 L | |
| social media manager | 50 | 65 | 2.23 | 0.47 M | Results: job ads and career guides (§2) |
| онлайн маркетинг | 40 | 14 | 2.11 | 0.45 M | |
| контент криейтър | 30 | — | — | 0.06 L | |
| копирайтинг услуги | 30 | 20 | — | 0.00 L | |
| маркетинг услуги | 30 | 38 | — | 0.57 M | |
| маркетингови услуги | 30 | 36 | 0.65 | 0.18 L | |
| продуктов фотограф | 30 | — | — | 0.07 L | |
| видео монтажист | 20 | 21 | 1.10 | 0.18 L | Freelance editors |
| видео реклама | 20 | 40 | 1.04 | 0.58 M | |
| маркетинг в социални мрежи | 20 | — | 1.44 | 0.25 L | Probably the same cluster as 05's „маркетинг в социалните мрежи“ (20) |
| маркетинг консултант | 20 | — | — | 0.27 L | |
| създаване на съдържание | 20 | — | — | 0.00 L | |
| smm специалист | 10 | — | — | 0.14 L | |
| видео монтаж цена | 10 | — | 1.25 | 0.57 M | |
| видео реклами | 10 | 40 | 0.24 | 0.71 H | |
| видеограф варна | 10 | — | 0.92 | 0.12 L | |
| видеозаснемане софия | 10 | — | 1.06 | 0.18 L | |
| заснемане на видео | 10 | 21 | 0.52 | 0.24 L | |
| маркетинг в социалните медии | 10 | — | — | 0.00 L | |
| поддръжка социални мрежи | 10 | 7 | — | 0.07 L | Variant of 05's „поддръжка на социални мрежи“ (40) |
| реклама в социалните мрежи | 10 | 37 | 1.55 | 0.22 L | Paid ads |
| реклама социални мрежи | 10 | — | — | 0.36 M | |
| рекламна фотография | 10 | 35 | 1.69 | 0.57 M | |
| рекламни клипове | 10 | — | 0.73 | 0.14 L | |
| социални мрежи маркетинг | 10 | — | — | 0.93 H | |
| създаване на съдържание за социални мрежи | 10 | — | 2.18 | 0.23 L | |
| видео заснемане софия | — | — | — | — | Row returned, volume null |
| заснемане на рекламно видео | — | — | — | — | Null |
| изработка на рекламно видео | — | — | — | — | Null |
| реклама в социални мрежи | — | — | — | — | Null |
| рекламен клип цена | — | — | — | — | Null |

**From docs/research/05 (not re-queried):**

- видео за социални мрежи, рекламно видео, рекламен клип, корпоративно видео and видео маркетинг: 10 each. docs/research/05
  gives their KD only as a range, "— to 38".
- продуктово видео, фирмено видео, кратки видеа and reels за бизнес: —.
- агенция за социални мрежи: —.
- smm: 210 (KD 8).

**No data, 68 keywords:**

- **Content wording:** съдържание за социални мрежи, контент за социални мрежи, създаване на контент, създаване на
  контент за социални мрежи, контент създател, контент мениджър.
- **Social media manager wording:** social media manager цена, social media мениджър, социал медия мениджър.
- **Agency and company wording:** social media агенция, social media agency, social media маркетинг, smm агенция, smm
  agency, smm маркетинг, smm услуги, smm мениджър, социални мрежи агенция, агенция социални мрежи, човек за социални
  мрежи, фирма за социални мрежи, фирма за поддръжка на социални мрежи, агенция за поддръжка на социални мрежи,
  маркетинг агенция за малък бизнес.
- **Management wording:** управление на социални медии, управление социални мрежи, маркетинг социални мрежи, цялостно
  управление на социални мрежи, поддръжка на социални мрежи софия, аутсорсинг на маркетинг.
- **Ad and corporate video:** рекламно видео цена, изработка на рекламен клип, заснемане на рекламен клип, рекламно
  видео за фирма, видео за реклама, корпоративен филм, корпоративно видео цена.
- **Photo:** продуктови снимки, заснемане на продукти, фотограф за социални мрежи, фотограф за бизнес, бизнес фотограф,
  рекламен фотограф.
- **Video for business:** видеограф за бизнес, видеограф софия, видеограф пловдив, видео за бизнес, видео за фирми,
  видеозаснемане за бизнес, видео заснемане за фирми, видео съдържание, видео съдържание за социални мрежи, кратки видеа
  за социални мрежи, вертикални видеа, видео за фейсбук, клипове за фейсбук, заснемане на видео за социални мрежи,
  заснемане на клипове, видео маркетинг агенция, видео агенция, видео продукция софия, видео продуцент.
- **Editing:** монтаж на видео за социални мрежи, монтаж на клипове.
- **Design and posts:** графичен дизайн за социални мрежи, дизайн на постове, постове за фейсбук, публикации за социални
  мрежи.

#### 1c-2. Price, audit and local variants

This batch was added after the competitor scan, to test page types the competitors use: cost guides, free audits and
city pages.

| Keyword | Vol | KD | CPC | Comp | Intent note |
|---|---:|---:|---:|---|---|
| видеограф цена | 90 | 11 | 1.09 | 0.12 L | Price intent. Results not checked; 05 shows „видеограф“ results are wedding videographers |
| видеозаснемане пловдив | 50 | — | 0.75 | 0.19 L | Local video (05: „видео заснемане пловдив“ 30; weddings dominate) |
| дигитална агенция пловдив | 40 | — | 4.90 | 0.43 M | Local agency, broad |
| дигитална агенция софия | 40 | 79 | 3.47 | 0.44 M | Hard |
| колко струва реклама във фейсбук | 20 | 40 | 0.98 | 0.55 M | Paid ads |
| дигитална агенция варна | 20 | — | 1.09 | 0.38 M | |
| дигитална агенция бургас | 10 | — | 0.71 | 0.29 L | |
| видео заснемане цени | 10 | 35 | 0.54 | 0.71 H | |
| видеозаснемане цена | 10 | — | — | 0.29 L | |
| видеозаснемане цени | 10 | 35 | 0.54 | 0.79 H | |
| анализ на фейсбук страница | — | — | — | — | Null |
| видео заснемане бургас / видеограф бургас / маркетинг агенция бургас | — | — | — | — | Null |
| цена на реклама във фейсбук | — | 8 | — | — | Null volume |

**No data, 54 keywords:**

- **Cost questions:** колко струва промо видео, колко струва рекламен клип, колко струва рекламно видео, колко струва
  видеозаснемане, видеограф цени, колко струва видеограф, колко струва reels, колко струва рийл, колко струва social
  media manager, колко струва поддръжка на социални мрежи, цени за поддръжка на социални мрежи, социални мрежи цени,
  пакети за поддръжка на социални мрежи, пакети социални мрежи, колко струва дигитален маркетинг.
- **Audit and free consultation:** одит на социални мрежи, одит на фейсбук страница, безплатен одит, безплатна консултация
  маркетинг, анализ на социални мрежи, social media audit.
- **City + social media:** поддръжка на социални мрежи пловдив / варна / бургас, управление на социални мрежи софия,
  агенция за социални мрежи софия / пловдив / варна, smm агенция софия.
- **City + video:** видео продукция пловдив / варна, рекламно видео софия / пловдив.
- **English:** social media agency sofia, social media agency bulgaria, video production bulgaria, videographer sofia,
  videographer bulgaria.
- **Guide topics:** колко рийлса на седмица, колко често да публикувам reels, струва ли си тикток за бизнес, как да снимам
  reels с телефон, как да снимам видео с телефон, как да направя видео за бизнеса, видео за бизнеса, органичен
  маркетинг, органично достигане, как да направя google бизнес профил, да наема ли човек за социалните мрежи, фрийлансър
  социални мрежи, freelance social media manager, социални мрежи за бизнеса, социални мрежи за бизнес, социални мрежи за
  малък бизнес.

For reference, docs/research/05 has the existing price terms: „поддръжка на социални мрежи цена“ 30, „поддръжка на фейсбук
страница цена / цени“ 20 each, and „колко струва поддръжка на фейсбук страница“ 10.

#### 1d. Informational / guide intent

| Keyword | Vol | KD | CPC | Comp | Intent note |
|---|---:|---:|---:|---|---|
| meta business suite | 4,400 | 34 | 0.30 | 0.29 L | Tool login (navigational); a how-to angle is possible |
| google business profile | 2,900 | 45 | 3.81 | 0.06 L | Navigational, local SEO; adjacent to social |
| google my business | 1,900 | 71 | 10.53 | 0.01 L | Navigational |
| гугъл бизнес профил | 170 | 0 | 1.94 | 0.13 L | Bulgarian spelling, KD 0 |
| facebook business suite | 70 | 67 | 0.17 | 0.25 L | Tool |
| как да стана инфлуенсър | 50 | 7 | — | 0.03 L | Consumers |
| google бизнес профил | 50 | — | 1.02 | 0.06 L | |
| какво е ugc | 40 | — | 1.07 | 0.08 L | Definition |
| контент план | 20 | — | — | 0.00 L | |
| създаване на фейсбук страница | 20 | 12 | 2.61 | 0.48 M | Results: foreign-language how-tos, **no Bulgarian page ranks** (§2) |
| хаштагове за инстаграм | 20 | 12 | — | 0.00 L | |
| бизнес профил в инстаграм | 10 | — | — | 0.10 L | |
| бизнес страница във фейсбук | 10 | — | 0.23 | 0.61 M | |
| идеи за видеа | 10 | — | — | 0.00 L | |
| как да привлека клиенти | 10 | — | — | 0.21 L | |
| как да привлечем клиенти | 10 | — | 1.06 | 0.09 L | |
| как да рекламирам бизнеса си | 10 | — | 1.89 | 0.68 H | |
| как да рекламираме | 10 | — | — | — | |
| как да стана ugc creator | 10 | — | 0.05 | 0.07 L | |
| контент стратегия | 10 | — | — | 0.00 L | |
| фейсбук бизнес мениджър | 10 | 37 | — | 0.29 L | |
| алгоритъм на инстаграм | — | — | — | — | Null |
| как да направя реклама във фейсбук | — | — | — | — | Null |

**From docs/research/05:** „идеи за сторита в инстаграм“ 1,000 (KD 0).

**No data, 48 keywords:**

- **Maintaining and creating a Facebook page:** как да поддържам фейсбук страница, как да поддържаме фейсбук страница,
  как да направя фейсбук страница, как да направя бизнес страница във фейсбук, как се прави фейсбук страница, фейсбук
  страница за бизнес.
- **Posting frequency and timing:** колко често да публикувам във фейсбук, колко често да публикувам в инстаграм, кога да
  публикувам във фейсбук, най-добро време за публикуване във фейсбук, най-добро време за публикуване в инстаграм,
  най-добро време за публикуване.
- **Planning and strategy:** контент календар, стратегия за социални мрежи, маркетинг стратегия за социални мрежи.
- **Post and video ideas:** идеи за постове във фейсбук, идеи за постове в инстаграм, идеи за постове, идеи за
  публикации, идеи за публикации във фейсбук, идеи за тикток видеа, идеи за тикток, идеи за reels, идеи за клипове.
- **Filming and editing how-tos:** как да снимам видео за инстаграм, как да направя reels, как да направя рийлс, как се
  прави reels, как да направя видео за тикток, как да монтирам видео, как да снимам с телефон.
- **Growth:** как да стана популярен в тикток, как да увелича последователите в инстаграм, как да увелича харесванията във
  фейсбук.
- **Promoting a business:** как да рекламирам бизнеса си във фейсбук, как да популяризирам бизнеса си, как да рекламирам
  ресторант, как да рекламирам салон за красота, как да рекламирам.
- **Platform topics:** алгоритъм на фейсбук, копирайтинг за социални мрежи, как да направя бизнес профил в инстаграм.
- **Roles and careers:** какво е smm, какво прави social media manager, social media manager заплата, social media
  manager работа, social media manager курс.
- **Statistics:** социални мрежи статистика.

The informational demand around maintaining a page sits **inside the head term** „поддръжка на фейсбук страница“, whose
results include tip articles (05 and §2). It does not sit in separate "как да…" phrasings, which all returned nothing.

#### 1e. Totals

- **Explicit keywords:** 462 measured, across 3 calls.
  - 120 have measurable volume (26%).
  - 14 returned a row with a null volume.
  - 328 returned no row: 113 + 45 + 68 + 54 + 48 across the groups above.
- **Keywords at 50 or more a month:** 27. All of them are tools, features, definitions, careers, consumer queries, paid
  ads or adjacent services:
  - Tools and features: meta business suite, google business profile/my business, facebook business suite, tiktok
    business/for business, youtube shorts, reels, instagram reels.
  - Definitions: social media marketing, social media, социални медии.
  - Careers: content manager, маркетинг специалист, копирайтър, content creator, social media manager.
  - Creators and influencers: ugc creator, как да стана инфлуенсър.
  - Paid ads: фейсбук реклама.
  - Adjacent services: инфлуенсър маркетинг, копирайтинг, продуктова фотография, видеограф цена, видеозаснемане
    пловдив.

  None is a buyer query for recurring organic social media management.
- **Measurable B2B demand for the service itself** is still the docs/research/05 core cluster: „поддръжка на фейсбук
  страница/и“ 720 / 590, „поддръжка на социални мрежи“ 40, and the price terms at 30 / 20.

---

### 2. SERP notes

Every one of the 10 queries showed a Google **AI Overview** in all three reads. Only „продуктова фотография“ had a
**local pack**.

| Query (vol) | Who ranks in the merged top 10 | Page types | Features |
|---|---|---|---|
| social media marketing (1,900) | meetedgar.com, viralyft.com, blog.hubspot.com, mentionlytics.com, commonseoquestions.com, YouTube (Simplilearn), Quora, a Facebook post, socialpilot.co, investopedia.com; then wikipedia, salesforce, buffer, forbes, sproutsocial, sprinklr, adobe | English guides and definitions. **No Bulgarian site and no agency** | AI Overview, knowledge panel, People also ask, scholarly articles, video, related searches |
| продуктова фотография (140) | instagram.com (a studio's post), Pinterest, actualno.com (article), branded.bg (making-of/EPK service), flagman.bg (article), synthesis.bg (product photo service), macropic.eu (articles), webprogress.bg (guide, Sep 2026), a studio's Facebook page; then studio.chudennsvyat.com (Varna), YouTube, flashgate.co (guide, Oct 2026), nobrainerstudio.com, minkovstudio.com, photorobot.com | Studio service pages mixed with guides | **Local pack** (photo studio), images, "related sites", AI Overview |
| social media manager (50) | jober.bg (jobs, #1 in 3/3 reads), reddit (r/SocialMediaMarketing), bebee.com (job), mg.digital (career guide), contentcreators.com (jobs), bg.jooble.org (jobs), digital-marketing.bg (agency SMM page, best #6), digitalregenesys, miracamp, socialsellinator, jobs.bg blog (interview with SEOMAX's SMM manager) | **Job seekers**, not buyers | AI Overview, People also ask, video |
| ugc creator bulgaria (40) | instagram.com (a creator's reel), influence.bg (creator directory), influencerbg.site (article), ugcbg.eu ("300 active" creator directory), ugc.bg (marketplace profile), bg.gigexchange.com (gigs) | **Creator marketplaces and directories.** Brands that look for creators go there, not to agencies | AI Overview, video |
| реклама за салон за красота (30) | 7 Pinterest pins and boards (.com, ru., se., ar., br., dk., in.) | **Idea boards** | AI Overview, images, video |
| реклама за магазин (30) | Pinterest; maxreklama.com, mediadesign.bg, crops.bg, farco.bg, marketa.bg, artzone.bg (signage and print); olx.bg, bazar.bg (classifieds) | **Signage and print** | AI Overview, images, related searches |
| тикток реклама (20) | ads.tiktok.com (Ads Manager help, #1 in 3/3); vulchevagency.com (article); inboundstud; seomax.bg (TikTok Ads guide, 2024); reddit r/bulgaria; websitepr.eu (how-to); tryseo.gr/bg ("Реклама в ТикТок Цени Пакети"); newera.bg ("Търсиш TikTok Агенция?" article); YouTube webinar (Digital Expert); netpeak.bg and advantage.bg (TikTok ads services) | Platform help and how-tos, plus **paid-ads** agency pages | AI Overview, images, video, related searches |
| реклама на хотел (20) | Pinterest (4 locales), megabooker.hr (Croatian article), vimeo.com, YouTube (a Russian hotel ad) | Ad inspiration | AI Overview, video, images |
| създаване на фейсбук страница (20) | dicloak.com (Chinese), portal.neip.gov.gh, znatko.com and marketingfancier.com (Croatian), facebook.com/ads/create, YouTube (Khmer), kajgana.com (Macedonian) | Foreign-language how-tos. **No Bulgarian result.** A content gap, but tiny and DIY | AI Overview, video, images |
| реклама на ресторант (10) | Pinterest; metro.bg (guide "Стратегии за брандиране и маркетинг на ресторанти"); horos5.com (agency page "Реклама на заведения и ресторанти"); p2pmenu.com (restaurant ads SaaS); YouTube; foodshot.ai/bg (50 ideas); happychef.cloud/bg (7 strategies, Jun 2026); restaurant.bg (directory ad listings); facebook.com/xameleonvideo (a video agency's post "Идеи за реклама за ресторанти") | Mixed: ideas, SaaS and retailer guides, **one agency sector page**. Most rows were seen in 1 of 3 reads (unstable) | AI Overview, images, video |

#### Core queries re-read to find competitor domains

These are docs/research/05's queries, read again today (two reads each, merged).

| Query (05 vol) | Who ranks (domains) | Notes |
|---|---|---|
| поддръжка на фейсбук страница (720) | webbianik.com/facebook-reklama/ (Niel SEO, title "…цени за поддръжка на facebook страници"), webstation.bg/poddrazhka-na-feisbuk-stranitsa/, nextbasket.com/bg/13-… (tip article), webdouble-a.com (Web 2A, Plovdiv), promopointbg.com, web-seo-development.com, socialartmedia.com, predpriemach.com (2016 article), blog.abcbg.com (2013 tips), aiproseo.pro (Jul 2026 post); also Facebook Help Center, a Facebook group "ФЕЙСБУК ПРОБЛЕМИ-BG HELP", Reddit "how to contact Facebook support", YouTube | Small agencies' page-maintenance pages plus tip articles. **Some searchers want Facebook's own support.** AI Overview, video |
| поддръжка на социални мрежи (40) | newera.bg/services/social-media-marketing/ (best #1), memotion.net, coonecto.com, websitebuilder.bg, a LinkedIn Pulse article, gradivnite.com, sitewab.bg, agma.bg (blog, May 2026), riscase.bg, teliohub.com (page shows "Application error"), brandmark.bg, LinkedIn jobs, an Instagram reel, know-how-digital.com, techstation.bg, creativedesign.bg, bionikdigital.com, copy-factor.bg | Agency service pages and articles. AI Overview |
| управление на социални мрежи (10) | Courses: LinkedIn Learning, bia-bg.com, NBU catalogue, mgacademy.bg, digital.softuni.bg. Jobs: jobs.bg, karieri.bg. Agencies: izivizi.marketing, teliohub.com, luneaajans.com, moon.bg, adexpert.bg, seoandweb.eu, zaharaconsult.com, digitalexpert.bg, socialbook.bg (now 301 to publicchapter.bg), digital-marketing.bg, webify.bg, drtswebworks.com. Articles: agma.bg, helpnet.bg, techstation.bg, nit.bg | Mixed courses, jobs and agencies. AI Overview, scholarly, related searches |

Of the agencies docs/research/05 named, only **WebStation** and **Social Book** (now Public Chapter) appeared by domain in
today's reads. The results are volatile from one read to the next.

---

### 3. Competitor page-type matrix

There are 16 sites assessed:

- the 7 from spec/research/01;
- the 7 agencies docs/research/05 named that could be found and fetched;
- 2 extras that top today's core results (NewEra, Niel SEO).

Martin Kotsev could not be assessed: martinkotsev.com answers **HTTP 403** to automated requests (WebFetch and curl),
and its sitemap lists only "/" and "/after".

#### 3a. Content page types

| Competitor | Sector pages | City pages | Platform pages | Pricing with numbers | Blog / guides |
|---|---|---|---|---|---|
| **SocialDany** (socialdany.com/bg) | No pages. About 15 **sector blog posts**: restaurant, hotel, café/bakery, bar, psychologist, accountant/lawyer, gym/trainer, e-commerce, property, holiday rental, dental/aesthetic clinic, beauty/barber, construction, winery, car dealer/service, small shop | No | Format page "Рийлс за бизнеса" (/bg/reels); no per-platform pages | **Yes**, /bg/prices. Per spec/research/01 (2026-11-07): €120 per Reel, €380 for 4, €480/mo for 4 Reels + 10 photos, publishing from €350/mo | **100 BG posts** (plus about 100 EN). Categories: Видео за бизнеса 29, Социални мрежи и рийлс 21, Сватби 20, Цени и планиране 15, Маркетинг и сайтове 12, Снимки в България 3. No dates shown; every sitemap URL is dated 28–29 Sep 2026 |
| **Next Level Digital** (nextleveldigital.bg/bg) | No | No (Sofia in text) | No | **Yes:** €899.99 / €999.99 / €1,299.99 a month (12 / 12 / 20 videos; 0 / 2 / 3 platforms). Cart and order-tracking links | **None** |
| **Wonder Digital** (wonderdigital.bg) | 1: /marketing-za-onlain-magazin/ | 1: /digitalen-marketing-sofia/ ("София и Пловдив") | /tiktok-marketing/, /ugc-video/, /influenseri/ | **Yes:** social media from €200/mo, UGC from €80 a video, influencers from €30 a creator, ads at 15% of budget; /tseni/ | 50 posts, 6 Sep–5 Nov 2026, mostly weekly news digests ("Новини…") |
| **SEOMAX** (seomax.bg) | No | No landing pages (head office Plovdiv, office in Sofia; city news posts only) | **Social media sub-pages for Facebook, Instagram, TikTok and LinkedIn** (/services/social-media-marketing-new/social-media-marketing-{platform}/); also Facebook & Instagram ads and LinkedIn marketing | No. The video page lists packages of 4 / 8 / 16 videos without prices | About **357 posts** (2017–2026; latest 17 Nov 2026), including about 30 case-study posts |
| **Bridges → Elevatix** (bridges.bg 301s to elevatix.bg) | No | No | Meta ads (Elevatix) | Elevatix: no. The **old bridges.bg social media page is still live** (/uslugi/poddryzhka-na-sotsialni-mrezhi/): 650 / 950 / 1,600 лв. for 12 / 20 / 30 posts, Facebook + Instagram, Reels processing, ©2018–2023 | Elevatix: 3 real posts (latest 19 Jul 2026) plus template posts |
| **e-motion** (e-motionbg.com) | **9 under /industrii/:** restaurants, law firms, medical & dental, hotels, accounting, construction, real estate agencies, online shops, local services. Sector-specific copy with a 6-question FAQ; no clients, results or photos of real work | No | No | Price ranges in the FAQ, per spec/research/01: €200–400, €400–700, from €800 | 6 posts, May–Nov 2026. Cost guides for a website and a logo, a Google Business Profile guide, "Социалните мрежи не са по желание" (restaurants) |
| **MC Productions** (mcproductionsbg.com; the HTTPS certificate is invalid) | No | No | No (a "TikTok & Reels монтаж" service card) | **Yes**, /prices.html: Reels/TikTok edit up to 60 s €20; 10 videos a month €140; on-site filming on request; 1 profile €30/mo; 3 profiles €100 | None |
| **WebStation** (webstation.bg) | No | No | Facebook page maintenance (/poddrazhka-na-feisbuk-stranitsa/) | **Yes.** On the Facebook page: maintenance €129/mo (8 posts from the client's materials), ads €159/mo plus a €210–300 budget. /ceni/: SEO packages from €399 / €799 / €1,539 | 75 posts on SEO and web; latest visible Mar 2025; every sitemap URL dated 22 Oct 2026 |
| **GetSEO** (getseo.bg) | Hotel web-design pages (/izrabotka-na-sait-za-hotel/, /hoteli-kashti-za-gosti/) | No | Facebook advertising (/advertising-in-facebook/) | A "-ceni" page per service (e.g. /advertising-in-facebook-ceni/), contents not checked; the homepage says "personalised offer" | 229 posts (sitemap dates Aug–Nov 2026; latest 15 Nov 2026) |
| **Public Chapter**, formerly Social Book (publicchapter.bg; socialbook.bg 301s here) | No (sectors listed in text) | No (says it films outside Sofia) | No (5 networks named in text) | **No:** "Цената е обща за месеца и я казваме след разговора" | None |
| **Update.bg** (update.bg, Sofia) | Restaurants (a website-for-restaurants page and restaurant marketing briefs); SMS software for vehicle-inspection points | Web design for Бургас, Пловдив and София (/страница/изработка-на-уеб-сайт-{град}) | Facebook ads service. The social media page (/услуги/поддръжка-на-социални-мрежи, not in the menu) has Facebook, Instagram, TikTok and LinkedIn blurbs | No | 77 posts, 2019–2026 (social posts mostly 2021–2023; latest Jan 2026) |
| **RE:Create** (recreate.bg, Sofia) | No | No | No (/socialni-medii/ is generic) | No | 5 posts (Jan–Feb 2026) |
| **SS Studio** (ss-studio.bg) | Hotel and restaurant **website** pages | No | **Management pages for Facebook, Instagram, TikTok and Twitter**; ads pages for Facebook, Instagram, YouTube, LinkedIn and Google | No | A blog category exists (not counted) |
| **Step ahead** (stepahead.agency, Shumen) | No | No (Shumen in text) | No | No ("individual") | None |
| **NewEra** (newera.bg, Sofia; extra) | No (sectors in the FAQ) | No | **TikTok маркетинг** page; an article "Търсиш TikTok Агенция?" | No. It refers to a guide "Колко струва дигитален маркетинг в България 2026" | 6 or more posts, no dates (e.g. "Как 10 видеа месечно…", "15 видео формата…") |
| **Niel SEO** (webbianik.com, Plovdiv/Sofia; extra) | No | No (cities in text) | Facebook реклама (with page maintenance), Instagram реклама | No. Four tiers marked "попитай за цена", with guaranteed reach floors (2,500–20,000 users a month) | A blog link (not counted) |
| Martin Kotsev (martinkotsev.com) | Not assessed (HTTP 403) | | | | |

#### 3b. Proof and conversion

| Competitor | Case studies / portfolio | Team with names | Free audit / consultation | Lead magnets | Reviews / testimonials | Filming in the offer |
|---|---|---|---|---|---|---|
| SocialDany | **Named video projects:** Ваня Велкова (psychologist, Plovdiv), AREPA&Co, Bialetti, Fitguide Coaching, Saint Sofia Golf & Spa, BIMM and others | Solo "За мен" page (not opened) | "до 24 часа ще ти изпратя план и цена" (not called free) | No | 3 short testimonials, no stars | Yes, video first; publishing is an add-on |
| Next Level Digital | No portfolio. The testimonials name GP Fitness, Stoyanova Boutique and Kolev Tech Solutions (not verifiable) | No names on the homepage | "Запази безплатна консултация" ("we'll analyse your current online presence") | No | 3 with stars (5.0 / 4.5 / 5.0); a "98% satisfaction" claim; FAQ page | Yes (12–20 videos) |
| Wonder Digital | No named clients | Founder (Деляна Немска) | **"Безплатен анализ"** page ("Безплатно и без ангажимент") | **Paid UGC e-book** (€19.99–29.99); newsletter; advent calendar; a 10% code | None | UGC videos made by creators |
| SEOMAX | **Case studies** (InaEssentials, KARMA, Megamix, Modico…); logos (Kaufland, Billa, Foodpanda, Holiday Inn…); 132 web portfolio entries | Managing partner named in posts; an about page | **Free video script**; free online-business analyser; an audit tool | **ROAS and marketing-budget calculators, AI visibility tracker, rank checker, e-commerce toolkit, checklist, newsletter** | Not on the homepage (/all-references/ exists) | Yes (script, shoot, edit; 4 / 8 / 16 videos) |
| Elevatix (ex-Bridges) | Template placeholder portfolio | **7 named**, including a video content manager and a social media manager | "Безплатна консултация" | No | **7 Google reviews** (5★, Trustindex widget) | Not stated |
| e-motion | None | **3 named, each with a profile page** | "Безплатна консултация" | No | None | Photo and video listed on the sector page |
| MC Productions | 4 design items (Barbershop, Зали Контраст, Детайлинг Студио) | No | "Безплатна консултация" | No | None | On request |
| WebStation | Metric cards without client names; a logo strip (Peugeot, KONE, Generali, Grand Hotel Bansko…) | No | "Безплатна експертна консултация"; **"Безплатен одит: видимост в ChatGPT и AI Overviews…"** | No | 8 named reviewers at 5★ (no source shown) | No (uses the client's materials) |
| GetSEO | About 60 per-client portfolio pages; 10 logos | No names | None stated | 2 downloadable guides | None (a "Златна фирма" award) | No |
| Public Chapter | **4 case studies with numbers:** Лактима Балкан ~1.4M views; Forum Sport Palace 6M+; Bianco ~5M; Trux Insurance ~70–80 requests a month. 23 named clients | **4 named**, including a videographer/photographer | No "free" wording ("Да поговорим") | No | None | **Yes:** studio or on site, also outside Sofia. **15-question FAQ** |
| Update.bg | 83 project pages; 22 logos | **9 named** | None (an inquiry form with a brief) | Intake briefs; a "Ресурси" page | **12 named, with PDF reference letters** | No (one video project in the portfolio) |
| RE:Create | Portfolio by type (social, print, design…); 10 logos; "40+ клиенти" | 2 founders | None | No | 4, with company names | Not stated |
| SS Studio | A portfolio page; no names visible | 6 first names with roles | "БЕЗПЛАТНА КОНСУЛТАЦИЯ" | No | None (the "Доволни клиенти" counter shows 0%) | A content creator on the team |
| Step ahead | About 10 local client logos | Founder (Тамара Ангелова) | "Безплатна консултация" | No | 3 named | Not stated |
| NewEra | **20 named portfolio pages** (e.g. Софийска Баница: 20M+ impressions, ROAS 23x) | No names | None | No | None | "Криейтив & Видео" |
| Niel SEO | Named client notes (Юпитер Холдинг, Ядки Детелина) plus a client list | Not checked | None | No | None (notes written by the company) | No |

#### 3c. URLs opened

- **SocialDany:**
  - https://socialdany.com/bg
  - /bg/reels, /bg/promo-videos, /bg/marketing, /bg/prices, /bg/blog/
  - sitemap: 224 URLs
- **Next Level Digital:**
  - https://www.nextleveldigital.bg/bg
  - /bg/services, /bg/pricing, /bg/testimonials, /bg/faq
- **Wonder Digital:**
  - https://wonderdigital.bg/
  - /socialni-mrezhi/, /tiktok-marketing/, /ugc-video/, /tseni/, /bezplaten-analiz/, /blog/
  - e-book: https://ugc.wonderdigital.bg/
- **SEOMAX:**
  - https://seomax.bg/
  - /services/social-media-marketing-new/social-media-marketing-tiktok/ (and its Facebook, Instagram and LinkedIn
    siblings)
  - /services/video-marketing/, /case-studies/, /roas-calculator/, /e-commerce-toolkit/
- **Bridges / Elevatix:**
  - https://elevatix.bg/
  - legacy page: https://bridges.bg/uslugi/poddryzhka-na-sotsialni-mrezhi/
- **e-motion:**
  - https://e-motionbg.com/
  - /industrii/, /industrii/restoranti/, /za-nas/ekip/, /blog/
- **MC Productions:**
  - http://www.mcproductionsbg.com/
  - /prices.html, /portfolio.html
- **WebStation:**
  - https://webstation.bg/
  - /poddrazhka-na-feisbuk-stranitsa/, /ceni/
- **GetSEO:**
  - https://getseo.bg/
  - /advertising-in-facebook/, /advertising-in-facebook-ceni/, /izrabotka-na-sait-za-hotel/, /nashite-klienti/
- **Public Chapter:**
  - https://publicchapter.bg/
  - /uslugi/marketing-v-sotsialnite-mrezhi/, /uslugi/sazdavane-na-sadarzhanie/video-produktsiya/, /proekti/
- **Update.bg:**
  - https://www.update.bg/
  - /услуги/поддръжка-на-социални-мрежи, /проекти, /екип, /блог
- **RE:Create:**
  - https://recreate.bg/
  - /socialni-medii/, /portfolio-social/
- **SS Studio:**
  - https://ss-studio.bg/
  - /socialni-mreji, /upravlenie-na-tiktok-profil, /upravlenie-na-instagram-profil
- **Step ahead:**
  - https://www.stepahead.agency/
  - /social-media/
- **NewEra:**
  - https://newera.bg/
  - /services/social-media-marketing/
- **Niel SEO:**
  - https://webbianik.com/facebook-reklama/

#### 3d. How common each page type is, and where Hera stands

Hera's current state is taken from the repo's `src/content`:

- There is no blog route.
- `/za-nas` has an "Екипът" heading but no named people yet ("only once the owner supplies them").
- The CTA is "Изпратете запитването".
- The packages page shows "Старт / Растеж / Индивидуално — По индивидуална оферта".
- The FAQ has 12 questions.
- `/rabota` stays unpublished until real work exists.
- `src` contains no free-consultation, audit or review wording.

| Page type | Competitors with it (of 16) | Which | Hera today |
|---|---:|---|---|
| Blog / guides | **12** (4 with posts dated Sep–Nov 2026: Wonder, SEOMAX, e-motion, GetSEO; SocialDany's 100 posts carry no dates) | SocialDany, Wonder, SEOMAX, Elevatix, e-motion, WebStation, GetSEO, Update.bg, RE:Create, SS Studio, NewEra, Niel SEO | None (planned as P2) |
| Named clients / portfolio | **11** (case studies with numbers: SEOMAX, Public Chapter, NewEra; WebStation has unnamed metric cards) | SocialDany, SEOMAX, GetSEO, Public Chapter, Update.bg, RE:Create, NewEra, Niel SEO, WebStation (logos), Step ahead (logos), MC Productions (design) | /rabota unpublished |
| Free consultation or audit CTA | **9** (free audit or analysis: NLD, Wonder, SEOMAX, WebStation) | NLD, Wonder, SEOMAX, Elevatix, e-motion, MC Productions, WebStation, SS Studio, Step ahead | No; plain inquiry form |
| Platform pages | **9** (organic management by platform: 6; TikTok-specific: 4, namely Wonder, SEOMAX, SS Studio, NewEra) | Wonder, SEOMAX, Elevatix, WebStation, GetSEO, Update.bg, SS Studio, NewEra, Niel SEO (most are Facebook or Meta **ads** pages) | None (platforms are listed inside pages) |
| Named team | **8** | Wonder, Elevatix, e-motion, Public Chapter, Update.bg, RE:Create, SS Studio, Step ahead | Heading only, no names yet |
| Testimonials / reviews | **7** (a Google reviews widget: 1, Elevatix) | SocialDany, NLD, Elevatix, WebStation, Update.bg, RE:Create, Step ahead | None |
| Pricing with numbers | **6**, plus e-motion's FAQ ranges | SocialDany, NLD, Wonder, Bridges (legacy page), MC Productions, WebStation | No tariff by choice (custom quote with scope examples) |
| Sector pages | **5**; for marketing or social media only 2 (e-motion with 9, Wonder with 1); the rest are web-design sector pages | e-motion, Wonder, GetSEO, Update.bg, SS Studio (SocialDany covers sectors in blog posts) | None |
| Lead magnets | **4** | Wonder (paid e-book, newsletter), SEOMAX (calculators, toolkit), GetSEO (guides), Update.bg (briefs) | None |
| City pages | **2** | Wonder (1 page), Update.bg (web design) | None (spec/research/02, the SEO intent map, rules out doorway pages) |
| A service-page FAQ | 6 or more | Public Chapter 15, e-motion 6 per sector, Niel SEO 4, WebStation 1, NLD (a FAQ page), NewEra (FAQ on the homepage) | **Has one: 12 questions** |

#### 3e. FAQ coverage, compared with the closest competitor

**Public Chapter's 15 questions.** Those marked ✓ are also in Hera's FAQ, in some form:

- Кога излиза първата публикация?
- Кога ще видя резултат?
- Колко публикации излизат?
- ✓ Колко струва?
- ✓ Заснемането включено ли е? (≈ Hera's „Трябва ли сами да снимаме?“)
- Колко често идвате да снимате?
- ✓ Снимате ли извън София? (≈ Hera's travel / „цялата страна“)
- Може ли само в една мрежа?
- Колко време ще отнеме на мен?
- ✓ Кой отговаря на коментарите и съобщенията? (≈ Hera's question on ads and 24/7 messages)
- Не е ли по-добре просто да пусна реклами?
- Ще ме намират ли в Google заради социалните мрежи?
- Чии са профилите и материалите?
- Какво става при рестрикция на акаунта?
- Какво става, ако не съм доволен?

**Hera's own questions that Public Chapter does not have:** guarantees, appearing on camera, who approves, contract
term, number of revisions, monthly report contents.

**e-motion's restaurant FAQ (6 questions):**

- Which networks suit a restaurant?
- Do we need to post every day?
- Can our own team shoot?
- Do you handle replies?
- Do ads make sense for a small local restaurant?
- Can we start with one service?

---

### 4. Credits spent

| Step | Credits |
|---|---:|
| Balance before (`whoami`) | **16,017** |
| `get_keyword_metrics` #1: groups a + b, 150 keywords | 21 |
| `get_keyword_metrics` #2: groups c + d and variants, 239 keywords | 24 |
| `research_keywords`: 5 wildcard seeds (240 rows) | 105 |
| `get_serp_results`: 10 strategy queries (`finalUrls`, half price) + 3 core queries (standard) | 45 |
| `get_serp_results`: 3 core queries (`finalUrls`) + `get_keyword_metrics` #3 (73 keywords) | 26 (combined; split not visible) |
| **Total** | **221** |
| Balance after (`whoami`) | **15,796** |

Repeat calls that collected `finalUrls` results cost nothing. Nothing was bought and no credits were promoted.

---

### 5. Caveats

1. **Buckets and close variants.**
   - Volumes are Google Ads buckets, and Google groups close variants, so related rows must not be added up.
   - Examples:
     - „реклама на хотел / на хотели / за хотели“;
     - „тикток реклама / тик ток реклама“;
     - „поддръжка социални мрежи“ (10) next to 05's „поддръжка на социални мрежи“ (40);
     - „маркетинг в социални мрежи“ next to 05's „маркетинг в социалните мрежи“;
     - „видеограф цена“ (90) next to „видеограф цени“ (no data).
2. **"No data" is not exactly zero.** It means the tool returned no row: below about 10 a month, or not in DataForSEO's
   dataset. Rows with a null volume are listed separately.
3. **Intent labels are machine-made and often wrong for Bulgarian.**
   - DataForSEO labels „реклама за салон за красота“ informational and „ugc creator“ navigational.
   - My intent notes rely on the results pages where they were checked (10 queries). The rest are wording-based.
4. **Ambiguous intent.**
   - „реклама на/за X“ covers ad inspiration, ad copy, signage and TV commercials.
   - „social media manager“, „маркетинг специалист“, „копирайтър“, „content creator“ and „ugc creator“ are about jobs and
     careers.
   - „meta business suite“, „google business profile / my business“, „reels“, „youtube shorts“ and „tiktok business“ are
     navigational searches for tools.
   - **„поддръжка на фейсбук страница“ also returns Facebook Help, Facebook groups and Reddit threads about contacting
     Facebook support.** Part of its 720 may be people looking for Facebook's own support, not for a service.
5. **KD and CPC.**
   - KD is missing for most low-volume keywords.
   - CPC reflects advertiser bids. High CPCs on tiny volumes are noisy: „ugc видео“ €10.54, „реклама на страница във
     фейсбук“ €7.27.
6. **Volatile results.**
   - Each SERP merges three reads, and many rows were seen in only 1 of 3.
   - The standard read and the `finalUrls` read of the same core query on the same day returned different sets.
   - Positions are best positions, not stable ranks.
7. **SERP count.** 13 queries were read, not 8–10. The 3 extra (docs/research/05's core queries) were read only to find
   competitor domains, for about 13 credits.
8. **Competitor data limits.**
   - WebFetch returns a model's summary of each page, not the raw HTML, so counts and quotes may be incomplete.
   - Only homepages and selected pages were opened.
   - Page counts come from sitemaps. Sitemap dates reflect re-saves, not publish dates: WebStation is all
     22 Oct 2026, SocialDany all 28–29 Sep 2026, GetSEO all within 2026.
9. **Identity corrections to docs/research/05 and spec/research/01.**
   - socialbook.bg now 301s to publicchapter.bg. It is a rebrand, and the old URL still ranks.
   - bridges.bg's homepage 301s to elevatix.bg, but the legacy social media page with BGN prices (©2018–2023) is still
     served.
   - **stepahead.bg is an unrelated real-estate agency** (Century 21 Step Ahead, Varna). The marketing agency is
     stepahead.agency, in Shumen.
   - **Update.bg is in Sofia**, not Burgas. Burgas appears only in its client names.
   - SS Studio is ss-studio.bg (ssstudio.bg does not resolve).
   - Martin Kotsev was not assessed (HTTP 403).
10. **Claims not verified.** Testimonials and statistics are reported as shown, for example Next Level Digital's
    testimonials, WebStation's eight reviewers and agencies' percentage claims.
11. **Prices not re-checked today.** SocialDany's and e-motion's prices come from spec/research/01 (checked 2026-11-07).
    GetSEO's price pages were not opened.
12. **National data only.** City modifiers were measured as phrases; no city-level volumes were bought.
13. **Hera's site state** comes from the repo's `src/content` and routes, read-only, on 2026-11-18.

---

## Part 4. Platforms, content and sector rules

**Facebook is the only social platform that reaches Bulgarian customers of every adult age, so a filming-first agency should treat it as the default channel for customers aged 45 and over, use Instagram Reels and TikTok to reach under-45s, and treat Google Business Profile and Viber as the layer where customers convert.** Official survey data show social-network use is near-universal up to age 54 (78–90%) and collapses after 65 (34% at 65–74, 10% at 75–89), while account counts compiled from Meta's marketing tools put 27.5% of Facebook accounts but only 13.1% of Instagram accounts at 55 or older. TikTok's 2.63m adult ad audience is too large to be mostly under-35, yet no source gives its Bulgarian age split. All four video platforms reward the same behaviour: original, natively uploaded 9:16 video with a fast hook that people watch to the end and send to friends. None sets a posting frequency, and all demote watermarked or recycled copies, so one monthly shoot cut separately for each platform is a sound production model, provided clients add phone clips for perishable items such as daily specials, car stock, listings and events. The law bites hardest in three places: dental and medical clinics (a statutory ban on "commercial advertising", a dentists' code that bars prices, promotions and laudatory content, and medicines rules that forbid promoting prescription toxins online), bars (direct advertising of spirits is banned in any form), and music (trending tracks are contractually barred for business accounts on every platform). Much of this is untested: no regulator has said how the spirits ban or the clinic-advertising ban applies to a business's own Instagram, and the evidence on what local customers respond to is almost all US vendor research plus a few dozen Bulgarian profiles counted by hand.

### Reading notes: evidence bases, legal layers and earlier research

Every page cited here was accessed on 18 November 2026. The date in each citation is the page's publication, effective or last-amendment date; "undated" means the page shows none. Figures carry a base tag because the bases cannot be added or ranked against each other, and legal findings carry a layer tag because the layers bind different people. This is research, not legal advice.

| Tag | What it is | Who it binds, or how to read it |
|---|---|---|
| [AD] | A platform's own advertising-audience estimate | Counts reachable accounts, not people or monthly users |
| [UC] | A third party's modelled user or account count | Directional; definitions vary |
| [SV] | A survey percentage | Base and sample stated where known |
| Statute | Bulgarian or EU legislation (lex.bg consolidated texts; EUR-Lex) | Everyone it addresses |
| Regulator | Guidance or opinions of КЗЛД (Bulgaria's data protection authority), the EDPB, ГД ГВА (civil aviation) | Persuasive; shows how the law will be applied |
| Ethics code | The dentists' (БЗС) and doctors' (БЛС) professional codes, promulgated in Държавен вестник (ДВ) | Every practising dentist or doctor, through statutory disciplinary liability |
| Self-regulation | Codes and norms of НСС, the National Council for Self-Regulation | Members and those who accept them |
| Platform | Meta, TikTok, YouTube and Google terms and policies | Contractual; enforced by removal, muting or lost reach |
| Inference | My reasoning from cited facts | Not a sourced finding |

The project's earlier files already establish several points used here. `spec/research/01-market-and-competitors.md` records DataReportal's headline 2026 figures (4.50m social media user identities; ad reach of 3.60m for Facebook, 1.95m for Instagram and 2.63m adults for TikTok) and the euro changeover. `spec/research/03-legal-and-platform-operating-rules.md` records that identifiable people in footage are personal data, that consent is not the only lawful basis, a per-shoot release checklist, the business's ownership of its accounts, Google Business Profile manager roles, and TikTok's requirement for commercially cleared music. Those points are marked "known: spec/research/01" or "known: spec/research/03" below and are not presented as new. This report adds the age data, the platforms' own rules, the sector evidence and the Bulgarian statute and ethics-code detail.

### Facebook alone reaches every adult age band

#### Ad audiences are large, but they count accounts, not people

DataReportal's two Bulgaria reports are snapshots nine months apart, not a year-on-year pair. Digital 2025 uses January 2025 data and Digital 2026 uses October 2025 data, and DataReportal itself tells readers to "avoid calculating values for change over time by referencing data published in our previous reports" ([DataReportal, Digital 2025: Bulgaria, 3 Mar 2025](https://datareportal.com/reports/digital-2025-bulgaria); [DataReportal, Digital 2026: Bulgaria, 8 Nov 2025](https://datareportal.com/reports/digital-2026-bulgaria)). The last column below therefore gives DataReportal's own stated change, not the difference between the two columns.

| Platform [AD] | Ad reach, Oct 2025 (Digital 2026) | Ad reach, Jan 2025 (Digital 2025) | Share of adults 18+, 2026 / 2025 | Female / male, 2026 | Change stated in Digital 2026 (≈Oct 2024→Oct 2025) |
|---|---|---|---|---|---|
| YouTube | 4.50m | 4.37m | not reported | 49.7 / 50.3 | +130k (+3.0%) |
| Facebook (known: spec/research/01) | 3.60m | 3.50m | 65.1% / 63.0% | 51.4 / 48.6 | −100k (−2.7%), possibly a platform correction |
| Messenger | 2.80m | 2.85m | 50.7% / 51.3% | 51.8 / 46.4 | −150k (−5.1%), possibly a correction |
| TikTok, 18+ only (known: spec/research/01) | 2.63m | 2.28m | 47.6% / 41.1% | 61.4 / 38.6 | **+463k (+21.4%)** |
| Snapchat | 2.35m | 1.10m | 33.8% / 16.2% | 48.8 / 49.4 | +1.53m (+185%), anomalous |
| Instagram (known: spec/research/01) | 1.95m | 1.75m | 35.3% / 31.5% | 53.0 / 46.2 | +100k (+5.4%) |
| LinkedIn (registered members) | 1.60m | 1.50m | 29.0% / 27.0% | 47.6 / 52.4 | +200k (+14.3%) |
| Pinterest | not reported | not reported | – | – | – |
| Social media user identities (known: spec/research/01) | 4.50m (67.1% of population; 72.0% of adults) | 4.37m (64.9%; 70.4%) | – | 49.7 / 50.3 | +130k (+3.0%) |

Sources for every row: the two DataReportal reports linked above. The 2025 female/male splits were Facebook 50.0/50.0, Messenger 53.6/46.4, TikTok 51.9/48.1, Instagram 54.2/45.8 and LinkedIn 45.5/54.5. X (798k) and Reddit (994k) also appear in the 2026 report; DataReportal flags Reddit's +165% as an "unusually large" change.

Three caveats change how this table should be read. First, the national "social media user identities" figure is identical to YouTube's ad reach in both reports (4.50m, 67.1% of the population and 49.7% female in 2026; 4.37m and 64.9% in 2025). DataReportal warns that identities "may not represent unique individuals" and that its method "may sometimes only factor users of the social media platform that has the largest active audience", so the headline is, in effect, YouTube's ad audience rather than a count of people (inference; [DataReportal, 8 Nov 2025](https://datareportal.com/reports/digital-2026-bulgaria)). Second, **Snapchat's 2026 figure is internally impossible**: its adult share implies about 0.48m under-18 accounts, while Bulgaria has only about 0.35m people aged 13–17 (derived from the same report), so it should not be used for planning. Third, **neither report gives an age split for any platform** in its text; the age charts sit in slide decks embedded in a viewer that could not be extracted, and Pinterest appears in neither year. Pinterest's only Bulgarian trace is 0.09% of social referrals to websites in October 2026 ([StatCounter, social media stats, Bulgaria, data Oct 2024–Oct 2026](https://gs.statcounter.com/social-media-stats/all/bulgaria)), which measures website referrals, not use.

TikTok is the fastest-growing mainstream platform, and its ad audience moved from 51.9% to 61.4% female between the snapshots without explanation from DataReportal. The arithmetic undercuts the common assumption that TikTok is a youth channel. Bulgaria has only about 1.14m people aged 18–34 (6.7% plus 10.3% of 6.70m, per the same report's UN population data), so **if TikTok's 2.63m adult reach counted real people, at least 1.5m of them would be 35 or older** (derived). TikTok's ad tools show only adults, and no source checked, whether DataReportal, NapoleonCat, the Reuters Institute or a Bulgarian pollster, gives a verified Bulgarian age split for TikTok.

#### Official surveys show reach collapsing after 65

The only representative probability samples are Eurostat's and the National Statistical Institute's (NSI) household ICT survey. Its 2025 wave interviewed 8,421 people in person between April and June 2025, and its "participating in social networks" item covers the last three months ([NSI, ICT use in households and by individuals, 2025](https://www.nsi.bg/file/32922/izpolzvane_na_informacionni_i_komunikacionni_tehnologii_v_domakinstvata_i_ot_licata.pdf), 2025 survey, publication date not printed). Neither Eurostat nor NSI splits by platform.

| Age group [SV] | Social networks, BG 2024 | Social networks, BG 2025 | Social networks, EU27 2025 | Instant messaging (all apps), BG 2025 |
|---|---|---|---|---|
| 16–24 | 85.4% | **89.9%** | 90.5% | 89.2% |
| 25–34 | 82.6% | **87.5%** | 85.5% | 84.0% |
| 35–44 | 80.0% | **85.5%** | 78.2% | 83.2% |
| 45–54 | 72.9% | **78.4%** | 68.2% | 77.7% |
| 55–64 | 55.8% | **61.8%** | 52.2% | 63.7% |
| 65–74 | 24.8% | **34.3%** | 34.1% | 37.8% |
| 75–89 (first collected 2025) | – | **10.5%** | 15.1% | 14.0% (NSI) |
| All 16–74 | 65.0% | **71.1%** | 67.3% | 71.0% |

Sources: [Eurostat isoc_ci_ac_i, indicator I_IUSNET (dataset updated 17 Apr 2026)](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_ci_ac_i?format=JSON&lang=EN&indic_is=I_IUSNET&geo=BG&geo=EU27_2020&sinceTimePeriod=2023); [Eurostat isoc_ci_ac_i, indicator I_IUCHAT1 (updated 17 Apr 2026)](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_ci_ac_i?format=JSON&lang=EN&indic_is=I_IUIF&indic_is=I_IUCHAT1&indic_is=I_IUVOTE&unit=PC_IND&geo=BG&geo=EU27_2020&sinceTimePeriod=2024); NSI 2025 release (linked above) for the 75–89 messaging figure.

Bulgarians aged 25–64 use social networks more than the EU average, and women participate more than men in every band (25–54: **85.2% of women against 81.1% of men** in 2025, per the I_IUSNET link above). NSI's own release gives the same 71.1% (men 69.9%, women 72.2%) and shows the smartphone is the preferred device for going online (85.5%). The one-year jump of 6.1 points overall, and 9.6 points at 65–74, deserves caution: the 2025 questionnaire added a 75–89 module and changed items, and a related indicator, looking online for information about goods and services, fell from 61.9% to 47.0% in the same year, which is implausible as a real change in behaviour (same Eurostat and NSI sources). Use the 2025 levels, not the trend. The practical reading is blunt: **about two-thirds of 65–74-year-olds and nine in ten people aged 75–89 are not on any social network.** For clinics, property or services with elderly customers, social video will mostly reach the relatives who influence the decision rather than the customer (inference).

#### Meta's account data separate Facebook from Instagram by age

The only platform-level age data found come from NapoleonCat, which compiles Meta's marketing-tool counts of accounts used at least once a month. They separate the two Meta platforms sharply.

| Age group [UC], Oct 2026 | Share of Facebook accounts | Share of Instagram accounts |
|---|---|---|
| 18–24 | 11.6% | 17.5% |
| 25–34 | 21.8% (largest group) | 31.0% (largest group) |
| 35–44 | 20.3% | 22.4% |
| 45–54 | 18.8% | 16.0% |
| 55–64 | 14.1% | 8.0% |
| 65+ | 13.4% | 5.1% |
| Total accounts; share women | 4,570,500; 51.7% | 2,178,500; 53.3% |

Sources: [NapoleonCat, Facebook users in Bulgaria, data Oct 2026](https://napoleoncat.com/stats/facebook-users-in-bulgaria/); [NapoleonCat, Instagram users in Bulgaria, data Oct 2026](https://napoleoncat.com/stats/instagram-users-in-bulgaria/). Instagram's age shares were read from a garbled page layout but sum to 100%.

**Instagram is an 18–44 platform (70.9% of accounts), with only 13.1% of accounts at 55+; Facebook has 27.5% of its accounts at 55+, about 1.26m** (derived). These are accounts, not people: against UN population figures, Facebook implies about 144% coverage at 25–34, which signals duplicate, inactive or non-resident accounts (derived). Use the shares for skew only, and do not compare NapoleonCat's 4.57m with DataReportal's 3.60m, which has a different date and definition.

The Reuters Institute's Digital News Report adds weekly use from a YouGov online panel (2,032 Bulgarian respondents, fieldwork from mid-January 2026). Weekly use for any purpose was **Facebook 80%, YouTube 69%, Viber 69%, Messenger 59%, Instagram 43% and TikTok 39%** in 2026, against 78%, 64%, 62%, 49%, 35% and 34% in 2025 ([Reuters Institute, DNR 2026, Jun 2026](https://reutersinstitute.politics.ox.ac.uk/sites/default/files/2026-06/DNR%202026%20FINAL_2.pdf); [DNR 2025, Jun 2025](https://reutersinstitute.politics.ox.ac.uk/sites/default/files/2025-06/Digital_News-Report_2025.pdf)). Instagram (+8 points) and TikTok (+5) gained while Facebook held, which matches DataReportal's ad-reach growth. The panel represents only the online population, so it overstates reach among older people, and it prints no Bulgarian age split. A Capital.bg factbook based on GWI data reportedly says more than half of Instagram and TikTok users are under 34 and that Instagram is the most visited platform each day among internet users aged 16–24, but the article is paywalled and these claims were seen only in a search snippet ([Capital.bg, 23 Dec 2025](https://www.capital.bg/biznes/media_i_reklama/2025/12/23/4834137_potreblenie_na_socialnite_mreji_v_bulgariia/)); they are unverified. No 2024–2026 release on platform use by age was found from Alpha Research, Gallup International Balkan, Trend, Exacta, Mediana, Nielsen Admosphere, Gemius or IAB Bulgaria.

#### Viber owns the one-to-one channel; Google owns discovery

**Viber is Bulgaria's default messaging app**: its 69% weekly reach in the Reuters panel equals YouTube's and sits 10 points above Messenger's ([DNR 2026, Jun 2026](https://reutersinstitute.politics.ox.ac.uk/sites/default/files/2026-06/DNR%202026%20FINAL_2.pdf)). Sensor Tower's modelled active users for Q2 2025 point the same way, with Viber at 2.97m→2.82m against Messenger at 2.39m→2.19m, WhatsApp at 1.48m→1.84m and Telegram at 831k→947k, although the page does not say whether these are daily or monthly users ([Sensor Tower, Q2 2025, ~Jul 2025](https://sensortower.com/blog/2025-q2-unified-top-5-communication%20apps-units-bg-6070aae1241bc16eb81f5bab)). Eurostat's instant-messaging gradient in the table above covers all apps, not Viber alone, but it implies that messaging reaches about 64% of 55–64-year-olds, the same share as social networks at that age. Viber is therefore one of the two main digital routes to customers aged 45–64 (inference).

For a small business Viber is a retention channel, not a discovery channel. Viber's Business Account page offers a free tier with up to 30 broadcast messages a month and a paid "Business Plus" tier with 300, but names no countries ([Viber for Business, undated](https://forbusiness.viber.com/en/business-account/)); Viber's help centre says such accounts are "only available in select countries", seen only in a search summary ([Viber Help, undated](https://help.viber.com/hc/en-us/articles/10738959646621-Create-and-manage-a-business-account)), so **availability in Bulgaria is unconfirmed**. Paid Business Messages cost €0.0228 per transactional and €0.0345 per promotional delivered message, with a €175 monthly minimum, at one Bulgarian reseller's list prices ([SMSBAT, undated](https://smsbat.com/bg/pricing/viber-business-messages/bulgaria/)), which suits established businesses more than micro-firms. The strongest Bulgaria-specific signal is VibeMarket, launched in June 2025 by myPOS "в партньорство с Mastercard и Viber": merchants post offers in a Viber community, shoppers find them by location, category and keyword, and current merchants include hairdressing and beauty salons and car-repair and detailing services ([myPOS blog, updated 13 Jun 2025](https://www.mypos.com/bg-bg/blog/nashata-istoria/noviyat-virtualen-pazar-vibemarket-nabira-skorost)). No figure on VibeMarket's scale was found. Viber Pay launched in Bulgaria in February 2026 ([24plovdiv.bg, 9 Feb 2026](https://www.24plovdiv.bg/novini/article/22253469)).

**Google is the age-neutral discovery layer.** It handled 95.44% of all searches and 97.27% of mobile searches in Bulgaria in October 2026, and Android ran on 77.59% of mobile web traffic ([StatCounter, search engines, Bulgaria](https://gs.statcounter.com/search-engine-market-share/all/bulgaria); [StatCounter, mobile search](https://gs.statcounter.com/search-engine-market-share/mobile/bulgaria); [StatCounter, mobile OS](https://gs.statcounter.com/os-market-share/mobile/bulgaria); all data Oct 2024–Oct 2026). Facebook supplied 97.37% of social referrals to websites in the same month, against 1.38% for Instagram ([StatCounter, social media stats, Bulgaria](https://gs.statcounter.com/social-media-stats/all/bulgaria)), so engagement on Instagram and TikTok mostly stays inside the apps and Google is the main bridge to a business's phone, directions and website (inference). **No Bulgarian survey measures how people find a restaurant, salon or clinic.** The nearest official proxy is that 47.0% of 16–74-year-olds looked online for information on goods and services in 2025, from 55–59% at 16–44 down to 21.7% at 65–74 ([Eurostat I_IUIF, updated 17 Apr 2026](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_ci_ac_i?format=JSON&lang=EN&indic_is=I_IUIF&indic_is=I_IUCHAT1&indic_is=I_IUVOTE&unit=PC_IND&geo=BG&geo=EU27_2020&sinceTimePeriod=2024)). Google's own Business Profile figures are global or US and sourced to "Google Internal Data": complete profiles get "7x more clicks", regularly updated profiles "5x more views", and businesses with photos "42% more requests for directions" ([Google, GBP Best Practices Playbook 2026](https://services.google.com/fh/files/helpcenter/official_gbp_best_practices_playbook_2026.pdf)). The 42% figure does not appear on Google's current photo help page ([Google Business Profile Help, photo guidelines, undated](https://support.google.com/business/answer/6123536?hl=en)), so treat it as Google's directional claim, not a measured Bulgarian fact. US data hint that discovery is fragmenting: in BrightLocal's 2026 survey of 1,002 US adults, Google's share of review reading fell from 83% to 71% while Apple Maps rose from 14% to 27%, and use of ChatGPT or other AI tools for local recommendations rose from 6% to 45% ([BrightLocal, 11 Feb 2026](https://www.brightlocal.com/research/local-consumer-review-survey/)). No Bulgarian equivalent exists, and Apple Maps' Bulgarian share is unknown.

| Age band | Social reach (Eurostat 2025) | Platforms that matter most | Confidence |
|---|---|---|---|
| 18–24 | ~90% (16–24) | Instagram and TikTok first, YouTube; Facebook present but less central | Medium-low: Instagram skew is measured, TikTok's is not |
| 25–34 | 87.5% | Instagram and Facebook (largest age group on both), TikTok, YouTube | Medium |
| 35–54 | 85.5% (35–44); 78.4% (45–54) | Facebook first; Instagram strong at 35–44, weaker at 45–54; TikTok plausible but unmeasured | Medium for Meta; low for TikTok |
| 55–64 | 61.8% | Facebook; Viber and other messaging (63.7%); YouTube (no age data) | Medium |
| 65+ | 34.3% (65–74); 10.5% (75–89) | Facebook only among social networks; Viber and phone; Google Search and Maps; word of mouth | Medium-high that social video reaches only a minority |

Sources: the Eurostat, NapoleonCat, Reuters Institute and DataReportal links in this section. The platform ordering is inference from those sources.

### Every platform pays for watch-through and originality, none for volume

The four video platforms publish different specifications but describe one reward system: hold attention from the first second, get watched to the end, get shared, and be original. None publishes a numeric posting frequency for organic content. The table sets out what each says officially; the paragraphs after it explain what drives reach.

| | Instagram Reels | Facebook Reels | TikTok | YouTube Shorts | Google Business Profile |
|---|---|---|---|---|---|
| Hard length limit | Records up to 20 min, but "Reels over 3 minutes won't be recommended to new audiences" ([IG Help, undated](https://www.facebook.com/help/instagram/2720958398006062)) | No "length or format restrictions" since all videos became Reels ([FB for Creators, 17 Jun 2025](https://creators.facebook.com/blog/making-it-easier-to-create-videos-on-facebook)) | Current official maximum not verified (support pages render only with JavaScript) | Square or vertical uploads up to 3 min, from 15 Oct 2024 ([YouTube Help, undated](https://support.google.com/youtube/answer/15424877?hl=en)) | Video up to 30 s and 75 MB ([GBP Help, undated](https://support.google.com/business/answer/6103862?hl=en)) |
| Length the platform points to | **15–60 s, "the sweet spot"** for tutorials and most formats; 3–15 s for trends; up to 3 min for walkthroughs ([Instagram guide, undated, covered by trade press 28 Sep 2026](https://about.instagram.com/blog/tips-and-tricks/how-to-make-instagram-reels)) | **10–30 s reels "drive reach"**; longer ones "drive engagement" (17 Jun 2025 post above) | 1 in 4 top organic videos ran 21–34 s ([TikTok for Business, 14 Dec 2021](https://ads.tiktok.com/business/en-US/blog/data-driven-tips-make-organic-content-stand-out)); ads of 9–15 s perform better ([SMB Creative Playbook, 2025](https://ads.tiktok.com/business/library/TikTok_SMB_Creative_Playbook_2025.pdf)) | "get your message across quickly" ([YouTube Blog, 8 Apr 2025](https://blog.youtube/creator-and-artist-stories/your-guide-to-getting-started-with-youtube-shorts/)) | – |
| Ratio and resolution | 9:16, no borders ([Instagram for Creators, 30 Aug 2022, updated 25 Apr 2023](https://creators.instagram.com/blog/instagram-recommendations-eligibility-tips-creators)); photos kept between 1.91:1 and 3:4, up to 1080 px wide ([IG Help, undated](https://www.facebook.com/help/instagram/1631821640426723)) | 9:16 for the full-screen player ([FB for Creators, 3 Apr 2024](https://creators.facebook.com/blog/how-to-continue-succeeding-with-facebook-on-video)) | Full-screen 9:16, 720p or better (Playbook above) | 9:16 (Blog above); "1080p" mentioned in upload help ([YouTube Help, undated](https://support.google.com/youtube/answer/10059070?hl=en)) | Video 720p or better; photos JPG or PNG, 10 KB–5 MB, 720×720 px recommended (GBP Help above) |
| Opening | "A strong opening line of text in the first frame" (guide above); pull viewers in within 3 s (2022/2023 page above) | "a clear hook" (3 Apr 2024 post) | "The first 3-6 seconds are crucial" (Playbook) | "Capture attention in the first few seconds" (Blog) | – |
| Text and sound | Overlays plus captions; "Music is often what makes a reel feel complete"; muted reels are less visible ([Instagram, 31 May 2023](https://about.instagram.com/blog/announcements/instagram-ranking-explained)) | "audio, text, and effects" (3 Apr 2024 post) | "Sound-on is non-negotiable"; text overlays; auto-captions (Playbook) | Overlay text or captions; "trending or licensed music from YouTube's library" (Blog) | "Avoid adding elements such as borders, text, or collaged images" ([Maps content policy, undated](https://support.google.com/contributionpolicy/answer/7411351?hl=en)) |
| Captions and hashtags | Up to 5 hashtags (Instagram's creators account, via [Social Media Today, 18 Dec 2025](https://www.socialmediatoday.com/news/instagram-implements-new-limits-on-hashtag-use/808309/)); keywords in caption, bio and name | "captions with no links, minimal use of capital letters, and no more than five hashtags perform best" ([FB for Creators, 14 Jul 2025](https://creators.facebook.com/blog/combating-unoriginal-content)) | Captions, sounds and hashtags are ranking inputs ([TikTok Safety Center, undated](https://www.tiktok.com/safety/en/policies-and-engagement/recommendation-system)) | Clear titles and relevant hashtags; search matches metadata | No official character limit found |
| Cadence | Only "post original content consistently" ([Instagram for Creators, 21 Jan 2025](https://creators.instagram.com/blog/the-latest-with-instagram)) | None verified; a "1–2 times each week" line was seen only in a search summary | "You don't need to post daily, but creating a content schedule and sticking to it will help" ([TikTok for Business, undated](https://ads.tiktok.com/business/en/blog/tiktok-creative-strategy-small-business)) | "There is no minimum posting cadence required" ([YouTube Help, undated](https://support.google.com/youtube/answer/11914225?hl=en&co=YOUTUBE._YTVideoType%3Dshorts)) | Posts archived after 6 months unless dated; scheduling and repeats ([GBP Help, undated](https://support.google.com/business/answer/7342169?hl=en)) |

#### What the ranking systems say they reward

Meta's system card for Instagram Reels lists what the ranking model predicts: whether a viewer will watch less than three seconds, watch longer than 95% of viewers of reels of the same length, reshare, share off Instagram, follow, comment or reuse the audio ([Meta Transparency Center, Instagram Reels Chaining, updated 11 Nov 2025](https://transparency.meta.com/features/explaining-ranking/ig-reels-chaining/)). Instagram's head named **watch time, likes and sends** as the top three signals in January 2025, adding that sends matter slightly more for reaching non-followers; this comes via trade press because the original video could not be fetched ([Social Media Today, 22 Jan 2025](https://www.socialmediatoday.com/news/instagram-shares-algorithm-insights-2025/738034/)). Originality works as a gate, not a bonus. When identical copies exist, Instagram "will only recommend the original one"; eligible content must have "no visible watermarks"; and accounts that repeatedly repost others' content drop out of recommendations ([Instagram for Creators, 30 Apr 2024](https://creators.instagram.com/recommendations-and-originality)). "Simply stitching together clips or adding a watermark does not qualify as materially edited content" ([Instagram Help, undated](https://www.facebook.com/help/instagram/1800814370401535)). Two features suit a monthly batch. Trial Reels show a reel to non-followers first, report results within 24 hours and can auto-share a winner to followers; they need a public account, and professional accounts need at least 200 followers ([Instagram Help, trial reels, undated](https://www.facebook.com/help/instagram/1013292530224018); [Instagram for Creators, 10 Dec 2024](https://creators.instagram.com/blog/instagram-trial-reels)). And outside search engines may index reels from public professional accounts whose holders are over 18, so keyword-rich captions serve Google as well as Instagram search ([Instagram Help, undated](https://www.facebook.com/help/instagram/147542625391305)).

Facebook's Reels system card predicts how long a viewer will watch, whether they will finish, like or skip, and whether they will share to WhatsApp or via Messenger; it lists "Whether the reel is original content" among the inputs ([Meta Transparency Center, Facebook Reels, updated 19 Jun 2026](https://transparency.meta.com/features/explaining-ranking/fb-reels/)). Meta defines original content as content "filmed or produced directly by a creator or owner of a Profile or Page". Duplicates and minimally edited re-uploads are deprioritised, and accounts that keep posting mainly unoriginal content can be made non-recommendable ([Meta Newsroom, 12–13 Mar 2026](https://about.fb.com/news/2026/03/rewarding-original-creators-on-facebook/)). Meta also tells creators to avoid "visible third party watermarks and content that is visibly recycled from other apps or sources" and "super short videos that offer viewers little value" ([Facebook for Creators, 14 Jul 2025](https://creators.facebook.com/blog/combating-unoriginal-content)). Meta says views and time spent on original Reels "approximately doubled" in the second half of 2025 (March 2026 post above); that is Meta's claim about its own system. Footage an agency films on a client's premises for the client's Page fits the definition squarely (inference).

TikTok's Safety Center says its system combines predictions of viewing time, finishing, skipping, liking, sharing, commenting and following into one score, and that video inputs include time posted, region, soundtrack, length and hashtags ([TikTok Safety Center, undated](https://www.tiktok.com/safety/en/policies-and-engagement/recommendation-system)). Its 2020 explainer adds that finishing a longer video is a strong signal and that **"neither follower count nor whether the account has had previous high-performing videos are direct factors"** ([TikTok Newsroom, 18 Jun 2020](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you)), which is why small local accounts can reach beyond their followers. Under the Community Guidelines in force from 24 September 2026, content "is also ineligible for the FYF if it includes unoriginal or reused material without anything new" ([TikTok, Integrity and Authenticity, effective 24 Sep 2026](https://www.tiktok.com/community-guidelines/en/integrity-authenticity)); the superseded 2024 text named "someone else's visible watermark or superimposed logo" explicitly ([TikTok, FYF standards, 2024 version](https://www.tiktok.com/community-guidelines/en/fyf-standards/?cgversion=2024H1update)). TikTok's own 2021 data show the premium on format: full-screen videos saw 60.5% more impressions, vertical ones 40.1% more, and 720p-or-better ones 5.4% more (14 Dec 2021 post above). Business accounts also carry a disclosure duty: "If you're promoting a product, brand, or business, you must use TikTok's content disclosure setting" ([TikTok Community Guidelines, effective 24 Sep 2026](https://www.tiktok.com/community-guidelines/en)). TikTok's location-based Nearby feed, pitched at small businesses, launched in France, Germany, Italy and the UK and does not mention Bulgaria ([TikTok Newsroom, 4 Dec 2025](https://newsroom.tiktok.com/introducing-tiktok-nearby-discover-whats-happening-around-you?lang=en-150)). TikTok's sales representative for Bulgaria, an interested party, recommends 10–20-second videos with a hook in the first 1–6 seconds and says content made for Meta "usually doesn't work" there ([Economic.bg, 5 Dec 2024](https://www.economic.bg/bg/a/view/tik-tok-se-prevryshta-v-novata-meta-za-reklamodatelite-v-bylgarija)).

YouTube ranks Shorts on "performance and viewer personalization": the share of viewers who chose to view, average view duration, average percentage viewed, likes and survey responses. It also says Shorts performance does not hurt long-form recommendations ([YouTube Help, undated](https://support.google.com/youtube/answer/11914225?hl=en&co=YOUTUBE._YTVideoType%3Dshorts)). Since 31 March 2025 a Shorts "view" counts every start or replay with no minimum watch time, and the old metric survives as "engaged views" ([YouTube Help, undated](https://support.google.com/youtube/answer/10059070?hl=en)). From 24 August 2026 first-frame counting applies to every format, with "no change to recommendations" ([YouTube Blog, 19 Aug 2026](https://blog.youtube/inside-youtube/engaged-views-youtube-explained/)). Client reports should therefore use engaged views and average percentage viewed, because public view counts are no longer comparable with pre-2025 figures (inference). YouTube's rules on reused content are monetisation rules aimed at content "downloaded or copied from another online source without any substantive modifications"; they say nothing about other apps' watermarks ([YouTube Help, monetisation policies, incl. 15 Jul 2025 update](https://support.google.com/youtube/answer/1311392?hl=en)).

#### Google Business Profile rewards reviews and completeness, not posts

Google Business Profile (GBP) offers three post types: Updates, Offers and Events. Posts "older than 6 months are archived unless a date range is set", and they can be scheduled, repeated weekly or monthly, and shared to several profiles ([GBP Help, posts, undated](https://support.google.com/business/answer/7342169?hl=en)). Media should be "captured using a camera" at the location, with the place as "the primary subject"; Google asks owners to avoid stock photos, collages, heavy filters, borders and added text ([Maps content policy, undated](https://support.google.com/contributionpolicy/answer/7411351?hl=en)). Its photo guidance asks for at least three exteriors from each approach, three interiors, three product shots, three "at work" shots and three team shots, plus food and drink for restaurants and each popular room type for hotels ([GBP Help, photo guidelines, undated](https://support.google.com/business/answer/6123536?hl=en)). One monthly shoot can fill that list.

Three restrictions matter for this agency's sectors. Hotels "can't create 'offer' posts" or posts mentioning deals ([GBP Help, content policy, undated](https://support.google.com/business/answer/7213077?hl=en)). Businesses in regulated industries may post, but not promote alcohol, tobacco, pharmaceuticals or health and medical devices; incidental depictions such as menu images are allowed ([Maps prohibited and restricted content, undated](https://support.google.com/contributionpolicy/answer/7400114?hl=en)). And featured posts pulled automatically from Facebook and Instagram exist only for food and drink businesses in the US, UK, Canada, Australia and New Zealand, in English, so Bulgarian profiles must be posted to natively (posts page above). On ranking, Google says local results depend "mainly" on relevance, distance and prominence (the page fetched on 18 Nov 2026 read "popularity", which needs a visual re-check), that "More reviews and positive ratings can help your business's local ranking", and that "There's no way to request or pay for a better local ranking". **It makes no claim that posts or photos improve ranking** ([GBP Help, local ranking, undated](https://support.google.com/business/answer/7091?hl=en)). The lever Google names is reviews, which it supports with a shareable review link or QR code ([GBP Help, reviews, undated](https://support.google.com/business/answer/3474050?hl=en)). The shoot's job on GBP is fresh, compliant media; the client's job is asking for reviews. Manager roles that avoid password sharing are covered in spec/research/03 (known).

#### One master, four native uploads

No official page forbids a business from publishing its own video on all four platforms, and all four penalise content that looks recycled from someone else or from another app. A workflow consistent with every rule above (inference) is to edit one clean 9:16 master with no platform watermark, then export and upload natively from the client's own account on each platform, never downloading from one app to repost on another. Captions should be written per platform, with keywords first and at most five targeted hashtags on Meta. GBP needs a clean cut of 30 seconds or less with no burned-in text. When the agency or a partner should show the same reel, Instagram's Collab feature co-authors one reel across two profiles ([Instagram guide, undated](https://about.instagram.com/blog/tips-and-tricks/how-to-make-instagram-reels)), which avoids duplicate uploads; the same file should never go to several Facebook Pages, since duplicates get reduced distribution (Facebook for Creators, 14 Jul 2025, above). The only official safe-zone numbers are in Meta's ads guide, which advises keeping about 14% at the top, 35% at the bottom and 6% at each side free of text and logos ([Meta Ads Guide, Instagram Reels, undated](https://www.facebook.com/business/ads-guide/update/image/instagram-reels)); using that box on all four platforms is a conservative house rule, not a published organic specification. No platform publishes best posting times; recency appears only as a signal, such as TikTok's "time posted".

### Bulgarian accounts lean on events; evergreen video is the gap

Evidence on what customers respond to is thin and mostly foreign. Nearly all quantitative studies are US or UK research by vendors that sell to the sector (booking, point-of-sale, software and platform companies). The only EU-inclusive sources are Expedia's multi-country surveys and one peer-reviewed Spanish dental study, and no Bulgarian survey on social media in any of these sectors was found. The Bulgarian evidence is a set of public business profiles checked by hand on 18 November 2026: Instagram counts were mostly behind login walls, TikTok follower counts and YouTube view counts were readable, and views are not enquiries. One pattern repeats across those profiles. **Bulgarian accounts post events, offers, partnerships and humour, and much less systematic evergreen "product" video** such as room tours, signature-dish films, trainer tips or clinic FAQs (inference from the profiles cited below). That gap is what a monthly filming visit fills best. Posting volume alone does not compound: CASAVINO has 296 TikTok followers from 119 videos, and Address has 627 YouTube subscribers from about 1,100 videos ([TikTok @casavino](https://www.tiktok.com/@casavino); [YouTube @addressrealestate](https://www.youtube.com/@addressrealestate); both checked 18 Nov 2026).

#### Restaurants, cafés and hotels sell the story, the room and the season

US diners still discover restaurants mainly offline. In Toast's survey of 1,466 US adults (9–15 Oct 2025), word of mouth (38%) and walking or driving past (30%) led, followed by Facebook (27%), map apps (18%), search engines (16%), Instagram (15%), YouTube (15%) and TikTok (14%). TikTok was the favourite discovery channel for 38% of Gen Z, but its influence "drops off sharply" for older diners ([PMQ reporting Toast, 4 Jul 2026](https://www.pmq.com/how-are-guests-discovering-new-restaurants-this-national-survey-has-answers/)). Resy, a reservations vendor, recommends six content types (behind the scenes, team, dishes and produce, events, reposted guest videos with permission, and photo carousels) kept under 30 seconds and filmed in a monthly 2–4-hour batch. Its single case, a US bar posting one video a week for 6–9 hours of work a month, saw average weekly covers rise "nearly 30%", with no control group ([Resy, 16 Dec 2024](https://blog.resy.com/for-restaurants/how-to-capture-and-create-short-form-videos-for-restaurant-staff/)). SevenRooms' US survey found that 63% would pay more for holiday menus and 47% want birthday and anniversary perks, while "only one in 10" use influencers for recommendations ([SevenRooms, 17 Apr 2025](https://sevenrooms.com/press/2025-us-data-report/)). On Bulgarian television an OpenTable director argued that diners want the restaurant's story, not food photos ("Хората искат да разберат историята от ресторантите"); the interviewer's claim that 79% of millennials check restaurants on Instagram or TikTok came with no source ([Bloomberg TV Bulgaria, 16 Dec 2025](https://www.bloombergtv.bg/a/35-bloomberg-world/153560-tendentsiite-za-izlizane-na-restorant-spored-opentable-chast-2)). Bulgarian practice is heavy on timely posts. Happy Bar & Grill (42.5K Instagram followers) mixes a sushi chef's technique with contests and Red Bull and Mastercard tie-ins; Raketa Rakia Bar (5,984) posts a 26-dish winter menu launch, a weekend breakfast menu, Friday DJ nights and a staff shout-out ([Instagram @happybarandgrill](https://www.instagram.com/happybarandgrill/reels/); [Instagram @raketarakiabar](https://www.instagram.com/raketarakiabar/reels/); both checked 18 Nov 2026). Specials, DJ nights and sold-out moments cannot be banked a month ahead, so restaurants need a client phone kit more than any sector except car dealers (inference). A rakia bar's content also runs straight into the spirits-advertising ban covered in the legal section.

For hotels, video is the persuasive medium. Expedia's lab and survey work, with more than 7,000 respondents worldwide, found **71% of travellers influenced by video against 24% by static images**; scenes of 2–9 seconds gave the best comprehension and recall; and Gen Z (66%) and millennials (65%) turn to social platforms for inspiration, while Gen X and boomers "rely heavily on online travel sites" ([Expedia Group, 6 Apr 2026](https://partner.expediagroup.com/en-us/resources/blog/crack-code-on-travel-content-science-of-wanderlust)). Its 11-country Traveler Value Index, which includes France, Germany, Italy and the UK, found 61% now find trip ideas on social media, up from 35% in 2022 ([Expedia Group, 20 May 2025](https://ir.expediagroup.com/news-and-events/news/news-details/2025/Travel-Priorities-Reinvented-Expedia-Groups-2025-Traveler-Value-Index-Signals-a-Shift-in-Consumer-Priorities/default.aspx)). Bulgarian resort accounts are small (4–7K Instagram followers) and event-led. Albena (6,991) posts festival line-ups and sport; Grand Hotel Velingrad (4,235) a slow "day without plans", its renovated gym, a guest chef and spa offers; Lucky Bansko (6,434) a sauna, ice-room and salt-pool "recovery cycle", pools and team-building ([Instagram @albena_resort_bulgaria](https://www.instagram.com/albena_resort_bulgaria/reels/); [@grandhotelvelingrad](https://www.instagram.com/grandhotelvelingrad/reels/); [@luckybansko](https://www.instagram.com/luckybansko/reels/); checked 18 Nov 2026). Seasonality sets the shoot calendar: tourist registrations ran from 487,019 in January 2025 to 1,653,446 in August, **about 3.4 times higher** ([Ministry of Tourism, Jan–Aug 2025 data, Oct 2025](https://tourism.government.bg/sites/tourism.government.bg/files/documents/2025-10/statistika-january-august_2025.pdf)). Seaside hotels sell summer from roughly February to June with footage shot the summer before, so the agency needs a per-client archive banked in season (inference). Albena writes partly in English, so language belongs in the plan for tourist-facing clients (inference).

#### Gyms and salons sell people and proof; clinics sell trust

Fitness evidence points to community and peer proof. ABC Fitness's research (sample and geography not stated, likely US) found 57% name social interaction and connection as the main reason they join a fitness community ([Fitt Insider, ABC Fitness release, 16 Oct 2025](https://insider.fitt.co/press-release/new-abc-fitness-wellness-watch-report-shows-57-of-active-consumers-are-looking-for-connection-in-their-fitness-community)). Les Mills, citing Unidays data, reports that 91% of Gen Z are influenced by review videos from peers or creators, and recommends "lo-fi, authentic content" such as studio tours, what-to-expect videos for new members and staff introductions ([Les Mills, 23 Jan 2025](https://www.lesmills.com/nordic/articles/wellness-wrapped-fresh-research-reveals-the-2025-member-mindset)). Pulse Fitness & Spa (39K Instagram followers, gyms in four cities) posts member stories, including one member's weight-loss journey with her trainer, its in-house kitchen, a three-day festival near Bansko, Black Friday offers and a blood-donation drive ([Instagram @pulsefitnessspa](https://www.instagram.com/pulsefitnessspa/), checked 18 Nov 2026). Trainer tips, class snippets and facility tours bank well. Transformation stories are the most sensitive pillar, because they need members' written consent and collide with platform weight-loss rules (see the legal section). No Meta or TikTok case study of a gym was found.

Salons sell transformations. TikTok's own salon guide recommends transformation videos "from consultation to final result", before-and-after content, technique education, "Day in the Life" pieces and client spotlights, in a mix of 80% value and 20% promotion ([TikTok for Business, salon guide, undated](https://ads.tiktok.com/business/en/guides/salon-advertising-marketing-guide)). Boulevard, a salon-software vendor surveying more than 2,000 people, found that **55% of Gen Z clients rate an active TikTok or Instagram account "very" or "extremely" important when deciding to book**, but only 20% of Gen Z look on social media first, against 25% who rely on word of mouth ([Boulevard, 2 Jan 2026](https://www.joinblvd.com/blog/gen-z-social-media)). Two-thirds of Gen Z have walked away because "the booking flow was too complicated" ([Boulevard, 7 Nov 2025](https://www.joinblvd.com/blog/5-things-2026-self-care-clients-want)). Bulgarian salons are listed and reviewed on booking platforms: Fresha's Sofia balayage page showed six venues averaging 4.0/5 across 443 reviews ([Fresha, live page, checked 18 Nov 2026](https://www.fresha.com/lp/en/tt/balayage-hair-colouring/in/bg-sofia)), and VibeMarket lists salons selling through Viber (above). **No Bulgarian salon with a notable Instagram or TikTok presence could be verified**, so there is no local benchmark. A salon video's job is to send viewers to a working booking link, and the monthly report should count bookings (inference).

Patients choose clinics mainly on referrals and reviews. In a peer-reviewed web survey of 503 Spanish dental patients, 41.4% had visited practices' social media, and 23.5% used social media the last time they changed practice, 85.6% of whom said it influenced the decision; that is about a fifth of all respondents (derived). "Facilities and technology" was the top factor ([Freire et al., BMC Oral Health, 2023/2024](https://www.springermedicine.com/influence-of-the-use-of-social-media-on-patients-changing-dental/25450716)). RepuGen's US survey of 1,212 people put word of mouth (62.5%) and professional referrals (62.4%) far ahead of online reviews (36.9%), and Google is where most patients check providers (77.8%) ([RepuGen, 2025](https://www.repugen.com/patient-review-survey)). A Serbian study reportedly found social networks "do not play a crucial role", but it was seen only in a search extract. Bulgarian clinics show two models. Dentaprime in Varna (21.8K followers) markets to German-speaking patients with a pinned explainer on the path from consultation to treatment plan, testimonials, implant education, instalment payments, a webinar and a Christmas promotion. EuroDerma in Sofia (2,683) posts doctor-presented education, such as a dermatologist on hair loss, with no before/after visible. A small Sofia dental lab, SmileLab, has 242 ([Instagram @dentaprime_official](https://www.instagram.com/dentaprime_official/reels/); [@euroderma.clinic](https://www.instagram.com/euroderma.clinic/reels/); [@smilelab.dental.clinic](https://www.instagram.com/smilelab.dental.clinic/reels/); checked 18 Nov 2026). Testimonials and promotions are formats the dentists' ethics code restricts for dentists practising in Bulgaria; whether foreign-language marketing changes that was not examined. The defensible core is team credentials, technology explainers, patient-education answers from the dentist or doctor, and "your first visit" walk-throughs. Most of it can be planned a month ahead, so clinics fit the monthly model better than restaurants do (inference).

#### Cars and property sell on walkarounds, reveals and market talk

Car shoppers research on video, but social media is a minor channel for the purchase itself. Cox Automotive's survey of 2,300 US buyers (fall 2025) found that 75% used third-party websites, 59% dealership websites and 26% social media, and that 53% completed every step in person at the dealer ([Cox Automotive, 13 Jan 2026](https://www.coxautoinc.com/insights-hub/cox-automotive-car-buyer-journey-study-finds-efficiency-digital-tools-and-ai-drive-record-satisfaction/)). Cox's content study calls video "the #1 influencer in automotive decisions", says nearly 7 in 10 shoppers rely on video in research, and puts the **ideal research-video length at about 5:35** ([Cox Automotive/GfK one-sheet, Sept 2025](https://kbb-autotrader-oem.com/wp-content/uploads/sites/6/2025/09/2025-Cox-Automotive-GfK-Content-Influence-Study_One-Sheet.pdf)); its "expert video reviews" are media and creator reviews, not dealers' own clips. The sources on TikTok conflict because they measure different things. Strategic Vision's independent study of more than 57,000 new-vehicle buyers found TikTok influenced 2.2% of all buyers (13% of Gen Z, under 1% of boomers), against 18.3% for YouTube and 4.1% for Facebook ([Strategic Vision, 16 Jan 2025](https://www.strategicvision.com/post/the-role-of-tiktok-in-vehicle-purchases-insights-from-nves)). A TikTok-co-produced study reports that 75% of "TikTok shoppers" used it for discovery, but its base is TikTok users only ([Escalent, 3 Feb 2026](https://escalent.co/news/from-scroll-to-sale-new-escalent-research-highlights-the-role-of-tiktok-in-vehicle-buying-and-auto-brands-need-to-adapt/)). Meta says 29% of new-car intenders in Western Europe discover brands and models on its platforms, without showing its source ([Meta for Business, automotive, undated](https://www.facebook.com/business/industries/automotive)). Bulgaria nonetheless has the largest local-business audiences found in this research, all on TikTok: **used-car dealer Kentavar Auto has 197,600 followers and 4.1M likes from 966 videos**, and US-import dealer USA Auto has 38,800 followers from 596 videos, with price-hook titles and an enquiry call to action ([TikTok @kentavar.bg](https://www.tiktok.com/@kentavar.bg); [TikTok @usa.auto.bg](https://www.tiktok.com/@usa.auto.bg); checked 18 Nov 2026). Sofia detailers are far smaller: Sofia Detailing Studio has 2,532 followers and Detailing Studio 310 has 1,225 ([@sofiadetailingstudio](https://www.tiktok.com/@sofiadetailingstudio); [@detailingstudio310](https://www.tiktok.com/@detailingstudio310); checked 18 Nov 2026). **No study links detailing or repair-shop video to enquiries; for workshops the evidence is absent, not merely thin.** Dealer stock sells between visits, and a 966-video competitor posts almost daily, so dealers need staff phone clips for arrivals and handovers (inference). Car content is close to entertainment, so dealer audiences are not a benchmark for other sectors.

Property agents rate social media highly, but Bulgarian evidence suggests views and leads diverge. US Realtors named social media their top lead-generating technology (39%) in NAR's 2025 survey, an agent-reported figure from 1,241 responses ([NAR, 18 Sep 2025](https://cms.nar.realtor/sites/default/files/2025-09/2025-realtors-technology-survey-report-09-18-2025.pdf)), and boomers were 42% of US buyers and 55% of sellers ([NAR, 15 Apr 2026](https://www.nar.realtor/newsroom/baby-boomers-remain-largest-share-of-home-buyers-as-first-time-buying-falls-to-record-low)). On Bulgarian Properties' YouTube Shorts, **individual listing walk-throughs drew 57–169 views, while a clip of the agency head's TV interview on affordability drew 2K**, a new-development promotion 1.9K and a "selling in Sofia? contact us" call 1.2K ([YouTube, Bulgarian Properties Shorts](https://www.youtube.com/user/bulgarianprops/shorts), checked 18 Nov 2026). The agency also has 6,899 TikTok followers ([@bulgarianproperties](https://www.tiktok.com/@bulgarianproperties), checked 18 Nov 2026). Unique Estates' best Shorts were open-house invitations (up to 1.8K views) and a market interview (961). Address posts one listing Short per property with a "call and quote this code" line (94–1.4K views), ERA's Shorts are mostly recruitment, and Yavlena (4,681 Instagram followers) posts values, team, community sponsorship and seminars ([YouTube @UniqueEstatesProperties](https://www.youtube.com/@UniqueEstatesProperties); [@addressrealestate](https://www.youtube.com/@addressrealestate); [ERA Bulgaria Shorts](https://www.youtube.com/user/ERABulgaria/shorts); [Instagram @yavlena.realestate](https://www.instagram.com/yavlena.realestate/); checked 18 Nov 2026). In 2023 an Imoteka broker estimated he got "по един клиент" (one client) per 50,000 views, and an ERA manager doubted that TikTok finds a "реален купувач, наемател" (real buyer or tenant) ([Economic.bg, 13 May 2023](https://www.economic.bg/bg/a/view/ogled-na-mjasto-ili-tik-tok-video-brokerite-v-bylgarija-promenjat-koncepcijata)). A sensible pairing is one wide-reach "hero" piece a month (a market update, neighbourhood guide or development progress) plus narrow listing clips whose reference code makes enquiries countable. Neighbourhood guides and client testimonials appeared on none of the profiles checked, which suggests an open niche (inference from a small sample).

Renovation buyers want proof that a contractor can be trusted. In Houzz's US survey of 21,889 registered users, nine in ten renovating homeowners hired professionals, and "finding the right service providers" was the top challenge (33%) ([Houzz & Home study, 2025](https://st.hzcdn.com/static/econ/2025-US-Houzz-and-Home.pdf)). Recommendations or references were the top hiring factor (64%) in a separate Houzz survey of 2,866 users ([Houzz Pro, 15 Jan 2025](https://pro.houzz.com/pro-learn/blog/what-homeowners-want-from-pros-right-now)). Bulgarian practice matches. Er Stroy Remonti posts mostly client-testimonial Shorts (66–723 views), Vip Remonti process clips (a roof job at 3.7K), and Konstrukt fix-it demos (a wardrobe-hinge repair at 1.5K views on a channel with 7 subscribers); custom-kitchen maker Morato has 5,671 TikTok followers ([YouTube, Er Stroy Remonti](https://www.youtube.com/channel/UCb0DH3s-_GAUNf1-52ExJnw); [@emstroyremonti](https://www.youtube.com/@emstroyremonti); [@Dyrvodelec-Sofia](https://www.youtube.com/@Dyrvodelec-Sofia); [TikTok @morato.bg](https://www.tiktok.com/@morato.bg); checked 18 Nov 2026). Before/after footage is shot weeks or months apart, so the monthly model works only as a project pipeline: film the "before" of new sites, a milestone on running ones and the reveal plus testimonial on finished ones, and give the client a one-page brief for "before" phone footage when a project starts between visits (inference; no source sets out these logistics). Pinterest, the platform most associated with interiors, has no Bulgarian audience figure in either DataReportal report.

#### Specialty retail sells occasions, not notices

Shopping channels split by age. Lightspeed's survey of more than 2,500 people in the US and Canada (July 2024) found that **TikTok was the primary shopping method for 37% of 18–34-year-olds, 11% of 35–54s and 2% of over-55s**, with Instagram next for 18–34s (32%), while older shoppers lean on review sites and referrals ([Lightspeed, 3 Oct 2024](https://www.lightspeedhq.com/news/over-one-third-of-gen-z-and-young-millennial-shoppers-list-tiktok-as-their-top-shopping-resource-prompting-retailers-to-consider-generational-approach-this-season/)). A smaller Lightspeed sample found 76.4% prefer to see, touch or try products before buying ([Lightspeed, 28 Oct 2025](https://www.lightspeedhq.com/blog/retail-trends-2025-shopper-insights/)). Bulgarian small food producers describe the same "touch and try" dynamic and call digital-first producers "единични случаи" (isolated cases), held back by time and equipment costs ([Bloomberg TV Bulgaria, 30 Sep 2026](https://www.bloombergtv.bg/a/16-biznes-start/164828-ot-nivata-do-tiktok-fermerite-u-nas-tarsyat-nov-pat-kam-potrebitelite)). Online wine and gourmet shop VIDA.BG has 16,600 TikTok followers from 150 videos, and Sofia flower boutique Beauté has 3,121 from only 25, while wine club CASAVINO has 296 from 119; bike shop PumpMyBike has 1.4K YouTube subscribers ([@vida.bg](https://www.tiktok.com/@vida.bg); [@beaute_flowers](https://www.tiktok.com/@beaute_flowers); [@casavino](https://www.tiktok.com/@casavino); [YouTube @pumpmybike105](https://www.youtube.com/@pumpmybike105); checked 18 Nov 2026). The two-account comparison suggests a few strong, occasion-driven clips beat a stream of opening-hours notices; that is a hypothesis, not a finding. Wine and spirits shops carry the alcohol rules below. The occasion calendar (8 March, Valentine's Day, name days, Christmas gifts, bike and ski seasons) is general knowledge, not sourced here, and should be checked per client.

#### What one monthly visit can realistically yield

No agency, trade-body or platform benchmark for videos per visit was found. The only vendor guidance is Resy's monthly 2–4-hour batch shoot (above), and one US production agency warns that setup alone should take "at least (AT LEAST!!!!!) two hours" and that location changes stretch a shoot to a full day ([Bunker Hill Media, undated](https://bunkerhillmedia.squarespace.com/blog/one-shoot-five-videos-how-to-maximize-your-investment-in-video-production)). The yields below are therefore reasoned inference for one 3–4-hour visit with one shooter, a shot list agreed in advance and staff available, producing finished vertical clips of 15–45 seconds plus a still set for Google Business Profile.

| Sector | Finished shorts per visit (inference) | Evergreen core to film on the visit | Needs a client phone clip, second visit or timed visit | Format and platform notes |
|---|---|---|---|---|
| Restaurants and cafés | 8–12 | 3–4 signature dishes made or plated; drinks or coffee being made; chef and staff intros; the room in its best light; an origin-story piece every month or two; GBP stills (exteriors, interiors, food, team) | Daily specials; DJ and live-music nights; holiday menus (Christmas, 14 Feb, 8 March, Easter, 6 May, 6 Dec); terrace and weather; guest reposts with permission | Under 30 s (Resy); no spirits-led clips; clean GBP cut of 30 s or less |
| Hotels and guest houses | 6–10 | A room tour for each key room type; pool and spa; breakfast and restaurant; staff welcome and local tips; destination footage (current season only); "a day here" edit | Events, weddings and team-building; first snow or slopes open; pool and beach openings; last-minute offers | Calm edits built from 2–9 s scenes (Expedia); English captions for foreign markets; no GBP offer posts |
| Fitness studios and gyms | 8–12 | 3–4 trainer tips or form cues; class snippets with consenting members; facility tour and "your first visit"; trainer intros | Challenges, new classes and timetable changes; January and Black Friday offers; member milestones | Member stories only with written consent; no speed-of-result claims |
| Beauty salons | 6–10 | 2–4 transformations or process sequences with pre-booked consenting clients or models; team "day in the life"; tips and aftercare; a service-and-price explainer | New services, products or staff; prom, wedding and holiday looks; last-minute free slots | Booking link on every post; no injectables or needle procedures |
| Dental and aesthetic clinics | 6–8 | Team intros with credentials; technology explainers; 2–3 patient-education answers from the dentist or doctor; "how a consultation works" | Awareness days; new equipment; staff news | Facebook, Instagram and YouTube before TikTok; legal review before every post; no price promotions for dentists |
| Car detailing, repair and dealers | Detailing 8–12; repair 6–10; dealer 10–15 | Detailing process, coating and film demos, care tips; repair "what we found" and seasonal maintenance; dealer walkarounds of 45–60 s plus one long-form YouTube walkaround | Detailing before/after needs the car's arrival and pick-up; unusual faults; stock arrivals and handovers (staff phone clips) | Blur number plates; long-form cut for buyers (Cox: about 5:35) |
| Real estate agencies | 8–12 | 3–5 listing walk-throughs, also cut to 2–4 min for YouTube; 1–2 market updates; a neighbourhood guide; an agent personal-brand piece; a process explainer (deposit, notary, taxes) | New listings, which may sell before the next visit; open houses; development milestones; agents' own clips of urgent listings | A reference code on every listing clip; energy figure in the caption |
| Home improvement and interiors | Contractor 6–10; showroom 8–12 | A project pipeline (before, milestone, reveal plus testimonial); craft tips; showroom tours; material demos; designer tips | Project starts between visits (client "before" brief); completion dates; new collections and promotions | Fixed camera positions so before and after match |
| Specialty retail | 8–12 | New arrivals and product demos; staff picks; store tour; founder story (once, then reused); packing orders; care and how-to tips | Seasonal stock and occasions; tastings and events; florists' daily bouquets | Wine shops follow the alcohol limits; customer-voice clips for Facebook and GBP too |

Sources: the Bulgarian profiles and external studies cited in this section. Yields, splits and notes are inference.

At about three posts a week, roughly 13 a month, a visit yielding 8–12 shorts plus 2–6 edited client phone clips covers the month; sectors that post daily, such as dealers and florists, need more phone footage or a second visit (inference). Two consequences follow. A "client phone kit" (shot list, framing guide, caption templates) belongs inside the service, because Bulgarian producers name time and equipment as the barriers to making video themselves (Bloomberg TV Bulgaria, above). And monthly reports should pair views with something the client can count, such as calls quoting a listing code, booking clicks, Viber enquiries or covers, because every sector's evidence ties social video to discovery rather than to the purchase.

### Clinics answer to four rulebooks; bars face a spirits ban

Four layers bind marketing content in Bulgaria, and they must not be blurred: statute binds everyone it addresses; the professional ethics codes bind doctors and dentists through disciplinary law; self-regulation binds those who accept it; and platform policy is contractual. The agency is not a bystander in any of them. Under the Competition Protection Act, the advertising agency that prepared a misleading or unlawfully comparative advert is liable alongside the advertiser (ЗЗК чл. 32(2)). The consumer regulator, КЗП, may order "рекламодателят и/или рекламната агенция" (the advertiser and/or the advertising agency) to publish its decision and a corrected advert at their own cost (ЗЗП чл. 68л(3)), and since February 2026 such measures are enforceable immediately even under appeal (чл. 68л(5)). The dentists' code makes a dentist answer for the acts of whoever runs the practice's profile (БЗС code чл. 10а(4)). Fines still written in leva apply in euro at the fixed conversion rate ([ЗВЕРБ чл. 11(2) and §5(1), last amended ДВ 92/06.10.2026](https://lex.bg/laws/ldoc/2137244903)); the changeover itself is known from spec/research/01 and spec/research/03. Statutes were read in lex.bg's unofficial consolidated texts, in the versions below.

| Act | Abbreviation | Version read (latest amendment shown) |
|---|---|---|
| [Закон за здравето](https://lex.bg/laws/ldoc/2135489147) (Health Act) | ЗЗ | ДВ бр. 68, 28 Jul 2026 |
| [Закон за лечебните заведения](https://lex.bg/laws/ldoc/2134670848) (Medical Establishments Act) | ЗЛЗ | ДВ бр. 74, 9 Sep 2025 |
| [Закон за лекарствените продукти в хуманната медицина](https://lex.bg/laws/ldoc/2135549536) (Medicinal Products Act) | ЗЛПХМ | ДВ бр. 51, 5 Jun 2026 |
| [Наредба № 1 от 25.01.2012](https://lex.bg/laws/ldoc/2135773132) (medicine-advertising ordinance) | Наредба № 1/2012 | ДВ бр. 82, 1 Oct 2021 |
| [Закон за защита на потребителите](https://lex.bg/laws/ldoc/2135513678) (Consumer Protection Act) | ЗЗП | ДВ бр. 87, 24 Sep 2026 |
| [Закон за защита на конкуренцията](https://lex.bg/laws/ldoc/2135607845) (Competition Protection Act) | ЗЗК | ДВ бр. 58, 26 Jun 2026 |
| [Закон за съсловните организации на лекарите и на лекарите по дентална медицина](https://lex.bg/laws/ldoc/2134419457) (professional bodies of doctors and dentists) | ЗСОЛЛДМ | ДВ бр. 85, 2 Oct 2020 |
| [Кодекс за професионална етика на лекарите по дентална медицина](https://lex.bg/laws/ldoc/2135896489) (dentists' ethics code) | БЗС code | ДВ бр. 34/2006; amended ДВ бр. 18, 24 Feb 2017 |
| [Кодекс за професионална етика на лекарите в България](https://lex.bg/laws/ldoc/1598070784) (doctors' ethics code) | БЛС code | ДВ бр. 79/2000; amended ДВ бр. 85, 28 Sep 2013 |
| [Закон за тютюна, тютюневите и свързаните с тях изделия](https://lex.bg/laws/ldoc/2133117441) (tobacco act) | ЗТТСТИ | ДВ бр. 55, 16 Jun 2026 |
| [Закон за туризма](https://lex.bg/laws/ldoc/2135845281) (Tourism Act) | ЗТ | ДВ бр. 87, 24 Sep 2026 |
| [Закон за енергийната ефективност](https://lex.bg/laws/ldoc/2136500695) (Energy Efficiency Act) | ЗЕЕ | ДВ бр. 55, 16 Jun 2026 |
| [Закон за хазарта](https://lex.bg/laws/ldoc/2135783265) (Gambling Act) | ЗХ | ДВ бр. 69, 31 Jul 2026 |
| [Закон за радиото и телевизията](https://lex.bg/laws/ldoc/2134447616) (Radio and Television Act) | ЗРТ | ДВ бр. 69, 31 Jul 2026 |
| [Закон за защита на личните данни](https://lex.bg/laws/ldoc/2135426048) (Personal Data Protection Act) | ЗЗЛД | ДВ бр. 69, 31 Jul 2026 |
| [Закон за закрила на детето](https://lex.bg/laws/ldoc/2134925825) (Child Protection Act) | ЗЗДет | ДВ бр. 23, 27 Feb 2026 |
| [Кодекс на труда](https://lex.bg/laws/ldoc/1594373121) (Labour Code) | КТ | ДВ бр. 99, 30 Oct 2026 |
| [Закон за авторското право и сродните му права](https://kttc.tu-sofia.bg/wp-content/uploads/2025/03/1_9_ЗАКОН-ЗА-АВТОРСКОТО-ПРАВО-С-ИЗМЕНЕНИЯТА-ОТ-2024.pdf) (Copyright Act) | ЗАПСП | Secondary consolidated copy current to ДВ бр. 70/2024 (lex.bg refused access) |

#### Medical and dental clinics: a ban without a definition

**Statute.** The core rule is one sentence of the Health Act, unchanged since 2004: "Медицинските специалисти, както и лечебните заведения, не могат да използват за своята дейност търговска реклама" (medical specialists and medical establishments may not use commercial advertising for their activity) ([ЗЗ чл. 190(2)](https://lex.bg/laws/ldoc/2135489147)). **The Act does not define "търговска реклама" and attaches no dedicated penalty**; the residual fine of 100–600 leva (500–3,000 on repeat) in чл. 229(1) arguably applies, but no enforcing body is named. The Medical Establishments Act pulls the other way: establishments must display the type and price of all services on their premises and publish them on their website "или се оповестява по друг обичаен начин" (or by another customary means) ([ЗЛЗ чл. 98(3), in force 1 Jan 2019](https://lex.bg/laws/ldoc/2134670848)). Medicines law is the sharpest tool. Only non-prescription medicines may be advertised to the public (чл. 247); internet advertising of prescription medicines is banned (чл. 248а); and a medical specialist "не може да извършва пряка или косвена реклама на лекарствени продукти" (may not directly or indirectly advertise medicines) in print, electronic media or online, even over-the-counter ones (чл. 246(5)). "Advertising" covers any information or presentation aimed at stimulating use (чл. 244(1)), and whoever advertises in breach faces fines of 10,000–20,000 leva (чл. 290(3)) ([ЗЛПХМ](https://lex.bg/laws/ldoc/2135549536)). The medicine-advertising ordinance also bars endorsements by health professionals and misleading depictions of bodily changes ([Наредба № 1/2012, чл. 6(1) т. 6 and т. 11](https://lex.bg/laws/ldoc/2135773132)). The Health Act separately bans "всички форми на реклама" (all forms of advertising) of unconventional methods, including homeopathy, acupuncture and "диетика и лечебно гладуване" (dietetics and therapeutic fasting) ([ЗЗ чл. 166(1) and 169](https://lex.bg/laws/ldoc/2135489147)). Consumer and competition law police results claims, cure claims, fake or edited reviews and comparisons for every clinic ([ЗЗП чл. 68д(2) т. 2, 68ж т. 17 and т. 26–27](https://lex.bg/laws/ldoc/2135513678); [ЗЗК чл. 32–34](https://lex.bg/laws/ldoc/2135607845)). EU law limits how far a blanket ban can go. The Court of Justice held that the e-Commerce Directive precludes "a general and absolute prohibition of any advertising relating to the provision of oral and dental care services" in electronic communications, including a dentist's website ([CJEU, C-339/15 Vanderborght, 2017](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:62015CJ0339)). An EU-compatible reading of чл. 190(2) therefore bans certain forms or content of promotion rather than all online presence; no Bulgarian court ruling on that tension was found.

**Ethics codes.** The dentists' code, reworked in 2017, is the only Bulgarian text that addresses social media. It restates the statutory ban (чл. 8(1)) but lets a dentist "поддържа сам или да възлага на други лица да поддържат" (run, or have others run) a website and social-network profile with professional information (чл. 10а(1)), and lists what may be presented, such as services, qualifications, degrees and insurer contracts (чл. 9(1)). It forbids advertising "посочвайки конкретни цени в медии и онлайн пространството" (stating specific prices in media and online) or "използвайки методи на промоции и намаления" (using promotions and discounts) (чл. 9(3)). Content must be objective and free of "възхваляващ, подвеждащ и/или сравняващ" (laudatory, misleading or comparative) material (чл. 10а(5)), and unverifiable superiority claims and unsubstantiated cure claims are banned (чл. 10). The dentist answers for the profile, "включително за действията на лицата, на които е възложил създаването и поддръжката им" (including the acts of those engaged to create and maintain it) (чл. 10а(4)), which covers the agency ([БЗС code, amended ДВ 18/2017](https://lex.bg/laws/ldoc/2135896489)). The doctors' code predates social media and is stricter in tone. Doctors must not let "името, квалификацията и уменията им да се използват с рекламна цел" (their name, qualifications and skills be used for advertising) (чл. 14); signs and stationery must not be promotional (чл. 15–16); medical secrecy extends to "илюстрационен материал" (illustrative material), with an exception only for anonymised science and teaching (чл. 52, 54); and fees may not fall below the БЛС minimum (чл. 57) ([БЛС code, amended ДВ 85/2013](https://lex.bg/laws/ldoc/1598070784)). Both codes are statutory instruments: breaches carry a reprimand, a fine of one to five minimum monthly wages, or removal from the register for three months to a year ([ЗСОЛЛДМ чл. 37–38](https://lex.bg/laws/ldoc/2134419457)). A Bulgarian lawyer's 2020 review reported that nearly all the appealed penalty decrees he had seen were annulled for procedural defects ([lex.bg News, 21 Jul 2020](https://news.lex.bg/%D0%BE%D1%82%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%BD%D0%BE%D1%81%D1%82-%D0%B7%D0%B0-%D0%BD%D0%B0%D1%80%D1%83%D1%88%D0%B5%D0%BD%D0%B8%D1%8F-%D0%BD%D0%B0-%D0%B5%D1%82%D0%B8%D1%87%D0%BD%D0%B8%D1%82%D0%B5/)). Enforcement looks weak, but the risk of removal from the register falls on the client's doctor.

**Self-regulation.** НСС's general code applies to every channel of commercial communication and requires substantiated, provable claims and fair comparisons (Arts 5–10), and genuine, verifiable testimonials used with consent (Art. 12) ([НСС code, file dated Mar 2024](https://www.nss-bg.org/wp-content/uploads/2024/03/kodeks.docx)). It binds only those who accept it; a 2009 press report, seen only in a search snippet, says НСС decisions are voluntary for non-members ([Capital.bg, 11 Dec 2009](https://www.capital.bg/biznes/media_i_reklama/2009/12/11/829331_leko_stranno_nachalo/)).

**Platform policy.** TikTok is the most restrictive channel for clinics. Its Community Guidelines, which apply to organic posts, list "Trading, marketing, or providing access to" "Restricted medical services or invasive cosmetic procedures" as NOT ALLOWED. They define restricted medical services as those involving diagnosis or treatment "where an official license is required to operate", and count "sharing contact or location information" as "trade". On its face that definition reaches licensed dental and medical clinics (inference). The ban is a default, not an absolute rule. The same section's ALLOWED list re-admits, "In some regions, content from verified business accounts or TikTok Shop Sellers that meet our eligibility standards that sell, market, or provide access to" restricted medical services and invasive cosmetic procedures (and alcohol and OTC drugs). It also allows "Documentary or educational content that raises awareness about regulated goods and services" ([TikTok Community Guidelines, Regulated Goods and Services, effective 24 Sep 2026](https://www.tiktok.com/community-guidelines/en/regulated-commercial-activities); list labels checked in the page source on 18 Nov 2026). Which regions qualify, whether Bulgaria is one, and how a clinic gets verified-business authorisation were not checked. Patient-education reels are therefore defensible on TikTok, but calls to book, prices and contact details are not, unless the account is authorised (inference). TikTok's Branded Content Policy prohibits paid creator content for "Any medical institutions, treatments or devices", teeth-whitening products and "Cosmetic clinics", and lists Bulgaria as "not allowed" for cosmetic and dental surgery, prescription and over-the-counter medicines, and vitamin supplements ([TikTok Branded Content Policy, effective 30 Oct 2026](https://www.tiktok.com/legal/page/global/bc-policy/en)). Meta allows prescription-drug ads only in the US, Canada and New Zealand ([Meta, drugs and pharmaceuticals ad policy, 26 Feb 2025](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/drugs-pharmaceuticals/)), and GBP bars promotions of pharmaceuticals and health and medical devices ([Maps restricted content, undated](https://support.google.com/contributionpolicy/answer/7400114?hl=en)).

**Where the law is uncertain.** Three questions are open. No definition or enforcement practice exists for "търговска реклама", so whether a clinic's educational reel, a boosted post or a testimonial counts as commercial advertising is untested. The duty to publish prices (ЗЛЗ чл. 98(3)) conflicts with the dentists' ban on stating prices online (БЗС чл. 9(3)); a plausible but untested reconciliation is a neutral price list on the website as legally required information, with no prices in promotional posts. And whether a generic mention of "ботулинов токсин" in a service description counts as medicine advertising is unresolved, because no guidance from the Bulgarian Drug Agency (ИАЛ) was found.

#### Aesthetic treatments: no before/after statute, but four overlapping brakes

**Statute.** Full-text searches of the Health Act, the Medical Establishments Act, the medicines and medical-devices acts, the consumer and competition acts, the Radio and Television Act and the medicine-advertising ordinance found **no Bulgarian rule specifically on before/after images** (versions above). The constraints come from elsewhere. Injectables, medical lasers and microneedling are medical procedures that need a registered medical establishment and qualified doctors, while salons are notified to the regional health inspectorate (РЗИ) as public-purpose sites; this comes from a 2026 law-firm guide, not from a primary medical standard that could be checked ([Schönherr, 20 Apr 2026](https://www.schoenherr.eu/content/regulated-beauty-a-guide-to-the-bulgarian-regulatory-framework)). A salon that implies it may perform them risks the blacklisted practice of falsely claiming an authorisation ([ЗЗП чл. 68ж т. 4](https://lex.bg/laws/ldoc/2135513678)). Botulinum toxin is a prescription medicine (its Bulgarian dispensing status in the ИАЛ register was not checked), so showing or naming a branded vial falls under the medicines rules above. For dermal fillers, EU devices law prohibits "text, names, trade marks, pictures" that mislead about a device's purpose, safety or performance, or that fail to inform of a likely risk ([MDR Art. 7 and Annex XVI point 3, consolidated 10 Jan 2025](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02017R0745-20250110)). For cosmetic products, pictures may not "imply that these products have characteristics or functions which they do not have" ([Regulation 1223/2009 Art. 20(1), 2009](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009R1223)), and claims need "adequate and verifiable evidence" ([Regulation 655/2013 Annex, 2013](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32013R0655)). An identifiable treatment result is health data, which needs "explicit consent ... for one or more specified purposes" ([GDPR Art. 9(2)(a), 2016](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679)). КЗЛД's February 2026 opinion on salons says filming and online distribution are "две различни/отделни операции" (two separate operations), each needing its own legal basis; that only explicit consent can serve; and that filming people during cosmetic procedures, "особено в случаи без облекло, е крайно недопустимо" (especially when undressed, is wholly impermissible) ([КЗЛД opinion ПНМД-01-35/2026, adopted 12 Feb 2026](https://cpdp.bg/%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%B8%D1%89%D0%B5-%D0%B7%D0%B0-%D0%BA%D0%BE%D0%BC%D0%B8%D1%81%D0%B8%D1%8F%D1%82%D0%B0-%D0%B7%D0%B0-%D0%B7%D0%B0%D1%89%D0%B8%D1%82%D0%B0-%D0%BD%D0%B0-%D0%BB%D0%B8-2/)).

**Ethics codes.** For doctor-run aesthetic clinics, the БЛС secrecy articles cover illustrative material and contain no marketing exception (чл. 52, 54), so identifiable before/after material is ethically riskier for doctors than for dentists, consent or not. Dentists may disclose patient facts with the patient's written consent (БЗС code чл. 25(2)), but remain bound by the ban on laudatory and comparative content, which before/after smiles arguably engage (inference; untested). Both codes are linked in the version table above.

**Self-regulation.** НСС's cosmetics guidance accepts before/after techniques only "при условие че не загатват, че продуктът притежава характеристики или функции, които в действителност не притежава" (provided they do not suggest characteristics the product lacks), and bars digital edits that make bodies "нереалистични и подвеждащи" (unrealistic and misleading) ([НСС cosmetics guidance, undated](https://www.nss-bg.org/rakovodni-principi-za-kozmetichni-produkti/)). НСС's general code requires testimonials to be genuine, verifiable, signed and dated, used with consent and disclosed if paid ([НСС code Art. 12, Mar 2024 file](https://www.nss-bg.org/wp-content/uploads/2024/03/kodeks.docx)).

**Platform policy.** Meta's ad rules allow before/after images for general cosmetic procedures "without employing negative self-perception tactics", but not side-by-side comparisons for wrinkle treatments "such as Botox injectables", and require targeting of people "at least 18 years or older" ([Meta, health and wellness ad policy, version 22 Jul 2026](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/health-wellness/)). These bind ads and boosted posts; Meta's organic rules on the subject were not retrieved. TikTok makes content "Showing or promoting invasive cosmetic surgery", or discussing cosmetic surgery without explaining its risks, ineligible for the For You feed and age-restricted, on top of the default marketing ban on needle procedures quoted above ([TikTok Community Guidelines, effective 24 Sep 2026](https://www.tiktok.com/community-guidelines/en/mental-behavioral-health)).

**Comparators, not Bulgarian law.** Germany bans before/after comparisons for cosmetic surgery without medical necessity outside professional circles ([HWG §11(1) sentence 3 no. 1, current text, undated](https://www.gesetze-im-internet.de/heilmwerbg/__11.html)), and the UK bars public advertising of prescription-only treatments and the targeting of cosmetic-intervention ads at under-18s ([ASA/CAP Code section 12, current text, undated](https://www.asa.org.uk/type/non_broadcast/code_section/12.html)). They give defensible house rules where Bulgarian law is thin: adult audiences only, no prescription products, and no before/after pairs for needle or surgical procedures in promotional posts.

#### Restaurants and bars: spirits banned, wine and beer fenced, smoke kept off camera

**Statute.** "Забранява се пряката реклама на спиртни напитки": **direct advertising of spirits is banned outright, in any medium** ([ЗЗ чл. 55(1)](https://lex.bg/laws/ldoc/2135489147)). Spirits are drinks with "най-малко 15 обемни процента" (at least 15% by volume) of alcohol (§1 т. 18), and direct advertising is "всяка форма на търговско послание, съобщение или препоръка" (any commercial message, communication or recommendation) promoting alcoholic drinks or their consumption "чрез използване на самите напитки или на действия, свързани с тяхното консумиране" (by using the drinks themselves or acts of consuming them) (§1 т. 19). Advertising wine and beer, and indirect spirits advertising (a spirit brand on non-alcoholic products, §1 т. 20), is allowed. It may not target under-18s or use them as participants, link drinking to sport, physical achievement or driving, make false health, social or sexual claims, or show moderation negatively (чл. 55(2)). Fines run from 1,500–3,000 leva for individuals to 10,000–30,000 leva for companies, or 30,000–50,000 on repeat (чл. 218(4)–(6)), and the regional health inspectorates enforce them (чл. 15(1) т. 6). On its face the ban reaches a bar's own reel promoting a rakia, whisky or gin selection (inference; no РЗИ or court guidance applying it to venues' own posts was found). The Radio and Television Act's alcohol rules bind media-service providers and video-sharing platforms, not a business posting on its own account ([ЗРТ чл. 19д, 75(7), 88](https://lex.bg/laws/ldoc/2134447616)); they follow the EU template ([AVMSD, Directive 2010/13/EU Arts 9 and 22, consolidated 18 Dec 2018](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02010L0013-20181218)).

Smoking is banned in all enclosed public places, so indoor smoking on camera documents a breach by the venue ([ЗЗ чл. 56](https://lex.bg/laws/ldoc/2135489147)). Separately, advertising tobacco, related products, e-cigarettes and heated products "чрез услугите на информационното общество" (through information-society services) is banned outside trade-only publications, and "рекламиране" covers anything whose aim or result is to promote their use. Fines are 15,000–50,000 leva, or property sanctions of 50,000–100,000, and КЗП can order online content removed ([ЗТТСТИ чл. 35(3)–(4), §1 т. 33, чл. 43п and 50](https://lex.bg/laws/ldoc/2133117441)). A hookah-lounge video is therefore high-risk twice over. Online advertising of nitrous oxide is banned too ([ЗЗ чл. 55а, in force 8 Oct 2024](https://lex.bg/laws/ldoc/2135489147)). A happy-hour or "−50%" post is an announced price reduction: it must name the goods, conditions and period, show the prior price (the lowest in the previous 30 days), and run between one working day and one month, with fines of €400–4,000 for companies ([ЗЗП чл. 63–66 and 209](https://lex.bg/laws/ldoc/2135513678)). This implements the EU prior-price rule ([Directive 2019/2161 Art. 2, 2019](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32019L2161)). Prices must be shown in euro, including VAT and all other taxes ([ЗЗП чл. 19](https://lex.bg/laws/ldoc/2135513678)).

**Self-regulation.** НСС's spirits norms are stricter than the statute: ads only where at least 70% of the audience is adult, no models or actors under 25, no drunkenness, an age gate on brand-controlled digital channels, and restrictions on drinking games and prize giveaways in bar and restaurant promotions ([НСС, Норми за спиртни напитки, undated](https://www.nss-bg.org/normi-za-spirtni-napitki/)). The norms are written for brand owners, importers and traders, and the page names neither the adopting body nor a date, so their reach to a non-member venue is uncertain. The general code bars alcohol communications aimed at children and drink-driving depictions (Arts 16.4 and 17.12), and defines spirits as "над 15 %" (over 15%), slightly different from the Act's "at least 15%" ([НСС code, Mar 2024 file](https://www.nss-bg.org/wp-content/uploads/2024/03/kodeks.docx)).

**Platform policy.** Meta's alcohol ads must target at least 18+ and follow local law and industry codes; Bulgaria is on neither Meta's prohibited-country list nor its higher-age list ([Meta, alcohol ad policy, current version undated; prior version 26 Jun 2024](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/alcohol/)). TikTok's alcohol ads may not feature "people below the age of 25", portray excessive drinking or offer alcohol as a prize, and must state the drink's strength and carry a responsible-drinking disclaimer ([TikTok ads policy, alcohol, Sept 2025](https://ads.tiktok.com/help/article/tiktok-ads-policy-alcohol)). TikTok's branded content allows alcohol only when a creator has "been invited by an approved brand", and prohibits tobacco and vapes ([TikTok Branded Content Policy, effective 30 Oct 2026](https://www.tiktok.com/legal/page/global/bc-policy/en)); its Community Guidelines list marketing alcohol as NOT ALLOWED by default and re-admit it only "In some regions" for verified business accounts that meet TikTok's eligibility standards. They also make videos "In some regions, showing adults having or consuming alcohol" ineligible for the For You feed and age-restricted ([TikTok Community Guidelines, Regulated Goods and Services, effective 24 Sep 2026](https://www.tiktok.com/community-guidelines/en/regulated-commercial-activities)). Whether Bulgaria is such a region was not checked, so a bar's drinks reels may reach few people beyond its followers there (inference). GBP bars promotions and calls to action for alcohol and tobacco but allows incidental depictions such as menu images ([Maps restricted content, undated](https://support.google.com/contributionpolicy/answer/7400114?hl=en)).

**Where the law is uncertain.** A cocktail made with a spirit may fall below 15% once mixed, and the statute does not say whether such a drink, or a post naming its spirit base or brand, counts as a "спиртна напитка". Whether a plain menu or price post ("our cocktails, €8") is advertising at all is unaddressed. On the statute's face, wine pairings, beer and wine shown with food, adults (ideally 25 or older, to meet the self-regulatory and TikTok-ad standard) drinking moderately, and room atmosphere are low risk. Shots, spirit brands, spirit-led cocktail reels, "bottomless" offers, drinking games and alcohol prizes are high or uncertain risk (inference from the layers above).

#### Real estate: energy figures, honest pictures and a late directive

**Statute.** Where an energy performance certificate has been issued, the primary-energy indicator in kWh/m² "се отбелязва във всички обяви" (must be noted in all advertisements) for sale or rent, for new buildings and buildings in use alike, and the certificate must be shown to the buyer or tenant before the contract ([ЗЕЕ чл. 34(4) and 41(3)](https://lex.bg/laws/ldoc/2136500695)). The whole penalty chapter was read, and no sanction tied to either article was found. The EU recast directive goes further: the indicator **and the energy class** must appear "in online and offline advertisements, including in property search portal websites", with sample checks by Member States ([Directive (EU) 2024/1275 Art. 20(4), 2024](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024L1275)). Transposition was due by 29 May 2026 and the 2010 directive was repealed from 30 May 2026 (Arts 35–36, same link), yet the consolidated ЗЕЕ, last amended on 16 June 2026, does not mention 2024/1275. **Transposition therefore appears to be outstanding** (inference from absence; a draft law may exist). Consumer law expressly covers real estate ("недвижимо имущество", ЗЗП чл. 68б(2)–(3)). A post misleads if its "цялостното ... представяне" (overall presentation) deceives "дори и ако представената информация е фактически точна" (even if the information is factually accurate) (чл. 68д(1)); that catches edits that remove pylons, add sea views or pass off wide-angle distortion as real size. Bait advertising, bait-and-switch, false "only for a very limited time" claims and inaccurate statements about market conditions or availability are always unfair (чл. 68ж т. 5–7 and 18). An invitation to purchase must state the price including all taxes and extra costs (чл. 68е(4) т. 3), and fines reach €1,500–50,000 for companies (чл. 210а, as amended 24 Sep 2026) ([ЗЗП](https://lex.bg/laws/ldoc/2135513678)). Because КЗП can order the advertising agency to publish a corrected advert (чл. 68л(3)), misleading property content is a direct business risk for the agency itself. Filming inside owners' homes falls outside GDPR's household exemption, and family photos, documents, house numbers linked to an owner and car plates can identify people ([GDPR recital 18, Arts 2(2)(c) and 4(1), 2016](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679)); written owner consent, decluttering and blurring are good practice rather than a Bulgarian statutory text. No statute licensing real-estate brokers was found, and the status of any 2023–2026 bill could not be checked because parliament.bg's bill database returned no data. Either way, content should never call a client "licensed" or "certified" unless that is documented (ЗЗП чл. 68ж т. 2 and 4).

**Drones.** Aerial shots of properties and resorts fall under EU drone rules. In the open category a drone must weigh under 25 kg, stay within visual line of sight and at most 120 m up, and must not be "flown over assemblies of people". Operators must register if the drone weighs 250 g or more or carries a camera (toys excepted), and must display the number on every drone. Subcategory A2 needs 30 m from uninvolved people (5 m in low-speed mode), and A3 needs 150 m from residential, commercial, industrial or recreational areas, which rules out most town and resort shots for older, heavier drones ([Regulation (EU) 2019/947 Arts 4 and 14 and Annex, 2019 text](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32019R0947)). Bulgarian operators register online with ГД ГВА, and third-party insurance is required for commercial flights regardless of weight ([ГД ГВА FAQ, undated](https://www.caa.bg/bg/category/633/29605)). A hotel pool, a beach or an event crowd counts as an assembly of people.

#### Hotels, gyms, salons and promotions carry smaller but real traps

**Hotels.** Tourist services may be offered online only for categorised or registered accommodation ([ЗТ чл. 113(3)](https://lex.bg/laws/ldoc/2135845281)). Names, types and categories must not mislead (чл. 132(4)), so a guest house cannot be sold as a hotel and stars must be quoted as certified. Only certified centres may use "СПА", "балнеолечебен (медикъл СПА)", "уелнес" or "таласотерапия", including "на интернет страници" (on websites) (чл. 138(2)). Prices must be given in euro and be the same for all tourists, including online and in advertising (чл. 4 and 115 т. 3). Since 27 September 2026, generic environmental claims without proof, uncertified sustainability labels and offset-based "climate neutral" claims are blacklisted, so an "eco hotel" claim needs evidence ([ЗЗП чл. 68ж т. 28–31](https://lex.bg/laws/ldoc/2135513678)). The EU short-term-rental regulation, applicable from 20 May 2026, makes platforms display hosts' registration numbers but does not reach a host's own social accounts ([Regulation (EU) 2024/1028 Arts 7 and 19](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R1028)). Whether the municipal tourist tax must be included in advertised prices could not be verified, because the local-taxes act could not be opened; the general rule is that prices include all taxes and fees (ЗЗП чл. 19(4)). On GBP, hotels cannot post offers at all (GBP content policy, above).

**Gyms.** Gyms are not medical establishments, so the Health Act's advertising ban and the ethics codes do not bind them. Results claims, cure claims and fake reviews fall under consumer law (ЗЗП, above). Supplements may not carry claims "which make reference to the rate or amount of weight loss" ([Regulation 1924/2006 Art. 12(b), 2006](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32006R1924)), and anyone ascribing disease-prevention or treatment properties to a product faces 10,000–20,000 leva ([ЗЛПХМ чл. 290(2)](https://lex.bg/laws/ldoc/2135549536)). Advertising "лечебно гладуване" (therapeutic fasting) or diet therapy framed as treatment may fall under the unconventional-methods ban (ЗЗ чл. 169, above); how far that reaches ordinary nutrition coaching is uncertain. The platforms are stricter. Meta prohibits side-by-side weight-loss transformations in ads, with an exception paraphrased as covering the effect of fitness classes such as Pilates ([Meta health and wellness ad policy, 22 Jul 2026](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/health-wellness/)). TikTok prohibits weight-loss products and services, including fasting services, in branded content and makes diets or exercise promising "fast or dramatic results" ineligible for For You (TikTok Branded Content Policy and Community Guidelines, above).

**Salons.** Salons are not medical establishments either, so their limits are cosmetics-claims law, consumer law and the ban on implying procedures they may not perform (above). TikTok's branded-content ban on "Cosmetic clinics" expressly includes "laser hair removal services" (TikTok Branded Content Policy, above), and its organic ban on marketing needle procedures applies to any salon offering them.

**Giveaways.** Gambling is a game of chance "в която има залог" (with a stake), a stake is "всяко плащане на пари, пряко или под друга форма" (any payment of money, directly or in another form), and every gambling game needs a licence from the National Revenue Agency's executive director ([ЗХ чл. 2(1), 3(1) and §1 т. 1](https://lex.bg/laws/ldoc/2135783265)). A free like-and-comment giveaway has no stake and so falls outside the Act (inference; no NRA confirmation was found), but a purchase-linked draw is a grey zone because of "под друга форма". The Act also bans gambling advertising in electronic media, including websites (чл. 10(1) т. 3). Promising prizes that are never awarded, and calling something "free" when it is not, are blacklisted (ЗЗП чл. 68ж т. 19–20). Facebook's own policy says a promotion "не трябва да изисква или да стимулира участниците ... да споделят, да публикуват повторно, да отбелязват други хора" (must not require or encourage participants to share, repost or tag others) and must release Meta from responsibility ([Facebook Pages, Groups and Events Policies, undated](https://www.facebook.com/policies_center/pages_groups_events/)). The common "tag three friends" giveaway therefore breaches Meta's terms. Alcohol and tobacco should never be prizes (НСС norms and TikTok ad policy, above).

**Paid creators.** Disclosure is required at three levels. Statute blacklists paid editorial content without clear disclosure and traders posing as consumers (ЗЗП чл. 68ж т. 11 and 22), and treats hiding commercial intent as a misleading omission (чл. 68е(2)) ([ЗЗП](https://lex.bg/laws/ldoc/2135513678)). НСС requires influencer marketing to be labelled "всеки път" (every time), immediately next to the content, with a hashtag, the brand and the nature of the engagement, in Bulgarian or English ([НСС code Art. 9.6, Mar 2024 file](https://www.nss-bg.org/wp-content/uploads/2024/03/kodeks.docx)). Its recommendations suggest labels such as "#реклама/ad" and "#в партньорство с" and count free or discounted goods and services as compensation ([НСС influencer recommendations, 2020](https://www.nss-bg.org/preporaki-za-influensar-marketing/)). TikTok requires its commercial-content disclosure toggle (TikTok Branded Content Policy, above), and Instagram's terms require its branded-content tool ([Instagram Terms of Use s. 4.2, effective 1 Jan 2025](https://help.instagram.com/581066165581870)). A free dinner or a free night for a creator therefore makes the post paid content.

#### Filming customers, staff and children: written consent for anyone featured

spec/research/03 already establishes that identifiable people in footage are personal data, that consent is not the only lawful basis, and that entering premises does not authorise an advertising shoot (known). The Bulgarian and 2026 EU layers narrow the practical choice.

**Statute.** The Constitution provides that no one may be "фотографиран, филмиран, записван ... без негово знание или въпреки неговото изрично несъгласие" (photographed, filmed or recorded without their knowledge or despite their express objection), except where the law provides ([Constitution Art. 32(2), consolidated text](https://lex.bg/laws/ldoc/521957377)). The Court of Justice accepts that a purely commercial interest can be a legitimate interest, subject to strict necessity and balancing ([CJEU, C-621/22 KNLTB, 4 Oct 2024](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:62022CJ0621)). Bulgaria's data law exempts photographic or audiovisual works made by filming someone "в хода на обществената му дейност или на обществено място" (during their public activity or in a public place) from most GDPR duties, but the exemption sits inside the freedom-of-expression article, and a restaurant or gym is privately owned, so relying on it for advertising is doubtful ([ЗЗЛД чл. 25з(5)](https://lex.bg/laws/ldoc/2135426048); inference). The Copyright Act requires the sitter's consent to create a portrait photograph, except in public places, for people who are only a detail in a crowd or landscape, and for paid models ([ЗАПСП чл. 13](https://kttc.tu-sofia.bg/wp-content/uploads/2025/03/1_9_ЗАКОН-ЗА-АВТОРСКОТО-ПРАВО-С-ИЗМЕНЕНИЯТА-ОТ-2024.pdf)); whether it covers video is uncertain. A person published without a lawful basis can complain to КЗЛД within six months of learning of it (and within two years at most), sue with a damages claim, or bring a tort claim in which fault is presumed and non-pecuniary damages are set "по справедливост" (on grounds of fairness) ([ЗЗЛД чл. 38–39](https://lex.bg/laws/ldoc/2135426048); [ЗЗД чл. 45 and 52, consolidated text](https://lex.bg/laws/ldoc/2121934337)).

**Regulator.** The EDPB's final guidelines on legitimate interests, adopted on 10 November 2026, say that a sector's habits do not by themselves create reasonable expectations and that "the mere fulfilment of the information obligations ... is not sufficient in itself" ([EDPB Guidelines 1/2024 v2.0, paras 49–50](https://www.edpb.europa.eu/system/files/2026-11/edpb_guidelines_202401_legitimateinterest_v2_en.pdf)). An "on camera today" sign therefore helps transparency but does not legitimise featuring someone. Silence or "merely proceeding with a service" is not consent; a controller "cannot swap from consent to other lawful bases" afterwards; and after withdrawal it "must stop the processing actions concerned" and delete data with no other basis ([EDPB Guidelines 05/2020 v1.1, paras 79, 117 and 122–123, May 2020](https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines_202005_consent_en.pdf)). In practice that means taking the post down or editing the person out. КЗЛД's 2026 opinion lists "ресторанти ... зали за фитнес" (restaurants, gyms) among settings where filming or streaming people "в състояние на уязвимост" (in a vulnerable state) is impermissible, and requires a case-by-case risk assessment (КЗЛД opinion, above). **The workable rule is written consent for anyone featured** (recognisable, central to the shot, giving a testimonial, or a client mid-treatment), with legitimate interests, prior notice and an easy way out of shot reserved for incidental background presence (inference).

**Staff.** The EDPB says employees can give free consent only "in exceptional circumstances, when it will have no adverse consequences at all". Its model is a film crew in an office, where staff who decline "are given equivalent desks elsewhere in the building for the duration of the filming" (EDPB 05/2020, paras 21–23, above). The Labour Code has no provision on employees' images ([КТ, last amended ДВ 99/2026](https://lex.bg/laws/ldoc/1594373121)). Featured staff therefore need separate written consent with a genuine no-camera option; a contract clause works only where appearing on camera is a real part of the job. After someone leaves, the legitimate-interests balance weakens with "how long ago the relationship was terminated" (EDPB 1/2024 v2.0, para 51, above), so featured clips of former staff should come down on request (inference).

**Children.** Information and data about a child may not be disclosed "без съгласието на неговите родители или законни представители" (without the consent of its parents or legal representatives), and from age 14 the child's own consent is also required. Breaches cost 1,000–3,000 leva for individuals and 3,000–5,000 for companies, more on repeat ([ЗЗДет чл. 11а and 45(12)](https://lex.bg/laws/ldoc/2134925825)). For consent-based processing, a parent must consent for children under 14 ([ЗЗЛД чл. 25в](https://lex.bg/laws/ldoc/2135426048)). A child engaged as a performer needs a Labour Inspectorate permit for each case; under-15s may take part in filming only under eased conditions set by the Council of Ministers; and under-18s may work at most seven hours a day ([КТ чл. 301–303 and 305](https://lex.bg/laws/ldoc/1594373121)). Whether "сведения и данни" (information and data) covers a child's image, whether both parents must consent, and whether a one-off unpaid appearance needs a permit are all untested. Platform takedown routes are narrower than the law: Meta accepts privacy reports only from the person shown, the parent of a child under 13 or a legal representative ([Facebook Help, undated](https://www.facebook.com/help/428478523862899)), so the client needs its own takedown channel and deadline (inference). Who is controller is also unsettled. On the usual reading, the client publishing on its own account is the controller and the agency filming on its instructions is a processor needing a GDPR Art. 28 agreement, becoming a controller if it reuses footage in its own portfolio (inference; no Bulgarian source found).

#### Music: trending tracks are off-limits to every business account

spec/research/03 already records that TikTok wants commercially cleared music for brand content (known). The fuller picture is that **no route, whether statutory, collective or contractual, lets a business use trending music in a promotional video.**

**Statute and collecting societies.** Adding music to video is synchronisation, an exclusive right of the author ([ЗАПСП чл. 18(2) т. 8](https://kttc.tu-sofia.bg/wp-content/uploads/2025/03/1_9_ЗАКОН-ЗА-АВТОРСКОТО-ПРАВО-С-ИЗМЕНЕНИЯТА-ОТ-2024.pdf)). Bulgaria's transposition of the DSM Directive's platform-licensing article extends a platform's licence only to users who "действат с нетърговска цел или не генерират значителни приходи" (act for non-commercial purposes or do not generate significant revenues), and only "в рамките на полученото разрешение" (within the authorisation obtained) ([ЗАПСП чл. 22б, in force 1 Dec 2023](https://kttc.tu-sofia.bg/wp-content/uploads/2025/03/1_9_ЗАКОН-ЗА-АВТОРСКОТО-ПРАВО-С-ИЗМЕНЕНИЯТА-ОТ-2024.pdf); [Directive 2019/790 Art. 17(2), 2019](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32019L0790)). The collecting societies cannot fill the gap. Musicautor's sync mandate covers only user uploads made "с нетърговска цел и в рамките на тези услуги" (non-commercially and within those services) ([Musicautor statute, amended 17 Mar 2025](https://www.musicautor.org/images/dokumenti/musicautor/Ustav_MUSICAUTOR.pdf)), and PROPHON says it does not administer performers' and producers' rights on the internet ([PROPHON FAQ, undated](https://www.prophon.org/en/faq)). A venue's public-performance licence covers playing music in the room, not recording it into an advert, and the new incidental-inclusion exception is narrow and subject to the three-step test ([ЗАПСП чл. 23 and 24(1) т. 2б](https://kttc.tu-sofia.bg/wp-content/uploads/2025/03/1_9_ЗАКОН-ЗА-АВТОРСКОТО-ПРАВО-С-ИЗМЕНЕНИЯТА-ОТ-2024.pdf)); the practical rule is to switch venue music off during shoots (inference). For commissioned music, absent agreement the composer keeps copyright and the client may use the work only "за целта, за която то е било поръчано" (for the purpose commissioned) (ЗАПСП чл. 42, same link), so the contract must name sync, platforms, paid ads and term.

**Platform policy.** Meta's Music Guidelines say "Use of music for commercial or non-personal purposes in particular is prohibited unless you have obtained appropriate licenses" ([Meta Music Guidelines, effective 26 Mar 2024](https://www.facebook.com/legal/music_guidelines)). Instagram's licensed library is "intended for personal, non-commercial use", and some business accounts cannot access it ([Instagram Help, undated](https://help.instagram.com/402084904469945)). Meta's Sound Collection, which the same help page says holds "over 14,000 songs and sounds", is licensed for "commercial or non-commercial purposes" on Meta's products only ([Sound Collection Terms, 16 Mar 2022](https://www.facebook.com/sound/collection/terms/)). TikTok's EEA terms apply its Business Terms to anyone "administering an account on behalf of a business" ([TikTok EEA Terms of Service, Jul 2026](https://www.tiktok.com/legal/page/eea/terms-of-service/en)), which reaches the agency directly. Clause 5(c) of those Business Terms requires business content to use Commercial Sounds, the Commercial Music Library or to "pre-clear all music rights" ([TikTok EEA Business Terms, Jul 2025](https://www.tiktok.com/legal/business-terms-eea?lang=en)), and the library's million tracks may be posted "only ... within TikTok" ([CML User Terms, undated](https://www.tiktok.com/legal/page/global/commercial-music-library-user-terms/en); [TikTok Business Help, Jul 2025](https://ads.tiktok.com/help/article/commercial-music-library?lang=en)). YouTube's Audio Library is "copyright-safe" ([YouTube Help, undated](https://support.google.com/youtube/answer/3376882)), but its licence terms on business promotion sit behind a sign-in. YouTube's own help pages conflict on whether Shorts over one minute with a copyright claim are blocked globally ([YouTube Help 15424877, undated](https://support.google.com/youtube/answer/15424877?hl=en)) or "no longer automatically blocked" ([YouTube Help 10343433, undated](https://support.google.com/youtube/answer/10343433)).

**Third-party libraries** are the only cross-platform option, and their agency terms differ. Epidemic Sound's Business plan caps agencies at five end clients a month and USD 5m in turnover ([Epidemic Sound Business licence, 13 Apr 2026](https://www.epidemicsound.com/policy/business-subscription/)). Artlist's licence requires its Max Business plan for anyone working for an agency or a company with more than 50 employees, while a help page says Max Business is for "agencies of any size" ([Artlist licence, 15 Feb 2026](https://help-center.artlist.io/privacy-terms/artlist-license/); [Artlist Help, 29 Oct 2026](https://help.artlist.io/hc/en-us/articles/29589453909149)). Musicbed needs a licence for each video naming the end client and voids licences if a subscription is cancelled early ([Musicbed FAQ, undated](https://support.musicbed.com/musicbed-faq/does-my-subscription-cover-multiple-end-clients-brands)). Soundstripe's Business tier is limited to "a single designated market area", which is unclear outside the US ([Soundstripe Terms of Use, 12 Nov 2026](https://www.soundstripe.com/terms-of-use)). Uppbeat's pages blocked automated access, so its terms are unverified. Videos published during an active subscription generally stay licensed, but re-edits and new uploads after cancellation do not (Epidemic Sound and Artlist sources above).

#### Sector by sector, the binding rules sit in different layers

The first table lists the rules that constrain each sector's content, layer by layer; the second lists the rules that apply to every sector. Statute dates are in the version table above; EU, regulator and platform dates are given in the cells.

| Sector | Statute (BG and EU) | Ethics codes | Self-regulation (НСС) | Platform policy | Uncertain or untested |
|---|---|---|---|---|---|
| Restaurants, cafés and bars | No direct advertising of spirits ([ЗЗ чл. 55(1)](https://lex.bg/laws/ldoc/2135489147)); wine and beer: no minors, sport, driving or false claims (чл. 55(2)); indoor smoking banned (чл. 56); no online tobacco or vape advertising ([ЗТТСТИ чл. 35](https://lex.bg/laws/ldoc/2133117441)); happy hours follow the prior-price rule ([ЗЗП чл. 63–66](https://lex.bg/laws/ldoc/2135513678)) | None | Spirits norms: 70% adult audience, talent 25+, no drinking games or alcohol prizes ([undated](https://www.nss-bg.org/normi-za-spirtni-napitki/)) | Meta alcohol ads 18+ ([undated; prior 26 Jun 2024](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/alcohol/)); TikTok alcohol ads: talent 25+, disclaimer, no prizes ([Sept 2025](https://ads.tiktok.com/help/article/tiktok-ads-policy-alcohol)); TikTok branded alcohol only via approved brands ([30 Oct 2026](https://www.tiktok.com/legal/page/global/bc-policy/en)); TikTok organic alcohol marketing not allowed by default, drinking scenes For You-ineligible in some regions ([24 Sep 2026](https://www.tiktok.com/community-guidelines/en/regulated-commercial-activities)); GBP: no alcohol or tobacco promotions ([undated](https://support.google.com/contributionpolicy/answer/7400114?hl=en)) | Cocktails under 15% once mixed; whether a menu or price post is advertising; reach of НСС norms to non-member venues; no РЗИ guidance on venues' own posts |
| Hotels and guest houses | Online offers only for categorised or registered sites; no misleading type or category; "СПА" and "уелнес" only if certified; euro prices, equal for all ([ЗТ чл. 4, 113(3), 115, 132(4), 138(2)](https://lex.bg/laws/ldoc/2135845281)); green-claims blacklist from 27 Sep 2026 ([ЗЗП чл. 68ж т. 28–31](https://lex.bg/laws/ldoc/2135513678)); no drone flights over crowds ([Reg. 2019/947, 2019](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32019R0947)) | None | General code | GBP: hotels cannot post offers ([undated](https://support.google.com/business/answer/7213077?hl=en)) | Tourist-tax display in advertised prices; whether a hotel's own Instagram is an "електронна платформа" under ЗТ чл. 231 |
| Fitness studios and gyms | No unsubstantiated results, cure or fake-review claims ([ЗЗП чл. 68д, 68ж](https://lex.bg/laws/ldoc/2135513678)); supplements: no weight-loss rate claims ([Reg. 1924/2006 Art. 12, 2006](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32006R1924)); no disease claims for any product ([ЗЛПХМ чл. 290(2)](https://lex.bg/laws/ldoc/2135549536)); therapeutic-fasting advertising ban ([ЗЗ чл. 169](https://lex.bg/laws/ldoc/2135489147)) | None (gyms are not medical establishments) | Claims provable, health risks stated (Arts 8, 16) ([Mar 2024 file](https://www.nss-bg.org/wp-content/uploads/2024/03/kodeks.docx)) | Meta ads: no side-by-side weight-loss images ([22 Jul 2026](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/health-wellness/)); TikTok: no weight-loss branded content; "fast or dramatic results" ineligible for For You ([30 Oct 2026](https://www.tiktok.com/legal/page/global/bc-policy/en); [24 Sep 2026](https://www.tiktok.com/community-guidelines/en/mental-behavioral-health)) | Reach of ЗЗ чл. 169 to nutrition coaching; scope of Meta's fitness-class exception (paraphrased) |
| Beauty salons | No implying procedures they may not lawfully perform ([ЗЗП чл. 68ж т. 4](https://lex.bg/laws/ldoc/2135513678)); cosmetics pictures and claims must not mislead ([Reg. 1223/2009 Art. 20, 2009](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009R1223); [Reg. 655/2013, 2013](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32013R0655)); explicit consent for treatment footage ([КЗЛД, 12 Feb 2026](https://cpdp.bg/%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%B8%D1%89%D0%B5-%D0%B7%D0%B0-%D0%BA%D0%BE%D0%BC%D0%B8%D1%81%D0%B8%D1%8F%D1%82%D0%B0-%D0%B7%D0%B0-%D0%B7%D0%B0%D1%89%D0%B8%D1%82%D0%B0-%D0%BD%D0%B0-%D0%BB%D0%B8-2/)) | None, unless a doctor practises there | Cosmetics guidance on before/after and edits ([undated](https://www.nss-bg.org/rakovodni-principi-za-kozmetichni-produkti/)) | TikTok: needle procedures not marketable by default (verified business accounts excepted in some regions); no branded content for "Cosmetic clinics", including laser hair removal ([24 Sep 2026](https://www.tiktok.com/community-guidelines/en/regulated-commercial-activities); [30 Oct 2026](https://www.tiktok.com/legal/page/global/bc-policy/en)); Meta ads 18+ for cosmetic procedures ([22 Jul 2026](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/health-wellness/)) | Which procedures salons may lawfully perform (primary medical standard not checked) |
| Dental clinics | "Търговска реклама" ban ([ЗЗ чл. 190(2)](https://lex.bg/laws/ldoc/2135489147)); price list on premises and website ([ЗЛЗ чл. 98(3)](https://lex.bg/laws/ldoc/2134670848)); no medicine advertising by dentists ([ЗЛПХМ чл. 246(5), 248а](https://lex.bg/laws/ldoc/2135549536)); agency co-liability ([ЗЗК чл. 32(2)](https://lex.bg/laws/ldoc/2135607845)); explicit consent for patient images ([GDPR Art. 9, 2016](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679)); no blanket online ban ([CJEU C-339/15, 2017](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:62015CJ0339)) | БЗС code: profiles allowed; no prices or promotions online; no laudatory, comparative or misleading content; the dentist answers for the agency (чл. 9–10а); written consent to disclose patient facts (чл. 25(2)) ([amended 2017](https://lex.bg/laws/ldoc/2135896489)) | Testimonials genuine, verifiable, consented (Art. 12) | TikTok organic: licensed medical services not marketable by default, re-admitted "in some regions" for verified business accounts (Bulgaria unchecked); educational content allowed; branded content prohibited; dental surgery "not allowed" in Bulgaria ([24 Sep 2026](https://www.tiktok.com/community-guidelines/en/regulated-commercial-activities); [30 Oct 2026](https://www.tiktok.com/legal/page/global/bc-policy/en)); GBP: no health or medical-device promotions | Meaning of "търговска реклама"; the price-list duty against the price ban; before/after smiles under the laudatory ban |
| Aesthetic and medical clinics | As for dental, plus no public or online advertising of prescription medicines such as botulinum toxin ([ЗЛПХМ чл. 247, 248а](https://lex.bg/laws/ldoc/2135549536)) and no misleading filler claims or pictures ([MDR Art. 7, consolidated 10 Jan 2025](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02017R0745-20250110)) | БЛС code: no use of name or skills for advertising (чл. 14); secrecy over illustrative material, anonymised teaching only (чл. 52, 54); fee minimum (чл. 57) ([amended 2013](https://lex.bg/laws/ldoc/1598070784)) | Cosmetics guidance; testimonials (Art. 12) | Meta ads: no side-by-side for wrinkle treatments "such as Botox", 18+ ([22 Jul 2026](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/health-wellness/)); Meta prescription-drug ads only in US, Canada, New Zealand ([26 Feb 2025](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/drugs-pharmaceuticals/)); TikTok: invasive procedures not marketable by default (same verified-account exception), surgery videos ineligible for For You | Whether a generic mention of "ботулинов токсин" is medicine advertising; who enforces ЗЗ чл. 190(2) |
| Car detailing, repair and dealers | Prices in euro with all taxes, prior-price rule, no bait advertising ([ЗЗП чл. 19, 63–66, 68ж](https://lex.bg/laws/ldoc/2135513678)); customers' faces are personal data, and plates linked to owners likely are ([GDPR Art. 4(1), 2016](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679); plates are inference) | None | Claims provable (Art. 8) | No sector-specific rule found in the sources checked | Advertising rules for leasing and consumer credit were not researched |
| Real estate agencies | Energy indicator in all ads where a certificate exists ([ЗЕЕ чл. 34(4), 41(3)](https://lex.bg/laws/ldoc/2136500695)); indicator and class in online ads ([EPBD 2024/1275 Art. 20(4), 2024](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024L1275)); no misleading presentation, bait listings or false scarcity ([ЗЗП чл. 68д, 68ж т. 5–7, 18](https://lex.bg/laws/ldoc/2135513678)); corrective ad can be ordered from the agency (чл. 68л(3)) | None | General code | No sector-specific rule found in the sources checked | Bulgarian transposition of 2024/1275; enforcement of the ЗЕЕ duty; broker-licensing bills |
| Home improvement and interiors | Before/after must not mislead by overall presentation ([ЗЗП чл. 68д(1)](https://lex.bg/laws/ldoc/2135513678)); green claims need proof (чл. 68ж т. 28–31); clients' homes and belongings as personal data ([GDPR, 2016](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679)) | None | General code | GBP media must be captured at the location ([undated](https://support.google.com/contributionpolicy/answer/7411351?hl=en)) | No sector-specific rule found |
| Specialty retail | Prices in euro, prior-price rule, one-month limit on sales ([ЗЗП чл. 19, 63–66](https://lex.bg/laws/ldoc/2135513678)); wine and spirits shops under [ЗЗ чл. 55](https://lex.bg/laws/ldoc/2135489147); tobacco and vape shops under [ЗТТСТИ чл. 35](https://lex.bg/laws/ldoc/2133117441); cosmetics claims ([Reg. 1223/2009, 2009](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009R1223)) | None | General code; spirits norms for drinks retailers | TikTok branded alcohol only via approved brands; vitamin-supplement branded content not allowed in Bulgaria ([30 Oct 2026](https://www.tiktok.com/legal/page/global/bc-policy/en)); GBP: no alcohol or tobacco promotions | Whether a wine shop's reel featuring rakia or brandy is direct spirits advertising (on the statute's face, yes) |

| Issue (all sectors) | Statute (BG and EU) | Regulator or authority guidance | Self-regulation | Platform policy | Uncertain or untested |
|---|---|---|---|---|---|
| Customers on camera | [Constitution Art. 32(2)](https://lex.bg/laws/ldoc/521957377); [GDPR Arts 6, 7, 9, 2016](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679); [ЗЗЛД чл. 25з(5)](https://lex.bg/laws/ldoc/2135426048), doubtful for ads; [ЗАПСП чл. 13](https://kttc.tu-sofia.bg/wp-content/uploads/2025/03/1_9_ЗАКОН-ЗА-АВТОРСКОТО-ПРАВО-С-ИЗМЕНЕНИЯТА-ОТ-2024.pdf) | [EDPB 1/2024 v2.0, 10 Nov 2026](https://www.edpb.europa.eu/system/files/2026-11/edpb_guidelines_202401_legitimateinterest_v2_en.pdf); [EDPB 05/2020, May 2020](https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines_202005_consent_en.pdf); КЗЛД opinion, 12 Feb 2026 | Testimonials (Art. 12) | Meta privacy reports only by the person shown ([undated](https://www.facebook.com/help/428478523862899)); TikTok privacy form ([undated](https://www.tiktok.com/legal/report/privacy?lang=en)) | Consent or legitimate interests for promotional videos; whether a venue is an "обществено място" |
| Staff on camera | GDPR; no Labour Code provision ([КТ](https://lex.bg/laws/ldoc/1594373121)) | EDPB 05/2020, paras 21–23 | – | – | No Bulgarian authority on employee images or on removal after departure |
| Children | [ЗЗДет чл. 11а, 45(12)](https://lex.bg/laws/ldoc/2134925825); [ЗЗЛД чл. 25в](https://lex.bg/laws/ldoc/2135426048); [КТ чл. 301–303](https://lex.bg/laws/ldoc/1594373121) | КЗЛД practice: parental consent and faces hidden ([annual report 2024, Mar 2025](https://cpdp.bg/wp-content/uploads/2025/03/Annual-report_2024_CPDP.pdf)) | – | TikTok: accounts 13+; adult accounts featuring children must be clearly adult ([24 Sep 2026](https://www.tiktok.com/community-guidelines/en/youth-safety)) | Whether an image is "сведения и данни"; whether both parents must consent; permits for unpaid one-off appearances |
| Music | [ЗАПСП чл. 18(2) т. 8, 22б, 24(1) т. 2б, 42](https://kttc.tu-sofia.bg/wp-content/uploads/2025/03/1_9_ЗАКОН-ЗА-АВТОРСКОТО-ПРАВО-С-ИЗМЕНЕНИЯТА-ОТ-2024.pdf); [DSM Directive Art. 17, 2019](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32019L0790) | Collecting societies: [Musicautor](https://www.musicautor.org/images/dokumenti/musicautor/Ustav_MUSICAUTOR.pdf) (statute, 17 Mar 2025) and [PROPHON](https://www.prophon.org/en/faq) (undated) do not license commercial sync | – | [Meta Music Guidelines, 26 Mar 2024](https://www.facebook.com/legal/music_guidelines); [Sound Collection, Meta-only, 16 Mar 2022](https://www.facebook.com/sound/collection/terms/); [TikTok EEA Business Terms 5(c), Jul 2025](https://www.tiktok.com/legal/business-terms-eea?lang=en); TikTok library usable only on TikTok | YouTube Audio Library business terms; the conflicting Shorts-block pages; library tiers for agencies |
| Giveaways | [ЗХ чл. 2, 3, §1 т. 1](https://lex.bg/laws/ldoc/2135783265); [ЗЗП чл. 68ж т. 19–20](https://lex.bg/laws/ldoc/2135513678) | No NRA guidance found | Section A of the code | Facebook: no share, repost or tag mechanics ([undated](https://www.facebook.com/policies_center/pages_groups_events/)); TikTok: no alcohol prizes in ads | Purchase-linked draws under "под друга форма" |
| Paid creators | [ЗЗП чл. 68е(2), 68ж т. 11, 22](https://lex.bg/laws/ldoc/2135513678) | No CEM (media regulator) guidance found | Code Art. 9.6; [influencer recommendations, 2020](https://www.nss-bg.org/preporaki-za-influensar-marketing/) | TikTok disclosure toggle ([30 Oct 2026](https://www.tiktok.com/legal/page/global/bc-policy/en)); Instagram branded-content tool ([1 Jan 2025](https://help.instagram.com/581066165581870)) | Meta's Branded Content Policies could not be retrieved |
| Drones | [Reg. 2019/947, 2019](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32019R0947) | ГД ГВА: registration; insurance for commercial flights ([FAQ, undated](https://www.caa.bg/bg/category/633/29605)) | – | – | Official zone map not found; later amendments not re-read |

### Conclusion

The table ranks platforms for each sector by customer age. It is inference: it combines the age data in the first section, the sector evidence in the third and the platform rules in the fourth, and its confidence is no higher than the weakest of them, which for TikTok's age profile is low.

| Sector | Likely core customers (inference) | Customers 18–34 | Customers 35–54 | Customers 55+ | Always-on layer | Main caveat |
|---|---|---|---|---|---|---|
| Restaurants and cafés | 18–44, all ages for family venues | 1 Instagram, 2 TikTok, 3 Facebook | 1 Facebook, 2 Instagram, 3 TikTok | 1 Facebook | GBP photos and reviews; Viber for bookings | No spirits-led content on any platform; GBP bars alcohol promotions; TikTok may keep drinking scenes out of For You |
| Hotels and guest houses | 30–64, plus foreign guests | 1 Instagram, 2 TikTok, 3 YouTube | 1 Facebook, 2 Instagram, 3 YouTube | 1 Facebook, 2 YouTube | GBP rooms and reviews (no offer posts) | Older travellers lean on travel sites; English captions for foreign markets |
| Fitness studios and gyms | 18–44 | 1 Instagram, 2 TikTok, 3 Facebook | 1 Instagram, 2 Facebook, 3 TikTok | 1 Facebook | GBP; Viber for members | Weight-loss content restricted on TikTok and in Meta ads |
| Beauty salons | Mainly women 18–54 | 1 Instagram, 2 TikTok, 3 Facebook | 1 Instagram, 2 Facebook | 1 Facebook | Booking-platform link; GBP; Viber and VibeMarket | Needle procedures not marketable on TikTok by default; no Bulgarian benchmark account |
| Dental and aesthetic clinics | 25–64 and older | 1 Instagram, 2 Facebook, 3 YouTube | 1 Facebook, 2 Instagram, 3 YouTube | 1 Facebook, 2 YouTube | GBP reviews | TikTok bars marketing licensed medical services and needle procedures unless the clinic is an authorised verified business account in an eligible region (Bulgaria unchecked), though education is allowed; legal review of every post |
| Car detailing, repair and dealers | Mainly men 18–54 (inference) | 1 TikTok, 2 Instagram, 3 YouTube | 1 Facebook, 2 TikTok, 3 YouTube long-form | 1 Facebook | GBP for workshops; Viber and VibeMarket | TikTok success proven only for dealers; nothing links workshop video to enquiries |
| Real estate agencies | Buyers and sellers 30–65+ | 1 Instagram, 2 TikTok, 3 Facebook | 1 Facebook, 2 YouTube, 3 Instagram | 1 Facebook, 2 YouTube | Portals; GBP; listing reference codes | Views do not map to leads (one broker's "one client per 50,000 views") |
| Home improvement and interiors | Homeowners 30–64 | 1 Instagram, 2 TikTok | 1 Facebook, 2 Instagram, 3 YouTube | 1 Facebook | GBP reviews and project photos | Pinterest is unmeasured in Bulgaria |
| Specialty retail | Varies by shop | 1 TikTok, 2 Instagram | 1 Facebook, 2 Instagram | 1 Facebook | GBP; Viber | Wine and spirits shops carry the alcohol limits |

The binding constraint on this business is legal fit, not reach. The platform gaining audience fastest, TikTok, is also the one whose own rules most restrict the agency's highest-value regulated clients: by default it bars organic marketing of licensed medical services, needle procedures and alcohol, and re-admits them only for verified business accounts in regions it does not name. It also prohibits paid creator content for clinics and weight loss, and limits branded alcohol content to creators invited by approved brands. A client portfolio therefore splits into TikTok-friendly clients (car dealers and detailers, specialty retail, restaurants without spirits, interiors, non-invasive salons) and Facebook-and-Google-led clients (clinics, property, hotels with older guests), and the two need different production plans and different promises. The platforms' originality rules, meanwhile, favour exactly what a filming-first agency makes, footage commissioned by the owner and uploaded natively, and penalise the shortcuts agencies take under deadline pressure: one file pushed to several Pages, a TikTok download reposted as a Reel, a watermark left in.

The law also names the agency itself, which turns compliance from overhead into part of the product. The agency is co-liable for misleading adverts it prepared under the competition act, can be ordered to publish corrective adverts under the consumer act, is bound by TikTok's EEA business terms as an administrator of business accounts, and acts for a dentist who answers for whoever runs the practice's profile. A pre-publication check for each regulated sector, a consent register for every featured person and a licence record for every track are what make a monthly retainer defensible. And because every sector's evidence ties social video to discovery rather than purchase, the monthly report should lead with enquiries the client can count, such as listing codes, booking clicks, Viber messages and new reviews; reach figures, now inflated by YouTube's new view counting, become supporting detail.

### Gaps

| Gap | Why it matters | What would close it |
|---|---|---|
| No verified Bulgarian age split for TikTok; no age data for YouTube; no Pinterest audience figure | TikTok's ranking for customers over 35 rests on arithmetic; YouTube is the largest ad audience; Pinterest matters for interiors | DataReportal's slide decks; audience estimates in TikTok, Google and Pinterest ad tools for Bulgaria |
| No Bulgarian survey of how people find restaurants, salons, clinics or services, and no Bulgarian figures for Google Maps' share of navigation, Apple Maps or AI tools | GBP's priority rests on search share and US surveys | A short client-side survey, or pooled GBP performance data across clients |
| Viber Business Account availability in Bulgaria unconfirmed; VibeMarket's scale unknown | Viber is proposed as the retention layer | Try creating an account; ask myPOS for merchant numbers |
| Official specs not retrievable: TikTok's maximum length and organic safe zones, a Facebook posting frequency, a GBP post character limit; Nearby not confirmed for Bulgaria | They set the master-edit and posting rules | Logged-in reads of the JavaScript-only help pages |
| Thin Bulgarian sector evidence: no sector surveys; no verified salon, café or guest-house account; most Instagram and Facebook counts unreadable; no data linking views to enquiries | Sector claims lean on US vendor studies | A logged-in profile audit; the client interviews framed in spec/research/01 |
| No benchmark for videos per visit or for how long content stays useful | Yields in this report are inference | Track the agency's own first three months of shoots |
| No РЗИ, Ministry of Health or court guidance on venues' own posts under the spirits ban; cocktails below 15% unresolved | The main legal risk for bars and drinks shops | A written query to the authorities; a Bulgarian lawyer's opinion |
| No definition or enforcement practice for "търговска реклама"; no ИАЛ guidance on clinic posts; no published БЗС or БЛС disciplinary cases on social media | Clinics are high-value and high-risk clients | Queries to the ethics commissions and ИАЛ; a legal opinion |
| Transposition of EPBD recast Art. 20(4) unverified; broker-licensing bills unchecked; ЗЕЕ enforcement unknown | Captions for every property post | parliament.bg and strategy.bg; the energy-efficiency agency (АУЕР) |
| Tourist-tax display in hotel prices unverified | Hotel price posts | The local-taxes act (ЗМДТ) and КЗП practice |
| No NRA position on free or purchase-linked giveaways | A common tactic for every sector | NRA guidance or a written query |
| Children: whether an image is "сведения и данни", whether both parents must consent, whether unpaid one-off appearances need permits | Family restaurants, gyms with children's classes, hotels | Guidance from the State Agency for Child Protection and the Labour Inspectorate |
| Meta's Branded Content Policies, its organic Community Standards on regulated goods and Instagram's promotion guidelines not retrieved | Creator collaborations and organic health content on Meta | A logged-in re-fetch |
| Whether Bulgaria is among the regions where TikTok lets verified business accounts market medical services, cosmetic procedures and alcohol, and how authorisation works | Decides whether clinics and bars can use TikTok for more than education and atmosphere | TikTok's verified-business authorisation process and a test application by one client |
| YouTube Audio Library licence terms; conflicting Shorts-block pages; Artlist's agency tier, Soundstripe's market-area limit and Uppbeat's terms | The music policy for every video | YouTube Studio sign-in; written confirmation from the libraries |
| Not researched: Copyright Act amendments after Aug 2024; advertising rules for leasing and consumer credit (car dealers); Meta's housing-ad rules | Completeness for dealers and property | Targeted follow-up research |

---

## Part 5. Outreach, Google Business Profile, channels and contract basics

The legal and practical ground for the go-to-market plan in `spec/research/04-go-to-market-and-validation.md`, for Bulgaria.

- **Prepared:** 2026-11-18. This is research, not legal or tax advice. Section 5 lists the points a Bulgarian lawyer and accountant should confirm before launch.
- **Method:**
  - Official texts were downloaded on 2026-11-18: consolidated laws on lex.bg, and pages from КЗП, КЗЛД, EUR-Lex, the EDPB, Google Help, LinkedIn, Meta, NSI and БТПП.
  - Bulgarian quotations are copied from the downloaded text.
  - Interpretations are marked as mine ("my reading").
- **Limits:**
  - The session's web-search budget ran out partway through.
  - After that, sources were reached only by known URLs and by following links on official sites. No further searching was done.
  - This mostly affects section 3: I found no Bulgaria-specific survey on how SMEs choose marketing providers.
- **Builds on:** `spec/research/01` (market data), `spec/research/03` (legal constraints), `docs/research/05` (measured keyword volumes) and `docs/research/06-service-terms-evidence.md` (competitor terms).

---

### 0. Answers in brief

| # | Question | Short answer | Confidence |
|---|---|---|---|
| 1 | May Hera email other businesses without prior consent? | **Yes, to businesses (B2B), under conditions:** check each address against the КЗП register, mark the email as unsolicited on arrival, identify the sender, give an opt-out address, and honour every refusal. **No, to consumers** (private individuals): that needs prior consent, by email, SMS, messenger or phone. A named employee's work address is personal data, so GDPR also applies: legitimate interest is usable, with a notice at the first contact and an unconditional right to object. | High on the statutes; medium on how they apply to sole traders and DMs |
| 2 | Can Hera have a Google Business Profile without a storefront? | **Yes, as a service-area business,** because it travels to clients to film. The home address must be hidden, with up to 20 service areas no more than about 2 hours' drive from base. Online-only agencies and lead-generation businesses are ineligible. Video verification asks for proof of management, such as filming yourself performing the service or showing a business document (permit, invoice, utility bill) in the profile's name, so register the company first. Reviews: ask every client, with no incentives, no selective asking and no reviews from staff, family or partners. | High (Google's own text) |
| 3 | How do Bulgarian SMEs find marketing providers? | **No Bulgaria-specific survey was found.** Indirect evidence fits the plan's order. Measured Google demand for the service is small (about 750-800 searches a month nationally). An organised referral market exists (BNI Bulgaria: 15 chapters, 400+ owners). Facebook has by far the largest reach (3.60m), against 1.60m registered LinkedIn members. Directories mostly show supply (Clutch lists 177 Bulgarian social media firms). Chambers (БТПП plus 27 regional chambers) are better for networking than for direct lead flow. | Low to medium (no direct survey) |
| 4 | VAT, invoices and contracts | **VAT registration is mandatory above 51,130 EUR of taxable turnover in a calendar year,** with 7 days to apply (ЗДДС art. 96, in force 01.01.2026). Registration under art. 97а can be triggered earlier by buying services from abroad, such as ads or software. Invoices may use any currency, but the tax base and VAT must be in euro. The contract must set out the scope, term and notice, and a licence of the footage: by default copyright stays with the author, and an unspecified licence is non-exclusive, lasts 3 years and covers Bulgaria only. It also needs image releases, a data processing agreement and a liability cap (which cannot cover intent or gross negligence). The most common published minimum term is 3 months, with 1 month's notice. | High on the statutes; contract drafting needs a lawyer |

---

### 1. Unsolicited commercial communications

#### 1.1 The rule map

| Channel | Generic company address or line (`office@`, the main business number) | Named employee at a company (`ivan.petrov@firma.bg`) | Sole trader (ЕТ) or freelancer acting for the business | Consumer (private individual) |
|---|---|---|---|---|
| **Email** | **Allowed without consent** (ЗЕТ art. 6): not in the КЗП register, labelled as unsolicited, sender identified, opt-out address. GDPR barely engaged, since a generic address is not personal data. | Same as left, **plus GDPR**: legitimate interest, an Art. 14 notice at first contact, and the Art. 21 right to object. | **Grey.** Not a "consumer" when acting for the business, and outside the register's legal scope, but КЗП's form accepts ЕТ. GDPR applies. Treat like a named employee and check the register anyway. | **Prior consent required** (ЗЕТ art. 6(4); ЗЕС art. 261(1)). |
| **Phone call (live or automated)** | Not caught by the ЗЕС consent rule, which protects "потребители" (consumers). Identify yourself and accept a refusal. | Same, plus GDPR. | Grey, especially when the number is the owner's personal mobile. | **Prior consent required** (ЗЕС art. 261(1): "повиквания … със или без човешка намеса"). |
| **SMS, messenger, social DM** | As for calls under ЗЕС ("съобщения"), plus each platform's rules (1.5). Whether a DM counts as "електронна поща" under ЗЕТ is unclear. | Same, plus GDPR. | Grey. | **Prior consent required.** |
| **Letter or in-person visit** | Outside the ePrivacy rules (EDPB GL 1/2024, para 116). GDPR applies only to the records Hera keeps. | GDPR for the records. | GDPR for the records. | No ePrivacy consent needed; GDPR for the records. |

The plan's order fits this map: warm relationships and referrals first, then research-based prospecting with "individualized, truthful pitches". The plan already says to avoid "mass unsolicited campaigns", and that is where the legal, platform and deliverability risks pile up.

#### 1.2 Закон за електронната търговия (ЗЕТ): art. 6 and the КЗП register

**Text.** Consolidated on lex.bg, last amended by ДВ бр. 55 of 16.06.2026: <https://lex.bg/laws/ldoc/2135530547>.

> Чл. 6. (1) Доставчик на услуги, който изпраща непоискани търговски съобщения по електронната поща без предварително съгласие на получателя, е длъжен да осигури ясното и недвусмислено разпознаване на търговското съобщение като непоискано още с постъпването му при получателя.
> (2) (Изм. - ДВ, бр. 105 от 2006 г., в сила от 24.12.2006 г.) Комисията за защита на потребителите води електронен регистър на електронните адреси на юридическите лица, които не желаят да получават непоискани търговски съобщения, по ред, определен с наредба на Министерския съвет.
> (3) Забранява се изпращането на непоискани търговски съобщения на електронни адреси, вписани в регистъра по ал. 2.
> (4) Забранява се изпращането на непоискани търговски съобщения на потребители без предварителното им съгласие.

- **"Потребител".** ЗЕТ § 1, т. 4 refers to ЗЗП § 13, т. 1: "всяко физическо лице, което придобива стоки или ползва услуги, които не са предназначени за извършване на търговска или професионална дейност…" (<https://lex.bg/laws/ldoc/2135513678>). So the consent requirement in art. 6(4) protects private individuals, not businesses.
- **Art. 5(3): every commercial communication** must "да бъдат лесно разпознавани като търговски" and "да позволяват ясна индентификация на физическите или юридическите лица, от името на които са направени".
- **Art. 4: provider information.** An information-society provider must give easy access to its name, address, contact email and phone, its registration in a public register and its VAT status. This matters before the company is registered (1.8).
- **Penalties (art. 24) for breaching art. 6(1), (3) or (4):**
  - Individuals: a fine of 250-1,500 лв (about 128-767 EUR).
  - Legal entities and sole traders: a property sanction of 500-2,000 лв (about 256-1,023 EUR).
  - Repeat offences: a fine of 500-2,500 лв for individuals, and a property sanction of 1,000-4,000 лв (about 511-2,045 EUR) for companies and sole traders.
  - КЗП enforces the act (art. 20, art. 25).
  - The law still states amounts in лв. Under the euro changeover, лв values in existing legal instruments are read as euro at 1.95583 (evroto.bg business FAQ, <https://evroto.bg/bg/euro/business/faq>).

**The register.** It is set up by the *Наредба за водене на електронен регистър на електронните адреси на юридическите лица, които не желаят да получават непоискани търговски съобщения*: ПМС № 235 of 01.10.2009, ДВ бр. 80/2009, last amended by ДВ бр. 99 of 30.10.2026 (<https://lex.bg/laws/ldoc/2135647445>).

| Question | Answer | Source |
|---|---|---|
| Who keeps it? | The Commission for Consumer Protection (КЗП): "води и поддържа регистър … и осъществява дейности по вписванията в него". | Наредба art. 2(1) |
| Does it cover legal entities? | Yes, only them: "В регистъра … се вписват: 1. юридически лица; 2. чуждестранни юридически лица." An entry holds the ЕИК, name, legal form, seat and a "списък на електронните адреси и/или домейн имена". A whole **domain** can therefore be registered, which covers every address on it. КЗЛД opinion П-7552/2014 describes exactly this: once a company registered its domain, every personal address on that domain appeared in the register. | Наредба arts. 3-4; КЗЛД opinion of 31.01.2014 |
| And sole traders? | Not in the ordinance's text. **But КЗП's online application form lists "ЕТ"** among the legal forms, next to АД, ООД, ЕООД, НПО and others. Sole-trader addresses may well be in the register. | <https://kzp.bg/bg/elektronno-podavane-na-zayavlenie> (checked 2026-11-18) |
| Is it public? | Yes. Access is "свободен и безплатен" through КЗП's website. | Наредба arts. 5, 14 |
| Must senders check it? | The law does not say "check", but art. 6(3) forbids sending to registered addresses and art. 24 fines it. **In practice every unsolicited commercial email to a business has to be checked first.** Protection runs from the registration date ("защитени към датата на регистрация"), so re-check before each send. | ЗЕТ arts. 6(3), 24; <https://kzp.bg/bg/kakvo-se-sluchva-sled-podavane-na-zayavlenie> |
| How to check | КЗП's free form at <https://kzp.bg/bg/proverka-na-e-adres> takes one address or a list ("Лимит на заявката за проверка: 100 000 email-а на заявка") and confirms any that are registered. No login is needed. | Checked 2026-11-18 |

#### 1.3 Закон за електронните съобщения (ЗЕС): calls, SMS, email

**Text.** Consolidated on lex.bg, last amended by ДВ бр. 66 of 21.07.2026: <https://lex.bg/laws/ldoc/2135553187>.

> Чл. 261. (1) (Изм. - ДВ, бр. 105 от 2011 г., в сила от 29.12.2011 г.) Осъществяването на повиквания, съобщения или електронна поща със или без човешка намеса за целите на директния маркетинг и реклама се позволяват само при предварително получено съгласие на потребителя. Съгласието може да бъде оттеглено по всяко време.

- **Who is protected.** § 1, т. 49, as amended by ДВ бр. 20/2021: "Потребител" е физическо лице, което ползва или заявява ползване на обществена електронна съобщителна услуга за цели, излизащи извън обхвата на неговото занятие, стопанска дейност, служба или професия. The broader "Ползвател" (т. 48а: "физическо или юридическо лице") is **not** the word art. 261(1) uses. **My reading:** the consent rule covers calls, messages and email to private individuals, not to businesses or to people contacted in their work capacity.
- **Fit with EU law.** This matches the ePrivacy Directive art. 13(5): "Paragraphs 1 and 3 shall apply to subscribers who are natural persons." For other subscribers, member states must ensure their "legitimate interests … are sufficiently protected", which Bulgaria does through the ЗЕТ register (<https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02002L0058-20091219>).
- **Art. 261(2): soft opt-in.** A trader that obtained contact details in a sale may market its own similar products, if the customer can object free of charge at collection and later. This does not help with prospects.
- **Art. 261(5): applies to every marketing message, B2B included.** Sending is banned, "дори когато са изпълнени изискванията на ал. 1 и 2", if:
  1. "не може да се идентифицира лицето, което ги изпраща", or
  2. "съобщението не включва валиден адрес, на който получателят може да изпрати заявка за отказ", or
  3. the message breaks ЗЕТ art. 5(3), т. 1-4.
- **Enforcement.** The Communications Regulation Commission (КРС) enforces through officials authorised by its chair (arts. 21, 312(1), 337(2)). Fines:
  - Breaching art. 261(4), i.e. ignoring a refusal: 5,000-10,000 лв (about 2,556-5,113 EUR), under art. 340.
  - Other breaches: 500-5,000 лв (about 256-2,556 EUR), under the general art. 335.
  - Legal entities and sole traders pay property sanctions of the same size (art. 336).

#### 1.4 GDPR: legitimate interest for B2B prospecting

**Named person versus generic address.** The European Commission's examples list "an email address such as name.surname@company.com" as personal data. "An email address such as info@company.com" is listed as **not** personal data (<https://commission.europa.eu/law/law-topic/data-protection/data-protection-explained_en>, read 2026-11-18). Emailing `office@firma.bg` is therefore governed mainly by ЗЕТ and ЗЕС. Emailing `ivan@firma.bg`, or any sole trader, is also governed by GDPR.

**Can legitimate interest (Art. 6(1)(f)) cover it?** Yes in principle, but not automatically.

- **Recital 47:** "The processing of personal data for direct marketing purposes may be regarded as carried out for a legitimate interest." (<https://eur-lex.europa.eu/eli/reg/2016/679/oj>)
- **CJEU C-621/22, *KNLTB*, 4 October 2024 (ECLI:EU:C:2024:858):**
  - A commercial interest can be a legitimate interest if it is lawful.
  - The processing must be "strictly necessary".
  - The data subject's interests must not override it.
  - Particular weight goes to whether people "could reasonably expect" the processing (paras 48-49, 55; <https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62022CJ0621>).
- **EDPB Guidelines 1/2024 on Art. 6(1)(f), version 2.0, adopted 10 November 2026** (<https://www.edpb.europa.eu/system/files/2026-11/edpb_guidelines_202401_legitimateinterest_v2_en.pdf>):
  - **Para 108:** Recital 47 "does not mean that direct marketing always constitutes a legitimate interest".
  - **Paras 112-113:** first check national ePrivacy law. Where it requires consent for email, SMS or messenger marketing, legitimate interest cannot be used.
  - **Para 116:** "direct marketing addressed to legal persons" not involving personal data is governed only by ePrivacy law. Controllers should check national rules, which "may occasionally impose consent requirements … (e.g. with respect to direct marketing towards professionals)". On their face the Bulgarian texts do not (1.3).
  - **Paras 117-120:** case-by-case assessment. Less intrusive marketing is easier to justify. Relevant factors include the relationship with the person, the nature of the offer and whether the person would expect it.
  - **Para 121:** the Art. 21(2) objection to direct marketing is "unconditional".

**What Hera must do when a named person is involved:**

1. **Write down a one-page legitimate interest assessment before starting.** It covers purpose, necessity and the balancing test (EDPB paras 111-118).
2. **Use only business contact details the business itself publishes** for contact, on its website, Google profile or Facebook page. Contact people about something relevant to their role. No scraping (also banned by LinkedIn), no bought lists, no enrichment from private sources.
3. **At the first message, give the Art. 14 information**: who Hera is, the purpose, the legitimate interest, where the address came from, how long it is kept, and the person's rights. Art. 14(3)(b) requires it "at the latest at the time of the first communication to that data subject". A short paragraph plus a link to a prospect privacy notice is the usual form.
4. **State the right to object "clearly and separately from any other information"** (Art. 21(4)). Stop at once on objection (Art. 21(3)) and keep the address on a suppression list.
5. **Keep prospect data briefly.** For example, delete non-responders after a fixed period that the lawyer confirms.

**КЗЛД's own position.**

- **Site search of cpdp.bg on 2026-11-18** for "директен маркетинг", "служебна електронна поща" and "непоискани търговски съобщения": I found **no guidance specific to B2B prospecting**.
- **КЗЛД handles direct-marketing complaints under GDPR.** Example: decision of 16.11.2022 on complaint ППН-01-70/24.01.2022. A bank emailed a credit offer to a former customer; the complaint was upheld and the bank received an official warning under Art. 58(2)(b) for breaching Art. 24(1) (<https://cpdp.bg/%d1%80%d0%b5%d1%88%d0%b5%d0%bd%d0%b8%d0%b5-%d0%bf%d0%be-%d0%b6%d0%b0%d0%bb%d0%b1%d0%b0-%d1%81-%d1%80%d0%b5%d0%b3-%e2%84%96-%d0%bf%d0%bf%d0%bd-01-70-24-01-2022-%d0%b3/>).
- **Do not rely on КЗЛД's 2014 opinion П-7552/2014** (<https://cpdp.bg/%d1%81%d1%82%d0%b0%d0%bd%d0%be%d0%b2%d0%b8%d1%89%d0%b5-%d0%bd%d0%b0-%d0%ba%d0%b7%d0%bb%d0%b4-%d0%bf%d0%be-%d0%b2%d1%8a%d0%bf%d1%80%d0%be%d1%81%d0%b8-%d0%ba%d0%b0%d1%81%d0%b0%d0%b5%d1%89%d0%b8-15/>). It said that a personal email address alone "не съставлява лични данни". That predates GDPR and conflicts with the Commission's current example above.

#### 1.5 Platform rules for unsolicited business messages

| Platform | What the rules say (verbatim where quoted) | What it means for Hera |
|---|---|---|
| **LinkedIn.** User Agreement effective 3 November 2025 (<https://www.linkedin.com/legal/user-agreement>); Professional Community Policies (<https://www.linkedin.com/legal/professional-community-policies>). | **§8.1:** comply with "privacy laws, … anti-spam laws". Use your real name; one account. **§8.2, don'ts:** no scraping. Do not "Use bots or other unauthorized automated methods to access the Services, add or download contacts, send or redirect messages". **Policies:** "We don't allow untargeted, irrelevant, obviously unwanted, unauthorized, inappropriate commercial or promotional, or gratuitously repetitive messages … Do not use our invitation feature to send promotional messages to people you don't know." | Individual, relevant messages from a real personal profile are not banned. No automation tools, no sales pitch inside connection invitations to strangers, and no lifting contacts out of LinkedIn into a CRM. |
| **Meta: Facebook, Instagram, Messenger.** Community Standards "outline what is and isn't allowed on Facebook, Instagram, Messenger and Threads" (<https://transparency.meta.com/policies/community-standards/>). | **Spam policy** (<https://transparency.meta.com/policies/community-standards/spam/>): bans posting, engaging or creating assets "either manually or automatically, at very high frequencies". Lower-frequency accounts may be restricted when other spam signals appear. Also bans deceptive links. **Authentic Identity Representation** (<https://transparency.meta.com/policies/community-standards/authentic-identity-representation/>): no accounts "created or used to deceive others", and no impersonation. **Messenger Platform policy** (<https://developers.facebook.com/docs/messenger-platform/policy/policy-overview>): a business can message a person only inside a window opened by that person's action, normally 24 hours. | Write manually, at low volume, to a business's Page or Instagram account, from a real identity. No bots, no fake personas (the plan already rules these out). A Page cannot start conversations with people through Meta's messaging tools. |
| **Instagram.** | The old Community Guidelines URL (<https://help.instagram.com/477434105621119>) now redirects to Meta's Community Standards (observed 2026-11-18). I could not load Instagram's separate Terms of Use page. | Apply the Meta rules above. |
| **Facebook groups** | Each group sets its own rules. The Spam policy above applies on top. | Self-promotion only where the group's rules allow it. |

#### 1.6 The email provider's rule

Resend's Acceptable Use Policy (last updated 13 October 2026) applies to `contact@hera-editing.com`, whose replies leave through Resend (decision L32 in `docs/decisions.md`). Source: <https://resend.com/legal/acceptable-use>.

> "Spamming: You are prohibited from sending unsolicited messages of any kind, including cold outreach, purchased lists, or scraped contact data."
>
> "All mail must be sent to recipients who have explicitly opted in to receive communications from you."

So **outreach must never go through the site's Resend integration**: replies to enquiries are fine, cold first messages are not. Send first contacts by hand from an ordinary mailbox, one at a time, so the transactional domain's reputation is not put at risk.

#### 1.7 A workable outreach protocol (my synthesis, for the lawyer to review)

1. **Warm introductions first.** Ask the introducer to make the connection, so the first message is not cold.
2. **Research by hand.** Use only contact details the business itself publishes. Log the source URL and date for each contact (this is the Art. 14 "source").
3. **Before each send:**
   - Run the address through the КЗП check (<https://kzp.bg/bg/proverka-na-e-adres>).
   - Check Hera's own suppression list.
   - Confirm the recipient is a business, not a private person.
4. **Subject line marking.** Make it recognisable as unsolicited on arrival (ЗЕТ art. 6(1)), e.g. "Непоискано търговско съобщение: видеосъдържание за [фирмата]". KZP has published no guidance on the format; this is the literal reading.
5. **Body:**
   - The real sender: once registered, the company name, ЕИК and address; before registration, the founder's own name and contact details.
   - Why this business, with one specific observation.
   - The offer.
   - A plain opt-out: "Ако не желаете повече писма от нас, отговорете с „Не“ и няма да Ви пишем отново."
   - For named people: a two-line privacy note and a link to the prospect notice, including the right to object.
6. **Volume:** one message and at most one follow-up. No automated sequences. Calls only to published business numbers, in business hours: identify yourself, accept a "no" and log it.
7. **Social media:** manual messages from real profiles, low frequency, with no automation (1.5).

#### 1.8 What is uncertain

- **Sole traders and owners using personal email or phones for business.** They are not "consumers" when acting for the business (ЗЗП § 13; ЗЕС § 1 т. 49). They are outside the register's legal scope, yet КЗП accepts ЕТ registrations, and GDPR applies to them. No guidance was found.
- **Social DMs.** It is unclear whether a LinkedIn, Instagram or Facebook DM is "електронна поща" for ЗЕТ art. 6. If it is, the labelling and register rules apply. ЗЕТ § 1 т. 8 defines email broadly as "електронно средство за съхраняване и пренос на електронни съобщения през интернет мрежа чрез стандартизирани протоколи".
- **The ЗЕС consent rule.** Whether art. 261(1) reaches professionals rests on the 2021 definition change. The article itself is unchanged since 2011, and I found no КРС or КЗП guidance confirming the narrow reading.
- **Form of the "unsolicited" marking** required by ЗЕТ art. 6(1). There is no official guidance.
- **Outreach before the company is registered.** ЗЕТ art. 4, ЗЕТ art. 5(3) т. 2 and ЗЕС art. 261(5) т. 1 require the sender to be identified. Presenting an unregistered "Hera Editing" as a company could mislead, and acting for a company not yet formed may carry personal liability. A lawyer should confirm.

---

### 2. Google Business Profile for a service-area business without a storefront

Bulgaria is on Google's list of supported countries (<https://support.google.com/business/answer/6270107>, checked 2026-11-18).

#### 2.1 Eligibility

- **Who may have a profile.** "If your business either has a physical location that customers can visit, or travels to customers where they are, you can create a Business Profile on Google." (<https://support.google.com/business/answer/3038177>)
- **The core test.** "To qualify for a Business Profile, a business must make in-person contact with customers during its stated hours." (<https://support.google.com/business/answer/13763036>, the page the plan cites)
- **Ineligible examples** that matter here:
  - "Lead generation agents or companies."
  - "Brands, organizations, artists, and other online-only businesses."
  - "Any business whose address is listed as a P.O. box or mailbox in a remote location."
  - A virtual office: "If your business rents a physical mailing address but doesn't operate out of that location … that location isn't eligible."
  - A co-working desk, unless it "maintains clear signage, receives customers at the location during business hours, and is staffed during business hours by your business staff".

**Hera's fit (my reading).** On-site filming at clients' premises is "travels to customers where they are", so Hera qualifies as a **service-area business**. The editing and publishing are online-only work and do not qualify on their own. The profile must therefore describe a business that genuinely visits clients. Google decides eligibility, so some risk of suspension remains.

#### 2.2 Setting the profile up

| Item | Google's rule | For Hera |
|---|---|---|
| Address | "If you're a service-area business, you should hide your business address from customers. For example, if you're a plumber and run your business from your residential address, clear the address." | Enter the base address (it is needed for verification), then hide it. |
| Service area | "You can set up to 20 service areas based on the cities, postal codes, or other areas you serve." The area "shouldn't be more than about 2 hours of driving time from where your business is based". It cannot be set as a radius. (<https://support.google.com/business/answer/9157481>) | List the real filming radius by city or region. |
| One profile | "Service-area businesses can only have one profile for the whole area that they serve." | No city-by-city profiles. |
| Name | "Your name should reflect your business's real-world name, as used consistently on your storefront, website, stationery". No taglines, keywords or locations. Legal terms such as LLC need "real-world proof". | "Hera Editing" exactly as on the site and invoices. Not "Hera Editing: социални мрежи Пловдив". |
| Phone and website | "The phone number must be under the direct control of the business." Use a local number where possible, and no redirecting numbers or landing pages. | A business number you control. |
| Hours | Businesses "that operate only by appointment" are among those that "shouldn't provide hours". | Consider leaving hours out if filming is by appointment only. |
| Categories | "Choose the fewest number of categories it takes to describe your overall core business." | Pick the closest real category from Google's list. |

#### 2.3 Verification

- **Methods** (<https://support.google.com/business/answer/7107242>): phone or SMS, email, live video call, a video recording or a postcard. "Verification methods are automatically determined by Google and can't be changed." Review takes up to 5 business days.
- **Video recording for a service-area business** (<https://support.google.com/business/answer/14271705>). The video must show:
  - **Where the business operates.** Street signs or landmarks at the business address; "If you run a service-area business from your home, you can record landmarks and signs in your immediate neighborhood".
  - **That the business exists.** "the professional tools, equipment, or products you use for work", such as cameras, lights or business cards.
  - **Proof of management.** "Record yourself performing a service … You can also show business documents like a business permit, invoice, or utility bill that matches the name on your Business Profile."
- **Format rules.** The video must be live, unedited, at least 30 seconds and recorded on a mobile device. It must not show ID, bank or tax numbers, or other people's faces.

**Implication.** Create and verify the profile after the company is registered, once there are documents such as invoices in the profile's name. A profile for a business that does not yet exist conflicts with "Reflect your business accurately".

#### 2.4 What is prohibited (beyond eligibility)

- **Misrepresentation.** Keyword-stuffed names, more than one profile per business, a virtual office or PO box, redirecting phone numbers or URLs.
- **Links and promotions in the description.** "No links of any type are allowed." Content that focuses on promotions or prices is not allowed either.
- **Personal information.** Content containing "contact information linked or associated with a name" is not allowed.
- **Impersonation** (Maps content policy, <https://support.google.com/contributionpolicy/answer/7400114>).
- **When Hera manages clients' profiles** (authorised representatives, 13763036). Hera must:
  - "Never claim a Business Profile without express consent from the business owner."
  - "Never make false, misleading, or unrealistic claims."
  - Work with the owner on verification.
  - Use the business's own phone and website.
  - Transfer ownership "immediately upon request".
  - Failure "may result in a suspension for the Business Profile and/or Google Account".

#### 2.5 Reviews: how they may and may not be collected

**Allowed** (<https://support.google.com/business/answer/3474122>, <https://support.google.com/contributionpolicy/answer/7400114>):

- Ask customers for genuine reviews through a Google review link or QR code. Google allows merchants to "Solicit or encourage the posting of content that does represent a genuine experience, without offering incentives".
- Reply to every review, including negative ones, politely and without sharing reviewers' private information.

**Not allowed:**

- **Incentives.** "Offering incentives, like free or discounted goods or services, in exchange for customers to post reviews, change reviews, or remove negative reviews … is strictly prohibited." A free month or discount for a review is out.
- **Selective asking.** "Discourage or prohibit negative reviews, or selectively solicit positive reviews from customers" (review gating). Ask every client, not only the happy ones.
- **Conflicts of interest.** Content "based on a conflict of interest … current or former employment, a contractual or consultory relationship, or other professional or personal affiliations … (such as industry competitors, familial relationships, etc.)". **No reviews from staff, family, friends, subcontractors or referral partners**, and no swapping reviews with partner studios.
- **Pressure and scripting.** Requiring or pressuring reviews "while on the premises", asking for "specific content", or setting staff quotas.
- **Fake engagement.** Paid reviews, reviews posted from several accounts by one person, and reviews not based on a real experience.

**Consequences** (<https://support.google.com/business/answer/14114287>): Google may block new reviews, unpublish existing ones, or "display a warning to let consumers know that fake reviews were removed".

**Consumer-law overlay for client work.** Under ЗЗП art. 68ж, т. 27 (in force 28.05.2022), it is always a misleading practice "да се предоставят фалшиви потребителски отзиви или препоръки или да се възлага на друго физическо или юридическо лице да предоставя фалшиви отзиви" (<https://lex.bg/laws/ldoc/2135513678>). Hera must never write or commission reviews for its consumer-facing clients.

---

### 3. How Bulgarian SMEs find and choose marketing providers: evidence

#### 3.1 What evidence exists

| Evidence | What it shows | Date | Strength |
|---|---|---|---|
| **Direct surveys of how Bulgarian SMEs choose marketing providers** | **None found.** The search budget ran out before Bulgarian sources such as ИАНМСП or chamber surveys could be checked. | — | Gap |
| Measured Google demand (`docs/research/05-keyword-research.md`, OpenSEO/DataForSEO, location Bulgaria) | The core cluster ("поддръжка на фейсбук страница/и" 720/590, "поддръжка на социални мрежи" 40, "управление на социални мрежи" 10) is about **750-800 searches a month nationally**, with almost no difficulty. Local agency terms add a little ("маркетинг агенция варна" 260, "рекламна агенция бургас" 170, mixed intent). | pulled 2026-11-11 | Strong for search demand. It implies most buyers do not start on Google. |
| NSI, *ICT usage and e-commerce in enterprises 2025* (<https://www.nsi.bg/en/press-release/ict-usage-and-e-commerce-in-enterprises-8879>) | Of enterprises with 10+ staff: **41.5% use social media** for business and **49.7% have a website**. Micro-firms are excluded. | released 05.12.2025 | Official. Shows a large pool with weak online presence; says nothing about provider choice. |
| DataReportal, *Digital 2026: Bulgaria* (<https://datareportal.com/reports/digital-2026-bulgaria>) | Facebook ad reach **3.60m**. LinkedIn **1.60m registered members** (29.0% of adults), which "are not directly comparable" with active-user figures. Instagram 1.95m and TikTok 2.63m (per `spec/research/01`). | late 2025 data | Good for platform reach, not for buying behaviour. |
| BNI Bulgaria (<https://bni.bg/bg/index>) | First chapter founded 1 December 2015. "15 активни дружества, в които членуват над 400 утвърдени бизнес собственици". BNI also claims "98% от фирмите разчитат на маркетинг чрез препоръки … само 3% от тях имат стратегия" (no method given). | read 2026-11-18 | An organised referral market exists. The 98% figure is a self-interested, unsourced claim. |
| Clutch, Bulgaria social media marketing (<https://clutch.co/bg/agencies/social-media-marketing>) | **177 companies** listed ("Ratings Updated: November 17, 2026"). | 2026-11-17 | Shows supply and competition, not where local SMEs buy. My inference: these directories mostly serve international buyers. |
| Sortlist, social media agencies in Bulgaria (<https://www.sortlist.com/social-media/bulgaria-bg>) | **22 agencies**, including **web studios selling social media to SMBs** (e.g. Sunrise Web Studio, Burgas; T&B Technology, Ruse). | read 2026-11-18 | Web studios are both potential partners and competitors. |
| БТПП regional chambers (<https://www.bcci.bg/council-bg-rcci-members.html>) | БТПП plus **27 regional chambers** in its Council of Chairs, from Благоевград to Ямбол. Membership is voluntary (direct, associated, honorary) (<https://www.bcci.bg/tradereg-members-bg.html>). Listed upcoming events are seminars and business missions, e.g. a NIS2 seminar on 19.11.2026 and missions in 2027 (<https://www.bcci.bg/payment_bcci/>). | read 2026-11-18 | Real networks. No evidence that they generate marketing-service deals. |

#### 3.2 Channel-by-channel assessment for the plan's order

1. **Warm referrals (plan #1): keep first.**
   - Evidence is indirect: small measured search demand, and an organised referral market (BNI).
   - Low legal risk: an introduction is a solicited contact.
   - Ask introducers to connect people by email, not to hand over lists (GDPR).
2. **Researched local outreach (plan #2): keep, within section 1.**
   - NSI shows more than half of 10+ staff firms have no business social media use, so visible gaps are easy to find. Micro-firms are not measured.
   - Visits and letters are legally simplest. Email to businesses works with the register check and labelling. DMs and calls work if manual and low-volume.
3. **Partnerships (plan #3).**
   - **Web studios** sell to the same SMBs, and some already sell social media (Sortlist). Agree written terms: referral fee and its invoicing and VAT, who owns the client, non-solicitation, quality, and no review swaps (Google's conflict-of-interest rule).
   - **Photographers and videographers.** Google's "видео заснемане" results are wedding and event studios (`docs/research/05`). That points to referral swaps for business clients they don't serve, and to extra filming capacity.
   - **Accountants** see SMEs monthly. That is a structural reason to test them, but no evidence of referral behaviour was found. Treat it as a hypothesis.
4. **Google Business Profile and SEO (plan #4).** Real but small demand (3.1). Set it up after registration (2.3). It serves the local searches ("агенция + град") better than city pages would.
5. **Paid ads (plan #5).** Out of scope here. Note one tax trap: buying Meta or Google ads may trigger VAT registration under art. 97а (4.1).

**Other channels:**

- **Facebook groups:** the largest audience (3.60m), but no verified evidence for local B2B selling. Test, and follow each group's rules.
- **LinkedIn:** a professional audience (1.60m registered). Likely better for B2B service owners and partners than for workshops or cafés (hypothesis).
- **Clutch and Sortlist:** a free profile is cheap, but expect little local lead flow.
- **Chambers and BNI:** test the base-city chamber and one BNI chapter as networking for partners and introductions; returns are unknown.

#### 3.3 What to measure, since the evidence is thin

Record the actual origin of every lead: who introduced them, outreach channel, Google or Business Profile, partner, event. The plan's tracking (`spec/research/04`, outreach experiment) already allows for this. After the first 10-20 conversations, the business's own numbers will be better evidence than anything published.

---

### 4. Commercial basics for monthly retainers (2026)

#### 4.1 VAT (Закон за ДДС)

Consolidated text on lex.bg, last supplemented by ДВ бр. 69 of 31.07.2026: <https://lex.bg/laws/ldoc/2135533201>.

- **Mandatory registration threshold: 51,130 EUR.**
  - Art. 96(1), as amended by ДВ бр. 115/2025, in force 01.01.2026: a person established in Bulgaria "е длъжно да се регистрира по този закон, когато годишният му оборот в страната, определен по реда на чл. 168в, надвиши националния праг от 51 130 евро".
  - **The period is the calendar year.** Art. 168в(1): "Годишният оборот в страната е общата сума от данъчните основи на извършените през календарната година … доставки".
  - **Apply within 7 days** of exceeding it (art. 96(6), т. 1).
  - Once over the threshold, invoices for supplies made between the day after the threshold was passed and registration must be issued within 5 days after the registration act is served (art. 113(4)).
  - Rough planning figure (my arithmetic): 51,130 EUR a year is about 4,260 EUR a month of total sales, e.g. 5-7 retainers at 600-850 EUR.
- **Voluntary registration** is allowed below the threshold (art. 100(1)). Whether it pays off depends on the clients' VAT status and Hera's input VAT on equipment. This is the accountant's call.
- **The trap: art. 97а.**
  - A business receiving services taxable in Bulgaria where the recipient owes the VAT (reverse charge, art. 82(2)) must register. Typical cases are ads bought from Meta or Google, stock or music licences, and software from suppliers established abroad.
  - It must apply "не по-късно от 7 дни преди датата, на която данъкът за доставката става изискуем" (art. 97а(1), (4)).
  - Supplying such services to businesses in other EU states also triggers it (art. 97а(2)).
  - A business registered only under art. 97а still may not show VAT on its own invoices (art. 113(9)).
  - **Ask the accountant before the first foreign ad or software purchase.**

#### 4.2 Invoicing in EUR

- **Currency.** Art. 114(5), in force 01.01.2026: "Сумите по фактурата могат да бъдат посочени в която и да е валута, при условие че данъчната основа и размерът на данъка се посочат в евро". Euro-only invoices are the simple choice.
- **Deadline.** Issue the invoice no later than **5 days** after the tax event or an advance payment (art. 113(4)).
- **Required content** (art. 114(1)): document name; a 10-digit sequential number; date; supplier and recipient details and identification numbers; description; quantity; price; tax base; and the VAT rate or "основанието за неначисляване на данък".
- **Before VAT registration.** Hera "нямат право да посочват данъка" on its invoices (art. 113(9)) and must state the ground for not charging VAT.
- **No dual BGN/EUR display.** Under ЗВЕРБ art. 15(1), dual display applies only to prices offered to consumers. Under art. 15(3), т. 5, it does not apply to invoices (art. 112(1) ЗДДС documents). Source: the government's euro portal, <https://evroto.bg/bg/euro/business/faq>, read 2026-11-18. So B2B quotes and invoices can be in euro only. From the euro date, accounting documentation is kept in euro (same FAQ).

#### 4.3 What the service contract should state

| Clause | What to state | Legal anchor |
|---|---|---|
| Parties and nature | Registered entity details (ЕИК, seat, representative). The contract is mixed: content production is *изработка* and account management is *поръчка*. | ЗЗД art. 258 (изработка), art. 280 (поръчка); <https://lex.bg/laws/ldoc/2121934337> |
| Scope | Per month: shoot days and hours; unique videos versus re-formatted versions; platforms; posts; captions; revision rounds; approval window and owner; reporting. **Exclusions:** ad budget, community management unless bought, 24/7 cover, crisis PR, guaranteed results. | Freedom of contract, art. 9; "Договорите имат сила на закон за тези, които са ги сключили" (art. 20а). Market practice in `docs/research/06` §5.3. |
| Term and notice | An initial term (see 4.6), then monthly with one month's written notice. **Write the early-exit terms out explicitly.** The statutory defaults differ: for *изработка*, "Ако има основателни причини, поръчващият може да се откаже от договора … като заплати … разходи, извършената работа и печалбата" (art. 268). For *поръчка*, the principal may withdraw but the agent keeps the right to "уговореното възнаграждение" (arts. 287-288). | ЗЗД arts. 268, 287, 288 |
| Termination for breach | The written-warning procedure: a "подходящ срок" with a warning that the contract will then count as terminated, in writing if the contract is written. There is no termination for an insignificant shortfall. | ЗЗД art. 87 |
| Fees and payment | Monthly in advance, in EUR, with the VAT statement for Hera's status. Travel beyond the radius, late-payment interest and rescheduling rules. | ЗДДС arts. 113-114 |
| IP in the footage | See 4.4. | ЗАПСП arts. 36, 41, 42, 62-63 |
| People filmed | See 4.5. | ЗАПСП art. 13; GDPR |
| Data protection | A data processing agreement (Art. 28 GDPR) where Hera handles personal data for the client: footage of customers or staff, comments and messages. The client's privacy notice should cover filming. | GDPR Art. 28 |
| Accounts and access | The client owns pages, ad accounts and the Business Profile. Hera gets delegated roles, never passwords. Offboarding means revoking access and returning materials. | Google rules for representatives (2.4); `spec/research/03` §5 |
| Liability | A cap such as the fees for the last N months for ordinary negligence. **It cannot cover intent or gross negligence:** "Недействителни са уговорките, с които предварително се изключва или ограничава отговорността на длъжника за умисъл или за груба небрежност" (art. 94). A penalty clause (неустойка) is allowed, but "Ако неустойката е прекомерно голяма … съдът може да намали нейния размер" (art. 92(2)). | ЗЗД arts. 92, 94 |
| Other | Confidentiality; force majeure and weather; no guarantee of results; the client is responsible for claims it approves; governing law; signature (a qualified e-signature works); the language is Bulgarian. | — |

#### 4.4 Intellectual property in the footage

Source: ЗАПСП, consolidated on lex.bg, <https://lex.bg/laws/ldoc/2133094401>.

- **Default ownership.** "Авторското право върху произведение, създадено по поръчка, принадлежи на автора на произведението, освен ако в договора за възлагане е предвидено друго." Absent other terms, "поръчващият има право да използва произведението без разрешение на автора за целта, за която то е било поръчано" (art. 42). Without a clause, the client gets use for the commissioned purpose only, such as social posting, and arguably not for TV, billboards or resale.
- **Licence defaults.** These are what Hera's licence clause must override.
  - "Отстъпването на изключително право … се извършва изрично и писмено. Ако липсва подобна уговорка, смята се, че е отстъпено неизключително право" (art. 36(4)).
  - **No term stated means 3 years** (art. 36(5)).
  - **No territory stated means the user's country**, i.e. Bulgaria for a Bulgarian client (art. 36(6)).
- **Hera's own chain of title.**
  - For employees, copyright stays with the author, while the employer has the exclusive right to use the work "за свои цели" (art. 41(1)-(2)).
  - For audiovisual works, the authors are the director, screenwriter and camera operator. They "сключват с продуцента писмени договори", which presume a transfer of exclusive exploitation rights to the producer (arts. 62-63).
  - **Hera needs written rights from every freelancer** before it can license the footage onward.
- **Moral rights.** The rights to be recognised as author and to be named "при всяко използване" are inalienable. Others, such as integrity, can be transferred "само изрично и в писмена форма" (arts. 15-16). The contract should cover editing and cropping by the client, and credits.
- **What to decide in the contract:**
  - Exclusive or non-exclusive licence; term; territory; media (organic, paid ads, website, print); modification rights.
  - Raw footage: who keeps it, for how long, whether it is handed over, and at what cost.
  - Hera's portfolio use, which needs the client's and the filmed people's permission.
  - Music and stock licences.

#### 4.5 Image rights of the people filmed

- **ЗАПСП art. 13(1).** For a photographic portrait of a person, "се изисква съгласието на изобразеното лице". Exceptions in art. 13(2):
  1. images taken in a person's public activity or in a public place;
  2. a person who is "само детайл в произведение, показващо събрание, шествие или пейзаж";
  3. a person paid to pose.
  
  Conditions of use can be agreed (art. 13(3)). Art. 13 speaks of photographs; for video, GDPR does the main work.
- **GDPR.** Identifiable people in footage are personal data (`spec/research/03` §3; EDPB SME guide). Points of care:
  - Staff, where consent in an employment relationship is delicate.
  - Customers, who need written releases or should not be identifiable.
  - Children, who need parental consent.
  - Bystanders.
- **Operationally:** use a short release form per person and per shoot, give a notice on site, keep records, and agree on removal on request. Roles must be clear: the client is usually the controller and Hera the processor for client footage, with Hera a controller for its own portfolio use. This needs the lawyer's text.

#### 4.6 Typical minimum terms published in the sector

From `docs/research/06-service-terms-evidence.md`, all pages checked 2026-11-07:

- **3 months as a hard minimum:**
  - SocialDany, on its monthly content plan: "Минимум 3 месеца", then 30 days' notice.
  - Silvia Zhivova Academy: "Договор се сключва за минимум 3 месеца".
- **3 months as the standard option:**
  - Netpeak: 3- or 6-month subscriptions.
  - EVOL: "стандартни тримесечни договори".
- **6 months:**
  - Nikolay Florov: price "при сключване на договор за 6 месеца".
  - Adline: 6 months, for monthly consulting only.
- **No minimum:** Wonder Digital, "работи се месец за месец", with one month's notice.
- **Notice:** every published notice period is about **one month**. A Bulgarian studio's buyer guide (3LS) calls one month "стандартен" and three months "прекалено обвързващо".

**Implication:** a recommended or minimum initial term of **3 months, then month-to-month with 1 month's notice**, matches the market. Under 4.3, the contract must spell out what is owed if a client leaves early.

---

### 5. Questions for a lawyer and an accountant (in priority order)

1. **Outreach scope.** Confirm the narrow reading of ЗЕС art. 261(1), consent only for consumers. Settle how to treat sole traders and owners who use personal phones or email for business. Settle whether DMs fall under ЗЕТ art. 6 (labelling, register check).
2. **ЗЕТ art. 6(1) marking.** Is a subject-line label enough or necessary? Approve the outreach template, the prospect privacy notice (Art. 14) and the legitimate interest assessment.
3. **Before registration.** Can the founder do outreach and sign pilots personally? With what identification, and with what liability for a company not yet formed?
4. **Contract.** Qualification (mixed *изработка* and *поръчка*). Whether a 3-month minimum and an early-exit fee can be enforced (arts. 268, 287-288, 92(2) ЗЗД). The liability cap (art. 94).
5. **IP.** Licence scope and term (to override the 3-year and territory defaults in art. 36). Moral rights and editing. Raw footage. Portfolio use. Freelancer contracts (arts. 42, 62-63 ЗАПСП).
6. **Filming people.** Legal basis for filming staff and customers, release forms, minors, and Hera's controller or processor role with a DPA.
7. **Accountant.** Voluntary VAT registration or not. Art. 97а before the first ad or software bought from abroad. A turnover watch for the 51,130 EUR calendar-year threshold. Invoice software issuing euro invoices with 10-digit numbering.
8. **Platform risk (not legal).** Google may still judge a social media agency to be "online-only" despite on-site filming. Keep the profile factual and keep evidence of on-site work.

---

### 6. Sources (all read on 2026-11-18 unless stated)

| Source | URL | Version or date |
|---|---|---|
| Закон за електронната търговия (arts. 4-6, 20, 24, § 1) | <https://lex.bg/laws/ldoc/2135530547> | Last amended by ДВ бр. 55, 16.06.2026 |
| Наредба за водене на електронен регистър на електронните адреси на юридическите лица… (ПМС № 235/2009) | <https://lex.bg/laws/ldoc/2135647445> | Last amended by ДВ бр. 99, 30.10.2026 |
| КЗП: e-address check form | <https://kzp.bg/bg/proverka-na-e-adres> | — |
| КЗП: how to apply, application form, after applying | <https://kzp.bg/bg/kak-se-podava-zayavlenie>, <https://kzp.bg/bg/elektronno-podavane-na-zayavlenie>, <https://kzp.bg/bg/kakvo-se-sluchva-sled-podavane-na-zayavlenie> | — |
| Закон за електронните съобщения (art. 261, § 1 т. 48а/49, arts. 312, 335-340) | <https://lex.bg/laws/ldoc/2135553187> | Last amended by ДВ бр. 66, 21.07.2026 |
| Закон за защита на потребителите (§ 13 т. 1; art. 68ж т. 26-27) | <https://lex.bg/laws/ldoc/2135513678> | Last amended by ДВ бр. 87, 24.09.2026 |
| ePrivacy Directive 2002/58/EC, art. 13 (consolidated) | <https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02002L0058-20091219> | — |
| GDPR (Recital 47, Arts. 14(3)(b), 21(2)-(4), 28) | <https://eur-lex.europa.eu/eli/reg/2016/679/oj> | — |
| EDPB Guidelines 1/2024 on Art. 6(1)(f), v2.0, paras 108-121 | <https://www.edpb.europa.eu/system/files/2026-11/edpb_guidelines_202401_legitimateinterest_v2_en.pdf> | Adopted 10.11.2026 |
| CJEU C-621/22 *KNLTB* | <https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62022CJ0621> | Judgment of 04.10.2024 |
| European Commission, "Data protection explained" (email examples) | <https://commission.europa.eu/law/law-topic/data-protection/data-protection-explained_en> | No date shown |
| КЗЛД decision on complaint ППН-01-70/24.01.2022 | <https://cpdp.bg/%d1%80%d0%b5%d1%88%d0%b5%d0%bd%d0%b8%d0%b5-%d0%bf%d0%be-%d0%b6%d0%b0%d0%bb%d0%b1%d0%b0-%d1%81-%d1%80%d0%b5%d0%b3-%e2%84%96-%d0%bf%d0%bf%d0%bd-01-70-24-01-2022-%d0%b3/> | Decided 16.11.2022 |
| КЗЛД opinion П-7552/2014 on ЗЕТ art. 6 | <https://cpdp.bg/%d1%81%d1%82%d0%b0%d0%bd%d0%be%d0%b2%d0%b8%d1%89%d0%b5-%d0%bd%d0%b0-%d0%ba%d0%b7%d0%bb%d0%b4-%d0%bf%d0%be-%d0%b2%d1%8a%d0%bf%d1%80%d0%be%d1%81%d0%b8-%d0%ba%d0%b0%d1%81%d0%b0%d0%b5%d1%89%d0%b8-15/> | 31.01.2014 (pre-GDPR) |
| LinkedIn User Agreement (§8.1-8.2) | <https://www.linkedin.com/legal/user-agreement> | Effective 03.11.2025 |
| LinkedIn Professional Community Policies | <https://www.linkedin.com/legal/professional-community-policies> | No date shown |
| Meta Community Standards: index, Spam, Authentic Identity Representation | <https://transparency.meta.com/policies/community-standards/>, …/spam/, …/authentic-identity-representation/ | Current versions ("Today") |
| Meta Messenger Platform policy overview | <https://developers.facebook.com/docs/messenger-platform/policy/policy-overview> | No date shown |
| Resend Acceptable Use Policy | <https://resend.com/legal/acceptable-use> | Last updated 13.10.2026 |
| Google: Business eligibility and ownership guidelines | <https://support.google.com/business/answer/13763036> | — |
| Google: Guidelines for representing your business | <https://support.google.com/business/answer/3038177> | — |
| Google: Service areas | <https://support.google.com/business/answer/9157481> | — |
| Google: Verify your business; video verification | <https://support.google.com/business/answer/7107242>, <https://support.google.com/business/answer/14271705> | — |
| Google: Tips to get more reviews; restrictions for policy violations | <https://support.google.com/business/answer/3474122>, <https://support.google.com/business/answer/14114287> | — |
| Google Maps: Prohibited & restricted content (fake engagement) | <https://support.google.com/contributionpolicy/answer/7400114> | — |
| Google: Supported countries/regions (Bulgaria listed) | <https://support.google.com/business/answer/6270107> | — |
| NSI: ICT usage and e-commerce in enterprises 2025 | <https://www.nsi.bg/en/press-release/ict-usage-and-e-commerce-in-enterprises-8879> | Released 05.12.2025 |
| DataReportal: Digital 2026 Bulgaria | <https://datareportal.com/reports/digital-2026-bulgaria> | Late-2025 data |
| Clutch: Bulgaria social media marketing | <https://clutch.co/bg/agencies/social-media-marketing> | Ratings updated 17.11.2026 |
| Sortlist: social media agencies in Bulgaria | <https://www.sortlist.com/social-media/bulgaria-bg> | — |
| БТПП: regional chambers, membership, events | <https://www.bcci.bg/council-bg-rcci-members.html>, <https://www.bcci.bg/tradereg-members-bg.html>, <https://www.bcci.bg/payment_bcci/> | — |
| BNI Bulgaria | <https://bni.bg/bg/index> | — |
| Закон за ДДС (arts. 96, 97а, 100, 113, 114, 168в) | <https://lex.bg/laws/ldoc/2135533201> | Last supplemented by ДВ бр. 69, 31.07.2026 |
| Euro portal, business FAQ (ЗВЕРБ art. 15, invoices, accounting in euro) | <https://evroto.bg/bg/euro/business/faq> | — |
| Закон за задълженията и договорите (arts. 9, 20а, 87, 92, 94, 258, 268, 280, 287-288) | <https://lex.bg/laws/ldoc/2121934337> | Consolidated text |
| Закон за авторското право и сродните му права (arts. 13, 15-16, 36, 41-42, 62-63) | <https://lex.bg/laws/ldoc/2133094401> | Last amended by ДВ бр. 70, 20.08.2024 |
| Internal: keyword volumes; competitor terms; market data; legal constraints | `docs/research/05-keyword-research.md`; `docs/research/06-service-terms-evidence.md`; `spec/research/01-market-and-competitors.md`; `spec/research/03-legal-and-platform-operating-rules.md` | 2026-11-11; 2026-11-07; 2026-11-07 |
