/** Sitewide branding — Lovell Canyon land listing for Dr. Jan Duffy at BHHS Nevada. */

export const LOVELL_CANYON_BROKERAGE = "Berkshire Hathaway HomeServices Nevada Properties" as const;

export const LOVELL_CANYON_BROKERAGE_SHORT = "Berkshire Hathaway HomeServices Nevada" as const;

/** GBP business name and primary public brand — must match Google Business Profile exactly. */
export const LOVELL_CANYON_GBP_NAME =
  "Lovell Canyon Land | Dr. Jan Duffy · Land Specialist" as const;

export const LOVELL_CANYON_BRAND = {
  siteName: LOVELL_CANYON_GBP_NAME,
  brandShort: "Lovell Canyon Land",
  navTitle: "Lovell Canyon Land",
  navSubtitle: "Dr. Jan Duffy · Land Specialist · Berkshire Hathaway HomeServices Nevada",
  title: "Lovell Canyon Land for Sale | Dr. Jan Duffy",
  ogTitle: LOVELL_CANYON_GBP_NAME,
  description:
    "Fee simple raw land in Lovell Canyon, Clark County NV 89124. Lots 2 & 3 (APN 135-31-801-006 & 007). Dr. Jan Duffy, Land Specialist, Berkshire Hathaway HomeServices Nevada.",
  agentName: "Dr. Jan Duffy",
  agentTitle: "Land Specialist",
  agentTitleLong: "Land Specialist / Land Agent",
  agentAlternateName: LOVELL_CANYON_GBP_NAME,
  agentBio:
    "Dr. Jan Duffy is the Land Specialist and Land Agent for Berkshire Hathaway HomeServices Nevada Properties.",
  agentAttribution: `Dr. Jan Duffy, Land Specialist | License S.0197614.LLC | ${LOVELL_CANYON_BROKERAGE}`,
  listedBy: `Listed by Dr. Jan Duffy, Land Specialist, ${LOVELL_CANYON_BROKERAGE}`,
  license: "S.0197614.LLC",
  ctaSubheadline:
    "Call or text Dr. Jan Duffy, Land Specialist, for parcel details, access information, and next steps.",
} as const;
