import type { Metadata } from "next";
import Image from "next/image";
import {
  Lightbulb,
  Eye as EyeIcon,
  ShieldCheck,
  Heart,
  Sparkles,
  TrendingUp,
  CloudUpload,
  CalendarClock,
  Smartphone,
  LineChart,
  Activity,
  Monitor,
  Users,
  MapPin,
  Star,
  Quote,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import IconCard from "@/components/IconCard";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import WaveDivider from "@/components/WaveDivider";
import AnimatedCounter from "@/components/AnimatedCounter";
import { getCityCoverage } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us | HappyFrU",
  description:
    "Building India's smartest digital in-cab advertising ecosystem. Learn who HappyFrU is, why we started, and where we're headed.",
};

// Screens/Cities snapshot real coverage data as of 2026-07-24 (11+0+1 screens
// across 3 cities), for parity when the API is unreachable — see the
// getCityCoverage() call below, which overrides these with live figures
// whenever it can reach the platform.
const QUICK_STATS = [
  { icon: Monitor, value: "12", label: "Screens Planned" },
  { icon: Users, value: "25,000+", label: "Daily Reach" },
  { icon: MapPin, value: "3", label: "Cities" },
  { icon: Star, value: "200+", label: "Brands Onboarded" },
];

const DIFFERENTIATORS = [
  {
    icon: CloudUpload,
    title: "Cloud-Based Content Management",
    description:
      "Upload once and push to every screen instantly — no site visits, no delays.",
  },
  {
    icon: CalendarClock,
    title: "Intelligent Campaign Scheduling",
    description:
      "Auto-scheduled by city, route, duration, and the number of screens you book.",
  },
  {
    icon: Smartphone,
    title: "Android-Based Smart Displays",
    description:
      "Independent players with secure offline playback and automatic sync.",
  },
  {
    icon: LineChart,
    title: "Real-Time Analytics",
    description:
      "Impressions, playback stats, and QR interactions while the campaign runs.",
  },
  {
    icon: Activity,
    title: "Smart Device Monitoring",
    description:
      "Every screen reports health, connectivity, and playback status live.",
  },
  {
    icon: ShieldCheck,
    title: "Automatic Campaign Failover",
    description:
      "Offline screens reallocate to backups so delivery never stops.",
  },
];

const VALUES = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We constantly develop new technologies that improve outdoor advertising.",
  },
  {
    icon: ShieldCheck,
    title: "Transparency",
    description:
      "Every campaign is measurable with clear reporting and analytics.",
  },
  {
    icon: Sparkles,
    title: "Reliability",
    description:
      "Our cloud platform ensures stable delivery even during internet interruptions.",
  },
  {
    icon: Heart,
    title: "Customer Success",
    description:
      "Every campaign is designed to maximize visibility and business growth.",
  },
];

const ROADMAP = [
  "AI Campaign Recommendations",
  "Smart Audience Prediction",
  "Weather-Based Campaigns",
  "Traffic-Based Advertising",
  "Geo-Fencing",
  "Interactive Passenger Experiences",
  "Digital Coupons",
  "Live Information Widgets",
  "Predictive Analytics",
];

const WHY_WE_EXIST = [
  "Smarter",
  "Measurable",
  "Flexible",
  "Affordable",
  "Technology Driven",
  "Accessible for businesses of every size",
];

export default async function AboutPage() {
  // Facts: city/screen counts prefer the live figure whenever the API is
  // reachable, even when the result is an empty list — only network failure
  // falls back to the hardcoded QUICK_STATS numbers.
  const coverage = await getCityCoverage();
  const quickStats = QUICK_STATS.map((stat) => {
    if (!coverage) return stat;
    if (stat.label === "Cities") {
      return { ...stat, value: `${coverage.length}` };
    }
    if (stat.label === "Screens Planned") {
      const total = coverage.reduce((sum, c) => sum + c.screens, 0);
      return { ...stat, value: `${total}` };
    }
    return stat;
  });

  return (
    <>
      <PageHero
        eyebrow="About HappyFrU"
        title="Building India's Smartest Digital In-Cab Advertising Ecosystem"
        subtitle="We are transforming everyday travel into a powerful communication platform by connecting businesses with passengers through intelligent digital displays installed inside commercial vehicles."
      />

      {/* Lead statement + quick stats */}
      <section className="py-14 sm:py-16">
        <div className="container-page max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-xl sm:text-2xl font-semibold leading-relaxed text-brand-navy">
              We replace traditional static advertising with measurable,
              cloud-connected digital media that delivers real engagement,
              transparent reporting, and exceptional value —{" "}
              <span className="text-brand-yellow-dark">
                turning every journey into an opportunity for brands to
                connect.
              </span>
            </p>
          </Reveal>
        </div>

        <div className="container-page mt-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {quickStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="rounded-2xl border border-black/5 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <s.icon className="mx-auto text-brand-navy" size={22} />
                  <div className="mt-2 text-xl font-extrabold text-brand-navy">
                    <AnimatedCounter value={s.value} />
                  </div>
                  <div className="mt-0.5 text-xs text-brand-navy/60">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are — text + visual */}
      <section className="py-14 sm:py-16 bg-brand-yellow-light/40">
        <div className="container-page grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionHeading
              eyebrow="Who We Are"
              title="Technology Meets"
              highlight="Outdoor Advertising"
              center={false}
            />
            <Reveal delay={100}>
              <p className="mt-5 text-brand-navy/80 leading-relaxed">
                HappyFrU is not just an advertising company. We are a
                technology-driven Digital Out-of-Home (DOOH) platform that
                combines cloud computing, Android-powered media players,
                intelligent campaign scheduling, real-time analytics, and
                centralized content management to redefine how brands
                communicate with consumers. Our ecosystem lets advertisers
                launch campaigns remotely while ensuring every display receives
                the right content at the right time.
              </p>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <div className="overflow-hidden rounded-2xl border border-black/5 shadow-lg">
              <Image
                src="/images/admin-dashboard.png"
                alt="HappyFrU admin dashboard showing campaigns, devices, and analytics"
                width={1536}
                height={1024}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 560px, 100vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our Story — visual + text (alternated) */}
      <section className="py-14 sm:py-16">
        <div className="container-page grid lg:grid-cols-2 gap-10 items-center">
          <div className="lg:order-2">
            <SectionHeading
              eyebrow="Our Story"
              title="Why We"
              highlight="Started"
              center={false}
            />
            <Reveal delay={100}>
              <p className="mt-5 text-brand-navy/80 leading-relaxed">
                Traditional outdoor advertising has stayed largely unchanged for
                decades. Billboards are expensive, hard to measure, and offer
                only a few seconds of visibility. Online advertising reaches
                millions but suffers from ad blockers, skipped videos, and
                declining engagement. We saw an opportunity in the time
                passengers naturally spend inside cabs — so we installed
                connected digital displays inside vehicles, creating a platform
                where ads receive uninterrupted attention during every journey.
              </p>
            </Reveal>
          </div>
          <Reveal delay={150} className="lg:order-1">
            <div className="relative overflow-hidden rounded-2xl border border-black/5 shadow-lg">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/screen-auto-rickshaw.jpeg"
                  alt="HappyFrU display running an ad inside an auto-rickshaw"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 560px, 100vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission — contrasting cards */}
      <section className="py-16 sm:py-20 bg-brand-yellow-light/40">
        <div className="container-page">
          <SectionHeading eyebrow="Our Direction" title="Vision &" highlight="Mission" />
          <div className="mt-10 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Reveal>
              <div className="h-full rounded-2xl bg-brand-navy p-8 text-white shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-yellow text-brand-navy">
                  <EyeIcon size={22} />
                </div>
                <h3 className="mt-5 text-lg font-bold">Our Vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Making every journey a brand experience. We envision a future
                  where every commercial vehicle becomes a connected digital
                  channel — building India&apos;s largest cloud-managed in-cab
                  advertising network, so businesses of every size can reach
                  customers with measurable, intelligent campaigns.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="h-full rounded-2xl bg-brand-yellow p-8 text-brand-navy shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-brand-yellow">
                  <TrendingUp size={22} />
                </div>
                <h3 className="mt-5 text-lg font-bold">Our Mission</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-navy/80">
                  To make digital outdoor advertising accessible, affordable,
                  and data-driven through innovative technology. We give
                  advertisers complete transparency, flexible campaign
                  management, and meaningful engagement — while creating new
                  earning opportunities for fleet operators.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What Makes Us Different — icon cards */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Edge"
            title="What Makes Us"
            highlight="Different"
            subtitle="More than digital screens — a complete technology ecosystem."
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DIFFERENTIATORS.map((item, i) => (
              <IconCard key={item.title} {...item} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Values — navy band */}
      <WaveDivider top="bg-white" bottom="text-brand-navy" />
      <section className="bg-brand-navy pt-4 pb-16 sm:pb-20">
        <div className="container-page">
          <SectionHeading eyebrow="What Drives Us" title="Our Values" tone="onDark" />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow text-brand-navy transition-transform duration-300 group-hover:scale-110">
                    <item.icon size={22} />
                  </div>
                  <h3 className="mt-4 font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <WaveDivider top="bg-brand-navy" bottom="text-white" />

      {/* Future Roadmap */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="What's Next"
            title="Future"
            highlight="Roadmap"
            subtitle="We keep investing in advanced technologies that will shape the future of digital advertising."
          />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {ROADMAP.map((item, i) => (
              <Reveal
                key={item}
                delay={i * 60}
                className="group flex items-center gap-2.5 rounded-xl bg-brand-yellow-light px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-yellow"
              >
                <Sparkles
                  size={16}
                  className="shrink-0 text-brand-yellow-dark transition-colors group-hover:text-brand-navy"
                />
                <span className="text-sm font-medium text-brand-navy">
                  {item}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Exist — pull quote */}
      <section className="bg-brand-yellow-light/40 py-16 sm:py-20">
        <div className="container-page max-w-3xl mx-auto text-center">
          <Reveal>
            <Quote className="mx-auto text-brand-yellow-dark" size={36} />
            <p className="mt-4 text-lg font-semibold text-brand-navy">
              We believe advertising should be
            </p>
          </Reveal>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {WHY_WE_EXIST.map((item, i) => (
              <Reveal
                key={item}
                delay={i * 70}
                className="rounded-full border border-brand-navy/10 bg-white px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm transition-transform duration-300 hover:-translate-y-0.5"
              >
                {item}
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-6 text-sm text-brand-navy/70">
              Every display in our network represents an opportunity for brands
              to connect with customers in a meaningful way.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand
        heading="Let's Build Your Next Campaign"
        subheading="Whether you're a local business, a national brand, or a fleet operator, we provide the technology and network to help you reach your audience with confidence."
      />
    </>
  );
}
