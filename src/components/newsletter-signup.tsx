'use client'

import { type FormEvent, useState } from 'react'
import { FORMSPREE_ENDPOINT } from '@/data/buildV2'

type State = 'idle' | 'submitting' | 'success' | 'error'

interface NewsletterSignupProps {
  variant?: 'footer' | 'card'
  source?: string
}

/**
 * Newsletter signup. Posts to the Formspree endpoint with a
 * "Newsletter signup" subject until a Beehiiv API key is added.
 * Swap the fetch URL for Beehiiv later without touching the UI.
 */
export function NewsletterSignup({ variant = 'footer', source = 'site' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error')
      setErrorMsg('Enter a valid email address.')
      return
    }
    setStatus('submitting')
    setErrorMsg('')

    try {
      const formData = new FormData()
      formData.append('_subject', `Newsletter signup | 3D3D (${source})`)
      formData.append('email', email)
      formData.append('source', source)
      formData.append('interest', 'newsletter')

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })

      if (response.ok) {
        setStatus('success')
      } else {
        const body = await response.json().catch(() => ({}))
        setErrorMsg(body?.error ?? `Signup failed (${response.status}).`)
        setStatus('error')
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Network error')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`newsletter-signup newsletter-signup--${variant} newsletter-signup--success`}>
        <p className="newsletter-signup__message">
          You are on the list. First field report lands when the work warrants it, not before.
        </p>
      </div>
    )
  }

  return (
    <form
      className={`newsletter-signup newsletter-signup--${variant}`}
      onSubmit={handleSubmit}
      aria-label="Newsletter signup"
    >
      <div className="newsletter-signup__field-row">
        <label className="newsletter-signup__field">
          <span className="newsletter-signup__label">
            {variant === 'card' ? 'Field reports and campaign updates' : 'Newsletter'}
          </span>
          <input
            type="email"
            name="email"
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <button
          type="submit"
          className="button-link newsletter-signup__submit"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending…' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' ? (
        <p className="newsletter-signup__error">{errorMsg}</p>
      ) : (
        <p className="newsletter-signup__hint">
          Low-frequency. Real field notes. Unsubscribe any time.
        </p>
      )}
    </form>
  )
}
