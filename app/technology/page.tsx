import type { Metadata } from "next";
import {
  Smartphone,
  Activity,
  Satellite,
  HeartPulse,
  Siren,
  RefreshCw,
  Cloud,
  CalendarClock,
  MonitorPlay,
  LineChart,
  ArrowRight,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import IconCard from "@/components/IconCard";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Technology | HappyFrU",
  description:
    "Android-based smart displays with secure offline playback, device health monitoring, GPS tracking, heartbeat monitoring, and emergency broadcast — the technology behind HappyFrU's DOOH network.",
};

const TECH_CAPABILITIES = [
  {
    icon: Smartphone,
    title: "Android-Based Smart Displays",
    description:
      "Each display operates independently with secure offline playback and automatic synchronization whenever internet connectivity is restored.",
  },
  {
    icon: Activity,
    title: "Device Health Monitoring",
    description:
      "Every installed display continuously reports operational health, playback status, and internet connectivity back to the admin dashboard.",
  },
  {
    icon: Satellite,
    title: "GPS-Based Location Tracking",
    description:
      "Live location data from every screen enables route-level and city-level targeting, plus verification of where a campaign actually played.",
  },
  {
    icon: HeartPulse,
    title: "Heartbeat Monitoring",
    description:
      "Devices send regular heartbeat signals so the network always knows which screens are online, offline, or need attention.",
  },
  {
    icon: Siren,
    title: "Emergency Broadcast Capability",
    description:
      "Critical alerts can be pushed instantly across the network, overriding scheduled content when it matters.",
  },
  {
    icon: RefreshCw,
    title: "Auto-Sync on Reconnect",
    description:
      "Displays cache content locally and sync automatically the moment connectivity returns — no manual intervention required.",
  },
];

const ARCHITECTURE_STEPS = [
  { icon: Cloud, label: "Cloud CMS" },
  { icon: CalendarClock, label: "Scheduler" },
  { icon: MonitorPlay, label: "Android Player" },
  { icon: LineChart, label: "Analytics" },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        title="Built like infrastructure, not a screen network"
        subtitle="A closer look at how HappyFrU keeps campaigns running reliably across hundreds of independently operating Android displays."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            title="Under the"
            highlight="Hood"
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TECH_CAPABILITIES.map((item) => (
              <IconCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title="How Content Reaches a Screen" />
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            {ARCHITECTURE_STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow text-brand-navy">
                    <step.icon size={26} />
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {step.label}
                  </span>
                </div>
                {i < ARCHITECTURE_STEPS.length - 1 && (
                  <ArrowRight
                    className="hidden sm:block text-white/40 shrink-0"
                    size={22}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-white/60 text-sm max-w-xl mx-auto">
            Content is scheduled in the cloud, pushed to the Android player on
            each display, and every playback event feeds back into real-time
            analytics — a closed loop from upload to reporting.
          </p>
        </div>
      </section>

      <CTABand
        heading="Talk to us about the platform"
        subheading="For technical evaluators and investors — request a deeper architecture walkthrough."
        primaryHref="/contact"
        primaryLabel="Request a Walkthrough"
      />
    </>
  );
}
