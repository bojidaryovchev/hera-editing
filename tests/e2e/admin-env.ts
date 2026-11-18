/**
 * The admin panel's and mailbox's settings on the main e2e server (scripts/e2e-server.ts), shared with the specs.
 * Test values only; the mail-down server runs without them, so the panel is off (404) there.
 */
export const E2E_ADMIN = {
  password: "e2e-admin-password-not-secret",
  sessionSecret: "e2e-admin-session-secret-not-secret-at-all",
  mailbox: "contact@hera.test",
  webhookSecret: `whsec_${Buffer.from("e2e-webhook-secret-not-secret-32").toString("base64")}`,
  apiKey: "re_e2e_not_a_real_key",
} as const;

export const E2E_ADMIN_ENV = {
  ADMIN_PASSWORD: E2E_ADMIN.password,
  ADMIN_SESSION_SECRET: E2E_ADMIN.sessionSecret,
  MAILBOX_ADDRESS: E2E_ADMIN.mailbox,
  RESEND_WEBHOOK_SECRET: E2E_ADMIN.webhookSecret,
  RESEND_API_KEY: E2E_ADMIN.apiKey,
};
