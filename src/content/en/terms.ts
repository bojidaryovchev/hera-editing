/**
 * The package terms at /en/terms: the client-facing part of docs/contracts/terms-of-service.md (everything after
 * its "---" line), the lead's draft 0.1 of 2026-11-18, word for word. tests/unit/en-terms.test.ts checks that this
 * file says exactly what the document says, so change the document first and then this file.
 *
 * Gates (decision 10): the company's legal name, number, address and the court's city come from BUSINESS once it is
 * verified; until then the page shows neutral words, never the document's [placeholders]. Production refuses to
 * build the section while `signedOff` is false (assertEnTermsSignedOff), and /en/order is closed until then.
 */

/** Inline text: plain, bold, an internal link, the mailbox address, the brand, or a gated company fact. */
export type TermsInline =
  | string
  | { b: string }
  | { link: "/en" | "/en/privacy"; text: string }
  | { email: string }
  | { brand: true }
  | { gate: "company" | "courtCity" };

export type TermsBlock =
  | { p: readonly TermsInline[] }
  | { ul: readonly (readonly TermsInline[])[] }
  | { ol: readonly (readonly TermsInline[])[] }
  | { table: { head: readonly [string, string]; rows: readonly (readonly [string, string])[] } };

export type TermsSection = { n: number; id: string; heading: string; blocks: readonly TermsBlock[] };

/** What a gate stands for in the document, for the sync test. */
export const TERMS_PLACEHOLDERS = {
  company: "[legal name], company number [ЕИК], registered at [address], Bulgaria",
  courtCity: "[city of the registered office]",
} as const;

/** Neutral words for a gate while the company details are not verified (never the placeholders). */
export const TERMS_GATE_TEXT = {
  company: "company details to follow on registration",
  courtCity: "the city of our registered office",
} as const;

const MAIL = { email: "contact@hera-editing.com" } as const;

export const EN_TERMS = {
  version: "0.1",
  date: "2026-11-18",
  /** Set to true only when the business owner has signed these terms off (decision 6). */
  signedOff: false,
  title: "Terms of Service",
  intro: [
    {
      p: [
        "These terms apply to video editing services ordered from ",
        { brand: true },
        " (",
        { gate: "company" },
        "; ",
        MAIL,
        ") through ",
        { link: "/en", text: "hera-editing.com/en" },
        " or by email. They are part of every order. By placing an order you accept them.",
      ],
    },
  ],
  sections: [
    {
      n: 1,
      id: "business-clients",
      heading: "Business clients only",
      blocks: [
        {
          p: [
            "We work with businesses and professionals: creators, filmmakers, photographers, studios, agencies and companies that order for their business. We do not contract with consumers.",
          ],
        },
        {
          p: [
            "When you order, you confirm that you are ordering for business purposes. We may ask for proof, such as your business name, a registration or VAT number, or your channel or company website.",
          ],
        },
      ],
    },
    {
      n: 2,
      id: "orders",
      heading: "How an order is made",
      blocks: [
        {
          ol: [
            [{ b: "You send the brief" }, " through the order form, with links to your footage and materials."],
            [
              { b: "We confirm in writing." },
              " The confirmation states the deliverables, the footage and length limits, the revision rounds, the price, the start date and the delivery time. A custom quote stays valid for 14 days.",
            ],
            [
              { b: "The contract starts" },
              " when you accept the confirmation and we receive the payment, or the deposit for a custom quote.",
            ],
          ],
        },
      ],
    },
    {
      n: 3,
      id: "packages",
      heading: "Packages, limits and changes",
      blocks: [
        {
          p: [
            { b: "What a package includes." },
            " Each package is as described on the pricing page on the day you order:",
          ],
        },
        {
          ul: [
            ["the deliverables;"],
            ["the maximum raw footage and finished length;"],
            ["the included revision rounds;"],
            ["the delivery time."],
          ],
        },
        {
          p: [
            { b: "Anything more" },
            " is charged at the add-on prices on the pricing page, or quoted separately. That covers more footage or length, extra versions, extra rounds, rush delivery, or work outside the package. We tell you before doing any paid extra.",
          ],
        },
      ],
    },
    {
      n: 4,
      id: "delivery",
      heading: "Delivery times",
      blocks: [
        {
          p: [
            { b: "How they are counted." },
            " Delivery times are in business days: Monday to Friday, excluding Bulgarian public holidays.",
          ],
        },
        {
          p: [
            { b: "When the clock starts." },
            " All three of these must be done, and your job must have reached the front of our queue, which is the start date we confirmed:",
          ],
        },
        {
          ul: [
            ["your footage and materials have arrived;"],
            ["the brief is complete;"],
            ["the payment has been received."],
          ],
        },
        {
          p: [
            { b: "When the clock pauses." },
            " It pauses while we wait for your answers, files or feedback. Rush delivery is available only by written agreement, and only when a slot is free.",
          ],
        },
      ],
    },
    {
      n: 5,
      id: "revisions",
      heading: "Revisions and acceptance",
      blocks: [
        {
          p: [
            { b: "What a revision round is." },
            " One consolidated list of time-coded notes, sent through the review link. Each package states how many rounds it includes. Extra rounds are charged at the add-on price.",
          ],
        },
        { p: [{ b: "Changes that are new work." }, " These are not revisions, and we quote them separately:"] },
        {
          ul: [
            ["a new direction after you have approved a cut;"],
            ["new footage;"],
            ["a different structure from the agreed brief."],
          ],
        },
        {
          p: [
            { b: "Acceptance." },
            " A delivery counts as accepted when you approve it. If you send no revision notes within 7 days of a delivery, it also counts as accepted.",
          ],
        },
      ],
    },
    {
      n: 6,
      id: "payment",
      heading: "Prices and payment",
      blocks: [
        {
          p: [
            { b: "Prices." },
            " In US dollars unless the confirmation says otherwise, and excluding VAT. We add VAT only where the law requires it.",
          ],
        },
        { p: [{ b: "When you pay:" }] },
        {
          ul: [
            [{ b: "Packages:" }, " in full, in advance."],
            [
              { b: "Custom quotes for new clients:" },
              " 50% before we start, and the balance before we deliver the final files. You review a watermarked preview first.",
            ],
          ],
        },
        {
          p: [{ b: "How you pay." }, " By bank transfer, against our invoice. You pay your own bank's sending fees."],
        },
        {
          p: [
            { b: "If a payment is late," },
            " we pause the work, and the delivery date moves by the length of the delay.",
          ],
        },
      ],
    },
    {
      n: 7,
      id: "founding-offer",
      heading: "The founding offer",
      blocks: [
        {
          p: [
            "Our first 10 clients, or all clients until 31 March 2027 (whichever comes first), get 30% off their first order. The discount does not depend on a review, a testimonial or anything else.",
          ],
        },
      ],
    },
    {
      n: 8,
      id: "cancellation",
      heading: "Cancellation and refunds",
      blocks: [
        {
          table: {
            head: ["When the order is cancelled", "What happens"],
            rows: [
              ["By you, before the start date", "A full refund, less bank fees"],
              [
                "By you, after work has started",
                "We charge for the work done: 50% of the price until the first cut is delivered, and 100% after it. We refund the rest",
              ],
              ["By us, because we cannot deliver", "A full refund"],
            ],
          },
        },
      ],
    },
    {
      n: 9,
      id: "materials",
      heading: "Your materials",
      blocks: [
        { p: [{ b: "What you confirm." }, " That you own, or have the right to use, everything you send us:"] },
        {
          ul: [
            ["footage, audio and music;"],
            ["logos, fonts and graphics;"],
            ["the consent of the people who appear in your footage."],
          ],
        },
        { p: ["You are responsible for any claim that arises from those materials."] },
        {
          p: [
            { b: "Music." },
            " We use only music you send with its licence, or music from a royalty-free library whose licence covers your use. We do not sell music licences. Copyright claims on platforms over material you supplied are your responsibility.",
          ],
        },
      ],
    },
    {
      n: 10,
      id: "rights",
      heading: "Rights in the finished edits",
      blocks: [
        {
          p: [
            { b: "After you have paid in full," },
            " we grant you the exclusive, worldwide right to use the final deliverables for the full term of copyright. That covers reproducing, editing, distributing, publishing and advertising with them, in any media, with the right to pass these rights on.",
          ],
        },
        {
          p: [
            { b: "For clients in the United States," },
            " the final deliverables are, as far as the law allows, works made for hire as part of an audiovisual work. Where that does not apply, we assign the rights to you. Where assignment is not possible, the licence above applies.",
          ],
        },
        { p: [{ b: "Before full payment," }, " no rights pass, and previews may carry a watermark."] },
        {
          p: [
            { b: "What we keep." },
            " Our own templates, presets and tools stay ours. You receive a non-exclusive right to use them as part of the deliverable.",
          ],
        },
        {
          p: [
            { b: "Credit." },
            " Under Bulgarian law, the editor's right to be named as author cannot be given up. We will not ask for credit, and we will not object if you publish without it.",
          ],
        },
        {
          p: [
            { b: "Our portfolio." },
            " We show your work only if you allow it in writing, and never work you mark as confidential.",
          ],
        },
      ],
    },
    {
      n: 11,
      id: "files",
      heading: "Raw footage and project files",
      blocks: [
        { p: ["Project files and raw footage are not part of the deliverables unless agreed in writing."] },
        {
          p: [
            "We keep the final files for 30 days after delivery. We delete your raw footage and project files 30 days after final delivery, unless you ask for longer or earlier deletion.",
          ],
        },
      ],
    },
    {
      n: 12,
      id: "ai",
      heading: "AI-assisted tools",
      blocks: [
        {
          p: [
            "We use AI-assisted tools for transcription, rough cuts, captions and finding candidate moments. A human editor makes every editing decision.",
          ],
        },
        {
          p: [
            "If you tell us not to use AI-generated visuals, voices or music, we don't. We do not use your footage to train AI models, and we switch off training where a tool allows it.",
          ],
        },
      ],
    },
    {
      n: 13,
      id: "confidentiality",
      heading: "Confidentiality",
      blocks: [
        {
          p: [
            "We keep your materials and unpublished work confidential. We use them only to do your work, and share them only with the service providers listed in the Data Processing Agreement. We sign a reasonable NDA on request.",
          ],
        },
      ],
    },
    {
      n: 14,
      id: "personal-data",
      heading: "Personal data",
      blocks: [
        {
          p: [
            "Where your footage or materials contain personal data, we process it on your behalf under our Data Processing Agreement, which forms part of these terms.",
          ],
        },
        {
          p: [
            "Our privacy notice explains how we handle the data you give us when you order: ",
            { link: "/en/privacy", text: "hera-editing.com/en/privacy" },
            ".",
          ],
        },
      ],
    },
    {
      n: 15,
      id: "liability",
      heading: "Liability",
      blocks: [
        { p: [{ b: "The limit." }, " Our total liability for an order is limited to the price paid for that order."] },
        { p: [{ b: "What we are not liable for:" }] },
        {
          ul: [
            ["indirect or consequential loss, or lost profits or revenue;"],
            ["platform decisions, such as removal, demonetisation or claims, about material you supplied;"],
            ["delays you cause."],
          ],
        },
        {
          p: [
            { b: "What is never limited." },
            " Nothing in these terms limits liability for intent or gross negligence (Bulgarian Obligations and Contracts Act, art. 94).",
          ],
        },
      ],
    },
    {
      n: 16,
      id: "force-majeure",
      heading: "Events outside our control",
      blocks: [
        {
          p: [
            "Neither side is responsible for delays caused by events outside its reasonable control, such as outages, illness or disasters. The affected side tells the other promptly. Delivery dates then move by the length of the event.",
          ],
        },
      ],
    },
    {
      n: 17,
      id: "communication",
      heading: "Communication",
      blocks: [
        {
          p: [
            "We work in writing, in English, by email and through review links. We do not hold calls. Written confirmations, including email, are binding.",
          ],
        },
      ],
    },
    {
      n: 18,
      id: "changes",
      heading: "Changes to these terms",
      blocks: [{ p: ["The version published on the day of your order applies to that order."] }],
    },
    {
      n: 19,
      id: "law",
      heading: "Law and disputes",
      blocks: [
        {
          p: [
            "These terms are governed by Bulgarian law. Disputes go to the competent court in ",
            { gate: "courtCity" },
            ", Bulgaria, unless the law requires otherwise. We will always try to settle a disagreement in writing first.",
          ],
        },
      ],
    },
    {
      n: 20,
      id: "contact",
      heading: "Contact",
      blocks: [{ p: [MAIL] }],
    },
  ],
} as const satisfies {
  version: string;
  date: string;
  signedOff: boolean;
  title: string;
  intro: readonly TermsBlock[];
  sections: readonly TermsSection[];
};

/** The terms page around the document: labels, the draft flag and the Data Processing Agreement note. */
export const EN_TERMS_PAGE = {
  breadcrumb: "Terms",
  versionLabel: "Version",
  draftNotice: "Draft: awaiting the business owner's sign-off.",
  companyGate: "To come: the company's details, once it is registered.",
  dpaHeading: "Data Processing Agreement",
  dpaText: "The Data Processing Agreement these terms refer to is available on request. Write to",
  dpaSubject: "Data Processing Agreement",
  dpaEmail: "contact@hera-editing.com",
  companyNumber: "company number",
  registeredAt: "registered at",
  privacyLink: "Privacy notice",
} as const;
