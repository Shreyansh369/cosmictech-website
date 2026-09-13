import type { Schematic } from './schematic'
import type { ProjectSystem } from './projects'

/**
 * Capability models.
 *
 * TWO KINDS OF CONTENT LIVE HERE, AND THEY ARE KEPT STRICTLY APART:
 *
 * 1. Railway engineering explanation — how axle counters, interlocking,
 *    block working and train control actually function. This is public
 *    domain engineering fact, written from first principles. It describes
 *    the discipline, never Cosmictech's record.
 *
 * 2. Company evidence — drawn only from [PROFILE] / [DECK] and surfaced
 *    through `evidence`, or through live project links via `systemTag`.
 *
 * Marketing claims that are neither of those do not appear.
 */

export interface CapabilitySection {
  heading: string
  paragraphs: string[]
}

export interface ScopeItem {
  title: string
  detail: string
}

export interface Capability {
  slug: string
  /** Drawing-sheet index, e.g. "01". */
  index: string
  name: string
  /** Compact label for navigation and dense contexts. */
  navLabel: string
  /** Expansion of an abbreviated name, where one exists. */
  expansion?: string
  /** One-sentence positioning used in listings and metadata. */
  summary: string
  /** Hero lede — two or three sentences maximum. */
  lede: string
  whatItIs: CapabilitySection
  whyItMatters: CapabilitySection
  schematic: Schematic
  /** Sequenced explanation of operation. */
  howItWorks: { step: string; title: string; detail: string }[]
  /** Engineering scope of the discipline. */
  scope: ScopeItem[]
  /** Statements sourced from supplied company material. Each carries its origin. */
  evidence: { statement: string; source: 'PROFILE' | 'DECK' }[]
  /** Links this capability to the project portfolio. */
  systemTag: ProjectSystem | null
  related: string[]
}

export const capabilities: Capability[] = [
  /* ------------------------------------------------------------------ 01 */
  {
    slug: 'automatic-signalling',
    index: '01',
    name: 'Automatic Signalling',
    navLabel: 'Automatic Signalling',
    summary:
      'Continuous automatic block signalling that raises line capacity on saturated corridors without laying new track.',
    lede: 'Automatic block signalling divides a running line into short, self-governing sections so that several trains can occupy the same corridor safely. It is the highest-leverage capacity intervention available to an existing route.',
    whatItIs: {
      heading: 'What it is',
      paragraphs: [
        'Under absolute block working, only one train may occupy the line between two block stations. The section length is fixed by the distance between those stations, so headway — the interval between successive trains — is set by infrastructure that may be many kilometres apart.',
        'Automatic signalling replaces that arrangement with a continuous chain of short block sections, each governed by its own signal. Occupancy is proven by track circuits or axle counters rather than by a signaller exchanging block instruments. A signal clears automatically when the sections ahead of it are proven clear, and reverts to its most restrictive aspect the moment a train passes it.',
        'The result is a line on which trains follow one another at intervals determined by braking distance and aspect sequence rather than by station spacing.',
      ],
    },
    whyItMatters: {
      heading: 'Why it matters',
      paragraphs: [
        'On a mixed-traffic corridor carrying freight and passenger services, block section length is usually the binding constraint on throughput. Converting to automatic working can lift line capacity substantially while the formation, track and traction supply remain unchanged — a far shorter and less disruptive intervention than doubling or new construction.',
        'Automatic working also changes the operational character of a route. Recovery from perturbation is faster because trains are not held at distant block stations, and the signalling system itself enforces separation continuously rather than at discrete handover points.',
      ],
    },
    schematic: {
      caption: 'Automatic block section — occupancy detection to aspect control',
      nodes: [
        { id: 'ac1', label: 'Axle Counter', note: 'Section entry', x: 8, y: 68, kind: 'field' },
        { id: 'ac2', label: 'Axle Counter', note: 'Section exit', x: 42, y: 68, kind: 'field' },
        { id: 'ac3', label: 'Axle Counter', note: 'Next section', x: 76, y: 68, kind: 'field' },
        { id: 'ev', label: 'Evaluator', note: 'Clear / occupied', x: 25, y: 40, kind: 'indoor' },
        { id: 'ev2', label: 'Evaluator', note: 'Clear / occupied', x: 59, y: 40, kind: 'indoor' },
        { id: 'sig1', label: 'Signal', note: 'Aspect n', x: 25, y: 14, kind: 'trackside' },
        { id: 'sig2', label: 'Signal', note: 'Aspect n+1', x: 59, y: 14, kind: 'trackside' },
        { id: 'ips', label: 'IPS', note: 'Integrated power', x: 92, y: 40, kind: 'indoor' },
      ],
      links: [
        { from: 'ac1', to: 'ev', kind: 'safety' },
        { from: 'ac2', to: 'ev', kind: 'safety' },
        { from: 'ac2', to: 'ev2', kind: 'safety' },
        { from: 'ac3', to: 'ev2', kind: 'safety' },
        { from: 'ev', to: 'sig1', kind: 'command' },
        { from: 'ev2', to: 'sig2', kind: 'command' },
        { from: 'sig2', to: 'sig1', kind: 'data', ortho: true },
        { from: 'ips', to: 'ev2', kind: 'power' },
      ],
    },
    howItWorks: [
      {
        step: '01',
        title: 'Section definition',
        detail:
          'The corridor is divided into block sections sized to braking distance and the required headway. Section boundaries fix where detection and signals are placed.',
      },
      {
        step: '02',
        title: 'Occupancy proving',
        detail:
          'Each section is monitored by axle counters or track circuits. A section is treated as occupied unless it is positively proven clear — the system fails toward restriction, never toward permission.',
      },
      {
        step: '03',
        title: 'Aspect generation',
        detail:
          'Signal aspects are derived from the occupancy state of the sections ahead, so that a driver receives progressively less restrictive aspects as the line clears, with sufficient distance to brake.',
      },
      {
        step: '04',
        title: 'Sequence propagation',
        detail:
          'Aspect information passes backwards down the chain of signals. A single occupied section therefore produces a graded sequence of aspects behind it rather than an abrupt stop.',
      },
      {
        step: '05',
        title: 'Power and continuity',
        detail:
          'Integrated power supply equipment maintains signalling supply through mains disturbance, because a loss of supply that darkens signals is itself an operational failure.',
      },
    ],
    scope: [
      {
        title: 'Corridor signalling design',
        detail:
          'Block section layout, signal siting, aspect sequence charts, sighting assessment and control tables for the section under conversion.',
      },
      {
        title: 'Detection installation',
        detail:
          'Supply, installation and calibration of axle counter heads, trackside junction boxes and evaluator equipment across the corridor.',
      },
      {
        title: 'Trackside works',
        detail:
          'Signal post erection and foundations, LED signal units, cable routes, trenching, jointing and earthing across the running section.',
      },
      {
        title: 'Indoor equipment',
        detail:
          'Location huts, equipment racks, integrated power supply, battery banks and the internal wiring that ties detection to aspect control.',
      },
      {
        title: 'Testing and commissioning',
        detail:
          'Wire counting, function testing against control tables, correspondence checks, section-by-section proving and staged commissioning under traffic.',
      },
      {
        title: 'Interface with existing systems',
        detail:
          'Alteration of existing interlockings at the section ends so that automatic territory and station areas hand over correctly.',
      },
    ],
    evidence: [
      {
        statement:
          'In FY 25-26 Cosmictech delivered approximately 150 km of automatic section work to Indian Railways.',
        source: 'PROFILE',
      },
      {
        statement:
          'Automatic signalling is named among the company’s areas of industry-leading expertise, alongside Electronic Interlocking and Kavach.',
        source: 'DECK',
      },
    ],
    systemTag: 'auto-signalling',
    related: ['electronic-interlocking', 'msdac', 'railway-snt'],
  },

  /* ------------------------------------------------------------------ 02 */
  {
    slug: 'electronic-interlocking',
    index: '02',
    name: 'Electronic Interlocking',
    navLabel: 'Electronic Interlocking',
    expansion: 'EI',
    summary:
      'Vital processor-based interlocking that enforces safe route setting across a station yard and carries the control tables in software.',
    lede: 'An interlocking is the safety kernel of a railway yard: the logic that decides which routes may be set, in which order, and which must be refused. Electronic interlocking implements that logic in vital, redundant processors rather than in relay circuitry.',
    whatItIs: {
      heading: 'What it is',
      paragraphs: [
        'Interlocking is the discipline of preventing a signaller from commanding a combination of points and signals that could result in a collision or a derailment. It guarantees that a route is only signalled when every point in that route is correctly set and detected, every conflicting route is locked out, and the track is proven clear.',
        'Historically this was achieved mechanically, then through relay circuitry in which each interlocking condition was physically wired. Electronic interlocking moves the same conditions into a vital computing platform — typically multiple diverse processors running in a voted configuration — with the yard’s control tables expressed as configuration data.',
        'The safety principle is unchanged. What changes is that the logic becomes inspectable, testable and alterable as data, while the physical estate reduces from rooms of relays to equipment racks.',
      ],
    },
    whyItMatters: {
      heading: 'Why it matters',
      paragraphs: [
        'A yard alteration under relay interlocking means rewiring. Under electronic interlocking it means revising control tables, re-testing the logic and re-proving the field interfaces — a change that can be prepared, validated and rehearsed off site before any traffic is affected.',
        'That difference is what makes large-scale yard remodelling programmes tractable. It also matters for the future: an electronic interlocking presents a defined digital interface, which is what higher-order train control and centralised traffic control need in order to be layered on top.',
        'Reliability and diagnostics improve in parallel. Faults that would have required tracing wire by wire are reported by the system itself, which shortens restoration time on a line under traffic.',
      ],
    },
    schematic: {
      caption: 'Electronic interlocking — control tables to field, with vital redundancy',
      nodes: [
        { id: 'vdu', label: 'Operator VDU', note: 'Route request', x: 12, y: 12, kind: 'control' },
        { id: 'cpu', label: 'Vital Processors', note: 'Redundant / voted', x: 45, y: 30, kind: 'indoor' },
        { id: 'ct', label: 'Control Tables', note: 'Yard logic', x: 12, y: 48, kind: 'indoor' },
        { id: 'oc', label: 'Object Controllers', note: 'Field interface', x: 72, y: 30, kind: 'indoor' },
        { id: 'pt', label: 'Point Machines', note: 'Set & detect', x: 88, y: 62, kind: 'field' },
        { id: 'sg', label: 'Signals', note: 'Aspect control', x: 66, y: 76, kind: 'trackside' },
        { id: 'td', label: 'Track Detection', note: 'Proven clear', x: 40, y: 76, kind: 'field' },
        { id: 'ips', label: 'IPS', note: 'Integrated power', x: 14, y: 76, kind: 'indoor' },
      ],
      links: [
        { from: 'vdu', to: 'cpu', kind: 'command' },
        { from: 'ct', to: 'cpu', kind: 'data' },
        { from: 'cpu', to: 'oc', kind: 'safety' },
        { from: 'oc', to: 'pt', kind: 'safety' },
        { from: 'oc', to: 'sg', kind: 'safety' },
        { from: 'td', to: 'cpu', kind: 'safety', ortho: true },
        { from: 'ips', to: 'cpu', kind: 'power', ortho: true },
      ],
    },
    howItWorks: [
      {
        step: '01',
        title: 'Route request',
        detail:
          'The signaller selects an entrance and exit signal. The request enters the interlocking as a command, not as an instruction to move anything.',
      },
      {
        step: '02',
        title: 'Conflict evaluation',
        detail:
          'Vital processors test the request against the control tables: opposing and conflicting routes, overlaps, approach locking and any existing route holding must all permit it.',
      },
      {
        step: '03',
        title: 'Point setting and detection',
        detail:
          'Points in the route and its overlap are called to position. The interlocking will not proceed on a commanded position — it requires detection proving the points are physically set and locked.',
      },
      {
        step: '04',
        title: 'Track clearance proving',
        detail:
          'Every track section in the route and overlap must be proven clear by track circuits or axle counters before an aspect may be given.',
      },
      {
        step: '05',
        title: 'Aspect release and locking',
        detail:
          'Only when all conditions hold is the signal cleared. The route is then locked; release follows train movement or a timed sequence, never a bare cancellation.',
      },
      {
        step: '06',
        title: 'Logging and diagnostics',
        detail:
          'Every command, state change and failure is recorded, giving both an operational record and the data needed for fault analysis.',
      },
    ],
    scope: [
      {
        title: 'Control table preparation',
        detail:
          'Yard plan analysis, signalling plan, route and aspect control tables, locking tables and the selection tables that drive the interlocking configuration.',
      },
      {
        title: 'Indoor engineering',
        detail:
          'Relay room or equipment room layout, racks, vital processor installation, object controller provisioning, internal wiring and power distribution.',
      },
      {
        title: 'Outdoor signalling gear',
        detail:
          'Point machines, LED signals, track detection, location boxes, cable routes, terminations and earthing across the yard.',
      },
      {
        title: 'Yard remodelling interface',
        detail:
          'Co-ordination with permanent way alterations so that new layouts, new points and revised routes are signalled in step with track work.',
      },
      {
        title: 'Testing and safety validation',
        detail:
          'Wire count, function and correspondence testing, control table proving, independent safety checks and staged commissioning under traffic block.',
      },
      {
        title: 'Alteration under traffic',
        detail:
          'Phased cut-over planning so that an operational yard continues to work while the interlocking changes around it.',
      },
    ],
    evidence: [
      {
        statement:
          'Electronic Interlocking is the single most frequently recurring system across the disclosed project portfolio, appearing in yard remodelling, doubling, patch doubling and systems replacement works.',
        source: 'PROFILE',
      },
      {
        statement:
          'The portfolio includes replacement of panel interlocking with electronic interlocking, together with outdoor gear replacement, across five stations of Vijayawada Division.',
        source: 'PROFILE',
      },
      {
        statement:
          'Electronic Interlocking is named among the company’s areas of industry-leading expertise.',
        source: 'DECK',
      },
    ],
    systemTag: 'ei',
    related: ['railway-snt', 'msdac', 'bpac'],
  },

  /* ------------------------------------------------------------------ 03 */
  {
    slug: 'msdac',
    index: '03',
    name: 'Multi-Section Digital Axle Counter',
    navLabel: 'MSDAC',
    expansion: 'MSDAC',
    summary:
      'Digital axle counting that proves multiple track sections clear from a single evaluator, independent of ballast and rail condition.',
    lede: 'An axle counter answers one question with absolute rigour: is this section of track clear? It does so by counting axles in and axles out, which makes it immune to the ballast, weather and rail-condition failures that limit track circuits.',
    whatItIs: {
      heading: 'What it is',
      paragraphs: [
        'A track circuit proves a section clear by passing current through the rails; a train short-circuits it. That method is elegant but sensitive — ballast resistance, rail head contamination, traction return current and long section lengths all degrade it.',
        'An axle counter works differently. Detection points at the section boundaries sense each passing wheel and register direction. An evaluator maintains the count: when the number of axles that entered equals the number that left, and the count is zero, the section is proven clear. Any other state is treated as occupied.',
        'A multi-section digital axle counter extends this by serving several sections from one evaluator, with detection points shared between adjacent sections. Fewer equipment locations are needed for the same coverage, and the whole arrangement is digital, self-monitoring and diagnosable.',
      ],
    },
    whyItMatters: {
      heading: 'Why it matters',
      paragraphs: [
        'Axle counting removes the dependency on rail and ballast condition, which is the dominant source of unreliability in track circuits on Indian conditions — monsoon, heavy axle loads and long sections.',
        'It is also what makes long automatic block sections practical. A track circuit becomes progressively harder to engineer as section length grows; an axle counter is largely indifferent to it, because it senses at the boundaries rather than through the whole length.',
        'Because detection is the input to every downstream safety decision — aspect control, interlocking route release, block working — its reliability sets the ceiling for the reliability of the entire signalling installation.',
      ],
    },
    schematic: {
      caption: 'Multi-section axle counter — shared detection points, single evaluator',
      nodes: [
        { id: 'dp1', label: 'DP 1', note: 'Detection point', x: 8, y: 72, kind: 'field' },
        { id: 'dp2', label: 'DP 2', note: 'Shared boundary', x: 34, y: 72, kind: 'field' },
        { id: 'dp3', label: 'DP 3', note: 'Shared boundary', x: 60, y: 72, kind: 'field' },
        { id: 'dp4', label: 'DP 4', note: 'Detection point', x: 86, y: 72, kind: 'field' },
        { id: 'ev', label: 'Evaluator', note: 'Count in / count out', x: 47, y: 36, kind: 'indoor' },
        { id: 'rst', label: 'Reset Unit', note: 'Supervised reset', x: 18, y: 14, kind: 'indoor' },
        { id: 'out', label: 'Vital Output', note: 'Clear / occupied', x: 76, y: 14, kind: 'indoor' },
      ],
      links: [
        { from: 'dp1', to: 'ev', kind: 'safety' },
        { from: 'dp2', to: 'ev', kind: 'safety' },
        { from: 'dp3', to: 'ev', kind: 'safety' },
        { from: 'dp4', to: 'ev', kind: 'safety' },
        { from: 'rst', to: 'ev', kind: 'command' },
        { from: 'ev', to: 'out', kind: 'safety' },
      ],
    },
    howItWorks: [
      {
        step: '01',
        title: 'Wheel sensing',
        detail:
          'A detection point at the section boundary senses each wheel flange passing over it and determines direction of travel from the order in which its sensor pair responds.',
      },
      {
        step: '02',
        title: 'Counting',
        detail:
          'The evaluator increments the count for axles entering the section and decrements for axles leaving. Direction matters: a train that reverses over a boundary must not corrupt the count.',
      },
      {
        step: '03',
        title: 'Clear determination',
        detail:
          'The section is declared clear only when the count returns to zero and the evaluator is itself healthy. Every other condition, including any doubt, yields occupied.',
      },
      {
        step: '04',
        title: 'Multi-section evaluation',
        detail:
          'One evaluator maintains counts for several adjacent sections simultaneously, with boundary detection points contributing to the sections on both sides of them.',
      },
      {
        step: '05',
        title: 'Supervised reset',
        detail:
          'Where a count is disturbed, restoration requires a supervised reset under defined operating rules — never an unchecked clearing of the section.',
      },
    ],
    scope: [
      {
        title: 'Detection point installation',
        detail:
          'Rail-mounted sensor assemblies, mounting and alignment to tolerance, trackside junction boxes and protection against track maintenance damage.',
      },
      {
        title: 'Evaluator provisioning',
        detail:
          'Evaluator racks in location huts or relay rooms, section configuration, vital output interfacing to interlocking and aspect control.',
      },
      {
        title: 'Cabling and transmission',
        detail:
          'Quad and signalling cable routes between detection points and evaluators, terminations, surge protection and earthing.',
      },
      {
        title: 'Calibration and proving',
        detail:
          'Sensor calibration, directional verification, count verification under test movements and endurance checking before commissioning.',
      },
      {
        title: 'Diagnostics integration',
        detail:
          'Bringing evaluator health and section state into the maintenance and diagnostic arrangements for the corridor.',
      },
    ],
    evidence: [
      {
        statement:
          'Cosmictech was established in 2016 with a work of supply and installation of axle counters (SSDAC) in Delhi division — axle counting is the discipline the company began in.',
        source: 'PROFILE',
      },
      {
        statement:
          'MSDAC works appear in the disclosed portfolio as part of a combined electronic interlocking, MSDAC, BPAC and IPS scope.',
        source: 'PROFILE',
      },
      {
        statement:
          'MSDAC is named among the key S&T technologies led at director level.',
        source: 'DECK',
      },
    ],
    systemTag: 'msdac',
    related: ['automatic-signalling', 'bpac', 'electronic-interlocking'],
  },

  /* ------------------------------------------------------------------ 04 */
  {
    slug: 'bpac',
    index: '04',
    name: 'Block Proving by Axle Counter',
    navLabel: 'BPAC',
    expansion: 'BPAC',
    summary:
      'Automatic proving of the block section clear, replacing the manual block instrument exchange between stations.',
    lede: 'Block working is the rule that keeps two trains out of the same section. BPAC replaces the human judgement at the heart of that rule with a machine that proves the section clear before the block can be given.',
    whatItIs: {
      heading: 'What it is',
      paragraphs: [
        'Under conventional absolute block working, the station master at the receiving end confirms that a train has arrived complete — traditionally by observing the last vehicle and its tail lamp — before giving the line clear back to the sending station. The safety of the section depends on that observation being correct.',
        'Block proving by axle counter mechanises it. Detection points at each end of the block section count axles in and out. The block can only be cleared when the evaluator proves the count has returned to zero, which is a positive demonstration that the whole train, including every vehicle, has left the section.',
        'The block instruments remain, but their release is now conditioned on axle counter proving rather than on observation alone.',
      ],
    },
    whyItMatters: {
      heading: 'Why it matters',
      paragraphs: [
        'A train parting in section is one of the classic hazards of block working: the front portion arrives, the rear portion remains on the line, and the section is wrongly declared clear. Axle-counter proving detects exactly this condition, because the axles that entered will not equal the axles that left.',
        'It also removes a routine human task from the critical path of every train movement, which both reduces risk and shortens section turnaround — a modest headway gain repeated at every block station along a route.',
      ],
    },
    schematic: {
      caption: 'Block proving — station to station, with axle-counter release',
      nodes: [
        { id: 'stA', label: 'Station A', note: 'Sending', x: 10, y: 24, kind: 'control' },
        { id: 'stB', label: 'Station B', note: 'Receiving', x: 88, y: 24, kind: 'control' },
        { id: 'biA', label: 'Block Instrument', note: 'Line clear', x: 26, y: 48, kind: 'indoor' },
        { id: 'biB', label: 'Block Instrument', note: 'Train arrived', x: 72, y: 48, kind: 'indoor' },
        { id: 'dpA', label: 'Detection Point', note: 'Section entry', x: 26, y: 78, kind: 'field' },
        { id: 'dpB', label: 'Detection Point', note: 'Section exit', x: 72, y: 78, kind: 'field' },
        { id: 'ev', label: 'Evaluator', note: 'Count zero = clear', x: 49, y: 60, kind: 'indoor' },
      ],
      links: [
        { from: 'stA', to: 'biA', kind: 'command' },
        { from: 'stB', to: 'biB', kind: 'command' },
        { from: 'biA', to: 'biB', kind: 'data', ortho: true },
        { from: 'dpA', to: 'ev', kind: 'safety' },
        { from: 'dpB', to: 'ev', kind: 'safety' },
        { from: 'ev', to: 'biB', kind: 'safety' },
        { from: 'ev', to: 'biA', kind: 'safety' },
      ],
    },
    howItWorks: [
      {
        step: '01',
        title: 'Line clear request',
        detail:
          'The sending station asks the receiving station for line clear. Nothing may enter the section until it is granted.',
      },
      {
        step: '02',
        title: 'Section entry counted',
        detail:
          'As the train enters, the detection point at the sending end counts its axles into the section.',
      },
      {
        step: '03',
        title: 'Section exit counted',
        detail:
          'At the receiving end, the detection point counts axles out. The evaluator compares the two.',
      },
      {
        step: '04',
        title: 'Complete arrival proved',
        detail:
          'Only when the count returns to zero is the train proven to have arrived complete. A parted train leaves a non-zero count and the section stays blocked.',
      },
      {
        step: '05',
        title: 'Block release',
        detail:
          'With the section proven clear, the block instruments may be restored to normal and the section offered for the next movement.',
      },
    ],
    scope: [
      {
        title: 'Section survey and design',
        detail:
          'Block section assessment, detection point siting at section limits and integration design with the existing block arrangement.',
      },
      {
        title: 'Equipment installation',
        detail:
          'Detection points, evaluators, block interface equipment and the cable route between block stations.',
      },
      {
        title: 'Block instrument interfacing',
        detail:
          'Conditioning the release of existing block instruments on axle counter proving, without weakening any existing interlocking condition.',
      },
      {
        title: 'Testing and commissioning',
        detail:
          'Proving under test movements including deliberate abnormal cases, followed by commissioning under traffic block.',
      },
    ],
    evidence: [
      {
        statement:
          'BPAC works appear in the disclosed portfolio within a combined electronic interlocking, MSDAC, BPAC and IPS scope.',
        source: 'PROFILE',
      },
    ],
    systemTag: 'bpac',
    related: ['msdac', 'automatic-signalling', 'railway-snt'],
  },

  /* ------------------------------------------------------------------ 05 */
  {
    slug: 'train-control-systems',
    index: '05',
    name: 'Train Control Systems',
    navLabel: 'Train Control',
    summary:
      'Kavach, ETCS and CBTC — the protection and control layer that supervises the train itself, above the trackside signalling.',
    lede: 'Signalling tells a driver what is permitted. Train control systems enforce it. This layer supervises speed and movement authority continuously and intervenes when a train exceeds what the infrastructure has authorised.',
    whatItIs: {
      heading: 'What it is',
      paragraphs: [
        'Conventional signalling depends on a driver correctly observing and obeying an aspect. Automatic train protection removes that single point of dependence by transmitting movement authority to the train and supervising compliance continuously.',
        'Kavach is the Indian train collision avoidance system, providing automatic braking on overspeed and on approach to a signal at danger, together with train-to-train protection. ETCS is the European Train Control System standard used widely on high-speed and conventional main lines. CBTC — communications-based train control — uses continuous radio communication and precise train position reporting to support the very short headways that metro operations require.',
        'All three share a structure: determine where the train is, determine how far it may safely proceed, transmit that authority, and supervise the train against it.',
      ],
    },
    whyItMatters: {
      heading: 'Why it matters',
      paragraphs: [
        'Train control is the layer that converts a signalling system from advisory to enforcing. It addresses the hazard classes that trackside signalling alone cannot — signal passed at danger, overspeed on a restricted section, and collision between trains sharing a corridor.',
        'It is also the direction of travel for Indian Railways and for metro and high-speed networks generally. A signalling contractor that cannot work at this layer is confined to the infrastructure being replaced rather than the infrastructure being built.',
        'Crucially, train control depends on the layers beneath it. Its movement authorities are only as trustworthy as the detection and interlocking that generate them, which is why capability across the whole stack matters more than capability in any one part of it.',
      ],
    },
    schematic: {
      caption: 'Train control layer — authority generation, transmission and on-board supervision',
      nodes: [
        { id: 'il', label: 'Interlocking', note: 'Route & occupancy state', x: 12, y: 30, kind: 'indoor' },
        { id: 'rbc', label: 'Authority Computer', note: 'Movement authority', x: 40, y: 18, kind: 'control' },
        { id: 'ts', label: 'Trackside Unit', note: 'Radio / balise', x: 66, y: 34, kind: 'trackside' },
        { id: 'ob', label: 'On-board Unit', note: 'Supervision', x: 88, y: 60, kind: 'field' },
        { id: 'loc', label: 'Position Reporting', note: 'Train location', x: 60, y: 76, kind: 'field' },
        { id: 'brk', label: 'Brake Interface', note: 'Intervention', x: 88, y: 88, kind: 'field' },
        { id: 'ctc', label: 'Traffic Control', note: 'Centralised', x: 14, y: 66, kind: 'network' },
      ],
      links: [
        { from: 'il', to: 'rbc', kind: 'safety' },
        { from: 'rbc', to: 'ts', kind: 'data' },
        { from: 'ts', to: 'ob', kind: 'data' },
        { from: 'ob', to: 'brk', kind: 'safety' },
        { from: 'loc', to: 'ts', kind: 'data' },
        { from: 'ob', to: 'loc', kind: 'data', ortho: true },
        { from: 'ctc', to: 'rbc', kind: 'command', ortho: true },
      ],
    },
    howItWorks: [
      {
        step: '01',
        title: 'State acquisition',
        detail:
          'The control system reads route state and section occupancy from the interlocking — the same vital sources that drive trackside aspects.',
      },
      {
        step: '02',
        title: 'Authority computation',
        detail:
          'From that state the system computes how far each train may proceed and at what speed, taking account of gradient, permanent speed restrictions and the position of trains ahead.',
      },
      {
        step: '03',
        title: 'Transmission to train',
        detail:
          'Authority is transmitted to the on-board unit — by balise, by radio, or by a combination — together with the infrastructure data the train needs to compute its braking curve.',
      },
      {
        step: '04',
        title: 'On-board supervision',
        detail:
          'The on-board unit continuously compares actual speed and position against the permitted braking curve, and displays the supervised limits to the driver.',
      },
      {
        step: '05',
        title: 'Intervention',
        detail:
          'If the train exceeds the supervised curve, the system applies the brake automatically. Intervention is the last resort, not the normal mode of operation.',
      },
      {
        step: '06',
        title: 'Position reporting',
        detail:
          'The train reports its position back, which allows authorities to be extended as the line ahead clears — the mechanism behind short headways in CBTC operation.',
      },
    ],
    scope: [
      {
        title: 'Interface engineering',
        detail:
          'Defining and implementing the interface between existing interlocking estate and the train control layer, including data mapping and vital interface design.',
      },
      {
        title: 'Trackside deployment',
        detail:
          'Trackside units, radio infrastructure or balise installation, siting, and the cabling and power arrangements they require.',
      },
      {
        title: 'Integration testing',
        detail:
          'Verification that authorities generated from interlocking state correctly reflect field conditions, across normal, degraded and failure cases.',
      },
      {
        title: 'Migration and staged operation',
        detail:
          'Planning the transition from an unprotected to a protected corridor while the route remains in service.',
      },
    ],
    evidence: [
      {
        statement:
          'Cosmictech states industry-leading expertise in Kavach and in signalling technologies for high-speed and metro rail networks, including ETCS and CBTC.',
        source: 'DECK',
      },
      {
        statement:
          'Key technologies led at director level include EI, MSDAC, CBTC and Kavach, over 10+ years in S&T.',
        source: 'DECK',
      },
    ],
    systemTag: null,
    related: ['electronic-interlocking', 'automatic-signalling', 'telecommunications'],
  },

  /* ------------------------------------------------------------------ 06 */
  {
    slug: 'railway-snt',
    index: '06',
    name: 'Railway Signalling & Telecommunications',
    navLabel: 'Railway S&T',
    expansion: 'S&T',
    summary:
      'The complete S&T discipline — design, supply, installation, testing and commissioning across indoor and outdoor signalling estate.',
    lede: 'S&T is not a product. It is the whole trackside and indoor estate that makes movement safe: detection, interlocking, aspects, power, cable and the communications that tie them together — and the discipline of altering all of it while trains keep running.',
    whatItIs: {
      heading: 'What it is',
      paragraphs: [
        'Signalling and telecommunications covers everything from the sensor on the rail to the panel in the control room. It includes the outdoor estate — point machines, signals, detection, location boxes, cable routes, earthing — and the indoor estate of relay rooms, equipment racks, power supply and control terminals.',
        'It also covers the engineering practice that surrounds them: control table preparation, wire counting, function and correspondence testing, safety validation and the phased cut-over planning that lets an operational yard be reconfigured without being closed.',
        'Most railway modernisation works are S&T works by another name. A yard remodelling is a permanent way alteration wrapped in a signalling alteration; a doubling is a new line wrapped in a block and interlocking alteration.',
      ],
    },
    whyItMatters: {
      heading: 'Why it matters',
      paragraphs: [
        'S&T work is unusual among infrastructure disciplines in that it is almost always brownfield and almost always under traffic. The existing system must stay safe and operable throughout, and the new system must be proven safe before it takes over. There is no equivalent of a phased opening.',
        'That constraint puts the premium on testing discipline and cut-over planning rather than on construction throughput. A yard can be rebuilt in stages; an interlocking changes over in a single proven step during a traffic block, and it must be right.',
        'It is also why depth across the whole stack matters commercially. A contractor who can only install cannot take responsibility for the commissioning; a contractor who can design, install, test and commission can take a turnkey scope and hold the safety case for it.',
      ],
    },
    schematic: {
      caption: 'S&T estate — outdoor to indoor to control',
      nodes: [
        { id: 'pm', label: 'Point Machines', x: 10, y: 82, kind: 'field' },
        { id: 'sg', label: 'Signals', x: 32, y: 82, kind: 'trackside' },
        { id: 'det', label: 'Detection', note: 'AC / TC', x: 54, y: 82, kind: 'field' },
        { id: 'lb', label: 'Location Boxes', x: 76, y: 82, kind: 'trackside' },
        { id: 'cable', label: 'Cable Route', note: 'Signalling & quad', x: 43, y: 58, kind: 'trackside' },
        { id: 'rr', label: 'Relay / Equipment Room', x: 43, y: 34, kind: 'indoor' },
        { id: 'ips', label: 'IPS & Batteries', x: 82, y: 34, kind: 'indoor' },
        { id: 'op', label: 'Operating Panel / VDU', x: 43, y: 12, kind: 'control' },
        { id: 'tele', label: 'Telecom Bearer', x: 12, y: 34, kind: 'network' },
      ],
      links: [
        { from: 'pm', to: 'cable', kind: 'safety' },
        { from: 'sg', to: 'cable', kind: 'safety' },
        { from: 'det', to: 'cable', kind: 'safety' },
        { from: 'lb', to: 'cable', kind: 'safety' },
        { from: 'cable', to: 'rr', kind: 'safety' },
        { from: 'ips', to: 'rr', kind: 'power' },
        { from: 'rr', to: 'op', kind: 'command' },
        { from: 'tele', to: 'rr', kind: 'data' },
      ],
    },
    howItWorks: [
      {
        step: '01',
        title: 'Survey and design',
        detail:
          'Existing yard and section survey, signalling plan, control tables, cable plan and bill of materials, reconciled against the permanent way alteration.',
      },
      {
        step: '02',
        title: 'Supply',
        detail:
          'Procurement of approved signalling equipment through the supplier network, sequenced to the construction and block programme.',
      },
      {
        step: '03',
        title: 'Installation',
        detail:
          'Outdoor gear erection, cable laying and termination, indoor rack building and wiring, executed alongside live operations.',
      },
      {
        step: '04',
        title: 'Testing',
        detail:
          'Wire counting, insulation and continuity testing, function testing against control tables, and correspondence testing between indoor logic and field response.',
      },
      {
        step: '05',
        title: 'Commissioning',
        detail:
          'Cut-over during traffic block, final proving of the new arrangement, and hand-back of a working system to the operating and maintenance organisations.',
      },
    ],
    scope: [
      {
        title: 'Turnkey S&T execution',
        detail:
          'Complete project life cycle from design through supply, installation, testing and commissioning, under a single responsibility.',
      },
      {
        title: 'Yard remodelling',
        detail:
          'Re-signalling of station yards in step with layout alterations, including new interlocking provision or alteration of existing interlocking.',
      },
      {
        title: 'Doubling and patch doubling',
        detail:
          'Signalling for new second lines and for patch doubling of block sections, including alteration of the interlockings at each end.',
      },
      {
        title: 'Systems replacement',
        detail:
          'Replacement of legacy panel interlocking and life-expired outdoor gear with current-generation equipment.',
      },
      {
        title: 'Power systems',
        detail:
          'Integrated power supply, battery banks and distribution engineered for uninterrupted signalling supply.',
      },
    ],
    evidence: [
      {
        statement:
          'Deep expertise and experience in seamless, timely execution of complete S&T turnkey EPC/GCC projects, with a 100% project success rate and no penalties or liquidated damages imposed.',
        source: 'PROFILE',
      },
      {
        statement:
          'Strong in-house team of professionals for the complete project life cycle, including retired railway S&T engineers and signalling professionals.',
        source: 'PROFILE',
      },
      {
        statement:
          'Cosmictech delivers large-scale railway S&T EPC projects.',
        source: 'DECK',
      },
    ],
    systemTag: 'outdoor-gear',
    related: ['electronic-interlocking', 'epc-gcc', 'telecommunications'],
  },

  /* ------------------------------------------------------------------ 07 */
  {
    slug: 'telecommunications',
    index: '07',
    name: 'Railway Telecommunications',
    navLabel: 'Telecommunications',
    summary:
      'The bearer layer — transmission, train control communication and the networks that carry signalling data between locations.',
    lede: 'Telecommunications is the half of S&T that carries everything else. Signalling data, control indications, train control messages and operational voice all depend on a transmission estate that must stay available when the weather and the traffic are at their worst.',
    whatItIs: {
      heading: 'What it is',
      paragraphs: [
        'Railway telecommunications spans the optical fibre and copper transmission along the route, the equipment that multiplexes traffic onto it, the radio systems used for train and station communication, and the operational voice circuits that connect control offices, block stations and maintenance staff.',
        'As signalling has become digital, the bearer layer has become part of the safety story rather than an adjunct to it. Interlocking-to-interlocking links, centralised traffic control indications and train control messaging all ride on it.',
      ],
    },
    whyItMatters: {
      heading: 'Why it matters',
      paragraphs: [
        'Availability requirements on a railway bearer network are severe, and they are geographic: a corridor is a line, not a campus, so a single cable route failure can isolate a long stretch of infrastructure. Route diversity and resilient topology matter more here than raw bandwidth.',
        'The move toward radio-based train control raises the stakes further. Where movement authority is transmitted over radio, the communication link is inside the safety argument, and its performance envelope has to be engineered and demonstrated rather than assumed.',
      ],
    },
    schematic: {
      caption: 'Bearer layer — transmission along the corridor with resilient topology',
      nodes: [
        { id: 'stn1', label: 'Station A', x: 10, y: 62, kind: 'network' },
        { id: 'stn2', label: 'Station B', x: 38, y: 62, kind: 'network' },
        { id: 'stn3', label: 'Station C', x: 66, y: 62, kind: 'network' },
        { id: 'ctrl', label: 'Control Office', x: 90, y: 30, kind: 'control' },
        { id: 'fo', label: 'Optical Fibre', note: 'Primary path', x: 38, y: 32, kind: 'network' },
        { id: 'alt', label: 'Diverse Route', note: 'Protection path', x: 38, y: 88, kind: 'network' },
        { id: 'rad', label: 'Radio', note: 'Train & station', x: 66, y: 14, kind: 'trackside' },
      ],
      links: [
        { from: 'stn1', to: 'fo', kind: 'data' },
        { from: 'stn2', to: 'fo', kind: 'data' },
        { from: 'stn3', to: 'fo', kind: 'data' },
        { from: 'fo', to: 'ctrl', kind: 'data' },
        { from: 'stn1', to: 'alt', kind: 'data' },
        { from: 'stn3', to: 'alt', kind: 'data' },
        { from: 'alt', to: 'ctrl', kind: 'data', ortho: true },
        { from: 'rad', to: 'ctrl', kind: 'data' },
      ],
    },
    howItWorks: [
      {
        step: '01',
        title: 'Route survey',
        detail:
          'Cable route planning along the corridor, including crossings, duct provision and the identification of diverse paths.',
      },
      {
        step: '02',
        title: 'Transmission installation',
        detail:
          'Optical fibre and copper installation, jointing, termination and testing to the required loss and continuity standards.',
      },
      {
        step: '03',
        title: 'Node provisioning',
        detail:
          'Transmission and multiplexing equipment at stations and control locations, configured for the services the corridor carries.',
      },
      {
        step: '04',
        title: 'Service integration',
        detail:
          'Carriage of signalling data, control indications, train control messaging and operational voice over the common bearer with appropriate separation.',
      },
      {
        step: '05',
        title: 'Resilience proving',
        detail:
          'Demonstration of protection switching and service continuity under single-path failure conditions.',
      },
    ],
    scope: [
      {
        title: 'Transmission estate',
        detail:
          'Optical fibre and copper route works, jointing, termination, testing and documentation along the corridor.',
      },
      {
        title: 'Network equipment',
        detail:
          'Transmission and multiplexing nodes at stations, control offices and interlocking locations.',
      },
      {
        title: 'Operational communications',
        detail:
          'Control, block and emergency communication circuits between operating locations.',
      },
      {
        title: 'Signalling interface',
        detail:
          'Provision of the bearer services that interlocking, control and train control systems depend upon.',
      },
    ],
    evidence: [
      {
        statement:
          'Telecommunications is part of the S&T scope Cosmictech delivers — the company describes its work as Railway Signaling & Telecommunications (S&T) EPC projects.',
        source: 'DECK',
      },
    ],
    systemTag: null,
    related: ['railway-snt', 'train-control-systems', 'epc-gcc'],
  },

  /* ------------------------------------------------------------------ 08 */
  {
    slug: 'epc-gcc',
    index: '08',
    name: 'Turnkey EPC & GCC Delivery',
    navLabel: 'EPC / GCC',
    expansion: 'EPC / GCC',
    summary:
      'Single-responsibility delivery of complete S&T scopes — engineering, procurement, construction and commissioning under one contract.',
    lede: 'Turnkey delivery means one organisation carries the scope from design through to a commissioned, handed-over system. On a railway under traffic, that single line of responsibility is what makes the programme governable.',
    whatItIs: {
      heading: 'What it is',
      paragraphs: [
        'Under an EPC or GCC arrangement the contractor takes responsibility for engineering, procurement and construction as a single package, rather than executing against someone else’s design and material supply. On S&T works this extends through testing and commissioning to the point where a working, proven system is handed back.',
        'The practical consequence is that design decisions, procurement lead times, site sequencing and block planning are all optimised against one another rather than negotiated across contractual boundaries. Where they conflict, one party resolves it.',
      ],
    },
    whyItMatters: {
      heading: 'Why it matters',
      paragraphs: [
        'Railway S&T programmes fail on interfaces far more often than on engineering. Equipment arrives against a design that has since changed; a traffic block is granted for work that cannot proceed because a dependency is unmet; testing reveals a discrepancy between the as-built estate and the control tables. Turnkey responsibility internalises those interfaces.',
        'It also changes what the client is buying. Under a turnkey scope the deliverable is a commissioned system with a safety case behind it, not a set of installed components — and the commercial consequences of delay and defect sit with the party best placed to prevent them.',
      ],
    },
    schematic: {
      caption: 'Turnkey delivery sequence — single responsibility across the life cycle',
      nodes: [
        { id: 'e', label: 'Engineering', note: 'Design & control tables', x: 10, y: 30, kind: 'control' },
        { id: 'p', label: 'Procurement', note: 'Approved supply chain', x: 30, y: 62, kind: 'network' },
        { id: 'c', label: 'Construction', note: 'Indoor & outdoor', x: 52, y: 30, kind: 'field' },
        { id: 't', label: 'Testing', note: 'Wire count & function', x: 72, y: 62, kind: 'indoor' },
        { id: 'cm', label: 'Commissioning', note: 'Under traffic block', x: 90, y: 30, kind: 'control' },
        { id: 'blk', label: 'Block Planning', note: 'Operational interface', x: 52, y: 88, kind: 'network' },
      ],
      links: [
        { from: 'e', to: 'p', kind: 'command' },
        { from: 'p', to: 'c', kind: 'command' },
        { from: 'c', to: 't', kind: 'command' },
        { from: 't', to: 'cm', kind: 'command' },
        { from: 'blk', to: 'c', kind: 'data' },
        { from: 'blk', to: 'cm', kind: 'data' },
        { from: 'e', to: 't', kind: 'data', ortho: true },
      ],
    },
    howItWorks: [
      {
        step: '01',
        title: 'Scope definition',
        detail:
          'Survey of the existing estate and confirmation of the works required against the operating requirement and the permanent way programme.',
      },
      {
        step: '02',
        title: 'Design and approval',
        detail:
          'Signalling plans, control tables and cable plans prepared and taken through the client approval process.',
      },
      {
        step: '03',
        title: 'Procurement',
        detail:
          'Ordering of approved equipment against the design and the block programme, using established supplier relationships to hold lead times.',
      },
      {
        step: '04',
        title: 'Execution',
        detail:
          'Site works sequenced around live operations, with pre-block preparation carried as far as possible before any traffic impact.',
      },
      {
        step: '05',
        title: 'Testing and commissioning',
        detail:
          'Full testing regime followed by cut-over during granted block, and hand-over of a proven system with its documentation.',
      },
    ],
    scope: [
      {
        title: 'Complete project life cycle',
        detail:
          'In-house capability across design, procurement, execution, testing and commissioning rather than a single stage of it.',
      },
      {
        title: 'Supply chain management',
        detail:
          'Long-standing relationships with major S&T suppliers to secure approved equipment to programme.',
      },
      {
        title: 'Client and operations interface',
        detail:
          'Co-ordination with railway S&T, operating and permanent way organisations through design approval, block planning and commissioning.',
      },
      {
        title: 'Programme and commercial control',
        detail:
          'Delivery against stipulated timelines with quality, safety and coordination maintained throughout.',
      },
    ],
    evidence: [
      {
        statement:
          'Deep expertise and experience in seamless, timely execution of complete S&T turnkey EPC/GCC projects, with a 100% project success rate and no penalties or liquidated damages imposed.',
        source: 'PROFILE',
      },
      {
        statement:
          'Extensive industry experience and long-standing relationships with all major S&T suppliers have resulted in Cosmictech being a trusted partner for the suppliers.',
        source: 'PROFILE',
      },
      {
        statement:
          'Previous engagements were completed within stipulated timelines while maintaining quality, safety, and coordination with railway officials.',
        source: 'PROFILE',
      },
    ],
    systemTag: null,
    related: ['railway-snt', 'electronic-interlocking', 'automatic-signalling'],
  },
]

export function getCapability(slug: string): Capability | undefined {
  return capabilities.find((c) => c.slug === slug)
}

export const capabilityNav = capabilities.map((c) => ({
  slug: c.slug,
  label: c.navLabel,
  index: c.index,
  summary: c.summary,
}))
