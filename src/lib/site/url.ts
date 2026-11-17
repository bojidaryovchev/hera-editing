import { resolveAppEnv } from "@/lib/config/env";

type Source = Record<string, string | undefined>;

const LOCAL_ORIGIN = "http://localhost:3000";

/**
 * The public origin for canonical links, share cards, the sitemap and structured data (NEXT_PUBLIC_SITE_URL).
 * A production build refuses to start without a real https URL (parseServerEnv, called from next.config.ts), so the
 * local fallback can only ever appear in development, tests and previews, which are all noindex.
 */
export function siteOrigin(src: Source = process.env): string {
  const raw = src.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      const u = new URL(raw);
      if (u.protocol === "https:" || u.protocol === "http:") return u.origin;
    } catch {
      // Invalid values are reported by parseServerEnv; here the safe fallback applies.
    }
  }
  return LOCAL_ORIGIN;
}

/** An absolute URL on this site, for structured data and the sitemap. */
export function absoluteUrl(path: string, src: Source = process.env): string {
  return new URL(path, `${siteOrigin(src)}/`).toString();
}

/** Only production may be indexed: development, tests and previews say noindex everywhere (TS:SEO). */
export function isIndexable(src: Source = process.env): boolean {
  return resolveAppEnv(src) === "production";
}
