import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Sofia_Sans, Sofia_Sans_Extra_Condensed } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { AnalyticsEvents } from "@/components/consent/AnalyticsEvents";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { AppToaster } from "@/components/site/AppToaster";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { StagingBadge, showStagingBar } from "@/components/site/StagingBadge";
import { SEO } from "@/content/seo";
import { SHELL } from "@/content/site";
import { getServerEnv } from "@/lib/config/env";
import { brandName } from "@/lib/site/brand";
import { isIndexable, siteOrigin } from "@/lib/site/url";

// Self-hosted at build time by next/font (DS:22); Sofia Sans has Bulgarian letterforms by default. Only the weights
// the stylesheets use. The mono face sets small labels, never a headline, so it is not preloaded: it would only
// compete with the headline fonts for bandwidth on a slow connection.
const sans = Sofia_Sans({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ff-sans",
  display: "swap",
});
const display = Sofia_Sans_Extra_Condensed({
  subsets: ["cyrillic", "latin"],
  weight: ["800"],
  variable: "--ff-display",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["cyrillic", "latin"],
  weight: ["500", "600"],
  variable: "--ff-mono",
  display: "swap",
  preload: false,
});

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

/** Analytics exists only when configured AND approved (env); otherwise there is nothing to consent to. */
function analyticsId(): string | null {
  try {
    return getServerEnv().analytics?.measurementId ?? null;
  } catch {
    return null;
  }
}

/** Before the first paint: may the page move? Decides between the raw edit (motion) and the finished one. */
const MOTION_FLAG = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("motion")}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="bg"
      className={`${sans.variable} ${display.variable} ${mono.variable}${showStagingBar() ? " has-bar" : ""}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_FLAG }} />
      </head>
      <body>
        <ConsentProvider analyticsId={analyticsId()}>
          <a className="skip" href="#main">
            {SHELL.skipLink}
          </a>
          <ConsentBanner />
          <StagingBadge />
          <SiteHeader />
          {children}
          <SiteFooter />
          <AppToaster />
          <AnalyticsEvents />
        </ConsentProvider>
      </body>
    </html>
  );
}
