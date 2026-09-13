import type { ReactNode } from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { cn } from '@/lib/utils'

/**
 * Instrument readouts.
 *
 * Figures are presented the way an instrument presents them: the value large
 * and in display type, the quantity it measures stated plainly beneath, and
 * any qualifier that must travel with it kept attached. Two different
 * metrics never share a caption.
 */

export function MetricBlock({
  value,
  label,
  qualifier,
  className,
  size = 'md',
  delay = 0,
}: {
  value: string
  label: string
  qualifier?: string
  className?: string
  size?: 'md' | 'lg'
  delay?: number
}) {
  return (
    <Reveal delay={delay} className={cn('border-t border-hairline-strong pt-5', className)}>
      <p
        className={cn(
          'tabular font-display leading-none font-semibold tracking-[-0.03em] text-primary',
          size === 'lg' ? 'text-h1' : 'text-h2',
        )}
      >
        {value}
      </p>
      <p className="mt-3.5 max-w-[26ch] text-small leading-snug text-secondary">{label}</p>
      {qualifier ? (
        <p className="mt-2.5 max-w-[30ch] font-mono text-micro leading-relaxed text-faint">
          {qualifier}
        </p>
      ) : null}
    </Reveal>
  )
}

export function MetricRow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {children}
    </div>
  )
}

/**
 * Project status indicator.
 *
 * Signal-aspect semantics: a work under progress is the live state and takes
 * the accent; a completed work is settled and takes the neutral. This is the
 * only place colour carries meaning on its own — so the shape and the label
 * carry it too, for anyone who cannot use the colour.
 */
export function StatusIndicator({
  status,
  label,
  className,
}: {
  status: 'completed' | 'in-progress'
  label: string
  className?: string
}) {
  const live = status === 'in-progress'
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        aria-hidden
        className={cn(
          'relative block h-2 w-2 shrink-0 border',
          live ? 'border-accent bg-accent ct-aspect-live' : 'border-steel-400 bg-transparent',
        )}
      />
      <span
        className={cn(
          'font-mono text-micro tracking-[0.12em] whitespace-nowrap uppercase',
          live ? 'text-accent' : 'text-tertiary',
        )}
      >
        {label}
      </span>
    </span>
  )
}

/** A labelled specification pair, used in dense technical contexts. */
export function SpecPair({
  label,
  children,
  className,
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('border-t border-hairline py-3.5', className)}>
      <dt className="font-mono text-micro tracking-[0.14em] text-tertiary uppercase">{label}</dt>
      <dd className="mt-1.5 text-small text-primary">{children}</dd>
    </div>
  )
}
