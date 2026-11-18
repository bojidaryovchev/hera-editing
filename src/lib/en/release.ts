// Relative imports only: next.config.ts loads this module, and the config loader does not resolve "@/" paths.
import { EN_PRIVACY_NOTICE } from "../../content/en/legal/privacy";
import { EN_TERMS } from "../../content/en/terms";
import { enSectionEnabled, resolveAppEnv, type AppEnv } from "../config/env";
import { ReleaseGateError } from "../site/release-error";

type Source = Record<string, string | undefined>;

/**
 * Release gates of the English section /en (decision L38), after src/lib/site/release.ts. No Next.js imports:
 * next.config.ts calls assertEnLaunchReady (src/lib/en/section.ts has the pages' notFound guard). The section is off in
 * production unless EN_SECTION_ENABLED=true; once it is on, production refuses unsigned package terms and a draft
 * English privacy notice, and the order form stays closed until the terms are signed off.
 */

/** The package terms must be signed off by the business owner before production publishes them (decision 6). */
export function assertEnTermsSignedOff(appEnv: AppEnv, terms: { signedOff: boolean } = EN_TERMS): void {
  if (appEnv === "production" && !terms.signedOff)
    throw new ReleaseGateError(
      "The English package terms are not signed off. Have the business owner confirm them and set EN_TERMS.signedOff to true (src/content/en/terms.ts).",
    );
}

/** The English privacy notice must be lawyer-approved before production collects orders, like the Bulgarian one. */
export function assertEnPrivacyReady(appEnv: AppEnv, notice: { status: string } = EN_PRIVACY_NOTICE): void {
  if (appEnv === "production" && notice.status !== "approved")
    throw new ReleaseGateError(
      "The English privacy notice is still a draft. Have it approved and set EN_PRIVACY_NOTICE.status to 'approved' (src/content/en/legal/privacy.ts).",
    );
}

/**
 * Everything production needs before the section may be switched on: called from next.config.ts, so a production
 * build or start with EN_SECTION_ENABLED=true and unfinished terms or notice fails at once, naming the file to fix.
 */
export function assertEnLaunchReady(src: Source): void {
  const appEnv = resolveAppEnv(src);
  if (!enSectionEnabled(src)) return;
  assertEnTermsSignedOff(appEnv);
  assertEnPrivacyReady(appEnv);
}

/** Whether the order form takes orders: the section is on, and outside production or with signed-off terms. */
export function enOrdersOpen(src: Source = process.env, terms: { signedOff: boolean } = EN_TERMS): boolean {
  if (!enSectionEnabled(src)) return false;
  return resolveAppEnv(src) !== "production" || terms.signedOff;
}

export { enSectionEnabled };
