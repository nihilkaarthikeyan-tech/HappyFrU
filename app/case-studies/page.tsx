import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getCaseStudyIndex } from "@/lib/content";
import { API } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Case Studies | HappyFrU",
  description:
    "Real campaigns, real results — how brands have used HappyFrU's in-cab network to reach passengers.",
};

export default async function CaseStudiesIndexPage() {
  const caseStudies = await getCaseStudyIndex();

  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Real Campaigns, Real Results"
        subtitle="How brands have used the HappyFrU network to reach passengers and grow."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          {caseStudies.length === 0 ? (
            <Reveal className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-black/5 bg-white py-16 text-center shadow-sm">
              <TrendingUp className="text-brand-navy/40" size={32} />
              <p className="font-bold text-brand-navy">Coming soon</p>
              <p className="text-sm text-brand-navy/60">
                We&apos;re putting together our first case studies — check
                back soon.
              </p>
            </Reveal>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((study, i) => {
                const coverUrl = study.coverKey
                  ? `${API}/api/v1/files/${study.coverKey}`
                  : null;
                return (
                  <Reveal key={study.id} delay={i * 80}>
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      {coverUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={coverUrl}
                          alt=""
                          className="h-40 w-full object-cover"
                        />
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        {study.body.brand && (
                          <span className="text-xs font-bold uppercase tracking-wide text-brand-yellow-dark">
                            {study.body.brand}
                            {study.body.industry ? ` · ${study.body.industry}` : ""}
                          </span>
                        )}
                        <h3 className="mt-1.5 font-bold text-brand-navy leading-snug">
                          {study.title}
                        </h3>
                        {study.body.result && (
                          <span className="mt-3 inline-flex w-fit rounded-full bg-brand-yellow-light px-3 py-1 text-xs font-semibold text-brand-navy">
                            {study.body.result}
                          </span>
                        )}
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-navy group-hover:gap-2 transition-all">
                          Read the story <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
