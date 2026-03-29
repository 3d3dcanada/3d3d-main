# 3D3D Media Page — Full Execution Plan
**Prepared:** March 28, 2026
**Target file:** `src/pages/media.astro`
**URL:** `3d3d.ca/media` → promote to `media.3d3d.com` via Cloudflare later
**Purpose:** Dual — agency showcase + job posting for a creative/content role

---

## Context & Vision

This page does two things at the same time and that tension is the point:

1. **It's an agency page.** 3D3D Media is a content creation service for small NB businesses. Photos from $10. Short-form video from $35. It shows what 3D3D already produces — the socials, the work — and invites local businesses to hire the shop for content.

2. **It's a job posting.** The person who fills this role *becomes* the agency's hands. The job is openly framed: "If you can do better than what I do, the job is yours." The page shows 3D3D's existing social output and dares someone to step in and level it up.

The hook for candidates: ADHD-friendly, project-based, creative autonomy, real pay at $100/week guaranteed to start (supplemental, growth-oriented), Google + Claude subscriptions provided, part of an open-source cooperative where you own what you build. Legal to work in Canada. 16+. Fredericton area or willing to travel.

The hook for the community: Ko-fi pool. $100 contribution = 3 hours/week of content agent time. Community co-funds the role; the contributor's business or project gets that content output.

---

## Research Findings — What to Know Before Building

### Pricing Honesty
- Market rate for a content creator in Atlantic Canada: **$18–$28/hr entry level**
- $100/week = ~6.3 hrs at NB minimum wage ($15.90/hr as of April 2026)
- This is supplemental income, NOT a living wage
- Frame it honestly: "This is a starting point, not a ceiling. As the pool grows, so does your cut."
- The candidate this attracts: 16–24, living at home, no overhead, wants portfolio + tools + purpose
- Do NOT pretend this is a full-time salary — the right person won't expect it to be

### Services Pricing (below market — intentional)
- $10/photo is extremely low (market: $100–$175/delivered photo in Atlantic Canada)
- $35/30min video is extremely low (market: $300–$800/produced short-form)
- Frame this as **"accessible pricing for small businesses"** — it's the cooperative's philosophy
- These are portfolio-builder prices that let small NB businesses get professional content who couldn't otherwise afford it
- As the operator grows their skills, prices grow with them

### Ko-fi Architecture
- Use **Ko-fi Goals** for the community pool: set a monthly target (e.g., "$400 = 12 hours of maker content")
- Use **Ko-fi Membership Tiers** for recurring contributors: Tier 1 = $25/mo (1 hr), Tier 2 = $100/mo (4 hrs)
- 0% fee on tips, 5% on memberships — very favorable
- Ko-fi pays out instantly to Stripe or PayPal
- Build a Ko-fi page at ko-fi.com/3d3d (or similar) before launch; link it from this page

### Platform Priority for the Candidate
1. **TikTok** — highest organic reach for maker/3D printing content (4.1B+ #3dprinting views), algorithm favors small accounts, process/transformation videos win
2. **Instagram Reels** — 7.5% median engagement on Reels, best for product showcase
3. **YouTube Shorts** — evergreen SEO value, tutorial discovery
- Best content formula: **"This broke → I printed a fix → here it is working"** — 15–60 seconds, no narration needed

### Legal Note (Important)
- Age 16 = no special work permit needed in NB under Employment Standards Act
- BUT: $100/week for 3+ hrs of work may fall below minimum wage if classified as employment
- Safest framing: **cooperative member (contractor)**, not employee. They set their own hours. They deliver defined outputs. They are not on payroll.
- Include: "legally entitled to work in Canada" as the only eligibility requirement
- Do NOT say "must be 16+" as a hard filter — let the page attract who it attracts and screen in conversation

---

## Page Architecture

### Route
`src/pages/media.astro`

### Layout
Use `BaseLayout.astro` (same as rest of site). Light background. Full design system tokens.

### Section Map

```
[1] HERO — "3D3D MEDIA"
[2] THE CHALLENGE — "If you can do better, you have the job"
[3] OUR WORK — Social feed grid (TikTok, Instagram, YouTube)
[4] WHAT WE DO — Agency services overview
[5] PRICING — Cards: Photo / Video / Packages
[6] THE POOL — Ko-fi community funding model
[7] THE ROLE — Job posting: what it is, what you get, who we need
[8] REQUIREMENTS — Honest, minimal, ADHD-friendly language
[9] APPLY — Contact CTA + Ko-fi link
```

---

## Section-by-Section Spec

---

### [1] HERO

**Intent:** Establish 3D3D Media as a real creative entity. Big, confident, slightly punk.

```
Eyebrow: "3D3D MEDIA / CONTENT STUDIO"
H1: "WE MAKE THINGS\nWORTH SEEING."
Subhead: "Content creation for the makers, fixers, and builders of New Brunswick. Photos. Video. Short-form. Community-funded."
CTA buttons: [See Our Work ↓] [The Role →]
```

**Visual:**
- Full-width, light background (`--color-surface-primary`)
- Large display type (Archivo Black), tight leading, uppercase
- Accent line in neon teal under the eyebrow
- Background: subtle animated grain texture or geometric pattern (CSS only, no heavy JS)
- `@starting-style` entrance animation: headline words slide up from `translateY(20px)` opacity 0 → 1

---

### [2] THE CHALLENGE

**Intent:** This is the audacity section. It directly addresses the candidate and dares them.

```
[Full-width banner, light surface with teal/magenta border accent]

"IF YOU CAN DO BETTER THAN ME,
 YOU HAVE THE JOB."

Below: "3D3D is built and run by one person. Below is every social post I've made.
 This is the bar. Beat it — and I'll hand you the keys."

[Arrow pointing down to the social feed]
```

**Visual:**
- Pull-quote style, oversized type
- Teal left border strip
- Optional: small profile image or avatar of Wess (human touch)

---

### [3] OUR WORK — Social Feed Grid

**Intent:** Show the actual current social content. Transparent. Honest. "Here's where we are."

**Implementation options (executor to choose based on complexity):**

**Option A (Preferred — simple, fast):**
- Embed Instagram feed using Elfsight or a lightweight iframe
- Embed TikTok feed with `<blockquote class="tiktok-embed">` for 2–3 featured posts
- YouTube Shorts embed via `<lite-youtube>` web component

**Option B (Fallback — static):**
- Screenshot grid: 6–9 screenshots of actual posts arranged in a masonry grid
- Each card links to the live post
- Cards animate in on scroll via `animation-timeline: scroll()`

```
[Section heading] "THE FEED — UNFILTERED"
[Subtext] "This is what one person with a phone and some ideas has built. Imagine what a team could do."

[3-column grid or masonry: mix of TikTok, Instagram, YouTube thumbnails]
[Below grid] → Link to each platform (@3d3dcanada or relevant handles)
```

**Platforms to show:** Instagram, TikTok, YouTube (whatever is active)
- Pull actual social handles from Wess / existing site footer

---

### [4] WHAT WE DO

**Intent:** Position 3D3D Media as a service for local small businesses, not just 3D3D itself.

```
[Section heading] "CONTENT FOR THE REST OF US"
[Subhead] "Small businesses deserve great content. We build it at prices that actually work."

[3 service pillars — card layout]

Card 1: PHOTOGRAPHY
Icon: camera glyph
"Product shots. Process shots. Behind-the-scenes.
 Starting at $10 per delivered photo.
 Perfect for: e-commerce, social, print."

Card 2: SHORT-FORM VIDEO
Icon: play/film strip glyph
"Reels. TikToks. YouTube Shorts.
 $35 per 30 minutes of filming + a quick edit.
 Perfect for: launches, tutorials, shop floor content."

Card 3: SOCIAL PACKAGES
Icon: grid/feed glyph
"Ongoing content: monthly photo + video packages.
 Community-funded pricing for cooperatives and local businesses.
 Let's talk."
```

**Visual:**
- Cards on light surface with subtle border
- Icon rendered with CSS or inline SVG (no icon library needed)
- Teal hover border stroke animation

---

### [5] PRICING

**Intent:** Transparent, no-bullshit pricing. Below market — by design.

```
[Section heading] "THE RATE CARD"
[Subhead] "We price for people who are building something, not for people who are already there."

[Pricing table or card grid]

PHOTOGRAPHY
├── Single photo: $10/delivered image
├── 10-photo session: $80
└── 30-photo product shoot: $200

VIDEO
├── 30 minutes filming + quick edit: $35
├── Full Reel (concept → final): from $75
└── Monthly content package (4 Reels + 20 photos): from $250

COMMUNITY POOL RATE
├── 1 hour of content work: $33.33 (from $100/3hr pool)
└── Fund via Ko-fi → your business gets the output
```

Note: Add a small asterisk copy: "Pricing reflects a portfolio-building model. Rates grow as the work does."

---

### [6] THE POOL — Ko-fi Model

**Intent:** Explain the community funding mechanism clearly. Make it feel cooperative, not transactional.

```
[Section heading] "THE COMMUNITY POOL"
[Icon: Ko-fi or custom coin/pool illustration in CSS]

"Here's how this works:

 $100 gets 3 hours of content production per week.
 Pool with others. Split the output.
 Contribute what you can. Get content in return.

 Every dollar goes directly into funding the role.
 No overhead. No agency markup.
 What the community puts in is what the community gets back."

[Ko-fi pool progress bar — embedded or CSS-built placeholder until Ko-fi is set up]
[CTA: "Contribute to the Pool →"] → links to ko-fi.com/3d3d

Supported tools note:
"Contributors receive priority access, updates, and community recognition.
 The role comes with Google Workspace + Claude subscriptions — fully funded."
```

**Visual:**
- Teal/magenta gradient accent on this section (only place on page with gradient)
- Progress bar: CSS custom property driven, can be updated manually until Ko-fi is live

---

### [7] THE ROLE

**Intent:** Job posting that doesn't read like a job posting. Human. Direct. Honest about the constraints.

```
[Section heading] "THIS COULD BE YOU"
[Subhead] "Not a title. A role. Built for someone who thinks differently."

---

WHAT THE JOB ACTUALLY IS:

→ 3 hours per week, in the shop or on location.
   Fredericton area. Fuel covered. Accommodations if you travel farther.

→ Remote editing, posting, and content work on your own time.
   You set the rhythm. We set the deliverables.

→ Photography. Video. Social reels. Behind-the-scenes.
   Raw material is everywhere — we just need someone with the eye to see it.

---

WHAT YOU GET:

✓ $100/week guaranteed to start
  (This is a foundation, not a ceiling. As the pool grows, so does your pay.)

✓ Google Workspace subscription — yours to keep
✓ Claude AI subscription — yours to keep
✓ Portfolio of real work, real clients, real output
✓ Cooperative membership — you own what you help build
✓ Flexible, creative, no-bullshit structure

---

WHO WE'RE LOOKING FOR:

"You don't have to have the right résumé.
 You have to have the right eye.

 If you've ever felt like ADHD was going to keep you from a real career —
 this is structured for your brain, not against it.

 If you don't like people telling you how to be creative —
 nobody will.

 If you've been waiting for something that makes sense —
 this might be it."

---

THE ONLY RULES:

→ You must be legally entitled to work in Canada
→ You can travel in the Fredericton area (or farther, with support)
→ You produce real work. Consistently.
→ Open source cooperative. What you put in is what you get out.
```

---

### [8] REQUIREMENTS (Structured for SEO / Accessibility)

Render this section as actual semantic HTML for Google's JobPosting structured data.

```html
<!-- Structured data block in <head> for SEO -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Content Creator — Social Media & Videography",
  "description": "3D3D is looking for a content creator to join our open-source cooperative in Fredericton, NB. 3 hours/week in-person, remote editing and production. $100/week to start. Google + Claude subscriptions included. ADHD-friendly, creative-first, flexible structure.",
  "datePosted": "2026-03-28",
  "validThrough": "2026-12-31",
  "employmentType": "CONTRACTOR",
  "hiringOrganization": {
    "@type": "Organization",
    "name": "3D3D",
    "sameAs": "https://3d3d.ca",
    "logo": "https://3d3d.ca/og-image.png"
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Fredericton",
      "addressRegion": "NB",
      "addressCountry": "CA"
    }
  },
  "baseSalary": {
    "@type": "MonetaryAmount",
    "currency": "CAD",
    "value": {
      "@type": "QuantitativeValue",
      "value": 100,
      "unitText": "WEEK"
    }
  },
  "qualifications": "Must be legally entitled to work in Canada. Creative portfolio or demonstrated interest in content creation an asset.",
  "skills": "Social media, videography, photography, short-form video editing, TikTok, Instagram Reels",
  "jobBenefits": "Google Workspace subscription, Claude AI subscription, cooperative membership, flexible schedule, travel expenses covered"
}
</script>
```

---

### [9] APPLY

```
[Section heading] "LET'S TALK"

"Send a message. Show us something you made.
 No cover letter. No formal application.
 Just tell us who you are and what you've made."

[CTA Button: "Get in Touch →"] → /contact
[Secondary CTA: "Fund the Pool →"] → ko-fi.com/3d3d (TBD)

Footer note:
"3D3D is an open-source cooperative based in Fredericton, New Brunswick, Canada.
 We build, repair, and document. We're looking for someone to help share it."
```

---

## SEO Specification

### Meta Tags
```
title: "3D3D Media — Content Creation & Social Media | Fredericton, NB"
description: "3D3D Media creates photos, short-form video, and social content for small businesses in New Brunswick. Community-funded. Starting at $10/photo. Now hiring a content creator in Fredericton."
og:title: "3D3D Media — Content for the Makers of NB"
og:description: "Photos from $10. Video from $35. Community-funded content for small businesses. We're also looking for a content creator to join our cooperative in Fredericton."
og:image: /og-media.png (need to create)
canonical: https://3d3d.ca/media
```

### Keyword Targets
**Primary:**
- "Fredericton social media content creator"
- "New Brunswick content creation agency"
- "social media videographer Fredericton"

**Secondary:**
- "ADHD-friendly creative job Fredericton"
- "3D printing content creator Canada"
- "content creator job New Brunswick 2026"
- "Ko-fi community fund content"
- "small business photography Fredericton"

**Long-tail:**
- "short form video production New Brunswick"
- "social media management small business affordable NB"
- "creative cooperative Fredericton"

### Structured Data
- `JobPosting` schema (see Section 8 above)
- `LocalBusiness` schema (already likely present sitewide — confirm in BaseHead)
- `Service` schema for each pricing tier (optional, high value)

---

## Component Architecture

### New components to build:
- `MediaServiceCard.astro` — reusable service card (icon + title + description + price)
- `PricingTier.astro` — pricing row with item + price
- `KofiPool.astro` — community pool section with progress bar (static initially, animated via CSS)
- `SocialFeedGrid.astro` — responsive grid for social embeds or screenshot cards

### Reuse existing:
- `BaseLayout.astro` — wraps the page
- `BaseHead.astro` — inject structured data here
- `SiteHeader.astro` — nav
- `Footer.astro` — footer

### React components (only if interactive):
- Not needed for this page — keep it Astro-native
- The only potential React component: a `KofiProgress.tsx` if we want animated real-time progress. Skip for now, do it static CSS.

---

## Design Tokens to Use

All from existing `global.css` theme:

```
Surface: --color-surface-primary (#F6F7FA) — page background
Cards: --color-surface-card (#FFFFFF) with --shadow-card
Primary accent: --color-teal-primary (#40C4C4)
Secondary accent: --color-magenta-primary (#E84A8A) — pool section only
Text: --color-text-primary (#1A1A1A), --color-text-muted (#666666)
Font display: Archivo Black (--font-display)
Font body: Archivo or Instrument Sans
Font mono: JetBrains Mono (for pricing, codes, labels)
```

---

## Animation Spec

Use CSS only. No JS animation libraries.

1. **Hero entrance:** `@starting-style` + `transition` — words enter from `translateY(24px)` opacity:0 with staggered delays (0ms, 80ms, 160ms per element)
2. **Section reveal:** `animation-timeline: view()` — each section fades + slides up as it enters viewport (`animation-range: entry 0% entry 40%`)
3. **Card hover:** `transform: translateY(-4px)` + `box-shadow` transition — consistent with rest of site
4. **Progress bar (Ko-fi pool):** CSS `width` transition from 0 → current value on viewport entry
5. **Social grid:** staggered `animation-delay` on child cards using `nth-child` selectors

---

## Subdomain Promotion (Future Step)

When ready to promote to `media.3d3d.com`:

1. In Cloudflare dashboard: add CNAME `media → 3d3d.pages.dev` (or custom domain rules)
2. In `astro.config.mjs`: update `site` or use Cloudflare Pages redirect rules
3. Add canonical tag on the page pointing to `https://media.3d3d.com`
4. 301 redirect `/media` → `media.3d3d.com`

Not needed now. Build it at `/media` first, validate, then promote.

---

## Ko-fi Setup Checklist (Do Before/After Launch)

- [ ] Create Ko-fi account at ko-fi.com (if not exists)
- [ ] Set up Goal: "3D3D Media Community Pool — March 2026" with $400 target
- [ ] Set up Membership tiers:
  - Tier 1: $25/mo — "Supporter" — 1 hr of content/month
  - Tier 2: $50/mo — "Contributor" — 2 hrs of content/month
  - Tier 3: $100/mo — "Builder" — 3 hrs of content/month (the full weekly allocation)
- [ ] Connect PayPal or Stripe to Ko-fi
- [ ] Get the Ko-fi page URL and update the `/media` page links

---

## Files to Create / Modify

| Action | File |
|---|---|
| CREATE | `src/pages/media.astro` |
| CREATE | `src/components/MediaServiceCard.astro` |
| CREATE | `src/components/KofiPool.astro` |
| CREATE | `src/components/SocialFeedGrid.astro` |
| CREATE | `src/components/PricingTier.astro` |
| MODIFY | `src/components/BaseHead.astro` — add JobPosting schema logic |
| MODIFY | `src/components/SiteHeader.astro` — add "Media" to nav (if appropriate) |
| MAYBE | `public/og-media.png` — OG image for this page |

---

## Notes for the Executing Agent

1. **Light-first only.** The existing `opportunities.astro` has `background: #111214` (dark). Do NOT follow that pattern. Use `--color-surface-primary` (#F6F7FA). The design system is light.

2. **Animate everything.** Every section should enter with a CSS animation. Use `@starting-style` for inline-style-equivalent enter transitions, and `animation-timeline: view()` for scroll-driven reveals.

3. **Typography hierarchy is critical.** This page has a lot of text. Use the established type scale: display (Archivo Black, uppercase, tight leading) for section headings, body (Archivo) for copy, mono (JetBrains Mono) for prices and labels.

4. **The job posting copy should sound like Wess, not a corporation.** First-person directness. No corporate HR language. "You don't need a résumé" is the vibe.

5. **Social feed:** If embedding live social is complex, use a static screenshot grid as placeholder with clear `<!-- TODO: replace with live embed -->` comments.

6. **Do NOT add dark mode.** None. Not even a toggle. Light only.

7. **The pricing section should use `font-family: var(--font-tech)` or JetBrains Mono** for the numbers — it reads as precise and technical.

8. **Ko-fi link:** Use `https://ko-fi.com/3d3d` as placeholder URL until the actual account is set up. Add a `<!-- TODO: update with real Ko-fi URL -->` comment.

9. **The challenge section** ("if you can do better, you have the job") should be visually bold — consider it a full-width banner with a left border accent in `--color-teal-primary`. This is a key moment on the page.

10. **Accessibility:** All color contrasts must meet WCAG AA. All interactive elements need `:focus-visible` styles. The social grid needs `alt` text on images.
