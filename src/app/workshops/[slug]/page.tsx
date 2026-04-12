import type { CSSProperties } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Card } from '@/components/card'
import { Hero } from '@/components/hero'
import { PageFrame } from '@/components/page-frame'
import { ACCENTS } from '@/data/buildV2'
import { WORKSHOPS } from '@/data/workshops'
import { buildMetadata } from '@/lib/seo'

const WORKSHOP_HERO_IMAGES: Record<string, string> = {
  'intro-3d-printing': '/media/workshop/printer-action-cf.jpg',
  'cardboard-boat-regatta': '/media/real/afternoon-sail.jpg',
  'youth-stem-day': '/media/workshop/rv-lab-01.jpg',
  'library-workshop': '/media/workshop/machine-parts-flatlay.jpg',
  'festival-booth': '/media/workshop/printer-frame-shot.jpg',
  'youth-3d-printing': '/media/workshop/printer-bed-benchy.jpg',
  'seniors-tech': '/media/workshop/modular-parts-flatlay.jpg',
  'advanced-techniques': '/media/workshop/winch-cup-holder.jpg',
}

export function generateStaticParams() {
  return WORKSHOPS.map((workshop) => ({ slug: workshop.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const workshop = WORKSHOPS.find((w) => w.id === slug)
  if (!workshop) {
    return buildMetadata({
      title: 'Workshop',
      description: '3D3D workshop detail page.',
      path: `/workshops/${slug}`,
    })
  }
  return buildMetadata({
    title: workshop.title,
    description: workshop.description.slice(0, 160),
    path: `/workshops/${slug}`,
  })
}

export default async function WorkshopDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const workshop = WORKSHOPS.find((w) => w.id === slug)
  if (!workshop) notFound()

  const heroImage = WORKSHOP_HERO_IMAGES[workshop.id] ?? '/media/workshop/rv-lab-01.jpg'
  const bookingSubject = encodeURIComponent(`Workshop booking: ${workshop.title}`)

  return (
    <PageFrame currentPath="/workshops">
      <Hero
        eyebrow={`${workshop.type} · ${workshop.duration}`}
        title={workshop.title}
        subtitle={workshop.description}
        image={heroImage}
        accent="lime"
        ctas={[
          { label: 'Book this workshop', href: `mailto:info@3d3d.ca?subject=${bookingSubject}` },
          { label: 'All workshops', href: '/workshops', ghost: true },
        ]}
      />

      <section className="section--light-lime">
        <div className="content-section__shell">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Workshops', href: '/workshops' },
              { label: workshop.title },
            ]}
          />

          <div className="content-section__stack">
            <Card accent={ACCENTS.lime} eyebrow="Who it is for" title={workshop.audience}>
              <p className="section-copy">
                <strong>Capacity:</strong> {workshop.capacity}
              </p>
              <p className="section-copy">
                <strong>Duration:</strong> {workshop.duration}
              </p>
              {workshop.tags.length > 0 ? (
                <div className="tag-row" style={{ marginTop: '0.75rem' }}>
                  {workshop.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </Card>
          </div>
        </div>
      </section>

      <section className="section--light-pink">
        <div className="content-section__shell">
          <Card accent={ACCENTS.magenta} eyebrow="What you get" title="Included in every session">
            <ul className="info-card__list">
              {workshop.whatYouGet.map((item) => (
                <li key={item} className="section-copy">
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="section--light-orange">
        <div className="content-section__shell">
          <Card accent={ACCENTS.orange} eyebrow="Pricing" title="Transparent tiers">
            <div className="workshop-detail__pricing">
              {workshop.pricing.map((tier) => (
                <article
                  key={tier.label}
                  className="info-card hover-3d"
                  style={{ '--card-accent': ACCENTS.orange } as CSSProperties}
                >
                  <p className="info-card__meta">{tier.label}</p>
                  <h3 className="info-card__title">{tier.price}</h3>
                  {tier.note ? <p className="info-card__body">{tier.note}</p> : null}
                </article>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="section--light">
        <div className="content-section__shell">
          <Card accent={ACCENTS.teal} eyebrow="Ready to book?" title="Email the details.">
            <p className="section-copy">
              Send the location, preferred date window, expected attendance, and any access or
              equipment notes. I reply within one business day.
            </p>
            <div className="button-row" style={{ marginTop: '1rem' }}>
              <a
                className="button-link"
                href={`mailto:info@3d3d.ca?subject=${bookingSubject}`}
              >
                Book {workshop.title}
              </a>
              <Link className="button-link--ghost" href="/workshops">
                Back to workshops
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </PageFrame>
  )
}
