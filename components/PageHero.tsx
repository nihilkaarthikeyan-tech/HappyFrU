export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-brand-navy">
      <div className="container-page py-16 sm:py-20 text-center">
        {eyebrow && (
          <p className="text-brand-yellow font-semibold text-sm tracking-wide uppercase mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white max-w-3xl mx-auto">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-white/80 max-w-2xl mx-auto text-base sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
