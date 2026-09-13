'use client'

import { sectionBoundaries, systemLayers } from '@/data/systemLayers'
import { cn } from '@/lib/utils'

/**
 * The corridor, flattened.
 *
 * This is the same lattice as the 3D scene drawn orthographically: the track
 * datum at the base, the signalling stack above it, risers at each block
 * boundary. It is the primary rendering on phones and the fallback wherever
 * WebGL is unavailable — not a degraded substitute, but the drawing the 3D
 * scene is a view of.
 */

/* The drawing is sized so its type stays legible when the SVG is scaled
   down to a phone's width: a narrower viewBox means a larger effective
   font size at the same rendered width. */
const W = 420
const ROW = 50
const PAD_TOP = 24
const LEFT = 40
const RIGHT = W - 14

export function CorridorDiagram({
  activeLayer,
  onSelect,
  className,
}: {
  activeLayer: string | null
  onSelect?: (id: string) => void
  className?: string
}) {
  const rows = [...systemLayers].reverse() // intelligence at the top
  const H = PAD_TOP * 2 + ROW * (rows.length - 1)
  const yFor = (idx: number) => PAD_TOP + idx * ROW
  const xFor = (i: number) => LEFT + (i / (sectionBoundaries.length - 1)) * (RIGHT - LEFT)

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn('h-auto w-full', className)}
      role="img"
      aria-label="The railway system stack: seven connected layers from the physical corridor up to intelligence, tied together at each block section boundary."
    >
      {/* Risers — the interlock lattice */}
      <g className="text-steel-600">
        {sectionBoundaries.map((_, bi) => (
          <line
            key={bi}
            x1={xFor(bi)}
            y1={yFor(0)}
            x2={xFor(bi)}
            y2={yFor(rows.length - 1)}
            stroke="currentColor"
            strokeWidth={1}
            strokeDasharray="2 5"
            opacity={0.65}
          />
        ))}
      </g>

      {rows.map((layer, ri) => {
        const active = activeLayer === layer.id
        const y = yFor(ri)
        const isDatum = layer.id === 'physical'

        return (
          <g
            key={layer.id}
            tabIndex={onSelect ? 0 : undefined}
            role={onSelect ? 'button' : undefined}
            aria-pressed={onSelect ? active : undefined}
            aria-label={onSelect ? `${layer.name} — ${layer.role}` : undefined}
            onMouseEnter={() => onSelect?.(layer.id)}
            onFocus={() => onSelect?.(layer.id)}
            onClick={() => onSelect?.(layer.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelect?.(layer.id)
              }
            }}
            className={cn(
              'transition-opacity duration-300',
              onSelect && 'cursor-pointer',
              activeLayer && !active ? 'opacity-40' : 'opacity-100',
            )}
          >
            <rect x={0} y={y - ROW / 2} width={W} height={ROW} fill="transparent" />

            {/* Layer index */}
            <text
              x={2}
              y={y + 3.5}
              className={cn(
                'fill-current font-mono text-[11px] tracking-[0.1em]',
                active ? 'text-accent' : 'text-faint',
              )}
            >
              {layer.index}
            </text>

            {/* The run */}
            {isDatum ? (
              // Track datum: two rails
              <>
                <line
                  x1={LEFT - 8}
                  y1={y - 3}
                  x2={RIGHT + 8}
                  y2={y - 3}
                  stroke="currentColor"
                  strokeWidth={1.2}
                  className={active ? 'text-accent' : 'text-steel-400'}
                />
                <line
                  x1={LEFT - 8}
                  y1={y + 3}
                  x2={RIGHT + 8}
                  y2={y + 3}
                  stroke="currentColor"
                  strokeWidth={1.2}
                  className={active ? 'text-accent' : 'text-steel-400'}
                />
              </>
            ) : (
              <line
                x1={LEFT - 8}
                y1={y}
                x2={RIGHT + 8}
                y2={y}
                stroke="currentColor"
                strokeWidth={1.2}
                className={active ? 'text-accent' : 'text-steel-600'}
              />
            )}

            {/* Boundary nodes */}
            {sectionBoundaries.map((_, bi) => (
              <rect
                key={bi}
                x={xFor(bi) - 3}
                y={y - 3}
                width={6}
                height={6}
                className={cn(
                  'transition-colors duration-300',
                  active ? 'fill-accent' : 'fill-steel-500',
                )}
              />
            ))}

            {/* Label above the run. The layer's role is deliberately not
                repeated here — every context that renders this drawing also
                renders the list that carries it, and duplicating it would
                only force the type smaller. */}
            <text
              x={LEFT - 8}
              y={y - 12}
              className={cn(
                'fill-current font-display text-[17px] font-medium',
                active ? 'text-accent' : 'text-primary',
              )}
            >
              {layer.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
