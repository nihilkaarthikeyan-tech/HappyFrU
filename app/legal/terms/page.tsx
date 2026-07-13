import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms & Conditions | HappyFrU",
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" />
      <section className="py-16 sm:py-20">
        <div className="container-page max-w-2xl mx-auto text-brand-navy/70 text-sm leading-relaxed">
          <p>
            This page is a placeholder. Final Terms &amp; Conditions for
            advertisers and fleet partners will be published here once
            drafted and reviewed by legal counsel.
          </p>
        </div>
      </section>
    </>
  );
}
