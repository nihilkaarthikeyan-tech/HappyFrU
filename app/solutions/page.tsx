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
  CloudSun,
  Landmark,
  Rocket,
  Tag,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import IconCard from "@/components/IconCard";
import CTABand from "@/components/CTABand";
import WaveDivider from "@/components/WaveDivider";

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
  {
    icon: ImageIcon,
    title: "Image Ads",
    description:
      "Static HD creatives — the simplest way to put your brand in front of every passenger.",
  },
  {
    icon: MonitorPlay,
    title: "Video Ads",
    description:
      "HD video spots that hold attention for the length of the ride — no skipping, no scrolling past.",
  },
  {
    icon: QrCode,
    title: "Interactive QR Ads",
    description:
      "On-screen QR codes passengers scan to reach your site, store, or offer — every scan tracked.",
  },
  {
    icon: Percent,
    title: "Coupon Ads",
    description:
      "Scannable discount codes that turn a ride into a store visit you can measure.",
  },
  {
    icon: Gift,
    title: "Festival Campaigns",
    description:
      "Seasonal creatives timed to Diwali, Pongal, and every festival window that matters to your audience.",
  },
  {
    icon: MapPin,
    title: "Location-Based Ads",
    description:
      "Creatives triggered by area — show the right ad when the cab is near your outlet.",
  },
  {
    icon: Clock3,
    title: "Time-Based Ads",
    description:
      "Breakfast offers in the morning, dinner offers at night — your slots follow the clock.",
  },
  {
    icon: CloudSun,
    title: "Weather-Based Ads",
    description:
      "Creatives that switch with the weather — cold drinks in the heat, hot chai when it rains.",
  },
  {
    icon: Bell,
    title: "Emergency Alerts",
    description:
      "Public-safety broadcasts that override scheduled content when authorities need every screen.",
  },
  {
    icon: Landmark,
    title: "Government Notifications",
    description:
      "Civic announcements and public-interest messaging delivered across the city's fleet.",
  },
  {
    icon: Rocket,
    title: "Brand Launches",
    description:
      "High-frequency bursts that put a new brand everywhere at once during launch week.",
  },
  {
    icon: Tag,
    title: "Product Promotions",
    description:
      "Focused pushes for a single product or offer — short, dense, and measurable.",
  },
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
            eyebrow="The Platform"
            title="Platform"
            highlight="Capabilities"
            subtitle="Four core capabilities power every campaign on the network."
          />
          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {CAPABILITIES.map((item, i) => (
              <IconCard key={item.title} {...item} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      <WaveDivider top="bg-white" bottom="text-brand-yellow" />
      <section className="bg-brand-yellow pt-4 pb-16 sm:pb-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Ad Formats"
            title="Ad Formats"
            highlight="We Support"
            subtitle="Twelve formats to match any campaign goal — mix and match across a single booking."
            tone="onYellow"
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AD_FORMATS.map((item, i) => (
              <IconCard key={item.title} {...item} delay={i * 60} />
            ))}
          </div>
        </div>
      </section>
      <WaveDivider top="bg-brand-yellow" bottom="text-white" />

      <CTABand
        heading="See the platform in action"
        subheading="Book a walkthrough of the advertiser portal and campaign scheduler."
      />
    </>
  );
}
