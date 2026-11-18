import { describe, expect, it } from "vitest";
import {
  flattenHtml,
  headerValue,
  normalizeSubject,
  parseMessageIds,
  readableBody,
  referenceChain,
  replySubject,
  withoutSignature,
} from "../../src/lib/mailbox/threading";

describe("subjects", () => {
  it.each([
    ["Re: Re: Отн: Оферта за видео", "оферта за видео"],
    ["AW: Оферта за видео", "оферта за видео"],
    ["Fwd: RE[2]: Оферта   за видео", "оферта за видео"],
    ["  Оферта за видео ", "оферта за видео"],
    ["Относно: Оферта", "оферта"],
  ])("%s → %s", (subject, normalized) => {
    expect(normalizeSubject(subject)).toBe(normalized);
  });

  it("answers with one Re:, keeping a forward prefix and never an empty subject", () => {
    expect(replySubject("AW: Re: Оферта")).toBe("Re: Оферта");
    expect(replySubject("Fwd: Оферта")).toBe("Re: Fwd: Оферта");
    expect(replySubject("Оферта")).toBe("Re: Оферта");
    expect(replySubject("   ")).toBe("Re: (без тема)");
  });
});

describe("message ids and headers", () => {
  it("reads every <id> from References or In-Reply-To", () => {
    expect(parseMessageIds("<a@x> <b@y>\r\n <c@z>")).toEqual(["<a@x>", "<b@y>", "<c@z>"]);
    expect(parseMessageIds(null)).toEqual([]);
  });

  it("finds a header whatever its case", () => {
    expect(headerValue({ "In-Reply-To": "<a@x>" }, "in-reply-to")).toBe("<a@x>");
    expect(headerValue(null, "x")).toBeUndefined();
  });

  it("quotes every id once, oldest first, capped at twenty by head and tail", () => {
    expect(
      referenceChain([
        { messageId: "<1@x>", inReplyTo: null },
        { messageId: "<2@x>", inReplyTo: "<1@x>" },
        { messageId: null, inReplyTo: "<2@x>" },
      ]),
    ).toEqual(["<1@x>", "<2@x>"]);
    const many = Array.from({ length: 30 }, (_, i) => ({ messageId: `<${i}@x>`, inReplyTo: null }));
    const chain = referenceChain(many);
    expect(chain).toHaveLength(20);
    expect(chain[0]).toBe("<0@x>");
    expect(chain.at(-1)).toBe("<29@x>");
  });
});

describe("how a message reads in the panel (never the sender's HTML)", () => {
  it("flattens markup to text, drops scripts and styles, decodes entities", () => {
    const html =
      "<html><head><title>x</title></head><body><script>alert(1)</script><style>p{}</style><p>Здравейте,</p><p>колко струва &quot;Растеж&quot; &amp; видео?<br>Поздрави &#8212; Мария &#x1F600;</p></body></html>";
    expect(flattenHtml(html)).toBe('Здравейте,\nколко струва "Растеж" & видео?\nПоздрави — Мария 😀');
  });

  it("prefers the text part, trims our own signature from our messages only", () => {
    expect(readableBody({ direction: "in", bodyText: "Текст\n--\nМария", bodyHtml: "<p>x</p>" })).toBe(
      "Текст\n--\nМария",
    );
    expect(
      readableBody({ direction: "out", bodyText: "Отговор\n\n--\nHera Editing\nhera-editing.com", bodyHtml: null }),
    ).toBe("Отговор");
    expect(readableBody({ direction: "in", bodyText: "  ", bodyHtml: "<p>Само HTML</p>" })).toBe("Само HTML");
    expect(readableBody({ direction: "in", bodyText: null, bodyHtml: null })).toBe("(празно съобщение)");
    expect(withoutSignature("без подпис")).toBe("без подпис");
  });
});
