import { capabilityNav } from './capabilities'

export interface NavLink {
  label: string
  href: string
  description?: string
}

export interface NavGroup {
  label: string
  href: string
  /** Drawing-sheet index used in the mega panel. */
  index: string
  /** Short framing sentence for the panel. */
  intro: string
  links: NavLink[]
}

export const primaryNav: NavGroup[] = [
  {
    label: 'Company',
    href: '/company',
    index: '01',
    intro: 'An S&T contractor built from railway signalling engineers, established 2016.',
    links: [
      { label: 'Overview', href: '/company', description: 'Who Cosmictech is and how it is built' },
      { label: 'Story', href: '/company/story', description: 'From axle counters to turnkey corridors' },
      { label: 'Engineering', href: '/company/engineering', description: 'How the work is actually executed' },
      { label: 'Leadership', href: '/company/leadership', description: 'The people accountable for delivery' },
      { label: 'Quality & Safety', href: '/company/quality-safety', description: 'Working under traffic, safely' },
    ],
  },
  {
    label: 'Capabilities',
    href: '/capabilities',
    index: '02',
    intro: 'Eight connected layers of railway signalling and telecommunications engineering.',
    links: [
      { label: 'All capabilities', href: '/capabilities', description: 'The complete system stack' },
      ...capabilityNav.map((c) => ({
        label: c.label,
        href: `/capabilities/${c.slug}`,
        description: c.summary,
      })),
    ],
  },
  {
    label: 'Projects',
    href: '/projects',
    index: '03',
    intro: 'An indicative portfolio across nine Indian Railways zones and executing agencies.',
    links: [
      { label: 'Project explorer', href: '/projects', description: 'Filter the portfolio by system, zone and status' },
      { label: 'Completed works', href: '/projects?status=completed', description: 'Delivered and handed over' },
      { label: 'Works under progress', href: '/projects?status=in-progress', description: 'Currently in execution' },
    ],
  },
  {
    label: 'Technology',
    href: '/technology',
    index: '04',
    intro: 'Where railway infrastructure becomes an instrumented, diagnosable system.',
    links: [
      { label: 'Technology direction', href: '/technology', description: 'From execution to intelligence' },
    ],
  },
  {
    label: 'Prognostix',
    href: '/prognostix',
    index: '05',
    intro: 'The group’s deep-tech arm, developing railway AI under RDSO award.',
    links: [
      { label: 'Overview', href: '/prognostix', description: 'Railway deep-tech, from 2025' },
      { label: 'Technology', href: '/prognostix/technology', description: 'The stack behind the products' },
      { label: 'Solutions', href: '/prognostix/solutions', description: 'MVIS, ABD and the pipeline' },
      { label: 'Contact', href: '/prognostix/contact', description: 'Talk to the Prognostix team' },
    ],
  },
  {
    label: 'Careers',
    href: '/careers',
    index: '06',
    intro: 'Signalling engineering is learned on site. We hire accordingly.',
    links: [{ label: 'Working here', href: '/careers', description: 'Disciplines and how to apply' }],
  },
]

export const utilityNav: NavLink[] = [{ label: 'Contact', href: '/contact' }]

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: 'Capabilities',
    links: capabilityNav.map((c) => ({ label: c.label, href: `/capabilities/${c.slug}` })),
  },
  {
    title: 'Company',
    links: [
      { label: 'Overview', href: '/company' },
      { label: 'Story', href: '/company/story' },
      { label: 'Engineering', href: '/company/engineering' },
      { label: 'Leadership', href: '/company/leadership' },
      { label: 'Quality & Safety', href: '/company/quality-safety' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Work',
    links: [
      { label: 'Project explorer', href: '/projects' },
      { label: 'Completed', href: '/projects?status=completed' },
      { label: 'Under progress', href: '/projects?status=in-progress' },
      { label: 'Technology', href: '/technology' },
    ],
  },
  {
    title: 'Prognostix AI',
    links: [
      { label: 'Overview', href: '/prognostix' },
      { label: 'Technology', href: '/prognostix/technology' },
      { label: 'Solutions', href: '/prognostix/solutions' },
      { label: 'Contact', href: '/prognostix/contact' },
    ],
  },
]

export const legalNav: NavLink[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
]
