"use client";

import {
  REALSCOUT_AGENT_ENCODED_ID,
  REALSCOUT_OFFICE_URL,
} from "@/lib/lovell-canyon-contact";

export default function RealScoutOfficeWidget() {
  return (
    <section className="py-12 md:py-16 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Dr. Jan Duffy Office Listings
          </h2>
          <p className="text-slate-600">
            Browse live MLS listings from Berkshire Hathaway HomeServices Nevada Properties.
          </p>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: `<realscout-office-listings
              agent-encoded-id="${REALSCOUT_AGENT_ENCODED_ID}"
              sort-order="NEWEST"
              listing-status="For Sale"
              property-types=",SFR,MF,TC,LD"
            ></realscout-office-listings>`,
          }}
        />
        <p className="text-center mt-6">
          <a
            href={REALSCOUT_OFFICE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            View all office listings on RealScout
          </a>
        </p>
      </div>
    </section>
  );
}
