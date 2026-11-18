import type { Metadata } from "next";
import { NichePageView } from "@/components/en/NichePage";
import { enPageMetadata } from "@/lib/en/metadata";
import { requireEnSection } from "@/lib/en/section";

export const metadata: Metadata = enPageMetadata("youtube");

/** /en/youtube-editing: the youtube niche (strategy §3), its packages from the shared pricing data. */
export default function Page() {
  requireEnSection();
  return <NichePageView niche="youtube" />;
}
