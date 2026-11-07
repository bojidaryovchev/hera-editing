/**
 * /biskvitki and the consent banner. States only what the site actually stores
 * (research/03 R3:45: "no false cookie declaration"). The banner appears only when an
 * optional service is configured and approved; otherwise there is nothing to consent to.
 */
export const COOKIES_PAGE = {
  breadcrumb: "Бисквитки",
  title: "Бисквитки и настройки",
  lead: "Тук виждате какво съхраняваме в браузъра Ви и можете да промените избора си по всяко време. Формулярът за запитване работи независимо от избора Ви.",
  draftNotice: "Чернова. Текстът предстои да бъде прегледан от юрист.",
  noOptional: "В момента сайтът не използва аналитични или рекламни бисквитки.",
  categories: {
    necessary: {
      title: "Необходими",
      text: "Нужни за работата на сайта, например за да запомним избора Ви за бисквитките. Не могат да бъдат изключени.",
      state: "Винаги активни",
    },
    analytics: {
      title: "Аналитични",
      text: "Помагат ни да разберем кои страници се посещават, без да събираме данни от формуляра. Включват се само с Вашето съгласие.",
      stateOff: "Изключени",
      stateOn: "Включени",
      notUsed: "Не се използват в момента",
    },
  },
  saved: "Изборът Ви е запазен.",
  rejectOptional: "Само необходимите",
  acceptAll: "Приемете всички",
  save: "Запазете избора",
} as const;

export const CONSENT_BANNER = {
  label: "Бисквитки",
  text: "Използваме аналитични бисквитки само с Вашето съгласие. Можете да ги откажете, без това да засегне работата на сайта.",
  rejectOptional: "Само необходимите",
  acceptAll: "Приемете всички",
  settings: "Настройки",
} as const;
