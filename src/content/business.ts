/**
 * Facts about the business. These are owner launch inputs (handoff/02 §A), never
 * creative copy: every field stays null until the owner supplies and verifies it.
 * Contacts and the brand name come from environment variables (website/03 TS:92-95).
 */
export type Business = {
  legalName: string | null;
  /** ЕИК */
  companyId: string | null;
  vatId: string | null;
  vatRegistered: boolean | null;
  address: string | null;
  baseCity: string | null;
  serviceArea: string | null;
  socials: { facebook: string | null; instagram: string | null; tiktok: string | null; youtube: string | null };
  /** Set to true only after the owner has checked every value above. */
  verified: boolean;
};

export const BUSINESS: Business = {
  legalName: null,
  companyId: null,
  vatId: null,
  vatRegistered: null,
  address: null,
  baseCity: null,
  serviceArea: null,
  socials: { facebook: null, instagram: null, tiktok: null, youtube: null },
  verified: false,
};
