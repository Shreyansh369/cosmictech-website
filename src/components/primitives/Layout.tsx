import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type Surface = 'graphite' | 'paper' | 'navy'

/** Horizontal well. Every page-level block sits inside one of these. */
export function Container({
  children,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  as?: ElementType
}) {
  return <Tag className={cn('ct-container', className)}>{children}</Tag>
}

/**
 * A page band. Declaring a surface re-resolves every semantic colour token
 * inside it, which is how the site changes register without changing
 * language. Bands are separated by a hairline datum, never by a shadow.
 */
export function Section({
  children,
  surface,
  className,
  id,
  as: Tag = 'section',
  bleed = false,
  divide = true,
  labelledBy,
}: {
  children: ReactNode
  surface?: Surface
  className?: string
  id?: string
  as?: ElementType
  /** Suppress the container; the child manages its own width. */
  bleed?: boolean
  /** Draw the top datum rule. */
  divide?: boolean
  labelledBy?: string
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      data-surface={surface}
      className={cn(
        surface && 'bg-surface text-primary',
        divide && 'border-t border-hairline',
        className,
      )}
    >
      {bleed ? children : <Container>{children}</Container>}
    </Tag>
  )
}

/** Standard vertical rhythm for a band's contents. */
export function Band({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('py-20 md:py-28 xl:py-36', className)}>{children}</div>
}

/** Narrow well for sustained reading. */
export function Measure({
  children,
  className,
  tight = false,
}: {
  children: ReactNode
  className?: string
  tight?: boolean
}) {
  return <div className={cn(tight ? 'ct-measure-tight' : 'ct-measure', className)}>{children}</div>
}
