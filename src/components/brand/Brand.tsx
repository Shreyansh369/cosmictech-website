import { cn } from '@/lib/utils'

/**
 * BRAND ASSETS
 *
 * The supplied Cosmictech logo is a navy lockup: an orbital emblem above a
 * "COSMICTECH / BUILDERS" wordmark. The wordmark below is reproduced as live
 * type so it stays crisp at every size and inherits the surface's colour.
 *
 * The emblem here is a hairline geometric reduction of the supplied mark,
 * drawn in the site's own line language so it sits correctly against the
 * drawing-sheet register. The official vector emblem should replace it at
 * `public/brand/cosmictech-emblem.svg` — see content/IMAGE-MANIFEST.md.
 */

export function CosmictechEmblem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 52 40"
      // Height is always set by the caller; width follows the viewBox ratio.
      className={cn('w-auto shrink-0', className)}
      fill="none"
      stroke="currentColor"
      aria-hidden
      focusable="false"
    >
      {/* Orbital ring */}
      <ellipse
        cx="23"
        cy="21"
        rx="21"
        ry="8.2"
        transform="rotate(-19 23 21)"
        strokeWidth="1.1"
        opacity="0.75"
      />
      {/* Hub */}
      <circle cx="23" cy="21" r="12.4" strokeWidth="1.1" />
      <circle cx="23" cy="21" r="4.4" strokeWidth="1.1" />
      <circle cx="23" cy="21" r="1.5" strokeWidth="1.1" />
      {/* Radial spokes — eight, as on the supplied mark */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4
        return (
          <line
            key={i}
            x1={23 + Math.cos(a) * 4.4}
            y1={21 + Math.sin(a) * 4.4}
            x2={23 + Math.cos(a) * 12.4}
            y2={21 + Math.sin(a) * 12.4}
            strokeWidth="1.1"
          />
        )
      })}
      {/* Four-point star */}
      <path
        d="M45.5 4.2 47 8.6l4.4 1.5-4.4 1.5-1.5 4.4-1.5-4.4-4.4-1.5 4.4-1.5z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}

/**
 * Primary wordmark. `compact` drops the descender line for dense contexts
 * such as the condensed header state.
 */
export function Wordmark({
  className,
  compact = false,
  withEmblem = true,
}: {
  className?: string
  compact?: boolean
  withEmblem?: boolean
}) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      {withEmblem ? (
        <CosmictechEmblem className={cn('text-tertiary', compact ? 'h-4.5' : 'h-5.5')} />
      ) : null}

      {/* The lockup has a determinate width: the descender rule is sized, not
          flexed, so the mark never reports a wider box than it paints. */}
      <span className="flex flex-col justify-center">
        <span
          className={cn(
            'font-display leading-none font-bold whitespace-nowrap text-primary',
            compact ? 'text-[1.0625rem] tracking-[-0.012em]' : 'text-[1.1875rem] tracking-[-0.008em]',
          )}
        >
          COSMICTECH
        </span>

        {!compact ? (
          <span className="mt-[3px] hidden items-center gap-1.5 sm:flex" aria-hidden>
            <span className="h-px w-2.5 shrink-0 bg-hairline-strong" />
            <span className="font-mono text-[0.5625rem] leading-none tracking-[0.34em] whitespace-nowrap text-tertiary">
              BUILDERS
            </span>
            <span className="h-px w-2.5 shrink-0 bg-hairline-strong" />
          </span>
        ) : null}
      </span>
    </span>
  )
}

/**
 * Prognostix AI wordmark. The supplied logo pairs a heavy geometric
 * "PROGNOSTIX" with a light "AI"; that weight relationship is preserved.
 */
export function PrognostixWordmark({
  className,
  size = 'md',
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const scale =
    size === 'lg'
      ? 'text-[1.375rem] md:text-[1.75rem]'
      : size === 'sm'
        ? 'text-[0.875rem]'
        : 'text-[1.0625rem]'

  return (
    <span className={cn('font-display leading-none whitespace-nowrap', scale, className)}>
      <span className="font-bold tracking-[0.005em] text-primary">PROGNOSTIX</span>
      <span className="ml-[0.3em] font-light tracking-[0.04em] text-secondary">AI</span>
    </span>
  )
}
