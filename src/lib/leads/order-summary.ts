import { AI_LABELS_BG, MUSIC_LABELS_BG, ORDER_LABELS, VERSION_LABELS_BG } from "@/content/admin-orders";
import { priceText } from "@/content/en/packages";
import type { OrderDetails } from "@/lib/en/order-fields";

/**
 * An English order's brief as labelled rows, for the owner (Bulgarian labels, the client's answers as typed): the
 * alert email and the admin panel show the same rows. `link` marks a value that is a web address.
 */
export type OrderRow = { label: string; value: string; link?: boolean; wide?: boolean };

const COUNTRY_BG = new Intl.DisplayNames(["bg"], { type: "region" });

/** "Съединени щати (US)"; an unknown code stays as it is. */
export function countryName(code: string): string {
  try {
    const name = COUNTRY_BG.of(code);
    return name && name !== code ? `${name} (${code})` : code;
  } catch {
    return code;
  }
}

/** "Highlight from selects · $380", or "Индивидуална оферта". */
export function packageLine(d: Pick<OrderDetails, "package" | "packageName" | "priceUsd">): string {
  if (d.priceUsd === null) return ORDER_LABELS.custom;
  return `${d.packageName} · ${priceText({ price: d.priceUsd })}`;
}

const dash = (v: string | null | undefined) => (v && v.trim() ? v : "—");

export function orderRows(d: OrderDetails): OrderRow[] {
  const L = ORDER_LABELS;
  const rows: OrderRow[] = [
    { label: L.package, value: packageLine(d) },
    { label: L.country, value: countryName(d.country) },
    { label: L.vatNumber, value: dash(d.vatNumber) },
    { label: L.businessConfirmed, value: L.yes },
    { label: L.footageUrl, value: dash(d.footageUrl), link: Boolean(d.footageUrl), wide: true },
    { label: L.deadline, value: dash(d.deadline) },
    { label: L.music, value: MUSIC_LABELS_BG[d.music] ?? d.music },
    { label: L.aiVisuals, value: AI_LABELS_BG[d.aiVisuals] ?? d.aiVisuals },
    { label: L.references, value: dash(d.references), wide: true },
    { label: L.mustInclude, value: dash(d.mustInclude), wide: true },
  ];
  if (d.scope) rows.push({ label: L.scope, value: d.scope, wide: true });
  if (d.wedding) {
    const w = d.wedding;
    rows.push(
      { label: L.wedding.couple, value: dash(w.couple) },
      { label: L.wedding.grade, value: dash(w.grade) },
      { label: L.wedding.vowsAudio, value: dash(w.vowsAudio), link: Boolean(w.vowsAudio), wide: true },
      { label: L.wedding.styleFilm, value: dash(w.styleFilm), link: Boolean(w.styleFilm), wide: true },
      { label: L.wedding.keyMoments, value: dash(w.keyMoments), wide: true },
    );
  }
  if (d.youtube) {
    const y = d.youtube;
    rows.push(
      { label: L.youtube.script, value: dash(y.script), link: Boolean(y.script), wide: true },
      { label: L.youtube.voiceover, value: dash(y.voiceover), link: Boolean(y.voiceover), wide: true },
      { label: L.youtube.channel, value: dash(y.channel), link: Boolean(y.channel), wide: true },
      { label: L.youtube.stockLibrary, value: dash(y.stockLibrary) },
    );
  }
  if (d.realEstate) {
    const r = d.realEstate;
    rows.push(
      { label: L.realEstate.listing, value: dash(r.listing) },
      { label: L.realEstate.versions, value: r.versions ? VERSION_LABELS_BG[r.versions] : "—" },
      { label: L.realEstate.branding, value: dash(r.branding), link: Boolean(r.branding), wide: true },
      { label: L.realEstate.roomOrder, value: dash(r.roomOrder), wide: true },
    );
  }
  return rows;
}

/** A link field as a safe href: http(s) only, with https:// added when the client left it out. */
export function linkHref(value: string): string | null {
  const url = /^[a-z][a-z0-9+.-]*:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : null;
  } catch {
    return null;
  }
}
