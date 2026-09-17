import { Reveal } from "@/components/reveal";

const STEPS = [
  {
    title: "Choose your ad space",
    description:
      "Pick the Featured, Standard, or Starter spot that fits your budget and how much room your message needs.",
  },
  {
    title: "We design your section",
    description:
      "Send us your logo, offer, and photos. Our team lays out your section so it looks sharp next to every other business on the card.",
  },
  {
    title: "The postcard prints and mails",
    description:
      "Once every space is filled, the finished postcard goes to print and USPS carries it to roughly 10,000 households in the target area.",
  },
  {
    title: "Customers respond",
    description:
      "Your neighbors pull it out of the mailbox, see your offer, and call, visit, or scan your way to a new customer.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="scene-copy max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            From ad space to mailbox in four steps
          </h2>
        </Reveal>

        <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div
            aria-hidden="true"
            className="absolute top-6 right-0 left-0 hidden border-t-2 border-dashed border-foreground/25 lg:block"
          />
          {STEPS.map((step, i) => (
            <Reveal
              key={step.title}
              as="li"
              delay={i * 70}
              className="scene-copy relative flex flex-col gap-3"
            >
              <span className="relative z-10 flex size-12 items-center justify-center rounded-full border-2 border-postal-red bg-background font-display text-lg font-bold text-postal-red">
                {i + 1}
              </span>
              <h3 className="font-display text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
