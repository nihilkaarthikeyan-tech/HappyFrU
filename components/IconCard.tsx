import type { LucideIcon } from "lucide-react";
import Reveal from "./Reveal";

export default function IconCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="group rounded-xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-navy text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <Icon size={22} />
        </div>
        <h3 className="mt-4 font-bold text-brand-navy">{title}</h3>
        {description && (
          <p className="mt-2 text-sm text-brand-navy/70 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
