import type { CSSProperties, ReactNode } from 'react'

type CardProps = {
  accent: string
  eyebrow?: string
  title?: string
  subtitle?: string
  titleAs?: 'h1' | 'h2'
  hero?: boolean
  className?: string
  children?: ReactNode
}

export function Card({
  accent,
  eyebrow,
  title,
  subtitle,
  titleAs = 'h2',
  hero = false,
  className = '',
  children,
}: CardProps) {
  const style = { '--card-accent': accent } as CSSProperties
  const TitleTag = titleAs

  return (
    <article className={`glass-card ${hero ? 'glass-card--hero' : ''} ${className}`.trim()} style={style}>
      <div className="glass-card__inner">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        {title ? <TitleTag className={hero ? 'display-title' : 'section-title'}>{title}</TitleTag> : null}
        {subtitle ? <p className="section-copy section-copy--lead">{subtitle}</p> : null}
        {children}
      </div>
    </article>
  )
}
