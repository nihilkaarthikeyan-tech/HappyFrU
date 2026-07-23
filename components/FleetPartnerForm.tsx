"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

const VEHICLE_TYPES = ["Sedan", "Hatchback", "SUV", "Fleet (mixed)"];

type Status = "idle" | "submitting" | "success" | "error";

export default function FleetPartnerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-brand-yellow-dark/30 bg-brand-yellow-light p-8 text-center">
        <CheckCircle2 className="mx-auto text-brand-navy" size={36} />
        <h3 className="mt-3 font-bold text-brand-navy text-lg">
          Received. Our team will call you within one working day.
        </h3>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-brand-navy underline"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-4">
      <input type="hidden" name="inquiryType" value="fleet" />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fleet-name" className="block text-sm font-semibold text-brand-navy mb-1.5">
            Name
          </label>
          <input
            required
            id="fleet-name"
            name="name"
            type="text"
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
          />
        </div>
        <div>
          <label htmlFor="fleet-phone" className="block text-sm font-semibold text-brand-navy mb-1.5">
            Phone
          </label>
          <input
            required
            id="fleet-phone"
            name="phone"
            type="tel"
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fleet-email" className="block text-sm font-semibold text-brand-navy mb-1.5">
            Email
          </label>
          <input
            id="fleet-email"
            name="email"
            type="email"
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
          />
        </div>
        <div>
          <label htmlFor="fleet-city" className="block text-sm font-semibold text-brand-navy mb-1.5">
            City
          </label>
          <input
            id="fleet-city"
            name="city"
            type="text"
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fleet-vehicle-type" className="block text-sm font-semibold text-brand-navy mb-1.5">
            Vehicle Type
          </label>
          <select
            id="fleet-vehicle-type"
            name="vehicleType"
            defaultValue=""
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
          >
            <option value="" disabled>
              Select a vehicle type
            </option>
            {VEHICLE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="fleet-vehicle-count" className="block text-sm font-semibold text-brand-navy mb-1.5">
            Vehicle Count
          </label>
          <input
            id="fleet-vehicle-count"
            name="vehicleCount"
            type="number"
            min={1}
            step={1}
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
          />
        </div>
      </div>

      <div>
        <label htmlFor="fleet-message" className="block text-sm font-semibold text-brand-navy mb-1.5">
          Message
        </label>
        <textarea
          id="fleet-message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white hover:bg-brand-navy-light transition-colors disabled:opacity-60"
      >
        {status === "submitting" && <Loader2 className="animate-spin" size={16} />}
        Submit Application
      </button>

      {/* Honeypot — humans never see or fill this; the platform discards any
          submission where it is non-empty. Deliberately not display:none. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px]"
      />
    </form>
  );
}
