/**
 * Curated, verifiable places for fallback map list and ItemList schema.
 * Sources: USFS, NPS/BLM public sites, business websites (Sep 2026).
 */

import type { AmenityCategoryId } from "@/lib/lovell-canyon-amenity-config";
import { LOVELL_CANYON_GEO } from "@/lib/lovell-canyon-geo";

export type CuratedAmenityPlace = {
  id: string;
  name: string;
  category: AmenityCategoryId;
  address: string;
  schemaType: string;
  description?: string;
  latitude?: number;
  longitude?: number;
};

export const LOVELL_CANYON_CURATED_AMENITIES: CuratedAmenityPlace[] = [
  {
    id: "lovell-canyon-trailhead",
    name: "Lovell Canyon Trailhead",
    category: "parks",
    address: "End of Lovell Canyon Rd, Clark County, NV 89124",
    schemaType: "Park",
    description:
      "USFS trailhead at the north end of paved Lovell Canyon Road — access to Lovell Canyon Trail and La Madre Mountain Wilderness routes.",
    latitude: LOVELL_CANYON_GEO.trailhead.latitude,
    longitude: LOVELL_CANYON_GEO.trailhead.longitude,
  },
  {
    id: "red-rock-visitor-center",
    name: "Red Rock Canyon National Conservation Area Visitor Center",
    category: "parks",
    address: "3205 State Route 159, Las Vegas, NV 89161",
    schemaType: "Park",
    description:
      "BLM visitor center for Red Rock Canyon NCA — scenic loop, trails, and desert recreation east of Lovell Canyon.",
  },
  {
    id: "spring-mountains-nra-office",
    name: "Spring Mountains National Recreation Area (Forest Service office)",
    category: "parks",
    address: "4701 North Torrey Pines Drive, Las Vegas, NV 89130",
    schemaType: "Park",
    description:
      "Administrative office for Spring Mountains NRA, which includes Lovell Canyon and the Humboldt-Toiyabe National Forest west-side trailheads.",
  },
  {
    id: "mountain-springs-saloon",
    name: "Mountain Springs Saloon",
    category: "restaurants",
    address: "19050 NV-160, Mountain Springs, NV 89161",
    schemaType: "Restaurant",
    description:
      "NV-160 stop at Mountain Springs Summit between Las Vegas and Pahrump — bar and live music; Maria's Taco Shop is on site.",
  },
  {
    id: "marias-taco-shop",
    name: "Maria's Taco Shop",
    category: "restaurants",
    address: "19050 NV-160, Mountain Springs, NV 89161",
    schemaType: "Restaurant",
    description: "Mexican food at Mountain Springs Saloon on NV-160 — closest prepared food to the Lovell Canyon turnoff.",
  },
  {
    id: "summerlin-hospital",
    name: "Summerlin Hospital Medical Center",
    category: "healthcare",
    address: "657 Town Center Drive, Las Vegas, NV 89144",
    schemaType: "Hospital",
    description:
      "Full-service hospital in Summerlin — plan valley healthcare before extended stays in the canyon backcountry.",
  },
  {
    id: "spring-valley-hospital",
    name: "Spring Valley Hospital Medical Center",
    category: "healthcare",
    address: "5400 South Rainbow Boulevard, Las Vegas, NV 89118",
    schemaType: "Hospital",
    description: "Acute-care hospital in the southwest Las Vegas Valley.",
  },
  {
    id: "red-rock-country-club",
    name: "Red Rock Country Club",
    category: "golf",
    address: "2250 Red Rock Canyon Road, Las Vegas, NV 89135",
    schemaType: "GolfCourse",
    description: "Private golf club in the Red Rock area west of the Las Vegas Valley.",
  },
  {
    id: "bali-hai-golf",
    name: "Bali Hai Golf Club",
    category: "golf",
    address: "5160 South Las Vegas Boulevard, Las Vegas, NV 89119",
    schemaType: "GolfCourse",
    description: "Public golf on the south end of the Las Vegas Strip.",
  },
];

export type AmenityWrittenSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

/** Server-rendered hyperlocal copy — no invented ratings or distances. */
export const LOVELL_CANYON_AMENITY_WRITTEN_SECTIONS: AmenityWrittenSection[] = [
  {
    id: "dining",
    title: "Dining on NV-160 and in the valley",
    paragraphs: [
      "Lovell Canyon itself is backcountry terrain without restaurants or grocery stores at the trailheads. The nearest on-highway food stop is Mountain Springs Saloon on NV-160 at Mountain Springs Summit, where Maria's Taco Shop serves Mexican food.",
      "For full-service dining and groceries, most landowners and visitors stock up in the Las Vegas Valley before driving west on NV-160 past Mountain Springs and turning north on paved Lovell Canyon Road.",
    ],
  },
  {
    id: "parks-recreation",
    title: "Parks, trails, and public land",
    paragraphs: [
      "Lovell Canyon sits within the Spring Mountains National Recreation Area and near Red Rock Canyon National Conservation Area and La Madre Mountain Wilderness. The USFS Lovell Canyon Trailhead at the end of paved Lovell Canyon Road is the primary access for hiking and equestrian trails.",
      "Dispersed camping and unpaved tributary roads are described in regional trail guides; 4WD may be required on some routes. Always check current USFS and BLM regulations before camping or building access.",
    ],
  },
  {
    id: "golf",
    title: "Golf",
    paragraphs: [
      "There is no golf course in Lovell Canyon. West-valley courses such as Red Rock Country Club and resort courses on the Las Vegas Strip are reachable by car after returning to NV-160 and continuing toward the valley.",
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare and pharmacies",
    paragraphs: [
      "There are no hospitals or urgent-care clinics in Lovell Canyon. Mountain Springs is an unincorporated pass community with a fire station and saloon, not medical services.",
      "Summerlin Hospital Medical Center and Spring Valley Hospital Medical Center are examples of full-service hospitals in the Las Vegas Valley. Carry a charged phone and plan valley medical care before remote land visits.",
    ],
  },
  {
    id: "shopping-grocery",
    title: "Shopping and groceries",
    paragraphs: [
      "Plan fuel, water, and groceries in Las Vegas or Pahrump before heading up NV-160. Wikipedia and local guides note Mountain Springs has public buildings such as a fire house and saloon, but not a grocery store at the summit.",
      "Major supermarkets and shopping centers cluster in the Las Vegas metro — especially west and southwest valley neighborhoods reached after descending NV-160 toward the city.",
    ],
  },
  {
    id: "commute",
    title: "Drive times to key destinations (approximate)",
    paragraphs: [
      "Site copy describes Lovell Canyon as roughly 40–45 minutes from the Las Vegas Valley via NV-160 past Mountain Springs — actual drive time varies with weather, traffic, and your starting point in the valley.",
      "Harry Reid International Airport and the Las Vegas Strip are valley destinations typically reached by continuing east on NV-160 toward the city; allow extra time for resort traffic near the Strip.",
      "Downtown Summerlin and Red Rock Canyon Visitor Center are west-valley landmarks often combined with canyon trips for supplies or recreation.",
    ],
  },
];

export const LOVELL_CANYON_AMENITIES_FAQ: { question: string; answer: string }[] = [
  {
    question: "What grocery stores are near Lovell Canyon?",
    answer:
      "There are no grocery stores in Lovell Canyon or at the Mountain Springs summit on NV-160; stock up in the Las Vegas Valley or Pahrump before driving to the canyon.",
  },
  {
    question: "How far is Lovell Canyon from the Las Vegas Strip?",
    answer:
      "Lovell Canyon is commonly described as about 40–45 minutes from the Las Vegas Valley by car via NV-160, though Strip traffic and your starting point can add time.",
  },
  {
    question: "Are there hospitals near Lovell Canyon?",
    answer:
      "No — hospitals and urgent care are in the Las Vegas metro, such as Summerlin Hospital Medical Center and Spring Valley Hospital Medical Center, not in the canyon.",
  },
  {
    question: "Where is the closest restaurant to Lovell Canyon?",
    answer:
      "Maria's Taco Shop at Mountain Springs Saloon (19050 NV-160, Mountain Springs) is the nearest prepared-food stop on the highway before the Lovell Canyon Road turnoff.",
  },
  {
    question: "What recreation is available in Lovell Canyon?",
    answer:
      "The USFS Lovell Canyon Trailhead provides hiking and equestrian access to trails in the La Madre Mountain Wilderness, with Red Rock Canyon NCA nearby for additional desert recreation.",
  },
  {
    question: "Is there gas at the Lovell Canyon turnoff?",
    answer:
      "Fuel is not available at the Lovell Canyon Road intersection; fill up in Las Vegas or Pahrump before traveling NV-160 into the Spring Mountains.",
  },
  {
    question: "What zip code is Lovell Canyon in?",
    answer:
      "Lovell Canyon land in Clark County uses zip code 89124 — the same zip as Mountain Springs on NV-160, not Pahrump in Nye County.",
  },
  {
    question: "Who can help me buy land in Lovell Canyon?",
    answer:
      "Dr. Jan Duffy, Land Specialist with Berkshire Hathaway HomeServices Nevada Properties, lists fee simple raw land parcels in Lovell Canyon — call or text the number on this site for parcel details and access information.",
  },
];

export function getCuratedPlacesByCategory(category: AmenityCategoryId): CuratedAmenityPlace[] {
  return LOVELL_CANYON_CURATED_AMENITIES.filter((place) => place.category === category);
}
