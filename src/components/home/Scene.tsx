/**
 * Where the agency's footage goes until it exists (decision L22; acceptance D: an honest designed frame, never stock
 * or fake client footage in production): a lit studio set with one object, seen through a framing grid, drawn in
 * CSS. Decorative. `tone` changes the lights, so a row of frames does not repeat itself.
 */
export type SceneTone = "a" | "b" | "c" | "d" | "e";

export function Scene({ tone = "a", focus = true, className }: { tone?: SceneTone; focus?: boolean; className?: string }) {
  return (
    <div className={`scene scene--${tone}${className ? ` ${className}` : ""}`} aria-hidden="true">
      <i className="scene__grid" />
      <i className="scene__obj" />
      {focus && <i className="scene__focus" />}
    </div>
  );
}
