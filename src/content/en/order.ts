import type { OrderField } from "@/lib/en/order-fields";
import type { OrderErrorCode, OrderRequestField } from "@/lib/validation/order";

/**
 * /en/order: the brief form (sales kit §5) and its messages. The success text is the owner's brief: a written reply
 * within 1 business day with the exact price and the start date, payment by bank transfer in advance, no card.
 */
export const EN_ORDER = {
  breadcrumb: "Order",
  hero: {
    title: "Order an edit",
    lead: "Tell us what you need. We reply in writing within 1 business day with the exact price and your start date. You pay only after that, by bank transfer.",
  },
  fromPackage: "Package",
  next: {
    heading: "What happens next",
    steps: [
      "We reply in writing within 1 business day with the exact price and your start date.",
      "You pay our invoice by bank transfer, in advance.",
      "The delivery clock starts on your start date.",
    ],
  },
  form: {
    label: "Order form",
    window: "New project · brief",
    groups: {
      package: "Your package",
      you: "You and your business",
      brief: "The brief",
      wedding: "For your wedding film",
      youtube: "For your YouTube video",
      realEstate: "For your listing",
      custom: "For your custom quote",
    },
    labels: {
      package: "Package",
      name: "Your name",
      businessName: "Business name",
      email: "Email",
      country: "Country",
      vatNumber: "VAT or company number",
      businessConfirmed: "I'm ordering for a business, not as a consumer.",
      footageUrl: "Link to your footage",
      deadline: "Deadline",
      references: "Reference videos, with timestamps",
      music: "Music",
      aiVisuals: "AI-generated visuals",
      mustInclude: "What must or must not appear",
      scope: "Describe the job",
      couple: "The couple's names, for the titles",
      keyMoments: "Key moments to include",
      vowsAudio: "Vows and speech audio",
      grade: "Your LUT or grade notes",
      styleFilm: "A past film to match",
      script: "Your script",
      voiceover: "The voice-over file",
      channel: "Your channel",
      stockLibrary: "Stock library to use",
      listing: "Address or listing name",
      roomOrder: "Room order or floor plan",
      branding: "Branding: logo and agent details",
      versions: "Versions",
    } satisfies Record<OrderField, string>,
    /** One line each, short enough for a phone: the slot under a field never wraps (as on the Bulgarian form). */
    hints: {
      package: "Prices exclude VAT.",
      email: "We reply here, in writing.",
      vatNumber: "Optional, for the invoice.",
      footageUrl: "Optional. Drive, Dropbox or WeTransfer.",
      deadline: "Optional.",
      references: "Optional. Links with timestamps.",
      mustInclude: "Optional.",
      scope: "Needed for the quote.",
      link: "Optional. A link.",
      optional: "Optional.",
    },
    /** Longer guidance, inside the empty fields. */
    placeholders: {
      references: "For example: youtube.com/watch?v=… at 1:20, the pacing of the intro",
      scope: "The footage (hours, cameras), the finished length, the versions you need and who approves",
    },
    choices: {
      music: {
        client: "I'll send the track and its licence",
        library: "Use royalty-free music whose licence covers my use",
        none: "No music",
      },
      aiVisuals: { allowed: "Allowed", not_allowed: "Not allowed" },
      versions: { both: "Branded and unbranded", branded: "Branded only", unbranded: "Unbranded only" },
    },
    choosePackage: "Choose a package",
    chooseCountry: "Choose your country",
    customOption: "Something else: a custom quote",
    customGroup: "Custom",
    euNotice: "We can't take orders from businesses in the EU yet.",
    euNoticeMore: "Businesses in Bulgaria and outside the EU can order.",
    privacyBefore: "How we handle your data is explained in our",
    privacyLink: "privacy notice",
    termsBefore: "Orders follow our",
    termsLink: "terms of service",
    submit: "Send my brief",
    submitting: "Sending…",
    honeypotLabel: "Leave this field empty",
    summaryHeading: "Your brief was not sent",
    successHeading: "Thank you. Your brief is in.",
    successText:
      "We'll reply in writing within 1 business day with the exact price and your start date. Payment by bank transfer, in advance.",
    summaryTitle: "Your brief",
    backHome: "Back to the home page",
    sendAnother: "Send another brief",
    sentToast: "Your brief was sent.",
  },
  status: {
    error: "We couldn't send your brief. Please try again in a moment, or email us.",
    rateLimited: "You've sent several briefs in a short time. Please try again in a little while, or email us.",
    invalidRequest: "Your brief couldn't be processed. Reload the page and try again.",
  },
  direct: { heading: "Prefer email?", emailLabel: "Email" },
} as const;

/** "Check 1 field." / "Check 3 fields." */
export function checkFieldsEn(n: number): string {
  return n === 1 ? "Check 1 field." : `Check ${n} fields.`;
}

const REQUIRED: Partial<Record<OrderField, string>> = {
  package: "Choose a package.",
  country: "Choose your country.",
  music: "Choose who supplies the music.",
  aiVisuals: "Tell us whether AI-generated visuals are allowed.",
  scope: "Describe the job, so that we can quote it.",
  email: "Enter your email address.",
  name: "Enter your name.",
  businessName: "Enter your business name.",
};

export function orderErrorMessage(field: OrderField | OrderRequestField, code: OrderErrorCode): string {
  switch (code) {
    case "required":
      return REQUIRED[field as OrderField] ?? "Fill in this field.";
    case "too_short":
      return field === "scope" ? "Tell us a little more: at least 10 characters." : "Enter at least 2 characters.";
    case "too_long":
      return "This is too long. Please shorten it.";
    case "invalid_email":
      return "Enter an email address like name@example.com.";
    case "invalid_url":
      return "Paste a link, for example drive.google.com/…";
    case "invalid_choice":
      return "Choose one of the options.";
    case "invalid_country":
      return "Choose your country from the list.";
    case "eu_unavailable":
      return EN_ORDER.form.euNotice;
    case "business_required":
      return "Confirm that you are ordering for a business.";
    case "invalid_vat":
      return "Use letters, digits and spaces only, for example GB123456789.";
    case "invalid_date":
      return "Choose a valid date.";
    case "date_past":
      return "Choose a date from today on.";
    case "privacy_required":
    case "invalid_request":
    case "unsupported_locale":
      return EN_ORDER.status.invalidRequest;
  }
}

/** One-line versions for narrow fields, so an error never wraps and moves the form (the Bulgarian form's rule). */
const REQUIRED_SHORT: Partial<Record<OrderField, string>> = {
  package: "Choose a package.",
  country: "Choose your country.",
  music: "Choose one.",
  aiVisuals: "Choose one.",
  scope: "Describe the job.",
  email: "Enter your email.",
  name: "Enter your name.",
  businessName: "Enter the business name.",
};

export function orderErrorShort(field: OrderField | OrderRequestField, code: OrderErrorCode): string {
  switch (code) {
    case "required":
      return REQUIRED_SHORT[field as OrderField] ?? "Fill in this field.";
    case "too_short":
      return field === "scope" ? "At least 10 characters." : "At least 2 characters.";
    case "too_long":
      return "This is too long.";
    case "invalid_email":
      return "Enter a valid email.";
    case "invalid_url":
      return "Paste a valid link.";
    case "invalid_choice":
      return "Choose one of the options.";
    case "invalid_country":
      return "Choose from the list.";
    case "eu_unavailable":
      return "Not available in the EU yet.";
    case "business_required":
      return "Please confirm this.";
    case "invalid_vat":
      return "Letters and digits only.";
    case "invalid_date":
      return "Choose a valid date.";
    case "date_past":
      return "Choose a later date.";
    case "privacy_required":
    case "invalid_request":
    case "unsupported_locale":
      return "Reload and try again.";
  }
}
