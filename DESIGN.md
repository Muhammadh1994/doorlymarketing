# Design

<!-- impeccable:design-schema 1 -->

## World

The landing page borrows its visual language from real bulk-mail ephemera
rather than a generic "SaaS trust page": USPS permit-imprint indicia boxes,
ink cancellation postmarks, and a postcard rendered as an actual tangible
object (rounded corners, drop shadow, tilt) rather than an icon or metaphor.
The postcard-diagram component is the recurring motif — it appears flat
and fully interactive in the "Ad space" section, and its mail-truck ->
mailboxes -> street -> front-door journey is echoed by the fixed
photographic backdrop's own sequence (see `scroll-scene.tsx` below), so the
visitor recognizes the same "route to the mailbox" idea across both.

**One continuous camera, not a moving illustration** (client correction,
fourth round): the third round replaced the real-photo backdrop with a
single hand-illustrated SVG world (`journey-scene.tsx`) panned by one
continuous camera move, on the theory that four real photos could never
fully hide their own seams. The client rejected that outright — "this is
just moving the background, I don't like it at all" — and asked to revert
specifically to the round before it: the photographic backdrop
(`scroll-scene.tsx`), four real photos (mail-truck-driving.jpg,
mailboxes-row.jpg, suburban-street.jpg, house-front-door.jpg) sharing one
linear scale/pan camera function so they never zoom out or reverse
direction, with whip-pan motion-blur handoffs (a lockstep blur ramp +
opacity swap + anisotropic directional stretch, all completing together at
each overlap's midpoint) standing in for a hard cut or a soft crossfade.
`journey-scene.tsx` is retired again (left on disk, unimported) in favor of
`scroll-scene.tsx`, used everywhere motion-and-background is needed on the
page, including the hero. See Components below.

Color strategy: **Full palette** (five named roles), graded warmer and
more saturated than the original red+blue+kraft set to match a reference
mood board (honey-toned wood desk, worn USPS map, saturated hot-pink,
teal, mustard/gold, deep-navy, and coral postcards) — postal red still
carries the primary action and the premium "Featured" tier; postal blue
deepened into a true navy and carries the reach/stats headline figure;
postal teal carries the "Standard" tier; postal gold carries one of the
two "Starter" tiers; warm kraft/paper neutral carries the other Starter
tier plus the page's own background. This keeps a real value gradient
across the postcard-diagram (red → teal → gold → neutral kraft) while
giving the rest of the page a five-color system to draw from instead of
just two accents. The fixed backdrop itself is real daylight photography
(see `scroll-scene.tsx`), tied into this palette by one shared warm color
grade rather than by redrawing the scene in brand colors.

Light-only: the use scene is a homeowner or local business owner reading
mail at a counter or desk in ordinary daylight, not a nocturnal app — the
four backdrop photos are all shot in ordinary daylight for the same
reason, and the shared grade (see `scroll-scene.tsx`'s color-grade note)
warms them toward one consistent daytime mood rather than a moody
cinematic teal-orange treatment.

**No section cards** (client correction, second round, extended in the
third): every section used to render as its own opaque "paper panel"
(rounded corners, border, drop shadow) floating above the fixed
background, with visible gutters between panels. The client rejected
this outright — "the content should be on the background" — so page copy
sits directly on the scene with no card behind it. The reach/stats band,
which originally kept a filled navy panel as a deliberate exception, lost
that treatment too in the third round ("no more container anywhere") and
now uses the same `.scene-copy` halo as every other de-carded section,
picking `--postal-blue` for its headline figure instead of relying on a
filled background for contrast. The postcard mockup (`postcard-diagram`)
and the embedded JotForm's own white surface remain deliberate objects (a
real postcard, a paper form), not instances of the removed container
pattern. See `.scroll-scene-scrim` and `.scene-copy` under
Tokens/Components for how legibility is solved instead.

## Tokens (app/globals.css)

- `--postal-red` / `--postal-red-foreground` — primary brand accent; also
  drives `--primary` so `Button`'s default variant is on-brand everywhere.
- `--postal-blue` / `--postal-blue-foreground` — deep-navy accent; carries
  the reach/stats headline figure (as plain foreground text, no fill
  behind it).
- `--postal-teal` / `--postal-teal-foreground` — accent added in the
  palette re-grade; carries the postcard-diagram's Standard tier.
- `--postal-gold` / `--postal-gold-foreground` — mustard/gold accent added
  in the same pass; carries one of the postcard-diagram's two Starter
  tiers (the other stays kraft, preserving a neutral "budget" cue).
- `--kraft` / `--kraft-foreground` — warm neutral (base/background family,
  and the other Starter tier).
- `--paper` — the page's own warm-white background tone (subtle, not a
  cream/parchment "AI landing page" default — deliberately closer to card
  stock white than to cream). Also the source color (via CSS relative-color
  syntax, `oklch(from var(--paper) l c h / <alpha>)`) for `.scroll-scene-scrim`
  and `.scene-copy` below, so the wash/halo and the page's own background
  stay one tone, not two coincidentally-similar ones.
- `--kraft` — also the source color for `.scroll-scene-grade-tint`'s
  soft-light wash that unifies the four backdrop photos' individual white
  balances toward one shared warm cast.
- `--muted-foreground` — darkened from a neutral 0.48 to 0.4 L so body copy
  clears WCAG AA (verified ≥4.9:1) sitting directly over the fixed
  photographic backdrop instead of always on a paper card.
- `--ease-out` (`cubic-bezier(0.23, 1, 0.32, 1)`) / `--ease-in-out`
  (`cubic-bezier(0.77, 0, 0.175, 1)`) registered under Tailwind's `@theme`,
  so the built-in `ease-out` / `ease-in-out` utilities resolve to the strong
  curves everywhere instead of the (weak) browser defaults. Extend these,
  don't add a parallel set.
- `--font-sans` (Inter, existing) — body copy.
- `--font-display` (Space Grotesk) — headings, tier names, the big stat.
  Confident geometric sans, deliberately not a training-data-default serif
  for a "print" subject.
- `--font-mono` (Space Mono) — used only where the comp world would
  actually use monospace: the permit-imprint box, ZIP/tracking-style
  labels, and the small stat captions in the reach band. Never used as a
  generic "technical" costume.

## Components (components/)

- `scroll-scene.tsx` / `.scroll-scene-layer` (globals.css) — the fixed
  full-page backdrop for the whole site: FOUR real photos (mail truck,
  mailboxes, suburban street, front door) treated as one continuous camera
  move rather than four independent clips. All four layers share one
  linear `scale(t)` / `pan(t)` function of *global* document scroll percent
  so scale/zoom never resets or reverses between layers; each layer is
  active across its own `animation-range` (32-point windows, 8-point
  overlaps) and hands off to the next inside that overlap via a whip-pan:
  `filter: blur()` ramps 0 → 28px → 0 in lockstep on both layers, opacity
  swaps completing exactly as blur peaks, plus a `scale(1.16, 0.95)`
  anisotropic stretch along the pan's own axis at the peak keyframe (real
  motion blur is directional; a plain isotropic CSS blur alone doesn't read
  as camera motion). Two photos are only ever visible together while both
  are already heavily blurred, which is what actually hides the seam — a
  clean cut or a soft crossfade both let two *different* photographs sit
  side by side sharply, which is what reads as "swapped," not "moved."
  `.scroll-scene-grade` (a static vignette) and `.scroll-scene-grade-tint`
  (a low-opacity `--kraft` soft-light wash) pull the four photos' individual
  lighting/white-balance differences toward one shared warm cast;
  `.scroll-scene-scrim` (a `--paper` wash, see Tokens) plus `.scene-copy`
  (a `--paper`-toned text-shadow halo, applied to headings/paragraphs) are
  what make body copy legible sitting directly on the scene — not a card.
  All motion runs off a native `scroll(root)` timeline (no scroll
  listener). Gated behind a `matchMedia('(min-width: 640px)')` subscription
  via `useSyncExternalStore` (not an effect) — below `sm:` the four photos
  are never mounted, not just hidden, since `position:fixed` plus
  scroll-driven transforms on full-size photos is a real jank risk on
  mobile Safari and a plain CSS `hidden` still lets the browser fetch every
  image regardless of display. Freezes on the mailboxes frame specifically
  (no pan, zoom, or blur; every other layer hidden) under
  `prefers-reduced-motion`. Was retired in favor of a hand-illustrated
  alternative (`journey-scene.tsx`, third round) and reinstated after the
  client rejected that alternative (fourth round: "this is just moving the
  background, I don't like it at all") — see World above.
- `hero.tsx` — no card (client correction, third round, unaffected by the
  fourth-round backdrop revert): the wordmark + one caption line sit above
  the scene, the slogan + CTA sit below it, and a `flex-1` spacer in
  between reserves "the rest of the screen" for the scene itself,
  uninterrupted by copy. The section is `min-h-dvh` (a real flex column:
  auto / flex-1 / auto), so the slogan lands at the bottom edge of the
  first screen rather than being pushed further down the page. Retired:
  `ui/image-stream-hero.tsx` and its `public/postcards/postcard-*.svg` card
  faces — the hero no longer runs its own separate animated corridor
  layered over the page's scene; left on disk, unimported, same treatment
  as any other retired asset.
- `reveal.tsx` — scroll-triggered fade/slide-up (`IntersectionObserver`,
  fires once), `motion-reduce:` variant collapses to an instant
  appearance. Supports `as="li"` for use inside lists.
- `postcard-diagram.tsx` — the four-tier postcard: CSS Grid
  (`grid-cols-4 grid-rows-2` at `md:`, auto-placement gives the 1
  large + 1 medium + 2 small layout with no manual `grid-area`s) that
  collapses to a 2-column stack below `md:`. Each tile rounds only its own
  outer corners (a `corners` field per tile) rather than clipping the
  group with `overflow-hidden`, so hover/focus effects are never cut off
  at the frame edge.
- `postmark-icon.tsx` / `postal-indicia.tsx` — the two authentic postal
  details (ink cancellation mark, bulk-mail permit box).
- `reach-stats.tsx` — lost its filled navy band in the third round (client
  correction: "no more container anywhere"); the ~10,000-households figure
  and supporting stats now sit directly on the fixed backdrop like every
  other section, using `.scene-copy` for the same text-shadow-halo
  legibility and `--postal-blue` (plain foreground text, no fill behind
  it) to keep the headline figure's brand-accent weight without a panel.
- `.ad-tile` / `.ad-tile-postmark` / `.ad-tile-cta` (globals.css) — hover
  (mouse-only, `@media (hover: hover) and (pointer: fine)`) lifts the tile
  and reveals the postmark + "Select this space" affordance; the same
  reveal fires on `:focus-visible` unconditionally (keyboard access must
  not depend on hover capability). Focus uses its own two-tone halo
  (`box-shadow`, paper then postal-red) rather than reusing the hover
  drop-shadow, so the indicator stays visible against all three tile
  colors and is never starved by the hover rule overriding it.

## Known deviations from the full Impeccable new-work process

Built end-to-end in a single subagent turn with no `AskUserQuestion`-style
tool, no image-generation tool, and no subagent-spawning tool available in
this environment. That ruled out the interactive decision-page/concept-seed
ceremony (multi-candidate roll, comp generation, dedicated finish-reviewer
and documenter subagents). Product truth for `PRODUCT.md` and the visual
direction here were inferred directly from the very detailed brief already
provided, disclosed at the time, and this file was written in-thread as a
substitute for the shipped documenter. Reviewed instead via: `tsc`,
`eslint`, `next build`, the mechanical `impeccable detect` scan (0
findings), and manual Playwright screenshots at desktop/mobile plus
keyboard-focus and hover states.

Third round (photo → illustrated journey scene, hero restructure,
reach-stats de-containering) used the same substitute process for the
same reasons: no `AskUserQuestion`-equivalent or subagent-spawning tool
available in this environment. Reviewed via `tsc`, `eslint`, `next
build`, the mechanical `impeccable detect` scan (0 findings), and Playwright
screenshots across the full scroll range at 1440px and 390px, plus a
`prefers-reduced-motion` pass, checking the illustrated scene reads as
one continuous, unbroken camera move rather than a redesigned version of
the earlier crossfade approach.

Fourth round (illustrated journey scene → reverted to the photographic
scroll scene) was a precise revert to the round-2 implementation, not new
creative work: the client rejected round three's illustrated scene outright
and asked specifically to go back one round further. `hero.tsx` and
`reach-stats.tsx` were left as-is (their own client-approved changes came
from round three and are independent of which fixed backdrop is mounted
beneath them). Reviewed via `tsc`, `eslint`, `next build`, the mechanical
`impeccable detect` scan, and Playwright screenshots across the full scroll
range at 1440px (including mid-whip-pan frames) and 390px, plus a
`prefers-reduced-motion` pass confirming a clean freeze on the mailboxes
frame.
