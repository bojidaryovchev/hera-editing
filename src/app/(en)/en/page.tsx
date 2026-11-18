import type { Metadata } from "next";
import Link from "next/link";
import { EnMotion } from "@/components/en/EnMotion";
import { orderHref } from "@/components/en/Packages";
import { ReviewPanel } from "@/components/en/ReviewPanel";
import { SamplesBand } from "@/components/en/Samples";
import { StepsTrack } from "@/components/en/Steps";
import { ArrowRight } from "@/components/icons";
import { FaqList } from "@/components/site/FaqSection";
import { JsonLd } from "@/components/site/JsonLd";
import { PageCta } from "@/components/site/PageCta";
import { EN_FAQ_HEADING, EN_FAQ_SETS, faqItems } from "@/content/en/faq";
import { EN_HOME } from "@/content/en/home";
import { NICHE_ORDER, NICHE_PAGES } from "@/content/en/niches";
import { CUSTOMERS, fromPrice, packageById, packagesForNiche, priceText, usd } from "@/content/en/packages";
import { publishedSamples } from "@/content/en/samples";
import { ORDER_CTA } from "@/content/en/site";
import { enPageMetadata } from "@/lib/en/metadata";
import { requireEnSection } from "@/lib/en/section";
import { route } from "@/lib/site/nav";
import { organizationLd } from "@/lib/site/structured-data";

const PATH = "/en";

export const metadata: Metadata = enPageMetadata("home");

/**
 * /en, the offer home (decision L38; strategy §7): the promise with an example review link, the three niches, how it
 * works on a timeline, prices from, "no calls needed", samples once real ones exist, a few questions, the order
 * action. The Organization in its structured data is the same one the Bulgarian home describes.
 */
export default function EnHomePage() {
  requireEnSection();
  const h = EN_HOME;
  const samples = publishedSamples();
  const examples = h.prices.ids.map((id) => packageById(id)).filter((p) => p !== null);
  return (
    <main id="main" className="page" data-page="en-home">
      <JsonLd data={{ "@context": "https://schema.org", ...organizationLd() }} />
      <header className="en-hero wrap">
        <div className="en-hero__main">
          <p className="eyebrow">{h.hero.eyebrow}</p>
          <h1 className="h1">
            {h.hero.titleLead} <span>{h.hero.titleRest}</span>
          </h1>
          <p className="lead">{h.hero.lead}</p>
          <div className="actions">
            <Link className="btn btn--pri" href={orderHref(null, PATH)}>
              {ORDER_CTA}
              <ArrowRight />
            </Link>
            <Link className="btn btn--sec" href={route("/en/pricing")}>
              {h.hero.secondaryCta}
            </Link>
          </div>
        </div>
        <div className="en-hero__aside">
          <ReviewPanel />
        </div>
      </header>

      <section className="paper sv-sec wrap" aria-labelledby="niches-h">
        <div className="sv-head">
          <h2 className="h2 h2--md" id="niches-h">
            {h.niches.heading}
          </h2>
          <p className="sv-head__p">{h.niches.lead}</p>
        </div>
        <ul className="en-niches">
          {NICHE_ORDER.map((n, i) => {
            const page = NICHE_PAGES[n];
            const group = CUSTOMERS.find((c) => c.niche === n);
            return (
              <li key={n} className="en-niche" data-niche={n}>
                <span className="en-niche__frame" aria-hidden="true">
                  <i />
                  <b>{String(i + 1).padStart(2, "0")}</b>
                </span>
                <p className="sv-label">{group?.name}</p>
                <h3 className="en-niche__h">{page.card.title}</h3>
                <p className="en-niche__p">{page.card.text}</p>
                <p className="en-niche__from">
                  {h.niches.fromLabel} <b>{usd(fromPrice(packagesForNiche(n).filter((p) => p.wave === 1)))}</b>
                </p>
                <Link className="link" href={route(page.path)}>
                  {page.card.link}
                  <ArrowRight />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <StepsTrack id="how-h" heading={h.how.heading} note={h.how.note} />

      <section className="sv-sec sv-dark sv-sec--rule-dark wrap" aria-labelledby="prices-h">
        <div className="sv-split sv-split--even">
          <div className="sv-col">
            <h2 className="h2 h2--md" id="prices-h">
              {h.prices.heading}
            </h2>
            <p className="sv-lead">{h.prices.lead}</p>
            <Link className="link" href={route("/en/pricing")}>
              {h.prices.more}
              <ArrowRight />
            </Link>
          </div>
          <ul className="en-from">
            {examples.map((p) => (
              <li key={p.id}>
                <span>
                  <small>{CUSTOMERS.find((c) => c.id === p.customer)?.name}</small>
                  {p.name}
                </span>
                <b>{priceText(p)}</b>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="paper sv-sec wrap" aria-labelledby="calls-h">
        <div className="sv-split sv-split--even">
          <div className="sv-col">
            <h2 className="h2 h2--md" id="calls-h">
              {h.noCalls.heading}
            </h2>
            <p className="sv-lead">{h.noCalls.text}</p>
          </div>
          <ul className="en-written">
            {h.noCalls.points.map((pt, i) => (
              <li key={pt.title}>
                <b aria-hidden="true">{String(i + 1).padStart(2, "0")}</b>
                <h3>{pt.title}</h3>
                <p>{pt.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {samples.length > 0 && (
        <SamplesBand id="samples-h" heading={h.samples.heading} samples={samples.slice(0, 3)} more={h.samples.more} />
      )}

      <FaqList
        heading={EN_FAQ_HEADING}
        items={faqItems(EN_FAQ_SETS.home)}
        more={{ href: route("/en/how-it-works#faq-h"), label: h.faqMore }}
      />
      <PageCta
        id="en-cta-h"
        heading={h.cta.heading}
        body={h.cta.body}
        action={{ href: orderHref(null, PATH), label: ORDER_CTA }}
      />
      <EnMotion />
    </main>
  );
}
