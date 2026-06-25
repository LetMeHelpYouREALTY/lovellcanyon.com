import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { LOVELL_CANYON_GALLERY_DEFINITIONS } from "@/lib/lovell-canyon-gallery-images";
import { LOVELL_CANYON_HERO_PAGES } from "@/lib/lovell-canyon-hero-images";
import { getLovellCanyonImageLicenseUrls } from "@/lib/lovell-canyon-image-license";
import {
  collectImageObjectsFromJsonLd,
  validateLovellCanyonImageObject,
} from "@/lib/lovell-canyon-image-object-validate";
import { LOVELL_CANYON_PARCELS } from "@/lib/lovell-canyon-parcels";
import {
  getLovellCanyonImageObjectNode,
  getLovellCanyonPageHeroImageSchema,
  getLovellCanyonParcelListingSchema,
} from "@/lib/lovell-canyon-schema";
import { INDEXABLE_PATHS, SITEMAP_PAGES } from "@/lib/lovell-canyon-site-pages";
import type { LovellCanyonPhoto } from "@/lib/lovell-canyon-media";

process.env.NEXT_PUBLIC_SITE_URL = "https://www.lovellcanyon.com";

const SITE_URL = "https://www.lovellcanyon.com";

function heroPhotoFromPath(pathname: string): LovellCanyonPhoto {
  const def = LOVELL_CANYON_HERO_PAGES.find((page) => page.pathname === pathname);
  if (!def) {
    throw new Error(`Missing hero definition for ${pathname}`);
  }

  return {
    key: def.r2Key,
    url: def.localPath,
    alt: def.alt,
    name: def.name,
    caption: def.caption,
    width: def.width,
    height: def.height,
    pathname: def.pathname,
  };
}

describe("Lovell Canyon Image Metadata loop", () => {
  it("keeps live validator paths in sync with INDEXABLE_PATHS", () => {
    const jsonPath = join(process.cwd(), "scripts", "indexable-paths.json");
    const livePaths = JSON.parse(readFileSync(jsonPath, "utf8")) as string[];
    expect([...livePaths].sort()).toEqual([...INDEXABLE_PATHS].sort());
  });

  it("keeps INDEXABLE_PATHS aligned with sitemap and hero registry", () => {
    const indexable = [...INDEXABLE_PATHS].sort();
    const sitemap = SITEMAP_PAGES.map((page) => page.path).sort();
    const heroes = LOVELL_CANYON_HERO_PAGES.map((page) => page.pathname).sort();

    expect(indexable).toEqual(sitemap);
    expect(indexable).toEqual(heroes);
  });

  it("uses dedicated license and contact URLs per Google guidance", () => {
    const urls = getLovellCanyonImageLicenseUrls();
    expect(urls.license).toBe(`${SITE_URL}/image-license`);
    expect(urls.acquireLicensePage).toBe(`${SITE_URL}/contact`);
  });

  it.each([...INDEXABLE_PATHS])("path %s builds valid hero ImageObject", (pathname) => {
    const photo = heroPhotoFromPath(pathname);
    const pageUrl = pathname === "/" ? SITE_URL : `${SITE_URL}${pathname}`;
    const heroNode = getLovellCanyonImageObjectNode(photo, `${pageUrl}#hero-image`, SITE_URL);

    expect(validateLovellCanyonImageObject(heroNode, pathname)).toEqual({ ok: true, errors: [] });

    const graphSchema = getLovellCanyonPageHeroImageSchema(
      photo,
      pathname,
      `Test title for ${pathname}`
    );
    const graphImages = collectImageObjectsFromJsonLd(graphSchema);
    expect(graphImages.length).toBeGreaterThanOrEqual(1);

    for (const { node, label } of graphImages) {
      expect(validateLovellCanyonImageObject(node, label)).toEqual({ ok: true, errors: [] });
    }
  });

  it("homepage gallery ImageObjects pass validation", () => {
    const galleryPhotos: LovellCanyonPhoto[] = LOVELL_CANYON_GALLERY_DEFINITIONS.map((def, index) => ({
      key: def.r2Key,
      url: def.localPath,
      alt: def.alt,
      name: def.alt,
      caption: def.alt,
      width: 1600,
      height: 900,
      pathname: `/gallery-${index + 1}`,
    }));

    const hero = heroPhotoFromPath("/");
    const schema = getLovellCanyonPageHeroImageSchema(hero, "/", "Home", galleryPhotos);
    const images = collectImageObjectsFromJsonLd(schema);

    expect(images.length).toBe(1 + galleryPhotos.length);
    for (const { node, label } of images) {
      expect(validateLovellCanyonImageObject(node, label)).toEqual({ ok: true, errors: [] });
    }
  });

  it.each(LOVELL_CANYON_PARCELS.map((parcel) => parcel.slug))(
    "listing %s embeds valid ImageObject",
    (slug) => {
      const parcel = LOVELL_CANYON_PARCELS.find((item) => item.slug === slug)!;
      const photo = heroPhotoFromPath(`/parcels/${slug}`);
      const listingUrl = `${SITE_URL}/parcels/${slug}`;
      const listingSchema = getLovellCanyonParcelListingSchema(parcel, SITE_URL, `/parcels/${slug}`, {
        imagePhoto: photo,
      });

      const images = collectImageObjectsFromJsonLd(listingSchema);
      expect(images.length).toBe(1);
      expect(validateLovellCanyonImageObject(images[0].node, listingUrl)).toEqual({
        ok: true,
        errors: [],
      });
    }
  );

  it.runIf(process.env.LOVELL_CANYON_CHECK_IMAGE_ASSETS === "1")(
    "local hero and gallery fallback files exist",
    () => {
    const publicDir = join(process.cwd(), "public");
    const missing: string[] = [];

    for (const hero of LOVELL_CANYON_HERO_PAGES) {
      const filePath = join(publicDir, hero.localPath.replace(/^\//, ""));
      if (!existsSync(filePath)) {
        missing.push(hero.localPath);
      }
    }

    for (const gallery of LOVELL_CANYON_GALLERY_DEFINITIONS) {
      const filePath = join(publicDir, gallery.localPath.replace(/^\//, ""));
      if (!existsSync(filePath)) {
        missing.push(gallery.localPath);
      }
    }

    expect(missing, `Missing public image fallbacks: ${missing.join(", ")}`).toEqual([]);
    }
  );
});
