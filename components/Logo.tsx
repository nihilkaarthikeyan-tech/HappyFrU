import Link from "next/link";

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex flex-col leading-none shrink-0">
      <span
        className={`font-script text-3xl sm:text-4xl font-bold ${
          dark ? "text-white" : "text-brand-navy"
        }`}
      >
        HappyFrU
      </span>
      <span
        className={`font-script text-xs sm:text-sm -mt-1 ${
          dark ? "text-white/70" : "text-brand-navy/60"
        }`}
      >
        Make the moment yours
      </span>
    </Link>
  );
}
