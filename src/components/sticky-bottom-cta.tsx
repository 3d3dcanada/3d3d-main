'use client'

import { useEffect, useState } from 'react'

export function StickyBottomCta({
  href = '/quote',
  label = 'Start a quote',
  hidden = false,
}: {
  href?: string
  label?: string
  hidden?: boolean
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setVisible(scrollable > 0 && window.scrollY / scrollable > 0.3)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (hidden) {
    return null
  }

  return (
    <a className={`sticky-cta ${visible ? 'sticky-cta--visible' : ''}`} href={href}>
      {label}
    </a>
  )
}
