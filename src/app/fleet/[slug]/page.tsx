import type { CSSProperties } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Card } from '@/components/card'
import { Hero } from '@/components/hero'
import { PageFrame } from '@/components/page-frame'
import { ACCENTS, type AccentKey } from '@/data/buildV2'
import { FLEET } from '@/data/fleet'
import { buildMetadata } from '@/lib/seo'

// Map hex accent strings from fleet.ts to semantic AccentKey
const HEX_TO_KEY: Record<string, AccentKey> = {
  '#40C4C4': 'teal',
  '#E84A8A': 'magenta',
  '#FF6B2B': 'orange',
  '#AAFF2A': 'lime',
}

// Extra Newport-Bermuda context for the flagship printer
const FLAGSHIP_CONTEXT: Record<string, { eyebrow: string; note: string }> = {
  'prusa-core-one-l': {
    eyebrow: 'Newport-Bermuda 2026 partnership machine',
    note: 'This is the printer that rides aboard Osprey for the 2026 Newport-Bermuda Race. Heated chamber, 300 × 300 × 330 mm build, engineering plastics. The honest fabrication demonstration is dockside in Bermuda after arrival.',
  },
}

export function generateStaticParams() {
  return FLEET.map((printer) => ({ slug: printer.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const printer = FLEET.find((p) => p.id === slug)
  if (!printer) {
    return buildMetadata({
      title: 'Printer',
      description: '3D3D fleet printer detail page.',
      path: `/fleet/${slug}`,
    })
  }
  return buildMetadata({
    title: `${printer.name} — ${printer.nickname}`,
    description: printer.story.slice(0, 160),
    path: `/fleet/${slug}`,
  })
}

export default async function FleetDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const printer = FLEET.find((p) => p.id === slug)
  if (!printer) notFound()

  const accentKey = HEX_TO_KEY[printer.accent] ?? 'teal'
  const flagship = FLAGSHIP_CONTEXT[printer.id]

  return (
    <PageFrame currentPath="/fleet">
      <Hero
        eyebrow={flagship?.eyebrow ?? `Fleet · ${printer.type}`}
        title={printer.name}
        subtitle={printer.nickname}
        image={printer.image}
        accent={accentKey}
        ctas={[
          { label: 'Start a quote', href: '/quote' },
          { label: 'All printers', href: '/fleet', ghost: true },
        ]}
      />

      <section className="section--light">
        <div className="content-section__shell">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Fleet', href: '/fleet' },
              { label: printer.name },
            ]}
          />

          <div className="content-section__stack">
            <Card accent={ACCENTS[accentKey]} eyebrow="The story" title={printer.nickname}>
              <p className="section-copy">{printer.story}</p>
              {flagship ? <p className="section-copy">{flagship.note}</p> : null}
              {printer.statusNote ? (
                <p className="section-copy">
                  <strong>Status note:</strong> {printer.statusNote}
                </p>
              ) : null}
            </Card>
          </div>
        </div>
      </section>

      <section className="section--light-pink">
        <div className="content-section__shell">
          <Card accent={ACCENTS.magenta} eyebrow="Specs" title="Hardware at a glance">
            <dl className="fleet-detail__specs">
              <div>
                <dt>Type</dt>
                <dd>{printer.type}</dd>
              </div>
              <div>
                <dt>Build volume</dt>
                <dd>{printer.buildVolume}</dd>
              </div>
              <div>
                <dt>Firmware</dt>
                <dd>{printer.firmware}</dd>
              </div>
              <div>
                <dt>Average speed</dt>
                <dd>{printer.avgSpeed}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd style={{ textTransform: 'capitalize' }}>{printer.status}</dd>
              </div>
            </dl>
          </Card>
        </div>
      </section>

      <section className="section--light-orange">
        <div className="content-section__shell">
          <Card accent={ACCENTS.orange} eyebrow="Materials" title="Supported filaments and compounds">
            <div className="tag-row">
              {printer.materials.map((material) => (
                <span key={material} className="tag">
                  {material}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="section--light-lime">
        <div className="content-section__shell">
          <Card accent={ACCENTS.lime} eyebrow="Highlights" title="Why it earns its place">
            <ul className="info-card__list">
              {printer.highlights.map((highlight) => (
                <li key={highlight} className="section-copy">
                  {highlight}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="section--light">
        <div className="content-section__shell">
          <Card accent={ACCENTS.teal} eyebrow="Quote a job" title="This machine is available.">
            <p className="section-copy">
              Tell me the part, the environment, and the timeline. I will route it to the right
              printer — this one when the specs fit, another when they do not.
            </p>
            <div className="button-row" style={{ marginTop: '1rem' }}>
              <Link className="button-link" href="/quote">
                Start the quote workflow
              </Link>
              <Link className="button-link--ghost" href="/fleet">
                See the full fleet
              </Link>
              {flagship ? (
                <Link className="button-link--ghost" href="/newport-bermuda">
                  Newport-Bermuda 2026
                </Link>
              ) : null}
            </div>
          </Card>
        </div>
      </section>
    </PageFrame>
  )
}
