'use client'

import { type FormEvent, useState } from 'react'
import { CONTACT_EMAIL, FORMSPREE_ENDPOINT } from '@/data/buildV2'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

interface QuoteFormState {
  environment: string
  envDescription: string
  failureMode: string
  file: File | null
  timeline: string
  timelineNotes: string
  name: string
  email: string
  organization: string
  caslConsent: boolean
}

const INITIAL_STATE: QuoteFormState = {
  environment: '',
  envDescription: '',
  failureMode: '',
  file: null,
  timeline: '',
  timelineNotes: '',
  name: '',
  email: '',
  organization: '',
  caslConsent: false,
}

const STEPS = [
  { label: 'Environment', sub: 'Where will the part live?' },
  { label: 'Failure mode', sub: 'What broke, or what needs to exist?' },
  { label: 'Timeline', sub: 'When does it have to be installed?' },
  { label: 'Contact', sub: 'Name, email, and CASL consent.' },
] as const

const ENVIRONMENT_OPTIONS = [
  { value: 'marine', label: 'Marine — saltwater, UV, vibration' },
  { value: 'automotive', label: 'Automotive / restoration' },
  { value: 'industrial', label: 'Industrial / high load or heat' },
  { value: 'indoor', label: 'Indoor / standard conditions' },
  { value: 'field', label: 'Field deployment — remote / offshore' },
  { value: 'other', label: 'Other — tell me more' },
]

const TIMELINE_OPTIONS = [
  { value: 'same-day', label: 'Same day / next day — emergency' },
  { value: 'this-week', label: 'This week' },
  { value: '2-4-weeks', label: '2–4 weeks' },
  { value: 'race-date', label: 'Tied to a race or event date' },
  { value: 'standard', label: 'Standard production queue' },
]

export function MultiStepQuoteForm() {
  const [step, setStep] = useState(0)
  const [state, setState] = useState<QuoteFormState>(INITIAL_STATE)
  const [status, setStatus] = useState<SubmitState>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')

  const totalSteps = STEPS.length

  const update = <K extends keyof QuoteFormState>(key: K, value: QuoteFormState[K]) =>
    setState((prev) => ({ ...prev, [key]: value }))

  const canAdvance = (): boolean => {
    if (step === 0) return Boolean(state.environment && state.envDescription.trim().length >= 3)
    if (step === 1) return state.failureMode.trim().length >= 10
    if (step === 2) return Boolean(state.timeline)
    if (step === 3) {
      return (
        state.name.trim().length >= 2 &&
        /^\S+@\S+\.\S+$/.test(state.email) &&
        state.caslConsent
      )
    }
    return false
  }

  const next = () => {
    if (canAdvance() && step < totalSteps - 1) setStep(step + 1)
  }

  const prev = () => {
    if (step > 0) setStep(step - 1)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canAdvance()) return
    setStatus('submitting')
    setErrorMsg('')

    try {
      const formData = new FormData()
      formData.append('_subject', `Quote Request | ${state.environment} | 3D3D`)
      formData.append('environment', state.environment)
      formData.append('env_description', state.envDescription)
      formData.append('failure_mode', state.failureMode)
      formData.append('timeline', state.timeline)
      formData.append('timeline_notes', state.timelineNotes)
      formData.append('name', state.name)
      formData.append('email', state.email)
      formData.append('organization', state.organization)
      formData.append('casl_consent', 'yes')
      if (state.file) formData.append('file', state.file)

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })

      if (response.ok) {
        setStatus('success')
      } else {
        const body = await response.json().catch(() => ({}))
        setErrorMsg(body?.error ?? `Formspree returned ${response.status}`)
        setStatus('error')
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Network error')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div id="quote-form" className="multi-step multi-step--success">
        <article className="info-card">
          <p className="info-card__meta">Received</p>
          <h3 className="info-card__title">Thanks. I will reply within one business day.</h3>
          <p className="info-card__body">
            The quote details are in my inbox. If it is urgent, email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and put the environment in the
            subject line.
          </p>
          <button
            type="button"
            className="button-link--ghost"
            onClick={() => {
              setState(INITIAL_STATE)
              setStep(0)
              setStatus('idle')
            }}
          >
            Start another quote
          </button>
        </article>
      </div>
    )
  }

  return (
    <form id="quote-form" className="multi-step" onSubmit={handleSubmit} encType="multipart/form-data">
      {/* Honeypot */}
      <div className="form-field form-field--hidden" aria-hidden="true">
        <label htmlFor="quote-gotcha">Leave blank</label>
        <input id="quote-gotcha" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="multi-step__rail" role="tablist" aria-label="Quote steps">
        {STEPS.map((item, index) => {
          const isDone = index < step
          const isActive = index === step
          return (
            <button
              key={item.label}
              type="button"
              className={`multi-step__dot ${isActive ? 'multi-step__dot--active' : ''} ${
                isDone ? 'multi-step__dot--done' : ''
              }`}
              onClick={() => setStep(index)}
              aria-current={isActive ? 'step' : undefined}
              aria-label={`Step ${index + 1}: ${item.label}`}
            >
              <span className="multi-step__dot-number">{index + 1}</span>
              <span className="multi-step__dot-label">{item.label}</span>
            </button>
          )
        })}
      </div>

      <article className="info-card multi-step__panel">
        <p className="info-card__meta">
          Step {step + 1} of {totalSteps}
        </p>
        <h3 className="info-card__title">{STEPS[step].label}</h3>
        <p className="info-card__body">{STEPS[step].sub}</p>

        {step === 0 ? (
          <div className="multi-step__fields">
            <fieldset className="form-field">
              <legend className="form-field__label">Environment</legend>
              <div className="form-radio-group">
                {ENVIRONMENT_OPTIONS.map((opt) => (
                  <label key={opt.value} className="form-radio">
                    <input
                      type="radio"
                      name="environment"
                      value={opt.value}
                      checked={state.environment === opt.value}
                      onChange={(e) => update('environment', e.target.value)}
                      required
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="form-field">
              <span className="form-field__label">Describe the use case</span>
              <textarea
                name="env_description"
                rows={3}
                value={state.envDescription}
                onChange={(e) => update('envDescription', e.target.value)}
                placeholder="e.g. spinnaker block on a 40ft racing yacht, exposed to saltwater spray and UV"
                required
              />
            </label>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="multi-step__fields">
            <label className="form-field">
              <span className="form-field__label">What failed (or what has to exist)?</span>
              <textarea
                name="failure_mode"
                rows={5}
                value={state.failureMode}
                onChange={(e) => update('failureMode', e.target.value)}
                placeholder="Describe the part, material, load, exposure, and what breaking costs."
                required
              />
            </label>
            <label className="form-field">
              <span className="form-field__label">Attach a photo or file (optional)</span>
              <input
                name="file"
                type="file"
                accept=".jpg,.jpeg,.png,.pdf,.stl,.step,.3mf"
                onChange={(e) => update('file', e.target.files?.[0] ?? null)}
              />
              {state.file ? (
                <span className="form-field__hint">Attached: {state.file.name}</span>
              ) : null}
            </label>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="multi-step__fields">
            <fieldset className="form-field">
              <legend className="form-field__label">When does it have to be installed?</legend>
              <div className="form-radio-group">
                {TIMELINE_OPTIONS.map((opt) => (
                  <label key={opt.value} className="form-radio">
                    <input
                      type="radio"
                      name="timeline"
                      value={opt.value}
                      checked={state.timeline === opt.value}
                      onChange={(e) => update('timeline', e.target.value)}
                      required
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="form-field">
              <span className="form-field__label">Timeline notes (optional)</span>
              <input
                type="text"
                name="timeline_notes"
                value={state.timelineNotes}
                onChange={(e) => update('timelineNotes', e.target.value)}
                placeholder="e.g. must ship by Fri for Sunday race"
              />
            </label>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="multi-step__fields">
            <div className="form-grid form-grid--two">
              <label className="form-field">
                <span className="form-field__label">Name</span>
                <input
                  name="name"
                  value={state.name}
                  onChange={(e) => update('name', e.target.value)}
                  autoComplete="name"
                  required
                />
              </label>
              <label className="form-field">
                <span className="form-field__label">Email</span>
                <input
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={(e) => update('email', e.target.value)}
                  autoComplete="email"
                  required
                />
              </label>
            </div>
            <label className="form-field">
              <span className="form-field__label">Organization (optional)</span>
              <input
                type="text"
                name="organization"
                value={state.organization}
                onChange={(e) => update('organization', e.target.value)}
                autoComplete="organization"
                placeholder="Boat, team, shop, company"
              />
            </label>

            {/* Summary before submit */}
            <div className="multi-step__summary">
              <p className="info-card__meta">Review</p>
              <dl>
                <div>
                  <dt>Environment</dt>
                  <dd>
                    {state.environment || '—'}
                    {state.envDescription ? <span> · {state.envDescription}</span> : null}
                  </dd>
                </div>
                <div>
                  <dt>Failure mode</dt>
                  <dd>{state.failureMode || '—'}</dd>
                </div>
                <div>
                  <dt>Timeline</dt>
                  <dd>
                    {state.timeline || '—'}
                    {state.timelineNotes ? <span> · {state.timelineNotes}</span> : null}
                  </dd>
                </div>
                {state.file ? (
                  <div>
                    <dt>Attached</dt>
                    <dd>{state.file.name}</dd>
                  </div>
                ) : null}
              </dl>
            </div>

            <label className="form-consent">
              <input
                type="checkbox"
                name="casl_consent"
                checked={state.caslConsent}
                onChange={(e) => update('caslConsent', e.target.checked)}
                required
              />
              <span>
                I consent to 3D3D contacting me about this request. I can withdraw by emailing{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. See{' '}
                <a href="/casl">CASL</a> and <a href="/privacy">privacy</a>.
              </span>
            </label>

            {status === 'error' ? (
              <p className="form-field__hint form-field__hint--error">
                Submission failed: {errorMsg}. Email{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> directly.
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="button-row" style={{ marginTop: '1.25rem' }}>
          {step > 0 ? (
            <button type="button" className="button-link--ghost" onClick={prev}>
              Back
            </button>
          ) : null}
          {step < totalSteps - 1 ? (
            <button
              type="button"
              className="button-link"
              onClick={next}
              disabled={!canAdvance()}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="button-link"
              disabled={!canAdvance() || status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending…' : 'Send quote request'}
            </button>
          )}
        </div>
      </article>
    </form>
  )
}
