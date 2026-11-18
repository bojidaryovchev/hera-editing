import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import type { SceneTone } from "@/components/site/Scene";
import { ProjectMedia } from "@/components/work/ProjectMedia";
import type { Project } from "@/content/projects/types";
import { WORK } from "@/content/work";
import { casePath } from "@/lib/site/metadata";
import { route } from "@/lib/site/nav";

/** A different light for each card's frame when a project has no still (the test fixtures only). */
const TONES: readonly SceneTone[] = ["a", "b", "c", "d", "e"];

/**
 * One published project (IA:59), on /rabota and on the homepage (IA:30): its clip or still, the business category,
 * the name, one sentence on the work and a link to the case. `permission` adds the client's permission on the card
 * itself, which the homepage module needs (IA:30); /rabota says it once, in its lead. The media box keeps its 4:5
 * size from the first paint, so nothing below it moves when the poster loads (L39).
 */
export function WorkCard({
  project: p,
  index,
  heading: Heading = "h2",
  permission = false,
}: {
  project: Project;
  index: number;
  heading?: "h2" | "h3";
  permission?: boolean;
}) {
  return (
    <li className="wcard">
      <div className="wcard__media">
        <ProjectMedia
          video={p.video}
          poster={p.poster}
          project={p.slug}
          tone={TONES[index % TONES.length]}
          sizes="(max-width: 699px) 100vw, (max-width: 1099px) 50vw, 33vw"
        />
      </div>
      {p.fixture && <p className="gate">{WORK.fixtureLabel}</p>}
      <p className="wcard__cat">
        <span>{WORK.categoryLabel}</span> {p.category}
      </p>
      <Heading className="wcard__h">{p.businessName}</Heading>
      <p className="wcard__p">{p.summary}</p>
      {permission && <p className="wcard__perm">{WORK.case.attribution}</p>}
      <Link className="link" href={route(casePath(p.slug))}>
        {WORK.cardCta}
        <span className="sr-only-x"> – {p.businessName}</span>
        <ArrowRight />
      </Link>
    </li>
  );
}
