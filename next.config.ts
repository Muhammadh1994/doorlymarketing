import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages, which only serves plain files — no
  // Next.js server, so no image-optimization endpoint or API routes.
  output: "export",
  images: { unoptimized: true },
  // Project pages serve at https://<user>.github.io/doorlymarketing/, not
  // the domain root, so every internal asset/link needs this subpath baked
  // in. Drop these two lines if this ever moves to a custom domain or a
  // <user>.github.io root repo.
  basePath: "/doorlymarketing",
  assetPrefix: "/doorlymarketing/",
};

export default nextConfig;
