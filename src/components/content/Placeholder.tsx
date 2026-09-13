import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * CONTENT PLACEHOLDERS
 *
 * These exist because the supplied source material does not cover every
 * section the architecture requires, and inventing the difference is not an
 * option. They are styled as drawing-sheet reservations: a bounded area with
 * corner ticks and a specification of what belongs there.
 *
 * Each one occupies the space its real content will occupy, so replacing it
 * is an edit, not a redesign.
 */

function CornerTicks() {
  return (
    <>
      <span aria-hidden className="absolute -top-px -left-px h-2.5 w-2.5 border-t border-l border-hairline-strong" />
      <span aria-hidden className="absolute -top-px -right-px h-2.5 w-2.5 border-t border-r border-hairline-strong" />
      <span aria-hidden className="absolute -bottom-px -left-px h-2.5 w-2.5 border-b border-l border-hairline-strong" />
      <span aria-hidden className="absolute -right-px -bottom-px h-2.5 w-2.5 border-r border-b border-hairline-strong" />
    </>
  )
}

/**
 * A reserved block of copy.
 * `spec` describes precisely what the client needs to supply.
 */
export function ContentSlot({
  spec,
  lines = 3,
  className,
}: {
  spec: string
  /** Approximate number of body lines the final copy should occupy. */
  lines?: number
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative border border-dashed border-hairline-strong bg-surface-raised/40 p-5 md:p-6',
        className,
      )}
    >
      <CornerTicks />
      <p className="font-mono text-micro tracking-[0.14em] text-accent uppercase">
        [ INSERT CONTENT HERE ]
      </p>
      <p className="mt-3 max-w-[58ch] font-mono text-small leading-relaxed text-tertiary">{spec}</p>
      <div aria-hidden className="mt-5 space-y-2.5">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-px bg-hairline"
            style={{ width: `${[96, 88, 72, 91, 64][i % 5]}%` }}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * A reserved image area.
 * Carries its own art direction so the photographer or picture editor can
 * work from the page itself.
 */
export function ImageSlot({
  subject,
  ratio = '16 / 9',
  filename,
  treatment,
  className,
  priorityNote,
}: {
  subject: string
  /** CSS aspect-ratio string. */
  ratio?: string
  /** Suggested asset filename, so the manifest and the page agree. */
  filename: string
  /** Art-direction note: how the frame should be shot or graded. */
  treatment?: string
  className?: string
  priorityNote?: string
}) {
  return (
    <figure
      className={cn(
        'relative flex w-full flex-col justify-end border border-dashed border-hairline-strong bg-surface-raised/40 p-5 md:p-6',
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      <CornerTicks />
      {/* Registration cross — the centre mark of a reserved plate. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <svg viewBox="0 0 40 40" className="h-10 w-10 text-hairline-strong" fill="none">
          <path d="M20 6v28M6 20h28" stroke="currentColor" strokeWidth="1" />
          <circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="1" />
        </svg>
      </span>

      <figcaption className="relative">
        <span className="font-mono text-micro tracking-[0.14em] text-accent uppercase">
          [ INSERT IMAGE HERE ]
        </span>
        <span className="mt-2.5 block max-w-[52ch] font-mono text-small leading-relaxed text-secondary">
          {subject}
        </span>
        {treatment ? (
          <span className="mt-2 block max-w-[52ch] font-mono text-micro leading-relaxed tracking-[0.04em] text-tertiary">
            {treatment}
          </span>
        ) : null}
        <span className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-micro tracking-[0.1em] text-faint uppercase">
          <span>{filename}</span>
          <span aria-hidden>·</span>
          <span>{ratio.replace(/\s/g, '')}</span>
          {priorityNote ? (
            <>
              <span aria-hidden>·</span>
              <span>{priorityNote}</span>
            </>
          ) : null}
        </span>
      </figcaption>
    </figure>
  )
}

/** Reserved area for a video asset. */
export function VideoSlot({
  subject,
  filename,
  className,
}: {
  subject: string
  filename: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative flex aspect-video w-full flex-col justify-end border border-dashed border-hairline-strong bg-surface-raised/40 p-5 md:p-6',
        className,
      )}
    >
      <CornerTicks />
      <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 48 48" className="h-12 w-12 text-hairline-strong" fill="none">
          <circle cx="24" cy="24" r="15" stroke="currentColor" strokeWidth="1" />
          <path d="M20 17.5 32 24l-12 6.5z" stroke="currentColor" strokeWidth="1" />
        </svg>
      </span>
      <div className="relative">
        <span className="font-mono text-micro tracking-[0.14em] text-accent uppercase">
          [ INSERT VIDEO HERE ]
        </span>
        <span className="mt-2.5 block max-w-[52ch] font-mono text-small leading-relaxed text-secondary">
          {subject}
        </span>
        <span className="mt-3 block font-mono text-micro tracking-[0.1em] text-faint uppercase">
          {filename}
        </span>
      </div>
    </div>
  )
}

/**
 * A footnote qualifying a figure or statement — used where the source
 * material is precise about something the reader would otherwise blur,
 * or where the source itself is incomplete.
 */
export function Qualifier({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'border-l border-hairline-strong pl-3.5 font-mono text-micro leading-relaxed tracking-[0.03em] text-tertiary',
        className,
      )}
    >
      {children}
    </p>
  )
}
