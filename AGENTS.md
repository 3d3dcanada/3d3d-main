<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This project uses **Next.js 16.2** and **React 19.2**. APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code if you hit an unfamiliar API. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 3D3D.ca — Website Rebuild

## Current source of truth — locked 2026-04-11

Use `BUILD-V2/PLAN.md` as the governing build plan. It supersedes older handoff
files in this repo when they conflict, including `CODEX-DEFINITIVE-PROMPT.md`,
`CODEX-HANDOFF.md`, `WEBSITE-BUILD-PLAN.md`, and older references to preserving
WhatsApp or mirroring the full legacy Astro scope.

The build target is this repo: `/home/wess/Desktop/3D3D`. The old Astro content
must be read only through git history in `/home/wess/3d3d-platform` at commit
`f8c1a25` with commands such as:

```bash
git -C /home/wess/3d3d-platform show f8c1a25:src/pages/about.astro
```

Do not modify `/home/wess/3d3d-platform`, `/home/wess/Desktop/The-Ken-Plan`,
`/home/wess/.claude`, or any other adjacent project.

## Your mission

Rebuild `3d3d.ca` in Next.js 16 following `BUILD-V2/PLAN.md`: marine is the wedge, STRX is a service line, THE KEN is the operator brand, ORA is the software portfolio, and old Astro content is a read-only reference via git history.

**Before writing any code, read `BUILD-V2/PLAN.md` end-to-end.** Use `BUILD-V2/CODEX-QUESTIONS-ANSWERED.md` for the selected defaults unless Ken overrides them.

## Required reading (in order)

1. `BUILD-V2/PLAN.md` — current master plan and source of truth
2. `BUILD-V2/CODEX-QUESTIONS-ANSWERED.md` — selected defaults for pricing, sponsor tiers, names, ORA imagery, and newsletter
3. `research/MOBILE-CONVERSION-RESEARCH.md` — mobile conversion data
4. Old Astro files via `git -C /home/wess/3d3d-platform show f8c1a25:<path>` when a page needs legacy copy or structure

## Stack (already installed)

- **Framework:** Next.js 16.2.0 App Router
- **React:** 19.2.4
- **Styling:** Tailwind v4 (`@import "tailwindcss"` pattern)
- **Animation:** GSAP 3 + ScrollTrigger (installed, optional per page)
- **3D:** Three.js 0.183
- **TypeScript:** strict
- **Fonts:** Archivo, Archivo Black, Instrument Sans, JetBrains Mono (Google Fonts)

## Dev commands

```bash
cd /home/wess/Desktop/3D3D
npm install           # first time only
npm run dev           # starts dev server (check package.json for exact port)
npm run build         # production build
npm run start         # preview prod build locally
```

## Non-negotiable rules

1. **Do not touch the live Astro site** at `/home/wess/3d3d-platform`. Read only.
2. **Do not touch** `/home/wess/Desktop/The-Ken-Plan/`, `/home/wess/3d3d-crm/`, `/home/wess/ken ai/`, `/home/wess/the-ken-local-ai/`, or `/home/wess/.claude/`. These are separate projects and tooling.
3. **Use Ken's voice from `BUILD-V2/PLAN.md` and old Astro git history.** First person, sparse, real numbers, bounded claims.
4. **Preserve the Formspree endpoint** `https://formspree.io/f/mldlydbl` in the contact form. It is receiving real emails.
5. **Email-only contact. No phone numbers and no WhatsApp links.** `BUILD-V2` overrides the older WhatsApp requirement.
6. **Do not invent pages or features** outside `BUILD-V2` scope. Port useful old Astro content only where it supports the current plan.
7. **Do not install a CMS, auth, or database** without Ken's explicit approval.
8. **Do not change the accent colors** (teal #40C4C4, magenta #E84A8A, orange #FF6B2B, lime #AAFF2A) or the font stack.
9. **Do not deploy to production.** Preview only at `new.3d3d.ca` when ready.
10. **Never generate filler content with AI.** Missing content → `// TODO: port from live site` comment, not invented paragraphs.

## Build discipline

- **One page per commit.** Commit message format: `feat(page): port <page-name> from astro`
- **Run the dev server before committing** and verify the page renders without console errors or hydration warnings.
- **Test mobile at 375px width** in browser devtools before calling a page done.
- **If you're blocked** on something genuinely not answerable by reading the live site, ask Ken in chat — do not guess.
- **Prefer Server Components.** Use `'use client'` only when a component needs browser APIs, event handlers, or state.

## File structure to maintain

```
src/
├── app/
│   ├── layout.tsx              ← BaseLayout equivalent (RootLayout)
│   ├── page.tsx                ← Homepage
│   ├── about/page.tsx
│   ├── quote/page.tsx
│   ├── contact/page.tsx
│   ├── materials/page.tsx
│   ├── fleet/page.tsx
│   ├── workshops/page.tsx
│   ├── pricing/page.tsx
│   ├── faq/page.tsx
│   ├── software/page.tsx
│   ├── ora/page.tsx
│   ├── openkernel/page.tsx
│   ├── aro/page.tsx
│   ├── harbourmesh/page.tsx
│   ├── governance-kernel/page.tsx
│   ├── network/page.tsx
│   ├── join/page.tsx
│   ├── projects/page.tsx
│   ├── community/page.tsx
│   ├── sponsors/page.tsx
│   ├── shop/page.tsx
│   ├── merch/page.tsx
│   ├── book/page.tsx
│   ├── events/page.tsx
│   ├── media/page.tsx
│   ├── blog/
│   │   ├── page.tsx            ← index
│   │   └── [slug]/page.tsx     ← individual posts from MDX
│   ├── 3d-printing-[slug]/page.tsx
│   ├── event-support-[slug]/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── disclaimer/page.tsx
│   ├── cookies/page.tsx
│   ├── shipping/page.tsx
│   ├── casl/page.tsx
│   ├── accessibility/page.tsx
│   ├── not-found.tsx
│   └── globals.css
├── components/
│   ├── site-sidebar.tsx
│   ├── bottom-nav.tsx
│   ├── footer.tsx
│   ├── breadcrumbs.tsx
│   ├── hero.tsx
│   ├── glass-card.tsx
│   ├── bento-grid.tsx
│   ├── page-next-actions.tsx
│   ├── quote-calculator.tsx
│   ├── quote-drawer.tsx
│   ├── reviews.tsx
│   ├── cookie-consent.tsx
│   ├── subscribe-modal.tsx
│   ├── splash-scene.tsx
│   ├── smooth-scroll-provider.tsx (existing)
│   └── homepage.tsx (existing — may rewrite)
├── data/
│   ├── siteNav.ts
│   ├── splashSections.ts
│   ├── fleet.ts
│   ├── workshops.ts
│   ├── serviceAreas.ts
│   ├── ora.ts
│   ├── oraPresentation.ts
│   ├── openkernel.ts
│   ├── repositories.ts
│   ├── racingEvents.ts
│   └── mediaSections.ts
├── lib/
│   ├── analytics.ts            ← window.track3d3d wrapper
│   └── seo.ts                  ← metadata helpers
└── content/
    └── blog/
        └── *.mdx               ← 32 blog posts ported from live site
```

## Completion definition

The rebuild is "done" when:

1. All pages from `WEBSITE-BUILD-PLAN.md` scope are implemented and match the live site
2. `npm run build` succeeds with zero errors and zero warnings
3. All forms work end-to-end (Formspree receives test submissions)
4. Lighthouse scores: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 on mobile
5. Preview deployed at `new.3d3d.ca` and stable for 5 days
6. Ken has approved the preview

Then — and only then — DNS flips from Cloudflare pointing at Astro to Cloudflare pointing at this build.
