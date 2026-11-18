import { MailDeliveryError, type Mailer } from "./types";

/** Resend over its REST API (no SDK needed for one endpoint). */
export function createResendMailer(options: { apiKey: string; fetchImpl?: typeof fetch; timeoutMs?: number }): Mailer {
  const fetchImpl = options.fetchImpl ?? fetch;
  const timeoutMs = options.timeoutMs ?? 10_000;
  return {
    provider: "resend",
    async send(message) {
      let response: Response;
      try {
        response = await fetchImpl("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${options.apiKey}`,
            "Content-Type": "application/json",
            ...(message.idempotencyKey ? { "Idempotency-Key": message.idempotencyKey } : {}),
          },
          body: JSON.stringify({
            from: message.from,
            to: [message.to],
            subject: message.subject,
            text: message.text,
            html: message.html,
            ...(message.replyTo ? { reply_to: message.replyTo } : {}),
            ...(message.headers && Object.keys(message.headers).length > 0 ? { headers: message.headers } : {}),
          }),
          signal: AbortSignal.timeout(timeoutMs),
        });
      } catch (error) {
        const name = (error as { name?: string })?.name;
        throw new MailDeliveryError(name === "TimeoutError" || name === "AbortError" ? "mail_timeout" : "mail_network");
      }
      if (!response.ok) throw new MailDeliveryError(`mail_http_${response.status}`);
      const body = (await response.json().catch(() => null)) as { id?: unknown } | null;
      return { id: typeof body?.id === "string" ? body.id : null };
    },
  };
}
