import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import FAQAccordion from "@/components/FAQAccordion";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "FAQ | HappyFrU",
  description:
    "Common questions from advertisers and fleet partners about running campaigns and joining the HappyFrU network.",
};

const ADVERTISER_FAQS = [
  {
    question: "Is there a minimum number of screens I need to book?",
    answer:
      "Campaigns can be scaled to fit your budget and goals. Share your target reach with our team and we'll recommend a screen count and city mix that fits your campaign.",
  },
  {
    question: "How granular can I get with targeting?",
    answer:
      "You can target by city, specific routes, time slots, and number of cabs. The advertiser portal lets you combine these to reach the audience segment that matters most to your campaign.",
  },
  {
    question: "What reporting will I have access to?",
    answer:
      "You get real-time access to impressions, playback statistics, QR code interactions, and delivery/campaign status, plus downloadable reports from the advertiser portal.",
  },
  {
    question: "How does billing work?",
    answer:
      "Billing is managed directly through the advertiser portal, tied to your campaign's screen count, duration, and format mix. Our team will walk you through invoicing when you start a campaign.",
  },
];

const FLEET_FAQS = [
  {
    question: "What does the installation process involve?",
    answer:
      "Our team handles the full installation professionally at a time that works for you — no technical setup required on your end.",
  },
  {
    question: "How is revenue share or payout structured?",
    answer:
      "Fleet partners earn monthly based on their enrolled vehicles and screen activity. Exact payout terms are confirmed when you apply, based on your city and vehicle type.",
  },
  {
    question: "Who's responsible for maintenance?",
    answer:
      "We are. Devices are cloud-managed and monitored remotely, with our team handling regular maintenance and any repairs needed.",
  },
  {
    question: "Is there a minimum contract length?",
    answer:
      "Contract terms are discussed and confirmed during onboarding so both sides know what to expect before installation begins.",
  },
];

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        subtitle="Answers for advertisers and fleet partners. Don't see your question? Reach out and we'll get back to you directly."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page max-w-3xl mx-auto">
          <SectionHeading title="For Advertisers" center={false} />
          <div className="mt-6">
            <FAQAccordion items={ADVERTISER_FAQS} />
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-page max-w-3xl mx-auto">
          <SectionHeading title="For Fleet Partners" center={false} />
          <div className="mt-6">
            <FAQAccordion items={FLEET_FAQS} />
          </div>
        </div>
      </section>

      <CTABand
        heading="Still have questions?"
        subheading="Our team typically responds within one business day."
        primaryHref="/contact"
        primaryLabel="Contact Us"
      />
    </>
  );
}
