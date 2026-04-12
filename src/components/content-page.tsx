import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Card } from '@/components/card'
import { Hero } from '@/components/hero'
import { PageFrame } from '@/components/page-frame'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Section } from '@/components/section'
import { ACCENTS, type ContentCard, type ContentSection, type PageSpec } from '@/data/buildV2'

const toneClass: Record<ContentSection['tone'], string> = {
  dark: '',
  light: 'section--light',
  pink: 'section--light-pink',
  green: 'section--light-green',
  orange: 'section--light-orange',
  lime: 'section--light-lime',
}

function DetailCard({ card, fallbackAccent }: { card: ContentCard; fallbackAccent: string }) {
  const accent = card.accent ? ACCENTS[card.accent] : fallbackAccent
  const body = (
    <article className="info-card hover-3d" style={{ '--card-accent': accent } as CSSProperties}>
      {card.image ? (
        <div className="info-card__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.image} alt="" loading="lazy" />
        </div>
      ) : null}
      {card.meta ? <p className="info-card__meta">{card.meta}</p> : null}
      <h3 className="info-card__title">{card.title}</h3>
      <p className="info-card__body">{card.body}</p>
      {card.href ? <span className="info-card__link">Open &rarr;</span> : null}
    </article>
  )

  return card.href ? (
    <Link href={card.href} className="info-card-link">
      {body}
    </Link>
  ) : (
    body
  )
}

function SectionBody({ section }: { section: ContentSection }) {
  const accent = ACCENTS[section.accent]

  return (
    <ScrollReveal variant="scroll-in">
      <div className="content-section__stack">
        <Card accent={accent} eyebrow={section.eyebrow} title={section.title}>
          {section.copy?.map((paragraph) => (
            <p key={paragraph} className="section-copy">
              {paragraph}
            </p>
          ))}
          {section.ctas?.length ? (
            <div className="button-row">
              {section.ctas.map((cta) => (
                <Link key={cta.href} href={cta.href} className={cta.ghost ? 'button-link--ghost' : 'button-link'}>
                  {cta.label}
                </Link>
              ))}
            </div>
          ) : null}
        </Card>
        {section.cards?.length ? (
          <div className="info-grid">
            {section.cards.map((card, index) => (
              <ScrollReveal key={`${card.title}-${index}`} variant="scroll-in-float" delay={((index % 4) + 1) as 1 | 2 | 3 | 4}>
                <DetailCard card={card} fallbackAccent={accent} />
              </ScrollReveal>
            ))}
          </div>
        ) : null}
      </div>
    </ScrollReveal>
  )
}

function RenderSection({ section }: { section: ContentSection }) {
  const accent = ACCENTS[section.accent]

  if (section.tone === 'dark') {
    return (
      <Section id={section.id} accent={accent} imageSrc={section.image} imagePosition="center" align="start">
        <SectionBody section={section} />
      </Section>
    )
  }

  return (
    <section id={section.id} className={toneClass[section.tone]}>
      <div className="content-section__shell">
        <SectionBody section={section} />
      </div>
    </section>
  )
}

export function ContentPage({ spec }: { spec: PageSpec }) {
  return (
    <PageFrame currentPath={spec.currentPath ?? spec.path}>
      <Hero {...spec.hero} />
      {spec.sections.map((section, index) => (
        <RenderSection key={section.id ?? `${section.title}-${index}`} section={section} />
      ))}
    </PageFrame>
  )
}
