import { API } from "./platform";

async function fetchJSON<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate: 300 } });
    if (res.ok) return (await res.json()) as T;
  } catch {}
  return null;
}

export type PlatformStat = { label: string; value: number; suffix?: string };

/** Copy: a not-yet-populated or unreachable CMS falls back to hardcoded content. */
export async function getStats(): Promise<PlatformStat[] | null> {
  const data = await fetchJSON<PlatformStat[]>("/api/v1/content/stats");
  return data && data.length > 0 ? data : null;
}

export type RecurringInterval = "MONTHLY" | "QUARTERLY" | "ANNUAL";
export type Plan = {
  id: string;
  name: string;
  description: string | null;
  inclusions: string[] | null;
  isActive: boolean;
  sortOrder: number;
  recurringPricePaise: number | null;
  recurringInterval: RecurringInterval | null;
};

export async function getPlans(): Promise<Plan[] | null> {
  const data = await fetchJSON<Plan[]>("/api/v1/plans");
  if (!data) return null;
  const active = data
    .filter((p) => p.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  return active.length > 0 ? active : null;
}

export type ContentSEO = { title?: string; description?: string };

export type ContentItem<TBody> = {
  id: string;
  title: string;
  slug: string | null;
  body: TBody;
  coverKey: string | null;
  seo?: ContentSEO | null;
  createdAt?: string;
};

export type TestimonialBody = {
  brand?: string;
  quote: string;
  result?: string;
  industry?: string;
};

export async function getTestimonials(): Promise<
  ContentItem<TestimonialBody>[] | null
> {
  const data = await fetchJSON<ContentItem<TestimonialBody>[]>(
    "/api/v1/content/testimonial"
  );
  return data && data.length > 0 ? data : null;
}

export type FaqBody = { answer: string };

export async function getFaqs(): Promise<ContentItem<FaqBody>[] | null> {
  const data = await fetchJSON<ContentItem<FaqBody>[]>("/api/v1/content/faq");
  return data && data.length > 0 ? data : null;
}

export type CityCoverage = {
  name: string;
  state: string;
  centerLat: number;
  centerLng: number;
  coverage: { lat: number; lng: number }[] | null;
  screens: number;
};

/** Facts: prefer the live value always; only fall back when the API is unreachable. */
export async function getCityCoverage(): Promise<CityCoverage[] | null> {
  return fetchJSON<CityCoverage[]>("/api/v1/cities/coverage");
}

/** Long-form body: some seeded content ships `html` instead of `markdown`. */
export type LongFormBody = { markdown?: string; html?: string };

export type BlogBody = LongFormBody;

// getBlogIndex/getBlogPost resolve unreachable-or-empty to []/null with no
// opinion on fallback content — callers (app/blog/*) decide whether to show
// an empty state or the snapshot below.
export async function getBlogIndex(): Promise<ContentItem<BlogBody>[]> {
  return (await fetchJSON<ContentItem<BlogBody>[]>("/api/v1/content/blog")) ?? [];
}

export async function getBlogPost(
  slug: string
): Promise<ContentItem<BlogBody> | null> {
  return fetchJSON<ContentItem<BlogBody>>(
    `/api/v1/content/blog/${encodeURIComponent(slug)}`
  );
}

/**
 * Snapshot of the real seeded posts, taken 2026-07-24, for use when the API
 * is unreachable. Goes stale the moment real posts are added or edited —
 * once the platform API has a public URL, live data always wins and this is
 * never used.
 */
export const FALLBACK_BLOG_POSTS: ContentItem<BlogBody>[] = [
  {
    id: "cmrorzzvh0002kfgs6lxtaduu",
    title: "How we measure a cab-top campaign",
    slug: "measuring-cab-top-campaigns",
    coverKey: null,
    seo: {
      title: "Measuring cab-top campaigns",
      description: "How HAPPYfrU logs every play with time and GPS.",
    },
    createdAt: "2026-07-17T10:09:10.493Z",
    body: {
      markdown:
        "## Every play is logged\n\nEach device records **time and GPS** for every play.\n\n- Rolled into daily reports\n- Downloadable as CSV\n\n> No guesswork.\n",
    },
  },
  {
    id: "cmrojdahb000y3fc1ula00gl7",
    title: "Why in-cab advertising works",
    slug: "why-in-cab-works",
    coverKey: null,
    seo: { description: "In-cab advertising explained" },
    createdAt: "2026-07-17T06:07:34.224Z",
    body: { html: "<p>22 minutes of attention per ride.</p>" },
  },
];

export type CaseStudyBody = LongFormBody & {
  brand?: string;
  result?: string;
  industry?: string;
};

export async function getCaseStudyIndex(): Promise<
  ContentItem<CaseStudyBody>[]
> {
  return (
    (await fetchJSON<ContentItem<CaseStudyBody>[]>(
      "/api/v1/content/case_study"
    )) ?? []
  );
}

export async function getCaseStudy(
  slug: string
): Promise<ContentItem<CaseStudyBody> | null> {
  return fetchJSON<ContentItem<CaseStudyBody>>(
    `/api/v1/content/case_study/${encodeURIComponent(slug)}`
  );
}
