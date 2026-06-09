import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import LandPageHero from "@/components/land/LandPageHero";
import LandCta from "@/components/land/LandCta";
import { getLovellCanyonPageMetadata } from "@/lib/lovell-canyon-seo";
import { AREA_SOURCES, LOVELL_CANYON_AREA } from "@/lib/lovell-canyon-area";
import { LOVELL_CANYON_LOCATION } from "@/lib/lovell-canyon-parcels";

export async function generateMetadata(): Promise<Metadata> {
  return getLovellCanyonPageMetadata(
    "/location",
    "Lovell Canyon NV Location | Clark County Land 89120",
    "Where is Lovell Canyon? Clark County Nevada 89120, west of the Las Vegas Valley near NV-160. Public land context, elevation, and area overview for raw land parcels."
  );
}

export default function LocationPage() {
  return (
    <>
      <Navbar />
      <main>
        <LandPageHero
          badge="Clark County NV"
          title="Lovell Canyon Location"
          subtitle={`${LOVELL_CANYON_AREA.name}, ${LOVELL_CANYON_AREA.county}, ${LOVELL_CANYON_AREA.state} ${LOVELL_CANYON_AREA.postalCode}`}
        />
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl space-y-8 text-slate-700 text-lg leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Parcel location</h2>
              <p>
                The offered parcels (Lot 2 and Lot 3) are in{" "}
                <strong>{LOVELL_CANYON_LOCATION.locality}</strong>,{" "}
                <strong>{LOVELL_CANYON_LOCATION.county}</strong>, Nevada{" "}
                <strong>{LOVELL_CANYON_LOCATION.postalCode}</strong>. Assessor mapping:{" "}
                {LOVELL_CANYON_LOCATION.section}, {LOVELL_CANYON_LOCATION.township},{" "}
                {LOVELL_CANYON_LOCATION.range}, map {LOVELL_CANYON_LOCATION.assessorMap}.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Area context</h2>
              <p>
                Lovell Canyon lies west of the Las Vegas Valley, accessed from NV-160 toward
                Pahrump. The canyon is described in regional guides as backcountry terrain with
                paved primary road access and a network of unpaved tributary roads.
              </p>
              <p className="mt-4">{LOVELL_CANYON_AREA.elevationNote}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Public land nearby</h2>
              <p className="mb-4">
                Lovell Canyon Road runs through areas adjacent to or within federally managed
                lands, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                {LOVELL_CANYON_AREA.publicLandContext.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Recreation & roads</h2>
              <p>{LOVELL_CANYON_AREA.recreationNote}</p>
              <p className="mt-4">{LOVELL_CANYON_AREA.trailAccessNote}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Related pages</h2>
              <p>
                <Link href="/access" className="text-blue-600 font-semibold hover:underline">
                  Access & driving directions
                </Link>
                {" · "}
                <Link href="/parcels" className="text-blue-600 font-semibold hover:underline">
                  Parcel details
                </Link>
              </p>
            </div>
            <div className="border-t border-slate-200 pt-8">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Area references
              </h3>
              <ul className="text-sm space-y-2">
                {AREA_SOURCES.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <LandCta />
      </main>
      <Footer />
    </>
  );
}
