import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages, which only serves plain files — no
  // Next.js server, so no image-optimization endpoint or API routes.
  output: "export",
  images: { unoptimized: true },
  // Project pages serve at https://<user>.github.io/doorlymarketing/, not
  // the domain root, so every internal asset/link needs this subpath baked
  // in. Scoped to production only — applying it in dev too makes
  // `npm run dev` 404 at localhost:PORT/ (it'd only respond under
  // /doorlymarketing). Drop both entirely if this ever moves to a custom
  // domain or a <user>.github.io root repo.
  ...(process.env.NODE_ENV === "production"
    ? { basePath: "/doorlymarketing", assetPrefix: "/doorlymarketing/" }
    : {}),
};

export default nextConfig;
