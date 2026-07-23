import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import FAQAccordion from "@/components/FAQAccordion";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import { getFaqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ | HappyFrU",
  description:
    "Common questions from advertisers and fleet partners about running campaigns and joining the HappyFrU network.",
};

/**
 * Snapshot of the real seeded FAQ, taken 2026-07-24, for use when the API is
 * unreachable — the em dash is restored here (the platform's raw response
 * currently has a mojibake artifact in its place; same content, not a typo).
 * Goes stale the moment the CMS gets more questions; live data always wins.
 */
const SNAPSHOT_FAQS = [
  {
    question: "Do you cover night shifts?",
    answer: "Yes — cabs run late, and your slots run with them.",
  },
];

export default async function FAQPage() {
  const liveFaqs = await getFaqs();
  const faqs = liveFaqs
    ? liveFaqs.map((f) => ({ question: f.title, answer: f.body.answer }))
    : SNAPSHOT_FAQS;

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        subtitle="Answers for advertisers and fleet partners. Don't see your question? Reach out and we'll get back to you directly."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page max-w-3xl mx-auto">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" center={false} />
          <Reveal delay={120} className="mt-6">
            <FAQAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <CTABand
        heading="Still have questions?"
        subheading="Our team typically responds within one business day."
        primaryLabel="Contact Us"
      />
    </>
  );
}
