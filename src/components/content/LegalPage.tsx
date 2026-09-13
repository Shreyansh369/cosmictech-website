import type { ReactNode } from 'react'
import { Band, Measure, Section } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { IndexLabel } from '@/components/primitives/Type'
import { ContentSlot, Qualifier } from '@/components/content/Placeholder'

/**
 * Shared shell for legal pages.
 *
 * These pages carry reserved areas rather than drafted text. Privacy and
 * terms copy has legal effect and must come from the company's own advisers;
 * a plausible-looking draft generated here would be worse than an obvious
 * gap, because it might be published unreviewed.
 */
export function LegalPage({
  label,
  title,
  intro,
  sections,
  children,
}: {
  label: string
  title: string
  intro: string
  sections: { index: string; heading: string; spec: string; lines?: number }[]
  children?: ReactNode
}) {
  return (
    <>
      <Section surface="graphite" divide={false} as="div">
        <div className="pt-32 pb-14 md:pt-40 md:pb-16 xl:pt-44">
          <Reveal>
            <IndexLabel label={label} tone="accent" />
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 max-w-[16ch] text-display-2 font-semibold text-primary">{title}</h1>
          </Reveal>
          <Reveal delay={140}>
            <Measure className="mt-9">
              <p className="text-lead text-secondary">{intro}</p>
            </Measure>
          </Reveal>
          <Reveal delay={200}>
            <Qualifier className="mt-9 max-w-[72ch]">
              This page is not yet in force. Its content must be drafted and approved by
              Cosmictech’s legal advisers before publication. Nothing has been drafted here, because
              text on this page has legal effect and a plausible placeholder could be published
              unreviewed.
            </Qualifier>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper">
        <Band>
          <div className="grid grid-cols-1 gap-x-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {sections.map((s, i) => (
                <Reveal key={s.index} delay={i * 40}>
                  <section className="border-t border-hairline py-10 first:border-t-0 first:pt-0">
                    <h2 className="flex items-baseline gap-4 text-h3 font-medium text-primary">
                      <span className="font-mono text-micro tracking-[0.14em] text-accent">
                        {s.index}
                      </span>
                      {s.heading}
                    </h2>
                    <ContentSlot className="mt-6" lines={s.lines ?? 4} spec={s.spec} />
                  </section>
                </Reveal>
              ))}
              {children}
            </div>
          </div>
        </Band>
      </Section>
    </>
  )
}
