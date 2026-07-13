import Image from "next/image";
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

export default function ScreensGallery() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          title="Real Screens,"
          highlight="Real Rides"
          subtitle="Not a mockup — this is exactly what passengers see, every ride, every day."
        />
        <div className="mt-10 grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {PHOTOS.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 120}>
              <div className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 640px) 380px, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="px-4 py-3 text-center text-sm font-semibold text-brand-navy">
                  {photo.caption}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
