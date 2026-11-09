/**
 * The brand name is configuration (NEXT_PUBLIC_BRAND_NAME, website/03 TS:92), required in production by
 * parseServerEnv. Outside production the owner's chosen name (decision 5) stands in, so previews read correctly.
 */
export const DEFAULT_BRAND_NAME = "Hera Editing";

export function brandName(): string {
  const v = process.env.NEXT_PUBLIC_BRAND_NAME?.trim();
  return v ? v : DEFAULT_BRAND_NAME;
}

/** Public contacts, null until supplied (owner launch input). */
export function publicContacts(): { email: string | null; phone: string | null } {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null;
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || null;
  return { email, phone };
}
