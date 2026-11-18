import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/icons";
import { PageCta } from "@/components/site/PageCta";
import { PageHero } from "@/components/site/PageHero";
import { ProjectMedia } from "@/components/work/ProjectMedia";
import { publishedProjects } from "@/content/projects";
import { FINAL_CTA } from "@/content/shared";
import { QUOTE_CTA } from "@/content/site";
import { WORK } from "@/content/work";
import { casePath, pageMetadata, pagePath } from "@/lib/site/metadata";
import { quoteHref, route } from "@/lib/site/nav";

const PATH = pagePath("work");

export const metadata: Metadata = pageMetadata("work");

const TONES = ["a", "b", "c", "d", "e"] as const;

/**
 * /rabota (IA:13, 58-59): real, approved work only. Without a published project the page does not exist (404,
 * noindex), the menu hides it and the sitemap leaves it out, so its absence never implies experience (IA:21).
 */
export default function WorkPage() {
  const projects = publishedProjects();
  if (projects.length === 0) notFound();
  return (
    <main id="main" className="page" data-page="work">
      <div className="wrap">
        <PageHero crumb={WORK.breadcrumb} path={PATH} title={WORK.title} lead={WORK.lead} pair>
          <Link className="btn btn--pri" href={quoteHref(PATH)}>
            {QUOTE_CTA}
          </Link>
        </PageHero>
      </div>
      <section className="paper sv-sec wrap" aria-label={WORK.title}>
        <ul className="wgrid">
          {projects.map((p, i) => (
            <li key={p.slug} className="wcard">
              <div className="wcard__media">
                <ProjectMedia
                  video={p.video}
                  poster={p.poster}
                  project={p.slug}
                  tone={TONES[i % TONES.length]}
                  sizes="(max-width: 699px) 100vw, (max-width: 1099px) 50vw, 33vw"
                />
              </div>
              {p.fixture && <p className="gate">{WORK.fixtureLabel}</p>}
              <p className="wcard__cat">
                <span>{WORK.categoryLabel}</span> {p.category}
              </p>
              <h2 className="wcard__h">{p.businessName}</h2>
              <p className="wcard__p">{p.summary}</p>
              <Link className="link" href={route(casePath(p.slug))}>
                {WORK.cardCta}
                <span className="sr-only-x"> – {p.businessName}</span>
                <ArrowRight />
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <PageCta
        id="work-cta-h"
        heading={FINAL_CTA.heading}
        body={FINAL_CTA.body}
        action={{ href: quoteHref(PATH), label: QUOTE_CTA }}
      />
    </main>
  );
}
