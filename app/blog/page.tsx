import type { Metadata } from "next";
import Link from "next/link";
import { Newspaper, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getBlogIndex } from "@/lib/content";
import { API } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Blog | HappyFrU",
  description:
    "Notes on in-cab advertising, campaign measurement, and what we're building at HappyFrU.",
};

export default async function BlogIndexPage() {
  const posts = await getBlogIndex();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="From the HappyFrU Team"
        subtitle="Notes on in-cab advertising, campaign measurement, and what we're building."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          {posts.length === 0 ? (
            <Reveal className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-black/5 bg-white py-16 text-center shadow-sm">
              <Newspaper className="text-brand-navy/40" size={32} />
              <p className="font-bold text-brand-navy">No posts yet</p>
              <p className="text-sm text-brand-navy/60">
                We&apos;re working on our first stories — check back soon.
              </p>
            </Reveal>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => {
                const coverUrl = post.coverKey
                  ? `${API}/api/v1/files/${post.coverKey}`
                  : null;
                return (
                  <Reveal key={post.id} delay={i * 80}>
                    <Link
                      href={`/blog/${post.slug}`}
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
                        <h3 className="font-bold text-brand-navy leading-snug">
                          {post.title}
                        </h3>
                        {post.seo?.description && (
                          <p className="mt-2 text-sm text-brand-navy/70 leading-relaxed">
                            {post.seo.description}
                          </p>
                        )}
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-navy group-hover:gap-2 transition-all">
                          Read more <ArrowRight size={14} />
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
