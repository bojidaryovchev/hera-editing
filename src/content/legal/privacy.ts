/**
 * Version of the privacy notice shown beside the quote form. Every stored lead
 * records it. Status stays "draft" until the owner's lawyer approves the real
 * notice; production builds refuse a draft (release gate).
 */
export const PRIVACY_NOTICE = {
  version: "draft-2026-11-07",
  status: "draft" as "draft" | "approved",
} as const;
