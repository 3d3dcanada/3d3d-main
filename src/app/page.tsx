import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Card } from '@/components/card'
import { CountdownTimer } from '@/components/countdown-timer'
import { PageFrame } from '@/components/page-frame'
import { RotatingHero, type HeroSlide } from '@/components/rotating-hero'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Section } from '@/components/section'
import { DIVISION_CARDS, TRUST_RAIL } from '@/data/siteContent'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  description:
    'You have a problem. Let\'s find a solution. 3D printing networks, AI systems, field operations. Founder-operated in Atlantic Canada.',
  path: '/',
})

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'problem-solver',
    eyebrow: 'You have a problem',
    headline: "Let's find a solution.",
    sub: 'Fabrication, AI systems, field operations, consulting. If it can be solved, we solve it. If it can be built, we build it.',
    accent: '#40C4C4',
    image: '/media/real/sunrise-offshore.jpg',
  },
  {
    id: 'marine',
    eyebrow: 'Marine · Motorsport · Restoration',
    headline: 'The part does not have to exist anymore for you to get it made.',
    sub: 'Reverse-engineered parts for marine hardware, classic cars, and impossible-to-source repairs. Engineering-grade materials that survive real conditions.',
    accent: '#40C4C4',
    image: '/media/workshop/printer-action-cf.jpg',
  },
  {
    id: 'field-ops',
    eyebrow: 'STRX · Field Operations',
    headline: 'When normal work has already failed.',
    sub: 'Rapid deployment. 1–5 operators within 24–72 hours. Cross-border logistics, project rescue, fabrication in the field.',
    accent: '#FF6B2B',
    image: '/media/race/race-morning-crew.jpg',
  },
  {
    id: 'newport',
    eyebrow: 'Newport-Bermuda 2026 · June 19',
    headline: '3D printing at sea.',
    sub: 'A Prusa Core One L on a racing yacht crossing the Atlantic. Manufacturing aboard, fabrication on arrival, the underdog proving what\'s possible.',
    accent: '#E84A8A',
    image: '/media/race/fastnet-fleet-horizon.jpg',
  },
]

export default function HomePage() {
  return (
    <PageFrame currentPath="/">
      {/* === ROTATING HERO === */}
      <RotatingHero
        slides={HERO_SLIDES}
        fixedCta={{
          label: 'Start a conversation →',
          href: '/3d3d#quote-intake',
        }}
      />

      {/* === TRUST RAIL === */}
      <div className="trust-rail" aria-label="Trust rail">
        {TRUST_RAIL.map((item, i) => (
          <ScrollReveal key={item} variant="scroll-in-pop" delay={(i + 1) as 1 | 2 | 3 | 4 | 5}>
            <div className="trust-rail__item stat-card">
              <p className="section-copy">{item}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* === DIVISION CARDS (light section) === */}
      <section className="section--light" style={{ padding: '5rem 0' }}>
        <div style={{ width: 'min(100%, var(--content-max))', margin: '0 auto', padding: '0 1.5rem' }}>
          <ScrollReveal variant="scroll-in-fade">
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: 'var(--text-dark-accent)',
              marginBottom: '0.75rem',
            }}>
              Four divisions. One operator.
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 1.4rem + 2vw, 3.2rem)',
              letterSpacing: '-0.04em',
              lineHeight: '0.94',
              color: 'var(--text-dark)',
              marginBottom: '3rem',
            }}>
              The infrastructure behind things that work.
            </h2>
          </ScrollReveal>

          <div className="homepage-grid" aria-label="Division cards">
            {DIVISION_CARDS.map((card, i) => (
              <ScrollReveal
                key={card.href}
                variant="scroll-in-float"
                delay={(i + 1) as 1 | 2 | 3 | 4}
              >
                <Link
                  href={card.href}
                  className="division-card floating hover-3d"
                  style={{ '--card-accent': card.accent } as CSSProperties}
                >
                  <p className="division-card__label">{card.label}</p>
                  <h3 className="division-card__title">{card.title}</h3>
                  <p className="division-card__copy">{card.description}</p>
                  <p className="division-card__cta">{card.cta} →</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* === NEWPORT-BERMUDA CAMPAIGN STRIP === */}
      <Section
        accent="#E84A8A"
        imageSrc="/media/race/osprey-marina-evening.jpg"
        imagePosition="center"
        align="start"
      >
        <ScrollReveal variant="scroll-in">
          <Card accent="#E84A8A" eyebrow="Newport-Bermuda 2026" title="3D printing at sea.">
            <p className="section-copy">
              June 19, 2026. A Prusa Core One L goes aboard a racing yacht for the 636-nautical-mile
              Newport-Bermuda Race. Manufacturing at sea. Fabrication on arrival. The underdog proving
              what small operators with the right tools can do.
            </p>
            <div style={{ margin: '2rem 0' }}>
              <CountdownTimer
                targetDate="2026-06-19T13:00:00-04:00"
                label="Until race start"
                accent="#E84A8A"
              />
            </div>
            <div className="button-row">
              <Link href="/newport-bermuda" className="button-link">
                The Campaign
              </Link>
              <a href="mailto:info@3d3d.ca?subject=Newport-Bermuda%20Sponsorship" className="button-link--ghost">
                Sponsor Inquiry
              </a>
            </div>
          </Card>
        </ScrollReveal>
      </Section>
    </PageFrame>
  )
}
