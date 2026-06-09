import { LOVELL_CANYON_PHONE_DISPLAY } from "@/lib/lovell-canyon-contact";
import { LOVELL_CANYON_BRAND, LOVELL_CANYON_BROKERAGE } from "@/lib/lovell-canyon-brand";

export type LandFaq = { question: string; answer: string };

export const LOVELL_CANYON_FAQS: LandFaq[] = [
  {
    question: `What is ${LOVELL_CANYON_BRAND.siteName}?`,
    answer: `${LOVELL_CANYON_BRAND.siteName} is the official listing site for two fee simple raw land parcels in Lovell Canyon, Clark County, Nevada 89120 — Lot 2 (APN 135-31-801-006) and Lot 3 (APN 135-31-801-007). ${LOVELL_CANYON_BRAND.agentBio} License ${LOVELL_CANYON_BRAND.license}. Call or text ${LOVELL_CANYON_PHONE_DISPLAY}.`,
  },
  {
    question: "Where is Lovell Canyon land for sale in Nevada?",
    answer:
      "The parcels are in Lovell Canyon, an unincorporated area of Clark County, Nevada 89120, west of the Las Vegas Valley near Mountain Springs and Pahrump. Legal location: Section 31, Township 20 South, Range 57 East (T20S R57E), assessor map 135-31-8.",
  },
  {
    question: "What parcels are offered on this site?",
    answer:
      "Two fee simple land parcels in Lovell Canyon, Clark County NV 89120: Lot 2 (APN 135-31-801-006) and Lot 3 (APN 135-31-801-007), Section 31, T20S R57E.",
  },
  {
    question: "What is the APN for Lovell Canyon Lot 2 and Lot 3?",
    answer:
      "Lot 2 is Clark County APN 135-31-801-006. Lot 3 is APN 135-31-801-007. Both are fee simple estates per title report Schedule A.",
  },
  {
    question: "How do I reach Lovell Canyon from Las Vegas?",
    answer:
      "From NV-160 (Blue Diamond Rd / Pahrump Highway), drive west past Mountain Springs and turn north on Lovell Canyon Rd (paved, approximately 11–12 miles). Local access to the parcels continues via dirt roads listed on the Access page.",
  },
  {
    question: "How far is Lovell Canyon from Las Vegas?",
    answer:
      "Lovell Canyon is west of the Las Vegas Valley, reached via NV-160 past Mountain Springs, then north on paved Lovell Canyon Road for roughly 11–12 miles. Drive time varies with traffic and road conditions; plan for a mountain-road drive from the valley.",
  },
  {
    question: "Is the Lovell Canyon land fee simple?",
    answer:
      "Yes. Title report Schedule A describes a fee simple estate in both parcels. Full legal descriptions and Schedule B title exceptions are published on the Title Report and parcel pages.",
  },
  {
    question: "What zip code applies to these parcels?",
    answer: "The parcels are in the Lovell Canyon area of Clark County, Nevada 89120.",
  },
  {
    question: "Are these homes or raw land?",
    answer:
      "Raw land only. This site describes vacant land parcels — not homes, condos, or MLS residential listings.",
  },
  {
    question: "What is the current property tax status?",
    answer:
      "Per title report Schedule B, general and special property taxes for fiscal year 2025-2026 are paid in full ($285.90 per parcel). Contact Dr. Jan Duffy for the latest tax status before closing.",
  },
  {
    question: "Where can I read the legal description and title exceptions?",
    answer:
      "Schedule A legal descriptions and Schedule B title exceptions are on each parcel page and on the Title Report page.",
  },
  {
    question: "How do I get acreage, zoning, utilities, or price?",
    answer:
      `Those details are not published on this site until confirmed. Call or text Dr. Jan Duffy at ${LOVELL_CANYON_PHONE_DISPLAY} to request current parcel information.`,
  },
  {
    question: "What are the GPS coordinates for Lovell Canyon?",
    answer:
      "The Lovell Canyon area in Clark County NV 89120 is centered near 36.13286° N, 115.56287° W (public map sources). The USFS Lovell Canyon Trailhead at the north end of paved Lovell Canyon Road is approximately 36.16659° N, 115.58324° W. Parcel corners are not published on this site — contact Dr. Jan Duffy for a showing map.",
  },
  {
    question: "Is there a map of Lovell Canyon on this site?",
    answer:
      "Yes. Every page includes an embedded Google Map of Lovell Canyon with Get Directions and View on Google Maps links, plus GPS coordinates for Clark County NV 89120.",
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
