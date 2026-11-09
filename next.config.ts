import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typedRoutes: true,
  // Separate build folders let the end-to-end suite run two differently
  // configured production builds side by side.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  experimental: {
    // The quote request is the only server action; like POST /api/leads it stays small (the longest valid one is ~6 KB).
    serverActions: { bodySizeLimit: "16kb" },
  },
};

export default nextConfig;
