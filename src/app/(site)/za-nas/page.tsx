import type { Metadata } from "next";
import Link from "next/link";
import { PageCta } from "@/components/site/PageCta";
import { PageHero } from "@/components/site/PageHero";
import { ABOUT } from "@/content/about";
import { BUSINESS } from "@/content/business";
import { GATES, QUOTE_CTA } from "@/content/site";
import { resolveAppEnv } from "@/lib/config/env";
import { quoteHref } from "@/lib/site/nav";
import { pageMetadata } from "@/lib/site/metadata";

const PATH = "/za-nas";

export const metadata: Metadata = pageMetadata("about");

/**
 * /za-nas (IA:61-62): honest copy, no invented people, headshots or numbers. The team section and the base city appear
 * once the owner supplies them; until then a labelled gate shows outside production, nothing in production.
 */
export default function AboutPage() {
  const a = ABOUT;
  const showGates = resolveAppEnv(process.env) !== "production";
  return (
    <main id="main" className="page" data-page="about">
      <div className="ab wrap">
        <PageHero
          crumb={a.breadcrumb}
          path={PATH}
          pair
          eyebrow={a.hero.eyebrow}
          title={a.hero.title}
          lead={a.hero.lead}
        >
          <Link className="btn btn--pri" href={quoteHref(PATH)}>
            {QUOTE_CTA}
          </Link>
        </PageHero>
      </div>

      <section className="paper ab-how wrap" aria-labelledby="how-h">
        <h2 className="h2" id="how-h">
          {a.principles.heading}
        </h2>
        <ol className="ab-how__grid">
          {a.principles.items.map((p, i) => (
            <li key={p.title} className="ab-how__item">
              <span className="ab-how__n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="paper ab-where wrap" aria-labelledby="where-h">
        <div className="ab-where__grid">
          <h2 className="h2" id="where-h">
            {a.area.heading}
          </h2>
          <div className="ab-where__text">
            <p>{a.area.text}</p>
            {BUSINESS.baseCity ? (
              <p className="ab-where__city">
                {a.area.baseCityLabel}: <b>{BUSINESS.baseCity}</b>
              </p>
            ) : (
              showGates && <p className="gate">{GATES.city}</p>
            )}
            {showGates && <p className="gate">{GATES.team}</p>}
          </div>
        </div>
      </section>

      <PageCta
        id="ab-cta-h"
        heading={a.contact.heading}
        body={a.contact.text}
        action={{ href: quoteHref("/za-nas"), label: QUOTE_CTA }}
      />
    </main>
  );
}
