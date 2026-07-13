import type { Metadata } from "next";
import Link from "next/link";
import { Megaphone, ShieldCheck, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Login | HappyFrU",
  description:
    "Sign in to the HappyFrU Advertiser Portal or Admin Dashboard.",
};

export default function LoginPage() {
  return (
    <>
      <PageHero
        eyebrow="Login"
        title="Sign in to your account"
        subtitle="Choose the portal that matches your role. Account creation and authentication are handled inside the platform itself."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm flex flex-col items-start">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-yellow-light text-brand-navy">
              <Megaphone size={22} />
            </div>
            <h2 className="mt-4 font-bold text-brand-navy text-lg">
              Advertiser Portal
            </h2>
            <p className="mt-2 text-sm text-brand-navy/70">
              Create campaigns, upload ads, book screens, and track
              performance.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy hover:gap-2.5 transition-all"
            >
              Continue to Advertiser Portal <ArrowRight size={16} />
            </Link>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm flex flex-col items-start">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-yellow-light text-brand-navy">
              <ShieldCheck size={22} />
            </div>
            <h2 className="mt-4 font-bold text-brand-navy text-lg">
              Admin Dashboard
            </h2>
            <p className="mt-2 text-sm text-brand-navy/70">
              For internal teams managing campaigns, devices, fleet, and
              reporting.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy hover:gap-2.5 transition-all"
            >
              Continue to Admin Dashboard <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-brand-navy/50">
          Advertiser Portal and Admin Dashboard sign-in are provided by the
          HappyFrU platform (see platform SRD). This page is the public
          entry point only.
        </p>
      </section>
    </>
  );
}
