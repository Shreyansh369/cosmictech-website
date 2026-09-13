import type { Metadata } from 'next'
import { Band, Measure, Section } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { IndexLabel, SectionHead } from '@/components/primitives/Type'
import { Action } from '@/components/primitives/Action'
import { MetricBlock, MetricRow } from '@/components/data/Metrics'
import { ContentSlot, Qualifier } from '@/components/content/Placeholder'
import { deliveryMetrics, qualityStatements } from '@/data/company'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Quality & Safety',
  description:
    'How Cosmictech works to client technical standards, safety norms and operational requirements on live railway infrastructure.',
  path: '/company/quality-safety',
})

/** Public engineering fact about how safety is argued on signalling works. */
const principles = [
  {
    index: '01',
    title: 'Fail toward restriction',
    body: 'Every element of a signalling system is designed so that its failure produces a more restrictive condition, never a less restrictive one. A section whose state is in doubt is occupied. A signal whose control is lost shows danger. Safety is not a property added to the system; it is the direction the system falls in.',
  },
  {
    index: '02',
    title: 'Prove, do not assume',
    body: 'An interlocking will not act on a commanded point position — it requires detection proving the point is physically set and locked. The same principle governs the works: nothing is accepted as correct because it was installed correctly, only because it was tested and found correct.',
  },
  {
    index: '03',
    title: 'Independence in checking',
    body: 'Safety-critical testing is structured so that the person who verifies a function is not simply confirming their own installation work. Correspondence between design intent, indoor logic and field response is checked end to end.',
  },
  {
    index: '04',
    title: 'The client’s standards govern',
    body: 'Railway signalling is executed to the operator’s approved standards, approved equipment schedules and approved procedures. A contractor’s own preferences are subordinate to them throughout.',
  },
]

export default function QualitySafetyPage() {
  return (
    <>
      <Section surface="graphite" divide={false} as="div">
        <div className="pt-32 pb-14 md:pt-40 md:pb-16 xl:pt-44">
          <Reveal>
            <IndexLabel label="Company / Quality & Safety" tone="accent" />
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 max-w-[16ch] text-display-2 font-semibold text-primary">
              A system that fails toward stop.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <Measure className="mt-9">
              <p className="text-lead text-secondary">
                Signalling is one of the few disciplines where the safety argument is built into the
                engineering rather than wrapped around it. The work that installs it has to be held
                to the same logic.
              </p>
            </Measure>
          </Reveal>
        </div>
      </Section>

      <Section surface="graphite" divide={false}>
        <Band className="pt-0">
          <MetricRow className="lg:grid-cols-3">
            {deliveryMetrics.slice(1, 4).map((m, i) => (
              <MetricBlock
                key={m.label}
                size="lg"
                delay={i * 60}
                value={m.value}
                label={m.label}
                qualifier={m.qualifier}
              />
            ))}
          </MetricRow>
        </Band>
      </Section>

      <Section surface="paper">
        <Band>
          <SectionHead
            index="01"
            label="Principles"
            title="What safety actually means here."
            align="split"
          />
          <div className="mt-14 md:mt-16">
            {principles.map((p, i) => (
              <Reveal key={p.index} delay={i * 40}>
                <div className="grid grid-cols-12 gap-x-6 gap-y-2 border-t border-hairline py-8">
                  <span className="col-span-12 font-mono text-micro tracking-[0.14em] text-accent md:col-span-1">
                    {p.index}
                  </span>
                  <h2 className="col-span-12 text-h3 font-medium text-primary md:col-span-4">
                    {p.title}
                  </h2>
                  <p className="col-span-12 max-w-[64ch] text-body text-secondary md:col-span-7">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-hairline" />
          </div>
        </Band>
      </Section>

      <Section surface="graphite">
        <Band>
          <SectionHead index="02" label="On the record" title="What the company states." />
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ul className="space-y-8">
                {qualityStatements.map((s) => (
                  <Reveal key={s}>
                    <li className="border-l-2 border-accent pl-6">
                      <p className="max-w-[58ch] text-lead text-primary">{s}</p>
                      <p className="mt-3 font-mono text-micro tracking-[0.1em] text-faint uppercase">
                        Source: Company profile
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Band>
      </Section>

      <Section surface="graphite" divide={false}>
        <Band className="pt-0">
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHead
                index="03"
                label="Certification"
                title="Accreditations and approvals."
              />
              <Reveal delay={100}>
                <ContentSlot
                  className="mt-10"
                  lines={4}
                  spec="Quality and safety accreditations: ISO certifications held with numbers and validity, RDSO or zonal vendor approvals and their categories, safety management system details, and any client-issued performance or credential certificates. The company profile states that credential certificates are enclosed with it, but the certificates themselves were not supplied. Cosmictech to provide — nothing has been listed here on the basis of that mention alone."
                />
              </Reveal>
              <Reveal delay={160}>
                <Qualifier className="mt-8 max-w-[70ch]">
                  No certification is claimed on this page. The reserved area above will be
                  populated only from certificates the company supplies.
                </Qualifier>
              </Reveal>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            <Action href="/contact" variant="solid">
              Request our credentials
            </Action>
            <Action href="/company/engineering">Engineering approach</Action>
          </div>
        </Band>
      </Section>
    </>
  )
}
