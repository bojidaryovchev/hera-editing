import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexable } from "@/lib/site/url";

/** Production invites crawling and points to the sitemap; every other environment keeps crawlers out (TS:SEO). */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable()) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
