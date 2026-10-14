"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import WhenVisible from "@/components/shared/WhenVisible";
import {
  LOVELL_CANYON_AMENITY_CITY,
  LOVELL_CANYON_AMENITY_PAGE_PATH,
} from "@/lib/lovell-canyon-amenity-config";
import { LOVELL_CANYON_AREA } from "@/lib/lovell-canyon-area";

const CommunityAmenityMap = dynamic(() => import("@/components/maps/CommunityAmenityMap"), {
  ssr: false,
  loading: () => (
    <div
      className="h-[360px] md:h-[480px] rounded-xl bg-slate-100 animate-pulse border border-slate-200"
      aria-hidden="true"
    />
  ),
});

type NearbyAmenitiesSectionProps = {
  /** Shorter heading for secondary pages */
  variant?: "home" | "inline";
  showMap?: boolean;
};

export default function NearbyAmenitiesSection({
  variant = "home",
  showMap = true,
}: NearbyAmenitiesSectionProps) {
  const headingId = "nearby-amenities-heading";
  const title =
    variant === "home"
      ? `Life Near ${LOVELL_CANYON_AREA.name}`
      : `What's Nearby ${LOVELL_CANYON_AREA.name}`;

  return (
    <section
      className="py-16 md:py-20 bg-slate-50 border-y border-slate-200"
      aria-labelledby={headingId}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="max-w-3xl mb-8">
          <h2 id={headingId} className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {title}
          </h2>
          <p className="text-slate-700 text-lg leading-relaxed">
            Explore parks, NV-160 dining stops, and valley services around{" "}
            {LOVELL_CANYON_AREA.name}, Clark County {LOVELL_CANYON_AREA.postalCode}. Raw land here
            is backcountry — plan groceries, fuel, and healthcare in {LOVELL_CANYON_AMENITY_CITY}{" "}
            before you head up the canyon.
          </p>
          <p className="mt-4">
            <Link
              href={LOVELL_CANYON_AMENITY_PAGE_PATH}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              View full nearby amenities guide →
            </Link>
          </p>
        </div>

        {showMap && (
          <WhenVisible minHeight="420px">
            <CommunityAmenityMap compact showStaticList={false} />
          </WhenVisible>
        )}
      </div>
    </section>
  );
}
