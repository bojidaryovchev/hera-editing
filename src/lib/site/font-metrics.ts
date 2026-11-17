/**
 * Advance widths from a TrueType font, enough to fit a headline before rendering it (share images). Reads `head`,
 * `hhea`, `hmtx` and the Unicode `cmap` (format 4); kerning is ignored, which only overestimates widths.
 */
export type Measure = (text: string, size: number) => number;

export function fontMeasure(buf: Uint8Array): Measure {
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const tables = new Map<string, number>();
  const count = view.getUint16(4);
  for (let i = 0; i < count; i++) {
    const rec = 12 + i * 16;
    const tag = String.fromCharCode(view.getUint8(rec), view.getUint8(rec + 1), view.getUint8(rec + 2), view.getUint8(rec + 3));
    tables.set(tag, view.getUint32(rec + 8));
  }
  const at = (tag: string) => {
    const off = tables.get(tag);
    if (off === undefined) throw new Error(`Font has no ${tag} table`);
    return off;
  };

  const unitsPerEm = view.getUint16(at("head") + 18);
  const metricsCount = view.getUint16(at("hhea") + 34);
  const hmtx = at("hmtx");
  const advance = (gid: number) => view.getUint16(hmtx + 4 * Math.min(gid, metricsCount - 1));

  // The Windows Unicode BMP subtable (platform 3, encoding 1), format 4.
  const cmap = at("cmap");
  let sub = -1;
  for (let i = 0; i < view.getUint16(cmap + 2); i++) {
    const rec = cmap + 4 + i * 8;
    if (view.getUint16(rec) === 3 && view.getUint16(rec + 2) === 1) sub = cmap + view.getUint32(rec + 4);
  }
  if (sub < 0 || view.getUint16(sub) !== 4) throw new Error("Font has no Unicode format 4 cmap");
  const segs = view.getUint16(sub + 6) / 2;
  const ends = sub + 14;
  const starts = ends + segs * 2 + 2;
  const deltas = starts + segs * 2;
  const ranges = deltas + segs * 2;

  const glyph = (code: number): number => {
    for (let i = 0; i < segs; i++) {
      if (code > view.getUint16(ends + i * 2)) continue;
      const start = view.getUint16(starts + i * 2);
      if (code < start) return 0;
      const delta = view.getUint16(deltas + i * 2);
      const range = view.getUint16(ranges + i * 2);
      if (range === 0) return (code + delta) & 0xffff;
      const g = view.getUint16(ranges + i * 2 + range + (code - start) * 2);
      return g === 0 ? 0 : (g + delta) & 0xffff;
    }
    return 0;
  };

  const cache = new Map<string, number>();
  return (text, size) => {
    let units = 0;
    for (const ch of text) {
      let w = cache.get(ch);
      if (w === undefined) {
        w = advance(glyph(ch.codePointAt(0) ?? 0));
        cache.set(ch, w);
      }
      units += w;
    }
    return (units * size) / unitsPerEm;
  };
}

/** Greedy word wrap, the way a wrapping flex row of words (each followed by a space) breaks. */
export function lineCount(measure: Measure, words: readonly string[], size: number, width: number): number {
  const space = measure(" ", size);
  let lines = 1;
  let used = 0;
  for (const word of words) {
    const w = measure(word, size) + space;
    if (used > 0 && used + w > width) {
      lines += 1;
      used = 0;
    }
    used += w;
  }
  return lines;
}

/** The largest size from `sizes` (descending) whose wrapped lines fit the box; the smallest otherwise. */
export function fitSize(
  measure: Measure,
  words: readonly string[],
  box: { width: number; height: number; lineHeight: number; maxLines: number },
  sizes: readonly number[],
): number {
  for (const size of sizes) {
    const lines = lineCount(measure, words, size, box.width);
    const longest = Math.max(...words.map((w) => measure(w, size)));
    if (lines <= box.maxLines && lines * size * box.lineHeight <= box.height && longest <= box.width) return size;
  }
  return sizes[sizes.length - 1] ?? 64;
}
