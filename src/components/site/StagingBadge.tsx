import { SHELL } from "@/content/site";
import { resolveAppEnv } from "@/lib/config/env";

/** Outside production (and tests) every page says it is a test version (decision L19: always visible, not dismissible). */
export function showStagingBar(): boolean {
  const env = resolveAppEnv(process.env);
  return env === "development" || env === "staging";
}

/** A thin bar above the header; the layout reserves its height (html.has-bar sets --bar), so it covers nothing. */
export function StagingBadge({ text = SHELL.stagingBar }: { text?: string }) {
  if (!showStagingBar()) return null;
  return (
    <p className="staging" role="note">
      {text}
    </p>
  );
}
