/**
 * The quote form's choices and length limits, without Zod, so the browser can draw the form before the validation
 * rules (src/lib/validation/lead.ts, which re-exports these) have loaded.
 */

export const GOALS = ["awareness", "consistency", "enquiries", "other", "unsure"] as const;
export type LeadGoal = (typeof GOALS)[number];

export const VOLUMES = ["unsure", "4", "8", "12plus"] as const;
export type LeadVolume = (typeof VOLUMES)[number];

export const LEAD_LIMITS = {
  name: { min: 2, max: 100 },
  businessName: { min: 2, max: 120 },
  city: { min: 2, max: 100 },
  email: { max: 254 },
  phone: { max: 40 },
  profileUrl: { max: 250 },
  message: { max: 2000 },
  utm: { max: 100 },
} as const;
