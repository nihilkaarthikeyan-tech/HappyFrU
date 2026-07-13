import { MessageCircle, Phone, QrCode } from "lucide-react";
import { CONTACT_PHONE, WHATSAPP_LINK } from "@/lib/nav";
import TrackedLink from "./TrackedLink";

export default function CTABand({
  heading = "Ready to Grow Your Brand?",
  subheading = "Let's connect your brand with thousands of happy passengers every day.",
  primaryHref = "/contact",
  primaryLabel = "Start Your Campaign",
}: {
  heading?: string;
  subheading?: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="bg-brand-yellow">
      <div className="container-page py-10">
        <div className="rounded-2xl bg-brand-navy px-6 py-8 sm:px-10 sm:py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {heading}
            </h2>
            <p className="mt-2 text-white/80 max-w-xl">{subheading}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <TrackedLink
              href={primaryHref}
              event="cta_click"
              location="cta_band_primary"
              className="inline-flex items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-yellow-dark transition-colors whitespace-nowrap"
            >
              {primaryLabel}
            </TrackedLink>
            <TrackedLink
              href={WHATSAPP_LINK}
              event="whatsapp_click"
              location="cta_band"
              newTab
              className="inline-flex items-center gap-2 justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </TrackedLink>
            <TrackedLink
              href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
              event="phone_click"
              location="cta_band"
              className="inline-flex items-center gap-2 justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              <Phone size={16} />
              {CONTACT_PHONE}
            </TrackedLink>
          </div>

          <div className="hidden xl:flex flex-col items-center gap-1 text-white/80 text-xs shrink-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white">
              <QrCode size={40} className="text-brand-navy" />
            </div>
            Scan to Connect
          </div>
        </div>
      </div>
    </section>
  );
}
