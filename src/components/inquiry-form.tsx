'use client'

import { type FormEvent, type ReactNode, useState } from 'react'
import { CONTACT_EMAIL, FORMSPREE_ENDPOINT } from '@/data/buildV2'

export interface InquiryFormFieldOption {
  value: string
  label: string
}

export interface InquiryFormField {
  name: string
  label: string
  type: 'text' | 'email' | 'select' | 'textarea' | 'tel'
  required?: boolean
  placeholder?: string
  options?: InquiryFormFieldOption[]
  autoComplete?: string
  rows?: number
}

interface InquiryFormProps {
  id: string
  subject: string
  accent?: 'teal' | 'magenta' | 'orange' | 'lime'
  intro?: string
  submitLabel?: string
  successMessage?: string
  fields: InquiryFormField[]
  extraChildren?: ReactNode
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export function InquiryForm({
  id,
  subject,
  intro,
  submitLabel = 'Send inquiry',
  successMessage,
  fields,
  extraChildren,
}: InquiryFormProps) {
  const [state, setState] = useState<Record<string, string>>({})
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<SubmitState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const update = (name: string, value: string) => setState((prev) => ({ ...prev, [name]: value }))

  const allRequiredFilled = () =>
    fields.every((f) => !f.required || Boolean(state[f.name]?.trim())) && consent

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!allRequiredFilled()) return

    setStatus('submitting')
    setErrorMsg('')

    try {
      const formData = new FormData()
      formData.append('_subject', subject)
      Object.entries(state).forEach(([k, v]) => v && formData.append(k, v))
      formData.append('casl_consent', 'yes')

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
      <article id={id} className="info-card inquiry-form__success">
        <p className="info-card__meta">Received</p>
        <h3 className="info-card__title">Thanks. I will reply within one business day.</h3>
        <p className="info-card__body">
          {successMessage ??
            `The inquiry is in my inbox. If it is urgent, email ${CONTACT_EMAIL} and put the subject in the title.`}
        </p>
      </article>
    )
  }

  return (
    <form id={id} className="form-shell inquiry-form" onSubmit={handleSubmit}>
      {/* Honeypot */}
      <div className="form-field form-field--hidden" aria-hidden="true">
        <label htmlFor={`${id}-gotcha`}>Leave blank</label>
        <input id={`${id}-gotcha`} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      {intro ? <p className="form-note">{intro}</p> : null}

      {fields.map((field) => (
        <label key={field.name} className="form-field">
          <span className="form-field__label">{field.label}</span>
          {field.type === 'textarea' ? (
            <textarea
              name={field.name}
              rows={field.rows ?? 4}
              placeholder={field.placeholder}
              value={state[field.name] ?? ''}
              onChange={(e) => update(field.name, e.target.value)}
              required={field.required}
            />
          ) : field.type === 'select' ? (
            <select
              name={field.name}
              value={state[field.name] ?? ''}
              onChange={(e) => update(field.name, e.target.value)}
              required={field.required}
            >
              <option value="" disabled>
                Choose one
              </option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              value={state[field.name] ?? ''}
              onChange={(e) => update(field.name, e.target.value)}
              required={field.required}
            />
          )}
        </label>
      ))}

      {extraChildren}

      <label className="form-consent">
        <input
          type="checkbox"
          name="casl_consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
        />
        <span>
          I consent to 3D3D contacting me about this request. I can withdraw by emailing{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. See <a href="/casl">CASL</a> and{' '}
          <a href="/privacy">privacy</a>.
        </span>
      </label>

      {status === 'error' ? (
        <p className="form-field__hint form-field__hint--error">
          Submission failed: {errorMsg}. Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>{' '}
          directly.
        </p>
      ) : null}

      <button type="submit" className="button-link" disabled={!allRequiredFilled() || status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : submitLabel}
      </button>
    </form>
  )
}
