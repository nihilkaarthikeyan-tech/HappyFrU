import type { Metadata } from "next";
import Image from "next/image";
import {
  Megaphone,
  Upload,
  MapPin,
  MonitorCheck,
  LineChart,
  FileDown,
  Receipt,
  Clock,
  Users,
  Target,
  IndianRupee,
  CalendarClock,
  RefreshCw,
  FileBarChart,
  MonitorPlay,
  Crosshair,
  ShieldCheck,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "For Advertisers | HappyFrU",
  description:
    "Create campaigns, choose cities and routes, book screens, and track performance in real time — everything advertisers need to run in-cab digital campaigns with HappyFrU.",
};

const CAN_DO = [
  { icon: Megaphone, label: "Create Campaigns" },
  { icon: Upload, label: "Upload Advertisements" },
  { icon: MapPin, label: "Choose Cities & Routes" },
  { icon: MonitorCheck, label: "Book Screens" },
  { icon: LineChart, label: "Track Performance" },
  { icon: FileDown, label: "Download Reports" },
  { icon: Receipt, label: "Manage Billing" },
];

const BENEFITS = [
  { icon: Clock, label: "Longer audience engagement" },
  { icon: Users, label: "Captive passenger attention" },
  { icon: IndianRupee, label: "Affordable digital advertising" },
  { icon: CalendarClock, label: "Flexible campaign duration" },
  { icon: RefreshCw, label: "Remote advertisement updates" },
  { icon: FileBarChart, label: "Transparent campaign reports" },
  { icon: MonitorPlay, label: "HD digital displays" },
  { icon: Crosshair, label: "Hyper-local targeting" },
  { icon: Target, label: "Dynamic scheduling" },
  { icon: ShieldCheck, label: "Brand-safe advertising" },
];

export default function AdvertisersPage() {
  return (
    <>
      <PageHero
        eyebrow="For Advertisers"
        title="Reach passengers who can't skip, mute, or scroll past you"
        subtitle="Launch, manage, and measure in-cab campaigns from a single advertiser portal — built for brands, agencies, and local businesses alike."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            title="What You Can Do"
            highlight="in the Advertiser Portal"
          />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-5">
            {CAN_DO.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-black/5 bg-white p-5 text-center shadow-sm"
              >
                <item.icon className="mx-auto text-brand-navy" size={26} />
                <p className="mt-3 text-sm font-semibold text-brand-navy">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-4 sm:py-6">
        <div className="container-page">
          <SectionHeading
            title="Your Campaigns,"
            highlight="In One Dashboard"
            subtitle="Monitor spend, impressions, CTR, and screen health across every campaign — in real time."
          />
          <div className="mt-10 max-w-4xl mx-auto">
            <Image
              src="/images/admin-dashboard.png"
              alt="HappyFrU advertiser portal showing live campaigns, performance trends, and screen health"
              width={1536}
              height={1024}
              className="w-full h-auto rounded-2xl shadow-lg"
              sizes="(min-width: 1024px) 896px, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-brand-yellow py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title="Why Brands Choose HappyFrU" />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {BENEFITS.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center text-center gap-2 rounded-xl bg-white/70 p-4"
              >
                <item.icon className="text-brand-navy" size={22} />
                <span className="text-xs font-semibold text-brand-navy leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        heading="Start Your Campaign"
        subheading="Tell us your target cities and audience — we'll help you plan the rest."
        primaryHref="/contact"
        primaryLabel="Start Your Campaign"
      />
    </>
  );
}
