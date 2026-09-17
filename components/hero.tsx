import { Button } from "@/components/ui/button";
import { ImageStreamHero, type StreamImage } from "@/components/ui/image-stream-hero";
import { Reveal } from "@/components/reveal";

// Real photos, not the generated postcard illustrations: the client asked
// for the hero corridor to look "as realistic as possible." This cycles
// through the actual mail journey — their own postcard mockups, then the
// truck, mailboxes, street, and a real front door — which also sets up the
// full-page scroll scene below (components/scroll-scene.tsx).
const CORRIDOR_IMAGES: StreamImage[] = [
  { src: "/reference/postcard-flatlay.jpeg" },
  { src: "/images/stock/mail-truck-driving.jpg" },
  { src: "/images/stock/mailboxes-row.jpg" },
  { src: "/images/stock/suburban-street.jpg" },
  { src: "/images/stock/house-front-door.jpg" },
];

export function Hero() {
  return (
    <section id="top" className="relative">
      <ImageStreamHero
        images={CORRIDOR_IMAGES}
        cards={9}
        className="min-h-[520px] sm:min-h-[580px] lg:min-h-[640px]"
      >
        {/* Client's direction: name + slogan only, brought close together
            as one compact lockup — not the previous headline/subhead/stat
            spread. Unlike every other section (which sits directly on the
            background per the client's correction), the hero keeps its own
            card: it's layered right over the moving postcard corridor, so
            it needs real contrast rather than a text-shadow halo. */}
        <div className="relative z-10 flex h-full min-h-[520px] flex-col items-center justify-center px-4 py-10 text-center sm:min-h-[580px] sm:px-6 lg:min-h-[640px]">
          <Reveal className="rounded-3xl border border-border bg-card/95 px-8 py-8 shadow-panel backdrop-blur-sm sm:px-12 sm:py-10">
            <p className="font-display text-4xl leading-none font-bold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
              Doorly Marketing
            </p>
            <p className="mt-3 text-base font-medium text-foreground/80 sm:mt-4 sm:text-lg">
              Your ad. Their mailbox. 10,000 doors.
            </p>
            <Button
              render={<a href="#get-your-ad-space" />}
              nativeButton={false}
              size="lg"
              className="mt-7 bg-postal-red text-postal-red-foreground hover:bg-postal-red/90"
            >
              Reserve Your Ad Space
            </Button>
          </Reveal>
        </div>
      </ImageStreamHero>
    </section>
  );
}
