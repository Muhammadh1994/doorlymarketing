import { Reveal } from "@/components/reveal";

// TODO: replace with the real JotForm form ID once the client provides it.
const JOTFORM_ID = "000000000000000";

export function LeadFormSection() {
  return (
    <section id="get-your-ad-space" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="scene-copy text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Get your ad space on the next mailing
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tell us a bit about your business — name, phone, email, and
            address — and our team will follow up to reserve your space and
            get your section designed.
          </p>
        </Reveal>

        {/* The embedded JotForm widget is its own object (a physical
            paper form standing in for itself), not a section container —
            it keeps a surface so its white form fields read cleanly. */}
        <Reveal delay={100} className="mt-10">
          <div className="rounded-2xl border border-border bg-card p-2 shadow-[0_30px_60px_-35px_oklch(0_0_0/0.35)] sm:p-3">
            <div className="overflow-hidden rounded-xl border border-border bg-background">
              {/* JotForm embed: swap JOTFORM_ID above with the real form ID from JotForm. */}
              <iframe
                title="Doorly Marketing ad space request form"
                src={`https://form.jotform.com/${JOTFORM_ID}`}
                className="h-[900px] w-full"
                allow="geolocation; microphone; camera"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
