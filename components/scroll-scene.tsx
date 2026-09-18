"use client";

// Reinstated (round 4): the round-3 illustrated replacement,
// components/journey-scene.tsx, was itself rejected by the client ("this
// is just moving the background, I don't like it at all") and reverted
// back to this photographic scene per client direction. See this file's
// own doc comment below for how the scene works.

import * as React from "react";
import Image from "next/image";
import { BASE_PATH } from "@/lib/utils";

// next/image's automatic basePath prefixing turned out to be
// inconsistent under `images.unoptimized: true` — it worked for these
// `fill`-mode layers but silently failed for a plain width/height <Image>
// elsewhere (why-direct-mail.tsx). Rather than trust it case by case,
// BASE_PATH is now applied explicitly everywhere, here included.
const SCENE_LAYERS = [
  {
    key: "van",
    src: `${BASE_PATH}/images/stock/mail-truck-driving.jpg`,
    alt: "",
    priority: true,
  },
  {
    key: "mailboxes",
    src: `${BASE_PATH}/images/stock/mailboxes-row.jpg`,
    alt: "",
  },
  {
    key: "street",
    src: `${BASE_PATH}/images/stock/suburban-street.jpg`,
    alt: "",
  },
  {
    key: "door",
    src: `${BASE_PATH}/images/stock/house-front-door.jpg`,
    alt: "",
  },
] as const;

// Matches the `sm:` breakpoint this scene is scoped to (see the doc
// comment below): below it, the four photos aren't just hidden with CSS,
// they're never requested at all.
const ENABLE_QUERY = "(min-width: 640px)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(ENABLE_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(ENABLE_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Fixed, full-viewport photographic backdrop that carries the visitor
 * through the mail's journey — van, mailboxes, street, front door — as one
 * continuous forward camera move driven by total document scroll, not four
 * independent clips (client correction, round 2: "I want it to be
 * connected"). Every layer's motion lives in `.scroll-scene-layer`'s
 * `@keyframes` in globals.css: scale/pan are the same shared linear
 * function of absolute scroll evaluated at each layer's own keyframe
 * stops (so it never zooms out or reverses pan between layers), and each
 * hand-off is a brief, heavily-blurred directional whip-pan rather than a
 * soft dissolve. `.scroll-scene-grade` / `-tint` add one uniform vignette
 * + warm cast across all four photos so their lighting differences don't
 * themselves read as "a different photo." All of it is scroll-linked via a
 * native `scroll(root)` timeline, so it's off the main thread and needs no
 * scroll listener.
 *
 * Every section on the page now renders directly on top of this layer —
 * no card behind them (client correction: "the content should be on the
 * background") — so legibility comes from `.scroll-scene-scrim` (the
 * paper-toned wash below) plus `.scene-copy` (a text-shadow halo on body
 * copy) rather than an opaque panel per section.
 *
 * `position:fixed` + scroll-driven transforms on full-size photos is a
 * real jank risk on mobile Safari, and a plain CSS `hidden` still lets the
 * browser fetch every image regardless of display, so this gates on a
 * `matchMedia` subscription (via `useSyncExternalStore`, not an effect
 * that calls `setState`) instead: below `sm:` the four photos are never
 * mounted, not just hidden — sections simply render on the page's normal
 * background, an intentional, sensible fallback, not a broken one.
 * `prefers-reduced-motion` freezes on the mailboxes frame (a
 * representative "on the route" beat) instead of animating or
 * disappearing — no pan, zoom, or whip-blur survives that freeze.
 */
export function ScrollScene() {
  const enabled = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {SCENE_LAYERS.map((layer) => (
        <div
          key={layer.key}
          data-scene={layer.key}
          className="scroll-scene-layer absolute inset-0"
        >
          <Image
            src={layer.src}
            alt={layer.alt}
            fill
            sizes="100vw"
            priority={"priority" in layer && layer.priority}
            className="object-cover"
          />
        </div>
      ))}
      {/* Shared, static (non-scroll-linked) color grade: a warm vignette
          plus a low-opacity warm cast applied once across all four photos,
          so their individual lighting/white-balance differences don't
          telegraph "different photo" at each whip-cut (see
          .scroll-scene-grade / -tint in globals.css). */}
      <div className="scroll-scene-grade absolute inset-0" />
      <div className="scroll-scene-grade-tint absolute inset-0" />
      {/* Paper-toned wash: ties the four photos into one consistent
          palette and is the primary legibility mechanism now that page
          content sits directly on this scene instead of behind opaque
          cards (see .scroll-scene-scrim in globals.css). */}
      <div className="scroll-scene-scrim absolute inset-0" />
    </div>
  );
}

export default ScrollScene;
