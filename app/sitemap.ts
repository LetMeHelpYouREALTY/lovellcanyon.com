import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { SITEMAP_PAGES } from "@/lib/lovell-canyon-site-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  return SITEMAP_PAGES.map((page) => ({
    url: `${baseUrl}${page.path === "/" ? "" : page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
