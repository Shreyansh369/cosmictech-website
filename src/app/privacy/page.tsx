import type { Metadata } from 'next'
import { LegalPage } from '@/components/content/LegalPage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Privacy',
    description: 'Privacy notice for Cosmictech Builders Private Limited.',
    path: '/privacy',
  }),
  robots: { index: false, follow: true },
}

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Privacy"
      title="Privacy notice."
      intro="How Cosmictech Builders Private Limited collects, uses and protects personal data submitted through this website and in the course of business."
      sections={[
        {
          index: '01',
          heading: 'Who we are',
          spec: 'Identity and contact details of the data controller: full legal entity name, registered address, CIN, and the contact point for privacy enquiries.',
          lines: 3,
        },
        {
          index: '02',
          heading: 'What we collect',
          spec: 'Categories of personal data collected through the enquiry and careers forms, through business correspondence, and through any analytics or hosting logs. Note that this site currently runs no analytics and sets no cookies — confirm whether that will remain true at launch.',
        },
        {
          index: '03',
          heading: 'Lawful basis and purpose',
          spec: 'The lawful basis relied on for each category of processing, and the purposes for which data is used, under the Digital Personal Data Protection Act, 2023 and any other applicable regime.',
        },
        {
          index: '04',
          heading: 'Sharing and transfers',
          spec: 'Third parties with whom data is shared (hosting, email, suppliers, clients), and whether any transfer occurs outside India.',
        },
        {
          index: '05',
          heading: 'Retention',
          spec: 'How long each category of personal data is retained and the criteria used to determine that period.',
        },
        {
          index: '06',
          heading: 'Your rights',
          spec: 'The rights available to data principals, how to exercise them, the response timescale, and how to complain.',
        },
        {
          index: '07',
          heading: 'Cookies',
          spec: 'Cookie notice. As built, this site sets no cookies and loads no third-party scripts or fonts — all typefaces are self-hosted. Update this section only if that changes.',
          lines: 3,
        },
      ]}
    />
  )
}
