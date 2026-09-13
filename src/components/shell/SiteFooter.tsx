import Link from 'next/link'
import { CosmictechEmblem, PrognostixWordmark, Wordmark } from '@/components/brand/Brand'
import { Channel } from '@/components/content/Channel'
import { footerNav, legalNav } from '@/data/navigation'
import { contactChannels, site } from '@/data/site'
import { portfolioTotals } from '@/data/projects'

/**
 * Site footer, composed as a drawing-sheet title block: identity on the
 * left, the register of routes across the sheet, and the revision line
 * along the bottom.
 */
export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer data-surface="graphite" className="border-t border-hairline bg-surface text-primary">
      <div className="ct-container">
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 py-16 md:grid-cols-12 md:py-20">
          {/* Identity block */}
          <div className="md:col-span-12 lg:col-span-4">
            <Wordmark />
            <p className="ct-measure-tight mt-6 text-body text-secondary">
              {site.legalName}. Railway signalling and telecommunications engineering, established{' '}
              {site.establishedYear}.
            </p>

            <dl className="mt-8 max-w-sm">
              <Channel
                label="General enquiries"
                value={contactChannels.generalEmail}
                href={(v) => `mailto:${v}`}
                spec="Company email address for general enquiries."
              />
              <Channel
                label="Telephone"
                value={contactChannels.phone}
                href={(v) => `tel:${v.replace(/[^+\d]/g, '')}`}
                spec="Primary telephone number, in international format."
              />
              <Channel
                label="Registered office"
                value={contactChannels.registeredOffice}
                spec="Registered office address as filed."
              />
            </dl>
          </div>

          {/* Route register */}
          <nav aria-label="Footer" className="md:col-span-12 lg:col-span-8">
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
              {footerNav.map((column) => (
                <div key={column.title}>
                  <h2 className="border-t border-hairline-strong pt-3 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
                    {column.title}
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-small text-secondary transition-colors hover:text-accent"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        {/* Group line — Cosmictech and Prognostix stated as one organisation */}
        <div className="grid grid-cols-1 items-center gap-6 border-t border-hairline py-8 md:grid-cols-12">
          <p className="font-mono text-micro tracking-[0.14em] text-faint uppercase md:col-span-3">
            Group
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-9">
            <span className="flex items-center gap-2.5">
              <CosmictechEmblem className="h-4 text-tertiary" />
              <span className="font-display text-[0.875rem] font-bold tracking-[-0.005em] text-secondary">
                COSMICTECH
              </span>
            </span>
            <span aria-hidden className="h-4 w-px bg-hairline-strong" />
            <Link href="/prognostix" className="group flex items-center gap-2.5">
              <PrognostixWordmark size="sm" className="opacity-80 transition-opacity group-hover:opacity-100" />
              <span aria-hidden className="text-tertiary transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Revision line */}
        <div className="flex flex-col gap-4 border-t border-hairline py-7 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-micro tracking-[0.1em] text-faint">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-mono text-micro tracking-[0.1em] text-faint">
              {portfolioTotals.count} works disclosed · {portfolioTotals.zoneCodes.length} zones &
              agencies
            </span>
            <ul className="flex items-center gap-x-6">
              {legalNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono text-micro tracking-[0.1em] text-faint uppercase transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
