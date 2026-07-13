import type { Metadata } from "next";
import {
  Building2,
  Briefcase,
  GraduationCap,
  ShoppingBag,
  Landmark,
  RouteIcon,
  Car,
  Truck,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Industries | HappyFrU",
  description:
    "Where the HappyFrU network reaches: urban areas, business districts, educational institutions, shopping zones, tourist locations, commercial corridors, and ride-hailing fleets.",
};

const INDUSTRIES = [
  { icon: Building2, label: "Urban Areas" },
  { icon: Briefcase, label: "Business Districts" },
  { icon: GraduationCap, label: "Educational Institutions" },
  { icon: ShoppingBag, label: "Shopping Zones" },
  { icon: Landmark, label: "Tourist Locations" },
  { icon: RouteIcon, label: "Commercial Corridors" },
  { icon: Car, label: "Ride-Hailing Fleets" },
  { icon: Truck, label: "Fleet Operators" },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Designed for maximum reach, wherever people ride"
        subtitle="HappyFrU screens travel through the places your audience already moves through every day."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Coverage"
            title="Where Our Network Reaches"
            subtitle="Because our screens move with the vehicle, your campaign travels across the whole city — not a single fixed spot."
          />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-5">
            {INDUSTRIES.map((item, i) => (
              <Reveal
                key={item.label}
                delay={i * 70}
                className="group flex flex-col items-center text-center gap-3 rounded-xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-yellow text-brand-navy transition-transform duration-300 group-hover:scale-110">
                  <item.icon size={24} />
                </div>
                <span className="text-sm font-semibold text-brand-navy">
                  {item.label}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        heading="Reach your audience where they already are"
        subheading="Tell us the industry and region you're targeting — we'll map it to routes and screens."
      />
    </>
  );
}
