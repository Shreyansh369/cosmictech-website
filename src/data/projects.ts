/**
 * Project portfolio.
 *
 * Source: [PROFILE] — the project table in "Profile of Cosmictech Builders
 * Private Limited". Descriptions, zone codes, values and statuses are
 * transcribed verbatim, including the source's own spellings. The source
 * states this is "only an indicative list", which the UI must surface.
 *
 * `category` and `systems` are classifications derived strictly from words
 * present in each description — they add navigation, not new facts.
 */

export type ProjectStatus = 'completed' | 'in-progress'

export type ProjectCategory =
  | 'automatic-signalling'
  | 'yard-remodelling'
  | 'doubling'
  | 'systems-replacement'
  | 'multi-system'

/** Signalling systems named explicitly in a project description. */
export type ProjectSystem = 'auto-signalling' | 'ei' | 'msdac' | 'bpac' | 'ips' | 'outdoor-gear'

export interface Project {
  slug: string
  /** Verbatim description from the source table. */
  description: string
  /** Short display title derived from the description for listing contexts. */
  title: string
  /** Route or section where the source names one. */
  section: string | null
  /** Zone / executing-agency codes exactly as written in the source. */
  zoneCodes: string[]
  /** Verbatim value string, e.g. "58.0 Cr" — never reformatted. */
  valueLabel: string
  /** Numeric crore value, for sorting and aggregation only. */
  valueCr: number
  status: ProjectStatus
  /** Verbatim status wording from the source. */
  statusLabel: string
  category: ProjectCategory
  systems: ProjectSystem[]
  /** True where the source text is itself incomplete/truncated. */
  sourceTruncated?: boolean
}

export const projectStatusLabels: Record<ProjectStatus, string> = {
  completed: 'Completed',
  'in-progress': 'Under Progress',
}

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  'automatic-signalling': 'Automatic Signalling',
  'yard-remodelling': 'Yard Remodelling with EI',
  doubling: 'Doubling & Patch Doubling',
  'systems-replacement': 'Systems Replacement',
  'multi-system': 'Multi-System S&T',
}

export const projectSystemLabels: Record<ProjectSystem, string> = {
  'auto-signalling': 'Automatic Signalling',
  ei: 'Electronic Interlocking',
  msdac: 'MSDAC',
  bpac: 'BPAC',
  ips: 'IPS',
  'outdoor-gear': 'Outdoor Signalling Gear',
}

export const projects: Project[] = [
  {
    slug: 'auto-signalling-jhansi-gwalior',
    title: 'Automatic Signalling — Jhansi – Gwalior',
    description: 'Auto Signalling between Jhansi – Gwalior.',
    section: 'Jhansi – Gwalior',
    zoneCodes: ['RVNL', 'NCR'],
    valueLabel: '58.0 Cr',
    valueCr: 58.0,
    status: 'completed',
    statusLabel: 'Completed',
    category: 'automatic-signalling',
    systems: ['auto-signalling'],
  },
  {
    slug: 'auto-signalling-kahpri-sewagram',
    title: 'Automatic Signalling — Kahpri Sewagram',
    description: 'Auto Signalling between Kahpri Sewagram.',
    section: 'Kahpri – Sewagram',
    zoneCodes: ['RVNL', 'CR'],
    valueLabel: '48.63 Cr',
    valueCr: 48.63,
    status: 'in-progress',
    statusLabel: 'Under Progress',
    category: 'automatic-signalling',
    systems: ['auto-signalling'],
  },
  {
    slug: 'auto-signalling-godhra-dahod',
    title: 'Automatic Signalling — Godhra – Dahod',
    description: 'Auto Signalling between Godhra-Dahod.',
    section: 'Godhra – Dahod',
    zoneCodes: ['MRT', 'WR'],
    valueLabel: '79 Cr',
    valueCr: 79,
    status: 'in-progress',
    statusLabel: 'Under Progress',
    category: 'automatic-signalling',
    systems: ['auto-signalling'],
  },
  {
    slug: 'auto-signalling-dholpur-gwalior',
    title: 'Automatic Signalling — Dholpur – Gwalior',
    description: 'Auto Signalling between Dholpur – Gwalior.',
    section: 'Dholpur – Gwalior',
    zoneCodes: ['RVNL', 'NCR'],
    valueLabel: '40.25 Cr',
    valueCr: 40.25,
    status: 'in-progress',
    statusLabel: 'Under Progress',
    category: 'automatic-signalling',
    systems: ['auto-signalling'],
  },
  {
    slug: 'auto-signalling-sabarmati-kalol',
    title: 'Automatic Signalling — Sabarmati Kalol',
    description: 'Auto Signalling between Sabarmati Kalol.',
    section: 'Sabarmati – Kalol',
    zoneCodes: ['WR', 'MRT'],
    valueLabel: '30 Cr',
    valueCr: 30,
    status: 'completed',
    statusLabel: 'Completed',
    category: 'automatic-signalling',
    systems: ['auto-signalling'],
  },
  {
    slug: 'ei-vijayawada-bza-dvd',
    title: 'Panel Interlocking → Electronic Interlocking, BZA–DVD',
    description:
      'Repalcement of panel Interlocking with Electronic Interlocking and replacement of outdoor gears at CEL, CU, KVR, APT & MPU stations between BZA-DVD of Vijayawada Division',
    section: 'BZA – DVD, Vijayawada Division',
    zoneCodes: ['SCR'],
    valueLabel: '61.83 Cr',
    valueCr: 61.83,
    status: 'in-progress',
    statusLabel: 'Under Progress',
    category: 'systems-replacement',
    systems: ['ei', 'outdoor-gear'],
  },
  {
    slug: 'yard-remodelling-hubali-jn',
    title: 'Yard Remodelling — Hubali Jn',
    description: 'Yard Remodelling at Hubali Jn with Electronic Interlocking (EI).',
    section: 'Hubali Jn',
    zoneCodes: ['SWR'],
    valueLabel: '23.62 Cr',
    valueCr: 23.62,
    status: 'in-progress',
    statusLabel: 'Under Progress',
    category: 'yard-remodelling',
    systems: ['ei'],
  },
  {
    slug: 'yard-remodelling-sabarmati-ef-cabin',
    title: 'Yard Remodelling — Sabarmati (E-F) Cabin',
    description: 'Yard Remodelling at Sabarmati (E-F) Cabin with Electronic Interlocking (EI).',
    section: 'Sabarmati (E-F) Cabin',
    zoneCodes: ['WR'],
    valueLabel: '19.47 Cr',
    valueCr: 19.47,
    status: 'in-progress',
    statusLabel: 'Under Progress',
    category: 'yard-remodelling',
    systems: ['ei'],
  },
  {
    slug: 'yard-remodelling-wardha-ballarshah',
    title: 'Yard Remodelling — Wardha – Ballarshah',
    description: 'Yard Remodelling at Wardha -Ballarshah section with Electronic Interlocking (EI).',
    section: 'Wardha – Ballarshah',
    zoneCodes: ['CR'],
    valueLabel: '19.22 Cr',
    valueCr: 19.22,
    status: 'in-progress',
    statusLabel: 'Under Progress',
    category: 'yard-remodelling',
    systems: ['ei'],
  },
  {
    slug: 'yard-remodelling-palej-panoli',
    title: 'Yard Remodelling — Palej – Panoli',
    description: 'Yard Remodelling at Palej-Panoli with Electronic Interlocking (EI).',
    section: 'Palej – Panoli',
    zoneCodes: ['WR'],
    valueLabel: '19.02 Cr',
    valueCr: 19.02,
    status: 'in-progress',
    statusLabel: 'Under Progress',
    category: 'yard-remodelling',
    systems: ['ei'],
  },
  {
    slug: 'yard-remodelling-agra-tundla',
    title: 'Yard Remodelling — Agra – Tundla',
    description: 'Yard Remodelling at Agra-Tundla Station with Electronic Interlocking (EI).',
    section: 'Agra – Tundla',
    zoneCodes: ['NCR'],
    valueLabel: '18 Cr',
    valueCr: 18,
    status: 'completed',
    statusLabel: 'Completed',
    category: 'yard-remodelling',
    systems: ['ei'],
  },
  {
    slug: 'yard-remodelling-katwara-pitol-jhabua',
    title: 'Yard Remodelling — Katwara, Pitol & Jhabua',
    description:
      'Yard Remodelling at KATWARA, PITOL, and JHABUA with Electronic Interlocking (EI)',
    section: 'Katwara · Pitol · Jhabua',
    zoneCodes: ['WR'],
    valueLabel: '18 Cr',
    valueCr: 18,
    status: 'in-progress',
    statusLabel: 'Under Progress',
    category: 'yard-remodelling',
    systems: ['ei'],
  },
  {
    slug: 'yard-remodelling-panki-dham',
    title: 'Yard Remodelling — Panki – Dham',
    description: 'Yard Remodelling at Panki-Dham Station with Electronic Interlocking (EI).',
    section: 'Panki – Dham',
    zoneCodes: ['NCR'],
    valueLabel: '17.27 Cr',
    valueCr: 17.27,
    status: 'in-progress',
    statusLabel: 'Under Progress',
    category: 'yard-remodelling',
    systems: ['ei'],
  },
  {
    slug: 'yard-remodelling-palwal-rundi',
    title: 'Yard Remodelling — Palwal – Rundi',
    description: 'Yard Remodelling at Palwal-Rundi Station with Electronic Interlocking (EI).',
    section: 'Palwal – Rundi',
    zoneCodes: ['NR'],
    valueLabel: '12.69 Cr',
    valueCr: 12.69,
    status: 'in-progress',
    statusLabel: 'Under Progress',
    category: 'yard-remodelling',
    systems: ['ei'],
  },
  {
    slug: 'yard-remodelling-shahadra',
    title: 'Yard Remodelling — Shahadra',
    description: 'Yard Remodelling at Shahadra Station with Provision of EI.',
    section: 'Shahadra',
    zoneCodes: ['NR'],
    valueLabel: '12.46 Cr',
    valueCr: 12.46,
    status: 'in-progress',
    statusLabel: 'Under Progress',
    category: 'yard-remodelling',
    systems: ['ei'],
  },
  {
    slug: 'yard-remodelling-malipur-jafarganj',
    title: 'Yard Remodelling — Malipur & Jafarganj',
    description: 'Yard Remodelling at Malipur & Jafarganj Station with Provision of EI.',
    section: 'Malipur · Jafarganj',
    zoneCodes: ['NR'],
    valueLabel: '12.18 Cr',
    valueCr: 12.18,
    status: 'completed',
    statusLabel: 'Completed',
    category: 'yard-remodelling',
    systems: ['ei'],
  },
  {
    slug: 'ei-dhar-sardarpur',
    title: 'EI Design & Supply — Dhar – Sardarpur',
    description:
      'Design, supply of Electronic Interlocking System, with Supply, installation, testing & Commissioning of various indoor & outdoor Signalling Systems & gears in DHAR-SARDARPUR Section of Ratlam division',
    section: 'Dhar – Sardarpur, Ratlam Division',
    zoneCodes: ['WR'],
    valueLabel: '12.90 Cr',
    valueCr: 12.9,
    status: 'in-progress',
    statusLabel: 'Under Progress',
    category: 'systems-replacement',
    systems: ['ei', 'outdoor-gear'],
  },
  {
    slug: 'yard-remodelling-new-lalitpur-town',
    title: 'Yard Remodelling — New Lalitpur Town',
    description: 'Yard Remodelling at New Lalitpur Town with Electronic Interlocking (EI).',
    section: 'New Lalitpur Town',
    zoneCodes: ['TVM', 'NCR'],
    valueLabel: '11.70 Cr',
    valueCr: 11.7,
    status: 'in-progress',
    statusLabel: 'Under Progress',
    category: 'yard-remodelling',
    systems: ['ei'],
  },
  {
    slug: 'yard-remodelling-awagarh-sivala-tehu',
    title: 'Yard Remodelling — Awagarh & Sivala Tehu',
    description:
      'Yard Remodelling at Awagarh and Sivala Tehu Station with Electronic Interlocking (EI).',
    section: 'Awagarh · Sivala Tehu',
    zoneCodes: ['TVM', 'NCR'],
    valueLabel: '10.83 Cr',
    valueCr: 10.83,
    status: 'in-progress',
    statusLabel: 'Under Progress',
    category: 'yard-remodelling',
    systems: ['ei'],
  },
  {
    slug: 'doubling-roza-sitapur',
    title: 'Doubling — Roza – Sitapur',
    description:
      'Doubling work in Roza Sitapur section with provision of EI at Unchallia, Bartara and Jang Bahadurganj.',
    section: 'Roza – Sitapur',
    zoneCodes: ['NR'],
    valueLabel: '10.52 Cr',
    valueCr: 10.52,
    status: 'completed',
    statusLabel: 'Completed',
    category: 'doubling',
    systems: ['ei'],
  },
  {
    slug: 'yard-remodelling-gomti-nagar',
    title: 'Yard Remodelling — Gomti Nagar',
    description: 'Yard remodelling at Gomti Nagar Station with Electronic Interlocking (EI).',
    section: 'Gomti Nagar',
    zoneCodes: ['NER'],
    valueLabel: '10.02 Cr',
    valueCr: 10.02,
    status: 'completed',
    statusLabel: 'Completed',
    category: 'yard-remodelling',
    systems: ['ei'],
  },
  {
    slug: 'yard-remodelling-saharanpur',
    title: 'Yard Remodelling — Saharanpur',
    description: 'Yard Remodelling at Saharanpur Station with Electronic Interlocking (EI).',
    section: 'Saharanpur',
    zoneCodes: ['TVM', 'NR'],
    valueLabel: '9.29 Cr',
    valueCr: 9.29,
    status: 'in-progress',
    statusLabel: 'Under Progress',
    category: 'yard-remodelling',
    systems: ['ei'],
  },
  {
    slug: 'signalling-replacement-kalisindh-bolai',
    title: 'Signalling Equipment Replacement — Kalisindh & Bolai',
    description: 'Repalcement of Signaling Equipment at Kalisindh and Bolai Station.',
    section: 'Kalisindh · Bolai',
    zoneCodes: ['WR'],
    valueLabel: '6.8 Cr',
    valueCr: 6.8,
    status: 'completed',
    statusLabel: 'Completed',
    category: 'systems-replacement',
    systems: ['outdoor-gear'],
  },
  {
    slug: 'patch-doubling-yusufpur-ghazipur',
    title: 'Patch Doubling — Yusufpur, Ghazipur',
    description:
      'Patch doubling at Yusufpur, Ghazipur Etc with alteration in EI (4 block-sections).',
    section: 'Yusufpur · Ghazipur',
    zoneCodes: ['NER'],
    valueLabel: '6.38 Cr',
    valueCr: 6.38,
    status: 'completed',
    statusLabel: 'Completed',
    category: 'doubling',
    systems: ['ei'],
  },
  {
    slug: 'ei-sabarmati-d-gandhigram-sarkhej',
    title: 'EI Commissioning — Sabarmati-D, Gandhigram & Sarkhej',
    description:
      'Supply, Installation, Wiring, Testing and Commissioning of Existing Medha make Electronic Interlocking (EI) System at Sabarmati-D cabin, Gandhigram and Sarkhej (03) stations in connection with Doubling work between Sabarmati- Sarkhej Section',
    section: 'Sabarmati – Sarkhej',
    zoneCodes: ['WR'],
    valueLabel: '6.22 Cr',
    valueCr: 6.22,
    status: 'in-progress',
    statusLabel: 'Under Progress',
    category: 'doubling',
    systems: ['ei'],
  },
  {
    slug: 'yard-remodelling-marwar-mundwa',
    title: 'Yard Remodelling — Marwar Mundwa',
    description: 'Yard Remodelling at Marwar Mundwa Station with Electronic Interlocking (EI).',
    section: 'Marwar Mundwa',
    zoneCodes: ['NWR'],
    valueLabel: '5.52 Cr',
    valueCr: 5.52,
    status: 'completed',
    statusLabel: 'Completed',
    category: 'yard-remodelling',
    systems: ['ei'],
  },
  {
    slug: 'yard-remodelling-badshanagar',
    title: 'Yard Remodelling — Badshanagar',
    description: 'Yard Remodelling at Badshanagar Station with Electronic Interlocking (EI).',
    section: 'Badshanagar',
    zoneCodes: ['NER'],
    valueLabel: '5.46 Cr',
    valueCr: 5.46,
    status: 'completed',
    statusLabel: 'Completed',
    category: 'yard-remodelling',
    systems: ['ei'],
  },
  {
    slug: 'patch-doubling-saidpur-bhitri',
    title: 'Patch Doubling — Saidpur Bhitri',
    description: 'Patch doubling at Saidpur Bhitri etc. with alteration in EI (4 block sections).',
    section: 'Saidpur Bhitri',
    zoneCodes: ['NER'],
    valueLabel: '5.03 Cr',
    valueCr: 5.03,
    status: 'completed',
    statusLabel: 'Completed',
    category: 'doubling',
    systems: ['ei'],
  },
  {
    slug: 'multi-system-gumandev',
    title: 'Multi-System S&T — Gumandev',
    description:
      'Electronic interlocking, Alteration in electronic interlocking, MSDAC works, BPAC works, IPS works etc. in connection with the work of "Gumandev',
    section: 'Gumandev',
    zoneCodes: ['WR'],
    valueLabel: '4.54 Cr',
    valueCr: 4.54,
    status: 'in-progress',
    statusLabel: 'Under Progress',
    category: 'multi-system',
    systems: ['ei', 'msdac', 'bpac', 'ips'],
    sourceTruncated: true,
  },
  {
    slug: 'longer-loop-dhigawara',
    title: 'Longer Loop Signalling — Dhigawara',
    description:
      'Signaling work inconnection with Longer Loop facility in Dhigawara Station ofJaipur division.',
    section: 'Dhigawara, Jaipur Division',
    zoneCodes: ['NWR'],
    valueLabel: '2.89 Cr',
    valueCr: 2.89,
    status: 'in-progress',
    statusLabel: 'Under Progress',
    category: 'systems-replacement',
    systems: ['outdoor-gear'],
  },
]

/* ---- Derived helpers: arithmetic over disclosed figures only ---------- */

export const projectsByValue = [...projects].sort((a, b) => b.valueCr - a.valueCr)

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export const portfolioTotals = {
  count: projects.length,
  completed: projects.filter((p) => p.status === 'completed').length,
  inProgress: projects.filter((p) => p.status === 'in-progress').length,
  /** Sum of the listed values. Always presented as scoped to this list. */
  aggregateCr: Number(projects.reduce((sum, p) => sum + p.valueCr, 0).toFixed(2)),
  /** Distinct zone/agency codes touched by the listed portfolio. */
  zoneCodes: Array.from(new Set(projects.flatMap((p) => p.zoneCodes))).sort(),
}

/** Projects that reference a given capability's system tag. */
export function projectsBySystem(system: ProjectSystem): Project[] {
  return projectsByValue.filter((p) => p.systems.includes(system))
}

export function relatedProjects(slug: string, limit = 3): Project[] {
  const current = getProject(slug)
  if (!current) return []
  return projectsByValue
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit)
}
