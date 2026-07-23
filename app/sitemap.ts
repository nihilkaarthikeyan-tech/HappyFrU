import type { MetadataRoute } from "next";
import { getBlogIndex, getCaseStudyIndex } from "@/lib/content";

export const BASE_URL = "https://www.happyfru.com";

const ROUTES = [
  "",
  "/solutions",
  "/technology",
  "/advertisers",
  "/fleet-partners",
  "/industries",
  "/pricing",
  "/analytics",
  "/about",
  "/faq",
  "/blog",
  "/case-studies",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, caseStudies] = await Promise.all([
    getBlogIndex(),
    getCaseStudyIndex(),
  ]);

  const staticEntries = ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const blogEntries = posts
    .filter((post) => post.slug)
    .map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.createdAt ? new Date(post.createdAt) : new Date(),
    }));

  const caseStudyEntries = caseStudies
    .filter((study) => study.slug)
    .map((study) => ({
      url: `${BASE_URL}/case-studies/${study.slug}`,
      lastModified: study.createdAt ? new Date(study.createdAt) : new Date(),
    }));

  return [...staticEntries, ...blogEntries, ...caseStudyEntries];
}
