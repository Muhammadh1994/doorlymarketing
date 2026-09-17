interface PostmarkIconProps {
  className?: string;
}

/**
 * A hand-drawn-style ink cancellation mark, the kind stamped over real
 * postage. Renders in `currentColor` so it reads correctly against both
 * the colored (Featured/Standard) and paper-toned (Starter) ad tiles.
 */
export function PostmarkIcon({ className }: PostmarkIconProps) {
  const ticks = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * 360) / 24;
    const rad = (angle * Math.PI) / 180;
    const inner = 34;
    const outer = 40;
    const x1 = 50 + inner * Math.cos(rad);
    const y1 = 50 + inner * Math.sin(rad);
    const x2 = 50 + outer * Math.cos(rad);
    const y2 = 50 + outer * Math.sin(rad);
    return { x1, y1, x2, y2 };
  });

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="31" strokeWidth="1.5" />
      {ticks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} strokeWidth="1.5" />
      ))}
      <path
        d="M18 50 Q 26 42, 34 50 T 50 50 T 66 50 T 82 50"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
