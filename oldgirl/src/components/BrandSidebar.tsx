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
  surface: string;
  surfaceHover: string;
  border: string;
  text: string;
  textMuted: string;
}

interface Props {
  navGroups: NavGroup[];
  theme?: SidebarTheme;
  activePath?: string;
  actionButton?: ReactNode;
  siteName?: string;
}

/* ── Default light theme (Old Girl lime accent) ────────────────── */
const DEFAULT_THEME: SidebarTheme = {
  accent: '#84CC16',
  accentDark: '#65A30D',
  surface: '#E8F4E8',
  surfaceHover: '#D4F0D4',
  border: 'rgba(132, 204, 22, 0.3)',
  text: '#1A1A2E',
  textMuted: '#5A5A6E',
};

/* ── Default ecosystem nav (cross-site links) ──────────────────── */
const ECOSYSTEM_NAV: NavGroup = {
  label: 'Ecosystem',
  items: [
    { id: 'home', label: '3D3D', href: 'https://3d3d.ca' },
    { id: 'oldgirl', label: 'Old Girl', href: 'https://oldgirl.3d3d.ca' },
  ],
};

/* ── Easing constant ───────────────────────────────────────────── */
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

export default function BrandSidebar({
  navGroups,
  theme = DEFAULT_THEME,
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

  const toggleLeft = open && !isMobile ? '232px' : '16px';

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        style={{
          position: 'fixed',
          zIndex: 30,
          top: '16px',
          left: toggleLeft,
          transition: `left 0.3s ${EASE}`,
          background: theme.surface,
          border: `2px solid ${theme.border}`,
          borderRadius: '12px',
          padding: '10px',
          color: theme.text,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '44px',
          height: '44px',
          boxShadow: '0 2px 8px rgba(101, 163, 13, 0.15)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? (
            <>
              <line x1="5" y1="5" x2="15" y2="15" />
              <line x1="15" y1="5" x2="5" y2="15" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="17" y2="6" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="14" x2="17" y2="14" />
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
            background: 'rgba(26, 26, 46, 0.4)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* Sidebar panel */}
      <nav
        aria-label="Site navigation"
        style={{
          position: isMobile ? 'fixed' : 'fixed',
          top: 0,
          left: 0,
          zIndex: isMobile ? 50 : 20,
          height: '100dvh',
          width: isMobile ? '280px' : (open ? '220px' : '0px'),
          overflow: 'hidden',
          background: theme.surface,
          borderRight: `2px solid ${theme.border}`,
          transition: isMobile
            ? `transform 0.3s ${EASE}`
            : `width 0.3s ${EASE}`,
          transform: isMobile
            ? (open ? 'translateX(0)' : 'translateX(-100%)')
            : undefined,
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '72px 16px 24px',
          }}
        >
          {allGroups.map((group) => (
            <div key={group.label} style={{ marginBottom: '20px' }}>
              <div
                style={{
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: theme.textMuted,
                  fontFamily: 'Outfit, system-ui, sans-serif',
                  fontWeight: 600,
                  padding: '6px 12px 8px',
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
                      gap: '10px',
                      padding: '12px 14px',
                      borderLeft: `3px solid ${isActive ? theme.accent : 'transparent'}`,
                      background: isActive ? theme.surfaceHover : 'transparent',
                      color: isActive ? theme.text : theme.textMuted,
                      fontSize: '14px',
                      fontFamily: 'DM Sans, system-ui, sans-serif',
                      fontWeight: isActive ? 600 : 500,
                      textDecoration: 'none',
                      borderRadius: '0 12px 12px 0',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap',
                      minHeight: '48px',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = theme.surfaceHover;
                        e.currentTarget.style.color = theme.text;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = theme.textMuted;
                      }
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
            <div style={{ padding: '12px 12px', marginTop: '12px' }}>
              {actionButton}
            </div>
          )}
        </div>

        {/* Sidebar footer accent */}
        <div
          style={{
            padding: '16px',
            borderTop: `2px solid ${theme.border}`,
            background: `linear-gradient(135deg, ${theme.surface}, ${theme.surfaceHover})`,
          }}
        >
          <div
            style={{
              fontSize: '11px',
              color: theme.textMuted,
              fontFamily: 'Outfit, system-ui, sans-serif',
              fontWeight: 500,
            }}
          >
            Old Girl - 3D3D
          </div>
        </div>
      </nav>
    </>
  );
}
