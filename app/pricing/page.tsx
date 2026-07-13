import type { Metadata } from "next";
import { Monitor, MapPin, CalendarClock, Layers } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import IconCard from "@/components/IconCard";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Pricing | HappyFrU",
  description:
    "HappyFrU campaign pricing is based on screen count, city coverage, and campaign duration. Request a custom quote for your advertising goals.",
};

const FACTORS = [
  {
    icon: Monitor,
    title: "Screen Count",
    description:
      "How many in-cab displays your campaign runs on — pricing scales with reach.",
  },
  {
    icon: MapPin,
    title: "City / Route Coverage",
    description:
      "Target specific cities, routes, or the full network depending on your audience.",
  },
  {
    icon: CalendarClock,
    title: "Campaign Duration",
    description:
      "Run for days, weeks, or months — longer commitments unlock better rates.",
  },
  {
    icon: Layers,
    title: "Ad Format Mix",
    description:
      "Video, image, QR, coupon, or festival campaigns — format and frequency affect cost.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Pricing built around your campaign, not a fixed rate card"
        subtitle="Every HappyFrU campaign is priced against the screens, cities, and duration you actually need — talk to us for a quote matched to your goals."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="How Pricing Works"
            title="What Determines"
            highlight="Your Price"
          />
          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {FACTORS.map((item, i) => (
              <IconCard key={item.title} {...item} delay={i * 80} />
            ))}
          </div>

          <Reveal delay={120} className="mt-10 flex items-start gap-4 rounded-2xl border border-brand-yellow-dark/40 bg-brand-yellow-light px-6 py-5 max-w-3xl">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-navy text-white">
              <Layers size={18} />
            </div>
            <p className="text-sm text-brand-navy/80 leading-relaxed">
              We quote every campaign individually so pricing reflects your
              exact reach and duration, rather than a one-size-fits-all rate
              card. Share your goals below and we&apos;ll respond with a
              tailored proposal.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand
        heading="Request a Custom Quote"
        subheading="Tell us your target cities, screen count, and campaign duration."
        primaryHref="/contact"
        primaryLabel="Request a Quote"
      />
    </>
  );
}
