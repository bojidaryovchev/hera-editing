"use client";

import { useRef, useState } from "react";
import type { MediaPoster, MediaVideo } from "@/content/projects/types";
import { VIDEO_PLAYER } from "@/content/work";
import { track } from "@/lib/analytics";

/**
 * A portfolio video (IA:59): the browser's own player, so the controls are keyboard and screen-reader accessible;
 * the poster first and nothing downloaded or played until the visitor asks (no autoplay, never sound by surprise);
 * Bulgarian captions when supplied. The poster's size reserves the space, so nothing shifts. The first play is
 * counted (portfolio_video_play, the project's slug only) when the visitor allowed analytics.
 */
export function ProjectVideo({
  video,
  poster,
  project,
}: {
  video: MediaVideo;
  poster: MediaPoster | null;
  project: string;
}) {
  const counted = useRef(false);
  const [failed, setFailed] = useState(false);
  const onPlay = () => {
    if (counted.current) return;
    counted.current = true;
    track({ name: "portfolio_video_play", params: { project } });
  };
  return (
    <figure className="pvid">
      <video
        className="pvid__v"
        controls
        playsInline
        preload="none"
        poster={poster?.src}
        width={poster?.width ?? 1080}
        height={poster?.height ?? 1920}
        aria-label={video.title}
        onPlay={onPlay}
      >
        {video.webm && <source src={video.webm} type="video/webm" />}
        {/* The last source reports the failure when no source could be played. */}
        <source src={video.mp4} type="video/mp4" onError={() => setFailed(true)} />
        {video.captions && (
          <track kind="captions" src={video.captions} srcLang="bg" label={VIDEO_PLAYER.captions} default />
        )}
      </video>
      <figcaption className="pvid__cap">{video.title}</figcaption>
      {failed && (
        <p className="pvid__err" role="status">
          {VIDEO_PLAYER.loadError}
        </p>
      )}
    </figure>
  );
}
