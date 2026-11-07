/** 404 and the generic error page (IA:19, AT:17; decision L14). */
export const NOT_FOUND = {
  title: "Страницата не е намерена",
  text: "Възможно е адресът да е сгрешен или страницата да е преместена.",
  homeLink: "Към началната страница",
  linksHeading: "Може да Ви е полезно",
  links: [
    { label: "Управление на социални мрежи", href: "/upravlenie-na-sotsialni-mrezhi" },
    { label: "Пакети", href: "/paketi" },
    { label: "Контакти", href: "/kontakti" },
  ],
} as const;

export const SERVER_ERROR = {
  title: "Нещо се обърка",
  text: "Възникна неочаквана грешка. Опитайте отново след малко.",
  retry: "Опитайте отново",
  homeLink: "Към началната страница",
} as const;
