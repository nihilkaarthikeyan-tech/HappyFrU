import type { LucideIcon } from "lucide-react";

export default function StatBadge({
  icon: Icon,
  value,
  label,
  variant = "light",
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-4 py-4 ${
        dark ? "bg-brand-navy-light/40" : "bg-brand-yellow-light"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
          dark ? "bg-brand-yellow text-brand-navy" : "bg-brand-navy text-white"
        }`}
      >
        <Icon size={20} />
      </div>
      <div>
        <div className={`text-lg font-extrabold ${dark ? "text-white" : "text-brand-navy"}`}>
          {value}
        </div>
        <div className={`text-xs leading-tight ${dark ? "text-white/70" : "text-brand-navy/60"}`}>
          {label}
        </div>
      </div>
    </div>
  );
}
