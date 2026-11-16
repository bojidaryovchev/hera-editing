/**
 * Privacy notice. This is a SKELETON for the owner's lawyer, not a policy: it states
 * only facts about how this website is built (what the form collects, what is stored,
 * what is not). Legal basis, retention, controller and rights wording are owner/legal
 * inputs and stay gated. Production builds refuse a draft (release gate).
 */
export const PRIVACY_NOTICE = {
  version: "draft-2026-11-07",
  status: "draft" as "draft" | "approved",
} as const;

export const PRIVACY_PAGE = {
  breadcrumb: "Политика за поверителност",
  title: "Политика за поверителност",
  draftNotice: "Чернова. Текстът предстои да бъде прегледан от юрист.",
  pendingLabel: "Предстои",
  sections: [
    {
      id: "controller",
      heading: "Администратор на данните",
      body: null,
      pending: "Наименование, ЕИК, адрес и контакт на администратора.",
    },
    {
      id: "data",
      heading: "Какви данни събираме",
      body: "Чрез формуляра за запитване: име, фирма или име на бизнеса, град, имейл и/или телефон, сайт или профил в социалните мрежи (по желание), каква цел имате, колко често искате ново съдържание (по желание) и съобщение (по желание). Записваме и страницата, от която е изпратено запитването, и параметрите на рекламна кампания в адреса, ако има такива. Не събираме данни за плащане и не прикачваме файлове.",
      pending: null,
    },
    {
      id: "purpose",
      heading: "За какво ги използваме",
      body: "За да отговорим на запитването Ви и да подготвим оферта. Не използваме данните от формуляра за рекламни съобщения.",
      pending: null,
    },
    {
      id: "basis",
      heading: "Правно основание",
      body: null,
      pending: "Определя се с юрист.",
    },
    {
      id: "retention",
      heading: "Срок на съхранение",
      body: "Данните не се изтриват автоматично, докато срокът не бъде одобрен.",
      pending: "Срокът се определя от собственика и юрист.",
    },
    {
      id: "recipients",
      heading: "Получатели и обработващи",
      body: "Запитванията се съхраняват в база данни на хостинг доставчик и се изпращат като известие до пощата на агенцията.",
      pending: "Точните доставчици на хостинг, база данни и имейл и регионите, в които се обработват данните.",
    },
    {
      id: "abuse",
      heading: "Защита от злоупотреби",
      body: "За да ограничим автоматизираните заявки, пазим за кратко време анонимизиран идентификатор, изчислен от IP адреса. Самият IP адрес не се съхранява.",
      pending: null,
    },
    {
      id: "rights",
      heading: "Вашите права",
      body: null,
      pending: "Описание на правата и начина за упражняването им, прегледано от юрист.",
    },
    {
      id: "contact",
      heading: "Контакт по въпроси за поверителност",
      body: null,
      pending: "Имейл или адрес за запитвания относно личните данни.",
    },
  ],
  cookiesLink: "Бисквитки и настройки",
  versionLabel: "Версия",
} as const;
