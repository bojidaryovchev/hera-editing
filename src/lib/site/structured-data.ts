import { BUSINESS, type Business } from "@/content/business";
import { brandName, publicContacts } from "@/lib/site/brand";
import { absoluteUrl } from "@/lib/site/url";

/**
 * JSON-LD, limited to verified entities (TS:SEO, acceptance E): the brand and URL are configuration, contacts are
 * the owner's verified values, and company facts appear only once BUSINESS.verified is true (decision 10). No
 * LocalBusiness until a real public address exists, no FAQPage, no ratings or reviews.
 */
export type Thing = Record<string, unknown>;

const CONTEXT = "https://schema.org";

export type OrganizationInput = {
  brand: string;
  contacts: { email: string | null; phone: string | null };
  business: Business;
};

const orgId = () => absoluteUrl("/#organization");

export function organizationLd(input: OrganizationInput = { brand: brandName(), contacts: publicContacts(), business: BUSINESS }): Thing {
  const { brand, contacts, business } = input;
  const org: Thing = {
    "@type": "Organization",
    "@id": orgId(),
    name: brand,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/icon-512.png"),
  };
  if (contacts.email) org.email = contacts.email;
  if (contacts.phone) org.telephone = contacts.phone;
  if (business.verified) {
    if (business.legalName) org.legalName = business.legalName;
    const sameAs = Object.values(business.socials).filter((u): u is string => Boolean(u));
    if (sameAs.length > 0) org.sameAs = sameAs;
  }
  return org;
}

/** WebSite: the site name search engines show next to results. */
export function websiteLd(brand: string = brandName()): Thing {
  return { "@type": "WebSite", "@id": absoluteUrl("/#website"), name: brand, url: absoluteUrl("/"), inLanguage: "bg", publisher: { "@id": orgId() } };
}

/** The homepage graph: the site and the organisation behind it. */
export function homeGraph(): Thing {
  return { "@context": CONTEXT, "@graph": [websiteLd(), organizationLd()] };
}

/** BreadcrumbList matching the visible breadcrumbs (home, then the page). */
export function breadcrumbLd(items: readonly { name: string; path: string }[]): Thing {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}

/** Serialises for a script tag: `<` is escaped so content can never close the tag. */
export function jsonLdString(data: Thing): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
