import type { Metadata } from 'next'
import { Band, Measure, Section } from '@/components/primitives/Layout'
import { Reveal } from '@/components/primitives/Reveal'
import { IndexLabel, SectionHead } from '@/components/primitives/Type'
import { ArrowLink } from '@/components/primitives/Action'
import { Channel } from '@/components/content/Channel'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { contactChannels, site } from '@/data/site'
import { capabilities } from '@/data/capabilities'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Contact Cosmictech Builders Private Limited about railway signalling and telecommunications works — tenders, turnkey S&T scopes, supply partnerships and careers.',
  path: '/contact',
})

const enquiryTypes = [
  'Turnkey S&T project',
  'Automatic signalling corridor',
  'Yard remodelling with electronic interlocking',
  'Doubling or patch doubling',
  'Systems replacement',
  'Train control (Kavach / ETCS / CBTC)',
  'Telecommunications',
  'Supply partnership',
  'Other',
]

export default function ContactPage() {
  return (
    <>
      <Section surface="graphite" divide={false} as="div">
        <div className="pt-32 pb-14 md:pt-40 md:pb-16 xl:pt-44">
          <Reveal>
            <IndexLabel label="Contact" tone="accent" />
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 max-w-[14ch] text-display-2 font-semibold text-primary">
              Tell us the section and the date.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <Measure className="mt-9">
              <p className="text-lead text-secondary">
                The useful first conversation is a technical one: what is there now, what has to
                change, what traffic the line must keep carrying while it does, and when it has to
                be commissioned.
              </p>
            </Measure>
          </Reveal>
        </div>
      </Section>

      <Section surface="graphite" divide={false}>
        <Band className="pt-0">
          <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-12">
            {/* ------------------------------------------------- the form */}
            <div className="lg:col-span-7">
              <h2 className="border-t border-hairline-strong pt-3 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
                Project enquiry
              </h2>
              <div className="mt-10">
                <EnquiryForm
                  destination={contactChannels.tendersEmail ?? contactChannels.generalEmail}
                  subjectPrefix="Project enquiry"
                  enquiryTypes={enquiryTypes}
                />
              </div>
            </div>

            {/* --------------------------------------------- the channels */}
            <aside className="lg:col-span-4 lg:col-start-9">
              <h2 className="border-t border-hairline-strong pt-3 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
                Direct channels
              </h2>
              <dl className="mt-6">
                <Channel
                  label="Tenders & project enquiries"
                  value={contactChannels.tendersEmail}
                  href={(v) => `mailto:${v}`}
                  spec="Dedicated address for tender and project correspondence."
                />
                <Channel
                  label="General enquiries"
                  value={contactChannels.generalEmail}
                  href={(v) => `mailto:${v}`}
                  spec="Main company email address."
                />
                <Channel
                  label="Careers"
                  value={contactChannels.careersEmail}
                  href={(v) => `mailto:${v}`}
                  spec="Address for applications and speculative CVs."
                />
                <Channel
                  label="Telephone"
                  value={contactChannels.phone}
                  href={(v) => `tel:${v.replace(/[^+\d]/g, '')}`}
                  spec="Primary number, in international format."
                />
              </dl>

              <h2 className="mt-12 border-t border-hairline-strong pt-3 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
                Offices
              </h2>
              <dl className="mt-6">
                <Channel
                  label="Registered office"
                  value={contactChannels.registeredOffice}
                  spec="Registered office address exactly as filed with the Registrar of Companies."
                />
                <Channel
                  label="Project office"
                  value={contactChannels.projectOffice}
                  spec="Principal project or operations office, if different from the registered office."
                />
              </dl>

              <h2 className="mt-12 border-t border-hairline-strong pt-3 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
                Company identifiers
              </h2>
              <dl className="mt-6">
                <Channel
                  label="Legal entity"
                  value={site.legalName}
                  spec="Registered company name."
                />
                <Channel label="CIN" value={contactChannels.cin} spec="Corporate Identity Number." />
                <Channel label="GSTIN" value={contactChannels.gstin} spec="GST identification number." />
              </dl>
            </aside>
          </div>
        </Band>
      </Section>

      {/* Routing help: what to ask about */}
      <Section surface="paper">
        <Band>
          <SectionHead
            index="01"
            label="Enquiry pathways"
            title="Not sure which discipline it falls under?"
            align="split"
          />
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.slug} delay={i * 30}>
                <div className="border-t border-hairline py-5">
                  <ArrowLink href={`/capabilities/${cap.slug}`} tone="primary">
                    {cap.navLabel}
                  </ArrowLink>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 max-w-[62ch] text-body text-secondary">
            Cosmictech takes turnkey scopes that cross several of these at once. If the work spans
            more than one, say so in the enquiry — that is the normal case, not the exception.
          </p>
        </Band>
      </Section>
    </>
  )
}
