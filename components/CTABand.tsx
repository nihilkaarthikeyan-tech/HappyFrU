import { MessageCircle, QrCode } from "lucide-react";
import { CONTACTS } from "@/lib/nav";
import TrackedLink from "./TrackedLink";
import Reveal from "./Reveal";

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
        <Reveal className="rounded-2xl bg-brand-navy px-6 py-8 sm:px-10 sm:py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
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
              className="inline-flex items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-brand-navy transition-all duration-300 hover:bg-brand-yellow-dark hover:scale-105 whitespace-nowrap"
            >
              {primaryLabel}
            </TrackedLink>
            {CONTACTS.map((c) => (
              <div
                key={c.name}
                className="inline-flex items-center gap-1 rounded-full border border-white/40 pl-4 pr-1.5 py-1.5 text-sm font-semibold text-white"
              >
                <TrackedLink
                  href={`tel:${c.phone.replace(/\s/g, "")}`}
                  event="phone_click"
                  location="cta_band"
                  className="whitespace-nowrap transition-colors duration-300 hover:text-brand-yellow"
                >
                  {c.name} · {c.phone}
                </TrackedLink>
                <TrackedLink
                  href={`https://wa.me/${c.whatsappNumber}`}
                  event="whatsapp_click"
                  location="cta_band"
                  newTab
                  aria-label={`Chat with ${c.name} on WhatsApp`}
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:bg-white/10 hover:scale-105"
                >
                  <MessageCircle size={15} />
                </TrackedLink>
              </div>
            ))}
          </div>

          <div className="hidden xl:flex flex-col items-center gap-1 text-white/80 text-xs shrink-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white">
              <QrCode size={40} className="text-brand-navy" />
            </div>
            Scan to Connect
          </div>
        </Reveal>
      </div>
    </section>
  );
}
