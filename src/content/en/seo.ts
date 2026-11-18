import type { PageSeo } from "@/content/seo";

/**
 * Titles and descriptions of the English pages, rendered as "<title> | {Brand}". The niche titles target the
 * queries in docs/research/08 Part 3 §7.2 ("wedding video editing", "youtube video editor for hire", "real estate
 * video editing"). Descriptions: 120–165 characters, no guarantees, no invented numbers (prices are the data's).
 */
export const EN_SEO = {
  home: {
    title: "Remote video editing for filmmakers and creators",
    description:
      "Wedding films, YouTube story edits and real-estate videos, edited remotely at fixed prices in USD. Everything in writing: the brief, the review link, the delivery.",
  },
  wedding: {
    title: "Wedding video editing for filmmakers",
    description:
      "Wedding highlights from your selects, documentary full films and teasers, cut in your style for filmmakers and studios. Fixed prices, two revision rounds.",
  },
  youtube: {
    title: "YouTube video editor for hire: story and documentary edits",
    description:
      "Story-driven, documentary and faceless YouTube videos, edited from your script and voice-over. A fixed price per video and two revision rounds, all in writing.",
  },
  realEstate: {
    title: "Real estate video editing for photographers and agents",
    description:
      "Listing videos and vertical reels from your clips: stabilised, colour-corrected and branded, with an unbranded version. Delivered in 2 business days.",
  },
  pricing: {
    title: "Video editing prices: fixed packages in USD",
    description:
      "Every package with its price, footage limit, turnaround in business days and revision rounds, plus the add-ons, how custom quotes work and the founding offer.",
  },
  how: {
    title: "How remote video editing works",
    description:
      "From the written brief to the review link and the final files: how ordering, payment, revisions, turnaround, time zones and AI-assisted editing work with us.",
  },
  order: {
    title: "Order an edit",
    description:
      "Send your brief: the package, a link to your footage and your notes. We reply in writing within 1 business day with the exact price and your start date.",
  },
  work: {
    title: "Work samples",
    description:
      "Edits by niche: weddings, YouTube and real estate. Every sample says where its footage and music come from, and demo edits are labelled as demo edits.",
  },
  terms: {
    title: "Terms of service",
    description:
      "The terms for editing ordered through our English pages: business clients only, delivery in business days, revisions, payment, cancellation and rights.",
  },
  privacy: {
    title: "Privacy notice",
    description:
      "How the order form's data is handled: what we collect, what we use it for, which providers process it (Vercel, Neon and Resend) and how to ask us about it.",
  },
  cookies: {
    title: "Cookies and settings",
    description:
      "What the site stores in your browser, which cookies are necessary, and how to change your analytics choice at any time without losing anything you typed.",
  },
} as const satisfies Record<string, PageSeo>;

export type EnPageKey = keyof typeof EN_SEO;

export const EN_NOT_FOUND_TITLE = "Page not found";
