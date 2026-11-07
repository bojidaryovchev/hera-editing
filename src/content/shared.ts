/** Lists used on several pages. Lead copy unless marked spec. */

/** The five content formats (IA:31), named in Bulgarian. */
export const FORMATS = [
  { id: "process", name: "Как се прави", short: "Процесът стъпка по стъпка", text: "Процесът зад продукта или услугата, показан стъпка по стъпка." },
  { id: "bts", name: "Зад кадър", short: "Хората и мястото", text: "Мястото, хората и ежедневието, които клиентите рядко виждат." },
  { id: "product", name: "Продуктът отблизо", short: "Детайлите, които убеждават", text: "Детайли, материали и употреба – това, което помага на клиента да избере." },
  { id: "tips", name: "Съвет от специалист", short: "Кратко и полезно", text: "Кратък и полезен съвет от човек от Вашия екип." },
  { id: "team", name: "Запознайте се с екипа", short: "Лицата на бизнеса", text: "Хората, които стоят зад името на бизнеса." },
] as const;

/** Platforms (RM:43, IA:32): chosen by fit, never all by default. */
export const PLATFORMS = [
  { id: "facebook", name: "Facebook", formats: ["4:5", "9:16"], text: "Видеа и публикации за хората, които вече познават бизнеса Ви, и за местната общност." },
  { id: "instagram", name: "Instagram", formats: ["9:16", "4:5"], text: "Reels – кратки вертикални видеа – и публикации, които показват бизнеса Ви визуално." },
  { id: "tiktok", name: "TikTok", formats: ["9:16"], text: "Кратки вертикални видеа, които могат да достигнат и до хора извън кръга на последователите Ви." },
] as const;

export const SHORTS_NOTE = "YouTube Shorts – по договаряне в офертата.";

/** Package tiers (product/01 SVC:18-30). Quantities are a product hypothesis: always shown as illustrative. */
export const TIERS = [
  {
    id: "start",
    name: "Старт",
    volume: "4",
    for: "За първо постоянно присъствие",
    videos: "4 оригинални видеа месечно",
    shoots: "1 снимачно посещение месечно",
    platforms: "До 2 платформи по избор",
    report: "Основен месечен отчет",
  },
  {
    id: "rastezh",
    name: "Растеж",
    volume: "8",
    for: "За бизнеси със седмична нужда от съдържание",
    videos: "8 оригинални видеа месечно",
    shoots: "1–2 снимачни посещения месечно",
    platforms: "До 3 платформи по избор",
    report: "Разширен месечен отчет",
  },
  {
    id: "individualno",
    name: "Индивидуално",
    volume: "12plus",
    for: "За няколко обекта или по-голяма продукция",
    videos: "Обхват по договаряне, често 12+ видеа",
    shoots: "Посещения по договаряне",
    platforms: "Платформи по договаряне",
    report: "Отчет по договаряне",
  },
] as const;

export type TierId = (typeof TIERS)[number]["id"];

/** Spec strings (IA:56, SVC:30). */
export const VOLUME_NOTE = "Примерен обхват; конкретното предложение е индивидуално.";
export const PRICE_LABEL = "По индивидуална оферта";
export const TIER_COMMON_INCLUSIONS = ["Стратегия и календар", "Публикуване след одобрение"] as const;

/** What affects the quote (CPY:55, R3:50). */
export const QUOTE_DRIVERS = [
  "Брой оригинални видеа",
  "Снимачни посещения и локации",
  "Брой платформи",
  "Субтитри, надписи и адаптации",
  "Пътуване извън договорения район",
  "Корекции и модериране на коментари",
] as const;

/** Spec text (CPY:28): the final call to action. */
export const FINAL_CTA = {
  heading: "Нека създадем план за Вашия бизнес.",
  body: "Разкажете ни къде работите и какво искате да постигнете. Ще предложим обхват и индивидуална цена.",
} as const;
