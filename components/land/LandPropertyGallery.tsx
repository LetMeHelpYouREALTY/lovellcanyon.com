import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import type { LovellCanyonPhoto } from "@/lib/lovell-canyon-media";
import {
  LOVELL_CANYON_PHONE_DISPLAY,
  LOVELL_CANYON_PHONE_TEL,
} from "@/lib/lovell-canyon-contact";

type LandPropertyGalleryProps = {
  photos: LovellCanyonPhoto[];
};

export function LandPropertyGallery({ photos }: LandPropertyGalleryProps) {
  return (
    <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 text-center">
          Property Photos
        </h2>
        <p className="text-center text-slate-600 mb-10 max-w-2xl mx-auto">
          On-site views of the Lovell Canyon parcels. Contact Dr. Jan Duffy for additional
          photos or a site visit.
        </p>
        {photos.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center max-w-xl mx-auto">
            <p className="text-slate-600 mb-4">
              Additional on-site photos are being added. Call or text for current parcel images and
              to schedule a showing.
            </p>
            <Link
              href={LOVELL_CANYON_PHONE_TEL}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Phone className="h-4 w-4" aria-hidden />
              Call {LOVELL_CANYON_PHONE_DISPLAY}
            </Link>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <figure
              key={photo.key}
              className="relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
            >
              <Image
                src={photo.url}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
