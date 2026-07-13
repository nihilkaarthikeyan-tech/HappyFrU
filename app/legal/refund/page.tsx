import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Refund Policy | HappyFrU",
};

export default function RefundPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Refund Policy" />
      <section className="py-16 sm:py-20">
        <div className="container-page max-w-2xl mx-auto text-brand-navy/70 text-sm leading-relaxed">
          <p>
            This page is a placeholder. Our Refund Policy for advertiser
            campaigns will be published here once drafted and reviewed by
            legal counsel.
          </p>
        </div>
      </section>
    </>
  );
}
