'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ACCENT_HEX, BOTTOM_NAV } from '@/data/siteNav'

export function BottomNav({ currentPath: _currentPath }: { currentPath?: string }) {
  const pathname = usePathname()

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {BOTTOM_NAV.map((tab) => {
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
