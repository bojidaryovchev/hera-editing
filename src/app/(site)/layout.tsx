import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { SiteDocument } from "@/components/site/SiteDocument";
import { SEO } from "@/content/seo";
import { brandName } from "@/lib/site/brand";
import { isIndexable, siteOrigin } from "@/lib/site/url";

/*
 * Root layout of the public site. There is deliberately no app/layout.tsx: the admin panel (app/(admin)) has a root
 * layout of its own without the site's header, footer, consent banner or staging bar, and two root layouts in route
 * groups are how Next.js does that. An address that matches no route is answered by app/global-not-found.tsx.
 */

const verification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  // Canonical links, share images and structured data resolve against the configured site URL.
  metadataBase: new URL(siteOrigin()),
  title: { default: `${SEO.home.title} | ${brandName()}`, template: `%s | ${brandName()}` },
  description: SEO.home.description,
  applicationName: brandName(),
  openGraph: { type: "website", locale: "bg_BG", siteName: brandName() },
  // Only production is indexed; previews and development say noindex on every page (with X-Robots-Tag).
  robots: isIndexable() ? undefined : { index: false, follow: false },
  // Search Console ownership by meta tag, when the owner chooses it over DNS verification.
  verification: verification ? { google: verification } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0C0E10",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteDocument>{children}</SiteDocument>;
}
