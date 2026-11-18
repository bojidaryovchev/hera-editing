/**
 * The English privacy notice (/en/privacy), kept consistent with the Bulgarian notice (src/content/legal/privacy.ts).
 * Draft written on 2026-11-18 (decision L40, spec review gap 2.1). It states how the site and the order form work,
 * and proposes the legal basis and the retention period. The controller's details stay gated until the company is
 * registered and verified (decision 10), and the privacy contact waits for owner question B3. The business owner
 * approves it, or has a lawyer review it (owner question B6). Production refuses a draft (assertEnPrivacyReady).
 */
export const EN_PRIVACY_NOTICE = {
  version: "en-draft-2026-11-18b",
  status: "draft" as "draft" | "approved",
} as const;

export type NoticeSection = { id: string; heading: string; body: string | null; pending: string | null };

export const EN_PRIVACY_PAGE = {
  breadcrumb: "Privacy",
  title: "Privacy notice",
  draftNotice: "Draft. This text is awaiting approval.",
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
      body: "We use your order details to take the steps you ask for before a contract and to perform it (Article 6(1)(b) of the General Data Protection Regulation). As you order for a business, we also rely on our legitimate interest in answering business enquiries (Article 6(1)(f)). The pseudonymous abuse-protection identifier rests on our legitimate interest in protecting the form from automated requests (Article 6(1)(f)). Invoicing records are kept because the law requires it (Article 6(1)(c)).",
      pending: "This legal basis is a proposal awaiting approval.",
    },
    {
      id: "retention",
      heading: "How long we keep it",
      body: "Orders that don't lead to a contract, and the correspondence about them, are kept for 12 months from the last contact and then deleted. If we work together, we keep your details for the length of the contract and afterwards for as long as tax and accounting law requires.",
      pending: "The 12-month period is a proposal awaiting approval. Until then, orders are not deleted automatically.",
    },
    {
      id: "recipients",
      heading: "Who processes it for us",
      body: "Vercel hosts the site, and its functions run in Frankfurt, Germany. Neon runs the database where orders are stored, also in Frankfurt. Resend, in its EU region, sends us the email that tells us about a new order, and the replies we send you from our mailbox. When the form is protected by Cloudflare Turnstile, Cloudflare processes technical data from your browser to tell people from automated programs.",
      pending: "The safeguards for any transfer of data outside the EU.",
    },
    {
      id: "correspondence",
      heading: "Email we exchange",
      body: "When you write to contact@hera-editing.com, or we write to you about an order, the messages are stored in the site's database (Neon, Frankfurt) so that we can answer from one inbox. Resend carries them. We keep them as long as the order they belong to.",
      pending: null,
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
      body: "You have the right to access your data, to have it corrected or erased, to restrict its processing, to receive it in a portable form, and to object to processing based on legitimate interest (Articles 15–21 of the General Data Protection Regulation). You can complain to the Bulgarian data protection authority, the Commission for Personal Data Protection (www.cpdp.bg), or to the authority where you live or work in the EU. To use your rights, write to the privacy contact below.",
      pending: null,
    },
    {
      id: "contact",
      heading: "Privacy questions",
      body: null,
      pending: "An email or postal address for privacy requests.",
    },
  ] satisfies NoticeSection[],
} as const;
