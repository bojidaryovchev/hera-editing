import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plus } from "@/components/icons";
import { OneVideo } from "@/components/site/OneVideo";
import { PageCta } from "@/components/site/PageCta";
import { PageHero } from "@/components/site/PageHero";
import { HOME } from "@/content/home";
import { FORMATS } from "@/content/shared";
import { VIDEO } from "@/content/video";
import { quoteHref, route } from "@/lib/site/nav";
import { pageMetadata } from "@/lib/site/metadata";

const PATH = "/video-sadarzhanie-za-biznes";
const SERVICE_PATH = route("/upravlenie-na-sotsialni-mrezhi");

export const metadata: Metadata = pageMetadata("video");

const pad2 = (n: number) => String(n).padStart(2, "0");

/**
 * /video-sadarzhanie-za-biznes (IA:48-53): filming inside the recurring service, never a standalone editing offer.
 * A supporting page (research/05: the head video searches are weddings), so it links on to the service page. No
 * footage until the agency's own exists: the formats are shown as empty 9:16 frames, honestly labelled.
 */
export default function VideoPage() {
  const v = VIDEO;
  return (
    <main id="main" className="page" data-page="video">
      <div className="wrap">
        <PageHero
          crumb={v.breadcrumb}
          path={PATH}
          eyebrow={v.hero.eyebrow}
          title={v.hero.title}
          lead={v.hero.lead}
          aside={<Viewfinder />}
          media
        >
          <Link className="btn btn--pri" href={quoteHref(PATH)}>
            {v.hero.cta}
          </Link>
          <Link className="link" href={SERVICE_PATH}>
            {v.service.serviceLink}
            <ArrowRight />
          </Link>
        </PageHero>
      </div>

      <section className="paper sv-sec wrap" aria-labelledby="vproc-h">
        <h2 className="h2 h2--md sv-h-solo" id="vproc-h">
          {v.process.heading}
        </h2>
        <ol className="vsteps">
          {v.process.steps.map((st, i) => (
            <li key={st.title} className="vstep">
              <span className="vstep__n" aria-hidden="true">
                {pad2(i + 1)}
              </span>
              <h3>{st.title}</h3>
              <p>{st.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="sv-sec sv-dark wrap" aria-labelledby="vfmt-h">
        <div className="sv-head">
          <h2 className="h2 h2--md" id="vfmt-h">
            {v.formats.heading}
          </h2>
          <p className="sv-head__p">{v.formats.lead}</p>
        </div>
        <ul className="vfmts">
          {FORMATS.map((f, i) => (
            <li key={f.id} className="vfmt">
              <div className="vfmt__frame" aria-hidden="true">
                <span className="vfmt__tag">{HOME.formats.tag}</span>
                <b>{pad2(i + 1)}</b>
              </div>
              <h3>{f.name}</h3>
              <p>{f.text}</p>
            </li>
          ))}
          <li className="vfmt vfmt--idea">
            <div className="vfmt__frame" aria-hidden="true">
              <span className="vfmt__tag">{HOME.formats.idea.tag}</span>
              <span className="vfmt__plus">
                <Plus />
              </span>
            </div>
            <h3>{HOME.formats.idea.name}</h3>
            <p>{HOME.formats.idea.text}</p>
          </li>
        </ul>
      </section>

      <section className="paper sv-sec wrap" aria-labelledby="batch-h">
        <div className="sv-split sv-split--even">
          <div className="sv-col">
            <h2 className="h2 h2--md" id="batch-h">
              {v.batching.heading}
            </h2>
            <p className="sv-lead">{v.batching.text}</p>
          </div>
          <Batch />
        </div>
      </section>

      <section className="paper sv-sec sv-sec--rule wrap" aria-labelledby="cost-h">
        <div className="sv-split sv-split--even">
          <div className="sv-col">
            <h2 className="h2 h2--md" id="cost-h">
              {v.costs.heading}
            </h2>
            <p className="sv-lead">{v.costs.text}</p>
            <p className="sv-p">{v.costs.quoteText}</p>
            <p className="sv-small">{v.costs.musicText}</p>
          </div>
          <OneVideo />
        </div>
      </section>

      <PageCta
        id="video-cta-h"
        heading={v.service.heading}
        body={v.service.text}
        action={{ href: quoteHref(PATH), label: v.hero.cta }}
        secondary={{ href: SERVICE_PATH, label: v.service.serviceLink }}
      />
    </main>
  );
}

/** A 9:16 viewfinder beside the hero: what is being made, without pretending to be footage. Decorative. */
function Viewfinder() {
  const vf = VIDEO.hero.viewfinder;
  return (
    <div className="vf" aria-hidden="true">
      <div className="vf__frame">
        <i className="vf__c vf__c--tl" />
        <i className="vf__c vf__c--tr" />
        <i className="vf__c vf__c--bl" />
        <i className="vf__c vf__c--br" />
        <p className="vf__top">
          <span>
            <i className="dot" />
            {vf.rec}
          </span>
          <span>{vf.time}</span>
        </p>
        <i className="vf__focus" />
        <p className="vf__bottom">{vf.format}</p>
      </div>
    </div>
  );
}

/** One shoot day fanning out into several short videos (the batching paragraph says it in words). Decorative. */
function Batch() {
  const b = VIDEO.batching;
  return (
    <div className="batch" aria-hidden="true">
      <p className="batch__day">
        <i className="dot" />
        {b.day}
      </p>
      <svg className="batch__fan" viewBox="0 0 400 60" preserveAspectRatio="none">
        <path d="M200 0 C 200 30, 50 30, 50 60 M200 0 C 200 30, 150 30, 150 60 M200 0 C 200 30, 250 30, 250 60 M200 0 C 200 30, 350 30, 350 60" />
      </svg>
      <ol className="batch__clips">
        {[1, 2, 3, 4].map((n) => (
          <li key={n}>
            <i />
            <span>
              {b.clip} {pad2(n)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
