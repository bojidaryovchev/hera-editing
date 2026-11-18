import type { AiChoice, MusicChoice, VersionChoice } from "@/lib/en/order-fields";

/**
 * How the owner's alert email and the admin panel name an English order's fields (decision L38). In Bulgarian,
 * for the owner: the client's own answers stay as typed, in English.
 */
export const ORDER_LABELS = {
  badge: "EN",
  badgeLabel: "Поръчка от английската секция",
  alertHeading: "Нова поръчка от английската секция",
  alertSubject: "Нова поръчка (EN)",
  section: "Поръчка и бриф",
  name: "Име",
  businessName: "Фирма",
  email: "Имейл",
  package: "Пакет",
  price: "Цена по ценоразпис",
  custom: "Индивидуална оферта",
  country: "Държава",
  vatNumber: "ДДС или регистрационен номер",
  businessConfirmed: "Поръчва като фирма",
  yes: "Да",
  footageUrl: "Материал (линк)",
  deadline: "Краен срок",
  references: "Референтни видеа",
  music: "Музика",
  aiVisuals: "Визуални елементи, генерирани с AI",
  mustInclude: "Какво да има или да няма",
  scope: "Описание на задачата",
  niche: {
    wedding: "Сватба",
    youtube: "YouTube",
    "real-estate": "Имот",
  },
  wedding: {
    couple: "Имена на двойката",
    keyMoments: "Ключови моменти",
    vowsAudio: "Аудио от клетвите и речите",
    grade: "LUT или бележки за цветовете",
    styleFilm: "Филм за стила",
  },
  youtube: {
    script: "Сценарий",
    voiceover: "Глас зад кадър",
    channel: "Канал",
    stockLibrary: "Стокова библиотека",
  },
  realEstate: {
    listing: "Адрес или име на обявата",
    roomOrder: "Ред на стаите или план",
    branding: "Брандинг",
    versions: "Версии",
  },
} as const;

export const MUSIC_LABELS_BG: Record<MusicChoice, string> = {
  client: "Клиентът изпраща трака и лиценза",
  library: "Музика от библиотека, чийто лиценз покрива употребата",
  none: "Без музика",
};

export const AI_LABELS_BG: Record<AiChoice, string> = {
  allowed: "Разрешени",
  not_allowed: "Не са разрешени",
};

export const VERSION_LABELS_BG: Record<VersionChoice, string> = {
  both: "С брандинг и без брандинг",
  branded: "Само с брандинг",
  unbranded: "Само без брандинг",
};
