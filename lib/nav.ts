export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/technology", label: "Technology" },
  { href: "/advertisers", label: "Advertisers" },
  { href: "/fleet-partners", label: "Fleet Partners" },
  { href: "/industries", label: "Industries" },
  { href: "/pricing", label: "Pricing" },
  { href: "/analytics", label: "Analytics" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const PRIMARY_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/advertisers", label: "Advertisers" },
  { href: "/fleet-partners", label: "Fleet Partners" },
  { href: "/technology", label: "Technology" },
  { href: "/pricing", label: "Pricing" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const CONTACTS = [
  {
    name: "Suyash",
    phone: "+91 90426 30641",
    whatsappNumber: "919042630641",
  },
  {
    name: "Sujan",
    phone: "+91 80567 45018",
    whatsappNumber: "918056745018",
  },
] as const;

export const CONTACT_EMAIL = "anantaskandainfographics@gmail.com";

// Primary contact — used wherever only a single phone/WhatsApp link fits.
export const CONTACT_PHONE = CONTACTS[0].phone;
export const WHATSAPP_NUMBER = CONTACTS[0].whatsappNumber;
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
