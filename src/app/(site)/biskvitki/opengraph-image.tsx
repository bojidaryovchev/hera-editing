import { OG_CONTENT_TYPE, OG_SIZE, ogAlt, renderOgImage } from "@/lib/site/og";

export const alt = ogAlt("cookies");
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage("cookies");
}
