import type { Metadata } from 'next'
import Link from 'next/link'
import { Band, Measure, Section } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { Paragraphs, SectionHead } from '@/components/primitives/Type'
import { Action } from '@/components/primitives/Action'
import { SystemSchematic } from '@/components/diagram/SystemSchematic'
import { ContentSlot, Qualifier } from '@/components/content/Placeholder'
import { technologyDomains } from '@/data/prognostix'
import type { Schematic } from '@/data/schematic'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Technology',
  description:
    'The technology stack behind Prognostix AI: machine learning, computer vision, signal processing, embedded systems, IoT and electronics applied to railway inspection.',
  path: '/prognostix/technology',
})

/**
 * Wayside inspection pipeline. This is the generic architecture of any
 * wayside condition-monitoring installation — sensing, edge, model,
 * decision — not a description of a specific Prognostix implementation,
 * which the supplied material does not set out.
 */
const pipelineSchematic: Schematic = {
  caption: 'Wayside inspection pipeline — sensing through to maintenance decision',
  nodes: [
    { id: 'veh', label: 'Passing Vehicle', note: 'At line speed', x: 9, y: 78, kind: 'field' },
    { id: 'sens', label: 'Sensor Array', note: 'Optical / acoustic', x: 30, y: 78, kind: 'trackside' },
    { id: 'trig', label: 'Trigger', note: 'Wheel detection', x: 30, y: 40, kind: 'trackside' },
    { id: 'edge', label: 'Edge Compute', note: 'Capture & condition', x: 52, y: 58, kind: 'indoor' },
    { id: 'model', label: 'Inference', note: 'Deep-learning models', x: 72, y: 34, kind: 'intelligence' },
    { id: 'store', label: 'Data Store', note: 'Per-vehicle history', x: 72, y: 80, kind: 'network' },
    { id: 'dec', label: 'Maintenance Decision', note: 'Human in the loop', x: 92, y: 58, kind: 'control' },
  ],
  links: [
    { from: 'veh', to: 'sens', kind: 'data' },
    { from: 'trig', to: 'edge', kind: 'command' },
    { from: 'sens', to: 'edge', kind: 'data' },
    { from: 'edge', to: 'model', kind: 'data' },
    { from: 'edge', to: 'store', kind: 'data' },
    { from: 'model', to: 'dec', kind: 'command' },
    { from: 'store', to: 'model', kind: 'data' },
    { from: 'store', to: 'dec', kind: 'data', ortho: true },
  ],
}

const disciplines = [
  {
    index: '01',
    title: 'Sensing under real conditions',
    body: 'A wayside instrument has to work on a vehicle moving at line speed, in dust, rain, heat and vibration, at night, with no cooperation from the train. The sensing design — siting, triggering, illumination, isolation from track noise — determines whether there is any signal for a model to work on at all.',
  },
  {
    index: '02',
    title: 'Edge computation',
    body: 'Capture happens in the few seconds a rake takes to pass. That has to be handled locally: triggering on wheel detection, capturing at rate, conditioning the signal and deciding what is worth transmitting. The bearer network from a wayside site is rarely generous.',
  },
  {
    index: '03',
    title: 'Models trained on defects',
    body: 'Defect data is scarce by definition — the whole point is that most vehicles are sound. Training therefore depends on careful class balance, on augmentation that reflects real failure modes, and on evaluating against the cost of a miss rather than raw accuracy.',
  },
  {
    index: '04',
    title: 'Decisions, not alerts',
    body: 'An inspection system that produces false positives at any meaningful rate will be ignored within a month. The output has to be a ranked, evidenced recommendation that a maintenance organisation can act on, with the underlying capture available for the examiner to check.',
  },
]

export default function PrognostixTechnologyPage() {
  return (
    <>
      <Section surface="navy" divide={false} as="div">
        <div className="pt-32 pb-14 md:pt-40 md:pb-16 xl:pt-44">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2.5 font-mono text-micro tracking-[0.12em] text-tertiary uppercase">
                <li>
                  <Link href="/prognostix" className="transition-colors hover:text-accent">
                    Prognostix AI
                  </Link>
                </li>
                <li aria-hidden className="text-faint">
                  /
                </li>
                <li className="text-accent">Technology</li>
              </ol>
            </nav>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="max-w-[16ch] text-display-2 font-semibold text-primary">
              The hard part is not the model.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <Measure className="mt-9">
              <Paragraphs
                size="lead"
                items={[
                  'Every wayside inspection system is four problems stacked on each other: getting a usable signal off a vehicle at speed, processing it in the seconds available, classifying it against defects that are rare by construction, and producing something a maintenance organisation will actually act on.',
                  'The classifier is the part that gets written about. It is rarely the part that decides whether the installation works.',
                ]}
              />
            </Measure>
          </Reveal>
        </div>
      </Section>

      <Section surface="navy">
        <Band>
          <SectionHead
            index="01"
            label="Pipeline"
            title="From a passing vehicle to a maintenance decision."
            align="split"
          />
          <div className="mt-14 md:mt-16">
            <SystemSchematic schematic={pipelineSchematic} figureNumber="Fig. 01" />
          </div>
          <Qualifier className="mt-10 max-w-[74ch]">
            The drawing above sets out the generic architecture of a wayside condition-monitoring
            installation. It is not a specification of a Prognostix implementation — the supplied
            material does not describe one, and none has been invented.
          </Qualifier>
        </Band>
      </Section>

      <Section surface="navy" divide={false}>
        <Band className="pt-0">
          <SectionHead index="02" label="Disciplines" title="Where the difficulty lives." align="split" />
          <div className="mt-14 md:mt-16">
            {disciplines.map((d, i) => (
              <Reveal key={d.index} delay={i * 40}>
                <div className="grid grid-cols-12 gap-x-6 gap-y-2 border-t border-hairline py-8">
                  <span className="col-span-12 font-mono text-micro tracking-[0.14em] text-accent md:col-span-1">
                    {d.index}
                  </span>
                  <h2 className="col-span-12 text-h3 font-medium text-primary md:col-span-4">
                    {d.title}
                  </h2>
                  <p className="col-span-12 max-w-[64ch] text-body text-secondary md:col-span-7">
                    {d.body}
                  </p>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-hairline" />
          </div>
        </Band>
      </Section>

      <Section surface="navy">
        <Band>
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHead index="03" label="Domains" title="What the team works in." />
              <ul className="mt-10 flex flex-wrap gap-2.5">
                {technologyDomains.map((d) => (
                  <li
                    key={d}
                    className="border border-hairline-strong px-3.5 py-2 font-mono text-micro tracking-[0.1em] text-secondary uppercase"
                  >
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-mono text-micro tracking-[0.1em] text-faint uppercase">
                Listed as stated in the supplied material
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={100}>
                <ContentSlot
                  lines={5}
                  spec="Engineering detail: model architectures and frameworks in use, training data sources and volumes, edge hardware platform, deployment and MLOps arrangement, data governance and retention policy, and how models are revalidated after deployment. The supplied deck lists technology domains only, with no implementation detail, so nothing further is described here."
                />
              </Reveal>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            <Action href="/prognostix/solutions" variant="solid">
              The products
            </Action>
            <Action href="/prognostix/contact">Talk to the team</Action>
          </div>
        </Band>
      </Section>
    </>
  )
}
