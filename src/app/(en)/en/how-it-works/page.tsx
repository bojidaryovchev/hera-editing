import type { Metadata } from "next";
import Link from "next/link";
import { EnMotion } from "@/components/en/EnMotion";
import { orderHref } from "@/components/en/Packages";
import { StepsTrack } from "@/components/en/Steps";
import { ArrowRight } from "@/components/icons";
import { FaqList } from "@/components/site/FaqSection";
import { PageCta } from "@/components/site/PageCta";
import { PageHero } from "@/components/site/PageHero";
import { EN_FAQ_HEADING, EN_FAQ_SETS, faqItems } from "@/content/en/faq";
import { EN_HOW } from "@/content/en/pages";
import { EN_CRUMBS, ORDER_CTA } from "@/content/en/site";
import { enPageMetadata, enPagePath } from "@/lib/en/metadata";
import { requireEnSection } from "@/lib/en/section";

const PATH = enPagePath("how");

export const metadata: Metadata = enPageMetadata("how");

const hour = (h: number) => `${String(((h % 24) + 24) % 24).padStart(2, "0")}:00`;

/**
 * /en/how-it-works: the process (four steps on the timeline), the delivery clock, time zones, AI use and the full FAQ
 * (files, revisions, turnaround, payment, refunds, time zone, no calls, music licences, AI use).
 */
export default function HowItWorksPage() {
  requireEnSection();
  const h = EN_HOW;
  const z = h.zones;
  return (
    <main id="main" className="page" data-page="en-how">
      <div className="wrap">
        <PageHero
          crumb={h.breadcrumb}
          path={PATH}
          root={EN_CRUMBS}
          eyebrow={h.hero.eyebrow}
          title={h.hero.title}
          lead={h.hero.lead}
          pair
        >
          <Link className="btn btn--pri" href={orderHref(null, PATH)}>
            {ORDER_CTA}
            <ArrowRight />
          </Link>
        </PageHero>
      </div>

      <StepsTrack id="steps-h" heading={h.stepsHeading} />

      <section className="paper sv-sec wrap" aria-labelledby="clock-h">
        <div className="sv-head">
          <h2 className="h2 h2--md" id="clock-h">
            {h.clock.heading}
          </h2>
          <p className="sv-head__p">{h.clock.lead}</p>
        </div>
        <ul className="en-written en-written--4">
          {h.clock.items.map((it, i) => (
            <li key={it.title}>
              <b aria-hidden="true">{String(i + 1).padStart(2, "0")}</b>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="sv-sec sv-dark wrap" aria-labelledby="zones-h">
        <div className="sv-split sv-split--even">
          <div className="sv-col">
            <h2 className="h2 h2--md" id="zones-h">
              {z.heading}
            </h2>
            <p className="sv-lead">{z.text}</p>
          </div>
          <div className="en-zones" role="img" aria-label={z.label}>
            {z.lanes.map((lane) => (
              <div key={lane.city} className="en-zones__lane">
                <span className="en-zones__city">{lane.city}</span>
                <span className="en-zones__bar">
                  <i className="en-zones__work" />
                  <span className="en-zones__from">{hour(z.workStart + lane.offset)}</span>
                  <span className="en-zones__to">{hour(z.workEnd + lane.offset)}</span>
                </span>
              </div>
            ))}
            <p className="en-zones__note">{z.lanes[0]?.note}</p>
          </div>
        </div>
      </section>

      <section className="paper sv-sec wrap" aria-labelledby="ai-h">
        <div className="sv-split sv-split--even">
          <h2 className="h2 h2--md" id="ai-h">
            {h.ai.heading}
          </h2>
          <p className="sv-lead">{h.ai.text}</p>
        </div>
      </section>

      <FaqList heading={EN_FAQ_HEADING} items={faqItems(EN_FAQ_SETS.how)} />
      <PageCta
        id="how-cta-h"
        heading={h.cta.heading}
        body={h.cta.body}
        action={{ href: orderHref(null, PATH), label: ORDER_CTA }}
      />
      <EnMotion />
    </main>
  );
}
