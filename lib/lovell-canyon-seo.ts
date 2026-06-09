import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

export const LOVELL_CANYON_SEO = {
  title: "Lovell Canyon Land for Sale | APN 135-31-801-006 & 007 | Dr. Jan Duffy",
  description:
    "Fee simple land in Lovell Canyon, Clark County NV 89120 — Lot 2 & Lot 3 (APN 135-31-801-006 & 007), Section 31 T20S R57E. Access via NV-160 and Lovell Canyon Rd. Listed by Dr. Jan Duffy, REALTOR®.",
  ogTitle: "Lovell Canyon Raw Land — Two Parcels",
  siteName: "Lovell Canyon Land — Dr. Jan Duffy",
  imageAlt: "Lovell Canyon raw land parcels — APN 135-31-801-006 and 135-31-801-007",
  keywords: [
    "Lovell Canyon land for sale",
    "89120 land for sale",
    "Clark County NV land",
    "raw land Lovell Canyon",
    "APN 135-31-801-006",
    "APN 135-31-801-007",
    "Nevada land parcels",
  ],
} as const;

const OG_IMAGE_PATH = "/opengraph-image";

export function getLovellCanyonMetadata(pathname = "/"): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalUrl =
    pathname === "/" ? siteUrl : `${siteUrl}${pathname.endsWith("/") ? pathname.slice(0, -1) : pathname}`;
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;

  return {
    metadataBase: new URL(siteUrl),
    title: LOVELL_CANYON_SEO.title,
    description: LOVELL_CANYON_SEO.description,
    keywords: [...LOVELL_CANYON_SEO.keywords],
    authors: [{ name: "Dr. Jan Duffy" }],
    creator: "Dr. Jan Duffy",
    publisher: "Berkshire Hathaway HomeServices Nevada Properties",
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
  };
}
