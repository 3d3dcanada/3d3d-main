import type { CSSProperties } from 'react'
import { Card } from '@/components/card'
import { ContactForm } from '@/components/contact-form'
import { Hero } from '@/components/hero'
import { PageFrame } from '@/components/page-frame'
import { Section } from '@/components/section'
import { ACCENTS, routeSpecs } from '@/data/buildV2'
import { buildMetadata } from '@/lib/seo'

const spec = routeSpecs.contact
const paths = spec.sections[0]?.cards ?? []

export const metadata = buildMetadata({
  title: spec.title,
  description: spec.description,
  path: spec.path,
})

export default function ContactPage() {
  return (
    <PageFrame currentPath="/contact">
      <Hero {...spec.hero} />
      <section className="section--light">
        <div className="content-section__shell">
          <div className="content-section__stack">
            <Card accent={ACCENTS.teal} eyebrow="Contact paths" title="Send the right signal.">
              <p className="section-copy">
                The fastest useful email names the part, the environment, the deadline, and what happens if it fails.
              </p>
            </Card>
            <div className="info-grid">
              {paths.map((path) => (
                <article
                  key={path.title}
                  className="info-card"
                  style={{ '--card-accent': ACCENTS[path.accent ?? 'teal'] } as CSSProperties}
                >
                  <h3 className="info-card__title">{path.title}</h3>
                  <p className="info-card__body">{path.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Section accent={ACCENTS.teal} imageSrc="/media/workshop/printer-frame-shot.jpg" align="start">
        <div className="content-section__stack">
          <Card accent={ACCENTS.teal} eyebrow="Email-only intake" title="Direct inbox, consent-bound follow-up.">
            <p className="section-copy">
              The Formspree endpoint stays live, CASL consent is required, and the honeypot is included.
            </p>
          </Card>
          <ContactForm />
        </div>
      </Section>
    </PageFrame>
  )
}
