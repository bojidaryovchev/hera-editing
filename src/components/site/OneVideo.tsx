import { PACKAGES } from "@/content/packages";
import { PLATFORMS } from "@/content/shared";

/**
 * One idea, one edit, posted to three platforms = one original video (IA:52, IA:56). Decorative: the paragraph
 * beside it says the same in words, so the figure is hidden from assistive technology.
 */
export function OneVideo() {
  const d = PACKAGES.oneVideo;
  return (
    <div className="onev" aria-hidden="true">
      <div className="onev__src">
        <i className="onev__clip" />
        <span>{d.idea}</span>
      </div>
      <svg className="onev__fan" viewBox="0 0 120 120" preserveAspectRatio="none">
        <path d="M0 60 C 60 60, 60 12, 120 12 M0 60 L120 60 M0 60 C 60 60, 60 108, 120 108" />
      </svg>
      <ul className="onev__outs">
        {PLATFORMS.map((p) => (
          <li key={p.id}>
            <i className="onev__frame" />
            <span>{p.name}</span>
          </li>
        ))}
      </ul>
      <p className="onev__eq">{d.result}</p>
    </div>
  );
}
