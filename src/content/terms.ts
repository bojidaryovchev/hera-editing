/**
 * Service terms recommended from Bulgarian competitor evidence
 * (design workspace data/competitor-terms.md, decision L21) and NOT yet signed off
 * by the business owner (RELEASE_CHECKLIST.md, owner inputs). The release gate
 * (assertTermsSignedOff, on the service page) refuses production while `signedOff` is false.
 */
export const SERVICE_TERMS = {
  signedOff: false,
  engagement:
    "Обикновено препоръчваме първоначален период от 3 месеца. Така има време за настройка, първите снимки и първите изводи от данните. Точния срок уточняваме в индивидуалната Ви оферта.",
  revisions:
    "Към всяко видео обикновено са включени 2 кръга корекции. Един кръг е един общ списък с Вашите бележки, изпратен наведнъж. Промените в одобрения сценарий след снимките уточняваме отделно в офертата.",
  approvalSteps: [
    "Месечния план и сценариите одобрявате преди снимките.",
    "Готовите видеа одобрявате преди публикуване.",
    "За одобренията определяте едно лице за контакт от Ваша страна.",
    "Обикновено молим за обратна връзка до 7 дни. Ако одобрението закъснее, публикуването се измества съответно.",
  ],
  approvalPrinciple: "Публикуваме само след Вашето одобрение.",
  travel:
    "Снимаме на място при Вас. Пътуването в рамките на договорения район обикновено е включено, а за снимки извън него уточняваме пътните разходи предварително в офертата.",
} as const;
