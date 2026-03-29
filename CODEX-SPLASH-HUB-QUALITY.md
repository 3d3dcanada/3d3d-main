# Codex Task: Splash Hub Quality Overhaul

## Context
This is the homepage ("Splash Hub") of 3d3d.ca — a 3D printing cooperative platform. It's an Astro 6 + React + Three.js (R3F) interactive orbit navigator. The current state has significant quality problems that need to be addressed systematically.

**Stack:** Astro 6, React 19, `@react-three/fiber` 9, `@react-three/drei` 10, `@react-three/postprocessing` 3, `three` 0.183, `motion/react` 12, Tailwind v4, TypeScript. Deployed on Cloudflare Pages.

**Theme:** Light mode only is the default. Dark mode exists but light is primary. Brand colors: `#40C4C4` teal, `#E84A8A` magenta, `#FF6B2B` orange.

---

## Critical Files
All paths relative to repo root `/home/wess/3d3d-platform/`:

| File | What it does |
|---|---|
| `src/components/SplashOrbit.tsx` | Main orchestrator — state, drag/wheel/keyboard input, lazy-loads SplashScene, renders card + nav |
| `src/components/SplashScene.tsx` | R3F Canvas — camera, lights, Environment, bloom, sparkles, renders orbit objects + center logo |
| `src/components/SplashObject.tsx` | Individual orbit item — loads GLB via `useGLTF`, builds materials, handles hover, Float animation |
| `src/components/SplashCenterLogo.tsx` | Center piece — toggles between 3D3D text logo and a procedural Prusa-style printer with animated nozzle + build plate preview |
| `src/components/SplashEffects.tsx` | Bloom post-processing (EffectComposer) |
| `src/components/SplashBentoCard.tsx` | Info card that appears for the focused/hovered section |
| `src/components/SplashNavPill.tsx` | Bottom pill nav bar |
| `src/components/SplashBackground.tsx` | Background layer (currently gradient-only, no video) |
| `src/components/SplashThemeToggle.tsx` | Light/dark toggle button |
| `src/lib/splash-orbit.ts` | Orbit math — radius, depth, position calculation, snap/angle helpers |
| `src/lib/splash-theme.ts` | Theme persistence (localStorage) |
| `src/data/splashSections.ts` | Section data — 5 sections (market, services, network, learn, about) with GLB paths, accents, copy |
| `src/styles/splash.css` | All splash CSS — layout, cards, nav, theme vars, mobile breakpoints |
| `public/models/*.glb` | 5 GLB models (market.glb, services.glb, network.glb, learn.glb, about.glb) |

---

## Problems to Fix (Priority Order)

### 1. OBJECTS ARE MONOCHROME — Need Colorful Multi-Material Treatment
**Current:** Every orbit object (`SplashObject.tsx` `buildModel()`) strips the original GLB materials and replaces ALL meshes with the same accent color (teal/magenta/orange) + a darkened variant. They also have a brushed-metal normal map forced onto them. The result looks like flat monochrome blobs.

**Required:** Each GLB object should look like a real, colorful 3D-printed product. The approach:
- **Preserve the original GLB materials** where they exist and look good. Only override materials that are missing/broken.
- If overriding, use **multiple distinct colors per object** — not just accent + darkened accent. Each mesh within a GLB should get a visually distinct treatment. Think: a shopping cart with a teal body, white wheels, orange handle. A gear with gold teeth and silver body.
- Keep the accent color as the **primary/dominant** color but add 2-3 complementary colors per object.
- The brushed-metal normal map is fine to keep as an option but should NOT be on every mesh. Use it on metallic parts only. Plastic/organic parts should be smooth or have a subtle matte finish.
- `envMapIntensity` variation per mesh is good — keep that.

### 2. INFO CARDS ARE BARREN AND USELESS
**Current:** `SplashBentoCard.tsx` shows: eyebrow, title, 1-line description, tags, CTA button. On mobile the tags are hidden. On short screens the description is hidden too. What remains is a nearly empty glass card.

**Required:**
- Add a **subtitle/tagline** field to `SplashSection` data and render it (short punchy line under the title, different from description).
- On mobile: keep tags visible (they're small pills, they fit). Remove the `display: none` on `.splash-card__tags`.
- The card should feel like a **product card** not a placeholder. Consider:
  - An accent-colored top border or left stripe on the card
  - A small icon or emoji per section in the eyebrow area
  - The description should be 2-3 sentences, not 1. Update the copy in `splashSections.ts`.
- Card transitions currently have blur(4px) — that's good, keep it.

### 3. MOBILE LAYOUT IS BROKEN
**Current problems:**
- The 3D scene is clipped at `bottom: 30%` on mobile which just cuts it off awkwardly.
- The orbit objects are still too close together — on a phone screen they overlap and you can't distinguish them.
- The card sits at the bottom but competes with the nav pill for space.
- Touch interaction (drag to rotate) feels sluggish and imprecise.

**Required:**
- Instead of clipping the scene shell, **reposition the camera** on mobile: zoom out further, tilt down slightly so the orbit sits in the upper 60% of the viewport naturally.
- Make the orbit items **scale down on mobile** — not just DPR cap, but actually reduce the object scale factor in `getOrbitItems()` when on mobile. Pass `isMobile` through to `SplashScene`.
- Card and nav need clear vertical separation. The card should sit comfortably above the nav with at least 12px gap.
- Consider a **swipe gesture** for orbit rotation on mobile (not just drag — swipe with momentum/inertia). The current drag works but the sensitivity (`Math.PI * 1.4` multiplier) may be too aggressive.

### 4. MOTION / ANIMATION FEELS OFF
**Current issues:**
- The center logo/printer toggles every 6.5 seconds via `setInterval` — this is jarring. The swap is instant with no transition.
- The focused object spins at `clock.elapsedTime * 1.5` — this is constant velocity spin which looks mechanical, not organic.
- The Float component on objects uses fixed speed/intensity — objects at the back of the orbit should float more subtly than the front one.
- Auto-rotate speed (`-0.00015`) kicks in after 5s idle — too fast for first impression, should start slower and ramp.

**Required:**
- **Logo/printer transition:** Cross-fade with scale. When swapping, scale the outgoing to 0.9 + fade opacity to 0, then scale the incoming from 1.1 to 1.0 + fade in. Use a React state machine, not an interval flip.
- **Focused object spin:** Use eased oscillation, not constant rotation. Something like `sin(elapsedTime * 0.8) * PI * 0.3` — a gentle rock back and forth, not a full spin.
- **Depth-based Float:** Scale Float `speed` and `floatIntensity` by the object's `normalizedDepth` — back objects nearly still, front object moves most.
- **Auto-rotate:** Start at 50% speed for the first 3 seconds of idle, then ease to full speed. Don't start rotating immediately at full speed.

### 5. LIGHTING STILL NEEDS WORK
- The scene currently has Environment preset="city" which is good for reflections but the overall scene feels flat in light mode.
- The warm teal/magenta/orange point lights wash everything in colored light — fine for dark mode, too strong for light mode. Reduce light-mode point light intensity by another 20%.
- The spotlight on the build plate (`intensity: 12` light mode) is invisible because it's white on a light scene. Give it a very slight warm tint `#FFF8F0`.
- Add a very subtle **ambient occlusion** pass to the EffectComposer (SSAO from postprocessing, low intensity).

### 6. CARD POSITIONING ON DESKTOP
- The card alternates left/right based on `focusedItem.x < 0`. This causes the card to jump sides rapidly when scrolling.
- Better: **lock the card to one side** (left on desktop) and only switch if the user has been idle for 500ms+. Use a debounced value.
- The card `width: min(24rem, calc(100% - 2rem))` is quite narrow. On wide screens (>1400px), bump to `min(28rem, ...)`.

---

## What NOT to Change
- Do NOT add dark mode as default. Light mode is primary.
- Do NOT remove the theme toggle — it should still exist.
- Do NOT change the section data structure fundamentally (keep the 5 sections, keep the GLB paths).
- Do NOT remove bloom, environment mapping, sparkles, or contact shadows.
- Do NOT introduce new npm dependencies — everything needed is already installed.
- Do NOT add video backgrounds — gradient only.
- Do NOT touch files outside the splash hub (no changes to layout, other pages, etc.).

## Build & Deploy
```bash
npx astro build    # must pass with zero errors
npx tsc --noEmit   # splash files must be error-free (some pre-existing errors in CampaignStrip.tsx / DeviceShowcase.tsx are known, ignore those)
git push origin main  # triggers Cloudflare Pages deploy to 3d3d.ca
```

## Success Criteria
1. Each orbit object looks like a distinct, colorful 3D product — not a monochrome blob
2. The info card feels informative and useful — not a hollow glass rectangle
3. Mobile layout gives the 3D scene room to breathe, card and nav don't overlap
4. Animations feel smooth and organic — no jarring swaps, no mechanical spinning
5. Light mode looks bright and polished, not washed out by colored point lights
6. Desktop card stays stable during scrolling, doesn't jump sides frantically
