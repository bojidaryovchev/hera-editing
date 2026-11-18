/**
 * The pure half of the mailbox: how subjects compare, which ids a reply quotes, and how a stored message reads.
 * Ported from the owner's other sites (buy-a-vend), where it is tested against the mail clients of twelve
 * languages. No imports, so the tests feed it strings.
 */

/*
 * "Re: Re: Отн: оферта", "AW: оферта" and "оферта" are the same conversation. The prefix comes from the sender's
 * mail client, not from the language they write in, so the common clients' reply and forward prefixes in several
 * languages are all recognised; a counter some clients add ("Re[2]:", "AW^2:") is part of the prefix.
 */
const REPLY_WORDS = ["re", "aw", "antw", "sv", "vs", "odp", "r", "rif", "res", "отн", "относно"];
const FORWARD_WORDS = ["fwd", "fw", "wg", "tr", "rv", "enc", "i", "vl", "vb", "doorst", "pd", "пр"];

const prefixPattern = (words: string[]) =>
  new RegExp(`^\\s*(?:${words.join("|")})(?:\\[\\d+\\]|\\^\\d+)?\\s*:\\s*`, "i");

const ANY_PREFIX = prefixPattern([...REPLY_WORDS, ...FORWARD_WORDS]);
const REPLY_PREFIX = prefixPattern(REPLY_WORDS);

/** Every leading reply and forward prefix off, lowercased and with single spaces, for comparing subjects. */
export function normalizeSubject(subject: string): string {
  let value = subject.trim();
  while (ANY_PREFIX.test(value)) value = value.replace(ANY_PREFIX, "");
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

/**
 * One "Re:" in front of the subject, whatever reply prefixes the other side's client stacked up. "Re:" is the
 * prefix RFC 5322 names and every client threads on, so it is not translated. Forward prefixes stay: an answer to
 * a forwarded message is still "Re: Fwd: ...".
 */
export function replySubject(subject: string): string {
  let value = subject.trim();
  while (REPLY_PREFIX.test(value)) value = value.replace(REPLY_PREFIX, "");
  return `Re: ${value || "(без тема)"}`;
}

/** The `<...>` ids out of a References or In-Reply-To header. */
export function parseMessageIds(header: string | undefined | null): string[] {
  if (!header) return [];
  return [...header.matchAll(/<[^<>\s]+>/g)].map((m) => m[0]);
}

/** Header lookup that does not care about case, because senders do not. */
export function headerValue(headers: Record<string, string> | null | undefined, name: string): string | undefined {
  if (!headers) return undefined;
  const wanted = name.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === wanted) return value;
  }
  return undefined;
}

/**
 * The chain of ids a reply quotes in References: every id the conversation has seen, oldest first, deduplicated,
 * and capped at twenty by keeping the head and the tail (some clients choke on an unbounded header, and the first
 * ids matter most for threading).
 */
export function referenceChain(
  messages: ReadonlyArray<{ messageId: string | null; inReplyTo: string | null }>,
): string[] {
  const ids = messages
    .flatMap((m) => [...parseMessageIds(m.inReplyTo), ...(m.messageId ? [m.messageId] : [])])
    .filter((id, index, all) => all.indexOf(id) === index);
  return ids.length <= 20 ? ids : [...ids.slice(0, 10), ...ids.slice(-10)];
}

const ENTITIES: Record<string, string> = { nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };

/**
 * Readable text from a message that arrived as HTML only. The admin panel never renders a sender's markup: it is
 * the one session on the site that can send mail as the company, and a stranger's HTML there would be a stored
 * cross-site-scripting hole. Mail clients must carry a plain-text part; where a sender left it out, the markup is
 * flattened here and shown as text.
 */
export function flattenHtml(html: string): string {
  return html
    .replace(/<(script|style|head)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|tr|li|h[1-6]|blockquote)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, code: string) => {
      if (code[0] !== "#") return ENTITIES[code.toLowerCase()] ?? whole;
      const n =
        code[1]?.toLowerCase() === "x" ? Number.parseInt(code.slice(2), 16) : Number.parseInt(code.slice(1), 10);
      return Number.isFinite(n) && n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : whole;
    })
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Our own signature block off a message we sent, for display only: `--` on a line of its own is the standard
 * delimiter, and the same lines under every reply bury the sentence someone actually wrote. The stored text keeps
 * exactly what was sent.
 */
export function withoutSignature(text: string): string {
  const lines = text.split("\n");
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i]!.trimEnd() === "--") return lines.slice(0, i).join("\n").trimEnd();
  }
  return text;
}

/** How a stored message reads in the panel: its text part, else its HTML flattened, never the HTML itself. */
export function readableBody(message: {
  direction: "in" | "out";
  bodyText: string | null;
  bodyHtml: string | null;
}): string {
  const text = message.bodyText?.trim();
  if (text) return message.direction === "out" ? withoutSignature(text) : text;
  if (message.bodyHtml) return flattenHtml(message.bodyHtml) || "(празно съобщение)";
  return "(празно съобщение)";
}
