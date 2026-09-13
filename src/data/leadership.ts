/**
 * Leadership.
 *
 * Source: [DECK p4] "Our Leadership". Biographies are transcribed as
 * bullet-for-bullet statements. Titles are given exactly as the source gives
 * them. No achievement, tenure or credential is added, expanded or implied.
 */

export interface Leader {
  slug: string
  /** Name exactly as written in the source, honorific included. */
  name: string
  title: string
  /** Which part of the group the source associates the person with. */
  context: string
  /** Verbatim biography points from the source. */
  points: string[]
  /** Education line, where the source separates it. */
  education: string[]
  /** Portrait is intentionally absent — no supplied imagery. */
  portrait: null
}

export const leaders: Leader[] = [
  {
    slug: 'lalit-goel',
    name: 'Sh. Lalit Goel',
    title: 'Director',
    context: 'Group',
    points: [
      '30+ years of extensive leadership experience in Indian Railways.',
      '10+ years of experience in S&T, leading key technologies including EI, MSDAC, CBTC and Kavach.',
    ],
    education: ['B.Tech, BITS Pilani', 'MBA, IMT Ghaziabad'],
    portrait: null,
  },
  {
    slug: 'anmol-goel',
    name: 'Anmol Goel',
    title: 'Chief Executive Officer',
    context: 'Group',
    points: [
      'Bootstrapped Cosmictech from inception to revenues exceeding ₹140 Cr.',
      '10+ years of leadership experience in Indian Railways.',
    ],
    education: ['MBA, IIM Bangalore', 'MS, IIT Delhi (ongoing)'],
    portrait: null,
  },
  {
    slug: 'nitin-arora',
    name: 'Dr. Nitin Arora',
    title: 'Chief Technology Officer',
    context: 'Prognostix AI',
    points: [
      'Data Science & AI leader.',
      'IIT-JEE All India Rank 7.',
      'Extensive experience across Google, Amazon, GE, and several high-growth startups.',
    ],
    education: ['B.Tech, Computer Science, IIT Delhi', 'MS, New York University'],
    portrait: null,
  },
]

export function getLeader(slug: string): Leader | undefined {
  return leaders.find((l) => l.slug === slug)
}
