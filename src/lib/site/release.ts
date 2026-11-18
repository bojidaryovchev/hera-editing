import { PRIVACY_NOTICE } from "@/content/legal/privacy";
import { SERVICE_TERMS } from "@/content/terms";
import type { AppEnv } from "@/lib/config/env";

/** Release gates that fail the production build instead of publishing something unfinished (spec/handoff/02 §A). */
export class ReleaseGateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ReleaseGateError";
  }
}

/** The privacy notice must be lawyer-approved before production collects enquiries (acceptance F). */
export function assertPrivacyReady(appEnv: AppEnv, notice: { status: string } = PRIVACY_NOTICE): void {
  if (appEnv === "production" && notice.status !== "approved")
    throw new ReleaseGateError(
      "The privacy notice is still a draft. Have it approved and set PRIVACY_NOTICE.status to 'approved'.",
    );
}

/**
 * The service terms the site states (contract length, revisions, approval, travel: src/content/terms.ts) must be
 * signed off by the owner before production publishes them (acceptance A).
 */
export function assertTermsSignedOff(appEnv: AppEnv, terms: { signedOff: boolean } = SERVICE_TERMS): void {
  if (appEnv === "production" && !terms.signedOff)
    throw new ReleaseGateError(
      "The service terms are not signed off. Have the owner confirm them and set SERVICE_TERMS.signedOff to true.",
    );
}
