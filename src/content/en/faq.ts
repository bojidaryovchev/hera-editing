import type { FaqItem } from "@/content/faq";
import { ADD_ONS, CUSTOM_QUOTES, FOUNDING_OFFER, PAYMENT, longDate, usd } from "./packages";

/**
 * The English FAQ (decision L38). The niche answers adapt the sales kit's gig FAQs (docs/sales-kit-remote-editing.md
 * §1) from "I" to "we"; the general ones follow the terms (src/content/en/terms.ts) and take every number from the
 * pricing data, so an answer can never quote a different price, round or date than the pricing page.
 */

const addOn = (id: string) => ADD_ONS.find((a) => a.id === id)?.price ?? "";

export const EN_FAQ: Record<string, FaqItem> = {
  calls: {
    id: "calls",
    q: "Do we need a call?",
    a: "No. Everything happens in writing: the brief through the order form, questions and answers by email, and feedback as time-coded comments on the review link. We don't hold calls, so every decision stays on record.",
  },
  turnaround: {
    id: "turnaround",
    q: "How long does an edit take?",
    a: "Every package states its delivery time in business days, Monday to Friday, excluding Bulgarian public holidays. The clock starts on the start date we confirm, once your footage, your brief and your payment are in, and it pauses while we wait for your answers or files.",
  },
  rush: {
    id: "rush",
    q: "Can you deliver faster?",
    a: `Sometimes. A rush costs ${addOn("rush")} and is possible only when a slot is free, so ask before you order. Listing videos can be delivered the next business day on the same terms.`,
  },
  revisions: {
    id: "revisions",
    q: "How do revisions work?",
    a: `Each round is one consolidated list of time-coded notes, left on the review link. Your package says how many rounds it includes; an extra round is ${addOn("revision")}. A new direction after you approve a cut is new work, which we quote separately.`,
  },
  files: {
    id: "files",
    q: "How do I send my footage?",
    a: "Share a link from Google Drive, Dropbox, WeTransfer or the service you already use, in the order form or in your answer to our confirmation. Nothing is uploaded to this site.",
  },
  delivery: {
    id: "delivery",
    q: "What do I get back?",
    a: "The final files your package lists, by download link. Project files and raw footage are not included unless we agree it in writing. We keep the final files for 30 days after delivery.",
  },
  payment: {
    id: "payment",
    q: "How do I pay?",
    a: `By bank transfer, against our invoice, in advance: packages in full before we start. For a custom quote, new clients pay ${PAYMENT.customDepositPercent}% before we start and the balance before we deliver the final files, after reviewing a watermarked preview. We don't take card payments yet.`,
  },
  vat: {
    id: "vat",
    q: "Do your prices include VAT?",
    a: "No. Prices are in US dollars and exclude VAT. We work with businesses only: when you order, you confirm that you are ordering for your business, and we may ask for a business name, a registration or VAT number, or your website.",
  },
  eu: {
    id: "eu",
    q: "Can businesses in the EU order?",
    a: "Businesses in Bulgaria can. We can't take orders from businesses in other EU countries yet.",
  },
  refunds: {
    id: "refunds",
    q: "What if I cancel?",
    a: "Before the start date, you get a full refund, less bank fees. After work has started, we charge for the work done: 50% of the price until the first cut is delivered, and 100% after it, and refund the rest. If we can't deliver, you get a full refund.",
  },
  timezone: {
    id: "timezone",
    q: "Where are you, and when do you work?",
    a: "In Bulgaria, on Eastern European Time: 2 hours ahead of London and, for most of the year, 7 hours ahead of New York. Our working day starts while it is still night in the US. Delivery dates are still the package's business days.",
  },
  music: {
    id: "music",
    q: "Who supplies the music?",
    a: "You do, with its licence, or we use a track from a royalty-free library whose licence covers your use. We don't sell or resell music licences, and copyright claims over material you supplied are yours to handle.",
  },
  ai: {
    id: "ai",
    q: "Do you use AI?",
    a: "AI-assisted, human-edited: AI tools do the first pass, such as transcripts, rough cuts, caption drafts and candidate moments, and a human editor makes every editing decision. If you don't want AI-generated visuals, voices or music, we don't use them. We never use your footage to train AI models.",
  },
  rights: {
    id: "rights",
    q: "Who owns the finished edit?",
    a: "Once you've paid in full, you get the exclusive, worldwide right to use the final deliverables. For clients in the United States, they are works made for hire as far as the law allows. We show your work in our portfolio only if you allow it in writing.",
  },
  founding: {
    id: "founding",
    q: "Is there a discount for new clients?",
    a: `Yes: ${FOUNDING_OFFER.percent}% off your first order, for our first ${FOUNDING_OFFER.clients} clients or until ${longDate(FOUNDING_OFFER.until)}, whichever comes first. It doesn't depend on a review or anything else.`,
  },
  custom: {
    id: "custom",
    q: "What if my job doesn't fit a package?",
    a: `Send it as a custom quote. We reply within ${CUSTOM_QUOTES.replyBusinessDays} business day with a fixed price, from ${usd(CUSTOM_QUOTES.rate)} an hour of editing (${usd(CUSTOM_QUOTES.rateBrands)} for brands, ads, corporate and motion work), and the quote is valid for ${CUSTOM_QUOTES.validDays} days.`,
  },

  // --- Weddings (sales kit, gig 1) --------------------------------------------------------------------------------
  "wedding-selects": {
    id: "wedding-selects",
    q: "Do you cut from all my footage or from selects?",
    a: "The highlight is cut from your selected clips: up to 90 minutes of them, plus the vows and speech audio. Culling your full, unculled footage is a custom quote, from $550.",
  },
  "wedding-music": {
    id: "wedding-music",
    q: "Who provides the music?",
    a: "You do: please send the track and its licence. We don't supply or resell music licences.",
  },
  "wedding-style": {
    id: "wedding-style",
    q: "Can you match my style?",
    a: "Yes. Send a past film, your LUT or grade notes, and any titles or fonts you use.",
  },
  "wedding-revisions": {
    id: "wedding-revisions",
    q: "How do revisions work?",
    a: "Each round is one list of time-coded notes on the review link. Two rounds are included.",
  },
  "wedding-couples": {
    id: "wedding-couples",
    q: "Do you work with couples directly?",
    a: "No. Our wedding service is for filmmakers and studios.",
  },

  // --- YouTube (sales kit, gig 2) ---------------------------------------------------------------------------------
  "youtube-script": {
    id: "youtube-script",
    q: "Do you write the script?",
    a: "No. You send the script and the voice-over; we edit the video.",
  },
  "youtube-broll": {
    id: "youtube-broll",
    q: "Can you find the B-roll?",
    a: "Yes, from your footage or licensed stock libraries. Tell us if your channel uses a specific library.",
  },
  "youtube-thumbnails": {
    id: "youtube-thumbnails",
    q: "Do you make thumbnails?",
    a: `Yes, as an add-on: ${addOn("thumbnail")} per thumbnail.`,
  },
  "youtube-length": {
    id: "youtube-length",
    q: "What if my video is longer than 12 minutes?",
    a: "A Story edit covers up to 12 finished minutes, from up to 3 hours of raw footage. Each extra finished minute is $40, and more footage than that is a custom quote. We confirm the price in writing before we start.",
  },
  "youtube-ai": {
    id: "youtube-ai",
    q: "Can you avoid AI-generated visuals?",
    a: "Yes. If your channel does not allow them, we don't use them. AI tools help only with transcripts and rough cuts; every creative choice is the editor's.",
  },

  // --- Real estate (sales kit, gig 3) -----------------------------------------------------------------------------
  "re-branding": {
    id: "re-branding",
    q: "Can you add our logo and agent details?",
    a: "Yes, send them with the order. You get a branded and an unbranded version.",
  },
  "re-script": {
    id: "re-script",
    q: "Do you need a script?",
    a: "No. Send the room order or a floor plan if you have one; otherwise we follow a natural walk-through.",
  },
  "re-nextday": {
    id: "re-nextday",
    q: "Can you deliver the next day?",
    a: `Only when a slot is free, as a paid rush (${addOn("rush")}). Ask before you order: the standard is 2 business days.`,
  },
  "re-music": {
    id: "re-music",
    q: "Can we use our own music?",
    a: "Yes: your music, or royalty-free music from a library whose licence covers your use. Drone footage is welcome too.",
  },
};

export const EN_FAQ_HEADING = "Questions and answers";

/** Which questions each page shows. How it works shows every general question. */
export const EN_FAQ_SETS = {
  home: ["calls", "turnaround", "revisions", "payment", "music", "ai"],
  how: [
    "calls",
    "files",
    "turnaround",
    "rush",
    "revisions",
    "delivery",
    "payment",
    "vat",
    "eu",
    "refunds",
    "timezone",
    "music",
    "ai",
    "rights",
    "custom",
    "founding",
  ],
  wedding: ["wedding-selects", "wedding-music", "wedding-style", "wedding-revisions", "wedding-couples", "calls"],
  youtube: ["youtube-script", "youtube-broll", "youtube-thumbnails", "youtube-length", "youtube-ai", "calls"],
  "real-estate": ["re-branding", "re-script", "re-nextday", "re-music", "calls", "payment"],
} as const;

export function faqItems(ids: readonly string[]): FaqItem[] {
  return ids.map((id) => EN_FAQ[id]).filter((x): x is FaqItem => Boolean(x));
}
