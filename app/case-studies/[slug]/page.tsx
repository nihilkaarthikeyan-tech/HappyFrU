import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PageHero from "@/components/PageHero";
import MarkdownBody from "@/components/MarkdownBody";
import { getCaseStudy } from "@/lib/content";
import { API } from "@/lib/platform";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return { title: "Case Studies | HappyFrU" };

  return {
    title: `${study.seo?.title ?? study.title} | HappyFrU`,
    description: study.seo?.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  const coverUrl = study.coverKey ? `${API}/api/v1/files/${study.coverKey}` : null;

  return (
    <>
      <PageHero eyebrow="Case Study" title={study.title} />

      <article className="py-12 sm:py-16">
        <div className="container-page max-w-2xl mx-auto">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy hover:gap-2 transition-all"
          >
            <ArrowLeft size={14} /> Back to Case Studies
          </Link>

          {(study.body.brand || study.body.result || study.body.industry) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {study.body.brand && (
                <span className="rounded-full bg-brand-navy px-4 py-1.5 text-sm font-semibold text-white">
                  {study.body.brand}
                </span>
              )}
              {study.body.industry && (
                <span className="rounded-full border border-brand-navy/20 px-4 py-1.5 text-sm font-semibold text-brand-navy">
                  {study.body.industry}
                </span>
              )}
              {study.body.result && (
                <span className="rounded-full bg-brand-yellow-light px-4 py-1.5 text-sm font-semibold text-brand-navy">
                  {study.body.result}
                </span>
              )}
            </div>
          )}

          {coverUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverUrl}
              alt=""
              className="mt-6 w-full rounded-2xl object-cover"
            />
          )}

          <div className="mt-6">
            <MarkdownBody markdown={study.body.markdown} html={study.body.html} />
          </div>
        </div>
      </article>
    </>
  );
}
