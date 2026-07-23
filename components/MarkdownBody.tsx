"use client";

import ReactMarkdown, { type Components } from "react-markdown";

const MARKDOWN_COMPONENTS: Components = {
  h1: (props) => (
    <h2 className="mt-8 mb-3 text-2xl font-extrabold text-brand-navy first:mt-0" {...props} />
  ),
  h2: (props) => (
    <h2 className="mt-8 mb-3 text-2xl font-extrabold text-brand-navy first:mt-0" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-6 mb-2 text-lg font-bold text-brand-navy" {...props} />
  ),
  p: (props) => (
    <p className="mt-4 leading-relaxed text-brand-navy/80 first:mt-0" {...props} />
  ),
  ul: (props) => (
    <ul className="mt-4 list-disc space-y-1.5 pl-5 text-brand-navy/80" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-brand-navy/80" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-4 border-l-4 border-brand-yellow-dark bg-brand-yellow-light/40 px-4 py-2 italic text-brand-navy/80"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-bold text-brand-navy" {...props} />,
  a: (props) => (
    <a className="font-semibold text-brand-navy underline hover:text-brand-navy-light" {...props} />
  ),
  code: (props) => (
    <code className="rounded bg-brand-navy/5 px-1.5 py-0.5 text-[0.85em] text-brand-navy" {...props} />
  ),
};

export default function MarkdownBody({
  markdown,
  html,
}: {
  markdown?: string;
  html?: string;
}) {
  if (markdown) {
    return <ReactMarkdown components={MARKDOWN_COMPONENTS}>{markdown}</ReactMarkdown>;
  }
  if (html) {
    // Trusted, admin-authored CMS content — not user input.
    return (
      <div
        className="[&_h1]:mt-8 [&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:font-extrabold [&_h1]:text-brand-navy [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-brand-navy [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-brand-navy/80 [&_a]:font-semibold [&_a]:text-brand-navy [&_a]:underline [&_strong]:font-bold [&_strong]:text-brand-navy [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-brand-navy/80 [&_li]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return null;
}
