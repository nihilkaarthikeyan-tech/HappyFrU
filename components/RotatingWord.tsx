"use client";

import { useEffect, useState } from "react";

export default function RotatingWord({
  words,
  interval = 2200,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [entering, setEntering] = useState(true);

  useEffect(() => {
    if (words.length <= 1) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = setInterval(() => {
      setEntering(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setEntering(true);
      }, 300);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  // Reserve width for the longest word so layout doesn't jump.
  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b), "");

  return (
    <span className={`relative inline-grid align-bottom ${className}`}>
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {longest}
      </span>
      <span
        key={index}
        className="col-start-1 row-start-1 text-brand-yellow-dark transition-all duration-300 ease-out"
        style={{
          opacity: entering ? 1 : 0,
          transform: entering ? "translateY(0)" : "translateY(-8px)",
        }}
      >
        {words[index]}
      </span>
    </span>
  );
}
