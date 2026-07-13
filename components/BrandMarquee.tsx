import {
  GraduationCap,
  HeartPulse,
  Home as HomeIcon,
  UtensilsCrossed,
  Car,
  ShoppingCart,
  Landmark,
  Clapperboard,
  ShoppingBag,
  Plane,
} from "lucide-react";

const CHIPS = [
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

export default function BrandMarquee() {
  const track = [...CHIPS, ...CHIPS];
  return (
    <section className="border-y border-black/5 bg-white py-6">
      <p className="container-page mb-4 text-center text-xs font-semibold uppercase tracking-widest text-brand-navy/50">
        Powering campaigns across every industry
      </p>
      <div className="marquee-track group relative overflow-hidden">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

        <div className="animate-marquee flex w-max gap-4">
          {track.map((chip, i) => (
            <span
              key={`${chip.label}-${i}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-black/5 bg-brand-yellow-light/50 px-5 py-2.5 text-sm font-semibold text-brand-navy"
            >
              <chip.icon size={16} className="text-brand-navy/70" />
              {chip.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
