import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import "@/styles/en.css";
import { SiteDocument } from "@/components/site/SiteDocument";
import { EN_SEO } from "@/content/en/seo";
import { brandName } from "@/lib/site/brand";
import { isIndexable, siteOrigin } from "@/lib/site/url";

/*
 * Root layout of the English section /en (decision L38): a third root layout beside the Bulgarian site and the admin
 * panel, with lang="en". It reuses the site's fonts, stylesheet, staging bar and consent (SiteDocument), with the
 * section's own header, footer and words. The pages are not translations of the Bulgarian ones, so no hreflang.
 */

const verification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: { default: `${EN_SEO.home.title} | ${brandName()}`, template: `%s | ${brandName()}` },
  description: EN_SEO.home.description,
  applicationName: brandName(),
  openGraph: { type: "website", locale: "en_US", siteName: brandName() },
  // Only production is indexed; previews and development say noindex on every page (with X-Robots-Tag).
  robots: isIndexable() ? undefined : { index: false, follow: false },
  verification: verification ? { google: verification } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0C0E10",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function EnLayout({ children }: { children: ReactNode }) {
  return <SiteDocument locale="en">{children}</SiteDocument>;
}
