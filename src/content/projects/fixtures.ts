import type { Project } from "./types";

/**
 * Clearly fictional projects for automated tests only (spec/website/03 TS:117). Loaded
 * only when APP_ENV=test and CONTENT_FIXTURES=1; production configuration refuses it.
 */
export const FIXTURE_PROJECTS: readonly Project[] = [
  {
    slug: "testova-pekarna",
    status: "approved",
    fixture: true,
    rights: {
      clientPermission: true,
      footageCleared: true,
      musicCleared: true,
      approvedBy: "Тестов клиент (фиктивен)",
      approvedAt: "2026-11-01",
    },
    businessName: "Тестова пекарна (фиктивни данни)",
    category: "Пекарна",
    summary: "Фиктивен проект за автоматизирани тестове: месечни видеа за витрината и процеса.",
    poster: null,
    video: null,
    situation: "Фиктивна ситуация за тестове на шаблона.",
    goals: ["Фиктивна цел за тестове."],
    responsibility: ["Фиктивен обхват за тестове."],
    formats: ["Как се прави", "Зад кадър"],
    samples: [],
    outcomes: null,
    attribution: "Тестови данни. Не е реален клиент.",
  },
  {
    slug: "testov-chernova",
    status: "draft",
    fixture: true,
    rights: { clientPermission: false, footageCleared: false, musicCleared: false, approvedBy: null, approvedAt: null },
    businessName: "Тестова чернова (фиктивни данни)",
    category: "Чернова",
    summary: "Фиктивна чернова, която никога не трябва да се публикува.",
    poster: null,
    video: null,
    situation: "Фиктивна чернова.",
    goals: [],
    responsibility: [],
    formats: [],
    samples: [],
    outcomes: null,
    attribution: "Тестови данни.",
  },
];
