import type { CSSProperties } from 'react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Card } from '@/components/card'
import { PageFrame } from '@/components/page-frame'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Section } from '@/components/section'
import { ORA_PAGE } from '@/data/siteContent'
import { buildMetadata } from '@/lib/seo'

const FORM_ENDPOINT = 'https://formspree.io/f/mldlydbl'

export const metadata = buildMetadata({
  title: 'ORA',
  description:
    'AI intelligence, memory, and governance. Browser extension, free software initiative, and an inference API waitlist.',
  path: '/ora',
})

export default function OraPage() {
  return (
    <PageFrame currentPath="/ora">
      {/* === HERO (dark cinematic) === */}
      <Section accent="#E84A8A" align="start" hero>
        <Card
          accent="#E84A8A"
          eyebrow="ORA — the AI division"
          title="ORA"
          titleAs="h1"
          subtitle={ORA_PAGE.intro}
          hero
        >
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'ORA' }]} />
          <div className="button-row">
            <a href="#ora-waitlist" className="button-link">
              Join Waitlist
            </a>
            <a
              href="https://github.com/3d3dcanada/ora"
              target="_blank"
              rel="noopener noreferrer"
              className="button-link--ghost"
            >
              Open Source
            </a>
          </div>
        </Card>
      </Section>

      {/* === BROWSER EXTENSION (light section) === */}
      <section className="section--light" style={{ padding: '5rem 0' }}>
        <div style={{ width: 'min(100%, var(--content-max))', margin: '0 auto', padding: '0 1.5rem' }}>
          <ScrollReveal variant="scroll-in">
            <Card
              accent="#E84A8A"
              eyebrow="Flagship product"
              title={ORA_PAGE.browserExtension.title}
            >
              {ORA_PAGE.browserExtension.paragraphs.map((paragraph) => (
                <p key={paragraph} className="section-copy">
                  {paragraph}
                </p>
              ))}
            </Card>
          </ScrollReveal>

          <ScrollReveal variant="scroll-in-pop" delay={2}>
            <div className="pricing-grid" style={{ marginTop: '2rem' }}>
              <div className="price-card hover-3d" style={{ '--card-accent': '#E84A8A' } as CSSProperties}>
                <p className="price-card__label">Pricing</p>
                <p className="price-card__amount">$159 USD</p>
                <p className="price-card__note">One-time. Private, portable, local-first, and model-agnostic.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* === FREE SOFTWARE INITIATIVE (light pink section) === */}
      <section className="section--light-pink" style={{ padding: '5rem 0' }}>
        <div style={{ width: 'min(100%, var(--content-max))', margin: '0 auto', padding: '0 1.5rem' }}>
          <ScrollReveal variant="scroll-in-left">
            <Card
              accent="#AAFF2A"
              eyebrow="Monthly build"
              title={ORA_PAGE.freeSoftwareInitiative.title}
            >
              {ORA_PAGE.freeSoftwareInitiative.paragraphs.map((paragraph) => (
                <p key={paragraph} className="section-copy">
                  {paragraph}
                </p>
              ))}
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* === INFERENCE API + WAITLIST (dark cinematic) === */}
      <Section accent="#FF6B2B" imageSrc="/media/real/night-dock.jpg" imagePosition="center" align="start">
        <div className="section-stack">
          <ScrollReveal variant="scroll-in">
            <Card accent="#FF6B2B" eyebrow="Developer lane" title={ORA_PAGE.inferenceApi.title}>
              {ORA_PAGE.inferenceApi.paragraphs.map((paragraph) => (
                <p key={paragraph} className="section-copy">
                  {paragraph}
                </p>
              ))}
            </Card>
          </ScrollReveal>

          <ScrollReveal variant="scroll-in-scale">
            <form
              id="ora-waitlist"
              action={FORM_ENDPOINT}
              method="POST"
              className="form-shell"
              style={{ '--card-accent': '#FF6B2B' } as CSSProperties}
            >
              <input type="hidden" name="_subject" value="ORA Waitlist | 3D3D" />
              <input type="hidden" name="source" value="ora-page-waitlist" />

              <p className="eyebrow">Waitlist</p>
              <h2 className="section-title">Get early access.</h2>
              <p className="form-note">
                This waitlist routes into the existing 3D3D inbox while the developer product is being staged.
              </p>

              <div className="form-grid form-grid--two">
                <label className="form-field">
                  <span className="form-field__label">Name</span>
                  <input type="text" name="name" placeholder="Your name" required />
                </label>
                <label className="form-field">
                  <span className="form-field__label">Email</span>
                  <input type="email" name="email" placeholder="you@example.com" required />
                </label>
              </div>

              <div className="form-grid form-grid--two">
                <label className="form-field">
                  <span className="form-field__label">Current stack</span>
                  <input type="text" name="stack" placeholder="Claude, OpenAI, Ollama, MCP" />
                </label>
                <label className="form-field">
                  <span className="form-field__label">Use case</span>
                  <input type="text" name="use_case" placeholder="Agents, memory, local deployment" />
                </label>
              </div>

              <label className="form-field">
                <span className="form-field__label">What are you building?</span>
                <textarea name="message" rows={5} placeholder="Persistent memory, model switching, local deployment, or another agent workflow." />
              </label>

              <div className="form-consent">
                <input type="checkbox" id="casl-ora" name="casl_consent" value="yes" required />
                <label htmlFor="casl-ora">
                  I consent to receiving messages from 3D3D regarding this inquiry.
                </label>
              </div>

              <div className="button-row">
                <button type="submit" className="button-link">
                  Join Waitlist
                </button>
                <a
                  href="https://github.com/3d3dcanada/ora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-link--ghost"
                >
                  View GitHub
                </a>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </Section>
    </PageFrame>
  )
}
