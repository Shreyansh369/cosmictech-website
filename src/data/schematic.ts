/**
 * Shared schematic model.
 *
 * One diagram language is used everywhere on the site: capability system
 * architectures, the homepage layer story, and the 3D corridor's annotation
 * set all read from this shape. Adding a diagram never means adding a
 * rendering component.
 */

export type NodeKind = 'field' | 'trackside' | 'indoor' | 'control' | 'network' | 'intelligence'

export interface SchematicNode {
  id: string
  label: string
  /** Short technical qualifier rendered as a mono annotation. */
  note?: string
  /** Position in a 0–100 coordinate space; the renderer scales it. */
  x: number
  y: number
  kind: NodeKind
}

export type LinkKind = 'safety' | 'data' | 'command' | 'power'

export interface SchematicLink {
  from: string
  to: string
  kind: LinkKind
  /** Draw as an orthogonal (right-angle) run rather than a direct line. */
  ortho?: boolean
}

export interface Schematic {
  /** Caption rendered beneath the drawing, drawing-sheet style. */
  caption: string
  nodes: SchematicNode[]
  links: SchematicLink[]
}

export const nodeKindLabels: Record<NodeKind, string> = {
  field: 'Field',
  trackside: 'Trackside',
  indoor: 'Indoor / Relay Room',
  control: 'Control',
  network: 'Network',
  intelligence: 'Intelligence',
}

export const linkKindLabels: Record<LinkKind, string> = {
  safety: 'Vital / safety circuit',
  data: 'Data',
  command: 'Command & indication',
  power: 'Power',
}
