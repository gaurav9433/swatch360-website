# SWatch360 Marketing Website

Static marketing website for **SWatch360**, the Dexter product family's infrastructure health monitoring platform for distributed sites — across warehouses, retail, data centers, enterprise, BFSI, and more — by **SEPLE NovaEdge Pvt. Ltd.**

Built with plain **HTML + CSS + Vanilla JavaScript** — no frameworks, no build step.

## Files

```
swatch360-website/
├── index.html
├── CNAME
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
└── README.md
```

## Local Development

Open the file directly in a browser:

```bash
open index.html
```

Or serve locally:

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploy

GitHub Pages or any static hosting provider. No build command — serve the repository root as static files.

- **Custom domain:** swatch360.seple.in (pinned via the `CNAME` file)
- **Application login:** https://seple.iot-private.cloud/

## Sections

Sticky navbar · Hero with branch-health dashboard mockup · Metrics strip · Problem/Solution ·
Platform features · Devices monitored · Compliance · How it works · Use cases ·
SLink edge gateway (hardware illustration) · Deployment models · Integrator program ·
Pricing (monthly/annual toggle) · FAQ accordion · Final CTA · Footer.

## Content & Positioning Notes

- SWatch360 is a **device health monitoring** platform — not a VMS, CCTV viewer, or generic IoT platform.
- All icons are inline SVG; all mockups (dashboard + SLink gateway) are CSS/SVG — no stock photos or screenshots.
- Fonts: Inter (Google Fonts).
- Compliance copy uses "designed for" / "supports" language; no certifications are claimed.
- No internal stack, protocol, or firmware details are exposed in visible copy.
- Pricing is indicative and exclusive of GST; SLink hardware is quoted separately.

## SEO, Lead Capture & Estimator (v4 enhancements)

- **Structured data (JSON-LD)** added in `index.html` `<head>`: `Organization`, `LocalBusiness`, `Product`, `BreadcrumbList`, and `FAQPage` (mirrors all 15 visible FAQs). No ratings, reviews, customer logos, or certifications are claimed.
- **Schema markup** uses only safe public information (company name, Kolkata/India, sales@seple.in, product category).
- **Open Graph / Twitter** tags added, including `og:image` → `assets/og/swatch360-og.svg`.
  - **OG asset:** `assets/og/swatch360-og.svg` (1200×630, CSS/SVG generated — no stock images).
  - ⚠️ Note: most social scrapers (Facebook/LinkedIn/X) do **not** reliably render SVG `og:image`. For production previews, export `swatch360-og.svg` to a 1200×630 **PNG** and point `og:image`/`twitter:image` at it.
- **Demo form (`#demo`)** is **static / client-side only**. It validates required fields (name, company, email format, optional phone, industry, sites) and, on success, shows guidance plus a **prefilled `mailto:sales@seple.in`** link. **No backend endpoint is configured** and no data is sent to any third party. Wire it to a CRM/form backend to capture submissions automatically.
- **Pricing estimator** is **client-side only**: `Site Monitor ₹499 × sites`, `Operations ₹899 × sites`, annual = `monthly × 12 × 0.85` (15% saving). Enforces minimum billing (Site Monitor 10, Operations 25) and shows a "minimum billing applies" note below the minimum. SLink hardware is excluded and noted as quoted separately.
- **Analytics:** no provider is configured. `swTrack()` in `main.js` is a no-op placeholder; event names (`demo_form_submit`, `pricing_estimate_calculated`, `pricing_toggle_changed`, `faq_opened`, `cta_clicked`, `login_clicked`, `datasheet_clicked`) are wired to it but send nothing until a destination is added.
- **CTA hierarchy:** primary "Request Demo" CTAs scroll to `#demo`; "See How It Works" → `#platform`; footer email (`sales@seple.in`) retained as fallback.

Deployment instructions are unchanged (see below).

## Contact

sales@seple.in

© 2026 SEPLE NovaEdge Pvt. Ltd. All rights reserved.
