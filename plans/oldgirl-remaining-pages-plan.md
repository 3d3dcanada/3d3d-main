# Old Girl Remaining Pages - Light Theme Update Plan

## March 18, 2026

### Status: Pending

---

## Overview

8 pages in the `oldgirl/` project still have hardcoded dark theme colors that need to be converted to the light theme. This plan outlines the systematic approach to update each page.

---

## Files to Update

### Legal Pages (5 files)
1. `oldgirl/src/pages/404.astro`
2. `oldgirl/src/pages/accessibility.astro`
3. `oldgirl/src/pages/casl.astro`
4. `oldgirl/src/pages/privacy.astro`
5. `oldgirl/src/pages/terms.astro`

### Blog Posts (3 files)
6. `oldgirl/src/pages/blog/old-girl-restoration-log.astro`
7. `oldgirl/src/pages/blog/community-printer-launch-plan.astro`
8. `oldgirl/src/pages/blog/3d-printer-fleet-monitoring.astro`

---

## Pattern to Apply

Each page needs these changes:

### 1. Remove `sidebarTheme` object
Delete the entire const:
```javascript
// DELETE THIS
const sidebarTheme = {
  accent: '#A3E635', accentDark: '#84CC16', bg: '#0a0a0a', bgAlt: '#141414',
  border: 'rgba(255,255,255,0.08)', text: '#e8e8e8', muted: '#999999', dimmed: '#555555', glow: 'rgba(163,230,53,0.3)',
};
```

### 2. Update BrandSidebar call
Remove `theme={sidebarTheme}` prop:
```astro
<!-- FROM -->
<BrandSidebar slot="sidebar" client:load navGroups={sidebarNav} theme={sidebarTheme} activePath="/..." />

<!-- TO -->
<BrandSidebar slot="sidebar" client:load navGroups={sidebarNav} activePath="/..." />
```

### 3. Color Mappings
Replace hardcoded colors with CSS variables:

| Dark Theme | Light Theme |
|------------|-------------|
| `#0a0a0a`, `#141414`, `#1a1a1a` | `var(--color-surface-card)` |
| `#e8e8e8` | `var(--color-text-primary)` |
| `#999999` | `var(--color-text-secondary)` |
| `#555555` | `var(--color-text-muted)` |
| `#A3E635` | `#84CC16` (lime primary) or `#65A30D` (lime dark) |
| `rgba(255,255,255,0.05)` | `var(--color-border-subtle)` |
| `rgba(255,255,255,0.06)` | `var(--color-border-subtle)` |
| `rgba(255,255,255,0.08)` | `var(--color-border-default)` |
| `font-tech` class | `font-family: var(--font-display)` |

### 4. Update `accent` prop on BaseLayout
```astro
<!-- FROM -->
accent="#A3E635"

<!-- TO -->
accent="#84CC16"
```

---

## Execution Order

### Phase 1: Legal Pages (simpler, similar structure)
1. 404.astro
2. accessibility.astro
3. casl.astro
4. privacy.astro
5. terms.astro

### Phase 2: Blog Posts (longer, more content)
6. old-girl-restoration-log.astro
7. community-printer-launch-plan.astro
8. 3d-printer-fleet-monitoring.astro

---

## Verification Steps

After updating all pages:

1. **Build test**
   ```bash
   cd oldgirl && npm run build
   ```

2. **Check for remaining hardcoded colors**
   ```bash
   grep -r "#[0-9a-fA-F]\{6\}" oldgirl/src/pages/
   ```
   Should only return `#84CC16`, `#65A30D`, `#F59E0B` (intentional accent colors)

3. **Visual review**
   - All pages should have pastel backgrounds
   - Text should be dark (#1A1A2E)
   - Accent elements should be lime green
   - No dark/black backgrounds visible

---

## Notes

- Keep `#F59E0B` (amber) for warning/status indicators
- Keep `#EF4444` (red) for error states
- Blog posts may have code blocks - keep those readable
- Do NOT add dark mode support - light only per design spec

---

## Completion Criteria

- [ ] All 8 pages updated
- [ ] `npm run build` succeeds in oldgirl/
- [ ] No dark theme color codes remain
- [ ] Visual consistency across all pages
- [ ] Both sites deploy successfully to Vercel