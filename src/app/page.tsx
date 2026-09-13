import Link from 'next/link'
import type { Metadata } from 'next'
import { Action, ArrowLink, RowLink } from '@/components/primitives/Action'
import { Band, Container, Measure, Section } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { IndexLabel, Paragraphs, SectionHead } from '@/components/primitives/Type'
import { MetricBlock, MetricRow } from '@/components/data/Metrics'
import { AspectSequence } from '@/components/diagram/AspectSequence'
import { SystemCanvas } from '@/components/three/SystemCanvas'
import { ProjectRow, ProjectRowHeader } from '@/components/projects/ProjectRow'
import { PrognostixWordmark } from '@/components/brand/Brand'
import { ImageSlot, Qualifier } from '@/components/content/Placeholder'
import { capabilities } from '@/data/capabilities'
import { projectsByValue, portfolioTotals } from '@/data/projects'
import { deliveryMetrics, financials, strengths } from '@/data/company'
import { awardedProgrammes, partnerships } from '@/data/prognostix'
import { leaders } from '@/data/leadership'
import { site } from '@/data/site'
import { formatCr } from '@/lib/utils'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Railway Signalling & Deep-Tech Innovation',
  description:
    'Cosmictech Builders engineers and commissions railway signalling and telecommunications across Indian Railways — automatic signalling, electronic interlocking, axle counter and train control systems, delivered turnkey on live corridors.',
  path: '/',
})

export default function HomePage() {
  const featured = projectsByValue.slice(0, 6)

  return (
    <>
      {/* ============================================================ 01 HERO */}
      <section
        data-surface="graphite"
        aria-labelledby="hero-title"
        className="relative bg-surface pt-32 md:pt-40 xl:pt-48"
      >
        <Container>
          <Reveal>
            <IndexLabel label={site.descriptor} tone="accent" />
          </Reveal>

          {/* Headline and the readout sit on one line of the grid: the
              statement on the left, the instrument panel on the right. */}
          <div className="mt-7 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
            <Reveal delay={80} className="lg:col-span-8 xl:col-span-8">
              <h1
                id="hero-title"
                className="max-w-[13ch] text-display-1 font-semibold text-primary"
              >
                The systems that keep trains apart.
              </h1>
            </Reveal>

            <Reveal delay={200} className="lg:col-span-4 lg:self-end xl:col-span-3 xl:col-start-10">
              {/* Instrument readout: label and value on one ruled line, so
                  the column aligns regardless of how a label wraps. */}
              <dl className="border-t border-hairline-strong">
                {[
                  ['Auto section, FY 25-26', '~150 km'],
                  ['Works disclosed', String(portfolioTotals.count)],
                  ['Zones & agencies', String(portfolioTotals.zoneCodes.length)],
                  ['Established', String(site.establishedYear)],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-5 border-b border-hairline py-3.5"
                  >
                    <dt className="font-mono text-micro tracking-[0.12em] text-faint uppercase">
                      {label}
                    </dt>
                    <dd className="tabular font-display text-h3 leading-none font-semibold text-primary">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <p className="ct-measure mt-10 text-lead text-secondary md:mt-12">
              Cosmictech engineers, installs and commissions railway signalling and
              telecommunications across Indian Railways — automatic signalling, electronic
              interlocking, axle counter systems and train control. Turnkey scopes, on corridors
              that stay in traffic throughout.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-12 flex flex-wrap gap-3 md:mt-14">
              <Action href="/capabilities" variant="solid">
                Capabilities
              </Action>
              <Action href="/projects">The portfolio</Action>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-14 pb-20 md:mt-16 md:pb-28">
              <AspectSequence />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ================================================= 02 SYSTEM STACK / 3D */}
      <Section surface="graphite" id="system" labelledBy="system-title">
        <Band>
          <SectionHead
            index="01"
            label="What Cosmictech engineers"
            id="system-title"
            title="A railway is a stack, not a system."
            lede="Detection proves the line clear. Signalling turns that into an instruction. Interlocking refuses the unsafe combination. Control commands it, the network carries it, and — increasingly — intelligence reads it. Each layer is only as trustworthy as the one beneath it."
            align="split"
          />

          <div className="mt-16 md:mt-20">
            <SystemCanvas />
          </div>
        </Band>
      </Section>

      {/* ================================================== 03 CAPABILITIES */}
      <Section surface="paper" labelledBy="cap-title">
        <Band>
          <SectionHead
            index="02"
            label="Capabilities"
            id="cap-title"
            title="Eight disciplines, engineered as one scope."
            lede="Cosmictech takes responsibility from control tables through to a commissioned system. The disciplines below are the parts of that scope — and they interlock."
            align="split"
          />

          <div className="mt-14 md:mt-16">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.slug} delay={i * 40}>
                <RowLink href={`/capabilities/${cap.slug}`}>
                  <div className="grid grid-cols-12 items-baseline gap-x-6 gap-y-2 py-6 md:py-7">
                    <span className="col-span-12 font-mono text-micro tracking-[0.14em] text-accent md:col-span-1">
                      {cap.index}
                    </span>
                    <h3 className="col-span-12 text-h3 font-medium text-primary transition-colors group-hover:text-accent md:col-span-4">
                      {cap.name}
                      {cap.expansion && cap.expansion !== cap.name ? (
                        <span className="ml-2.5 font-mono text-micro tracking-[0.12em] text-tertiary">
                          {cap.expansion}
                        </span>
                      ) : null}
                    </h3>
                    <p className="col-span-12 max-w-[60ch] text-body text-secondary md:col-span-6">
                      {cap.summary}
                    </p>
                    <span
                      aria-hidden
                      className="col-span-12 text-tertiary transition-transform duration-300 ease-[var(--ease-datum)] group-hover:translate-x-1 md:col-span-1 md:text-right"
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

      {/* ========================================================= 04 SCALE */}
      <Section surface="graphite" labelledBy="scale-title">
        <Band>
          <SectionHead
            index="03"
            label="Scale"
            id="scale-title"
            title="Growth measured in commissioned kilometres."
            lede="Every figure below is taken from Cosmictech's own company profile and presented as that document states it — each metric kept distinct from the others."
            align="split"
          />

          <div className="mt-14 md:mt-16">
            <MetricRow>
              <MetricBlock
                size="lg"
                value={financials.fy2425.value}
                label={financials.fy2425.label}
                qualifier={financials.fy2425.qualifier}
              />
              <MetricBlock
                size="lg"
                delay={60}
                value={financials.fy2526Todate.value}
                label={financials.fy2526Todate.label}
                qualifier={financials.fy2526Todate.qualifier}
              />
              {deliveryMetrics.slice(0, 2).map((m, i) => (
                <MetricBlock
                  key={m.label}
                  size="lg"
                  delay={120 + i * 60}
                  value={m.value}
                  label={m.label}
                  qualifier={m.qualifier}
                />
              ))}
            </MetricRow>

            <Reveal delay={200}>
              <Qualifier className="mt-12 max-w-[76ch]">
                The portfolio published on this site lists {portfolioTotals.count} works with an
                aggregate disclosed value of ₹{formatCr(portfolioTotals.aggregateCr)} Cr —{' '}
                {portfolioTotals.completed} completed and {portfolioTotals.inProgress} under
                progress. The source describes this as an indicative list rather than a complete
                record of works undertaken.
              </Qualifier>
            </Reveal>
          </div>
        </Band>
      </Section>

      {/* ====================================================== 05 PROJECTS */}
      <Section surface="graphite" divide={false} labelledBy="proj-title">
        <Band className="pt-0">
          <SectionHead
            index="04"
            label="Selected works"
            id="proj-title"
            title={`${portfolioTotals.count} works, ${portfolioTotals.zoneCodes.length} zones and executing agencies.`}
            align="split"
          />

          <div className="mt-14 md:mt-16">
            <ProjectRowHeader />
            {featured.map((project) => (
              <ProjectRow key={project.slug} project={project} />
            ))}
            <div className="border-t border-hairline" />

            <div className="mt-10">
              <Action href="/projects">Open the project explorer</Action>
            </div>
          </div>
        </Band>
      </Section>

      {/* ==================================================== 06 ENGINEERING */}
      <Section surface="paper" labelledBy="eng-title">
        <Band>
          <SectionHead
            index="05"
            label="Engineering approach"
            id="eng-title"
            title="Brownfield, under traffic, proven before it takes over."
            lede="S&T work is almost never built on an empty site. The existing railway must stay safe and operable throughout, and the new system must be proven before it carries a single train. That constraint shapes everything about how the work is planned."
            align="split"
          />

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 md:mt-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              {strengths.map((s, i) => (
                <Reveal key={s.index} delay={i * 50}>
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
              <div className="mt-8">
                <ArrowLink href="/company/engineering">How the work is executed</ArrowLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <ImageSlot
                  ratio="4 / 5"
                  subject="Commissioning night: Cosmictech engineers at an equipment rack during a traffic block, testing an electronic interlocking before cut-over."
                  treatment="Available light, no flash. Tight on hands, terminations and test equipment. Faces incidental."
                  filename="engineering/commissioning-block.jpg"
                  priorityNote="Priority 1"
                />
              </Reveal>
            </div>
          </div>
        </Band>
      </Section>

      {/* ==================================================== 07 TECHNOLOGY */}
      <Section surface="graphite" labelledBy="tech-title">
        <Band>
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHead
                index="06"
                label="Technology"
                id="tech-title"
                title="The railway is becoming readable."
              />
              <Measure className="mt-8">
                <Paragraphs
                  size="lead"
                  items={[
                    'Electronic interlocking put the yard’s logic into software. Digital axle counters made detection self-reporting. Train control put movement authority on a data link. Each step made the railway more instrumented than the one before.',
                    'That produces something new: a corridor that generates a continuous record of its own condition and behaviour. The engineering question is no longer only how to build the system, but what to do with everything it now tells you.',
                  ]}
                />
              </Measure>
              <div className="mt-9">
                <ArrowLink href="/technology">Technology direction</ArrowLink>
              </div>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal delay={100}>
                <div className="border-t border-hairline-strong pt-6">
                  <IndexLabel label="Progression" />
                  <ol className="mt-6">
                    {[
                      ['Mechanical', 'Levers and rodding. Interlocking as physical geometry.'],
                      ['Relay', 'Interlocking as wired circuitry. Alteration means rewiring.'],
                      ['Electronic', 'Interlocking as vital software and control tables.'],
                      ['Networked', 'Authority on a data link. Corridors as connected systems.'],
                      ['Predictive', 'The system’s own data used to anticipate failure.'],
                    ].map(([title, body], i, arr) => (
                      <li key={title} className="relative flex gap-5 pb-7 last:pb-0">
                        <span className="relative flex flex-col items-center">
                          <span
                            className={`block h-2 w-2 shrink-0 ${i === arr.length - 1 ? 'bg-accent' : 'bg-steel-500'}`}
                          />
                          {i < arr.length - 1 ? (
                            <span className="mt-1 w-px flex-1 bg-hairline-strong" />
                          ) : null}
                        </span>
                        <span className="-mt-1 block">
                          <span
                            className={`block text-h4 font-medium ${i === arr.length - 1 ? 'text-accent' : 'text-primary'}`}
                          >
                            {title}
                          </span>
                          <span className="mt-1 block max-w-[40ch] text-small text-tertiary">
                            {body}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>
          </div>
        </Band>
      </Section>

      {/* =================================================== 08 PROGNOSTIX */}
      <Section surface="navy" labelledBy="prog-title">
        <Band>
          <Reveal>
            <IndexLabel index="07" label="The next layer" tone="accent" />
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal delay={60}>
                <PrognostixWordmark size="lg" />
              </Reveal>
              <Reveal delay={120}>
                <h2 id="prog-title" className="mt-8 max-w-[18ch] text-h1 font-semibold text-primary">
                  Deep-tech built by people who commissioned the railway.
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <Measure className="mt-7">
                  <Paragraphs
                    items={[
                      'In 2025 the group invested in developing next-generation deep-tech products for global railway markets, focused on railway safety, predictive maintenance and operational efficiency.',
                      'Prognostix AI holds two prototype development awards from RDSO and has entered strategic MoUs with CRIS and a leading global technology company.',
                    ]}
                  />
                </Measure>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Action href="/prognostix" variant="solid">
                    Prognostix AI
                  </Action>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal delay={160}>
                <p className="border-t border-hairline-strong pt-3 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
                  RDSO developmental awards
                </p>
                <ul className="mt-2">
                  {awardedProgrammes.map((p) => (
                    <li key={p.slug} className="border-b border-hairline py-5">
                      <Link href={`/prognostix/solutions#${p.slug}`} className="group block">
                        <span className="flex items-baseline justify-between gap-4">
                          <span className="text-h4 font-medium text-primary transition-colors group-hover:text-accent">
                            {p.abbreviation}
                          </span>
                          <span className="tabular font-mono text-small text-secondary">
                            {p.contractValue}
                          </span>
                        </span>
                        <span className="mt-1.5 block max-w-[38ch] text-small text-tertiary">
                          {p.name}
                        </span>
                        <span className="mt-2 block font-mono text-micro tracking-[0.1em] text-faint uppercase">
                          Awarded {p.awardDate} · {p.awardedBy}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
                  Strategic MoUs
                </p>
                <ul className="mt-3 space-y-2">
                  {partnerships.map((p) => (
                    <li key={p.name} className="text-small text-secondary">
                      {p.name}
                      {!p.named ? (
                        <span className="ml-2 font-mono text-micro text-faint">
                          (not named in source)
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Band>
      </Section>

      {/* ====================================================== 09 COMPANY */}
      <Section surface="graphite" labelledBy="co-title">
        <Band>
          <SectionHead
            index="08"
            label="Company"
            id="co-title"
            title="Signalling engineers, not general contractors."
            lede="Cosmictech was established in 2016 with a work for the supply and installation of axle counters in Delhi division. The in-house team spans the complete project life cycle and includes retired railway S&T engineers and signalling professionals."
            align="split"
          />

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 md:mt-16 lg:grid-cols-12">
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

          <div className="mt-12">
            <ArrowLink href="/company/leadership">Leadership in full</ArrowLink>
          </div>
        </Band>
      </Section>

      {/* ====================================================== 10 CONTACT */}
      <Section surface="paper" labelledBy="cta-title">
        <Band>
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal>
                <IndexLabel index="09" label="Contact" />
              </Reveal>
              <Reveal delay={80}>
                <h2 id="cta-title" className="mt-6 max-w-[20ch] text-display-2 font-semibold text-primary">
                  Bring us a corridor.
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <Measure className="mt-7">
                  <p className="text-lead text-secondary">
                    Automatic signalling, yard remodelling, interlocking replacement or a full
                    turnkey S&amp;T scope — tell us the section, the constraint and the date it has
                    to be in traffic.
                  </p>
                </Measure>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Action href="/contact" variant="solid">
                    Start a project enquiry
                  </Action>
                  <Action href="/careers">Work at Cosmictech</Action>
                </div>
              </Reveal>
            </div>
          </div>
        </Band>
      </Section>
    </>
  )
}
