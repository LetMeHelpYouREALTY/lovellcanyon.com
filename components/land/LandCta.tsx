import Link from "next/link";
import { Phone } from "lucide-react";
import {
  LOVELL_CANYON_PHONE_DISPLAY,
  LOVELL_CANYON_PHONE_SMS,
  LOVELL_CANYON_PHONE_TEL,
} from "@/lib/lovell-canyon-contact";
import { LOVELL_CANYON_BRAND } from "@/lib/lovell-canyon-brand";

type LandCtaProps = {
  headline?: string;
  subheadline?: string;
};

export default function LandCta({
  headline = "Inquire About These Parcels",
  subheadline = LOVELL_CANYON_BRAND.ctaSubheadline,
}: LandCtaProps) {
  return (
    <section className="py-16 md:py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{headline}</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{subheadline}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={LOVELL_CANYON_PHONE_TEL}
            className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
          >
            <Phone className="h-5 w-5 mr-2" />
            Call {LOVELL_CANYON_PHONE_DISPLAY}
          </a>
          <a
            href={LOVELL_CANYON_PHONE_SMS}
            className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
          >
            Text {LOVELL_CANYON_PHONE_DISPLAY}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-md font-bold text-lg transition-colors"
          >
            Send an Inquiry
          </Link>
        </div>
        <p className="mt-6 text-blue-200 text-sm">
          Dr. Jan Duffy, REALTOR® | License S.0197614.LLC | Berkshire Hathaway HomeServices Nevada
          Properties
        </p>
      </div>
    </section>
  );
}
