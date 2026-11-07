export type MediaPoster = { src: string; alt: string; width: number; height: number };

export type MediaVideo = {
  /** H.264 MP4 master (site-ready, not the raw recording). */
  mp4: string;
  webm?: string;
  /** WebVTT subtitles, Bulgarian. */
  captions?: string;
  title: string;
};

export type Project = {
  slug: string;
  /** Only "approved" projects with every rights flag true are ever published. */
  status: "draft" | "approved";
  rights: {
    clientPermission: boolean;
    footageCleared: boolean;
    musicCleared: boolean;
    /** Who approved publication on the client's side, and when (ISO date). */
    approvedBy: string | null;
    approvedAt: string | null;
  };
  /** Clearly fictional data for automated tests; never allowed in production. */
  fixture?: boolean;
  businessName: string;
  category: string;
  summary: string;
  poster: MediaPoster | null;
  video: MediaVideo | null;
  situation: string;
  goals: string[];
  responsibility: string[];
  formats: string[];
  samples: Array<{ title: string; poster: MediaPoster | null; video: MediaVideo | null }>;
  /** Shown only with a baseline, a reporting window and a methodology (IA:59). */
  outcomes: null | {
    window: string;
    baseline: string;
    methodology: string;
    items: Array<{ label: string; value: string }>;
  };
  attribution: string;
};
