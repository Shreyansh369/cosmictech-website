import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'

/**
 * Drawing-sheet index label: `03 / CAPABILITIES`.
 * The recurring device that gives the site its register. Mono, tracked,
 * always paired with a hairline.
 */
export function IndexLabel({
  index,
  label,
  className,
  tone = 'default',
}: {
  index?: string
  label: string
  className?: string
  tone?: 'default' | 'accent'
}) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline gap-2.5 font-mono text-meta tracking-[0.14em] uppercase',
        tone === 'accent' ? 'text-accent' : 'text-tertiary',
        className,
      )}
    >
      {index ? (
        <>
          <span className={tone === 'accent' ? 'text-accent' : 'text-faint'}>{index}</span>
          <span aria-hidden className="text-faint">
            /
          </span>
        </>
      ) : null}
      <span>{label}</span>
    </span>
  )
}

/**
 * The standard section opening: datum rule, index label, heading, lede.
 * Used on every page so that sections are recognisable as the same object.
 */
export function SectionHead({
  index,
  label,
  title,
  lede,
  id,
  level = 2,
  className,
  align = 'start',
}: {
  index?: string
  label: string
  title: ReactNode
  lede?: ReactNode
  id?: string
  level?: 1 | 2 | 3
  className?: string
  align?: 'start' | 'split'
}) {
  const Heading = (`h${level}` as ElementType)
  const size =
    level === 1 ? 'text-h1' : level === 2 ? 'text-h2' : 'text-h3'

  return (
    <header className={cn('relative', className)}>
      <Reveal as="datum">
        <div className="h-px w-full bg-hairline-strong" />
      </Reveal>

      <div
        className={cn(
          'pt-5',
          align === 'split' &&
            'md:grid md:grid-cols-12 md:gap-x-8 lg:gap-x-12',
        )}
      >
        <Reveal delay={60} className={cn(align === 'split' && 'md:col-span-4 xl:col-span-3')}>
          <IndexLabel index={index} label={label} />
        </Reveal>

        <div className={cn(align === 'split' && 'md:col-span-8 xl:col-span-9')}>
          <Reveal delay={120}>
            <Heading
              id={id}
              className={cn(size, 'mt-4 max-w-[22ch] font-semibold text-primary md:mt-5')}
            >
              {title}
            </Heading>
          </Reveal>
          {lede ? (
            <Reveal delay={180}>
              <div className="ct-measure mt-5 text-lead text-secondary">{lede}</div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </header>
  )
}

/** Body copy well with typographic rhythm for multi-paragraph passages. */
export function Prose({
  children,
  className,
  size = 'base',
}: {
  children: ReactNode
  className?: string
  size?: 'base' | 'lead'
}) {
  return (
    <div
      className={cn(
        'space-y-5 text-secondary [&_strong]:font-medium [&_strong]:text-primary',
        size === 'lead' ? 'text-lead' : 'text-body',
        className,
      )}
    >
      {children}
    </div>
  )
}

/** Renders an array of source paragraphs without markup in the data layer. */
export function Paragraphs({
  items,
  className,
  size = 'base',
}: {
  items: readonly string[]
  className?: string
  size?: 'base' | 'lead'
}) {
  return (
    <Prose size={size} className={className}>
      {items.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </Prose>
  )
}

/** A hairline datum that draws in on reveal. */
export function Datum({ className }: { className?: string }) {
  return (
    <Reveal as="datum">
      <div className={cn('h-px w-full bg-hairline', className)} />
    </Reveal>
  )
}
