import type { LandFaq } from "@/lib/lovell-canyon-faq";
import { LOVELL_CANYON_AREA } from "@/lib/lovell-canyon-area";
import { LOVELL_CANYON_BRAND, LOVELL_CANYON_BROKERAGE } from "@/lib/lovell-canyon-brand";
import { LOVELL_CANYON_PHONE_DISPLAY } from "@/lib/lovell-canyon-contact";
import { LOVELL_CANYON_LOCATION } from "@/lib/lovell-canyon-parcels";
import { LAND_GLOSSARY } from "@/lib/lovell-canyon-glossary";

/** Page-specific FAQ subsets for AEO — each matches visible content on its hub page. */

export const FAQ_89124_LAND: LandFaq[] = [
  {
    question: "Is there land for sale in zip code 89124?",
    answer: `Yes. This site lists two fee simple raw land parcels in Lovell Canyon, Clark County, Nevada 89124: Lot 2 (APN 135-31-801-006) and Lot 3 (APN 135-31-801-007) in Section 31, T20S R57E. Contact Dr. Jan Duffy at ${LOVELL_CANYON_PHONE_DISPLAY}.`,
  },
  {
    question: "What city is Nevada zip code 89124?",
    answer:
      "89124 is an unincorporated Clark County zip code covering Lovell Canyon and nearby Spring Mountains areas west of the Las Vegas Valley. It is not East Las Vegas (89120) and not Pahrump in Nye County (89048).",
  },
  {
    question: "How do I verify an APN in Clark County 89124?",
    answer:
      "Use the Clark County Assessor public inquiry with the full APN including dashes (135-31-801-006 or 135-31-801-007). Assessor map 135-31-8 covers Section 31 T20S R57E in Lovell Canyon.",
  },
  {
    question: "What type of land is offered in 89124 on this site?",
    answer: LAND_GLOSSARY.rawLandOnly,
  },
  {
    question: "How far is 89124 Lovell Canyon from Las Vegas?",
    answer:
      "Lovell Canyon in 89124 is west of the Las Vegas Valley, reached via NV-160 past Mountain Springs, then north on paved Lovell Canyon Road for roughly 11–12 miles. Drive time varies with traffic and mountain road conditions.",
  },
];

export const FAQ_BUYING_RAW_LAND: LandFaq[] = [
  {
    question: "What is due diligence when buying raw land in Clark County?",
    answer:
      "Typical steps include verifying APN and legal description on title Schedule A, reviewing Schedule B exceptions, confirming access roads, checking Clark County assessor records, understanding utility availability, and scheduling a site visit before closing.",
  },
  {
    question: "What does fee simple mean for Nevada vacant land?",
    answer: `${LAND_GLOSSARY.feeSimplePlain}. For the Lovell Canyon parcels, Schedule A on the title report describes fee simple ownership for Lot 2 and Lot 3.`,
  },
  {
    question: "Do I need a real estate agent to buy Lovell Canyon land?",
    answer: `${LOVELL_CANYON_BRAND.agentName}, ${LOVELL_CANYON_BRAND.agentTitleLong}, represents buyers for these Clark County parcels through ${LOVELL_CANYON_BROKERAGE}. Call or text ${LOVELL_CANYON_PHONE_DISPLAY} for showings and offer guidance.`,
  },
  {
    question: "What title exceptions apply to these parcels?",
    answer:
      "Schedule B on the title report lists standard exceptions plus parcel-specific items such as county road interests and property tax status. Read the full title report summary on this site and request the current commitment before closing.",
  },
  {
    question: "Can I build immediately on Lovell Canyon raw land?",
    answer:
      "Zoning, utilities, and buildability are not published on this site until confirmed. Contact Dr. Jan Duffy for current Clark County zoning and utility research for APN 135-31-801-006 and 135-31-801-007.",
  },
];

export const FAQ_LOVELL_CANYON_VS_PAHRUMP: LandFaq[] = [
  {
    question: "Is Lovell Canyon in Pahrump?",
    answer:
      "No. Lovell Canyon is in Clark County, Nevada 89124 in the Spring Mountains west of Las Vegas. Pahrump is in Nye County (zip 89048), east of the Spring Mountains across the valley.",
  },
  {
    question: "Why is NV-160 called the Pahrump Highway?",
    answer:
      "NV-160 continues west from Las Vegas toward Nye County and Pahrump. The Lovell Canyon turnoff is on NV-160 before you reach Nye County — roughly 40–45 minutes west of the Las Vegas Valley, past Mountain Springs.",
  },
  {
    question: "Is Lovell Canyon land in Clark County or Nye County?",
    answer: `Lovell Canyon parcels on this site are in ${LOVELL_CANYON_LOCATION.county}, Nevada ${LOVELL_CANYON_LOCATION.postalCode}. ${LOVELL_CANYON_AREA.areaContext}`,
  },
  {
    question: "Is 89124 the same as Pahrump zip codes?",
    answer:
      "No. Zip 89124 is Clark County (Lovell Canyon / Spring Mountains). Pahrump uses Nye County zip codes such as 89048 and 89060.",
  },
  {
    question: "How do I reach Lovell Canyon without going to Pahrump?",
    answer: `${LOVELL_CANYON_AREA.highwayNote}. Turn north on paved Lovell Canyon Road before continuing west into Nye County.`,
  },
];
