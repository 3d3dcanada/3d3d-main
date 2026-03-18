# 3D3D & Old Girl - Light Theme Redesign Plan

## March 2026 - Complete Design Overhaul

**Status:** Planning Phase  
**Sites:** 3d3d.ca, oldgirl.3d3d.ca  
**Goal:** Human-made aesthetic, light-only theme, organic layouts, left sidebar navigation

---

## The Core Problem

The current design suffers from:

1. **AI-generated aesthetic syndrome** - Dark charcoal backgrounds, glass-morphism everywhere, purple/teal gradients, Inter font, rounded-3xl cards - the "AI slop" signature
2. **Blocky, rigid layouts** - Everything in card grids, 3-column repeats, symmetrical spacing
3. **Large header consuming space** - The 100vh snap-scroll design eats valuable content real estate
4. **No human touch** - Feels like a SaaS dashboard, not a cooperative marketplace

## What We're Building Instead

A website that looks like a human made it with Wix in 2017-2019:
- **Light, colorful backgrounds** - Pastel gradients, NOT white/off-white/pure-white
- **Organic, curved elements** - No sharp blocky cards, flowing section dividers
- **Left sidebar navigation** - Primary nav lives in sidebar, NO top header
- **Bold but approachable** - Pastel-bold teal and magenta, confident but not harsh
- **Human imperfection** - Subtle variations, hand-crafted feel

---

## Color System - THE LIGHT THEME

### Base Palette - Colorful Pastel Surfaces

```
NO PURE WHITE
NO OFF-WHITE  
NO ALMOST-WHITE
NO DARK BACKGROUNDS

Background colors MUST be colorful pastels with depth.
```

**Surface Hierarchy:**

| Token | Hex | Usage |
|-------|-----|-------|
| `--surface-primary` | `#E8F4F4` | Soft teal-tinted base - main page background |
| `--surface-secondary` | `#FFF0F5` | Soft pink-tinted surface - elevated sections |
| `--surface-tertiary` | `#F0F8E8` | Soft green-tinted - accent areas |
| `--surface-card` | `#FAF5F8` | Warm blush for cards |
| `--surface-hover` | `#F5E8F0` | Hover state surfaces |

### Brand Colors - Pastel Bold

**Original neons transformed to pastel-bold:**

| Token | Hex | Description |
|-------|-----|-------------|
| `--teal-primary` | `#40C4C4` | Bold pastel teal - primary accent |
| `--teal-light` | `#80D8D8` | Lighter teal for backgrounds |
| `--teal-dark` | `#2A8A8A` | Darker teal for text on light |
| `--magenta-primary` | `#E84A8A` | Bold pastel magenta - secondary accent |
| `--magenta-light` | `#F088B0` | Lighter magenta for backgrounds |
| `--magenta-dark` | `#A83060` | Darker magenta for text |

### Text Colors - Dark Only

| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#1A1A2E` | Main body text |
| `--text-secondary` | `#3A3A4E` | Muted text, descriptions |
| `--text-accent` | `#2A8A8A` | Colored text (teal variant) |
| `--text-on-accent` | `#FFFFFF` | White text on colored buttons |

### Shadow System - Colored Shadows

Shadows have color, not just opacity:

```css
--shadow-sm: 0 2px 8px rgba(42, 138, 138, 0.12);
--shadow-md: 0 4px 16px rgba(42, 138, 138, 0.15);
--shadow-lg: 0 8px 32px rgba(42, 138, 138, 0.18);
--shadow-magenta: 0 4px 16px rgba(168, 48, 96, 0.15);
--shadow-card: 0 4px 20px rgba(58, 58, 78, 0.1);
```

### Gradient Mesh Backgrounds

Replace dark gradients with light, colorful ones:

```css
body {
  background-color: #E8F4F4;
  background-image: 
    radial-gradient(ellipse at 20% 30%, rgba(64, 196, 196, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(232, 74, 138, 0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(240, 136, 176, 0.08) 0%, transparent 40%);
}
```

---

## Typography System

### Font Stack - Human & Approachable

**Headings:** `Outfit` - Modern geometric sans, warm and approachable  
**Body:** `DM Sans` - Clean, humanist sans-serif  
**Accent/Data:** `JetBrains Mono` - Only for actual data displays, prices, specs

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

--font-display: 'Outfit', sans-serif;
--font-body: 'DM Sans', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Type Scale - Fluid & Readable

```css
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
--text-xl: clamp(1.25rem, 1rem + 1.25vw, 1.75rem);
--text-2xl: clamp(1.5rem, 1rem + 2.5vw, 2.5rem);
--text-3xl: clamp(2rem, 1rem + 5vw, 4rem);
--text-hero: clamp(2.5rem, 1rem + 8vw, 6rem);
```

---

## Layout Architecture

### Left Sidebar - Primary Navigation

**NO HEADER BAR. NO TOP NAV.**

The left sidebar IS the navigation. This is non-negotiable.

```
┌─────────────────────────────────────────────────────────┐
│ ┌─────────┐                                             │
│ │         │  Main Content Area                          │
│ │ SIDEBAR │                                             │
│ │         │  ┌─────────────────────────────────────┐   │
│ │ [3D3D]  │  │                                     │   │
│ │ Shop    │  │   Content flows here                │   │
│ │ Quote   │  │   with generous padding             │   │
│ │ About   │  │                                     │   │
│ │ Contact │  └─────────────────────────────────────┘   │
│ │         │                                             │
│ │ ─────── │                                             │
│ │ Ecosystem│                                            │
│ │ Old Girl│                                             │
│ │ ORA     │                                             │
│ │ STRX    │                                             │
│ └─────────┘                                             │
└─────────────────────────────────────────────────────────┘
```

### Sidebar Specifications

```
Width (expanded): 220px
Width (collapsed): 60px (icon-only mode)
Background: #E8F4F4 (matches surface-primary)
Border-right: 2px solid rgba(64, 196, 196, 0.3)
Padding: 24px 16px

Mobile: 
  - Fixed overlay, slides in from left
  - Full height, 280px width
  - Backdrop: rgba(26, 26, 46, 0.5)
  - Toggle button: fixed, top-left
```

### Content Area Flow

```
Sidebar Width: 220px (expanded) / 60px (collapsed)
Content Margin-left: 240px (when expanded) / 80px (when collapsed)
Content Padding: 32px 48px (desktop) / 16px 24px (mobile)
Max Content Width: 1200px
```

---

## Organic Layout System

### Breaking the Grid

NO MORE:
- 3-column equal-width card grids
- Perfectly aligned content blocks
- Symmetrical card layouts
- `rounded-3xl` on everything

### Instead Use:

1. **Organic Section Dividers**

```css
.section-divider {
  height: 60px;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,30 Q300,60 600,30 T1200,30 L1200,60 L0,60 Z' fill='%23FFF0F5'/%3E%3C/svg%3E");
  background-size: cover;
}
```

2. **Asymmetric Card Layouts**

```
┌──────────────────────────────────────┐
│  ┌─────────────┐                     │
│  │   Large     │   ┌─────────────┐  │
│  │   Card      │   │  Small      │  │
│  │             │   │  Card       │  │
│  └─────────────┘   └─────────────┘  │
│                    ┌─────────────┐  │
│  ┌─────────────┐   │  Medium     │  │
│  │  Medium     │   │  Card       │  │
│  │  Card       │   └─────────────┘  │
│  └─────────────┘                    │
└──────────────────────────────────────┘
```

3. **Curved Borders & Soft Corners**

```css
--radius-sm: 8px;
--radius-md: 16px;
--radius-lg: 24px;
--radius-xl: 40px;
--radius-full: 9999px;

/* Cards use varied radii */
.card-primary { border-radius: 24px 24px 8px 24px; }
.card-secondary { border-radius: 16px; }
.card-feature { border-radius: 40px; }
```

4. **Floating Elements with Rotation**

```css
.floating-accent {
  transform: rotate(-2deg);
  box-shadow: var(--shadow-lg);
}

.floating-accent:nth-child(2n) {
  transform: rotate(1.5deg);
}
```

---

## Component Patterns

### Product Card - Organic Feel

```html
<article class="product-card">
  <div class="product-image-wrapper">
    <img src="..." alt="..." />
    <span class="product-badge">Quick Print</span>
  </div>
  <div class="product-info">
    <h3 class="product-title">Wave Holder</h3>
    <p class="product-price">$12.00</p>
    <p class="product-maker">By Sarah M., Moncton</p>
  </div>
</article>
```

```css
.product-card {
  background: #FAF5F8;
  border-radius: 24px 24px 12px 24px;
  box-shadow: 0 4px 20px rgba(58, 58, 78, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px) rotate(0.5deg);
  box-shadow: 0 8px 32px rgba(42, 138, 138, 0.15);
}
```

### Section Headers - No Sharp Lines

```css
.section-header {
  position: relative;
  padding-bottom: 16px;
}

.section-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #40C4C4, #E84A8A);
  border-radius: 2px;
}
```

### Buttons - Soft & Bold

```css
.btn-primary {
  background: linear-gradient(135deg, #40C4C4, #2A8A8A);
  color: #FFFFFF;
  border: none;
  border-radius: 16px;
  padding: 14px 28px;
  font-family: var(--font-display);
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(42, 138, 138, 0.3);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(42, 138, 138, 0.4);
}

.btn-secondary {
  background: #FFF0F5;
  color: #E84A8A;
  border: 2px solid #E84A8A;
  border-radius: 16px;
  padding: 12px 24px;
}
```

---

## Anti-Patterns - FORBIDDEN

### These Will NOT Appear

1. **Dark backgrounds** - No `#0A0A0F`, no charcoal, no near-black
2. **Pure white backgrounds** - No `#FFFFFF`, no `#FAFAFA`, no `#F5F5F5`
3. **Glass-morphism on every element** - Use sparingly, max 1-2 per page
4. **Purple/blue gradients** - The AI signature, forbidden
5. `border-radius: 9999px` on every button - Mix it up
6. **Inter font** - Overused, use Outfit + DM Sans
7. **3-column equal grids** - Use asymmetric layouts
8. **Large header consuming viewport** - Sidebar only, content first
9. **Gradient text on headings** - One instance MAX, headline only
10. **`text-gray-400`** - Use brand colors for muted text

---

## Site-by-Site Application

### 3D3D.ca - Main Cooperative Site

**Primary Surface:** `#E8F4F4` (soft teal)  
**Accent:** `#40C4C4` (pastel-bold teal)  
**Secondary:** `#E84A8A` (pastel-bold magenta)

**Sections:**
- Hero: Large, warm welcome, cooperative story
- Shop: Organic product grid, maker attribution visible
- About: Story-driven, not stats-in-cards
- Contact: Friendly form, no dark modal

### Old Girl.3D3D.ca - Printer Restoration

**Primary Surface:** `#FFF0F5` (soft pink)  
**Accent:** `#A3E635` (lime - keep brand identity)  
**Secondary:** `#EF4444` (red - for alerts/highlights)

**Sections:**
- Project story with timeline (not cards)
- Donation section with warmth
- Print queue with human maker names
- Gallery with masonry layout (not grid)

---

## Implementation Phases

### Phase 1: CSS Token System
- [ ] Create new `global.css` with light theme tokens
- [ ] Define all color variables
- [ ] Set up typography scale
- [ ] Create shadow system

### Phase 2: Sidebar Component
- [ ] Rewrite `BrandSidebar.tsx` for light theme
- [ ] Remove dark color references
- [ ] Add collapse/expand states
- [ ] Mobile overlay implementation

### Phase 3: Layout Restructure
- [ ] Remove Hero component with large header
- [ ] Implement content-first layout
- [ ] Add organic section dividers
- [ ] Create asymmetric grid system

### Phase 4: Component Updates
- [ ] Update GlassCard to be soft-light card
- [ ] Rewrite button styles
- [ ] Update form inputs
- [ ] Create organic product card

### Phase 5: Page Rebuilds
- [ ] Homepage - new hero, cooperative story
- [ ] Shop page - organic product grid
- [ ] About page - narrative layout
- [ ] Contact page - friendly form

---

## Visual Reference - Era 2015-2020

### What Made That Era Feel Human

1. **Wix/Squarespace 2017-2019 templates**
   - Light, airy backgrounds
   - Bold accent colors (not neon)
   - Photography-first design
   - Rounded corners (not extreme)
   - Clear hierarchy, not competing elements

2. **Key characteristics:**
   - Subtle texture (not flat solid)
   - Shadows with purpose
   - White space that breathes
   - Typography that guides the eye
   - CTAs that stand out naturally

3. **What felt approachable:**
   - Warm color temperatures
   - Soft pastels with bold accents
   - Human photography
   - Imperfect symmetry
   - Personality in details

---

## Success Criteria

The redesign is successful when:

1. A visitor immediately thinks "a person made this"
2. The site feels like a Wix template from 2018 (in a good way)
3. NO dark surfaces appear anywhere
4. The left sidebar is the only navigation
5. Product cards feel curated, not generated
6. Colors are vibrant but not neon
7. Text is dark on light, always readable
8. Sections flow organically, not in rigid blocks

---

*Plan created: March 18, 2026*  
*Focus: 3d3d.ca and oldgirl.3d3d.ca*  
*Next step: User review and approval before implementation*