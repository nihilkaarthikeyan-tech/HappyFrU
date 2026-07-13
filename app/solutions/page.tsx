import type { Metadata } from "next";
import {
  CloudUpload,
  CalendarClock,
  LineChart,
  ShieldCheck,
  MonitorPlay,
  Image as ImageIcon,
  QrCode,
  Percent,
  Gift,
  MapPin,
  Clock3,
  Bell,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import IconCard from "@/components/IconCard";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Solutions | HappyFrU",
  description:
    "Cloud content management, intelligent scheduling, real-time analytics, and automatic campaign failover — the platform capabilities behind every HappyFrU campaign.",
};

const CAPABILITIES = [
  {
    icon: CloudUpload,
    title: "Cloud-Based Content Management",
    description:
      "Upload advertisements remotely and instantly distribute them across selected screens — no site visits, no delays.",
  },
  {
    icon: CalendarClock,
    title: "Intelligent Campaign Scheduling",
    description:
      "Campaigns are automatically scheduled based on duration, city, route, and the number of screens you've booked.",
  },
  {
    icon: LineChart,
    title: "Real-Time Analytics",
    description:
      "Track impressions, playback stats, QR code interactions, and delivery status as your campaign runs — not after it ends.",
  },
  {
    icon: ShieldCheck,
    title: "Automatic Campaign Failover",
    description:
      "If a display goes offline, our scheduling engine automatically reallocates your campaign to backup devices so delivery never stops.",
  },
];

const AD_FORMATS = [
  { icon: MonitorPlay, label: "Video Ads" },
  { icon: ImageIcon, label: "Image Ads" },
  { icon: QrCode, label: "QR Code Ads" },
  { icon: Percent, label: "Coupon Ads" },
  { icon: Gift, label: "Festival Campaigns" },
  { icon: MapPin, label: "Location Based Ads" },
  { icon: Clock3, label: "Time Based Ads" },
  { icon: Bell, label: "Emergency Alerts" },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="One platform to plan, launch, and monitor in-cab campaigns"
        subtitle="HappyFrU turns a network of Android-powered displays into a single, cloud-managed advertising channel — built for buyers who need control and proof, not just screens."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            title="Platform"
            highlight="Capabilities"
            subtitle="Four core capabilities power every campaign on the network."
          />
          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {CAPABILITIES.map((item) => (
              <IconCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-yellow py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            title="Ad Formats"
            highlight="We Support"
            subtitle="Choose the format that fits your campaign goal — mix and match across a single booking."
            tone="onYellow"
          />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {AD_FORMATS.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-brand-navy">
                  <item.icon size={24} />
                </div>
                <span className="text-sm font-medium text-brand-navy/80">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        heading="See the platform in action"
        subheading="Book a walkthrough of the advertiser portal and campaign scheduler."
      />
    </>
  );
}
