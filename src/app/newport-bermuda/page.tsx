import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Card } from '@/components/card'
import { CountdownTimer } from '@/components/countdown-timer'
import { PageFrame } from '@/components/page-frame'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Section } from '@/components/section'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Newport-Bermuda 2026',
  description:
    '3D printing at sea. A Prusa Core One L aboard a racing yacht for the 636nm Newport-Bermuda Race. June 19, 2026.',
  path: '/newport-bermuda',
})

const SPONSOR_TIERS = [
  {
    name: 'Race Partner',
    description: 'Logo on the printer enclosure. Featured in all race-day content. Named in the campaign story.',
    accent: '#E84A8A',
  },
  {
    name: 'Workshop Sponsor',
    description: 'Your brand at every maritime workshop. Materials sponsored = your name on the results.',
    accent: '#40C4C4',
  },
  {
    name: 'Content Collaborator',
    description: 'Video placement, social features, and documentation of parts made with your materials or tools.',
    accent: '#FF6B2B',
  },
]

export default function NewportBermudaPage() {
  return (
    <PageFrame currentPath="/">
      {/* === HERO === */}
      <Section
        accent="#E84A8A"
        imageSrc="/media/race/fastnet-fleet-horizon.jpg"
        imagePosition="center"
        align="start"
        hero
      >
        <Card
          accent="#E84A8A"
          eyebrow="Newport-Bermuda Race 2026"
          title="3D Printing at Sea."
          titleAs="h1"
          subtitle="A Prusa Core One L on a racing yacht. Manufacturing aboard. Fabrication on arrival. Proving what small operators with the right tools can do."
          hero
        >
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Newport-Bermuda 2026' }]} />
          <div style={{ margin: '2rem 0' }}>
            <CountdownTimer
              targetDate="2026-06-19T13:00:00-04:00"
              label="Until race start — Fort Adams, Newport RI"
              accent="#E84A8A"
            />
          </div>
          <div className="button-row">
            <a href="mailto:info@3d3d.ca?subject=Newport-Bermuda%20Sponsorship%20Inquiry" className="button-link">
              Sponsor Inquiry
            </a>
            <Link href="/the-ken" className="button-link--ghost">
              The Record
            </Link>
          </div>
        </Card>
      </Section>

      {/* === WHAT'S HAPPENING (light section) === */}
      <section className="section--light" style={{ padding: '5rem 0' }}>
        <div style={{ width: 'min(100%, var(--content-max))', margin: '0 auto', padding: '0 1.5rem' }}>
          <ScrollReveal variant="scroll-in">
            <Card accent="#E84A8A" eyebrow="The campaign" title="What's happening.">
              <div className="section-copy" style={{ display: 'grid', gap: '1.25rem' }}>
                <p>
                  <strong>The race:</strong> Newport-Bermuda. 636 nautical miles. Open ocean. Gulf Stream crossing.
                  One of the oldest ocean races in the world — first run in 1906. The boat leaves Fort Adams,
                  Newport, Rhode Island on June 19, 2026 at 13:00 EDT.
                </p>
                <p>
                  <strong>The printer:</strong> A Prusa Core One L — an industrial-grade machine with a heated chamber
                  capable of engineering plastics. Partnership gift from Prusa Research. It goes aboard for the crossing.
                  Pre-loaded with marine part designs. Running at sea.
                </p>
                <p>
                  <strong>The operator:</strong> Ken arrives in Bermuda to meet the boat. Once docked, the printer
                  becomes a live fabrication station — printing parts for arriving race boats, demonstrating marine
                  3D printing to crews, proving the concept works where it matters.
                </p>
                <p>
                  <strong>The story:</strong> The underdog. One operator, one printer, one race. No corporate
                  backing, no massive budget. Just capability, preparation, and the willingness to put it on the line.
                  This is how you prove something works — you use it in the hardest conditions.
                </p>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* === RACE DETAILS (dark cinematic) === */}
      <Section accent="#40C4C4" imageSrc="/media/race/weddell-stern.jpg" imagePosition="center" align="start">
        <div className="section-stack">
          <ScrollReveal variant="scroll-in">
            <Card accent="#40C4C4" eyebrow="Race details" title="The numbers.">
              <div className="stat-grid" style={{ marginTop: '1.5rem' }}>
                <div className="stat-card" style={{ '--card-accent': '#40C4C4' } as CSSProperties}>
                  <p className="stat-card__label">Distance</p>
                  <p className="stat-card__value">636 nm</p>
                </div>
                <div className="stat-card" style={{ '--card-accent': '#E84A8A' } as CSSProperties}>
                  <p className="stat-card__label">Race start</p>
                  <p className="stat-card__value">Jun 19</p>
                </div>
                <div className="stat-card" style={{ '--card-accent': '#FF6B2B' } as CSSProperties}>
                  <p className="stat-card__label">Duration</p>
                  <p className="stat-card__value">3–6 days</p>
                </div>
                <div className="stat-card" style={{ '--card-accent': '#AAFF2A' } as CSSProperties}>
                  <p className="stat-card__label">First run</p>
                  <p className="stat-card__value">1906</p>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </Section>

      {/* === SPONSOR PITCH (light green section) === */}
      <section className="section--light-green" style={{ padding: '5rem 0' }}>
        <div style={{ width: 'min(100%, var(--content-max))', margin: '0 auto', padding: '0 1.5rem' }}>
          <ScrollReveal variant="scroll-in-fade">
            <Card accent="#AAFF2A" eyebrow="For sponsors" title="Support the underdog.">
              <p className="section-copy">
                This campaign runs on capability, not budget. Sponsors get visible placement in a real ocean race
                + a year-round workshop tour across the Maritimes. Your brand associated with real problem-solving,
                not corporate hospitality.
              </p>
            </Card>
          </ScrollReveal>

          <div className="pricing-grid" style={{ marginTop: '2rem' }}>
            {SPONSOR_TIERS.map((tier, i) => (
              <ScrollReveal key={tier.name} variant="scroll-in-float" delay={(i + 1) as 1 | 2 | 3}>
                <div
                  className="price-card hover-3d"
                  style={{ '--card-accent': tier.accent } as CSSProperties}
                >
                  <p className="price-card__label">{tier.name}</p>
                  <p className="price-card__amount">Custom</p>
                  <p className="price-card__note">{tier.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="scroll-in">
            <div className="button-row" style={{ marginTop: '2.5rem', justifyContent: 'center' }}>
              <a href="mailto:info@3d3d.ca?subject=Sponsorship%20Inquiry%20-%20Newport-Bermuda%202026" className="button-link">
                Start Sponsorship Conversation
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* === WHAT THE PRINTER WILL DO (dark cinematic) === */}
      <Section accent="#FF6B2B" imageSrc="/media/race/helm-offshore-sunny.jpg" imagePosition="center" align="start">
        <ScrollReveal variant="scroll-in">
          <Card accent="#FF6B2B" eyebrow="At sea + on arrival" title="What the printer does.">
            <div className="section-list">
              <div className="section-list__item" style={{ '--card-accent': '#FF6B2B' } as CSSProperties}>
                <h3 className="section-list__title">During the race</h3>
                <p className="section-list__body">
                  Pre-loaded with marine part designs. Runs autonomously. If something breaks aboard,
                  it can be fabricated mid-ocean. Proof of concept for onboard manufacturing.
                </p>
              </div>
              <div className="section-list__item" style={{ '--card-accent': '#40C4C4' } as CSSProperties}>
                <h3 className="section-list__title">In Bermuda</h3>
                <p className="section-list__body">
                  Ken arrives dockside. The printer becomes a live fabrication station for the arriving
                  race fleet. Broken parts printed. Demonstrations for crews. Proof that 3D printing
                  belongs in the marine world.
                </p>
              </div>
              <div className="section-list__item" style={{ '--card-accent': '#E84A8A' } as CSSProperties}>
                <h3 className="section-list__title">Content</h3>
                <p className="section-list__body">
                  Every print documented. Every fix filmed. The whole campaign becomes a story —
                  the underdog operator proving that small, well-prepared teams with the right tools
                  change the math on what&apos;s possible.
                </p>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </Section>
    </PageFrame>
  )
}
