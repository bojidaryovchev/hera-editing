import type { CSSProperties } from "react";
import { Scene } from "@/components/site/Scene";
import { EN_HOME } from "@/content/en/home";

const seconds = (tc: string) => {
  const [m, s] = tc.split(":").map(Number);
  return (m ?? 0) * 60 + (s ?? 0);
};

/** The playhead starts after 0.3 s and crosses in 3.6 s; a note appears when it reaches the note's mark. */
const START = 0.3;
const CROSS = 3.6;

/**
 * The home hero's panel: one review link, as the client sees it (the promise, shown). An example and labelled so.
 * With motion, the playhead crosses the cut once in about four seconds, each time-coded note appearing as it reaches
 * its mark, then the cut is approved: under five seconds, so it needs no pause control (WCAG 2.2.2). With reduced
 * motion it is drawn finished. The frame is a designed set, never stock footage (L22). Decorative: the figure's
 * label says what it shows, and every note is plain text.
 */
export function ReviewPanel() {
  const r = EN_HOME.hero.review;
  const total = seconds(r.duration);
  const at = (tc: string) => seconds(tc) / total;
  return (
    <figure className="en-review" aria-label={r.label}>
      <p className="en-review__top">
        <span>
          <i className="dot" aria-hidden="true" />
          {r.title} · {r.version}
        </span>
        <span className="en-review__tag">{r.example}</span>
      </p>
      <div className="en-review__frame">
        <Scene tone="c" focus={false} />
        <span className="en-review__tc" aria-hidden="true">
          {r.comments[r.comments.length - 1]?.at} / {r.duration}
        </span>
      </div>
      <div className="en-review__scrub" aria-hidden="true">
        {r.comments.map((c) => (
          <i
            key={c.at}
            className="en-review__mark"
            style={{ "--at": `${at(c.at) * 100}%`, "--t": `${START + at(c.at) * CROSS}s` } as CSSProperties}
          />
        ))}
        <b className="en-review__head" />
      </div>
      <ol className="en-review__notes">
        {r.comments.map((c) => (
          <li key={c.at} style={{ "--t": `${START + at(c.at) * CROSS}s` } as CSSProperties}>
            <b>{c.at}</b>
            <span>{c.text}</span>
          </li>
        ))}
      </ol>
      <p className="en-review__status">
        <span>{r.round}</span>
        <span className="en-review__ok">{r.approved}</span>
      </p>
    </figure>
  );
}
