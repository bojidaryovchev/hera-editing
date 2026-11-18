import { resolveAppEnv } from "@/lib/config/env";
import type { Niche } from "./packages";

/**
 * The English section's samples (decision L38, strategy §8): real edits only, each labelled. A sample is our own
 * edit of footage we may show ("demo") or a client's work shown with permission ("client"). Nothing is published
 * until `published` is true and every rights field is filled in; with none published, /en/work is a 404 and the
 * samples bands stay hidden. No stock footage may be presented as client work, and no sample may be invented.
 */
export type SampleKind = "demo" | "client";

export type Sample = {
  /** URL-safe id, unique. */
  id: string;
  niche: Niche;
  title: string;
  kind: SampleKind;
  /** An unlisted YouTube or Vimeo link; the page links to it (nothing is embedded or loaded from those sites). */
  videoUrl: string;
  /** A still from the edit, as a site file under public/ (or a host in images.remotePatterns). */
  poster: { src: string; alt: string; width: number; height: number } | null;
  description: string;
  rights: {
    /** Where the footage comes from: "Shot by Hera Editing", "A Bulgarian videographer's wedding", a library page. */
    footageSource: string | null;
    /** Under what licence or permission it may be shown: "Pexels licence", "the videographer's written permission". */
    footageLicence: string | null;
    /** The music's licence: "Artlist licence", "the client's licence". */
    musicLicence: string | null;
    /** The people's and the owners' permissions: "the couple's written permission", "no identifiable people". */
    permissions: string | null;
  };
  published: boolean;
  /** Clearly fictional data for automated tests; never published from the real list. */
  fixture?: boolean;
};

/** Real samples. Empty until the business owner supplies edits he has the right to show (decision L37). */
export const SAMPLES: readonly Sample[] = [];

const VIDEO_HOSTS = ["youtube.com", "www.youtube.com", "youtu.be", "vimeo.com", "www.vimeo.com", "player.vimeo.com"];

/** An https link to YouTube or Vimeo, nothing else. */
export function isSampleVideoUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && VIDEO_HOSTS.includes(u.hostname) && !u.username && !u.password;
  } catch {
    return false;
  }
}

export function videoPlatform(url: string): "youtube" | "vimeo" {
  return /vimeo\.com$/.test(new URL(url).hostname) ? "vimeo" : "youtube";
}

const filled = (v: string | null) => Boolean(v?.trim());

/** Published, every rights field filled in, a YouTube or Vimeo link, and a poster unless it is a test fixture. */
export function isPublishableSample(s: Sample): boolean {
  const r = s.rights;
  return (
    s.published &&
    filled(r.footageSource) &&
    filled(r.footageLicence) &&
    filled(r.musicLicence) &&
    filled(r.permissions) &&
    isSampleVideoUrl(s.videoUrl) &&
    filled(s.title) &&
    filled(s.description) &&
    (s.poster !== null || s.fixture === true)
  );
}

/** Clearly fictional samples for the end-to-end tests (APP_ENV=test and CONTENT_FIXTURES=1 only). */
export const FIXTURE_SAMPLES: readonly Sample[] = [
  {
    id: "test-wedding-highlight",
    niche: "wedding",
    title: "Test wedding highlight (fictional data)",
    kind: "demo",
    videoUrl: "https://vimeo.com/000000001",
    poster: null,
    description: "A fictional sample for automated tests. Not a real edit.",
    rights: {
      footageSource: "Fictional test footage",
      footageLicence: "Test data only",
      musicLicence: "Test data only",
      permissions: "Test data only",
    },
    published: true,
    fixture: true,
  },
  {
    id: "test-youtube-story",
    niche: "youtube",
    title: "Test documentary edit (fictional data)",
    kind: "client",
    videoUrl: "https://www.youtube.com/watch?v=FIXTURE0001",
    poster: null,
    description: "A fictional client sample for automated tests. Not a real client.",
    rights: {
      footageSource: "Fictional test footage",
      footageLicence: "Test data only",
      musicLicence: "Test data only",
      permissions: "Test data only",
    },
    published: true,
    fixture: true,
  },
  {
    id: "test-unlicensed",
    niche: "real-estate",
    title: "Test sample without its music licence (fictional data)",
    kind: "demo",
    videoUrl: "https://vimeo.com/000000002",
    poster: null,
    description: "Must never be shown: its music licence is missing.",
    rights: {
      footageSource: "Fictional test footage",
      footageLicence: "Test data only",
      musicLicence: null,
      permissions: "Test data only",
    },
    published: true,
    fixture: true,
  },
];

/**
 * The samples the site shows, in the order listed: publishable real ones, plus the fictional fixtures in tests with
 * CONTENT_FIXTURES=1 (refused by the configuration anywhere else). An entry marked as a fixture is never published
 * from the real list.
 */
export function publishedSamples(
  src: Record<string, string | undefined> = process.env,
  real: readonly Sample[] = SAMPLES,
  niche?: Niche,
): readonly Sample[] {
  const fixtures = resolveAppEnv(src) === "test" && src.CONTENT_FIXTURES?.trim() === "1";
  return [...real.filter((s) => !s.fixture), ...(fixtures ? FIXTURE_SAMPLES : [])]
    .filter(isPublishableSample)
    .filter((s) => !niche || s.niche === niche);
}
