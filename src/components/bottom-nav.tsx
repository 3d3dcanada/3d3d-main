'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ACCENT_HEX } from '@/data/siteNav'
import type { AccentKey } from '@/data/siteNav'

const TABS: { label: string; href: string; accent: AccentKey }[] = [
  { label: 'Home', href: '/', accent: 'teal' },
  { label: '3D3D', href: '/3d3d', accent: 'teal' },
  { label: 'Race', href: '/newport-bermuda', accent: 'magenta' },
  { label: 'STRX', href: '/strx', accent: 'orange' },
  { label: 'KEN', href: '/the-ken', accent: 'lime' },
]

export function BottomNav({ currentPath: _currentPath }: { currentPath?: string }) {
  const pathname = usePathname()

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {TABS.map((tab) => {
        const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href))
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`bottom-nav__link ${isActive ? 'bottom-nav__link--active' : ''}`}
            style={{ '--nav-accent': ACCENT_HEX[tab.accent] } as CSSProperties}
          >
            <span className="bottom-nav__label">{tab.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
