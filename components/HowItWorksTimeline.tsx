"use client";

import { useEffect, useRef, useState } from "react";
import {
  UserPlus,
  UploadCloud,
  MapPin,
  Car,
  CalendarDays,
  CreditCard,
  PlayCircle,
  type LucideIcon,
} from "lucide-react";

const STEPS: { icon: LucideIcon; label: string }[] = [
  { icon: UserPlus, label: "Create Account" },
  { icon: UploadCloud, label: "Upload Ad" },
  { icon: MapPin, label: "Choose City & Routes" },
  { icon: Car, label: "Select Number of Cabs" },
  { icon: CalendarDays, label: "Choose Duration & Schedule" },
  { icon: CreditCard, label: "Make Payment" },
  { icon: PlayCircle, label: "Campaign Goes Live" },
];

const STEP_MS = 320;

export default function HowItWorksTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (reduce) {
          setActive(STEPS.length);
          return;
        }
        let n = 0;
        const id = setInterval(() => {
          n += 1;
          setActive(n);
          if (n >= STEPS.length) clearInterval(id);
        }, STEP_MS);
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const progress =
    STEPS.length > 1
      ? (Math.min(Math.max(active - 1, 0), STEPS.length - 1) /
          (STEPS.length - 1)) *
        100
      : 0;

  return (
    <div ref={ref} className="relative mt-12">
      {/* Connecting line (desktop only) */}
      <div className="pointer-events-none absolute left-[7%] right-[7%] top-8 hidden lg:block">
        <div className="h-1 w-full rounded-full bg-white/60" />
        <div
          className="absolute inset-y-0 left-0 h-1 rounded-full bg-brand-navy transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="relative grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
        {STEPS.map((step, i) => {
          const on = i < active;
          return (
            <div
              key={step.label}
              className="flex flex-col items-center text-center"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full shadow-sm transition-all duration-500 ${
                  on
                    ? "scale-100 bg-brand-navy text-white opacity-100"
                    : "scale-90 bg-white text-brand-navy/40 opacity-70"
                }`}
              >
                <step.icon size={26} />
              </div>
              <div className="mt-3 text-xs font-bold text-brand-navy/60">
                Step {i + 1}
              </div>
              <div className="mt-1 text-sm font-semibold text-brand-navy max-w-[9rem]">
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
