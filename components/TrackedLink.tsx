"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import type { ReactNode } from "react";

export default function TrackedLink({
  href,
  event,
  location,
  newTab = false,
  className,
  children,
  "aria-label": ariaLabel,
}: {
  href: string;
  event: string;
  location: string;
  newTab?: boolean;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  const handleClick = () => track(event, { location });
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (!isInternal) {
    return (
      <a
        href={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        className={className}
        aria-label={ariaLabel}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </Link>
  );
}
