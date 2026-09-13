'use client'

import { useId, useState } from 'react'
import type { Schematic, SchematicNode } from '@/data/schematic'
import { linkKindLabels } from '@/data/schematic'
import { cn } from '@/lib/utils'

/**
 * SYSTEM SCHEMATIC
 *
 * The site's single diagram language. Every capability architecture, and the
 * 2D counterpart of the homepage 3D corridor, renders through this one
 * component from the shared `Schematic` model.
 *
 * The interaction is the point: selecting a node illuminates exactly what it
 * is connected to and nothing else. Interlocking expressed as interface —
 * the relationships are the content, not decoration around it.
 *
 * Accessibility: the SVG is decorative-with-label; the authoritative content
 * is the description list beneath it, which is always in the DOM and carries
 * every node and every connection in text.
 */

const W = 1000
const H = 500

const px = (x: number) => (x / 100) * W
const py = (y: number) => (y / 100) * H

const kindStroke: Record<string, string> = {
  safety: 'stroke-[1.6]',
  data: 'stroke-[1.2] [stroke-dasharray:7_5]',
  command: 'stroke-[1.2]',
  power: 'stroke-[1.2] [stroke-dasharray:1.5_4.5]',
}

function nodeShape(node: SchematicNode) {
  // Field equipment reads as a circle (a thing on the rail);
  // indoor and control equipment reads as a square (a thing in a rack).
  return node.kind === 'field' || node.kind === 'trackside' ? 'circle' : 'square'
}

export function SystemSchematic({
  schematic,
  className,
  figureNumber,
}: {
  schematic: Schematic
  className?: string
  /** Drawing-sheet reference, e.g. "FIG. 02". */
  figureNumber?: string
}) {
  const uid = useId().replace(/[:]/g, '')
  const [active, setActive] = useState<string | null>(null)

  const byId = new Map(schematic.nodes.map((n) => [n.id, n]))
  const connected = new Set<string>()
  if (active) {
    for (const l of schematic.links) {
      if (l.from === active) connected.add(l.to)
      if (l.to === active) connected.add(l.from)
    }
  }

  const isLinkLit = (from: string, to: string) =>
    active !== null && (from === active || to === active)

  const usedKinds = Array.from(new Set(schematic.links.map((l) => l.kind)))

  return (
    <figure className={cn('relative', className)}>
      <div className="flex items-baseline justify-between gap-4 border-t border-hairline-strong pt-3">
        <span className="font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
          {figureNumber ?? 'Fig.'} — System architecture
        </span>
        <span className="hidden font-mono text-micro tracking-[0.1em] text-faint uppercase sm:block">
          Select a node to trace its connections
        </span>
      </div>

      {/* Diagram. Scrolls horizontally on narrow viewports rather than
          shrinking type below a legible size. */}
      <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="mt-6 h-auto w-full min-w-[38rem] overflow-visible"
          role="img"
          aria-labelledby={`${uid}-cap`}
          onMouseLeave={() => setActive(null)}
        >
          <defs>
            <marker
              id={`${uid}-arrow`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 1.5 9 5 0 8.5z" className="fill-current" />
            </marker>
          </defs>

          {/* Registration grid — the drawing sheet the diagram sits on. */}
          <g className="text-hairline" opacity={0.55}>
            {Array.from({ length: 11 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={(i / 10) * W}
                y1={0}
                x2={(i / 10) * W}
                y2={H}
                stroke="currentColor"
                strokeWidth={0.5}
              />
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1={0}
                y1={(i / 6) * H}
                x2={W}
                y2={(i / 6) * H}
                stroke="currentColor"
                strokeWidth={0.5}
              />
            ))}
          </g>

          {/* Links */}
          <g fill="none">
            {schematic.links.map((link, i) => {
              const a = byId.get(link.from)
              const b = byId.get(link.to)
              if (!a || !b) return null
              const lit = isLinkLit(link.from, link.to)
              const d = link.ortho
                ? `M ${px(a.x)} ${py(a.y)} L ${px(a.x)} ${py((a.y + b.y) / 2)} L ${px(b.x)} ${py((a.y + b.y) / 2)} L ${px(b.x)} ${py(b.y)}`
                : `M ${px(a.x)} ${py(a.y)} L ${px(b.x)} ${py(b.y)}`

              return (
                <path
                  key={`${link.from}-${link.to}-${i}`}
                  d={d}
                  stroke="currentColor"
                  markerEnd={link.kind === 'command' ? `url(#${uid}-arrow)` : undefined}
                  className={cn(
                    'transition-[opacity,color] duration-300 ease-[var(--ease-state)]',
                    kindStroke[link.kind],
                    lit ? 'text-accent opacity-100' : 'text-steel-500',
                    active && !lit ? 'opacity-25' : 'opacity-70',
                  )}
                />
              )
            })}
          </g>

          {/* Nodes */}
          <g>
            {schematic.nodes.map((node) => {
              const lit = active === node.id
              const near = connected.has(node.id)
              const dim = active !== null && !lit && !near
              const shape = nodeShape(node)
              const x = px(node.x)
              const y = py(node.y)

              return (
                <g
                  key={node.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`${node.label}${node.note ? `. ${node.note}` : ''}`}
                  aria-pressed={lit}
                  onMouseEnter={() => setActive(node.id)}
                  onFocus={() => setActive(node.id)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(lit ? null : node.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      // Focus already selects the node, so Enter must confirm
                      // the selection rather than toggle it straight back off.
                      e.preventDefault()
                      setActive(node.id)
                    }
                  }}
                  className={cn(
                    'cursor-pointer transition-opacity duration-300 focus:outline-none',
                    dim ? 'opacity-30' : 'opacity-100',
                  )}
                >
                  {/* Generous invisible hit area — 44px at typical render scale. */}
                  <rect x={x - 44} y={y - 30} width={88} height={60} fill="transparent" />

                  {/* Focus indicator */}
                  <rect
                    x={x - 44}
                    y={y - 30}
                    width={88}
                    height={60}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                    className="text-accent opacity-0 group-focus:opacity-100 [g:focus-visible>&]:opacity-100"
                  />

                  {shape === 'circle' ? (
                    <circle
                      cx={x}
                      cy={y}
                      r={7.5}
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className={cn(
                        'transition-colors duration-300',
                        lit ? 'fill-accent text-accent' : 'fill-surface text-steel-400',
                        near && !lit && 'text-accent',
                      )}
                    />
                  ) : (
                    <rect
                      x={x - 7.5}
                      y={y - 7.5}
                      width={15}
                      height={15}
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className={cn(
                        'transition-colors duration-300',
                        lit ? 'fill-accent text-accent' : 'fill-surface text-steel-400',
                        near && !lit && 'text-accent',
                      )}
                    />
                  )}

                  {/* Leader line to the label — engineering callout convention */}
                  <line
                    x1={x}
                    y1={y - 10}
                    x2={x}
                    y2={y - 18}
                    stroke="currentColor"
                    strokeWidth={1}
                    className={lit || near ? 'text-accent' : 'text-steel-600'}
                  />

                  <text
                    x={x}
                    y={y - 23}
                    textAnchor="middle"
                    className={cn(
                      'font-display text-[15px] font-medium transition-colors duration-300',
                      lit ? 'fill-accent' : 'fill-current text-primary',
                    )}
                  >
                    {node.label}
                  </text>
                  {node.note ? (
                    <text
                      x={x}
                      y={y + 26}
                      textAnchor="middle"
                      className="fill-current font-mono text-[11px] tracking-[0.08em] text-tertiary uppercase"
                    >
                      {node.note}
                    </text>
                  ) : null}
                </g>
              )
            })}
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-hairline pt-4">
        {usedKinds.map((kind) => (
          <span key={kind} className="flex items-center gap-2.5">
            <svg width="26" height="6" viewBox="0 0 26 6" aria-hidden className="text-steel-400">
              <line
                x1="0"
                y1="3"
                x2="26"
                y2="3"
                stroke="currentColor"
                className={kindStroke[kind]}
              />
            </svg>
            <span className="font-mono text-micro tracking-[0.1em] text-tertiary uppercase">
              {linkKindLabels[kind]}
            </span>
          </span>
        ))}
      </div>

      <figcaption id={`${uid}-cap`} className="mt-4 font-mono text-micro text-tertiary">
        {schematic.caption}
      </figcaption>

      {/* Authoritative accessible equivalent of the drawing. */}
      <details className="mt-4 border-t border-hairline pt-4">
        <summary className="cursor-pointer font-mono text-micro tracking-[0.12em] text-tertiary uppercase transition-colors hover:text-accent">
          Read this diagram as text
        </summary>
        <dl className="mt-4 space-y-3">
          {schematic.nodes.map((node) => {
            const links = schematic.links.filter((l) => l.from === node.id || l.to === node.id)
            return (
              <div key={node.id} className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4">
                <dt className="text-small font-medium text-primary">
                  {node.label}
                  {node.note ? <span className="text-tertiary"> — {node.note}</span> : null}
                </dt>
                <dd className="text-small text-secondary sm:col-span-2">
                  {links.length === 0
                    ? 'No connections shown.'
                    : links
                        .map((l) => {
                          const otherId = l.from === node.id ? l.to : l.from
                          const other = byId.get(otherId)
                          return `${linkKindLabels[l.kind]} to ${other?.label ?? otherId}`
                        })
                        .join('; ')}
                  .
                </dd>
              </div>
            )
          })}
        </dl>
      </details>
    </figure>
  )
}
