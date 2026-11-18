import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { gridColumns } from "@/components/en/Packages";
import { Scene, type SceneTone } from "@/components/site/Scene";
import { CUSTOMERS } from "@/content/en/packages";
import { EN_WORK } from "@/content/en/pages";
import { videoPlatform, type Sample } from "@/content/en/samples";
import { route } from "@/lib/site/nav";

const TONES: readonly SceneTone[] = ["a", "b", "c", "d", "e"];
const nicheName = (s: Sample) => CUSTOMERS.find((c) => c.niche === s.niche)?.name ?? s.niche;

/**
 * Published samples (src/content/en/samples.ts): every card says whether it is a demo edit or client work, where
 * its footage and music come from and who allowed it. The video opens on YouTube or Vimeo (unlisted), so nothing is
 * embedded or loaded from those sites here. A fixture (tests only) is labelled as fictional.
 */
export function SampleCards({ samples }: { samples: readonly Sample[] }) {
  const w = EN_WORK;
  return (
    <ul className="en-samples" style={gridColumns(samples.length)}>
      {samples.map((s, i) => (
        <li key={s.id} className="en-sample">
          <div className="en-sample__media">
            {s.poster ? (
              <Image
                src={s.poster.src}
                alt={s.poster.alt}
                width={s.poster.width}
                height={s.poster.height}
                sizes="(max-width: 699px) 100vw, (max-width: 1199px) 50vw, 33vw"
              />
            ) : (
              <Scene tone={TONES[i % TONES.length]} focus={false} />
            )}
          </div>
          <p className="en-sample__tags">
            <span className={`en-tag${s.kind === "demo" ? " en-tag--demo" : ""}`}>
              {s.kind === "demo" ? w.demoLabel : w.clientLabel}
            </span>
            <span>{nicheName(s)}</span>
          </p>
          {s.fixture && <p className="gate gate--paper">{w.fixtureLabel}</p>}
          <h3 className="en-sample__h">{s.title}</h3>
          <p className="en-sample__p">{s.description}</p>
          <dl className="en-sample__rights">
            <div>
              <dt>{w.footage}</dt>
              <dd>
                {s.rights.footageSource}; {s.rights.footageLicence}
              </dd>
            </div>
            <div>
              <dt>{w.music}</dt>
              <dd>{s.rights.musicLicence}</dd>
            </div>
            <div>
              <dt>{w.permissions}</dt>
              <dd>{s.rights.permissions}</dd>
            </div>
          </dl>
          <a className="link" href={s.videoUrl} target="_blank" rel="noopener noreferrer" data-sample={s.id}>
            {w.watch[videoPlatform(s.videoUrl)]}
            <span className="sr-only-x">
              : {s.title} {w.opensNewTab}
            </span>
            <ArrowRight />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** A band of samples on the home and niche pages, only when published samples exist (the caller checks). */
export function SamplesBand({
  id,
  heading,
  samples,
  more,
}: {
  id: string;
  heading: string;
  samples: readonly Sample[];
  more?: string;
}) {
  return (
    <section className="paper sv-sec sv-sec--rule wrap" aria-labelledby={id}>
      <div className="en-band__head">
        <h2 className="h2 h2--md" id={id}>
          {heading}
        </h2>
        {more && (
          <Link className="link" href={route("/en/work")}>
            {more}
            <ArrowRight />
          </Link>
        )}
      </div>
      <SampleCards samples={samples} />
    </section>
  );
}
