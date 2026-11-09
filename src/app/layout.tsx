import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Sofia_Sans, Sofia_Sans_Extra_Condensed } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { StagingBadge, showStagingBar } from "@/components/site/StagingBadge";
import { SEO } from "@/content/seo";
import { SHELL } from "@/content/site";
import { brandName } from "@/lib/site/brand";

// Self-hosted at build time by next/font (DS:22); Sofia Sans has Bulgarian letterforms by default.
const sans = Sofia_Sans({ subsets: ["cyrillic", "latin"], weight: ["400", "500", "600", "700", "800"], variable: "--ff-sans", display: "swap" });
const display = Sofia_Sans_Extra_Condensed({ subsets: ["cyrillic", "latin"], weight: ["700", "800"], variable: "--ff-display", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["cyrillic", "latin"], weight: ["400", "500", "600"], variable: "--ff-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${SEO.home.title} | ${brandName()}`, template: `%s | ${brandName()}` },
  description: SEO.home.description,
};

export const viewport: Viewport = {
  themeColor: "#0C0E10",
  colorScheme: "dark",
  viewportFit: "cover",
};

/** Before the first paint: may the page move? Decides between the raw edit (motion) and the finished one. */
const MOTION_FLAG = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("motion")}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bg" className={`${sans.variable} ${display.variable} ${mono.variable}${showStagingBar() ? " has-bar" : ""}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_FLAG }} />
      </head>
      <body>
        <a className="skip" href="#main">
          {SHELL.skipLink}
        </a>
        <StagingBadge />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
