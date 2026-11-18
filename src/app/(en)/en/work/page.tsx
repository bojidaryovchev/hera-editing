import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { orderHref } from "@/components/en/Packages";
import { SampleCards } from "@/components/en/Samples";
import { ArrowRight } from "@/components/icons";
import { PageCta } from "@/components/site/PageCta";
import { PageHero } from "@/components/site/PageHero";
import { NICHE_ORDER, NICHE_PAGES } from "@/content/en/niches";
import { EN_WORK } from "@/content/en/pages";
import { publishedSamples } from "@/content/en/samples";
import { EN_CRUMBS, ORDER_CTA } from "@/content/en/site";
import { enPageMetadata, enPagePath } from "@/lib/en/metadata";
import { requireEnSection } from "@/lib/en/section";

const PATH = enPagePath("work");

export const metadata: Metadata = enPageMetadata("work");

/**
 * /en/work: published samples by niche (strategy §8), each labelled demo edit or client work, with where its footage
 * and music come from. Without a published sample the page does not exist (404), like /rabota, and nothing links here.
 */
export default function WorkPage() {
  requireEnSection();
  const samples = publishedSamples();
  if (samples.length === 0) notFound();
  const w = EN_WORK;
  return (
    <main id="main" className="page" data-page="en-work">
      <div className="wrap">
        <PageHero crumb={w.breadcrumb} path={PATH} root={EN_CRUMBS} title={w.title} lead={w.lead} pair>
          <Link className="btn btn--pri" href={orderHref(null, PATH)}>
            {ORDER_CTA}
            <ArrowRight />
          </Link>
        </PageHero>
      </div>
      {NICHE_ORDER.map((n) => {
        const list = samples.filter((s) => s.niche === n);
        if (list.length === 0) return null;
        const page = NICHE_PAGES[n];
        return (
          <section key={n} className="paper sv-sec wrap en-work" aria-labelledby={`work-${n}-h`}>
            <div className="en-band__head">
              <h2 className="h2 h2--md" id={`work-${n}-h`}>
                {page.samplesHeading}
              </h2>
              <Link className="link" href={orderHref(page.leadPackage, PATH)}>
                {page.hero.cta}
                <ArrowRight />
              </Link>
            </div>
            <SampleCards samples={list} />
          </section>
        );
      })}
      <PageCta
        id="work-cta-h"
        heading={w.cta.heading}
        body={w.cta.body}
        action={{ href: orderHref(null, PATH), label: ORDER_CTA }}
      />
    </main>
  );
}
