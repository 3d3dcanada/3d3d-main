# 3D3D Homepage Complete Rebuild Plan

**Date:** 2026-03-20
**For:** Next agent session — execute this plan in full

---

## WHO KEN IS

Ken is a one-person specialty fabrication operation. He is not a print farm. He is not a factory. He is a maker-entrepreneur who:

- Built 3D3D from an RV running three printers off a $30/day generator in 35-degree heat
- Has ten years as a mechanic — he understands engines, performance, and what breaks under stress
- Has built performance engines and worked with drag cars
- Learned sailing by doing a duo passage from Halifax, Nova Scotia to Antigua with Christopher Stanmore-Major (CSM) — his very first sail. They hit a cat-one storm: 70-knot sustained winds, 90-knot gusts. He accepted the possibility of the end. He learned everything about what breaks on boats and why.
- Since then: multiple transatlantics, Rolex Fastnet Race, two-day solo sail up the Saint John River
- Is sailing the 2026 Newport Bermuda Race (120th running) with a Prusa CORE One L printing live onboard — not sponsorship, proof of deployment
- Prusa Research recognized a year of daily commitment and is sending their flagship machine

Ken's competitors — the people doing similar things — are companies like:
- **Solvit3D** (Germany) — two brothers making custom boat parts, personal tone
- **Sea3D** (Palma) — a superyacht captain + engineer making end-use marine parts
- **HV3DWorks** (Pennsylvania) — classic car restoration, "Making Un-Obtainium Obsolete"
- **Craitor** (San Diego) — field-deployable 3D printing for US Marines
- **SeaBits** — liveaboard maker who writes deep technical content and sells solutions

The pattern: domain expertise before technology. They don't say "we're a 3D printing company." They say "we're sailors / racers / mechanics who use 3D printing to solve problems nobody else can."

---

## WHAT THE SITE'S GOAL IS

The goal is NOT "buy a print from me." The goal is:
- Support me
- Fly me to where you need fabrication done
- Let me join your event
- Let me show you what 3D printing can do
- Let me turn every skeptic into a believer
- Let me show people how you can build a company like this
- Get involved — this is much bigger than parts

---

## TECH STACK (DO NOT CHANGE)

- Astro 6, static output, Tailwind CSS v4
- File to rewrite: `src/pages/index.astro`
- Files to fix: `src/components/SiteSidebar.astro`, `src/components/Footer.astro`
- Also needs: `src/pages/contact.astro` (currently broken — white on white)
- Deploy: Cloudflare Pages via GitHub Actions (already configured)
- Commit author: `3d3dcanada <214542816+3d3dcanada@users.noreply.github.com>`
- Build check: `npm run build` must pass with 0 errors

---

## DESIGN DIRECTION

### Visual System
- **Dark editorial with precision engineering feel** — NOT all white
- **Alternating dark (#111214) and light (#F6F7FA) section bands** — high contrast between sections
- **THICK BLACK BORDERS (2-3px solid #1A1A1A) on EVERYTHING** — every card, every button, every panel, every image container. This is non-negotiable. The user has asked for this repeatedly.
- **Teal (#40C4C4) as primary accent, Magenta (#E84A8A) as secondary**
- **Typography that takes up space:** Archivo Black for headlines, Instrument Sans for body, tracked-out uppercase Archivo for labels
- **No white-on-white.** Every element must be visually defined with borders, background contrast, or both.

### Animation System (MANDATORY — EVERY ELEMENT)
Every single element on the page must animate on entry. No exceptions. The current site has zero visible animation.

Use a scroll listener (NOT IntersectionObserver) that checks `getBoundingClientRect().top < window.innerHeight + 300` on every scroll event.

Different animation types for different elements:
```css
/* Text blocks: slide up */
.reveal-up { opacity: 0; transform: translateY(32px); transition: opacity 0.65s, transform 0.65s cubic-bezier(0.16,1,0.3,1); }

/* Images: scale reveal */
.reveal-scale { opacity: 0; transform: scale(0.94); transition: opacity 0.6s, transform 0.6s cubic-bezier(0.16,1,0.3,1); }

/* Left entry */
.reveal-left { opacity: 0; transform: translateX(-40px); transition: opacity 0.65s, transform 0.65s cubic-bezier(0.16,1,0.3,1); }

/* Right entry */
.reveal-right { opacity: 0; transform: translateX(40px); transition: opacity 0.65s, transform 0.65s cubic-bezier(0.16,1,0.3,1); }

/* Mask wipe for hero images */
.reveal-mask { clip-path: inset(0 100% 0 0); transition: clip-path 0.8s cubic-bezier(0.16,1,0.3,1); }
.reveal-mask.revealed { clip-path: inset(0 0% 0 0); }

.revealed { opacity: 1; transform: none; }
.delay-1 { transition-delay: 0.1s; }
.delay-2 { transition-delay: 0.2s; }
.delay-3 { transition-delay: 0.3s; }
.delay-4 { transition-delay: 0.4s; }
.delay-5 { transition-delay: 0.5s; }
```

Hero must animate on page load (CSS `animation`, not scroll-triggered). Buttons must have hover states (scale, color shift, border glow). Images must zoom slightly on hover (scale 1.03). Cards must lift on hover (translateY(-4px) + shadow).

### Off-Canvas Drawers (MANDATORY)
A reusable slide-in panel component. Triggered by buttons throughout the page. Opens from right on desktop (400px wide), bottom sheet on mobile. Dark background (#111214), teal left border. Closes on Escape, backdrop click, or X button.

Each service section, each tier, each partner card should have a drawer with expanded detail, additional photos, and a CTA.

---

## SIDEBAR FIX

Current problems: opens to blank white space, no button definition, can't close it.

Fix:
- Dark background (#111214) or very light with thick borders
- Every nav item must have visible padding, border-bottom or background on hover
- Close button (X) must be visible and prominent, top-right
- On mobile: proper off-canvas with backdrop overlay
- CTA button ("Request Service") must have thick teal border and be visually prominent
- Social links must be visible and styled

---

## CONTACT PAGE FIX

`/contact` is currently white-on-white, unreadable.

Fix:
- Dark header band with page title
- Form fields with thick black borders, visible labels
- Description text explaining what 3D3D does and what to expect
- Include: name, email, description of project/problem, file upload option
- Include phone number and email as direct contact alternatives
- Include location: "Atlantic Canada based. Serving the United States and Canada."

---

## HERO SECTION (dark background #111214)

**Background:** `fleet-start-press.jpg` — this is the most iconic image available. Use it at 40% opacity as background. Overlay the hero video (`hero-loop.mp4`, compressed to <2MB) on the right side with blend/mask.

**Copy:**
```
EYEBROW: Specialty Fabrication · Marine · Motorsport · Field Deployment

H1: You have a problem.
    I am your solution.

BODY: 3D3D takes pride in building quality functional parts,
replacements, and custom fabrication. We reproduce things you
can't find. We engineer solutions that don't exist yet. We
design for the conditions your parts actually face — saltwater,
heat, vibration, impact. Atlantic Canada based, serving the
United States and Canada.

CTA 1: [Request Service →] /contact  (teal bg, thick black border)
CTA 2: [Support the Campaign →] ko-fi.com/3d3dca  (ghost, thick black border)
```

**NO stat cards.** Remove "3 active print platforms" and "120th Newport Bermuda" and "1 year built from nothing." These communicate nothing.

**Proof rail** (small, below CTAs):
```
● Founder-operated · Atlantic Canada
● Marine · Motorsport · Custom
● Prusa ecosystem · Open-source
● Newport Bermuda 2026
```

**DO NOT write "Fredericton, New Brunswick" anywhere.** Use "Atlantic Canada" or "New Brunswick based."

**Animation:** H1 lines split-reveal on load with stagger. Body text fades in after. CTAs slide up. Proof rail dots snap in left to right. Background image has subtle parallax.

---

## SERVICES — SECTOR MODULES (alternating light/dark bands)

NOT a card grid. Four full-width alternating modules. Odd: image left, text right. Even: text left, image right. Each with a THICK BLACK BORDER around the image and a teal left-border on the text column.

### Module 1 — Marine & Offshore (dark band)
**Image:** `winch-cup-holder.jpg`
```
EYEBROW: Marine & Offshore
H3: Built for conditions that destroy everything else.
BODY: Custom winch components, deck hardware, replacement fittings, and
purpose-built parts engineered to survive saltwater, UV exposure, and
open-ocean conditions. We work with materials rated for marine
environments — ASA, PETG-CF, PPS, PPA — because the cheapest filament
is never the right filament when your part is 600 miles from shore.
CTA: [See marine capabilities →] (opens drawer)
```

### Module 2 — Automotive & Motorsport (light band)
**Image:** `radio-button-replacement.jpg`
```
EYEBROW: Automotive & Motorsport
H3: We know performance. We've built it.
BODY: Ten years as a mechanic. Performance engine builds. Drag cars
that break things when they run. 3D3D understands automotive
engineering because the founder has lived it. Radio knob replacements,
custom brackets, aftermarket components, engine-adjacent parts in
heat-resistant compounds. If it broke or was never made, we build it.
CTA: [Send your build spec →] (opens drawer)
```

### Module 3 — Repair & Replacement (dark band)
**Image:** `custom-tv-mount.jpg` OR `blue-fitment-caps.jpg` (NOT spray-can-adapter — wrong context)
```
EYEBROW: Repair & Replacement
H3: The part doesn't exist anymore. We make it exist.
BODY: Discontinued components, obsolete fittings, worn-out pieces
that no supplier carries. 3D3D reverse-engineers from reference
samples or measurements and produces exact-fit replacements in
functional-grade materials. One piece or a short production run.
Every part reviewed and tested before it ships.
CTA: [Tell us what you need →] (opens drawer)
```

### Module 4 — Custom & Field Fabrication (light band)
**Image:** `printer-action-cf.jpg`
```
EYEBROW: Custom & Field Fabrication
H3: No blueprint required. Bring the problem.
BODY: Custom mounts, jigs, adapters, enclosures, tooling, and
one-off solutions. Carbon fibre, flexible, rigid, high-temp
compounds including PPS, PPA-CF, and PEEK. Design-from-brief
available. We also deploy — fly us to your location, your event,
your boat. We bring the operation to where the problem is.
CTA: [Start a project →] (opens drawer)
```

**Each drawer contains:** 3-4 example photos from workshop folder, materials list for that sector, typical turnaround note, and a "Request this type of work" button linking to `/contact`.

**Animation:** Image mask-wipes from edge. Text slides in from opposite side. Bullets stagger in.

---

## ORIGIN STORY (dark band, #111214)

**Layout:** Two overlapping photos left (`rv-lab-02.jpg` main, `rv-lab-03.jpg` offset below), text right.

**Copy:**
```
EYEBROW: Where this started

H2: An RV, a generator,
and every reason to quit.

BODY: 3D3D started in a recreational vehicle. Three printers running
off a generator — $30 a day in gas, 35-degree heat, everything
breaking constantly. The printers, the power, the plans.

A year of daily printing, daily failing, and daily rebuilding until
the work was undeniable. Today the operation is stable. Prusa Research
recognized that year of commitment and is sending a CORE One L —
their flagship machine.

The mentality hasn't changed: if it can break, it will. So every part
is built not to.
```

**Three photos in row below:** `rv-lab-01.jpg`, `rv-lab-02.jpg`, `rv-lab-03.jpg` — all three RV photos, proper sizing with thick black borders.

---

## SAILING STORY & DEPLOYMENT (dark band with `fleet-running.jpg` bg at 25% opacity)

**This section tells the sailing story and leads into Newport Bermuda.**

```
EYEBROW: From Halifax to Antigua — and everything since

H2: The ocean taught me
everything I build for.

BODY: My first time sailing was a duo passage with Christopher
Stanmore-Major. Halifax, Nova Scotia to Antigua. No experience.
We hit a cat-one storm — 70-knot sustained winds, 90-knot gusts.
I accepted a lot of things on that passage, including the end.

That trip taught me everything that matters about what breaks,
why it breaks, and what you have to accept when there's no option
to stop. Since then — transatlantics, the Rolex Fastnet Race,
two days solo up the Saint John River.

Every part that leaves 3D3D is built by someone who has seen
firsthand what failure looks like 600 miles from shore.
```

**Credentials strip** (small, factual, horizontal):
```
Halifax → Antigua · Transatlantics · Rolex Fastnet · Solo Saint John River · Newport Bermuda 2026
```

**Newport Bermuda sub-section:**
```
H3: 2026 Newport Bermuda Race — 120th Running

BODY: For the 120th running of one of offshore sailing's most
demanding races, 3D3D is aboard with a Prusa CORE One L printing
live — real parts, real problems, real conditions. This is not
sponsorship. This is proof of deployment.

CTA 1: [Follow the campaign →] /blog
CTA 2: [Sponsor the expedition →] ko-fi.com/3d3dca  (PROMINENT — teal bg, thick border)
```

**Three campaign photos in row:** `sunrise-offshore.jpg`, `golden-hour-01.jpg`, `afternoon-racing-01.jpg` — thick black borders, slight hover zoom. On mobile: horizontal scroll strip.

---

## HOW TO WORK WITH 3D3D (light background)

**NOT three equal columns. NOT a SaaS pricing table.**

Use the **engagement model** pattern: three full-width horizontal bands, clearly differentiated. Each band opens a drawer with full detail when clicked.

### Band 1 — Send Us the Problem (clean, minimal)
```
H4: One-off & Project Work
BODY: You have a broken part, a fitment problem, or something
that needs to exist. Send the details. We'll review, quote,
produce, and ship. No subscription. No commitment. Just the work.
CTA: [Request a build →] /contact
```

### Band 2 — Priority Access (teal left border, slightly elevated)
```
H4: Priority Fabrication
BODY: Faster response. Direct communication. Your project moves
to the front. Priority clients also directly support 3D3D's
operational growth and campaign preparation.
CTA: [Get priority access →] /contact
```

### Band 3 — Retained / Expedition Support (dark bg, teal top border, `golden-hour-03.jpg` at 15% right)
```
H4: Retained & Expedition Support
BODY: Ongoing access to fabrication capability. Consultation calls.
File preparation. Printer setup guidance — we'll fly to your
location and set you up with everything you need. This is an
operational relationship, not a subscription box.

For supporters above a threshold: retained consultation, direct
founder access, campaign updates, recognition on the expedition.
CTA: [Support on Ko-fi →] ko-fi.com/3d3dca  (large teal button)
CTA: [Contact for retained access →] /contact
```

**Full-width partnership band below** (teal bg, white text):
```
Partnerships & Sponsorships
For brands, marine organizations, race sponsors, and media partners.
Campaign alignment. Equipment partnerships. Live event presence.
CTA: [Partner with 3D3D →] /contact
```

---

## OPEN SOURCE / COMMUNITY (light band)

**Left copy:**
```
EYEBROW: Open-source at the core

H2: The files are open.
The knowledge is shared.

BODY: 3D3D is built on open tools, open hardware, and open
community values. If you want the file, you can have it.
If you need help setting up your own printer, we do that too —
remote or on-site, anywhere.
```

**Right — three distinct cards** (thick black borders, each with purpose):

**Card 1 — Printable Designs** (image: `modular-parts-flatlay.jpg`)
```
Browse tested, functional designs available for free download.
Parts that have been printed, used, and proven.
LINK → printables.com/@KTK3D_3050116
```

**Card 2 — Support the Work** (image: one of the golden-hour sailing photos)
```
Ko-fi is the direct line. Support operational costs, campaign
prep, and open-source contributions. Every supporter matters.
LINK → ko-fi.com/3d3dca
```

**Card 3 — GitHub** (dark card, no photo)
```
Code, tooling, and documentation — published openly
as the operation grows.
LINK → github.com (or actual repo)
```

---

## PARTNERS (dark band)

Three cards with PROPER images, thick black borders, and CTAs.

**Card 1 — Prusa Research**
Image: USE A REAL PRUSA IMAGE. Either:
- Use Gemini/browser to find and save a Prusa CORE One product image
- Or use `printer-action-cf.jpg` ONLY if it shows a Prusa (it shows a Flashforge — DO NOT USE)
- Generate or find a proper image of a Prusa CORE One printer
```
Prusa Research
3D3D has operated on the Prusa ecosystem from day one. After a
year of documented work, Prusa is sending a CORE One L — their
flagship. That's recognition, not marketing.
CTA: [About Prusa →] prusa3d.com
```

**Card 2 — Christopher Stanmore-Major**
Image: `helm-close.jpg` (AT THE HELM — not a knee shot. Verify this image actually shows the helm.)
If `helm-close.jpg` doesn't work, use `race-morning-crew.jpg`.
```
Christopher Stanmore-Major
Captain. Offshore sailor. The reason Ken ever stepped on a boat.
CSM sponsored Ken's place on the 2026 Newport Bermuda Race and
is the operational partner for live deployment.
CTA: [The 2026 campaign →] /blog
```

**Card 3 — Sponsorship**
Image: `fleet-aerial.jpg` or `golden-hour-02.jpg`
```
Your Brand Here
One partnership slot available for the 2026 Newport Bermuda
deployment. Live 3D printing. Offshore race coverage. Real proof.
CTA: [Partner with 3D3D →] /contact
```

---

## FINAL CTA (teal background #40C4C4)

```
H2: Need a part? Need a fabricator on call?
Need someone who actually knows what breaks?

BODY: Send the problem. Send the broken part. Send the sketch.
3D3D builds for people who need performance, not excuses.

CTA 1: [Request Service →] /contact  (white bg, black text, thick border)
CTA 2: [Support on Ko-fi →] ko-fi.com/3d3dca  (ghost, white border)
```

---

## FOOTER

**Column 1 (span 2):**
- 3D3D name
- "Specialty fabrication for marine, motorsport, and field deployment. Founder-operated. Atlantic Canada."
- Phone: 506-953-2678
- Email: info@3d3d.ca
- All 7 social links with icons

**Column 2:** Navigate links

**Column 3:** Legal links

**Bottom bar:** `© 2026 3D3D. Founder-operated specialty fabrication. Atlantic Canada, serving globally.`

**REMOVE:** "Materials: PLA · PETG · TPU · ABS · ASA"

---

## BLOG REQUIREMENT

The blog needs 20-30 posts. The next agent should generate subject lines and brief outlines for at least 30 blog posts covering:
- Why we chose Prusa and the quality behind it
- New 3D printers coming out in 2025-2026
- How 3D printing helps people globally
- Setting up Prusa printers at home — we offer guided setup
- Materials guides (PETG, ASA, CF compounds, PEEK, PPS)
- Marine 3D printing use cases
- Automotive restoration with 3D printing
- The Newport Bermuda campaign trail
- Open-source and why it matters
- Case studies of specific parts built
- Field deployment stories
- How to package and ship 3D printers
- Why the Prusa CORE One L matters
- Groundbreaking advances in 3D printing (March 2026)

Each post should be dated across the past year, written in Ken's voice, and not sound AI-generated.

---

## VIDEO REQUIREMENTS

1. `hero-loop.mp4` — compress to <2MB, max 8 seconds, autoplay muted loop
2. `racing-01.mp4` — use in deployment section
3. `sailing-open.mp4` — use in sailing story section
4. `race-day.mp4` — available in drawer or lightbox
5. `onboard-crew.mp4` — use near expedition/retained support

Compress all with: `ffmpeg -i input.mp4 -vf scale=-2:720 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 64k -movflags +faststart output.mp4`

Never autoplay more than one video in viewport at once on mobile.

---

## IMAGE RULES

- If you don't understand what a photo shows, DO NOT use it. Ask or skip.
- Every image container gets a thick black border (2-3px solid #1A1A1A)
- Workshop photos go in fabrication/service sections only
- Sailing photos go in campaign/deployment sections only
- RV photos go in origin section only
- If a proper image doesn't exist for something (e.g., Prusa product shot), use the browser to find one via Google Images, or generate one with Gemini
- The spray-can-adapter photo is a functional print — use it for custom fabrication or not at all
- `fleet-start-press.jpg` is the most iconic photo — use it as hero background, not buried at the footer

---

## LOCATION RULES

- NEVER write "Fredericton, New Brunswick" on the visible page
- Use: "Atlantic Canada based" or "New Brunswick based"
- SEO metadata can include: Fredericton, New Brunswick, Atlantic Canada, United States, Canada, Newport Rhode Island, Bermuda, Antigua, Caribbean Islands
- Schema.org can include full address for local SEO

---

## MATERIALS TO MENTION

Do NOT limit to PLA, PETG, TPU, ABS, ASA. The full list:
- PLA (annealed for strength)
- PETG / PETG-CF (carbon fibre compound)
- ASA (UV-stable, outdoor)
- ABS
- TPU (flexible)
- PPS (high-temp, chemical resistant)
- PPA / PPA-CF (high performance)
- PEEK (aerospace-grade, extremely high temp)
- Nylon / PA-CF
- PC (polycarbonate)

Research what Bambu Lab, Prusa, and high-end material suppliers are offering as of March 2026.

---

## ACCEPTANCE TESTS

1. A visitor knows within 3 seconds: what 3D3D does, that it's one person, and how to take action
2. Every element on the page has a visible animation on scroll entry
3. Every card, button, image, and panel has a thick black border
4. No white-on-white anywhere — every element is visually defined
5. The sidebar opens, closes, and has visually defined nav items
6. The contact page is readable and functional
7. Ko-fi link appears at least 3 times on the homepage (hero CTA, expedition section, support section)
8. No wrong images (no Flashforge for Prusa, no knee for CSM, no spray can for repair)
9. All 5 videos are compressed and present on the site
10. Blog has 20+ posts with real dates and real content
11. Off-canvas drawers work for each service module
12. Mobile experience is intentional and premium
13. `npm run build` passes with 0 errors
14. No placeholder text, no Lorem, no TODO, no generic filler

---

## SIMILAR COMPANIES TO REFERENCE FOR TONE AND LAYOUT

Study these before writing any copy:
- **HV3DWorks** (hv3dworks.com) — "Making Un-Obtainium Obsolete" — perfect tone for repair/replacement
- **Sea3D** (sea3d.net) — domain expertise before technology, personal founder story
- **Craitor** (craitor.com) — field-deployable manufacturing, military-grade proof
- **SeaBits** (seabits.com) — deep technical content, maker who lives on a boat
- **Solvit3D** (solvit3d.com) — practical, personal, engineers who sail

Study these for design patterns:
- **SendCutSend** (sendcutsend.com) — clean card-based material selector
- **Fictiv** (fictiv.com) — premium manufacturing feel
- Research "Tech Spec" design trend (Philip VanDusen 2026) — engineered precision, wide tracking, strict grids

---

*End of plan. Execute in full. Do not skip sections. Do not use placeholder text.*
