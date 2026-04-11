'use client'

import type { CSSProperties } from 'react'
import { useState } from 'react'
import { OffCanvasDrawer } from '@/components/off-canvas-drawer'
import { ScrollReveal } from '@/components/scroll-reveal'
import type { Printer } from '@/data/fleet'

interface FleetGridProps {
  printers: Printer[]
}

export function FleetGrid({ printers }: FleetGridProps) {
  const [activePrinterId, setActivePrinterId] = useState<string | null>(null)

  const activePrinter = printers.find((p) => p.id === activePrinterId) ?? null

  return (
    <>
      <div className="fleet-grid">
        {printers.map((printer, i) => (
          <ScrollReveal
            key={printer.id}
            variant="scroll-in-float"
            delay={((i % 3) + 1) as 1 | 2 | 3}
          >
            <button
              type="button"
              onClick={() => setActivePrinterId(printer.id)}
              className="fleet-card fleet-card--button hover-3d"
              style={{ '--card-accent': printer.accent } as CSSProperties}
              aria-label={`Open details for ${printer.name}`}
            >
              <div className="fleet-card__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={printer.image} alt={printer.name} loading="lazy" />
              </div>
              <div>
                <p className="fleet-card__nickname">{printer.nickname}</p>
                <h3 className="fleet-card__title">{printer.name}</h3>
              </div>
              <p className="fleet-card__story">{printer.story}</p>
              <p className="section-copy">
                <strong>{printer.buildVolume}</strong> · {printer.firmware} · {printer.avgSpeed}
              </p>
              <div className="tag-row">
                {printer.materials.slice(0, 4).map((material) => (
                  <span key={material} className="tag">
                    {material}
                  </span>
                ))}
              </div>
              <span className="fleet-card__hint">Click for full specs →</span>
            </button>
          </ScrollReveal>
        ))}
      </div>

      <OffCanvasDrawer
        open={activePrinter !== null}
        onClose={() => setActivePrinterId(null)}
        title={activePrinter?.name ?? 'Printer details'}
        accent={activePrinter?.accent}
      >
        {activePrinter && (
          <div className="drawer-body">
            <div className="drawer-body__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activePrinter.image}
                alt={activePrinter.name}
                style={{ width: '100%', borderRadius: 'var(--radius-2)' }}
              />
            </div>

            <p className="drawer-body__eyebrow eyebrow">{activePrinter.nickname}</p>

            <p className="drawer-body__story">{activePrinter.story}</p>

            <dl className="drawer-body__specs">
              <div>
                <dt>Type</dt>
                <dd>{activePrinter.type}</dd>
              </div>
              <div>
                <dt>Build volume</dt>
                <dd>{activePrinter.buildVolume}</dd>
              </div>
              <div>
                <dt>Firmware</dt>
                <dd>{activePrinter.firmware}</dd>
              </div>
              <div>
                <dt>Avg speed</dt>
                <dd>{activePrinter.avgSpeed}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd style={{ textTransform: 'capitalize' }}>{activePrinter.status}</dd>
              </div>
            </dl>

            {activePrinter.statusNote && (
              <p className="drawer-body__note">{activePrinter.statusNote}</p>
            )}

            <div className="drawer-body__section">
              <h3 className="drawer-body__heading">Materials supported</h3>
              <div className="tag-row">
                {activePrinter.materials.map((material) => (
                  <span key={material} className="tag">
                    {material}
                  </span>
                ))}
              </div>
            </div>

            <div className="drawer-body__section">
              <h3 className="drawer-body__heading">Highlights</h3>
              <ul className="drawer-body__list">
                {activePrinter.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className="drawer-body__cta">
              <a
                href={`#quote-intake`}
                onClick={() => setActivePrinterId(null)}
                className="button-link"
                style={{ '--card-accent': activePrinter.accent } as CSSProperties}
              >
                Quote a job on this printer
              </a>
            </div>
          </div>
        )}
      </OffCanvasDrawer>
    </>
  )
}
