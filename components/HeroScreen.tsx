"use client";

import { useEffect, useState } from "react";
import { Wifi, QrCode, Percent, PlayCircle } from "lucide-react";

const SLIDE_MS = 3200;

type Slide = {
  label: string;
  render: () => React.ReactNode;
};

const SLIDES: Slide[] = [
  {
    label: "Brand film",
    render: () => (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-brand-yellow">
        <span className="font-script text-4xl font-bold text-brand-navy">
          HappyFrU
        </span>
        <span className="font-script text-xs text-brand-navy/70 -mt-1">
          Make the moment yours
        </span>
        <PlayCircle className="mt-2 text-brand-navy/80" size={34} />
      </div>
    ),
  },
  {
    label: "Auto brand",
    render: () => (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-brand-navy-dark text-white">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-yellow">
          Now Showing
        </span>
        <span className="text-2xl font-extrabold leading-tight text-center px-4">
          Ride Smart.
          <br />
          Ride Comfort.
        </span>
        <span className="mt-1 rounded-full bg-brand-yellow px-3 py-1 text-[11px] font-bold text-brand-navy">
          Book Now
        </span>
      </div>
    ),
  },
  {
    label: "QR offer",
    render: () => (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-white text-brand-navy">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand-navy text-white">
          <QrCode size={40} />
        </div>
        <span className="text-sm font-bold">Scan &amp; Save 20%</span>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-yellow-dark">
          <Percent size={12} /> Limited-time coupon
        </span>
      </div>
    ),
  },
];

export default function HeroScreen() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (m.matches) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % SLIDES.length),
      SLIDE_MS
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-md aspect-square animate-fade-in-up">
      <div className="absolute inset-0 rounded-[2.5rem] bg-brand-navy rotate-3 transition-transform duration-500 hover:rotate-6" />
      <div className="absolute inset-0 rounded-[2.5rem] bg-brand-navy-light -rotate-2 opacity-60" />

      <div className="absolute inset-6 rounded-[2rem] bg-brand-navy-dark shadow-xl flex items-center justify-center p-5 animate-float">
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
          {/* Slides */}
          {SLIDES.map((slide, i) => (
            <div
              key={slide.label}
              className="absolute inset-0 transition-opacity duration-500"
              style={{ opacity: i === active ? 1 : 0 }}
              aria-hidden={i !== active}
            >
              {slide.render()}
            </div>
          ))}

          {/* Live badge */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-[10px] font-semibold text-brand-navy">
            <Wifi size={12} className="animate-pulse-dot" />
            Live
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 z-10 h-1 bg-black/20">
            <div key={active} className="animate-hero-progress h-full bg-brand-yellow" />
          </div>

          {/* Playlist dots */}
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {SLIDES.map((s, i) => (
              <span
                key={s.label}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-4 bg-brand-yellow" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white shadow-lg px-4 py-3 text-xs font-semibold text-brand-navy border border-black/5 animate-float [animation-delay:-1.5s]">
        720+ daily views / screen
      </div>
      <div className="absolute -top-4 -right-2 rounded-2xl bg-white shadow-lg px-4 py-3 text-xs font-semibold text-brand-navy border border-black/5 animate-float [animation-delay:-3s]">
        95% ad completion
      </div>
    </div>
  );
}
