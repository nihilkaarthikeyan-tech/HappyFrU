import type { Metadata } from "next";
import {
  Wrench,
  Cloud,
  Headset,
  ClipboardCheck,
  Activity,
  Wallet,
  Sparkles,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import IconCard from "@/components/IconCard";
import CTABand from "@/components/CTABand";

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
            title="What We"
            highlight="Provide"
            subtitle="Everything is installed, managed, and supported by us — you keep driving, we handle the rest."
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROVIDED.map((item) => (
              <IconCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy py-14">
        <div className="container-page flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <Sparkles className="text-brand-yellow" size={22} />
          <p className="text-white font-semibold">
            No operational complexity for the fleet owner — install once, earn every ride.
          </p>
        </div>
      </section>

      <CTABand
        heading="Become a Fleet Partner"
        subheading="Tell us about your fleet — city, vehicle count, and vehicle type — and we'll get back with next steps."
        primaryHref="/contact"
        primaryLabel="Become a Fleet Partner"
      />
    </>
  );
}
