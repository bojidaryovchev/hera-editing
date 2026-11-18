/**
 * The English section's packages and prices (decision L38): the ONE source of every number the /en pages, the order
 * form and the owner's alert show. Prices, turnaround and revisions are docs/strategy-remote-editing.md §5, exactly
 * (both waves); inclusions and limits are docs/research/08 Part 2 §6.2–6.6; add-ons are §6.7; custom quotes §6.8.
 * They are the plan's proposals until the business owner changes them (decision 6). In US dollars, excluding VAT,
 * for business clients only.
 */

export type Customer = "wedding" | "youtube" | "real-estate" | "podcast" | "streamer" | "ads" | "white-label";

/** The three test niches have their own pages and order-form fields; the rest are on the pricing page only. */
export type Niche = "wedding" | "youtube" | "real-estate";

export type Turnaround = {
  /** Business days from the start date (Monday to Friday, excluding Bulgarian public holidays). */
  days: number;
  /** The top of a range ("2–3 business days"). */
  maxDays?: number;
  /** What the days count ("per video") or a condition ("next business day as a paid rush, only when a slot is free"). */
  note?: string;
};

export type EnPackage = {
  /** Stable id: the order form's `?package=` value and the stored order's package. */
  id: string;
  customer: Customer;
  /** 1: the first tests (strategy §3); 2: the second wave. Both are on sale (strategy §5). */
  wave: 1 | 2;
  name: string;
  summary: string;
  /** USD, excluding VAT. */
  price: number;
  /** Shown after the price: "$95 per episode", "$1,190 a month". */
  unit?: "episode" | "month";
  includes: readonly string[];
  /** At least one: the raw footage it is cut from, the finished length, or how long a prepaid pack is valid. */
  limits: { footage?: string; length?: string; validity?: string };
  turnaround: Turnaround;
  revisions: string;
};

export type CustomerGroup = { id: Customer; name: string; lead: string; niche: Niche | null };

/** The groups, in the order the pricing page shows them (strategy §5's tables, first wave first). */
export const CUSTOMERS: readonly CustomerGroup[] = [
  {
    id: "wedding",
    name: "Wedding filmmakers",
    lead: "Highlights, full films and teasers from your footage, cut in your style.",
    niche: "wedding",
  },
  {
    id: "youtube",
    name: "YouTube channels",
    lead: "Story, documentary and talking-head videos, built from your script or notes.",
    niche: "youtube",
  },
  {
    id: "real-estate",
    name: "Real-estate photographers",
    lead: "Listing videos and vertical reels from your clips, branded and unbranded.",
    niche: "real-estate",
  },
  {
    id: "podcast",
    name: "Podcasters",
    lead: "Audio and video episodes, with vertical clips for social media.",
    niche: null,
  },
  {
    id: "streamer",
    name: "Streamers",
    lead: "YouTube highlight videos and clip packs from your VODs.",
    niche: null,
  },
  {
    id: "ads",
    name: "Brands and agencies",
    lead: "Ad creative from your footage or UGC: a master, hooks and every format.",
    niche: null,
  },
  {
    id: "white-label",
    name: "Agencies",
    lead: "Prepaid white-label editing hours for your overflow work.",
    niche: null,
  },
];

const ROUNDS_2 = "2 rounds";
const ROUND_1 = "1 round";

export const PACKAGES: readonly EnPackage[] = [
  // --- Wedding filmmakers (first wave) --------------------------------------------------------------------------
  {
    id: "wedding-full-film",
    customer: "wedding",
    wave: 1,
    name: "Full film",
    summary: "A documentary edit of the wedding day.",
    price: 390,
    includes: [
      "The ceremony, the speeches and the first dance",
      "Multicam sync and an audio mix",
      "Light colour and titles",
    ],
    limits: { length: "Up to 60 min finished" },
    turnaround: { days: 7 },
    revisions: ROUNDS_2,
  },
  {
    id: "wedding-highlight",
    customer: "wedding",
    wave: 1,
    name: "Highlight from selects",
    summary: "A highlight film cut from the clips you selected.",
    price: 380,
    includes: [
      "A story built around the vows and speeches",
      "Cut to your licensed music",
      "Colour grade: your LUT or ours",
      "Sound design",
    ],
    limits: {
      footage: "Up to 90 min of your selected clips, plus the vows and speech audio",
      length: "4–6 min finished",
    },
    turnaround: { days: 7 },
    revisions: ROUNDS_2,
  },
  {
    id: "wedding-teaser",
    customer: "wedding",
    wave: 1,
    name: "Teaser",
    summary: "A short teaser for social media.",
    price: 160,
    includes: ["The best moments, cut to your music", "16:9 and 9:16 versions"],
    limits: { length: "60–90 s finished" },
    turnaround: { days: 4 },
    revisions: ROUNDS_2,
  },
  {
    id: "wedding-trio",
    customer: "wedding",
    wave: 1,
    name: "Trio",
    summary: "The highlight from selects, the full film and the teaser.",
    price: 860,
    includes: ["Highlight from selects", "Full film", "Teaser"],
    limits: { length: "Each film as in its own package" },
    turnaround: { days: 10 },
    revisions: "2 rounds per film",
  },

  // --- YouTube channels (the Story edit is the first wave; Talk and Monthly the second) ---------------------------
  {
    id: "youtube-story",
    customer: "youtube",
    wave: 1,
    name: "Story edit",
    summary: "A vlog, documentary or scripted video.",
    price: 520,
    includes: [
      "Structure from your script or notes",
      "B-roll, motion text and sound design",
      "A colour grade",
      "An SRT caption file",
    ],
    limits: { footage: "Up to 3 h of raw footage", length: "Up to 12 min finished" },
    turnaround: { days: 5 },
    revisions: ROUNDS_2,
  },
  {
    id: "youtube-talk",
    customer: "youtube",
    wave: 2,
    name: "Talk edit",
    summary: "A talking-head, commentary or tutorial video.",
    price: 280,
    includes: [
      "A transcript-based rough cut: retakes and silences out",
      "Pacing and punch-ins",
      "Simple text and graphics",
      "Up to 10 B-roll inserts, yours or licensed stock",
      "Music, sound effects, audio clean-up and basic colour",
      "An SRT caption file",
    ],
    limits: { footage: "Up to 60 min of raw footage", length: "Up to 15 min finished" },
    turnaround: { days: 3 },
    revisions: ROUNDS_2,
  },
  {
    id: "youtube-monthly",
    customer: "youtube",
    wave: 2,
    name: "YouTube monthly",
    summary: "Four Talk edits and eight Shorts every month.",
    price: 1190,
    unit: "month",
    includes: ["4 Talk edits", "8 Shorts cut from them, in 9:16 with captions"],
    limits: { footage: "Each video as in the Talk edit" },
    turnaround: { days: 3, note: "per video" },
    revisions: "2 rounds per video; 1 per batch of Shorts",
  },

  // --- Real-estate photographers (first wave) -------------------------------------------------------------------
  {
    id: "listing-video",
    customer: "real-estate",
    wave: 1,
    name: "Listing video",
    summary: "A property video and a vertical reel.",
    price: 120,
    includes: [
      "A 60–90 s property video in 16:9",
      "A vertical reel of up to 30 s, with captions",
      "Stabilisation, colour and music sync",
      "Agent branding",
      "Branded and unbranded versions",
    ],
    limits: { footage: "Up to 150 clips or 20 GB", length: "60–90 s, plus a reel of up to 30 s" },
    turnaround: { days: 2, note: "next business day as a paid rush, only when a slot is free" },
    revisions: ROUND_1,
  },
  {
    id: "listing-10-pack",
    customer: "real-estate",
    wave: 1,
    name: "Listing 10-pack",
    summary: "Ten listing videos, paid in advance.",
    price: 1080,
    includes: ["10 listing videos, each as in the Listing video package"],
    limits: { footage: "Each listing as in the Listing video", validity: "Valid for 90 days" },
    turnaround: { days: 2, note: "per listing" },
    revisions: "1 round per listing",
  },

  // --- Podcasters (second wave) ---------------------------------------------------------------------------------
  {
    id: "podcast-audio",
    customer: "podcast",
    wave: 2,
    name: "Audio episode",
    summary: "An edited and mastered audio episode.",
    price: 95,
    unit: "episode",
    includes: [
      "Noise and echo clean-up, levels and loudness",
      "A content edit to your written notes",
      "Light filler and silence trimming, checked by ear",
      "Intro, outro and music beds",
      "MP3 and WAV files",
    ],
    limits: { length: "Up to 60 min" },
    turnaround: { days: 2 },
    revisions: ROUND_1,
  },
  {
    id: "podcast-video",
    customer: "podcast",
    wave: 2,
    name: "Video episode + 3 clips",
    summary: "A multicam video episode and three vertical clips.",
    price: 260,
    unit: "episode",
    includes: [
      "Multicam switching, corrected by hand",
      "Audio clean-up and a content edit",
      "Your intro, outro and lower thirds",
      "Chapters and an audio-only MP3",
      "3 vertical clips of up to 60 s, with captions",
    ],
    limits: { footage: "Up to 3 cameras or remote tracks", length: "Up to 60 min" },
    turnaround: { days: 3 },
    revisions: "1 round on the episode; 1 on the clips",
  },
  {
    id: "podcast-monthly",
    customer: "podcast",
    wave: 2,
    name: "Podcast monthly",
    summary: "Four video episodes with three clips each, every month.",
    price: 940,
    unit: "month",
    includes: ["4 video episodes + 3 clips each"],
    limits: { footage: "Each episode as in the Video episode + 3 clips" },
    turnaround: { days: 3, note: "per episode" },
    revisions: "1 round on each episode; 1 on its clips",
  },

  // --- Streamers (second wave) ----------------------------------------------------------------------------------
  {
    id: "stream-clip-pack",
    customer: "streamer",
    wave: 2,
    name: "Clip Pack 10",
    summary: "Ten vertical clips from one stream.",
    price: 170,
    includes: [
      "10 vertical clips of up to 60 s",
      "An AI first pass, then human selection",
      "Facecam and gameplay layout",
      "Styled, proofread captions, zooms and sound effects",
      "A hook title and suggested post titles",
      "1080×1920 MP4 files",
    ],
    limits: { footage: "One VOD of up to 4 h, or your own Twitch or Kick clips" },
    turnaround: { days: 2 },
    revisions: ROUND_1,
  },
  {
    id: "stream-highlight",
    customer: "streamer",
    wave: 2,
    name: "Highlight video",
    summary: "A YouTube highlight video from one stream.",
    price: 270,
    includes: [
      "One 10–15 min YouTube video in 16:9",
      "A story cut and zooms",
      "Memes and sound effects from a licensed library",
      "On-screen text and a chapter list",
      "Loudness-normalised audio",
    ],
    limits: { footage: "A VOD of up to 4 h", length: "10–15 min finished" },
    turnaround: { days: 3 },
    revisions: ROUNDS_2,
  },
  {
    id: "stream-monthly",
    customer: "streamer",
    wave: 2,
    name: "Streamer monthly",
    summary: "Four highlight videos and 30 clips every month.",
    price: 1390,
    unit: "month",
    includes: [
      "4 highlight videos and 30 clips, from the same VODs",
      "A shared board for VOD links and notes",
      "Month to month",
    ],
    limits: { footage: "Each video and clip as in its own package" },
    turnaround: { days: 3, note: "per highlight video; clips in weekly batches" },
    revisions: "2 rounds per highlight video; 1 per batch of clips",
  },

  // --- Brands and agencies (second wave) ------------------------------------------------------------------------
  {
    id: "ad-pack",
    customer: "ads",
    wave: 2,
    name: "Ad pack",
    summary: "One master ad, four hooks, every format.",
    price: 420,
    includes: [
      "One master ad of 15–45 s, from your footage or UGC",
      "4 hook variations",
      "Each of the 5 versions in 9:16, 4:5 and 16:9: 15 files",
      "Burned-in captions and platform safe zones",
      "Music from your licence or a royalty-free library",
    ],
    limits: { length: "A master of 15–45 s" },
    turnaround: { days: 3 },
    revisions: "2 rounds on the master; 1 on the variations",
  },
  {
    id: "ad-monthly",
    customer: "ads",
    wave: 2,
    name: "Ad monthly",
    summary: "Three ad packs every month.",
    price: 1150,
    unit: "month",
    includes: ["3 ad packs"],
    limits: { length: "Each pack as in the Ad pack" },
    turnaround: { days: 3, note: "per pack" },
    revisions: "2 rounds on each master; 1 on its variations",
  },

  // --- Agencies: white-label hours (second wave) ----------------------------------------------------------------
  ...(
    [
      [10, 450],
      [20, 840],
      [40, 1560],
    ] as const
  ).map(([hours, price]): EnPackage => ({
    id: `white-label-${hours}`,
    customer: "white-label",
    wave: 2,
    name: `White-label hours: ${hours} h`,
    summary: `${hours} hours of prepaid editing time.`,
    price,
    includes: [
      "Unbranded delivery",
      "An NDA, if you need one",
      "Written briefs and review links only",
      "Time logged in 15-minute steps",
    ],
    limits: { footage: "Jobs of up to 4 h each", validity: "Valid for 60 days" },
    turnaround: { days: 2, maxDays: 3, note: "per job of up to 4 h" },
    revisions: "Revisions come out of the hours",
  })),
];

/**
 * Extras that belong to one customer group (research Part 2 §6.2–6.6, "beyond scope"), shown under its packages.
 * The general add-ons follow in ADD_ONS.
 */
export const GROUP_EXTRAS: Partial<Record<Customer, readonly string[]>> = {
  wedding: [
    "A highlight from your full, unculled footage: a custom quote, from $550",
    "An extra version of a reel: $40",
    "A drone-only edit: $60",
  ],
  "real-estate": ["An extra version of a reel: $40", "A drone-only edit: $60"],
  podcast: ["Show notes, or a proofread transcript: $25 each"],
  streamer: [
    "A highlight video longer than 15 min: +$15 a minute",
    "Copyrighted music in a VOD is muted or replaced, never cleared",
  ],
  ads: ["Voice-over, actors and music licences are yours to supply"],
};

export type AddOn = { id: string; name: string; price: string; note?: string };

/** Add-ons (research Part 2 §6.7), for any package. Agreed in writing before we do the work. */
export const ADD_ONS: readonly AddOn[] = [
  {
    id: "revision",
    name: "Extra revision round",
    price: "15% of the package price, at least $25",
    note: "Beyond the rounds your package includes.",
  },
  {
    id: "raw-footage",
    name: "Extra raw footage",
    price:
      "Streams: $25 per extra hour. Talk edits and podcasts: $20 per extra 30 min. Weddings and events: $30 per extra hour.",
  },
  {
    id: "finished-length",
    name: "Extra finished length",
    price: "Talk edit: $15 a minute. Story edit: $40 a minute. Podcasts: $30 (audio) or $50 (video) per 30 min.",
  },
  { id: "clip", name: "Extra vertical clip from the same source", price: "$18" },
  {
    id: "variations",
    name: "Extra hook, new body variation, extra aspect ratio",
    price: "$35, $90 and $15",
  },
  { id: "thumbnail", name: "Thumbnail", price: "$45" },
  {
    id: "captions",
    name: "Burned-in captions on long-form video",
    price: "$2 per finished minute",
    note: "SRT caption files are included in the YouTube and podcast packages.",
  },
  { id: "subtitles", name: "Translated subtitles", price: "Custom quote" },
  {
    id: "rush",
    name: "Rush delivery",
    price: "+40%",
    note: "Only when a slot is free, and agreed in writing before you order.",
  },
  { id: "weekend", name: "Weekend delivery", price: "+25%" },
];

/** Custom quotes (strategy §5, research Part 2 §6.8). */
export const CUSTOM_QUOTES = {
  when: [
    "Corporate and event work",
    "Motion graphics and animation",
    "Documentaries, and finished videos longer than 20 minutes",
    "Footage or a finished length over a package's limits",
    "Rush jobs",
    "Re-edits of someone else's project, subtitles in several languages or complex music licensing",
  ],
  /** Hourly rates in USD, excluding VAT. */
  rate: 45,
  rateBrands: 55,
  minimum: 120,
  /** Added to the estimated hours. */
  revisionBufferPercent: 15,
  adminBufferPercent: 10,
  /** The written quote: sent within this many business days, valid this many days. */
  replyBusinessDays: 1,
  validDays: 14,
} as const;

/**
 * The founding offer (strategy §5, terms §7): 30% off the first order only, for the first 10 clients or until
 * 2027-03-31, whichever comes first. It depends on nothing else, a review least of all (Fiverr and Upwork treat a
 * discount for a review as review manipulation). Set `active` to false once the tenth client has ordered.
 */
export const FOUNDING_OFFER = { active: true, percent: 30, clients: 10, until: "2027-03-31" } as const;

/** Payment (strategy §5, terms §6). No card checkout until the accountant answers A6 (strategy §7). */
export const PAYMENT = {
  /** Custom quotes for new clients: this share before we start, the balance before the final files. */
  customDepositPercent: 50,
  /** A delivery counts as accepted when approved, or after this many days without revision notes (terms §5). */
  acceptanceDays: 7,
} as const;

/** The package with this id, or null. */
export function packageById(id: string): EnPackage | null {
  return PACKAGES.find((p) => p.id === id) ?? null;
}

export function customerOf(id: Customer): CustomerGroup {
  const group = CUSTOMERS.find((c) => c.id === id);
  if (!group) throw new Error(`Unknown customer group: ${id}`);
  return group;
}

/** The niche whose order-form fields a package needs (weddings, YouTube, real estate), if any. */
export function nicheOf(pkg: EnPackage): Niche | null {
  return customerOf(pkg.customer).niche;
}

export const packagesFor = (customer: Customer): readonly EnPackage[] =>
  PACKAGES.filter((p) => p.customer === customer);

export const packagesForNiche = (niche: Niche): readonly EnPackage[] => PACKAGES.filter((p) => nicheOf(p) === niche);

const USD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** "$1,080" */
export const usd = (amount: number): string => USD.format(amount);

/** "$1,190 a month", "$95 per episode", "$390" */
export function priceText(p: Pick<EnPackage, "price" | "unit">): string {
  const unit = p.unit === "month" ? " a month" : p.unit === "episode" ? " per episode" : "";
  return `${usd(p.price)}${unit}`;
}

/** "7 business days", "3 business days per video", "2 business days; next business day as a paid rush, …" */
export function turnaroundText(t: Turnaround): string {
  const days = t.maxDays ? `${t.days}–${t.maxDays}` : String(t.days);
  const unit = t.days === 1 && !t.maxDays ? "business day" : "business days";
  if (!t.note) return `${days} ${unit}`;
  return `${days} ${unit}${t.note.startsWith("per ") ? " " : "; "}${t.note}`;
}

/** The lowest price among some packages: "From $160". */
export function fromPrice(list: readonly EnPackage[]): number {
  return Math.min(...list.map((p) => p.price));
}

/** "31 March 2027" */
export function longDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

/** Whether the founding offer may still be shown (it ends on its date, or when switched off after ten clients). */
export function foundingOfferOpen(now: Date = new Date(), offer: typeof FOUNDING_OFFER = FOUNDING_OFFER): boolean {
  return offer.active && now.getTime() <= new Date(`${offer.until}T23:59:59Z`).getTime();
}
