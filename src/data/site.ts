/**
 * Global site configuration.
 *
 * SOURCING RULE FOR THIS ENTIRE `data/` DIRECTORY
 * ------------------------------------------------
 * Every company-specific value here is transcribed from supplied source
 * material and annotated with its origin:
 *   [PROFILE] — "Profile of Cosmictech Builders Private Limited" (.docx)
 *   [DECK]    — "Prognostix AI" presentation (.pdf)
 * Anything not present in those documents is `null` and renders as a
 * styled placeholder. Nothing is inferred, rounded, or invented.
 */

export const site = {
  legalName: 'Cosmictech Builders Private Limited',
  shortName: 'Cosmictech',
  /** [DECK p8] Explicit instruction in source: "change logo text to: ..." */
  descriptor: 'Railway Signaling & Deep-Tech Innovation',
  /** [PROFILE] "was established in year 2016" */
  establishedYear: 2016,
  url: 'https://www.cosmictechbuilders.com',
  locale: 'en_IN',
} as const

/**
 * Contact channels. `null` means the value was not present in any supplied
 * source. The UI must render a placeholder for a null value and must never
 * emit a non-functional `mailto:`/`tel:` link. See `components/content/Channel`.
 */
export const contactChannels = {
  generalEmail: null as string | null,
  tendersEmail: null as string | null,
  careersEmail: null as string | null,
  phone: null as string | null,
  registeredOffice: null as string | null,
  projectOffice: null as string | null,
  cin: null as string | null,
  gstin: null as string | null,
} as const

/** Indian Railways zone / executing-agency codes used across the portfolio. */
export const zoneGlossary: Record<string, { name: string | null; kind: 'zone' | 'agency' }> = {
  NR: { name: 'Northern Railway', kind: 'zone' },
  NCR: { name: 'North Central Railway', kind: 'zone' },
  NER: { name: 'North Eastern Railway', kind: 'zone' },
  NWR: { name: 'North Western Railway', kind: 'zone' },
  CR: { name: 'Central Railway', kind: 'zone' },
  WR: { name: 'Western Railway', kind: 'zone' },
  SWR: { name: 'South Western Railway', kind: 'zone' },
  SCR: { name: 'South Central Railway', kind: 'zone' },
  RVNL: { name: 'Rail Vikas Nigam Limited', kind: 'agency' },
  // Codes appearing in the source whose expansion is not stated there.
  // Deliberately null rather than guessed.
  MRT: { name: null, kind: 'agency' },
  TVM: { name: null, kind: 'agency' },
}
