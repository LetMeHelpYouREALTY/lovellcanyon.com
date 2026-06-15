import type { Metadata } from "next";
import { LOVELL_CANYON_BRAND, LOVELL_CANYON_BROKERAGE } from "@/lib/lovell-canyon-brand";
import { LOVELL_CANYON_GEO } from "@/lib/lovell-canyon-geo";
import { getLovellCanyonPageHero, type LovellCanyonPhoto } from "@/lib/lovell-canyon-media";
import { getCanonicalUrl, getSiteUrl } from "@/lib/site-url";

export const LOVELL_CANYON_SEO = {
  siteName: LOVELL_CANYON_BRAND.siteName,
  brandShort: LOVELL_CANYON_BRAND.brandShort,
  title: LOVELL_CANYON_BRAND.title,
  description: LOVELL_CANYON_BRAND.description,
  ogTitle: LOVELL_CANYON_BRAND.ogTitle,
  imageAlt: "Lovell Canyon raw land parcels — APN 135-31-801-006 and 135-31-801-007",
  keywords: [
    "Lovell Canyon land for sale",
    "Lovell Canyon land specialist",
    "Dr Jan Duffy land agent",
    "Lovell Canyon NV 89124 land",
    "89124 land for sale",
    "Clark County NV raw land",
    "raw land Lovell Canyon Nevada",
    "APN 135-31-801-006",
    "APN 135-31-801-007",
    "fee simple land Lovell Canyon",
    "how to get to Lovell Canyon from Las Vegas",
    "Lovell Canyon land listing agent",
    "Nevada vacant land parcels",
    "89124 land for sale",
    "how to buy raw land Clark County NV",
    "Lovell Canyon vs Pahrump",
    "Lovell Canyon GPS coordinates",
    "Lovell Canyon map Clark County NV",
  ],
} as const;

const OG_IMAGE_PATH = "/opengraph-image";

type LovellCanyonPageMetadataOptions = {
  hero?: LovellCanyonPhoto | null;
  ogTitle?: string;
};

export function getLovellCanyonPageMetadata(
  pathname: string,
  title: string,
  description: string,
  options?: LovellCanyonPageMetadataOptions
): Metadata {
  const base = getLovellCanyonMetadata(pathname);
  const socialTitle = options?.ogTitle ?? title;
  const metadata: Metadata = {
    ...base,
    title,
    description,
    openGraph: {
      ...base.openGraph,
      title: socialTitle,
      description,
    },
    twitter: {
      ...base.twitter,
      title: socialTitle,
      description,
    },
  };

  const hero = options?.hero;
  if (hero) {
    const image = {
      url: hero.url,
      width: hero.width ?? 1600,
      height: hero.height ?? 900,
      alt: hero.alt,
    };
    metadata.openGraph = {
      ...metadata.openGraph,
      images: [image],
    };
    metadata.twitter = {
      ...metadata.twitter,
      images: [hero.url],
    };
  }

  return metadata;
}

export async function getLovellCanyonPageMetadataWithHero(
  pathname: string,
  title: string,
  description: string,
  ogTitle?: string
): Promise<Metadata> {
  const hero = await getLovellCanyonPageHero(pathname);
  return getLovellCanyonPageMetadata(pathname, title, description, { hero, ogTitle });
}

export function getLovellCanyonMetadata(pathname = "/"): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalUrl = getCanonicalUrl(pathname);
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  const { latitude, longitude } = LOVELL_CANYON_GEO.center;

  return {
    metadataBase: new URL(siteUrl),
    applicationName: LOVELL_CANYON_SEO.siteName,
    title: LOVELL_CANYON_SEO.title,
    description: LOVELL_CANYON_SEO.description,
    keywords: [...LOVELL_CANYON_SEO.keywords],
    authors: [{ name: LOVELL_CANYON_BRAND.agentName }],
    creator: LOVELL_CANYON_BRAND.agentName,
    publisher: LOVELL_CANYON_BROKERAGE,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: LOVELL_CANYON_SEO.ogTitle,
      description: LOVELL_CANYON_SEO.description,
      type: "website",
      url: canonicalUrl,
      siteName: LOVELL_CANYON_SEO.siteName,
      locale: "en_US",
      images: [
        {
          url: OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: LOVELL_CANYON_SEO.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: LOVELL_CANYON_SEO.ogTitle,
      description: LOVELL_CANYON_SEO.description,
      images: [OG_IMAGE_PATH],
    },
    ...(googleVerification
      ? {
          verification: {
            google: googleVerification,
          },
        }
      : {}),
    other: {
      "geo.region": "US-NV",
      "geo.placename": "Lovell Canyon, Clark County, NV 89124",
      "geo.position": `${latitude};${longitude}`,
      ICBM: `${latitude}, ${longitude}`,
    },
  };
}
