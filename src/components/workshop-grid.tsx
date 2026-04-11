'use client'

import type { CSSProperties } from 'react'
import { useState } from 'react'
import { Modal } from '@/components/modal'
import { ScrollReveal } from '@/components/scroll-reveal'
import type { Workshop } from '@/data/workshops'

interface WorkshopGridProps {
  workshops: Workshop[]
}

export function WorkshopGrid({ workshops }: WorkshopGridProps) {
  const [activeWorkshopId, setActiveWorkshopId] = useState<string | null>(null)

  const activeWorkshop = workshops.find((w) => w.id === activeWorkshopId) ?? null

  return (
    <>
      <div className="workshop-grid" style={{ marginTop: '2rem' }}>
        {workshops.map((workshop, i) => (
          <ScrollReveal
            key={workshop.id}
            variant="scroll-in-scale"
            delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
          >
            <button
              type="button"
              onClick={() => setActiveWorkshopId(workshop.id)}
              className="workshop-card workshop-card--button hover-3d"
              style={{ '--card-accent': '#AAFF2A' } as CSSProperties}
              aria-label={`Open full details for ${workshop.title}`}
            >
              <div>
                <p className="workshop-card__meta">
                  {workshop.type} · {workshop.duration}
                </p>
                <h3 className="workshop-card__title">{workshop.title}</h3>
              </div>
              <p className="workshop-card__description">{workshop.description}</p>
              <div className="workshop-card__price-list">
                {workshop.pricing.map((price) => (
                  <div
                    key={`${workshop.id}-${price.label}`}
                    className="workshop-card__price-row"
                  >
                    <span>{price.label}</span>
                    <span>{price.price}</span>
                  </div>
                ))}
              </div>
              <span className="workshop-card__hint">View full curriculum →</span>
            </button>
          </ScrollReveal>
        ))}
      </div>

      <Modal
        open={activeWorkshop !== null}
        onClose={() => setActiveWorkshopId(null)}
        size="lg"
      >
        {activeWorkshop && (
          <div
            className="workshop-modal"
            style={{ '--card-accent': '#AAFF2A' } as CSSProperties}
          >
            <p className="eyebrow">{activeWorkshop.type} · {activeWorkshop.duration}</p>
            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
              {activeWorkshop.title}
            </h2>

            <div className="workshop-modal__meta-row">
              <div>
                <dt>Audience</dt>
                <dd>{activeWorkshop.audience}</dd>
              </div>
              <div>
                <dt>Capacity</dt>
                <dd>{activeWorkshop.capacity}</dd>
              </div>
            </div>

            <p className="workshop-modal__description">{activeWorkshop.description}</p>

            <div className="workshop-modal__section">
              <h3 className="workshop-modal__heading">What you get</h3>
              <ul className="workshop-modal__list">
                {activeWorkshop.whatYouGet.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="workshop-modal__section">
              <h3 className="workshop-modal__heading">Pricing</h3>
              <div className="workshop-modal__pricing">
                {activeWorkshop.pricing.map((price) => (
                  <div key={price.label} className="workshop-modal__price-row">
                    <div>
                      <p className="workshop-modal__price-label">{price.label}</p>
                      {price.note && (
                        <p className="workshop-modal__price-note">{price.note}</p>
                      )}
                    </div>
                    <p className="workshop-modal__price-amount">{price.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="tag-row">
              {activeWorkshop.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="workshop-modal__cta">
              <a
                href="mailto:info@3d3d.ca?subject=Workshop booking inquiry"
                className="button-link"
              >
                Book this workshop
              </a>
              <button
                type="button"
                className="button-link--ghost"
                onClick={() => setActiveWorkshopId(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
