"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

const INQUIRY_TYPES = [
  { value: "advertiser", label: "Advertiser Inquiry" },
  { value: "fleet", label: "Fleet Partner Inquiry" },
  { value: "investor", label: "Investor Inquiry" },
  { value: "general", label: "General Inquiry" },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({
  defaultInquiryType = "general",
}: {
  defaultInquiryType?: string;
}) {
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
          Thanks — we&apos;ve got your message
        </h3>
        <p className="mt-2 text-sm text-brand-navy/70">
          Our team typically responds within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-brand-navy underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-brand-navy mb-1.5">
          I&apos;m reaching out as a...
        </label>
        <select
          name="inquiryType"
          defaultValue={defaultInquiryType}
          className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
        >
          {INQUIRY_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-brand-navy mb-1.5">
            Name
          </label>
          <input
            required
            name="name"
            type="text"
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-navy mb-1.5">
            Phone
          </label>
          <input
            name="phone"
            type="tel"
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-brand-navy mb-1.5">
          Email
        </label>
        <input
          required
          name="email"
          type="email"
          className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-brand-navy mb-1.5">
          Message
        </label>
        <textarea
          required
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
        Send Message
      </button>
    </form>
  );
}
