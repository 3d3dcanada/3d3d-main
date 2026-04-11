import type { CSSProperties } from 'react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Card } from '@/components/card'
import { PageFrame } from '@/components/page-frame'
import { PhotoGallery } from '@/components/photo-gallery'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Section } from '@/components/section'
import {
  KEN_GALLERY_BUCKETS,
  KEN_LINKS,
  KEN_PROJECTS,
  MISSION_BRIEFS,
  THE_KEN_INTRO,
} from '@/data/siteContent'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'THE KEN',
  description:
    "GED. Mechanic. First time offshore, survived a Category 1 hurricane. Doesn't do things twice.",
  path: '/the-ken',
})

export default function TheKenPage() {
  return (
    <PageFrame currentPath="/the-ken">
      {/* === HERO (dark cinematic) === */}
      <Section
        accent="#AAFF2A"
        imageSrc="/media/real/open-ocean-01.jpg"
        imagePosition="center 38%"
        align="start"
        hero
      >
        <Card
          accent="#AAFF2A"
          eyebrow="THE KEN — the human"
          title="THE KEN"
          titleAs="h1"
          subtitle={THE_KEN_INTRO}
          hero
        >
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'THE KEN' }]} />
          <div className="button-row">
            <a href="#mission-briefs" className="button-link">
              Mission Briefs
            </a>
            <a href="#projects-built" className="button-link--ghost">
              Projects Built
            </a>
          </div>
        </Card>
      </Section>

      {/* === MISSION BRIEFS (light section — readable long-form) === */}
      <section
        id="mission-briefs"
        className="section--light-pink"
        style={{ padding: '5rem 0' }}
      >
        <div
          style={{
            width: 'min(100%, var(--content-max))',
            margin: '0 auto',
            padding: '0 1.5rem',
          }}
        >
          <ScrollReveal variant="scroll-in">
            <Card accent="#AAFF2A" eyebrow="Field work" title="Three mission briefs.">
              <p className="section-copy">
                Written sparse. Real dates. Real numbers. Real outcomes.
              </p>
            </Card>
          </ScrollReveal>

          <div className="brief-grid" style={{ marginTop: '2.5rem' }}>
            {MISSION_BRIEFS.map((brief, i) => (
              <ScrollReveal
                key={brief.title}
                variant="scroll-in-left"
                delay={Math.min(i + 1, 3) as 1 | 2 | 3}
              >
                <article
                  className="brief-card hover-3d"
                  style={{ '--card-accent': '#AAFF2A' } as CSSProperties}
                >
                  <p className="brief-card__kicker eyebrow">{brief.title}</p>
                  <p className="brief-card__location">{brief.location}</p>
                  <div className="brief-card__body">
                    {brief.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* === PROJECTS BUILT (dark cinematic — technical proof) === */}
      <Section
        accent="#40C4C4"
        imageSrc="/media/real/morning-dawn-deck.jpg"
        imagePosition="center"
        align="start"
      >
        <div id="projects-built" className="section-stack">
          <ScrollReveal variant="scroll-in-fade">
            <Card accent="#40C4C4" eyebrow="Projects built" title="Technical proof.">
              <p className="section-copy">
                Shipped systems — not slide decks. Every project here is either in
                production or has been delivered to a real customer.
              </p>
            </Card>
          </ScrollReveal>

          <div className="project-list">
            {KEN_PROJECTS.map((project, i) => (
              <ScrollReveal
                key={project.name}
                variant="scroll-in-float"
                delay={Math.min((i % 3) + 1, 3) as 1 | 2 | 3}
              >
                <article className="project-list__item">
                  <div className="project-list__head">
                    <div>
                      <p className="project-list__meta">{project.label}</p>
                      <h3 className="project-list__name">{project.name}</h3>
                    </div>
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-list__link"
                      >
                        Open →
                      </a>
                    ) : (
                      <span className="project-list__link">Internal</span>
                    )}
                  </div>
                  <p className="project-list__description">{project.description}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="scroll-in-pop">
            <div className="link-cloud" aria-label="Links">
              {KEN_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-chip"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* === PHOTO GALLERIES (light teal — archive) === */}
      <section className="section--light" style={{ padding: '5rem 0' }}>
        <div
          style={{
            width: 'min(100%, var(--content-max))',
            margin: '0 auto',
            padding: '0 1.5rem',
          }}
        >
          <ScrollReveal variant="scroll-in">
            <Card accent="#E84A8A" eyebrow="Photo archive" title="Real photos only.">
              <p className="section-copy">
                No stock. No AI-generated imagery. Click any thumbnail to open the
                lightbox — arrow keys to navigate, escape to close.
              </p>
            </Card>
          </ScrollReveal>

          <ScrollReveal variant="scroll-in-scale">
            <div style={{ marginTop: '2rem' }}>
              <PhotoGallery buckets={KEN_GALLERY_BUCKETS} accent="#E84A8A" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageFrame>
  )
}
