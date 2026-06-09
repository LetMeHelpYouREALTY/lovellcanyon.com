/**
 * Page-specific hero images for Lovell Canyon land routes.
 * Based on Parallel search: hyperlocal alt text, unique visuals per URL,
 * ImageObject + primaryImageOfPage for SEO/GEO/AEO/schema.
 *
 * Upload to R2 bucket `listing-photos` under lovell-canyon/heroes/.
 * Local fallbacks live in public/images/heroes/lovell-canyon/.
 */

export type LovellCanyonHeroPageId =
  | "home"
  | "parcels"
  | "lot-2"
  | "lot-3"
  | "location"
  | "access"
  | "title-report"
  | "faq"
  | "contact";

export type LovellCanyonHeroDefinition = {
  id: LovellCanyonHeroPageId;
  /** App Router pathname */
  pathname: string;
  r2Key: string;
  localPath: string;
  /** SEO + accessibility — include locality, service, and page intent */
  alt: string;
  /** AEO/schema caption — factual, cite-ready */
  caption: string;
  /** ImageObject name for JSON-LD */
  name: string;
  width: number;
  height: number;
};

const GEO = "Lovell Canyon, Clark County, Nevada 89120";
const AGENT = "Dr. Jan Duffy, Land Specialist";

export const LOVELL_CANYON_HERO_PAGES: LovellCanyonHeroDefinition[] = [
  {
    id: "home",
    pathname: "/",
    r2Key: "lovell-canyon/heroes/home.jpg",
    localPath: "/images/heroes/lovell-canyon/home.jpg",
    name: "Lovell Canyon raw land parcels — Clark County NV 89120",
    alt: `${GEO} raw land for sale — Lot 2 and Lot 3 (APN 135-31-801-006 and 007), Section 31 T20S R57E — ${AGENT}`,
    caption: `Fee simple raw land parcels in ${GEO}, Section 31, Township 20 South, Range 57 East. Listed by ${AGENT}, Berkshire Hathaway HomeServices Nevada Properties.`,
    width: 1600,
    height: 900,
  },
  {
    id: "parcels",
    pathname: "/parcels",
    r2Key: "lovell-canyon/heroes/parcels.jpg",
    localPath: "/images/heroes/lovell-canyon/parcels.jpg",
    name: "Lovell Canyon land parcels — Lot 2 and Lot 3",
    alt: `Lovell Canyon NV 89120 land parcels — Lot 2 APN 135-31-801-006 and Lot 3 APN 135-31-801-007, Clark County raw land`,
    caption: `Two fee simple raw land parcels in ${GEO}. Assessor map 135-31-8, Section 31 T20S R57E.`,
    width: 1600,
    height: 900,
  },
  {
    id: "lot-2",
    pathname: "/parcels/lot-2",
    r2Key: "lovell-canyon/heroes/lot-2.jpg",
    localPath: "/images/heroes/lovell-canyon/lot-2.jpg",
    name: "Lovell Canyon Lot 2 — APN 135-31-801-006",
    alt: `Lovell Canyon Lot 2 raw land Clark County NV 89120 — APN 135-31-801-006, Section 31 T20S R57E`,
    caption: `Lot 2 fee simple land in ${GEO}. Clark County APN 135-31-801-006.`,
    width: 1600,
    height: 900,
  },
  {
    id: "lot-3",
    pathname: "/parcels/lot-3",
    r2Key: "lovell-canyon/heroes/lot-3.jpg",
    localPath: "/images/heroes/lovell-canyon/lot-3.jpg",
    name: "Lovell Canyon Lot 3 — APN 135-31-801-007",
    alt: `Lovell Canyon Lot 3 raw land Clark County NV 89120 — APN 135-31-801-007, Section 31 T20S R57E`,
    caption: `Lot 3 fee simple land in ${GEO}. Clark County APN 135-31-801-007.`,
    width: 1600,
    height: 900,
  },
  {
    id: "location",
    pathname: "/location",
    r2Key: "lovell-canyon/heroes/location.jpg",
    localPath: "/images/heroes/lovell-canyon/location.jpg",
    name: "Lovell Canyon location — Clark County Nevada 89120",
    alt: `Where is Lovell Canyon? ${GEO} — west of Las Vegas Valley near Spring Mountains, GPS 36.13286° N, 115.56287° W`,
    caption: `Lovell Canyon is an unincorporated area of Clark County, Nevada 89120, west of the Las Vegas Valley, accessed via NV-160 and Lovell Canyon Road.`,
    width: 1600,
    height: 900,
  },
  {
    id: "access",
    pathname: "/access",
    r2Key: "lovell-canyon/heroes/access.jpg",
    localPath: "/images/heroes/lovell-canyon/access.jpg",
    name: "Lovell Canyon Road access — NV-160 to Clark County land",
    alt: `Driving directions to Lovell Canyon land — NV-160 past Mountain Springs, north on paved Lovell Canyon Rd, Clark County NV 89120`,
    caption: `Primary access to Lovell Canyon parcels: NV-160 (Blue Diamond Rd), turn north on paved Lovell Canyon Road approximately 11–12 miles, then local dirt roads.`,
    width: 1600,
    height: 900,
  },
  {
    id: "title-report",
    pathname: "/title-report",
    r2Key: "lovell-canyon/heroes/title-report.jpg",
    localPath: "/images/heroes/lovell-canyon/title-report.jpg",
    name: "Lovell Canyon title report — fee simple land Clark County NV",
    alt: `Lovell Canyon land title report — fee simple Schedule A legal descriptions, APN 135-31-801-006 and 007, Clark County NV 89120`,
    caption: `Title report Schedule A and B summaries for Lovell Canyon Lot 2 and Lot 3 fee simple land in ${GEO}.`,
    width: 1600,
    height: 900,
  },
  {
    id: "faq",
    pathname: "/faq",
    r2Key: "lovell-canyon/heroes/faq.jpg",
    localPath: "/images/heroes/lovell-canyon/faq.jpg",
    name: "Lovell Canyon land FAQ — Clark County NV parcels",
    alt: `Lovell Canyon land FAQ — raw land parcels APN 135-31-801-006 and 007, access, taxes, and inquiries in Clark County NV 89120`,
    caption: `Frequently asked questions about fee simple raw land in ${GEO}, access via Lovell Canyon Road, and parcel APNs 135-31-801-006 and 007.`,
    width: 1600,
    height: 900,
  },
  {
    id: "contact",
    pathname: "/contact",
    r2Key: "lovell-canyon/heroes/contact.jpg",
    localPath: "/images/heroes/lovell-canyon/contact.jpg",
    name: "Contact Dr. Jan Duffy — Lovell Canyon Land Specialist",
    alt: `Contact ${AGENT} about Lovell Canyon raw land — Clark County NV 89120 parcels APN 135-31-801-006 and 007`,
    caption: `Inquire about Lovell Canyon land with ${AGENT}, Berkshire Hathaway HomeServices Nevada Properties.`,
    width: 1600,
    height: 900,
  },
];

const HERO_BY_PATH = new Map(
  LOVELL_CANYON_HERO_PAGES.map((page) => [normalizePath(page.pathname), page])
);

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function getLovellCanyonHeroDefinition(pathname: string): LovellCanyonHeroDefinition | null {
  return HERO_BY_PATH.get(normalizePath(pathname)) ?? null;
}

export function getAllLovellCanyonHeroPathnames(): string[] {
  return LOVELL_CANYON_HERO_PAGES.map((p) => p.pathname);
}
