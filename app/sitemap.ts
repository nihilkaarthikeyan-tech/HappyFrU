import type { MetadataRoute } from "next";

const BASE_URL = "https://www.happyfru.com";

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
  "/contact",
  "/login",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
