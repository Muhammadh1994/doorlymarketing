"use client";

import * as React from "react";
import Image from "next/image";

const SCENE_LAYERS = [
  {
    key: "van",
    src: "/images/stock/mail-truck-driving.jpg",
    alt: "",
    priority: true,
  },
  {
    key: "mailboxes",
    src: "/images/stock/mailboxes-row.jpg",
    alt: "",
  },
  {
    key: "street",
    src: "/images/stock/suburban-street.jpg",
    alt: "",
  },
  {
    key: "door",
    src: "/images/stock/house-front-door.jpg",
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
 * through the mail's journey — van, mailboxes, street, front door — as
 * continuous forward motion (Ken Burns scale/pan per layer, blurred
 * hand-offs between layers) driven by total document scroll. Every layer's
 * motion lives in `.scroll-scene-layer`'s `@keyframes` in globals.css,
 * scroll-linked via a native `scroll(root)` timeline, so it's off the main
 * thread and needs no scroll listener.
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
 * disappearing.
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
      {/* Paper-toned wash: ties the four photos into one consistent
          palette and is the primary legibility mechanism now that page
          content sits directly on this scene instead of behind opaque
          cards (see .scroll-scene-scrim in globals.css). */}
      <div className="scroll-scene-scrim absolute inset-0" />
    </div>
  );
}

export default ScrollScene;
