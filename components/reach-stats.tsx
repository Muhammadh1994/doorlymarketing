import { Reveal } from "@/components/reveal";

const SUPPORTING_STATS = [
  {
    value: "USPS",
    label: "Every Road Every Delivery",
    description: "Mailed through the postal service's own residential delivery route — not a bought email list.",
  },
  {
    value: "1 of 4",
    label: "Businesses per postcard",
    description: "You split the printing and postage with a small handful of other local businesses, not dozens.",
  },
  {
    value: "Done for you",
    label: "Design included",
    description: "Your ad space is laid out by our team so it looks professional next to every other business on the card.",
  },
];

export function ReachStats() {
  return (
    <section
      id="reach"
      className="overflow-hidden rounded-3xl bg-postal-blue text-postal-blue-foreground shadow-panel"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal className="text-center">
          <p className="font-display text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
            ~10,000
          </p>
          <p className="mt-3 text-xl text-postal-blue-foreground/85 sm:text-2xl">
            households reached with every single mailing
          </p>
        </Reveal>

        <dl className="mx-auto mt-16 grid max-w-4xl gap-8 border-t border-postal-blue-foreground/20 pt-10 sm:grid-cols-3">
          {SUPPORTING_STATS.map((stat, i) => (
            <Reveal key={stat.label} as="div" delay={i * 70}>
              <dt className="font-mono text-xs tracking-wide text-postal-blue-foreground/70 uppercase">
                {stat.label}
              </dt>
              <dd className="mt-2 font-display text-2xl font-bold">{stat.value}</dd>
              <dd className="mt-2 text-sm text-postal-blue-foreground/80">{stat.description}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
