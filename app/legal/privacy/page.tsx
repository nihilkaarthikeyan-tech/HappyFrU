import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy | HappyFrU",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="py-16 sm:py-20">
        <div className="container-page max-w-2xl mx-auto text-brand-navy/70 text-sm leading-relaxed">
          <p>
            This page is a placeholder. Our full Privacy Policy, covering how
            we collect and use data from advertisers, fleet partners, and
            passengers, will be published here once drafted and reviewed by
            legal counsel.
          </p>
        </div>
      </section>
    </>
  );
}
