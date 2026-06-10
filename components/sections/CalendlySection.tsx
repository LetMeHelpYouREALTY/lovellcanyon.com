import CalendlyWidget from "@/components/calendly/CalendlyWidget";
import { LOVELL_CANYON_CALENDLY_URL } from "@/lib/lovell-canyon-contact";

export default function CalendlySection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Schedule a Lovell Canyon Land Consultation
          </h2>
          <p className="text-slate-600">
            Pick a time that works for you. Dr. Jan Duffy will walk you through the parcels,
            access, and title details.
          </p>
        </div>
        <CalendlyWidget url={LOVELL_CANYON_CALENDLY_URL} height="700px" />
        <p className="text-center mt-6 text-sm text-slate-600">
          Calendar not loading?{" "}
          <a
            href={LOVELL_CANYON_CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Open scheduling page on Calendly
          </a>
        </p>
        <noscript>
          <p className="text-center mt-4">
            <a
              href={LOVELL_CANYON_CALENDLY_URL}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Schedule a consultation on Calendly
            </a>
          </p>
        </noscript>
      </div>
    </section>
  );
}
