"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const PHOTOS = [
  {
    src: "/images/screen-auto-rickshaw.jpeg",
    alt: "HappyFrU digital display mounted on an auto-rickshaw dashboard, playing a video ad to passengers",
    caption: "Auto-Rickshaw Dashboard Display",
  },
  {
    src: "/images/screen-cab-headrest.jpeg",
    alt: "HappyFrU digital display mounted on a cab headrest, showing a ride comfort ad to rear passengers",
    caption: "Cab Headrest Display",
  },
];

function TiltPhoto({
  photo,
  onOpen,
}: {
  photo: (typeof PHOTOS)[number];
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * 8, ry: px * 8 });
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      className="group block w-full text-left [perspective:1000px]"
      aria-label={`View larger: ${photo.caption}`}
    >
      <div
        className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-[transform,box-shadow] duration-200 ease-out group-hover:shadow-xl motion-reduce:!transform-none"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 640px) 380px, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-brand-navy/0 opacity-0 transition-all duration-300 group-hover:bg-brand-navy/30 group-hover:opacity-100">
            <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-brand-navy">
              <ZoomIn size={16} /> View
            </span>
          </div>
        </div>
        <div className="px-4 py-3 text-center text-sm font-semibold text-brand-navy">
          {photo.caption}
        </div>
      </div>
    </button>
  );
}

export default function ScreensGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  const open = openIndex !== null ? PHOTOS[openIndex] : null;

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          title="Real Screens,"
          highlight="Real Rides"
          subtitle="Not a mockup — this is exactly what passengers see, every ride, every day. Tap a photo to zoom in."
        />
        <div className="mt-10 grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {PHOTOS.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 120}>
              <TiltPhoto photo={photo} onOpen={() => setOpenIndex(i)} />
            </Reveal>
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 animate-fade-in-up"
          onClick={() => setOpenIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={open.caption}
        >
          <button
            type="button"
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-navy transition-colors hover:bg-white"
            aria-label="Close"
            onClick={() => setOpenIndex(null)}
          >
            <X size={20} />
          </button>
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={open.src}
              alt={open.alt}
              width={1448}
              height={1086}
              className="h-auto w-full rounded-2xl shadow-2xl"
              sizes="(min-width: 1024px) 896px, 100vw"
            />
            <p className="mt-3 text-center text-sm font-semibold text-white/90">
              {open.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
