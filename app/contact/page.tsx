import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { CONTACT_PHONE, WHATSAPP_LINK } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Contact | HappyFrU",
  description:
    "Get in touch with HappyFrU for advertiser, fleet partner, or investor inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your campaign, fleet, or partnership"
        subtitle="Whether you're an advertiser, a fleet operator, or exploring an investment, we'd like to hear from you."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-4">
              Get in Touch
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-yellow-light text-brand-navy">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-brand-navy">
                    Phone
                  </div>
                  <a
                    href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                    className="text-sm text-brand-navy/70 hover:text-brand-navy"
                  >
                    {CONTACT_PHONE}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-yellow-light text-brand-navy">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-brand-navy">
                    WhatsApp
                  </div>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-navy/70 hover:text-brand-navy"
                  >
                    Chat with our team
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-yellow-light text-brand-navy">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-brand-navy">
                    Email
                  </div>
                  <a
                    href="mailto:hello@happyfru.com"
                    className="text-sm text-brand-navy/70 hover:text-brand-navy"
                  >
                    hello@happyfru.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-yellow-light text-brand-navy">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-brand-navy">
                    Company
                  </div>
                  <p className="text-sm text-brand-navy/70">
                    HappyFrU
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
