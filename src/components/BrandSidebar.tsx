import { useState, useEffect, useCallback, type ReactNode } from 'react';

/* ── Types ─────────────────────────────────────────────────────── */
export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface SidebarTheme {
  accent: string;
  accentDark: string;
  bg: string;
  bgAlt: string;
  border: string;
  text: string;
  muted: string;
  dimmed: string;
  glow: string;
}

interface Props {
  navGroups: NavGroup[];
  theme: SidebarTheme;
  activePath?: string;
  actionButton?: ReactNode;
  siteName?: string;
}

/* ── Default ecosystem nav (cross-site links) ──────────────────── */
const ECOSYSTEM_NAV: NavGroup = {
  label: 'Ecosystem',
  items: [
    { id: 'home', label: '3D3D', href: 'https://3d3d.ca' },
    { id: 'oldgirl', label: 'Old Girl', href: 'https://oldgirl.3d3d.ca' },
  ],
};

/* ── Cubic bezier constant ─────────────────────────────────────── */
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

export default function BrandSidebar({
  navGroups,
  theme,
  activePath = '',
  actionButton,
}: Props) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    handler(mq);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const allGroups = [...navGroups, ECOSYSTEM_NAV];

  /* ── Toggle button ───────────────────────────────────────────── */
  const toggleLeft = open && !isMobile ? '272px' : '12px';

  return (
    <>
      {/* Toggle */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        style={{
          position: 'fixed',
          zIndex: 30,
          top: '12px',
          left: toggleLeft,
          transition: `left 0.3s ${EASE}`,
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: `1px solid ${theme.border}`,
          borderRadius: '8px',
          padding: '8px',
          color: theme.text,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          minWidth: '44px',
          minHeight: '44px',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          {open ? (
            <>
              <line x1="4" y1="4" x2="14" y2="14" />
              <line x1="14" y1="4" x2="4" y2="14" />
            </>
          ) : (
            <>
              <line x1="3" y1="5" x2="15" y2="5" />
              <line x1="3" y1="9" x2="15" y2="9" />
              <line x1="3" y1="13" x2="15" y2="13" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile backdrop */}
      {isMobile && open && (
        <div
          onClick={close}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* Sidebar panel */}
      <nav
        aria-label="Site navigation"
        style={{
          position: isMobile ? 'fixed' : 'sticky',
          top: 0,
          left: 0,
          zIndex: isMobile ? 50 : 30,
          height: '100dvh',
          width: isMobile ? '280px' : (open ? '260px' : '0px'),
          overflow: 'hidden',
          background: theme.bg,
          borderRight: `1px solid ${theme.border}`,
          transition: isMobile
            ? `transform 0.25s ${EASE}`
            : `width 0.3s ${EASE}`,
          transform: isMobile ? (open ? 'translateX(0)' : 'translateX(-100%)') : undefined,
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '56px 12px 16px' }}>
          {allGroups.map((group) => (
            <div key={group.label} style={{ marginBottom: '16px' }}>
              <div
                style={{
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: theme.dimmed,
                  fontFamily: 'var(--font-tech)',
                  fontWeight: 600,
                  padding: '4px 12px 6px',
                  whiteSpace: 'nowrap',
                }}
              >
                {group.label}
              </div>
              {group.items.map((item) => {
                const isActive = item.href === activePath || item.id === activePath;
                return (
                  <a
                    key={item.id}
                    href={item.href || `#${item.id}`}
                    onClick={isMobile ? close : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      borderLeft: `3px solid ${isActive ? theme.accent : 'transparent'}`,
                      background: isActive ? `${theme.accent}14` : 'transparent',
                      color: isActive ? theme.text : theme.dimmed,
                      fontSize: '13px',
                      fontFamily: 'var(--font-sans)',
                      textDecoration: 'none',
                      borderRadius: '0 6px 6px 0',
                      transition: 'all 0.15s ease',
                      whiteSpace: 'nowrap',
                      minHeight: '44px',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = theme.muted;
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = theme.dimmed;
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </a>
                );
              })}
            </div>
          ))}

          {actionButton && (
            <div style={{ padding: '8px 12px', marginTop: '8px' }}>
              {actionButton}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
