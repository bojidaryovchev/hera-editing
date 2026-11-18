import type { Metadata, Viewport } from "next";
import "./globals.css";
import { NotFoundView } from "@/components/site/NotFoundView";
import { SiteDocument } from "@/components/site/SiteDocument";
import { NOT_FOUND_TITLE } from "@/content/seo";
import { brandName } from "@/lib/site/brand";
import { siteOrigin } from "@/lib/site/url";

/*
 * An address that matches no route at all. With two root layouts (app/(site) and app/(admin)) there is no layout a
 * 404 could inherit, so Next.js renders this file on its own (experimental.globalNotFound in next.config.ts): it
 * brings the site's stylesheet and document itself, and shows the same body as the site's own 404.
 */

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: `${NOT_FOUND_TITLE} | ${brandName()}`,
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0C0E10",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function GlobalNotFound() {
  return (
    <SiteDocument>
      <NotFoundView />
    </SiteDocument>
  );
}
