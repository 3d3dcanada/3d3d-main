import type { CSSProperties, ReactNode } from 'react'

type SectionProps = {
  accent: string
  imageSrc?: string
  imagePosition?: string
  align?: 'start' | 'center' | 'end'
  hero?: boolean
  className?: string
  children: ReactNode
}

export function Section({
  accent,
  imageSrc,
  imagePosition = 'center',
  align = 'start',
  hero = false,
  className = '',
  children,
}: SectionProps) {
  const style = { '--section-accent': accent } as CSSProperties
  const backgroundStyle = imageSrc
    ? ({
        backgroundImage: `url('${imageSrc}')`,
        backgroundPosition: imagePosition,
      } as CSSProperties)
    : undefined

  return (
    <section className={`hp-section ${hero ? 'hp-section--hero' : ''} ${className}`.trim()} style={style}>
      <div className="hp-section__bg">
        <div
          className={`hp-section__bg-img hp-section__bg-img--active ${
            imageSrc ? '' : 'hp-section__bg-img--placeholder'
          }`.trim()}
          style={backgroundStyle}
        />
      </div>
      <div className="hp-section__vignette" />
      <div className="hp-section__scrim" />
      <div className="hp-section__grain" />
      <div className={`hp-section__shell hp-section__shell--${align}`}>{children}</div>
    </section>
  )
}
