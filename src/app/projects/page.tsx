import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Band, Section } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { IndexLabel } from '@/components/primitives/Type'
import { Qualifier } from '@/components/content/Placeholder'
import { ProjectExplorer } from '@/components/projects/ProjectExplorer'
import { portfolioTotals } from '@/data/projects'
import type { ProjectStatus } from '@/data/projects'
import { zoneGlossary } from '@/data/site'
import { formatCr } from '@/lib/utils'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Projects',
  description:
    'An indicative portfolio of 30 railway S&T works delivered by Cosmictech across Indian Railways zones and executing agencies — automatic signalling, yard remodelling with electronic interlocking, doubling and systems replacement.',
  path: '/projects',
})

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const initialStatus: ProjectStatus | null =
    status === 'completed' || status === 'in-progress' ? status : null

  return (
    <>
      <Section surface="graphite" divide={false} as="div">
        <div className="pt-32 pb-14 md:pt-40 md:pb-16 xl:pt-44">
          <Reveal>
            <IndexLabel label="Projects" tone="accent" />
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 max-w-[16ch] text-display-2 font-semibold text-primary">
              Thirty works, filtered any way you need them.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="ct-measure mt-8 text-lead text-secondary">
              Automatic signalling corridors, yard remodelling with electronic interlocking,
              doubling and systems replacement — across {portfolioTotals.zoneCodes.length} Indian
              Railways zones and executing agencies.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Qualifier className="mt-9 max-w-[74ch]">
              Cosmictech describes this as an indicative list intended to give an idea of its
              capability, not a complete record of works undertaken. The aggregate value shown is
              the arithmetic sum of the figures disclosed for the works listed here — ₹
              {formatCr(portfolioTotals.aggregateCr)} Cr across {portfolioTotals.count} works.
            </Qualifier>
          </Reveal>
        </div>
      </Section>

      <Section surface="graphite" divide={false}>
        <Band className="pt-0">
          <Suspense fallback={null}>
            <ProjectExplorer initialStatus={initialStatus} />
          </Suspense>
        </Band>
      </Section>

      {/* Glossary — zone codes are meaningless to anyone outside IR */}
      <Section surface="paper">
        <Band>
          <IndexLabel index="01" label="Zone & agency codes" />
          <h2 className="mt-6 max-w-[22ch] text-h2 font-semibold text-primary">
            Reading the register.
          </h2>
          <dl className="mt-12 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioTotals.zoneCodes.map((code) => {
              const entry = zoneGlossary[code]
              return (
                <div key={code} className="flex gap-5 border-t border-hairline py-4">
                  <dt className="w-14 shrink-0 font-mono text-small tracking-[0.1em] text-accent uppercase">
                    {code}
                  </dt>
                  <dd className="text-small text-secondary">
                    {entry?.name ?? (
                      <span className="font-mono text-micro tracking-[0.12em] text-tertiary uppercase">
                        [ INSERT CONTENT HERE ] — expansion not stated in source
                      </span>
                    )}
                    {entry?.name ? (
                      <span className="mt-0.5 block font-mono text-micro tracking-[0.1em] text-faint uppercase">
                        {entry.kind === 'zone' ? 'Railway zone' : 'Executing agency'}
                      </span>
                    ) : null}
                  </dd>
                </div>
              )
            })}
          </dl>
        </Band>
      </Section>
    </>
  )
}
