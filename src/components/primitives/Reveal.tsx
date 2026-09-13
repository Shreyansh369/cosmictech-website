'use client'

import { useCallback, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  /** Stagger in milliseconds, applied as a transition delay. */
  delay?: number
  /**
   * 'rise'  — content lifts into place (default)
   * 'datum' — a hairline draws left-to-right, for rules and dividers
   */
  as?: 'rise' | 'datum'
  className?: string
}

/**
 * Scroll reveal.
 *
 * Deliberately not built on an animation library: one IntersectionObserver
 * and a CSS transition cost nothing at runtime, and the reduced-motion media
 * query in globals.css neutralises the whole thing without a JS branch.
 *
 * The observer is attached from a ref callback and marks the element with a
 * data attribute directly, so revealing never goes through React state and
 * cannot cause a render. If IntersectionObserver is unavailable the element
 * is marked immediately — content must never be left hidden.
 */
export function Reveal({ children, delay = 0, as = 'rise', className }: RevealProps) {
  const attach = useCallback((node: HTMLDivElement | null) => {
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      node.setAttribute('data-shown', '')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-shown', '')
            observer.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={attach}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-[var(--ease-datum)] motion-reduce:transition-none',
        as === 'rise' && 'translate-y-3 opacity-0 data-shown:translate-y-0 data-shown:opacity-100',
        as === 'datum' &&
          'origin-left scale-x-0 opacity-0 data-shown:scale-x-100 data-shown:opacity-100',
        'motion-reduce:translate-y-0 motion-reduce:scale-x-100 motion-reduce:opacity-100',
        className,
      )}
    >
      {children}
    </div>
  )
}
