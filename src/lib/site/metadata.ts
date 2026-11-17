import type { Metadata } from "next";
import type { Project } from "@/content/projects/types";
import { SEO } from "@/content/seo";
import { brandName } from "@/lib/site/brand";

export type PageKey = keyof typeof SEO;

const PATHS: Record<PageKey, string> = {
  home: "/",
  service: "/upravlenie-na-sotsialni-mrezhi",
  video: "/video-sadarzhanie-za-biznes",
  packages: "/paketi",
  about: "/za-nas",
  contact: "/kontakti",
  work: "/rabota",
  privacy: "/poveritelnost",
  cookies: "/biskvitki",
};

/**
 * The always-published pages, in navigation order: the sitemap lists these, plus /rabota and its case studies once
 * approved projects exist (IA:21). Each has its own title, description, canonical and share image (acceptance E).
 */
export const INDEXABLE_PAGES: readonly { key: PageKey; path: string }[] = (
  ["home", "service", "video", "packages", "about", "contact", "privacy", "cookies"] as const
).map((key) => ({ key, path: PATHS[key] }));

export function pagePath(key: PageKey): string {
  const path = PATHS[key];
  if (!path) throw new Error(`Unknown page: ${key}`);
  return path;
}

export const casePath = (slug: string) => `/rabota/${slug}`;

/**
 * Title, description, canonical and share card for one page. The share image comes from the route's own
 * opengraph-image file (file-based metadata wins over config), and the Twitter card inherits it from Open Graph.
 * Query strings (?from=, utm_) never become separate pages: the canonical is always the clean path.
 */
export function pageMetadata(key: PageKey): Metadata {
  const { title, description } = SEO[key];
  const path = pagePath(key);
  const brand = brandName();
  return {
    // Home carries the brand after the search phrase; the layout's template does the same for every other page.
    title: key === "home" ? { absolute: `${title} | ${brand}` } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "bg_BG", siteName: brand, url: path, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** A case study: the client's name as the title, the approved one-sentence summary as the description. */
export function caseMetadata(p: Project): Metadata {
  const path = casePath(p.slug);
  return {
    title: p.businessName,
    description: p.summary,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "bg_BG",
      siteName: brandName(),
      url: path,
      title: p.businessName,
      description: p.summary,
    },
    twitter: { card: "summary_large_image", title: p.businessName, description: p.summary },
  };
}
