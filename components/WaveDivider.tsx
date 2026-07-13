export default function WaveDivider({
  top,
  bottom,
  flip = false,
}: {
  /** Tailwind bg-* class for the section above the wave. */
  top: string;
  /** Tailwind text-* class = the wave (section below) color. */
  bottom: string;
  flip?: boolean;
}) {
  return (
    <div className={`${top} leading-[0]`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={`block w-full h-8 sm:h-12 ${bottom} ${flip ? "rotate-180" : ""}`}
      >
        <path
          fill="currentColor"
          d="M0,40 C240,80 480,4 720,32 C960,60 1200,12 1440,44 L1440,80 L0,80 Z"
        />
      </svg>
    </div>
  );
}
