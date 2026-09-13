import type { Metadata } from 'next'
import { Band, Container, Section } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { IndexLabel, SectionHead } from '@/components/primitives/Type'
import { Action, RowLink } from '@/components/primitives/Action'
import { CorridorDiagram } from '@/components/three/CorridorDiagram'
import { capabilities } from '@/data/capabilities'
import { projectsBySystem } from '@/data/projects'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Capabilities',
  description:
    'Eight connected disciplines of railway signalling and telecommunications engineering — automatic signalling, electronic interlocking, MSDAC, BPAC, train control, S&T, telecommunications and turnkey EPC/GCC delivery.',
  path: '/capabilities',
})

export default function CapabilitiesIndexPage() {
  return (
    <>
      <Section surface="graphite" divide={false} as="div">
        <div className="pt-32 pb-4 md:pt-40 xl:pt-44">
          <Reveal>
            <IndexLabel label="Capabilities" tone="accent" />
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 max-w-[17ch] text-display-2 font-semibold text-primary">
              Eight disciplines that only work together.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="ct-measure mt-8 text-lead text-secondary">
              Detection feeds interlocking. Interlocking feeds signalling. Train control depends on
              both, and the network carries all of it. Cosmictech engineers across the whole stack,
              which is what makes single-responsibility turnkey scopes possible in the first place.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* The stack, as an orientation drawing */}
      <Section surface="graphite" divide={false}>
        <Band className="pt-10 md:pt-14">
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-7 xl:col-span-7">
              <p className="border-t border-hairline-strong pt-3 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
                Fig. 01 — Where each discipline sits
              </p>
              <div className="mt-8">
                <CorridorDiagram activeLayer={null} />
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-body text-secondary">
                The drawing opposite is the same lattice used throughout this site: the corridor at
                the base, the signalling stack above it, and a riser at every block section boundary
                tying the layers together.
              </p>
              <p className="mt-5 text-body text-secondary">
                Each capability below occupies one or more of those layers. Follow any of them to
                its own system architecture, its engineering scope, and the works in the portfolio
                that used it.
              </p>
            </div>
          </div>
        </Band>
      </Section>

      {/* The register of capabilities */}
      <Section surface="paper">
        <Band>
          <SectionHead
            index="01"
            label="The register"
            title="Every discipline, in the order the railway uses it."
            align="split"
          />

          <div className="mt-14 md:mt-16">
            {capabilities.map((cap, i) => {
              const linked = cap.systemTag ? projectsBySystem(cap.systemTag).length : 0
              return (
                <Reveal key={cap.slug} delay={i * 40}>
                  <RowLink href={`/capabilities/${cap.slug}`}>
                    <div className="grid grid-cols-12 gap-x-6 gap-y-3 py-8 md:py-10">
                      <span className="col-span-12 font-mono text-micro tracking-[0.14em] text-accent md:col-span-1">
                        {cap.index}
                      </span>

                      <div className="col-span-12 md:col-span-4">
                        <h2 className="text-h2 font-medium text-primary transition-colors group-hover:text-accent">
                          {cap.name}
                        </h2>
                        {cap.expansion && cap.expansion !== cap.name ? (
                          <p className="mt-2 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
                            {cap.expansion}
                          </p>
                        ) : null}
                      </div>

                      <div className="col-span-12 md:col-span-6">
                        <p className="max-w-[58ch] text-body text-secondary">{cap.lede}</p>
                        {linked > 0 ? (
                          <p className="mt-4 font-mono text-micro tracking-[0.12em] text-tertiary uppercase">
                            {linked} {linked === 1 ? 'work' : 'works'} in the portfolio
                          </p>
                        ) : null}
                      </div>

                      <span
                        aria-hidden
                        className="col-span-12 self-end text-tertiary transition-transform duration-300 ease-[var(--ease-datum)] group-hover:translate-x-1 md:col-span-1 md:text-right"
                      >
                        →
                      </span>
                    </div>
                  </RowLink>
                </Reveal>
              )
            })}
            <div className="border-t border-hairline" />
          </div>
        </Band>
      </Section>

      <Section surface="graphite">
        <Band>
          <Container as="div" className="!px-0">
            <h2 className="max-w-[20ch] text-h1 font-semibold text-primary">
              Scoping a corridor or a yard?
            </h2>
            <p className="ct-measure mt-6 text-lead text-secondary">
              Tell us the section, the constraint and the date it has to be in traffic.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Action href="/contact" variant="solid">
                Start a project enquiry
              </Action>
              <Action href="/projects">See the portfolio</Action>
            </div>
          </Container>
        </Band>
      </Section>
    </>
  )
}
