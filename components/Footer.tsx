import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "./SocialIcons";
import Logo from "./Logo";

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/about#careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "/advertisers", label: "Advertisers" },
      { href: "/fleet-partners", label: "Fleet Partners" },
      { href: "/solutions", label: "How It Works" },
      { href: "/technology", label: "Technology" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/terms", label: "Terms & Conditions" },
      { href: "/legal/privacy", label: "Privacy Policy" },
      { href: "/legal/refund", label: "Refund Policy" },
    ],
  },
];

const SOCIALS = [
  { href: "#", Icon: FacebookIcon, label: "Facebook" },
  { href: "#", Icon: InstagramIcon, label: "Instagram" },
  { href: "#", Icon: LinkedinIcon, label: "LinkedIn" },
  { href: "#", Icon: YoutubeIcon, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-yellow text-brand-navy">
      <div className="container-page py-12 grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-brand-navy/80 max-w-xs">
            India&apos;s smart in-cab digital advertising platform connecting
            brands with passengers through engaging visual experiences.
          </p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-bold uppercase tracking-wide mb-3">
              {col.title}
            </h3>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-navy/80 hover:text-brand-navy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide mb-3">
            Follow Us
          </h3>
          <div className="flex gap-3">
            {SOCIALS.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy text-white hover:bg-brand-navy-light transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-brand-navy/15">
        <div className="container-page py-4 text-center text-xs text-brand-navy/70">
          © {new Date().getFullYear()} HappyFrU. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
