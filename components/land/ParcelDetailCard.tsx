import Link from "next/link";
import type { LovellCanyonParcel } from "@/lib/lovell-canyon-parcels";
import { CLARK_COUNTY_TAX_PORTAL_URL } from "@/lib/lovell-canyon-title-schedule-b";
import { ParcelPendingSpecs } from "@/components/land/ParcelPendingSpecs";
import {
  LAND_UI_LABELS,
  parcelCardTitle,
  parcelNumberLine,
} from "@/lib/lovell-canyon-glossary";

type ParcelDetailCardProps = {
  parcel: LovellCanyonParcel;
  showParcelLink?: boolean;
};

export default function ParcelDetailCard({ parcel, showParcelLink = true }: ParcelDetailCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 md:p-8 h-full">
      <h2 className="text-xl font-bold text-slate-900 mb-1">{parcelCardTitle(parcel.label)}</h2>
      <p className="font-mono text-blue-700 mb-6">{parcelNumberLine(parcel.apn)}</p>

      <dl className="space-y-4 mb-8">
        <div className="border-b border-slate-100 pb-3">
          <dt className="text-slate-600 font-medium mb-1">{LAND_UI_LABELS.ownershipType}</dt>
          <dd className="text-slate-900">{parcel.estate}</dd>
        </div>
        <div className="border-b border-slate-100 pb-3">
          <dt className="text-slate-600 font-medium mb-1">{LAND_UI_LABELS.certificateLot}</dt>
          <dd className="text-slate-900">{parcel.certificateLot}</dd>
        </div>
        <div className="border-b border-slate-100 pb-3">
          <dt className="text-slate-600 font-medium mb-2">{LAND_UI_LABELS.scheduleAExceptions}</dt>
          <dd className="text-slate-800 text-sm leading-relaxed">{parcel.scheduleAExceptions}</dd>
        </div>
        <div className="border-b border-slate-100 pb-3">
          <dt className="text-slate-600 font-medium mb-2">{LAND_UI_LABELS.legalDescription}</dt>
          <dd className="text-slate-800 text-sm leading-relaxed">{parcel.legalDescription}</dd>
        </div>
        <div className="border-b border-slate-100 pb-3">
          <dt className="text-slate-600 font-medium mb-2">{LAND_UI_LABELS.alternateDescription}</dt>
          <dd className="text-slate-800 text-sm leading-relaxed">{parcel.alternateDescription}</dd>
        </div>
        <div className="border-b border-slate-100 pb-3">
          <dt className="text-slate-600 font-medium mb-1">
            {LAND_UI_LABELS.propertyTaxes(parcel.scheduleBItemNumber)}
          </dt>
          <dd className="text-slate-900">
            Fiscal year {parcel.propertyTaxFiscalYear}: {parcel.propertyTaxStatus} (
            {parcel.propertyTaxAmountPaid} total).
          </dd>
          <dd className="text-sm mt-1">
            <a
              href={CLARK_COUNTY_TAX_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {LAND_UI_LABELS.clarkCountyTaxLink}
            </a>
          </dd>
        </div>
      </dl>

      <div className="mb-6">
        <ParcelPendingSpecs apn={parcel.apn} />
      </div>

      {showParcelLink && (
        <Link
          href={`/parcels/${parcel.slug}`}
          className="text-blue-600 font-semibold hover:underline"
        >
          Full {parcel.label} page →
        </Link>
      )}
    </div>
  );
}
