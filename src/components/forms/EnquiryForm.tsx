'use client'

import { useId, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * PROJECT ENQUIRY FORM
 *
 * There is no submission endpoint in the supplied material, and a form that
 * appears to send but does not is worse than no form. So this one is wired
 * to whatever destination address is configured in `data/site.ts`:
 *
 *  - address configured → the form composes and opens a fully populated
 *    message to it. It genuinely works, with no backend.
 *  - address absent     → submission is disabled and the form says exactly
 *    what is missing, rather than silently discarding what was typed.
 *
 * Replace the null in `contactChannels` (or point `action` at a real POST
 * endpoint) and this becomes live with no other change.
 */

export interface EnquiryFormProps {
  /** Destination address. Null disables submission by design. */
  destination: string | null
  /** Subject prefix, so enquiries from different pages are distinguishable. */
  subjectPrefix: string
  /** Options for the "nature of enquiry" control. */
  enquiryTypes: string[]
  className?: string
}

export function EnquiryForm({
  destination,
  subjectPrefix,
  enquiryTypes,
  className,
}: EnquiryFormProps) {
  const uid = useId().replace(/:/g, '')
  const [sent, setSent] = useState(false)

  const field =
    'w-full border border-hairline-strong bg-transparent px-4 py-3 text-body text-primary transition-colors placeholder:text-faint hover:border-steel-400 focus-visible:border-accent focus-visible:outline-none'
  const label = 'block font-mono text-micro tracking-[0.14em] text-tertiary uppercase'

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!destination) return

    const data = new FormData(event.currentTarget)
    const get = (k: string) => String(data.get(k) ?? '').trim()

    const subject = `${subjectPrefix}: ${get('enquiryType')} — ${get('organisation') || get('name')}`
    const body = [
      `Name: ${get('name')}`,
      `Organisation: ${get('organisation')}`,
      `Email: ${get('email')}`,
      `Telephone: ${get('phone')}`,
      '',
      `Nature of enquiry: ${get('enquiryType')}`,
      `Section / yard: ${get('section')}`,
      `Railway zone or agency: ${get('zone')}`,
      `Indicative value: ${get('value')}`,
      `Required in traffic by: ${get('date')}`,
      '',
      'Details:',
      get('details'),
    ].join('\n')

    window.location.href = `mailto:${destination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)} noValidate={false}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className={label}>
            Your name <span className="text-accent">*</span>
          </label>
          <input id={`${uid}-name`} name="name" type="text" required autoComplete="name" className={cn(field, 'mt-3')} />
        </div>

        <div>
          <label htmlFor={`${uid}-org`} className={label}>
            Organisation <span className="text-accent">*</span>
          </label>
          <input
            id={`${uid}-org`}
            name="organisation"
            type="text"
            required
            autoComplete="organization"
            className={cn(field, 'mt-3')}
          />
        </div>

        <div>
          <label htmlFor={`${uid}-email`} className={label}>
            Email <span className="text-accent">*</span>
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={cn(field, 'mt-3')}
          />
        </div>

        <div>
          <label htmlFor={`${uid}-phone`} className={label}>
            Telephone
          </label>
          <input id={`${uid}-phone`} name="phone" type="tel" autoComplete="tel" className={cn(field, 'mt-3')} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-type`} className={label}>
            Nature of enquiry <span className="text-accent">*</span>
          </label>
          <select id={`${uid}-type`} name="enquiryType" required className={cn(field, 'mt-3 appearance-none')}>
            {enquiryTypes.map((t) => (
              <option key={t} value={t} className="bg-surface text-primary">
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${uid}-section`} className={label}>
            Section, yard or corridor
          </label>
          <input
            id={`${uid}-section`}
            name="section"
            type="text"
            placeholder="e.g. Jhansi – Gwalior"
            className={cn(field, 'mt-3')}
          />
        </div>

        <div>
          <label htmlFor={`${uid}-zone`} className={label}>
            Railway zone or executing agency
          </label>
          <input id={`${uid}-zone`} name="zone" type="text" placeholder="e.g. NCR / RVNL" className={cn(field, 'mt-3')} />
        </div>

        <div>
          <label htmlFor={`${uid}-value`} className={label}>
            Indicative value
          </label>
          <input id={`${uid}-value`} name="value" type="text" placeholder="₹ Cr" className={cn(field, 'mt-3')} />
        </div>

        <div>
          <label htmlFor={`${uid}-date`} className={label}>
            Required in traffic by
          </label>
          <input id={`${uid}-date`} name="date" type="text" placeholder="Month / year" className={cn(field, 'mt-3')} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-details`} className={label}>
            Details <span className="text-accent">*</span>
          </label>
          <textarea
            id={`${uid}-details`}
            name="details"
            required
            rows={6}
            placeholder="Existing arrangement, the constraint you are trying to relieve, and any programme dates already fixed."
            className={cn(field, 'mt-3 resize-y')}
          />
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          disabled={!destination}
          className={cn(
            'group inline-flex items-center gap-3 border px-7 py-3.5 font-mono text-meta tracking-[0.12em] uppercase transition-colors duration-200',
            destination
              ? 'border-accent bg-accent text-white hover:bg-signal-600'
              : 'cursor-not-allowed border-hairline-strong text-faint',
          )}
        >
          Send enquiry
          <span
            aria-hidden
            className="transition-transform duration-300 ease-[var(--ease-datum)] group-enabled:group-hover:translate-x-1"
          >
            →
          </span>
        </button>

        {!destination ? (
          <p className="max-w-[46ch] font-mono text-micro leading-relaxed text-tertiary">
            <span className="text-accent">[ INSERT CONTENT HERE ]</span> — submission is disabled
            because no destination address is configured. Set the enquiries address in{' '}
            <code className="text-secondary">src/data/site.ts</code> and this form sends
            immediately.
          </p>
        ) : null}

        <p aria-live="polite" className="font-mono text-micro text-tertiary">
          {sent ? 'Your mail client should now be open with the enquiry ready to send.' : ''}
        </p>
      </div>
    </form>
  )
}
