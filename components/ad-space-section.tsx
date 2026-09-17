import { PostcardDiagram } from "@/components/postcard-diagram";
import { Reveal } from "@/components/reveal";

export function AdSpaceSection() {
  return (
    <section id="ad-space" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="scene-copy">
            <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              One mailer, four ways to advertise
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every postcard we mail is divided into four ad spaces. Bigger
              spaces get more attention and cost more; smaller spaces are a
              low-cost way to get your name in front of the neighborhood.
              Hover a space below to see it stamped.
            </p>
          </Reveal>
        </div>

        {/* The postcard mockup itself is a deliberate object (a real
            postcard, not a section container), so it keeps its own frame
            — see postcard-diagram.tsx. */}
        <Reveal delay={100} className="mt-12">
          <PostcardDiagram className="mx-auto w-full max-w-2xl" />
        </Reveal>

        <p className="scene-copy mt-6 text-center text-sm text-muted-foreground">
          Every business on the card gets its own space, its own design, and
          the same 10,000 households.
        </p>
      </div>
    </section>
  );
}
