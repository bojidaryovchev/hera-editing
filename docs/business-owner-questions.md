# Questions for the business owner

- **Date:** 2026-11-18.
- **What is left.** Everything that could be researched, written or built without the business owner's answers is
  done, except a few items that the spec review of 2026-11-18 found, mostly work for Claude
  ([spec-coverage.md](spec-coverage.md)). What remains for the business owner is below.
- **How to answer.** Each question has a recommendation, so a plain "ok" accepts it. Answers become decisions in
  [decisions.md](decisions.md), and then I update the site and the documents.

## A. To start selling remote editing

Nothing here needs the site to go live. The plan is in [strategy-remote-editing.md](strategy-remote-editing.md), and
the texts are in the [sales kit](sales-kit-remote-editing.md).

1. **The three first tests:** wedding editing for US and UK filmmakers, scripted or documentary YouTube, and US
   real-estate listings. Podcasts, talking heads, streams and agencies come later.
   *Recommended: ok.*
2. **Prices:** wedding full film $390, highlight from selects $380, teaser $160; YouTube story edit $520; listing video
   $120. Launch prices are 30% off until the first 5 reviews.
   *Recommended: ok.*
3. **Business clients only;** no couples or other consumers for now.
   *Recommended: ok.*
4. **Samples.** Will you make the 9 samples from the briefs in the sales kit §6? Do you film weddings yourself, or
   should we ask a Bulgarian wedding videographer for footage, with their and the couple's permission?
   *Recommended: the videographer, who can also be a partner for the core business.*
5. **Accounts.** Fiverr and YTJobs need your identity check. Open them in your own name now, or wait for the company?
   *Recommended: ask the accountant (question A1 below) first.*
6. **Tools.** Which editing software do you use? Is about $24–35 a month for Descript acceptable, for transcripts,
   rough cuts and captions?
   *Recommended: Descript only, at first.*
7. **Contracts.** Sign off the drafts in [contracts/](contracts/):
   - the English terms of service;
   - the data processing agreement;
   - the Bulgarian rights assignment (you to your company).

   *Recommended: ok as drafted. A lawyer's review is optional.*
8. **Raw-footage limits for the wedding full film, teaser and trio.** The plan sets a limit only for the highlight (up
   to 90 minutes of your selects), so for now the site shows only the finished lengths.
   *Suggested: full film from up to 4 hours of ceremony, speeches and first-dance footage, from up to 3 cameras;
   teaser from the same selects as the highlight.*
9. **Ending the founding offer** (30% off the first order, for the first 10 clients or until 31 March 2027). It ends
   on its date by itself; after 10 clients, someone has to switch it off.
   *Recommended: tell Claude when the 10th order arrives, and it is switched off on the site.*
10. **Sanctioned countries.** Should the English order form refuse countries under EU sanctions, such as Russia,
    Belarus, Iran and North Korea?
    *Recommended: yes, refuse them. A lawyer can confirm the exact list.*
11. **Samples as links or players.** The site links to samples on YouTube or Vimeo instead of embedding their players,
    so the pages set no third-party cookies.
    *Recommended: keep the links.*
12. **The second-wave packages** (podcasts, streams, talking heads, ads, agency hours) are listed on `/en/pricing`,
    because you asked not to restrict the offer.
    *Recommended: keep them listed, but take dialogue-heavy jobs only after a test edit on a sample.*
13. **Test orders on staging.** Until launch, hera-editing.com/en accepts test orders. They are not indexed, and
    their alerts go only to the log.
    *Recommended: ok.*

## B. To launch the Bulgarian site in production

From [release-checklist.md](release-checklist.md).

1. **The company:** legal name, ЕИК, address and VAT status, once it is registered. Until then the site hides every
   company field.
2. **The base city and filming radius.** They drive the FAQ's question 3, the Google Business Profile, the outreach
   list and the travel clause.
3. **The public contacts:** is contact@hera-editing.com the public email? Is there a phone number to publish?
4. **The forwarding address:** where should copies of new enquiries and of mail to contact@ go?
5. **The service terms** (decision 6):
   - a recommended first 3 months, then monthly with 1 month's notice;
   - 2 correction rounds;
   - one approver;
   - feedback within 7 days;
   - travel included within the radius.

   *Recommended: ok, and add the notice period to the site's wording.*
6. **The privacy notice.** Six of its nine sections are not written yet: the controller, the legal basis, the
   retention period, the processors, the visitors' rights and the privacy contact
   ([spec-coverage.md](spec-coverage.md) §1.1). Claude can draft all of it now, except the company details. Then:
   do you approve it yourself, or does a lawyer review it? The spec asked for a lawyer; decision L37 made a lawyer
   optional for the contract drafts only, so the notice needs its own answer. Also: how long do we keep enquiries
   that never became clients?
   *Recommended: let Claude draft it now, and decide about the lawyer once you have read it; keep such enquiries
   12 months.*
7. **Your own footage** for the home page, with releases and music rights: about 12 seconds horizontal and five short
   vertical clips. Until then the site shows designed frames, never stock footage.
8. **The team:** names, roles and photos for `/za-nas`.
   *Optional, but it is the cheapest proof.*
9. **Vercel Pro** ($20 per developer seat a month) before launch. Vercel's Terms of Service, §4 (updated 19 October
   2026): "You shall only use the Services under a Hobby plan for your personal or non-commercial use."
   *Recommended: yes.*
10. **Analytics:** none at launch, or a consent-based tool?
    *Recommended: none at launch.*
11. **Search Console:** verifying the site needs your Google account. It takes a few minutes, with my help.

## C. Business decisions for the Bulgarian line

From [strategy.md](strategy.md) §13.

1. **The first sectors:** restaurants and cafés, home improvement with showrooms, car dealers. Clinics come once there
   is proof; hotels come first if the base is on the coast.
   *Recommended: ok.*
2. **Prices for the first clients:** about €600 for 4 videos, €1,000–1,050 for 8, and from €1,300 for 12, excluding
   VAT. Comment replies as an add-on at €150–300.
   *Recommended: ok.*
3. **The pilot offer:** up to 3 pilots, 3 months, at a reduced price, in return for publishing the work. Never tied to
   a review.
   *Recommended: ok.*
4. **A free first consultation** as the main call to action, instead of „Поискайте оферта“.
   *Recommended: yes.*
5. **The 11 new FAQ answers** in strategy.md §4.3. They need your native proofread before they go on the site.
6. **When to publish "from" prices** on `/paketi`.
   *Recommended: after the first 3 pilots.*
7. **Your real costs.** How many hours does a shoot day take you, travel included, and how many does one edited video
   take? What does an hour of your work cost you, counting pay, social security, equipment and software? The spec
   sets prices from costs and a margin, not only from the market (spec product/01), and asks for three sample quotes
   at real costs before selling (handoff/02 §C.3). With your numbers, Claude works out those quotes and checks the
   margin of the prices in question 2.
   *Recommended: answer before the first quote, then measure the real hours on the pilots.*

## D. For the accountant (to bring along)

Find an accountant together with the company registration. Once the company is VAT-registered, it files a VAT return
and an EU sales declaration (VIES) every month, plus annual accounts and a tax return. The full list of questions is
in [research/08](research/08-remote-editing-research.md), Part 4 §8.

| # | Question | When |
|---|---|---|
| A1 | ЕООД or ЕТ? An ЕТ pays 15% on profit, an ЕООД about 14.5% on distributed profit with limited liability. Whose name do the Fiverr and Upwork accounts go in? | Before the first foreign purchase, gig or invoice |
| A2 | Does buying software or paying platform fees from abroad trigger VAT registration under ЗДДС art. 97а(1)? When should we register under art. 97а(2), before the first EU business client? | Before the first foreign purchase or gig |
| A3 | How do we track the €51,130 VAT threshold? Bulgarian filming and any sale to a consumer count toward it | Before the first sale |
| A6 | Is the site an "e-shop" under Наредба Н-18 if we take card payments? Until this is answered, payment is by bank transfer only | Before card payments |
| — | Voluntary VAT registration: worth it or not? | With A1–A3 |
