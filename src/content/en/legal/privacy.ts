/**
 * The English privacy notice (/en/privacy), adapted from the Bulgarian skeleton (src/content/legal/privacy.ts) with
 * the same gates: it states only facts about how the site and the order form work. The controller's details stay
 * gated until the company is registered and verified (decision 10), and the legal basis, retention, rights and
 * contact wording are the lawyer's. Production refuses a draft (assertEnPrivacyReady).
 */
export const EN_PRIVACY_NOTICE = {
  version: "en-draft-2026-11-18",
  status: "draft" as "draft" | "approved",
} as const;

export type NoticeSection = { id: string; heading: string; body: string | null; pending: string | null };

export const EN_PRIVACY_PAGE = {
  breadcrumb: "Privacy",
  title: "Privacy notice",
  draftNotice: "Draft. A lawyer still has to review this text.",
  pendingLabel: "To come",
  versionLabel: "Version",
  cookiesLink: "Cookies and settings",
  termsLink: "Terms of service",
  companyNumber: "Company number",
  sections: [
    {
      id: "controller",
      heading: "Who is responsible for your data",
      body: null,
      pending: "The controller's name, company number, address and contact, once the company is registered.",
    },
    {
      id: "data",
      heading: "What the order form collects",
      body: "Your name, your business name, your email address, your country, a VAT or company number if you give one, your confirmation that you are ordering for a business, the package you chose, and your brief: links to your footage and files, a deadline, reference videos, your choices on music and AI-generated visuals, and notes on what must or must not appear. Depending on the package, the brief also asks for the couple's names, a listing address or a channel link. We also record the page you ordered from and any campaign parameters in its address. We collect no payment details and no file uploads: your footage stays wherever you shared it from.",
      pending: null,
    },
    {
      id: "purpose",
      heading: "What we use it for",
      body: "To reply in writing with the exact price and your start date, to do and deliver the work you order, and to invoice it. We don't use your order for advertising.",
      pending: null,
    },
    {
      id: "footage",
      heading: "Your footage",
      body: "When we edit footage that shows people, we process it on your behalf under the Data Processing Agreement that forms part of our terms of service. It is available on request.",
      pending: null,
    },
    {
      id: "basis",
      heading: "Legal basis",
      body: null,
      pending: "To be set with a lawyer.",
    },
    {
      id: "retention",
      heading: "How long we keep it",
      body: "Orders are not deleted automatically until a retention period is approved.",
      pending: "The owner and a lawyer set the period.",
    },
    {
      id: "recipients",
      heading: "Who processes it for us",
      body: "Vercel hosts the site, and its functions run in Frankfurt, Germany. Neon runs the database where orders are stored, also in Frankfurt. Resend, in its EU region, sends us the email that tells us about a new order, and the replies we send you from our mailbox.",
      pending:
        "Each provider's agreement, and the safeguards for any transfer outside the EU, as reviewed by a lawyer.",
    },
    {
      id: "correspondence",
      heading: "Email we exchange",
      body: "When we write to you about an order, the messages are stored in the site's database (Neon, Frankfurt) so that we can answer from one inbox. Resend carries them.",
      pending: "How long stored correspondence is kept.",
    },
    {
      id: "abuse",
      heading: "Protection against abuse",
      body: "To limit automated requests, we keep a pseudonymous identifier calculated from your IP address for a short time. The IP address itself is not stored.",
      pending: null,
    },
    {
      id: "rights",
      heading: "Your rights",
      body: null,
      pending: "A description of your rights and how to use them, reviewed by a lawyer.",
    },
    {
      id: "contact",
      heading: "Privacy questions",
      body: null,
      pending: "An email or postal address for privacy requests.",
    },
  ] satisfies NoticeSection[],
} as const;
