import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { HomeMotion } from "@/components/home/HomeMotion";
import { FinalCta, Formats, HomeFaq, Packages, Problem, Process } from "@/components/home/Sections";
import { JsonLd } from "@/components/site/JsonLd";
import { footage } from "@/content/media";
import { resolveAppEnv } from "@/lib/config/env";
import { pageMetadata } from "@/lib/site/metadata";
import { homeGraph } from "@/lib/site/structured-data";

export const metadata: Metadata = pageMetadata("home");

/** Homepage, direction A "Таймлайн" (decision 1, composition L23). */
export default function HomePage() {
  // Stock placeholder footage never reaches production (L22): there the pages draw designed frames instead.
  const media = footage(resolveAppEnv(process.env));
  return (
    <main id="main" data-page="home">
      <JsonLd data={homeGraph()} />
      <Hero media={media} />
      <Problem />
      <Process />
      <Formats media={media} />
      <Packages />
      <HomeFaq />
      <FinalCta media={media} />
      <HomeMotion />
    </main>
  );
}
