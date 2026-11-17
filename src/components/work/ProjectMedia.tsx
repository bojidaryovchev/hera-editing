import Image from "next/image";
import { Scene, type SceneTone } from "@/components/site/Scene";
import { ProjectVideo } from "@/components/work/ProjectVideo";
import type { MediaPoster, MediaVideo } from "@/content/projects/types";

/**
 * A project's video (with its poster) or still. Real projects always have a still (IA:59); without one (only the
 * fictional test fixtures) the designed frame stands in, never stock.
 */
export function ProjectMedia({
  video,
  poster,
  project,
  sizes,
  tone,
}: {
  video: MediaVideo | null;
  poster: MediaPoster | null;
  project: string;
  sizes: string;
  tone?: SceneTone;
}) {
  if (video) return <ProjectVideo video={video} poster={poster} project={project} />;
  if (poster) return <Image className="pmedia" src={poster.src} alt={poster.alt} width={poster.width} height={poster.height} sizes={sizes} />;
  return (
    <div className="pmedia pmedia--empty">
      <Scene tone={tone} focus={false} />
    </div>
  );
}
