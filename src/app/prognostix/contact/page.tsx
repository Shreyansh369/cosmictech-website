import type { Metadata } from 'next'
import Link from 'next/link'
import { Band, Measure, Section } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { PrognostixWordmark } from '@/components/brand/Brand'
import { Channel } from '@/components/content/Channel'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { contactChannels } from '@/data/site'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Contact Prognostix',
  description:
    'Contact Prognostix AI about railway machine vision inspection, acoustic bearing detection, predictive maintenance and research collaboration.',
  path: '/prognostix/contact',
})

const enquiryTypes = [
  'Machine vision inspection (MVIS)',
  'Acoustic bearing detection (ABD)',
  'Predictive maintenance',
  'Research collaboration or MoU',
  'Pilot or field trial',
  'Supplier or technology partnership',
  'Careers',
  'Other',
]

export default function PrognostixContactPage() {
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
                <li className="text-accent">Contact</li>
              </ol>
            </nav>
          </Reveal>
          <Reveal delay={60}>
            <PrognostixWordmark size="lg" />
          </Reveal>
          <Reveal delay={110}>
            <h1 className="mt-9 max-w-[16ch] text-display-2 font-semibold text-primary">
              Bring us a failure mode.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <Measure className="mt-8">
              <p className="text-lead text-secondary">
                Operators, research organisations and technology partners: if you have an inspection
                or condition-monitoring problem with a real cost attached to it, describe the
                problem rather than the solution you had in mind.
              </p>
            </Measure>
          </Reveal>
        </div>
      </Section>

      <Section surface="navy" divide={false}>
        <Band className="pt-0">
          <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="border-t border-hairline-strong pt-3 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
                Enquiry
              </h2>
              <div className="mt-10">
                <EnquiryForm
                  destination={contactChannels.generalEmail}
                  subjectPrefix="Prognostix enquiry"
                  enquiryTypes={enquiryTypes}
                />
              </div>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <h2 className="border-t border-hairline-strong pt-3 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
                Direct channels
              </h2>
              <dl className="mt-6">
                <Channel
                  label="Prognostix enquiries"
                  value={null}
                  href={(v) => `mailto:${v}`}
                  spec="Dedicated Prognostix AI email address, if separate from the Cosmictech address."
                />
                <Channel
                  label="Research & partnerships"
                  value={null}
                  href={(v) => `mailto:${v}`}
                  spec="Address for MoU, collaboration and academic enquiries."
                />
                <Channel
                  label="Office"
                  value={null}
                  spec="Prognostix AI office address, if separate from the Cosmictech office."
                />
              </dl>

              <div className="mt-12 border-t border-hairline-strong pt-6">
                <p className="text-body text-secondary">
                  For railway signalling and telecommunications works, the enquiry belongs with the
                  parent company.
                </p>
                <Link
                  href="/contact"
                  className="group mt-5 inline-flex items-center gap-2.5 font-mono text-meta tracking-[0.12em] text-accent uppercase"
                >
                  Contact Cosmictech
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </aside>
          </div>
        </Band>
      </Section>
    </>
  )
}
