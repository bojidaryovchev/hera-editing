import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import "@/styles/admin.css";
import { fontVariables } from "@/app/fonts";

/*
 * Root layout of the admin panel (decision L32): the site's fonts and tokens, none of its chrome (no header, footer,
 * consent banner or staging bar). Never indexed, whatever the environment: here, with X-Robots-Tag from
 * next.config.ts, and robots.txt keeps crawlers out of /admin in production.
 */

// Every admin screen is per request: it reads the session cookie and the database, and must never be prerendered at
// build time (a layout and its page render in parallel, so the page cannot rely on the layout's sign-in check).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Админ", template: "%s · Админ" },
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#0C0E10",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function AdminRoot({ children }: { children: ReactNode }) {
  return (
    <html lang="bg" className={fontVariables}>
      <body className="adm">{children}</body>
    </html>
  );
}
