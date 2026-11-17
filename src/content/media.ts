import type { AppEnv } from "@/lib/config/env";

/**
 * Footage for the motion pages. Until the agency supplies its own footage (owner launch input, decision L22),
 * development and previews run on labelled stock from Mixkit (Stock Video Free License, every clip checked; credits
 * in public/placeholder-media/README.md). Stock is never shown in production: there `footage()` answers null and
 * the pages draw a designed camera frame instead (acceptance D: an honest designed poster, never fake footage).
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

/** Every footage and poster URL, so the security policy can allow a CDN host the moment footage moves to one. */
export function mediaUrls(media: SiteMedia = MEDIA): string[] {
  const clips = [media.hero.wide, media.hero.tall, ...Object.values(media.formats)];
  return clips.flatMap((c) => [c.video, c.poster]);
}

/**
 * The footage the pages may show: the agency's own footage always; the labelled stock only outside production, and
 * not even there with PLACEHOLDER_MEDIA=off (to preview the production look). null means the designed frames.
 */
export function footage(
  appEnv: AppEnv,
  media: SiteMedia = MEDIA,
  src: Record<string, string | undefined> = process.env,
): SiteMedia | null {
  if (media.kind === "owner") return media;
  if (appEnv === "production") return null;
  return src.PLACEHOLDER_MEDIA?.trim() === "off" ? null : media;
}
