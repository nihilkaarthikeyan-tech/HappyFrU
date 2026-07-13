import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/SocialIcons";
import { CONTACT_PHONE, WHATSAPP_LINK } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Contact | HappyFrU",
  description:
    "Get in touch with HappyFrU for advertiser, fleet partner, or investor inquiries.",
};

const CONTACT_METHODS = [
  {
    icon: Phone,
    label: "Phone",
    value: CONTACT_PHONE,
    href: `tel:${CONTACT_PHONE.replace(/\s/g, "")}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with our team",
    href: WHATSAPP_LINK,
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@happyfru.com",
    href: "mailto:hello@happyfru.com",
  },
  {
    icon: MapPin,
    label: "Company",
    value: "HappyFrU",
  },
];

const SOCIALS = [
  { Icon: FacebookIcon, label: "Facebook", href: "#" },
  { Icon: InstagramIcon, label: "Instagram", href: "#" },
  { Icon: LinkedinIcon, label: "LinkedIn", href: "#" },
  { Icon: YoutubeIcon, label: "YouTube", href: "#" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your campaign, fleet, or partnership"
        subtitle="Whether you're an advertiser, a fleet operator, or exploring an investment, we'd like to hear from you."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-10 items-start">
          {/* Contact info panel */}
          <Reveal className="h-full">
            <div className="relative h-full overflow-hidden rounded-3xl bg-brand-navy p-8 sm:p-10 text-white">
              {/* decorative glow */}
              <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-brand-yellow/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-brand-navy-light/40 blur-3xl" />

              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-yellow">
                  Contact
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Get in Touch
                </h2>
                <p className="mt-3 text-sm text-white/70 max-w-sm">
                  Reach out through any channel below — our team typically
                  replies within one business day.
                </p>

                <div className="mt-8 space-y-3">
                  {CONTACT_METHODS.map((m) => {
                    const inner = (
                      <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 transition-colors duration-300 group-hover:border-brand-yellow/40 group-hover:bg-white/10">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-yellow text-brand-navy transition-transform duration-300 group-hover:scale-110">
                          <m.icon size={19} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                            {m.label}
                          </div>
                          <div className="truncate text-sm font-semibold text-white">
                            {m.value}
                          </div>
                        </div>
                      </div>
                    );
                    return m.href ? (
                      <a
                        key={m.label}
                        href={m.href}
                        {...(m.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group block"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div key={m.label} className="group">
                        {inner}
                      </div>
                    );
                  })}
                </div>

                {/* Response badge */}
                <div className="mt-8 flex items-center gap-2.5 border-t border-white/10 pt-6 text-sm text-white/80">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-brand-yellow" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-yellow" />
                  </span>
                  Usually responds within 1 business day
                </div>

                {/* Socials */}
                <div className="mt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                    Follow us
                  </p>
                  <div className="mt-3 flex gap-2.5">
                    {SOCIALS.map(({ Icon, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-yellow hover:text-brand-navy"
                      >
                        <Icon size={16} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form card */}
          <Reveal delay={120}>
            <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 shadow-lg">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
