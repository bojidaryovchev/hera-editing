import { createHmac } from "node:crypto";

/**
 * The client's address, only when the platform guarantees the header (Vercel sets
 * x-real-ip / x-forwarded-for itself) or the operator declared a trusted proxy.
 * Otherwise null: the caller falls back to a shared rate-limit bucket.
 */
export function clientAddress(headers: Headers, trustProxy: boolean): string | null {
  if (!trustProxy) return null;
  const real = headers.get("x-real-ip")?.trim();
  if (real) return real.slice(0, 64);
  const first = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return first ? first.slice(0, 64) : null;
}

/**
 * A pseudonymous rate-limit key: HMAC of the address with a secret salt, rotated
 * daily by mixing in the UTC date. The raw address is never stored or logged.
 */
export function rateLimitSubject(address: string | null, salt: string, now: Date): string {
  if (!address) return "shared";
  const day = now.toISOString().slice(0, 10);
  return createHmac("sha256", salt).update(`${day}|${address}`).digest("hex").slice(0, 32);
}

/** Same-site POST policy: a browser Origin, when sent, must be this site. */
export function isAllowedOrigin(origin: string | null, siteUrl: string, requestUrl: string): boolean {
  if (!origin) return true; // non-browser clients; CSRF needs a browser, which always sends Origin on POST
  if (origin === "null") return false;
  try {
    const o = new URL(origin).origin;
    return o === new URL(siteUrl).origin || o === new URL(requestUrl).origin;
  } catch {
    return false;
  }
}

export class BodyTooLargeError extends Error {
  constructor() {
    super("Request body too large");
    this.name = "BodyTooLargeError";
  }
}

/** Read a request body as text, refusing more than `limit` bytes without buffering it all. */
export async function readBodyWithLimit(request: Request, limit: number): Promise<string> {
  const declared = Number(request.headers.get("content-length") ?? "NaN");
  if (Number.isFinite(declared) && declared > limit) throw new BodyTooLargeError();
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > limit) {
      await reader.cancel().catch(() => {});
      throw new BodyTooLargeError();
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
}
