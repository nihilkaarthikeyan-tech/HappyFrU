import type { Metadata } from "next";
import {
  Wrench,
  Cloud,
  Headset,
  ClipboardCheck,
  Activity,
  Wallet,
  Sparkles,
  FileText,
  Truck,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import IconCard from "@/components/IconCard";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import WaveDivider from "@/components/WaveDivider";
import FleetPartnerForm from "@/components/FleetPartnerForm";

export const metadata: Metadata = {
  title: "Fleet Partners | HappyFrU",
  description:
    "Earn more from every ride. Join the HappyFrU network with professional installation, cloud-managed devices, technical support, and monthly earnings — zero operational complexity.",
};

const PROVIDED = [
  {
    icon: Wrench,
    title: "Professional Installation",
    description:
      "Our team handles device installation in your vehicle — no technical work required from you.",
  },
  {
    icon: Cloud,
    title: "Cloud-Managed Devices",
    description:
      "Displays are monitored and updated remotely, so content and software stay current automatically.",
  },
  {
    icon: Headset,
    title: "Technical Support",
    description:
      "Dedicated support for any device or connectivity issue, so downtime stays minimal.",
  },
  {
    icon: ClipboardCheck,
    title: "Regular Maintenance",
    description:
      "Scheduled upkeep keeps every display running and every ride earning.",
  },
  {
    icon: Activity,
    title: "Performance Monitoring",
    description:
      "Device health and playback are tracked continuously from the admin dashboard.",
  },
  {
    icon: Wallet,
    title: "Monthly Earnings",
    description:
      "Predictable, recurring payouts for every vehicle enrolled in the network.",
  },
];

const STEPS = [
  {
    icon: FileText,
    title: "Apply",
    description:
      "Tell us your city, vehicle type, and fleet size. We confirm eligibility and terms.",
  },
  {
    icon: Truck,
    title: "We Install",
    description:
      "Our team professionally fits and configures the display in your vehicle — free of hassle.",
  },
  {
    icon: Wallet,
    title: "You Earn",
    description:
      "Start earning recurring monthly payouts while you drive. We handle everything else.",
  },
];

export default function FleetPartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Fleet Partners"
        title="Earn More From Every Ride"
        subtitle="Turn your vehicle into an earning asset. Fleet owners and drivers generate additional monthly revenue simply by joining the HappyFrU network — with zero operational complexity."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="What You Get"
            title="What We"
            highlight="Provide"
            subtitle="Everything is installed, managed, and supported by us — you keep driving, we handle the rest."
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROVIDED.map((item, i) => (
              <IconCard key={item.title} {...item} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      <WaveDivider top="bg-white" bottom="text-brand-yellow" />
      <section className="bg-brand-yellow pt-4 pb-16 sm:pb-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Getting Started"
            title="How You"
            highlight="Get Started"
            subtitle="Three simple steps from application to earning."
            tone="onYellow"
          />
          <div className="mt-12 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 120}>
                <div className="group h-full rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-navy text-white transition-transform duration-300 group-hover:scale-110">
                    <step.icon size={24} />
                  </div>
                  <div className="mt-4 text-xs font-bold uppercase tracking-wider text-brand-yellow-dark">
                    Step {i + 1}
                  </div>
                  <h3 className="mt-1 font-bold text-brand-navy">{step.title}</h3>
                  <p className="mt-2 text-sm text-brand-navy/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <WaveDivider top="bg-brand-yellow" bottom="text-white" />

      <section className="pb-16 sm:pb-20">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 rounded-2xl bg-brand-navy px-6 py-8 text-center">
              <Sparkles className="text-brand-yellow" size={22} />
              <p className="font-semibold text-white">
                No operational complexity for the fleet owner — install once,
                earn every ride.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="apply" className="scroll-mt-24 pb-16 sm:pb-20">
        <div className="container-page max-w-xl mx-auto">
          <SectionHeading
            eyebrow="Apply"
            title="Become a"
            highlight="Fleet Partner"
            subtitle="Tell us about your fleet — city, vehicle count, and vehicle type — and we'll get back with next steps."
          />
          <Reveal delay={100} className="mt-8">
            <FleetPartnerForm />
          </Reveal>
        </div>
      </section>

      <CTABand
        heading="Become a Fleet Partner"
        subheading="Tell us about your fleet — city, vehicle count, and vehicle type — and we'll get back with next steps."
        primaryHref="#apply"
        primaryLabel="Become a Fleet Partner"
      />
    </>
  );
}
