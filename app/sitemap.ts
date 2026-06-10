import { MetadataRoute } from "next";
import { getCanonicalUrl } from "@/lib/site-url";
import { SITEMAP_LAST_MODIFIED, SITEMAP_PAGES } from "@/lib/lovell-canyon-site-pages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITEMAP_LAST_MODIFIED);

  return SITEMAP_PAGES.map((page) => ({
    url: getCanonicalUrl(page.path),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
