import type { ReactNode } from "react";
import { fontVariables } from "@/app/fonts";
import { AnalyticsEvents } from "@/components/consent/AnalyticsEvents";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { AppToaster } from "@/components/site/AppToaster";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { StagingBadge, showStagingBar } from "@/components/site/StagingBadge";
import { SHELL } from "@/content/site";
import { getServerEnv } from "@/lib/config/env";

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

/**
 * The public site's document: fonts, the motion flag, consent, the staging bar, header and footer around the page.
 * Used by the site's root layout and by the global 404, which Next.js renders without any layout (app/(site) and
 * app/(admin) are two root layouts, so there is no single layout a 404 for an unknown address could inherit).
 */
export function SiteDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="bg" className={`${fontVariables}${showStagingBar() ? " has-bar" : ""}`} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- the root document of the site layout and the global 404 */}
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
