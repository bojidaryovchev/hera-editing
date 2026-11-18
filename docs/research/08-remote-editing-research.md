# Remote editing abroad: buyers, prices, channels, tax (2026-11-18)

This is the evidence behind [docs/strategy-remote-editing.md](../strategy-remote-editing.md): the second line of the
business, decided as L35 in [decisions.md](../decisions.md). Filming in Bulgaria stays the core. Remote editing for
clients abroad adds income in quiet periods.

**What it is.** Four desk studies were made in parallel on 2026-11-18 and merged here. Only three things changed:
- the headings;
- a local path;
- the corrections marked "corrected by the lead", which are listed in the checks table below.

**Who made them.** Each study was written by a research agent with web access, briefed to use primary sources where
they exist:
- platforms' and providers' own pages: pricing, help, terms;
- the trackers' own data: SullyGnome, YTJobs;
- laws on lex.bg and EUR-Lex, and regulators' pages;
- measured search data from OpenSEO (DataForSEO; US, UK and Germany).

**Checks.** The lead re-checked the figures the strategy relies on most against the source; they are listed below.

**Not legal or tax advice.** Part 4 ends with the questions for a Bulgarian lawyer and accountant.

**The editor's constraints,** from the owner on 2026-11-18:
- He writes in English with translation help, but does not speak it. So everything is async and written, with no
  calls.
- He has at least 30 hours a week.
- He offers a broad range of edit types, each backed by real samples.

| Part | Question | Main sources |
|---|---|---|
| [Part 1](#part-1-who-buys-remote-editing-and-where) | Which segments and countries buy remote editing, how much and how often, and whether streamers are worth it | SullyGnome, YTJobs feed, Upwork and Fiverr filings and pages, Whop docs, vendors' pages |
| [Part 2](#part-2-what-remote-editing-sells-for) | Marketplace rates, productized services, the AI price floor, hours per deliverable, and proposed packages | Upwork hiring guides, Fiverr, 17 productized services, AI tools' pricing pages |
| [Part 3](#part-3-search-demand-competitor-sites-and-channels) | English search demand, who ranks, competitor sites, marketplaces and job boards, which pages to build | OpenSEO keyword metrics (1,121 credits) and 21 SERPs, competitor sites, platform rules |
| [Part 4](#part-4-vat-payments-contracts-and-outreach-rules) | VAT for EU and non-EU clients, payments, copyright, data protection, consumer law, cold-outreach law | ЗДДС and Наредба Н-18 (lex.bg), EUR-Lex, НАП, FTC, ICO, CASL, ACMA, Stripe, Upwork, Fiverr |

**Conventions.**
- Every figure is marked:
  - **[P]**: published, read on the page or measured;
  - **[S]**: secondary or unverified;
  - **[E]**: an estimate.
- "My reading" marks a legal interpretation.
- Prices are in USD unless stated; EUR equivalents are given where the study converted them.

**Limits.**
- Several sites blocked automated reading: Fiverr, Upwork's main site, Malt, Reddit and The Knot. Their figures come
  from search summaries and are marked [S].
- Each part lists its own gaps.

## Checks by the lead (2026-11-18)

| Claim | Where | Re-checked against | Result |
|---|---|---|---|
| Upwork: video editors' median rate $35/h, typical $10–60/h | Part 2 §1.2 | research.upwork.com/hire/video-editors/cost/ | Match in the page's description. **The page's own body also says "$6 - $25 per hour"**, and its tier medians are $10 (entry), $40 (mid) and $100 (senior). Quote the range, not one number |
| YTJobs: 376 active video-editor jobs | Part 1 (b) | YTJobs public API, app.ytjobs.co/api/jobs, all 40 pages | Match: 593 active jobs, 376 in the video-editor category. The median pay of $350 per project is the study's computation from the job details and was not re-computed |
| ЗДДС art. 97а(2) and (4): a Bulgarian business supplying services to a business in another member state must register for VAT, at least 7 days before the tax becomes due | Part 4 §1.5 | ЗДДС on lex.bg | Match. Paragraph (2) has applied since 01.01.2023 (ДВ 102/2022). On 01.01.2026 (ДВ 115/2025), paragraph (5) was amended and a new paragraph (6) added: (2) does not apply to a business registered in Bulgaria for the EU small-enterprise scheme in that member state |
| US monthly searches: "video editing services" 2,400; "youtube video editor for hire" 390; "podcast editing services" 320; "wedding video editing services" in the 90–480 range | Part 3 §3.1 | OpenSEO `get_keyword_metrics`, US, re-pulled 2026-11-18 | Match: 2,400 (KD 14), 390 (KD 0), 320 (KD 44), 260 (KD 11) |
| AI clipping prices: Eklipse Premium $24.99/month, StreamLadder Creator $27/month, OpusClip $15–29/month | Part 2 §4 | A separate search by the lead (secondary sources) | Consistent |
| **Correction to Part 2 §6.10:** a founding discount "in return for a written review" | Part 2 §6.10 | Fiverr Community Standards (Integrity and Authenticity) and Upwork's "What is feedback building" article, through search summaries (both pages return HTTP 403 to automated reads) | Fiverr prohibits "any attempt to manipulate reviews" (permanent suspension possible); Upwork treats bribing or pressuring for feedback as manipulation. The strategy makes the founding price **unconditional** and asks every client for honest feedback |
| **Correction to Part 4 (answer 11 and §2.2):** an ЕТ pays 10% on its profit | Part 4 | ЗДДФЛ art. 48 on lex.bg | **Wrong.** Art. 48(1) is the general 10% rate, but art. 48(2) taxes "доходите от стопанска дейност като едноличен търговец" at **15 на сто**. Corrected in the text. So an ЕООД (about 14.5% on distributed profit) is no worse on tax, and it limits liability |
| Part 3 counts 314 YTJobs editor listings; Part 1 counts 376 | Parts 1 and 3 | YTJobs API (above) | 376 is the count in the video-editor category of the full feed. Part 3's 314 used a different filter. Use 376 |
| **Weighting added by the lead:** spoken-English listening load per segment | Part 1 shortlist | The studies' own notes ("choosing clips needs English comprehension"; vows and speeches "need some English comprehension"; streamers "high language load") | The strategy's first tests are therefore weddings, scripted YouTube and real-estate listings. Podcasts and streams move to a second wave |

---

## Part 1. Who buys remote editing, and where

Prepared 2026-11-18 for Hera Editing's planned side line (remote, async editing for clients abroad). All sources were read on **2026-11-18**; where a page carries its own date, that date is given in the source list.

Tags: **[P]** a figure published on the page I read; **[S]** secondary or unverified (blog, search-result summary, page not opened); **[E]** my estimate or my calculation from cited figures. Reference numbers [R1]–[R67] point to the source list at the end.

---

### Key findings

1. **The biggest, most reachable buyers are YouTube creators who hire per project and work in writing.** On 2026-11-18 YTJobs listed 594 active jobs, of which 376 were video-editor jobs; 193 of those had been posted in the previous 30 days [P][R21]. 64% pay per project, 27% are full-time and 9% part-time; 97% are remote [P][R21]. The median stated pay per project is **$350** (quartiles $162–$600, n=141): long-form $400, Shorts $62, documentary-style $450, gameplay $180 [P][R21]. 95% list English as a required language, but only 3% explicitly mention calls or meetings, 9% ask for overlap with US/UK hours and 10% ask for fluent or native English [P][R21] (keyword counts are mine [E]).
2. **The money is in the US first, then the UK, Canada and Australia.** 71% of Upwork's 2025 gross services volume came from US clients and no other country exceeded 10% [P][R52]. 47.7% of Fiverr's 2025 revenue came from the US and 28.0% from Europe [P][R53]. YouTube's creative ecosystem in 2025: US $60B+ of GDP and 540,000+ full-time-equivalent jobs; UK £2.8B+ and 60,000+; Canada C$2B+ and 35,000+; Australia A$1.1B+ and 18,000+; Germany €1B+ and 29,000+ [P][R56–R60]. These are Oxford Economics models published by YouTube.
3. **Twitch is a small, top-heavy market.** In the 30 days to 2026-11-18, about **15,200** Twitch channels averaged 100+ concurrent viewers while streaming at least 30 hours. **3,274** averaged 500+ and **1,557** averaged 1,000+ [P][R3]. English-language channels: 6,954 / 1,441 / 681; German: 1,271 / 275 / 131 [P][R3]. That is about 0.25% of the 6.2 million monthly active streamers TwitchTracker estimates [P][R1] (share [E]). Kick and YouTube Live publish no comparable distribution. Their Q3 2026 totals: Kick 2.04B hours watched (+30.7% on Q2), Twitch 4.51B, YouTube 13.62B [P][R5].
4. **Short clips are commoditised.** AI clippers cost $15–$40 a month. StreamLadder Creator ($27) gives "up to 30 fully edited clips per stream" and imports from Twitch and Kick; OpusClip Pro ($29) imports from Twitch; Eklipse costs $24.99–$39.99 [P][R11–R13]. At TwitchCon 2026, Twitch announced longer Clips, Stream Recaps built from "trusted clippers'" Clips, and chat-spike markers on VOD timelines [S][R6].
5. **The clipping economy pays about $1 per 1,000 views.** On 16 Nov 2026 the median listed rate across 710 live Content Rewards campaigns was $1.00. The platform takes a 10% fee and the median cap is $200 per clip [P][R19][R20]. With 3M+ sign-ups, 600k+ people who posted and $18M+ paid out in total [P][R19], the average is about **$30 per posting clipper** [E]. It fits the "no speaking" constraint but not the income goal.
6. **Streamers who pay humans buy YouTube highlight videos, not clips.** Only 14 of the 376 YTJobs editor posts (4%) are stream-related [P][R21]. What they pay:
   - $50–$100 per highlight video (small MMO streamer);
   - $210 for one long-form video plus 3 Shorts (VRChat event);
   - $250–$350 per full video, plus $175 per pack of 3 Shorts (IRL streamer with 183K YouTube subscribers) [P][R21].
7. **The best fit is B2B or scripted work with little spoken language.** Benchmarks by segment:
   - wedding films for filmmakers: a premium outsourcer charges from $621 per highlight film and from $801 per feature [P][R43]; a Vietnamese budget house starts at $35–$80 [P][R45];
   - scripted or documentary YouTube: median $450 [P][R21];
   - video podcasts: $80–$330 per episode, plus $80–$94 per clip [P][R27][R28];
   - real-estate listing videos: $35–$80 at budget vendors, $278–$327 mid-market [P][R39][R40].
8. **Fixed-price packages are the market norm.** Specialist vendors publish fixed menus with caps on raw footage (e.g. 60 min or 20 GB), on revisions (2–3 rounds, or unlimited) and on turnaround (24–48 h to first draft). They bill monthly or in advance [P][R27][R30][R33][R36][R43]. Custom quotes are worth it only for corporate, event and motion-graphics-heavy jobs [E].
9. **Time zone: overnight delivery for the Americas and Australia.** In November, Sofia (UTC+2) is 7 h ahead of New York, 10 h ahead of Los Angeles and 9 h behind Sydney, so a Sofia working day falls in their night [E]. Vendors already sell this ("Overnight delivery – we work while you sleep" [P][R33]). Vendors in Vietnam, the Philippines and India have the same edge, so it is a selling point, not a moat [E].
10. **VAT decides the order of countries.** A Bulgarian company that is not VAT-registered must register under **чл. 97а, ал. 2 ЗДДС** before it supplies B2B services to a client in another EU member state, filing at least 7 days before the tax point [P][R63]. Clients in the US, UK, Canada, Australia, Switzerland and Norway do not trigger this (they are not EU member states) [E from R63]. So start outside the EU, and add Germany, Austria, the Netherlands and the Nordics once the accountant has handled 97a.
11. **AI is accepted, but not everywhere.** Of the YTJobs editor posts:
    - 9% welcome AI tools;
    - 2% ban AI, mostly in documentary niches;
    - one says "No AI proposals will be considered" [P][R21], so applications must be short and personal.

    Fiverr says AI is cutting demand for simple, low-skill services; its annual active buyers fell 13.6% in 2025 [P][R53].
12. **Twitch, the direct answer: go only as a fixed-price YouTube-highlights editor for English-language streamers who average roughly 300+ viewers and already post on YouTube.** Sell finished videos and Shorts bundles at a set price. Do not sell per-clip work to small streamers, and do not do per-view clipping (details below).

**How the numbers were collected.**
- **SullyGnome:** counts come from its channel-search form (the site's own search endpoint), filtered by average viewers, hours streamed and language, for the last 30 days [R3].
- **TwitchTracker:** I read the "most viewers" ranking at the threshold boundaries, about 25 pages of 50 channels; the list stops at 10,000 channels [R2].
- **YTJobs:** I downloaded all 594 active postings from its public job feed and the details of all 376 video-editor postings. Pay is each employer's stated min–max range, and I use the midpoint. Keyword counts come from my own text search, so treat them as indicative [R21].
- **Prices:** all come from vendors' own pricing pages, unless tagged [S].
- **Blocked pages:** Upwork, Fiverr, The Knot and Streams Charts' channel rankings blocked automated reading. I mark those gaps rather than estimate them.

---

### Segment tables

#### (a) Live streamers on Twitch, Kick and YouTube Live

**A1. Twitch audience distribution, 30 days to 2026-11-18**

| Average concurrent viewers | SullyGnome, all channels [P][R3] | SullyGnome, streamed 30 h or more [P][R3] | of which English-language [P][R3] | of which German [P][R3] | TwitchTracker ranking, all channels [P][R2] |
|---|---|---|---|---|---|
| 50+ | 54,797 | 27,810 | 13,228 | 2,191 | not available (list stops at 10,000) |
| 100+ | 33,324 | 15,226 | 6,954 | 1,271 | not available |
| 250+ | 12,483 | 6,546 | n/a | n/a | 9,979 |
| 500+ | 6,307 | 3,274 | 1,441 | 275 | 5,056 |
| 1,000+ | 2,821 | 1,557 | 681 | 131 | 2,378 |

Other languages, 100+ viewers and 30 h or more [P][R3]: Dutch 67, Finnish 62, Swedish 41, Danish 33, Norwegian 21, Bulgarian 3. Many Dutch and Nordic streamers broadcast in English and are counted under English.

Context:
- **Platform size:** TwitchTracker estimates 6,209,186 active streamers in October 2026, 91,263 average concurrent live channels and 2,189,650 average concurrent viewers [P][R1]. SullyGnome tracked 1,772,941 channels in the 30-day window [P][R4].
- **How regular the big channels are:** in the TwitchTracker pages around each threshold, 56–80% of channels streamed 30 h or more in the window [E, from R2].
- **The trackers disagree by about ±20%.** For 1,000+ viewers, SullyGnome's sorted channel table gives 2,129 [P][R4], its search gives 2,821 and TwitchTracker gives 2,378. The trackers average differently.
- **Concentration:** in 2026, 34% of the top 100 creators by hours watched streamed on at least two platforms. Twitch plus YouTube was the most common pair (47.6% of multistreamers), then Twitch plus Kick (35.3%) [P][R7].

**A2. Kick and YouTube Live**

| Item | Figure | Tag | Source |
|---|---|---|---|
| Hours watched, Q3 2026 | YouTube (all live) 13.62B (−13.7% on Q2); TikTok LIVE 10.6B (+19%); Twitch 4.51B (+4%); Kick 2.04B (+30.7%, record 6.4% share) | [P] | R5 |
| Kick top channel | absi, 50M+ hours watched in Q3; Streams Charts flags "unusual audience patterns" | [P] | R5 |
| Distribution of Kick and YouTube Live channels by average viewers | **Not published in an openable form.** Streams Charts' channel rankings return HTTP 403 to automated reads, and SullyGnome and TwitchTracker cover Twitch only. | — | — |
| Kick partner threshold and pay | 75 average viewers and 250 followers unlock the hourly-pay application; hourly pay "typically ranges from $16 to $32 per hour"; 95/5 subscription split | [S] (how-to article, no data source given; other guides disagree) | R8, R67 |

**A3. Income tiers (an illustration, not a measurement)**

Mid-tier streamer income is not published anywhere I could open. TwitchTracker labels a Tier 1 sub at $4.99 [P][R9]. Twitch's top-tier revenue share is reported as 60/40 or 70/30 under its "Plus Program", and its Path to Partner asks for about 75 average viewers [S][R10].

Two top channels show 0.8 and 2.6 total subs per average viewer: Caedrel has 118,209 subs on 153,915 average viewers, and HasanAbi 106,227 on 40,163 [E from R9 and R2]. Mid-size channels are unmeasured.

I assume 0.5–1.5 subs per average viewer and a 50–70% streamer share. On that basis, monthly sub income is about **$1.25–$5.25 per average viewer** [E]. Ads, Bits, gifted subs and sponsors add to that.

| Tier (average viewers, 30 h or more a month) | Channels, all languages [E from R3] | English channels [E from R3] | Monthly sub income [E] | Typical editing behaviour [E, with evidence from R21] |
|---|---|---|---|---|
| 50–99 | 12,584 | 6,274 | about $60–$520 | No paid editor. Free community clippers and $15–$40 AI tools. |
| 100–499 | 11,952 | 5,513 | about $125–$2,600 | Occasional buys: a few Shorts or a monthly highlight. Budgets of tens to a few hundred dollars a month. |
| 500–999 | 1,717 | 760 | about $625–$5,200 | Often run a YouTube channel and pay $100–$350 per highlight video. |
| 1,000+ | 1,557 | 681 | $1,250 and up, far more at the top | Dedicated editors or clip channels are common. For example, an IRL clipping channel with 2.51M subscribers is hiring a full-time live-stream editor [P][R21]. |

**Which streamers already pay editors:**
- Only 4% of YTJobs editor posts are stream-related [P][R21].
- The paying examples are channels with an existing YouTube presence, or a one-off event such as a month-long 24/7 stream [P][R21].
- Below about 100 average viewers, paid editing is rare [E].

**A4. What streamers buy, and what they pay**

| Deliverable | Typical order | Price evidence | Tag | Source |
|---|---|---|---|---|
| VOD-to-YouTube highlight video (10–20 min from 2–6 h VODs) | Weekly or per stream; recurring | $50–$100 (MapleStory streamer, 128 subscribers); $250–$350 per full video (Sammi Renae, 183K subscribers) | [P] | R21 (jobs 46136, 45895) |
| Event series (long-form plus Shorts) | Daily during an event | $210 per 15-min video plus 3 Shorts, about 48 h deadlines, paid by PayPal, "No AI allowed" | [P] | R21 (job 45628) |
| Shorts bundles | 3–5 per stream | $175 per pack of 3 Shorts | [P] | R21 (job 45895) |
| Gameplay videos in general | Per project | YTJobs gameplay-style quartiles $98 / $180 / $325 (n=26) | [P] | R21 |
| Marketplace gigs | One-off or recurring | Fiverr "Twitch VOD to YouTube highlights" gigs start at $25–$60 | [S] | R65 |
| Montages and "best of" | Occasional | No price evidence found | — | — |

**A5. AI clipping tools (the substitutes), monthly list prices**

| Tool | Plans | What you get | Source |
|---|---|---|---|
| OpusClip | Free; Starter $15; Pro $29; Business custom | Twitch import only on Pro; reframe to 9:16, 1:1 and 16:9 on Pro; AI captions on all plans; the free plan watermarks | [P] R11 |
| StreamLadder | Free; Starter $15 ($12.50 billed yearly); Creator $27 ($22.50); Pro $39 ($32.50) | Creator: ClipGPT "within fair use", "up to 30 fully edited clips per stream", Twitch and Kick import by link. Pro: 4K and 2 editors. | [P] R13 |
| Eklipse | Free tier; Premium $24.99; Premium Pro $39.99 | Twitch, Kick and YouTube Live; Pro adds live clipping and custom highlights | [P] R12 |
| Klap | $29 / $79 / $189 (half price billed yearly) | 100 / 300 / 1,000 clips a month; source video up to 3 h | [P] R14 |
| Submagic | $19 / $39 / $69 ($12 / $23 / $41 billed yearly) | "Magic Clips" from 5 / 15 / 37 long videos a month; source up to 3 h | [P] R15 |
| Descript | Free; $24 / $35 / $65 monthly, or $16 / $24 / $50 billed yearly (mapping inferred) | AI co-editor "Underlord", filler-word removal, Studio Sound, clips | [P] R16 |
| Vizard | Prices did not render on the page | — | R17 |
| Twitch's own tools | Clips up to 5 min (from 60 s), Stream Recaps built from creator-approved "trusted clippers", VOD timelines that flag chat spikes and Hype Trains; no release dates | Announced at TwitchCon 2026 | [S] R6 |

What this means:
- A streamer gets about 30 edited clips per stream for $27 a month [P][R13], so human per-clip pricing cannot compete at the low end [E].
- The same chat-spike markers and viewer-made Clips make finding the best moments less dependent on fluent English, which helps a non-native editor do long-form highlights [E].

**A6. The clipping economy (paid per view)**

How it works [P][R18][R20]:
- A creator or brand posts a campaign and sets a rate per 1,000 views, a total budget, a minimum payout, a maximum payout per clip, an optional flat fee and the accepted platforms (TikTok, YouTube Shorts, X, Instagram Reels).
- Clippers post clips on **their own** accounts.
- The brand approves each clip; views are read from the public counters on the clipper's post, and the brand pays on approved views.

| Item | Figure | Tag | Source |
|---|---|---|---|
| Median listed rate, 710 live campaigns (16 Nov 2026) | $1.00 per 1,000 views; half of campaigns between $1.00 and $2.00 | [P] | R19 |
| By platform | YouTube $1.10 (417 campaigns), TikTok $1.00 (656), Instagram $1.00 (594), X $1.00 (138) | [P] | R19 |
| By type | Clipping-only $1.04; gaming clipping-only $1.125 (18 campaigns); UGC $2.00 | [P] | R19 |
| Fee | 10% of each per-view payout; per-post and retainer campaigns 10% below a $5,000 budget, 0% at $5,000 or more | [P] | R20 |
| Caps and windows | Median cap $200 per clip; a clip earns for 30 days; nothing is paid if the campaign budget runs out or the clip is rejected | [P] | R20 |
| Payout rhythm | 7 days of earning plus a 3-day hold; withdrawals from $1 via Whop balance to bank or PayPal | [P] | R19, R20 |
| Scale | 3M+ creators signed up, 600k+ have posted, $18M+ paid, 1,900+ brands and agencies, 6,000+ funded campaigns | [P] | R19 |
| Average lifetime payout per posting clipper | about $30 ($18M divided by 600k) | [E] | R19 |
| Views needed for $1,000 a month net at $1.00 per 1,000 | about 1.1M approved views a month | [E] | R19, R20 |
| Campaign mix | Examples include casino brands (Roobet, $1 per 1,000 views, $250K budget) | [S] | R66 |

Does it suit someone who writes but cannot speak English?
- **Communication: yes.** Campaign rules are written, and there is no client contact.
- **Income: no.** Pay depends on growing your own social accounts in an English-speaking market. The reward is about $1 per 1,000 views, budgets run out, and the average lifetime payout is about $30. Gambling campaigns add reputational risk.
- **Verdict:** at most a free practice ground [E].

One nuance: Content Rewards also runs **retainer** and **per-post** campaigns, which pay a fixed amount per clip or per cycle [P][R20]. These are ordinary paid editing gigs and can be used to find clients. No rate data was published for them.

**A7. Segment assessment: streamers**

| Question | Assessment |
|---|---|
| Who pays | The streamer (an individual or their company), sometimes their manager; larger streamers also fund clip channels [P][R21]. |
| Typical order | Weekly highlight video plus 3–5 Shorts per stream; recurring; paid per finished video [P][R21]. |
| Willingness to pay | $50–$350 per highlight video; Shorts packs about $175 for 3; gameplay median $180 [P][R21]; gigs from $25–$60 [S][R65]. Small streamers' sub income caps the budget (table A3) [E]. |
| Skills and communication | Stream culture, memes, game knowledge (one post wants someone who plays the game) and comedic timing, so **comprehension of English speech matters most here**. Contact is mostly Discord text; some teams use voice calls; posts often want "someone to build this with me" [P][R21]. Async is possible. |
| Competition | AI clippers at $15–$40 a month [P][R11–R13]; free community clippers, now formalised by Twitch [S][R6]; global freelancers. |
| Fit for this editor | **Low to medium.** Fine for long-form highlights where the moments are pre-marked (viewer Clips, chat spikes); poor for short clips and per-view work. |

---

#### (b) YouTube creators: long-form and Shorts

**B1. How many channels sit in each subscriber tier**

vidIQ index of 61,186,246 channels with at least one subscriber, snapshot 20 Jul 2026 [P][R23]. It covers vidIQ's index, not every channel.

| Tier | Channels at or above | Channels in band [E] |
|---|---|---|
| 1,000 | 24,813,187 | 1K–10K: 19,976,444 |
| 10,000 | 4,836,743 | 10K–100K: 4,044,367 |
| 100,000 | 792,376 | 100K–1M: 712,806 |
| 1,000,000 | 79,570 | 1M–10M: 76,488 |
| 10,000,000 | 3,082 | — |

Monetisation context:
- **Programme size:** "over 3 million creators" are in the YouTube Partner Program, and Shorts get "over 200 billion" views a day [P][R22].
- **Higher entry bar from 1 Feb 2027:** new applicants need 8,000 watch hours in 365 days, or 20M Shorts views in 90 days [P][R22]. That raises the quality bar for small channels, which may increase demand for skilled editors [E].

**B2. Demand profile on YTJobs (376 active video-editor posts, read 2026-11-18)** [P][R21]

| Item | Figure |
|---|---|
| Volume | 376 active editor jobs (63% of all 594 jobs); 193 posted in the last 30 days, 364 in the last 90 |
| Job type | Per project 241 (64%), full-time 101 (27%), part-time 34 (9%); remote 365 (97%) |
| Video type | All types 191, long-form 136, Shorts 49 |
| Required experience | 1 year 156, 3 years 121, 5 years 11, none stated 88 |
| Pay per project (midpoint of stated range) | All: $162 / $350 / $600 (n=141). Long-form: $200 / $400 / $700 (n=67). Shorts: $40 / $62 / $130 (n=15). |
| Pay by style (per project) | Documentary $200 / $450 / $750 (n=39); talking head $121 / $350 / $625 (n=38); motion graphics $150 / $300 / $575 (n=33); Shorts/Reels style $72 / $225 / $412 (n=26); gameplay $98 / $180 / $325 (n=26); podcast $150 / $250 / $375 (n=7) |
| Full-time ranges | Midpoint median about $30,000, interquartile range $17,000–$48,000 (n=57). The unit is not stated; most look annual, a few monthly [E]. |
| Most common styles | Talking head 110, Shorts/Reels 105, documentary 92, motion graphics 80, scripted 69, cinematic 67, vlog 67, gameplay 57, commentary 54, IRL 54, faceless 42 |
| Hiring channel size | Under 10K subscribers 35%; 10K–100K 14%; 100K–1M 18%; 1M+ 15%; unknown 18% |
| Cadence (78 posts state one) | Mostly 1–3 videos a week, or 3–8 a month |
| Turnaround | Stated in 35% of posts. Typical: first cut in 48 h; "usual editing turnaround is about three days" for 10–20 min; same-day or next-day for Shorts. |
| Hiring process | Test edits or trials in 19% (one is a $150 paid test); screening phrases ("Start your message with 'SLAB'"); "No AI proposals will be considered" |
| Communication | English required 95%; fluent or native English stated 10%; US/UK-hours overlap 9%; calls or meetings stated 3%; Discord, Slack or Frame.io 11% |
| AI | Welcomed or tools named 9%; banned or restricted 2%, e.g. "no AI-generated visuals" in documentary niches |
| Example package | Doctorly (3.59M subscribers): $400–$500 for 1 long-form, 1 Short and at least 3 thumbnails; "Advanced English proficiency"; Premiere Pro (job 46769) |

**B3. Segment assessment: YouTube creators**

| Question | Assessment |
|---|---|
| Who pays | Channel owners of every size, and a growing set of media brands (table B2). |
| Typical order | Per video, recurring weekly or monthly; long-form plus Shorts, sometimes thumbnails [P][R21]. |
| Willingness to pay | Median $350 per project; long-form $400; documentary $450; Shorts $62 [P][R21]. Productised services charge $495–$995 a month for 4–8 videos [P][R30]. |
| Skills and communication | Retention editing, pacing, motion graphics and B-roll. Written English is enough for most posts; spoken English matters for the 3–10% that ask for calls or fluency [P][R21]. Async via Frame.io or Drive is the norm. |
| Competition | Very large global supply: Upwork's biggest talent countries are the US (25% of volume), India, the Philippines and Pakistan [P][R52]. AI tools for Shorts. |
| Fit | **Medium to high** for scripted, documentary, faceless, tutorial and education channels, where the script or voiceover arrives in writing. **Low** for comedy, commentary and IRL, where humour and slang decide the cut. |

---

#### (c) Video podcasters: full episode edit plus clips

| Question | Assessment |
|---|---|
| Who pays | Independent podcasters, podcast networks, and companies running branded shows. |
| Typical order | One 45–90 min multicam episode a week, plus 3–10 vertical clips; recurring [E, consistent with the cadence in R21: "3 episodes/week", "one episode/week"]. |
| Willingness to pay | Offshore seller on Contra (Mumbai): $80 for a 30-min episode, $155 for 60 min, $310 for 60 min plus 5 reels and a trailer [P][R28]. Tasty Edits: $278–$327 per long-form episode (60 min / 20 GB of raw footage included) and $80–$94 per Short, first draft in 48 h / 24 h [P][R27]. YTJobs podcast style: $150 / $250 / $375 [P][R21]. Monthly retainers: $800–$3,500 (agency) and £1,400 a month for 4 episodes (UK studio) [S][R29]. |
| Market signals | YouTube: "more than 1 billion monthly active viewers of podcast content" (Jan 2025) and 400M+ hours a month on TV screens (2024) [P][R24]. Spotify cut its Partner Program thresholds in Jan 2026 to 1,000 engaged listeners, 2,000 hours and 3 episodes [P][R25]. Spotify reportedly has 530,000+ video podcasts, and its Partner Program launched in the US, UK, Canada and Australia [S][R26]. |
| Skills and communication | Multicam switching, audio clean-up, captions and choosing clips. Choosing clips needs comprehension of English speech; transcript-based editing reduces this [E]. Async via shared folders and written notes. |
| Competition | AI: Descript ($16–$50 a month) with an AI co-editor, filler-word removal and clips [P][R16], and OpusClip [P][R11]. Offshore editors at $80–$155 per episode [P][R28]. |
| Fit | **Medium.** Recurring and mechanical, so a good hourly yield, but the most exposed to AI automation and offshore pricing. |

---

#### (d) Coaches, course creators and solo experts: talking-head and LinkedIn video

| Question | Assessment |
|---|---|
| Who pays | Coaches, consultants, course creators and founders building a personal brand (often on LinkedIn). |
| Typical order | 1–4 long-form talking-head videos a month plus 8–20 Shorts or Reels with captions; monthly subscription [E, consistent with R30 and R31]. |
| Willingness to pay | VidChops: $495 a month (4 long-form or 16 short-form, 1–2 day turnaround, 3 revisions); $995 a month (8 credits); subtitles $95 a month extra [P][R30]. Video Husky: $849 / $1,590 / $2,749 a month, aimed at "vloggers, real estate agents, & medium sized business" and at "content creators, businesses, agencies & production companies" [P][R31]. YTJobs talking-head style: $121 / $350 / $625 per project [P][R21]. |
| Market signal | LinkedIn video uploads up 36% year on year (Feb 2025) [S][R32]. |
| Skills and communication | Dialogue tightening, word-accurate English captions, brand templates. These clients often expect onboarding calls and strategy advice [E]. |
| Competition | Productised subscriptions (above); AI captioning and clipping (Submagic $12–$69 a month [P][R15]; Descript [P][R16]). |
| Fit | **Medium to low.** Heavy on spoken language and hand-holding. Workable only once a fixed written brief and templates exist. |

---

#### (e) B2B: marketing agencies (white-label or overflow) and e-commerce/DTC ad creative

| Question | Agencies: white-label and overflow | E-commerce and DTC brands: ad creative |
|---|---|---|
| Who pays | Social and marketing agencies, production companies | Brands and performance agencies running Meta and TikTok ads |
| Typical order | Batches of social cuts, YouTube edits and event recaps; monthly or in project bursts | Many 15–60 s variations (hooks, captions, aspect ratios) of UGC and product footage; weekly; recurring |
| Willingness to pay (competitor prices) | Vidpros: $1,000 a month for 20–40 Shorts or 5–10 long-form (up to 15 min), with "Overnight delivery – we work while you sleep"; $2,000; $4,000 for "teams and agencies at volume"; $100 trial week [P][R33]. That implies about $25–$50 per Short or $100–$200 per long-form at the $1,000 tier [E]. Kimp Video: 2 active requests, 24 h turnaround, price not shown [P][R34]. Superside: from $15,000 a month on an annual term, plus $1,000 a month software fee [P][R35]. Agencies' own wholesale rates: **evidence missing**. | Billo: UGC video from $99 (15 s, "basic editing" included); packs of $1,000 (10 videos), $2,500 and $5,000; "Trusted by 37,000+ brands" [P][R36]. Per-ad editing rates on their own: **evidence missing**. |
| Skills and communication | Brand guides, written briefs, Slack or Frame.io; some review calls [E] | Fast iteration, performance awareness, English on-screen text (copy is usually supplied) [E] |
| Competition | Productised editing subscriptions [P][R33–R35] | UGC platforms that include editing [P][R36]; Meta reports about 10M advertisers using its generative-AI creative tools in Q3 2026, with video generation up 25% on the quarter [S][R37] |
| Fit | **Medium to high in the UK** (non-EU, English, 2 h apart). **Medium** in the Netherlands, Nordics and DACH once 97a is handled. | **Medium to low direct**; better reached through agencies |

---

#### (f) Real-estate video editing (realtors and real-estate photographers, especially in the US)

| Question | Assessment |
|---|---|
| Who pays | Mostly real-estate photographers and videographers who shoot and then outsource the edit; some agents and brokerages [E, consistent with R39 and R42]. |
| Typical order | Per listing: a 1–3 min walkthrough plus a 30–60 s vertical reel, delivered next day. Recurring weekly from photographers. |
| Willingness to pay | Fotober (Vietnam): from $35 (basic), $50 (advanced), $80 (high-end) per 90 s or longer, plus $20–$35 for social cuts [P][R39]. Tasty Edits: $278–$327 per long-form and $80–$94 per vertical video, first draft in 48 h / 24 h, team on Pacific time [P][R40]. BoxBrownie from $40; Phixer $55–$129 [S][R42]. A US videographer's end price for filming plus editing is $400–$800 at standard turnaround [S][R39]. PhotoUp's dedicated (photo) editors cost from $7.94 an hour, which shows the offshore cost floor [P][R41]. |
| Market | US existing-home sales ran at 3.75M (seasonally adjusted annual rate) in October; median price $416,700 [P][R38]. |
| Skills and communication | Stabilisation, colour, music sync, simple branded titles, vertical reframes. **Almost no dialogue.** Order forms and shared folders; fully async; 24–48 h is the norm [P][R39][R40]. |
| Competition | Very strong low-cost offshore vendors with 24 h turnaround [P][R39][R41]; automated listing-video tools [E]. |
| Fit | **Medium.** The operations fit perfectly (async, low language, overnight), but margins are thin and the work needs daily reliability, which clashes with "quiet periods only". |

---

#### (g) Wedding film editing outsourcing (US, UK and EU filmmakers)

| Question | Assessment |
|---|---|
| Who pays | Wedding filmmakers and studios, B2B, who outsource some or all of their editing, especially during and after peak season [E, consistent with R43–R46]. |
| Typical order | Per wedding: highlight film (3–8 min), feature (15–25 min), ceremony or speeches edits, teaser (30–60 s), social cuts. Seasonal, with repeat filmmakers each season. |
| Willingness to pay | Wanderlust Pro: highlight from $621, feature from $801, full documentary film from $801, ceremony clean edit from $441, social teaser from $179, save-the-date from $89; 2 revision rounds included [P][R43]. Fotober: from $35–$80 per package; extra versions $35; standard turnaround 4–8 weeks, express in 48–72 h for 30–50% more [P][R45]. Typical outsourced prices: highlight $350–$550, feature $250–$400, 10–15 business days [S][R46]. |
| Market | US: 2,041,926 marriages (2023, provisional) [P][R47]. England and Wales: 231,949 marriages and civil partnerships (2023) [P][R48]. EU: about 1.7M marriages (2024) [P][R49]. |
| Skills and communication | Story built on music, colour grading, audio from vows and speeches, multicam sync, matching the filmmaker's style from reference films and written notes. The norm is a portal plus timestamped Frame.io comments, with calls optional ("Request a call") [P][R44]. **Only moderate spoken-language load** (vows and speeches). |
| Competition | Low-cost Asian houses [P][R45]; established US and EU editing houses [P][R43]; solo editors [E]. |
| Fit | **High.** B2B buyers who brief in editing terms, music-driven work, fixed menus, high value per order, and work that can be scheduled into Hera's quiet season [E]. |

---

#### (h) Corporate and event editing

| Question | Assessment |
|---|---|
| Who pays | Corporate marketing, HR and event teams, event organisers, and production companies with overflow. |
| Typical order | Event recaps (1–3 min), interview cut-downs, session recordings, internal communications; project-based, irregular, usually custom-quoted [E]. |
| Willingness to pay | **Evidence missing** for remote editing prices. For scale: the median US film and video editor earns $75,420 a year (May 2025); there are 39,400 jobs, 35% are self-employed, and growth to 2035 is forecast at 4% [P][R50]. |
| Skills and communication | Several stakeholders, brand compliance, interviews in the client's language, committee feedback; kick-off calls are common [E]. |
| Competition | Local production companies and in-house teams [E]. |
| Fit | **Low** when selling directly to corporates. **Medium** as white-label overflow for production companies (see e). |

---

#### Cross-segment summary

| Segment | Fully written and async? | Spoken-language load in the footage | Value per unit | How often | AI and offshore pressure | Fit [E] |
|---|---|---|---|---|---|---|
| (a) Streamers: highlights | Mostly (Discord text) | High (humour, slang) | $50–$350 | Weekly | High (clips), medium (long-form) | Low to medium |
| (a) Streamers: per-clip and per-view | Yes | High | $1 per 1,000 views / a few dollars per clip | Daily | Very high | Low |
| (b) YouTube: scripted, documentary, faceless | Yes | Medium (script supplied) | $200–$750 | Weekly | Medium | Medium to high |
| (b) YouTube: comedy, commentary, IRL | Yes | High | $150–$600 | Weekly | Medium | Low |
| (c) Video podcasts | Yes | Medium to high | $80–$330 plus clips | Weekly | High | Medium |
| (d) Coaches and LinkedIn | Partly (calls expected) | High | $120–$600 | Weekly or monthly | High | Medium to low |
| (e) Agencies: white-label | Mostly | Varies | $25–$200 per item | Monthly or bursts | Medium | Medium to high (UK) |
| (e) DTC ads, direct | Partly | Medium | about $50–$150 per ad [E] | Weekly | Very high (Meta AI) | Medium to low |
| (f) Real estate | Yes | Very low | $35–$330 | Weekly | High (offshore) | Medium |
| (g) Wedding | Yes | Low to medium | $180–$800+ | Seasonal | Medium | High |
| (h) Corporate and event | Rarely | High | Custom | Irregular | Low | Low (direct) |

---

### Country comparison

**C1. Market size, language and rates**

| Country | Market-size proxies | Editor-rate evidence | Language |
|---|---|---|---|
| **United States** | YouTube ecosystem $60B+ of GDP and 540,000+ FTE jobs (2025) [P][R56]. 71% of Upwork's volume [P][R52]; 47.7% of Fiverr's revenue [P][R53]. 2.04M marriages [P][R47]; home sales at a 3.75M annual rate [P][R38]. | Median employee editor $75,420 a year (May 2025), 35% self-employed [P][R50]. YTJobs prices, in USD and largely US/UK channels: median $350 per project [P][R21]. | English |
| **United Kingdom** | YouTube £2.8B+ and 60,000+ FTE jobs (2025); over 80% of watch time on UK channels comes from abroad [P][R57]. 231,949 marriages and civil partnerships in England and Wales (2023) [P][R48]. | Bectu short-form rate card (2020): editor minimum £360 a day, which is dated [S][R51]. 9% of YTJobs posts ask for US or UK hours [P][R21]. | English |
| **Canada** | YouTube C$2B+ and 35,000+ FTE jobs (2025) [P][R58] | Not collected | English (French in Quebec) |
| **Australia** | YouTube A$1.1B+ and 18,000+ FTE jobs (2025); over 90% of watch time on Australian channels comes from abroad [P][R59] | Not collected (the official occupation page did not load) | English |
| **Germany, Austria, Switzerland** | Germany: YouTube €1B+ and 29,000+ FTE jobs (2025) [P][R60]; EU27 €8.4B+ and 220,000+ [P][R61]. Twitch German-language channels with 100+ viewers: 1,271; with 1,000+: 131 [P][R3]. | Not collected (the German pay-atlas API returned no data) | German content needs German comprehension. English proficiency ranks: Austria 2nd, Germany 4th (Switzerland not shown) [P][R62]. Written English often works for B2B [E]. |
| **Netherlands** | No YouTube country figure found. Twitch Dutch-language channels with 100+ viewers: 67 [P][R3]. | Not collected | English proficiency 5th [P][R62]; English works for B2B [E] |
| **Nordics** | Twitch channels with 100+ viewers: Finnish 62, Swedish 41, Danish 33, Norwegian 21 [P][R3]. Spotify's programme reportedly expanded to the Nordics [S][R25 headline]. | Not collected | English proficiency: Sweden 1st, Denmark 3rd, Norway 8th, Finland 17th [P][R62] |
| **Other candidates** | Ireland (English, euro), New Zealand (English, Australian time zone), UAE (Malt is active there [P][R55]); not researched further. | — | — |

**C2. Time zone, payment and fit**

| Country | Time zone vs Sofia (November) [E] | Payment, tax and trust | Fit for a first test [E] |
|---|---|---|---|
| **United States** | +7 h (New York), +10 h (Los Angeles). A Sofia day of 09:00–18:00 is 02:00–11:00 in New York, so delivery is overnight. | Marketplaces with payment protection: Upwork fee 0–15% [P][R52]; Fiverr take rate 27.7% [P][R53]; Contra commission-free [P][R54]. Direct clients use PayPal (e.g. R21 job 45628) [P]. US payers use Form W-8BEN-E to document a foreign entity's status [P][R64]. Not an EU member state, so no 97a [E from R63]. Paid test edits are common (19%) [P][R21]. | **High.** The largest pool, and also the most competitive. |
| **United Kingdom** | +2 h: same-day overlap, no overnight effect | GBP; not an EU member state since Brexit, so no 97a [E from R63]; Malt is active in the UK [P][R55] | **High.** A cultural and time-zone fit, especially for B2B. |
| **Canada** | +7 h to +10 h: overnight | Like the US; CAD; no 97a [E] | Medium to high (an extension of the US) |
| **Australia** | −9 h (Sydney): a Sofia day is 18:00–03:00 in Sydney, so delivery is overnight there too | AUD; no 97a [E] | Medium to high (overnight for Australia as well) |
| **Germany, Austria, Switzerland** | +1 h: same-day overlap | EUR over SEPA for Germany and Austria (Bulgaria uses the euro). EU B2B triggers **97a registration** before the first supply [P][R63]. Switzerland (CHF) does not, as it is not an EU member state. Malt is active in Germany and Switzerland [P][R55]. Expect formal contracts and data-processing terms for footage of people [E]. | Medium, after 97a is handled; music-only or English-language work only |
| **Netherlands** | +1 h: same-day | EUR over SEPA; 97a applies [P][R63]; Malt is active [P][R55] | Medium (agencies) after 97a |
| **Nordics** | +1 h: same-day | SEK, DKK, NOK and EUR (Finland). Sweden, Denmark and Finland are EU members, so 97a applies; Norway is not [E from R63]. Malt is active [P][R55]. | Medium (agencies) after 97a |
| **Other candidates** | Ireland +2 h; New Zealand overnight | Ireland is in the EU, so 97a applies [E] | Later |

Notes:
- **Delivery:** a client who uploads by the end of the US or Australian working day can get the edit by the next morning. This is why US real-estate photographers, podcasters and creators value European and Asian editors [E]. Vendors in Vietnam (UTC+7) and the Philippines (UTC+8) offer the same, so the edge over them is quality and reliability, not the clock [E].
- **Two practical VAT points for the accountant:**
  1. Чл. 97а, ал. 1 also requires registration when a Bulgarian business *receives* reverse-charged services from abroad, such as foreign software subscriptions [P][R63].
  2. The application under 97a is due no later than 7 days before the tax point [P][R63].

---

### Shortlist for a first test (ranked)

| Rank | Segment × country | Why | Main risk | Test offer and prices to test [E] |
|---|---|---|---|---|
| 1 | **Wedding film editing for US and UK filmmakers (B2B)** | Buyers are video professionals who brief in writing. Portals and Frame.io are the norm [P][R44]. Menus are fixed [P][R43]. Value per order is high: a premium vendor charges from $621 for a highlight film, typical prices are $350–$550 [P][R43][S][R46]. Markets are large (2.04M US marriages; 232k in England and Wales) [P][R47][R48]. Low spoken-language load. Not EU, so no VAT registration. Work can be scheduled into Hera's quiet season. | Asian houses from $35–$80 [P][R45]. Filmmakers protect their style and need consistency. Vows and speeches need some English comprehension. | Highlight film (4–6 min) $350–$450; feature (15–20 min) $450–$600; teaser (60 s) $120–$150; 10 business days; 2 revision rounds; footage cap per film. Samples: 3 films from footage Hera has the rights to. |
| 2 | **Scripted, documentary and faceless YouTube long-form for US channels (via YTJobs)** | Active demand (193 new editor posts in 30 days), documentary median $450 [P][R21]. The script or voiceover arrives in writing. Paid per project. Overnight delivery. | Heavy competition; test edits (19%); a few posts ban AI visuals [P][R21]. | $250–$500 per 8–15 min video depending on motion graphics, plus Shorts at $40–$60 each. Apply to 5–10 posts a week with short, personal, human-written messages. |
| 3 | **Video podcast episode plus clips for US, UK, Canadian and Australian podcasters** | Weekly and recurring; growing (1B+ YouTube podcast viewers [P][R24]; Spotify thresholds cut [P][R25]). Mostly mechanical multicam work. | AI automation (Descript, OpusClip) and offshore prices of $80–$155 [P][R16][R28]. Choosing clips needs English comprehension. | $150–$250 per episode up to 60 min (multicam, audio clean-up, captions), plus 3–5 clips at $40–$60 each; first draft in 48 h. |
| 4 | **White-label overflow for UK marketing agencies** (later: the Netherlands and Nordics, after 97a) | B2B with written briefs; same-day overlap; not EU. Productised competitors charge from $1,000 a month [P][R33]. | Agencies expect Slack responsiveness and occasional calls; unit prices are lower. | Monthly blocks, e.g. 20 Shorts or 5 long-form; one free test piece; overnight or 24 h delivery. |
| 5 | **Real-estate listing videos for US (and Australian) photographers** | The most async and least language-dependent segment. A 24 h turnaround fits the time-zone gap [P][R39][R40]. | Price floor of $35–$80 from Vietnamese and Philippine vendors [P][R39][R41]; daily reliability needed. | $60–$120 per 1–3 min listing video plus $20–$30 per vertical cut; next-morning delivery (US time). |
| 6 | **Streamers (Twitch, Kick, YouTube Live): go only as described below** | 6,954 English-language Twitch channels average 100+ viewers and 1,441 average 500+ [P][R3]; Kick is growing fast (+30.7%) [P][R5]. | High language load; AI and community clippers; small budgets [P][R11–R13][S][R6]. | $120–$250 per 10–20 min YouTube highlight video plus $100–$175 per 3–5 Shorts; weekly packages. |

**Rough hourly yield at the test prices** [E]. These are my assumptions about editing time, to check during the test:

| Unit | Assumed hours | Implied rate |
|---|---|---|
| Wedding highlight at $400 | 12–20 h | $20–$33/h |
| Documentary YouTube video at $350 | 8–16 h | $22–$44/h |
| Podcast episode at $200 | 2–4 h | $50–$100/h |
| Real-estate video at $80 | 1–2 h | $40–$80/h |
| Streamer highlight at $200 | 4–8 h (with viewer Clips and chat markers) | $25–$50/h |

Podcasts and real estate pay better per hour but face the most AI and offshore pressure. Weddings pay less per hour but are the hardest to replace.

How to run the test [E]:
- Run tests 1–3 in parallel for 6–8 weeks, each with its own sample reel and landing page. Clients hire by niche (see the style tags in R21), not "we edit everything".
- Sell only fixed packages, paid in advance or by milestone. A platform with payment protection (Upwork) or direct PayPal or bank transfer both work.
- A simple pass mark: at least 2 repeat-paying clients and at least $1,000 of revenue by week 8 in a segment.

#### What to avoid

| Avoid | Why |
|---|---|
| Per-view clipping (Whop Content Rewards and similar) as income | Median $1.00 per 1,000 views, a 10% fee, $200 median cap, unpaid when budgets run out; average lifetime payout about $30 per posting clipper [P][R19][R20][E]. Casino campaigns carry reputational risk [S][R66]. |
| Per-clip Shorts for small streamers (under about 300 viewers) | AI tools give about 30 edited clips per stream for $27 a month [P][R13]; Twitch is formalising unpaid "trusted clippers" [S][R6]; a 100-viewer channel's sub income is about $125–$525 a month [E]. |
| Comedy, commentary and IRL long-form as a first niche | Humour, slang and timing decide the cut; posts ask for "comedic timing" [P][R21]. |
| Coaches who expect calls and strategy | Dialogue-heavy, and subscription competitors bundle strategy and account managers [P][R30][R31]. |
| Corporate and event clients directly | Stakeholders, kick-off calls and local trust [E]; reach them only through production companies. |
| EU clients (Germany, Austria, Netherlands, Sweden, Denmark, Finland) before 97a registration | Registration is mandatory before the first EU B2B supply [P][R63]; German, Dutch and Nordic-language footage also needs comprehension. |
| A Fiverr-first strategy | 27.7% take rate; active buyers down 13.6%; AI is reducing demand for simple services [P][R53]. Use YTJobs, direct outreach, Contra (0% commission [P][R54]) or Upwork (0–15% fee [P][R52]). |
| Daily turnaround commitments (24 h real estate, daily Shorts) if capacity exists only in quiet periods | Clients buy reliability; when Hera's own shoots come first, missed deadlines end the relationship [E]. |
| AI-written proposals and visible "AI slop" | "No AI proposals will be considered"; "No AI slop"; 2% of posts ban AI visuals [P][R21]. Translation help is fine, but messages must be short, specific and personal. |

#### Twitch streamers: the direct answer

**Go, but only as a fixed-price YouTube-highlights service for English-language streamers who average roughly 300 or more viewers and already publish on YouTube.**

The service:
- One 10–20 min highlight video per stream or week, plus a bundle of 3–5 Shorts cut from it.
- Priced per finished video ($120–$250) and per bundle ($100–$175) [E], anchored on the $180 gameplay median and the $210–$350 examples on YTJobs [P][R21].
- Moments found from viewers' Twitch Clips and chat spikes, which reduces the need for fluent spoken English [E][S][R6].

Do not sell:
- per-clip "viral clips" to small streamers, because AI tools cost $15–$40 a month and community clippers are free [P][R11–R13];
- per-view clipping, at about $1 per 1,000 views [P][R19].

Rank it 6th of 6 for the first test: a small, low-cost test through stream-related YTJobs posts and text-only outreach. The pool is real (681 English-language channels average 1,000+ viewers, and 1,441 average 500+ [P][R3]), but it is small, culture-heavy and contested.

#### Fixed-price packages or custom quotes?

- **Fixed packages for every productised deliverable.** Most editor jobs pay per project (64% on YTJobs [P][R21]), and specialist vendors publish fixed menus. They cap raw footage (60 min / 20 GB [P][R27][R40]), revisions (2 rounds at Wanderlust [P][R43]; 3 per video at VidChops [P][R30]) and turnaround (24–48 h first draft [P][R27]; 1–2 days [P][R30]). They charge in advance or monthly (Billo prepaid packs [P][R36]; Vidpros monthly with a $100 trial week [P][R33]).
- **Why packages suit this editor:** a fixed menu removes most negotiation, which is the hardest part without spoken English [E].
- **Custom quotes** only for corporate and event work, motion-graphics-heavy projects, and footage over the caps [E].

#### Should the US be the target?

Yes, as the primary market:
- Most freelance spend is from the US: 71% of Upwork's volume and 48% of Fiverr's revenue [P][R52][R53].
- YTJobs pays in USD [P][R21].
- Delivery to the US is overnight [E].
- US clients do not trigger EU VAT registration [E from R63].

But pair it with the UK (same language, same-day overlap, B2B culture) and treat Canada and Australia as extensions. Expect the hardest competition in the US: the largest groups of freelancers serving it are in the US, India, the Philippines and Pakistan [P][R52].

---

### Evidence gaps (stated plainly)

- **Kick and YouTube Live:** no public distribution of channels by average viewers could be opened; Streams Charts' rankings return HTTP 403.
- **Mid-tier streamer income:** no published data; table A3 is an illustration only.
- **Rates for agency white-label work, per-ad DTC edits and corporate or event editing:** no primary price lists found.
- **Local editor rates in Canada, Australia, DACH, the Netherlands and the Nordics:** not collected (official pages failed to load). The UK figure is a 2020 rate card.
- **Marketplace prices by category:** Upwork and Fiverr category and price pages blocked automated reads; The Knot's wedding cost study also blocked.
- **Share of creators who hire editors, and of wedding filmmakers who outsource:** not found.
- **Meta AI adoption, Spotify video-podcast counts, Twitch's Plus Program thresholds and Kick's partner pay:** seen only in secondary coverage [S].

---

### Sources

All read on 2026-11-18. [S] marks entries where only a search-result summary was seen and the page was not opened.

| # | Source | URL |
|---|---|---|
| R1 | TwitchTracker: Statistics overview (monthly viewers, channels, active streamers) | https://twitchtracker.com/statistics |
| R2 | TwitchTracker: Streamers ranked by average viewers, last 30 days (pages 1, 40–50, 100–104, 199–200); default ranking | https://twitchtracker.com/channels/viewership?page=48 and https://twitchtracker.com/channels/ranking |
| R3 | SullyGnome: Channel search (30 days; average-viewer, hours-streamed and language filters; counts from the form's own search endpoint) | https://sullygnome.com/channelsearch |
| R4 | SullyGnome: Channel table, 30 days (sorted by average viewers; 1,772,941 channels tracked) | https://sullygnome.com/channels/30/watched |
| R5 | Streams Charts: "Q3 2026 Global Livestreaming Landscape" (13 Oct 2026) | https://streamscharts.com/news/q3-2026-global-livestreaming-landscape |
| R6 | Streams Charts: "TwitchCon 2026 announcements: Hosting returns, TV co-streams and longer Clips" (16 Nov 2026) | https://streamscharts.com/news/twitchcon-2026-updates |
| R7 | Streams Charts: "Multistreaming in 2026" (18 Nov 2026) | https://streamscharts.com/news/multistreaming-2026-insights |
| R8 | Streams Charts: "How to grow and make money on Kick in 2026" (19 Feb 2026) | https://streamscharts.com/news/how-grow-and-make-money-kick-2026 |
| R9 | TwitchTracker: Subscribers ranking (Tier 1 labelled $4.99) | https://twitchtracker.com/subscribers |
| R10 | [S] Search summary on Twitch "Plus Program" and Path to Partner (TechCrunch and others) | https://techcrunch.com/?p=2655918 ; https://techcrunch.com/2023/06/15/twitch-partner-plus |
| R11 | OpusClip: Pricing | https://www.opus.pro/pricing |
| R12 | Eklipse: Pricing | https://eklipse.gg/pricing/ |
| R13 | StreamLadder: Pricing | https://streamladder.com/pricing |
| R14 | Klap: Pricing | https://klap.app/pricing |
| R15 | Submagic: Pricing | https://www.submagic.co/pricing |
| R16 | Descript: Pricing | https://www.descript.com/pricing |
| R17 | Vizard: Pricing (prices did not render) | https://vizard.ai/pricing |
| R18 | Whop Docs: Content Rewards | https://docs.whop.com/memberships-and-access/third-party-apps/content-rewards |
| R19 | Content Rewards: "How much do clippers make" (rate snapshot 16 Nov 2026) | https://contentrewards.com/articles/how-much-do-clippers-make |
| R20 | Content Rewards: "How Clipping Payouts Work" (9 Nov 2026) | https://contentrewards.com/articles/clipping-payouts-explained |
| R21 | YTJobs: public job feed (594 active jobs; details of all 376 video-editor jobs), with example postings 46769, 45895, 45628, 46136, 44501 and 45847 | https://app.ytjobs.co/api/jobs ; https://ytjobs.co/job/46769 ; https://ytjobs.co/job/45895 ; https://ytjobs.co/job/45628 ; https://ytjobs.co/job/46136 ; https://ytjobs.co/job/44501 ; https://ytjobs.co/job/45847 |
| R22 | YouTube Official Blog: "New opportunities to earn" (YPP updates, 10 Aug 2026) | https://blog.youtube/news-and-events/youtube-partner-program-updates-2027-new-opportunities-earn/ |
| R23 | vidIQ Research: YouTube subscriber benchmarks 2026 (snapshot 20 Jul 2026) | https://vidiq.com/research/youtube-subscriber-benchmarks-2026/ |
| R24 | YouTube Official Blog: 1 billion monthly podcast users (26 Feb 2025) | https://blog.youtube/news-and-events/1-billion-monthly-podcast-users/ |
| R25 | Spotify Newsroom: Spotify Partner Program updates (7 Jan 2026) | https://newsroom.spotify.com/2026-01-07/spotify-partner-program-updates |
| R26 | [S] Search summary on Spotify video podcasts and Partner Program markets | https://www.thewrap.com/industry-news/business/spotify-partner-program-podcasts-revenue-creators ; https://routenote.com/radar/spotify-partner-program-expands-to-more-than-35-new-countries-how-creators-can-make-money/ |
| R27 | Tasty Edits: Video editing services for podcasters | https://www.tastyedits.com/video-editing-services-for-podcasters/ |
| R28 | Contra: Multi-cam podcast edits listing (seller in Mumbai) | https://contra.com/s/qqo2ZEXF-get-broadcast-quality-multi-cam-podcast-edits-in-dollar80-and-more |
| R29 | [S] Search summary on podcast editing retainers | https://vidpros.com/the-best-podcast-video-editing-services-for-a-polished-podcast/ ; https://musicradiocreative.com/pages/podcast-production ; https://thepodcastconsultant.com/blog/podcast-editing-services |
| R30 | VidChops: Pricing | https://vidchops.com/pricing |
| R31 | Video Husky: Pricing | https://www.videohusky.com/pricing |
| R32 | [S] TechCrunch via search: LinkedIn video uploads up 36% (Feb 2025) | https://techcrunch.com/2025/02/04/linkedin-amps-up-vertical-video-tools-as-uploads-jump-36 |
| R33 | Vidpros: Pricing | https://vidpros.com/pricing/ |
| R34 | Kimp: Pricing | https://www.kimp.io/pricing/ |
| R35 | Superside: Pricing | https://www.superside.com/pricing |
| R36 | Billo: Pricing | https://billo.app/pricing/ |
| R37 | [S] Search summary on Meta generative-AI ad tools (Q1–Q3 2026 calls) | https://fourweekmba.com/ai-nearly-10-million-advertisers-used-metas-ai-ad-tools/ ; https://ppc.land/meta-q1-2026-56-3b-revenue-as-ai-tools-double-advertiser-adoption/ |
| R38 | NAR: Quick real estate statistics | https://www.nar.realtor/research-and-statistics/quick-real-estate-statistics |
| R39 | Fotober: "Real Estate Video Pricing" (11 Jun 2025); company page (Vietnam, +84) | https://fotober.com/real-estate-video-pricing ; https://fotober.com/real-estate-video-editing |
| R40 | Tasty Edits: Real estate video services | https://www.tastyedits.com/real-estate-video-services/ |
| R41 | PhotoUp: Pricing | https://www.photoup.net/pricing/ |
| R42 | [S] Search summary on real-estate editing outsourcing prices | https://imagen-ai.com/post/real-estate-video-editing-outsourcing/ ; https://www.photoup.net/learn/best-real-estate-video-editing-services |
| R43 | Wanderlust: Pro pricing (wedding editing for filmmakers) | https://www.wanderlust-videos.com/pricing-wanderlust-pro/ |
| R44 | Wanderlust: Home page (portal, Frame.io, project manager) | https://www.wanderlust-videos.com/ |
| R45 | Fotober: "Wedding video editing pricing" (12 Feb 2026) | https://fotober.com/wedding-video-editing-pricing |
| R46 | [S] Search summary on wedding outsourcing prices and turnaround | https://theyesgirls.com/best-wedding-video-editing-companies-top-services-for-videographers/ ; https://pixflow.net/blog/5-best-places-to-outsource-wedding-video-editing |
| R47 | CDC/NCHS: FastStats, marriage and divorce | https://www.cdc.gov/nchs/fastats/marriage-divorce.htm |
| R48 | ONS: Marriages in England and Wales (provisional) 2023, released 18 Nov 2025 | https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/marriagecohabitationandcivilpartnerships/bulletins/marriagesinenglandandwalesprovisional/latest |
| R49 | Eurostat: Marriage and divorce statistics | https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Marriage_and_divorce_statistics |
| R50 | US BLS: Occupational Outlook Handbook, film and video editors and camera operators | https://www.bls.gov/ooh/media-and-communication/film-and-video-editors-and-camera-operators.htm |
| R51 | [S] Search summary on Bectu rate cards (short-form rate card 2020) | https://members.bectu.org.uk/filegrab/pp-f-short-rate-card-2020.pdf?ref=2763 ; https://bectu.org.uk/ratecards |
| R52 | Upwork Inc.: Form 10-K for 2025 (filed 13 Feb 2026) | https://www.sec.gov/Archives/edgar/data/1627475/000162747526000012/upwk-20251231.htm |
| R53 | Fiverr International: Form 20-F for 2025 (filed 12 Mar 2026) | https://www.sec.gov/Archives/edgar/data/1762301/000117891326000858/zk2634486.htm |
| R54 | Contra: Pricing | https://contra.com/pricing |
| R55 | Malt: About (countries of operation) | https://trends.malt.com/en/about |
| R56 | YouTube Official Blog: 2025 US impact report (16 Jul 2026) | https://blog.youtube/news-and-events/2025-us-youtube-impact-report/ |
| R57 | YouTube: Impact, United Kingdom | https://www.youtube.com/intl/ALL_uk/howyoutubeworks/youtubes-impact/ |
| R58 | YouTube: Impact, Canada | https://www.youtube.com/intl/en_ca/howyoutubeworks/youtubes-impact/ |
| R59 | YouTube: Impact, Australia | https://www.youtube.com/intl/en_au/howyoutubeworks/youtubes-impact/ |
| R60 | YouTube: Impact, Germany | https://www.youtube.com/intl/de_de/howyoutubeworks/youtubes-impact/ |
| R61 | YouTube: Impact, EU27 | https://www.youtube.com/intl/en_be/howyoutubeworks/youtubes-impact/ |
| R62 | EF: English Proficiency Index 2026 | https://www.ef.com/wwen/epi/ |
| R63 | ЗДДС (Bulgarian VAT Act), чл. 97а, ал. 1–4, on lex.bg | https://lex.bg/laws/ldoc/2135533201 |
| R64 | IRS: About Form W-8BEN-E | https://www.irs.gov/forms-pubs/about-form-w-8-ben-e |
| R65 | [S] Search summary on Fiverr Twitch-highlight gigs (Fiverr blocked direct reads) | https://fiverr.com/mboukabous/edit-your-twitch-vod-into-youtube-highlights-and-shorts ; https://fiverr.com/immanuelwalker2/edit-your-twitch-vods-into-youtube-highlights-for-streamers |
| R66 | [S] Search summary on Whop clipping rates and campaign examples | https://www.opus.pro/blog/whop-content-rewards ; https://www.builtbyfoundry.io/blog/what-is-clipping-1-dollar-per-1000-views-50-campaigns |
| R67 | [S] Search summary on Kick's creator programme thresholds | https://streamerpro.pages.dev/kcip-requirements |

---

## Part 2. What remote editing sells for

Research for Hera Editing, 2026-11-18. Scope: the async, written-only remote-editing side line. Read-only research: nothing in the repository or the design workspace was changed.

**Marks.** **[P]** published: read on the provider's own page. **[S]** secondary or unverified: market guides and roundups, or search-engine summaries of pages that blocked automated reading. **[E]** my estimate or calculation.

**Citations.** Every source was read on 2026-11-18. Source codes such as [U2] or [S5] link to the source list at the end, which gives each URL, the date read and the mark. A page's VAT or sales-tax treatment is stated where the page gave it; otherwise the page did not say.

**Currency.** ECB reference rates for 2026-11-18: €1 = $1.0968 = £0.8329 **[P]** [X1]. All conversions between USD, EUR and GBP are **[E]** at these rates. Hera's own prices in section 6 are net of VAT and before platform fees.

---

### Key numbers

- **Upwork rates, from Upwork's own hiring guides (dated Nov 2026).** **[P]** [U1]–[U7]
  - Video editors "generally" charge $10–60/h, with a median of $35/h.
  - By tier: entry below $30/h (median $10), mid $31–60/h (median $40), senior $61–150/h (median $100).
  - Podcast editors: $20–31/h. The YouTube, real-estate and AI-video pages say $6–25/h.
- **Upwork fixed-price norms.** **[P]** [U1], [U3]–[U6]
  - Single short-form edit: $75–300. Batch of clips: $400–1,200.
  - Basic YouTube edit (10–15 min): $100–500.
  - Podcast episode: $200–500 for a full edit, $500–1,200 for a video podcast.
  - Real-estate listing video: $75–300. Corporate or brand video: $1,000–3,000. Ad set: $800–2,500.
- **Fiverr blocked automated reading (HTTP 403).** These figures come from search-result summaries of Fiverr's own pages, and are **[S]** [F1]–[F12].
  - Most gigs start at $5–60. Short-form clips usually start at $10–30.
  - Podcast episodes: $25–260. Twitch highlight packages: $20–60 for 1–3 hours of footage.
  - Wedding highlights: $15–450. Real-estate edits: from $10–30.
  - Seller fee: 20% (the seller keeps 80%).
- **Productized services, per unit.**
  - VidChops: $495 a month for 4 long-form or 16 short videos, about $124 or $31 each.
  - Vidpros: $1,000 a month for 5–10 long-form or 20–40 shorts, $100–200 or $25–50 each.
  - Tasty Edits: $278–327 per horizontal video, $80–94 per vertical, thumbnail +$43.
  - Flocksy sells hours: $28.55–40.45 per hour on its smallest plan.
  - Sources: **[P]**, per-unit figures **[E]** [S1], [S2], [S4], [S5].
- **Specialist prices.** **[P]** [S7], [S8], [S10], [S11]
  - Video podcast: $350–800 per episode (The Podcast Consultant); £115–200, about $151–263, in the UK (Music Radio Creative).
  - Real-estate video: $97 per 60-second video (CloudPano).
  - Wedding editing for filmmakers (VeedYou, Romania): highlight $299, feature $349, full film $449.
- **Ads.** An agency guide prices a mashup ad with 4 hook variations at $400–750, and a B-roll ad with 4 hooks at $750–1,500. **[S]** [G1]
- **The AI floor: $15–79 a month buys automatic clipping and captions.** **[P]** [T1]–[T8]
  - OpusClip $15/$29; StreamLadder $15/$27/$39; Klap $29/$79; Submagic $19/$39/$69; Descript $24–65 monthly; Eklipse from $24.99.
  - That works out to cents per clip: about $0.26 per clip on Klap Pro, and about $5.80 per hour of source video on OpusClip Pro **[E]**.
  - Human-written captions start at $1.99 a minute at Rev **[P]** [T9].
- **Editing time.** **[S]** [H1]–[H3], [S13]
  - The usual rule of thumb is 30–60 minutes of editing per finished minute; a simple talking-head video takes 20–30.
  - A thorough podcast edit takes about 2 hours per hour of audio.
  - A 3–5 minute wedding highlight takes 15–20 hours; one vendor says 30–50.
- **AI saves time, but modestly.** In Adobe's survey of 384 US creators, 56% save more than 30 minutes per video, and 10% save more than 4 hours. **[P]** [H4]
- **No calls needed at this level.** None of the per-video or entry subscription services read here says a call is required. Calls appear as optional onboarding, or at agency and "channel management" tiers. A written, async offer is normal at this level. **[P]** [S1]–[S8]
- **Proposed pricing.** **[E]**
  - List prices aim at about $40–45 (€36–41) per editing hour, and $50+ for ads. The floor is $35/h.
  - Examples:
    - 10 stream clips: $170 (€155).
    - Stream highlight video: $270 (€245).
    - 15-minute YouTube talk edit: $280 (€255).
    - Video podcast episode with 3 clips: $260 (€235).
    - Real-estate video with a vertical reel: $120 (€110).
    - Ad pack: $420 (€385).
- **Capacity.** 30 hours a week leaves about 110 billable hours a month after admin and written communication. At full load that is about $4,400–4,600 (€4,000–4,200) gross a month, before platform fees, software and taxes. **[E]**
- **Wedding highlights are the weakest line.** The visible market price ($299–350) against 15–50 hours of work pays about $6–23 an hour. Lead with full films, teasers, highlights cut from the filmmaker's selected clips, and real-estate work. **[E]**

---

### 1. Marketplace benchmarks

#### 1.1 Fiverr

Fiverr returned HTTP 403 for every page tried: category pages, gig pages, Help Center articles and the `it.` subdomain (`block.fiverr.com` redirects to the main site). The figures below are therefore **[S]**. They come from search-engine summaries of Fiverr's own pages, are a snapshot, and are usually the "From" price of a seller's cheapest tier.

| Category | Typical "From" and tier prices | Delivery and revisions seen | Source |
|---|---|---|---|
| YouTube video editing | The category page says gigs "typically range from $60 to $70", but its metadata is about four years old, so the figure is likely stale. Gigs run from $5 to $100+ and are often priced per footage minute ("From $10 / 1 minute", "From $100 / 5 minutes"). Examples: $5 (up to 4 min; thumbnail in the higher tiers); $35 (1 revision); $70 (up to 5 min, with subtitles and colour grading). Fiverr's cost guide: YouTube from $5 per finished minute, about $65 per project on average. | $5 gig: 3 days. $35 gig: 3 days, with a 1-day option. $70 gig: 6 days, unlimited revisions. | [F1] [F2] [F3] |
| Short-form (Reels, TikTok, Shorts) | From $5–50, most $10–25; premium sellers $100–200; euro listings €5–19 | not shown consistently | [F4] |
| Video ads and UGC ad editing | Video-advertising category blurb: $30–35. AI-UGC gigs: $10/$35/$70 for 15/30/60 s. Multi-hook bundles: $20/$50/$80. Human-creator UGC: $250/$350/$600. Editing-only ad gigs from $14.05. | 1–5 days; 1–3 revisions, sometimes unlimited | [F9] |
| Podcast editing (audio and video) | Base packages $25–150. Example tiers: $25/$50/$80, from a 40-minute clean-up to a 75-minute full production. Another seller: $120/$200/$260 for 30/60/90 min. A Fiverr Pro seller: $100 per episode. Also $40 for up to 30 min of audio and video. | 2/3/4 days; 5 days with 2 revisions; 3 days with unlimited revisions; rush +$25 for 1 day | [F5] |
| Twitch and stream highlights | From $5–60; agency gigs $100–150. Basic $25: up to 30 min of footage into a video of up to 5 min. Standard $60: up to 180 min into up to 7 min. $24.60: up to 90 min into up to 15 min. One seller: €17.22/€38.76/€51.67 for 60/180/240 min of footage. Hourly sellers: $21.10–40/h. | 3 days, 3 revisions; 7 days, unlimited; 4 days, 1 revision | [F6] |
| Gaming montages | No usable figures found | n/a | [F13] |
| Wedding video editing | From $10 per minute up to $450; many cinematic highlights cost $50–150. $15: up to 30 min of footage into a video of up to 2 min. $90: up to 60 min of footage into up to 5 min, unlimited revisions. $150: up to 2 min, 3 revisions. | 1, 3 and 5 days respectively; sellers' FAQs say 3–7 days | [F7] |
| Real-estate video editing | From $10–30; AI or "luxury" offers $60–100; one at $350. Tiers $10/$20/$30 for 60/180/300 s. Tiers $30/$60/$90 for 30/55/90 s. | 1 day is common; "24 hours" appears in gig titles | [F8] |
| Corporate video editing | Listings from about $20 for 1 minute to about $200 for 10 minutes. Fiverr's guide: corporate work from $10 per finished minute. | n/a | [F1] [F10] |
| Subtitles and captions | Category blurb: $39–67, average $54 | n/a | [F11] |
| Motion graphics | Many gigs from $100. Some tiers from $30 (2 days, 2 revisions). A template-based broadcast package (intro, lower thirds, stinger) at $300. | 2 days | [F10] |

**Fiverr fees [S] [F12].**
- Sellers keep 80% of each order, including extras and tips. Fiverr's Pro-seller article gives the example of a $1,000 gig paying the seller $800.
- Buyers pay a separate service fee, summarised in search results as 5.5% plus $3.50 on orders under $200.
- Some listings say their prices are "before service fees".

**What it means [E].**
- Fiverr's visible floor is $5–30 per deliverable, from very low-cost sellers. Hera cannot win a price race there.
- Fiverr is useful for collecting reviews on small entry products, priced with the 20% fee in mind.

#### 1.2 Upwork

`www.upwork.com` and `support.upwork.com` returned 403. Upwork's own mirror at `research.upwork.com` served the same hiring guides, with titles dated Nov 2026 **[P]**. These are Upwork marketing pages and partly inconsistent (see the cost-page row).

**Hourly rates**

| Upwork page | Hourly figure | Notes | Source |
|---|---|---|---|
| Video editors (hire page) | "generally costs $10–$60 per hour" | Featured profiles: Vietnam, $10–15/h | [U1] |
| Video editors (cost page) | Median $35/h. The meta description says $10–60/h, the body says $6–25/h. | Tiers: entry below $30 (median $10), mid $31–60 (median $40), senior $61–150 (median $100). The data is described as "typical hourly rate ranges of certain historical contracts worldwide". | [U2] |
| Short-form video editors | $10–60/h | Featured: Vietnam $15–16, US $30, Colombia $15, Pakistan $5 | [U3] |
| YouTube video editors | $6–25/h | | [U4] |
| Podcast editors | $20–31/h | | [U5] |
| Real-estate video editors | $6–25/h | | [U6] |
| AI video editors | $6–25/h | | [U7] |

**Typical fixed-price jobs [P]**

| Job | Upwork range | Level named | Source |
|---|---|---|---|
| Social media clip editing | $200–600 | entry–intermediate | [U1] |
| Single short video edit | $75–300 | entry–mid | [U3] |
| Batch of platform-ready clips | $400–1,200 | mid | [U3] |
| Branded campaign or ad set | $800–2,500 | mid–senior | [U3] |
| Short-form content retainer | $1,500–3,000+ | senior | [U3] |
| Basic YouTube edit (10–15 min) | $100–500 | entry–mid | [U4] |
| YouTube 3–5 video package | $500–1,500 | mid–senior | [U4] |
| YouTube retainer (4–10 videos a month) | $1,200–4,800+ | mid–senior | [U4] |
| YouTube video production | $500–1,500 | intermediate | [U1] |
| Podcast episode audio clean-up | $50–200 | entry | [U5] |
| Full podcast episode edit with intro and outro | $200–500 | mid | [U5] |
| Video podcast episode production | $500–1,200 | expert | [U5] |
| Podcast series (4–6 episodes) | $1,500–4,000 | expert | [U5] |
| Monthly podcast retainer | $800–2,500 | mid–expert | [U5] |
| Single real-estate listing edit | $75–300 | entry–mid | [U6] |
| Multi-property package | $500–1,500 | mid–senior | [U6] |
| Luxury or cinematic property video | $1,500–4,000 | senior | [U6] |
| Listing-video retainer | $1,000–3,000 | mid–senior | [U6] |
| Corporate or brand video | $1,000–3,000 | intermediate–expert | [U1] |
| Motion graphics and animation | $1,500–5,000 | expert | [U1] |
| Ongoing content-editing retainer | $2,000–5,000 | intermediate–expert | [U1] |
| AI-assisted short-form edits | $100–600 | entry–intermediate | [U7] |

**Upwork fees.**
- **Service fee [S] [U8].** Upwork's support article, read only through search results, describes a variable freelancer service fee of 0–15%. The fee is set per contract, shown before you send a proposal or accept an offer, and fixed for the life of the contract.
- **User Agreement [P] [U9].** Version 8.2 (effective 2026-07-20) refers fee amounts to the "Fee and ACH Authorization Agreement".
- **Not verified.** The prices of Connects (paid proposal credits) and of Freelancer Plus could not be read, because the pages were blocked.

**What it means [E].**
- Upwork's mid tier ($31–60/h, median $40) is the natural band for an experienced editor with real samples.
- The featured profiles at $5–16/h show the offshore floor.

#### 1.3 Contra, PeoplePerHour and Malt

| Platform | Freelancer fees | Other evidence | Source |
|---|---|---|---|
| Contra | "Always commission-free for all creatives". On the free plan, clients pay a fee of "$15 or $29 per payment >$500". Contra Pro costs $29 a month or $199 a year and waives it. The page is dated 2026-11-16. **[P]** | Listings: a subscription editor at $1,495 a month (one request at a time, 48–72 h); a podcast and YouTube editor from $1,199 a month; a stream and clip editor from $14/h (Uganda). **[P]** | [M1] [M5] |
| PeoplePerHour | Terms §8.2, in force since 2 Dec 2019. The fee is a share of lifetime billing per buyer, excluding VAT: 20% below £250 / $350 / €300; 7.5% up to £5,000 / $7,000 / €6,000; 3.5% above that. Minimum £1 / €1.2 / $1.4 per invoice. **[P]** | n/a | [M2] |
| Malt | The help centre returned 403. Search summaries give a 10% fee on a first project with a client found through Malt, falling to 5% after six months (France, Spain, Belgium); 5% elsewhere; 2% for clients the freelancer invites. All excluding VAT. **[S]** | Malt's 2026 rate barometer puts experienced motion designers at an average of €420 a day in France and €373 in the UK. **[S]** Not checked: whether Malt accepts freelancers based in Bulgaria. | [M3] [M4] |

---

### 2. Productized and subscription editing services

**Note on tax.** None of the service pages in this table said whether its prices include VAT or sales tax. "n/s" means the page did not say.

| Service (where stated) | Price | Videos and length | Turnaround | Revisions | Captions, thumbnails, music | Minimum term | Calls | Source |
|---|---|---|---|---|---|---|---|---|
| **VidChops** | Weekly $495/mo; Pro $995/mo | 4 credits a month (Pro: 8). One credit is one long-form video (5–60 min raw; the FAQ caps the finished video at 15–20 min) or 4 shorts. That is about $124 per long-form and $31 per short **[E]**. | "1–2 days turnaround guaranteed*"; revisions back within 1 business day | 3 per video (Pro: unlimited) | Captions on shorts only; subtitles +$95/mo; royalty-free stock audio and video; thumbnails not mentioned | No contract, cancel anytime | Not required. Pro has an account manager. A call is offered for the full-time-editor plan. | [S1] |
| **Vidpros** | Starter $1,000/mo; Growth $2,000/mo; Scale $4,000/mo; $100 trial week | Starter: 20–40 shorts (up to 60 s) or 5–10 long-form (up to 15 min, from up to 60 min raw). That is $25–50 per short and $100–200 per long-form **[E]**. | "Overnight delivery". Starter: about 1–2 shorts a day, or one long-form every 2–4 days. | "Unlimited*", but each round counts toward the monthly output | AI captions; royalty-free stock video and music; thumbnails not mentioned | Cancel anytime; unused output does not roll over | Not required. Scale includes a weekly strategy call on request. | [S2] |
| **Video Husky** | Eskimo $849/mo; Siberian $1,590/mo; St. Bernard $2,749/mo | Not on the pricing page | n/s | n/s | n/s | n/s | A "Book a consultation" link and a quiz; not stated as required | [S3] |
| **Flocksy** (design and video hours) | "2 Daily" plan: $1,699/mo billed monthly or $1,199/mo billed annually, for 42 h a month. Up to "10 Daily": $7,299 or $4,599 for 210 h. That is $28.55–40.45/h on "2 Daily" and $21.90–34.76/h on "10 Daily" **[E]**. | Unlimited requests; video is one of ten service lines; length n/s | Same day for briefs received before 12:00 EST | Unlimited | n/s | No contracts; unused hours roll over for 30 days | Smaller plans buy online; larger plans "Book a consultation" | [S4] |
| **Tasty Edits** | Horizontal video: $327 for one, $305 each for 4, $278 each for 8. Vertical: $94, $88 each for 15, $80 each for 30. YouTube channel management: $1,266–2,370 a month. | Length n/s | 48 h horizontal; 24 h vertical | Unlimited | Animated captions on verticals; music and SFX; unlimited stock footage; colour and audio correction; motion graphics; thumbnail +$43; vertical version +$43 | Per video. Channel management is billed quarterly or annually. | Video packages use an order form, no call. Channel management includes 1–2 calls a month. | [S5] |
| **DesignCloud** (UK) | "From £899pm", about $1,184 / €1,079. Another section of the page says "from £699pm". | Unlimited requests. A daily progress update covers about 2 hours of focused editing. At one update per working day, that is about £21 ($28) per editing hour **[E]**. | 1–2 days for simple tasks; no same-day work | Unlimited | Subtitles in platform-specific edits | No long-term contract needed; discounts for longer terms | A 15-minute demo is step 1 of onboarding; not stated as mandatory | [S6] |
| **The Podcast Consultant** | Video podcast per episode: Standard $400 (up to 1 h), Pro $550, Premium $800. Under 30 min from $350. +$150 per extra 30 min. | Up to 3 people on camera (Standard) or 6 (Pro) | 72 h; 2-day delivery +$100 | 2 rounds (Standard); 3+ (Premium) | Audio-only version included. Show notes and transcripts are Pro add-ons. Clips, captions and thumbnails not stated. | n/s | Calls invited; not stated as required | [S7] |
| **Music Radio Creative** (UK prices) | Audio per episode: from £63 (about $83) and £90 ($119). Video podcast per episode: from £115 ($151) and £200 ($263). | Audio: 2 speakers and 10 edits; or up to 4 speakers and 30 edits. Video: single camera; or multi-cam with grading and motion graphics. | 5–7 days; 3–5 days | 1 round | The FAQ mentions clips and thumbnails as part of video production | "No lock-in", pay per episode | n/s | [S8] |
| **Resonate Recordings** | Full-service production: "$2,100–6,500 a month". Editing only: from $69 per episode (Standard) to $750+ (Custom), per Rephonic **[S]**. | n/s | n/s | n/s | n/s | n/s | Quotes are call-led: "depends on scope, which is what the call is for" | [S9] [G4] |
| **VeedYou** (Romania, EU) | Wedding editing for filmmakers: highlight $299 (3–6 min); feature $349 (10–20 min); full film $449 (about 60 min) | As priced | Not published | 3 free revisions, mentioned only for re-edits | n/s | n/s | Contact by email; a call is optional | [S10] |
| **CloudPano** | $97 per property, walkthrough or reel video (60 s, 1080p); drone edit $60 | As priced; drone +$20 per 30 s over 3 min | "24 hours or less" | Unlimited "within reason" (drone: 1) | Music sync, animated title, colour correction. Add-ons such as captions, 4K and an agent intro have no published price. | Per video | n/s | [S11] |
| **Fotober** | Real estate from $35 / $50 / $80 per video (90 s or longer), plus a social cut at $20 / $25 / $35. Wedding from $35 / $50 / $80; +$35 per extra short version. | Its pages are internally inconsistent | A 48-hour example | n/s | n/s | n/s | n/s | [S12] [S13] |
| **Billo** (UGC platform) | UGC videos from $99 for 15 s, including the creator and basic editing. Packs: $1,000 (up to 10 videos); $2,500 + $300 credit (up to 28); $5,000 + $700 (up to 57). Managed service from $2,000/mo plus video costs. | 15–120 s | n/s | n/s | Captions, extra hooks and expert editing cost extra (no published price) | Packs valid 12 months, no auto-renewal | n/s | [S15] |
| **Superside** (top end) | Subscriptions from $15,000 a month on an annual term, plus a $1,000/mo software fee | Video, motion and ad variants inside a creative subscription | n/s | n/s | n/s | Annual | Onboarding sessions; a call is the route to a budget | [S16] |
| **Contra listings** (individual freelancers) | Subscription editing: $1,495/mo. Podcast and YouTube editing: from $1,199/mo (Minneapolis). | One request at a time. Long-form, and Shorts with a thumbnail. | 48–72 h; podcast "quick" | "Limited revisions" | Music cleared for online use; the podcast listing includes a thumbnail | Pause and resume | n/s | [M5] |
| **Streamer editors' own price sheets** | Kokistar (EU, €): 1 clip €15–20; 4 clips €60–80; monthly 2/4/5 clips for €30/60/75; 5–10 min highlight €40–60; VOD editing €40/h. Usagiambey ($): short (up to 1 min) $20; long-form (2–15 min) $22/h. Malastrome ($): $12 per Short; $10 per thumbnail. | As priced | Usagiambey: shorts 1–3 days; long-form 1–2 weeks | Usagiambey: up to 3 | n/s | n/s | Contact through Discord or email | [S19] |
| **Lumina Clippers** (clipping network for streamers) | Campaigns priced per 1,000 verified views ("custom CPM"), $5,000 minimum | Clips posted across a network of creator accounts | "Clips live in 24–72h" | n/s | Captioned | n/s | n/s | [S18] |

**Not included.**
- Kimp: the pricing page timed out twice.
- We Edit Podcasts: returned 403; Rephonic says it publishes no prices [G4].
- Wanderlust Videos: wedding editing for filmmakers, no prices on its home page [S20].
- Vizard: prices rendered as $0.

**What the table shows [E].**
- **Per-unit anchors:**
  - a short or vertical clip sells for $25–94;
  - a long-form YouTube edit for $100–330;
  - a video podcast episode for about $150–800.
- **"Unlimited" means a queue.** The limits are one request at a time (the Contra listing), daily updates of about 2 hours (DesignCloud), or output caps (Vidpros, VidChops). The implied hourly rate is about $20–40.
- **Async is standard.** Order forms and written briefs are the norm. Calls are optional, or reserved for retainers and management tiers.
- **Month to month is the norm.** Annual terms appear only at the top end (Superside) or for management services (Tasty Edits).
- **Streamers: no done-for-you clip service with a published monthly price was found.** The market splits between cheap freelancers (€15–20 or $12–20 a clip) and view-priced clipping networks with $5,000 minimums.

---

### 3. Price lists by deliverable

| Deliverable | Low end (marketplaces, small freelancers) | Mid-market (productized, Upwork mid) | Upper (agencies, guides) |
|---|---|---|---|
| **Long-form YouTube edit** | Fiverr from $5 per finished minute; gigs $5–100 **[S]** [F1]–[F3] | VidChops about $124 **[E]** [S1]. Vidpros $100–200 **[E]** [S2]. Upwork basic 10–15 min edit $100–500 **[P]** [U4]. Tasty Edits $278–327, plus $43 for a thumbnail **[P]** [S5]. | Upwork "YouTube video production" $500–1,500 **[P]** [U1]. Guide: $300–1,500, or $20–100 per finished minute **[S]** [G3]. |
| **Per finished minute** | Fiverr guide: $5–10/min starting, $10–100 typical **[S]** [F1] | Social or short-form: $10–50/min **[S]** [G3] | Fiverr guide: high-end commercial up to $450/min **[S]** [F1] |
| **Short clips, per clip or pack** | Fiverr from $5–50, most $10–25 **[S]** [F4]. Streamer freelancers €15–20 or $12–20 **[P]** [S19]. | VidChops about $31 and Vidpros $25–50 **[E]**. Tasty Edits $80–94 **[P]**. Upwork single short $75–300, batch $400–1,200 **[P]** [U3]. | Upwork short-form retainer $1,500–3,000+ a month **[P]** [U3] |
| **Podcast episode plus clips** | Fiverr $25–260 per episode **[S]** [F5]. Resonate editing from $69 **[S]** [G4]. | Music Radio Creative £63–200 **[P]** [S8]. Upwork full episode edit $200–500 **[P]** [U5]. Contra: podcast, YouTube, shorts and thumbnail from $1,199 a month **[P]** [M5]. | The Podcast Consultant $350–800 **[P]** [S7]. Upwork video podcast production $500–1,200 **[P]** [U5]. Resonate full service $2,100–6,500 a month **[P]** [S9]. |
| **Stream highlight video** | Fiverr $20–60 for 1–3 hours of footage; agency gigs $100–150 **[S]** [F6]. Kokistar €40–60 for a 5–10 min video; Usagiambey $22/h; a Contra editor $14/h **[P]** [S19] [M5]. | No dedicated mid-market offer found; use the long-form YouTube anchors | n/a |
| **Ad creative variations** | Fiverr ad and UGC editing $10–80; human-creator UGC $250–600 **[S]** [F9]. Insense case study: about $20 per video **[P]** [S17]. | Billo from $99 per UGC video, creator included **[P]** [S15]. Upwork ad set $800–2,500 **[P]** [U3]. | inBeat guide, each with 4 hook variations: mashup ad $400–750; B-roll ad $750–1,500; standard UGC ad $1,500–2,500 **[S]** [G1] |
| **Wedding highlight and full film** | Fiverr $15–450 **[S]** [F7]. Fotober from $35–80 **[P]** [S13]. | VeedYou: highlight $299, feature $349, full film $449 **[P]** [S10]. Cut Pro Media: highlight $350, feature $280 **[S]** [G6]. | Roundup: highlights $195–549, documentary edits $520–799 **[S]** [G6]. Fotober's US example: $750 for a 6-min highlight, a 20-min documentary and a teaser **[S]** [S13]. |
| **Real-estate property video** | Fiverr from $10–30 **[S]** [F8]. Fotober from $35–80, plus $20–35 for a social cut **[P]** [S12]. | CloudPano $97 for 60 s; drone $60 **[P]** [S11]. Upwork single listing $75–300 **[P]** [U6]. BoxBrownie from $40; Phixer $55–129 **[S]** [G7]. | Upwork luxury or cinematic $1,500–4,000 **[P]** [U6] |
| **Corporate or event video** | Fiverr from about $20 for 1 min to $200 for 10 min **[S]** [F10]. Fotober event tiers $35/$65/$100 **[S]** [S14]. | Upwork corporate or brand video $1,000–3,000 **[P]** [U1] | Guides: corporate $400–2,000 ($30–150 per finished minute); event highlight $500–2,500 ($15–75 per finished minute) **[S]** [G3]. beCreatives: corporate 3–5 min $500–2,500 **[S]** [G2]. |
| **Captions and subtitles (add-on)** | Fiverr $39–67, average $54 **[S]** [F11]; AI captions are included in the tools in section 4 | Rev: human captions $1.99/min; translated subtitles $6.49–15.99/min **[P]** [T9] | n/a |
| **Thumbnail (add-on)** | Malastrome $10 **[P]** [S19] | Tasty Edits $43 **[P]** [S5] | n/a |

---

### 4. The AI price floor

| Tool | Plans in USD, monthly billing unless stated | What you get | Tax note | Source |
|---|---|---|---|---|
| **OpusClip** | Free $0; Starter $15; Pro $29; Business: custom | One credit is one minute of source video. Starter: 150 credits a month. Pro: 300 a month per pack. Monthly-plan credits roll over for one month. AI captions; reframing (Pro: 9:16, 1:1, 16:9); AI B-roll (Pro); paid exports have no watermark. | none shown | [T1] [T2] |
| **Eklipse** | Premium from $24.99; Premium Pro $39.99 | Gaming-stream highlights and an auto clipper. Pro adds live clipping and custom highlights. Annual plans add 1080p lossless export. Clip limits "depend on your plan". | none shown | [T3] |
| **StreamLadder** | Free; Starter $15 ($150/yr); Creator $27 ($270/yr); Pro $39 ($390/yr) | Creator: ClipGPT AI clipping, unlimited within fair use, up to 30 edited clips per stream, Twitch and Kick import. Pro: 4K and 2 editors. | "Sales tax or VAT may be added". Prices "last verified November 16, 2026". | [T4] |
| **Descript** | Free; Hobbyist $24 ($16 annual); Creator $35 ($24); Business $65 ($50), per person per month. The page shows two prices per plan and says annual billing saves "up to 35%", so which price is which is inferred. | 10/30/40 media hours; 400/800/1,500 AI credits; transcript editing, filler-word removal, Studio Sound, eye contact, clips | none shown | [T5] |
| **Submagic** | Starter $19 ($12/mo yearly); Pro $39 ($23); Business $69 ($41) | 15/40/100 captioned videos a month, of at most 2/5/30 minutes each. Magic Clips from 5/15/37 long videos (sources up to 3 h). Pro adds removal of bad takes and silences, and audio clean-up. | none shown | [T6] |
| **Captions** (operator: NOCAP, Inc., links to Mirage) | Max $24.99; Frontier $69.99; Frontier 2x $139.99; Frontier 4x $279.99 | 500/1,400/2,800/5,600 AI credits; AI edit; captions in 100+ languages; AI avatars and translation | "Prices are subject to taxes based on location"; iOS prices | [T7] |
| **Klap** | Basic $29 ($14.50/mo yearly); Pro $79 ($39.50); Pro+ $189 ($94.50) | 100/300/1,000 clips a month from sources up to 3 h; virality score; active-speaker reframing; animated captions | none shown; prices updated 2026-11-04 | [T8] |
| **Rev** | Human captions from $1.99/min; translated subtitles $6.49–15.99/min. AI captions come inside subscriptions (Essentials: $29.99 monthly or $25.49 annual per seat). | Human-verified captions files | none shown | [T9] |
| **AutoClip, StreamClipping AI** | AutoClip $19.99–79.99 for 200–1,200 source minutes; StreamClipping AI €19–139 | Stream-clip finders | n/a | [G8] [T11] **[S]** |

**Per-unit floor [E].**
- **OpusClip Pro.** $29 for 300 minutes is about $0.10 per source minute, or about $5.80 per hour of footage. One 4-hour VOD uses 240 of the month's 300 credits.
- **StreamLadder Creator.** A flat $27. A streamer with 12 streams a month pays about $2.25 per stream, for up to 30 AI clips each.
- **Klap Pro.** $79 for 300 clips is about $0.26 per clip.
- **Submagic Pro.** $39 for 40 captioned shorts is about $0.98 each.
- **Captions.** Human captions for a 10-minute video cost $19.90 at Rev. AI captions are effectively free inside the tools above.
- **Comparison.** Human prices of $12–94 per clip (section 3) are about 45–360 times a tool's per-clip cost. The human offer must therefore sell what the tools do not do.

**What the tools do not do well.**
- **Generated clips are not publishable clips [S] [G8].** AutoClip, itself a clipping vendor, says what matters is how many of the generated clips are actually posted. It adds that manual work on reframing, caption fixes and uploading "can cost more than the subscription".
- **Long sources are costly or capped.** OpusClip charges per source minute, so long streams eat most of the allowance **[P]** [T2] **[E]**. Submagic caps captioned videos at 2, 5 or 30 minutes **[P]** [T6]. Klap and Submagic cap sources at 3 hours **[P]** [T6] [T8].
- **Craft work stays manual [S] [G5].** An AI video vendor writes that AI cannot "color grade, stabilize, speed-ramp or re-cut uploaded footage" (real-estate context).
- **Automatic audio edits need a human pass [S] [H3].** The Podcast Host's test of automatic filler and pause removal left "a handful of jarring edits" to undo.
- **Time savings are modest for most users.** In Adobe's survey, 56% save more than 30 minutes per video and 10% more than 4 hours **[P]** [H4]. Among VIDIO's users, 41.5% save less than an hour a week **[S]** [H5].
- **Where a human editor earns more [E]:**
  - picking moments that need context: in-jokes, gameplay with no speech, chat reactions, community references (AI rankers lean on speech and loudness);
  - building a story over 10–20 minutes: structure, pacing and payoff (streams, YouTube, weddings);
  - spelling names, game terms and brand words correctly in captions;
  - judging multicam cuts in podcasts and weddings;
  - making ad variations that follow a test plan (hook × body × call to action) rather than random cuts;
  - keeping a channel's style consistent;
  - being accountable for deadlines and revisions, and being someone the client can write to.

---

### 5. Time per deliverable

**Published evidence.** Almost all of it comes from vendors with a commercial interest; none is a controlled study.

| Deliverable | Evidence | Source |
|---|---|---|
| Any edit (rule of thumb) | 30–60 minutes of editing per finished minute; each revision round takes another 24–48 hours of turnaround | Tasty Edits **[S]** [H1] |
| Any edit | 45–60 min per finished minute. Simple talking-head or social video: 20–30 min. Stylised or motion-heavy video: 1–2 h. A revision of the first cut takes 10–25% of the first-cut time. | VeedYou **[S]** [H2] |
| YouTube, 5 min | 3–5 h (Tasty Edits); 4–6 h (VeedYou) | [H1] [H2] **[S]** |
| YouTube, 20 min | 10–20 h, spread over 2–3 days | [H1] **[S]** |
| Podcast, audio | Minimal edit: 15 minutes for a 30-minute show. Thorough interview: about 2 h per hour of audio. Highly produced: 3–5 h per hour. | The Podcast Host **[S]** [H3] |
| Podcast, video | A well-planned 30-minute multicam interview: about 2 h | VeedYou **[S]** [H2] |
| Wedding highlight | 3–5 min highlight: 15–20 h; a complete package: 25–30 h | VeedYou **[S]** [H2] |
| Wedding highlight | 5 min highlight: 30–50 h. A US example: 20–30 h of editing, plus 5 h of colour and 5 h of sound. | Fotober **[S]** [S13] |
| Event video | 5 min: 15–30 h, depending on the shooting ratio | Fotober **[S]** [S14] |
| Real-estate listing | A worked example: "an edit takes you two hours", against a $97 price | Video AI ME **[S]** [G5] |
| Streams, clips, ads, corporate | No published time evidence found | n/a |
| AI effect | 56% of creators save more than 30 minutes per video and 10% more than 4 hours; in teams of 4+, 50% save more than 2 hours | Adobe Express survey (384 US creators, December 2025) **[P]** [H4] |
| AI effect | 41.5% save under 1 h a week, 32.8% save 1–3 h, 14.1% save 3–5 h, 11.6% save over 5 h | VIDIO user survey (245 respondents) **[S]** [H5] |
| AI effect (vendor claim) | About 10 minutes of automated processing for a one-hour recording (clean-up only) | Cleanvoice **[S]** [H7] |

**Hours used for the packages [E].** These assume an experienced editor with templates and presets. Replace them with the editor's own logged times after the first 10 jobs.

| Deliverable (package scope) | Without AI | With an AI-assisted workflow | What the AI step does |
|---|---|---|---|
| Select 10 moments from a 3–4 h VOD | 1.5–2 h (playback at 2×, with notes) | 0.75–1 h | A clip finder or chat-spike markers propose candidates; the human chooses |
| One vertical clip (up to 60 s), moment already chosen | 20–30 min | 15 min | Layout template; auto-captions, then proofreading |
| Stream highlight, 10–15 min, from up to 4 h | 8–10 h | 6.5 h | Candidates and transcript search; the human builds the story |
| YouTube talking head, up to 15 min, from up to 60 min raw | 7–9 h | 6.5 h | Transcript-based rough cut (retakes, silences) |
| YouTube story, up to 12 min, B-roll heavy | 14–18 h | 12 h | Transcript search, scene detection; the craft stays manual |
| Podcast audio, 60 min | 2.5–3 h | 2.2 h | Noise and level clean-up; filler-word candidates |
| Podcast video, 60 min, plus 3 clips | 7–8 h | 5.8 h | Automatic multicam switching, speech enhancement, clip candidates |
| Ad: master + 4 hooks, each in 3 aspect ratios | 9–10 h | 8 h | Auto-reframe, captions |
| Real-estate video, 60–90 s, plus a vertical reel | 3–3.5 h | 2.75 h | Stabilisation and colour presets; beat detection |
| Wedding highlight, 4–6 min, from up to 90 min of selected clips | 11–13 h | 9.5 h | Transcripts of vows and speeches; scene detection |
| Wedding highlight from full, unculled footage (up to 8 h) | 18–25 h | 15–16 h | Transcripts; multicam audio sync |
| Wedding full film, up to 60 min | 10–12 h | 8 h | Automatic sync; transcript markers |
| Wedding teaser, 60–90 s, 16:9 + 9:16 | 4 h | 3.5 h | n/a |
| Event recap, 3 min, from 4 h of multicam footage | 12–14 h | 9–10 h | Transcripts, scene detection |

---

### 6. Proposed packages [E]

Everything in this section is **[E]**: a proposal built from the evidence above.

#### 6.1 Pricing principles

- **Target rate.**
  - List prices aim at **$40–45 per editing hour** (€36–41).
  - The floor is **$35/h** for repeat volume.
  - Ads, motion work and corporate projects carry **$50–55/h**, because they bring more variations and more approvals.
- **Why that band.**
  - It is Upwork's mid tier ($31–60/h, median $40) **[P]** [U2].
  - It sits above the productized services' implied $20–40/h **[E]**.
  - It is below Malt's experienced motion designers, about €420 a day, or roughly €52/h over 8 hours **[S]** [M4].
- **Positioning.** "AI-assisted, human-edited, written-only." Delivery is overnight for the Americas: Bulgaria is 7 hours ahead of New York, 2 hours ahead of London, and 1 hour ahead of Central Europe. Clients review through time-coded comment links.
- **Prices are net of VAT.** Hera is not VAT-registered. Selling services to EU businesses (reverse charge), and buying services such as the AI tools above from foreign suppliers, can create a duty to register for VAT in Bulgaria regardless of turnover (ЗДДС art. 97a). This was not checked in this session **[S]**. Confirm with the accountant before the first foreign invoice.
- **Platform fees.**
  - Selling on Fiverr leaves 80% **[S]**. To net the same as a direct sale, a Fiverr price must be the list price divided by 0.8; for example, a $170 pack becomes $212.
  - On Upwork the deduction is 0–15% **[S]**. Contra takes 0% **[P]**.
  - Check each platform's terms before moving a client off it.
- **One revision round** is one consolidated list of time-coded notes. New ideas after approval count as new work.
- **The turnaround clock** runs in business days. It starts when the footage and the written brief are complete and the job reaches the front of the queue.
- **Music.** The client's own licence, or a royalty-free library. Hera does not resell music licences.

#### 6.2 Streamers

| Package | Price USD / EUR | Includes | Turnaround | Revisions | Hours | Effective rate |
|---|---|---|---|---|---|---|
| **Clip Pack 10** | $170 / €155 | 10 vertical clips (up to 60 s) from one VOD of up to 4 h, or from the streamer's own Twitch or Kick clips. AI first pass, then human selection. Facecam and gameplay layout; styled, proofread captions; zooms; sound effects; hook title. 1080×1920 MP4 files with suggested post titles. | 2 business days | 1 round | 3.8 h | $45/h (€41) |
| **Highlight Video** | $270 / €245 | One 10–15 min YouTube video (16:9) from a VOD of up to 4 h. Story cut; zooms; memes and SFX from a licensed library; on-screen text; chapter list; loudness-normalised audio. | 3 business days | 2 rounds | 6.5 h | $42/h (€38) |
| **Streamer Monthly** | $1,390 / €1,265 a month | 4 Highlight Videos and 30 clips from the same VODs. A shared board for VOD links and notes. Month to month. | Highlights: 3 business days each. Clips: weekly batches. | As above | 35 h | $40/h (€36) |

**Beyond scope.**
- VOD over 4 h: +$25 per extra hour.
- Extra clip: $18.
- Highlight longer than 15 min: +$15 a minute.
- Thumbnail: $45.
- Rush: +40%.
- Copyrighted music in the VOD is muted or replaced, never "cleared".

**Market check.** Fiverr highlight gigs ($20–60) and freelancer clips (€15–20) sit below these prices. Productized shorts ($25–94) and long-form edits ($100–330) sit around or above them.

#### 6.3 YouTube creators

| Package | Price USD / EUR | Includes | Turnaround | Revisions | Hours | Effective rate |
|---|---|---|---|---|---|---|
| **YouTube Edit: Talk** | $280 / €255 | Talking-head, commentary or tutorial video, up to 15 min finished, from up to 60 min raw. Transcript-based rough cut (retakes, silences); pacing and punch-ins; simple text and graphics; up to 10 B-roll inserts (the client's own or licensed stock); music and SFX; audio clean-up; basic colour; SRT caption file. | 3 business days | 2 rounds | 6.5 h | $43/h (€39) |
| **YouTube Edit: Story** | $520 / €475 | B-roll-led vlog, documentary or story video, up to 12 min, from up to 3 h raw. Structure from the creator's script or notes; sound design; motion text; colour grade; SRT. | 5 business days | 2 rounds | 12 h | $43/h (€40) |
| **YouTube Monthly** | $1,190 / €1,085 a month | 4 Talk edits, plus 8 Shorts cut from them (captions, 9:16) | 3 business days per video | 2 rounds per video; 1 per batch of Shorts | 30 h | $40/h (€36) |

**Beyond scope.**
- Raw footage over 60 min: +$20 per extra 30 min.
- Finished video over 15 min: +$15 a minute (Talk) or +$40 a minute (Story).
- Thumbnail: $45. Extra Short: $18.
- Burned-in captions on long-form: +$2 per finished minute.
- Rush: +40%.

**Market check.** VidChops (about $124) and Vidpros ($100–200) are cheaper per video **[E]**. Tasty Edits charges $278–327 **[P]**. Upwork's basic YouTube edit is $100–500 **[P]**.

#### 6.4 Podcasters

| Package | Price USD / EUR | Includes | Turnaround | Revisions | Hours | Effective rate |
|---|---|---|---|---|---|---|
| **Podcast Audio** | $95 / €85 per episode | Up to 60 min. Noise and echo clean-up; levels and loudness; content edit to written notes; light filler and silence trimming, checked by ear; intro, outro and music beds; MP3 and WAV. | 2 business days | 1 round | 2.2 h | $43/h (€39) |
| **Podcast Video + 3 Clips** | $260 / €235 per episode | Up to 60 min, up to 3 cameras or remote tracks. Multicam switching (automatic, corrected by hand); audio clean-up; content edit; the client's intro, outro and lower thirds; chapters; audio-only MP3. Plus 3 vertical clips (up to 60 s) with captions. | 3 business days | 1 round on the episode; 1 on the clips | 5.8 h | $45/h (€41) |
| **Podcast Monthly 4** | $940 / €855 a month | 4 × Podcast Video + 3 Clips | 3 business days per episode | As above | 24 h | $39/h (€36) |

**Beyond scope.**
- Extra 30 minutes: +$30 (audio) or +$50 (video).
- Extra clip: $18.
- Show notes, or a proofread transcript: $25 each.
- Thumbnail: $45. Rush: +40%.

**Market check.** Music Radio Creative charges £63–90 for audio and £115–200 for video; The Podcast Consultant $350–800. On Upwork, a full episode edit is $200–500 and a video podcast production $500–1,200 **[P]**.

#### 6.5 Brands and agencies (ads, white-label)

| Package | Price USD / EUR | Includes | Turnaround | Revisions | Hours | Effective rate |
|---|---|---|---|---|---|---|
| **Ad Creative Pack** | $420 / €385 | One master ad (15–45 s) from the client's footage or UGC, plus 4 hook variations. Each of the 5 versions in 9:16, 4:5 and 16:9 (15 files). Burned-in captions; platform safe zones; music from the client's licence or royalty-free. | 3 business days | 2 rounds on the master; 1 on the variations | 8 h | $52.50/h (€48) |
| **Ad Monthly** | $1,150 / €1,050 a month | 3 Ad Creative Packs | 3 business days per pack | As above | 24 h | $48/h (€44) |
| **White-label Hours** | 10 h: $450 / €410. 20 h: $840 / €765. 40 h: $1,560 / €1,420. | Prepaid editing time for agencies. Unbranded delivery; NDA; written briefs and review links only. Jobs of up to 4 h are delivered in 2–3 business days. Hours are valid 60 days and logged in 15-minute steps. | 2–3 business days per job | Paid from the hours | 10 / 20 / 40 h | $45 / $42 / $39 per hour (€41 / €38 / €36) |

**Beyond scope.**
- Extra hook: $35.
- New body variation: $90.
- Extra aspect ratio, per version: $15.
- Voice-over, actors and music licences are the client's.
- Rush: +40%.

**Market check.**
- Ads: inBeat prices a mashup ad with 4 hooks at $400–750 and a B-roll ad at $750–1,500 **[S]**. Upwork's ad set is $800–2,500 **[P]**. Fiverr ad editing runs $14–80 **[S]**.
- White-label hours: Flocksy $28.55–40.45/h **[P]**; DesignCloud about $28/h **[E]**; Upwork mid tier, median $40 **[P]**.

#### 6.6 Wedding and real-estate filmmakers (white-label)

| Package | Price USD / EUR | Includes | Turnaround | Revisions | Hours | Effective rate |
|---|---|---|---|---|---|---|
| **Listing Video** | $120 / €110 | A 60–90 s property video (16:9) plus one vertical reel of up to 30 s, from up to 150 clips or 20 GB. Stabilisation; colour; music sync; agent branding; captions on the reel; branded and unbranded versions. | Next business day: footage uploaded by 18:00 New York time is delivered by 12:00 New York time | 1 round | 2.75 h | $44/h (€40) |
| **Listing 10-Pack** | $1,080 / €985 | 10 Listing Videos, prepaid, valid 90 days | As above | As above | 27.5 h | $39/h (€36) |
| **Wedding Full Film** | $390 / €355 | Documentary edit of up to 60 min: ceremony, speeches, first dance. Multicam sync, audio mix, light colour, titles. | 7 business days | 2 rounds | 8 h | $49/h (€44) |
| **Wedding Highlight (from selects)** | $380 / €345 | A 4–6 min highlight from up to 90 min of the filmmaker's selected clips, plus the vows and speech audio. Music from the filmmaker's licence; colour grade (their LUT or ours); sound design. | 7 business days | 2 rounds | 9.5 h | $40/h (€36) |
| **Wedding Teaser** | $160 / €145 | A 60–90 s teaser, in 16:9 and 9:16 | 4 business days | 2 rounds | 3.5 h | $46/h (€42) |
| **Wedding Trio** | $860 / €785 | Highlight (from selects), Full Film and Teaser | 10 business days | As above | 21 h | $41/h (€37) |

**Beyond scope.**
- A highlight from full, unculled footage: custom quote, from $550 (15–16 h).
- Extra raw hour: $30.
- Extra version of a reel: $40.
- Drone-only edit: $60.
- Rush: +40%.

**Market check.**
- Real estate: CloudPano $97 for 60 s; Fotober $35–80; Upwork $75–300 per listing **[P]**.
- Wedding: VeedYou charges $299 for a highlight and $449 for a full film **[P]**; a roundup gives $195–549 for highlights **[S]**.
- A full-footage highlight sold at the market's $299–350 pays about $15–23/h at VeedYou's 15–20 hours, or $6–12/h at Fotober's 30–50 hours. Hence the "from selects" scope, and a custom quote for anything bigger.

#### 6.7 Add-ons and out-of-scope rules

| Add-on | USD | EUR | Note |
|---|---|---|---|
| Extra revision round | 15% of the package price, minimum $25 | minimum €23 | Beyond the included rounds |
| Extra raw footage | Streams: $25 per extra hour. Talk or podcast: $20 per extra 30 min. Weddings and events: $30 per extra hour. | €23 / €18 / €27 | |
| Extra finished length | Talk: $15/min. Story: $40/min. Podcast: $30 (audio) or $50 (video) per 30 min. | €14 / €36 / €27 / €46 | |
| Extra vertical clip from the same source | $18 | €16 | |
| Extra hook / new body variation / extra aspect ratio | $35 / $90 / $15 | €32 / €82 / €14 | |
| Thumbnail | $45 | €41 | Tasty Edits charges $43 **[P]** |
| Burned-in captions on long-form | $2 per finished minute | €1.80 | SRT files are included in the YouTube and podcast packages |
| Translated subtitles | Custom quote, or decline | n/a | Rev charges $6.49–15.99/min **[P]** |
| Rush, 24 h (only if a slot is free) / weekend delivery | +40% / +25% | | |

#### 6.8 Custom quotes

**Use a custom quote when:**
- the footage or the finished length exceeds a package's limits, or a project's finished video is longer than 20 minutes;
- the work involves motion graphics or animation, gaming montages (music-synced, effects-heavy), or colour grading log or RAW footage at scale;
- the project is corporate or event work with a chain of approvals, or a documentary;
- it is a re-edit of someone else's project;
- the client needs subtitles in several languages, or complex music licensing;
- the job is a rush;
- the client asks for calls. Decline, or turn it into a written process.

**How to build a quote.** Keep it written, fixed-price, and back within 1 business day.

1. **Intake form**, in writing:
   - footage: hours, cameras, format, a download link;
   - the finished deliverables: length, aspect ratios, number of versions;
   - style references (links, with timecodes);
   - who supplies the music, fonts and logos;
   - the deadline, and who approves.
2. **Hours** = review hours + edit hours + asset hours + version hours, where:
   - review hours = raw hours × a factor: 0.3 for streams after an AI pass, 0.5 for talking heads with a transcript, 0.75–1.0 for multicam or event footage;
   - edit hours = finished minutes × minutes per finished minute ÷ 60, using 20–30 for simple work, 45–60 for standard, and 90–120 for motion-heavy or stylised work [H1] [H2];
   - asset hours: a thumbnail 1 h, a lower third 0.25 h, an animated title 1 h, caption proofreading 0.1 h per finished minute;
   - version hours: 0.25–0.5 h per extra aspect ratio or hook.
3. **Buffers.** Add 15% for revisions (VeedYou puts a revision at 10–25% of the first-cut time [H2]) and 10% for admin and written communication.
4. **Rate.** $45/h standard; $55/h for brands, ads, corporate and motion work; never below $35/h. Rush +40%. Minimum order $120.
5. **The quote** states:
   - the footage limit, the finished length and the deliverables;
   - the revision rounds;
   - who is responsible for music licensing;
   - the delivery method;
   - the start date and the turnaround;
   - that it is valid for 14 days.
6. **Payment.** New clients pay 50% upfront and the balance before the final files are delivered (they review a watermarked preview first). Packages and retainers are paid in advance.

**Worked example 1: corporate event recap.** A 3-minute recap from 4 hours of two-camera footage, plus a 60-second vertical cut.
- Review: 4 × 0.75 = 3 h.
- Edit: 3 min × 60 min = 3 h.
- Brand titles and lower thirds: 1 h.
- Vertical cut: 0.75 h.
- That is 7.75 h; with 15% and 10% buffers, 9.8 h.
- At $55/h: **$540 (€490)**.
- This sits below Upwork's corporate range ($1,000–3,000 **[P]**) and at the low end of guide prices for event highlights ($500–2,500 **[S]**).

**Worked example 2: gaming montage.** A 3-minute, music-synced montage from 2 hours of footage.
- Review: 1 h. Edit: 3 min × 120 min = 6 h. Effects and sound design: 2 h.
- That is 9 h; with buffers, 11.4 h.
- At $45/h: **$510 (€465)**.

#### 6.9 Capacity check: 30 hours a week

**Assumptions [E].**
- 30 h a week × 52 ÷ 12 = 130 h a month.
- About 15% goes on non-billable work: written briefs and messages with translation help, file handling, quotes and marketing.
- That leaves **about 25.5 billable hours a week, or 110 a month**.

| Package | Hours per unit | Maximum per week at 25.5 h | Price | Effective rate |
|---|---|---|---|---|
| Clip Pack 10 | 3.8 | 6 | $170 | $45/h |
| Highlight Video | 6.5 | 3 | $270 | $42/h |
| YouTube Edit: Talk | 6.5 | 3 | $280 | $43/h |
| YouTube Edit: Story | 12 | 2 | $520 | $43/h |
| Podcast Audio | 2.2 | 11 | $95 | $43/h |
| Podcast Video + 3 Clips | 5.8 | 4 | $260 | $45/h |
| Ad Creative Pack | 8 | 3 | $420 | $52.50/h |
| Listing Video | 2.75 | 9 | $120 | $44/h |
| Wedding Full Film | 8 | 3 | $390 | $49/h |
| Wedding Highlight (from selects) | 9.5 | 2 | $380 | $40/h |
| Wedding Teaser | 3.5 | 7 | $160 | $46/h |
| Streamer / YouTube / Podcast / Ad Monthly | 35 / 30 / 24 / 24 h a month | at most 2 at once (see below) | $1,390 / $1,190 / $940 / $1,150 | $40 / $40 / $39 / $48 per hour |

**Example full month** (about 108 h):
- Retainers: Streamer Monthly (35 h, $1,390) and Podcast Monthly 4 (24 h, $940).
- One-offs: 2 YouTube Talk edits (13 h, $560); 6 Listing Videos (16.5 h, $720); 2 podcast video episodes (11.6 h, $520); 1 Ad Creative Pack (8 h, $420).
- **Total: $4,550 (€4,150) gross, about $42 per billable hour.**
- Net of platform fees [E]: if every job came through Fiverr, about $3,640. On Upwork at a 10% fee, about $4,100. Direct or Contra: the full amount, less payment fees (not researched).
- Software [E from P]: for example Descript Creator $35, StreamLadder Creator $27 and OpusClip Pro $29, about $91 a month (€83) at monthly billing, roughly 2% of full-load revenue. Editing software and stock libraries were not researched.

**Turnaround and quiet-period rules [E].**
- **Turnaround limits.** At about 5 billable hours per business day, a 3-day promise covers about 15 hours of work. It holds only if no more than two long jobs (6 h or more) are in progress at once. Publish a "next free slot" date, and start the clock when the job starts.
- **Retainer cap.** Keep monthly retainers to about 60% of capacity (about 65 h, so at most two), so that one-off orders keep their turnaround. This also leaves room to help the core business in a busy week.
- **Busy weeks.** When the core filming business is busy, close the queue to new one-off orders rather than breaking retainer deadlines.
- **This is a ceiling, not a forecast.** Expect the queue to be far from full in the first months while reviews are built.

#### 6.10 Entry offer for the first clients

**"Founding client" price.**
- 30% off the client's **first order only**.
- For the first 10 clients, or until 2027-03-31, whichever comes first.
- In return for a written review on the platform used (or a testimonial for the site), and permission to show the work where the client allows it.
- Show the list price next to the founding price, so the anchor is clear.
- Never discount a retainer beyond its first month.

| Package | List | Founding price | EUR | Effective rate |
|---|---|---|---|---|
| Clip Pack 10 | $170 | $119 | €110 | $31/h |
| Highlight Video | $270 | $189 | €170 | $29/h |
| YouTube Edit: Talk | $280 | $195 | €180 | $30/h |
| Podcast Video + 3 Clips | $260 | $179 | €165 | $31/h |
| Ad Creative Pack | $420 | $295 | €270 | $37/h |
| Listing Video | $120 | $85 | €80 | $31/h |
| Wedding Full Film | $390 | $275 | €250 | $34/h |

- **It is not underpricing for long.** About $30/h is still at the bottom of Upwork's mid tier and inside the productized services' implied band **[E]**. The discount is limited to one order per client and to a date.
- **Alternative for monthly packages.** A paid pilot, like Vidpros' $100 trial week **[P]** [S2]: "Pilot: one Talk edit, or a Clip Pack 10, or one podcast video episode, for $99 (€90)", once per client.
- **No free test edits.** Real samples do that job; at most, a 30–60-second sample on the client's own footage.
- **When to raise prices.**
  - After 5 reviews averaging 4.8 or more: move to list price.
  - After 15 reviews, or when the queue has been more than 80% booked for 4 weeks: raise prices by 10%.
  - Review prices every quarter against the logged hours.
- **On Fiverr.** Use the founding prices as the Basic tiers for the first reviews. Then move toward list price ÷ 0.8.
- **Be open about AI.** Say "AI-assisted, human-edited". A Fiverr review describes an order cancelled after the buyer received AI-generated video instead of the agreed human-made UGC **[S]** [F9].

---

### 7. Gaps and caveats

- **Blocked or unreadable pages.**
  - Returned 403: Fiverr (all pages), Upwork's www and support pages, Malt (help centre and rate barometer), the PeoplePerHour support centre, and We Edit Podcasts.
  - Timed out: Kimp.
  - No usable content: Vizard showed $0 placeholders, and Thumbtack returned an empty page.
  - What was used instead: Upwork's own `research.upwork.com` mirror, PeoplePerHour's terms page, and search-result summaries, marked **[S]**.
- **Upwork's pages disagree.** The video-editor cost page gives $10–60/h in its description and $6–25/h in the body.
- **Fiverr figures are snapshots.** They are search summaries of "From" prices; they may or may not include buyer fees, and some category blurbs are years old.
- **Fotober's pages are internally inconsistent.** Its listed tiers do not always add up to its totals.
- **Descript's monthly and annual prices are not labelled on its page**; which is which was inferred.
- **The time evidence is mostly vendor blogs.** The package hours are **[E]** and should be replaced by logged hours after the first 10 jobs.
- **Not found:**
  - Fiverr prices for gaming montages;
  - a done-for-you streamer clip service with a public monthly price;
  - an EU agency that publishes subscription prices in euros (VeedYou in Romania is the only EU agency price list here; Kokistar is an EU freelancer).
- **Not researched:** VAT treatment, payment-processor fees, and the costs of editing software and music licences.

---

### Sources

All sources were read on 2026-11-18. "Search only" means the page itself returned an error, and the figure comes from a search-engine summary of it.

| Code | Source | URL | Read | Mark |
|---|---|---|---|---|
| X1 | ECB euro reference rates (USD 1.0968, GBP 0.83290; 2026-11-18) | https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml | page | [P] |
| F0 | Fiverr video-editing category | https://www.fiverr.com/categories/video-animation/video-editing | 403 | n/a |
| F1 | Fiverr guide: "How Much Does a Video Editor Cost?" | https://www.fiverr.com/resources/guides/video-animation/video-editor-cost | search only | [S] |
| F2 | Fiverr YouTube video editing category | https://www.fiverr.com/categories/video-animation/buy/video-editing/youtube-videos | search only | [S] |
| F3 | Fiverr YouTube gigs ($70, $35, $5) | https://www.fiverr.com/prithvirajp99/be-your-creative-youtube-video-editor ; https://www.fiverr.com/chrisaxworthy/professionally-edit-your-video ; https://www.fiverr.com/dyjg123/edit-your-video-for-youtube-skit-music-video-or-gaming | search only | [S] |
| F4 | Fiverr short-form gig listings | https://www.fiverr.com/gigs/shorts-editing ; https://www.fiverr.com/gigs/reels-editor ; https://www.fiverr.com/gigs/tiktok-video-editor | search only | [S] |
| F5 | Fiverr podcast gigs | https://www.fiverr.com/gigs/podcasts-editing ; https://www.fiverr.com/podcastsbypaolo/edit-your-video-podcast ; https://www.fiverr.com/mixedmediaire/professionally-edit-and-upgrade-your-podcast | search only | [S] |
| F6 | Fiverr Twitch-highlight gigs | https://www.fiverr.com/gigs/twitch-highlights ; https://www.fiverr.com/atif12096/edit-your-stream-highlights-or-gaming-footage-personal-gaming-video-editor ; https://www.fiverr.com/prithvirajp99/edit-your-gaming-clips-or-montages | search only | [S] |
| F7 | Fiverr wedding gigs | https://www.fiverr.com/categories/video-animation/buy/video-editing/wedding-videos ; https://www.fiverr.com/editorstable/edit-your-wedding-video ; https://www.fiverr.com/brendaberth/edit-your-wedding-video ; https://www.fiverr.com/shaun42/wedding-video-edit-color-grading-and-sound-mixing | search only | [S] |
| F8 | Fiverr real-estate gigs | https://www.fiverr.com/gigs/real-estate-video ; https://www.fiverr.com/zeeshan_edit/do-real-estate-video-editing-within-24-hours-315c | search only | [S] |
| F9 | Fiverr UGC and ad gigs; video-advertising category | https://www.fiverr.com/gigs/ugc-video-editor ; https://www.fiverr.com/prantik05/edit-ugc-catchy-hook-mashup-video-ads-for-tiktok-instagram ; https://www.fiverr.com/ryanturano/create-a-ugc-style-video-review-or-unboxing-video ; https://www.fiverr.com/categories/online-marketing/online-video-marketing/online-video-advertising | search only | [S] |
| F10 | Fiverr corporate and motion-graphics listings | https://www.fiverr.com/categories/video-animation/buy/video-editing/corporate-videos ; https://www.fiverr.com/gigs/motion-graphics ; https://www.fiverr.com/skribbly/create-a-broadcast-motion-graphics-package-for-youtube-or-podcast | search only | [S] |
| F11 | Fiverr subtitles and captions category | https://www.fiverr.com/categories/video-animation/subtitles-captions | search only | [S] |
| F12 | Fiverr Help Center: seller earnings, Pro freelancer, buyer fees | https://help.fiverr.com/hc/en-us/articles/9234443621137-Your-earnings-page ; https://help.fiverr.com/hc/en-us/articles/29453184449169-Fiverr-Pro-freelancer-Badge-and-benefits ; https://help.fiverr.com/hc/en-us/articles/360050216133-Paying-for-orders-extras-or-custom-offers | search only (403) | [S] |
| F13 | Fiverr gaming video editing category | https://www.fiverr.com/categories/video-animation/buy/video-editing/gaming-videos | search only, no figures | [S] |
| U1 | Upwork: hire video editors | https://research.upwork.com/hire/video-editors/ | page | [P] |
| U2 | Upwork: video editor cost | https://research.upwork.com/hire/video-editors/cost/ | page | [P] |
| U3 | Upwork: short-form video editors | https://research.upwork.com/hire/short-form-video-editors/ | page | [P] |
| U4 | Upwork: YouTube video editors | https://research.upwork.com/hire/youtube-video-editors/ | page | [P] |
| U5 | Upwork: podcast editors | https://research.upwork.com/hire/podcast-editors/ | page | [P] |
| U6 | Upwork: real-estate video editors | https://research.upwork.com/hire/real-estate-video-editors/ | page | [P] |
| U7 | Upwork: AI video editors | https://research.upwork.com/hire/ai-video-editors/ | page | [P] |
| U8 | Upwork: freelancer service fee | https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee | search only (403) | [S] |
| U9 | Upwork User Agreement v8.2 | https://research.upwork.com/legal | page | [P] |
| M1 | Contra pricing | https://contra.com/pricing | page | [P] |
| M2 | PeoplePerHour Terms §8.2 | https://www.peopleperhour.com/static/terms | page | [P] |
| M3 | Malt service fees (help centre) | https://help.malt.com/hc/en-150/articles/29539691425938-How-do-the-Malt-service-fees-work-for-freelancers ; https://help.malt.com/hc/en-150/articles/29567589850002-What-are-Malt-service-fees-and-offers | search only (403) | [S] |
| M4 | Malt rate barometer: motion designers | https://www.malt.fr/t/barometre-tarifs/image-son/motion-designer ; https://www.malt.com/en-gb/t/average-freelance-rates/sound-visual-expert/motion-designer | search only (403) | [S] |
| M5 | Contra service listings | https://contra.com/s/WBoPNPRg-subscription-based-video-editing (shows a 404 page; the price comes from its structured data) ; https://contra.com/s/kAbO6QbR-monthly-podcast-and-video-editing ; https://contra.com/s/vUFEMvAo-video-editing-or-youtube-twitch-or-clipping-or-gaming-highlights | page | [P] |
| S1 | VidChops pricing | https://vidchops.com/pricing/ | page | [P] |
| S2 | Vidpros pricing | https://vidpros.com/pricing/ | page | [P] |
| S3 | Video Husky pricing | https://videohusky.com/pricing/ | page | [P] |
| S4 | Flocksy pricing | https://flocksy.com/pricing/ | page | [P] |
| S5 | Tasty Edits pricing | https://www.tastyedits.com/pricing/ | page | [P] |
| S6 | DesignCloud video editing (UK) | https://designcloud.app/services/video-editing | page | [P] |
| S7 | The Podcast Consultant: video production | https://thepodcastconsultant.com/video-production | page | [P] |
| S8 | Music Radio Creative: podcast production | https://musicradiocreative.com/pages/podcast-production | page | [P] |
| S9 | Resonate Recordings pricing | https://resonaterecordings.com/pricing/ | page | [P] |
| S10 | VeedYou wedding video editing | https://www.veedyou.com/wedding-video-editing-service/ | page | [P] |
| S11 | CloudPano property video editing | https://www.cloudpano.com/property-video-editing | page | [P] |
| S12 | Fotober real-estate video pricing | https://fotober.com/real-estate-video-pricing | page | [P] (own tiers) |
| S13 | Fotober wedding video editing pricing (also gives hours) | https://fotober.com/wedding-video-editing-pricing | page | [P] own tiers; [S] market figures and hours |
| S14 | Fotober event video editing pricing | https://fotober.com/event-video-editing-pricing | page | [S] |
| S15 | Billo pricing | https://billo.app/pricing/ | page | [P] |
| S16 | Superside pricing | https://www.superside.com/pricing | page | [P] |
| S17 | Insense post-production | https://insense.pro/post-production | page | [P] |
| S18 | Lumina Clippers: clipping agency for streamers | https://luminaclippers.com/blog/clipping-agency-for-streamers | page | [P] |
| S19 | Streamer editors' price sheets | https://kokistarcom.carrd.co/ ; https://usagiambey.carrd.co/ ; https://malastrome.carrd.co/ | page | [P] |
| S20 | Wanderlust Videos (no prices) | https://www.wanderlust-videos.com/ | page | n/a |
| S21 | Not read: Kimp, We Edit Podcasts | https://www.kimp.io/pricing/ (timeout) ; https://www.weeditpodcasts.com/pricing/ (403) | n/a | n/a |
| G1 | inBeat: Performance Creative Pricing Guide 2026 | https://inbeat.agency/blog/performance-creative-pricing-guide | page | [S] |
| G2 | beCreatives: video editing prices | https://becreatives.co/video-editing-prices/ | page | [S] |
| G3 | Ruah Creative House: editing rates (2026 market ranges) | https://ruahcreativehouse.org/blog/video-editing-rates/ | page | [S] |
| G4 | Rephonic: podcast editing cost (updated 2026-10-16) | https://rephonic.com/blog/podcast-editing-cost | page | [S] |
| G5 | Video AI ME: real-estate video editing guide | https://videoai.me/blog/real-estate-video-editing-guide | page | [S] |
| G6 | Wedding outsourcing roundups (Pixflow; Cut Pro Media) | https://pixflow.net/blog/5-best-places-to-outsource-wedding-video-editing ; https://clutch.co/profile/cut-pro-media | search only | [S] |
| G7 | Real-estate outsourcing roundup (Phixer, BoxBrownie) | https://imagen-ai.com/post/real-estate-video-editing-outsourcing/ | search only | [S] |
| G8 | AutoClip: true cost of AI clipping tools (a competitor's blog) | https://autoclip.dev/blog/ai-clipping-tools-true-cost-per-clip-2026 | page | [S] |
| T1 | OpusClip pricing | https://www.opus.pro/pricing | page | [P] |
| T2 | OpusClip Help: how credits are consumed | https://help.opus.pro/docs/article/how-are-credits-consumed | page | [P] |
| T3 | Eklipse pricing | https://eklipse.gg/pricing/ | page (partial) | [P] |
| T4 | StreamLadder pricing | https://streamladder.com/pricing | page | [P] |
| T5 | Descript pricing | https://www.descript.com/pricing | page | [P] (monthly and annual labels inferred) |
| T6 | Submagic pricing | https://www.submagic.co/pricing | page | [P] |
| T7 | Captions pricing | https://www.captions.ai/pricing | page | [P] |
| T8 | Klap pricing | https://klap.app/pricing | page | [P] |
| T9 | Rev pricing | https://www.rev.com/pricing | page | [P] |
| T10 | Vizard pricing (prices rendered as $0) | https://vizard.ai/pricing | page | n/a |
| T11 | StreamClipping AI (via AlternativeTo) | https://alternativeto.net/software/streamclipping-ai/about/ | search only | [S] |
| H1 | Tasty Edits: how long does it take to edit a video (updated 2026-09-17) | https://www.tastyedits.com/how-long-does-it-take-to-edit-a-video/ | page | [S] |
| H2 | VeedYou: how long does it take to edit a video (2026-03-03) | https://www.veedyou.com/how-long-does-it-take-to-edit-a-video/ | page | [S] |
| H3 | The Podcast Host: podcast editing (updated 2026-04-20; sells Alitu) | https://www.thepodcasthost.com/editing/ | page | [S] |
| H4 | Adobe Express: how creators use AI video tools (survey of 384 US creators, Dec 2025; page dated 2026-03-25) | https://www.adobe.com/express/learn/blog/ai-video-tools | page | [P] |
| H5 | VIDIO: AI video editing adoption, early 2026 user survey | https://www.vidio.ai/en-AU/blog/article/ai-video-editing-adoption-sentiment-early-2026-vidio-user-survey | search only | [S] |
| H7 | Cleanvoice Help: editing time | https://help.cleanvoice.ai/en/articles/39-how-much-time-do-you-take-to-edit-my-audio-or-video | search only | [S] |

[X1]: https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml
[F1]: https://www.fiverr.com/resources/guides/video-animation/video-editor-cost
[F2]: https://www.fiverr.com/categories/video-animation/buy/video-editing/youtube-videos
[F3]: https://www.fiverr.com/prithvirajp99/be-your-creative-youtube-video-editor
[F4]: https://www.fiverr.com/gigs/shorts-editing
[F5]: https://www.fiverr.com/gigs/podcasts-editing
[F6]: https://www.fiverr.com/gigs/twitch-highlights
[F7]: https://www.fiverr.com/categories/video-animation/buy/video-editing/wedding-videos
[F8]: https://www.fiverr.com/gigs/real-estate-video
[F9]: https://www.fiverr.com/gigs/ugc-video-editor
[F10]: https://www.fiverr.com/categories/video-animation/buy/video-editing/corporate-videos
[F11]: https://www.fiverr.com/categories/video-animation/subtitles-captions
[F12]: https://help.fiverr.com/hc/en-us/articles/9234443621137-Your-earnings-page
[F13]: https://www.fiverr.com/categories/video-animation/buy/video-editing/gaming-videos
[U1]: https://research.upwork.com/hire/video-editors/
[U2]: https://research.upwork.com/hire/video-editors/cost/
[U3]: https://research.upwork.com/hire/short-form-video-editors/
[U4]: https://research.upwork.com/hire/youtube-video-editors/
[U5]: https://research.upwork.com/hire/podcast-editors/
[U6]: https://research.upwork.com/hire/real-estate-video-editors/
[U7]: https://research.upwork.com/hire/ai-video-editors/
[U8]: https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee
[U9]: https://research.upwork.com/legal
[M1]: https://contra.com/pricing
[M2]: https://www.peopleperhour.com/static/terms
[M3]: https://help.malt.com/hc/en-150/articles/29539691425938-How-do-the-Malt-service-fees-work-for-freelancers
[M4]: https://www.malt.fr/t/barometre-tarifs/image-son/motion-designer
[M5]: https://contra.com/s/kAbO6QbR-monthly-podcast-and-video-editing
[S1]: https://vidchops.com/pricing/
[S2]: https://vidpros.com/pricing/
[S3]: https://videohusky.com/pricing/
[S4]: https://flocksy.com/pricing/
[S5]: https://www.tastyedits.com/pricing/
[S6]: https://designcloud.app/services/video-editing
[S7]: https://thepodcastconsultant.com/video-production
[S8]: https://musicradiocreative.com/pages/podcast-production
[S9]: https://resonaterecordings.com/pricing/
[S10]: https://www.veedyou.com/wedding-video-editing-service/
[S11]: https://www.cloudpano.com/property-video-editing
[S12]: https://fotober.com/real-estate-video-pricing
[S13]: https://fotober.com/wedding-video-editing-pricing
[S14]: https://fotober.com/event-video-editing-pricing
[S15]: https://billo.app/pricing/
[S16]: https://www.superside.com/pricing
[S17]: https://insense.pro/post-production
[S18]: https://luminaclippers.com/blog/clipping-agency-for-streamers
[S19]: https://kokistarcom.carrd.co/
[S20]: https://www.wanderlust-videos.com/
[G1]: https://inbeat.agency/blog/performance-creative-pricing-guide
[G2]: https://becreatives.co/video-editing-prices/
[G3]: https://ruahcreativehouse.org/blog/video-editing-rates/
[G4]: https://rephonic.com/blog/podcast-editing-cost
[G5]: https://videoai.me/blog/real-estate-video-editing-guide
[G6]: https://pixflow.net/blog/5-best-places-to-outsource-wedding-video-editing
[G7]: https://imagen-ai.com/post/real-estate-video-editing-outsourcing/
[G8]: https://autoclip.dev/blog/ai-clipping-tools-true-cost-per-clip-2026
[T1]: https://www.opus.pro/pricing
[T2]: https://help.opus.pro/docs/article/how-are-credits-consumed
[T3]: https://eklipse.gg/pricing/
[T4]: https://streamladder.com/pricing
[T5]: https://www.descript.com/pricing
[T6]: https://www.submagic.co/pricing
[T7]: https://www.captions.ai/pricing
[T8]: https://klap.app/pricing
[T9]: https://www.rev.com/pricing
[T11]: https://alternativeto.net/software/streamclipping-ai/about/
[H1]: https://www.tastyedits.com/how-long-does-it-take-to-edit-a-video/
[H2]: https://www.veedyou.com/how-long-does-it-take-to-edit-a-video/
[H3]: https://www.thepodcasthost.com/editing/
[H4]: https://www.adobe.com/express/learn/blog/ai-video-tools
[H5]: https://www.vidio.ai/en-AU/blog/article/ai-video-editing-adoption-sentiment-early-2026-vidio-user-survey
[H7]: https://help.cleanvoice.ai/en/articles/39-how-much-time-do-you-take-to-edit-my-audio-or-video

---

## Part 3. Search demand, competitor sites and channels

Research for Hera Editing's side line: remote editing for clients in the US, UK and EU, sold in writing only. All data was gathered on 2026-11-18.

**Marks used throughout**
- **[P]** published by the platform or competitor itself, or measured by us (OpenSEO keyword data, live SERP reads, our own counts).
- **[S]** secondary: a third-party estimate or article. Example: the DataForSEO traffic model behind the OpenSEO domain figures.
- **[E]** our estimate.

Source codes such as C12 (competitor sites) and M5 (marketplaces) refer to the lists in section 10.

---

### 1. Key findings

1. **Search demand for hiring a remote editor is real but small, and it is mostly in the US.** [P]
   - Core US buyer terms:
     - "video editing services": 2,400 searches a month.
     - "hire a video editor": 1,900.
     - "video editor for hire": 1,600.
   - Google Ads groups close variants, so these figures share volume. Do not add them up.
   - The UK has about one tenth of the US volume ("video editing services" 170, "hire a video editor" 210).
   - Germany is negligible ("video schneiden lassen" 50; "videoschnitt dienstleister" has no data).
2. **Per niche, real buyer demand is 10–480 searches a month in the US.** [P]
   - Best clusters:
     - YouTube hiring: "youtube video editor for hire" 390, "youtube editor for hire" 320, "youtube video editing service(s)" 140.
     - Weddings: "wedding video editor" 480, "wedding video editing services" 260, outsourcing variants 90.
     - Podcasts: "podcast editing services" 320, but falling to 140/month in Sep–Oct 2026.
     - Real estate: "real estate video editing" 390, but searchers want DIY tools.
3. **Several requested segments have almost no search demand for an editing service.** [P]
   - Streamers: "twitch highlights editor" and "stream clips editing" have no data. "Twitch editor" (210) means Twitch's Editor channel role.
   - Ads/UGC: "ugc ad editing" and "video ad editing service" have no data; "ugc video editing" 10.
   - Corporate: "corporate video editing services" 10.
   - Short-form: "reels editing service" has no data; "tiktok video editing service" 50.
4. **Three intent traps.** [P SERP reads]
   - "freelance video editor" (1,300 US) returns job-seeker and career content.
   - "youtube editor", "podcast editor", "tiktok editor" and "reels editor" are software queries.
   - "real estate video editing" returns DIY and AI-tool pages.
5. **Two niches are growing and one is shrinking.** [P, monthly volumes]
   - "real estate video editing": about 30–50 a month in 2019, 210–590 in 2025–26.
   - "wedding video editing services": 70–210 in 2019–21, 170–390 in 2025–26.
   - "podcast editing services" fell from 390–480 to 140 a month in Sep–Oct 2026.
6. **Search results are crowded.** [P, measured across 21 live SERPs]
   - Every SERP had an AI Overview and People Also Ask.
   - Reddit threads appeared on at least 8 of 21.
   - Upwork appeared on 6, Fiverr on 5, Twine on 5.
   - The rest went to directories (Bark, Yelp, Thumbtack, Sortlist, ProductionHUB) and "best X services" listicles.
   - Productized editing services held only 1–3 of the 10 slots on head terms.
7. **Even competitors that rank get little search traffic from their service pages.** [S, DataForSEO estimates]
   - beCreatives was #1 for "video editing services" in our live read, in 3 of 3 reads. It is estimated at about 421 US organic visits a month in total, and its service-category pages at 2–7 each.
   - Tasty Edits (about 5,740 visits) and Vidpros (about 2,703) get most of their traffic from off-topic blog posts: software reviews and YouTuber net worth.
   - Niche specialists get about 1–94 visits a month.
8. **Selling without a call is the norm.** [P, C1–C53]
   - All 9 productized competitors publish prices.
   - 8 of the 9 have a working written order or checkout path.
   - Calls are required only for top or custom tiers.
   - Typical entry prices: about $180–$330 per long video, $56–$94 per short, or subscriptions from $495–$1,000 a month.
9. **Fiverr fits a written-only seller best.** [P]
   - Calls are optional, and only the seller can start one (M27). The ID check is a document plus a selfie (M22).
   - Fees: 20% from the seller; the buyer pays 5.5% plus $3.50 on orders under $200 (M17).
   - **Upwork is risky.** Identity checks can involve "a quick video meeting… camera turned on" (M9), some jobs require an AI video interview "in English" (M11), and some new freelancers must buy Connects before any proposal (M5).
   - **Malt does not fit.** Sign-up needs a commercial-register business and sworn translations for Bulgaria (M61, M63), and its help pages encourage calls (M66, M67).
10. **Marketplace rules stop you from moving clients to your own site.** [P]
    - Fiverr bans off-platform contact and payment (M18).
    - Upwork: two years on the platform, unless a conversion fee is paid (M14, M15).
    - Freelancer.com charges a 30% penalty (M43). PeoplePerHour suspends accounts (M55).
    - So the English site cannot be fed from marketplace clients. It has to serve clients from other channels: YTJobs, Reddit, X, outreach, referrals and search.
11. **Recommendation.** [E]
    - Build a small English section as a conversion layer: an offer page, pricing, an order form with checkout, a portfolio, and "how it works" with an FAQ.
    - Add two niche pages with the best search odds: wedding editing for filmmakers, and YouTube editing.
    - Skip location, German, Twitch, UGC and corporate pages, and skip mass blogging.
    - Expect tens of organic visits a month in year one, not hundreds.
    - First income should come from Fiverr, YTJobs, Reddit hiring subs and direct written outreach.

---

### 2. Method

- **Keyword metrics.**
  - Tools: OpenSEO `get_keyword_metrics` and `research_keywords`, data from DataForSEO and Google Ads, in the project "Hera Editing" (id 05d71d0d-…).
  - The project's default market is Bulgaria, so every call passed the market explicitly: US 2840/en, UK 2826/en, DE 2276/de.
  - Volume is the Google Ads 12-month average, rounded into buckets (10, 20, 30, 40, 50, 70, 90, 110, 140, 170, 210, 260, 320, 390, 480, 590, 720, 880, 1,000, 1,300…).
  - KD is DataForSEO's difficulty score (0–100). CPC is the top-of-page bid in USD. "Comp" is Google Ads paid competition (0–1).
  - Rows marked **≈** share one grouped volume. "No data" means fewer than about 10 searches a month, or the keyword is not in the database.
  - Queried 2026-11-18. [P]
- **SERPs.**
  - Tool: OpenSEO `get_serp_results`, live Google desktop page 1. Each query was read 3 times and the reads were merged.
  - "pos" is the best position seen. "n/3" is the number of reads in which the site appeared; 1/3 is weak evidence.
  - 21 queries: 18 US, 2 UK, 1 DE, read 2026-11-18. [P]
- **Competitor traffic.** OpenSEO `get_domain_overview` and `get_ranked_keywords`, US, DataForSEO Labs model, 2026-11-18. [S]
- **Competitor sites and platform rules.** Read directly from each site's own pages, sitemaps and help centers on 2026-11-18, with WebFetch or curl. The raw pages were not kept.

---

### 3. Keyword demand

#### 3.1 United States (2840, en) [P]

**General hiring and service terms**

| Keyword | Vol/mo | KD | CPC $ | Comp | Note |
|---|---:|---:|---:|---:|---|
| video editing services ≈ video editing service | 2,400 | 14 / 14 | 17.18 / 19.52 | 0.30 / 0.19 | commercial |
| hire video editor ≈ hire a video editor | 1,900 | 3 | 13.79 | 0.10 | commercial |
| video editor for hire | 1,600 | 3 | 11.87 | 0.20 | commercial |
| freelance video editor ≈ freelance video editors | 1,300 | 2 | 12.89 / 10.67 | 0.36 / 0.33 | SERP is job-seeker content (section 4) |
| video editing company | 480 | 32 | 25.12 | 0.50 | SERP: directories, listicles |
| video editing agency | 320 | 36 | 18.01 | 0.28 | |
| post production services | 320 | 0 | 11.32 | 0.01 | |
| video editing subscription | 260 | 12 | 10.65 | 0.51 | average inflated by a Jan 2026 spike; 10–30/mo in Jun–Aug 2026 |
| outsource video editing ≈ video editing outsourcing | 140 | 4 / 7 | 23.25 | 0.30 | highest CPC among core terms |
| professional video editing services | 90 | 23 | 9.40 | 0.24 | |
| video post production services | 70 | 0 | 18.73 | 0.12 | |
| unlimited video editing | 50 | 15 | 18.28 | 0.35 | |
| unlimited video editing services | 50 | 3 | 16.07 | 0.37 | from keyword ideas |
| online video editing service | 40 | 0 | 12.20 | 0.58 | |
| best video editing services | 40 | 0 | 21.78 | 0.26 | |
| outsourcing video editing services | 30 | 19 | 15.25 | 0.25 | from keyword ideas |
| white label video editing | 20 | 0 | 7.83 | 0.11 | |
| white label video production | 10 | 0 | — | 0.04 | |
| video editing for business | 10 | 10 | 5.15 | 0.43 | |

**Marketplace-branded searches** (buyers and sellers looking for a platform by name)

| Keyword | Vol/mo | KD | CPC $ | Comp |
|---|---:|---:|---:|---:|
| upwork video editor | 1,000 | 7 | 6.69 | 0.20 |
| fiverr video editing | 590 | 2 | 4.42 | 0.55 |
| fiverr youtube editor | 90 | 2 | 2.24 | 0.57 |
| fiverr video editing services | 50 | 2 | — | 0.00 |
| fiverr podcast editing | 50 | 0 | 5.60 | 0.63 |
| upwork video editing services | 40 | — | — | 0.05 |
| upwork podcast editing | 30 | 0 | 10.21 | 0.53 |

**Pricing intent**

| Keyword | Vol/mo | KD | CPC $ | Comp | Note |
|---|---:|---:|---:|---:|---|
| video editing pricing | 390 | 8 | 4.82 | 0.26 | |
| video editing price | 320 | 8 | 4.09 | 0.25 | |
| video editor rates | 320 | 8 | 4.09 | 0.25 | |
| video editing rates | 320 | 0 | 2.58 | 0.18 | |
| video editing cost | 320 | 8 | 2.58 | 0.18 | SERP: "how much should you charge" content aimed at editors |
| how much does a video editor cost | 210 | 9 | 2.40 | 0.24 | |
| freelance video editor rates | 140 | 0 | 7.85 | 0.17 | |
| video editing cost per hour | 70 | 9 | — | 0.15 | |
| how much does video editing cost | 50 | 6 | 1.60 | 0.27 | |
| video editor cost | 30 | 7 | 2.87 | 0.28 | |

**YouTube**

| Keyword | Vol/mo | KD | CPC $ | Comp | Note |
|---|---:|---:|---:|---:|---|
| youtube video editor for hire | 390 | 0 | 8.99 | 0.43 | |
| youtube editor for hire | 320 | 0 | 6.32 | 0.61 | |
| video editing for youtubers | 260 | 44 | 7.26 | 0.41 | informational |
| youtube video editing service ≈ …services | 140 | 20 / 4 | 9.95 | 0.26 | |
| youtube video editor service | 140 | 9 | 8.46 | 0.21 | from keyword ideas |
| hire youtube editor | 90 | 5 | 8.08 | 0.44 | |
| video editing services for youtube | 90 | 27 | 7.00 | 0.09 | |
| youtube editing service(s) | 30 | 0 | 7.18 | 0.55 | |
| youtube editing agency / youtube video editing agency | 10 / 10 | — / 35 | 7.21 / 2.97 | 0.36 / 0.69 | |
| youtube editor | 2,900 | 56 | 5.79 | 0.35 | software intent (related ideas: "youtube studio editor", "free youtube editor software") |

Supply side, not buyers: "youtube editor jobs" 480, "video editor youtube job" 390, "how much does a youtube editor make" 320.

**Podcasts**

| Keyword | Vol/mo | KD | CPC $ | Comp | Note |
|---|---:|---:|---:|---:|---|
| podcast editing ≈ podcast editor | 1,300 | 29 / 19 | 13.67 | 0.38 | "podcast editor" SERP shows software (Adobe Podcast, Riverside, Streamlabs) |
| podcast editing service ≈ …services | 320 | 44 | 17.62 | 0.36 | falling: 140/mo in Sep–Oct 2026 |
| podcast video editor | 110 | 37 | 22.07 | 0.33 | |
| podcast audio editing service | 50 | 25 | 40.25 | 0.17 | from keyword ideas |
| freelance podcast editing | 50 | 0 | 23.56 | 0.38 | from keyword ideas |
| video podcast editing | 40 | 31 | 49.47 | 0.40 | how-to SERP |
| podcast editor for hire | 40 | 0 | 12.62 | 0.56 | |
| podcast editing company | 30 | 44 | 9.54 | 0.09 | from keyword ideas |
| podcast clip editing | 20 | — | 12.16 | 0.48 | |
| podcast editing rates | 20 | 0 | — | 0.16 | |
| podcast video editing service | no data | | | | |

Context: "podcast editing software" 1,000 (KD 41) and "ai podcast editing" 390 show tool demand. "podcast editing jobs" 720 is the supply side.

**Streamers and gaming**

| Keyword | Vol/mo | KD | CPC $ | Comp | Note |
|---|---:|---:|---:|---:|---|
| clipping agency | 590 | 0 | 8.22 | 0.53 | SERP is view-based "clipping campaigns" (section 4), a different business model |
| gaming video editor | 320 | 0 | 4.46 | 0.20 | likely software [E] |
| twitch editor | 210 | 0 | 2.37 | 0.01 | Twitch's Editor channel role: related "twitch editor role" 260, "how to make someone an editor on twitch" 170 |
| gaming video editing | 210 | 0 | 5.73 | 0.17 | informational |
| twitch clip editor | 110 | 37 | 3.56 | 0.28 | tool |
| twitch highlights | 110 | 7 | 4.60 | 0.00 | navigational |
| stream highlights | 50 | 2 | 6.36 | 0.01 | |
| gaming video editor for hire | 20 | 0 | 6.37 | 0.55 | |
| twitch highlight editor | 20 | — | — | 0.00 | from keyword ideas |
| vod editing | 20 | — | 3.61 | 0.29 | |
| gaming montage editor | 10 | 45 | 3.11 | 0.64 | |
| stream highlights editor | 10 | — | — | — | |
| montage editor for hire | 10 | — | — | 0.00 | |
| twitch highlights editor / stream clips editing | no data | | | | |

**Short-form**

| Keyword | Vol/mo | KD | CPC $ | Comp | Note |
|---|---:|---:|---:|---:|---|
| tiktok editor | 3,600 | 15 | 3.57 | 0.09 | in-app editor and tools [E] |
| reels editor | 480 | 23 | 6.58 | 0.43 | tools [E] |
| youtube shorts editor | 390 | 2 | 4.69 | 0.37 | tools [E] |
| short form video editor | 210 | 0 | 6.36 | 0.33 | SERP: app lists plus Reddit hiring threads |
| short form video editing | 90 | 0 | 6.42 | 0.28 | informational |
| tiktok video editing service ≈ …services | 50 | 0 / — | 5.47 / 1.96 | 0.07 / 0.18 | |
| tiktok editor for hire | 20 | — | 8.43 | 0.46 | |
| short form video editing agency | 20 | 0 | 22.75 | 0.23 | |
| social media video editing services | 20 | 0 | 8.05 | 0.29 | |
| short form video editing service | 10 | — | — | 0.43 | |
| reels editing service / youtube shorts editing service | no data | | | | |

**Ads and UGC**

| Keyword | Vol/mo | KD | CPC $ | Comp | Note |
|---|---:|---:|---:|---:|---|
| ugc ads | 1,300 | 55 | 18.41 | 0.30 | about UGC ads in general (informational) |
| ugc agency | 1,000 | 28 | 28.41 | 0.55 | agencies that source creators (navigational) [E] |
| ugc editor | 50 | 6 | 6.23 | 0.25 | navigational |
| ugc video editing | 10 | — | 8.04 | 0.38 | |
| video ad editor | 10 | 35 | 35.20 | 0.57 | |
| ugc ad editing / video ad editing service / ad creative editing | no data | | | | |

**Real estate**

| Keyword | Vol/mo | KD | CPC $ | Comp | Note |
|---|---:|---:|---:|---:|---|
| real estate video editing ≈ real estate video editor | 390 | 8 | 10.25 | 0.47 | SERP: DIY tips and AI tools |
| real estate video editing service ≈ …services | 90 | 8 | 9.03 / 8.63 | 0.32 / 0.49 | |
| real estate video editing software | 30 | 7 | 14.05 | 0.35 | |
| real estate video editing company | 10 | — | 6.15 | 0.89 | |
| real estate video editor for hire | no data | | | | |

**Weddings**

| Keyword | Vol/mo | KD | CPC $ | Comp | Note |
|---|---:|---:|---:|---:|---|
| wedding video editor | 480 | 2 | 10.21 | 0.37 | SERP mixes services, software lists and local results |
| wedding video editing | 260 | 3 | 10.26 | 0.25 | |
| wedding video editing service ≈ …services | 260 | 11 | 8.14 / 7.25 | 0.34 / 0.23 | |
| wedding video editing outsourcing ≈ outsource wedding video editing | 90 | 1 / 11 | 14.18 | 0.07 | B2B: filmmakers outsourcing |
| wedding video editing company | 70 | 11 | 11.92 | 0.08 | |
| wedding film editor | 20 | 39 | 12.66 | 0.79 | |
| wedding video editor for hire | 10 | — | 10.36 | 0.40 | |
| wedding film editing outsourcing | no data | | | | |

**Corporate**

| Keyword | Vol/mo | KD | CPC $ | Comp |
|---|---:|---:|---:|---:|
| corporate video editing ≈ corporate video editor | 40 | 13 | 10.76 | 0.26 |
| corporate video editing service(s) | 10 | — | — | 0.02 |
| video editing for small business | 10 | — | — | 0.24 |

**Local and job-seeker terms** (not our buyers)

| Keyword | Vol/mo | Note |
|---|---:|---|
| video editor jobs | 12,100 | supply side |
| remote video editor | 590 | KD 0, CPC 5.46; mostly job seekers [E] |
| video editing near me ≈ video editor near me | 480 | local intent |

#### 3.2 United Kingdom (2826, en) [P]

| Keyword | Vol/mo | KD | CPC $ | Comp | Note |
|---|---:|---:|---:|---:|---|
| freelance video editor | 390 | 0 | 4.74 | 0.54 | grouped with "freelance video editor vacancies", "…careers" and "video editor freelance work" (390 each), so job-seeker heavy |
| hire video editor ≈ hire a video editor ≈ video editor for hire | 210 | 0 | 7.45 | 0.69 | |
| video editing services ≈ video editing service | 170 | 4 / 5 | 9.14 | 0.41 | |
| video editing agency | 90 | 10 | 6.46 | 0.67 | |
| wedding video editor | 70 | 0 | 7.12 | 0.69 | |
| podcast editing service(s) | 50 | 17 / 12 | 6.46 | 0.54 | |
| youtube video editor for hire | 50 | 0 | 6.55 | 0.75 | |
| video editing services near me | 50 | 0 | 8.26 | 0.45 | local |
| short form video editor | 40 | — | 3.37 | 0.60 | |
| twitch editor | 40 | 21 | — | 0.01 | Twitch role [E] |
| video editing company | 40 | 0 | 8.25 | 0.63 | |
| video editor uk | 40 | 0 | 9.53 | 0.60 | |
| youtube editor for hire | 30 | 16 | 2.95 | 0.79 | |
| freelance video editor uk / …london | 20 / 20 | 16 / 0 | 4.41 / 8.53 | 0.38 / 0.67 | |
| outsource video editing | 20 | — | 8.56 | 0.70 | |
| twitch clip editor | 20 | — | 2.04 | 0.25 | |
| professional video editing services | 20 | — | — | 0.14 | |
| 10/mo each | 10 | | | | corporate video editing (CPC $66.23), corporate video editing services, gaming montage editor, outsource wedding video editing, podcast editor for hire, property video editing, real estate video editing (and …service), short form video editing service, tiktok video editing service, ugc editor, unlimited video editing, video editing company uk (KD 51), video editing outsourcing, video editing services uk, video editing subscription, video podcast editing, wedding video editing service (KD 37), wedding video editing uk, white label video editing, youtube video editing service |
| no data | — | | | | twitch highlights editor, stream clips editing, reels editing service, ugc ad editing, video ad editing service, wedding film editing outsourcing, youtube editor uk, hire video editor uk, podcast editing uk |

#### 3.3 Germany (2276, de) [P]

| Keyword | Vol/mo | KD | CPC $ | Comp | Note |
|---|---:|---:|---:|---:|---|
| video cutter | 2,400 | 0 | 2.39 | 0.19 | online trimming tools [E] |
| videoschnitt | 480 | 3 | 5.10 | 0.59 | informational |
| youtube cutter | 260 | 0 | 2.00 | 0.11 | tools, or "Cutter" meaning editor [E] |
| cutter gesucht | 260 | 0 | 1.49 | 0.44 | "editor wanted": job ads [E] |
| video editor freelancer | 140 | 0 | 2.82 | 0.55 | |
| video schneiden lassen ≈ videos schneiden lassen | 50 | 3 / 8 | 4.89 | 0.73 | the only real service term |
| video editor gesucht | 50 | 0 | 1.78 | 0.52 | |
| youtube cutter gesucht | 40 | 0 | 1.35 | 0.34 | |
| video cutter freelancer | 30 | — | 2.28 | 0.55 | |
| podcast schnitt | 20 | — | 4.78 | 0.55 | |
| 10/mo each | 10 | | | | hochzeitsvideo schneiden lassen, podcast schneiden lassen, video bearbeiten lassen (CPC $8.69), videoschnitt freelancer, videoschnitt kosten, videoschnitt preise (KD 41), videoschnitt service |
| no data | — | | | | videoschnitt dienstleister, youtube video schneiden lassen, videoschnitt agentur, videobearbeitung lassen, videoschnitt lassen, videoschnitt outsourcen, video editing agentur, video schnitt service |

Keyword ideas for "videoschnitt *" are dominated by software queries: "videoschnitt programm" 1,600, "videoschnitt kostenlos" 170, "videoschnitt mit linux" 170. The ideas for "video schneiden lassen" are all DIY ("video komprimieren" 14,800; "videos schneiden" 8,100). [P]

#### 3.4 What the keyword-idea runs added [P]

There were 15 `research_keywords` seeds: 11 US, 2 UK, 2 DE.

- **"* video editing services" (US).** The niche variants are tiny:
  - wedding 260, professional 90, real estate 90, unlimited 50, tiktok 50, music 20, social media 20.
  - 33 more variants at 10/mo, including podcast video, remote, sports, home and cheap.
  - 44 rows below 10.
- **"hire * editor" (US):**
  - "hire a freelance video editor" 50; "how to hire video editor" 50; "where to hire a video editor" 20 (CPC $9.63); "where can i hire a video editor" 20 (CPC $54.61); "hire philippines video editor" 20.
  - Niche hiring variants ("hire youtube shorts editor", "hire video editor for instagram reels", "how much does it cost to hire a youtube editor") are 10 each.
- **"video editor for hire" and "wedding video editing" seeds** were swamped by software terms (CapCut 135,000, "video editing software" 246,000). This confirms that "video editor" phrasing pulls tool searchers.
- **"twitch editor" (US).** The whole cluster is about Twitch's own editor role and clip tools.
- **UK seeds.** They confirm the job-seeker grouping of "freelance video editor". "video editing services near me" is 50.

#### 3.5 Monthly trends, US [P]

| Keyword | 2019–21 typical | 2025 typical | Aug / Sep / Oct 2026 | Pattern |
|---|---|---|---|---|
| video editing services | 880–1,900 | 1,900–4,400 | 3,600 / 1,900 / 1,000 | about double since 2021; volatile month to month |
| hire video editor | 590–1,300 | 1,300–2,400 | 1,300 / 3,600 / 5,400 | stable, with a spike in Sep–Oct 2026 |
| youtube video editor for hire | 210–480 | 260–590 | 390 / 320 / 390 | flat for six years |
| podcast editing services | 260–480 | 260–480 | 210 / 140 / 140 | falling in 2026 |
| wedding video editing services | 70–210 | 170–320 | 170 / 210 / 260 | rising; peaks Mar–Apr (390 in 2026) and Jul |
| wedding video editing outsourcing | 10–70 | 30–140 | 50 / 70 / 140 | rising; peaks in spring and October |
| real estate video editing | 30–140 | 210–590 | 320 / 390 / 390 | about 8× since 2019; spring peaks |
| video editing subscription | 10–70 | 30–880 | Jun–Aug 2026: 30 / 10 / 20 | tiny baseline; the average of 260 comes from a Jan 2026 spike of 2,400 |

---

### 4. Search results pages

#### 4.1 SERP features across the 21 queries [P]

| Feature | SERPs with it |
|---|---:|
| AI Overview | 21 / 21 |
| People Also Ask | 21 / 21 |
| Related searches | 19 / 21 |
| Video results | 13 / 21 |
| Discussions & forums (Reddit, Quora) | 8 / 21 |
| Local pack | 6 / 21: "video editing services" US and UK, "video editing company", and three wedding queries |
| Paid ads | 4 / 21: "video editing services" (3 ads), "video editing company" (4), "outsource video editing", "podcast editor" |
| Images | 3 / 21 |

Domains appearing in the organic top results, out of 21 SERPs:
- Reddit at least 8; Upwork 6; graphically.io 6; Fiverr 5; Twine 5; Quora 4; Bark 3; crayo.ai listicle 3.
- Contra, YTJobs, Freelancer.com and PeoplePerHour 1 each. [P]

#### 4.2 Query by query

Positions are "pos (n/3)". The ranking forecasts are our estimates [E]. Everything else is measured [P].

| Query (market, vol) | Who ranks | Page types | Can a new site rank? [E] |
|---|---|---|---|
| video editing services (US, 2,400) | becreatives.co 1 (3/3); tastyedits.com 2 (2/3); fiverr.com category 3 (2/3); upwork.com 5 (2/3); trustpilot category 6 (2/3); vidico.com and hatchwise.com listicles 7–9 (2/3); LA agency adjustproduction.com 8 (2/3); sortlist and bark directories 2–3 (1/3); Reddit thread 4 (2/3) | 2 productized services, 2 marketplaces, 4 directories or review sites, 2–3 listicles, local agencies, a forum | Hard. Not in the top 10 within 12 months. Maybe 12–24+ months with real links. The beCreatives homepage has 206 referring domains [S] |
| hire video editor (US, 1,900) | upwork.com 1 (1/3); graphically.io guide 1 (2/3); fr.freelancer.com 3 (2/3); ziprecruiter jobs 3 (2/3); twine.net 4; workfry.com 5; increditors.com guide 6; quora 6 (2/3); r/FindVideoEditors 7; kreatli cost guide 7 (2/3); hiredigital.com 8 | marketplace hire pages, "how to hire" guides, forums, job boards | Unstable SERP: most sites seen only once. A guide could reach the top 10 in 6–12 months; a sales page is unlikely |
| freelance video editor (US, 1,300) | meegle.com careers; shoots.video "how to become"; truelancer jobs; invoicely blog; ziprecruiter "$21–$47/hr" jobs; kreatli "how to become"; Reddit r/VideoEditors; Quora; upwork.com 6 (2/3) | job-seeker and career content | Don't target: the intent is supply side |
| youtube video editor for hire (US, 390) | fiverr.com "Youtube video editing services" 1 (1/3); fundmates.com guide 1; r/NewTubers 1–2; YouTube videos; upwork.com 3 (2/3); increditors.com 4; monkyvision.com listicle 4; **replayed.co 4** (productized); graphically.io 5; ytjobs.co 5; joinroster.co 6 | marketplaces, guides, forums, job board, one productized service | Plausible: top 10 in 6–12 months for a page with real samples and a few links |
| youtube video editing services (US, 140) | fundmates.com 1 (3/3); quora 2 (3/3); reddit 3 (3/3); smbillion, graphically.io and crayo.ai listicles 4 (crayo 3/3); mapsystemsindia listicle 5 (2/3); YouTube; facebook | guides, forums, listicles; no productized page in the top 5 | Plausible in 6–12 months |
| podcast editing services (US, 320, KD 44) | r/podcasting 1; open.spotify.com listing 1 (2/3); podcastmagician.com 2; contra.com hire page 3; nextdaypodcast.com 3; videoscale.co listicle 3 (2/3); buzzsprout and podkick listicles 4; airgigs 5 (2/3); weeditpodcasts.com 5 (2/3); podcasteditingservices.com (exact-match domain) 6; launchashow.com 6 (2/3); podigy.co 7; dialedstudios.net 7 (2/3); bengomedia.com 8 | specialist productized services plus podcast-host listicles | Hard. 12+ months; KD is the highest in the set, and demand is falling |
| podcast editor (US, 1,300 grouped) | podcast.adobe.com; helloaudio software list (2/3); riverside.com; streamlabs.com; visla.us (2/3); podsqueeze.com; peopleperhour.com projects 4; pro.fiverr.com 6 | software tools | Don't target |
| video podcast editing (US, 40, CPC $49.47) | podkick.com 1 (2/3); c-istudios.com (2/3); kredosmedia.com service 2 (2/3); bhphotovideo.com guide; weeditpodcasts.com 4; finchley.co.uk (2/3); streamlabs and riverside tools | how-to content plus 2 services | Low chance for a service page; tiny volume |
| wedding video editing services (US, 260) | partyslate, wezoree, everly.so, bridestory, weddingwire, yelp (local videographer directories); **weddingeditlab.com 1 (2/3)**, "2025 Hiring Guide & Costs"; gcphotographers.com 2 (2/3); facebook and instagram pages of wedding-editing services; YouTube | consumer-local results mixed with B2B editing services | Plausible for the B2B angle in 3–9 months. Weddingeditlab ranks with about 1 visit/mo and 5 keywords in DataForSEO's index [S], so a tiny site can win here |
| wedding video editing outsourcing (US, 90) | r/weddingvideography threads 1–2 (2/3); wedcuts.com 2; weddingeditlab.com 2 (2/3); wanderlust-videos.com 3; wedditor.com 4; outsource2india.com 4 (2/3); bridengroom.video 5; theyesgirls listicle 6; weddingplanner.co.uk (2/3); nobacklog.com 7 | small specialists, forums, guides | Plausible top 5 in 3–6 months |
| wedding video editor (US, 480) | wanderlust-videos.com 1; mapsystemsindia software list 1 (2/3); Reddit 2; kkinscreative.com 3; techjockey software list 3 (2/3); planwithlaur.com 4; wedditor.com 5; 4easysoft (2/3); vidpros.com blog 5 (2/3); filmora; wedcuts.com 6 | services, software lists, local | Plausible in 6–12 months |
| real estate video editing (US, 390) | flexclip AI maker; styldod tips; nice-color tips; amplifiles.ai; beatcolor tools; kylehandy.com (2/3); rismedia free apps; fotober.com software list (2/3); gatorgazemedia AI; Reddit r/videography and r/RealEstatePhotography threads ("Looking for Real Estate video editors") | DIY guides and AI tools; buyers ask on Reddit | Possible in 6–12 months, but it converts poorly because most searchers are DIY |
| video editing subscription (US, 260) | rebellink, techimply, splitmotion (3/3), amazon, licensel (software); graphically.io 2 (3/3), founded.org 3 (3/3), flocksy.com 5 (3/3), bettervideocontent.com 6 (2/3) (listicles) | software subscriptions plus "unlimited editing" listicles | Skip: the intent is mixed and the baseline tiny |
| outsource video editing (US, 140, CPC $23.25) | graphically.io guide 1 (3/3); reddit 2 (3/3); sendshort.ai 2 (3/3); indiev.org 4; neowork.com; wrightymedia.com guide 4 (3/3); kdci.co; maekersuite; viostream; offshoreclipping.com; colorexpertsbd.com | guides by agencies and offshore providers | A guide could rank in 6–12 months |
| short form video editor (US, 210) | r/FindVideoEditors 1; marketerinterview and scion-social app lists (2/3); makeuseof; Reddit "for hire" posts; instagram jobs; Google Play app | tools plus Reddit hiring posts | Skip |
| clipping agency (US, 590) | clippingcampaigns.co 1 (2/3); clipping.net "Get Paid to Clip Videos, Earn Per View" 2 (2/3); seenfold and picsart explainers; findclout ranking; tryshoot "How to hire a clipping agency"; YouTube videos on Whop clipping campaigns | the view-based clipping economy | Only relevant if offering clipping campaigns; a different model |
| video editing company (US, 480, KD 32) | twine.net 1 (2/3); crayo.ai 1 (3/3); thumbtack 2; fueler.io listicle 2 (3/3); yelp 3 (2/3); productionhub.com 4 (3/3); offshoreclipping and rankfirms lists; bark; beyondbracket listicle | directories, listicles, local | Hard |
| video editing cost (US, 320) | YouTube "How Much Should You Charge"; freevisuals.net rates (2/3); icopify.com; reddit (3/3); instagram; facebook; cloudanimations.com (3/3); sortlist.com "How Much Does It Cost to Outsource" 6; quora (2/3) | rate guides, mostly for editors | A buyer-facing pricing guide could rank in 6–12 months |
| video editing services (UK, 170) | rachelshenton.co.uk freelancer 1; crayo.ai 1 (2/3); YouTube "How to Hire a Video Editor for YouTube in the UK" 1 (2/3); fiverr 2; buzzflick.com; trendygrandad.com (London); twine; dragonfly.co.uk post house; lendedit.co.uk (2/3); upwork 5; biztalbox listicle (2/3); herenow.film (London); behance hire page | local UK freelancers and agencies, marketplaces, local pack | A Bulgaria-based page is at a disadvantage for local results |
| hire video editor (UK, 210) | uk.indeed.com 1; graphically.io 1 (2/3); symphaera jobs (2/3); herenow.film "Hire a Video Editor in London, From £350 a Day" 2; r/VideoEditor_forhire 3; productionhub 3 (2/3); twine; LinkedIn jobs; freelancehunt (2/3); sohoeditors | mixed hiring and jobs | Low value, low volume |
| video schneiden lassen (DE, 50) | cuttigo.com 1 (2/3); frauchefin.de 2 (2/3); cutter-chris.de 3 (2/3); kleinanzeigen.de services 5 (2/3); de.fiverr.com 6 (2/3); streamlabs, canva, adobe, vidio.ai and magix tools; YouTube tutorials | small German freelancers, classifieds, Fiverr, tools | Feasible, but tiny and needs German copy; skip |

#### 4.3 What winning looks like: competitor organic traffic, US [S]

| Domain | Est. organic visits/mo | Ranked keywords | Where the traffic comes from |
|---|---:|---:|---|
| tastyedits.com | 5,740 | 6,883 | Blog: /best-video-editing-software/ about 917; a TikTok-personality post about 517; "buying YouTube subscribers" about 298; "richest YouTubers" about 294. Homepage about 97 (brand) |
| vidpros.com | 2,703 | 4,962 | Blog: CapCut review about 400; Streamlabs review about 277; Artlist review about 273 |
| graphically.io | 732 | 3,245 | guides ("How to hire a video editor", "Outsource video editing") seen in 6 of our SERPs [P] |
| replayed.co | 521 | 103 | not broken down |
| fotober.com | 439 | 1,371 | not broken down |
| becreatives.co | 421 | 255 | Homepage about 261: brand about 148, "editing agency" 29, "unlimited video editing" 26, "unlimited video editing services" 21, "video editing subscription" 16. Service-category pages about 2–7 each. Our live read puts it at #1 for "video editing services", which DataForSEO's index does not yet reflect, so this may be an underestimate |
| vidchops.com | 317 | 559 | — |
| veedyou.com | 269 | 2,403 | — |
| increditors.com | 109 | 395 | — |
| weeditpodcasts.com | 94 | 968 | despite about 921 blog posts [P, C35] |
| nextdaypodcast.com | 84 | 141 | — |
| wedcuts.com | 62 | 148 | — |
| wedditor.com | 10 | 23 | — |
| weddingeditlab.com | 1 | 5 | yet #1–2 in our live wedding SERPs |

The lesson [E]: service pages earn single or double-digit visits a month even for sites that rank. Large traffic numbers come from off-topic blog posts that do not sell editing.

---

### 5. Competitor sites

The 10 sites are below; PhotoUp and BoxBrownie dropped video, so Fotober replaced them. Site facts are [P] from each site, read 2026-11-18. Traffic figures are [S] from section 4.3. All counts come from sitemaps or page links (C1–C53).

| Site | Pages: services, niches, other | Pricing | Portfolio, process, FAQ, blog | Proof | How you buy | Turnaround, revisions |
|---|---|---|---|---|---|---|
| **becreatives.co** (unlimited editing; ~421 visits/mo) | 18 service-category and 40 sub-service pages: YouTube, Shorts, TikTok, Reels, ads, podcast, Twitch, real estate, beauty, sports, Etsy/Amazon. 3 audience pages (creators, business owners, agencies). **420 location pages**: 318 US cities, 50 states, 52 countries including Bulgaria (C1) | Monthly "unlimited", one request at a time: Scale $999/mo billed quarterly or $1,199 month-to-month; Pro $1,999 / $2,299; In-House Team $4,999 / $6,000 (C2). Hidden "ReelQuick" offer: $499/mo for 20 template reels (C6) | Gallery of 130 videos with 10 industry tags; 3-step "how it works"; FAQ; about 128 posts; pricing table naming 9 rivals (C1–C5) | On-site "4.7, 75 reviews" badge (platform not named); Trustpilot 4.3 from 120 reviews [S, C7]; 11 case studies; claims "1,000+ clients" (C1, C3) | **Self-serve**: "Checkout" leads to sign-up and a Stripe link. Heavy call push: "Book a call to reserve", and the FAQ says the schedule is agreed "on the call". No trial (C2, C4) | Under 90 s: 1 a day (Scale); under 10 min: up to 2 days; unlimited revisions (C2) |
| **tastyedits.com** (~5,740) | 13 core pages: long-form, short-form, YouTube, channel management, plus 7 use cases (YouTubers, businesses, podcasters, realtors, course creators, doctors, lawyers). 49 niche/format pages (gaming, Twitch, cooking, finance…); 31 US location pages. "We DO NOT edit wedding videos" (C8, C9) | Per video, in packs: horizontal $327 (1), $305 each (4), $278 each (8); vertical $94 / $88 (15) / $80 (30); add-ons $43; up to 60 min and 20 GB of raw footage. Channel management $1,490–$2,370/mo (C9, C10) | /examples/; how-it-works section; FAQ; 224 posts; about 7 comparison pages (vs Upwork, Video Husky, Vidpros) (C8, C9) | "4.9" Google badge with no count; Trustpilot 4.7 from 85 [S, C13]; 52 testimonials; 16 case studies; "30,000+ videos edited" (C9, C11) | **Self-serve**: "Start My Edit" leads to an order form; "Book a Call" is secondary. Channel management is sold by call only (C9, C10, C12) | 48-h first draft (long), 24 h (vertical); unlimited revisions (C9, C10) |
| **vidpros.com** (~2,703) | 18 service pages: YouTube, TikTok, Instagram, podcast, video podcast, clipping, UGC, real estate, course, talking head, white-label… Gallery with 14 industries (C14, C15) | Subscription: Starter $1,000 (20–40 shorts or 5–10 long), Growth $2,000, Scale $4,000/mo (C16) | /our-work/; process section; FAQ; 816 posts; footer "Compare" menu with 7 links (C14–C16) | Trustpilot 4.4 from 27 [S, C19]; Google 4.8 from 25 (on site); 6 client stories; "50,000+ videos" (C15) | **Self-serve**: "$100 trial" week via Stripe checkout. Hero button is "Book a Call", but the booking page says "Prefer to skip the call? … Check out in 2 minutes" (C16–C18) | Overnight to 1–2 days; unlimited revisions within output (C15, C16) |
| **vidchops.com** (~317) | About 4 service pages: editing, video podcast, YT Helper, Podcast Helper, plus white-label. No niche or location pages (C20) | Credits: Weekly $495/mo (4 credits), Pro $995/mo (8). 1 credit = 1 long video (5–60 min) or 4 shorts. Full-Time tier unpriced (C22) | Portfolio with 57 videos; /how-it-works/; FAQ; 186 posts (C20, C24) | Named testimonials; inconsistent "5,000+ creators" claims; Trustpilot 0 reviews [S, C25] | **Self-serve**: SamCart checkout at $495; written onboarding portal; editor matched in 8 h. Full-Time tier by call. 14-day money-back (C21–C23) | 1–2 days; 3 revisions (Weekly), unlimited (Pro) (C22) |
| **veedyou.com** (~269; Bucharest) | 5 service pages: YouTube, podcast, social, animation, wedding; real estate, corporate and drone only as homepage sections (C26, C27) | Starter $899/mo, Growth $2,399/mo; 1-week trial $159 (C28) | Portfolio; FAQ on homepage; 166 posts (C26, C27) | 4 short quotes, logo strip, founder story (C27) | **Checkout broken** on 2026-11-18 (the order portal shows "Account Expired"). Works: quote form, Calendly call, WhatsApp (C27, C29, C30) | Starter 2–3 business days; unlimited revisions (C28) |
| **replayed.co** (~521; London) | 1 service page, 4 pricing pages; YouTube creators only (C31, C32) | Per video, "No subscription": from $195 per video or $35/h; thumbnails from $89; shorts $56 (C33, C34) | Portfolio needs JavaScript; process steps; FAQ on a help site; 35 posts, 5 about rivals (C31, C32) | 9 named creator testimonials; press links (C32) | **Self-serve app**: free account, "AI style scan", editor match. **No call button anywhere** (C32–C34) | 1–3 days; revisions $35/h (C33, C34) |
| **weeditpodcasts.com** (~94) | 9 service pages (audio, video, show notes, launch, marketing…); B2B video podcasts (C35, C36) | Up to 60-min episodes: audio $440/mo (2 eps); video $980 (2) or $1,800 (4); trial episode $90–$600; retainers $1,990 / $3,800 / $7,500 per month (C37–C39) | Examples; 3 case studies; how-it-works; FAQ; 921 posts (C35, C37) | "4000+ customers", "99.5% satisfaction", case studies (C36) | **Self-serve** on /pricing/ (Stripe) and a trial builder; work by email after purchase. Homepage and retainers push "Book a call" (C36–C40) | 72 h; edit-only 48 h; one free set of revisions (C37, C38) |
| **nextdaypodcast.com** (~84) | 4 service pages: audio, video, reels, launch (C42) | Video $300–$380 per episode or $900/mo unlimited; audio $160 or $480/mo; clips $50 (C43, C44) | Showcase; how it works; FAQ; 33 posts (C42, C45) | Trustpilot badge 4.7 from 26 (C42) | **Self-serve**: Stripe checkout ("Send an episode"). Hero shows "Book a 15-min call" first (C42–C44) | 24 h; unlimited revisions (C42, C43) |
| **wedcuts.com** (~62) plus wedditor.com (~10) | WedCuts: 14 pages (wedding how-it-works, pricing, samples, editors) plus 6 general editing pages; for filmmakers, studios and couples (C46, C48). Wedditor: application only, "starts around $750+", 4–8 weeks, contact form only (C50) | Per film: highlight from $180, feature from $300, full length from $325; order form $180–$850 (C47, C49) | Samples; how it works; about 163 posts (C46, C48) | 10 Facebook reviews (5★); "8,700+ wedding films", "40+ countries" (C46, C49) | **Self-serve**: "Get Started for $180" leads to an order form with Stripe; "we'll check everything & get back to you within 24 hours". **No call button** (C46, C49) | "7-Day Turnaround, 3 Revisions"; pricing page says 7–30 days (C47, C49) |
| **fotober.com** (~439), replacing PhotoUp and BoxBrownie | PhotoUp and BoxBrownie no longer list video editing (C51, C52). Fotober (Vietnam): real estate, car, event and wedding video pages; 449-URL sitemap (C53) | No video prices published (C53) | Mostly blog-style pages (C53) | "5000+ real estate photographers, agents and architects" (C53) | **Self-serve**: free "Start Trial" and "Create Order" app, WhatsApp; no call (C53) | not stated |
| *Streamer check* | No productized streamer service found with one search. Only Fiverr listings (about $25–$60) and AI clip tools [S, C55]. One-person example Koki Starlight: clip €15–20; highlight €40–60; VOD editing €40/h; ordering by Google Form or VGen, no call (C54) | | | | | |

**Patterns** [P unless marked]

- **Buying without a call is normal.**
  - Eight of the nine productized sites have a working written path to payment.
  - Calls are required only for big or custom tiers (beCreatives In-House, Vidchops Full-Time, Tasty Edits channel management, We Edit Podcasts retainers).
  - Replayed and WedCuts show no call option at all.
  - Four sites still put "Book a call" first on the homepage.
- **Prices are always published, in two models.**
  - Per video: long about $180–$330, shorts $56–$94.
  - Monthly: about $495–$1,000 at entry.
  - Raw footage is usually capped at 60 minutes. Entry subscriptions work out to about $100–$200 per long video [E].
- **The first purchase is low-risk, but free test edits are rare.**
  - Paid trials: Vidpros $100 a week, VeedYou $159, We Edit Podcasts from $90.
  - Single-video entry: Tasty Edits, Next Day Podcast, Replayed, WedCuts.
  - Money-back guarantees: Vidchops, We Edit Podcasts, WedCuts.
- **Pages everyone has:** pricing (9/9), portfolio (10/10), FAQ (8 confirmed), a how-it-works section, and a blog (33–921 posts).
- **Niche and location pages are a big-generalist play.** beCreatives has 58 service pages and 420 locations; Tasty Edits 13 core, 61 niche and 31 location pages. Specialists have 1–9 service pages and no location pages.
- **Promises:** turnaround of 24–72 h for creator and podcast work and 7–30 days for weddings. Unlimited revisions on subscriptions; per-project sellers cap them.
- **English only, often run from abroad.** VeedYou sells from Bucharest, Replayed from London, Fotober from Vietnam, and Vidpros' editors work on Philippine time. Onboarding is mostly written: portal forms or email. None of the 10 has a non-English version.

---

### 6. Marketplaces, job boards and communities

All facts were read on 2026-11-18 from each platform's own pages unless marked. Source numbers M1–M90 are in section 10.

| Channel | Seller fees | Buyer fees | How a new seller gets first orders | Written-only English? | Self-promotion rules | Off-platform (circumvention) rules | Segments that buy there |
|---|---|---|---|---|---|---|---|
| **Upwork** | 0–15% per contract, shown before bidding [P, M1]. Connects $0.15 each [P, M5]. Basic plan: 0 monthly Connects ("earn up to 10" via tasks); Freelancer Plus $19.99/mo with 100 Connects [P, M2, M7]. ID badge costs 35 Connects [P, M10]. Withdrawals: $0.99 local bank outside the US; $50 USD wire [P, M7] | Basic 5% (3% for eligible US bank payers) plus a $0.99–$14.99 contract-initiation fee [P, M3]. A help article says "up to 7.99%": **conflict** [P, M4] | Proposals cost Connects. "Some new freelancers must first make a qualifying Connects purchase or join Freelancer Plus before they can submit any marketplace proposal" [P, M5]. Paid Boosts [P, M6]. Rising Talent needs the ID badge [P, M13] | **Risky.** ID check: "A short video call or phone photo" [P, M8]. "We'll schedule a quick video meeting with you" [P, M9]. Some jobs require an AI video interview that "must be completed in English" [P, M11]. Calls expected: high [E] | No direct contact details before a contract [P, M14 §7.2]. Don't repeatedly message non-responding clients [P, M12] | On-platform for **two years** unless a Conversion Fee is paid: 13.5% × hourly rate × 2,080 h, e.g. $8,424 at $30/h [P, M14, M15]. Breach can mean suspension [P, M15] | Hire pages for YouTube, short-form, TikTok, talking-head, faceless-YouTube, gaming, corporate, direct-response and video-ad editors [P, M16]; none seen for weddings or real estate [E] |
| **Fiverr** | 20%: the seller is credited 80% [P, M17]. Withdrawals: PayPal $0; Payoneer $1–3; local bank $3. 14-day clearing [P, M17]. Optional Kickstart plan $15/mo [P, M23]. Possible one-time ID fee, amount not stated [P, M21] | 5.5%, plus $3.50 on orders under $200 (since Sep 2025) [P, M17, M19] | Publish Gigs. Ranking: "Relevancy is the most important", then past appeal, satisfaction, reviews, price, responsiveness; no new-seller boost documented [P, M20]. Fiverr Ads (pay per click) [P, M31]. Briefs replaced by the Mira matchmaker, which doesn't send jobs under $250 to sellers [P, M25, M26]. Level 1: 5 orders, 3 clients, $400 [P, M24] | **Best fit.** Automated document-plus-selfie ID check [P, M22]. "Only freelancers can initiate Zoom video calls" [P, M27]. Profile must be in good English [P, M29]. Calls expected: low [E] | Promote Gigs off Fiverr only with Fiverr links; "Never share personal contact information" [P, M28] | No "email addresses, third party messaging applications, telephone numbers… to communicate outside of Fiverr"; no paying outside Fiverr [P, M18 §8.1]. Buyers who break this owe $10,000 [P, M18 §5.2] | Video Editing has 62,000+ gigs. Video-type filter: Ads & social, YouTube, Corporate, Gaming, Family & travel, Music, Weddings & events. Related categories: UGC 25,000+, short ads 21,000+, social 15,000+, real estate promos 2,000+, podcast editing 1,200+, corporate 556, repurposing 447 (measured seller supply) [P, M30] |
| **Contra** | 0% commission [P, M32]. Optional Pro $29/mo [P, M34]. SEPA payout $1 + 0.40% FX [P, M33] | Card 2.9% + 30¢ (more for international cards). Platform fee $15 (under $500) or $29 per payment unless the freelancer has Pro [P, M33] | Inbound via Discover, ranked by a "discovery score" (profile, posts, reviews, response time, Pro) [P, M36]. Job feed limited on the free plan [P, M37] | **Likely OK.** Persona ID check; no calls required [P, M38]. Calls expected: medium [E] | "DMs are not for pitching your services" [P, M39]. Spam gets removed [P, M40] | No non-circumvention clause in the Terms (9 Apr 2026) [P, M41] | Hire pages for video editors, podcast editors, UGC, YouTube/TikTok, Twitch [P, M42]; startups and brands [E] |
| **Freelancer.com** | Fixed price: 10% or $5, whichever is greater, charged at award; hourly 10% [P, M43]. Plans $4.99–$9.99/mo for more bids [P, M44]. "Verified" badge $99 [P, M43] | 3% or $3 (fixed price) [P, M43] | Bid on projects. 474 video-editing jobs; the 48 shown had a median of 23.5 bids [P, M47, measured] | **OK.** ID by document, photo with code and proof of address; no call [P, M46] | No contact info in posts [P, M45 §13] | 24 months. Conversion fee: the greater of "up to 30% of the Seller's projected annualized compensation and/or USD $3,000" or 13% × 2,080 h × hourly rate. A "penalty equal to 30%" of the budget for talking and paying off-site [P, M43, M45 §22] | YouTube vlogs, Reels, TikTok, ads; low budgets [P, M47; E] |
| **PeoplePerHour** | 20% under £250 lifetime per buyer, 7.5% for £250–£5,000, 3.5% above [P, M49, M50]. 15 proposal credits a month [P, M51]. Annual "PPH Basic" subscription, price not shown [P, M50] | £0.60 + 10% [P, M50] | Moderated application; crowded skills can close to new applicants [P, M52, M53]. 51 video-editing listings; median 21 proposals [P, M58, measured] | **Gated.** Rejections for "Poor English… correct grammar and syntax" [P, M53]. Talk stays on site [P, M54] | No contact info on the profile [P, M53] | "Against the terms… to take any communication off the platform"; suspension [P, M54, M55] | UK SMEs: social, explainer, corporate [P, M58; E] |
| **Malt** | 5%, or 10% on some projects dropping to 5% after 6 months; the two help articles **conflict** [P, M59, M60] | UK, Netherlands, Nordics: 10–15% [P, M59] | No job board: clients message you, and matching sends opportunities at ≥70% fit [P, M64, M66]. Search visibility needs a rating of at least 3.75 [P, M65] | **Poor fit.** Bulgaria is accepted but needs a commercial-register extract and sworn English or French translations [P, M61, M63]. Its own tip: "offer to arrange an initial meeting" [P, M66, M67] | Shareable profile encouraged [P, M65] | Keep talk on Malt [P, M67, M68]; legal clause unreadable (blocked) | B2B marketing in FR, DE, ES, BE, NL, UK [E] |
| **YTJobs** | Applying looks free [E, M72]. Optional escrow fee 5% [P, M71, measured] | Channels pay: $149 per listing, $199 for 30 days of talent search [P, M72] | Apply to listings: 585 of 594 allow one-click apply. 507 active; 314 for editors (198 per-project, 90 full-time, 26 part-time); 565 of 594 remote [P, M70, measured]. Badges rank by your top client's subscriber count [P, M72] | **Mixed.** Chat has "Set up a call" and test-task cards [P, M72]. Test tasks suit written work [E] | — | Optional escrow [P, M71] | YouTube channels: Entertainment 313, Gaming 206, Education 205; Podcast 66; Live stream 45 [P, M70] |
| **Twine** | Free plan: 1 application a day, fees up to 6%. Pro $79.75/yr (sale price) [P, M74] | 10% up to $10,000 per freelancer [P, M73] | Pitch to posted projects [P, M74] | Probably; biometric ID check, no call [P, M75] | — | "All Engagements shall be via the Twine Platform" [P, M75 §4.2] | Startups, brands, DTC; video editing and UGC [P, M73, M75] |
| **Whop Content Rewards** (clipping) | No joining fee. Paid per 1,000 views after brand approval; payout fees $2.50–$23 [P, M76, M77] | Brand funds the budget [P, M76] | Join a campaign, clip the supplied long-form content, **post on your own TikTok, Shorts, X or Reels accounts**, get paid by views [P, M76] | Yes; no calls [P, M76; E] | Campaign requirements [P, M76] | Not applicable | Streamers, podcasters, brands [P, M76; E] |
| **Behance** (partial) | Pro from $9.99/mo gives 0% platform fees on freelance projects [P, M78] | — | Portfolio plus a "Hire Me" setting [P, M78] | Probably [E] | — | — | Agencies and brands [E] |
| **Reddit: hiring subs** (r/forhire, r/HireAnEditor, r/FindVideoEditors, r/YouTubeEditorsForHire, r/VideoEditingRequests, r/VideoEditor_forhire) | Free | Free | Post [For Hire]; answer [Hiring] posts [S, M84; E]. These threads rank in Google for buyer queries (r/FindVideoEditors, r/VideoEditor_forhire in our SERPs) [P] | Yes, text by nature [E] | r/forhire requires account age and karma; karma farming means a ban [S, M85]. **Rules could not be read directly: Reddit blocked all fetches** [M81] | Not applicable | Creators and small businesses, low budgets [E] |
| **Reddit: creator subs** (r/NewTubers, r/PartneredYoutube, r/Twitch, r/podcasting) | Free | Free | Weekly threads; don't pitch in the main feed [S, M82, M83; E]. r/NewTubers and r/podcasting threads rank for "youtube video editor for hire" and "podcast editing services" [P] | Yes [E] | r/NewTubers: weekly collaboration thread [S, M82]. r/podcasting: weekly thread for service providers [S, M83]. r/PartneredYoutube, r/Twitch: unverified | Not applicable | Small YouTubers and podcasters [E] |
| **Reddit: editor subs** (r/VideoEditing, r/editors) | Free | Free | Low value: members are editors, not buyers [E] | Yes | r/editors: "no self-promotion" [S, M84] | Not applicable | Editors [E] |
| **Discord** (thin evidence) | Free | Free | Editor servers with job channels: Edit Big 14,780 members ("Jobs system"), Editing Hunt 6,979 ("Clients post hiring requests daily"), both self-described [P, M87]. Disboard "video-editing" tag: 23 servers on page 1, most with under 200 online [P, M86] | Mostly, though voice channels are common [E] | Per server; many have self-promotion channels [P, M86] | Not applicable | Small creators; more editors than buyers [E] |
| **X (Twitter)** | Free | Free | Post samples; DM creators a short sample edit made from their own content [S, M90] | Yes, text DMs [E] | X bans "bulk, aggressive, high-volume unsolicited replies, mentions, or direct messages" and "identical direct messages" [P, M88, M89] | Not applicable | Creators, founders, podcasters [S, M90; E] |
| **Mandy, ProductionHUB** | Pages blocked or JavaScript-only; not verified [M80]. ProductionHUB ranks for "hire video editor" UK and "video editing company" US [P] | | | | | | |

---

### 7. Conclusions

#### 7.1 Channel order for an editor with no reviews [E, based on the rows above]

1. **Fiverr: start in week one.**
   - Why it fits:
     - It is written-first: only the seller can start a call (M27), and the ID check is automated (M22).
     - Buyers search for it by name: "fiverr video editing" gets 590 a month in the US.
     - Its category pages rank on Google itself: #3 for "video editing services".
     - It covers every requested segment through its video-type filters (M30).
   - Cost: 20%.
   - Plan:
     - Create 3–5 focused Gigs: YouTube long-form; podcast and video podcast with clips; short-form from long-form (for creators and streamers); wedding highlight edits for filmmakers; real estate listing videos.
     - Price entry packages to win the first five orders. Level 1 needs 5 orders, 3 clients and $400 (M24). Answer fast.
     - Keep every message on Fiverr (M18).
2. **YTJobs, in parallel.**
   - Free to apply, with 314 active editor listings, two thirds of them per-project (M70).
   - Test tasks suit written work.
   - Weakness: badges favour editors whose clients have big channels (M72).
3. **Reddit hiring subs and the weekly threads in creator subs.**
   - Text-native and free. Their threads rank in Google for buyer queries (section 4).
   - Budgets are small. Read each sub's rules after logging in, because we could not verify them.
4. **Direct written outreach to wedding filmmakers and studios (B2B).**
   - Search demand is rising, and tiny specialists win these SERPs.
   - Clients send footage and written notes, so it is async by nature.
   - Price anchors: WedCuts $180–$850 per film (C47, C49).
5. **Contra.**
   - Free profile, 0% commission (M32). Inbound only: "DMs are not for pitching" (M39). Mostly startups and brands.
6. **Upwork: after 5–10 reviews elsewhere.**
   - It has the largest client flow, but three risks for a written-only seller:
     - a possible live video meeting for identity (M8, M9);
     - English AI video interviews on some jobs (M11);
     - a possible Connects purchase before the first proposal (M5).
7. **X and Discord: supplementary only.**
   - Use personal, non-identical DMs, because X bans bulk or identical unsolicited DMs (M88).
   - Discord editor servers hold more editors than buyers.
8. **English site and SEO: build the core now as a conversion layer.**
   - It is a credibility and checkout point for clients from channels 2–5 and 7.
   - Expect little organic traffic before months 6–12.
   - It cannot take marketplace clients off-platform (M14, M18, M43, M55).

**Defer or skip:**
- **Malt:** registered-business paperwork plus a call culture (M61, M63, M66).
- **PeoplePerHour:** an application graded on English, and crowded skills can be closed (M53). Possible later.
- **Freelancer.com:** fee charged at award, crowded bidding (M43, M47).
- **Twine:** paid plans needed to apply at volume (M74).
- **Whop Content Rewards:** pays by views on your own accounts, not for client work (M76). Filler only.
- **Germany:** service searches of at most 50 a month, and German copy would also need translation.

#### 7.2 English pages the section needs

Volumes are US/UK per month [P]. Search value and timing are estimates [E].

| # | Page | Why | Target queries (US / UK) | Realistic search value [E] | Priority |
|---|---|---|---|---|---|
| 1 | **Offer home** (/en/) | What you get, who it's for, "everything in writing", prices from, portfolio highlights, order button | video editing services 2,400 / 170; hire a video editor 1,900 / 210; video editor for hire 1,600 / 210; outsource video editing 140 / 20 | **Low**: 0–20 visits/mo in year one. Head terms are held by marketplaces, directories and services with about 200 referring domains | Must |
| 2 | **Pricing** | All 9 competitors publish prices; buyers who can't call need them | video editing pricing 390; price 320; rates 320; cost 320; how much does a video editor cost 210 (these overlap) | **Low to moderate**: 5–30/mo after 6–12 months. The SERP is rate guides for editors | Must |
| 3 | **Order / checkout** | Written brief, footage link, card payment, delivery by email. 8 of 9 competitors sell this way | none | none: conversion only | Must |
| 4 | **Portfolio** | Proof by segment: YouTube, podcast, short-form, wedding, real estate, ads | none | none: proof | Must |
| 5 | **How it works + FAQ** (one page is enough) | Async process, turnaround, revisions, file transfer, payment, refunds, time zone, "no calls needed" | long-tail questions | very low | Must |
| 6 | **Wedding editing for filmmakers** | B2B outsourcing; rising demand; tiny competitors | wedding video editor 480 / 70; wedding video editing services 260 / 10; wedding video editing outsourcing ≈ outsource wedding video editing 90 / 10; wedding video editing company 70 | **Best niche bet**: top 10 plausible in 3–9 months, 10–50 visits/mo | High |
| 7 | **YouTube editing** (long-form and Shorts) | Steady demand for 6 years; few productized pages on page 1 | youtube video editor for hire 390 / 50; youtube editor for hire 320 / 30; youtube video editing service(s) 140 / 10; hire youtube editor 90 | **Second-best**: top 10 plausible in 6–12 months, 10–40 visits/mo | High |
| 8 | **Podcast and video podcast editing** | A service page for buyers from other channels | podcast editing services 320 / 50 (falling); podcast video editor 110; video podcast editing 40; podcast editor for hire 40 / 10 | **Low**: under 10/mo in year one (KD 44, specialist SERP) | Medium |
| 9 | **Short-form and clips** (from podcasts, streams, long videos; streamers covered here) | Conversion page for creators and streamers | short form video editor 210 / 40 (mixed); short form video editing 90; tiktok video editing service 50 / 10 | **Very low**: under 10/mo | Medium |
| 10 | **Real estate video editing** | Growing B2B demand: photographers and agents | real estate video editing ≈ editor 390 / 10 (DIY SERP); …service(s) 90 / 10 | **Low to moderate**: 5–20/mo | Optional; build it only with real estate samples |
| 11 | **Two guides at most, from month 3:** "How to outsource wedding video editing" and "How to hire a YouTube video editor" | These SERPs reward guides (graphically.io, increditors, fundmates, weddingeditlab, nobacklog) | outsource wedding video editing 90; how to hire video editor 50; where to hire a video editor 20 | Low to moderate; can feed pages 6 and 7 | Later |

**Total realistic search value** [E]:
- If pages 1–11 all reach page 1 for their clusters (optimistic), expect about 50–200 organic visits a month from the US and UK after 6–12 months. Perhaps half of those would be buyers, giving roughly 1–4 inquiries a month.
- AI Overviews on every SERP will cut clicks further.
- For comparison, beCreatives makes about 421 visits a month while ranking #1 for "video editing services" [S].

#### 7.3 What to skip, and why

- **Location pages.** beCreatives has 420 and Tasty Edits 31 [P]. For a Bulgaria-based editor they are not credible, and they are thin-page risks [E].
- **German pages.** "video schneiden lassen" gets 50 a month, and the other service terms have no data. The German SERP is local freelancers, classifieds, Fiverr and tools [P].
- **Twitch/streamer page.** There is no hiring demand; "twitch editor" is a Twitch role [P]. Sell clips through Fiverr gaming, X, Discord and YTJobs "Live stream" listings (45) [P, M70].
- **Ads/UGC page.** There is no measurable search demand for editing services [P]. Sell instead through Fiverr's UGC and short-ads categories (25,000+ and 21,000+ gigs [P, M30]). Those counts measure seller supply, so they point to buyer demand but also to heavy competition [E]. Show the work in the portfolio.
- **Corporate page.** About 40 searches a month [P]. Cover it with a "for businesses" block on the offer page.
- **Targeting "freelance video editor"** (job-seeker SERP) and **"video editing subscription"/"unlimited"** (software intent, tiny baseline) [P].
- **Mass blogging and comparison pages.** Competitors' big traffic comes from off-topic posts that do not sell editing [S], and comparison pages need brand recognition first [E].

---

### 8. Credits spent (OpenSEO, project "Hera Editing")

| Step | Tool and scope | Credits |
|---|---|---:|
| Balance before | `whoami` | 15,781 |
| US core list (57 keywords) | get_keyword_metrics | 21 |
| UK core list (49) + DE list (26) | get_keyword_metrics ×2 | 37 |
| Ideas batch 1 (5 US seeds) | research_keywords | 219 |
| Ideas batch 2 (5 US seeds) | research_keywords | 211 |
| Ideas batch 3 (2 UK, 2 DE, 1 US seeds) | research_keywords | 226 |
| SERPs: 10 US + 6 mixed | get_serp_results ×2 | 80 |
| US expansion list (60) + 5 US SERPs | get_keyword_metrics + get_serp_results | 47 |
| Domain overviews (14 domains) | get_domain_overview | 196 |
| Ranked keywords: tastyedits, becreatives ×2, vidpros | get_ranked_keywords ×4 | 69 |
| Monthly trends (8 keywords) | get_keyword_metrics | 15 |
| Balance after | `whoami` | 14,660 |
| **Total spent** | | **1,121 of the 1,500 budget** |

No credits were bought. Every call passed an explicit market, because the project default is Bulgaria.

---

### 9. Limitations and open items

- **Volumes.** Google Ads volumes are bucketed 12-month averages and group close variants, so the ≈ rows share one number. Low-volume keywords (10/mo) are noisy. KD is DataForSEO's backlink-based score, not a guarantee.
- **SERPs.** These are three merged data-centre reads on desktop, not personalised. Sites seen in 1 of 3 reads are weak evidence. Live SERPs and DataForSEO's index disagree for beCreatives ("video editing services").
- **Competitor traffic.** These are model estimates [S]. They do not show conversions.
- **Reddit.** Rules could not be fetched (blocked). Snippets only [S].
- **Discord.** Evidence is thin.
- **X.** DM limits for accounts without Premium were not verified.
- **Unresolved fee details:**
  - Upwork's client fee: 5% or "up to 7.99%".
  - Malt's two fee articles disagree.
  - PeoplePerHour's "PPH Basic" price is not shown.
  - Fiverr's one-time ID fee amount is not stated.
  - Who pays YTJobs' escrow fee is not shown.
- **Competitors.**
  - VeedYou's checkout was down on 2026-11-18.
  - Some payment steps need JavaScript: Tasty Edits, Replayed.
  - Nothing was purchased.
- **Not researched:** Facebook groups for wedding filmmakers (a likely B2B channel [E]) and LinkedIn.

---

### 10. Sources

**OpenSEO and DataForSEO** (project "Hera Editing", queried 2026-11-18): get_keyword_metrics (US, UK, DE), research_keywords (15 seeds), get_serp_results (21 queries), get_domain_overview (14 domains), get_ranked_keywords (4 calls). App: https://app.openseo.so/p/05d71d0d-c641-41b1-b414-ef7012c91a92

**Competitor sites** (all accessed 2026-11-18)
- C1 https://becreatives.co/sitemap_index.xml: sitemap-pages (302 URLs), sitemap-locations (424), sitemap-video-gallery (141)
- C2 https://becreatives.co/pricing/ (and its Stripe link)
- C3 https://becreatives.co/
- C4 https://becreatives.co/faq/
- C5 https://becreatives.co/blog/
- C6 https://becreatives.co/reelquick-plan/
- C7 https://www.trustpilot.com/review/becreatives.co
- C8 https://www.tastyedits.com/sitemap_index.xml
- C9 https://www.tastyedits.com/
- C10 https://www.tastyedits.com/pricing/
- C11 https://www.tastyedits.com/testimonials/
- C12 https://voma.tastyedits.com/order_form/
- C13 https://www.trustpilot.com/review/tastyedits.com
- C14 https://vidpros.com/sitemaps.xml
- C15 https://vidpros.com/
- C16 https://vidpros.com/pricing/
- C17 https://app.vidpros.com/order/trial
- C18 https://vidpros.com/booking/
- C19 https://www.trustpilot.com/review/vidpros.com
- C20 https://vidchops.com/sitemaps.xml
- C21 https://vidchops.com/
- C22 https://vidchops.com/pricing-details/
- C23 https://vidchops.samcart.com/products/vidchops-weekly
- C24 https://vidchops.com/our-portfolio/ and /vidchops-reviews/
- C25 https://www.trustpilot.com/review/vidchops.com
- C26 https://veedyou.com/wp-sitemap.xml
- C27 https://www.veedyou.com/
- C28 https://www.veedyou.com/pricing/
- C29 https://clients.veedyou.com/order/81XO1O
- C30 https://www.veedyou.com/start/, /call/, /purchase/
- C31 https://replayed.co/sitemap.xml and /blogs-sitemap.xml
- C32 https://www.replayed.co/
- C33 https://www.replayed.co/services/hire-a-video-editor
- C34 https://www.replayed.co/pricing/short-format-video, /pricing/thumbnail, /pricing/video
- C35 https://weeditpodcasts.com/page-sitemap.xml and /post-sitemap.xml
- C36 https://weeditpodcasts.com/
- C37 https://weeditpodcasts.com/pricing/
- C38 https://weeditpodcasts.com/trial/
- C39 https://weeditpodcasts.com/services/video-production/
- C40 https://my.weeditpodcasts.com/order/DR71PR
- C41 https://www.nextdaypodcast.com/sitemap.xml
- C42 https://www.nextdaypodcast.com/
- C43 https://www.nextdaypodcast.com/pricing and /video-editing
- C44 https://clients.nextdaypodcast.com/order/video
- C45 https://www.nextdaypodcast.com/blog
- C46 https://www.wedcuts.com/
- C47 https://www.wedcuts.com/wedding-video-editing-price/
- C48 https://www.wedcuts.com/sitemap.xml (and page and post sitemaps)
- C49 https://studios.wedcuts.com/order/KVEQ3V
- C50 https://wedditor.com/, /sitemap.xml, /faq
- C51 https://www.photoup.net/sitemap_index.xml, /services, /pricing
- C52 https://www.boxbrownie.com/sitemap.xml, /pricing
- C53 https://fotober.com/ (sitemap, /real-estate-video-editing, /start-free-trial)
- C54 https://kokistarcom.carrd.co/
- C55 [S] Web search results, e.g. https://fiverr.com/youtubeskool/edit-twitch-and-kick-streams-into-youtube-highlights and https://www.ssemble.com/tools/twitch-clipping-tool

**Marketplaces and communities** (all accessed 2026-11-18; the page's own date is given where shown)
- M1 https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee
- M2 https://www.upwork.com/pricing/freelancer
- M3 https://www.upwork.com/pricing/client
- M4 https://support.upwork.com/hc/en-us/articles/4660220468499-What-is-the-Client-Marketplace-Fee
- M5 https://support.upwork.com/hc/en-us/articles/211062898-About-Connects-costs-uses-balances-and-expiration
- M6 https://support.upwork.com/hc/en-us/articles/57221525626643-Connects-charges-returns-refunds-and-transaction-history
- M7 https://support.upwork.com/hc/en-us/articles/211060918-How-to-get-paid-on-Upwork
- M8 https://support.upwork.com/hc/en-us/articles/360001176427-How-to-verify-your-identity-as-a-freelancer
- M9 https://support.upwork.com/hc/en-us/articles/360010687433-How-do-I-allow-Upwork-to-access-my-camera-so-I-can-verify-my-identity
- M10 https://support.upwork.com/hc/en-us/articles/360010609234-How-to-get-the-identity-verification-badge
- M11 https://support.upwork.com/hc/en-us/articles/41104211856915-How-to-take-a-recorded-video-interview-on-Upwork
- M12 https://support.upwork.com/hc/en-us/articles/211062998-How-to-submit-a-proposal-on-Upwork
- M13 https://support.upwork.com/hc/en-us/articles/211063228-How-to-become-a-Rising-Talent-on-Upwork
- M14 https://www.upwork.com/legal (User Agreement v8.2, effective 20 Jul 2026, §7)
- M15 https://support.upwork.com/hc/en-us/articles/360043723533-What-is-the-Upwork-Conversion-Fee
- M16 https://www.upwork.com/hire/video-editors/
- M17 https://www.fiverr.com/legal-portal/legal-terms/payment-terms-of-service (last update October 2026)
- M18 https://www.fiverr.com/legal-portal/legal-terms/terms-of-service (last update January 2026)
- M19 https://help.fiverr.com/hc/en-us/articles/360050216133-Paying-for-orders-extras-or-custom-offers
- M20 https://help.fiverr.com/hc/en-us/articles/23429542870161-Fiverr-s-search-and-recommendation-system
- M21 https://help.fiverr.com/hc/en-us/articles/6348992414097-Verifying-your-identity-as-a-new-freelancer
- M22 https://help.fiverr.com/hc/en-us/articles/13127850435345-Verify-your-identity
- M23 https://help.fiverr.com/hc/en-us/articles/27291415082257-Seller-Plus-Kickstart-Start-your-freelance-journey-strong
- M24 https://help.fiverr.com/hc/en-us/articles/360010560118-Understanding-Fiverr-s-freelancer-levels
- M25 https://help.fiverr.com/hc/en-us/articles/4415601609361-Post-a-project-brief-get-tailored-offers-for-your-project
- M26 https://help.fiverr.com/hc/en-us/articles/48756531483537-Finding-talent-with-Mira
- M27 https://help.fiverr.com/hc/en-us/articles/37552121049873-Video-calls-Zoom-calls
- M28 https://help.fiverr.com/hc/en-us/articles/360010490438-Promoting-your-Gigs-outside-of-Fiverr
- M29 https://help.fiverr.com/hc/en-us/articles/360010558598-Creating-editing-your-freelancer-profile
- M30 https://www.fiverr.com/categories/video-animation/video-editing (plus its UGC, short-ads, social, real-estate, corporate and repurposing subcategory pages) and https://www.fiverr.com/categories/music-audio/podcast-editing (gig counts measured)
- M31 https://help.fiverr.com/hc/en-us/articles/34069565843985-How-Fiverr-works-for-freelancers
- M32 https://contra.com/pricing
- M33 https://help.contra.com/en/articles/9322934-fees-overview (6 Aug 2026)
- M34 https://help.contra.com/en/articles/9322981-what-is-contra-pro (5 Oct 2026)
- M35 https://help.contra.com/en/articles/11853356-how-to-get-your-first-client-on-contra (24 Feb 2026)
- M36 https://help.contra.com/en/articles/11899394-how-contra-s-discovery-score-works (17 Oct 2025)
- M37 https://help.contra.com/en/articles/9322973-applying-to-jobs-on-contra (24 Feb 2026)
- M38 https://help.contra.com/en/articles/9322955-how-to-verify-your-identity-on-contra (27 Mar 2026)
- M39 https://help.contra.com/en/articles/11908737-direct-message-dm-faq-s (16 Mar 2026)
- M40 https://help.contra.com/en/articles/9322679-contra-s-policies-on-confidentiality-breaches-plagiarism-and-spam (16 Mar 2026)
- M41 https://contra.com/policies/terms (updated 9 Apr 2026)
- M42 https://contra.com/hire
- M43 https://www.freelancer.com/feesandcharges
- M44 https://www.freelancer.com/membership
- M45 https://www.freelancer.com/about/terms (last modified 5 Jun 2025)
- M46 https://www.freelancer.com/support/profile/what-is-the-know-your-customer-program-1793
- M47 https://www.freelancer.com/jobs/video-editing/ (measured)
- M48 [S] websiteplanet.com and sidehusl.com reviews of Freelancer.com (search snippets only)
- M49 https://support.peopleperhour.com/hc/en-us/articles/205218337-Freelancer-commission-fees (8 Nov 2026)
- M50 https://www.peopleperhour.com/static/terms (28 Oct 2026)
- M51 https://support.peopleperhour.com/hc/en-us/articles/205217547-How-many-proposals-can-I-send-in-a-month (24 Oct 2026)
- M52 https://support.peopleperhour.com/hc/en-us/articles/4408655983633-Freelancer-Application-Process (16 Nov 2026)
- M53 https://support.peopleperhour.com/hc/en-us/articles/4408541848977-Why-was-my-application-rejected (13 Oct 2026)
- M54 https://support.peopleperhour.com/hc/en-us/articles/17825988320785-Can-I-take-communication-off-the-site (1 Jul 2026)
- M55 https://support.peopleperhour.com/hc/en-us/articles/205217317-Rules-of-Engagement (9 Jun 2026)
- M56 https://support.peopleperhour.com/hc/en-us/articles/360001764608-Verify-your-Account (18 Nov 2026)
- M57 https://support.peopleperhour.com/hc/en-us/articles/205217567-Submitting-Proposals (18 Oct 2026)
- M58 https://www.peopleperhour.com/freelance-jobs/video-photography/video-editing (measured)
- M59 https://help.malt.com/hc/en-150/articles/29567589850002-What-are-Malt-service-fees-and-offers (4 Nov 2026)
- M60 https://help.malt.com/hc/en-150/articles/29539691425938-How-do-the-Malt-service-fees-work-for-freelancers (12 Nov 2026)
- M61 https://help.malt.com/hc/en-150/articles/29511599491090-How-do-I-register-on-Malt-from-abroad (2 Nov 2026)
- M62 https://help.malt.com/hc/en-150/articles/40036337021330-Can-I-use-Malt-without-a-registered-business (16 Nov 2026)
- M63 https://help.malt.com/hc/en-150/articles/40019134594706--Which-documents-do-I-provide-in-Bulgaria (29 Oct 2026)
- M64 https://help.malt.com/hc/en-150/articles/30748346951826-How-do-I-get-started-as-a-freelancer-on-Malt (16 Nov 2026)
- M65 https://help.malt.com/hc/en-150/articles/29532973052178-How-do-I-make-my-profile-visible-in-search-results (18 Nov 2026)
- M66 https://help.malt.com/hc/en-150/articles/29534878703506-How-do-opportunities-work-for-freelancers (18 Nov 2026)
- M67 https://help.malt.com/hc/en-150/articles/29534106868114-How-do-I-chat-with-a-client-before-starting-a-project (7 Nov 2026)
- M68 https://help.malt.com/hc/en-150/articles/29536437930002-How-do-I-spot-and-report-a-scam-on-Malt (21 Oct 2026)
- M69 Not readable (bot check): https://www.malt.com/en-gb/legal and related legal pages
- M70 https://app.ytjobs.co/api/jobs?page=1 to page=40 (public jobs data, 594 listings, measured)
- M71 https://app.ytjobs.co/api/payment/p2p/payment-fees?amount=100 (measured)
- M72 https://ytjobs.co/static/js/main.473f7da8.js (site code text; the pages need JavaScript)
- M73 https://www.twine.net/pricing
- M74 https://www.twine.net/pricing/creative
- M75 https://www.twine.net/platform-terms
- M76 https://docs.whop.com/memberships-and-access/third-party-apps/content-rewards.md
- M77 https://docs.whop.com/fees.md
- M78 https://help.behance.net/hc/en-us/articles/23707936129947-Behance-Pro-FAQ (9 Oct 2026)
- M79 https://help.behance.net/hc/en-us/articles/13356478351387-FAQ-What-are-the-fees (25 Mar 2024)
- M80 Not readable (403 or JavaScript-only): https://www.behance.net/joblist, https://www.mandy.com/pricing/, https://www.productionhub.com/membership
- M81 Reddit blocked all fetches: old.reddit.com rules pages redirect to login; rules.json and api.reddit.com return 403
- M82 [S] Mirror snippets for r/NewTubers (lr.eu.psf.lt, pol1.lr.ggtyler.dev)
- M83 [S] Mirror snippets for r/podcasting; https://www.thepodcasthost.com/promotion/reddit-for-podcasters/
- M84 [S] Mirror snippets for r/VideoEditing, r/editors, r/hireaneditor, r/YouTubeEditorsForHire, r/FindVideoEditors, r/VideoEditingRequests
- M85 [S] Mirror snippets for r/forhire (2016 rules snapshot and a later notice)
- M86 https://disboard.org/servers/tag/video-editing (measured)
- M87 https://discord.com/servers/edit-big-1130451542177218615 and https://discord.com/servers/editing-hunt-1301115754879520811 (measured)
- M88 https://help.x.com/en/rules-and-policies/authenticity (April 2025 version)
- M89 https://help.x.com/en/rules-and-policies/x-rules
- M90 [S] https://www.fueler.io/blog/how-tharun-speaks-teaches-video-editors-to-find-their-first-clients, https://pixflow.net/blog/find-video-editing-clients, https://perspective-letters.beehiiv.com/p/the-formula-for-landing-editing-clients

---

## Part 4. VAT, payments, contracts and outreach rules

Research notes for Hera Editing. **This is research, not legal or tax advice.** Prepared 2026-11-18.

- **Date read.** Every source was read on 2026-11-18. Each point cites a source as [S#], and the full URLs are in the "Sources" section at the end.
- **Bulgarian statutes.** These are the lex.bg consolidated texts as served on 2026-11-18, decoded from windows-1251. The VAT Act (ЗДДС) is consolidated up to ДВ бр. 69 of 31 July 2026.
- **Quotations.** Bulgarian law is quoted in Bulgarian, followed by my English translation.
- **"My reading"** marks my interpretation rather than settled law or an official position.
- **Pages I could not fetch.** These were the ICO, X, Instagram, PayPal, ACMA, ATO and CRA pages; they returned 403 or timed out. Where that happened, I used the underlying statute, or I say that a figure comes only from a search-engine summary and needs checking.

**Assumptions.**
- Hera is an ЕООД, established only in Bulgaria, and not VAT-registered under art. 96 or art. 100 ЗДДС.
- The editing is done by a person sitting in Bulgaria.
- Deliverables are files sent online.

Where an ЕТ (sole trader) changes the answer, I say so.

---

### Answers in brief

| # | Question | Short answer | Main sources |
|---|---|---|---|
| 1 | VAT place of supply: EU business client (DE, NL) | The client's country. No Bulgarian VAT; the client self-accounts (reverse charge). Check the client's VAT number in VIES and keep the proof. | ЗДДС art. 21(2) [S1]; Dir. 2006/112 Art. 44, 196 [S10]; Reg. 282/2011 Art. 18 [S11] |
| 2 | Non-EU business client (US, UK, CA, AU) | The client's country, so outside the EU and outside the scope of Bulgarian VAT. Keep proof of business status. The UK is a third country. | ЗДДС art. 21(2), 168а(1) [S1]; Reg. 282/2011 Art. 18(3) [S11] |
| 3 | Consumers (couples), EU and non-EU | Bulgaria, the supplier's place. Bulgarian VAT (20%) only if Hera is VAT-registered. These sales **count** toward the €51,130 threshold. My reading: video editing is not in the art. 21(5) list that moves non-EU consumer services abroad. | ЗДДС art. 21(1), 21(5) [S1] |
| 4 | Is human editing an "electronically supplied service"? OSS? | **No.** Art. 7 covers services "essentially automated and involving minimal human intervention". Emailing files does not by itself make a service electronic. So OSS does not apply to editing. It **would** apply to automated digital products sold to EU consumers above €10,000 a year (templates, LUT packs, fully automatic AI edits). | Reg. 282/2011 Art. 7, Annex I [S11]; ЗДДС §1 т. 14, art. 20б [S1] |
| 5 | Does art. 97а(2) require registration before the first EU B2B sale, even below €51,130? | **Yes**, regardless of turnover. File no later than 7 days before the VAT on the supply becomes chargeable, which is the advance payment or the completion date, whichever comes first. The one exception (from 2026) is registration for the EU SME scheme for that member state. | ЗДДС art. 97а(2), (4), (6) [S1]; НАП [S2] |
| 6 | Do non-EU or reverse-charge supplies count toward €51,130? | **No.** Only supplies whose place of supply is Bulgaria count. These are domestic filming and B2C editing (consumers anywhere), including advance payments. | ЗДДС art. 96(1), 168в(1), (8) [S1]; НАП [S2] |
| 7 | What an art. 97а registration brings | A BG VAT number, a monthly VAT return and VIES declaration by the 14th, no VAT on Hera's invoices, and **no input-VAT credit**. Reverse-charge VAT on services bought from abroad (Upwork and Fiverr fees, software) becomes a real 20% cost. | ЗДДС art. 125, 113(9), 70(4), 97а(1) [S1] |
| 8 | Invoicing in USD or GBP | Allowed, but the tax base (and any VAT) must also be stated in EUR at the last ECB rate when the tax becomes chargeable. | ЗДДС art. 114(5), 26(6) [S1] |
| 9 | Invoice wording and deadlines | **EU B2B:** "обратно начисляване / reverse charge", the legal basis, and the client's VAT number. **Non-EU:** the basis for not charging VAT (art. 21(2)). **Deadline:** within 5 days of completion or of an advance payment; VAT return and VIES by the 14th of the next month. | ЗДДС art. 113(4), 114(1)(12), 114(4), 125(5) [S1]; Dir. Art. 226(11a) [S10] |
| 10 | Own site with card payments | My reading: the site is an "e-shop" and must be registered with НАП before sales start. Card payments need a fiscal receipt or the e-shop alternative "sale document"; bank transfers are exempt. | ЗДДС art. 118, §1 т. 87 [S1]; Наредба Н-18 art. 3(1), 3(17), 52м [S3] |
| 11 | Company tax | ЕООД: 10% corporate tax, plus 5% tax on dividends (about 14.5% in total on distributed profit), with limited liability. ЕТ: **15%** on business profit (ЗДДФЛ art. 48(2); corrected by the lead, see the checks table), no dividend layer, unlimited personal liability. | ЗКПО art. 20 [S4]; ЗДДФЛ art. 26, 46(3), 48 [S5]; ТЗ art. 113 [S6] |
| 12 | US withholding and the treaty | Services performed in Bulgaria are foreign-source income for the US, so nothing is withheld. Under the treaty, business profits are taxable only in Bulgaria unless there is a US permanent establishment. Royalties, if any, are capped at 5%. | IRS Pub 515 [S24]; US–BG treaty Art. 7, 12 [S25] |
| 13 | US forms | ЕООД: W-8BEN-E (a corporation, usually "Active NFFE"). ЕТ or individual: W-8BEN. | IRS instructions [S22][S23] |
| 14 | Stripe | Available in Bulgaria. Fees: EEA cards 1.5% + €0.25; UK cards 2.5% + €0.25; international cards 3.15% + €0.25, plus 2% if currency is converted; €20 per dispute. EUR payouts. Payment Links and Checkout are included and can require ToS acceptance. | [S44]–[S50] |
| 15 | PayPal, Wise, Payoneer | **PayPal BG** (unverified, page blocked): 3.4% + €0.35, plus 1.29% for UK payers and 1.99% for other non-EEA payers. **Wise Business BG:** €60 set-up; local USD/GBP receipts free; USD wire/Swift receipt 6.11 USD; conversion from 0.2%. **Payoneer:** 1% to receive in a non-local currency; withdrawals with conversion 1.2–4%; $29.95 a year if under $6,000 received. | [S51]–[S53] |
| 16 | Upwork | Fee 0–15% per contract; Connects $0.15 each. Withdrawals: Direct to Local Bank $0.99 (Bulgaria minimum $5), USD wire $50. Off-platform lock lasts **24 months**. Conversion fee is 13.5% of 12 months' estimated earnings, minimum $1,000, maximum $50,000. | [S54]–[S60] |
| 17 | Fiverr | The seller keeps 80%. Clearance takes 14 days (7 for Top Rated). Withdrawal costs: PayPal $0, Payoneer bank transfer $3. No payments or contact details off-platform, with **no time limit and no opt-out fee**; buyers face $10,000 liquidated damages. | [S61]–[S62] |
| 18 | Copyright in the edit (ЗАПСП) | Only a natural person can be the author. A commissioned work belongs to its author unless the contract says otherwise, and the client may use it for the purpose ordered. Grant rights in writing and state exclusivity, term and territory; otherwise the defaults are non-exclusive, 3 years, client's country. Attribution and name rights cannot be given up. | ЗАПСП art. 5, 15, 16, 36, 42 [S7] |
| 19 | US clients: "work made for hire" | Possible for a work commissioned "as a part of a motion picture or other audiovisual work" if both parties sign a written instrument. My reading: use WMFH plus a fallback assignment, an exclusive licence and a moral-rights waiver "to the extent permitted". | USCO Circular 30 [S26]; Upwork model terms [S54] |
| 20 | GDPR | Editing client footage makes Hera a **processor**, and GDPR applies to it as an EU processor even for US clients. An Art. 28 DPA in writing is needed. Returning footage to a client in a country without an adequacy decision needs SCC Module 4. Adequacy exists for the UK (renewed Dec 2025), Canada (commercial organisations) and the US (DPF members only); Australia has none. | GDPR Art. 3(1), 28, 44 [S12]; SCC [S13]; adequacy list [S14] |
| 21 | Consumers (EU) | 14 days to withdraw from the contract date. The right is lost after full performance only with the consumer's prior express consent and acknowledgement. A consumer who withdraws mid-way after asking for an early start pays a proportionate amount. An online "withdraw from contract here" function is required for online contracts from 19 June 2026 (in Bulgaria, ЗЗП art. 52а from 24 Sept 2026). | CRD [S15][S16]; ЗЗП art. 50, 52а, 55, 57 [S8] |
| 22 | Cold email | **US:** opt-out regime, up to $53,088 per email. **UK:** companies and LLPs allowed with ID and opt-out; sole traders and partnerships need consent; up to £17.5m or 4%. **Canada:** consent needed, which can be implied from a conspicuously published address plus relevance; up to C$10m. **Australia:** consent needed, inferred from a conspicuously published address plus relevance. **EU:** depends on the country; Germany needs consent even B2B, and the Netherlands allows B2B only to addresses published for that purpose. | [S30]–[S39] |
| 23 | DMs on X, Instagram, Discord | Canadian and Australian law expressly cover instant-messaging accounts. All three platforms ban bulk or unsolicited commercial DMs. Treat DMs like email: one-to-one, relevant, identified, with an opt-out. | [S36][S37][S40]–[S42] |
| 24 | AI-assisted editing | Allowed with conditions. Upwork bans genAI use the client has restricted, and by default licenses Work Product for AI training unless you opt out. Fiverr requires honouring "no AI" requests and bans deepfakes. USCO: AI-generated material needs sufficient human expressive input to be protected. YouTube requires disclosure of realistic synthetic content. The EU AI Act requires deepfake disclosure from 2 Aug 2026. | [S27]–[S29][S43][S54][S63][S20][S21] |

---

### 1. VAT under the ЗДДС

#### 1.1 What changed on 1 January 2026

Bulgaria transposed the EU small-enterprise scheme (ДВ бр. 115/2025, in force 1 January 2026) [S1].

**The threshold is now domestic turnover in euro.**

> Art. 96(1): "…е длъжно да се регистрира по този закон, когато годишният му оборот в страната, определен по реда на чл. 168в, надвиши националния праг от 51 130 евро."
>
> My translation: …must register under this Act when its annual turnover in the country, determined under art. 168в, exceeds the national threshold of EUR 51,130. [S1]

**Not being registered means applying the domestic SME scheme.**

> Art. 168д(4): "Правото за прилагане на режима за малки предприятия в страната по ал. 1 се счита за упражнено, когато данъчно задълженото лице не е регистрирано по чл. 96, ал. 1 или чл. 100, ал. 1."
>
> My translation: the right to apply the domestic SME scheme is deemed exercised when the person is not registered under art. 96(1) or 100(1). [S1]

**Filing time.** File within 7 days of exceeding the threshold (art. 96(6)(1)) [S1]. НАП: "За дата на регистрация се счита датата, следваща датата на надвишаване на националния праг" (the registration date is the day after the threshold is exceeded) [S2].

**Two SME schemes now exist.** One is domestic. The other is the EU scheme, which uses a €100,000 Union threshold and an "-EX" number (art. 168б, 168е, 168ж) [S1].

#### 1.2 Place of supply for editing services

The key rules, quoted:

- **Art. 21(1), consumers:** "Мястото на изпълнение при доставка на услуга, когато получател е данъчно незадължено лице, е мястото, където доставчикът е установил своята независима икономическа дейност." (Where the recipient is a non-taxable person, the place of supply is where the supplier is established.) [S1]
- **Art. 21(2), businesses:** "Мястото на изпълнение при доставка на услуга, когато получателят е данъчно задължено лице, е мястото, където получателят е установил независимата си икономическа дейност." (Where the recipient is a taxable person, the place of supply is where the recipient is established.) [S1]. The EU equivalents are Art. 44 and 45 of the VAT Directive [S10].
- **Art. 21(5), non-EU consumers.** Services move outside the EU only for listed services supplied to a non-taxable person established outside the EU. Examples from the list:
  - "(а) предоставяне или прехвърляне на права върху … авторско право…"
  - "(б) рекламни услуги"
  - "(в) услуги, извършвани от консултанти, инженери, … и други подобни услуги"
  - "(г) обработка на данни или предоставяне на информация" [S1]
- **The UK is a third country:** "Обединеното кралство Великобритания и Северна Ирландия е трета страна от 1 януари 2021 г." (art. 168а(1)) [S1].
- **Reverse charge in the customer's state:** "VAT shall be payable by any taxable person … to whom the services referred to in Article 44 are supplied, if the services are supplied by a taxable person not established within the territory of the Member State." (Directive Art. 196) [S10].

| Client | Rule | Taxed where | Bulgarian VAT on Hera's invoice | Counts toward €51,130 |
|---|---|---|---|---|
| EU business with a valid VAT number (DE, NL) | art. 21(2) | Client's state; the client reverse-charges | No | No |
| Non-EU business (US, UK, CA, AU) | art. 21(2) | Outside the EU | No (out of scope) | No |
| EU consumer (e.g. a German couple) | art. 21(1) | Bulgaria | 20%, only if Hera is VAT-registered | **Yes** |
| Non-EU consumer (e.g. a US couple) | art. 21(1); art. 21(5) does not apply to editing (my reading) | Bulgaria | 20%, only if registered | **Yes** |
| EU "business" with no VAT number (small creator) | Reg. 282/2011 Art. 18(2) lets Hera treat it as a consumer | Bulgaria | Only if registered | Yes (my reading) |

**My reading on non-EU consumers.** A wedding or creator edit is an editing and production service. It is not mainly a "transfer of copyright", not "consulting … and other similar services", and not "data processing". So the default rule (Bulgaria) applies. This is not certain: an accountant should confirm it (question A4). The reason it matters is that these sales count toward the threshold.

#### 1.3 VIES checks and proof of business status

Reg. 282/2011 Art. 18 [S11]:

- **EU customer with a VAT number.** "Unless he has information to the contrary, the supplier may regard a customer established within the Community as a taxable person: (a) where the customer has communicated his individual VAT identification number to him, and the supplier obtains confirmation of the validity of that identification number and of the associated name and address…"
- **EU customer without one.** "…the supplier may regard a customer established within the Community as a non-taxable person when he can demonstrate that the customer has not communicated his individual VAT identification number to him." (Art. 18(2))
- **Non-EU customer.** The supplier may treat the customer as a taxable person "if the supplier has the VAT number, or a similar number attributed to the customer by the country of establishment and used to identify businesses or any other proof which demonstrates that the customer is a taxable person and if the supplier carries out a reasonable level of verification…" (Art. 18(3)(b))
- **Business use.** "…the supplier may consider that the services are for the customer's business use if, for that transaction, the customer has communicated his individual VAT identification number." (Art. 19)

**Practice (my reading).**
- **EU business clients.** Collect the VAT number at checkout or in the brief. Check it in VIES before invoicing and keep the result with the order.
- **Non-EU business clients.** Keep a company number or tax number (EIN, Companies House number, ABN or business number), the legal name and the business address.
- **No VAT number.** If an EU "business" gives none, treat it as a consumer.

#### 1.4 Electronically supplied services and OSS

> Reg. 282/2011 Art. 7(1): "'Electronically supplied services' … shall include services which are delivered over the Internet or an electronic network and the nature of which renders their supply essentially automated and involving minimal human intervention, and impossible to ensure in the absence of information technology." [S11]

Art. 7(3)(i) excludes, by analogy, "services of professionals such as lawyers and financial consultants, who advise clients by e-mail" [S11]. The Bulgarian definition adds this sentence:

> ЗДДС §1 т. 14: "Когато доставчикът на услуга и негов клиент кореспондират по електронна поща, това само по себе си не означава, че извършваната услуга е извършвана по електронен път."
>
> My translation: when the supplier and the client correspond by email, that alone does not mean the service is electronically supplied. [S1]

**My reading: human video editing is not an electronically supplied service**, so the special place-of-supply rule for consumers (art. 21(6)) and the OSS do not apply to it.

**Watch two cases.**

1. **Selling digitised products.** Templates, LUTs, presets and stock clips are listed as electronically supplied services: "the supply of digitised products generally" (Art. 7(2)(a)), and Annex I(3)(b) "accessing or downloading photographic or pictorial images" [S11].
2. **"Instant" AI edits.** A service that becomes essentially automated, with minimal human intervention, could tip into this category (my reading).

For sales of such products to EU consumers, the place of supply stays in Bulgaria only while cross-border sales of this kind stay at or below **€10,000** a year (art. 20б(1)(3)). After that, the consumer's state applies and the OSS becomes relevant [S1].

#### 1.5 Registration before EU B2B sales: art. 97а

> Art. 97а(2): "На регистрация по закона подлежи всяко данъчно задължено лице …, установено на територията на страната, което предоставя услуги по чл. 21, ал. 2 с място на изпълнение на територията на друга държава членка, за които се дължи данък по доставката от получателя - данъчно задължено лице или данъчно незадължено юридическо лице, регистрирано за целите на ДДС в тази държава членка."
>
> My translation: a taxable person established in Bulgaria that supplies art. 21(2) services with a place of supply in another member state, where the tax is due from the recipient, is subject to registration. [S1]

> Art. 97а(4): "…не по-късно от 7 дни преди датата, на която данъкът за доставката става изискуем (авансово плащане или данъчно събитие)…"
>
> My translation: …no later than 7 days before the date on which the tax on the supply becomes chargeable (advance payment or tax event)… [S1]

> Art. 97а(6), new from 2026: paragraph 2 does not apply when the person "има регистрация в страната за прилагане в тази друга държава членка на режим за малки предприятия в Европейския съюз" (has a Bulgarian registration for applying the EU SME scheme in that other member state). [S1]

НАП restates this on its registration page. It also confirms that the art. 97а(2) obligation does not arise where an EU SME scheme registration exists for that state [S2]. НАП completes art. 97а registrations within 3 days of the application (art. 101(8)) [S1][S2].

**Answer: yes.** The obligation is independent of the €51,130 threshold. It is triggered by the first service to an EU business that reverse-charges.

**Why the timing matters.** Packages are paid upfront, so the advance payment is the trigger. File at least 7 days before the first EU business client pays.

**What an art. 97а registration means in practice.**

- **Returns.** A monthly VAT return (справка-декларация) and a VIES declaration listing the EU B2B services, both "до 14-о число включително на месеца, следващ данъчния период" (by the 14th of the following month) (art. 125(1), (2), (5); monthly tax period, art. 87(2)) [S1].
- **No VAT on invoices.** "Данъчно задължените лица, които не са регистрирани по този закон или са регистрирани на основание чл. 97а, ал. 1 и 2, … нямат право да посочват данъка в издаваните от тях фактури…" (persons not registered, or registered only under art. 97а, may not show VAT on their invoices) (art. 113(9)) [S1].
- **No input-VAT credit.** "Няма право на данъчен кредит лице, регистрирано на основание чл. 97а…" (art. 70(4)) [S1].
- **Services bought from abroad.** Art. 97а(1) separately requires registration from anyone who *receives* reverse-charge services with a Bulgarian place of supply [S1]. Upwork's and Fiverr's seller fees and foreign software subscriptions are such services when bought by a business (my reading).
- **The resulting cost.** For an art. 97а-only registrant, the reverse-charged 20% VAT on those fees is payable and not deductible. A 10% Upwork fee therefore costs about 12% (my reading).
- **Late registration.** Penalty of BGN 500–5,000; the consolidated text still prints leva, which my reading converts at the fixed euro rate (art. 178(1)). Separately, НАП can register the person itself and charge VAT back to the date the person should have been registered (art. 102(1)–(3)) [S1].

**Options for the accountant (question A1).**

| Option | What it means | Upside | Downside |
|---|---|---|---|
| A. Art. 97а only | BG VAT number for EU B2B services and for reverse-charged purchases | No VAT added to prices for Bulgarian or consumer clients | Monthly returns and VIES; 20% VAT on foreign purchased services is a cost |
| B. Voluntary full registration (art. 100(1)) | 20% VAT on all Bulgarian-place supplies (domestic filming, all consumers) | Full input-VAT credit, including reverse-charged fees | Consumers and non-registered Bulgarian clients pay 20% more |
| C. EU SME scheme for chosen states (art. 168е–168ж, 97а(6)) | Exemption applied in, say, DE or NL under those states' thresholds | Can remove the art. 97а(2) obligation for those states | Complex; per-state thresholds and conditions; not tested here |

#### 1.6 Threshold: what counts

> Art. 168в(1): "Годишният оборот в страната е общата сума от данъчните основи на извършените през календарната година с място на изпълнение на територията на страната от данъчно задълженото лице: 1. доставки, които са облагаеми по общия ред…; 2. доставки, които са освободени с право на приспадане…; 3. … финансови услуги…; 4. … застрахователни услуги…; 5. освободени доставки на недвижими имоти."
>
> My translation: annual domestic turnover is the total tax base of supplies made in the calendar year **with a place of supply in Bulgaria**. [S1]

Art. 168в(8) adds advance payments received [S1]. НАП's page repeats the same definition [S2].

**Answer.**
- **Do not count:** services to EU businesses (place of supply in their state) and to non-EU businesses (outside the EU).
- **Do count:** Bulgarian filming, Bulgarian business clients, and editing for consumers, both EU and non-EU.

Track the running total during the year. The duty to file arises within 7 days of crossing the threshold [S1][S2].

#### 1.7 Invoicing

- **When it applies.** Every taxable person must invoice, whether VAT-registered or not (art. 113(1)) [S1]. For consumers an invoice is optional (art. 113(3)(1)) [S1], but see 1.8 on fiscal receipts.
- **Deadline.** "Фактурата се издава задължително не по-късно от 5 дни от датата на възникване на данъчното събитие за доставката, а в случаите на авансово плащане - не по-късно от 5 дни от датата на получаване на плащането." (within 5 days of the tax event, or within 5 days of receiving an advance payment) (art. 113(4)) [S1]. The Directive's looser "fifteenth day of the month following" for reverse-charge services (Art. 222) [S10] does not displace Bulgaria's 5 days, in my reading.
- **Required content (art. 114(1)) [S1].**
  - The document name and a 10-digit sequential number.
  - The issue date.
  - The supplier's name and address, and its VAT number (or EIK if not registered).
  - The client's name and address, and the client's VAT number if registered in another member state.
  - A description of the service.
  - The tax-event or payment date.
  - The unit price and tax base.
  - "основанието за неначисляване на данък" (the legal basis for not charging VAT) (item 12).
- **Currency.** "Сумите по фактурата могат да бъдат посочени в която и да е валута, при условие че данъчната основа и размерът на данъка се посочат в евро при спазване изискванията на чл. 26, ал. 6." (amounts may be in any currency, provided the tax base and the VAT amount are stated in euro) (art. 114(5)) [S1]. Art. 26(6) sets the rate: "по последния обменен курс, публикуван от Европейската централна банка към момента, в който данъкът става изискуем" (the last ECB rate published at the moment the tax becomes chargeable) [S1]. For prepaid packages, that is the day the payment arrives (art. 25(7)) [S1].
- **Reverse-charge wording.** "Когато данъкът е изискуем от получателя, във фактурата не се посочват размерът на данъка и данъчната ставка. В този случай във фактурата се вписва „обратно начисляване", както и основанието за това." (art. 114(4)) [S1]. The Directive requires "where the customer is liable for the payment of the VAT, the mention 'Reverse charge'" (Art. 226(11a)) [S10].
- **Small-enterprise invoices.** When a person applies an SME scheme, the invoice may omit item 12 (rate or basis) and items 14–15 (art. 114(7)(1)) [S1].
- **Refunds.** Refunds and changes in price need a credit note within 5 days (art. 115(1)–(2)) [S1].

**Suggested bilingual lines (my reading; an accountant should confirm the exact wording):**

- **EU business:** "Обратно начисляване / Reverse charge – чл. 21, ал. 2 ЗДДС; Art. 44 and 196 of Directive 2006/112/EC. Customer VAT No: DE123456789 (VIES checked dd.mm.yyyy)."
- **Non-EU business:** "Не се начислява ДДС – място на изпълнение извън територията на страната, чл. 21, ал. 2 ЗДДС / VAT not charged – place of supply outside Bulgaria."
- **Foreign-currency invoice:** "Amount: USD 1,200.00. Tax base: EUR [x] at ECB rate [r] of [date]. VAT: EUR 0.00."
- **Bulgarian or consumer supplies while unregistered:** no VAT. A short note such as "Доставчикът не е регистриран по ЗДДС за доставки в страната" is commonly added, but in my reading it is optional (art. 114(7)(1)).

#### 1.8 Selling packages on the company's own site: fiscal receipts and e-shop registration

These rules apply regardless of VAT registration.

- **Receipts.** "Всяко регистрирано и нерегистрирано по този закон лице е длъжно да регистрира и отчита извършените от него доставки/продажби в търговски обект чрез издаване на фискална касова бележка…" (every person, registered or not, must record sales in a trade outlet by fiscal receipt) (ЗДДС art. 118(1)) [S1].
- **The site as an "e-shop".** An "Електронен магазин" is software reached over the internet through which goods or services are sold "посредством сключване на договор от разстояние по чл. 45 от Закона за защита на потребителите" (by concluding a consumer distance contract) (§1 т. 87) [S1]. **My reading:** a package site that sells to consumers is an e-shop.
- **Exemption for transfers.** No fiscal receipt is needed when payment is by "кредитен превод, директен дебит или наличен паричен превод, извършен чрез доставчик на платежна услуга" (credit transfer, direct debit or money remittance through a payment service provider) (Наредба Н-18 art. 3(1)) [S3].
- **Card payments.** For card payments made remotely in an e-shop, a "документ за регистриране на продажбата", not issued by a fiscal device, may replace the receipt, if the sales software meets art. 52с (art. 3(17)) [S3].
- **Register first.** The e-shop must be registered with НАП "преди започване на дейност по продажби" (before sales start) (art. 52м(1)) [S3].

**Open questions for the accountant (A6).** Do Stripe Payment Links count as an e-shop? How should B2B card payments and foreign customers be handled? Platform payouts arrive by transfer, so my reading is that they fall under the art. 3(1) exemption.

---

### 2. Company taxation, briefly

#### 2.1 ЕООД (single-member limited company)

- **Corporate tax.** "Данъчната ставка на корпоративния данък е 10 на сто." (ЗКПО art. 20) [S4]
- **Dividends to a resident individual owner.** A final tax "Ставката на данъка е 5 на сто за доходите по чл. 38, ал. 1" (ЗДДФЛ art. 46(3); art. 38(1)(2)(а) covers dividends from a Bulgarian source) [S5]. Withholding on dividends to foreign legal entities is also 5% (ЗКПО art. 194, 200(1)) [S4]. The consolidated texts read on 2026-11-18 (ЗДДФЛ amended to 15 Sept 2026, ЗКПО to 16 June 2026) still show 5%.
- **Combined burden (my arithmetic).** Profit of 100 pays 10 in corporate tax, leaving 90; a 5% dividend tax on 90 is 4.5; net 85.5. **That is about 14.5% on distributed profit.**
- **Liability.** Owners are liable only up to their contribution (ТЗ art. 113). Minimum capital is €1 from 2026 (ТЗ art. 117(1)) [S6].
- **IP chain.** The editor, a person, is the author (ЗАПСП art. 5) [S7]. The company must acquire the rights from that person in writing before it can pass them to clients (see §4).
- **Bulgarian withholding on outgoing payments.** Payments abroad for "авторски и лицензионни възнаграждения" (royalties and licence fees) and "възнаграждения за технически услуги" (fees for technical services) are Bulgarian-source income (ЗКПО art. 12(5)) and subject to 10% withholding (art. 195, 200(2)), subject to treaty relief [S4]. This could catch music, stock and font licences, and foreign subcontractors (question A8).

#### 2.2 If it is an ЕТ (sole trader) instead

| Point | ЕООД | ЕТ |
|---|---|---|
| Who the legal person is | A company | The individual, registered as a trader (ТЗ art. 56) [S6] |
| Profit tax | 10% corporate tax | **15%** personal income tax on the tax profit computed under ЗКПО rules (ЗДДФЛ art. 26(1), **48(2)**; corrected by the lead: the study cited the general 10% rate in art. 48(1)) [S5] |
| Dividends | 5% when profit is distributed | None (profit is the owner's) |
| Liability | Limited to the capital contribution (ТЗ art. 113) | My reading: unlimited and personal, since there is no separate person |
| VAT (all of §1) | Same | Same (a taxable person either way) |
| IP | The editor must assign to the company in writing | Simpler: the author contracts directly |
| US form | W-8BEN-E | W-8BEN, for a sole proprietor or individual (see 2.3) |
| Marketplace accounts | Must match the company: Upwork requires the payout name to match the verified name [S56] | A personal account matches |

Social security for the owner-manager was not researched (question A11).

#### 2.3 US-source payments and the Bulgaria–US treaty

- **Source rule.** "If the income is for personal services performed in the United States, it is from U.S. sources. The place where the services are performed determines the source of the income, regardless of where the contract was made, the place of payment, or the residence of the payer." (IRS Pub 515, 2026) [S24]. **My reading:** editing done in Bulgaria is foreign-source income for US purposes, so no US withholding applies to it.
- **Treaty: business profits.** Under Art. 3(1)(h)–(i), "the term 'business' includes the performance of professional services" and "'business profits' also includes income from the performance of professional services". Art. 7(1): "The business profits of an enterprise of a Contracting State shall be taxable only in that State unless the enterprise carries on business in the other Contracting State through a permanent establishment situated therein." [S25]
- **Treaty: royalties.** Art. 12(2): royalties taxed in the source state may not exceed "5 per cent of the gross amount". Art. 12(3) defines royalties as payments "for the use of, or the right to use, any copyright of … artistic … work (including cinematographic films …)" [S25].
- **When this matters.** If Hera licenses existing footage or stock to US clients, that is royalty income. Pub 515 sources copyright royalties "where the property is used" [S24]. The treaty's 5% rate then needs a treaty claim (my reading).

**W-8BEN-E (company).**
- **Purpose.** "This form is used by foreign entities to document their statuses for purposes of chapter 3 and chapter 4". Payers may rely on it to apply "a reduced rate of, or exemption from, withholding". "Failure to provide a Form W-8BEN-E when requested may lead to withholding at a 30% rate or the backup withholding rate…" [S22].
- **Typical entries (my reading).** Part I: corporation. Chapter 4 status: "Active NFFE" (Part XXV), which must pass the passive-income and assets test [S22].
- **Treaty claim.** A Part III claim is usually unnecessary for services income. It is needed for royalties, and includes the limitation-on-benefits line 14a [S22].

**W-8BEN (individual).** The W-8BEN-E instructions say: "Do not use Form W-8BEN-E if … You are a nonresident alien individual. Instead, use Form W-8BEN…" [S22][S23].

---

### 3. Payments

#### 3.1 Stripe

- **Availability.** Stripe lists Bulgaria among supported countries: "Once Stripe is supported in your country/region, you'll be able to sell to customers anywhere in the world." [S44]
- **Bulgarian pricing [S45].**
  - "1.5% + €0.25 for standard European Economic Area cards"
  - "2.8% + €0.25 for premium European Economic Area cards"
  - "2.5% + €0.25 for UK cards"
  - "3.15% + €0.25 for international cards"
  - "+ 2% if currency conversion is required"
  - Disputes: "Dispute received fee €20.00"; countered fee €20.45, refunded only if you win.
  - "Our pricing is available in both BGN and EUR while Bulgaria transitions to the Euro."
  - Payment Links and Checkout are "Included with Payments". Multi-currency settlement costs "1% of pay out volume or a minimum fee."
- **Payouts.** EUR settlement can be paid out to banks in Bulgaria. "Stripe typically schedules your initial payout to complete within 7–14 days" [S46].
- **Terms acceptance at checkout.** "Checkout helps you collect the necessary agreement by requiring a customer to accept your terms before paying" (`consent_collection[terms_of_service]=required`). Payment Links have the same option [S50].
- **Rough cost of a USD card payment settled in EUR:** 3.15% + 2% + €0.25, so about 5.15% + €0.25.

#### 3.2 PayPal Business (Bulgaria)

The direct fetch was blocked (HTTP 403). A search-engine summary of PayPal's Bulgarian fee page gives:
- commercial transactions: 3.4% plus a fixed fee of €0.35;
- international surcharge: 0% from the EEA, 1.29% from the UK, 1.99% from other markets [S51].

**Verify these figures on the live page before relying on them.**

#### 3.3 Wise Business (Bulgaria page) [S52]

- **Set-up.** "Getting account details to receive in 22 currencies – 60 EUR". "All in for 60 EUR – Get every Wise Business feature for one set-up fee".
- **Receiving.**
  - Domestic, non-Swift receipts in AUD, CAD, EUR, GBP, HUF, NZD, PHP, SGD or USD: free.
  - "Receiving USD wire and Swift payments – Fixed fee per payment – 6.11 USD".
  - GBP Swift: 2.16 GBP. EUR Swift: 2.39 EUR.
- **Converting and sending.** "Converting money – Fee varies by currency – From 0.2%".
- **Why it helps.** Local USD and GBP account details let US and UK clients pay by domestic transfer. That also avoids fiscal-receipt issues, because a transfer is exempt (Н-18 art. 3(1)) [S3].

#### 3.4 Payoneer [S53]

- **Receiving.** "Via a receiving account in your local currency – Free". "Via a receiving account in a currency that is not your local currency – 1% (minimum fee of 1.00 USD…)". From a payer's credit card: "Up to 3.99% + 0.49 USD".
- **Withdrawing.** Bulgaria is listed for withdrawals to a local bank account in local currency, at 1.50 USD per withdrawal in the example shown. Withdrawals with currency conversion cost "1.2% – 4%".
- **Annual fee.** "Annual account fee … Only applies if account receives less than 6,000.00 USD … in any 12 consecutive months … 29.95 USD".

#### 3.5 Upwork: fees and payouts to Bulgaria

- **Seller fee.** "The fee ranges from 0% to 15% per contract." "Once your contract begins, the fee is fixed and won't change." The fee is refunded if money is refunded to the client [S55].
- **Exceptions.** No fee on "Any Hire" contracts. Direct Contracts with clients you bring pay "a reduced Freelancer Service Fee" [S55].
- **Connects.** "Connects cost $0.15 USD each" and expire after one year [S60].
- **Withdrawal methods** [S56][S57][S59]:
  - "Direct to Local Bank (outside of U.S.) — $0.99 USD per transfer". Bulgaria: "Minimum: $5 USD, Limit: $1,000,000 USD". Arrives "within four business days".
  - "U.S. Dollar Wire Transfer — $50.00 USD per transfer".
  - PayPal.
  - Payoneer: "We charge a small per-transfer fee", plus Payoneer's own fees [S58].
- **Name matching.** "The beneficiary name on your withdrawal accounts must match your verified name on Upwork" [S56].
- **Fund release.** For fixed-price work, "Funds released five days after a client approves a milestone" [S56].

#### 3.6 Fiverr: fees and payouts

Payment Terms, last update October 2026 [S62]:

- **Seller earnings.** "each Order you sell and successfully complete, credits your account with Earnings equal to 80% of the purchase amount."
- **Clearance.** "Earnings are only made available for withdrawal … following a safety clearance period of 14 days after the Order is marked as complete. Top Rated Sellers … 7 days".
- **Withdrawal.**
  - "Withdraw to your PayPal Account - US$0 Fee*"
  - "Fiverr Revenue Card™ (operated by Payoneer) - US$1 Fee* within 2 days, or US$3 Fee* within 2 hours"
  - "Local Bank Transfer (LBT) (operated by Payoneer) - US$3 per transfer*"
  - The provider may add its own fees.
- **Buyer fee.** "As of September 2025, the service fees for Gigs are 5.5% … For purchases under US$200 an additional US$3.5 small order fee will be applied."
- **Cancellation.** Completed orders can be cancelled by Fiverr support "up to 14 days after the Order … is marked as complete", and in rare cases later.

#### 3.7 US tax forms

See §2.3.
- **Company account:** W-8BEN-E.
- **Personal account or ЕТ:** W-8BEN.

Upwork and Fiverr ask for these in their tax-information settings. The form must match the account holder. If a personal account earns money for the company, that creates an income-attribution problem for the accountant (question A1).

#### 3.8 Chargebacks and refunds on fixed-price packages

**The risk.**
- "Card networks typically allow cardholders to initiate disputes within 120 days of the original payment … when a customer pays for a future event or service … the dispute window starts on the event date, not the payment date." [S47]
- Each dispute costs €20, even if you win; the separate €20.45 counter fee is refunded only if you win [S45].

**What Stripe recommends.**
- "Include a clear description of your refund and cancellation policies in your terms of service. You can require your users to agree to your terms of service…" [S48]
- "Set a recognizable name for your statement descriptor" (5–22 characters) [S48].
- "If your business provides digital goods, include evidence such as an IP address or system log proving the customer downloaded the content…" [S49]

**How to reduce the risk (my reading, combining the above with Bulgarian rules).**

1. **Deposits and milestones.** For example: 50% at booking, 50% on approval of the first cut, final files released after the second payment.
   - **B2B:** freedom of contract. Under ЗЗД art. 268, a client who withdraws from a work contract pays "направените разходи, извършената работа и печалбата" (costs incurred, work done and the lost profit) [S9]. Write the cancellation scale into the terms.
   - **Consumers:** a "non-refundable deposit" risks being an unfair term. ЗЗП art. 143(2)(4) lists terms letting the trader keep payments when the consumer withdraws without a matching right for the consumer [S8]. Use the statutory proportionate-payment rule instead (§4.7).
2. **Scope in writing.** Footage limit (in hours or GB), final length, number of revision rounds, turnaround clock (starting when all assets arrive), formats and aspect ratios, music sourcing, and what counts as a "revision" as opposed to a new brief.
3. **Delivery proof.** Watermarked or low-resolution previews; a review link with timestamps and the client's approval; download logs; all communication in writing (on-platform where required).
4. **Checkout.** Require ToS acceptance in Stripe Checkout or Payment Links [S50]. Use 3-D Secure, a clear statement descriptor, and the order number in emails.
5. **Refunds.** Each refund to an invoiced client needs a credit note within 5 days (ЗДДС art. 115) [S1].

---

### 4. Contracts and intellectual property

#### 4.1 Who owns the copyright in a commissioned edit (ЗАПСП)

- **Author.** "Автор е физическото лице, в резултат на чиято творческа дейност е създадено произведение." (the author is the natural person whose creative work produced the work) (art. 5) [S7]
- **Commissioned works.** "Авторското право върху произведение, създадено по поръчка, принадлежи на автора на произведението, освен ако в договора за възлагане е предвидено друго." (copyright in a commissioned work belongs to the author unless the commissioning contract provides otherwise) (art. 42(1)) [S7]
- **Default use by the client.** "Ако не е уговорено друго, поръчващият има право да използва произведението без разрешение на автора за целта, за която то е било поръчано." (the commissioning party may use the work for the purpose for which it was ordered) (art. 42(2)) [S7]
- **Employees.** Copyright stays with the author. The employer has an exclusive right to use the work "за свои цели" (for its own purposes), within its usual business (art. 41(1)–(2)) [S7]. **My reading:** that does not obviously cover onward licensing to clients, so an express written assignment from the editor to the company is needed.
- **Status of the edit.** Bulgarian law names the authors of a film as "режисьора, сценариста и оператора" (director, screenwriter and director of photography) (art. 62(1)). An adaptation belongs to whoever made it, "без с това да се накърняват правата на автора на оригиналното произведение" (without prejudice to the author of the original) (art. 9) [S7]. **My reading:** whether a remote editor is a co-author of the audiovisual work or the author of an adaptation is unsettled (lawyer question L1). The contract should cover whatever rights exist, either way.

#### 4.2 How to assign or license, and moral rights

**Licence terms (art. 36) [S7].**
- **Exclusivity** must be express and written; "ако липсва подобна уговорка, смята се, че е отстъпено неизключително право" (absent that, a non-exclusive right is presumed) (art. 36(4)).
- **Default term:** "смята се, че правото да се използва произведението е отстъпено за три години" (three years) (art. 36(5)).
- **Default territory:** the user's country of citizenship or seat (art. 36(6)).
- **So every grant must say:** exclusive, worldwide, for the full term of protection, all media now known or later developed, with the right to sublicense and modify.

**Fair remuneration.** If the agreed fee proves "явно несъразмерно" (clearly disproportionate) to the revenue, the author may claim more, and "Всяка договореност, която възпрепятства или ограничава предвиденото в този член, е недействителна" (any agreement restricting this is invalid) (art. 38(2), (6)) [S7]. This affects the editor and company link more than the company and client link (my reading).

**Moral rights.** These include the rights to be recognised as author, to have the name shown, and to protect the integrity of the work (art. 15(1) items 2, 4, 5). "Неимуществените права по т. 2 и 4 … са неотчуждими. Отчуждаването на други неимуществени права може да става само изрично и в писмена форма." (attribution and name rights are inalienable; others may be transferred only expressly and in writing) (art. 16) [S7].

**My reading for contracts.** Include:
- express written consent to modifications and re-edits, which addresses integrity;
- a choice to publish without credit (art. 15(1)(3) allows anonymous publication);
- no promise to "waive" attribution itself.

#### 4.3 Matching US clients' expectations (work made for hire, assignment, NDA)

- **US definition.** A work made for hire includes "A work specially ordered or commissioned for use … 2. as a part of a motion picture or other audiovisual work … if the parties expressly agree in a written instrument signed by them that the work shall be considered a work made for hire." [S26]
- **Effect.** "…the employer or the party that specially ordered or commissioned that work is the author of that work." An ordinary assignment, unlike a work made for hire, can be terminated in certain circumstances under sections 203 and 304 [S26]. That is why US clients ask for work-made-for-hire wording.
- **Upwork's model wording** (Optional Service Contract Terms v1.7) [S54].
  - "Upon Freelancer's receipt of full payment from Client, the Work Product … will be the sole and exclusive property of Client, and Client will be deemed to be the author thereof. If Freelancer has any Intellectual Property Rights to the Work Product that are not owned by Client … Freelancer hereby automatically irrevocably assigns to Client…"
  - If rights cannot be assigned, an exclusive, perpetual, worldwide licence follows; if they cannot be licensed, a waiver of enforcement follows (6.4–6.6).
- **Fiverr's default.** "…when the work is delivered, and subject to payment, the Buyer is granted all intellectual property rights, including but not limited to, copyright … and the Seller waives any and all moral rights (to the extent permitted by applicable law)" [S61].

**My reading: recommended structure.**
1. A clause that the work is made for hire to the extent the law allows.
2. Otherwise, an assignment (or, under ЗАПСП, the art. 42(1) "otherwise agreed" ownership plus an exclusive art. 36 licence), worldwide, for the full term, in all media.
3. Written consent to modifications, and a credit or no-credit choice.
4. Rights pass **only on full payment**, which is useful leverage against non-payment.
5. A carve-out for the editor's pre-existing tools and templates, with a licence to them.
6. A clause that third-party material (music, stock, fonts) is licensed, not assigned (§4.4).

"The client will be deemed to be the author" conflicts with ЗАПСП art. 5, which allows only a natural person as author (question L1).

**NDAs.** Fine to sign. Before signing, align them with the DPA (§4.5) and with the platforms' AI-training licences (§7).

#### 4.4 Client-supplied footage and music; stock and fonts

- **Background rule.** "Авторът има изключителното право да използва създаденото от него произведение и да разрешава използването му от други лица" (the author has the exclusive right to use the work and to authorise its use) (ЗАПСП art. 18(1)) [S7]. Any music, footage or font Hera adds therefore needs a licence that covers the client's intended use.
- **Client warranties (my reading).** The client warrants that it owns or has licensed all supplied footage, logos and music. It warrants that it has releases or consents from identifiable people and permits for locations. It indemnifies Hera for claims arising from supplied material. Hera may refuse unlicensed commercial music.
- **Music added by Hera (my reading).**
  - Use a library whose licence covers **client projects** and the channels the client will use (broadcast, paid ads, YouTube monetisation).
  - Name who holds the licence (Hera or the client) and for how long; some libraries require the client to hold its own subscription.
  - Record the track IDs and licence certificates in the delivery notes. YouTube creators need these to clear Content ID claims.
  - A lapsed editor subscription can affect the client's later use, so put the licence in the client's name where possible.
- **Stock footage.** Check each clip's licence. Mixkit publishes separate "Free" and "Restricted" video licences [S65]. The terms sit in pop-ups that could not be read here; Hera's own project notes record that Restricted is personal-only.
- **Fonts.** SIL OFL fonts are safe for video: "The requirement for fonts to remain under this license does not apply to any document created using the Font Software." [S64] For commercial fonts, check that the EULA covers video and broadcast, and whether delivering editable project files to the client needs a client licence.

#### 4.5 Data protection (GDPR)

- **GDPR applies to Hera.** "This Regulation applies to the processing of personal data in the context of the activities of an establishment of a controller or a processor in the Union, regardless of whether the processing takes place in the Union or not." (Art. 3(1)) [S12]
- **Wedding clients too.** For a couple's footage, the couple's own use is household activity, "However, this Regulation applies to controllers or processors which provide the means for processing personal data for such personal or household activities." (Recital 18) [S12]
- **Processor contract (Art. 28(3)).** Processing "shall be governed by a contract … that sets out the subject-matter and duration of the processing, the nature and purpose of the processing, the type of personal data and categories of data subjects and the obligations and rights of the controller". It must cover these points [S12]:
  - (a) documented instructions, including on transfers;
  - (b) staff confidentiality;
  - (c) Art. 32 security;
  - (d) conditions for sub-processors;
  - (e)–(f) assistance to the controller;
  - (g) "deletes or returns all the personal data … after the end of the provision of services";
  - (h) audits.

  It "shall be in writing, including in electronic form" (Art. 28(9)) [S12].
- **Sub-processors.** Cloud storage, review tools, transcription and AI tools need the controller's "prior specific or general written authorisation" (Art. 28(2)). Breaches must be notified to the client "without undue delay" (Art. 33(2)) [S12].
- **Records.** The small-business exemption from records of processing does not apply where "the processing is not occasional" (Art. 30(5)) [S12]. Regular editing of client footage is not occasional, in my reading, so keep a record of processing.
- **Transfers when clients are outside the EU.** "Any transfer of personal data which are undergoing processing or are intended for processing after transfer to a third country … shall take place only if … the conditions laid down in this Chapter are complied with by the controller and processor" (Art. 44) [S12].
  - **Adequacy decisions:** "Canada (commercial organisations)"; "the United Kingdom … as amended in December 2025 through one renewal decision under the GDPR"; "the United States (commercial organisations participating in the EU-US Data Privacy Framework)". Australia is not listed [S14].
  - **Others** (most US creators are not in the DPF; Australia): use SCC **Module Four, "Transfer processor to controller"** [S13]. The Commission notes that extra third-country safeguards are not needed "where the outsourcing merely involves the processing and transfer back of personal data that has been received from the controller and in any event has been and will remain subject to the jurisdiction of the third country in question" (Decision 2021/914, recital 16) [S13].
- **Practical package (my reading).**
  - A short DPA annex to the terms, plus Module 4 for non-adequate countries.
  - A sub-processor list.
  - Deletion of raw footage N days after delivery.
  - Encrypted storage.
  - No AI-training uploads of client footage.
  - Opt out of Upwork's AI licence (§7).

#### 4.6 Terms of service for a fixed-price package site (checklist)

| Clause | Content | Legal anchor |
|---|---|---|
| Parties and status | B2B and B2C flows separated; collect the VAT number for B2B | ЗДДС art. 21 [S1]; Reg. 282/2011 Art. 18 [S11] |
| Scope | Deliverable, length, footage cap, formats, music source, what is excluded | ЗЗД art. 258 (work contract) [S9] |
| Revisions | Number of rounds, definition, price of extra rounds, deemed approval after X days | Contract |
| Turnaround | Clock starts when all assets and payment are received; delays caused by the client pause it | Contract |
| Payment | Deposit and milestones; currency; EUR tax base on invoices; final files on full payment | ЗДДС art. 114(5) [S1] |
| Cancellation (B2B) | Scale tied to work done, consistent with art. 268 | ЗЗД art. 268 [S9] |
| Consumers | Pre-contract information, express request to start early, proportionate payment, withdrawal function | ЗЗП art. 47–57, 52а [S8]; CRD [S15][S16] |
| Liability | Cap (e.g. fees paid), no indirect loss; **cannot** limit liability for intent or gross negligence; for consumers no clause limiting statutory rights | ЗЗД art. 94 [S9]; ЗЗП art. 143 [S8] |
| IP | As in §4.3; third-party licences | ЗАПСП art. 36, 42 [S7] |
| Data | DPA annex; SCC Module 4 where needed | GDPR Art. 28, 44 [S12] |
| AI use | Disclosure and opt-out (§7) | Platform rules [S54][S63] |
| Law and forum | Bulgarian law; consumers keep their home-country mandatory protections | Rome I Art. 6 [S17] |
| Language | English text controls; Bulgarian working copy for the editor; plain language | CRD Art. 8(1) [S15] |
| Disputes | The EU ODR-platform link is no longer required: Reg. 524/2013 "is repealed with effect from 20 July 2025" | Reg. 2024/3228 [S18] |

**Liability limits.** "Недействителни са уговорките, с които предварително се изключва или ограничава отговорността на длъжника за умисъл или за груба небрежност." (agreements excluding or limiting liability in advance for intent or gross negligence are invalid) (ЗЗД art. 94) [S9]

**Language (the editor does not speak English).** Nothing in the sources requires spoken English. EU consumer information must be given "in plain and intelligible language" (CRD Art. 8(1)) [S15]. My reading:
- Keep the terms short and in plain English, with a professionally translated Bulgarian version for the editor's own use.
- Say that the English version prevails.
- Run every scope discussion in writing, and finish it with a scope summary the client confirms.

#### 4.7 Consumer law (couples and other consumers)

**EU rules.**
- **The right.** "…the consumer shall have a period of 14 days to withdraw from a distance or off-premises contract, without giving any reason…" (CRD Art. 9(1)) [S15].
- **Starting early.** The trader "shall require that the consumer make an express request and request the consumer to acknowledge that, once the contract has been fully performed by the trader," the right is lost (Art. 8(8)) [S15].
- **Withdrawal mid-way.** The consumer pays "an amount which is in proportion to what has been provided until the time the consumer has informed the trader" (Art. 14(3)) [S15].
- **Exceptions (Art. 16) [S15].**
  - (a) "service contracts after the service has been fully performed but … only if the performance has begun with the consumer's prior express consent and acknowledgement that he will lose his right of withdrawal once the contract has been fully performed";
  - (c) goods "made to the consumer's specifications or clearly personalised" (e.g. a USB stick or DVD of the film);
  - (m) digital content, with consent, acknowledgement and confirmation.
- **Withdrawal function** (new Art. 11a, applying "from 19 June 2026") [S16].
  - "For distance contracts concluded by the means of an online interface, the trader shall ensure that the consumer can also withdraw from the contract by using a withdrawal function."
  - It is "labelled with the words 'withdraw from contract here' or an unambiguous corresponding formulation".
  - It is "continuously available throughout the withdrawal period".
  - It is followed by a "confirm withdrawal" step and an acknowledgement on a durable medium.

**Bulgarian transposition (ЗЗП) [S8].**
- 14 days, counted "считано от датата на … сключване на договора - при договор за услуги" (from the contract date for services) (art. 50(1)).
- Withdrawal function: "откажете се от договора тук", with the confirmation labelled "потвърждавам отказа". The acknowledgement must be sent "не по-късно от края на работния ден" (by the end of the working day) (art. 52а, in force 24.09.2026).
- Proportionate payment after an express request (art. 55(5)–(6)).
- Exceptions (art. 57): item 1 (services fully performed with express prior consent and acknowledgement), item 3 (goods made to the consumer's specifications) and item 13 (digital content).

**Which law applies.** A consumer contract with a business that "by any means, directs such activities to that country" is governed by the consumer's law. A choice of Bulgarian law "may not … have the result of depriving the consumer of the protection afforded" by that law's mandatory rules (Rome I Art. 6(1)–(2)) [S17]. **My reading:** an English-language site marketing wedding edits to Germans "directs" activity to Germany. The Art. 6(4)(a) carve-out for services supplied "exclusively" abroad does not fit online delivery to the consumer's home.

**Practical consumer flow (my reading).**
1. Pre-contract information at checkout.
2. A checkbox: "I ask you to start work now and understand I lose my right to withdraw once the edit is fully delivered; if I withdraw earlier I pay for work done."
3. A confirmation email on a durable medium.
4. A "withdraw from contract here" button on the order page for 14 days.
5. Pro-rata refunds.

Consumers in the US, UK, Canada or Australia have their own consumer laws, which were not researched (question L3).

---

### 5. Cold outreach to creators and businesses abroad

#### 5.1 United States (CAN-SPAM) [S30]

- **Allowed.** Cold commercial email without prior consent (an opt-out regime), provided the rules below are followed.
- **Rules.** "The law makes no exception for business-to-business email."
  - "Don't use false or misleading header information."
  - "Don't use deceptive subject lines."
  - "Identify the message as an ad."
  - "Tell recipients where you're located."
  - "Tell recipients how to opt out of receiving future marketing email from you."
  - "You must honor a recipient's opt-out request within 10 business days."
  - "Monitor what others are doing on your behalf."
- **Penalty.** "Each separate email in violation of the CAN-SPAM Act is subject to penalties of up to $53,088". The FTC adjusts this for inflation; the guide page may lag.

#### 5.2 United Kingdom (PECR)

- **Who needs consent.** Regulation 22 "applies to the transmission of unsolicited communications by means of electronic mail to **individual subscribers**". It bans direct-marketing email to them unless they consented, or the "soft opt-in" applies (an existing customer, similar products, an opt-out offered at collection and in every message) (reg. 22(1)–(3)) [S32].
  - "'individual' means a living individual and includes an unincorporated body of such individuals" [S31]. That covers **sole traders and ordinary partnerships**.
- **Corporate subscribers.** A "corporate subscriber" is a company, a Scottish partnership, a corporation sole, or "any other body corporate or entity which is a legal person distinct from its members" (which includes LLPs) [S31]. Regulation 22 does not apply to them, but **regulation 23 applies to everyone**. No marketing email may conceal the sender's identity or omit "a valid address to which the recipient … may send a request that such communications cease" [S33].
- **Electronic mail.** "any text, voice, sound or image message sent over a public electronic communications network which can be stored in the network or in the recipient's terminal equipment until it is collected" [S31]. My reading: platform DMs can fall within this.
- **UK GDPR still applies** to named employees' addresses (e.g. jane@company.co.uk); see 5.5 for legitimate interests and objection rights. Not checked against UK sources; the ICO page was blocked.
- **Penalties.** Since 5 February 2026, enforcement runs through the Data Protection Act 2018 (PECR reg. 31 substituted by the Data (Use and Access) Act 2025) [S34]. Breaches of reg. 22 and 23 carry the "higher maximum amount" (Sch. 1 para. 18) [S34], which is "£17,500,000 or 4% of the undertaking's total annual worldwide turnover … whichever is higher" (DPA 2018 s.157(5)) [S35]. The ICO's own page returned 403, so this is read from the legislation.

#### 5.3 Canada (CASL) [S36]

- **Consent is required.** "It is prohibited to send or cause or permit to be sent to an electronic address a commercial electronic message unless (a) the person to whom the message is sent has consented to receiving it, whether the consent is express or implied" (s. 6(1)).
- **Scope covers DMs.** "electronic address" includes "(a) an electronic mail account; (b) an instant messaging account; … or (d) any similar account" (s. 1).
- **Implied consent by conspicuous publication.** Consent is implied when the person "has conspicuously published, or has caused to be conspicuously published, the electronic address to which the message is sent, the publication is not accompanied by a statement that the person does not wish to receive unsolicited commercial electronic messages at the electronic address and the message is relevant to the person's business, role, functions or duties in a business or official capacity" (s. 10(9)(b)). Implied consent can also come from an existing business relationship, or from the person disclosing the address directly (s. 10(9)(a), (c)).
- **Content.** Every message must identify the sender, give contact information valid for 60 days, and carry an unsubscribe mechanism (s. 6(2)–(3)).
- **Penalty.** "The maximum penalty for a violation is $1,000,000 in the case of an individual, and $10,000,000 in the case of any other person." (s. 20(4)) The Act is current to 2026-10-29.
- **My reading.** Emailing a creator at the "business inquiries" address on their channel about editing their videos fits s. 10(9)(b), unless the page says "no solicitations". Scraped personal addresses do not.

#### 5.4 Australia (Spam Act 2003) [S37]

- **Consent is required.** "A person must not send, or cause to be sent, a commercial electronic message that: (a) has an Australian link…" unless the account holder consented (s. 16(1)–(2)).
- **Scope covers DMs.** Messages sent "to an electronic address in connection with: (i) an email account; or (ii) an instant messaging account; … or (iv) a similar account" are covered (s. 5(1)).
- **Inferred consent by conspicuous publication.** Consent is inferred where an address reaching, for example, "a particular self-employed individual" or a role "has been conspicuously published", the publication is not accompanied by a no-spam statement, and the messages "are relevant to … the work-related business, functions or duties" (Sch. 2 cl. 4(2)).
- **Content.** Accurate sender identification and contact details (s. 17) and a functional unsubscribe (s. 18). Withdrawal of consent takes effect "at the end of the period of 5 business days" (Sch. 2).
- **Penalties.** Civil penalties are counted in penalty units (s. 25). A body corporate with no prior record faces up to 100 units per contravention of s. 16 and up to 2,000 units for multiple contraventions on one day. With a prior record, the figures are 500 and 10,000 units. The dollar value of a unit is set elsewhere and was not checked here. The compilation read is No. 10 (10 March 2016), which the Register showed as the latest; the ACMA page timed out.

#### 5.5 European Union (national ePrivacy rules plus GDPR)

- **EU baseline.** Email marketing is allowed "only in respect of subscribers or users who have given their prior consent", with the soft opt-in for existing customers (ePrivacy Directive Art. 13(1)–(2)). The consent requirement in Art. 13(1) applies to "subscribers who are natural persons". For legal persons, member states must ensure their "legitimate interests … are sufficiently protected" (Art. 13(5)). The sender's identity must not be concealed, and a valid opt-out address is required (Art. 13(4)) [S19].
- **Germany is strict.** Advertising "unter Verwendung … elektronischer Post, ohne dass eine vorherige ausdrückliche Einwilligung des Adressaten vorliegt" is always an unacceptable nuisance (UWG §7(2) no. 2). The rule protects every "Marktteilnehmer" (market participant), including businesses [S38]. **My reading:** no cold email to German businesses or creators without consent.
- **Netherlands is narrow B2B.** No prior consent is needed for communications to "een rechtspersoon of een natuurlijke persoon die handelt in de uitoefening van zijn beroep of bedrijf" (a legal person, or a person acting in their profession or business) only if the sender uses contact details "die door de desbetreffende eindgebruiker voor het ontvangen van ongevraagde communicatie … zijn bestemd en bekendgemaakt" (designated and published by that end-user for receiving unsolicited communications), and uses them for those purposes (Telecommunicatiewet art. 11.7(3)(a)). Identity and an opt-out address are always required (11.7(7)) [S39].
- **GDPR on top, wherever a person is identifiable** [S12].
  - "The processing of personal data for direct marketing purposes may be regarded as carried out for a legitimate interest." (Recital 47)
  - The right to object is absolute: "the personal data shall no longer be processed for such purposes" (Art. 21(2)–(3)).
  - Where data were not obtained from the person, they must be informed "at the latest at the time of the first communication" (Art. 14(3)(b)). In practice, add a short privacy line and link to the first email.
  - Fines for Art. 14 and 21 breaches reach "20 000 000 EUR, or … 4 %" (Art. 83(5)).

#### 5.6 Direct messages on X, Instagram and Discord

- **Discord.** "13. Do not send unsolicited bulk messages (or spam) to others." [S40]
- **X.** Direct fetch returned 403. Search summaries of X's help pages say the Authenticity policy bars "bulk, aggressive, high-volume unsolicited replies, mentions, or direct messages". The automation rules prohibit unsolicited DMs "in a bulk or automated manner". Enforcement ranges from feature limits to suspension [S41]. **Verify on help.x.com.**
- **Instagram.** The page is rendered by JavaScript and could not be read. An archived copy of the Community Guidelines, found by search, lists as spam "repeatedly contacting people for commercial purposes without their consent" [S42]. **Verify the live text.**
- **Law.** Canada's CASL and Australia's Spam Act expressly cover instant-messaging and "similar" accounts [S36][S37]. In my reading, the UK and EU "electronic mail" definitions can also reach platform DMs [S19][S31]. CAN-SPAM is drafted around "email"; treat DMs as covered for safety (my reading).

#### 5.7 Summary: allowed, not allowed, penalties

| Where | Allowed | Not allowed | Penalty |
|---|---|---|---|
| US | Cold B2B or B2C email with an honest header and subject, ad identification, postal address and working opt-out | Deceptive headers or subjects; ignoring opt-outs beyond 10 business days | Up to $53,088 per email [S30] |
| UK | Email to companies or LLPs with identity and an opt-out address; individuals only with consent or soft opt-in | Cold email to sole traders or partnerships without consent; hidden identity | Up to £17.5m or 4% [S34][S35] |
| Canada | Express consent; implied via a conspicuously published, role-relevant address with no "no-solicitation" note; ID, contact details and unsubscribe | Messages to scraped or personal addresses; no unsubscribe | Up to C$10m per violation (organisation) [S36] |
| Australia | Consent, including inferred from a conspicuously published, relevant work address; ID and unsubscribe honoured in 5 business days | Messages without consent and an Australian link | Up to 2,000 penalty units per day (first offence, company) [S37] |
| EU | Depends on the country; NL only to addresses published for such messages; GDPR notice at first contact; honour objections | DE: any cold email advertising; anywhere: hidden identity, no opt-out | National fines plus GDPR up to €20m or 4% [S12][S38][S39] |
| Platforms | Individual, relevant, non-automated messages | Bulk, automated or repeated unsolicited commercial DMs | Account limits or suspension [S40]–[S42] |

**Practical rule set (my reading).**
1. One message per person, to a published business address, about their content.
2. Identify Hera with the company name, address and website.
3. Give a one-line opt-out and honour it everywhere, through one suppression list.
4. Add a privacy link.
5. Skip Germany, and private or personal addresses.
6. Never automate DMs.

---

### 6. Marketplace terms: taking clients off-platform

| | Upwork (User Agreement v8.2, effective 20 July 2026) [S54] | Fiverr (ToS, last update January 2026) [S61] |
|---|---|---|
| Rule | "You agree to communicate through the Site and make and receive payments only through the Site for two years from the date you first identify or meet your Client…" | "You may not offer or solicit (or accept any offer or solicitation from) Sellers to contract, engage, pay, or make payment outside of the Site." "Users may not offer or accept payments using any method other than placing an Order through Fiverr.com." |
| Time limit | "for 24 months from the start of an Upwork Relationship (the 'Non-Circumvention Period')" | None stated, so my reading is that it is indefinite for relationships made on Fiverr |
| Contact details | Before a contract: you "will not provide your Means of Direct Contact", which includes "a link to a contact form" and information that lets someone find you, "such as going to a website that included an email address" | "Requesting or providing email addresses, third party messaging applications, telephone numbers or any other personal contact details to communicate outside of Fiverr … is not permitted." "All information and file exchanges must be performed exclusively on the Site." |
| Opt-out fee | "Conversion Fee which is a minimum of $1,000 USD and up to $50,000 USD for each Upwork Relationship". "the Conversion Fee is 13.5% of the estimated earnings over a twelve (12) month period" (hourly rate × 2,080), less client fees paid in the previous 12 months; $1 after 2 years | None; there is no paid route off-platform |
| Sanctions | Permanent suspension, the Conversion Fee charged, and costs | "material breach … may lead to a permanent disabling of your account"; buyers "agree to pay Fiverr liquidated damages of US $10,000" |
| Exception | "If you … did not identify and were not identified by another person through the Site, such as if you and another User worked together before meeting on the Site, then the Non-Circumvention Period does not apply." | "Fiverr does not provide protection for users who interact outside of the Site." |

**Practical consequences (my reading).**
- **Upwork profile.** Do not link the Upwork profile, proposals or attachments to hera-editing.com while the site shows an email address or contact form.
- **Fiverr files.** Deliver files through Fiverr.
- **Clients found elsewhere.** Clients won by Hera's own outreach can be invoiced directly. If they want escrow, use Upwork Direct Contracts, which carry a reduced fee [S55] and no lock-in, because the relationship was not formed on Upwork.

---

### 7. AI-assisted editing

**Platforms.**
- **Upwork, prohibited conduct.** "using generative AI or other tools to substantially bolster your job proposals or work product if such use is restricted by your client or violates any third-party's rights" (Terms of Use v4.12, 3.2) [S54].
- **Upwork, AI-training licence.** "Unless you opt-out on the Site, you agree to grant Upwork an irrevocable, perpetual, non-exclusive, royalty-free, and worldwide license to use all User Content that you send or receive through the Upwork platform, including Work Product … to improve AI models…" (User Agreement 2.4) [S54]. **Opt out.** Client footage of identifiable people, NDAs and the GDPR DPA all conflict with this licence (my reading).
- **Fiverr [S63].**
  - "Fiverr permits the use of AI across all service categories."
  - "Freelancers must also honor a client's explicit request for non-AI work… freelancers are expected to disclose their intended workflow".
  - Prohibited: "Creating or using AI-generated videos, images, or voices that mimic real individuals without their consent".
  - For "misrepresentation of AI usage … the order may be cancelled, the client may receive a full refund, and the freelancer's account may be permanently suspended."

**Clients' platforms.** YouTube: "We require creators to disclose AI-generated or altered content that seems realistic." Disclosure is triggered by content that "Makes a real person appear to say or do something they didn't do", "Alters footage of a real event or place" or "Generates a realistic scene that didn't actually occur". Edits that need **no** disclosure include colour adjustment, beauty filters, background blur, "Caption creation", and "Video sharpening, upscaling or repair and voice or audio repair" [S43].

**EU AI Act.**
- "Deployers of an AI system that generates or manipulates image, audio or video content constituting a deep fake, shall disclose that the content has been artificially generated or manipulated." For evidently artistic or creative works, the duty is limited to disclosure "in an appropriate manner that does not hamper the display or enjoyment of the work" (Art. 50(4)) [S20].
- The Regulation applies "from 2 August 2026" (Art. 113) [S20].
- The Digital Omnibus on AI (Reg. 2026/1744, OJ 24.7.2026) gave providers of generative systems already on the market until 2 December 2026 for the separate marking duty in Art. 50(2) [S21]. My reading of its text: it did not postpone the Art. 50(4) deepfake duty.

**US Copyright Office.**
- "…the outputs of generative AI can be protected by copyright only where a human author has determined sufficient expressive elements. This can include situations where a human-authored work is perceptible in an AI output, or a human makes creative arrangements or modifications of the output, but not the mere provision of prompts. The Office confirms that the use of AI to assist in the process of creation or the inclusion of AI-generated material in a larger human-generated work does not bar copyrightability." (Part 2 report, 29 January 2025) [S28]
- Registration guidance: "applicants have a duty to disclose the inclusion of AI-generated content in a work submitted for registration" and "AI-generated content that is more than de minimis should be explicitly excluded from the application." [S29]

**When to disclose (my reading).**
- **Always**, when the client asked for no AI or the platform requires it (Upwork, Fiverr).
- **Always**, when AI generates or replaces realistic content: generated B-roll, voice clones, face or lip changes, synthetic crowds or skies in "real" footage, or AI music as a main element. This lines up with YouTube's triggers and AI Act Art. 50(4).
- **When the client wants to register or enforce copyright.** AI-generated parts may not be protected, so the IP warranty must carve them out.
- **No disclosure needed** for assistive tools (transcription, captions, denoise, upscaling, colour matching, rough-cut suggestions), but keep a log.
- **Default clause:** "We use AI-assisted tools for [list]; we do not use generative AI to create or alter people, voices or events without your written approval; client footage is never used to train AI."

---

### 8. Prioritised questions for a Bulgarian lawyer and accountant

**Priority 1: before the first sale abroad**

- **A1 (accountant).** Entity and VAT set-up.
  - ЕООД or ЕТ.
  - Art. 97а registration only, voluntary art. 100(1) registration, or the EU SME scheme (art. 168ж, 97а(6)).
  - The cost of non-deductible reverse-charge VAT on Upwork and Fiverr fees and software (art. 70(4)).
  - Whose name the marketplace accounts and W-8 forms are in, and how platform income is attributed to the company.
- **A2 (accountant).** Timing of the art. 97а(2) application: 7 days before the first advance payment from an EU business. Also whether art. 97а(1) is already triggered by subscriptions and platform fees bought now.
- **A3 (accountant).** How to monitor the €51,130 domestic threshold when Bulgarian filming and all consumer editing count (art. 168в), and what happens on the day it is crossed.
- **L1 (lawyer).** The IP chain: an editor-to-company assignment (employment or service contract; art. 41, 42). Is a remote editor an author of the audiovisual work (art. 62) or of an adaptation (art. 9)? A template that combines US "work made for hire" with a ЗАПСП-compliant exclusive grant (exclusivity, term, territory; art. 36(4)–(6)). How far moral rights can be handled (art. 16). Art. 38 fair-remuneration exposure. Whether Upwork's "deemed author" and Fiverr's click-through moral-rights waiver work under Bulgarian law.
- **L2 (lawyer).** A GDPR processor package: an Art. 28 DPA annex, SCC Module 4 for US (non-DPF) and Australian clients, a sub-processor list (cloud, review and AI tools), retention and deletion, a record of processing (Art. 30(5)), and minors in wedding or event footage.

**Priority 2: before the own-site packages go live**

- **A4 (accountant).** Place of supply for **non-EU consumers**: confirm the general art. 21(1) rule (Bulgaria) rather than art. 21(5). Also how to treat EU small businesses without a VAT number.
- **A5 (accountant).** Invoices: who issues them for marketplace orders (Upwork creates invoices "as its agent"; are they enough under art. 113–114?); the language (Bulgarian, English or bilingual); exact reverse-charge and out-of-scope wording; conversion at the ECB rate; credit notes for refunds; FX differences and Stripe, PayPal and Wise fees in the books.
- **A6 (accountant).** Наредба Н-18: is the site an "e-shop" (§1 т. 87 ЗДДС)? It would then need registration before sales (art. 52м). Fiscal receipt or the alternative document for Stripe card payments (art. 3(17), 52с). B2B card payments and foreign customers. Whether Payment Links change the analysis.
- **L3 (lawyer).** Terms for B2B and B2C:
  - liability caps (ЗЗД art. 94), unfair terms (ЗЗП art. 143), the deposit and cancellation scale (ЗЗД art. 268);
  - consumer flows (ЗЗП art. 47–57) and the **withdrawal button** (ЗЗП art. 52а, since 24.09.2026);
  - governing law under Rome I Art. 6;
  - whether US, UK, Canadian or Australian consumer laws (for example, Australian consumer guarantees) need clauses.
- **A7 (accountant).** Payment stack: Stripe EUR settlement versus a USD account (1% multi-currency fee); Wise USD and GBP details for transfers; how platform payouts and Payoneer flows appear in the books.

**Priority 3: before scaling outreach and productising**

- **A8 (accountant).** Bulgarian 10% withholding (ЗКПО art. 12(5), 195) on foreign payments for music, stock or font licences and foreign subcontractors, and the treaty relief and forms to use.
- **A9 (accountant).** Foreign consumption taxes on sales to consumers abroad: Canadian GST/HST and Australian GST registration thresholds for non-resident service suppliers, and UK rules. The official pages could not be read here. Also OSS if digital products (templates, LUTs) are sold to EU consumers (art. 20б, €10,000).
- **L4 (lawyer).** An outreach compliance pack: per-country rules (Germany: consent; Netherlands: designated addresses; UK: sole traders; Canada: s. 10(9)(b) evidence; Australia), the GDPR Art. 14 notice for the first email, a suppression list, and record keeping.
- **L5 (lawyer).** Music, stock and font licensing model: whose name licences are in, transfer to clients, indemnities, and Content ID handling.
- **L6 (lawyer).** AI clauses: disclosure, likeness and voice consent, the role under AI Act Art. 50(4) (deployer), carve-outs in the IP warranty, and the Upwork AI-licence opt-out against NDAs.

**Priority 4: ongoing**

- **A10 (accountant).** US forms: W-8BEN-E chapter 4 status (Active NFFE?), when a treaty claim (Art. 12, LOB line 14a) is needed, and renewal cycles.
- **A11 (accountant).** Social security for the owner-manager (ЕООД) or for an ЕТ, and the best mix of salary and dividends.
- **A12 (accountant).** Watch the 2027 budget for changes to dividend or corporate tax. The texts read on 2026-11-18 still show 5% and 10%.

---

### Sources

All read on **2026-11-18**.

**Bulgaria**
- [S1] Закон за данък върху добавената стойност (ЗДДС), lex.bg consolidated text, last amendment ДВ бр. 69/31.07.2026: https://lex.bg/laws/ldoc/2135533201
- [S2] НАП, "Регистрация по ЗДДС": https://nra.bg/wps/wcm/connect/agency/site/taxes/dds-v-balgariya/registratsiya-po-zdds
- [S3] Наредба № Н-18 от 13.12.2006 (fiscal devices and e-shops), lex.bg, last amendment ДВ бр. 42/23.05.2025: https://lex.bg/laws/ldoc/2135540645
- [S4] Закон за корпоративното подоходно облагане (ЗКПО), lex.bg, last amendment ДВ бр. 55/16.06.2026: https://lex.bg/laws/ldoc/2135540562
- [S5] Закон за данъците върху доходите на физическите лица (ЗДДФЛ), lex.bg, last amendment ДВ бр. 85/15.09.2026: https://lex.bg/laws/ldoc/2135538631
- [S6] Търговски закон, lex.bg: https://lex.bg/laws/ldoc/-14917630
- [S7] Закон за авторското право и сродните му права (ЗАПСП), lex.bg, last amendment ДВ бр. 70/20.08.2024: https://lex.bg/laws/ldoc/2133094401
- [S8] Закон за защита на потребителите (ЗЗП), lex.bg, last amendment ДВ бр. 87/24.09.2026: https://lex.bg/laws/ldoc/2135513678
- [S9] Закон за задълженията и договорите (ЗЗД), lex.bg: https://lex.bg/laws/ldoc/2121934337

**European Union.** Texts were retrieved through the Publications Office endpoint `https://publications.europa.eu/resource/celex/<CELEX>`, because eur-lex.europa.eu blocked automated fetches. The EUR-Lex URLs are given.
- [S10] VAT Directive 2006/112/EC, consolidated 14.4.2025 (Art. 44, 45, 59, 65, 196, 222, 226, 262, 284, 288): https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02006L0112-20250414
- [S11] Implementing Regulation (EU) 282/2011, consolidated 1.7.2022 (Art. 7, 17–19, Annex I): https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02011R0282-20220701
- [S12] GDPR, Regulation (EU) 2016/679 (Art. 3, 14, 21, 28, 30, 32, 33, 44, 83; Recitals 18, 47): https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679
- [S13] Commission Implementing Decision (EU) 2021/914, SCCs (recital 16, Module Four): https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021D0914
- [S14] European Commission, adequacy decisions: https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en
- [S15] Consumer Rights Directive 2011/83/EU, consolidated 28.5.2022 (Art. 8, 9, 14, 16): https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02011L0083-20220528
- [S16] Directive (EU) 2023/2673 (new Art. 11a CRD, withdrawal function; applies from 19 June 2026): https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023L2673
- [S17] Rome I, Regulation (EC) 593/2008 (Art. 6): https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32008R0593
- [S18] Regulation (EU) 2024/3228 (repeal of the ODR Regulation from 20 July 2025): https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R3228
- [S19] ePrivacy Directive 2002/58/EC, consolidated 19.12.2009 (Art. 2(h), 13): https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02002L0058-20091219
- [S20] AI Act, Regulation (EU) 2024/1689 (Art. 50(4), 113): https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689
- [S21] Regulation (EU) 2026/1744, Digital Omnibus on AI (OJ L 24.7.2026): https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32026R1744

**United States**
- [S22] IRS, Instructions for Form W-8BEN-E (10/2021): https://www.irs.gov/instructions/iw8bene
- [S23] IRS, Instructions for Form W-8BEN (10/2021): https://www.irs.gov/instructions/iw8ben
- [S24] IRS Publication 515 (2026): https://www.irs.gov/publications/p515
- [S25] US–Bulgaria Income Tax Convention (signed 23.2.2007; Art. 3, 7, 12, 21), Treasury PDF linked from the IRS page https://www.irs.gov/businesses/international-businesses/bulgaria-tax-treaty-documents: https://home.treasury.gov/system/files/131/Treaty-Bulgaria-2-23-2007.pdf
- [S26] US Copyright Office, Circular 30, Works Made for Hire: https://www.copyright.gov/circs/circ30.pdf
- [S27] US Copyright Office, Copyright and AI: https://www.copyright.gov/ai/
- [S28] US Copyright Office, NewsNet 1060 (29 Jan 2025), Part 2 report: https://www.copyright.gov/newsnet/2025/1060.html
- [S29] US Copyright Office, Registration Guidance: Works Containing AI-Generated Material (2023): https://www.copyright.gov/ai/ai_policy_guidance.pdf
- [S30] FTC, CAN-SPAM Act: A Compliance Guide for Business (read through a fetch tool; curl returned 404): https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business

**United Kingdom.** The ICO guidance page returned 403, so legislation was used.
- [S31] PECR 2003 reg. 2 (definitions): https://www.legislation.gov.uk/uksi/2003/2426/regulation/2
- [S32] PECR reg. 22: https://www.legislation.gov.uk/uksi/2003/2426/regulation/22
- [S33] PECR reg. 23: https://www.legislation.gov.uk/uksi/2003/2426/regulation/23
- [S34] PECR reg. 31 and Schedule 1: https://www.legislation.gov.uk/uksi/2003/2426/regulation/31 and https://www.legislation.gov.uk/uksi/2003/2426/schedule/1
- [S35] Data Protection Act 2018 s.157: https://www.legislation.gov.uk/ukpga/2018/12/section/157

**Canada and Australia**
- [S36] Canada's Anti-Spam Legislation, S.C. 2010, c. 23 (current to 2026-10-29): https://laws-lois.justice.gc.ca/eng/acts/E-1.6/FullText.html
- [S37] Spam Act 2003 (Cth), Compilation No. 10, from https://www.legislation.gov.au/C2004A01214/latest/text; text: https://www.legislation.gov.au/C2004A01214/2016-03-10/2016-03-10/text/original/epub/OEBPS/document_1/document_1.html. The ACMA page https://www.acma.gov.au/avoid-sending-spam timed out.

**EU member states**
- [S38] Germany, UWG §7: https://www.gesetze-im-internet.de/uwg_2004/__7.html
- [S39] Netherlands, Telecommunicatiewet art. 11.7 (version 2026-08-15): https://wetten.overheid.nl/BWBR0009950/2026-08-15/#Hoofdstuk11_Paragraaf11.1_Artikel11.7

**Platforms**
- [S40] Discord Community Guidelines: https://discord.com/guidelines
- [S41] X Help Center, Authenticity and Automation rules. Direct fetch returned 403; the content is from search-result summaries only: https://help.x.com/en/rules-and-policies/authenticity and https://help.x.com/en/rules-and-policies/x-automation
- [S42] Instagram Community Guidelines, https://help.instagram.com/477434105621119. The page is rendered by JavaScript and was not readable; the wording comes from a search result pointing to an archived copy: https://www.lb7.uscourts.gov/documents/19-1861URL2communityguidelines.pdf
- [S43] YouTube Help, disclosing altered or synthetic content: https://support.google.com/youtube/answer/14328491

**Payments**
- [S44] Stripe, global availability: https://stripe.com/global
- [S45] Stripe, Bulgaria pricing: https://stripe.com/en-bg/pricing
- [S46] Stripe Docs, payouts: https://docs.stripe.com/payouts
- [S47] Stripe Docs, how disputes work: https://docs.stripe.com/disputes/how-disputes-work
- [S48] Stripe Docs, dispute prevention best practices: https://docs.stripe.com/disputes/prevention/best-practices
- [S49] Stripe Docs, dispute response best practices: https://docs.stripe.com/disputes/best-practices
- [S50] Stripe Docs, Checkout policies (terms-of-service consent): https://docs.stripe.com/payments/checkout/customization/policies; Payment Links customisation: https://docs.stripe.com/payment-links/customize
- [S51] PayPal Bulgaria, merchant fees. HTTP 403 on direct fetch; the figures come from a search-result summary and need checking: https://www.paypal.com/bg/business/paypal-business-fees
- [S52] Wise Business pricing, Bulgaria: https://wise.com/bg/pricing/business
- [S53] Payoneer pricing: https://www.payoneer.com/pricing/

**Marketplaces**
- [S54] Upwork Legal Center: User Agreement v8.2 (20 July 2026), Terms of Use v4.12 (10 Sept 2025), Optional Service Contract Terms v1.7 (21 Nov 2025), Fee and ACH Authorization v12.8, Freelancer Membership Agreement v5.7: https://www.upwork.com/legal
- [S55] Upwork Help, Freelancer Service Fee: https://support.upwork.com/hc/en-us/articles/211062538
- [S56] Upwork Help, How to get paid: https://support.upwork.com/hc/en-us/articles/211060918
- [S57] Upwork Help, Direct to Local Bank fees, limits and timing: https://support.upwork.com/hc/en-us/articles/211060578
- [S58] Upwork Help, Payoneer: https://support.upwork.com/hc/en-us/articles/211064008
- [S59] Upwork Help, wire transfers: https://support.upwork.com/hc/en-us/articles/211063898
- [S60] Upwork Help, Connects: https://support.upwork.com/hc/en-us/articles/211062898
- [S61] Fiverr Terms of Service (last update January 2026): https://www.fiverr.com/legal-portal/legal-terms/terms-of-service
- [S62] Fiverr Payment Terms of Service (last update October 2026): https://www.fiverr.com/legal-portal/legal-terms/payment-terms-of-service
- [S63] Fiverr Help, Using AI on Fiverr: https://help.fiverr.com/hc/en-us/articles/34998793899665-Using-AI-on-Fiverr-Guidelines-for-freelancers-and-clients

**IP materials**
- [S64] SIL Open Font License, official text: https://openfontlicense.org/open-font-license-official-text/
- [S65] Mixkit licences page. It lists separate "Free" and "Restricted" licences, whose terms load in pop-ups and were not readable: https://mixkit.co/license/
