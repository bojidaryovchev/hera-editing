import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "@/components/icons";
import { PageCta } from "@/components/site/PageCta";
import { PageHero } from "@/components/site/PageHero";
import { ProjectMedia } from "@/components/work/ProjectMedia";
import { ProjectVideo } from "@/components/work/ProjectVideo";
import { publishedProject, publishedProjects } from "@/content/projects";
import { FINAL_CTA } from "@/content/shared";
import { QUOTE_CTA } from "@/content/site";
import { WORK } from "@/content/work";
import { caseMetadata, casePath, pagePath } from "@/lib/site/metadata";
import { quoteHref, route } from "@/lib/site/nav";

type Params = Promise<{ slug: string }>;

// Only published projects have pages; any other slug (a draft, a typo) is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = publishedProject((await params).slug);
  return p ? caseMetadata(p) : {};
}

/**
 * A case study (IA:59): situation, approved goals, what the agency did, formats and samples. Results appear only
 * with a reporting window, a baseline and the method (never uplift without them), and the client's permission is
 * stated.
 */
export default async function CasePage({ params }: { params: Params }) {
  const p = publishedProject((await params).slug);
  if (!p) notFound();
  const path = casePath(p.slug);
  const c = WORK.case;
  return (
    <main id="main" className="page" data-page="case">
      <div className="wrap">
        <PageHero
          crumb={p.businessName}
          path={path}
          parent={{ name: WORK.breadcrumb, path: pagePath("work") }}
          eyebrow={p.category}
          title={p.businessName}
          lead={p.summary}
          aside={p.video ? <ProjectVideo video={p.video} poster={p.poster} project={p.slug} /> : undefined}
          media={Boolean(p.video)}
          pair={!p.video}
        >
          <Link className="btn btn--pri" href={quoteHref(path)}>
            {QUOTE_CTA}
          </Link>
          <Link className="link" href={route(pagePath("work"))}>
            {c.back}
            <ArrowRight />
          </Link>
        </PageHero>
        {p.fixture && <p className="gate wfix">{WORK.fixtureLabel}</p>}
      </div>

      <section className="paper sv-sec wrap" aria-labelledby="case-sit">
        <div className="sv-split sv-split--even">
          <div className="sv-col">
            <h2 className="h2 h2--md" id="case-sit">
              {c.situation}
            </h2>
            <p className="sv-lead">{p.situation}</p>
            {!p.video && (
              <div className="wcase__still">
                <ProjectMedia video={null} poster={p.poster} project={p.slug} sizes="(max-width: 899px) 100vw, 45vw" />
              </div>
            )}
            <p className="wattr">
              <b>{c.attribution}</b>
              <span>{p.attribution}</span>
            </p>
          </div>
          <div className="sv-box">
            {p.goals.length > 0 && (
              <>
                <h3 className="sv-label">{c.goals}</h3>
                <ul className="ticks">
                  {p.goals.map((g) => (
                    <li key={g}>
                      <Check />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {p.responsibility.length > 0 && (
              <>
                <h3 className="sv-label">{c.responsibility}</h3>
                <ul className="ticks">
                  {p.responsibility.map((r) => (
                    <li key={r}>
                      <Check />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {p.formats.length > 0 && (
              <>
                <h3 className="sv-label">{c.formats}</h3>
                <ul className="chips">
                  {p.formats.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      {p.samples.length > 0 && (
        <section className="sv-sec sv-dark wrap" aria-labelledby="case-samples">
          <h2 className="h2 h2--md sv-h-solo" id="case-samples">
            {c.samples}
          </h2>
          <ul className="wsamples">
            {p.samples.map((s) => (
              <li key={s.title}>
                <ProjectMedia video={s.video} poster={s.poster} project={p.slug} sizes="(max-width: 699px) 100vw, 33vw" />
                {!s.video && <p className="wsamples__t">{s.title}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {p.outcomes && (
        <section className={`paper sv-sec wrap${p.samples.length === 0 ? " sv-sec--rule" : ""}`} aria-labelledby="case-out">
          <h2 className="h2 h2--md sv-h-solo" id="case-out">
            {c.outcomes}
          </h2>
          <dl className="wout">
            {p.outcomes.items.map((o) => (
              <div key={o.label}>
                <dt>{o.label}</dt>
                <dd>{o.value}</dd>
              </div>
            ))}
          </dl>
          <dl className="wmeta">
            <div>
              <dt>{c.outcomesWindow}</dt>
              <dd>{p.outcomes.window}</dd>
            </div>
            <div>
              <dt>{c.outcomesBaseline}</dt>
              <dd>{p.outcomes.baseline}</dd>
            </div>
            <div>
              <dt>{c.methodology}</dt>
              <dd>{p.outcomes.methodology}</dd>
            </div>
          </dl>
        </section>
      )}

      <PageCta id="case-cta-h" heading={FINAL_CTA.heading} body={FINAL_CTA.body} action={{ href: quoteHref(path), label: QUOTE_CTA }} />
    </main>
  );
}
