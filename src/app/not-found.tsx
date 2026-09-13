import Link from 'next/link'
import { Band, Measure, Section } from '@/components/primitives/Layout'
import { Action } from '@/components/primitives/Action'
import { IndexLabel } from '@/components/primitives/Type'
import { primaryNav } from '@/data/navigation'

export default function NotFound() {
  return (
    <Section surface="graphite" divide={false} as="div">
      <div className="pt-40 pb-28 md:pt-48 md:pb-36">
        <IndexLabel label="Error 404" tone="accent" />

        <h1 className="mt-8 max-w-[16ch] text-display-2 font-semibold text-primary">
          This route is not set.
        </h1>

        <Measure className="mt-8">
          <p className="text-lead text-secondary">
            The page you asked for does not exist. An interlocking refuses a route it cannot prove —
            so does this one.
          </p>
        </Measure>

        <div className="mt-10 flex flex-wrap gap-3">
          <Action href="/" variant="solid">
            Return to the homepage
          </Action>
          <Action href="/projects">The project explorer</Action>
        </div>

        {/* Available routes, as a signalling diagram would list them */}
        <nav aria-label="Site sections" className="mt-20">
          <p className="border-t border-hairline-strong pt-3 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
            Routes available
          </p>
          <ul className="mt-2">
            {primaryNav.map((group) => (
              <li key={group.href} className="border-b border-hairline">
                <Link
                  href={group.href}
                  className="group flex items-baseline gap-4 py-4 transition-colors"
                >
                  <span className="font-mono text-micro tracking-[0.12em] text-faint">
                    {group.index}
                  </span>
                  <span className="text-h4 font-medium text-primary transition-colors group-hover:text-accent">
                    {group.label}
                  </span>
                  <span className="ml-auto text-tertiary transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Section>
  )
}
