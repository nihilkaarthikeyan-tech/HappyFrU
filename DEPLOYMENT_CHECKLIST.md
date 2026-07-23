# HappyFrU website — VPS deployment checklist

Written 2026-07-23, after the ADDONS_SPEC build (items 1–13, 16–18 complete).
Planned move: Hostinger VPS + new domain, weekend of July 25–26, 2026.
Work through this top to bottom on deploy day.

## 🚫 Blockers — the site is broken in production without these

### 1. Environment variables (MUST be set before `npm run build`)

`NEXT_PUBLIC_*` vars are baked in at **build time** — setting them after the
build does nothing. On the VPS, put them in the environment (or an `.env.local`
on the server) *before* building:

```
NEXT_PUBLIC_API_URL=https://<your-platform-api-domain>
NEXT_PUBLIC_ADVERTISER_URL=https://<your-advertiser-app-domain>
```

If these are missing:

- **CTAs are safe** (since 2026-07-23): when `NEXT_PUBLIC_ADVERTISER_URL` is
  unset, `lib/platform.ts` points "Start a Campaign" at `/contact` instead of
  a dead `localhost:8002` link, and hides the "Log in" link entirely. Set the
  var and both revert to the real advertiser app automatically.
- **Forms still fail**: every contact-form and fleet-form submission returns
  502 and shows the error state → **no lead is captured**. There is no
  workaround without a reachable API; the site deliberately never fakes
  success for a lead it did not store. Phone/WhatsApp/email links still work,
  so visitors retain a way to make contact.
- Content sections (stats, pricing, testimonials, FAQ, coverage, blog, case
  studies) silently fall back to hardcoded copy — site renders, but static.

⚠️ This also means the **platform API and advertiser dashboard must be
publicly hosted** (on the VPS or elsewhere) for the funnel and forms to work.
The marketing site can go live alone, but forms/CTAs will be broken until the
platform is reachable at those URLs.

CORS: not needed for the marketing site — all platform reads are server-side.
Only the (unbuilt) Google Maps item would ever call from the client.

### 2. Update the domain in `app/sitemap.ts`

`BASE_URL` in [app/sitemap.ts](app/sitemap.ts) is hardcoded to
`https://www.happyfru.com` (robots.txt derives from it). When the real domain
is bought, set it there — one line. If deploying under a different domain,
search engines are otherwise told about a domain that doesn't serve the site.

### 3. Security patch — Next.js 16.2.10 → 16.2.11

`npm audit` (2026-07-23): 1 moderate + 2 high, all fixed in Next 16.2.11
(same-minor patch):

- Next.js: unauthenticated disclosure of internal Server Function endpoints
  (GHSA-955p-x3mx-jcvp)
- bundled postcss < 8.5.10 (XSS via unescaped `</style>`)
- sharp < 0.35.0 (inherited libvips CVEs)

Fix: bump `next` (and `eslint-config-next`) to `16.2.11` in package.json,
`npm install`, rebuild, re-run smoke checks.

### 4. Commit & push

As of 2026-07-23 the entire ADDONS_SPEC build exists only as uncommitted local
changes in `D:\HappyFrU website\website` (last commit: 78cb6df, July 14).
Commit and push before the VPS pulls anything. Decide whether ADDONS_SPEC.md
(internal spec) belongs in the repo.

## ⚙️ VPS runtime notes

- Build: `npm ci && npm run build`, serve: `npm run start` (port 3000 by
  default) behind a reverse proxy (nginx/caddy) with HTTPS.
- Use a process manager (pm2 / systemd) so the app survives reboots.
- Node 20+ (repo's @types/node targets 20).
- The dev/build scripts use the `--webpack` flag — keep it.
- ISR/revalidation (the 5-minute content refresh) works out of the box with
  `next start` — no extra config.

## ⚠️ Post-deploy verifications (need admin dashboard access)

Never verified during the build — no admin credentials were available:

- [ ] Submit the contact form on the live site → lead visible in admin Leads.
- [ ] Submit the fleet form → lead visible as FLEET with vehicle fields.
- [ ] Edit a stat/FAQ/testimonial in admin → site updates within ~5 minutes.

Verified from outside already: platform returns real lead IDs, honeypot
submissions are accepted-and-discarded, API-down shows the error state.

## ℹ️ Known open items (not blockers)

- **Footer social icons** all link to `#` — replace with real profile URLs in
  [components/Footer.tsx](components/Footer.tsx) (`SOCIALS` array).
- **Item 11 (coverage map)** unbuilt — waiting on `NEXT_PUBLIC_GOOGLE_MAPS_KEY`
  (platform ticket UT-05). Site renders fine without it.
- **Items 14/15** optional per spec, unbuilt (in-cab screen simulation; hero
  background video awaiting client footage).
- **CMS content gaps**: case studies index shows "Coming soon" (no entries);
  Starter/Growth/Premium plans show fallback copy until the plan editor is
  populated; one FAQ answer contains a mojibake `�` character in the
  platform's own seed data — fix the text in the admin dashboard.
- **Homepage "Who We Serve" grid** still shows the original 10 industries;
  the marquee carries the full 17 (spec item 16 scoped the marquee only).
- Lighthouse baseline at handoff: every audited page ≥ 90 on
  Performance/Accessibility/SEO (homepage 91 — depends on the RotatingWord
  5s first-rotation hold and the hero h1 having no entrance animation; keep
  both if editing the hero).
