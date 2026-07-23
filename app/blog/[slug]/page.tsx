import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PageHero from "@/components/PageHero";
import MarkdownBody from "@/components/MarkdownBody";
import { getBlogPost } from "@/lib/content";
import { API } from "@/lib/platform";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Blog | HappyFrU" };

  return {
    title: `${post.seo?.title ?? post.title} | HappyFrU`,
    description: post.seo?.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const coverUrl = post.coverKey ? `${API}/api/v1/files/${post.coverKey}` : null;

  return (
    <>
      <PageHero eyebrow="Blog" title={post.title} />

      <article className="py-12 sm:py-16">
        <div className="container-page max-w-2xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy hover:gap-2 transition-all"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          {coverUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverUrl}
              alt=""
              className="mt-6 w-full rounded-2xl object-cover"
            />
          )}

          <div className="mt-6">
            <MarkdownBody markdown={post.body.markdown} html={post.body.html} />
          </div>
        </div>
      </article>
    </>
  );
}
