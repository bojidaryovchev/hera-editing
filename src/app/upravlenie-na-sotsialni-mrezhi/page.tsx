import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "@/components/icons";
import { FaqSection } from "@/components/site/FaqSection";
import { PageCta } from "@/components/site/PageCta";
import { PageHero } from "@/components/site/PageHero";
import { FAQ_SETS } from "@/content/faq";
import { SERVICE } from "@/content/service";
import { FINAL_CTA, FORMATS, PLATFORMS, QUOTE_DRIVERS, TIERS, VOLUME_NOTE } from "@/content/shared";
import { QUOTE_CTA } from "@/content/site";
import { quoteHref, route } from "@/lib/site/nav";
import { pageMetadata } from "@/lib/site/metadata";

const PATH = "/upravlenie-na-sotsialni-mrezhi";

export const metadata: Metadata = pageMetadata("service");

const pad2 = (n: number) => String(n).padStart(2, "0");

/**
 * /upravlenie-na-sotsialni-mrezhi (IA:39-46) in the order of decision L4. The search phrase people actually use,
 * „поддръжка на фейсбук страница“ (research/05), heads the "included" section, answered in its first paragraph.
 */
export default function ServicePage() {
  const s = SERVICE;
  return (
    <main id="main" className="page" data-page="service">
      <div className="wrap">
        <PageHero crumb={s.breadcrumb} path={PATH} eyebrow={s.hero.eyebrow} title={s.hero.title} lead={s.hero.lead} aside={<Inclusions />}>
          <Link className="btn btn--pri" href={quoteHref(PATH)}>
            {QUOTE_CTA}
          </Link>
          <Link className="btn btn--sec" href={route("/paketi")}>
            {s.quote.packagesLink}
          </Link>
        </PageHero>
      </div>
      <Included />
      <Suits />
      <FirstMonth />
      <Approval />
      <Responsibilities />
      <Channels />
      <Price />
      <FaqSection ids={FAQ_SETS.service} />
      <PageCta id="svc-cta-h" heading={FINAL_CTA.heading} body={FINAL_CTA.body} action={{ href: quoteHref(PATH), label: QUOTE_CTA }} />
    </main>
  );
}

/** The hero's inspector panel: the six inclusions at a glance, like the homepage's list of stages. */
function Inclusions() {
  const h = SERVICE.hero;
  return (
    <section className="ipanel" aria-labelledby="incl-h">
      <p className="ipanel__top">
        <span>
          <i className="dot" aria-hidden="true" />
          <span id="incl-h">{h.inclusionsLabel}</span>
        </span>
        <span aria-hidden="true">{pad2(h.inclusions.length)}</span>
      </p>
      <ol className="ipanel__list">
        {h.inclusions.map((x, i) => (
          <li key={x}>
            <b aria-hidden="true">{pad2(i + 1)}</b>
            <span>{x}</span>
            <Check />
          </li>
        ))}
      </ol>
    </section>
  );
}

function Included() {
  const inc = SERVICE.included;
  return (
    <section className="paper sv-sec wrap" aria-labelledby="inc-h">
      <div className="sv-head">
        <h2 className="h2 h2--md" id="inc-h">
          {inc.heading}
        </h2>
        <p className="sv-head__p">{inc.answer}</p>
      </div>
      <ol className="sv-cards">
        {inc.items.map((it, i) => (
          <li key={it.title} className="sv-card">
            <span className="sv-card__n" aria-hidden="true">
              {pad2(i + 1)}
            </span>
            <h3>{it.title}</h3>
            <p>{it.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Suits() {
  const su = SERVICE.suits;
  return (
    <section className="paper sv-sec sv-sec--rule wrap" aria-labelledby="suits-h">
      <div className="sv-split">
        <div className="sv-col">
          <h2 className="h2 h2--md" id="suits-h">
            {su.heading}
          </h2>
          <p className="sv-lead">{su.lead}</p>
          <p className="sv-label">{su.examplesLabel}</p>
          <ul className="chips">
            {su.examples.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
        <div className="sv-box">
          <h3 className="sv-label">{su.fitLabel}</h3>
          <ul className="ticks">
            {su.fit.map((f) => (
              <li key={f}>
                <Check />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** The first month on a track: two clips of two weeks, then the monthly cycle that repeats. */
function FirstMonth() {
  const m = SERVICE.firstMonth;
  return (
    <section className="sv-sec sv-dark wrap" aria-labelledby="month-h">
      <div className="sv-head">
        <h2 className="h2 h2--md" id="month-h">
          {m.heading}
        </h2>
        <p className="sv-note">{m.note}</p>
      </div>
      <div className="mtrack">
        <p className="mtrack__ruler" aria-hidden="true">
          <span>{m.firstLabel}</span>
          <span>{m.repeatLabel}</span>
        </p>
        <ol className="mtrack__clips">
          {m.steps.map((st, i) => (
            <li key={st.label} className={`mtrack__clip${i === m.steps.length - 1 ? " mtrack__clip--loop" : ""}`}>
              <span className="mtrack__bar">
                <b>{st.label}</b>
              </span>
              <p>{st.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

type Status = "published" | "approved" | "waiting";
/** An example month (two videos a week), labelled as such: statuses move from published to waiting for approval. */
const EXAMPLE_MONTH: readonly (readonly { day: number; format: (typeof FORMATS)[number]["id"]; status: Status }[])[] = [
  [
    { day: 1, format: "process", status: "published" },
    { day: 4, format: "bts", status: "published" },
  ],
  [
    { day: 1, format: "product", status: "published" },
    { day: 4, format: "tips", status: "published" },
  ],
  [
    { day: 1, format: "team", status: "approved" },
    { day: 4, format: "process", status: "approved" },
  ],
  [
    { day: 1, format: "product", status: "waiting" },
    { day: 4, format: "bts", status: "waiting" },
  ],
];

function Approval() {
  const a = SERVICE.approval;
  const label: Record<Status, string> = { published: a.statusPublished, approved: a.statusApproved, waiting: a.statusWaiting };
  const formatName = (id: string) => FORMATS.find((f) => f.id === id)?.name ?? "";
  return (
    <section className="sv-sec sv-dark sv-sec--rule-dark wrap" aria-labelledby="appr-h">
      <div className="sv-split sv-split--wide">
        <div className="sv-col">
          <h2 className="h2 h2--md" id="appr-h">
            {a.heading}
          </h2>
          <p className="sv-principle">{a.principle}</p>
          <ol className="nsteps">
            {a.steps.map((st, i) => (
              <li key={st}>
                <b aria-hidden="true">{pad2(i + 1)}</b>
                <span>{st}</span>
              </li>
            ))}
          </ol>
          <p className="sv-small">{a.revisions}</p>
        </div>
        <figure className="cal">
          <figcaption className="cal__top">
            <b>{a.calendarTitle}</b>
            <span>{a.calendarNote}</span>
          </figcaption>
          <ul className="cal__legend">
            {(Object.keys(label) as Status[]).map((st) => (
              <li key={st} className={`st st--${st}`}>
                {label[st]}
              </li>
            ))}
          </ul>
          <ol className="cal__weeks">
            {EXAMPLE_MONTH.map((week, w) => (
              <li key={w} className="cal__week">
                <span className="cal__wk">
                  {a.weekLabel} {w + 1}
                </span>
                <ul className="cal__row">
                  {week.map((e) => (
                    <li key={e.day} className={`cal__e cal__e--${e.status}`}>
                      <span className="cal__d">{a.weekdays[e.day]}</span>
                      <b>{formatName(e.format)}</b>
                      <span className={`st st--${e.status}`}>{label[e.status]}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </figure>
      </div>
    </section>
  );
}

function Responsibilities() {
  const r = SERVICE.responsibilities;
  return (
    <section className="paper sv-sec wrap" aria-labelledby="resp-h">
      <div className="sv-split">
        <h2 className="h2 h2--md" id="resp-h">
          {r.heading}
        </h2>
        <ol className="nsteps nsteps--ink">
          {r.items.map((x, i) => (
            <li key={x}>
              <b aria-hidden="true">{pad2(i + 1)}</b>
              <span>{x}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Channels() {
  const c = SERVICE.channels;
  return (
    <section className="paper sv-sec sv-sec--rule wrap" aria-labelledby="chan-h">
      <h2 className="h2 h2--md sv-h-solo" id="chan-h">
        {c.heading}
      </h2>
      <div className="sv-split sv-split--even sv-split--boxes">
        <div className="sv-box">
          <h3 className="sv-label">{c.channelsLabel}</h3>
          <ul className="plats">
            {PLATFORMS.map((p) => (
              <li key={p.id}>
                <b>{p.name}</b>
                <span>{p.formats.join(" · ")}</span>
              </li>
            ))}
          </ul>
          <p>{c.channelsText}</p>
          <p className="sv-small">{c.musicText}</p>
        </div>
        <div className="sv-box">
          <h3 className="sv-label">{c.excludedLabel}</h3>
          <ul className="xlist">
            {c.excluded.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const SEQ: Record<(typeof TIERS)[number]["id"], number> = { start: 4, rastezh: 8, individualno: 12 };

function Price() {
  const q = SERVICE.quote;
  return (
    <section className="sv-sec sv-dark wrap" aria-labelledby="price-h">
      <div className="sv-split sv-split--wide">
        <div className="sv-col">
          <h2 className="h2 h2--md" id="price-h">
            {q.heading}
          </h2>
          <p className="sv-lead">{q.lead}</p>
          <ol className="drivers">
            {QUOTE_DRIVERS.map((d, i) => (
              <li key={d}>
                <b aria-hidden="true">{pad2(i + 1)}</b>
                <span>{d}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="tprev">
          <p className="tprev__top">{q.tiersLabel}</p>
          <ul className="tprev__list">
            {TIERS.map((t) => (
              <li key={t.id}>
                <b>{t.name}</b>
                <span className="seq seq--sm" aria-hidden="true">
                  {Array.from({ length: SEQ[t.id] }, (_, i) => (
                    <i key={i} />
                  ))}
                  {t.id === "individualno" && <i className="more" />}
                </span>
                <span className="tprev__v">{t.videos}</span>
              </li>
            ))}
          </ul>
          <p className="tprev__note">{VOLUME_NOTE}</p>
          <Link className="link" href={route("/paketi")}>
            {q.packagesLink}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
