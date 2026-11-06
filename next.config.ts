import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Hosted as static files on GitHub Pages, so there is no image server.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
