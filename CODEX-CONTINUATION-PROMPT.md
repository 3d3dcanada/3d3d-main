# GPT Codex Continuation Prompt — 3D3D Homepage Redesign

Paste the content below the divider into a new Codex chat.

---

## CONTEXT

You are continuing a homepage redesign for **3D3D** (`3d3d.ca`), a precision 3D printing and fabrication company. The project is at `/home/wess/3d3d-platform` — an Astro 6 site with Tailwind CSS v4, deployed to Vercel.

**Critical deployment rule:** Every git commit must use the author identity `3d3dcanada <214542816+3d3dcanada@users.noreply.github.com>` or Vercel will block the deploy. Use: `git commit --author="3d3dcanada <214542816+3d3dcanada@users.noreply.github.com>"`.

The site structure:
- `src/pages/index.astro` — homepage (one-page anchor nav)
- `src/layouts/BaseLayout.astro` — wraps all pages, includes sidebar
- `src/components/SiteSidebar.astro` — fixed left sidebar (240px desktop, hamburger mobile)
- `src/styles/global.css` — all design tokens via CSS custom properties, Tailwind v4 `@theme {}`
- `public/` — static assets, videos go in `public/media/`

---

## WHAT WAS DONE (AND WHAT WAS WRONG)

A previous agent rewrote the homepage with the correct sections and information architecture. However, two things were done incorrectly and must be fixed:

1. **Wrong brand colors.** The agent used navy (#0D3B6E) and orange (#F55B1E) instead of the actual brand colors. The real 3D3D brand colors are:
   - Neon teal: `#40C4C4`
   - Neon magenta: `#E84A8A`
   - The background should be a warm off-white / sail white (light, not dark)
   - Text should be near-black / graphite
   - Do NOT use navy as the primary accent. Do NOT use orange. Use teal and magenta as the two primary accent colors.

2. **Photos were barely used.** The site felt fake because real photos were not incorporated. This must be fixed by copying real photos from the source folder and placing them meaningfully throughout the homepage.

---

## STEP 1 — COPY AND COMPRESS VIDEOS

Copy these 5 videos from `/home/wess/Desktop/website pics and vids/website/` into `public/media/`:

```
VID_20250724_082006.mp4    → public/media/hero-loop.mp4
VID_20250724_112938.mp4    → public/media/racing-01.mp4
VID_20250725_154427.mp4    → public/media/sailing-open.mp4
VID_20250726_124131.mp4    → public/media/race-day.mp4
VID_20250726_143627.mp4    → public/media/onboard-crew.mp4
```

Compress each using ffmpeg to web-safe sizes (target ≤ 8 MB each, 720p, H.264, AAC):

```bash
ffmpeg -i source.mp4 -vf scale=-2:720 -c:v libx264 -crf 26 -preset slow -c:a aac -b:a 96k -movflags +faststart output.mp4
```

`hero-loop.mp4` will be used as the autoplay muted background in the hero section. The others will be used in the race/field deployment section.

---

## STEP 2 — COPY PHOTOS

Copy these photos from `/home/wess/Desktop/website pics and vids/website/` into `public/media/real/`:

```
IMG_20250723_090146.jpg    → morning-dawn-deck.jpg        (dawn light, deck/water view)
IMG_20250723_090203.jpg    → dawn-approach.jpg            (early morning race prep)
IMG_20250723_160529.jpg    → afternoon-sail.jpg           (afternoon sailing)
IMG_20250723_183707.jpg    → evening-fleet.jpg            (evening fleet on water)
IMG_20250723_221250.jpg    → marina-night-01.jpg          (marina at night)
IMG_20250723_221315.jpg    → marina-night-02.jpg          (marina night, lights)
IMG_20250723_222555.jpg    → moonlit-marina.jpg           (moonlit marina)
IMG_20250723_223452.jpg    → night-dock.jpg               (boat at night dock)
IMG_20250724_094607.jpg    → race-morning-crew.jpg        (crew on deck, racing)
IMG_20250724_095751.jpg    → helm-close.jpg               (at the helm)
IMG_20250724_122141.jpg    → open-ocean-01.jpg            (open water passage)
IMG_20250724_123036.jpg    → fleet-running.jpg            (race fleet, spread out)
IMG_20250724_123040.jpg    → fleet-running-02.jpg         (fleet on water)
IMG_20250724_154150.jpg    → afternoon-racing-01.jpg      (racing in good wind)
IMG_20250724_154201.jpg    → afternoon-racing-02.jpg      (racing, sails set)
IMG_20250724_191524.jpg    → sunset-sail-01.jpg           (late afternoon, golden light)
IMG_20250724_191534.jpg    → sunset-sail-02.jpg           (sunset sailing)
IMG_20250724_193524.jpg    → golden-hour-01.jpg           (golden hour on water)
IMG_20250724_193536.jpg    → golden-hour-02.jpg           (golden hour, boat detail)
IMG_20250724_193559.jpg    → golden-hour-03.jpg           (golden hour, wide)
IMG_20250724_200336.jpg    → evening-passage.jpg          (evening passage)
IMG_20250725_064732.jpg    → sunrise-offshore.jpg         (sunrise at sea)
IMG_20250725_120233.jpg    → offshore-day-01.jpg          (offshore, full day sailing)
IMG_20250725_120237.jpg    → offshore-day-02.jpg          (offshore sailing, crew)
IMG_20250726_121402.jpg    → race-finish-01.jpg           (late race, final leg)
IMG_20250726_121411.jpg    → race-finish-02.jpg           (race finish area)
IMG_20250726_165604.jpg    → coastal-landmark.jpg         (The Needles / Isle of Wight)
FB_IMG_1753960086118.jpg   → fleet-start-press.jpg        (professional fleet start photo — check usage rights before publishing)
FB_IMG_1753960105911.jpg   → fleet-aerial.jpg             (fleet aerial or wide view)
```

Resize photos for web using ImageMagick or ffmpeg (max 1920px wide, progressive JPEG, ≤ 400 KB each):

```bash
convert source.jpg -resize 1920x1920\> -quality 82 -interlace Plane output.jpg
```

---

## STEP 3 — HOMEPAGE SECTIONS AND PHOTO PLACEMENT

Rewrite `src/pages/index.astro` using the sections below. Every section must use at least one real photo. Do not write any placeholder text — use the actual copy provided.

### Brand colors to use throughout:
```css
--color-teal: #40C4C4;
--color-magenta: #E84A8A;
--color-bg: #F6F7FA;          /* sail white, primary background */
--color-surface: #FFFFFF;      /* card/panel surfaces */
--color-text: #1A1A1A;         /* graphite / near-black text */
--color-text-muted: #666666;
```

Buttons, accents, and highlights use teal as primary and magenta as secondary/hover.

---

### Section 1 — Hero (`#home`)

**Layout:** Split — left column has text + CTAs, right column has a large photo or autoplay video.

**Video:** Use `hero-loop.mp4` as an autoplay, muted, loop video in the right column. Include a poster image (use `race-morning-crew.jpg`).

**Left column copy:**
```
Eyebrow: Precision Fabrication · Marine · Racing

Headline: Built for the water.
Built to last.

Subheadline: 3D3D delivers rapid, high-quality 3D print production, marine-grade fabrication, replacement parts, and retained support — built on open-source principles and real-world field experience.

CTA 1: Request Service → /contact
CTA 2: Follow the Project → (links to socials or /blog)

Trust strip: Open-source driven · Prusa-backed · Field-tested
```

**Right column:** Autoplay looping video (`hero-loop.mp4`), cropped to a tall rectangle. On mobile, stack below text.

Below the main hero, add a row of small stat cards (no icons — just numbers and labels):
```
3 · Print Platforms Active
2026 · Newport Bermuda Race
100% · Open-source ethos
```

---

### Section 2 — Services (`#services`)

**Layout:** 4-column card grid (2 columns on mobile).

No photos needed in this section — clean cards with short copy.

**Cards:**
```
Title: Precision Print Production
Body: Fast-turn 3D printing for functional parts, prototypes, and custom fabrication. Dimensional accuracy. No shortcuts.

Title: Marine & Field Fabrication
Body: Purpose-built parts for harsh environments. Saltwater-safe materials, marine-grade tolerances, field-ready output.

Title: Replacement Parts & Prototypes
Body: From one-off replacements to small production runs. If it can be printed, 3D3D will build it right.

Title: Retained Fabrication Support
Body: Ongoing service access for clients who need a reliable fabrication partner on call. Priority response. No queue.
```

---

### Section 3 — Why 3D3D (`#why`)

**Layout:** Two-column — left is a large photo, right is text + proof points.

**Photo (left):** `golden-hour-01.jpg` (or `helm-close.jpg` — use whichever reads better as a portrait crop).

**Right column copy:**
```
Eyebrow: Why hire 3D3D

Headline: Built from the ground up.
No theory. No shortcuts.

Body: 3D3D is not a print farm run by a reseller. It is a founder-operated fabrication operation, built from scratch under real-world constraints, obsessive about quality, and experienced in high-stakes environments. Every part that leaves here is reviewed, tested, and built to perform.

Proof points (short list — no icons required):
· Practical manufacturing experience across marine, racing, and field use
· High-precision output with dimensional accuracy as a non-negotiable standard
· Open-source commitment — no lock-in, no proprietary gatekeeping
· Field-tested under real operating conditions, not just bench tests
· Direct access to the founder on every retained engagement
```

Below the proof points: Add a secondary photo as a half-width inset — use `offshore-day-01.jpg`.

---

### Section 4 — Race & Field Deployment (`#race`)

**Layout:** Full-width section with a large background image overlay (teal-tinted or dark overlay for legibility), then text centered or left-aligned.

**Background image:** `fleet-running.jpg` or `race-finish-01.jpg` — use object-fit: cover with a semi-transparent dark overlay (`rgba(0, 0, 0, 0.55)`).

**Copy:**
```
Eyebrow: 2026 Newport Bermuda Race — 120th Anniversary

Headline: A fabrication studio
in motion.

Body: 3D3D is bringing live 3D printing capability into the 2026 Newport Bermuda Race — the 120th running of one of offshore sailing's most demanding competitions. With a Prusa CORE One platform onboard, this is not a sponsorship arrangement. It is a proof of deployment: printing real parts, solving real problems, in a real race environment.

CTA: Follow the campaign → /blog
```

Below the main text block, add 3 photos in a row:
```
sunrise-offshore.jpg      (dawn at sea)
onboard-crew.jpg          (crew working)
coastal-landmark.jpg      (landmark / arrival)
```

---

### Section 5 — Service Tiers (`#tiers`)

**Layout:** 3 cards side by side (stack on mobile). No photos.

**Cards:**
```
Standard
For one-off requests and production needs.
Standard queue placement, fabrication review, and global shipping options.
CTA: Request a build

Priority
For clients who need faster response and preferred scheduling.
Accelerated turnaround, direct communication, priority production queue. Also supports the 3D3D mission and expansion.
CTA: Get priority access

Patron / Expedition Support
For long-term partners and serious supporters.
Retained access, project involvement, concierge-level support, periodic updates from the field, and recognition on the campaign.
CTA: Become a patron
```

Below the tier cards, a separate smaller block:
```
Partnerships & Sponsorships
For brands, marine organizations, event sponsors, and media partners.
Contact us to discuss campaign alignment, product placement, or equipment partnerships.
CTA: Partner with 3D3D → /contact
```

---

### Section 6 — Open Source (`#open-source`)

**Layout:** Two-column. Left: short text. Right: one photo + two or three links.

**Left copy:**
```
Eyebrow: Open-source at the core

Headline: We believe the ecosystem matters more than the lock-in.

Body: 3D3D is built on open-source tools, open hardware, and open community values. We help clients find the right files, models, and workflows — and we can fabricate, refine, and ship what they need. The repository is open. The knowledge is shared.
```

**Right column:** Use `dawn-approach.jpg` as a photo. Below it, link tiles:
```
Printables → https://www.printables.com/@KTK3D_3050116
MakerWorld → (if applicable)
GitHub → (if applicable)
```

---

### Section 7 — Partners (`#partners`)

**Layout:** Logo/card strip — 3 cards.

**Cards (no logos needed — text-based cards are fine):**
```
Prusa Research
Official partner and platform provider. 3D3D operates on the Prusa CORE One ecosystem.

CSM The Mariner
Marine partner.

Open Slot — Sponsorships available
Contact 3D3D to discuss campaign alignment, race presence, or equipment partnerships.
```

---

### Section 8 — Final CTA (`#contact`)

**Layout:** Full-width teal background block (use `--color-teal`). White text.

**Photo:** Place `fleet-start-press.jpg` as a background or inset (note: this is a professional photo — use at low opacity as background texture if rights are unclear, or as a decorative element only).

**Copy:**
```
Headline: Need a part, a prototype, or a retained fabrication partner?

Body: 3D3D builds for people who need performance, not excuses.

CTA 1: Request Service → /contact  (white button)
CTA 2: Follow the project → /blog  (ghost button, white outline)
```

---

## STEP 4 — FIX GLOBAL.CSS BRAND COLORS

In `src/styles/global.css`, ensure the CSS token block uses the correct brand colors:

```css
--color-accent: #40C4C4;        /* neon teal — primary accent */
--color-accent-secondary: #E84A8A; /* neon magenta — secondary accent */
--color-surface-primary: #F6F7FA; /* sail white background */
--color-text-primary: #1A1A1A;   /* graphite text */
```

Update `btn-primary` to use teal (`#40C4C4`) instead of any orange or navy.
Update any eyebrow dots, active nav indicators, and hover states to use teal and/or magenta.
The sidebar should remain light (not dark navy).

---

## STEP 5 — VERIFY BUILD

After all changes, run:
```bash
cd /home/wess/3d3d-platform && npm run build
```

The build must complete with 0 errors. Do not start the dev server unless specifically asked.

---

## RULES

- Do not write placeholder text anywhere. Every section copy above is the real copy — use it exactly as written, adjusting only for minor grammar if needed.
- Do not introduce stock photos, Lorem ipsum, or fake testimonials.
- Do not use orange or navy as primary brand colors. Teal and magenta are the brand.
- Do not start `npm run dev` unless asked.
- Do not push to git unless asked.
- Every photo used must come from the list above — real photos from the actual 3D3D sailing campaign.
- `FB_IMG_1753960086118.jpg` is a professional race photo (credit: Gilles Martin-Raget per public race coverage). Use with caution — low-opacity background use is safer than hero placement until rights are confirmed.
