import type { CSSProperties } from 'react'
import { Card } from '@/components/card'
import { FleetGrid } from '@/components/fleet-grid'
import { Hero } from '@/components/hero'
import { PageFrame } from '@/components/page-frame'
import { ACCENTS } from '@/data/buildV2'
import { FLEET, FLEET_STATS } from '@/data/fleet'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Fleet',
  description: 'The 3D3D printer fleet: six active machines, real material coverage, and the Prusa Core One L.',
  path: '/fleet',
})

export default function FleetPage() {
  return (
    <PageFrame currentPath="/fleet">
      <Hero
        eyebrow="Printer fleet"
        title="Six active printers. One practical shop system."
        subtitle="Small, fast, enclosed, large-format, multi-material, and the Prusa Core One L for engineering plastics."
        image="/media/workshop/core-one-l.avif"
        accent="teal"
        ctas={[{ label: 'Quote a part', href: '/quote' }]}
      />
      <section className="section--light">
        <div className="content-section__shell">
          <div className="content-section__stack">
            <Card accent={ACCENTS.teal} eyebrow="Fleet stats" title="The machine choice follows the part.">
              <div className="stat-grid" style={{ marginTop: '1.5rem' }}>
                <div className="stat-card" style={{ '--card-accent': ACCENTS.teal } as CSSProperties}>
                  <p className="stat-card__label">Printers</p>
                  <p className="stat-card__value">{FLEET_STATS.totalPrinters}</p>
                </div>
                <div className="stat-card" style={{ '--card-accent': ACCENTS.magenta } as CSSProperties}>
                  <p className="stat-card__label">Materials</p>
                  <p className="stat-card__value">{FLEET_STATS.materialsSupported}</p>
                </div>
                <div className="stat-card" style={{ '--card-accent': ACCENTS.orange } as CSSProperties}>
                  <p className="stat-card__label">Max volume</p>
                  <p className="stat-card__value">{FLEET_STATS.maxBuildVolume}</p>
                </div>
              </div>
            </Card>
            <FleetGrid printers={FLEET} />
          </div>
        </div>
      </section>
    </PageFrame>
  )
}
