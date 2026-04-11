import type { CSSProperties } from 'react'
import Link from 'next/link'
import { ACTION_LINKS, ACCENT_HEX, PRIMARY_NAV } from '@/data/siteNav'

type SiteSidebarProps = {
  currentPath: string
}

export function SiteSidebar({ currentPath }: SiteSidebarProps) {
  return (
    <aside className="site-sidebar" aria-label="Primary">
      <div className="site-sidebar__inner">
        <Link href="/" className="site-sidebar__brand">
          <span className="site-sidebar__brand-mark">3D3D</span>
          <span className="site-sidebar__brand-copy">Operator. Builder.</span>
        </Link>

        <p className="site-sidebar__summary">
          Four divisions. One operator surface. Atlantic Canada.
        </p>

        <nav className="site-sidebar__nav">
          {PRIMARY_NAV.map((item) => {
            const isActive = currentPath === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`site-sidebar__nav-link ${isActive ? 'site-sidebar__nav-link--active' : ''}`}
                style={{ '--nav-accent': ACCENT_HEX[item.accent] } as CSSProperties}
              >
                <span className="site-sidebar__nav-title">{item.label}</span>
                {item.description ? <span className="site-sidebar__nav-desc">{item.description}</span> : null}
              </Link>
            )
          })}
        </nav>

        <div className="site-sidebar__links">
          {ACTION_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="site-sidebar__external-link"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}
