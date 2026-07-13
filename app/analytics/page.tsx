import type { Metadata } from "next";
import Image from "next/image";
import { Eye, PlayCircle, QrCode, PackageCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import IconCard from "@/components/IconCard";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import WaveDivider from "@/components/WaveDivider";

export const metadata: Metadata = {
  title: "Analytics | HappyFrU",
  description:
    "Impressions, playback statistics, QR interactions, and delivery status — real-time reporting on every HappyFrU campaign.",
};

const METRICS = [
  {
    icon: Eye,
    title: "Impressions",
    description:
      "See how many passengers were exposed to your campaign, screen by screen.",
  },
  {
    icon: PlayCircle,
    title: "Playback Statistics",
    description:
      "Track exactly when and how often your ad played across the network.",
  },
  {
    icon: QrCode,
    title: "QR Code Interactions",
    description:
      "Measure direct engagement — scans that turned a ride into a click.",
  },
  {
    icon: PackageCheck,
    title: "Delivery & Campaign Status",
    description:
      "Know in real time whether your campaign is live, paused, or completed on every screen.",
  },
];

export default function AnalyticsPage() {
  return (
    <>
      <PageHero
        eyebrow="Analytics"
        title="Every campaign, measured in real time"
        subtitle="No black box. Advertisers get transparent reporting on impressions, playback, and engagement for every screen in their campaign."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Reporting" title="What You Can Track" />
          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {METRICS.map((item, i) => (
              <IconCard key={item.title} {...item} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      <WaveDivider top="bg-white" bottom="text-brand-yellow" />
      <section className="bg-brand-yellow pt-4 pb-16 sm:pb-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Dashboard Preview"
            title="Dashboard"
            highlight="Preview"
            subtitle="A look at the campaign reporting view inside the advertiser portal — design mockup, figures shown are illustrative."
            tone="onYellow"
          />

          <Reveal delay={120} className="mt-10 max-w-4xl mx-auto">
            <Image
              src="/images/admin-dashboard.png"
              alt="HappyFrU advertiser portal dashboard showing campaign performance, spend, impressions, and screen health"
              width={1536}
              height={1024}
              className="w-full h-auto rounded-2xl shadow-lg"
              sizes="(min-width: 1024px) 896px, 100vw"
            />
          </Reveal>
        </div>
      </section>
      <WaveDivider top="bg-brand-yellow" bottom="text-white" />

      <CTABand
        heading="See real reporting on your campaign"
        subheading="Request access to the advertiser portal dashboard."
      />
    </>
  );
}
