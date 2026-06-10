import Link from "next/link";
import { PARCEL_PLACEHOLDER_FIELDS } from "@/lib/lovell-canyon-parcels";
import {
  LOVELL_CANYON_PHONE_DISPLAY,
  LOVELL_CANYON_PHONE_TEL,
} from "@/lib/lovell-canyon-contact";

type ParcelPendingSpecsProps = {
  apn: string;
};

/** Specs awaiting MLS/title verification — avoids nine blank "request info" rows. */
export function ParcelPendingSpecs({ apn }: ParcelPendingSpecsProps) {
  const fieldList = PARCEL_PLACEHOLDER_FIELDS.map((f) => f.label.toLowerCase()).join(", ");

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
        Additional details
      </h3>
      <p className="text-sm text-slate-600 leading-relaxed">
        {/* TODO-VERIFY: parcel specs for APN {apn} */}
        Current {fieldList} are available on request.{" "}
        <Link href={LOVELL_CANYON_PHONE_TEL} className="text-blue-600 hover:underline font-medium">
          Call or text {LOVELL_CANYON_PHONE_DISPLAY}
        </Link>{" "}
        or{" "}
        <Link href="/contact" className="text-blue-600 hover:underline font-medium">
          contact Dr. Jan Duffy
        </Link>{" "}
        for verified parcel specifications before closing.
      </p>
    </div>
  );
}
