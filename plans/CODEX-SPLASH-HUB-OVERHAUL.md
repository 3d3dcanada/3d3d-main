# CODEX PROMPT: 3D3D Splash Hub Overhaul & Site Audit

## Project
- **Repo**: `3d3dcanada/3d3d-main` (branch: `main`)
- **Live**: https://3d3d.ca
- **Framework**: Astro 6.0.5 + React 19 + Three.js (@react-three/fiber)
- **Deploy**: Cloudflare Pages (auto-deploys on push to main)
- **Forms**: Formspree endpoint `https://formspree.io/f/mldlydbl`
- **Email**: info@3d3d.ca
- **Phone**: +15069532678

---

## PART 1: RESEARCH (do first, before any code)

### 1A. Study 3D showcase hubs launched in 2025-2026
Search the web for the best interactive 3D product showcases, orbital/carousel landing pages, and WebGL hero sections from the last 12 months. Find 5-8 examples of sites that:
- Use Three.js or WebGL for product display
- Have dark, clean, museum/gallery-style presentation
- Light objects from below like a display case
- Use stable backgrounds (photography or textured, not gradient blobs)
- Feel premium and industrial, not playful or rounded

Document what they do right: camera distance, lighting angles, background treatment, typography, how they handle section transitions.

### 1B. Study the current 3D3D site
Read every file listed in the Critical Files section below. Understand the full architecture before changing anything.

---

## PART 2: SPLASH HUB VISUAL OVERHAUL

### 2A. Force dark mode on splash — permanently
- Remove the `SplashThemeToggle` component from `SplashOrbit.tsx` entirely
- Hardcode `theme = 'dark'` in `SplashOrbit.tsx` — no localStorage, no system detection, no toggle
- On `document.body`, set `data-splash-theme="dark"` unconditionally
- Make the dark mode slightly brighter:
  - `--splash-page-bg`: change from `#0b0f14` to `#121820` (still dark but not pitch black)
  - `--splash-text-primary`: keep `#f4efe8`
  - `--splash-text-muted`: brighten from `#b4bfcb` to `#c8d0dc`
- Delete `SplashThemeToggle.tsx` component file
- Remove all light-mode splash CSS variables (the default body.splash-page block can be deleted or merged into the dark block)
- Remove `splash-theme.ts` lib file (no longer needed)

### 2B. Push orbit back and raise it
The orbit objects are way too close to the camera. Fix in TWO places:

**Camera** (`SplashScene.tsx`):
- Change camera position from `[0, 3.4, 15]` to `[0, 4.2, 22]` — pushes everything back
- Change `camera.lookAt` from `(0, 1.8, 0)` to `(0, 2.4, 0)` — looks slightly higher
- Change `fov` from `40` to `36` — slightly narrower field of view for less distortion

**Orbit group** (`SplashScene.tsx`):
- The orbit group is at `position={[0, 1.9, 0]}` — change to `position={[0, 2.6, 0]}` to raise it

**Orbit radius** (`splash-orbit.ts`):
- `ORBIT_RADIUS`: change from `5.4` to `4.2` — tighter horizontal spread so objects don't fly off-screen at the new distance
- `ORBIT_DEPTH`: change from `4.6` to `3.8`

### 2C. Fix the wrenches — skull and crossbones X
The services section uses `services.glb` (a wrench model). Two clones are rendered to form an X but they're currently parallel bars.

In `SplashObject.tsx`, the services special case (the `section.id === 'services'` block):
- The two wrenches need to cross at their CENTERS, forming an X shape
- First clone: `rotation={[0, 0, Math.PI / 5]}` (36 degrees — slightly less than 45 for a natural look)
- Second clone: `rotation={[Math.PI, 0, Math.PI / 5]}` — flip on X-axis (not Y) to mirror, same Z angle makes the X
- If the wrench runs along Y-axis natively, use: first `[0, 0, PI/5]`, second `[PI, 0, PI/5]`
- If the wrench runs along X-axis natively, use: first `[0, 0, PI/2 + PI/5]`, second `[PI, 0, PI/2 + PI/5]`
- **TEST VISUALLY** — open `services.glb` in a Three.js viewer first to see its native orientation
- The Z-offset separation should be `0.08` and `-0.08` (not `0.15` — too far apart)
- In `splashSections.ts`, keep services `modelRotation` at `[0, 0, 0]` — all rotation handled per-clone

### 2D. Remove glow, shine, bloom, sparkles, edge wireframes
These effects look cheap and dated. Remove them:

**SplashEffects.tsx**: Delete this file. Remove the `<SplashEffects>` import and usage from `SplashScene.tsx`.

**SplashParticles.tsx**: Delete this file if imported anywhere. (Currently sparkles are inline in SplashScene.)

**Sparkles** in `SplashScene.tsx`: Remove the `<Sparkles>` component entirely (the block with `count={30}`).

**Edge wireframes** in `SplashObject.tsx`: Remove all `<Edges>` components. In the `inject` prop of every `<Clone>`, return `null` instead of `<Edges>`:
```tsx
inject={() => null}
```
Or just remove the `inject` prop entirely.

**Emissive glow** on objects: In `buildModel()`, set `emissiveIntensity: 0` on all materials. In the `useFrame` callback, remove all emissive intensity animation — set it to `0` always.

**Center logo glow** in `SplashCenterLogo.tsx`: Remove the `userData: { logoGlow: true }` and `userData: { printerGlow: true }` emissive pulsing. Set all `emissiveIntensity` to `0` on the logo text materials and printer materials.

### 2E. Bottom-lit display lighting
Replace the current lighting in `SplashScene.tsx` with a museum/display-case setup:

Remove ALL existing lights (ambient, hemisphere, directional, point lights, spotlight). Replace with:

```tsx
{/* Soft ambient fill — very low */}
<ambientLight intensity={0.3} />

{/* Primary uplight — the display base light */}
<rectAreaLight
  width={12}
  height={8}
  position={[0, -1.5, 2]}
  rotation={[-Math.PI / 2, 0, 0]}
  intensity={6}
  color="#ffffff"
/>

{/* Secondary uplight — warm fill from below-front */}
<pointLight
  position={[0, -2, 6]}
  intensity={4}
  color="#FFF5E8"
  distance={20}
/>

{/* Subtle rim light from behind — separates objects from bg */}
<directionalLight
  position={[0, 3, -8]}
  intensity={0.4}
  color="#C8D8E8"
/>

{/* Very faint top fill to prevent pure-black tops */}
<hemisphereLight
  intensity={0.2}
  color="#E8E4E0"
  groundColor="#1a1a1a"
/>
```

Note: `rectAreaLight` requires importing `RectAreaLightUniformsLib` from three/addons — if that causes issues, use two `spotLight` components pointing up from below instead.

### 2F. Stable background — no gradients, no animation
Replace `SplashBackground.tsx` with a simple, stable background:

Option A (preferred): A high-quality dark workshop/studio photograph as the background. Place the image at `/public/media/splash-bg.jpg` (dark, slightly blurred workshop or studio shot — can be AI-generated or stock). Render it as:
```tsx
<div className="splash-background" aria-hidden="true">
  <div className="splash-background__photo" />
  <div className="splash-background__scrim" />
</div>
```

CSS:
```css
.splash-background__photo {
  position: absolute;
  inset: 0;
  background: url('/media/splash-bg.jpg') center/cover no-repeat;
  filter: blur(2px) brightness(0.3);
}
.splash-background__scrim {
  position: absolute;
  inset: 0;
  background: rgba(18, 24, 32, 0.6);
}
```

Option B (if no photo available): Solid dark color with very subtle noise texture only:
```css
.splash-background__static {
  background: #121820;
}
.splash-background__grain {
  /* keep existing grain at low opacity */
  opacity: 0.06;
}
```

**Delete** the mesh gradient layer, dots layer, vignette layer, mesh-drift animation — all of it. Clean and stable.

### 2G. Per-section background images (future phase)
Add a `backgroundImage: string` field to the `SplashSection` interface in `splashSections.ts`. When a section is active/focused, crossfade the background photo to a section-specific image. Implementation:
- Add `backgroundImage` paths to each section (e.g., `/media/splash/market-bg.jpg`, `/media/splash/services-bg.jpg`)
- In the splash background component, render the active section's image with a CSS opacity crossfade transition (400ms ease)
- For now, use a SINGLE dark background until per-section photos are sourced. Add `backgroundImage: ''` to all sections as a placeholder.

### 2H. Remove rounded corners — sharp, industrial aesthetic
Across the splash CSS (`splash.css`):
- `.splash-card`: change `border-radius: 16px` to `border-radius: 2px`
- `.splash-card__tag`: change `border-radius: 999px` to `border-radius: 2px`
- `.splash-card__cta`: change `border-radius: 8px` to `border-radius: 2px`
- `.splash-nav`: change any `border-radius` to `2px`
- `.splash-nav__pill`: change `border-radius` from pill/rounded to `2px`
- `.splash-nav__rail`: change `border-radius` to `2px`

Apply the same across global.css for the rest of the site:
- `.btn-primary`, `.btn-secondary`: `border-radius: 2px`
- `.badge-*`: `border-radius: 2px`
- Any card, chip, or pill component: `border-radius: 2px`
- Exception: avatar/profile images can stay circular

### 2I. Add contact button to splash
Add a persistent contact CTA to the splash page. In `SplashOrbit.tsx`, add a fixed-position element:
```tsx
<a
  href="/contact"
  className="splash-contact-cta"
  data-analytics-event="splash_contact_click"
>
  Contact
</a>
```

CSS:
```css
.splash-contact-cta {
  position: fixed;
  bottom: 6rem;
  right: 1.5rem;
  z-index: 10;
  padding: 0.65rem 1.2rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 2px;
  color: #f4efe8;
  font-family: var(--font-tech);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 200ms ease;
}
.splash-contact-cta:hover {
  background: rgba(255, 255, 255, 0.14);
}
```

### 2J. Fix mobile flashing
The mobile flashing every second is likely the `showLogo` toggle in `SplashCenterLogo.tsx` which alternates between the "3D3D" text and the Prusa printer every 6500ms (`setInterval`). On mobile, the re-render causes a visible flash.

Fix: On mobile (screen width < 768px), disable the toggle entirely — always show the "3D3D" text logo. Do NOT render the full Prusa printer model on mobile (it's too heavy and causes performance issues). Check with:
```tsx
const isMobile = window.innerWidth < 768;
// If mobile, skip the interval and always show logo
```

Also check if the Three.js canvas is re-mounting on each section change — if `SplashScene` or the canvas is wrapped in a conditional that changes, it will flash. The Suspense fallback loader may also flash if the scene temporarily unmounts.

---

## PART 3: SITE AUDIT & CONSISTENCY

### 3A. Unified visual language
The splash page is dark mode. The rest of the site is light mode. That's fine — but the TRANSITION must feel intentional, not jarring. When a user clicks a CTA from the splash and lands on an inner page:
- The inner pages should stay light mode (the site's global design is light-first)
- But the typography, button styles, and spacing should match
- Remove ALL rounded corners sitewide (see 2H above) for consistency
- Ensure the sidebar toggle button is clearly visible when transitioning from the full-screen splash to inner pages

### 3B. SEO & Meta audit
Verify every page has:
- [ ] Unique `<title>` tag (not duplicated across pages)
- [ ] Unique `<meta name="description">` (150-160 chars, includes keywords)
- [ ] Canonical URL set correctly
- [ ] Open Graph image (og:image) — default is `/og-default.png`, verify it exists and is 1200x630
- [ ] Twitter card meta tags
- [ ] Schema.org structured data appropriate to page type
- [ ] `<h1>` tag on every page (one per page)
- [ ] All images have `alt` text
- [ ] No orphan pages (pages with no inbound links)

Pages to specifically check:
- `/` (home) — currently has generic description, needs a keyword-rich one
- `/shop` and `/shop/[id]` — Product schema correct?
- `/blog` and individual posts — Article schema correct?
- `/quote` — WebApplication schema
- `/contact` — LocalBusiness or ContactPage schema?

### 3C. Forms & Formspree audit
Both the contact form (`/contact`) and quote calculator (`/quote`) submit to `https://formspree.io/f/mldlydbl`.

Verify:
- [ ] Formspree endpoint is active and receiving submissions (test submit)
- [ ] CASL consent checkbox is required before submit
- [ ] Honeypot `_gotcha` field is present and hidden
- [ ] File uploads work (test with a small .stl file)
- [ ] Success/error states display correctly after submission
- [ ] Form validation works (required fields, email format)
- [ ] The `_subject` field is set so emails have meaningful subjects
- [ ] CSP header allows `form-action https://formspree.io` (it does — `_headers` file confirms)

### 3D. Email & contact verification
- [ ] `info@3d3d.ca` is reachable (verify MX records)
- [ ] `mailto:info@3d3d.ca` links work on contact page, footer, about page
- [ ] WhatsApp link (`wa.me/15069532678`) opens correctly
- [ ] Phone number is formatted consistently across all pages
- [ ] Ko-fi link works

### 3E. Navigation completeness
Verify all splash hub CTAs land on real, content-complete pages:
- [ ] "Browse the Market" → `/shop` (has 27 products)
- [ ] "Get a Quote" → `/quote` (has calculator)
- [ ] "Join the Network" → `/opportunities` (THIN — only 1 job listing, needs expansion)
- [ ] "Start Learning" → `/blog` (has 30+ posts)
- [ ] "Our Story" → `/about` (complete)

Sidebar nav should include: Home, Get a Quote, Request Service, Book a Call, Events, Shop, Materials, FAQ, About, Updates, Opportunities, Media
Footer nav should include: Shop, Get a Quote, Materials, Events, Request Service, Blog, Prusa, About

### 3F. Performance & accessibility
- [ ] All pages score 90+ on Lighthouse (Performance, Accessibility, SEO, Best Practices)
- [ ] Three.js scene has a proper fallback for non-WebGL browsers (currently exists — verify it works)
- [ ] Skip-to-content link works
- [ ] Keyboard navigation works through the orbit (arrow keys)
- [ ] `prefers-reduced-motion` disables all animations

---

## PART 4: NEXT STEPS (after this prompt is complete)

1. **Source per-section background images** — dark, atmospheric photos for each of the 5 sections (workshop for services, ocean for market/network, bookshelf for learn, portrait for about)
2. **Expand /opportunities page** — add a "What is the Network" intro section, how to join, benefits, current openings
3. **Add testimonials/social proof** to inner pages
4. **Performance pass** — lazy-load Three.js scene, optimize GLB models, preload critical images
5. **Analytics verification** — confirm Plausible or GA4 is actually loading (the script tag may be missing)

---

## CRITICAL FILES

Read ALL of these before making any changes:

### Splash Hub
- `src/pages/index.astro` — home page entry
- `src/components/SplashOrbit.tsx` — main orchestrator (498 lines)
- `src/components/SplashScene.tsx` — Three.js canvas, lighting, camera
- `src/components/SplashObject.tsx` — 3D object rendering, materials, wrench crossbones
- `src/components/SplashCenterLogo.tsx` — center logo + printer toggle
- `src/components/SplashBentoCard.tsx` — info card
- `src/components/SplashNavPill.tsx` — bottom nav
- `src/components/SplashBackground.tsx` — background layers
- `src/components/SplashEffects.tsx` — bloom (DELETE)
- `src/components/SplashThemeToggle.tsx` — theme toggle (DELETE)
- `src/lib/splash-orbit.ts` — orbit math, radius, depth
- `src/lib/splash-theme.ts` — theme persistence (DELETE)
- `src/data/splashSections.ts` — section data, colors, model paths
- `src/styles/splash.css` — all splash styling (~800 lines)

### Site Infrastructure
- `src/layouts/BaseLayout.astro` — main layout, sidebar nav groups
- `src/components/SiteSidebar.astro` — sidebar navigation
- `src/components/Footer.astro` — footer navigation
- `src/components/BaseHead.astro` — SEO, meta, schema
- `src/components/MobileCTA.astro` — mobile bottom bar
- `src/styles/global.css` — global design tokens (~600 lines)

### Forms
- `src/pages/contact.astro` — contact form (Formspree)
- `src/pages/quote.astro` — quote page
- `src/components/QuoteCalculator.tsx` — quote form (Formspree)

### Config
- `public/robots.txt` — crawler rules
- `public/_headers` — Cloudflare security headers
- `public/_redirects` — URL redirects
- `public/site.webmanifest` — PWA manifest
- `astro.config.mjs` — build config

### Models
- `public/models/services.glb` — wrench model (inspect native orientation!)
- `public/models/market.glb`, `network.glb`, `learn.glb`, `about.glb`

---

## CONSTRAINTS

- Deploy target is **Cloudflare Pages** (static output only, no SSR)
- Do NOT add new npm dependencies unless absolutely necessary
- Do NOT change the Formspree endpoint ID
- Do NOT modify blog post content
- Do NOT touch product catalog data
- All changes must pass `npx astro build` with zero errors
- Test on mobile viewport (375px width) — no flashing, no overflow
- The splash MUST work without JavaScript (fallback grid exists — preserve it)
- Keep the dark splash → light inner pages transition clean

---

## DEFINITION OF DONE

- [ ] Splash is permanently dark mode, no toggle, slightly brighter
- [ ] Orbit pushed back (camera at z=22), raised (y=2.6)
- [ ] Wrenches form a proper X/crossbones
- [ ] No glow, bloom, sparkles, or edge wireframes on any 3D object
- [ ] Objects lit from below like a museum display
- [ ] Background is a stable dark photo or solid color (no gradients, no animation)
- [ ] Per-section `backgroundImage` field exists (placeholder empty strings OK for now)
- [ ] All corners are sharp (2px border-radius max) across entire site
- [ ] Contact button visible on splash page
- [ ] Mobile doesn't flash (center logo toggle disabled on mobile)
- [ ] All splash CTAs link to real, working pages
- [ ] Sidebar nav includes "Get a Quote"
- [ ] Footer nav includes "Get a Quote" and "Materials"
- [ ] All pages have unique title, description, OG tags, and schema
- [ ] Forms submit successfully to Formspree
- [ ] `npx astro build` passes with zero errors
- [ ] Pushed to main, Cloudflare deploys successfully
