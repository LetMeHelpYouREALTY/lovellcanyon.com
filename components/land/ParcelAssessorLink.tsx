import {
  CLARK_COUNTY_ASSESSOR_GIS_URL,
  getClarkCountyAssessorParcelInquiryUrl,
} from "@/lib/lovell-canyon-assessor";
import { LAND_UI_LABELS } from "@/lib/lovell-canyon-glossary";

type ParcelAssessorLinkProps = {
  apn: string;
};

export function ParcelAssessorLink({ apn }: ParcelAssessorLinkProps) {
  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4 mb-6">
      <p className="text-sm text-slate-700 leading-relaxed">
        {LAND_UI_LABELS.assessorLookupIntro(apn)}{" "}
        <a
          href={getClarkCountyAssessorParcelInquiryUrl(apn)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-medium"
        >
          {LAND_UI_LABELS.clarkCountyAssessorLink}
        </a>{" "}
        or view the{" "}
        <a
          href={CLARK_COUNTY_ASSESSOR_GIS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-medium"
        >
          {LAND_UI_LABELS.clarkCountyAssessorGisLink}
        </a>
        .
      </p>
    </div>
  );
}
