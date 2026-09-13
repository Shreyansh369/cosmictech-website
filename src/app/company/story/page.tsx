import type { Metadata } from 'next'
import { Band, Measure, Section } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { IndexLabel, SectionHead } from '@/components/primitives/Type'
import { Action } from '@/components/primitives/Action'
import { ContentSlot, ImageSlot, Qualifier } from '@/components/content/Placeholder'
import { milestones, financials } from '@/data/company'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Story',
  description:
    'From a single axle counter installation in Delhi division in 2016 to turnkey automatic signalling corridors across Indian Railways.',
  path: '/company/story',
})

export default function StoryPage() {
  return (
    <>
      <Section surface="graphite" divide={false} as="div">
        <div className="pt-32 pb-14 md:pt-40 md:pb-16 xl:pt-44">
          <Reveal>
            <IndexLabel label="Company / Story" tone="accent" />
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 max-w-[16ch] text-display-2 font-semibold text-primary">
              It started with counting axles.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <Measure className="mt-9">
              <p className="text-lead text-secondary">
                Cosmictech Builders Pvt. Ltd. was established in 2016 with a small work: the supply
                and installation of axle counters in Delhi division. Detection is the bottom of the
                signalling stack — the layer every safety decision above it depends on. Starting
                there turned out to matter.
              </p>
            </Measure>
          </Reveal>
        </div>
      </Section>

      <Section surface="paper">
        <Band>
          <SectionHead index="01" label="Timeline" title="What the record shows." align="split" />

          <ol className="mt-14 md:mt-16">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 50}>
                <li className="grid grid-cols-12 gap-x-6 gap-y-3 border-t border-hairline py-8">
                  <div className="col-span-12 md:col-span-2">
                    <span className="tabular font-display text-h3 font-semibold text-accent">
                      {m.year}
                    </span>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <h3 className="text-h3 font-medium text-primary">{m.title}</h3>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <p className="max-w-[60ch] text-body text-secondary">{m.body}</p>
                    {m.source ? (
                      <p className="mt-3 font-mono text-micro tracking-[0.1em] text-faint uppercase">
                        Source: {m.source === 'PROFILE' ? 'Company profile' : 'Prognostix deck'}
                      </p>
                    ) : null}
                  </div>
                </li>
              </Reveal>
            ))}
            <li className="border-t border-hairline" aria-hidden />
          </ol>

          <Reveal delay={200}>
            <Qualifier className="mt-10 max-w-[74ch]">
              {financials.fy2526Todate.qualifier} The supplied profile also records ₹
              {financials.bootstrappedRevenue.value.replace('₹', '')} as revenues reached from
              inception, stated separately in the leadership section of the Prognostix deck with no
              period given. The three figures measure different things and are not combined here.
            </Qualifier>
          </Reveal>
        </Band>
      </Section>

      <Section surface="graphite">
        <Band>
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHead index="02" label="The fuller history" title="Still to be written." />
              <Reveal delay={100}>
                <ContentSlot
                  className="mt-10"
                  lines={6}
                  spec="Narrative company history. Suggested content: why the company was founded and by whom; the first contract and how it was won; the decision to move from supply-and-install into full turnkey EPC/GCC scopes; the first automatic signalling corridor; how the in-house engineering team was assembled; the supplier relationships that were built and when. Cosmictech to supply — the company profile records outcomes but not the story behind them, and none of it has been inferred here."
                />
              </Reveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={140}>
                <ImageSlot
                  ratio="4 / 5"
                  subject="Archive photograph: the earliest available Cosmictech site work, ideally the axle counter installation in Delhi division or another early project."
                  treatment="Whatever exists — an archive frame carries more weight than a new shot. Date it in the caption."
                  filename="company/archive-first-work.jpg"
                  priorityNote="Priority 2"
                />
              </Reveal>
            </div>
          </div>
          <div className="mt-14 flex flex-wrap gap-3">
            <Action href="/company/engineering" variant="solid">
              How the work is executed
            </Action>
            <Action href="/projects">The portfolio</Action>
          </div>
        </Band>
      </Section>
    </>
  )
}
