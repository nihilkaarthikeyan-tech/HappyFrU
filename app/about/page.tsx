import type { Metadata } from "next";
import {
  Lightbulb,
  Eye as EyeIcon,
  ShieldCheck,
  Heart,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "About Us | HappyFrU",
  description:
    "Building India's smartest digital in-cab advertising ecosystem. Learn who HappyFrU is, why we started, and where we're headed.",
};

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
      "Our cloud platform ensures stable advertisement delivery even during internet interruptions.",
  },
  {
    icon: Heart,
    title: "Customer Success",
    description:
      "Every campaign is designed to maximize advertiser visibility and business growth.",
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

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About HappyFrU"
        title="Building India's Smartest Digital In-Cab Advertising Ecosystem"
        subtitle="We are transforming everyday travel into a powerful communication platform by connecting businesses with passengers through intelligent digital displays installed inside commercial vehicles."
      />

      <section className="py-14 sm:py-16">
        <div className="container-page max-w-3xl mx-auto text-center">
          <p className="text-brand-navy/80 text-base sm:text-lg leading-relaxed">
            Our mission is to replace traditional static advertising with
            measurable, cloud-connected digital media that delivers real
            engagement, transparent reporting, and exceptional value for
            advertisers. Every journey becomes an opportunity for brands to
            educate, inspire, and connect with customers.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-brand-yellow-light/40">
        <div className="container-page max-w-3xl mx-auto">
          <SectionHeading title="Who We Are" highlight="Technology Meets Outdoor Advertising" center={false} />
          <p className="mt-5 text-brand-navy/80 leading-relaxed">
            HappyFrU is not just an advertising company. We are a
            technology-driven Digital Out-of-Home (DOOH) platform that
            combines cloud computing, Android-powered media players,
            intelligent campaign scheduling, real-time analytics, and
            centralized content management to redefine how brands communicate
            with consumers. Our ecosystem enables advertisers to launch
            campaigns remotely while ensuring every display receives the
            right content at the right time.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-page max-w-3xl mx-auto">
          <SectionHeading title="Our Story" highlight="Why We Started" center={false} />
          <p className="mt-5 text-brand-navy/80 leading-relaxed">
            Traditional outdoor advertising has remained largely unchanged
            for decades. Billboards are expensive, difficult to measure, and
            offer only a few seconds of visibility. Digital advertising
            reaches millions online but often suffers from ad blockers,
            skipped videos, and declining engagement. We saw an opportunity
            to create a smarter advertising medium by utilizing the time
            passengers naturally spend inside cabs. By installing connected
            digital displays inside vehicles, we created a platform where
            advertisements receive uninterrupted attention during every
            journey.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-brand-yellow-light/40">
        <div className="container-page grid sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div>
            <div className="flex items-center gap-2 text-brand-navy font-bold text-lg mb-3">
              <EyeIcon size={20} className="text-brand-yellow-dark" />
              Our Vision
            </div>
            <p className="text-brand-navy/80 leading-relaxed text-sm">
              Making Every Journey a Brand Experience. We envision a future
              where every commercial vehicle becomes a connected digital
              communication channel. Our goal is to build India&apos;s
              largest cloud-managed in-cab advertising network, enabling
              businesses of every size to reach customers with measurable,
              intelligent, and highly engaging campaigns.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-brand-navy font-bold text-lg mb-3">
              <TrendingUp size={20} className="text-brand-yellow-dark" />
              Our Mission
            </div>
            <p className="text-brand-navy/80 leading-relaxed text-sm">
              Our mission is to make digital outdoor advertising accessible,
              affordable, and data-driven through innovative technology. We
              strive to provide advertisers with complete transparency,
              flexible campaign management, and meaningful customer
              engagement while creating additional earning opportunities for
              fleet operators.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            title="What Makes Us"
            highlight="Different"
            subtitle="More than digital screens — a complete technology ecosystem."
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              "Cloud-Based Content Management",
              "Intelligent Campaign Scheduling",
              "Android-Based Smart Displays",
              "Real-Time Analytics",
              "Smart Device Monitoring",
              "Automatic Campaign Failover",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-black/5 bg-white p-5 shadow-sm text-center"
              >
                <span className="text-sm font-semibold text-brand-navy">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy py-16 sm:py-20">
        <div className="container-page">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center">
            Our Values
          </h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-brand-yellow mx-auto" />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow text-brand-navy">
                  <item.icon size={22} />
                </div>
                <h3 className="mt-4 font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            title="Future"
            highlight="Roadmap"
            subtitle="We continue investing in advanced technologies that will shape the future of digital advertising."
          />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {ROADMAP.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-lg bg-brand-yellow-light px-4 py-3"
              >
                <Sparkles size={16} className="text-brand-navy shrink-0" />
                <span className="text-sm font-medium text-brand-navy">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-yellow-light/40 py-16 sm:py-20">
        <div className="container-page max-w-3xl mx-auto text-center">
          <SectionHeading title="Why We Exist" />
          <p className="mt-4 text-brand-navy/80">
            We believe advertising should be
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {WHY_WE_EXIST.map((item) => (
              <span
                key={item}
                className="rounded-full bg-white border border-brand-navy/10 px-4 py-2 text-sm font-semibold text-brand-navy"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mt-6 text-brand-navy/70 text-sm">
            Every display in our network represents an opportunity for brands
            to connect with customers in a meaningful way.
          </p>
        </div>
      </section>

      <CTABand
        heading="Let's Build Your Next Campaign"
        subheading="Whether you're a local business, a national brand, or a fleet operator, we provide the technology and network to help you reach your audience with confidence."
      />
    </>
  );
}
