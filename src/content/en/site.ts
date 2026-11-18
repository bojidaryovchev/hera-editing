/**
 * The English section's chrome (decision L38): navigation, shell labels, footer and gates. Its own navigation,
 * apart from the Bulgarian site's (strategy §7: the Bulgarian pages link here from the footer only). The brand name
 * is configuration (NEXT_PUBLIC_BRAND_NAME), never copy.
 */

export const EN_HOME_PATH = "/en";
export const EN_ORDER_PATH = "/en/order";

/** The one action, everywhere in the section. */
export const ORDER_CTA = "Order an edit";

export const EN_NAV = [
  { label: "Weddings", href: "/en/wedding-editing" },
  { label: "YouTube", href: "/en/youtube-editing" },
  { label: "Real estate", href: "/en/real-estate-editing" },
  { label: "Pricing", href: "/en/pricing" },
  { label: "How it works", href: "/en/how-it-works" },
] as const;

export const EN_SHELL = {
  skipLink: "Skip to the content",
  mainNavLabel: "Main navigation",
  footerNavLabel: "Site map",
  breadcrumbLabel: "Breadcrumb",
  breadcrumbHome: "Home",
  homeLinkSuffix: "home page",
  menuOpen: "Open the menu",
  menuClose: "Close the menu",
  menuTitle: "Menu",
  stagingBar: "Test version. The content is not final.",
} as const;

/** Owner inputs still missing (development and staging only), like the Bulgarian GATES. */
export const EN_GATES = {
  contact: "To come: a contact email",
  company: "To come: company details",
  samples: "To come: real samples, labelled",
} as const;

export const EN_FOOTER = {
  tagline: "Remote video editing for creators and filmmakers. Everything in writing.",
  columns: [
    {
      heading: "Editing",
      links: [
        { label: "Wedding editing", href: "/en/wedding-editing" },
        { label: "YouTube editing", href: "/en/youtube-editing" },
        { label: "Real-estate editing", href: "/en/real-estate-editing" },
        { label: "Work samples", href: "/en/work", requiresSamples: true },
      ],
    },
    {
      heading: "Working with us",
      links: [
        { label: "Pricing", href: "/en/pricing" },
        { label: "How it works", href: "/en/how-it-works" },
        { label: "Order an edit", href: "/en/order" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Terms of service", href: "/en/terms" },
        { label: "Privacy notice", href: "/en/privacy" },
        { label: "Cookies", href: "/en/cookies" },
      ],
    },
  ],
  cookieSettings: "Cookie settings",
  contactHeading: "Contact",
  companyHeading: "Company",
  companyIdLabel: "Company number",
  vatIdLabel: "VAT number",
  /** The way back to the Bulgarian site: its own language and name. */
  bulgarian: { before: "Hera Editing in Bulgaria", language: "Български" },
} as const;

/** The Bulgarian footer's one link into this section (decision L38), shown only while the section is on. */
export const EN_LINK_FROM_BG = "English: video editing for creators and filmmakers";

export function enCopyrightLine(brand: string, year: number): string {
  return `© ${year} ${brand}`;
}

/** Where every English breadcrumb trail starts (Home → /en), and how the trail is announced. */
export const EN_CRUMBS = {
  home: { name: EN_SHELL.breadcrumbHome, path: EN_HOME_PATH },
  label: EN_SHELL.breadcrumbLabel,
};
