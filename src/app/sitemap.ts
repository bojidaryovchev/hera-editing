import type { MetadataRoute } from "next";
import { publishedSamples } from "@/content/en/samples";
import { publishedProjects } from "@/content/projects";
import { enSectionEnabled } from "@/lib/config/env";
import { EN_INDEXABLE_PAGES, enPagePath } from "@/lib/en/metadata";
import { INDEXABLE_PAGES, casePath, pagePath } from "@/lib/site/metadata";
import { absoluteUrl } from "@/lib/site/url";

/**
 * Only the indexable pages (acceptance E): no 404, no API, and /rabota with its case studies only once approved
 * projects are published. The English section's pages (decision L38) only while it is switched on, and /en/work only
 * once samples are published. No lastmod: search engines use it only when it is accurate, and a build date is not.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const projects = publishedProjects();
  const work = projects.length > 0 ? [pagePath("work"), ...projects.map((p) => casePath(p.slug))] : [];
  const en = enSectionEnabled(process.env)
    ? [...EN_INDEXABLE_PAGES.map((p) => p.path), ...(publishedSamples().length > 0 ? [enPagePath("work")] : [])]
    : [];
  return [...INDEXABLE_PAGES.map((page) => page.path), ...work, ...en].map((path) => ({ url: absoluteUrl(path) }));
}
