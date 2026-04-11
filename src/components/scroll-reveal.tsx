'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type RevealVariant =
  | 'scroll-in'
  | 'scroll-in-left'
  | 'scroll-in-right'
  | 'scroll-in-scale'
  | 'scroll-in-pop'
  | 'scroll-in-fade'
  | 'scroll-in-float'
  | 'scroll-in-rotate'

interface ScrollRevealProps {
  children: ReactNode
  variant?: RevealVariant
  delay?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  as?: 'div' | 'section' | 'article' | 'aside' | 'span' | 'li' | 'ul'
}

export function ScrollReveal({
  children,
  variant = 'scroll-in',
  delay,
  className = '',
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null)

  // IntersectionObserver fallback for browsers without animation-timeline: view()
  useEffect(() => {
    if (CSS.supports('animation-timeline', 'view()')) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const classes = [
    variant,
    delay ? `scroll-delay-${delay}` : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    // @ts-expect-error - dynamic tag element
    <Tag ref={ref} className={classes}>
      {children}
    </Tag>
  )
}
