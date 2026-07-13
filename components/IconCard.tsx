import type { LucideIcon } from "lucide-react";

export default function IconCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
}) {
  return (
    <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-navy text-white">
        <Icon size={22} />
      </div>
      <h3 className="mt-4 font-bold text-brand-navy">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-brand-navy/70 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
