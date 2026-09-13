'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Wordmark } from '@/components/brand/Brand'
import { primaryNav } from '@/data/navigation'
import { useScrolledPast } from '@/lib/media'
import { cn } from '@/lib/utils'

/**
 * GLOBAL NAVIGATION
 *
 * Structure mirrors the railway idea of branching: a small set of trunk
 * routes, each of which opens to reveal the sections beneath it. The panel
 * is a drawing sheet, not a card stack — index, intro, then a ruled list.
 *
 * Interaction contract:
 *  - pointer: hovering a trunk item opens its panel
 *  - keyboard: the trunk item is a button with aria-expanded; Enter/Space
 *    opens, Escape closes and returns focus, Tab moves into the panel
 *  - touch: tapping opens the panel; the panel's first link is the section
 *    overview, so no destination is unreachable
 */

export function SiteHeader() {
  const pathname = usePathname()
  const scrolled = useScrolledPast(24)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<number | null>(null)

  const close = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setOpenGroup(null)
  }, [])

  /** Small grace period so the pointer can cross the gap into the panel. */
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 120)
  }, [])

  const cancelClose = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
  }, [])

  // A route change closes everything. Adjusted during render against the
  // previous path rather than in an effect, so the panel never paints open
  // for a frame on the page it just navigated to.
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpenGroup(null)
    setMobileOpen(false)
  }

  // Escape closes; click outside closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (openGroup) {
        close()
        const trigger = headerRef.current?.querySelector<HTMLButtonElement>(
          `[data-trunk="${openGroup}"]`,
        )
        trigger?.focus()
      }
      if (mobileOpen) setMobileOpen(false)
    }
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) close()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [openGroup, mobileOpen, close])

  // Lock scroll behind the mobile panel.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  const active = primaryNav.find((g) => g.label === openGroup)
  const solid = scrolled || openGroup !== null || mobileOpen

  return (
    <header
      ref={headerRef}
      data-surface="graphite"
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-[var(--ease-state)]',
        solid ? 'border-b border-hairline bg-surface/95 backdrop-blur-md' : 'border-b border-transparent',
      )}
      onMouseLeave={scheduleClose}
    >
      <div className="ct-container">
        <div className="flex h-18 items-center justify-between gap-4 md:gap-6">
          <Link
            href="/"
            aria-label="Cosmictech Builders — home"
            className="shrink-0 py-2 transition-opacity hover:opacity-80"
          >
            <Wordmark compact={scrolled} />
          </Link>

          {/* ---------------------------------------------- desktop trunk */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center">
              {primaryNav.map((group) => {
                const open = openGroup === group.label
                const current = isCurrent(group.href)
                return (
                  <li key={group.label}>
                    <button
                      type="button"
                      data-trunk={group.label}
                      aria-expanded={open}
                      aria-controls="nav-panel"
                      onMouseEnter={() => {
                        cancelClose()
                        setOpenGroup(group.label)
                      }}
                      onFocus={() => setOpenGroup(group.label)}
                      onClick={() => setOpenGroup(open ? null : group.label)}
                      className={cn(
                        'relative px-3.5 py-6 font-mono text-meta tracking-[0.12em] uppercase transition-colors duration-200 xl:px-4',
                        current || open ? 'text-primary' : 'text-tertiary hover:text-primary',
                      )}
                    >
                      {group.label}
                      {/* Signal aspect: the current route is the lit one. */}
                      <span
                        aria-hidden
                        className={cn(
                          'absolute inset-x-3.5 bottom-4 h-px origin-left transition-transform duration-300 ease-[var(--ease-datum)] xl:inset-x-4',
                          current ? 'scale-x-100 bg-accent' : 'scale-x-0 bg-hairline-strong',
                          open && !current && 'scale-x-100',
                        )}
                      />
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className={cn(
                'hidden border px-5 py-2.5 font-mono text-meta tracking-[0.12em] uppercase transition-colors duration-200 lg:inline-block',
                isCurrent('/contact')
                  ? 'border-accent bg-accent text-white'
                  : 'border-hairline-strong text-primary hover:border-accent hover:text-accent',
              )}
            >
              Contact
            </Link>

            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
              className="-mr-2 flex items-center gap-2.5 p-2 font-mono text-meta tracking-[0.12em] text-primary uppercase lg:hidden"
            >
              {mobileOpen ? 'Close' : 'Menu'}
              <span aria-hidden className="flex h-3 w-5 flex-col justify-between">
                <span
                  className={cn(
                    'h-px w-full bg-current transition-transform duration-300 ease-[var(--ease-state)]',
                    mobileOpen && 'translate-y-[5.5px] rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'h-px w-full bg-current transition-opacity duration-200',
                    mobileOpen && 'opacity-0',
                  )}
                />
                <span
                  className={cn(
                    'h-px w-full bg-current transition-transform duration-300 ease-[var(--ease-state)]',
                    mobileOpen && '-translate-y-[5.5px] -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------- desktop panel */}
      <div
        id="nav-panel"
        hidden={!active}
        onMouseEnter={cancelClose}
        className="hidden border-t border-hairline bg-surface lg:block"
      >
        {active ? (
          <div className="ct-container">
            <div className="grid grid-cols-12 gap-x-10 py-10 xl:py-12">
              <div className="col-span-4 xl:col-span-3">
                <span className="flex items-baseline gap-2.5 font-mono text-meta tracking-[0.14em] text-faint uppercase">
                  <span className="text-accent">{active.index}</span>
                  <span aria-hidden>/</span>
                  <span className="text-tertiary">{active.label}</span>
                </span>
                <p className="mt-5 max-w-[30ch] text-h3 leading-snug font-medium text-balance text-primary">
                  {active.intro}
                </p>
              </div>

              <ul className="col-span-8 grid grid-cols-2 gap-x-10 xl:col-span-9 xl:grid-cols-3">
                {active.links.map((link) => {
                  const current = pathname === link.href
                  return (
                    <li key={link.href} className="border-t border-hairline">
                      <Link
                        href={link.href}
                        className="group block py-4 transition-colors"
                        aria-current={current ? 'page' : undefined}
                      >
                        <span
                          className={cn(
                            'flex items-center gap-2 text-h4 font-medium transition-colors',
                            current ? 'text-accent' : 'text-primary group-hover:text-accent',
                          )}
                        >
                          {link.label}
                          <span
                            aria-hidden
                            className="translate-x-0 text-tertiary opacity-0 transition-all duration-300 ease-[var(--ease-datum)] group-hover:translate-x-1 group-hover:opacity-100"
                          >
                            →
                          </span>
                        </span>
                        {link.description ? (
                          <span className="mt-1.5 block max-w-[34ch] text-small text-tertiary">
                            {link.description}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        ) : null}
      </div>

      {/* -------------------------------------------------- mobile panel */}
      <div
        id="mobile-nav"
        hidden={!mobileOpen}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-hairline bg-surface lg:hidden"
      >
        <nav aria-label="Primary (mobile)" className="ct-container pt-2 pb-16">
          <ul>
            {primaryNav.map((group) => (
              <li key={group.label} className="border-b border-hairline">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-5 marker:hidden">
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-micro tracking-[0.14em] text-accent">
                        {group.index}
                      </span>
                      <span className="text-h3 font-medium text-primary">{group.label}</span>
                    </span>
                    <span
                      aria-hidden
                      className="relative h-3 w-3 shrink-0 text-tertiary transition-transform duration-300 ease-[var(--ease-state)] group-open:rotate-45"
                    >
                      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
                      <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current" />
                    </span>
                  </summary>
                  <ul className="pb-4">
                    {group.links.map((link) => (
                      <li key={link.href} className="border-t border-hairline">
                        <Link
                          href={link.href}
                          className="flex items-baseline justify-between gap-4 py-3.5"
                          aria-current={pathname === link.href ? 'page' : undefined}
                        >
                          <span
                            className={cn(
                              'text-body',
                              pathname === link.href ? 'text-accent' : 'text-secondary',
                            )}
                          >
                            {link.label}
                          </span>
                          <span aria-hidden className="text-tertiary">
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="mt-8 block border border-accent bg-accent px-5 py-4 text-center font-mono text-meta tracking-[0.14em] text-white uppercase"
          >
            Contact Cosmictech
          </Link>
        </nav>
      </div>
    </header>
  )
}
