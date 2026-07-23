import type { Metadata } from "next";
import { Monitor, MapPin, CalendarClock, Layers, Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import IconCard from "@/components/IconCard";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import TrackedLink from "@/components/TrackedLink";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import { getPlans, type Plan } from "@/lib/content";
import { SIGNUP_URL } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Pricing | HappyFrU",
  description:
    "Estimate your HappyFrU in-cab advertising campaign cost instantly with our investment calculator, or request a custom quote for your advertising goals.",
};

// Used whenever the platform's plan editor hasn't set a description/inclusions
// for a plan of this name yet.
const FALLBACK_PLAN_CONTENT: Record<
  string,
  { description: string; inclusions: string[] }
> = {
  Starter: {
    description:
      "Test the waters with a focused campaign on a handful of screens in one city.",
    inclusions: [
      "Up to 10 screens",
      "Single city",
      "Static or video ads",
      "Standard reporting",
    ],
  },
  Growth: {
    description:
      "Scale up to multiple cities and routes once your campaign proves out.",
    inclusions: [
      "Up to 50 screens",
      "Multiple cities",
      "Video, image & QR ads",
      "Real-time analytics",
    ],
  },
  Premium: {
    description:
      "Run always-on campaigns across our full network with priority support.",
    inclusions: [
      "Unlimited screens",
      "Full network coverage",
      "All ad formats",
      "Priority support & reporting",
    ],
  },
  Enterprise: {
    description:
      "Custom-built campaigns and dedicated account management for national brands.",
    inclusions: [
      "Custom screen allocation",
      "Dedicated account manager",
      "Custom ad formats",
      "SLA-backed reporting",
    ],
  },
};

const DEFAULT_PLAN_CONTENT = {
  description: "Reach out and we'll tailor a plan to your campaign goals.",
  inclusions: [] as string[],
};

function planPrice(plan: Plan) {
  if (plan.recurringPricePaise == null) return null;
  const amount = `₹${(plan.recurringPricePaise / 100).toLocaleString("en-IN")}`;
  const interval =
    plan.recurringInterval === "MONTHLY"
      ? "/month"
      : plan.recurringInterval === "QUARTERLY"
        ? "/quarter"
        : plan.recurringInterval === "ANNUAL"
          ? "/year"
          : "";
  return `${amount}${interval}`;
}

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

export default async function PricingPage() {
  const plans = await getPlans();

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Pricing built around your campaign, not a fixed rate card"
        subtitle="Every HappyFrU campaign is priced against the screens, cities, and duration you actually need — talk to us for a quote matched to your goals."
      />

      {plans && (
        <section className="pb-16 sm:pb-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="Plans"
              title="Choose Your"
              highlight="Plan"
              subtitle="Every plan scales with your screens, cities, and campaign length — pick a starting point and adjust as you grow."
            />
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {plans.map((plan, i) => {
                const fallback =
                  FALLBACK_PLAN_CONTENT[plan.name] ?? DEFAULT_PLAN_CONTENT;
                const description = plan.description ?? fallback.description;
                const inclusions = plan.inclusions ?? fallback.inclusions;
                const price = planPrice(plan);

                return (
                  <Reveal key={plan.id} delay={i * 80}>
                    <div className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <h3 className="font-bold text-brand-navy text-lg">
                        {plan.name}
                      </h3>
                      <p className="mt-1 text-2xl font-extrabold text-brand-navy">
                        {price ?? "Custom"}
                      </p>
                      <p className="mt-2 text-sm text-brand-navy/70 leading-relaxed">
                        {description}
                      </p>
                      {inclusions.length > 0 && (
                        <ul className="mt-4 space-y-2 flex-1">
                          {inclusions.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm text-brand-navy/80"
                            >
                              <Check
                                size={16}
                                className="mt-0.5 shrink-0 text-brand-yellow-dark"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                      <TrackedLink
                        href={SIGNUP_URL}
                        event="cta_click"
                        location={`pricing_plan_${plan.name.toLowerCase()}`}
                        className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-navy-light"
                      >
                        Get Started
                      </TrackedLink>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Investment Calculator"
            title="Estimate Your"
            highlight="Campaign Cost"
            subtitle="Get instant pricing estimates for in-cab advertising and explore captive audience marketing potential."
          />
          <Reveal delay={100} className="mt-10">
            <InvestmentCalculator />
          </Reveal>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
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
        primaryLabel="Request a Quote"
      />
    </>
  );
}
