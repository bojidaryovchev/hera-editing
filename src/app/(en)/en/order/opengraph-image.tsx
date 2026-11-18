import { EN_SHARE, EN_TIMELINE, enShareAlt } from "@/lib/en/metadata";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/site/og";

export const alt = enShareAlt("order");
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage(EN_SHARE.order, EN_TIMELINE);
}
