import "server-only";
import { after } from "next/server";
import { PRIVACY_NOTICE } from "@/content/legal/privacy";
import { getServerEnv } from "@/lib/config/env";
import { getDb } from "@/lib/db/client";
import { errorCode, logEvent } from "@/lib/log";
import { createMailer } from "@/lib/mail";
import { clientAddress } from "@/lib/security/request";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { deliverLeadNotification, type NotificationDeps } from "./notifications";
import { submitLead, type SubmitLeadResult } from "./service";

export function notificationDeps(): NotificationDeps {
  const env = getServerEnv();
  return {
    db: getDb(),
    mailer: createMailer(env),
    to: env.notificationEmailTo,
    from: env.mail.from,
    brandName: env.brandName,
  };
}

/**
 * Run the pipeline inside a Next.js request (route handler or server action).
 * The owner alert is attempted after the response is sent (`after`), so a slow or
 * failing mail provider never delays or breaks the visitor's confirmation.
 */
export async function submitLeadFromRequest(
  raw: unknown,
  headers: Headers,
  extras: { honeypot?: unknown; turnstileToken?: string | null } = {},
): Promise<SubmitLeadResult> {
  let env;
  let db;
  try {
    env = getServerEnv();
    db = getDb();
  } catch (error) {
    logEvent("error", "lead_backend_not_configured", { code: errorCode(error) });
    return { status: "unavailable" };
  }
  const address = clientAddress(headers, env.trustProxy);
  const turnstile = env.turnstile;
  return submitLead(raw, {
    db,
    clientAddress: address,
    rateLimitSalt: env.rateLimitSalt,
    privacyNoticeVersion: PRIVACY_NOTICE.version,
    honeypot: extras.honeypot,
    verifyHuman: turnstile ? () => verifyTurnstile(turnstile.secretKey, extras.turnstileToken ?? null, address) : null,
    scheduleNotification: (leadId) => {
      after(async () => {
        try {
          await deliverLeadNotification(notificationDeps(), leadId);
        } catch (error) {
          // The lead stays pending; the cron/CLI retry picks it up.
          logEvent("error", "lead_notification_attempt_crashed", { leadId, code: errorCode(error) });
        }
      });
    },
  });
}
