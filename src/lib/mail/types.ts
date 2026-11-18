export type MailMessage = {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string | null;
  /** Lets the provider drop a duplicate send (retries after a crash between send and record). */
  idempotencyKey?: string;
  /** Extra headers: In-Reply-To and References, so a reply from the mailbox joins the other side's thread. */
  headers?: Record<string, string>;
};

/** What a provider reports about a sent message: its own id for it, where it gives one. */
export type SentMail = { id: string | null };

export interface Mailer {
  readonly provider: "resend" | "smtp" | "dev" | "stub";
  send(message: MailMessage): Promise<SentMail>;
}

/** A delivery failure reduced to a short, loggable code (never provider payloads). */
export class MailDeliveryError extends Error {
  constructor(public readonly code: string) {
    super(`Mail delivery failed: ${code}`);
    this.name = "MailDeliveryError";
  }
}
