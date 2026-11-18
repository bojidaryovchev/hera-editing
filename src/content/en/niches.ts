import type { Niche } from "./packages";
import type { EnPageKey } from "./seo";

/**
 * The three niche pages (strategy §3's tests; research Part 3 §7.2): hero, what you get, the niche's packages from
 * the pricing data, process notes, questions, samples once real ones exist, and the order action. The copy adapts
 * the sales kit's gigs (docs/sales-kit-remote-editing.md §1) to "we"; prices and limits come from the data only.
 */
export type NichePage = {
  niche: Niche;
  path: string;
  seo: EnPageKey;
  breadcrumb: string;
  card: { title: string; text: string; link: string };
  hero: { eyebrow: string; title: string; lead: string; cta: string };
  /** The package the hero's action preselects on the order form. */
  leadPackage: string;
  panel: { heading: string; note: string };
  get: { heading: string; items: readonly string[] };
  need: { heading: string; items: readonly string[] };
  packagesHeading: string;
  packagesLead: string;
  notes: { heading: string; items: readonly { title: string; text: string }[] };
  samplesHeading: string;
  cta: { heading: string; body: string };
};

export const NICHE_PAGES: Record<Niche, NichePage> = {
  wedding: {
    niche: "wedding",
    path: "/en/wedding-editing",
    seo: "wedding",
    breadcrumb: "Wedding editing",
    card: {
      title: "Wedding films for filmmakers",
      text: "Highlights from your selects, documentary full films and teasers, cut in your style.",
      link: "Wedding editing",
    },
    hero: {
      eyebrow: "For wedding filmmakers and studios",
      title: "Wedding video editing for filmmakers",
      lead: "Send your footage and get back a finished film in your style. We edit highlights, documentary full films and teasers for filmmakers who want to shoot more and edit less: share your LUT, a past film you love and your music licence, and we match them.",
      cta: "Order a wedding edit",
    },
    leadPackage: "wedding-highlight",
    panel: { heading: "Wedding packages", note: "Turnaround in business days, from your start date." },
    get: {
      heading: "What you get",
      items: [
        "A story built around the vows and speeches, cut to your licensed music",
        "Colour matched to your look, a clean audio mix and titles",
        "16:9 masters, plus 9:16 versions of teasers for social media",
        "Two revision rounds, with time-coded comments on a review link",
      ],
    },
    need: {
      heading: "What we need from you",
      items: [
        "A link to your footage: your selects for a highlight",
        "The music track and its licence",
        "A past film, your LUT or grade notes",
        "The couple's names for the titles, and the key moments",
        "Your deadline",
      ],
    },
    packagesHeading: "Wedding packages",
    packagesLead: "For filmmakers and studios. Each film comes with two revision rounds.",
    notes: {
      heading: "How we work on weddings",
      items: [
        {
          title: "Selects or full footage",
          text: "The highlight is cut from your selects: up to 90 minutes of clips, plus the vows and speech audio. Culling the full footage is a custom quote, from $550.",
        },
        {
          title: "Your style, kept",
          text: "Send a past film, your LUT or grade notes, and the titles and fonts you use. We match them: the film stays yours.",
        },
        {
          title: "Music you have licensed",
          text: "Send the track and its licence. We don't supply or resell music licences.",
        },
        {
          title: "Notes on the review link",
          text: "You leave time-coded comments on the cut: one list per round, two rounds per film.",
        },
      ],
    },
    samplesHeading: "Wedding samples",
    cta: {
      heading: "More weddings than editing time?",
      body: "Send your footage and a short brief. We reply in writing within 1 business day with the exact price and your start date.",
    },
  },
  youtube: {
    niche: "youtube",
    path: "/en/youtube-editing",
    seo: "youtube",
    breadcrumb: "YouTube editing",
    card: {
      title: "YouTube story and documentary edits",
      text: "Story-driven, documentary and faceless videos, built from your script and voice-over.",
      link: "YouTube editing",
    },
    hero: {
      eyebrow: "For story, documentary and faceless channels",
      title: "YouTube video editor for story and documentary channels",
      lead: "Send your script, your voice-over and your footage, or tell us which stock to use, and we build the story: pacing, B-roll, motion text, sound design, music and colour, so viewers stay to the end.",
      cta: "Order a YouTube edit",
    },
    leadPackage: "youtube-story",
    panel: { heading: "YouTube packages", note: "Turnaround in business days, from your start date." },
    get: {
      heading: "What you get",
      items: [
        "An edit built from your script and timed to your voice-over",
        "B-roll, maps, motion text and sound design where the story needs them",
        "Licensed music and sound effects, from your library or royalty-free",
        "An SRT caption file",
        "Two revision rounds, with time-coded comments on a review link",
      ],
    },
    need: {
      heading: "What we need from you",
      items: [
        "Your script and the voice-over file",
        "A link to your footage, or the stock library to use",
        "2–3 videos whose style you like, with timestamps",
        "Your channel link",
        "Whether AI-generated visuals are allowed",
      ],
    },
    packagesHeading: "YouTube packages",
    packagesLead:
      "The Story edit is for scripted and documentary videos; the Talk edit and the monthly plan are for talking-head channels.",
    notes: {
      heading: "How we work on YouTube videos",
      items: [
        {
          title: "Your script, our cut",
          text: "You write the script and record the voice-over; we edit. We don't write scripts.",
        },
        {
          title: "Footage and stock",
          text: "B-roll comes from your footage or from licensed stock libraries. Tell us if your channel uses a specific one.",
        },
        {
          title: "Your channel's rules on AI",
          text: "AI tools help with transcripts and rough cuts; every creative choice is the editor's. If your channel doesn't allow AI-generated visuals, we don't use them.",
        },
        {
          title: "Longer videos",
          text: "A Story edit is up to 12 finished minutes from up to 3 hours of footage. Extra finished minutes are $40 each; more footage is a custom quote.",
        },
      ],
    },
    samplesHeading: "YouTube samples",
    cta: {
      heading: "Have a script ready?",
      body: "Send it with your footage or stock notes. We reply in writing within 1 business day with the exact price and your start date.",
    },
  },
  "real-estate": {
    niche: "real-estate",
    path: "/en/real-estate-editing",
    seo: "realEstate",
    breadcrumb: "Real-estate editing",
    card: {
      title: "Real-estate listing videos",
      text: "A property video and a vertical reel from your clips, branded and unbranded.",
      link: "Real-estate editing",
    },
    hero: {
      eyebrow: "For real-estate photographers and agents",
      title: "Real estate video editing for photographers and agents",
      lead: "Send your clips and get back a polished listing video and a vertical reel: stabilised, colour-corrected, cut to music and branded, with an unbranded version for listing sites that need one.",
      cta: "Order a listing video",
    },
    leadPackage: "listing-video",
    panel: { heading: "Listing packages", note: "Turnaround in business days, from your start date." },
    get: {
      heading: "What you get, for each listing",
      items: [
        "A 60–90 second property video in 16:9",
        "A vertical reel of up to 30 seconds for Instagram, TikTok and Shorts",
        "Stabilisation, colour correction, music sync, and agent branding with captions",
        "Branded and unbranded versions",
      ],
    },
    need: {
      heading: "What we need from you",
      items: [
        "A link to your clips: up to 150 clips or 20 GB per listing",
        "The address or listing name, for the titles",
        "The room order or a floor plan, if you have one",
        "The agent's logo and contact line",
        "Your music, if you have it",
      ],
    },
    packagesHeading: "Listing packages",
    packagesLead: "One listing at a time, or ten prepaid. One revision round per listing.",
    notes: {
      heading: "How we work on listings",
      items: [
        {
          title: "2 business days",
          text: "Listing videos are delivered 2 business days from your start date. A next-business-day rush is possible only when a slot is free: ask before you order.",
        },
        {
          title: "A natural walk-through",
          text: "Send the room order or a floor plan if you have one; otherwise we follow a natural walk-through.",
        },
        {
          title: "Branded and unbranded",
          text: "Every listing comes in two versions: with your logo and agent details, and without, for sites that don't allow branding.",
        },
        {
          title: "Music and drone footage",
          text: "Your music, or royalty-free music from a library whose licence covers your use. Drone footage is welcome.",
        },
      ],
    },
    samplesHeading: "Real-estate samples",
    cta: {
      heading: "A listing to shoot this week?",
      body: "Send your clips and the listing details. We reply in writing within 1 business day with the exact price and your start date.",
    },
  },
};

export const NICHE_ORDER: readonly Niche[] = ["wedding", "youtube", "real-estate"];

export const NICHE_LABELS = {
  breadcrumbHome: "Home",
  allPrices: "See every price",
  orderPackage: "Order",
  turnaround: "Turnaround",
  revisions: "Revisions",
  footage: "Footage",
  length: "Length",
  validity: "Validity",
  includes: "What's included",
  extras: "Extras",
  wave2: "Also available",
  howItWorks: "How it works",
} as const;
