import type { ServerEnv } from "@/lib/config/env";
import { createDevMailer } from "./dev";
import { createResendMailer } from "./resend";
import { createSmtpMailer } from "./smtp";
import type { Mailer } from "./types";

export type { Mailer, MailMessage } from "./types";
export { MailDeliveryError } from "./types";

export function createMailer(env: Pick<ServerEnv, "mail" | "appEnv">): Mailer {
  const mail = env.mail;
  switch (mail.provider) {
    case "resend":
      return createResendMailer({ apiKey: mail.apiKey });
    case "smtp":
      return createSmtpMailer({ host: mail.host, port: mail.port, user: mail.user, pass: mail.pass });
    case "dev":
      return createDevMailer({ outboxDir: mail.outboxDir, revealContent: env.appEnv === "development" });
  }
}
