import type { MetadataRoute } from "next";
import { publishedProjects } from "@/content/projects";
import { INDEXABLE_PAGES, casePath, pagePath } from "@/lib/site/metadata";
import { absoluteUrl } from "@/lib/site/url";

/**
 * Only the indexable pages (acceptance E): no 404, no API, and /rabota with its case studies only once approved
 * projects are published. No lastmod: search engines use it only when it is accurate, and a build date is not.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const projects = publishedProjects();
  const work = projects.length > 0 ? [pagePath("work"), ...projects.map((p) => casePath(p.slug))] : [];
  return [...INDEXABLE_PAGES.map((page) => page.path), ...work].map((path) => ({ url: absoluteUrl(path) }));
}
