export type MailMessage = {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string | null;
  /** Lets the provider drop a duplicate send (retries after a crash between send and record). */
  idempotencyKey?: string;
};

export interface Mailer {
  readonly provider: "resend" | "smtp" | "dev" | "stub";
  send(message: MailMessage): Promise<void>;
}

/** A delivery failure reduced to a short, loggable code (never provider payloads). */
export class MailDeliveryError extends Error {
  constructor(public readonly code: string) {
    super(`Mail delivery failed: ${code}`);
    this.name = "MailDeliveryError";
  }
}
