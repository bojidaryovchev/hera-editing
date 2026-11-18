import "server-only";
import { getServerEnv } from "@/lib/config/env";
import { createMailer, type Mailer } from "@/lib/mail";
import type { ReplyConfig } from "@/lib/mailbox/reply";
import { brandName } from "@/lib/site/brand";

/**
 * Can the panel send an answer, and from where? The mailbox address is the From. On staging and production the
 * development mail provider would only log the message, so a reply there is refused rather than recorded as sent;
 * in development and tests it goes to the local outbox.
 */
export function replySetup(): { ok: true; config: ReplyConfig; mailer: Mailer } | { ok: false; error: string } {
  let env;
  try {
    env = getServerEnv();
  } catch {
    return { ok: false, error: "Настройките на сайта не са пълни. Отговор не може да бъде изпратен." };
  }
  if (!env.mailbox)
    return { ok: false, error: "Пощата contact@ още не е настроена. Отговор не може да бъде изпратен." };
  if (env.mail.provider === "dev" && (env.appEnv === "staging" || env.appEnv === "production"))
    return {
      ok: false,
      error: "Изпращането на поща още не е включено. Писмата се записват, отговорите ще тръгнат по-късно.",
    };
  return {
    ok: true,
    config: { address: env.mailbox.address, brandName: brandName(), siteUrl: env.siteUrl },
    mailer: createMailer(env),
  };
}
