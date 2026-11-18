import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { EN_FAQ } from "../../src/content/en/faq";
import { EN_HOME } from "../../src/content/en/home";
import { NICHE_PAGES } from "../../src/content/en/niches";
import {
  ADD_ONS,
  CUSTOMERS,
  CUSTOM_QUOTES,
  FOUNDING_OFFER,
  GROUP_EXTRAS,
  PACKAGES,
  PAYMENT,
  foundingOfferOpen,
  nicheOf,
  packageById,
  packagesForNiche,
  priceText,
  turnaroundText,
} from "../../src/content/en/packages";
import { EN_HOW, EN_PRICING } from "../../src/content/en/pages";
import { ORDERABLE_IDS } from "../../src/lib/validation/order";

/*
 * The pricing data is the English section's one source of numbers (decision L38). These are docs/strategy-
 * remote-editing.md §5's tables, both waves, written out again: a change to a price, a turnaround or a revision
 * count must be a deliberate change to both the strategy and the data.
 */
const STRATEGY_5: Record<string, { price: number; days: number; maxDays?: number; revisions: RegExp }> = {
  "wedding-full-film": { price: 390, days: 7, revisions: /^2 rounds$/ },
  "wedding-highlight": { price: 380, days: 7, revisions: /^2 rounds$/ },
  "wedding-teaser": { price: 160, days: 4, revisions: /^2 rounds$/ },
  "wedding-trio": { price: 860, days: 10, revisions: /^2 rounds/ },
  "youtube-story": { price: 520, days: 5, revisions: /^2 rounds$/ },
  "listing-video": { price: 120, days: 2, revisions: /^1 round$/ },
  "listing-10-pack": { price: 1080, days: 2, revisions: /^1 round/ },
  "youtube-talk": { price: 280, days: 3, revisions: /^2 rounds$/ },
  "youtube-monthly": { price: 1190, days: 3, revisions: /^2 rounds per video; 1 per batch of Shorts$/ },
  "podcast-audio": { price: 95, days: 2, revisions: /^1 round$/ },
  "podcast-video": { price: 260, days: 3, revisions: /^1 round/ },
  "podcast-monthly": { price: 940, days: 3, revisions: /^1 round/ },
  "stream-clip-pack": { price: 170, days: 2, revisions: /^1 round$/ },
  "stream-highlight": { price: 270, days: 3, revisions: /^2 rounds$/ },
  "stream-monthly": { price: 1390, days: 3, revisions: /2 rounds per highlight video; 1 per batch of clips/ },
  "ad-pack": { price: 420, days: 3, revisions: /^2 rounds on the master; 1 on the variations$/ },
  "ad-monthly": { price: 1150, days: 3, revisions: /2 rounds on each master; 1 on its variations/ },
  "white-label-10": { price: 450, days: 2, maxDays: 3, revisions: /out of the hours/ },
  "white-label-20": { price: 840, days: 2, maxDays: 3, revisions: /out of the hours/ },
  "white-label-40": { price: 1560, days: 2, maxDays: 3, revisions: /out of the hours/ },
};

const FIRST_WAVE = [
  "wedding-full-film",
  "wedding-highlight",
  "wedding-teaser",
  "wedding-trio",
  "youtube-story",
  "listing-video",
  "listing-10-pack",
];

describe("pricing data: strategy §5, exactly", () => {
  it("has every package of both waves, once, and nothing else", () => {
    expect(PACKAGES.map((p) => p.id).sort()).toEqual(Object.keys(STRATEGY_5).sort());
    expect(new Set(PACKAGES.map((p) => p.id)).size).toBe(PACKAGES.length);
    expect(
      PACKAGES.filter((p) => p.wave === 1)
        .map((p) => p.id)
        .sort(),
    ).toEqual([...FIRST_WAVE].sort());
  });

  it("states the strategy's price, turnaround and revisions for each", () => {
    for (const p of PACKAGES) {
      const s = STRATEGY_5[p.id]!;
      expect(p.price, p.id).toBe(s.price);
      expect(p.turnaround.days, p.id).toBe(s.days);
      expect(p.turnaround.maxDays, p.id).toBe(s.maxDays);
      expect(p.revisions, p.id).toMatch(s.revisions);
    }
  });

  it("prices the monthly plans and podcast episodes by their unit", () => {
    for (const id of ["youtube-monthly", "podcast-monthly", "stream-monthly", "ad-monthly"])
      expect(priceText(packageById(id)!)).toMatch(/ a month$/);
    expect(priceText(packageById("podcast-audio")!)).toBe("$95 per episode");
    expect(priceText(packageById("listing-10-pack")!)).toBe("$1,080");
  });
});

describe("pricing data: every package is complete", () => {
  it("has a turnaround in business days, revisions, at least one limit, a summary and its inclusions", () => {
    for (const p of PACKAGES) {
      expect(Number.isInteger(p.turnaround.days) && p.turnaround.days > 0, p.id).toBe(true);
      expect(turnaroundText(p.turnaround), p.id).toMatch(/^\d+(–\d+)? business days?/);
      expect(p.revisions.trim().length, p.id).toBeGreaterThan(0);
      expect(Object.values(p.limits).filter((v) => v && v.trim()).length, p.id).toBeGreaterThan(0);
      expect(p.summary.trim().length, p.id).toBeGreaterThan(0);
      expect(p.includes.length, p.id).toBeGreaterThan(0);
      expect(Number.isInteger(p.price) && p.price > 0, p.id).toBe(true);
    }
  });

  it("states the footage limits the plan sets", () => {
    expect(packageById("wedding-highlight")!.limits.footage).toMatch(/Up to 90 min of your selected clips/);
    expect(packageById("youtube-story")!.limits.footage).toBe("Up to 3 h of raw footage");
    expect(packageById("youtube-story")!.limits.length).toBe("Up to 12 min finished");
    expect(packageById("youtube-talk")!.limits.footage).toBe("Up to 60 min of raw footage");
    expect(packageById("listing-video")!.limits.footage).toBe("Up to 150 clips or 20 GB");
    expect(packageById("listing-10-pack")!.limits.validity).toBe("Valid for 90 days");
    expect(packageById("white-label-10")!.limits.validity).toBe("Valid for 60 days");
  });

  it("belongs to a known customer group, and the three niches map to their pages", () => {
    const groups = new Set(CUSTOMERS.map((c) => c.id));
    for (const p of PACKAGES) expect(groups.has(p.customer), p.id).toBe(true);
    expect(packagesForNiche("wedding").map((p) => p.id)).toEqual([
      "wedding-full-film",
      "wedding-highlight",
      "wedding-teaser",
      "wedding-trio",
    ]);
    expect(packagesForNiche("youtube").map((p) => p.id)).toEqual(["youtube-story", "youtube-talk", "youtube-monthly"]);
    expect(packagesForNiche("real-estate").map((p) => p.id)).toEqual(["listing-video", "listing-10-pack"]);
    expect(nicheOf(packageById("podcast-video")!)).toBeNull();
    for (const page of Object.values(NICHE_PAGES)) expect(packageById(page.leadPackage)?.customer).toBe(page.niche);
  });

  it("can be ordered: every package id, and the custom quote, is a choice on the order form", () => {
    expect([...ORDERABLE_IDS].sort()).toEqual([...PACKAGES.map((p) => p.id), "custom"].sort());
  });
});

describe("turnaround promises (never overnight unless a package says so)", () => {
  it("promises next-day delivery only as the listing video's paid rush when a slot is free", () => {
    const nextDay = PACKAGES.filter((p) => /next|overnight|24 ?h/i.test(JSON.stringify(p)));
    expect(nextDay.map((p) => p.id)).toEqual(["listing-video"]);
    expect(packageById("listing-video")!.turnaround.note).toMatch(/paid rush, only when a slot is free/);
  });

  it("keeps the rush add-on conditional and never a number of hours", () => {
    const rush = ADD_ONS.find((a) => a.id === "rush")!;
    expect(rush.price).toBe("+40%");
    expect(rush.note).toMatch(/only when a slot is free/i);
    expect(JSON.stringify(ADD_ONS)).not.toMatch(/24 ?h|overnight/i);
  });
});

describe("add-ons, custom quotes, founding offer, payment (research Part 2 §6.7, §6.8, §6.10; strategy §5)", () => {
  it("lists §6.7's add-ons with their prices", () => {
    const price = (id: string) => ADD_ONS.find((a) => a.id === id)?.price;
    expect(price("revision")).toBe("15% of the package price, at least $25");
    expect(price("raw-footage")).toMatch(/\$25 per extra hour.*\$20 per extra 30 min.*\$30 per extra hour/);
    expect(price("finished-length")).toMatch(/\$15 a minute.*\$40 a minute.*\$30 \(audio\) or \$50 \(video\)/);
    expect(price("clip")).toBe("$18");
    expect(price("variations")).toBe("$35, $90 and $15");
    expect(price("thumbnail")).toBe("$45");
    expect(price("captions")).toBe("$2 per finished minute");
    expect(price("subtitles")).toBe("Custom quote");
    expect(price("weekend")).toBe("+25%");
    expect(new Set(ADD_ONS.map((a) => a.id)).size).toBe(ADD_ONS.length);
  });

  it("keeps the unculled wedding highlight a custom quote from $550", () => {
    expect(GROUP_EXTRAS.wedding?.[0]).toBe("A highlight from your full, unculled footage: a custom quote, from $550");
  });

  it("quotes custom work as the strategy says", () => {
    expect(CUSTOM_QUOTES).toMatchObject({
      rate: 45,
      rateBrands: 55,
      minimum: 120,
      revisionBufferPercent: 15,
      adminBufferPercent: 10,
      replyBusinessDays: 1,
      validDays: 14,
    });
    expect(EN_PRICING.custom.how.join(" ")).toMatch(/\$45 an hour, or \$55.*smallest order is \$120/);
  });

  it("makes the founding offer 30% off a first order, for 10 clients or until 2027-03-31, with no condition", () => {
    expect(FOUNDING_OFFER).toMatchObject({ percent: 30, clients: 10, until: "2027-03-31" });
    expect(EN_PRICING.founding.heading).toBe("30% off your first order.");
    expect(EN_PRICING.founding.text).toMatch(/first 10 clients, or until 31 March 2027, whichever comes first/);
    expect(EN_PRICING.founding.text).toMatch(/doesn't depend on a review or anything else/);
    expect(EN_FAQ.founding!.a).toMatch(/30% off your first order.*first 10 clients.*31 March 2027/);
  });

  it("ends the founding offer on its date, or when switched off", () => {
    expect(foundingOfferOpen(new Date("2027-03-31T12:00:00Z"))).toBe(true);
    expect(foundingOfferOpen(new Date("2027-04-01T00:00:00Z"))).toBe(false);
    expect(foundingOfferOpen(new Date("2026-12-01T00:00:00Z"), { ...FOUNDING_OFFER, active: false })).toBe(false);
  });

  it("takes payment by bank transfer in advance, 50% upfront on custom quotes, and no card", () => {
    expect(PAYMENT.customDepositPercent).toBe(50);
    const text = JSON.stringify(EN_PRICING.payment);
    expect(text).toMatch(/in full, in advance, by bank transfer/);
    expect(text).toMatch(/50% before we start/);
    expect(text).toMatch(/No card payments yet/);
  });
});

describe("the pages quote the data, never their own numbers", () => {
  it("shows the home's prices-from examples from the data", () => {
    for (const id of EN_HOME.prices.ids) expect(packageById(id), id).not.toBeNull();
  });

  it("has every dollar amount in the English copy among the data's prices", () => {
    const known = new Set<string>();
    const DOLLARS = /\$\d{1,3}(?:,\d{3})*/g;
    const add = (s: string) => (s.match(DOLLARS) ?? []).forEach((m) => known.add(m));
    for (const p of PACKAGES) add(priceText(p));
    for (const a of ADD_ONS) add(a.price);
    for (const list of Object.values(GROUP_EXTRAS)) list?.forEach(add);
    ["$45", "$55", "$120"].forEach(add);
    const copy = JSON.stringify([NICHE_PAGES, EN_FAQ, EN_HOME, EN_PRICING, EN_HOW]);
    const unknown = (copy.match(DOLLARS) ?? []).filter((m) => !known.has(m));
    expect(unknown).toEqual([]);
  });

  it("is the only place a price is written: the pages import it", () => {
    const pricing = readFileSync(path.resolve(import.meta.dirname, "../../src/app/(en)/en/pricing/page.tsx"), "utf8");
    expect(pricing).not.toMatch(/\$\d/);
  });
});
