import Link from "next/link";
import { EnMotion } from "@/components/en/EnMotion";
import { PackageGrid, PricePanel, orderHref } from "@/components/en/Packages";
import { SamplesBand } from "@/components/en/Samples";
import { ArrowRight, Check } from "@/components/icons";
import { FaqList } from "@/components/site/FaqSection";
import { PageCta } from "@/components/site/PageCta";
import { PageHero } from "@/components/site/PageHero";
import { EN_FAQ_HEADING, EN_FAQ_SETS, faqItems } from "@/content/en/faq";
import { NICHE_LABELS, NICHE_PAGES } from "@/content/en/niches";
import { GROUP_EXTRAS, packagesForNiche, type Niche } from "@/content/en/packages";
import { publishedSamples } from "@/content/en/samples";
import { EN_CRUMBS, ORDER_CTA } from "@/content/en/site";
import { route } from "@/lib/site/nav";

/**
 * A niche page (weddings, YouTube, real estate): the hero with the niche's prices beside it, what you get and what we
 * need, the niche's packages from the pricing data (each with its own order button), how we work, samples once real
 * ones are published, the niche's questions and the order action.
 */
export function NichePageView({ niche }: { niche: Niche }) {
  const p = NICHE_PAGES[niche];
  const L = NICHE_LABELS;
  const packages = packagesForNiche(niche);
  const extras = GROUP_EXTRAS[niche] ?? [];
  const samples = publishedSamples(process.env, undefined, niche);
  return (
    <main id="main" className="page" data-page={`en-${niche}`}>
      <div className="wrap">
        <PageHero
          crumb={p.breadcrumb}
          path={p.path}
          root={EN_CRUMBS}
          eyebrow={p.hero.eyebrow}
          title={p.hero.title}
          lead={p.hero.lead}
          aside={<PricePanel heading={p.panel.heading} note={p.panel.note} packages={packages} />}
        >
          <Link className="btn btn--pri" href={orderHref(p.leadPackage, p.path)}>
            {p.hero.cta}
            <ArrowRight />
          </Link>
          <Link className="btn btn--sec" href={route("/en/pricing")}>
            {L.allPrices}
          </Link>
        </PageHero>
      </div>

      <section className="paper sv-sec wrap" aria-labelledby="get-h">
        <div className="sv-split sv-split--boxes">
          <div className="sv-col">
            <h2 className="h2 h2--md" id="get-h">
              {p.get.heading}
            </h2>
            <ul className="ticks">
              {p.get.items.map((i) => (
                <li key={i}>
                  <Check />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="sv-box">
            <h3 className="en-box__h">{p.need.heading}</h3>
            <ol className="en-need">
              {p.need.items.map((i, n) => (
                <li key={i}>
                  <b aria-hidden="true">{String(n + 1).padStart(2, "0")}</b>
                  <span>{i}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="paper sv-sec sv-sec--rule wrap" aria-labelledby="pk-h">
        <div className="sv-head">
          <h2 className="h2 h2--md" id="pk-h">
            {p.packagesHeading}
          </h2>
          <p className="sv-head__p">{p.packagesLead}</p>
        </div>
        <PackageGrid packages={packages} from={p.path} />
        {extras.length > 0 && (
          <div className="en-extras">
            <h3 className="sv-label">{L.extras}</h3>
            <ul>
              {extras.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="sv-sec sv-dark wrap" aria-labelledby="notes-h">
        <h2 className="h2 h2--md sv-h-solo" id="notes-h">
          {p.notes.heading}
        </h2>
        <ul className="en-notes">
          {p.notes.items.map((n, i) => (
            <li key={n.title}>
              <b aria-hidden="true">{String(i + 1).padStart(2, "0")}</b>
              <h3>{n.title}</h3>
              <p>{n.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {samples.length > 0 && <SamplesBand id="samples-h" heading={p.samplesHeading} samples={samples} />}

      <FaqList heading={EN_FAQ_HEADING} items={faqItems(EN_FAQ_SETS[niche])} />
      <PageCta
        id="niche-cta-h"
        heading={p.cta.heading}
        body={p.cta.body}
        action={{ href: orderHref(p.leadPackage, p.path), label: ORDER_CTA }}
        secondary={{ href: route("/en/how-it-works"), label: L.howItWorks }}
      />
      <EnMotion />
    </main>
  );
}
