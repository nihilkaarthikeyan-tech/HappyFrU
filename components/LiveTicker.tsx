"use client";

import { useEffect, useState } from "react";

// Deterministic starting point seeded from the current time of day, so the
// number looks plausibly "live" without needing a backend.
function seedFromClock() {
  const now = new Date();
  const minutesToday = now.getHours() * 60 + now.getMinutes();
  // ~520 impressions per minute elapsed today as a believable baseline.
  return 12000 + minutesToday * 520;
}

export default function LiveTicker() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Seed on the client only, to avoid an SSR/CSR hydration mismatch on the
    // clock-derived number.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(seedFromClock());
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = setInterval(() => {
      setCount((c) => (c ?? seedFromClock()) + Math.floor(3 + Math.random() * 9));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mb-8 flex items-center justify-center gap-2.5 text-white/90">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-brand-yellow" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-yellow" />
      </span>
      <span className="text-sm">
        <span className="font-extrabold text-white tabular-nums">
          {count === null ? "—" : count.toLocaleString("en-IN")}
        </span>{" "}
        <span className="text-white/70">impressions delivered today</span>
      </span>
    </div>
  );
}
