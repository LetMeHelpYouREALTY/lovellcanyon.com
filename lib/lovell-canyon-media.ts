/**
 * Property photos served from Cloudflare R2 bucket `listing-photos`.
 * Public URL enabled on the managed r2.dev domain.
 *
 * Upload keys (examples):
 *   lovell-canyon/hero.jpg
 *   lovell-canyon/heroes/home.jpg
 *   lovell-canyon/gallery/01.jpg
 */

import {
  LOVELL_CANYON_GALLERY_DEFINITIONS,
} from "@/lib/lovell-canyon-gallery-images";
import {
  getLovellCanyonHeroDefinition,
  type LovellCanyonHeroDefinition,
} from "@/lib/lovell-canyon-hero-images";

const DEFAULT_R2_PUBLIC_BASE =
  "https://pub-55f2185197354e748b122f17b695df69.r2.dev";

export const LOVELL_CANYON_MEDIA = {
  bucket: "listing-photos",
  heroKey: "lovell-canyon/hero.jpg",
  galleryKeys: [
    "lovell-canyon/gallery/01.jpg",
    "lovell-canyon/gallery/02.jpg",
    "lovell-canyon/gallery/03.jpg",
    "lovell-canyon/gallery/04.jpg",
    "lovell-canyon/gallery/05.jpg",
    "lovell-canyon/gallery/06.jpg",
  ],
  heroAlt:
    "Lovell Canyon raw land — Clark County NV parcels APN 135-31-801-006 and 135-31-801-007",
} as const;

export function getR2PublicBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_R2_MEDIA_BASE_URL?.replace(/\/$/, "") ??
    DEFAULT_R2_PUBLIC_BASE
  );
}

export function getR2ObjectUrl(key: string): string {
  const base = getR2PublicBaseUrl();
  const normalizedKey = key.replace(/^\//, "");
  return `${base}/${normalizedKey}`;
}

export async function r2ObjectExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      next: { revalidate: 3600 },
    });
    return response.ok;
  } catch {
    return false;
  }
}

export type LovellCanyonPhoto = {
  key: string;
  url: string;
  alt: string;
  caption?: string;
  name?: string;
  width?: number;
  height?: number;
  pathname?: string;
};

function heroDefinitionToPhoto(
  definition: LovellCanyonHeroDefinition,
  url: string,
  key: string
): LovellCanyonPhoto {
  return {
    key,
    url,
    alt: definition.alt,
    caption: definition.caption,
    name: definition.name,
    width: definition.width,
    height: definition.height,
    pathname: definition.pathname,
  };
}

async function resolveHeroUrl(r2Key: string, localPath: string): Promise<{ url: string; key: string }> {
  const r2Url = getR2ObjectUrl(r2Key);
  if (await r2ObjectExists(r2Url)) {
    return { url: r2Url, key: r2Key };
  }

  // Edge-safe fallback: public/ paths (no fs — opengraph-image runs on Edge).
  return { url: localPath, key: localPath };
}

/** Page-specific hero — R2 first, then public/images fallback. */
export async function getLovellCanyonPageHero(pathname: string): Promise<LovellCanyonPhoto | null> {
  const definition = getLovellCanyonHeroDefinition(pathname);
  if (!definition) return null;

  const resolved = await resolveHeroUrl(definition.r2Key, definition.localPath);

  return heroDefinitionToPhoto(definition, resolved.url, resolved.key);
}

export async function getLovellCanyonHeroPhoto(): Promise<LovellCanyonPhoto | null> {
  const pageHero = await getLovellCanyonPageHero("/");
  if (pageHero) return pageHero;

  const url = getR2ObjectUrl(LOVELL_CANYON_MEDIA.heroKey);
  const exists = await r2ObjectExists(url);
  if (!exists) return null;

  return {
    key: LOVELL_CANYON_MEDIA.heroKey,
    url,
    alt: LOVELL_CANYON_MEDIA.heroAlt,
  };
}

async function resolveGalleryUrl(
  r2Key: string,
  localPath: string
): Promise<{ url: string; key: string }> {
  const r2Url = getR2ObjectUrl(r2Key);
  if (await r2ObjectExists(r2Url)) {
    return { url: r2Url, key: r2Key };
  }
  return { url: localPath, key: localPath };
}

/** Gallery photos — R2 first, then distinct local fallbacks (never homepage hero). */
export async function getLovellCanyonGalleryPhotos(): Promise<LovellCanyonPhoto[]> {
  const results = await Promise.all(
    LOVELL_CANYON_GALLERY_DEFINITIONS.map(async (definition) => {
      const resolved = await resolveGalleryUrl(definition.r2Key, definition.localPath);
      return {
        key: resolved.key,
        url: resolved.url,
        alt: definition.alt,
        name: definition.alt,
        caption: definition.alt,
        width: 1600,
        height: 900,
      };
    })
  );

  return results;
}
