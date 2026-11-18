import type { Metadata } from "next";
import { NICHE_PAGES } from "@/content/en/niches";
import { EN_PRIVACY_PAGE } from "@/content/en/legal/privacy";
import { EN_COOKIES_PAGE } from "@/content/en/legal/cookies";
import { EN_HOME } from "@/content/en/home";
import { EN_ORDER } from "@/content/en/order";
import { EN_HOW, EN_PRICING, EN_WORK } from "@/content/en/pages";
import { EN_SEO, type EnPageKey } from "@/content/en/seo";
import { EN_TERMS } from "@/content/en/terms";
import { brandName } from "@/lib/site/brand";
import type { ShareCard } from "@/lib/site/share";
import { shareAlt } from "@/lib/site/share";

export type { EnPageKey };

/**
 * The English pages' addresses, metadata and share cards (decision L38), after src/lib/site/metadata.ts: a unique
 * title, description, canonical and share image per page; Open Graph in en_US. No hreflang: these pages are not
 * translations of the Bulgarian ones (strategy §7), so no `alternates.languages` anywhere.
 */
const EN_PATHS: Record<EnPageKey, string> = {
  home: "/en",
  wedding: NICHE_PAGES.wedding.path,
  youtube: NICHE_PAGES.youtube.path,
  realEstate: NICHE_PAGES["real-estate"].path,
  pricing: "/en/pricing",
  how: "/en/how-it-works",
  order: "/en/order",
  work: "/en/work",
  terms: "/en/terms",
  privacy: "/en/privacy",
  cookies: "/en/cookies",
};

/** Always published while the section is on, in navigation order; /en/work joins once samples are published. */
export const EN_INDEXABLE_PAGES: readonly { key: EnPageKey; path: string }[] = (
  ["home", "wedding", "youtube", "realEstate", "pricing", "how", "order", "terms", "privacy", "cookies"] as const
).map((key) => ({ key, path: EN_PATHS[key] }));

export function enPagePath(key: EnPageKey): string {
  const path = EN_PATHS[key];
  if (!path) throw new Error(`Unknown English page: ${key}`);
  return path;
}

export function enPageMetadata(key: EnPageKey): Metadata {
  const { title, description } = EN_SEO[key];
  const path = enPagePath(key);
  const brand = brandName();
  return {
    title: key === "home" ? { absolute: `${title} | ${brand}` } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "en_US", siteName: brand, url: path, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** What each English share image says: the page's eyebrow (or name) and its H1. */
export const EN_SHARE: Record<EnPageKey, ShareCard> = {
  home: { label: EN_HOME.hero.eyebrow, title: EN_HOME.hero.titleLead, accent: EN_HOME.hero.titleRest },
  wedding: { label: NICHE_PAGES.wedding.hero.eyebrow, title: NICHE_PAGES.wedding.hero.title },
  youtube: { label: NICHE_PAGES.youtube.hero.eyebrow, title: "YouTube video editor for story channels" },
  realEstate: { label: NICHE_PAGES["real-estate"].hero.eyebrow, title: "Real estate video editing" },
  pricing: { label: EN_PRICING.hero.eyebrow, title: EN_PRICING.hero.title },
  how: { label: EN_HOW.hero.eyebrow, title: "Everything in writing" },
  order: { label: EN_ORDER.breadcrumb, title: EN_ORDER.hero.title },
  work: { title: EN_WORK.title },
  terms: { title: EN_TERMS.title },
  privacy: { title: EN_PRIVACY_PAGE.title },
  cookies: { title: EN_COOKIES_PAGE.title },
};

/** The English timeline band on share images. */
export const EN_TIMELINE = { sequence: "Sequence 01 · Your edit", clip: "Clip" } as const;

export const enShareAlt = (key: EnPageKey) => shareAlt(EN_SHARE[key]);
