import Link from "next/link";
import { HOME } from "@/content/home";
import { MEDIA } from "@/content/media";
import { PLATFORMS } from "@/content/shared";
import { QUOTE_CTA } from "@/content/site";
import { quoteHref } from "@/lib/site/nav";

const REEL = 12;
const TICKS = [0, 2, 4, 6, 8, 10, 12];
const SEGMENTS = [0, 1, 2, 3, 4, 5];
const CUTS = [1, 2, 3, 4, 5];
/** Decorative, deterministic audio waveform. */
const BARS = Array.from({ length: 140 }, (_, i) => (18 + 70 * Math.abs(Math.sin(i * 0.37) * Math.cos(i * 0.11 + 1.3))).toFixed(1));
const pad2 = (n: number) => String(n).padStart(2, "0");

/**
 * The hero is the editing workspace (direction A): a monitor, an inspector with the six stages, and a timeline.
 * Rendered complete on the server; HomeMotion lets the scroll drive the playhead when motion is allowed.
 */
export function Hero() {
  const h = HOME.hero;
  const e = h.editor;
  const s = h.stages;
  return (
    <section className="hero" aria-labelledby="h1" data-hero>
      <div className="intro wrap">
        <div className="card" data-card>
          <p className="eyebrow">{h.eyebrow}</p>
          <h1 className="h1" id="h1">
            {h.titleLead} <span>{h.titleRest}</span>
          </h1>
          <p className="lead">{h.subtitle}</p>
          <div className="actions">
            <Link className="btn btn--pri" href={quoteHref("/")}>
              {QUOTE_CTA}
            </Link>
            <a className="btn btn--sec" href={`#${HOME.process.id}`}>
              {h.secondaryCta}
            </a>
          </div>
        </div>
      </div>

      <div className="pinwrap" data-pinwrap>
        <div className="stage wrap" data-stage-el>
          <div className="m-stage" aria-hidden="true">
            <div className="m-stage__row">
              <span data-mstage>{s[0].name}</span>
              <small data-mstep>01 / 06</small>
            </div>
          </div>

          <div className="viewer" data-viewer>
            <figure className="mon" aria-label={e.monitorLabel}>
              <video data-scrub muted playsInline preload="metadata" poster={MEDIA.hero.wide.poster} aria-hidden="true" tabIndex={-1}>
                <source src={MEDIA.hero.wide.video} type="video/mp4" />
              </video>
              <canvas className="mon__grade" aria-hidden="true" data-grade />
              <i className="mon__split" aria-hidden="true" data-split>
                <span>{e.before}</span>
                <span>{e.after}</span>
              </i>
              <div className="mon__scrim" aria-hidden="true" />
              <div className="safe" aria-hidden="true">
                <span>{e.safeArea}</span>
              </div>
              <p className="subs" aria-hidden="true">
                <span data-sub="1">{h.titleLead}</span>
                <span data-sub="2">{h.titleRest}</span>
              </p>
              <p className="mon__hud">
                <span aria-hidden="true">
                  <i className="dot" />
                  <span data-stagename>{s[0].name}</span>
                </span>
                <span aria-hidden="true" data-format>
                  {e.wide}
                </span>
                {MEDIA.label && (
                  <>
                    <i className="mon__brk" aria-hidden="true" />
                    <span className="stock">{MEDIA.label}</span>
                  </>
                )}
              </p>
            </figure>
          </div>

          {/* Narrow screens: the note, then the six stages (the inspector of wide screens); the list folds away when the frame turns vertical. */}
          <div className="m-info">
            <p className="m-note" data-mnote>
              {s[0].note}
            </p>
            <ol className="m-list" data-mlist aria-label={e.inspectorLabel}>
              {s.map((st, i) => (
                <li key={st.name} className={i === 0 ? "on" : undefined}>
                  <b aria-hidden="true">{pad2(i + 1)}</b>
                  <span>{st.name}</span>
                  <i aria-hidden="true" />
                </li>
              ))}
            </ol>
          </div>

          <div className="side" data-side>
            <div className="side__pane" data-pane="fmt">
              <p className="side__h">
                {h.panes.formatLead} <span>{h.panes.formatRest}</span>
              </p>
              <ul aria-label={h.panes.platformsLabel}>
                {PLATFORMS.map((p) => (
                  <li key={p.id}>
                    {p.name} <small>{p.formats.join(" · ")}</small>
                  </li>
                ))}
              </ul>
              <p className="side__note">{h.panes.formatNote}</p>
            </div>
            <div className="side__pane" data-pane="pub">
              <p className="side__h">
                {h.panes.publishLead} <span>{h.panes.publishRest}</span>
              </p>
              <div className="actions">
                <Link className="btn btn--pri" href={quoteHref("/")}>
                  {QUOTE_CTA}
                </Link>
              </div>
            </div>
          </div>

          <aside className="insp" aria-label={e.inspectorLabel}>
            <p className="insp__h">
              <span>{e.inspectorLabel}</span>
              <span data-istep>01 / 06</span>
            </p>
            <ol>
              {s.map((st, i) => (
                <li key={st.name} className={i === 0 ? "on" : undefined}>
                  <b>{pad2(i + 1)}</b>
                  <span>{st.name}</span>
                  <i />
                </li>
              ))}
            </ol>
            <p className="insp__note" data-inote>
              {s[0].note}
            </p>
            <div className="insp__status">
              <span>
                <small>{e.statusLabel}</small>
                <br />
                <span data-statustext>{e.statusWorking}</span>
              </span>
              <span className="chip" data-chip>
                {e.chipPending}
              </span>
            </div>
          </aside>
        </div>

        <div className="tl wrap" aria-hidden="true">
          <p className="tl__head">
            <b className="tl__name">{e.sequence}</b>
            <span className="tl__tc" data-tc>
              00:00:00:00
            </span>
            <span className="tl__export">
              {e.export} <i data-exp />
            </span>
          </p>
          <div className="tl__body">
            <div className="tl__labels">
              <span />
              <span>V2</span>
              <span>V1</span>
              <span>A1</span>
            </div>
            <div className="tl__lanes">
              <div className="ruler">
                {TICKS.map((t) => (
                  <span key={t} style={{ left: `${(t / REEL) * 100}%` }}>
                    00:{pad2(t)}
                  </span>
                ))}
              </div>
              <div className="lane">
                {[1, 2].map((n) => (
                  <i key={n} className="clip clip--title" data-title={n} style={{ left: n === 1 ? "58%" : "68.5%", width: "10%" }}>
                    <span className="l">
                      {e.titleClip} {n}
                    </span>
                    <span className="s">
                      {e.titleClipShort}
                      {n}
                    </span>
                  </i>
                ))}
              </div>
              <div className="lane">
                <i className="clip clip--raw" data-raw>
                  <span className="l">{e.rawClip}</span>
                </i>
                {SEGMENTS.map((k) => (
                  <i key={k} className="clip clip--seg" data-seg style={{ left: `${(k * 100) / 6 + 0.25}%`, width: `${100 / 6 - 0.5}%` }}>
                    <span className="l">
                      {e.clip} {k + 1}
                    </span>
                    <span className="s">{k + 1}</span>
                  </i>
                ))}
                {CUTS.map((k) => (
                  <i key={k} className="cut" data-cut style={{ left: `${(k * 100) / 6}%` }} />
                ))}
              </div>
              <div className="lane">
                <div className="wave">
                  {BARS.map((b, i) => (
                    <i key={i} style={{ height: `${b}%` }} />
                  ))}
                </div>
              </div>
              <div className="ph" data-ph>
                <b />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
