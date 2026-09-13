import type { Metadata } from 'next'
import { Band, Section } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { IndexLabel, Paragraphs, SectionHead } from '@/components/primitives/Type'
import { Action, RowLink } from '@/components/primitives/Action'
import { MetricBlock, MetricRow } from '@/components/data/Metrics'
import { ImageSlot } from '@/components/content/Placeholder'
import { aboutStatements, deliveryMetrics, financials, strengths } from '@/data/company'
import { primaryNav } from '@/data/navigation'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Company',
  description:
    'Cosmictech Builders Private Limited — a railway signalling and telecommunications contractor established in 2016, delivering turnkey S&T EPC/GCC projects across Indian Railways.',
  path: '/company',
})

const sub = primaryNav.find((g) => g.label === 'Company')!.links.slice(1)

export default function CompanyPage() {
  return (
    <>
      <Section surface="graphite" divide={false} as="div">
        <div className="pt-32 pb-14 md:pt-40 md:pb-16 xl:pt-44">
          <Reveal>
            <IndexLabel label="Company" tone="accent" />
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 max-w-[17ch] text-display-2 font-semibold text-primary">
              Signalling engineers who took on the whole scope.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <div className="ct-measure mt-9">
              <Paragraphs size="lead" items={aboutStatements} />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section surface="graphite" divide={false}>
        <Band className="pt-0">
          <MetricRow>
            <MetricBlock
              size="lg"
              value={financials.fy2425.value}
              label={financials.fy2425.label}
              qualifier={financials.fy2425.qualifier}
            />
            {deliveryMetrics.slice(0, 3).map((m, i) => (
              <MetricBlock
                key={m.label}
                size="lg"
                delay={60 + i * 60}
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
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHead index="01" label="Strengths" title="What the company runs on." />
              <div className="mt-12">
                {strengths.map((s, i) => (
                  <Reveal key={s.index} delay={i * 40}>
                    <div className="border-t border-hairline py-6">
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-micro tracking-[0.14em] text-accent">
                          {s.index}
                        </span>
                        <div>
                          <h3 className="text-h4 font-medium text-primary">{s.title}</h3>
                          <p className="mt-2.5 max-w-[62ch] text-body text-secondary">{s.body}</p>
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
                  ratio="3 / 4"
                  subject="The Cosmictech team: engineers at a project office or site cabin, reviewing a signalling plan or control table."
                  treatment="Natural light, documentary. Drawings and equipment visible. Avoid boardroom staging."
                  filename="company/team-review.jpg"
                  priorityNote="Priority 1"
                />
              </Reveal>
            </div>
          </div>
        </Band>
      </Section>

      <Section surface="graphite">
        <Band>
          <SectionHead index="02" label="Explore" title="The company in detail." align="split" />
          <div className="mt-12">
            {sub.map((link, i) => (
              <Reveal key={link.href} delay={i * 50}>
                <RowLink href={link.href}>
                  <div className="grid grid-cols-12 items-baseline gap-x-6 gap-y-2 py-7">
                    <h3 className="col-span-12 text-h3 font-medium text-primary transition-colors group-hover:text-accent md:col-span-4">
                      {link.label}
                    </h3>
                    <p className="col-span-12 text-body text-secondary md:col-span-7">
                      {link.description}
                    </p>
                    <span
                      aria-hidden
                      className="col-span-12 text-tertiary transition-transform group-hover:translate-x-1 md:col-span-1 md:text-right"
                    >
                      →
                    </span>
                  </div>
                </RowLink>
              </Reveal>
            ))}
            <div className="border-t border-hairline" />
          </div>
          <div className="mt-12">
            <Action href="/contact" variant="solid">
              Contact Cosmictech
            </Action>
          </div>
        </Band>
      </Section>
    </>
  )
}
