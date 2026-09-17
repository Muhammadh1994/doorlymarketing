import { cn } from "@/lib/utils";
import { PostmarkIcon } from "@/components/postmark-icon";
import { PostalIndicia } from "@/components/postal-indicia";

interface AdSpace {
  name: string;
  caption: string;
  span: string;
  height: string;
  tone: "red" | "teal" | "gold" | "kraft";
  /**
   * Rounds each tile's own outer corners to match the frame. Mobile stacks
   * the tiles in a different order (top/bottom/split-row) than the desktop
   * grid does, so a tile's corner position — and therefore which corners it
   * rounds — changes at the md breakpoint and has to be reset explicitly.
   */
  corners: string;
}

const AD_SPACES: AdSpace[] = [
  {
    name: "Featured Spot",
    caption: "The biggest space on the mailer",
    span: "col-span-2 md:row-span-2",
    height: "h-44 md:h-auto",
    tone: "red",
    corners: "rounded-t-[1.1rem] md:rounded-t-none md:rounded-l-[1.1rem]",
  },
  {
    name: "Standard Spot",
    caption: "Prime placement, shared cost",
    span: "col-span-2",
    height: "h-32 md:h-auto",
    tone: "teal",
    corners: "md:rounded-tr-[1.1rem]",
  },
  {
    name: "Starter Spot",
    caption: "Get on the mailer for less",
    span: "col-span-1",
    height: "h-28 md:h-auto",
    tone: "gold",
    corners: "rounded-bl-[1.1rem] md:rounded-bl-none",
  },
  {
    name: "Starter Spot",
    caption: "Get on the mailer for less",
    span: "col-span-1",
    height: "h-28 md:h-auto",
    tone: "kraft",
    corners: "rounded-br-[1.1rem]",
  },
];

const TONE_CLASSES: Record<AdSpace["tone"], string> = {
  red: "bg-postal-red text-postal-red-foreground",
  teal: "bg-postal-teal text-postal-teal-foreground",
  gold: "bg-postal-gold text-postal-gold-foreground",
  kraft: "bg-kraft text-kraft-foreground",
};

export function PostcardDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <p className="sr-only">
        Diagram of one shared postcard divided into four ad spaces: a large
        Featured Spot, a medium Standard Spot, and two small Starter Spots.
        Select any space to jump to the reservation form.
      </p>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-3 -right-2 z-10 rotate-2 border border-foreground/70 bg-paper/95 text-foreground shadow-sm md:-top-4 md:-right-3"
      >
        <PostalIndicia />
      </div>
      <div className="rounded-[1.75rem] border border-border bg-card p-2 shadow-[0_30px_60px_-30px_oklch(0_0_0/0.35)] sm:p-3">
        <div className="grid grid-cols-2 gap-2 bg-border/60 p-[2px] md:grid-cols-4 md:grid-rows-2 md:gap-[2px] md:aspect-[3/2]">
          {AD_SPACES.map((space, i) => (
            <a
              key={`${space.name}-${i}`}
              href="#get-your-ad-space"
              className={cn(
                "ad-tile group flex flex-col justify-between p-3 sm:p-4",
                space.span,
                space.height,
                space.corners,
                TONE_CLASSES[space.tone]
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div
                    className={cn(
                      "font-display leading-tight font-semibold",
                      i === 0 ? "text-xl sm:text-2xl md:text-3xl" : i === 1 ? "text-base sm:text-lg" : "text-sm"
                    )}
                  >
                    {space.name}
                  </div>
                  <p
                    className={cn(
                      "mt-1 max-w-[20ch] text-current/80",
                      i === 0 ? "text-sm" : "text-xs"
                    )}
                  >
                    {space.caption}
                  </p>
                </div>
                <PostmarkIcon className="ad-tile-postmark size-10 shrink-0 sm:size-12" />
              </div>

              <span className="ad-tile-cta inline-flex items-center gap-1 text-xs font-medium">
                Select this space
                <svg
                  viewBox="0 0 16 16"
                  className="size-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
