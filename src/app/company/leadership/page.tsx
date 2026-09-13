import type { Metadata } from 'next'
import { Band, Section } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { IndexLabel, SectionHead } from '@/components/primitives/Type'
import { Action } from '@/components/primitives/Action'
import { ContentSlot, ImageSlot, Qualifier } from '@/components/content/Placeholder'
import { leaders } from '@/data/leadership'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Leadership',
  description:
    'The people accountable for delivery at Cosmictech and Prognostix AI — leadership drawn from Indian Railways S&T and from data science and AI.',
  path: '/company/leadership',
})

export default function LeadershipPage() {
  return (
    <>
      <Section surface="graphite" divide={false} as="div">
        <div className="pt-32 pb-14 md:pt-40 md:pb-16 xl:pt-44">
          <Reveal>
            <IndexLabel label="Company / Leadership" tone="accent" />
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 max-w-[18ch] text-display-2 font-semibold text-primary">
              Forty years of Indian Railways, and a research stack.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="ct-measure mt-9 text-lead text-secondary">
              Cosmictech is led by people who ran S&amp;T inside Indian Railways before they
              contracted to it. Prognostix adds a technology leadership that came from the other
              direction entirely.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Editorial rows rather than team cards: each leader gets a full band. */}
      <Section surface="paper">
        <Band>
          {leaders.map((leader, i) => (
            <Reveal key={leader.slug} delay={i * 60}>
              <article
                className={`grid grid-cols-1 gap-x-10 gap-y-8 border-t border-hairline-strong py-14 lg:grid-cols-12 ${i === 0 ? 'pt-0' : ''}`}
              >
                <div className="lg:col-span-3">
                  <ImageSlot
                    ratio="4 / 5"
                    subject={`Portrait of ${leader.name}, ${leader.title}.`}
                    treatment="Environmental portrait on site or in the project office, not a studio headshot. Available light, neutral expression, eye-level."
                    filename={`leadership/${leader.slug}.jpg`}
                    priorityNote="Priority 1"
                  />
                </div>

                <div className="lg:col-span-5">
                  <h2 className="text-h1 font-semibold text-primary">{leader.name}</h2>
                  <p className="mt-3 font-mono text-meta tracking-[0.16em] text-accent uppercase">
                    {leader.title}
                  </p>
                  <p className="mt-1.5 font-mono text-micro tracking-[0.12em] text-tertiary uppercase">
                    {leader.context}
                  </p>

                  <ul className="mt-9 space-y-4">
                    {leader.points.map((point) => (
                      <li key={point} className="flex gap-4 text-body text-secondary">
                        <span aria-hidden className="mt-2.5 block h-px w-4 shrink-0 bg-accent" />
                        <span className="max-w-[52ch]">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-3 lg:col-start-10">
                  <p className="border-t border-hairline-strong pt-3 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
                    Education
                  </p>
                  <ul className="mt-4 space-y-2">
                    {leader.education.map((e) => (
                      <li key={e} className="text-small text-secondary">
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
          <div className="border-t border-hairline-strong" />

          <Reveal delay={200}>
            <Qualifier className="mt-10 max-w-[74ch]">
              Biographies above are reproduced from the leadership page of the supplied Prognostix
              AI presentation, statement for statement. Nothing has been added, expanded or
              rephrased.
            </Qualifier>
          </Reveal>
        </Band>
      </Section>

      <Section surface="graphite">
        <Band>
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHead index="01" label="Wider team" title="Beyond the board." />
              <Reveal delay={100}>
                <ContentSlot
                  className="mt-10"
                  lines={5}
                  spec="Senior management and engineering leadership below board level: heads of projects, design, testing & commissioning, procurement and quality — names, titles, and one-line backgrounds. The supplied Prognostix deck contains a 'Team' slide with no readable content, so nothing could be transcribed. Cosmictech to supply."
                />
              </Reveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={140}>
                <ImageSlot
                  ratio="1 / 1"
                  subject="The wider Cosmictech team on site or at the project office."
                  treatment="Group documentary frame. Working environment, not a formal line-up."
                  filename="company/wider-team.jpg"
                  priorityNote="Priority 2"
                />
              </Reveal>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            <Action href="/careers" variant="solid">
              Work at Cosmictech
            </Action>
            <Action href="/prognostix">Prognostix AI</Action>
          </div>
        </Band>
      </Section>
    </>
  )
}
