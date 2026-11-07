/**
 * Site-wide copy: navigation, shell labels, footer, gates. Spec strings are verbatim
 * (website/01 IA:24, product/02); the rest is lead copy (design decisions L2, L7).
 * The brand name is configuration (NEXT_PUBLIC_BRAND_NAME), never hard-coded copy.
 */

export type NavItem = {
  label: string;
  href: string;
  /** Shown only while at least one approved, rights-cleared project is published. */
  requiresPublishedProjects?: boolean;
};

export const NAV: readonly NavItem[] = [
  { label: "Услуга", href: "/upravlenie-na-sotsialni-mrezhi" },
  { label: "Как работим", href: "/#kak-rabotim" },
  { label: "Пакети", href: "/paketi" },
  { label: "Проекти", href: "/rabota", requiresPublishedProjects: true },
  { label: "За нас", href: "/za-nas" },
  { label: "Контакти", href: "/kontakti" },
];

/** The one quote action, everywhere (CPY:16, CPY:43). Never "Купи" or "Абонирай се". */
export const QUOTE_CTA = "Поискайте оферта";

export const SHELL = {
  skipLink: "Към основното съдържание",
  mainNavLabel: "Основна навигация",
  footerNavLabel: "Карта на сайта",
  breadcrumbLabel: "Навигационна пътека",
  breadcrumbHome: "Начало",
  homeLinkSuffix: "начална страница",
  menuOpen: "Отворете менюто",
  menuClose: "Затворете менюто",
  menuTitle: "Меню",
  stagingBar: "Тестова версия. Съдържанието не е окончателно.",
} as const;

/** Labels for owner inputs that are still missing (development and staging only). */
export const GATES = {
  logo: "Предстои: лого",
  contact: "Предстои: телефон и имейл за контакт",
  company: "Предстои: данни на фирмата",
  city: "Предстои: базов град и район на работа",
  team: "Предстои: снимки и представяне на екипа",
  media: "Временно поле. Тук ще бъде реално видео от агенцията",
  socials: "Предстои: профили в социалните мрежи",
} as const;

export const FOOTER = {
  tagline: "Съдържание и управление на социални мрежи за бизнеса.",
  columns: [
    {
      heading: "Услуги",
      links: [
        { label: "Управление на социални мрежи", href: "/upravlenie-na-sotsialni-mrezhi" },
        { label: "Видеосъдържание за бизнеса", href: "/video-sadarzhanie-za-biznes" },
        { label: "Пакети", href: "/paketi" },
      ],
    },
    {
      heading: "Агенцията",
      links: [
        { label: "Как работим", href: "/#kak-rabotim" },
        { label: "Проекти", href: "/rabota", requiresPublishedProjects: true },
        { label: "За нас", href: "/za-nas" },
        { label: "Контакти", href: "/kontakti" },
      ],
    },
    {
      heading: "Правна информация",
      links: [
        { label: "Политика за поверителност", href: "/poveritelnost" },
        { label: "Бисквитки", href: "/biskvitki" },
      ],
    },
  ],
  cookieSettings: "Настройки за бисквитки",
  contactHeading: "Контакт",
  emailLabel: "Имейл",
  phoneLabel: "Телефон",
  socialsHeading: "Социални мрежи",
  companyHeading: "Фирма",
  companyIdLabel: "ЕИК",
  vatIdLabel: "ДДС №",
} as const;

export function copyrightLine(brand: string, year: number): string {
  return `© ${year} ${brand}`;
}
