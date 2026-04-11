'use client'

import { useCallback, useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'full'
}

export function Modal({ open, onClose, children, size = 'md' }: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      setTimeout(() => contentRef.current?.focus(), 100)
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
      <div
        className={`modal-backdrop ${open ? 'modal-backdrop--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={contentRef}
        className={`modal-content modal-content--${size} ${open ? 'modal-content--open' : ''}`}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </>,
    document.body
  )
}
