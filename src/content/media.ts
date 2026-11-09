import type { AppEnv } from "@/lib/config/env";

/**
 * Footage for the motion pages. Until the agency supplies its own footage (owner launch input, decision L22),
 * the site runs on labelled stock from Mixkit (Stock Video Free License, every clip checked; credits in
 * public/placeholder-media/README.md). Stock is never shown in production: `assertMediaAllowed` fails the
 * production build while any set is still a placeholder.
 */
export type MediaKind = "placeholder" | "owner";
export type FormatId = "process" | "bts" | "product" | "tips" | "team";
export type Clip = { video: string; poster: string };

export type SiteMedia = {
  kind: MediaKind;
  /** Visible label on every placeholder frame; null once the footage is the agency's own. */
  label: string | null;
  /** Shown under the formats grid while the footage is a placeholder. */
  note: string | null;
  hero: { wide: Clip; tall: Clip };
  formats: Record<FormatId, Clip>;
};

const P = "/placeholder-media";

export const MEDIA: SiteMedia = {
  kind: "placeholder",
  label: "Примерни стокови кадри · само в тестовата версия",
  note: "Примерни стокови кадри · само в тестовата версия. На сайта ще бъдат реални видеа на агенцията.",
  hero: {
    wide: { video: `${P}/reel-16x9.mp4`, poster: `${P}/reel-16x9.jpg` },
    tall: { video: `${P}/reel-9x16.mp4`, poster: `${P}/reel-9x16.jpg` },
  },
  formats: {
    process: { video: `${P}/fmt-process.mp4`, poster: `${P}/fmt-process.jpg` },
    bts: { video: `${P}/fmt-bts.mp4`, poster: `${P}/fmt-bts.jpg` },
    product: { video: `${P}/fmt-product.mp4`, poster: `${P}/fmt-product.jpg` },
    tips: { video: `${P}/fmt-tips.mp4`, poster: `${P}/fmt-tips.jpg` },
    team: { video: `${P}/fmt-team.mp4`, poster: `${P}/fmt-team.jpg` },
  },
};

export class PlaceholderMediaError extends Error {
  constructor() {
    super("Placeholder stock footage cannot be used in production. Add the agency's own footage to MEDIA (src/content/media.ts).");
    this.name = "PlaceholderMediaError";
  }
}

/** Throws in production while the footage is still the labelled stock placeholder. */
export function assertMediaAllowed(appEnv: AppEnv, media: SiteMedia = MEDIA): void {
  if (appEnv === "production" && media.kind === "placeholder") throw new PlaceholderMediaError();
}
