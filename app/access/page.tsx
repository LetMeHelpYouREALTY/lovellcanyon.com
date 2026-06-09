import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import LandPageHeroSection from "@/components/land/LandPageHeroSection";
import LandCta from "@/components/land/LandCta";
import { getLovellCanyonPageMetadataWithHero } from "@/lib/lovell-canyon-seo";
import { LOVELL_CANYON_AREA } from "@/lib/lovell-canyon-area";
import BelowHeroEngagement from "@/components/sections/BelowHeroEngagement";

const LOCAL_DIRT_ROADS = [
  "Cabin Canyon Rd",
  "Crackling Leaf Wy",
  "Ringtail Feather Dr",
  "White Winter Dr",
  "Gavern View Dr",
  "Charleston Blvd",
] as const;

export async function generateMetadata(): Promise<Metadata> {
  return getLovellCanyonPageMetadataWithHero(
    "/access",
    "Lovell Canyon Access | NV-160 & Lovell Canyon Rd Directions",
    "How to reach Lovell Canyon land from Las Vegas: NV-160 past Mountain Springs, north on paved Lovell Canyon Rd, then local dirt roads. Clark County NV 89120."
  );
}

export default function AccessPage() {
  return (
    <>
      <Navbar />
      <main>
        <LandPageHeroSection
          pathname="/access"
          badge="Directions"
          title="Access & Roads"
          subtitle="Primary access via NV-160 and Lovell Canyon Rd (paved). Local parcel access via dirt roads."
        />

        <BelowHeroEngagement />
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl space-y-10 text-slate-700 text-lg leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">From Las Vegas / Henderson</h2>
              <ol className="list-decimal pl-6 space-y-3">
                <li>Take <strong>NV-160</strong> west (Blue Diamond Rd / Pahrump Highway).</li>
                <li>Drive over the Mountain Springs summit area, west of Mountain Springs.</li>
                <li>
                  Turn <strong>right (north)</strong> on <strong>Lovell Canyon Rd</strong> — paved
                  primary access (regional guides cite {LOVELL_CANYON_AREA.lovellCanyonRoadMiles}{" "}
                  on {LOVELL_CANYON_AREA.lovellCanyonRoadSurface} road).
                </li>
                <li>
                  Continue north on Lovell Canyon Rd; local access to the parcels continues on{" "}
                  <strong>unpaved roads</strong> as mapped for the subdivision.
                </li>
              </ol>
              <p className="mt-4 text-base text-slate-600">{LOVELL_CANYON_AREA.highwayAccess}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Local dirt roads</h2>
              <p className="mb-4">
                Per parcel mapping, local roads in the area include:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                {LOCAL_DIRT_ROADS.map((road) => (
                  <li key={road}>{road}</li>
                ))}
              </ul>
              <p className="mt-4 text-base text-slate-600">
                Unpaved tributary roads in Lovell Canyon may require high-clearance or 4WD
                depending on conditions. Contact Dr. Jan Duffy before visiting for current road
                conditions and exact parcel access.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Before you visit</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Carry water, fuel, and a charged phone; cell service can be spotty in canyon areas.</li>
                <li>Respect private property boundaries and public land rules.</li>
                <li>Schedule a showing or access consultation: call or text <strong>702-222-1964</strong>.</li>
              </ul>
            </div>
          </div>
        </section>
        <LandCta subheadline="Get exact parcel access and a guided visit — call or text 702-222-1964." />
      </main>
      <Footer />
    </>
  );
}
