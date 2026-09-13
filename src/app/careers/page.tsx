import type { Metadata } from 'next'
import { Band, Measure, Section } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { IndexLabel, SectionHead } from '@/components/primitives/Type'
import { Action } from '@/components/primitives/Action'
import { Channel } from '@/components/content/Channel'
import { ContentSlot, ImageSlot, Qualifier } from '@/components/content/Placeholder'
import { contactChannels } from '@/data/site'
import { deliveryMetrics } from '@/data/company'
import { MetricBlock, MetricRow } from '@/components/data/Metrics'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Careers',
  description:
    'Railway signalling engineering is learned on site. Disciplines Cosmictech recruits into, and how to apply.',
  path: '/careers',
})

/** Disciplines named from the scope of work Cosmictech actually executes. */
const disciplines = [
  {
    index: '01',
    title: 'Signalling design',
    body: 'Signalling plans, control tables, locking and selection tables, cable plans. The work that determines whether everything downstream is correct.',
  },
  {
    index: '02',
    title: 'Testing & commissioning',
    body: 'Wire counting, function and correspondence testing, control table proving, cut-over under traffic block. The discipline that carries the safety argument.',
  },
  {
    index: '03',
    title: 'Site execution',
    body: 'Outdoor gear erection, cable routes and terminations, indoor rack building and wiring — sequenced around a line that stays in traffic.',
  },
  {
    index: '04',
    title: 'Project management',
    body: 'Programme, block planning, client and permanent-way co-ordination, and the commercial control that keeps a turnkey scope inside its dates.',
  },
  {
    index: '05',
    title: 'Procurement & supply chain',
    body: 'Approved equipment against approved designs, to a block programme that does not move. Supplier relationships are the lever here.',
  },
  {
    index: '06',
    title: 'Data science & engineering',
    body: 'At Prognostix: computer vision, signal processing, embedded systems and the deployment engineering that puts models at the wayside.',
  },
]

const propositions = [
  {
    index: '01',
    title: 'You will commission things',
    body: 'Cosmictech takes turnkey scopes, which means engineers here see a work through from control tables to the block in which it changes over. Very few contractors can offer that span.',
  },
  {
    index: '02',
    title: 'The seniors came from the railway',
    body: 'The in-house team includes retired railway S&T engineers and signalling professionals. On a discipline that is learned by apprenticeship more than by textbook, that is the whole difference.',
  },
  {
    index: '03',
    title: 'The work is consequential',
    body: 'Signalling has a direct and unambiguous relationship to whether people arrive safely. Not many engineering jobs are that legible.',
  },
]

export default function CareersPage() {
  return (
    <>
      <Section surface="graphite" divide={false} as="div">
        <div className="pt-32 pb-14 md:pt-40 md:pb-16 xl:pt-44">
          <Reveal>
            <IndexLabel label="Careers" tone="accent" />
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 max-w-[15ch] text-display-2 font-semibold text-primary">
              Signalling is learned at the location, not the desk.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <Measure className="mt-9">
              <p className="text-lead text-secondary">
                There is no course that teaches you to test an interlocking. You learn it from
                someone who has done it, on a railway that is carrying traffic, and then you are
                trusted with it. That is how this company is built.
              </p>
            </Measure>
          </Reveal>
        </div>
      </Section>

      <Section surface="graphite" divide={false}>
        <Band className="pt-0">
          <MetricRow className="lg:grid-cols-3">
            {[deliveryMetrics[3]!, deliveryMetrics[0]!, deliveryMetrics[1]!].map((m, i) => (
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
          <SectionHead index="01" label="Why here" title="What the job actually offers." align="split" />
          <div className="mt-14 md:mt-16">
            {propositions.map((p, i) => (
              <Reveal key={p.index} delay={i * 50}>
                <div className="grid grid-cols-12 gap-x-6 gap-y-2 border-t border-hairline py-8">
                  <span className="col-span-12 font-mono text-micro tracking-[0.14em] text-accent md:col-span-1">
                    {p.index}
                  </span>
                  <h2 className="col-span-12 text-h3 font-medium text-primary md:col-span-4">
                    {p.title}
                  </h2>
                  <p className="col-span-12 max-w-[62ch] text-body text-secondary md:col-span-7">
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
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHead index="02" label="Disciplines" title="Where people work." />
              <div className="mt-12">
                {disciplines.map((d, i) => (
                  <Reveal key={d.index} delay={i * 35}>
                    <div className="border-t border-hairline py-5">
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-micro tracking-[0.14em] text-accent">
                          {d.index}
                        </span>
                        <div>
                          <h3 className="text-h4 font-medium text-primary">{d.title}</h3>
                          <p className="mt-2 max-w-[58ch] text-small text-secondary">{d.body}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
                <div className="border-t border-hairline" />
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={120}>
                <ImageSlot
                  ratio="4 / 5"
                  subject="A junior engineer working alongside a senior one at a location or equipment room — the apprenticeship that this page describes."
                  treatment="Documentary, available light. Two people and the work, not a posed portrait."
                  filename="careers/apprenticeship.jpg"
                  priorityNote="Priority 1"
                />
              </Reveal>
            </div>
          </div>
        </Band>
      </Section>

      {/* Openings — reserved, because none were supplied */}
      <Section surface="paper">
        <Band>
          <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHead index="03" label="Current openings" title="Live vacancies." />
              <Reveal delay={100}>
                <ContentSlot
                  className="mt-10"
                  lines={6}
                  spec="Current vacancies: role title, discipline, location or project, experience required, and a short scope for each. The supplied material contains no recruitment information, so no roles are listed. Structure is in place — adding a role means adding an entry to a data file, exactly as projects and capabilities work."
                />
              </Reveal>
              <Reveal delay={150}>
                <Qualifier className="mt-8 max-w-[68ch]">
                  No vacancy is advertised on this page. Speculative applications from signalling
                  engineers are welcome through the channel opposite.
                </Qualifier>
              </Reveal>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <h2 className="border-t border-hairline-strong pt-3 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
                How to apply
              </h2>
              <dl className="mt-6">
                <Channel
                  label="Applications"
                  value={contactChannels.careersEmail}
                  href={(v) => `mailto:${v}`}
                  spec="Recruitment address for CVs and applications."
                />
                <Channel
                  label="General enquiries"
                  value={contactChannels.generalEmail}
                  href={(v) => `mailto:${v}`}
                  spec="Main company email address."
                />
              </dl>
              <p className="mt-8 max-w-[38ch] text-small text-secondary">
                Tell us which discipline you work in, the systems you have tested or commissioned,
                and the zones you have worked across.
              </p>
              <div className="mt-8">
                <Action href="/contact">Contact the company</Action>
              </div>
            </aside>
          </div>
        </Band>
      </Section>
    </>
  )
}
