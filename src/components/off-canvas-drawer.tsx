'use client'

import { useCallback, useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface OffCanvasDrawerProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  accent?: string
}

export function OffCanvasDrawer({
  open,
  onClose,
  children,
  title,
  accent = '#40C4C4',
}: OffCanvasDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  // Close on ESC
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  // Trap focus and lock body scroll
  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      // Focus the panel
      setTimeout(() => panelRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, handleKeyDown])

  if (typeof window === 'undefined') return null

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${open ? 'drawer-backdrop--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`drawer-panel ${open ? 'drawer-panel--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Drawer'}
        tabIndex={-1}
        style={{ '--drawer-accent': accent } as React.CSSProperties}
      >
        {/* Header */}
        <div className="drawer-panel__header">
          {title && <h2 className="drawer-panel__title">{title}</h2>}
          <button
            className="drawer-panel__close"
            onClick={onClose}
            aria-label="Close drawer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="drawer-panel__content">
          {children}
        </div>
      </div>
    </>,
    document.body
  )
}
