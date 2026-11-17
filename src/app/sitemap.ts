import type { MetadataRoute } from "next";
import { INDEXABLE_PAGES } from "@/lib/site/metadata";
import { absoluteUrl } from "@/lib/site/url";

/**
 * Only the indexable pages (acceptance E): no 404, no API, no empty /rabota. No lastmod: search engines use it only
 * when it is accurate, and a build date is not.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_PAGES.map((page) => ({ url: absoluteUrl(page.path) }));
}
