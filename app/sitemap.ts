import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

/** Pages we want Google Search Console to index for this land listing site. */
const INDEXABLE_PAGES: Array<{
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly";
}> = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  return INDEXABLE_PAGES.map((page) => ({
    url: `${baseUrl}${page.path === "/" ? "" : page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
