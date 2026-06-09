/**
 * Property photos served from Cloudflare R2 bucket `listing-photos`.
 * Public URL enabled on the managed r2.dev domain.
 *
 * Upload keys (examples):
 *   lovell-canyon/hero.jpg
 *   lovell-canyon/heroes/home.jpg
 *   lovell-canyon/gallery/01.jpg
 */

import { existsSync } from "fs";
import path from "path";
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

function publicFileExists(localPath: string): boolean {
  const relativePath = localPath.replace(/^\//, "");
  return existsSync(path.join(process.cwd(), "public", relativePath));
}

async function resolveHeroUrl(r2Key: string, localPath: string): Promise<{ url: string; key: string } | null> {
  const r2Url = getR2ObjectUrl(r2Key);
  if (await r2ObjectExists(r2Url)) {
    return { url: r2Url, key: r2Key };
  }

  if (publicFileExists(localPath)) {
    return { url: localPath, key: localPath };
  }

  return null;
}

/** Page-specific hero — R2 first, then public/images fallback. */
export async function getLovellCanyonPageHero(pathname: string): Promise<LovellCanyonPhoto | null> {
  const definition = getLovellCanyonHeroDefinition(pathname);
  if (!definition) return null;

  const resolved = await resolveHeroUrl(definition.r2Key, definition.localPath);
  if (!resolved) return null;

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

export async function getLovellCanyonGalleryPhotos(): Promise<LovellCanyonPhoto[]> {
  const results = await Promise.all(
    LOVELL_CANYON_MEDIA.galleryKeys.map(async (key, index) => {
      const url = getR2ObjectUrl(key);
      const exists = await r2ObjectExists(url);
      if (!exists) return null;

      return {
        key,
        url,
        alt: `${LOVELL_CANYON_MEDIA.heroAlt} — photo ${index + 1}`,
      };
    })
  );

  return results.filter((photo) => photo !== null) as LovellCanyonPhoto[];
}
