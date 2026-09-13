import type { Metadata } from 'next'
import { Band, Measure, Section } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { IndexLabel, Paragraphs, SectionHead } from '@/components/primitives/Type'
import { Action, ArrowLink } from '@/components/primitives/Action'
import { CorridorDiagram } from '@/components/three/CorridorDiagram'
import { ContentSlot } from '@/components/content/Placeholder'
import { PrognostixWordmark } from '@/components/brand/Brand'
import { systemLayers } from '@/data/systemLayers'
import { technologyDomains, pipeline } from '@/data/prognostix'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Technology',
  description:
    'Where Cosmictech is heading: from railway infrastructure through systems engineering to digital intelligence, and the deep-tech products being built at Prognostix AI.',
  path: '/technology',
})

export default function TechnologyPage() {
  return (
    <>
      <Section surface="graphite" divide={false} as="div">
        <div className="pt-32 pb-14 md:pt-40 md:pb-16 xl:pt-44">
          <Reveal>
            <IndexLabel label="Technology" tone="accent" />
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 max-w-[15ch] text-display-2 font-semibold text-primary">
              Every upgrade made the railway more readable.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <Measure className="mt-9">
              <Paragraphs
                size="lead"
                items={[
                  'Mechanical interlocking was geometry. Relay interlocking was circuitry. Electronic interlocking put the yard’s logic into inspectable software. Digital axle counters made detection self-reporting. Train control put movement authority onto a data link.',
                  'None of those changes were made in order to produce data. But each one did, and the cumulative result is a corridor that continuously describes its own state.',
                ]}
              />
            </Measure>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper">
        <Band>
          <SectionHead
            index="01"
            label="The stack, from the top"
            title="Intelligence is a layer, not a replacement."
            lede="Nothing above removes the need for what sits beneath. A predictive model is worth exactly as much as the detection, interlocking and network that feed it — which is why the companies best placed to build it are the ones that built those."
            align="split"
          />

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 md:mt-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <CorridorDiagram activeLayer="intelligence" />
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <ol className="border-t border-hairline-strong">
                {[...systemLayers].reverse().map((layer, i) => (
                  <Reveal key={layer.id} delay={i * 35}>
                    <li className="border-b border-hairline py-4">
                      <div className="flex items-baseline gap-4">
                        <span
                          className={`font-mono text-micro tracking-[0.12em] ${layer.id === 'intelligence' ? 'text-accent' : 'text-faint'}`}
                        >
                          {layer.index}
                        </span>
                        <div className="flex-1">
                          <h3
                            className={`text-h4 font-medium ${layer.id === 'intelligence' ? 'text-accent' : 'text-primary'}`}
                          >
                            {layer.name}
                          </h3>
                          <p className="mt-1 text-small text-tertiary">{layer.role}</p>
                        </div>
                        {layer.href ? (
                          <ArrowLink href={layer.href} tone="primary" className="shrink-0">
                            {layer.hrefLabel}
                          </ArrowLink>
                        ) : null}
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Band>
      </Section>

      <Section surface="graphite">
        <Band>
          <SectionHead
            index="02"
            label="Direction"
            title="What the group decided to build."
            align="split"
          />

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 md:mt-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Paragraphs
                items={[
                  'In 2025 the group invested in developing next-generation deep-tech products for global railway markets, with a focus on advancing railway safety, predictive maintenance and operational efficiency.',
                  'That work is carried out by Prognostix AI, which holds two prototype development awards from RDSO and has entered strategic MoUs with CRIS and a leading global technology company.',
                ]}
              />
              <div className="mt-9 flex flex-wrap gap-3">
                <Action href="/prognostix" variant="solid">
                  Prognostix AI
                </Action>
                <Action href="/prognostix/solutions">The products</Action>
              </div>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <p className="border-t border-hairline-strong pt-3 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
                Technology domains
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-3">
                {technologyDomains.map((d) => (
                  <li
                    key={d}
                    className="border border-hairline-strong px-3.5 py-2 font-mono text-micro tracking-[0.1em] text-secondary uppercase"
                  >
                    {d}
                  </li>
                ))}
              </ul>

              <p className="mt-10 border-t border-hairline-strong pt-3 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
                In development
              </p>
              <ul className="mt-5 space-y-3">
                {pipeline.map((item) => (
                  <li key={item.name} className="text-body text-secondary">
                    {item.name}
                    {item.abbreviation ? (
                      <span className="ml-2 font-mono text-micro tracking-[0.12em] text-faint">
                        {item.abbreviation}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-micro tracking-[0.1em] text-faint uppercase">
                Stated in the supplied material as work the company is next undertaking
              </p>
            </div>
          </div>
        </Band>
      </Section>

      <Section surface="paper">
        <Band>
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHead index="03" label="Roadmap" title="What comes after the prototypes." />
              <Reveal delay={100}>
                <ContentSlot
                  className="mt-10"
                  lines={5}
                  spec="Technology roadmap beyond the two RDSO prototype awards: target dates for prototype completion and field trial, the route from prototype to production deployment, intended international markets, and how the deep-tech products are expected to connect back to Cosmictech's S&T delivery business. The supplied material names the pipeline but sets out no dates or milestones, so none are stated here."
                />
              </Reveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <Reveal delay={140}>
                <div className="border-t border-hairline-strong pt-6">
                  <PrognostixWordmark size="md" />
                  <p className="mt-4 text-body text-secondary">
                    The group’s deep-tech arm, working one layer above the signalling systems
                    Cosmictech installs.
                  </p>
                  <ArrowLink href="/prognostix" className="mt-6">
                    Go to Prognostix
                  </ArrowLink>
                </div>
              </Reveal>
            </div>
          </div>
        </Band>
      </Section>
    </>
  )
}
