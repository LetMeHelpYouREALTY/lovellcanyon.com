/** Paths indexed on lovellcanyon.com — keep in sync with middleware and sitemap. */

/** Bump when land listing content changes materially (GSC sitemap lastmod). */
export const SITEMAP_LAST_MODIFIED = "2026-06-15T22:00:00.000Z";

export const INDEXABLE_PATHS = [
  "/",
  "/contact",
  "/location",
  "/access",
  "/parcels",
  "/parcels/lot-2",
  "/parcels/lot-3",
  "/title-report",
  "/faq",
  "/89124-land",
  "/buying-raw-land",
  "/lovell-canyon-vs-pahrump",
] as const;

export type IndexablePath = (typeof INDEXABLE_PATHS)[number];

export const SITEMAP_PAGES: Array<{
  path: IndexablePath;
  priority: number;
  changeFrequency: "weekly" | "monthly";
}> = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/parcels", priority: 0.95, changeFrequency: "weekly" },
  { path: "/parcels/lot-2", priority: 0.9, changeFrequency: "weekly" },
  { path: "/parcels/lot-3", priority: 0.9, changeFrequency: "weekly" },
  { path: "/location", priority: 0.85, changeFrequency: "monthly" },
  { path: "/access", priority: 0.85, changeFrequency: "monthly" },
  { path: "/title-report", priority: 0.8, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/89124-land", priority: 0.85, changeFrequency: "monthly" },
  { path: "/buying-raw-land", priority: 0.75, changeFrequency: "monthly" },
  { path: "/lovell-canyon-vs-pahrump", priority: 0.75, changeFrequency: "monthly" },
];

export function isIndexablePath(pathname: string): pathname is IndexablePath {
  return (INDEXABLE_PATHS as readonly string[]).includes(pathname);
}
