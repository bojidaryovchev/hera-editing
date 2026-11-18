import type { ReactNode } from "react";
import { fontVariables } from "@/app/fonts";
import { AnalyticsEvents } from "@/components/consent/AnalyticsEvents";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { EnFooter } from "@/components/en/EnFooter";
import { EnHeader } from "@/components/en/EnHeader";
import { AppToaster } from "@/components/site/AppToaster";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { StagingBadge, showStagingBar } from "@/components/site/StagingBadge";
import { EN_CONSENT_BANNER } from "@/content/en/legal/cookies";
import { EN_SHELL } from "@/content/en/site";
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
 * `locale="en"` is the English section's document (app/(en), decision L38): the same fonts, styles, staging bar
 * and consent, with its own header, footer and words.
 */
export function SiteDocument({ children, locale = "bg" }: { children: ReactNode; locale?: "bg" | "en" }) {
  const en = locale === "en";
  return (
    <html lang={locale} className={`${fontVariables}${showStagingBar() ? " has-bar" : ""}`} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- the root document of the site layout and the global 404 */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_FLAG }} />
      </head>
      <body>
        <ConsentProvider analyticsId={analyticsId()}>
          <a className="skip" href="#main">
            {en ? EN_SHELL.skipLink : SHELL.skipLink}
          </a>
          {en ? <ConsentBanner copy={EN_CONSENT_BANNER} settingsHref="/en/cookies" /> : <ConsentBanner />}
          {en ? <StagingBadge text={EN_SHELL.stagingBar} /> : <StagingBadge />}
          {en ? <EnHeader /> : <SiteHeader />}
          {children}
          {en ? <EnFooter /> : <SiteFooter />}
          <AppToaster />
          <AnalyticsEvents />
        </ConsentProvider>
      </body>
    </html>
  );
}
