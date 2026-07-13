import {
  Zap,
  MessageCircle,
  Users,
  Clock,
  Target,
  MonitorPlay,
  IndianRupee,
  BarChart3,
  UserPlus,
  UploadCloud,
  MapPin,
  Car,
  CalendarDays,
  CreditCard,
  PlayCircle,
  Image as ImageIcon,
  QrCode,
  Percent,
  Gift,
  Clock3,
  Bell,
  Monitor,
  Eye,
  Star,
  GraduationCap,
  HeartPulse,
  Home as HomeIcon,
  UtensilsCrossed,
  ShoppingCart,
  Landmark,
  Clapperboard,
  ShoppingBag,
  Plane,
  Globe,
  LayoutDashboard,
  Gauge,
  Smartphone,
  MonitorSmartphone,
  ArrowRight,
} from "lucide-react";
import HeroIllustration from "@/components/HeroIllustration";
import IconCard from "@/components/IconCard";
import SectionHeading from "@/components/SectionHeading";
import StatBadge from "@/components/StatBadge";
import CTABand from "@/components/CTABand";
import TrackedLink from "@/components/TrackedLink";
import { WHATSAPP_LINK } from "@/lib/nav";

const HERO_STATS = [
  { icon: Monitor, value: "720+", label: "Daily Views\nPer Screen" },
  { icon: Clock, value: "15–25", label: "Minutes\nAvg. Viewing Time" },
  { icon: Users, value: "50+", label: "Planned\nDigital Screens" },
  { icon: BarChart3, value: "95%", label: "Ad Completion\nRate" },
];

const PLATFORM_COMPONENTS = [
  {
    icon: Globe,
    title: "Corporate Website",
    description:
      "Introduces our services, generates leads, and enables advertisers to start campaigns.",
  },
  {
    icon: LayoutDashboard,
    title: "Advertiser Portal",
    description:
      "Create campaigns, upload ads, book screens, and track performance.",
  },
  {
    icon: Gauge,
    title: "Admin Dashboard",
    description:
      "Monitor campaigns, devices, fleet, payments, and analytics.",
  },
  {
    icon: Smartphone,
    title: "Driver App",
    description:
      "Vehicle registration, maintenance requests, and daily earnings.",
  },
  {
    icon: MonitorSmartphone,
    title: "Android Display Player",
    description: "Offline playback, scheduling, and heartbeat monitoring.",
  },
];

const WHY_CHOOSE = [
  {
    icon: Users,
    title: "Captive Audience",
    description:
      "Passengers are engaged throughout the journey with no skipping or distractions.",
  },
  {
    icon: Clock,
    title: "Longer Exposure",
    description:
      "15–25 minutes of continuous visibility in every ride for better brand recall.",
  },
  {
    icon: Target,
    title: "Smart Targeting",
    description:
      "Target by city, route, time slot and number of cabs to reach your ideal audience.",
  },
  {
    icon: MonitorPlay,
    title: "Dynamic Content",
    description:
      "Run videos, images, QR ads and more with real-time remote updates.",
  },
  {
    icon: IndianRupee,
    title: "Cost Effective",
    description:
      "Thousands of daily impressions at a fraction of traditional media cost.",
  },
  {
    icon: BarChart3,
    title: "Measurable Results",
    description:
      "Real-time analytics, performance tracking and detailed reports.",
  },
];

const HOW_IT_WORKS = [
  { icon: UserPlus, label: "Create Account" },
  { icon: UploadCloud, label: "Upload Ad" },
  { icon: MapPin, label: "Choose City & Routes" },
  { icon: Car, label: "Select Number of Cabs" },
  { icon: CalendarDays, label: "Choose Duration & Schedule" },
  { icon: CreditCard, label: "Make Payment" },
  { icon: PlayCircle, label: "Campaign Goes Live" },
];

const AD_SOLUTIONS = [
  { icon: MonitorPlay, label: "Video Ads" },
  { icon: ImageIcon, label: "Image Ads" },
  { icon: QrCode, label: "QR Code Ads" },
  { icon: Percent, label: "Coupon Ads" },
  { icon: Gift, label: "Festival Campaigns" },
  { icon: MapPin, label: "Location Based Ads" },
  { icon: Clock3, label: "Time Based Ads" },
  { icon: Bell, label: "Emergency Alerts" },
];

const NETWORK_STATS = [
  { icon: Monitor, value: "50+", label: "Digital Screens (Planned)" },
  { icon: Users, value: "25,000+", label: "Daily Passenger Reach" },
  { icon: Eye, value: "7,50,000+", label: "Monthly Impressions (Estimated)" },
  { icon: MapPin, value: "5+", label: "Cities (Expansion Plan)" },
  { icon: Star, value: "200+", label: "Brands Onboarded" },
];

const WHO_WE_SERVE = [
  { icon: GraduationCap, label: "Education" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: HomeIcon, label: "Real Estate" },
  { icon: UtensilsCrossed, label: "Restaurants" },
  { icon: Car, label: "Automobiles" },
  { icon: ShoppingCart, label: "Retail" },
  { icon: Landmark, label: "Finance" },
  { icon: Clapperboard, label: "Entertainment" },
  { icon: ShoppingBag, label: "E-commerce" },
  { icon: Plane, label: "Travel" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-yellow">
        <div className="container-page pt-10 pb-8 sm:pt-16 sm:pb-12 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-navy leading-tight">
              India&apos;s Smart
              <br />
              In-Cab Digital
              <br />
              Advertising Network
            </h1>
            <p className="mt-4 text-brand-navy/80 text-base sm:text-lg max-w-md">
              Reach thousands of passengers during every ride with high-impact
              digital ads on in-cab screens.
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-white/70 px-3 py-4 text-center"
                >
                  <stat.icon className="mx-auto text-brand-navy" size={22} />
                  <div className="mt-2 text-lg font-extrabold text-brand-navy">
                    {stat.value}
                  </div>
                  <div className="text-[11px] leading-tight text-brand-navy/70 whitespace-pre-line">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <TrackedLink
                href="/contact"
                event="cta_click"
                location="home_hero_start_campaign"
                className="inline-flex items-center justify-center rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white hover:bg-brand-navy-light transition-colors"
              >
                Start Your Campaign
              </TrackedLink>
              <TrackedLink
                href="/fleet-partners"
                event="cta_click"
                location="home_hero_fleet_partner"
                className="inline-flex items-center justify-center rounded-full border-2 border-brand-navy px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
              >
                Become a Fleet Partner
              </TrackedLink>
              <TrackedLink
                href={WHATSAPP_LINK}
                event="whatsapp_click"
                location="home_hero"
                newTab
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy hover:underline"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </TrackedLink>
            </div>
          </div>

          <HeroIllustration />
        </div>

        <div className="container-page pb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-brand-navy/80 border-t border-brand-navy/15 pt-5">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Zap size={16} className="text-brand-navy" />A new way to
              advertise. A smarter way to grow.
            </span>
            <span className="hidden sm:inline text-brand-navy/40">|</span>
            <span>Trusted by 200+ brands & growing</span>
          </div>
        </div>
      </section>

      {/* Platform snapshot */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            title="One Website,"
            highlight="Five Integrated Systems"
            subtitle="HappyFrU isn't just a website — it's a full ecosystem working together behind every campaign."
          />
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-5 gap-5">
            {PLATFORM_COMPONENTS.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-black/5 bg-white p-5 text-center shadow-sm"
              >
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-brand-yellow-light text-brand-navy">
                  <item.icon size={22} />
                </div>
                <h3 className="mt-3 text-sm font-bold text-brand-navy">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-brand-navy/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why brands choose us */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            title="Why Brands Choose"
            highlight="HappyFrU"
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_CHOOSE.map((item) => (
              <IconCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-brand-yellow py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title="How It Works" />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-navy shadow-sm">
                  <step.icon size={26} />
                </div>
                <div className="mt-3 text-xs font-bold text-brand-navy/60">
                  Step {i + 1}
                </div>
                <div className="mt-1 text-sm font-semibold text-brand-navy max-w-[9rem]">
                  {step.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advertising solutions */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title="Our Advertising Solutions" />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {AD_SOLUTIONS.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-yellow-light text-brand-navy">
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

      {/* Secondary CTA: explore before committing */}
      <section className="pb-16 sm:pb-20 -mt-6 sm:-mt-8">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center border-t border-black/5 pt-8">
            <span className="text-sm text-brand-navy/60">
              Want more detail before you commit?
            </span>
            <div className="flex items-center gap-6">
              <TrackedLink
                href="/technology"
                event="secondary_nav_click"
                location="home_technology"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-navy hover:gap-2 transition-all"
              >
                See the Technology <ArrowRight size={14} />
              </TrackedLink>
              <TrackedLink
                href="/pricing"
                event="secondary_nav_click"
                location="home_pricing"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-navy hover:gap-2 transition-all"
              >
                View Pricing <ArrowRight size={14} />
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* Network stats */}
      <section className="bg-brand-navy py-14">
        <div className="container-page">
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {NETWORK_STATS.map((stat) => (
              <StatBadge key={stat.label} {...stat} variant="dark" />
            ))}
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title="Who We Serve" />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {WHO_WE_SERVE.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-xl border-2 border-brand-yellow px-4 py-3"
              >
                <item.icon className="text-brand-navy" size={22} />
                <span className="text-sm font-semibold text-brand-navy">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
