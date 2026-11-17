import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { HOME } from "@/content/home";
import { fitSize, fontMeasure, type Measure } from "@/lib/site/font-metrics";
import type { PageKey } from "@/lib/site/metadata";
import { SHARE, shareAlt } from "@/lib/site/share";

/** Share images (og:image, inherited by the Twitter card): 1200×630, drawn at build time from the page's copy. */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";
export const ogAlt = shareAlt;

// Brand tokens (globals.css @theme).
const C = {
  ed: "#0c0e10",
  ed2: "#13161a",
  line: "#2b3137",
  tx: "#edede7",
  tx2: "#a6acb0",
  tx3: "#80878b",
  ink: "#101315",
  lime: "#d9f568",
  teal: "#5cc8be",
  seg: "#9fb0b8",
} as const;

const PAD = 64;
const TITLE_BOX = { width: OG_SIZE.width - 2 * PAD, height: 262, lineHeight: 0.92, maxLines: 3 } as const;
const TITLE_SIZES = [136, 128, 120, 112, 104, 96, 88, 80, 72] as const;

// The OFL brand fonts (src/assets/fonts), loaded once per build.
const FONTS = join(process.cwd(), "src/assets/fonts");
type Loaded = { fonts: { name: string; data: Buffer; weight: 500 | 800; style: "normal" }[]; display: Measure; wordmark: string };
let loaded: Promise<Loaded> | undefined;
function load(): Promise<Loaded> {
  loaded ??= (async () => {
    const [display, sans, sansBold, mono, mark] = await Promise.all([
      readFile(join(FONTS, "SofiaSansExtraCondensed-ExtraBold.ttf")),
      readFile(join(FONTS, "SofiaSans-Medium.ttf")),
      readFile(join(FONTS, "SofiaSans-ExtraBold.ttf")),
      readFile(join(FONTS, "IBMPlexMono-Medium.ttf")),
      readFile(join(process.cwd(), "public/brand/hera-editing-wordmark-on-dark.svg")),
    ]);
    return {
      fonts: [
        { name: "Display", data: display, weight: 800, style: "normal" },
        { name: "Sans", data: sans, weight: 500, style: "normal" },
        { name: "Sans", data: sansBold, weight: 800, style: "normal" },
        { name: "Mono", data: mono, weight: 500, style: "normal" },
      ],
      display: fontMeasure(display),
      wordmark: `data:image/svg+xml;base64,${mark.toString("base64")}`,
    };
  })();
  return loaded;
}

const pad2 = (n: number) => String(n).padStart(2, "0");
/** The hero's decorative waveform, the same deterministic shape. */
const BARS = Array.from({ length: 150 }, (_, i) => 18 + 70 * Math.abs(Math.sin(i * 0.37) * Math.cos(i * 0.11 + 1.3)));
const CLIPS = [1, 2, 3, 4, 5, 6];
const TICKS = [0, 2, 4, 6, 8, 10, 12];
/** The playhead stands in clip 4, between ruler labels: three clips finished, the fourth in the edit. */
const HEAD = 7 / 12;

/** The timeline band along the bottom, as in the homepage hero. */
function Timeline({ width }: { width: number }) {
  const e = HOME.hero.editor;
  const lanes = width - 52;
  return (
    <div style={{ display: "flex", flexDirection: "column", position: "absolute", left: 0, right: 0, bottom: 0, height: 170, background: C.ed2, borderTop: `1px solid ${C.line}`, padding: `20px ${PAD}px 0` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontFamily: "Mono", fontSize: 15, color: C.tx3, height: 16, marginBottom: 14 }}>
        <span style={{ color: C.tx }}>{e.sequence}</span>
        <span style={{ color: C.lime }}>00:00:07:00</span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", width: 44, fontFamily: "Mono", fontSize: 13, color: C.tx3 }}>
          <span style={{ height: 20, marginBottom: 6 }} />
          <span style={{ height: 40, marginBottom: 6, display: "flex", alignItems: "center" }}>V1</span>
          <span style={{ height: 30, display: "flex", alignItems: "center" }}>A1</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", position: "relative", width: lanes }}>
          <div style={{ display: "flex", position: "relative", height: 20, marginBottom: 6, borderBottom: `1px solid ${C.line}` }}>
            {TICKS.map((t, i) => (
              <span
                key={t}
                style={{
                  position: "absolute",
                  bottom: 4,
                  left: i === 0 ? 0 : i === TICKS.length - 1 ? lanes - 44 : (t / 12) * lanes - 22,
                  fontFamily: "Mono",
                  fontSize: 12,
                  color: C.tx3,
                }}
              >
                00:{pad2(t)}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", position: "relative", height: 40, marginBottom: 6, background: C.ed, borderRadius: 5 }}>
            {CLIPS.map((n, i) => (
              <div
                key={n}
                style={{
                  position: "absolute",
                  top: 3,
                  bottom: 3,
                  left: (i * lanes) / 6 + 2,
                  width: lanes / 6 - 4,
                  borderRadius: 4,
                  background: i < 3 ? C.lime : C.seg,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 10px",
                  fontFamily: "Sans",
                  fontWeight: 800,
                  fontSize: 14,
                  color: C.ink,
                }}
              >
                {e.clip} {n}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", height: 30, background: C.ed, borderRadius: 5 }}>
            <svg width={lanes} height={30} viewBox={`0 0 ${BARS.length * 4} 100`} preserveAspectRatio="none">
              {BARS.map((h, i) => (
                <rect key={i} x={i * 4 + 1} y={(100 - h) / 2} width={2.4} height={h} rx={0.8} fill={C.teal} fillOpacity={0.75} />
              ))}
            </svg>
          </div>
          <div style={{ display: "flex", position: "absolute", left: lanes * HEAD - 1, top: 14, bottom: -24, width: 2, background: C.lime }} />
          <svg style={{ position: "absolute", left: lanes * HEAD - 8, top: 8 }} width={16} height={14} viewBox="0 0 16 14">
            <polygon points="0,0 16,0 16,7.7 8,14 0,7.7" fill={C.lime} />
          </svg>
        </div>
      </div>
    </div>
  );
}

/** Renders one page's share image. */
export async function renderOgImage(key: PageKey): Promise<ImageResponse> {
  const { fonts, display, wordmark } = await load();
  const card = SHARE[key];
  const words = [
    ...card.title.split(/\s+/).map((w) => ({ w, accent: false })),
    ...(card.accent ? card.accent.split(/\s+/).map((w) => ({ w, accent: true })) : []),
  ];
  const size = fitSize(
    display,
    words.map((x) => x.w),
    TITLE_BOX,
    TITLE_SIZES,
  );
  const gap = display(" ", size);

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: C.ed, padding: `52px ${PAD}px 0`, position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img elements */}
        <img src={wordmark} width={152} height={37} alt="" />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: 630 - 52 - 37 - 170, paddingBottom: 6 }}>
          {card.label && (
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Sans", fontWeight: 500, fontSize: 24, color: C.tx2, marginBottom: 22 }}>
              <span style={{ width: 26, height: 3, background: C.lime }} />
              {card.label}
            </div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", width: TITLE_BOX.width, fontFamily: "Display", fontWeight: 800, fontSize: size, lineHeight: TITLE_BOX.lineHeight, color: "#fff" }}>
            {words.map(({ w, accent }, i) => (
              <span key={i} style={{ marginRight: gap, color: accent ? C.lime : "#fff" }}>
                {w}
              </span>
            ))}
          </div>
        </div>
        <Timeline width={OG_SIZE.width - 2 * PAD} />
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
