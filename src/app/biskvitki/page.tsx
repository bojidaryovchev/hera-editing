import type { Metadata } from "next";
import { CookiePreferences } from "@/components/consent/CookiePreferences";
import { PageHero } from "@/components/site/PageHero";
import { COOKIES_PAGE } from "@/content/legal/cookies";
import { SEO } from "@/content/seo";

export const metadata: Metadata = { title: SEO.cookies.title, description: SEO.cookies.description };

/** /biskvitki: what the site stores and the visitor's choice (decision L15). The quote form works whatever is chosen. */
export default function CookiesPage() {
  const c = COOKIES_PAGE;
  return (
    <main id="main" className="page" data-page="cookies">
      <div className="doc wrap">
        <div className="doc__col">
          <PageHero crumb={c.breadcrumb} title={c.title} lead={c.lead} />
          <div className="doc__paper paper">
            <p className="doc__meta">
              <span className="gate">{c.draftNotice}</span>
            </p>
            <CookiePreferences />
          </div>
        </div>
      </div>
    </main>
  );
}
