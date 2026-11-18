import { EN_STEP_LABELS, EN_STEPS } from "@/content/en/home";

const pad2 = (n: number) => String(n).padStart(2, "0");

/**
 * How it works, as four clips on one timeline (decision 1: the page is the edit). The scroll moves a playhead
 * along the track and each clip fills as it passes (EnMotion, GSAP loaded on demand); with reduced motion, or
 * before the script runs, every clip is complete and nothing moves (decision 7). On phones the track runs down.
 */
export function StepsTrack({
  id,
  heading,
  note,
  headingLevel = 2,
}: {
  id: string;
  heading: string;
  note?: string;
  headingLevel?: 2 | 3;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const C = headingLevel === 2 ? "h3" : "h4";
  const L = EN_STEP_LABELS;
  return (
    <section className="en-steps sv-dark wrap" aria-labelledby={id} data-en-steps="">
      <div className="en-steps__head">
        <H className="h2 h2--md" id={id}>
          {heading}
        </H>
        {note && <p className="sv-note">{note}</p>}
      </div>
      <div className="en-track">
        <ol className="en-track__clips">
          {EN_STEPS.map((s, i) => (
            <li key={s.id} className="en-clip" data-clip={i}>
              <p className="en-clip__top" aria-hidden="true">
                <span>
                  {L.step} {pad2(i + 1)}
                </span>
                <span>00:{pad2(i * 15)}</span>
              </p>
              <span className="en-clip__bar" aria-hidden="true">
                <i />
              </span>
              <C className="en-clip__h">{s.title}</C>
              <dl className="en-clip__dl">
                <dt>{L.you}</dt>
                <dd>{s.you}</dd>
                <dt>{L.we}</dt>
                <dd>{s.we}</dd>
              </dl>
            </li>
          ))}
        </ol>
        <span className="en-track__ph" aria-hidden="true" />
      </div>
    </section>
  );
}
