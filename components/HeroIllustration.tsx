import { PlayCircle, Wifi } from "lucide-react";

export default function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-md aspect-square animate-fade-in-up">
      <div className="absolute inset-0 rounded-[2.5rem] bg-brand-navy rotate-3 transition-transform duration-500 hover:rotate-6" />
      <div className="absolute inset-0 rounded-[2.5rem] bg-brand-navy-light -rotate-2 opacity-60" />

      <div className="absolute inset-6 rounded-[2rem] bg-brand-navy-dark shadow-xl flex items-center justify-center p-5 animate-float">
        <div className="w-full aspect-[4/3] rounded-xl bg-brand-yellow flex flex-col items-center justify-center gap-2 relative overflow-hidden">
          <span className="font-script text-3xl font-bold text-brand-navy">
            HappyFrU
          </span>
          <span className="font-script text-xs text-brand-navy/70 -mt-2">
            Make the moment yours
          </span>
          <PlayCircle className="mt-3 text-brand-navy/80 animate-pulse-dot" size={36} />
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/70 px-2 py-1 text-[10px] font-semibold text-brand-navy">
            <Wifi size={12} className="animate-pulse-dot" />
            Live
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white shadow-lg px-4 py-3 text-xs font-semibold text-brand-navy border border-black/5 animate-float [animation-delay:-1.5s]">
        720+ daily views / screen
      </div>
      <div className="absolute -top-4 -right-2 rounded-2xl bg-white shadow-lg px-4 py-3 text-xs font-semibold text-brand-navy border border-black/5 animate-float [animation-delay:-3s]">
        95% ad completion
      </div>
    </div>
  );
}
