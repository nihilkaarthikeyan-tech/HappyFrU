import type { LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import AnimatedCounter from "./AnimatedCounter";

export default function StatBadge({
  icon: Icon,
  value,
  label,
  variant = "light",
  delay = 0,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  variant?: "light" | "dark";
  delay?: number;
}) {
  const dark = variant === "dark";
  return (
    <Reveal delay={delay}>
      <div
        className={`group flex items-center gap-3 rounded-xl px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 ${
          dark
            ? "bg-brand-navy-light/40 hover:bg-brand-navy-light/60"
            : "bg-brand-yellow-light hover:shadow-md"
        }`}
      >
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 ${
            dark ? "bg-brand-yellow text-brand-navy" : "bg-brand-navy text-white"
          }`}
        >
          <Icon size={20} />
        </div>
        <div>
          <div className={`text-lg font-extrabold ${dark ? "text-white" : "text-brand-navy"}`}>
            <AnimatedCounter value={value} />
          </div>
          <div className={`text-xs leading-tight ${dark ? "text-white/70" : "text-brand-navy/60"}`}>
            {label}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
