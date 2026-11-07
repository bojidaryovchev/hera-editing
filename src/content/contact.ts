/**
 * /kontakti page copy. H1, lead, confirmation and error are spec (CPY:46-49, kept in
 * forms.ts with the field labels); the rest is lead copy (decisions L6, L13).
 */
export const CONTACT = {
  breadcrumb: "Контакти",
  hero: {
    title: "Разкажете ни за бизнеса си",
    lead: "Няма нужда да имате готов план. Посочете с какво се занимавате и в кой град се намирате. Ще обсъдим какво съдържание има смисъл да създаваме и как би изглеждало месечното ни сътрудничество.",
  },
  form: {
    label: "Формуляр за запитване",
    optional: "(по желание)",
    contactLegend: "Как да се свържем с Вас?",
    contactHint: "Достатъчно е едно от двете.",
    volumeHint: "Брой оригинални видеа месечно.",
    messagePlaceholderHint: "Например с какво се занимавате, какво искате да покажете и има ли сезонни периоди.",
    privacyBefore: "Как обработваме данните Ви, е описано в",
    privacyLink: "Политиката за поверителност",
    submit: "Изпратете запитването",
    submitting: "Изпращаме…",
    honeypotLabel: "Оставете това поле празно",
    summaryHeading: "Запитването не е изпратено",
    successHeading: "Благодарим Ви!",
    successBackHome: "Към началната страница",
  },
  source: {
    fromPage: "Идвате от страницата",
    fromPackage: "Интересувате се от пакет",
  },
  direct: {
    heading: "Предпочитате директен контакт?",
    emailLabel: "Имейл",
    phoneLabel: "Телефон",
  },
} as const;

/** "Проверете 1 поле:" / "Проверете 3 полета:" */
export function summaryCount(n: number): string {
  return n === 1 ? "Проверете 1 поле:" : `Проверете ${n} полета:`;
}

/** Page names for the unobtrusive "from" line (only internal, allow-listed paths). */
export const SOURCE_PAGE_NAMES: Record<string, string> = {
  "/": "Начало",
  "/upravlenie-na-sotsialni-mrezhi": "Управление на социални мрежи",
  "/video-sadarzhanie-za-biznes": "Видеосъдържание за бизнеса",
  "/paketi": "Пакети",
  "/rabota": "Проекти",
  "/za-nas": "За нас",
  "/kontakti": "Контакти",
};
