import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Actions.
 *
 * Two forms only. A solid action for the single primary move on a page, and
 * a ruled action for everything else. No third style, no icon set — the
 * arrow is the affordance, and it moves on hover because movement is the
 * subject of this business.
 */

export function Action({
  href,
  children,
  variant = 'ruled',
  className,
}: {
  href: string
  children: ReactNode
  variant?: 'solid' | 'ruled'
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-3 px-6 py-3.5 font-mono text-meta tracking-[0.12em] uppercase transition-colors duration-200',
        variant === 'solid'
          ? 'border border-accent bg-accent text-white hover:bg-signal-600'
          : 'border border-hairline-strong text-primary hover:border-accent hover:text-accent',
        className,
      )}
    >
      {children}
      <span aria-hidden className="transition-transform duration-300 ease-[var(--ease-datum)] group-hover:translate-x-1">
        →
      </span>
    </Link>
  )
}

/** An inline, rule-less action for use at the end of a passage. */
export function ArrowLink({
  href,
  children,
  className,
  tone = 'accent',
}: {
  href: string
  children: ReactNode
  className?: string
  tone?: 'accent' | 'primary'
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2.5 font-mono text-meta tracking-[0.12em] uppercase transition-colors',
        tone === 'accent' ? 'text-accent hover:text-accent-contrast' : 'text-primary hover:text-accent',
        className,
      )}
    >
      {children}
      <span aria-hidden className="transition-transform duration-300 ease-[var(--ease-datum)] group-hover:translate-x-1">
        →
      </span>
    </Link>
  )
}

/**
 * A full-width ruled row that behaves as a link.
 * The site's alternative to a card: content sits on the sheet, separated by
 * a hairline, and the whole row responds.
 */
export function RowLink({
  href,
  children,
  className,
  ariaLabel,
}: {
  href: string
  children: ReactNode
  className?: string
  ariaLabel?: string
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        'group relative block border-t border-hairline transition-colors duration-300 hover:border-hairline-strong',
        className,
      )}
    >
      {/* Datum illuminates on hover — the row becomes the live one. */}
      <span
        aria-hidden
        className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-datum)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
      {children}
    </Link>
  )
}
