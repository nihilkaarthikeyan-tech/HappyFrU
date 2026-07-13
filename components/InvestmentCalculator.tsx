"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Info,
  MessageCircle,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Pricing configuration — adjust rates here                           */
/* ------------------------------------------------------------------ */

// Set to a full number like "919876543210" to send quotes to WhatsApp.
// Left empty, the CTA routes to the contact page instead.
const WHATSAPP_NUMBER = "";

const RATES = {
  /** Base price per 30-second ad slot (dynamic video). */
  basePricePerSlot: 1,
  /** Multiplier applied to slots inside prime hours. */
  primeMultiplier: 2,
  gstRate: 0.18,
  /** Static ads: price per cab per month. */
  staticPerCabPerMonth: 5000,
  staticMinMonths: 3,
  staticMaxMonths: 12,
  maxCabs: 500,
  maxAdsPerHalfHour: 60,
};

/** Half-hour slot indices (0–47) treated as prime: 8–10 AM and 5–9 PM. */
const PRIME_SLOTS = [16, 17, 18, 19, 34, 35, 36, 37, 38, 39, 40, 41];
const ALL_SLOTS = Array.from({ length: 48 }, (_, i) => i);

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

function slotLabel(index: number) {
  const fmt = (h: number, m: number) => {
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${m.toString().padStart(2, "0")} ${suffix}`;
  };
  const startH = Math.floor(index / 2);
  const startM = (index % 2) * 30;
  const endH = startM === 30 ? startH + 1 : startH;
  const endM = startM === 30 ? 0 : 30;
  return `${fmt(startH, startM)} - ${fmt(endH === 24 ? 0 : endH, endM)}`;
}

function toISODate(d: Date) {
  return `${d.getFullYear()}-${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
}

function formatISODate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/* Shared small controls                                               */
/* ------------------------------------------------------------------ */

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
}) {
  const [text, setText] = useState(value.toString());

  const commit = (raw: string) => {
    const parsed = parseInt(raw, 10);
    const clamped = Math.max(min, Math.min(max, isNaN(parsed) ? min : parsed));
    onChange(clamped);
    setText(clamped.toString());
  };

  return (
    <div>
      <label className="flex items-center justify-between text-sm font-semibold text-brand-navy mb-2">
        {label}
        <span className="rounded-md bg-brand-yellow-light px-2 py-0.5 text-brand-navy">
          {value}
        </span>
      </label>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => {
            onChange(Number(e.target.value));
            setText(e.target.value);
          }}
          className="w-full accent-brand-navy"
          aria-label={label}
        />
        <input
          type="number"
          min={min}
          max={max}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => commit(text)}
          onKeyDown={(e) => e.key === "Enter" && commit(text)}
          className="w-20 rounded-lg border border-brand-navy/20 px-2 py-1.5 text-center text-sm text-brand-navy focus:border-brand-navy focus:outline-none"
          aria-label={`${label} (number)`}
        />
      </div>
    </div>
  );
}

function CostRow({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 text-sm ${
        muted
          ? "rounded-lg bg-brand-navy/5 px-3 py-2 text-brand-navy/70"
          : "text-brand-navy"
      }`}
    >
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function QuoteCTA({ message }: { message: string }) {
  const className =
    "mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-navy px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-navy-light";

  if (WHATSAPP_NUMBER) {
    return (
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <MessageCircle size={16} />
        Chat with Us on WhatsApp
      </a>
    );
  }
  return (
    <Link href="/contact" className={className}>
      Request a Detailed Quote
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Multi-date calendar picker                                          */
/* ------------------------------------------------------------------ */

function DatePicker({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (iso: string) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const leadingBlanks = firstDay.getDay();

  const canGoBack =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  const shiftMonth = (delta: number) => {
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  };

  return (
    <div className="rounded-xl border border-brand-navy/15 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          disabled={!canGoBack}
          className="rounded-lg p-1.5 text-brand-navy hover:bg-brand-yellow-light disabled:opacity-30"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-bold text-brand-navy">
          {firstDay.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
        </span>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          className="rounded-lg p-1.5 text-brand-navy hover:bg-brand-yellow-light"
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <span key={d} className="py-1 text-[11px] font-bold uppercase text-brand-navy/50">
            {d}
          </span>
        ))}
        {Array.from({ length: leadingBlanks }).map((_, i) => (
          <span key={`blank-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const date = new Date(viewYear, viewMonth, day);
          const iso = toISODate(date);
          const isPast = date < today;
          const isSelected = selected.includes(iso);
          return (
            <button
              key={iso}
              type="button"
              disabled={isPast}
              onClick={() => onToggle(iso)}
              className={`rounded-lg py-1.5 text-sm transition-colors ${
                isSelected
                  ? "bg-brand-navy font-bold text-white"
                  : isPast
                    ? "text-brand-navy/25"
                    : "text-brand-navy hover:bg-brand-yellow-light"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dynamic (video) ads calculator                                      */
/* ------------------------------------------------------------------ */

function DynamicCalculator() {
  const [dates, setDates] = useState<string[]>([]);
  const [cabs, setCabs] = useState(50);
  const [adsPerHalfHour, setAdsPerHalfHour] = useState(4);
  const [hours, setHours] = useState<number[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);

  const toggleDate = (iso: string) =>
    setDates((prev) =>
      prev.includes(iso) ? prev.filter((d) => d !== iso) : [...prev, iso].sort()
    );

  const toggleHour = (slot: number) =>
    setHours((prev) =>
      prev.includes(slot)
        ? prev.filter((h) => h !== slot)
        : [...prev, slot].sort((a, b) => a - b)
    );

  const pricing = useMemo(() => {
    const activeHours = hours.length > 0 ? hours : ALL_SLOTS;
    const totalSlots = dates.length * activeHours.length * cabs * adsPerHalfHour;
    let costBeforeGST = 0;
    for (const slot of activeHours) {
      const multiplier = PRIME_SLOTS.includes(slot) ? RATES.primeMultiplier : 1;
      costBeforeGST +=
        dates.length * cabs * adsPerHalfHour * RATES.basePricePerSlot * multiplier;
    }
    const gst = costBeforeGST * RATES.gstRate;
    return {
      totalSlots,
      costBeforeGST,
      gst,
      final: costBeforeGST + gst,
      ratePerSlot: totalSlots > 0 ? costBeforeGST / totalSlots : 0,
    };
  }, [dates, cabs, adsPerHalfHour, hours]);

  const hasDates = dates.length > 0;

  const quoteMessage = `Hi! I want a quote for dynamic video advertising on HappyFrU. Details: ${cabs} cabs, ${adsPerHalfHour} ads per 30-min, ${
    hours.length > 0 ? `${hours.length} time slots selected` : "all-day (24 hours)"
  }, ${dates.length} campaign date${dates.length === 1 ? "" : "s"}. Total ad slots: ${pricing.totalSlots.toLocaleString(
    "en-IN"
  )}. Estimated cost incl. GST: ${inr(pricing.final)}. Please send me a detailed proposal.`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_minmax(280px,340px)]">
      {/* Controls */}
      <div className="space-y-6">
        {/* Dates */}
        <div
          className={`rounded-xl border-2 p-4 ${
            hasDates ? "border-brand-navy/15" : "border-brand-navy/40"
          }`}
        >
          <label className="mb-2 block text-sm font-semibold text-brand-navy">
            Campaign Dates{" "}
            {!hasDates && <span className="text-brand-yellow-dark">*</span>}
          </label>
          <button
            type="button"
            onClick={() => setPickerOpen((o) => !o)}
            className="flex w-full items-center gap-2 rounded-lg border border-brand-navy/25 px-3 py-2.5 text-left text-sm text-brand-navy hover:border-brand-navy"
          >
            <Calendar size={16} className="shrink-0 text-brand-navy/60" />
            {hasDates
              ? `${dates.length} date${dates.length === 1 ? "" : "s"} selected`
              : "Click to select dates"}
          </button>
          {pickerOpen && (
            <div className="mt-3">
              <DatePicker selected={dates} onToggle={toggleDate} />
              <button
                type="button"
                onClick={() => setPickerOpen(false)}
                className="mt-2 w-full rounded-lg bg-brand-yellow px-3 py-2 text-sm font-bold text-brand-navy hover:bg-brand-yellow-dark"
              >
                Done
              </button>
            </div>
          )}
          {hasDates && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {dates.map((iso) => (
                <span
                  key={iso}
                  className="inline-flex items-center gap-1 rounded-full bg-brand-yellow-light px-2.5 py-1 text-xs font-semibold text-brand-navy"
                >
                  {formatISODate(iso)}
                  <button
                    type="button"
                    onClick={() => toggleDate(iso)}
                    aria-label={`Remove ${formatISODate(iso)}`}
                    className="rounded-full hover:text-brand-yellow-dark"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Sliders */}
        <div className="grid gap-5 sm:grid-cols-2">
          <SliderInput
            label="Number of Cabs"
            value={cabs}
            onChange={setCabs}
            min={1}
            max={RATES.maxCabs}
          />
          <SliderInput
            label="Ads per 30-min"
            value={adsPerHalfHour}
            onChange={setAdsPerHalfHour}
            min={1}
            max={RATES.maxAdsPerHalfHour}
          />
        </div>

        {/* Hour picker */}
        <div>
          <p className="mb-2 text-sm font-semibold text-brand-navy">Pick Hours</p>
          <p className="mb-3 rounded-lg bg-brand-yellow-light/60 px-3 py-2 text-xs text-brand-navy/70">
            {hours.length === 0
              ? "Tap hours to select specific time slots. Leave empty for all-day pricing (24 hours). Prime hours (8–10 AM, 5–9 PM) are billed at 2×."
              : `${hours.length} time slot${hours.length === 1 ? "" : "s"} selected. Tap to toggle.`}
          </p>
          <div className="mb-3 flex gap-2">
            <button
              type="button"
              onClick={() => setHours([])}
              disabled={hours.length === 0}
              className="rounded-lg border border-brand-navy/25 px-3 py-1.5 text-xs font-semibold text-brand-navy hover:bg-brand-yellow-light disabled:opacity-40"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={() => setHours([...PRIME_SLOTS])}
              className="rounded-lg border border-brand-navy/25 px-3 py-1.5 text-xs font-semibold text-brand-navy hover:bg-brand-yellow-light"
            >
              Select Prime Hours
            </button>
          </div>
          <div className="grid max-h-72 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3 lg:grid-cols-4">
            {ALL_SLOTS.map((slot) => {
              const isSelected = hours.includes(slot);
              const isPrime = PRIME_SLOTS.includes(slot);
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => toggleHour(slot)}
                  className={`relative rounded-lg border px-2 py-2.5 text-[11px] font-medium transition-colors ${
                    isSelected
                      ? "border-brand-navy bg-brand-navy text-white"
                      : "border-brand-navy/15 bg-white text-brand-navy hover:border-brand-navy/40"
                  }`}
                >
                  {slotLabel(slot)}
                  {isPrime && (
                    <span className="absolute -top-1.5 right-1 rounded bg-brand-yellow px-1 text-[9px] font-bold text-brand-navy">
                      Prime
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-brand-yellow-dark/30 bg-brand-yellow-light/50 p-5 lg:self-start">
        {hasDates ? (
          <>
            <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-wide text-brand-navy">
              Campaign Pricing
            </h3>
            <div className="space-y-2.5">
              <CostRow label="Cost (before GST):" value={inr(pricing.costBeforeGST)} />
              <CostRow
                label={`GST (${Math.round(RATES.gstRate * 100)}%):`}
                value={inr(pricing.gst)}
                muted
              />
            </div>
            <div className="mt-4 border-t border-brand-navy/10 pt-4 text-center">
              <p className="text-xs font-semibold text-brand-navy/70">
                Final Price (incl. GST):
              </p>
              <p className="mt-1 text-3xl font-extrabold text-brand-navy">
                {inr(pricing.final)}
              </p>
            </div>
            <div className="mt-4 space-y-1 border-t border-brand-navy/10 pt-3 text-center text-xs text-brand-navy/70">
              <p>
                Total slots (30-sec ads):{" "}
                <span className="font-semibold">
                  {pricing.totalSlots.toLocaleString("en-IN")}
                </span>
              </p>
              <p>
                Effective rate/slot:{" "}
                <span className="font-semibold">₹{pricing.ratePerSlot.toFixed(2)}</span>
              </p>
            </div>
            <QuoteCTA message={quoteMessage} />
          </>
        ) : (
          <div className="flex min-h-40 items-center justify-center">
            <div className="flex items-center gap-2 rounded-xl bg-white/70 px-4 py-3 text-sm text-brand-navy/60">
              <Info size={17} className="shrink-0" />
              Select dates to see pricing
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Static ads calculator                                               */
/* ------------------------------------------------------------------ */

function StaticCalculator() {
  const [cabs, setCabs] = useState(10);
  const [months, setMonths] = useState(RATES.staticMinMonths);

  const costBeforeGST = cabs * RATES.staticPerCabPerMonth * months;
  const gst = costBeforeGST * RATES.gstRate;
  const final = costBeforeGST + gst;

  const quoteMessage = `Hi! I want a quote for static in-cab advertising on HappyFrU. Details: ${cabs} cabs for ${months} months. Estimated cost incl. GST: ${inr(
    final
  )}. Please send me a detailed proposal.`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_minmax(280px,340px)]">
      <div className="space-y-6">
        <SliderInput
          label="Number of Cabs"
          value={cabs}
          onChange={setCabs}
          min={1}
          max={RATES.maxCabs}
        />
        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-navy">
            Duration (Months)
          </label>
          <select
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full rounded-lg border border-brand-navy/25 bg-white px-3 py-2.5 text-sm text-brand-navy focus:border-brand-navy focus:outline-none"
          >
            {Array.from(
              { length: RATES.staticMaxMonths - RATES.staticMinMonths + 1 },
              (_, i) => RATES.staticMinMonths + i
            ).map((m) => (
              <option key={m} value={m}>
                {m} Months
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-brand-navy/60">
            Minimum {RATES.staticMinMonths} months booking required.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-brand-yellow-dark/30 bg-brand-yellow-light/50 p-5 lg:self-start">
        <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-wide text-brand-navy">
          Campaign Cost Breakdown
        </h3>
        <div className="space-y-2.5">
          <CostRow label="Cost (before GST):" value={inr(costBeforeGST)} />
          <CostRow
            label={`GST (${Math.round(RATES.gstRate * 100)}%):`}
            value={inr(gst)}
            muted
          />
        </div>
        <div className="mt-4 border-t border-brand-navy/10 pt-4 text-center">
          <p className="text-xs font-semibold text-brand-navy/70">
            Final Cost (incl. GST):
          </p>
          <p className="mt-1 text-3xl font-extrabold text-brand-navy">{inr(final)}</p>
        </div>
        <p className="mt-3 text-center text-xs text-brand-navy/60">
          {cabs} cabs × {inr(RATES.staticPerCabPerMonth)}/cab × {months} months
        </p>
        <QuoteCTA message={quoteMessage} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tabs wrapper                                                        */
/* ------------------------------------------------------------------ */

export default function InvestmentCalculator() {
  const [tab, setTab] = useState<"dynamic" | "static">("dynamic");

  return (
    <div className="rounded-3xl border border-brand-navy/10 bg-white p-4 shadow-sm sm:p-6">
      <div
        role="tablist"
        aria-label="Ad format"
        className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-brand-yellow-light/60 p-1"
      >
        {(
          [
            { id: "dynamic", label: "Dynamic Ads (Video)" },
            { id: "static", label: "Static Ads" },
          ] as const
        ).map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${
              tab === id
                ? "bg-white text-brand-navy shadow-sm"
                : "text-brand-navy/60 hover:text-brand-navy"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === "dynamic" ? <DynamicCalculator /> : <StaticCalculator />}
    </div>
  );
}
