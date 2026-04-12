'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ACCENT_HEX, ACTION_LINKS, PRIMARY_NAV, SECONDARY_NAV, SOCIAL_LINKS } from '@/data/siteNav'

interface RightSidebarProps {
  className?: string
}

export function RightSidebar({ className = '' }: RightSidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile hamburger trigger */}
      <button
        className="sidebar-trigger"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
        aria-expanded={mobileOpen}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      {/* Backdrop (mobile) */}
      {mobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`right-sidebar ${mobileOpen ? 'right-sidebar--open' : ''} ${className}`}
        aria-label="Site navigation"
      >
        <div className="right-sidebar__inner">
          {/* Brand */}
          <div className="right-sidebar__brand">
            <Link href="/" className="right-sidebar__brand-mark" onClick={() => setMobileOpen(false)}>
              3D3D
            </Link>
            <span className="right-sidebar__brand-copy">
              Operator · Builder · Atlantic Canada
            </span>
          </div>

          {/* Primary nav */}
          <nav className="right-sidebar__nav">
            {PRIMARY_NAV.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`right-sidebar__nav-link ${isActive ? 'right-sidebar__nav-link--active' : ''}`}
                  style={{ '--nav-accent': ACCENT_HEX[item.accent] } as React.CSSProperties}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="right-sidebar__nav-pip" />
                  <span>
                    <span className="right-sidebar__nav-title">{item.label}</span>
                    {item.description ? <span className="right-sidebar__nav-desc">{item.description}</span> : null}
                  </span>
                </Link>
              )
            })}
            <span className="right-sidebar__nav-kicker">More routes</span>
            {SECONDARY_NAV.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`right-sidebar__nav-link ${isActive ? 'right-sidebar__nav-link--active' : ''}`}
                  style={{ '--nav-accent': ACCENT_HEX[item.accent] } as React.CSSProperties}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="right-sidebar__nav-pip" />
                  <span>
                    <span className="right-sidebar__nav-title">{item.label}</span>
                    {item.description ? <span className="right-sidebar__nav-desc">{item.description}</span> : null}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* Social links */}
          <div className="right-sidebar__socials">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="right-sidebar__social-link"
                aria-label={link.label}
                title={link.label}
              >
                <svg width="16" height="16" viewBox={link.viewBox} fill="currentColor">
                  <path d={link.path} />
                </svg>
              </a>
            ))}
          </div>

          {/* Action links */}
          <div className="right-sidebar__actions">
            {ACTION_LINKS.map((link) => {
              const isMailto = link.href.startsWith('mailto:')
              return (
                <a
                  key={link.href}
                  href={link.href}
                  {...(isMailto ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  className="right-sidebar__action-link"
                >
                  {link.label}
                </a>
              )
            })}
          </div>

          {/* Contact */}
          <div className="right-sidebar__contact">
            <a href="mailto:info@3d3d.ca" className="right-sidebar__email">
              info@3d3d.ca
            </a>
          </div>
        </div>
      </aside>
    </>
  )
}
