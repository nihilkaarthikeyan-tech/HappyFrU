export default function GradientBlobs() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute -top-20 -left-16 h-72 w-72 rounded-full bg-white/40 blur-3xl animate-blob" />
      <div className="absolute top-10 right-0 h-80 w-80 rounded-full bg-brand-yellow-light/70 blur-3xl animate-blob [animation-delay:-5s]" />
      <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-brand-yellow-dark/25 blur-3xl animate-blob [animation-delay:-9s]" />
    </div>
  );
}
