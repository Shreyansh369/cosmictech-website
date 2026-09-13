import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Band, Measure, Section } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { IndexLabel, Paragraphs, SectionHead } from '@/components/primitives/Type'
import { Action, ArrowLink, RowLink } from '@/components/primitives/Action'
import { SystemSchematic } from '@/components/diagram/SystemSchematic'
import { ProjectRow, ProjectRowHeader } from '@/components/projects/ProjectRow'
import { ImageSlot } from '@/components/content/Placeholder'
import { capabilities, getCapability } from '@/data/capabilities'
import { projectsBySystem } from '@/data/projects'
import { pageMetadata } from '@/lib/seo'

export function generateStaticParams() {
  return capabilities.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cap = getCapability(slug)
  if (!cap) return {}
  return pageMetadata({
    title: cap.name,
    description: cap.summary,
    path: `/capabilities/${cap.slug}`,
  })
}

export default async function CapabilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cap = getCapability(slug)
  if (!cap) notFound()

  const linkedProjects = cap.systemTag ? projectsBySystem(cap.systemTag) : []
  const related = cap.related
    .map((s) => getCapability(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))

  return (
    <>
      {/* ------------------------------------------------------------ HERO */}
      <Section surface="graphite" divide={false} as="div">
        <div className="pt-32 pb-16 md:pt-40 md:pb-20 xl:pt-44">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2.5 font-mono text-micro tracking-[0.12em] text-tertiary uppercase">
                <li>
                  <Link href="/capabilities" className="transition-colors hover:text-accent">
                    Capabilities
                  </Link>
                </li>
                <li aria-hidden className="text-faint">
                  /
                </li>
                <li className="text-accent">{cap.index}</li>
              </ol>
            </nav>
          </Reveal>

          <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal delay={60}>
                <h1 className="max-w-[15ch] text-display-2 font-semibold text-primary">
                  {cap.name}
                </h1>
              </Reveal>
              {cap.expansion && cap.expansion !== cap.name ? (
                <Reveal delay={100}>
                  <p className="mt-5 font-mono text-meta tracking-[0.16em] text-tertiary uppercase">
                    {cap.expansion}
                  </p>
                </Reveal>
              ) : null}
            </div>
          </div>

          <Reveal delay={140}>
            <p className="ct-measure mt-10 text-lead text-secondary">{cap.lede}</p>
          </Reveal>
        </div>
      </Section>

      {/* --------------------------------------------------- WHAT / WHY */}
      <Section surface="paper">
        <Band>
          <div className="grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal as="datum">
                <div className="h-px w-full bg-hairline-strong" />
              </Reveal>
              <Reveal delay={60}>
                <IndexLabel index="01" label={cap.whatItIs.heading} className="mt-5" />
              </Reveal>
              <Reveal delay={120}>
                <Paragraphs items={cap.whatItIs.paragraphs} className="mt-7" />
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal as="datum">
                <div className="h-px w-full bg-hairline-strong" />
              </Reveal>
              <Reveal delay={60}>
                <IndexLabel index="02" label={cap.whyItMatters.heading} className="mt-5" />
              </Reveal>
              <Reveal delay={120}>
                <Paragraphs items={cap.whyItMatters.paragraphs} className="mt-7" />
              </Reveal>
            </div>
          </div>
        </Band>
      </Section>

      {/* ----------------------------------------------- SYSTEM ARCHITECTURE */}
      <Section surface="graphite">
        <Band>
          <SectionHead
            index="03"
            label="System architecture"
            title="How the parts are actually wired together."
            align="split"
          />
          <div className="mt-14 md:mt-16">
            <SystemSchematic schematic={cap.schematic} figureNumber="Fig. 02" />
          </div>
        </Band>
      </Section>

      {/* ------------------------------------------------------ HOW IT WORKS */}
      <Section surface="graphite" divide={false}>
        <Band className="pt-0">
          <SectionHead index="04" label="How it works" title="In sequence." align="split" />

          <ol className="mt-14 md:mt-16">
            {cap.howItWorks.map((step, i) => (
              <Reveal key={step.step} delay={i * 40}>
                <li className="grid grid-cols-12 gap-x-6 gap-y-2 border-t border-hairline py-7">
                  <span className="col-span-12 font-mono text-micro tracking-[0.14em] text-accent md:col-span-1">
                    {step.step}
                  </span>
                  <h3 className="col-span-12 text-h3 font-medium text-primary md:col-span-4">
                    {step.title}
                  </h3>
                  <p className="col-span-12 max-w-[62ch] text-body text-secondary md:col-span-7">
                    {step.detail}
                  </p>
                </li>
              </Reveal>
            ))}
            <li className="border-t border-hairline" aria-hidden />
          </ol>
        </Band>
      </Section>

      {/* ------------------------------------------------------------ SCOPE */}
      <Section surface="paper">
        <Band>
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHead index="05" label="Engineering scope" title="What the work involves." />

              <dl className="mt-12">
                {cap.scope.map((item, i) => (
                  <Reveal key={item.title} delay={i * 40}>
                    <div className="border-t border-hairline py-6">
                      <dt className="text-h4 font-medium text-primary">{item.title}</dt>
                      <dd className="mt-2.5 max-w-[60ch] text-body text-secondary">
                        {item.detail}
                      </dd>
                    </div>
                  </Reveal>
                ))}
                <div className="border-t border-hairline" />
              </dl>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={100}>
                <p className="border-t border-hairline-strong pt-3 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
                  On the record
                </p>
                <ul className="mt-6 space-y-7">
                  {cap.evidence.map((e) => (
                    <li key={e.statement}>
                      <p className="text-body text-primary">{e.statement}</p>
                      <p className="mt-2 font-mono text-micro tracking-[0.1em] text-faint uppercase">
                        Source: {e.source === 'PROFILE' ? 'Company profile' : 'Prognostix deck'}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={160}>
                <ImageSlot
                  className="mt-10"
                  ratio="4 / 3"
                  subject={`Field photography for ${cap.name}: equipment in situ on a Cosmictech project site.`}
                  treatment="Documentary, available light. Equipment sharp, context legible. No staged poses."
                  filename={`capabilities/${cap.slug}.jpg`}
                />
              </Reveal>
            </div>
          </div>
        </Band>
      </Section>

      {/* ------------------------------------------------- LINKED PROJECTS */}
      {linkedProjects.length > 0 ? (
        <Section surface="graphite">
          <Band>
            <SectionHead
              index="06"
              label="Selected works"
              title={`${linkedProjects.length} works in the disclosed portfolio used this system.`}
              align="split"
            />
            <div className="mt-14 md:mt-16">
              <ProjectRowHeader />
              {linkedProjects.slice(0, 8).map((p) => (
                <ProjectRow key={p.slug} project={p} />
              ))}
              <div className="border-t border-hairline" />
              {linkedProjects.length > 8 ? (
                <div className="mt-10">
                  <ArrowLink href="/projects">All {linkedProjects.length} works</ArrowLink>
                </div>
              ) : null}
            </div>
          </Band>
        </Section>
      ) : null}

      {/* ------------------------------------------------------- RELATED */}
      <Section surface="graphite" divide={linkedProjects.length === 0}>
        <Band className={linkedProjects.length > 0 ? 'pt-0' : undefined}>
          <SectionHead
            index={linkedProjects.length > 0 ? '07' : '06'}
            label="Interlocked with"
            title="What this discipline depends on."
            align="split"
          />
          <div className="mt-12">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 50}>
                <RowLink href={`/capabilities/${r.slug}`}>
                  <div className="grid grid-cols-12 items-baseline gap-x-6 gap-y-2 py-6">
                    <span className="col-span-12 font-mono text-micro tracking-[0.14em] text-accent md:col-span-1">
                      {r.index}
                    </span>
                    <h3 className="col-span-12 text-h3 font-medium text-primary transition-colors group-hover:text-accent md:col-span-4">
                      {r.name}
                    </h3>
                    <p className="col-span-12 max-w-[58ch] text-body text-secondary md:col-span-6">
                      {r.summary}
                    </p>
                    <span
                      aria-hidden
                      className="col-span-12 text-tertiary transition-transform group-hover:translate-x-1 md:col-span-1 md:text-right"
                    >
                      →
                    </span>
                  </div>
                </RowLink>
              </Reveal>
            ))}
            <div className="border-t border-hairline" />
          </div>
        </Band>
      </Section>

      {/* ---------------------------------------------------------- CONTACT */}
      <Section surface="paper">
        <Band>
          <Measure>
            <h2 className="text-h1 font-semibold text-primary">
              Bring us a {cap.name.toLowerCase()} scope.
            </h2>
            <p className="mt-6 text-lead text-secondary">
              Design through commissioning, or any part of it. Tell us the section and the date it
              has to be in traffic.
            </p>
          </Measure>
          <div className="mt-9 flex flex-wrap gap-3">
            <Action href="/contact" variant="solid">
              Start a project enquiry
            </Action>
            <Action href="/capabilities">All capabilities</Action>
          </div>
        </Band>
      </Section>
    </>
  )
}
