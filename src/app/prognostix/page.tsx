import type { Metadata } from 'next'
import Link from 'next/link'
import { Band, Measure, Section } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { IndexLabel, Paragraphs, SectionHead } from '@/components/primitives/Type'
import { Action, ArrowLink, RowLink } from '@/components/primitives/Action'
import { PrognostixWordmark, Wordmark } from '@/components/brand/Brand'
import { ImageSlot, Qualifier } from '@/components/content/Placeholder'
import { awardedProgrammes, partnerships, pipeline, technologyDomains } from '@/data/prognostix'
import { leaders } from '@/data/leadership'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Prognostix AI',
  description:
    'Prognostix AI is the deep-tech arm of the Cosmictech group, developing machine vision inspection and AI-enabled acoustic bearing detection for Indian Railways under RDSO award.',
  path: '/prognostix',
})

/**
 * The Prognostix experience runs on the navy surface throughout. The change
 * of ground is the transition: the reader crosses from the company that
 * builds the railway to the company that reads it, and the interface says so
 * before the copy does.
 */
export default function PrognostixPage() {
  return (
    <>
      <Section surface="navy" divide={false} as="div">
        <div className="pt-32 pb-16 md:pt-40 md:pb-20 xl:pt-44">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
              <Link href="/" className="transition-colors hover:text-accent">
                Cosmictech Group
              </Link>
              <span aria-hidden className="h-px w-8 bg-hairline-strong" />
              <span className="text-accent">Deep-tech</span>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="mt-10">
              <PrognostixWordmark size="lg" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-10 max-w-[15ch] text-display-2 font-semibold text-primary">
              The railway already tells you it is failing.
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <Measure className="mt-9">
              <p className="text-lead text-secondary">
                A spalling bearing makes a sound months before it makes heat. A brake block past
                limit is visible on every pass through the yard. The information exists. What has
                been missing is something that listens and looks at every vehicle, every time.
              </p>
            </Measure>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-11 flex flex-wrap gap-3">
              <Action href="/prognostix/solutions" variant="solid">
                The products
              </Action>
              <Action href="/prognostix/contact">Talk to the team</Action>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Awards — the credibility anchor */}
      <Section surface="navy">
        <Band>
          <SectionHead
            index="01"
            label="Awarded by RDSO"
            title="Two prototype development contracts, both awarded in April 2026."
            align="split"
          />

          <div className="mt-14 md:mt-16">
            {awardedProgrammes.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <RowLink href={`/prognostix/solutions#${p.slug}`}>
                  <div className="grid grid-cols-12 gap-x-6 gap-y-4 py-9">
                    <span className="col-span-12 font-mono text-micro tracking-[0.14em] text-accent md:col-span-1">
                      {p.ref}
                    </span>
                    <div className="col-span-12 md:col-span-5">
                      <h3 className="text-h2 font-semibold text-primary transition-colors group-hover:text-accent">
                        {p.abbreviation}
                      </h3>
                      <p className="mt-2 max-w-[34ch] text-body text-secondary">{p.name}</p>
                    </div>
                    <div className="col-span-6 md:col-span-2">
                      <p className="font-mono text-micro tracking-[0.14em] text-faint uppercase">
                        Contract value
                      </p>
                      <p className="tabular mt-2 font-display text-h3 font-semibold text-primary">
                        {p.contractValue}
                      </p>
                    </div>
                    <div className="col-span-6 md:col-span-3">
                      <p className="font-mono text-micro tracking-[0.14em] text-faint uppercase">
                        Date of award
                      </p>
                      <p className="tabular mt-2 font-mono text-body text-primary">
                        <time dateTime={p.awardDateISO}>{p.awardDate}</time>
                      </p>
                      <p className="mt-1 font-mono text-micro tracking-[0.1em] text-tertiary uppercase">
                        {p.awardedBy}
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className="col-span-12 self-end text-tertiary transition-transform group-hover:translate-x-1 md:col-span-1 md:text-right"
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

      {/* Why this company */}
      <Section surface="navy" divide={false}>
        <Band className="pt-0">
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHead
                index="02"
                label="Why this team"
                title="Domain first, model second."
              />
              <Measure className="mt-10">
                <Paragraphs
                  items={[
                    'Railway deep-tech fails for a predictable reason: the people who can build the model have never stood in a yard at two in the morning, and the people who have are not building models.',
                    'Prognostix sits inside a group that has commissioned signalling on live corridors since 2016. The constraint that matters — what an examination point actually looks like, how much time an inspector really has, what the acoustic environment of a passing train does to a signal — is institutional knowledge here rather than a discovery to be made in the field.',
                  ]}
                />
              </Measure>
              <ArrowLink href="/company" className="mt-8">
                The parent company
              </ArrowLink>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal delay={120}>
                <p className="border-t border-hairline-strong pt-3 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
                  Strategic MoUs
                </p>
                <ul className="mt-6 space-y-6">
                  {partnerships.map((p) => (
                    <li key={p.name} className="border-b border-hairline pb-6">
                      <h3 className="text-h4 font-medium text-primary">{p.name}</h3>
                      <p className="mt-2 max-w-[42ch] text-small text-secondary">{p.note}</p>
                    </li>
                  ))}
                </ul>
                <Qualifier className="mt-6">
                  The second organisation is described in the supplied material only as “a leading
                  global technology company” and is not named. It is not named here either.
                </Qualifier>
              </Reveal>
            </div>
          </div>
        </Band>
      </Section>

      {/* Pipeline + domains */}
      <Section surface="navy">
        <Band>
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHead index="03" label="Next" title="The portfolio in development." />
              <ul className="mt-10">
                {pipeline.map((item, i) => (
                  <Reveal key={item.name} delay={i * 60}>
                    <li className="border-t border-hairline py-6">
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
              <Qualifier className="mt-7">
                Listed in the supplied material as a portfolio of deep-tech solutions the company is
                next working on. No specification, timeline or capability claim is made for either.
              </Qualifier>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <p className="border-t border-hairline-strong pt-3 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
                Technology domains
              </p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {technologyDomains.map((d) => (
                  <li
                    key={d}
                    className="border border-hairline-strong px-3.5 py-2 font-mono text-micro tracking-[0.1em] text-secondary uppercase"
                  >
                    {d}
                  </li>
                ))}
              </ul>
              <ArrowLink href="/prognostix/technology" className="mt-8">
                How the stack is used
              </ArrowLink>

              <Reveal delay={140}>
                <ImageSlot
                  className="mt-10"
                  ratio="16 / 9"
                  subject="MVIS in the field: the camera and illumination array installed at an examination point, or a captured underframe frame with detections overlaid."
                  treatment="If showing detections, use a real inference output rather than a mock-up."
                  filename="prognostix/mvis-field.jpg"
                  priorityNote="Priority 1"
                />
              </Reveal>
            </div>
          </div>
        </Band>
      </Section>

      {/* Leadership — CTO foregrounded here */}
      <Section surface="navy" divide={false}>
        <Band className="pt-0">
          <SectionHead index="04" label="Leadership" title="Who is building it." align="split" />
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
            {leaders.map((leader, i) => (
              <Reveal key={leader.slug} delay={i * 70} className="lg:col-span-4">
                <div className="border-t border-hairline-strong pt-6">
                  <h3 className="text-h3 font-medium text-primary">{leader.name}</h3>
                  <p className="mt-1.5 font-mono text-micro tracking-[0.14em] text-accent uppercase">
                    {leader.title}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {leader.points.map((point) => (
                      <li key={point} className="flex gap-3 text-small text-secondary">
                        <span aria-hidden className="mt-2 block h-px w-3 shrink-0 bg-steel-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 font-mono text-micro text-faint">
                    {leader.education.join(' · ')}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Band>
      </Section>

      {/* Return to the parent */}
      <Section surface="graphite">
        <Band>
          <div className="grid grid-cols-1 items-center gap-x-10 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <IndexLabel index="05" label="Back to the group" />
              <h2 className="mt-6 max-w-[20ch] text-h1 font-semibold text-primary">
                Prognostix reads the railway. Cosmictech builds it.
              </h2>
              <div className="mt-9 flex flex-wrap gap-3">
                <Action href="/" variant="solid">
                  Cosmictech
                </Action>
                <Action href="/prognostix/contact">Contact Prognostix</Action>
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Wordmark />
            </div>
          </div>
        </Band>
      </Section>
    </>
  )
}
