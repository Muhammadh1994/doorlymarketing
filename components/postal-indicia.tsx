import { cn } from "@/lib/utils";

/**
 * A permit-imprint box, the small bordered indicia printed in the corner of
 * real bulk-mail pieces in place of a stamp ("PRESORTED STD / U.S. POSTAGE
 * PAID / PERMIT NO."). It's the authentic detail for a mailer split across
 * multiple advertisers, and doubles as a visual footnote for the
 * shared-postage story.
 */
export function PostalIndicia({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex w-[92px] flex-col items-center gap-0.5 border border-current/70 px-2 py-1.5 text-center font-mono text-[7px] leading-tight tracking-wide uppercase",
        className
      )}
    >
      <span>Presorted Std</span>
      <span className="my-0.5 h-px w-full bg-current/70" />
      <span>U.S. Postage</span>
      <span className="font-bold">PAID</span>
      <span>Permit No. 42</span>
    </div>
  );
}
