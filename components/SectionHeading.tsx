import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  center = true,
  tone = "onLight",
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  center?: boolean;
  tone?: "onLight" | "onYellow";
}) {
  const onYellow = tone === "onYellow";
  const accent = onYellow ? "bg-brand-navy/50" : "bg-brand-yellow-dark";
  const accentText = onYellow ? "text-brand-navy/70" : "text-brand-yellow-dark";

  return (
    <Reveal className={center ? "text-center" : ""}>
      {eyebrow && (
        <div
          className={`mb-3 flex items-center gap-2.5 ${
            center ? "justify-center" : ""
          }`}
        >
          <span className={`h-px w-6 ${accent}`} />
          <span
            className={`text-xs font-bold uppercase tracking-[0.22em] ${accentText}`}
          >
            {eyebrow}
          </span>
          {center && <span className={`h-px w-6 ${accent}`} />}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-navy">
        {title}{" "}
        {highlight && (
          <span
            className={
              onYellow
                ? "text-brand-navy underline decoration-white decoration-4 underline-offset-4"
                : "text-brand-yellow-dark"
            }
          >
            {highlight}
          </span>
        )}
      </h2>
      {!eyebrow && (
        <div
          className={`mt-3 h-1 w-16 rounded-full ${
            onYellow ? "bg-brand-navy" : "bg-brand-yellow"
          } ${center ? "mx-auto" : ""}`}
        />
      )}
      {subtitle && (
        <p
          className={`mt-4 text-brand-navy/70 max-w-2xl ${
            center ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
