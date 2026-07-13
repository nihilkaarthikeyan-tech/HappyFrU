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
  tone?: "onLight" | "onYellow" | "onDark";
}) {
  const onYellow = tone === "onYellow";
  const onDark = tone === "onDark";

  const accent = onYellow ? "bg-brand-navy/50" : onDark ? "bg-brand-yellow" : "bg-brand-yellow-dark";
  const accentText = onYellow
    ? "text-brand-navy/70"
    : onDark
      ? "text-brand-yellow"
      : "text-brand-yellow-dark";
  const titleColor = onDark ? "text-white" : "text-brand-navy";
  const subtitleColor = onDark ? "text-white/70" : "text-brand-navy/70";
  const markerColor = onYellow ? "bg-brand-navy" : onDark ? "bg-brand-yellow" : "bg-brand-yellow";

  const highlightClass = onYellow
    ? "text-brand-navy underline decoration-white decoration-4 underline-offset-4"
    : onDark
      ? "text-brand-yellow"
      : "text-brand-yellow-dark";

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
      <h2
        className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${titleColor}`}
      >
        {title}{" "}
        {highlight && <span className={highlightClass}>{highlight}</span>}
      </h2>
      {!eyebrow && (
        <div
          className={`mt-3 h-1 w-16 rounded-full ${markerColor} ${
            center ? "mx-auto" : ""
          }`}
        />
      )}
      {subtitle && (
        <p className={`mt-4 max-w-2xl ${subtitleColor} ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
