import type { MetadataRoute } from "next";
import { brandName } from "@/lib/site/brand";

export default function manifest(): MetadataRoute.Manifest {
  const name = brandName();
  return {
    name,
    short_name: name,
    lang: "bg",
    start_url: "/",
    display: "browser",
    background_color: "#0C0E10",
    theme_color: "#0C0E10",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/brand/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
