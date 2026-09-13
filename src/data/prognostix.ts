/**
 * Prognostix AI.
 *
 * Source: [DECK] throughout. Product scope, contract values, award dates,
 * partners and technology domains are transcribed. Capabilities not stated
 * in the deck are not described — the pipeline items in particular are
 * recorded as "next working on", which is how they are presented.
 */

export interface AwardedProgramme {
  slug: string
  ref: string
  name: string
  abbreviation: string
  /** Verbatim description from the deck. */
  description: string
  /** Verbatim contract value. */
  contractValue: string
  /** Verbatim award date as given (DD/MM/YYYY). */
  awardDate: string
  /** ISO form for <time> elements. */
  awardDateISO: string
  awardedBy: string
  /** Technical explanation of the problem domain — engineering fact, not a claim. */
  problem: string[]
  approach: string[]
}

export const awardedProgrammes: AwardedProgramme[] = [
  {
    slug: 'mvis',
    ref: 'RDSO-01',
    name: 'Machine Vision Inspection Systems for Rolling Stock',
    abbreviation: 'MVIS',
    description:
      'Prototype Development of Machine Vision Inspection Systems (MVIS) for Rolling Stock on Indian Railways, leveraging advanced computer vision and deep-learning for automated inspection and defect detection.',
    contractValue: '₹1.77 Cr',
    awardDate: '24/04/2026',
    awardDateISO: '2026-04-24',
    awardedBy: 'RDSO (Indian Railways)',
    problem: [
      'Rolling stock examination is presently a visual task carried out under time pressure, often at night, on a train that has just arrived and is due to depart. The inspector has minutes per rake and must detect conditions that may be subtle — a brake block worn past limit, a loose fitting, a spring defect, a hanging part.',
      'The consequence of a missed defect is not a maintenance cost. It is a train that leaves the yard with a fault that the next few hundred kilometres will develop.',
    ],
    approach: [
      'Machine vision inspection instruments the examination point rather than the vehicle. Cameras and illumination capture the underframe, running gear and wheel faces of every vehicle as the rake passes, at speed and in the conditions the yard actually presents.',
      'Deep-learning models trained on defect imagery then classify what has been captured, flagging vehicles for human attention rather than replacing the examiner. The inspector’s time moves from searching to deciding.',
    ],
  },
  {
    slug: 'abd',
    ref: 'RDSO-02',
    name: 'AI-Enabled Acoustic Bearing Detection Systems',
    abbreviation: 'ABD',
    description:
      'Prototype Development of AI-Enabled Acoustic Bearing Detection (ABD) Systems for Indian Railways, utilizing advanced signal processing, and deep-learning for early detection of bearing defects.',
    contractValue: '₹3 Cr',
    awardDate: '22/04/2026',
    awardDateISO: '2026-04-22',
    awardedBy: 'RDSO (Indian Railways)',
    problem: [
      'A roller bearing that is beginning to fail announces it acoustically long before it announces it thermally or visually. By the time a hot axle box detector responds, the degradation is advanced; by the time it is visible, it may be too late.',
      'Bearing failure is among the more serious rolling stock hazards precisely because its late stages develop quickly.',
    ],
    approach: [
      'Acoustic bearing detection listens to each bearing as the vehicle passes a wayside array. The signature of a healthy bearing differs from one with a spalled race, a damaged roller or a cage defect — but the difference is buried under wheel-rail noise, traction noise and wind.',
      'Signal processing separates the bearing signature from that background; deep-learning models then classify the defect type and severity, producing an early warning with enough lead time for planned intervention rather than an emergency stop.',
    ],
  },
]

/** [DECK p3] Strategic relationships, transcribed exactly — including the
 *  deliberately unnamed partner, which the deck does not identify. */
export const partnerships = [
  {
    name: 'Centre for Railway Information Systems (CRIS)',
    named: true,
    note: 'Strategic MoU to co-develop next-generation railway technology solutions.',
  },
  {
    name: 'A leading global technology company',
    named: false,
    note: 'Strategic MoU to co-develop next-generation railway technology solutions. The organisation is not named in the supplied material.',
  },
]

/** [DECK p3] "We are next working on a portfolio of deep-tech solutions including:" */
export const pipeline = [
  {
    name: 'Remote Diagnostic & Predictive Maintenance System',
    abbreviation: 'RDPMS',
  },
  {
    name: 'Unified Predictive Maintenance Platform',
    abbreviation: null,
  },
]

/** [DECK p7] Technology domains, transcribed as listed. */
export const technologyDomains = [
  'Machine Learning',
  'Data Science',
  'Artificial Intelligence',
  'Computer Vision',
  'Agentic AI',
  'Software',
  'Embedded',
  'IoT',
  'Electronics',
]

export function getProgramme(slug: string): AwardedProgramme | undefined {
  return awardedProgrammes.find((p) => p.slug === slug)
}
