# Design

<!-- impeccable:design-schema 1 -->

## World

The landing page borrows its visual language from real bulk-mail ephemera
rather than a generic "SaaS trust page": USPS permit-imprint indicia boxes,
ink cancellation postmarks, and a postcard rendered as an actual tangible
object (rounded corners, drop shadow, tilt) rather than an icon or metaphor.
The postcard-diagram component is the recurring motif — it now appears
flat and fully interactive in the "Ad space" section, plus as the literal
subject of the hero's corridor of postcard faces flying past in 3D
(`image-stream-hero.tsx`), so the visitor recognizes the object across
both moments even though the hero treatment is decorative/ambient rather
than the tilted static diagram used previously.

Color strategy: **Full palette** (five named roles), graded warmer and
more saturated than the original red+blue+kraft set to match a reference
mood board (honey-toned wood desk, worn USPS map, saturated hot-pink,
teal, mustard/gold, deep-navy, and coral postcards) — postal red still
carries the primary action and the premium "Featured" tier, postal blue
deepened into a true navy and now carries only the full-bleed reach/stats
band, postal teal carries the "Standard" tier, postal gold carries one of
the two "Starter" tiers, and warm kraft/paper neutral carries the other
Starter tier and the page's own background. This keeps a real value
gradient across the postcard-diagram (red → teal → gold → neutral kraft)
while giving the rest of the page (hero corridor cards, this diagram) a
five-color system to draw from instead of just two accents.

Light-only: the use scene is a homeowner or local business owner reading
mail at a counter or desk in ordinary daylight, not a nocturnal app.

**No section cards** (client correction, second round): every section
used to render as its own opaque "paper panel" (rounded corners, border,
drop shadow) floating above the fixed scroll-scene background, with
visible gutters between panels. The client rejected this outright — "the
content should be on the background" — so page copy now sits directly on
the scene with no card behind it. The postcard mockup (`postcard-diagram`),
the reach/stats navy band, and the embedded JotForm's own white surface
are kept as deliberate objects (a real postcard, a stat callout, a paper
form), not as the removed container pattern. See `.scroll-scene-scrim` and
`.scene-copy` under Tokens/Components for how legibility is solved instead.

## Tokens (app/globals.css)

- `--postal-red` / `--postal-red-foreground` — primary brand accent; also
  drives `--primary` so `Button`'s default variant is on-brand everywhere.
- `--postal-blue` / `--postal-blue-foreground` — deep-navy accent, now
  carried solely by the full-bleed reach/stats band.
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
- `--muted-foreground` — darkened from a neutral 0.48 to 0.4 L so body copy
  clears WCAG AA (verified ≥4.9:1) at the darkest, busiest point across all
  four scroll-scene photos now that it sits directly over them instead of
  always on a paper card.
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

- `ui/image-stream-hero.tsx` — the hero's decorative backdrop: two mirrored
  streams of postcard-face images flying past in a CSS-only 3D corridor
  (per-stop `@keyframes` computed from a perspective/rail/fan model, no JS
  animation loop). Purely `aria-hidden`; the hero's actual copy/CTAs render
  as its `children`, layered above via a `background`→transparent→
  `background` scrim so text always sits on a near-opaque zone regardless
  of what's moving behind it. Pauses under `prefers-reduced-motion`.
- `public/postcards/postcard-01.svg` … `-12.svg` — the card faces fed into
  the corridor: hand-authored flat-color ad panel + duotone "photo"
  stand-in panel + greeked address strip with a small truck glyph, cycling
  through the five postal-* accent hues. Not photography — there was no
  way to extract real images from the client's reference photo, so this
  recreates its design system instead (see hero brief).
- `scroll-scene.tsx` / `.scroll-scene-layer` (globals.css) — the fixed
  full-page photo backdrop (van → mailboxes → street → door). Each layer
  runs a continuous Ken Burns scale/pan for its whole active window and
  hands off to the next as forward motion rather than a flat crossfade:
  the outgoing layer keeps scaling up and blurs out as it "passes the
  camera," the incoming layer starts scaled up and blurred and resolves to
  sharp/normal scale, both tied to the same overlapping `animation-range`
  so the two motions cross in lockstep. Driven by `animation-timeline:
  scroll(root)`, no scroll listener. `.scroll-scene-scrim` (a `--paper`
  wash, see Tokens) and `.scene-copy` (a `--paper`-toned text-shadow halo,
  applied to headings/paragraphs) are what make body copy legible sitting
  directly on these photos — not a card. Unmounted below `sm:` (matchMedia
  gate, not just `hidden`, so mobile never fetches the four photos);
  freezes on the mailboxes frame — no pan/zoom/blur — under
  `prefers-reduced-motion`.
- `mail-route-accent.tsx` — a single dashed line in the outer margin
  (`xl:` and up only) with a small card that rides it via a CSS
  `view-timeline` bound to the `.mail-route-span` wrapper in `app/page.tsx`
  (Hero → AdSpaceSection → HowItWorks, ending at reach-stats). Scroll
  position drives `offset-distance` directly — no scroll listener. Freezes
  at the midpoint under `prefers-reduced-motion`; browsers without
  scroll-driven-animation support just show the card parked at the start.
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
