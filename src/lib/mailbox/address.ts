/**
 * The From header of an incoming message, taken apart properly.
 *
 * WHY THIS IS ITS OWN FILE. The inbound mailbox used to read the address as
 * "the first <...> in the header", and a display name is free text: the header
 *
 *     "<victim@example.com>" <attacker@evil.example>
 *
 * read as victim@example.com. The message was then filed under the victim's
 * name, could join their open conversation, could be tied to their enquiry by
 * quoting its reference - and the owner's answer went to the raw header, which
 * is the attacker's address. Everything the mailbox decides about a sender now
 * goes through `singleMailbox`, and nothing is ever sent to a header string.
 *
 * WHAT IT ACCEPTS: an RFC 5322 mailbox list, strictly, and from it exactly one
 * mailbox:
 *
 *     addr@example.com
 *     <addr@example.com>
 *     Display Name <addr@example.com>
 *     "Quoted, Name <even this>" <addr@example.com>
 *     addr@example.com (a comment)
 *
 * Quoted strings and comments (nested, with backslash escapes) are read as
 * what they are, so nothing inside them can be mistaken for the address. A
 * list of two or more mailboxes, a group ("team: a@x, b@y;"), more than one
 * angle-address, an unterminated quote or comment, an "@" or a bracket loose
 * in a display name, or an address that is not a plain addr-spec all answer
 * null - and a sender the mailbox cannot name with certainty is never matched,
 * never linked to an enquiry and never replied to from the panel.
 *
 * Non-ASCII display names (RFC 6532) are accepted as written. The address is
 * lowercased: it is a key, and the same customer types it both ways.
 *
 * No imports, so the tests can feed it strings and nothing else.
 */

export interface Mailbox {
  /** The display name, unquoted and unescaped, or null. Shown, never trusted. */
  name: string | null;
  /** The addr-spec, lowercased. */
  address: string;
}

/** Longer than any honest From header; a cap so the scan stays cheap. */
const HEADER_MAX = 2000;

/* A dot-atom local part and a domain of dot-separated labels. Quoted local
   parts ("john smith"@x) and address literals (x@[1.2.3.4]) are legal and
   are refused: no customer writes from one, and every extra form is one more
   place for two parsers to disagree. */
const ATEXT = "[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]";
const LOCAL = `${ATEXT}+(?:\\.${ATEXT}+)*`;
const LABEL = "[\\p{L}\\p{N}](?:[\\p{L}\\p{N}-]{0,61}[\\p{L}\\p{N}])?";
const ADDR_SPEC = new RegExp(`^${LOCAL}@${LABEL}(?:\\.${LABEL})+$`, "u");

/** Characters that may not appear loose in an unquoted display name. */
const PHRASE_SPECIALS = /[<>@,;:\\"[\]()]/;

type Part = { kind: "text"; value: string } | { kind: "quoted"; value: string } | { kind: "angle"; value: string };

/**
 * One header value split into mailboxes, each a list of parts, with comments
 * dropped. Null on anything malformed: an unterminated quote, comment or
 * angle-address, a stray closer, or a group.
 */
function lex(header: string): Part[][] | null {
  const mailboxes: Part[][] = [[]];
  let text = "";
  /* Never empty: the list starts with one mailbox and only ever grows. */
  const current = () => mailboxes[mailboxes.length - 1]!;
  const flushText = () => {
    if (text) current().push({ kind: "text", value: text });
    text = "";
  };

  for (let i = 0; i < header.length; i++) {
    const ch = header[i];

    if (ch === '"') {
      flushText();
      let value = "";
      let closed = false;
      for (i += 1; i < header.length; i++) {
        const c = header[i];
        if (c === "\\") {
          if (i + 1 >= header.length) return null;
          value += header[++i];
        } else if (c === '"') {
          closed = true;
          break;
        } else {
          value += c;
        }
      }
      if (!closed) return null;
      current().push({ kind: "quoted", value });
      continue;
    }

    if (ch === "(") {
      /* A comment: skipped whole, nesting and escapes included, and read as
         the whitespace it stands for. */
      let depth = 1;
      for (i += 1; i < header.length && depth > 0; i++) {
        const c = header[i];
        if (c === "\\") i += 1;
        else if (c === "(") depth += 1;
        else if (c === ")") depth -= 1;
      }
      if (depth !== 0) return null;
      i -= 1;
      text += " ";
      continue;
    }

    if (ch === "<") {
      flushText();
      const end = header.indexOf(">", i + 1);
      if (end < 0) return null;
      const inner = header.slice(i + 1, end);
      if (/[<"()\\]/.test(inner)) return null;
      current().push({ kind: "angle", value: inner.trim() });
      i = end;
      continue;
    }

    if (ch === ">" || ch === ")") return null;
    /* A group - "undisclosed-recipients:;" and its kind - is not a sender. */
    if (ch === ":" || ch === ";") return null;

    if (ch === ",") {
      flushText();
      mailboxes.push([]);
      continue;
    }

    text += ch;
  }
  flushText();
  return mailboxes;
}

/** One lexed mailbox, checked. Null when it is not exactly one valid one. */
function mailboxOf(parts: Part[]): Mailbox | null {
  const angles = parts.filter((p) => p.kind === "angle");

  if (angles.length === 0) {
    /* A bare addr-spec, perhaps with comments (already gone) around it. */
    if (parts.some((p) => p.kind === "quoted")) return null;
    const value = parts
      .map((p) => p.value)
      .join("")
      .trim();
    return ADDR_SPEC.test(value) ? { name: null, address: value.toLowerCase() } : null;
  }

  /* `name <addr>`: one angle-address, and it is the last thing there is. */
  if (angles.length > 1) return null;
  const at = parts.findIndex((p) => p.kind === "angle");
  if (parts.slice(at + 1).some((p) => p.value.trim() !== "")) return null;

  const address = parts[at]!.value;
  if (!ADDR_SPEC.test(address)) return null;

  const words: string[] = [];
  for (const part of parts.slice(0, at)) {
    if (part.kind === "quoted") {
      words.push(part.value);
      continue;
    }
    if (PHRASE_SPECIALS.test(part.value)) return null;
    words.push(part.value);
  }
  const name = words.join("").replace(/\s+/g, " ").trim();
  return { name: name || null, address: address.toLowerCase() };
}

/**
 * Every mailbox in a header value, or null when the value is not a valid
 * mailbox list. An empty value is an empty list.
 */
export function parseMailboxes(header: string | null | undefined): Mailbox[] | null {
  if (typeof header !== "string" || header.length > HEADER_MAX) return null;
  if (/[\r\n]/.test(header)) return null;
  const lexed = lex(header);
  if (!lexed) return null;

  const mailboxes: Mailbox[] = [];
  for (const parts of lexed) {
    if (parts.every((p) => p.kind === "text" && p.value.trim() === "")) {
      /* An empty element - "a@x,,b@y" - is tolerated, as RFC 5322 does. */
      continue;
    }
    const mailbox = mailboxOf(parts);
    if (!mailbox) return null;
    mailboxes.push(mailbox);
  }
  return mailboxes;
}

/**
 * The one mailbox a From header names - or null when it names none, more than
 * one, or anything that does not parse. The only way the mailbox reads who
 * wrote.
 */
export function singleMailbox(header: string | null | undefined): Mailbox | null {
  const mailboxes = parseMailboxes(header);
  return mailboxes && mailboxes.length === 1 ? mailboxes[0]! : null;
}

/** The domain of a parsed address. */
export const domainOfAddress = (address: string): string => address.slice(address.lastIndexOf("@") + 1).toLowerCase();

/** Two addresses are the same mailbox: compared as the lowercase keys they
 *  are stored as. */
export const sameAddress = (a: string, b: string): boolean => a.trim().toLowerCase() === b.trim().toLowerCase();
