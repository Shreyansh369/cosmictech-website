import type { Metadata } from 'next'
import { Band, Section } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { IndexLabel, SectionHead } from '@/components/primitives/Type'
import { Action } from '@/components/primitives/Action'
import { SystemSchematic } from '@/components/diagram/SystemSchematic'
import { ContentSlot, ImageSlot } from '@/components/content/Placeholder'
import { getCapability } from '@/data/capabilities'
import { strengths } from '@/data/company'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Engineering',
  description:
    'How Cosmictech executes railway S&T works: design and control tables, procurement, installation under traffic, testing, and commissioning during granted block.',
  path: '/company/engineering',
})

const epc = getCapability('epc-gcc')!

/** The discipline of working on a railway that stays open. Public engineering fact. */
const practices = [
  {
    index: '01',
    title: 'The existing system stays safe',
    body: 'Every hour of the works programme, the railway in place must remain fully operable and fully safe. New equipment is installed alongside the old, isolated from it, and proven independently before anything is transferred.',
  },
  {
    index: '02',
    title: 'Preparation is front-loaded',
    body: 'Traffic blocks are scarce and expensive. Everything that can be done outside a block — cable laying, rack building, wiring, pre-testing — is completed first, so the block itself carries only the work that genuinely requires the line.',
  },
  {
    index: '03',
    title: 'Testing is the deliverable',
    body: 'Wire counting, insulation and continuity testing, function testing against control tables, and correspondence testing between indoor logic and field response. The installation is not the product; the proven installation is.',
  },
  {
    index: '04',
    title: 'Cut-over is a single proven step',
    body: 'An interlocking does not open in phases. At the appointed block it changes over completely, and it must be right. That is what the entire preceding programme exists to guarantee.',
  },
  {
    index: '05',
    title: 'Hand-back includes the record',
    body: 'The operating and maintenance organisations receive a working system together with its as-commissioned documentation — control tables, wiring records and test certification.',
  },
]

export default function EngineeringPage() {
  return (
    <>
      <Section surface="graphite" divide={false} as="div">
        <div className="pt-32 pb-14 md:pt-40 md:pb-16 xl:pt-44">
          <Reveal>
            <IndexLabel label="Company / Engineering" tone="accent" />
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 max-w-[15ch] text-display-2 font-semibold text-primary">
              The railway does not close for you.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="ct-measure mt-9 text-lead text-secondary">
              Almost no S&amp;T work happens on an empty site. The line keeps carrying traffic while
              it is rebuilt around it, and the new arrangement has to be proven safe before it takes
              a single train. Everything about how the work is planned follows from that.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper">
        <Band>
          <SectionHead
            index="01"
            label="Practice"
            title="Five constraints that shape every programme."
            align="split"
          />
          <div className="mt-14 md:mt-16">
            {practices.map((p, i) => (
              <Reveal key={p.index} delay={i * 40}>
                <div className="grid grid-cols-12 gap-x-6 gap-y-2 border-t border-hairline py-7">
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
          <SectionHead
            index="02"
            label="Delivery model"
            title="One party carries the scope end to end."
            align="split"
          />
          <div className="mt-14 md:mt-16">
            <SystemSchematic schematic={epc.schematic} figureNumber="Fig. 01" />
          </div>
        </Band>
      </Section>

      <Section surface="graphite" divide={false}>
        <Band className="pt-0">
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHead index="03" label="The organisation" title="Who does the work." />
              <div className="mt-12">
                {strengths.slice(1, 4).map((s, i) => (
                  <Reveal key={s.index} delay={i * 50}>
                    <div className="border-t border-hairline py-6">
                      <h3 className="text-h4 font-medium text-primary">{s.title}</h3>
                      <p className="mt-2.5 max-w-[62ch] text-body text-secondary">{s.body}</p>
                    </div>
                  </Reveal>
                ))}
                <div className="border-t border-hairline" />
              </div>

              <Reveal delay={180}>
                <ContentSlot
                  className="mt-12"
                  lines={4}
                  spec="Organisation detail: headcount by discipline (design, installation, testing & commissioning, project management, commercial), number of concurrent project teams, typical site team composition, and in-house testing capability. Cosmictech to supply — the profile states the team is strong and in-house but gives no numbers, and none have been estimated."
                />
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={120}>
                <ImageSlot
                  ratio="4 / 5"
                  subject="Testing in progress: an engineer performing function or correspondence testing against a control table, indoors at a relay or equipment room."
                  treatment="Available light. Test equipment, terminations and documentation in frame."
                  filename="company/testing.jpg"
                  priorityNote="Priority 1"
                />
              </Reveal>
              <Reveal delay={180}>
                <ImageSlot
                  className="mt-8"
                  ratio="4 / 3"
                  subject="Outdoor installation: cable laying, signal erection or point machine fitting on a live corridor."
                  treatment="Wide. Show the corridor and the working conditions honestly."
                  filename="company/outdoor-installation.jpg"
                  priorityNote="Priority 2"
                />
              </Reveal>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            <Action href="/company/quality-safety" variant="solid">
              Quality &amp; safety
            </Action>
            <Action href="/capabilities">Capabilities</Action>
          </div>
        </Band>
      </Section>
    </>
  )
}
