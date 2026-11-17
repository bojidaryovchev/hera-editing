import { PRICE_LABEL } from "./shared";

/** /paketi. H1, lead, volume note and price label are spec (CPY:41-43, IA:56, SVC:30). */
export const PACKAGES = {
  breadcrumb: "Пакети",
  hero: {
    eyebrow: "Пакети",
    title: "Пакети според нуждите на Вашия бизнес",
    lead: "Няма две еднакви фирми. Можем да започнем с няколко видеа месечно или да изградим по-активен календар. Всяка оферта уточнява посещенията, броя оригинални видеа, платформите, корекциите и публикуването.",
  },
  /** Price intent up front (research/05): what drives the quote, answered plainly. */
  price: {
    heading: "От какво зависи цената",
    answer:
      "Цената на поддръжката на социални мрежи зависи най-вече от броя оригинални видеа и снимачни посещения, от платформите и от това колко управление е нужно. Нямаме общ ценоразпис: след кратък разговор изпращаме конкретен обхват и цена.",
  },
  tiersHeading: "Три примерни нива",
  tableCaption: "Сравнение на пакетите Старт, Растеж и Индивидуално",
  /** product/01 SVC:18-30, row by row; the "Intended for" row is shown in each tier's header. */
  rows: [
    { label: "Оригинални кратки видеа месечно", values: ["4", "8", "По договаряне, често 12+"], key: true },
    { label: "Снимачни посещения", values: ["1 месечно, с уговорена продължителност", "1–2 месечно", "По договаряне"] },
    { label: "Платформи", values: ["До 2 по избор", "До 3 по избор", "По договаряне"] },
    { label: "Стратегия и календар", values: [true, true, true] },
    {
      label: "Надписи, субтитри и адаптации",
      values: ["Уточняват се в офертата", "Уточняват се в офертата", "Уточняват се в офертата"],
    },
    { label: "Публикуване след одобрение", values: [true, true, true] },
    { label: "Месечен отчет", values: ["Основен", "Разширен", "По договаряне"] },
    { label: "Снимки и статични публикации", values: ["При договаряне", "При договаряне", "При договаряне"] },
    {
      label: "Платена реклама",
      values: ["Не е включена", "Не е включена", "Не е включена; възможна е отделна оферта"],
    },
    { label: "Цена", values: [PRICE_LABEL, PRICE_LABEL, PRICE_LABEL], price: true },
  ],
  yes: "Да",
  /** Narrow screens: rows that are the same in every tier are listed once, above the cards. */
  commonHeading: "Във всички нива",
  counting: {
    heading: "Как броим видеата",
    text: "Едно оригинално видео е една идея с отделен монтаж. Ако го публикуваме в Instagram, TikTok и Facebook, това е едно видео в три платформи, а не три видеа.",
  },
  /** The one-idea diagram (packages "Как броим видеата" and the video page). Decorative; the text says it all. */
  oneVideo: { idea: "Една идея, един монтаж", result: "= 1 оригинално видео" },
} as const;
