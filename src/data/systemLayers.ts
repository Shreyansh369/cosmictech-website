/**
 * THE SYSTEM STACK
 *
 * The organising idea of the whole site: a railway is not one system but a
 * stack of connected layers, and Cosmictech works across them rather than at
 * one level of it. This model drives the homepage narrative, the 3D corridor
 * and its 2D counterpart — one source, three renderings.
 *
 * The engineering content here is public-domain fact about how railway
 * signalling works. It makes no claim about any particular company.
 */

export interface SystemLayer {
  id: string
  index: string
  name: string
  /** What this layer does, in one clause. */
  role: string
  /** The engineering statement, two sentences at most. */
  body: string
  /** Height in the 3D corridor and in the 2D fallback. */
  elevation: number
  /** Where the reader goes to see this capability in depth. */
  href: string | null
  /** Label for the destination link. */
  hrefLabel?: string
}

export const systemLayers: SystemLayer[] = [
  {
    id: 'physical',
    index: '01',
    name: 'Physical',
    role: 'The corridor itself',
    body: 'Track, formation and structures — the geometry every other layer is fixed to. Signalling does not exist apart from the alignment it protects.',
    elevation: 0,
    href: null,
  },
  {
    id: 'detection',
    index: '02',
    name: 'Detection',
    role: 'Proving the line clear',
    body: 'Axle counters and track circuits establish whether a section holds a train. Every safety decision above this layer is only as sound as this answer.',
    elevation: 1.3,
    href: '/capabilities/msdac',
    hrefLabel: 'MSDAC',
  },
  {
    id: 'signalling',
    index: '03',
    name: 'Signalling',
    role: 'Communicating authority',
    body: 'Aspects convert the state of the line into an instruction the driver can act on, with enough distance to brake. Automatic working generates them continuously along the corridor.',
    elevation: 2.6,
    href: '/capabilities/automatic-signalling',
    hrefLabel: 'Automatic Signalling',
  },
  {
    id: 'interlocking',
    index: '04',
    name: 'Interlocking',
    role: 'Refusing the unsafe combination',
    body: 'Vital logic that will not allow conflicting routes, unset points or an unproven track section to be signalled. It is the layer that says no.',
    elevation: 3.9,
    href: '/capabilities/electronic-interlocking',
    hrefLabel: 'Electronic Interlocking',
  },
  {
    id: 'control',
    index: '05',
    name: 'Control',
    role: 'Commanding the railway',
    body: 'The operating layer where routes are requested and the state of the railway is displayed. It commands; it never overrides the interlocking beneath it.',
    elevation: 5.2,
    href: '/capabilities/train-control-systems',
    hrefLabel: 'Train Control',
  },
  {
    id: 'network',
    index: '06',
    name: 'Network',
    role: 'Carrying it between locations',
    body: 'Transmission along the corridor, linking interlockings, control offices and trains. As signalling became digital, the bearer became part of the safety case.',
    elevation: 6.5,
    href: '/capabilities/telecommunications',
    hrefLabel: 'Telecommunications',
  },
  {
    id: 'intelligence',
    index: '07',
    name: 'Intelligence',
    role: 'Learning from what it sees',
    body: 'The layer that reads the railway rather than running it — inspection, diagnosis and prediction. This is where Prognostix works.',
    elevation: 7.8,
    href: '/prognostix',
    hrefLabel: 'Prognostix AI',
  },
]

/** Longitudinal positions of the section boundaries, in scene units. */
export const sectionBoundaries = [4, -5, -14, -23, -32]

export const corridorExtent = { near: 11, far: -39 }
