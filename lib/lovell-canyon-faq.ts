import { LOVELL_CANYON_AREA } from "@/lib/lovell-canyon-area";
import { LOVELL_CANYON_PHONE_DISPLAY } from "@/lib/lovell-canyon-contact";
import { LOVELL_CANYON_BRAND, LOVELL_CANYON_BROKERAGE } from "@/lib/lovell-canyon-brand";
import { LOVELL_CANYON_LOCATION } from "@/lib/lovell-canyon-parcels";
import { LAND_GLOSSARY } from "@/lib/lovell-canyon-glossary";

export type LandFaq = { question: string; answer: string };

export const LOVELL_CANYON_FAQS: LandFaq[] = [
  {
    question: `What is ${LOVELL_CANYON_BRAND.siteName}?`,
    answer: `${LOVELL_CANYON_BRAND.siteName} is the official site for two raw vacant land parcels in Lovell Canyon, Clark County, Nevada 89124. ${LAND_GLOSSARY.feeSimplePlain} — Lot 2 (APN 135-31-801-006) and Lot 3 (APN 135-31-801-007). ${LOVELL_CANYON_BRAND.agentBio} License ${LOVELL_CANYON_BRAND.license}. Call or text ${LOVELL_CANYON_PHONE_DISPLAY}.`,
  },
  {
    question: "Where is Lovell Canyon land for sale in Nevada?",
    answer: `The parcels sit in Lovell Canyon, an unincorporated area of Clark County, Nevada 89124. ${LOVELL_CANYON_AREA.areaContext} ${LAND_GLOSSARY.legalLocationPlain}: ${LOVELL_CANYON_LOCATION.section}, Township 20 South, Range 57 East (T20S R57E), ${LAND_GLOSSARY.assessorMapPlain} ${LOVELL_CANYON_LOCATION.assessorMap}.`,
  },
  {
    question: "What parcels are offered on this site?",
    answer: `Two vacant land parcels in Lovell Canyon, Clark County NV 89124. ${LAND_GLOSSARY.feeSimplePlain} — Lot 2 (APN 135-31-801-006) and Lot 3 (APN 135-31-801-007), ${LOVELL_CANYON_LOCATION.section}, T20S R57E.`,
  },
  {
    question: "What is the APN for Lovell Canyon Lot 2 and Lot 3?",
    answer: `Lot 2 is Clark County ${LAND_GLOSSARY.apnFirstUse} 135-31-801-006. Lot 3 is APN 135-31-801-007. Both are fee simple estates per title report Schedule A.`,
  },
  {
    question: "How do I reach Lovell Canyon from Las Vegas?",
    answer:
      `From ${LOVELL_CANYON_AREA.highwayNote}, then continue north on Lovell Canyon Rd (paved, ${LOVELL_CANYON_AREA.lovellCanyonRoadMiles}). Local access to the parcels continues via dirt roads listed on the Access page.`,
  },
  {
    question: "How far is Lovell Canyon from Las Vegas?",
    answer:
      "Lovell Canyon is west of the Las Vegas Valley, reached via NV-160 past Mountain Springs, then north on paved Lovell Canyon Road for roughly 11–12 miles. Drive time varies with traffic and road conditions; plan for a mountain-road drive from the valley.",
  },
  {
    question: "Is the Lovell Canyon land fee simple?",
    answer: `Yes. ${LAND_GLOSSARY.feeSimplePlain}. The title report ${LAND_GLOSSARY.scheduleAPlain.toLowerCase()} describes fee simple ownership for both parcels. Full legal descriptions and ${LAND_GLOSSARY.scheduleBPlain.toLowerCase()} items are on the Title Report and parcel pages.`,
  },
  {
    question: "What zip code applies to these parcels?",
    answer: "The parcels are in the Lovell Canyon area of Clark County, Nevada 89124.",
  },
  {
    question: "Are these homes or raw land?",
    answer: LAND_GLOSSARY.rawLandOnly,
  },
  {
    question: "What is the current property tax status?",
    answer: `Per title report Schedule B, general and special property taxes for fiscal year 2025-2026 are paid in full ($285.90 per parcel). Contact Dr. Jan Duffy for the latest tax status before closing.`,
  },
  {
    question: "Where can I read the legal description and title exceptions?",
    answer: `Recorded legal descriptions are on each parcel page and on the Title Report page, under ${LAND_GLOSSARY.scheduleAPlain.toLowerCase()}. Title exceptions appear under ${LAND_GLOSSARY.scheduleBPlain.toLowerCase()}.`,
  },
  {
    question: "How do I get acreage, zoning, utilities, or price?",
    answer: `Those details are not published on this site until confirmed. Call or text Dr. Jan Duffy at ${LOVELL_CANYON_PHONE_DISPLAY} to request current parcel information.`,
  },
  {
    question: "What are the GPS coordinates for Lovell Canyon?",
    answer: `Map coordinates for the Lovell Canyon area in Clark County NV 89124 center near 36.13286° N, 115.56287° W (public map sources). The USFS Lovell Canyon Trailhead at the north end of paved Lovell Canyon Road is approximately 36.16659° N, 115.58324° W. Parcel corners are not published on this site — contact Dr. Jan Duffy for a showing map.`,
  },
  {
    question: "Is there a map of Lovell Canyon on this site?",
    answer:
      "Yes. Every page includes an embedded Google Map of Lovell Canyon with Get Directions and View on Google Maps links, plus map coordinates for Clark County NV 89124.",
  },
  {
    question: "How do I email about Lovell Canyon land?",
    answer:
      "Email DrDuffySells@lovellcanyon.com or use the contact page. Messages forward to the listing agent inbox at Berkshire Hathaway HomeServices Nevada Properties.",
  },
  {
    question: "Who is the listing agent?",
    answer: `${LOVELL_CANYON_BRAND.agentName}, ${LOVELL_CANYON_BRAND.agentTitleLong}, License ${LOVELL_CANYON_BRAND.license}, ${LOVELL_CANYON_BROKERAGE}. Call or text ${LOVELL_CANYON_PHONE_DISPLAY}.`,
  },
];
