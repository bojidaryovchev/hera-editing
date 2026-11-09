import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { HomeMotion } from "@/components/home/HomeMotion";
import { FinalCta, Formats, HomeFaq, Packages, Problem, Process } from "@/components/home/Sections";
import { assertMediaAllowed } from "@/content/media";
import { SEO } from "@/content/seo";
import { resolveAppEnv } from "@/lib/config/env";
import { brandName } from "@/lib/site/brand";

export const metadata: Metadata = {
  title: { absolute: `${SEO.home.title} | ${brandName()}` },
  description: SEO.home.description,
};

/** Homepage, direction A "Таймлайн" (decision 1, composition L23). */
export default function HomePage() {
  // Stock placeholder footage never reaches production (L22).
  assertMediaAllowed(resolveAppEnv(process.env));
  return (
    <main id="main" data-page="home">
      <Hero />
      <Problem />
      <Process />
      <Formats />
      <Packages />
      <HomeFaq />
      <FinalCta />
      <HomeMotion />
    </main>
  );
}
