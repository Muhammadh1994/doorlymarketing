import Image from "next/image";
import { Reveal } from "@/components/reveal";

const VALUE_PROPS = [
  {
    title: "Cost-sharing makes it affordable",
    description:
      "Printing and postage for 10,000 pieces is split across every business on the card, so you get real reach without a full-mailer budget.",
  },
  {
    title: "Professional design, handled for you",
    description:
      "You don't need a designer. Send your logo and offer, and our team builds a section that looks sharp next to everyone else on the postcard.",
  },
  {
    title: "Delivered to real, physical mailboxes",
    description:
      "USPS carries every postcard directly to the household — no spam folder, no ad blocker, no scrolling past it.",
  },
  {
    title: "Targeted to your service area",
    description:
      "We mail to the neighborhoods around your business, so the households seeing your ad are the ones who can actually walk through your door.",
  },
];

export function WhyDirectMail() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <Reveal>
            <div className="scene-copy">
              <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Why direct mail still works for local business
              </h2>
              <p className="mt-4 text-muted-foreground">
                Digital ads compete for a swipe. A postcard sits on the
                kitchen counter. Here&apos;s what makes a shared mailer a
                smart way to earn that attention.
              </p>
            </div>

            {/* A framed photograph, not a section container — kept as its
                own object, same reasoning as the postcard mockup. */}
            <figure className="mt-8 overflow-hidden rounded-2xl border border-border">
              <Image
                src="/reference/postcard-flatlay.jpeg"
                alt="Real postcard ad-space mockups in bold color-block layouts, laid out on a wooden desk next to a USPS route map"
                width={1376}
                height={768}
                className="h-auto w-full"
              />
              <figcaption className="border-t border-border bg-card px-4 py-3 text-xs text-muted-foreground">
                Real postcard mockups from a shared mailing — the same
                format your ad space runs in.
              </figcaption>
            </figure>
          </Reveal>

          <dl className="scene-copy divide-y divide-foreground/15">
            {VALUE_PROPS.map((item, i) => (
              <Reveal
                key={item.title}
                as="div"
                delay={i * 60}
                className="grid gap-1 py-6 first:pt-0 sm:grid-cols-[1fr_2fr] sm:gap-6"
              >
                <dt className="font-display font-semibold">{item.title}</dt>
                <dd className="text-sm text-muted-foreground">{item.description}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
