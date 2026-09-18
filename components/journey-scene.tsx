// Retired (round 4): the client rejected this hand-illustrated scene —
// "this is just moving the background, I don't like it at all" — and asked
// to revert to the photographic `ScrollScene` (see scroll-scene.tsx, now
// reinstated and current again). No longer imported anywhere; left on disk
// rather than deleted, same treatment as the retired postcard SVGs (see
// DESIGN.md).
//
// Fixed, full-viewport hand-illustrated backdrop that replaces the old
// photographic `ScrollScene` (see scroll-scene.tsx, now retired) *and* the
// hero's separate `ImageStreamHero` corridor — there is only one animated
// visual system on the page now, not two layered on each other.
//
// Client direction (round 3): "I don't want multiple pictures, I want one
// whole motion." Four unrelated stock photos always showed a seam no matter
// how the handoff was disguised. The fix isn't a better transition, it's
// removing the seam entirely: this is ONE hand-drawn SVG "world" — a road
// running from a mail truck, past a row of mailboxes and houses, to a front
// porch — and the only motion is a single continuous camera pan across it,
// driven by total document scroll. There's nothing to crossfade because
// there's only one piece of artwork.
//
// No React state, no hooks, no client-only APIs — this is a plain server
// component. All motion is a single CSS `animation-timeline: scroll(root)`
// on one element (`.journey-scene-art`, see globals.css), so it's off the
// main thread and needs no scroll listener, `useSyncExternalStore`, or
// matchMedia gate the way the old photo version needed one to avoid
// fetching four full JPEGs on mobile. An inline SVG has no network cost at
// any viewport, so — unlike the old scene — this stays mounted everywhere,
// including small screens; a few of the more decorative elements (extra
// clouds/trees) are simply hidden below `sm:` to keep the frame calm on a
// narrow screen, not to save bytes.
//
// Legibility for page copy sitting directly on top of this (every section,
// per the site's "no container" direction) still comes from
// `.journey-scene-scrim` (a paper-toned wash) and `.scene-copy` (a
// text-shadow halo, unchanged, used across the rest of the page) — same
// mechanism the old scene used, just renamed off "scroll-scene" now that
// this component owns it.
const VIEW_W = 4200;
const VIEW_H = 1050;

const SKY_Y = 0;
const GROUND_TOP = 620;
const ROAD_TOP = 760;
const ROAD_BOTTOM = 940;
const ROAD_CENTER = (ROAD_TOP + ROAD_BOTTOM) / 2;

const INK = "var(--color-kraft-foreground)";
const PAPER = "var(--color-paper)";
const KRAFT = "var(--color-kraft)";
const RED = "var(--color-postal-red)";
const TEAL = "var(--color-postal-teal)";
const GOLD = "var(--color-postal-gold)";
const NAVY = "var(--color-postal-blue)";

function Cloud({
  cx,
  cy,
  scale = 1,
  hideOnMobile = false,
}: {
  cx: number;
  cy: number;
  scale?: number;
  hideOnMobile?: boolean;
}) {
  return (
    <g
      transform={`translate(${cx} ${cy}) scale(${scale})`}
      fill={PAPER}
      opacity={0.85}
      className={hideOnMobile ? "hidden sm:inline" : undefined}
    >
      <ellipse cx={-40} cy={4} rx={46} ry={26} />
      <ellipse cx={12} cy={-12} rx={58} ry={34} />
      <ellipse cx={72} cy={6} rx={40} ry={23} />
    </g>
  );
}

function Tree({
  x,
  baseline,
  scale = 1,
  hideOnMobile = false,
}: {
  x: number;
  baseline: number;
  scale?: number;
  hideOnMobile?: boolean;
}) {
  return (
    <g
      transform={`translate(${x} ${baseline}) scale(${scale})`}
      className={hideOnMobile ? "hidden sm:inline" : undefined}
    >
      <rect x={-7} y={-58} width={14} height={58} rx={3} fill={INK} />
      <circle cx={0} cy={-96} r={44} fill={TEAL} />
      <circle cx={-28} cy={-74} r={28} fill={TEAL} />
      <circle cx={28} cy={-74} r={28} fill={TEAL} />
    </g>
  );
}

function House({
  x,
  roof,
  wall,
  scale = 1,
}: {
  x: number;
  roof: string;
  wall: string;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${GROUND_TOP}) scale(${scale})`}>
      <rect x={-110} y={-150} width={220} height={150} fill={wall} />
      <polygon points="-132,-150 132,-150 0,-232" fill={roof} stroke={INK} strokeOpacity={0.25} strokeWidth={3} />
      <rect x={-26} y={-72} width={52} height={72} rx={4} fill={INK} />
      <circle cx={16} cy={-36} r={4} fill={GOLD} />
      <rect x={-86} y={-120} width={38} height={38} rx={4} fill={PAPER} stroke={INK} strokeOpacity={0.4} strokeWidth={4} />
      <rect x={48} y={-120} width={38} height={38} rx={4} fill={PAPER} stroke={INK} strokeOpacity={0.4} strokeWidth={4} />
    </g>
  );
}

function Mailbox({ x, flagUp = false }: { x: number; flagUp?: boolean }) {
  return (
    <g transform={`translate(${x} ${ROAD_TOP})`}>
      <rect x={-5} y={-70} width={10} height={70} fill={INK} />
      <rect x={-30} y={-118} width={60} height={54} rx={22} fill={NAVY} />
      <rect x={-2} y={-118} width={4} height={54} fill="oklch(0 0 0 / 0.14)" />
      {/* Static wrapper positions the flag's pivot; the animated inner <g>
          (when present) carries only `rotate()`, set purely via CSS custom
          property, never the `transform` attribute — a CSS animation's
          `transform` fully replaces the SVG presentation attribute rather
          than merging with it, so any positional translate has to live
          outside the animated element, not inside it. */}
      <g transform="translate(24 -108)">
        {flagUp ? (
          <g
            className="journey-flag-bob"
            style={{
              transformBox: "fill-box",
              transformOrigin: "0% 100%",
              ["--journey-flag-rest" as string]: "-55deg",
            }}
          >
            <polygon points="0,0 18,7 0,14" fill={RED} />
          </g>
        ) : (
          <g transform="rotate(60)">
            <polygon points="0,0 18,7 0,14" fill={RED} />
          </g>
        )}
      </g>
    </g>
  );
}

function Wheel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={34} fill={INK} />
      <circle cx={cx} cy={cy} r={13} fill={PAPER} />
      <line
        className="journey-wheel-spin"
        style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        x1={cx}
        y1={cy - 13}
        x2={cx}
        y2={cy + 13}
        stroke={INK}
        strokeWidth={4}
      />
    </g>
  );
}

function Truck({ x }: { x: number }) {
  // Body spans y -190..-40 (relative to the road baseline); wheels are
  // centered a little above that bottom edge so they visibly tuck under
  // the body instead of floating below it with a gap of bare road showing
  // through.
  return (
    <g transform={`translate(${x} ${ROAD_BOTTOM})`}>
      <g stroke={INK} strokeWidth={6} strokeLinecap="round" opacity={0.3}>
        <line x1={-206} y1={-152} x2={-156} y2={-152} />
        <line x1={-218} y1={-116} x2={-160} y2={-116} />
        <line x1={-206} y1={-80} x2={-160} y2={-80} />
      </g>
      <rect x={-140} y={-190} width={200} height={150} rx={14} fill={RED} />
      <path d="M60,-190 h48 a16 16 0 0 1 16 16 v118 a16 16 0 0 1 -16 16 h-48 z" fill={RED} />
      <rect x={70} y={-178} width={36} height={44} rx={6} fill={PAPER} />
      <rect x={-140} y={-124} width={200} height={18} fill={GOLD} />
      <line x1={-40} y1={-190} x2={-40} y2={-216} stroke={INK} strokeWidth={4} />
      <polygon points="-40,-216 -20,-209 -40,-202" fill={GOLD} />
      <circle cx={122} cy={-58} r={8} fill={GOLD} />
      <Wheel cx={-90} cy={-10} />
      <Wheel cx={38} cy={-10} />
    </g>
  );
}

/** The arrival: a larger, closer porch/door group at the far end of the
 * canvas — the same road simply keeps receding until the last house is
 * near enough to fill the frame, rather than cutting to a different image.
 * The postcard visibly arriving in this mailbox is the payoff beat. */
function FinalePorch() {
  const s = 1.6;
  return (
    <g transform={`translate(3780 900) scale(${s})`}>
      <rect x={-70} y={0} width={140} height={16} fill={INK} opacity={0.85} />
      <rect x={-58} y={-14} width={116} height={16} fill={INK} opacity={0.65} />
      <rect x={-140} y={-210} width={280} height={196} fill={KRAFT} />
      <polygon points="-165,-210 165,-210 0,-300" fill={TEAL} stroke={INK} strokeOpacity={0.25} strokeWidth={3} />
      <rect x={-34} y={-100} width={68} height={100} rx={6} fill={NAVY} />
      <circle cx={22} cy={-50} r={5} fill={GOLD} />
      <rect x={-110} y={-172} width={46} height={46} rx={5} fill={PAPER} stroke={INK} strokeOpacity={0.4} strokeWidth={5} />
      <rect x={64} y={-172} width={46} height={46} rx={5} fill={PAPER} stroke={INK} strokeOpacity={0.4} strokeWidth={5} />
      <rect x={-30} y={-4} width={60} height={14} rx={4} fill={RED} opacity={0.85} />

      <g transform="translate(122 -60)">
        <rect x={-5} y={-60} width={10} height={60} fill={INK} />
        <rect x={-28} y={-104} width={56} height={48} rx={20} fill={RED} />
        <g transform="translate(24 -98)">
        <g
          className="journey-flag-bob"
          style={{
            transformBox: "fill-box",
            transformOrigin: "0% 100%",
            ["--journey-flag-rest" as string]: "-50deg",
          }}
        >
          <polygon points="0,0 18,7 0,14" fill={GOLD} />
        </g>
        </g>
        <g transform="translate(-8 -92) rotate(-9)">
          <rect x={0} y={0} width={42} height={27} rx={3} fill={PAPER} stroke={NAVY} strokeWidth={2.5} />
          <rect x={5} y={5} width={13} height={9} fill={GOLD} />
          <line x1={23} y1={7} x2={36} y2={7} stroke={INK} strokeWidth={1.5} />
          <line x1={23} y1={13} x2={36} y2={13} stroke={INK} strokeWidth={1.5} />
        </g>
      </g>
    </g>
  );
}

const CLOUDS = [
  { cx: 420, cy: 150, scale: 1, hideOnMobile: false },
  { cx: 1520, cy: 110, scale: 1.2, hideOnMobile: true },
  { cx: 2520, cy: 168, scale: 0.9, hideOnMobile: false },
  { cx: 3420, cy: 124, scale: 1.1, hideOnMobile: true },
] as const;

const HOUSES = [
  { x: 1000, roof: TEAL, wall: PAPER, scale: 1 },
  { x: 1850, roof: GOLD, wall: KRAFT, scale: 1.05 },
  { x: 2650, roof: RED, wall: PAPER, scale: 1.1 },
  { x: 3350, roof: TEAL, wall: KRAFT, scale: 1.18 },
] as const;

const TREES = [
  { x: 650, baseline: 640, scale: 0.85, hideOnMobile: false },
  { x: 1450, baseline: 636, scale: 1, hideOnMobile: true },
  { x: 2250, baseline: 632, scale: 0.9, hideOnMobile: false },
  { x: 3050, baseline: 628, scale: 1.05, hideOnMobile: true },
  { x: 3660, baseline: 662, scale: 1.3, hideOnMobile: false },
] as const;

const MAILBOXES = [
  { x: 700, flagUp: true },
  { x: 1350, flagUp: false },
  { x: 2000, flagUp: true },
  { x: 2650, flagUp: false },
  { x: 3300, flagUp: true },
] as const;

export function JourneyScene() {
  return (
    <div aria-hidden className="journey-scene pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-paper">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="journey-scene-art"
      >
        <rect x={0} y={SKY_Y} width={VIEW_W} height={VIEW_H} fill={PAPER} />
        <circle cx={520} cy={150} r={80} fill={GOLD} opacity={0.16} />

        {CLOUDS.map((c, i) => (
          <Cloud key={i} cx={c.cx} cy={c.cy} scale={c.scale} hideOnMobile={c.hideOnMobile} />
        ))}

        {HOUSES.map((h) => (
          <House key={h.x} {...h} />
        ))}

        {TREES.map((t) => (
          <Tree key={t.x} x={t.x} baseline={t.baseline} scale={t.scale} hideOnMobile={t.hideOnMobile} />
        ))}

        <rect x={0} y={GROUND_TOP} width={VIEW_W} height={ROAD_TOP - GROUND_TOP} fill={KRAFT} opacity={0.55} />
        <rect x={0} y={ROAD_TOP} width={VIEW_W} height={ROAD_BOTTOM - ROAD_TOP} fill={INK} />
        <line
          x1={0}
          y1={ROAD_CENTER}
          x2={VIEW_W}
          y2={ROAD_CENTER}
          stroke={GOLD}
          strokeWidth={10}
          strokeDasharray="72 56"
          opacity={0.85}
        />
        <rect x={0} y={ROAD_BOTTOM} width={VIEW_W} height={VIEW_H - ROAD_BOTTOM} fill={INK} opacity={0.6} />

        {MAILBOXES.map((m) => (
          <Mailbox key={m.x} x={m.x} flagUp={m.flagUp} />
        ))}

        <Truck x={300} />
        <FinalePorch />
      </svg>

      {/* Shared color-grade + paper wash, unchanged in spirit from the old
          scroll-scene.tsx: a static (non-scroll-linked) vignette so the
          artwork's own edges fall off gently, plus the paper-toned scrim
          that every section's copy relies on for contrast (see
          `.journey-scene-grade` / `.journey-scene-scrim` in globals.css). */}
      <div className="journey-scene-grade absolute inset-0" />
      <div className="journey-scene-scrim absolute inset-0" />
    </div>
  );
}

export default JourneyScene;
