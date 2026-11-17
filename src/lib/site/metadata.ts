import type { Metadata } from "next";
import { SEO } from "@/content/seo";
import { brandName } from "@/lib/site/brand";

export type PageKey = Exclude<keyof typeof SEO, "work">;

/**
 * Every indexable page, in navigation order: the sitemap lists exactly these, and each has its own title,
 * description, canonical and share image (TS:SEO, acceptance E). /rabota joins once approved projects exist (IA:21).
 */
export const INDEXABLE_PAGES: readonly { key: PageKey; path: string }[] = [
  { key: "home", path: "/" },
  { key: "service", path: "/upravlenie-na-sotsialni-mrezhi" },
  { key: "video", path: "/video-sadarzhanie-za-biznes" },
  { key: "packages", path: "/paketi" },
  { key: "about", path: "/za-nas" },
  { key: "contact", path: "/kontakti" },
  { key: "privacy", path: "/poveritelnost" },
  { key: "cookies", path: "/biskvitki" },
];

export function pagePath(key: PageKey): string {
  const page = INDEXABLE_PAGES.find((p) => p.key === key);
  if (!page) throw new Error(`Unknown page: ${key}`);
  return page.path;
}

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
