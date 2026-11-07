import { MailDeliveryError, type Mailer } from "./types";

export function createSmtpMailer(options: {
  host: string;
  port: number;
  user: string | null;
  pass: string | null;
}): Mailer {
  return {
    provider: "smtp",
    async send(message) {
      // Loaded only when SMTP is the configured provider.
      const nodemailer = await import("nodemailer");
      const transport = nodemailer.createTransport({
        host: options.host,
        port: options.port,
        secure: options.port === 465,
        auth: options.user ? { user: options.user, pass: options.pass ?? "" } : undefined,
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 15_000,
      });
      try {
        await transport.sendMail({
          from: message.from,
          to: message.to,
          subject: message.subject,
          text: message.text,
          html: message.html,
          replyTo: message.replyTo ?? undefined,
          headers: message.idempotencyKey ? { "X-Entity-Ref-ID": message.idempotencyKey } : undefined,
        });
      } catch (error) {
        const code = (error as { code?: unknown })?.code;
        throw new MailDeliveryError(
          typeof code === "string" && /^[A-Z0-9_]{2,30}$/.test(code) ? `mail_smtp_${code.toLowerCase()}` : "mail_smtp",
        );
      } finally {
        transport.close();
      }
    },
  };
}
