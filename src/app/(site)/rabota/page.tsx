import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageCta } from "@/components/site/PageCta";
import { PageHero } from "@/components/site/PageHero";
import { WorkCard } from "@/components/work/WorkCard";
import { publishedProjects } from "@/content/projects";
import { FINAL_CTA } from "@/content/shared";
import { QUOTE_CTA } from "@/content/site";
import { WORK } from "@/content/work";
import { pageMetadata, pagePath } from "@/lib/site/metadata";
import { quoteHref } from "@/lib/site/nav";

const PATH = pagePath("work");

export const metadata: Metadata = pageMetadata("work");

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
            <WorkCard key={p.slug} project={p} index={i} />
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
