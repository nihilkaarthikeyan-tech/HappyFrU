import { NextResponse } from "next/server";
import { API } from "@/lib/platform";

// The platform rejects unknown fields, so the forwarded payload is built
// from this allowlist only.
type LeadPayload = {
  kind: "CONTACT" | "DEMO" | "FLEET";
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  city?: string;
  vehicleType?: string;
  vehicleCount?: number;
  message?: string;
  website?: string;
};

function toKind(inquiryType: unknown): LeadPayload["kind"] {
  if (typeof inquiryType !== "string") return "CONTACT";
  const type = inquiryType.toLowerCase();
  if (type.includes("fleet")) return "FLEET";
  if (type.includes("demo")) return "DEMO";
  return "CONTACT";
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    !body.name.trim() ||
    !(
      (typeof body.email === "string" && body.email.trim()) ||
      (typeof body.phone === "string" && body.phone.trim())
    )
  ) {
    return NextResponse.json(
      { error: "Name and a way to reach you (email or phone) are required." },
      { status: 400 }
    );
  }

  const lead: LeadPayload = {
    kind: toKind(body.inquiryType),
    name: body.name.trim(),
  };
  lead.email = optionalString(body.email);
  lead.phone = optionalString(body.phone);
  lead.company = optionalString(body.company);
  lead.city = optionalString(body.city);
  lead.vehicleType = optionalString(body.vehicleType);
  lead.message = optionalString(body.message);
  // Honeypot (see the hidden `website` field on the forms) — forwarded
  // untouched; the platform silently discards submissions where it is set.
  if (typeof body.website === "string") lead.website = body.website;
  const vehicleCount = Number.parseInt(String(body.vehicleCount), 10);
  if (Number.isInteger(vehicleCount)) lead.vehicleCount = vehicleCount;

  try {
    const res = await fetch(`${API}/api/v1/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Lead forward rejected:", res.status, await res.text());
      return NextResponse.json(
        { error: "We couldn't submit your message. Please try again." },
        { status: 502 }
      );
    }

    const data = await res.json().catch(() => ({}));
    return NextResponse.json({ ok: true, id: data.id });
  } catch (err) {
    console.error("Lead forward failed:", err);
    return NextResponse.json(
      { error: "We couldn't submit your message. Please try again." },
      { status: 502 }
    );
  }
}
