import type { CSSProperties } from 'react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Card } from '@/components/card'
import { PageFrame } from '@/components/page-frame'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Section } from '@/components/section'
import { STRX_PAGE } from '@/data/siteContent'
import { buildMetadata } from '@/lib/seo'

const FORM_ENDPOINT = 'https://formspree.io/f/mldlydbl'

export const metadata = buildMetadata({
  title: 'STRX',
  description:
    'STRX. Stabilization · Tactical · Resource · eXecution. 1–5 operators deployable within 24–72 hours of activation.',
  path: '/strx',
})

export default function StrxPage() {
  return (
    <PageFrame currentPath="/strx">
      <Section
        accent="#FF6B2B"
        imageSrc="/media/real/race-morning-crew.jpg"
        imagePosition="center"
        align="start"
        hero
      >
        <Card
          accent="#FF6B2B"
          eyebrow="STRX — field operations"
          title="STRX"
          titleAs="h1"
          subtitle={STRX_PAGE.intro}
          hero
        >
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'STRX' }]} />
          <p className="section-copy">{STRX_PAGE.supporting}</p>
          <div className="button-row">
            <a href="#deployment-inquiry" className="button-link">
              Deployment Inquiry
            </a>
            <a href="/the-ken" className="button-link--ghost">
              Mission Briefs
            </a>
          </div>
        </Card>
      </Section>

      <Section accent="#FF6B2B" imageSrc="/media/real/fleet-start-press.jpg" imagePosition="center" align="start">
        <ScrollReveal variant="scroll-in">
        <div className="section-stack">
          <Card accent="#FF6B2B" eyebrow="Service modes" title="Six ways STRX shows up.">
            <div className="section-list">
              {STRX_PAGE.serviceModes.map((mode) => (
                <div
                  key={mode.title}
                  className="section-list__item"
                  style={{ '--card-accent': '#FF6B2B' } as CSSProperties}
                >
                  <h3 className="section-list__title">{mode.title}</h3>
                  <p className="section-list__body">{mode.body}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
        </ScrollReveal>
      </Section>

      <section className="section--light" style={{ padding: '5rem 0' }}>
        <div style={{ width: 'min(100%, var(--content-max))', margin: '0 auto', padding: '0 1.5rem' }}>
        <ScrollReveal variant="scroll-in-fade">
          <Card accent="#E84A8A" eyebrow="Pricing" title="Transparent, no surprises." />
        </ScrollReveal>
          <div className="pricing-grid" style={{ marginTop: '1.5rem' }}>
            {STRX_PAGE.pricing.map((price, i) => (
              <ScrollReveal key={price.label} variant="scroll-in-float" delay={(i + 1) as 1 | 2 | 3}>
              <div
                className="price-card hover-3d"
                style={{ '--card-accent': '#E84A8A' } as CSSProperties}
              >
                <p className="price-card__label">{price.label}</p>
                <p className="price-card__amount">{price.amount}</p>
                <p className="price-card__note">{price.note}</p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Section
        accent="#FF6B2B"
        imageSrc="/media/real/marina-night-01.jpg"
        imagePosition="center"
        align="start"
      >
        <ScrollReveal variant="scroll-in-scale">
        <form
          id="deployment-inquiry"
          action={FORM_ENDPOINT}
          method="POST"
          className="form-shell"
          style={{ '--card-accent': '#FF6B2B' } as CSSProperties}
        >
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }} aria-hidden="true" />
          <input type="hidden" name="_subject" value="STRX Deployment Inquiry | 3D3D" />
          <input type="hidden" name="source" value="strx-page-deployment-inquiry" />

          <p className="eyebrow">Deployment inquiry</p>
          <h2 className="section-title">When normal work has already failed.</h2>
          <p className="form-note">Tell us where the operation is, what broke, and how fast you need movement.</p>

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
              <span className="form-field__label">Organization</span>
              <input type="text" name="organization" placeholder="Race team, vessel, company" />
            </label>
            <label className="form-field">
              <span className="form-field__label">Location</span>
              <input type="text" name="location" placeholder="Port, city, region" required />
            </label>
          </div>

          <div className="form-grid form-grid--two">
            <label className="form-field">
              <span className="form-field__label">Timeline</span>
              <input type="text" name="timeline" placeholder="24 hours, 72 hours, this week" />
            </label>
            <label className="form-field">
              <span className="form-field__label">Service mode</span>
              <select name="service_mode" defaultValue="Field operations & deployment">
                {STRX_PAGE.serviceModes.map((mode) => (
                  <option key={mode.title}>{mode.title}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="form-field">
            <span className="form-field__label">Situation summary</span>
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Crew loss, logistics collapse, technical failure, procurement issue, or another situation."
            />
          </label>

          <div className="form-consent">
            <input type="checkbox" id="casl-strx" name="casl_consent" value="yes" required />
            <label htmlFor="casl-strx">
              I consent to receiving messages from 3D3D regarding this inquiry.
            </label>
          </div>

          <div className="button-row">
            <button type="submit" className="button-link">
              Send Inquiry
            </button>
            <a href="/the-ken" className="button-link--ghost">
              Read the record
            </a>
          </div>
        </form>
        </ScrollReveal>
      </Section>
    </PageFrame>
  )
}
