/**
 * Gallery photos — distinct from homepage hero (home.jpg).
 * R2 keys in lovell-canyon-media.ts; local fallbacks in public/images/gallery/lovell-canyon/.
 */

export type LovellCanyonGalleryDefinition = {
  r2Key: string;
  localPath: string;
  alt: string;
};

const GEO = "Lovell Canyon, Clark County, Nevada 89124";

export const LOVELL_CANYON_GALLERY_DEFINITIONS: LovellCanyonGalleryDefinition[] = [
  {
    r2Key: "lovell-canyon/gallery/01.jpg",
    localPath: "/images/gallery/lovell-canyon/lot-2-parcel.jpg",
    alt: `Lot 2 raw land APN 135-31-801-006 — ${GEO}`,
  },
  {
    r2Key: "lovell-canyon/gallery/02.jpg",
    localPath: "/images/gallery/lovell-canyon/lot-3-parcel.jpg",
    alt: `Lot 3 raw land APN 135-31-801-007 — ${GEO}`,
  },
  {
    r2Key: "lovell-canyon/gallery/03.jpg",
    localPath: "/images/gallery/lovell-canyon/access-road.jpg",
    alt: `NV-160 and Lovell Canyon Rd access to Clark County land parcels — ${GEO}`,
  },
  {
    r2Key: "lovell-canyon/gallery/04.jpg",
    localPath: "/images/gallery/lovell-canyon/spring-mountains.jpg",
    alt: `Spring Mountains canyon setting west of Las Vegas — ${GEO}`,
  },
  {
    r2Key: "lovell-canyon/gallery/05.jpg",
    localPath: "/images/gallery/lovell-canyon/parcels-overview.jpg",
    alt: `Fee simple vacant land parcels Lot 2 and Lot 3 — Section 31 T20S R57E, ${GEO}`,
  },
  {
    r2Key: "lovell-canyon/gallery/06.jpg",
    localPath: "/images/gallery/lovell-canyon/canyon-vista.jpg",
    alt: `Lovell Canyon valley vista near USFS recreation land — Clark County NV 89124`,
  },
];
