/**
 * The error a release gate throws (src/lib/site/release.ts, src/lib/en/release.ts). Its own module without imports,
 * because next.config.ts loads the English gates and the config loader resolves relative imports only.
 */
export class ReleaseGateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ReleaseGateError";
  }
}
