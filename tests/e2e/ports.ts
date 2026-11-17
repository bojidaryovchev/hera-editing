/** Ports of the e2e servers started by scripts/e2e-server.ts (one build, three runtime configurations). */
export const E2E_PORTS = { main: 3200, mailDown: 3201, dbDown: 3202, ready: 3299 } as const;
export const BASE = `http://127.0.0.1:${E2E_PORTS.main}`;
export const MAIL_DOWN = `http://127.0.0.1:${E2E_PORTS.mailDown}`;
export const DB_DOWN = `http://127.0.0.1:${E2E_PORTS.dbDown}`;
