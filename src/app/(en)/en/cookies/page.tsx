import type { Metadata } from "next";
import { CookiePreferences } from "@/components/consent/CookiePreferences";
import { PageHero } from "@/components/site/PageHero";
import { EN_COOKIES_PAGE } from "@/content/en/legal/cookies";
import { EN_CRUMBS } from "@/content/en/site";
import { enPageMetadata, enPagePath } from "@/lib/en/metadata";
import { requireEnSection } from "@/lib/en/section";

const PATH = enPagePath("cookies");

export const metadata: Metadata = enPageMetadata("cookies");

/** /en/cookies: what the site stores and the visitor's choice, in English; one choice for the whole site. */
export default function EnCookiesPage() {
  requireEnSection();
  const c = EN_COOKIES_PAGE;
  return (
    <main id="main" className="page" data-page="en-cookies">
      <div className="doc wrap">
        <div className="doc__col">
          <PageHero crumb={c.breadcrumb} path={PATH} root={EN_CRUMBS} title={c.title} lead={c.lead} />
          <div className="doc__paper paper">
            <p className="doc__meta">
              <span className="gate">{c.draftNotice}</span>
            </p>
            <CookiePreferences copy={c} />
          </div>
        </div>
      </div>
    </main>
  );
}
