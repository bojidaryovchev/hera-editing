import { publishedProject } from "@/content/projects";
import { OG_CONTENT_TYPE, OG_SIZE, ogAlt, renderOgImage } from "@/lib/site/og";

type Params = { slug: string } | Promise<{ slug: string }>;

/** A case study's share card: its category and the client's name (alt text per project). */
const cardFor = async (params: Params) => {
  const p = publishedProject((await params).slug);
  return { label: p?.category, title: p?.businessName ?? "" };
};

export async function generateImageMetadata({ params }: { params: Params }) {
  return [{ id: "card", alt: ogAlt(await cardFor(params)), size: OG_SIZE, contentType: OG_CONTENT_TYPE }];
}

export default async function Image({ params }: { params: Params }) {
  return renderOgImage(await cardFor(params));
}
