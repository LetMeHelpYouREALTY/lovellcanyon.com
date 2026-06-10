/**
 * Area facts from public sources (Parallel web search, Jun 2026).
 * Used for location/access pages — no market stats or listing prices invented here.
 */

export const LOVELL_CANYON_AREA = {
  name: "Lovell Canyon",
  county: "Clark County",
  state: "Nevada",
  postalCode: "89124",
  /** birdandhike.com; lasvegasareatrails.com cites ~12 miles */
  lovellCanyonRoadMiles: "approximately 11–12 miles",
  lovellCanyonRoadSurface: "paved",
  highwayAccess:
    "NV-160 (Blue Diamond Rd) west of Mountain Springs in the Spring Mountains; turn north on Lovell Canyon Rd near Mile Marker 24",
  /** Geographic context — Clark County canyon, not Pahrump (Nye County). */
  areaContext:
    "In the Spring Mountains west of the Las Vegas Valley, roughly 40–45 minutes from the city via NV-160 past Mountain Springs — Clark County, not the Pahrump valley (Nye County).",
  /** NV-160 is locally called the Pahrump Highway but Lovell Canyon turnoff is before Nye County. */
  highwayNote:
    "NV-160 (Blue Diamond Rd; locally signed as the Pahrump Highway) west past Mountain Springs, then north on paved Lovell Canyon Rd",
  publicLandContext: [
    "Red Rock Canyon National Conservation Area (BLM)",
    "Spring Mountains National Recreation Area (USFS)",
    "Rainbow Mountain Wilderness",
    "La Madre Mountain Wilderness",
  ],
  /** Mapcarta ~4,278 ft; topographic-map.com average ~5,381 ft in canyon — varies by site */
  elevationNote:
    "Elevation varies within the canyon; public topographic sources cite roughly 4,300–5,400 feet depending on location.",
  /** See lib/lovell-canyon-geo.ts — Apple Maps center + USFS trailhead */
  mapCenterCoordinates: "36.13286° N, 115.56287° W",
  recreationNote:
    "Lovell Canyon Road provides access to trailheads, dispersed camping areas, and tributary unpaved roads (4WD recommended on some routes per local trail guides).",
  trailAccessNote:
    "Lovell Canyon Trail and related loops in the La Madre Mountains Wilderness are commonly reached via Lovell Canyon Rd (paved) rather than rugged alternate routes.",
} as const;

export const AREA_SOURCES = [
  { label: "Lovell Canyon Road overview", url: "https://www.birdandhike.com/Hike/Red_Rocks/Roads_RR/LovellCynRd/_LovCynRd.htm" },
  { label: "Lovell Canyon roads & trails", url: "https://lasvegasareatrails.com/lovell-canyon-roads-lovell-canyon-nevada" },
  { label: "Lovell Canyon Trail (AllTrails)", url: "https://www.alltrails.com/trail/us/nevada/lovell-canyon-trail" },
] as const;
