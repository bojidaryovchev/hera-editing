import { PRIVACY_NOTICE } from "@/content/legal/privacy";
import type { AppEnv } from "@/lib/config/env";

/** Release gates that fail the production build instead of publishing something unfinished (handoff/02 §A). */
export class ReleaseGateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ReleaseGateError";
  }
}

/** The privacy notice must be lawyer-approved before production collects enquiries (acceptance F). */
export function assertPrivacyReady(appEnv: AppEnv, notice: { status: string } = PRIVACY_NOTICE): void {
  if (appEnv === "production" && notice.status !== "approved")
    throw new ReleaseGateError("The privacy notice is still a draft. Have it approved and set PRIVACY_NOTICE.status to 'approved'.");
}
