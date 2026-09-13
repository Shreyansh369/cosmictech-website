/**
 * Company facts.
 *
 * Every entry is transcribed from [PROFILE] or [DECK]. Where the source text
 * is itself incomplete, that is recorded rather than smoothed over — see
 * `financials.fy2526Todate.periodStated`.
 */

export interface Metric {
  /** The figure exactly as the source expresses it. */
  value: string
  /** What the figure actually measures — never blurred with another metric. */
  label: string
  /** Qualifying detail that must travel with the figure. */
  qualifier?: string
  source: 'PROFILE' | 'DECK'
}

/** [PROFILE] Turnover statements. Three distinct metrics, kept distinct. */
export const financials = {
  fy2425: {
    value: '₹114.00 Cr',
    label: 'Turnover from S&T works, FY 24-25',
    qualifier: 'Stated in the company profile as turnover achieved from S&T works.',
    source: 'PROFILE',
  } satisfies Metric,
  fy2526Todate: {
    value: '₹137 Cr',
    label: 'Achieved in FY 25-26',
    qualifier:
      'The source records this as achieved “till” a date that the document does not state. Period to be confirmed before publication.',
    source: 'PROFILE',
    periodStated: false,
  },
  /**
   * [DECK] A separate statement, in the CEO biography, with no period given.
   * Deliberately NOT merged with the profile turnover figures.
   */
  bootstrappedRevenue: {
    value: '₹140 Cr+',
    label: 'Revenues reached from inception',
    qualifier:
      'Stated in the leadership section of the Prognostix deck as revenues exceeding ₹140 Cr. No period is given in the source.',
    source: 'DECK',
  } satisfies Metric,
}

/** [PROFILE] Delivery statements that are volumetric rather than financial. */
export const deliveryMetrics: Metric[] = [
  {
    value: '~150 km',
    label: 'Automatic section work delivered to IR, FY 25-26',
    qualifier: 'Stated in the company profile as approximately 150 km.',
    source: 'PROFILE',
  },
  {
    value: '100%',
    label: 'Project success rate',
    qualifier: 'Stated alongside “no penalties/LD imposed”.',
    source: 'PROFILE',
  },
  {
    value: 'Nil',
    label: 'Penalties or liquidated damages imposed',
    source: 'PROFILE',
  },
  {
    value: '2016',
    label: 'Year established',
    qualifier:
      'First work: supply and installation of axle counters (SSDAC) in Delhi division.',
    source: 'PROFILE',
  },
]

/** [PROFILE] The company's own statement of its strengths, transcribed. */
export interface Strength {
  index: string
  title: string
  body: string
  source: 'PROFILE' | 'DECK'
}

export const strengths: Strength[] = [
  {
    index: '01',
    title: 'Turnkey execution depth',
    body: 'Deep expertise and experience in seamless, timely execution of complete S&T turnkey EPC/GCC projects, with a 100% project success rate and no penalties or liquidated damages imposed.',
    source: 'PROFILE',
  },
  {
    index: '02',
    title: 'In-house team across the life cycle',
    body: 'A strong in-house team of professionals covering the complete project life cycle, including retired railway S&T engineers and signalling professionals, together with industry-leading railway signalling supply chain professionals and network.',
    source: 'PROFILE',
  },
  {
    index: '03',
    title: 'Supplier ecosystem',
    body: 'Long-standing tie-ups with industry leaders ensure seamless support and execution of critical project activities. Extensive industry experience and long-standing relationships with all major S&T suppliers have resulted in Cosmictech being a trusted partner for the suppliers.',
    source: 'PROFILE',
  },
  {
    index: '04',
    title: 'Standing across Indian Railways',
    body: 'Long-established relationships and reputation with S&T railway executives across Indian Railways, which supports successful, timely and smooth execution of projects.',
    source: 'PROFILE',
  },
  {
    index: '05',
    title: 'Capacity for larger scopes',
    body: 'The organisation states it has sufficient financial strength and technical manpower to take up larger projects than those in its disclosed portfolio.',
    source: 'PROFILE',
  },
]

/** [DECK p8] The company's own "About" text, transcribed. */
export const aboutStatements = [
  'We deliver large-scale Railway Signaling & Telecommunications (S&T) EPC projects, backed by industry-leading expertise in Automatic Signaling, Electronic Interlocking, Kavach, and signaling technologies for high-speed and metro rail networks, including ETCS and CBTC.',
  'Building on our strong railway engineering capabilities, in 2025 we invested in developing next-generation deep-tech products for global railway markets, with a focus on advancing railway safety, predictive maintenance, and operational efficiency.',
]

/** [PROFILE] Quality & safety statements, transcribed. */
export const qualityStatements = [
  'We have gained valuable experience of working in compliance with clients’ technical standards, safety norms, and operational requirements.',
  'During our previous engagements, we have completed the assigned works within stipulated timelines while maintaining quality, safety, and coordination with railway officials.',
]

/**
 * Company timeline. Only the milestones the sources actually date are given
 * a year; the remainder of the history is a placeholder for the client.
 */
export const milestones: { year: string; title: string; body: string; source?: 'PROFILE' | 'DECK' }[] =
  [
    {
      year: '2016',
      title: 'Established',
      body: 'Cosmictech Builders Pvt. Ltd. is established, beginning with a work for the supply and installation of axle counters (SSDAC) in Delhi division.',
      source: 'PROFILE',
    },
    {
      year: '2024–25',
      title: 'S&T turnover of ₹114.00 Cr',
      body: 'Turnover of ₹114.00 Cr achieved from S&T works in FY 24-25.',
      source: 'PROFILE',
    },
    {
      year: '2025',
      title: 'Investment in deep-tech',
      body: 'The company invests in developing next-generation deep-tech products for global railway markets, focused on railway safety, predictive maintenance and operational efficiency.',
      source: 'DECK',
    },
    {
      year: '2025–26',
      title: '~150 km of automatic section delivered',
      body: 'Approximately 150 km of automatic section work delivered to Indian Railways in FY 25-26; ₹137 Cr achieved in the financial year to date.',
      source: 'PROFILE',
    },
    {
      year: '2026',
      title: 'RDSO developmental projects awarded to Prognostix AI',
      body: 'Prototype development contracts for Machine Vision Inspection Systems and AI-Enabled Acoustic Bearing Detection are awarded by RDSO.',
      source: 'DECK',
    },
  ]
