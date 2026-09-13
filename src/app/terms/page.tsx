import type { Metadata } from 'next'
import { LegalPage } from '@/components/content/LegalPage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Terms',
    description: 'Terms of use for the Cosmictech Builders Private Limited website.',
    path: '/terms',
  }),
  robots: { index: false, follow: true },
}

export default function TermsPage() {
  return (
    <LegalPage
      label="Terms"
      title="Terms of use."
      intro="The terms on which this website is made available, and the basis on which the information published here may be relied upon."
      sections={[
        {
          index: '01',
          heading: 'Acceptance',
          spec: 'Statement that use of the site constitutes acceptance of these terms, and how changes to the terms are notified.',
          lines: 3,
        },
        {
          index: '02',
          heading: 'Accuracy of project information',
          spec: 'Basis on which project values, statuses and descriptions are published. Important: the portfolio on this site is described in the source material as an indicative list, project values are as disclosed by the company, and statuses are correct only as at the date stated. This section should make the position explicit.',
        },
        {
          index: '03',
          heading: 'No offer or contract',
          spec: 'Statement that nothing on the site constitutes an offer, a tender, or a contractual commitment, and that all work is undertaken under separately executed contracts.',
        },
        {
          index: '04',
          heading: 'Intellectual property',
          spec: 'Ownership of site content, marks and logos, and the terms on which any of it may be reproduced.',
        },
        {
          index: '05',
          heading: 'Third-party references',
          spec: 'Basis on which client organisations, railway zones, executing agencies and partner organisations are named, and disclaimer of any implied endorsement.',
        },
        {
          index: '06',
          heading: 'Limitation of liability',
          spec: 'Limitation of liability for use of and reliance on the site, to the extent permitted by law.',
        },
        {
          index: '07',
          heading: 'Governing law',
          spec: 'Governing law and jurisdiction for disputes arising from use of the site.',
          lines: 3,
        },
      ]}
    />
  )
}
