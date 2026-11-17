import { ABOUT } from "@/content/about";
import { CONTACT } from "@/content/contact";
import { HOME } from "@/content/home";
import { COOKIES_PAGE } from "@/content/legal/cookies";
import { PRIVACY_PAGE } from "@/content/legal/privacy";
import { PACKAGES } from "@/content/packages";
import { SERVICE } from "@/content/service";
import { VIDEO } from "@/content/video";
import { WORK } from "@/content/work";
import { brandName } from "@/lib/site/brand";
import type { PageKey } from "@/lib/site/metadata";

/**
 * What each page's share image says: the page's own eyebrow and H1, so a shared link shows the headline people
 * will land on (the search title already travels as og:title). The homepage keeps its two-colour headline.
 */
export type ShareCard = { label?: string; title: string; accent?: string };

export const SHARE: Record<PageKey, ShareCard> = {
  home: { label: HOME.hero.eyebrow, title: HOME.hero.titleLead, accent: HOME.hero.titleRest },
  service: { label: SERVICE.hero.eyebrow, title: SERVICE.hero.title },
  video: { label: VIDEO.hero.eyebrow, title: VIDEO.hero.title },
  packages: { label: PACKAGES.hero.eyebrow, title: PACKAGES.hero.title },
  about: { label: ABOUT.hero.eyebrow, title: ABOUT.hero.title },
  contact: { label: CONTACT.breadcrumb, title: CONTACT.hero.title },
  work: { label: WORK.title, title: WORK.lead },
  privacy: { title: PRIVACY_PAGE.title },
  cookies: { title: COOKIES_PAGE.title },
};

/** The image's alt text (og:image:alt): the brand and the headline the image shows. */
export function shareAlt(key: PageKey | ShareCard): string {
  const c = typeof key === "string" ? SHARE[key] : key;
  return `${brandName()}: ${c.accent ? `${c.title} ${c.accent}` : c.title}`;
}
