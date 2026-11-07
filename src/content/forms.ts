import type { LeadErrorCode, LeadField, LeadGoal, LeadVolume } from "@/lib/validation/lead";

/**
 * Quote-request form copy. Field labels, choices, confirmation and error texts are
 * the spec's own words (product/02, website/01); everything else follows the
 * owner's register decision (formal address).
 */

export const LEAD_FIELD_LABELS: Record<
  Exclude<LeadField, "privacyNoticeAcknowledged" | "requestId" | "locale">,
  string
> = {
  name: "Име",
  businessName: "Фирма / име на бизнеса",
  city: "Град",
  email: "Имейл",
  phone: "Телефон",
  profileUrl: "Сайт или профил в социалните мрежи",
  goal: "Какво искате да постигнете?",
  message: "Разкажете ни накратко за бизнеса",
  volume: "Колко често искате ново съдържание?",
};

export const GOAL_LABELS: Record<LeadGoal, string> = {
  awareness: "Повече разпознаваемост",
  consistency: "По-редовно съдържание",
  enquiries: "Повече запитвания",
  other: "Друго",
  unsure: "Не знам",
};

export const VOLUME_LABELS: Record<LeadVolume, string> = {
  unsure: "Не знам",
  "4": "4 на месец",
  "8": "8 на месец",
  "12plus": "12+ на месец",
};

export const LEAD_FORM_STATUS = {
  success: "Получихме запитването Ви. Ще се свържем с Вас чрез предоставения контакт.",
  error:
    "Не успяхме да изпратим запитването. Моля, опитайте отново или се свържете с нас по посочения телефон/имейл.",
  rateLimited:
    "Изпратихте няколко запитвания за кратко време. Опитайте отново след малко или се свържете с нас директно.",
  invalidRequest: "Запитването не можа да бъде обработено. Презаредете страницата и опитайте отново.",
} as const;

export function leadErrorMessage(field: LeadField, code: LeadErrorCode): string {
  switch (code) {
    case "required":
      return field === "goal" ? "Изберете какво искате да постигнете." : "Попълнете това поле.";
    case "too_short":
      return "Въведете поне 2 знака.";
    case "too_long":
      return "Текстът е твърде дълъг. Съкратете го.";
    case "invalid_email":
      return "Въведете имейл адрес във вида name@example.com.";
    case "invalid_phone":
      return "Въведете телефон, например 0888 123 456 или +359 888 123 456.";
    case "contact_required":
      return "Посочете имейл или телефон, за да можем да се свържем с Вас.";
    case "invalid_profile":
      return "Въведете адрес на сайт или профил, например instagram.com/profil.";
    case "invalid_choice":
      return "Изберете един от вариантите.";
    case "privacy_required":
    case "invalid_request":
    case "unsupported_locale":
      return LEAD_FORM_STATUS.invalidRequest;
  }
}
