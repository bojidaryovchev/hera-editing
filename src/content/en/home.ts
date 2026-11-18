/**
 * /en, the offer home (strategy §7, research Part 3 §7.2): the promise, the three niches, how it works, prices from,
 * "no calls needed", a few questions and the order action. Lead copy from the sales kit, in "we" (decision L37).
 * The hero's review link is an example and says so; nothing here is a client, a result or a number we don't have.
 */
export const EN_HOME = {
  hero: {
    eyebrow: "Remote video editing for creators and filmmakers",
    titleLead: "We edit while you sleep.",
    titleRest: "Everything in writing.",
    lead: "Send your footage and a written brief. We edit wedding films for filmmakers, story and documentary videos for YouTube channels, and listing videos for real-estate photographers, at fixed, published prices. AI-assisted, human-edited.",
    secondaryCta: "See the prices",
    /** The hero's panel: one review link with time-coded comments (an example, labelled). */
    review: {
      label: "Example: a review link with three time-coded comments, then the cut approved",
      title: "Review link",
      version: "Cut 1",
      example: "Example",
      comments: [
        { at: "00:42", text: "Hold the vows shot two beats longer." },
        { at: "01:18", text: "Use the licensed version of the song here." },
        { at: "02:05", text: "Fade the speech out under the music." },
      ],
      round: "Round 1 of 2 · 3 notes",
      approved: "Approved",
      duration: "03:20",
    },
  },
  niches: {
    heading: "What we edit",
    lead: "Three kinds of edit, each with its own page, prices and samples. The pricing page lists everything else we edit.",
    fromLabel: "From",
  },
  how: {
    heading: "How it works",
    note: "Four steps, all in writing. No calls to schedule.",
  },
  prices: {
    heading: "Prices from",
    lead: "Fixed prices in US dollars, excluding VAT, for business clients. Every package states its footage limit, its turnaround in business days and its revision rounds.",
    /** The examples shown, by package id (strategy §1's first-wave examples). */
    ids: ["wedding-teaser", "wedding-highlight", "wedding-full-film", "youtube-story", "listing-video"],
    more: "Every package and add-on",
  },
  noCalls: {
    heading: "No calls needed.",
    text: "Everything happens in writing: the brief, the questions, the feedback and the delivery. Every decision stays on record, and nothing waits for a meeting.",
    points: [
      { title: "The brief", text: "Through the order form, with your footage link and references." },
      { title: "Questions", text: "Short and specific, by email." },
      { title: "Feedback", text: "Time-coded comments, right on the review link." },
      { title: "Delivery", text: "The final files by link, with a note of what changed." },
    ],
  },
  samples: {
    heading: "Samples",
    more: "All samples",
  },
  faqMore: "Every question",
  cta: {
    heading: "Ready when your footage is.",
    body: "Send your brief. We reply in writing within 1 business day with the exact price and your start date.",
  },
} as const;

/** The four steps (home and How it works). */
export const EN_STEPS = [
  {
    id: "brief",
    title: "Brief",
    you: "Fill in the order form: the package, your footage link, references with timestamps and anything that must or must not appear.",
    we: "Reply in writing within 1 business day with the exact price and your start date.",
  },
  {
    id: "upload",
    title: "Upload",
    you: "Share your footage by link and pay our invoice by bank transfer.",
    we: "Start on the confirmed date. The delivery clock starts then, once your footage, brief and payment are in.",
  },
  {
    id: "review",
    title: "Review link",
    you: "Watch the cut and leave time-coded comments on the video: one consolidated list per round.",
    we: "Make the changes and send the next cut, with a short list of what changed.",
  },
  {
    id: "delivery",
    title: "Delivery",
    you: "Approve the final cut.",
    we: "Deliver the final files in the formats your package lists, within its business days.",
  },
] as const;

export const EN_STEP_LABELS = { step: "Step", you: "You", we: "We" } as const;
