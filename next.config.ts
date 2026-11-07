import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typedRoutes: true,
  // Separate build folders let the end-to-end suite run two differently
  // configured production builds side by side.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
