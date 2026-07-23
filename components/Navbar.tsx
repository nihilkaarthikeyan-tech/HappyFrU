"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { track } from "@vercel/analytics";
import Logo from "./Logo";
import { PRIMARY_NAV_LINKS } from "@/lib/nav";
import { ADVERTISER_URL } from "@/lib/platform";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur border-b transition-shadow duration-300 ${
        scrolled ? "border-black/5 shadow-md" : "border-transparent"
      }`}
    >
      <div
        className={`container-page flex items-center justify-between transition-[padding] duration-300 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        <div className="shrink-0">
          <Logo />
        </div>

        <nav className="hidden xl:flex items-center gap-4 2xl:gap-5 mx-6">
          {PRIMARY_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium text-brand-navy/80 hover:text-brand-navy transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:flex shrink-0 items-center gap-4">
          <a
            href={`${ADVERTISER_URL}/login`}
            onClick={() => track("cta_click", { location: "navbar_login" })}
            className="whitespace-nowrap text-sm font-medium text-brand-navy/80 hover:text-brand-navy transition-colors"
          >
            Log in
          </a>
          <a
            href={`${ADVERTISER_URL}/signup`}
            onClick={() => track("cta_click", { location: "navbar" })}
            className="inline-flex items-center whitespace-nowrap rounded-full bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy-light transition-colors"
          >
            Start a Campaign
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="xl:hidden text-brand-navy"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden border-t border-black/5 bg-white">
          <nav className="container-page flex flex-col py-4 gap-1">
            {PRIMARY_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-sm font-medium text-brand-navy/80 hover:text-brand-navy"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`${ADVERTISER_URL}/login`}
              className="py-2 text-sm font-medium text-brand-navy/80 hover:text-brand-navy"
              onClick={() => {
                track("cta_click", { location: "navbar_mobile_login" });
                setOpen(false);
              }}
            >
              Log in
            </a>
            <a
              href={`${ADVERTISER_URL}/signup`}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white"
              onClick={() => {
                track("cta_click", { location: "navbar_mobile" });
                setOpen(false);
              }}
            >
              Start a Campaign
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
