'use client'

import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export interface LightboxImage {
  src: string
  alt: string
}

interface LightboxProps {
  images: LightboxImage[]
  initialIndex: number
  open: boolean
  onClose: () => void
}

export function Lightbox({ images, initialIndex, open, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (open) setIndex(initialIndex)
  }, [open, initialIndex])

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % images.length)
  }, [images.length])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    },
    [onClose, goPrev, goNext]
  )

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, handleKeyDown])

  if (!mounted || !open || images.length === 0) return null

  const current = images[index]

  return createPortal(
    <div
      className="lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
    >
      <button
        className="lightbox-close"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        aria-label="Close lightbox"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {images.length > 1 && (
        <>
          <button
            className="lightbox-nav lightbox-nav--prev"
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            aria-label="Previous image"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="lightbox-nav lightbox-nav--next"
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            aria-label="Next image"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      <figure
        className="lightbox-figure"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.src}
          alt={current.alt}
          className="lightbox-image"
          draggable={false}
        />
        <figcaption className="lightbox-caption">
          <span className="lightbox-counter">
            {index + 1} / {images.length}
          </span>
          <span className="lightbox-alt">{current.alt}</span>
        </figcaption>
      </figure>
    </div>,
    document.body
  )
}
