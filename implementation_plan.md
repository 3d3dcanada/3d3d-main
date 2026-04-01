# 3D3D — Definitive Site Plan

> Built from a complete audit of 12 repos, 6 site versions, 51+ real photos, 21 workshop photos, 20 catalog products, 27 components, every strategy doc, and every line of copy on the live site.

---

## What This Plan Does

Take the existing [3d3d-platform](file:///home/wess/3d3d-platform) (Astro 6, Cloudflare Pages) and make it tell the **real story** — community, capability, quality — instead of being a dark-mode tech demo. No rebuild. No framework swap. Amplify what's here.

---

## Phase 1 — Navigation & Global Shell

### 1A. Sidebar → Full Site Navigation Tree

**File:** [SiteSidebar.astro](file:///home/wess/3d3d-platform/src/components/SiteSidebar.astro)

The sidebar currently has a flat list that each page passes in manually. Make it the **canonical nav** for the entire site with collapsible groups:

| Group | Links |
|---|---|
| **Fabrication** | Quote · Materials · Shop · FAQ |
| **The Story** | About · Gallery · Events · Blog |
| **Community** | Opportunities · Community · Sponsors |
| **Open Source** | GitHub · Printables · Old Girl · ORA |
| **Contact** | Contact · Book a Call · WhatsApp |
| **Legal** | Privacy · Terms · Shipping · CASL · Accessibility |

- Accordion expand/collapse per group (CSS `max-height` transition + JS toggle)
- Active page gets teal left-border (already working, just needs subpage detection)
- The sidebar nav data moves to a shared `src/data/siteNav.ts` — every page imports the same tree
- Footer also sources from this same data

### 1B. Mobile Bottom Bar → Real Navigation

**File:** [MobileCTA.astro](file:///home/wess/3d3d-platform/src/components/MobileCTA.astro) → Rename to `BottomNav.astro`

Currently social-only. Replace with 5 action tabs:

| Tab | Icon | Action |
|---|---|---|
| Home | 🏠 | Navigate to `/` |
| Quote | ✏️ | Navigate to `/quote` |
| Shop | 🛒 | Navigate to `/shop` |
| Community | 👥 | Navigate to `/community` |
| ☰ | Hamburger | Opens the sidebar |

- Same dark glass bar, same `env(safe-area-inset-bottom)` padding
- Social links move into the sidebar footer (they're already there)

### 1C. Phone Number Removal

Phone `+1 506 953 2678` appears in these files — remove the visible text, keep WhatsApp links:

| File | What to do |
|---|---|
| [BaseHead.astro](file:///home/wess/3d3d-platform/src/components/BaseHead.astro) | Remove `telephone` from Schema.org |
| [SiteFooterFull.astro](file:///home/wess/3d3d-platform/src/components/SiteFooterFull.astro) | Replace `tel:` link with WhatsApp pill |
| [contact.astro](file:///home/wess/3d3d-platform/src/pages/contact.astro) | Replace visible number with "WhatsApp →" button |
| [book.astro](file:///home/wess/3d3d-platform/src/pages/book.astro) | Replace visible number with WhatsApp link |
| [about.astro](file:///home/wess/3d3d-platform/src/pages/about.astro) | Remove from Schema.org `telephone` field |
| [privacy.astro](file:///home/wess/3d3d-platform/src/pages/privacy.astro) | Remove from officer contact section |

WhatsApp `wa.me/15069532678` links stay — they don't expose the number visually.

### 1D. Footer Cleanup

**File:** [SiteFooterFull.astro](file:///home/wess/3d3d-platform/src/components/SiteFooterFull.astro)

- Source nav from the shared `siteNav.ts` instead of duplicating links
- Add missing links: **GitHub** (`github.com/3d3dcanada`), **Printables** (`printables.com/@KTK3D_3050116`)
- Logo: keep [logo-badge.webp](file:///home/wess/3d3d-platform/public/media/brand/logo-badge.webp) (the neon magenta/cyan printer logo from [logo.jpg](file:///home/wess/archive/3d3d-legacy/logo.jpg) is the icon mark, [logo-badge.webp](file:///home/wess/3d3d-platform/public/media/brand/logo-badge.webp) is the proper badge)
- Update copyright to `© 2025–2026 3D3D Atlantic Cooperative`

---

## Phase 2 — Homepage: Color, Copy & Content

### 2A. Color Transition: Dark Hero → Light Body

**File:** [index.astro](file:///home/wess/3d3d-platform/src/pages/index.astro), [splash.css](file:///home/wess/3d3d-platform/src/styles/splash.css)

Currently the entire homepage is dark glassmorphism (`rgba(10,14,19,0.76)` cards). The global design system is light (`#F6F7FA`). The rest of the site already uses the light system.

**Plan:** Hero section stays dark (it's cinematic, it works). Everything below the hero transitions to the light system:

- **Card backgrounds**: `rgba(255,255,255,0.82)` with `backdrop-filter: blur(20px)`
- **Text**: `#1A1A1A` primary, `#323232` secondary (matches [global.css](file:///home/wess/3d3d-platform/src/styles/global.css))
- **Image overlays**: each section gets a `37deg` diagonal gradient:
  ```css
  linear-gradient(37deg, rgba(246,247,250,0.88) 0%, rgba(246,247,250,0.15) 100%)
  ```
- **Accents stay** (teal/magenta/orange — no change)
- **Alternate rhythm**: sections alternate light glass → subtle teal tint → light glass → subtle magenta tint using the existing `--color-teal-surface` / `--color-magenta-surface` tokens

### 2B. Hero Copy — Be Specific About What 3D3D Does

**File:** [index.astro](file:///home/wess/3d3d-platform/src/pages/index.astro) lines 157–180

Current copy says "Custom fabrication. Software. Community." — too vague.

**Replace with:**
```
Eyebrow: "3D Printing · Marine Hardware · Event Deployment · Open Source"
H1: "FOR THE ONES THAT GIVE A DAMN."  (keep — it's strong)
Body: "Parts for boats, cars, and events. Engineering-grade materials, printed
      and shipped by one operator who answers every message. Fredericton-built. 
      Deployed wherever the job lands."
```

### 2C. "Join the Network" CTA → Magenta Glass Border

**File:** [index.astro](file:///home/wess/3d3d-platform/src/pages/index.astro) line 166

Currently `hp-cta--ghost` (barely visible). Change to magenta-bordered glass:
```css
border: 2px solid rgba(232, 74, 138, 0.6);
background: rgba(232, 74, 138, 0.08);
color: #E84A8A;
```

### 2D. Background Images — Use What We Have

Every section currently references `/media/generated/*` files that **don't exist** (placeholder paths). Fix by using real photos:

| Section | Existing Source | Images to Use |
|---|---|---|
| Hero | 3 real sailing photos ✅ | Keep as-is |
| Fabrication | `fab-01,02,03` ❌ doesn't exist | [printer-action-cf.jpg](file:///home/wess/3d3d-platform/public/media/workshop/printer-action-cf.jpg), [printer-frame-shot.jpg](file:///home/wess/3d3d-platform/public/media/workshop/printer-frame-shot.jpg), [blue-prototype-part.jpg](file:///home/wess/3d3d-platform/public/media/workshop/blue-prototype-part.jpg) |
| Story | `story-01,02,03` ❌ | [rv-lab-01.jpg](file:///home/wess/3d3d-platform/public/media/workshop/rv-lab-01.jpg), [rv-lab-02.jpg](file:///home/wess/3d3d-platform/public/media/workshop/rv-lab-02.jpg), [rv-lab-03.jpg](file:///home/wess/3d3d-platform/public/media/workshop/rv-lab-03.jpg) |
| Events | 3 real racing photos ✅ | Keep as-is |
| Software | `software-01,02,03` ❌ | Generate 2–3 (see Phase 6) |
| Network | `network-01,02,03` ❌ | [onboard-crew.jpg](file:///home/wess/3d3d-platform/public/media/real/onboard-crew.jpg), [race-morning-crew.jpg](file:///home/wess/3d3d-platform/public/media/real/race-morning-crew.jpg), [fleet-running.jpg](file:///home/wess/3d3d-platform/public/media/real/fleet-running.jpg) |
| Old Girl | 3 real workshop photos ✅ | Keep as-is |
| Gallery CTA | 3 real sailing photos ✅ | Keep as-is |
| Sponsors | 3 real golden-hour photos ✅ | Keep as-is |

### 2E. Software Section — Show the Actual Projects

The `softwareProjects` array (line 72) is vague. Replace with real projects from the repos:

| Project | Repo | One-liner |
|---|---|---|
| **ORA** | [ora-3d3d](file:///home/wess/ora-3d3d), [ora-core-3d3d](file:///home/wess/ora-core-3d3d), [ora-browser-3d3d](file:///home/wess/ora-browser-3d3d) | AI-assisted coding agent, open source, built from scratch |
| **CodeQuest** | [codequest-3d3d](file:///home/wess/codequest-3d3d) | Interactive coding game for learning |
| **3D3D CRM** | [3d3d-crm](file:///home/wess/3d3d-crm) | Client management for the cooperative (NextJS + Drizzle + SQLite) |
| **This Website** | [3d3d-platform](file:///home/wess/3d3d-platform) | The site you're looking at, built in Astro 6, open source |

Link each to `https://github.com/3d3dcanada/{repo-name}`.

### 2F. Sponsor Section — Use 3-Tier Model from Strategy Docs

The [Strategy doc](file:///home/wess/Desktop/3D3D-Strategy/STRATEGY.md) already defines sponsor tiers. Simplify to 3 tiers with Ko-fi integration:

| Tier | Price | What You Get |
|---|---|---|
| **Supporter** | $10/mo CAD | Name on supporter wall, early blog access, community Discord |
| **Partner** | $50/mo CAD | ↑ plus logo at events, social shoutouts, voting rights on build priorities |
| **Champion** | $250/mo CAD | ↑ plus naming rights on a printer, custom activation, quarterly call |

CTA goes to Ko-fi (`ko-fi.com/3d3dca`). Highlight Partner tier as "Most Popular" (decoy pricing).

---

## Phase 3 — Page-by-Page Content Improvements

### `/about` — The Most Important Page

Currently has Ken's incredible story (offshore sailing, bomb cyclone, 20,000nm). It's **the best content on the entire site**. Improvements:
- Add more workshop photos (21 unused in `/media/workshop/`)
- Add the "Why 3D3D" positioning from [Strategy](file:///home/wess/Desktop/3D3D-Strategy/STRATEGY.md): "We are not a print shop. We are a manufacturing co-op."
- Add links to GitHub repos prominently

### `/community` — Make It the Community Hub

Currently lists workshops generically. Add:
- Links to GitHub org (`github.com/3d3dcanada`)
- Links to Printables (`printables.com/@KTK3D_3050116`)
- The "Open Source" ethos from STRATEGY.md: "Transparency — we open source everything we can"
- Link to Old Girl (`oldgirl.3d3d.ca`)
- Discord/WhatsApp community links
- Real workshop photos from `/media/workshop/`

### `/opportunities` — Turn Into a Real Recruitment Page

Currently too vague. Add:
- Specific maker program details from STRATEGY.md: "Makers keep 75% of every order"
- The `yourname.3d3d.ca` subdomain offer (already mentioned on homepage)
- What kinds of makers: printers, coders, artists, robotics techs, sailors, documentarians
- CTA: "Apply to Join" form or direct to `/contact?subject=maker-application`

### `/sponsors` — Align with Phase 2F Tiers

Rebuild to match the 3-tier model. Add:
- Ideal sponsor profiles from STRATEGY.md (local businesses, tech companies, STEM orgs)
- What the money funds: printers, event travel, community workshops
- "X community members reached" with growing number

### `/quote` — Keep the QuoteCalculator, Polish the Wrapper

The [QuoteCalculator.tsx](file:///home/wess/3d3d-platform/src/components/QuoteCalculator.tsx) is already excellent — lead-first intake, optional estimate, file upload, Formspree submission, CASL consent. Don't replace it.

**Polish:**
- Add a hero image (use [printer-action-cf.jpg](file:///home/wess/3d3d-platform/public/media/workshop/printer-action-cf.jpg) or [blue-prototype-part.jpg](file:///home/wess/3d3d-platform/public/media/workshop/blue-prototype-part.jpg))
- Improve the page intro copy: "Upload your broken part. Tell us what it does. We quote in 24 hours."
- Add trust signals: "Direct contact from intake to delivery — no middleman, no AI chatbot, no ticket queue"

### `/contact` — Remove Phone, Add WhatsApp Prominently

Replace visible phone number with prominent WhatsApp CTA pill. Keep the email and Formspree form.

### `/book` — Same Phone Fix

Replace visible phone in "Prefer to reach out directly?" section with WhatsApp link.

### `/events` — Strong Page, Minor Adds

- Consider adding countdown to Newport-Bermuda 2026 race
- Add more event photos from `/media/real/race-*` and `/media/real/fleet-*`

### `/gallery` — Add Workshop Photos

Currently 30 sailing photos. Add the 21 workshop photos from `/media/workshop/` as a second gallery tab or mixed in.

### `/materials` — Already Solid (35KB page). No Critical Changes.

### `/media` — Already Solid (32KB page). No Critical Changes.

### Legal Pages (`/privacy`, `/terms`, `/shipping`, `/casl`, `/accessibility`) — Phone number removal only.

---

## Phase 4 — Open Source & Community Story

This is the **most important missing piece**. 3D3D has 12 repos, real tools, and a genuine open-source philosophy, but none of it is surfaced on the website.

### 4A. New "Open Source" Section on `/community`

Add a card grid showing the actual repos:

| Repo | Description | Status |
|---|---|---|
| [3d3d-platform](https://github.com/3d3dcanada/3d3d-main) | This website — Astro 6, Cloudflare Pages | Live |
| [ora-3d3d](https://github.com/3d3dcanada/) | AI coding agent | Active |
| [ora-core-3d3d](https://github.com/3d3dcanada/) | ORA core processing engine | Active |
| [ora-browser-3d3d](https://github.com/3d3dcanada/) | ORA browser extension | Active |
| [codequest-3d3d](https://github.com/3d3dcanada/) | Interactive coding game | Active |
| [sovereign-3d3d](https://github.com/3d3dcanada/) | Privacy-focused app | Active |
| [3d3d-crm](https://github.com/3d3dcanada/) | Client management CRM | Active |

### 4B. Quote Generator as a Standalone Tool

The [legacy HTML quote generator](file:///home/wess/archive/3d3d-legacy/QUOTE-GENERATOR2.html) is a fully functional 1300-line standalone pricing/PDF tool. Consider hosting it at `/tools/quote-generator` or linking it from the footer as an internal operator tool.

### 4C. Social Links — Already Comprehensive

The sidebar already has: YouTube, TikTok, Instagram, Facebook, Printables, WhatsApp, Ko-fi. The footer has GitHub. This is good coverage. Make sure all pages link to the same set.

---

## Phase 5 — Footer, SEO & Accessibility

### All Pages
- Ensure every `<section>` has `aria-label` (many already done)
- Add `ogImage` to pages missing it
- Complete Schema.org JSON-LD where absent
- Remove `telephone` from all Schema.org objects

### Footer
- Source from shared `siteNav.ts`
- Add GitHub, Printables links
- Update copyright year

---

## Phase 6 — Image Generation

After code changes, generate images for sections that reference non-existent paths:

### Software Section (2–3 images)
> **Prompt:** Photorealistic editorial shot of a dark monitor showing code in a modern IDE, warm desk lamp lighting, coffee mug, mechanical keyboard. Natural colors, no HDR glow. Shot on Canon EOS R5 feel.

### Network Section — Already Covered by Real Photos (Phase 2D fix)

### All Other Sections — Already Have Real Photos ✅

---

## Phase 7 — Verification

1. `npm run build` — zero errors
2. Visual review via browser — mobile + desktop
3. Lighthouse accessibility audit → target 95+
4. Confirm zero visible phone numbers on rendered site
5. Verify all repo links resolve
6. `git push origin main` → Cloudflare Pages deploy

---

## What This Does NOT Include

- ❌ Framework swap (stays Astro 6)
- ❌ New pages (no `/tools`, `/repos` — keep scope tight)
- ❌ Payment/Stripe integration (premature — Ko-fi handles sponsorship)
- ❌ Dark mode toggle (the design is "light with dark hero", not toggled)
- ❌ Makers program login/dashboard (premature — just recruitment for now)

---

## Execution Order

1. **Phase 1** (navigation + global) — foundation for everything
2. **Phase 2** (homepage color + copy) — biggest visual impact
3. **Phase 3** (page-by-page) — depth and content
4. **Phase 4** (open source story) — community impact
5. **Phase 5** (footer + SEO) — polish
6. **Phase 6** (images) — fill remaining gaps
7. **Phase 7** (verify + ship)
