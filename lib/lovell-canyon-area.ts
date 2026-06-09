/**
 * Area facts from public sources (Parallel web search, Jun 2026).
 * Used for location/access pages — no market stats or listing prices invented here.
 */

export const LOVELL_CANYON_AREA = {
  name: "Lovell Canyon",
  county: "Clark County",
  state: "Nevada",
  postalCode: "89120",
  /** birdandhike.com; lasvegasareatrails.com cites ~12 miles */
  lovellCanyonRoadMiles: "approximately 11–12 miles",
  lovellCanyonRoadSurface: "paved",
  highwayAccess:
    "NV-160 (Blue Diamond Rd / Pahrump Highway), west of Mountain Springs; turn north on Lovell Canyon Rd near Mile Marker 24",
  publicLandContext: [
    "Red Rock Canyon National Conservation Area (BLM)",
    "Spring Mountains National Recreation Area (USFS)",
    "Rainbow Mountain Wilderness",
    "La Madre Mountain Wilderness",
  ],
  /** Mapcarta ~4,278 ft; topographic-map.com average ~5,381 ft in canyon — varies by site */
  elevationNote:
    "Elevation varies within the canyon; public topographic sources cite roughly 4,300–5,400 feet depending on location.",
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
