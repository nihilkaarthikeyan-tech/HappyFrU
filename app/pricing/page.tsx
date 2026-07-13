import type { Metadata } from "next";
import { Monitor, MapPin, CalendarClock, Layers } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import IconCard from "@/components/IconCard";
import CTABand from "@/components/CTABand";

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
            title="What Determines"
            highlight="Your Price"
          />
          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {FACTORS.map((item) => (
              <IconCard key={item.title} {...item} />
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-brand-yellow-dark/40 bg-brand-yellow-light px-6 py-5 text-sm text-brand-navy/80 max-w-3xl">
            We quote every campaign individually so pricing reflects your
            exact reach and duration, rather than a one-size-fits-all rate
            card. Share your goals below and we&apos;ll respond with a
            tailored proposal.
          </div>
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
