import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight, Check, PauseIcon, PlayIcon, Plus } from "@/components/icons";
import { FAQ, FAQ_HEADING, FAQ_SETS } from "@/content/faq";
import { HOME } from "@/content/home";
import { MEDIA } from "@/content/media";
import { FINAL_CTA, FORMATS, PRICE_LABEL, TIERS, TIER_COMMON_INCLUSIONS, VOLUME_NOTE } from "@/content/shared";
import { QUOTE_CTA } from "@/content/site";
import { VIDEO_PLAYER } from "@/content/work";
import { quoteHref, route } from "@/lib/site/nav";

const pad2 = (n: number) => String(n).padStart(2, "0");

const WEEKS = Array.from({ length: 12 }, (_, i) => i + 1);
/** Week positions (0–12) of the irregular posts in the "without a plan" lane: clusters and long gaps. */
const IRREGULAR = [0.3, 0.75, 1.55, 5.35, 6.5, 10.25, 10.7];
const pct = (week: number) => `${((week / 12) * 100).toFixed(3)}%`;

/**
 * Problem (IA:27). Headline left; beside it an example of posting without and with a monthly plan, then the text
 * (decision L24: balanced columns). The headline's words take colour and the plan's clips appear as you read.
 */
export function Problem() {
  const words = HOME.problem.heading.split(" ");
  const r = HOME.problem.rhythm;
  return (
    <section className="paper problem wrap" aria-labelledby="problem-h" data-problem>
      <div className="problem__grid">
        <h2 className="problem__h" id="problem-h">
          {words.map((w, i) => (
            <Fragment key={i}>
              <span className="w">{w}</span>
              {i < words.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </h2>
        <figure className="rhythm" role="img" aria-label={r.label}>
          <figcaption className="rhythm__top" aria-hidden="true">
            {r.title}
          </figcaption>
          <div className="rhythm__body" aria-hidden="true">
            <div className="rhythm__labels">
              <span />
              <span>{r.without}</span>
              <span>{r.with}</span>
            </div>
            <div className="rhythm__lanes">
              <div className="rhythm__ruler">
                {WEEKS.map((w) => (
                  <span key={w} style={{ left: pct(w - 0.5) }}>
                    {w}
                  </span>
                ))}
              </div>
              <div className="rhythm__lane">
                {IRREGULAR.map((x) => (
                  <i key={x} style={{ ["--x" as string]: pct(x) }} />
                ))}
              </div>
              <div className="rhythm__lane rhythm__lane--plan">
                {WEEKS.map((w) => (
                  <i key={w} data-rclip style={{ ["--x" as string]: pct(w - 0.5) }} />
                ))}
              </div>
              <div className="rhythm__ph" data-rph>
                <b />
              </div>
            </div>
          </div>
        </figure>
        <p className="problem__p">{HOME.problem.body}</p>
      </div>
    </section>
  );
}

/** Process (IA:28): six clips on one line, each saying who does what. */
export function Process() {
  const p = HOME.process;
  return (
    <section className="proc" id={p.id} aria-labelledby="proc-h" data-proc>
      <div className="proc__in">
        <div className="proc__head wrap">
          <h2 className="h2" id="proc-h">
            {p.heading}
          </h2>
          <p className="proc__note">{p.note}</p>
        </div>
        <div className="proc__vp">
          <ol className="proc__track" data-track>
            {p.steps.map((st, i) => (
              <li key={st.title} className="pclip">
                <p className="pclip__top">
                  <span>
                    {p.stepLabel} {pad2(i + 1)}
                  </span>
                  <span aria-hidden="true">00:{pad2(i * 2)}</span>
                </p>
                <div className="pclip__thumb" aria-hidden="true">
                  <i />
                </div>
                <h3>{st.title}</h3>
                <dl>
                  <dt>{p.we}</dt>
                  <dd>{st.we}</dd>
                  <dt>{p.you}</dt>
                  <dd>{st.you}</dd>
                </dl>
              </li>
            ))}
          </ol>
          <div className="proc__ph" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function PlayButton({ name, attr }: { name: string; attr: string }) {
  return (
    <button type="button" className="vbtn" {...{ [attr]: "" }} data-playing="false" aria-label={`${VIDEO_PLAYER.play}: ${name}`}>
      <PlayIcon className="i-play" />
      <PauseIcon className="i-pause" />
    </button>
  );
}

/** Formats (IA:31): the media bin. One clip plays at a time, always with a play/pause control (DS:33). */
export function Formats() {
  const f = HOME.formats;
  return (
    <section className="bin wrap" aria-labelledby="bin-h">
      <div className="bin__head">
        <h2 className="h2" id="bin-h">
          {f.heading}
        </h2>
        <p>{f.lead}</p>
      </div>
      <ul className="bin__grid">
        {FORMATS.map((fm) => (
          <li key={fm.id} className="bin__item" data-bin data-name={fm.name}>
            <div className="bin__media">
              <Image src={MEDIA.formats[fm.id].poster} alt="" fill sizes="(max-width: 599px) 50vw, (max-width: 1099px) 33vw, 300px" />
              <video muted loop playsInline preload="none" data-src={MEDIA.formats[fm.id].video} aria-hidden="true" tabIndex={-1} />
              <span className="bin__tag" aria-hidden="true">
                {f.tag}
              </span>
              <PlayButton name={fm.name} attr="data-vbtn" />
            </div>
            <h3>{fm.name}</h3>
            <p>{fm.text}</p>
          </li>
        ))}
        <li className="bin__item">
          <div className="bin__media bin__media--empty" aria-hidden="true">
            <span className="bin__plus">
              <Plus />
            </span>
            <span className="bin__tag">{f.idea.tag}</span>
          </div>
          <h3>{f.idea.name}</h3>
          <p>{f.idea.text}</p>
        </li>
      </ul>
      {MEDIA.note && <p className="bin__stock">{MEDIA.note}</p>}
    </section>
  );
}

const SEQ: Record<(typeof TIERS)[number]["id"], number> = { start: 4, rastezh: 8, individualno: 12 };

/** Packages preview (IA:33): illustrative scope, no public prices. */
export function Packages() {
  return (
    <section className="paper pk wrap" id="paketi" aria-labelledby="pk-h">
      <div className="pk__head">
        <h2 className="h2" id="pk-h">
          {HOME.packages.heading}
        </h2>
        <Link className="btn btn--sec" href={route("/paketi")}>
          {HOME.packages.link}
        </Link>
      </div>
      <p className="pk__note">{VOLUME_NOTE}</p>
      <div className="pk__grid">
        {TIERS.map((t) => (
          <article key={t.id} className="pkc" aria-labelledby={`pk-${t.id}`}>
            <div className="pkc__a">
              <h3 id={`pk-${t.id}`}>{t.name}</h3>
              <p className="pkc__for">{t.for}</p>
              <div className="seq" data-seq aria-hidden="true">
                {Array.from({ length: SEQ[t.id] }, (_, i) => (
                  <i key={i} />
                ))}
                {t.id === "individualno" && <i className="more" />}
              </div>
              <p className="pkc__big">{t.videos}</p>
            </div>
            <div className="pkc__b">
              <ul>
                {[t.shoots, t.platforms, t.report, TIER_COMMON_INCLUSIONS[1]].map((line) => (
                  <li key={line}>
                    <Check />
                    {line}
                  </li>
                ))}
              </ul>
              <p className="pkc__price">{PRICE_LABEL}</p>
              <Link className="btn btn--sec" href={route(`/kontakti?from=%2F&volume=${t.volume}`)}>
                {QUOTE_CTA}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/**
 * FAQ (IA:35): the home set (L3), native details/summary, several may be open (L12). Heading row like the other
 * sections, questions in two independent columns (opening one never moves the other column).
 */
export function HomeFaq() {
  const items = FAQ_SETS.home.map((id) => FAQ[id]).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];
  return (
    <section className="paper faq wrap" aria-labelledby="faq-h">
      <div className="faq__head">
        <h2 className="h2" id="faq-h">
          {FAQ_HEADING}
        </h2>
        <Link className="link" href={route("/upravlenie-na-sotsialni-mrezhi")}>
          {HOME.faq.more}
          <ArrowRight />
        </Link>
      </div>
      <div className="faq__cols">
        {columns.map((col, c) => (
          <div key={c} className="faq__list">
            {col.map((item, i) => (
              <details key={item.id}>
                <summary>
                  <b aria-hidden="true">{pad2(c * half + i + 1)}</b>
                  {item.q}
                  <i aria-hidden="true" />
                </summary>
                <p className="faq__a">{item.a}</p>
              </details>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/** Final CTA (IA:36). The edit from the hero renders as the section arrives, then plays. */
export function FinalCta() {
  const f = HOME.final;
  return (
    <section className="final" id="oferta" aria-labelledby="final-h">
      <div className="final__grid wrap">
        <div className="final__text">
          <p className="render" aria-hidden="true">
            {f.ready} <i data-render />
          </p>
          <h2 className="h2" id="final-h">
            {FINAL_CTA.heading}
          </h2>
          <p>{FINAL_CTA.body}</p>
          <div className="actions">
            <Link className="btn btn--pri" href={quoteHref("/")}>
              {QUOTE_CTA}
              <ArrowRight />
            </Link>
          </div>
        </div>
        <figure className="final__pv">
          <div className="pv" data-pv>
            <Image className="pv__grey" src={MEDIA.hero.tall.poster} alt="" fill sizes="(max-width: 1520px) 25vw, 380px" />
            <Image className="pv__done" src={MEDIA.hero.tall.poster} alt="" fill sizes="(max-width: 1520px) 25vw, 380px" />
            <video muted loop playsInline preload="none" data-src={MEDIA.hero.tall.video} aria-hidden="true" tabIndex={-1} />
            <i className="pv__line" aria-hidden="true" />
            <p className="pv__hud" aria-hidden="true">
              <span>
                <i className="dot" />
                <span data-pvstate>{f.done}</span>
              </span>
              <span data-pct>100%</span>
            </p>
            {MEDIA.label && <p className="stock">{MEDIA.label}</p>}
            <PlayButton name={f.caption} attr="data-pvbtn" />
          </div>
          <figcaption>{f.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
