/** Paths indexed on lovellcanyon.com — keep in sync with middleware and sitemap. */

/** Bump when land listing content changes materially (GSC sitemap lastmod). */
export const SITEMAP_LAST_MODIFIED = "2026-06-10T18:00:00.000Z";

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
];

export function isIndexablePath(pathname: string): pathname is IndexablePath {
  return (INDEXABLE_PATHS as readonly string[]).includes(pathname);
}
