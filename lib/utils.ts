export { cn } from "cn";

/**
 * Mirrors next.config.ts's conditional basePath exactly. Next.js only
 * auto-prefixes basePath onto assets that go through its own components
 * (next/image, next/link, next/script) — a raw <img src="/foo.jpg"> is
 * left untouched, so anything using a hardcoded root-relative path outside
 * those components needs this prepended by hand or it 404s once deployed
 * under the /doorlymarketing subpath (works fine in dev, where basePath is
 * empty, which is exactly why this class of bug doesn't show up locally).
 */
export const BASE_PATH = process.env.NODE_ENV === "production" ? "/doorlymarketing" : "";
