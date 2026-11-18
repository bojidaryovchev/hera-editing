/**
 * /en/cookies and the English consent banner: the same categories and the same one cookie as the Bulgarian site
 * (src/content/legal/cookies.ts), in English. The choice is shared: one site, one hera_consent cookie.
 */
export const EN_COOKIES_PAGE = {
  breadcrumb: "Cookies",
  title: "Cookies and settings",
  lead: "What the site stores in your browser, and your choice, which you can change at any time. The order form works whatever you choose.",
  draftNotice: "Draft. A lawyer still has to review this text.",
  noOptional: "The site uses no analytics or advertising cookies at the moment.",
  categories: {
    necessary: {
      title: "Necessary",
      text: "Needed for the site to work, for example to remember your cookie choice. They can't be switched off.",
      state: "Always on",
    },
    analytics: {
      title: "Analytics",
      text: "Help us see which pages are visited, without any data from the order form. Only with your consent.",
      stateOff: "Off",
      stateOn: "On",
      notUsed: "Not used at the moment",
    },
  },
  saved: "Your choice is saved.",
  storage: {
    heading: "What we store",
    nothingStored: "At the moment the site stores nothing in your browser.",
    columns: ["Name", "What it is for", "How long"],
    consent: { name: "hera_consent", purpose: "Remembers your cookie choice.", duration: "6 months" },
    analytics: {
      name: "_ga, _ga_*",
      purpose: "Google Analytics: tells visits apart, without data from the order form.",
      duration: "13 months",
    },
  },
  toggleLabel: "Analytics cookies",
  rejectOptional: "Only necessary",
  acceptAll: "Accept all",
  save: "Save my choice",
} as const;

export const EN_CONSENT_BANNER = {
  label: "Cookies",
  text: "We use analytics cookies only with your consent. You can refuse them, and the site works just the same.",
  rejectOptional: "Only necessary",
  acceptAll: "Accept all",
  settings: "Settings",
} as const;
