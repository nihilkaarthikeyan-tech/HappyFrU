# HAPPYfrU marketing site — platform add-ons build spec

This file is an implementation brief for work inside THIS repo (the live
marketing site, deployed at happy-fr-u.vercel.app). It connects the site to the
HAPPYfrU platform API. It was written from the platform monorepo, where every
endpoint below was verified against a running API and every JSON shape was
captured live, not guessed.

**Ground rules — read first:**

1. **Do not change the visual design.** The client has approved the site as it
   looks. Every item below is wiring, new pages in the existing visual
   language, or invisible infrastructure. Reuse the existing components
   (`SectionHeading`, `PageHero`, `CTABand`, `Reveal`, `IconCard`,
   `FAQAccordion`, `AnimatedCounter`, …) and Tailwind idiom for anything new.
2. **This repo stays standalone.** Do not add `@happyfru/shared` or any
   monorepo dependency. All platform access is plain `fetch` against the REST
   API. The only new npm dependency permitted is a Markdown renderer for the
   blog (item 9).
3. **Never let the API take the site down.** Every read from the API must be
   wrapped so that a failure falls back to the current hardcoded content.
   Pattern is in §"Fetch pattern" below.
4. An older marketing site inside the platform monorepo (`apps/website`) was
   the reference implementation for this spec. It is being deleted; this file
   is self-contained and does not require it.

---

## Setup

### Environment variables

Add to `.env.local` (dev) and the Vercel project (production):

```
NEXT_PUBLIC_API_URL=http://localhost:8000        # prod: https://api.<root-domain>
NEXT_PUBLIC_ADVERTISER_URL=http://localhost:8002 # prod: https://app.<root-domain>
```

Centralise them once:

```ts
// lib/platform.ts
export const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
export const ADVERTISER_URL =
  process.env.NEXT_PUBLIC_ADVERTISER_URL ?? "http://localhost:8002";
```

### CORS — not this repo's job, but a prerequisite

Server-side fetches (React Server Components, route handlers) are not subject
to CORS, and this spec keeps ALL platform calls server-side — so no API change
is strictly required. If any call is ever moved to the client, the platform's
`CORS_ORIGINS` env must gain this site's origin first.

### Local development against the platform

The platform runs locally at `http://localhost:8000` (API), `:8002`
(advertiser dashboard). If the API is not running, the site must still build
and render — that's what the fallbacks are for.

---

## Fetch pattern (used by items 3–7, 9, 10)

All platform reads follow this exact shape — server-side, 5-minute
revalidate, silent fallback:

```ts
async function getStats(): Promise<Stat[]> {
  try {
    const res = await fetch(`${API}/api/v1/content/stats`, {
      next: { revalidate: 300 },
    });
    if (res.ok) return await res.json();
  } catch {}
  return FALLBACK_STATS; // the numbers currently hardcoded in the page
}
```

**Facts vs copy:** city list and screen counts (item 7) are *facts* — always
prefer the live value and only fall back when the API is unreachable. Stats,
testimonials, FAQs and pricing are *copy* — an empty CMS response (`[]`) also
falls back to the built-in content, so a not-yet-populated CMS never renders
an empty section.

---

## The 15 items, in build order

### 1. Wire the enquiry form to the platform (CRITICAL — currently loses every lead)

`app/api/contact/route.ts` currently validates the body, `console.log`s it,
and returns `{ ok: true }`. **Every submission is discarded.**

Replace the log with a server-side forward to the platform:

```
POST {API}/api/v1/leads
Content-Type: application/json
```

Request body (the platform validates with these exact rules — extra fields are
rejected, so send only these):

| Field          | Rules                                        |
|----------------|----------------------------------------------|
| `kind`         | required — `"CONTACT" \| "DEMO" \| "FLEET"`  |
| `name`         | required, string, ≤ 120                      |
| `email`        | optional, valid email                        |
| `phone`        | optional, string, ≤ 20                       |
| `company`      | optional, string, ≤ 120                      |
| `city`         | optional, string, ≤ 80                       |
| `vehicleType`  | optional, string, ≤ 40                       |
| `vehicleCount` | optional, integer                            |
| `message`      | optional, string, ≤ 2000                     |
| `website`      | honeypot — see item 12                       |

Success response: `{ "received": true, "id": "<leadId>" }`.
The platform is rate-limited at **5 requests/min per IP** on this route and
notifies every active super-admin in the admin dashboard. Leads appear on the
admin **Leads** page.

Map the existing form's `inquiryType` to `kind`: fleet-related inquiry →
`"FLEET"`, demo request → `"DEMO"`, everything else → `"CONTACT"`. Keep the
existing client-side UX exactly as is (the form component only needs the
hidden honeypot field from item 12 and to keep posting to `/api/contact`).

If the forward fails (API down), return 502 and have the form show its
existing error state — do NOT show success for a lead that wasn't stored.

**Acceptance:** submit the form locally with the platform running → the lead
appears in the admin dashboard's Leads page and `{received:true}` comes back.

### 2. Route visitors into the product (CRITICAL — funnel currently dead-ends)

Every "Start a Campaign" CTA currently links to `/contact`. Change:

- Navbar CTA (desktop + mobile), hero CTA, and every `CTABand` primary action
  → `${ADVERTISER_URL}/signup`
- Add a **Log in** link next to the navbar CTA → `${ADVERTISER_URL}/login`
  (quiet style — a text link or ghost button; the CTA stays the loud one)
- Keep "Become a Fleet Partner" pointing at the fleet page (item 8 gives it a
  real form)
- Keep existing `track("cta_click", …)` analytics calls on all of them

**Acceptance:** with the advertiser app running locally, navbar "Start a
Campaign" lands on its signup page; "Log in" lands on its login page.

### 3. Stats bar from the platform

```
GET {API}/api/v1/content/stats
→ [{ "label": "Active screens", "value": 11 },
   { "label": "Daily impressions", "value": 52000, "suffix": "+" }, ...]
```

Feed the hero stat tiles / counters from this, falling back to the currently
hardcoded numbers. `AnimatedCounter` already animates values — only the source
changes. Non-empty CMS response wins wholesale; empty or failed → fallback.

**Acceptance:** edit a stat in admin → Website content → Stats bar; within 5
minutes (revalidate window) the site shows the new number.

### 4. Pricing plans from the platform

```
GET {API}/api/v1/plans
→ [{ "id": "…", "name": "Starter", "description": null, "inclusions": null,
     "isActive": true, "sortOrder": 0,
     "recurringPricePaise": null, "recurringInterval": null }, ...]
```

Render plan cards on `/pricing` from this list: order by `sortOrder`, skip
`isActive: false`. `inclusions` is JSON (array of strings when set).
`recurringPricePaise` is an integer in paise — display as
`₹{(paise/100).toLocaleString("en-IN")}` per `recurringInterval`
(`MONTHLY | QUARTERLY | ANNUAL`). Fields are null until the platform's plan
editor is populated — when `description`/`inclusions` are null, fall back to
the current hardcoded card content for that plan name. Every card's CTA →
`${ADVERTISER_URL}/signup`.

### 5. Testimonials from the platform

```
GET {API}/api/v1/content/testimonial
→ [{ "title": "Kumaran Silks",
     "body": { "brand": "Kumaran Silks", "industry": "Retail",
               "quote": "Footfall from the airport route doubled…",
               "result": "2x weekend footfall" }, ... }]
```

Map: brand `body.brand ?? title`, plus `body.industry`, `body.quote`,
`body.result`. Non-empty replaces the hardcoded testimonials wholesale.

### 6. FAQ from the platform

```
GET {API}/api/v1/content/faq
→ [{ "title": "Do you cover night shifts?",
     "body": { "answer": "Yes — cabs run late, and your slots run with them." }, ... }]
```

Question = `title`, answer = `body.answer`. Feed the existing `FAQAccordion`
on `/faq` (and the homepage FAQ section if present). Non-empty replaces
hardcoded wholesale.

### 7. Live coverage figures

```
GET {API}/api/v1/cities/coverage
→ [{ "name": "Bengaluru", "state": "Karnataka",
     "centerLat": 12.9716, "centerLng": 77.5946,
     "coverage": [{ "lat": 13.05, "lng": 80.2 }, …] | null,
     "screens": 11 }, ...]
```

Wherever the site states a city count, city names, or screen counts, use this
data. These are facts: prefer live values; hardcoded numbers remain only as
an API-unreachable fallback. Also feeds the map (item 11).

### 8. Fleet partner application form

The `/fleet-partners` page explains the offer but has no form — visitors are
sent to the generic contact page, which asks none of the vehicle questions.

Build an application form on `/fleet-partners`, in the site's existing form
style, posting through the same `/api/contact` proxy with `kind: "FLEET"`:

- Name (required), Phone (required), Email
- City
- Vehicle type — select: `Sedan | Hatchback | SUV | Fleet (mixed)`
- Vehicle count — number input, sent as an integer
- Message (optional)
- Honeypot field (item 12)

Success copy: "Received. Our team will call you within one working day."

**Acceptance:** submission appears in admin Leads tagged FLEET, with the
vehicle fields populated.

### 9. Blog

Two new routes in the site's visual language:

- `/blog` — index of published posts
- `/blog/[slug]` — article page

```
GET {API}/api/v1/content/blog          → index (published only, API filters)
GET {API}/api/v1/content/blog/{slug}   → single post
→ { "slug": "measuring-cab-top-campaigns",
    "title": "How we measure a cab-top campaign",
    "body": { "markdown": "## Every play is logged\n…" },
    "coverKey": "media/blog/….jpg" | null,
    "seo": { "title": "…", "description": "…" } | null,
    "publishAt": "…" | null, "createdAt": "…", "updatedAt": "…" }
```

- Body is Markdown — add `react-markdown` (the one permitted new dependency)
- Cover image URL: `{API}/api/v1/files/{coverKey}` when `coverKey` is set
- `generateMetadata` from `seo.title` / `seo.description`, falling back to
  the post title
- Add `/blog` to the navbar and to `app/sitemap.ts`
- Index revalidates at 300s like everything else
- Empty CMS → render the index with a tasteful "No posts yet" state (this is
  a new section; there is no hardcoded fallback content to show)

### 10. Case studies page

`/case-studies` — same pattern as the blog, reading
`GET {API}/api/v1/content/case_study` (same response shape; long-form body in
`body.markdown`, summary fields like `body.brand` / `body.result` when set).
Card grid → detail page. Add to navbar and sitemap. Empty CMS → "Coming soon"
state.

### 11. Interactive coverage map

On the homepage (or `/advertisers`), a Google Map plotting each city from
item 7's data: marker at `centerLat`/`centerLng`, polygon from `coverage`
when non-null, screen count in the info window.

- Load Google Maps JS on the client (`@googlemaps/js-api-loader`) with
  `NEXT_PUBLIC_GOOGLE_MAPS_KEY`
- **If the key is absent, render nothing** (or the current static section) —
  no error, no broken map frame. The key is a tracked outstanding item
  (platform UT-05) and may not exist yet.

### 12. Spam protection on all forms

- Add a hidden field named `website` to both forms — visually hidden via CSS
  (`position:absolute; left:-9999px`, `tabIndex={-1}`,
  `autoComplete="off"`, `aria-hidden`), NOT `display:none` (some bots skip
  those). Humans never fill it; the platform silently accepts-and-discards
  any submission where it's non-empty.
- Forward the field through the `/api/contact` proxy untouched.
- The platform already rate-limits 5/min per IP. Optionally mirror a light
  limit in the proxy route to spare the API, but don't duplicate complex
  logic.

### 13. robots.ts

`app/robots.ts` next to the existing `app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://<production-domain>/sitemap.xml",
  };
}
```

Use the real production domain (or derive from an env var consistent with how
`sitemap.ts` does it).

### 14. OPTIONAL — live in-cab screen simulation

A client-side component demonstrating the real playback loop that runs on
every cab screen: a 60-second cycle of 25s ad + 25s ad + 10s HAPPYfrU
branding, compressed to 5× speed for the demo, with a segmented progress bar
labelled `AD SLOT 1 (25s) | AD SLOT 2 (25s) | BRANDING (10s)`.

Reference data from the old implementation:

```ts
const SEGMENTS = [
  { label: "AD SLOT 1", seconds: 25, kind: "ad",
    title: "Kumar Silks", line: "Wedding season sale — 40% off" },
  { label: "AD SLOT 2", seconds: 25, kind: "ad",
    title: "Cafe Madras", line: "Filter coffee. 2 mins from this signal." },
  { label: "BRANDING", seconds: 10, kind: "brand",
    title: "HAPPYfrU", line: "Your ad could be here" },
];
// 60s total, rendered at 5× via requestAnimationFrame.
// Respect prefers-reduced-motion: show a static frame instead of animating.
```

**Design note:** this would replace/augment the static `HeroScreen` mockup —
the one item on this list that visibly changes the page. Confirm with the
client before building; restyle to this site's own hero design if approved.

### 15. OPTIONAL — hero background video

PRD WEB-01 specifies a full-width autoplay/muted/looped background video.
Requires real footage from the client. Skip until footage exists; the current
illustrated hero is the approved fallback.

---

## Content-completeness items (16–18)

These were missing from the first version of this spec — an oversight, not a
change of scope. Items 1–15 cover *wiring*; these cover *content the PRD
requires that this site does not currently have*. They are pure content and
layout inside the existing design language: reuse `IconCard`,
`SectionHeading`, `BrandMarquee`, `Reveal` and the existing Tailwind idiom.
Do not introduce a new visual style for them.

The lists below are the PRD's, verbatim. Wording may be adapted for tone, but
**no entry may be dropped and none added** without saying so in the report.

### 16. Industries — expand to the full 17 (PRD WEB-06)

`BrandMarquee` currently carries 10: Education, Healthcare, Real Estate,
Restaurants, Automobiles, Retail, Finance, Entertainment, E-commerce, Travel.

**Missing 7 — add them:** Events, Hospitals, Jewellery, Textiles, Government
Campaigns, Political Awareness, NGOs.

Note `/industries` is a *different* page — it covers location types (urban
areas, business districts, …), not industries, and is out of scope here.
Decide and state in your report whether the full 17 belong in the marquee
alone, or whether `/industries` should also gain an industry grid section
beneath its existing location-type content. Prefer the smaller change.

### 17. Advertising formats section (PRD WEB-07) — LARGEST GAP

The PRD requires a section telling a visitor **what kinds of ad they can
buy**. Nothing on the site does this today. `/solutions` sounds like it
would, but it describes platform capabilities (cloud CMS, scheduling,
analytics, failover) — not purchasable formats.

Build a section listing all 12:

Image Ads · Video Ads · Interactive QR Ads · Coupon Ads · Festival Campaigns ·
Location-Based Ads · Time-Based Ads · Weather-Based Ads · Emergency Alerts ·
Government Notifications · Brand Launches · Product Promotions

Each needs a one-line description written in the site's existing voice — a
bare list of 12 labels is not sufficient; an advertiser should understand what
each one is. Suggested placement: a new section on `/solutions` beneath the
existing capability cards, or on `/advertisers`. Choose one, and say which and
why in your report.

**This is a visible new section** — the only item in this spec besides 14 that
adds substantial new surface to an approved page. Build it, but flag it
clearly in your report so the client can review the placement.

### 18. Platform features — expand to 13 (PRD WEB-08)

`/technology` currently has 6: Android-Based Smart Displays, Device Health
Monitoring, GPS-Based Location Tracking, Heartbeat Monitoring, Emergency
Broadcast Capability, Auto-Sync on Reconnect.

The PRD's 13: Live Advertisement Update · GPS Targeting · Campaign Scheduling ·
Multiple Screen Layouts · Video + Image Support · Offline Playback · Real-Time
Monitoring · Content Approval · Cloud Synchronization · Analytics Dashboard ·
QR Code Tracking · Brand-Safe Advertising · Device Health Monitoring

Several existing cards already map onto PRD entries (Device Health Monitoring
is a direct match; GPS-Based Location Tracking ≈ GPS Targeting; Auto-Sync on
Reconnect ≈ Cloud Synchronization). **Map before adding** — the goal is all 13
concepts present, not 19 cards with duplicates. State your mapping in the
report.

---

## Acceptance checklist (run before calling it done)

- [ ] `npm run build` passes with no API running (all fallbacks exercised)
- [ ] `npm run build` passes with the platform API running locally
- [ ] Navbar/hero/CTA-band "Start a Campaign" → advertiser signup; "Log in" → advertiser login
- [ ] Contact form submission → visible in admin Leads; API-down submission shows the error state, not success
- [ ] Fleet form submission → in admin Leads as FLEET with vehicle fields
- [ ] Filling the hidden `website` field → success response, but nothing stored (check admin Leads)
- [ ] Editing a stat / FAQ / testimonial in the admin dashboard changes the site within ~5 minutes
- [ ] `/blog` renders the seeded post "How we measure a cab-top campaign"; its `/blog/[slug]` page renders Markdown
- [ ] `/robots.txt` and `/sitemap.xml` both resolve; sitemap includes blog + case studies
- [ ] With no Google Maps key set, no console errors and no broken map UI
- [ ] Lighthouse: Performance / SEO / Accessibility still ≥ 90 (PRD §5.3)

## Do NOT

- Change the approved visual design, palette, or typography
- Add `@happyfru/shared` or reach into the platform monorepo
- Call the platform from client components (except Google Maps) — keep reads
  server-side so CORS never enters the picture
- Show a success message for a lead that wasn't stored
- Hardcode new stats/pricing/testimonial content — that's what items 3–6 remove
- Copy any font setup from the old `apps/website` (it had a broken
  `next/font` CSS-variable self-reference that silently fell back to Times
  New Roman; this repo's font setup is already correct)
