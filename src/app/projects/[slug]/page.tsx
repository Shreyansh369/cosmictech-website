import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Band, Measure, Section } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { SectionHead } from '@/components/primitives/Type'
import { Action, ArrowLink } from '@/components/primitives/Action'
import { SpecPair, StatusIndicator } from '@/components/data/Metrics'
import { ContentSlot, ImageSlot, Qualifier } from '@/components/content/Placeholder'
import { ProjectRow, ProjectRowHeader } from '@/components/projects/ProjectRow'
import { SystemSchematic } from '@/components/diagram/SystemSchematic'
import {
  getProject,
  projectCategoryLabels,
  projectSystemLabels,
  projects,
  relatedProjects,
} from '@/data/projects'
import { capabilities } from '@/data/capabilities'
import { zoneGlossary } from '@/data/site'
import { pageMetadata } from '@/lib/seo'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return pageMetadata({
    title: project.title,
    description: `${project.description} ${project.zoneCodes.join(' / ')} · ${project.valueLabel} · ${project.statusLabel}.`,
    path: `/projects/${project.slug}`,
  })
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const related = relatedProjects(project.slug, 3)
  // The capability whose system architecture governs this work.
  const primaryCapability =
    capabilities.find((c) => c.systemTag && project.systems.includes(c.systemTag)) ??
    capabilities.find((c) => c.slug === 'railway-snt')

  return (
    <>
      {/* ------------------------------------------------------------ HERO */}
      <Section surface="graphite" divide={false} as="div">
        <div className="pt-32 pb-14 md:pt-40 md:pb-16 xl:pt-44">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2.5 font-mono text-micro tracking-[0.12em] text-tertiary uppercase">
                <li>
                  <Link href="/projects" className="transition-colors hover:text-accent">
                    Projects
                  </Link>
                </li>
                <li aria-hidden className="text-faint">
                  /
                </li>
                <li className="text-tertiary">{projectCategoryLabels[project.category]}</li>
              </ol>
            </nav>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="max-w-[18ch] text-h1 font-semibold text-primary md:text-display-2">
              {project.title}
            </h1>
          </Reveal>

          {project.section ? (
            <Reveal delay={110}>
              <p className="mt-6 font-mono text-meta tracking-[0.14em] text-accent uppercase">
                {project.section}
              </p>
            </Reveal>
          ) : null}

          {/* Specification block — the facts, as disclosed */}
          <Reveal delay={160}>
            <dl className="mt-12 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
              <SpecPair label="Value (disclosed)">
                <span className="tabular font-mono">{project.valueLabel}</span>
              </SpecPair>
              <SpecPair label="Status">
                <StatusIndicator status={project.status} label={project.statusLabel} />
              </SpecPair>
              <SpecPair label="Zone / executing agency">
                {project.zoneCodes
                  .map((c) => (zoneGlossary[c]?.name ? `${c} — ${zoneGlossary[c]!.name}` : c))
                  .join(' · ')}
              </SpecPair>
              <SpecPair label="Systems">
                {project.systems.length > 0
                  ? project.systems.map((s) => projectSystemLabels[s]).join(' · ')
                  : '—'}
              </SpecPair>
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------- THE WORK */}
      <Section surface="paper">
        <Band>
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHead index="01" label="Scope of work" title="As tendered." />

              <Reveal delay={100}>
                <blockquote className="mt-10 border-l-2 border-accent pl-6">
                  <p className="text-lead text-primary">{project.description}</p>
                  <footer className="mt-4 font-mono text-micro tracking-[0.12em] text-tertiary uppercase">
                    Verbatim from the Cosmictech company profile
                  </footer>
                </blockquote>
              </Reveal>

              {project.sourceTruncated ? (
                <Reveal delay={140}>
                  <Qualifier className="mt-7">
                    The description above is incomplete in the source document, which cuts off
                    mid-sentence. The full scope should be restored before publication.
                  </Qualifier>
                </Reveal>
              ) : null}

              <Reveal delay={180}>
                <ContentSlot
                  className="mt-12"
                  lines={5}
                  spec={`Case-study narrative for ${project.title}. Suggested content: the operating constraint that prompted the work, the section's traffic pattern, what was found on survey, how the cut-over was staged around traffic blocks, and what the client gained on completion. Cosmictech engineering or commercial team to supply; nothing has been drafted here because the supplied sources contain only the tender description.`}
                />
              </Reveal>

              <Reveal delay={220}>
                <ContentSlot
                  className="mt-6"
                  lines={3}
                  spec={`Outcome for ${project.title}: commissioning date, block hours used, any measured improvement in headway or capacity, and client acceptance. Figures must come from project records — none are present in the supplied material.`}
                />
              </Reveal>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={120}>
                <ImageSlot
                  ratio="4 / 5"
                  subject={`${project.title}: the site as built. Preferred subject — commissioned signalling equipment in its final position, or the yard/corridor in traffic after cut-over.`}
                  treatment="Documentary. Daylight or available light at night. Wide enough to place the equipment in its corridor."
                  filename={`projects/${project.slug}.jpg`}
                  priorityNote="Priority 1"
                />
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-10">
                  <p className="border-t border-hairline-strong pt-3 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
                    Capability
                  </p>
                  {primaryCapability ? (
                    <>
                      <h3 className="mt-5 text-h3 font-medium text-primary">
                        {primaryCapability.name}
                      </h3>
                      <p className="mt-3 text-body text-secondary">{primaryCapability.summary}</p>
                      <ArrowLink
                        href={`/capabilities/${primaryCapability.slug}`}
                        className="mt-5"
                      >
                        How it works
                      </ArrowLink>
                    </>
                  ) : null}
                </div>
              </Reveal>
            </aside>
          </div>
        </Band>
      </Section>

      {/* --------------------------------------------------- ARCHITECTURE */}
      {primaryCapability ? (
        <Section surface="graphite">
          <Band>
            <SectionHead
              index="02"
              label="System architecture"
              title={`The ${primaryCapability.name.toLowerCase()} arrangement this work delivers.`}
              align="split"
            />
            <div className="mt-14 md:mt-16">
              <SystemSchematic schematic={primaryCapability.schematic} figureNumber="Fig. 01" />
            </div>
          </Band>
        </Section>
      ) : null}

      {/* ------------------------------------------------------- RELATED */}
      {related.length > 0 ? (
        <Section surface="graphite" divide={!primaryCapability}>
          <Band className={primaryCapability ? 'pt-0' : undefined}>
            <SectionHead
              index="03"
              label="Comparable works"
              title={`Other ${projectCategoryLabels[project.category].toLowerCase()} works.`}
              align="split"
            />
            <div className="mt-14">
              <ProjectRowHeader />
              {related.map((p) => (
                <ProjectRow key={p.slug} project={p} />
              ))}
              <div className="border-t border-hairline" />
              <div className="mt-10">
                <ArrowLink href="/projects">The full register</ArrowLink>
              </div>
            </div>
          </Band>
        </Section>
      ) : null}

      <Section surface="paper">
        <Band>
          <Measure>
            <h2 className="text-h1 font-semibold text-primary">A similar section on your network?</h2>
            <p className="mt-6 text-lead text-secondary">
              Tell us the route, the existing arrangement and the traffic it has to keep carrying.
            </p>
          </Measure>
          <div className="mt-9 flex flex-wrap gap-3">
            <Action href="/contact" variant="solid">
              Start a project enquiry
            </Action>
            <Action href="/projects">All works</Action>
          </div>
        </Band>
      </Section>
    </>
  )
}
