/** CallAction WidgetTracker site ID for lovellcanyon.com */
export const CALLACTION_WIDGET_ID = "WT-XQHVYQWW";

/** Public tracking number — shown on site, GBP, schema, and tel:/sms: links. */
const CALLACTION_DIGITS =
  process.env.NEXT_PUBLIC_CALLACTION_PHONE?.replace(/\D/g, "") ?? "7028429736";

/**
 * CallAction call-forward destination (Jan Duffy direct line).
 * Configured in CallAction dashboard only — never use for public NAP, GBP, or tel: links.
 */
export const CALLACTION_FORWARD_DESTINATION = "(702) 222-1964";

/** CallAction campaign tracking (dashboard: Campaign Name). */
export const CALLACTION_CAMPAIGN_NAME = "Lovell Canyon";

/** CallAction drip campaign for land buyer leads. */
export const CALLACTION_DRIP_CAMPAIGN =
  "KTS New Land Buyer Lead - US/Pacific - Admin";

function formatPhoneDisplay(digits: string): string {
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return digits;
}

/** Public CallAction tracking number shown sitewide. Forwards to CALLACTION_FORWARD_DESTINATION. */
export const LOVELL_CANYON_PHONE_DISPLAY = formatPhoneDisplay(CALLACTION_DIGITS);
export const LOVELL_CANYON_PHONE_TEL = `tel:+1${CALLACTION_DIGITS}`;
export const LOVELL_CANYON_PHONE_SMS = `sms:+1${CALLACTION_DIGITS}`;
export const LOVELL_CANYON_EMAIL = "DrDuffySells@lovellcanyon.com";
export const LOVELL_CANYON_EMAIL_HREF = "mailto:DrDuffySells@lovellcanyon.com";
export const LOVELL_CANYON_CALENDLY_URL = "https://calendly.com/drjanduffy/showing";
export const REALSCOUT_AGENT_ENCODED_ID = "QWdlbnQtMjI1MDUw";
export const REALSCOUT_OFFICE_URL = "https://drjanduffy.realscout.com/";

/** Dr. Jan Duffy social profiles — used in footer and schema sameAs */
export const LOVELL_CANYON_SOCIAL = {
  facebook: "https://www.facebook.com/drjanduffy",
  instagram: "https://www.instagram.com/drjanduffy",
  linkedin: "https://www.linkedin.com/in/drjanduffy",
} as const;

export const LOVELL_CANYON_SOCIAL_PROFILES = Object.values(LOVELL_CANYON_SOCIAL);

/** Plain-language labels for links to the agent listing search (no vendor names). */
export const AGENT_LISTINGS_LINK_LABEL = "Browse Dr. Jan's Full Property Listings";
export const AGENT_LISTINGS_SECTION_TITLE = "More Nevada Properties from Dr. Jan Duffy";
export const AGENT_LISTINGS_SECTION_DESC =
  "Search land, homes, and other listings Dr. Jan Duffy represents through Berkshire Hathaway HomeServices Nevada Properties.";

export const LOVELL_CANYON_OFFICE = {
  street: "9406 W Lake Mead Blvd, Suite 100",
  city: "Las Vegas",
  region: "NV",
  postalCode: "89134",
  country: "US",
} as const;
