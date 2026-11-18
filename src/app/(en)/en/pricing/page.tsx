import type { Metadata } from "next";
import Link from "next/link";
import { PackageGrid, orderHref } from "@/components/en/Packages";
import { ArrowRight, Check } from "@/components/icons";
import { PageCta } from "@/components/site/PageCta";
import { PageHero } from "@/components/site/PageHero";
import { EN_PRICING } from "@/content/en/pages";
import { ADD_ONS, CUSTOMERS, CUSTOM_QUOTES, GROUP_EXTRAS, foundingOfferOpen, packagesFor } from "@/content/en/packages";
import { EN_CRUMBS, ORDER_CTA } from "@/content/en/site";
import { NICHE_LABELS, NICHE_PAGES } from "@/content/en/niches";
import { enPageMetadata, enPagePath } from "@/lib/en/metadata";
import { requireEnSection } from "@/lib/en/section";
import { route } from "@/lib/site/nav";

const PATH = enPagePath("pricing");

export const metadata: Metadata = enPageMetadata("pricing");

/**
 * /en/pricing: every package of strategy §5, both waves, grouped by customer, each with what it includes, its
 * footage and length limits, turnaround and revisions; then the add-ons (research Part 2 §6.7), custom quotes, the
 * founding offer and payment. All from src/content/en/packages.ts, the one source of the numbers.
 */
export default function PricingPage() {
  requireEnSection();
  const p = EN_PRICING;
  const founding = foundingOfferOpen();
  return (
    <main id="main" className="page" data-page="en-pricing">
      <div className="wrap">
        <PageHero
          crumb={p.breadcrumb}
          path={PATH}
          root={EN_CRUMBS}
          eyebrow={p.hero.eyebrow}
          title={p.hero.title}
          lead={p.hero.lead}
          aside={
            <section className="ipanel" aria-labelledby="basics-h">
              <h2 className="ipanel__h" id="basics-h">
                {p.basics.heading}
              </h2>
              <dl className="en-basics">
                {p.basics.rows.map((r) => (
                  <div key={r.label}>
                    <dt>{r.label}</dt>
                    <dd>{r.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          }
        >
          <Link className="btn btn--pri" href={orderHref(null, PATH)}>
            {ORDER_CTA}
            <ArrowRight />
          </Link>
        </PageHero>
      </div>

      <section className="paper sv-sec wrap" aria-labelledby="groups-h">
        <div className="sv-head">
          <h2 className="h2 h2--md" id="groups-h">
            {p.groupsHeading}
          </h2>
          <p className="sv-head__p">{p.groupsLead}</p>
        </div>
        <nav className="en-jump" aria-label={p.groupsHeading}>
          <ul>
            {CUSTOMERS.map((c) => (
              <li key={c.id}>
                <a href={`#group-${c.id}`}>{c.name}</a>
              </li>
            ))}
          </ul>
        </nav>
        {CUSTOMERS.map((c) => {
          const extras = GROUP_EXTRAS[c.id] ?? [];
          return (
            <section key={c.id} className="en-group" id={`group-${c.id}`} aria-labelledby={`group-${c.id}-h`}>
              <div className="en-group__head">
                <h3 className="en-group__h" id={`group-${c.id}-h`}>
                  {c.name}
                </h3>
                <p>{c.lead}</p>
                {c.niche && (
                  <Link className="link" href={route(NICHE_PAGES[c.niche].path)}>
                    {NICHE_PAGES[c.niche].breadcrumb}
                    <ArrowRight />
                  </Link>
                )}
              </div>
              <PackageGrid packages={packagesFor(c.id)} from={PATH} level={4} />
              {extras.length > 0 && (
                <div className="en-extras">
                  <h4 className="sv-label">{NICHE_LABELS.extras}</h4>
                  <ul>
                    {extras.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          );
        })}
      </section>

      <section className="sv-sec sv-dark wrap" aria-labelledby="addons-h">
        <div className="sv-head">
          <h2 className="h2 h2--md" id="addons-h">
            {p.addOns.heading}
          </h2>
          <p className="sv-head__p">{p.addOns.lead}</p>
        </div>
        <table className="en-addons">
          <caption className="sr-only-x">{p.addOns.heading}</caption>
          <thead>
            <tr>
              <th scope="col">{p.addOns.columns[0]}</th>
              <th scope="col">{p.addOns.columns[1]}</th>
            </tr>
          </thead>
          <tbody>
            {ADD_ONS.map((a) => (
              <tr key={a.id}>
                <th scope="row">
                  {a.name}
                  {a.note && <small>{a.note}</small>}
                </th>
                <td>{a.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="paper sv-sec wrap" aria-labelledby="custom-h">
        <div className="sv-split sv-split--boxes">
          <div className="sv-col">
            <h2 className="h2 h2--md" id="custom-h">
              {p.custom.heading}
            </h2>
            <p className="sv-lead">{p.custom.lead}</p>
            <h3 className="sv-label">{p.custom.whenHeading}</h3>
            <ul className="ticks">
              {CUSTOM_QUOTES.when.map((w) => (
                <li key={w}>
                  <Check />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="sv-box">
            <h3 className="en-box__h">{p.custom.howHeading}</h3>
            <ol className="en-need">
              {p.custom.how.map((step, i) => (
                <li key={step}>
                  <b aria-hidden="true">{String(i + 1).padStart(2, "0")}</b>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <Link className="btn btn--sec en-box__cta" href={orderHref("custom", PATH)}>
              {p.custom.action}
            </Link>
          </div>
        </div>
      </section>

      {founding && (
        <section className="sv-sec sv-dark en-founding wrap" aria-labelledby="founding-h">
          <div className="en-founding__in">
            <p className="eyebrow">{p.founding.eyebrow}</p>
            <h2 className="h2 h2--md" id="founding-h">
              {p.founding.heading}
            </h2>
            <p className="sv-lead">{p.founding.text}</p>
          </div>
        </section>
      )}

      <section className="paper sv-sec wrap" aria-labelledby="payment-h">
        <div className="en-band__head">
          <h2 className="h2 h2--md" id="payment-h">
            {p.payment.heading}
          </h2>
          <Link className="link" href={route("/en/terms")}>
            {p.payment.termsLink}
            <ArrowRight />
          </Link>
        </div>
        <ul className="en-written en-written--4">
          {p.payment.items.map((it, i) => (
            <li key={it.title}>
              <b aria-hidden="true">{String(i + 1).padStart(2, "0")}</b>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <PageCta
        id="pricing-cta-h"
        heading={p.cta.heading}
        body={p.cta.body}
        action={{ href: orderHref(null, PATH), label: ORDER_CTA }}
      />
    </main>
  );
}
