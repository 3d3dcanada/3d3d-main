'use client'

import { useCallback, useEffect, useState } from 'react'

export interface HeroSlide {
  id: string
  eyebrow: string
  headline: string
  sub: string
  accent: string
  image: string
}

interface RotatingHeroProps {
  slides: HeroSlide[]
  fixedCta: {
    label: string
    onClick?: () => void
    href?: string
  }
  interval?: number
}

export function RotatingHero({ slides, fixedCta, interval = 6000 }: RotatingHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % slides.length)
  }, [slides.length])

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [isPaused, interval, next])

  const slide = slides[activeIndex]

  return (
    <section
      className="rotating-hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ '--hero-accent': slide.accent } as React.CSSProperties}
    >
      {/* Background layers */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`rotating-hero__bg ${i === activeIndex ? 'rotating-hero__bg--active' : ''}`}
          style={{ backgroundImage: `url(${s.image})` }}
          aria-hidden="true"
        />
      ))}
      <div className="rotating-hero__vignette" aria-hidden="true" />
      <div className="rotating-hero__scrim" aria-hidden="true" />
      <div className="rotating-hero__grain" aria-hidden="true" />

      {/* Color accent overlay */}
      <div
        className="rotating-hero__accent-overlay"
        style={{ background: `radial-gradient(ellipse at 30% 70%, ${slide.accent}18 0%, transparent 60%)` }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="rotating-hero__shell">
        <div className="rotating-hero__content" key={slide.id}>
          <p className="rotating-hero__eyebrow">{slide.eyebrow}</p>
          <h1 className="rotating-hero__headline">{slide.headline}</h1>
          <p className="rotating-hero__sub">{slide.sub}</p>
        </div>

        {/* Fixed CTA (doesn't change with slides) */}
        <div className="rotating-hero__cta-row">
          {fixedCta.href ? (
            <a href={fixedCta.href} className="rotating-hero__cta">
              {fixedCta.label}
            </a>
          ) : (
            <button className="rotating-hero__cta" onClick={fixedCta.onClick}>
              {fixedCta.label}
            </button>
          )}
        </div>

        {/* Navigation dots + arrows */}
        <div className="rotating-hero__nav">
          <button className="rotating-hero__arrow" onClick={prev} aria-label="Previous slide">
            ←
          </button>
          <div className="rotating-hero__dots">
            {slides.map((s, i) => (
              <button
                key={s.id}
                className={`rotating-hero__dot ${i === activeIndex ? 'rotating-hero__dot--active' : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{ '--dot-accent': s.accent } as React.CSSProperties}
              />
            ))}
          </div>
          <button className="rotating-hero__arrow" onClick={next} aria-label="Next slide">
            →
          </button>
        </div>
      </div>
    </section>
  )
}
