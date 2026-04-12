'use client'

import { useState } from 'react'
import { ContactForm } from '@/components/contact-form'

const steps = [
  {
    title: 'Where is it going?',
    body: 'Marine, restoration, field deployment, workshop, or software. The environment drives the quote.',
  },
  {
    title: 'What failed?',
    body: 'Tell me the part, material, load, exposure, and what happens if it fails again.',
  },
  {
    title: 'How fast?',
    body: 'Same-day, this week, race date, refit window, or normal production timeline.',
  },
] as const

export function MultiStepQuoteForm() {
  const [step, setStep] = useState(0)

  return (
    <div id="quote-form" className="multi-step">
      <div className="multi-step__rail">
        {steps.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className={`multi-step__dot ${index === step ? 'multi-step__dot--active' : ''}`}
            onClick={() => setStep(index)}
            aria-label={`Show step ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <article className="info-card multi-step__panel">
        <p className="info-card__meta">Step {step + 1} of {steps.length}</p>
        <h3 className="info-card__title">{steps[step].title}</h3>
        <p className="info-card__body">{steps[step].body}</p>
        <div className="button-row">
          <button type="button" className="button-link--ghost" onClick={() => setStep(Math.max(0, step - 1))}>
            Back
          </button>
          <button type="button" className="button-link" onClick={() => setStep(Math.min(steps.length - 1, step + 1))}>
            Next
          </button>
        </div>
      </article>
      <ContactForm subject="Quote Request | 3D3D" />
    </div>
  )
}
