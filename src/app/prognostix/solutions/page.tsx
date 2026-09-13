import type { Metadata } from 'next'
import Link from 'next/link'
import { Band, Measure, Section } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { IndexLabel, Paragraphs, SectionHead } from '@/components/primitives/Type'
import { Action } from '@/components/primitives/Action'
import { SpecPair } from '@/components/data/Metrics'
import { ContentSlot, ImageSlot, Qualifier } from '@/components/content/Placeholder'
import { awardedProgrammes, pipeline } from '@/data/prognostix'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Solutions',
  description:
    'Machine Vision Inspection Systems (MVIS) for rolling stock and AI-Enabled Acoustic Bearing Detection (ABD) — prototype development programmes awarded by RDSO to Prognostix AI.',
  path: '/prognostix/solutions',
})

export default function SolutionsPage() {
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
                <li className="text-accent">Solutions</li>
              </ol>
            </nav>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="max-w-[16ch] text-display-2 font-semibold text-primary">
              Two products, both watching every vehicle.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <Measure className="mt-9">
              <p className="text-lead text-secondary">
                One looks at rolling stock as it passes. The other listens to it. Both are prototype
                development programmes awarded by RDSO in April 2026, and both address inspection
                tasks that currently depend on a person having enough time.
              </p>
            </Measure>
          </Reveal>
        </div>
      </Section>

      {awardedProgrammes.map((p, idx) => (
        <Section key={p.slug} surface="navy" id={p.slug}>
          <Band>
            <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Reveal>
                  <IndexLabel index={`0${idx + 1}`} label={p.ref} tone="accent" />
                </Reveal>
                <Reveal delay={60}>
                  <h2 className="mt-6 text-display-2 font-semibold text-primary">
                    {p.abbreviation}
                  </h2>
                </Reveal>
                <Reveal delay={100}>
                  <p className="mt-4 max-w-[34ch] text-h3 font-medium text-secondary">{p.name}</p>
                </Reveal>
              </div>

              <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
                <Reveal delay={140}>
                  <dl>
                    <SpecPair label="Contract value">
                      <span className="tabular font-mono">{p.contractValue}</span>
                    </SpecPair>
                    <SpecPair label="Date of award">
                      <time dateTime={p.awardDateISO} className="tabular font-mono">
                        {p.awardDate}
                      </time>
                    </SpecPair>
                    <SpecPair label="Awarded by">{p.awardedBy}</SpecPair>
                    <SpecPair label="Stage">Prototype development</SpecPair>
                  </dl>
                </Reveal>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <Reveal as="datum">
                  <div className="h-px w-full bg-hairline-strong" />
                </Reveal>
                <Reveal delay={60}>
                  <IndexLabel label="The problem" className="mt-5" />
                </Reveal>
                <Reveal delay={100}>
                  <Paragraphs items={p.problem} className="mt-7" />
                </Reveal>
              </div>

              <div className="lg:col-span-5 lg:col-start-8">
                <Reveal as="datum">
                  <div className="h-px w-full bg-hairline-strong" />
                </Reveal>
                <Reveal delay={60}>
                  <IndexLabel label="The approach" className="mt-5" />
                </Reveal>
                <Reveal delay={100}>
                  <Paragraphs items={p.approach} className="mt-7" />
                </Reveal>
              </div>
            </div>

            <Reveal delay={140}>
              <blockquote className="mt-14 border-l-2 border-accent pl-6">
                <p className="max-w-[70ch] text-body text-primary">{p.description}</p>
                <footer className="mt-4 font-mono text-micro tracking-[0.12em] text-tertiary uppercase">
                  Scope as recorded in the award
                </footer>
              </blockquote>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Reveal delay={100}>
                  <ContentSlot
                    lines={5}
                    spec={`Technical specification for ${p.abbreviation}: sensing hardware and its siting, operating speed range and environmental envelope, detection classes covered, model architecture in outline, accuracy and false-positive targets, integration with existing maintenance systems, and prototype trial plan. The supplied deck states the award, the value and a one-sentence scope; nothing beyond that is available, and nothing has been assumed.`}
                  />
                </Reveal>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <Reveal delay={140}>
                  <ImageSlot
                    ratio="4 / 3"
                    subject={
                      p.slug === 'mvis'
                        ? 'MVIS installation: camera and lighting array at the examination point, and/or a real captured frame with model detections drawn on it.'
                        : 'ABD installation: the wayside acoustic array beside the running line, and/or a spectrogram showing a healthy against a defective bearing signature.'
                    }
                    treatment="Use genuine system output. A fabricated visualisation would undermine the claim it illustrates."
                    filename={`prognostix/${p.slug}-system.jpg`}
                    priorityNote="Priority 1"
                  />
                </Reveal>
              </div>
            </div>
          </Band>
        </Section>
      ))}

      <Section surface="navy" divide={false}>
        <Band className="pt-0">
          <SectionHead index="03" label="In development" title="What comes next." align="split" />
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ul>
                {pipeline.map((item, i) => (
                  <Reveal key={item.name} delay={i * 60}>
                    <li className="border-t border-hairline py-7">
                      <h3 className="text-h3 font-medium text-primary">{item.name}</h3>
                      {item.abbreviation ? (
                        <p className="mt-2 font-mono text-micro tracking-[0.14em] text-accent uppercase">
                          {item.abbreviation}
                        </p>
                      ) : null}
                    </li>
                  </Reveal>
                ))}
                <li className="border-t border-hairline" aria-hidden />
              </ul>
              <Qualifier className="mt-8 max-w-[68ch]">
                These are named in the supplied material as a portfolio the company is next working
                on. No capability, specification or availability is claimed for either, because the
                source states none.
              </Qualifier>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            <Action href="/prognostix/contact" variant="solid">
              Talk to the team
            </Action>
            <Action href="/prognostix/technology">The technology stack</Action>
          </div>
        </Band>
      </Section>
    </>
  )
}
