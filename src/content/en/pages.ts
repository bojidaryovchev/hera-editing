import { CUSTOM_QUOTES, FOUNDING_OFFER, PAYMENT, longDate, usd } from "./packages";

/**
 * Copy for /en/pricing, /en/how-it-works and /en/work. Every number is the pricing data's (src/content/en/packages.ts),
 * and every rule repeats the terms (src/content/en/terms.ts) in plain words.
 */

export const EN_PRICING = {
  breadcrumb: "Pricing",
  hero: {
    eyebrow: "Pricing",
    title: "Fixed prices for remote video editing",
    lead: "Every package states what it includes, how much footage it is cut from, its turnaround in business days and its revision rounds. In US dollars, excluding VAT, for business clients.",
  },
  basics: {
    heading: "How our prices work",
    rows: [
      { label: "Currency", value: "US dollars, excluding VAT" },
      { label: "Clients", value: "Businesses only" },
      { label: "Payment", value: "Bank transfer, in advance" },
      { label: "Turnaround", value: "Business days from your start date" },
    ],
  },
  groupsHeading: "Packages",
  groupsLead: "Grouped by who they are for. Each package links to the order form with the package chosen.",
  addOns: {
    heading: "Add-ons",
    lead: "For anything a package does not cover. We agree every paid extra in writing before we do it.",
    columns: ["Add-on", "Price"],
  },
  custom: {
    heading: "Custom quotes",
    lead: "For work no package fits. The quote is in writing and fixed before we start.",
    whenHeading: "When we quote",
    howHeading: "How a quote is built",
    how: [
      "You describe the job on the order form: the footage, the finished length, the versions and who approves.",
      `We estimate the hours from the footage and the finished minutes, and add ${CUSTOM_QUOTES.revisionBufferPercent}% for revisions and ${CUSTOM_QUOTES.adminBufferPercent}% for admin.`,
      `The rate is ${usd(CUSTOM_QUOTES.rate)} an hour, or ${usd(CUSTOM_QUOTES.rateBrands)} for brands, ads, corporate and motion work. The smallest order is ${usd(CUSTOM_QUOTES.minimum)}.`,
      `You get the quote within ${CUSTOM_QUOTES.replyBusinessDays} business day. It is valid for ${CUSTOM_QUOTES.validDays} days.`,
    ],
    action: "Ask for a custom quote",
  },
  founding: {
    eyebrow: "Founding offer",
    heading: `${FOUNDING_OFFER.percent}% off your first order.`,
    text: `For our first ${FOUNDING_OFFER.clients} clients, or until ${longDate(FOUNDING_OFFER.until)}, whichever comes first. On your first order only, and it doesn't depend on a review or anything else.`,
  },
  payment: {
    heading: "Payment",
    items: [
      { title: "Packages", text: "Paid in full, in advance, by bank transfer against our invoice." },
      {
        title: "Custom quotes",
        text: `New clients pay ${PAYMENT.customDepositPercent}% before we start and the balance before we deliver the final files, after reviewing a watermarked preview.`,
      },
      { title: "Bank fees", text: "You pay your own bank's sending fees. No card payments yet." },
      {
        title: "Acceptance",
        text: `A delivery counts as accepted when you approve it, or after ${PAYMENT.acceptanceDays} days without revision notes.`,
      },
    ],
    termsLink: "Read the terms of service",
  },
  cta: {
    heading: "Found your package?",
    body: "Send your brief. We reply in writing within 1 business day with the exact price, including the founding discount if it applies, and your start date.",
  },
} as const;

export const EN_HOW = {
  breadcrumb: "How it works",
  hero: {
    eyebrow: "How it works",
    title: "Everything in writing, from the brief to the final files",
    lead: "Briefs come through a form, feedback as time-coded comments on a review link, and every message is short and specific. No calls, no surprises: the price, the start date and the delivery date are in writing before we begin.",
  },
  stepsHeading: "Four steps",
  clock: {
    heading: "The delivery clock",
    lead: "Every package states its turnaround in business days. This is how we count them.",
    items: [
      { title: "Business days", text: "Monday to Friday, excluding Bulgarian public holidays." },
      {
        title: "When it starts",
        text: "On the start date we confirm, once your footage, your complete brief and your payment are in.",
      },
      { title: "When it pauses", text: "While we wait for your answers, files or feedback." },
      { title: "Rush", text: "Only by written agreement, and only when a slot is free." },
    ],
  },
  zones: {
    heading: "Time zones",
    text: "We work from Bulgaria, on Eastern European Time: 2 hours ahead of London and, for most of the year, 7 hours ahead of New York. Our working day starts while it is still night in the US.",
    label: "A day in Bulgaria beside the same hours in London and New York",
    lanes: [
      { city: "Bulgaria", offset: 0, note: "Our working day" },
      { city: "London", offset: -2, note: "" },
      { city: "New York", offset: -7, note: "" },
    ],
    workStart: 9,
    workEnd: 17,
  },
  ai: {
    heading: "AI-assisted, human-edited",
    text: "AI tools do the first pass: transcripts, rough cuts, caption drafts and candidate moments. The editor makes every choice. Tell us if you don't want AI-generated visuals, voices or music, and we won't use them.",
  },
  cta: {
    heading: "Start with the brief.",
    body: "Choose a package and tell us about the footage. We reply in writing within 1 business day.",
  },
} as const;

export const EN_WORK = {
  breadcrumb: "Work samples",
  title: "Work samples",
  lead: "Edits by niche. Each sample says where its footage and music come from; a demo edit is our own edit of footage we have the right to use, not client work.",
  demoLabel: "Demo edit",
  clientLabel: "Client work",
  fixtureLabel: "Test data: a fictional sample",
  watch: { youtube: "Watch on YouTube", vimeo: "Watch on Vimeo" },
  opensNewTab: "(opens in a new tab)",
  footage: "Footage",
  music: "Music",
  permissions: "Permissions",
  cta: {
    heading: "Like what you see?",
    body: "Send your brief. We reply in writing within 1 business day with the exact price and your start date.",
  },
} as const;

/** The English 404 and error page (the Bulgarian design, NotFoundView and PageError). */
export const EN_NOT_FOUND = {
  title: "Page not found",
  text: "The address may be mistyped, or the page may have moved.",
  homeLink: "Go to the home page",
  linksHeading: "You may be looking for",
  visualLabel: "Missing clip",
  links: [
    { label: "Pricing", href: "/en/pricing" },
    { label: "How it works", href: "/en/how-it-works" },
    { label: "Order an edit", href: "/en/order" },
  ],
} as const;

export const EN_SERVER_ERROR = {
  title: "Something went wrong",
  text: "An unexpected error happened. Please try again in a moment.",
  retry: "Try again",
  homeLink: "Go to the home page",
} as const;
