export default function SectionHeading({
  title,
  highlight,
  subtitle,
  center = true,
  tone = "onLight",
}: {
  title: string;
  highlight?: string;
  subtitle?: string;
  center?: boolean;
  tone?: "onLight" | "onYellow";
}) {
  const onYellow = tone === "onYellow";

  return (
    <div className={center ? "text-center" : ""}>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
        {title}{" "}
        {highlight && (
          <span className={onYellow ? "text-brand-navy underline decoration-white decoration-4 underline-offset-4" : "text-brand-yellow-dark"}>
            {highlight}
          </span>
        )}
      </h2>
      <div
        className={`mt-2 h-1 w-16 rounded-full ${
          onYellow ? "bg-brand-navy" : "bg-brand-yellow"
        } ${center ? "mx-auto" : ""}`}
      />
      {subtitle && (
        <p
          className={`mt-4 text-brand-navy/70 max-w-2xl ${
            center ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
