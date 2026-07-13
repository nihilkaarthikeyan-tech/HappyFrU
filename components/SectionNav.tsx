"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "platform", label: "Platform" },
  { id: "why-us", label: "Why Us" },
  { id: "how-it-works", label: "How It Works" },
  { id: "solutions", label: "Ad Formats" },
  { id: "network", label: "Network" },
  { id: "industries", label: "Industries" },
];

export default function SectionNav() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // Consider a section "active" when it crosses the vertical middle.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      aria-label="Page sections"
    >
      <ul className="flex flex-col gap-3.5">
        {SECTIONS.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="group flex items-center justify-end gap-2"
                aria-current={on ? "true" : undefined}
              >
                <span
                  className={`whitespace-nowrap rounded-full bg-brand-navy px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm transition-all duration-200 ${
                    on
                      ? "opacity-100"
                      : "translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    on
                      ? "h-3 w-3 bg-brand-navy"
                      : "h-2 w-2 bg-brand-navy/25 group-hover:bg-brand-navy/60"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
