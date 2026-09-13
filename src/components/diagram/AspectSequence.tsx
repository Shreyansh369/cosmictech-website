'use client'

import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/lib/media'
import { cn } from '@/lib/utils'

/**
 * ASPECT SEQUENCE
 *
 * Four signals behind an occupied section, showing the aspect each one
 * displays. It is the clearest single illustration of what automatic
 * signalling does, and it is the hero's only moving element.
 *
 * The aspects are correct, not decorative: the signal protecting the
 * occupied section shows red; the one behind it yellow; the one behind that
 * double yellow; the one behind that green. As the occupancy advances, the
 * whole sequence steps forward with it.
 */

const ASPECTS = [
  { id: 'R', label: 'Red', meaning: 'Stop' },
  { id: 'Y', label: 'Yellow', meaning: 'Pass at caution — next signal at danger' },
  { id: 'YY', label: 'Double yellow', meaning: 'Attention — next signal at caution' },
  { id: 'G', label: 'Green', meaning: 'Clear' },
] as const

const SIGNALS = 5
const STEPS = SIGNALS + 3

export function AspectSequence({ className }: { className?: string }) {
  const [step, setStep] = useState(3)
  const reducedMotion = usePrefersReducedMotion()
  const animate = !reducedMotion

  useEffect(() => {
    if (reducedMotion) return
    const id = window.setInterval(() => setStep((s) => (s + 1) % STEPS), 2200)
    return () => window.clearInterval(id)
  }, [reducedMotion])

  /** The occupied section index; signals at a lower index are behind it. */
  const occupied = step

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-baseline justify-between gap-6 border-t border-hairline pt-3.5">
        <span className="font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
          Aspect sequence behind an occupied section
        </span>
        <span
          className={cn(
            'font-mono text-micro tracking-[0.14em] uppercase',
            animate ? 'text-accent' : 'text-faint',
          )}
        >
          {animate ? 'Live' : 'Static'}
        </span>
      </div>

      <div className="mt-6 flex items-end gap-0">
        {Array.from({ length: SIGNALS }).map((_, i) => {
          // Distance in sections between this signal and the occupancy.
          const gap = occupied - i
          const aspect =
            gap <= 0 ? ASPECTS[3] : gap === 1 ? ASPECTS[0] : gap === 2 ? ASPECTS[1] : gap === 3 ? ASPECTS[2] : ASPECTS[3]
          const lamp =
            aspect.id === 'R'
              ? 'border-aspect-red bg-aspect-red'
              : aspect.id === 'G'
                ? 'border-aspect-green bg-aspect-green'
                : 'border-aspect-yellow bg-aspect-yellow'
          const isRed = aspect.id === 'R'

          return (
            <div
              key={i}
              className={cn(
                'flex min-w-0 flex-1 flex-col items-start',
                // Four sections read the sequence just as well on a phone.
                i === SIGNALS - 1 && 'hidden sm:flex',
              )}
            >
              {/* Mast */}
              <div className="relative flex h-16 items-end sm:h-20">
                <span aria-hidden className="ml-[5px] h-full w-px bg-steel-600" />
                <span
                  aria-hidden
                  className={cn(
                    'absolute top-0 left-0 block h-2.5 w-2.5 rounded-full border transition-colors duration-500 ease-[var(--ease-state)]',
                    lamp,
                  )}
                />
                {aspect.id === 'YY' ? (
                  <span
                    aria-hidden
                    className="absolute top-4 left-0 block h-2.5 w-2.5 rounded-full border border-aspect-yellow bg-aspect-yellow"
                  />
                ) : null}
              </div>

              {/* Datum + section */}
              <div className="relative flex h-4 w-full items-center">
                <span
                  aria-hidden
                  className={cn(
                    'h-px w-full transition-colors duration-500',
                    gap === 0 ? 'bg-accent' : 'bg-hairline-strong',
                  )}
                />
                {gap === 0 ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-accent"
                  />
                ) : null}
              </div>

              <span
                className={cn(
                  'mt-2.5 font-mono text-micro tracking-[0.1em] uppercase transition-colors duration-500',
                  gap === 0 ? 'text-accent' : isRed ? 'text-aspect-red' : 'text-tertiary',
                )}
              >
                {gap === 0 ? 'Occupied' : aspect.id}
              </span>
              <span className="mt-1 hidden font-mono text-micro tracking-[0.06em] text-faint sm:block">
                {gap === 0 ? 'Train in section' : aspect.label}
              </span>
            </div>
          )
        })}
      </div>

      <p className="sr-only">
        A train occupies section {occupied + 1}. The signal protecting it displays red; the signal
        behind that displays yellow; the signal behind that displays double yellow; signals further
        back display green. As the train advances, the sequence advances with it.
      </p>
    </div>
  )
}
