import { randomUUID } from "node:crypto";
import { MailDeliveryError, type Mailer, type MailMessage } from "../../src/lib/mail";

/** Clearly fictional test data only — never deployed, never shown as portfolio. */
export function validLead(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    name: "Тест Тестов",
    businessName: "Тестова пекарна (фиктивни данни)",
    city: "Пловдив",
    email: "test.lead@example.com",
    phone: "0888 123 456",
    profileUrl: "https://instagram.com/example_test_only",
    goal: "consistency",
    volume: "8",
    message: "Тестово съобщение за автоматизирани тестове.\nВтори ред.",
    privacyNoticeAcknowledged: true,
    sourcePath: "/paketi",
    utm: { source: "test", medium: "unit", campaign: "ci" },
    requestId: randomUUID(),
    ...overrides,
  };
}

export type StubMailer = {
  mailer: Mailer;
  sent: MailMessage[];
  failWith: (code: string | null) => void;
  delayMs: (ms: number) => void;
};

export function createStubMailer(): StubMailer {
  const sent: MailMessage[] = [];
  let failure: string | null = null;
  let delay = 0;
  return {
    sent,
    failWith: (code) => {
      failure = code;
    },
    delayMs: (ms) => {
      delay = ms;
    },
    mailer: {
      provider: "stub",
      async send(message) {
        if (delay) await new Promise((r) => setTimeout(r, delay));
        if (failure) throw new MailDeliveryError(failure);
        sent.push(message);
      },
    },
  };
}
