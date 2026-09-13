'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { CorridorDiagram } from './CorridorDiagram'
import { systemLayers } from '@/data/systemLayers'
import { cn } from '@/lib/utils'

/**
 * SIGNATURE EXPERIENCE — loading and degradation policy
 *
 *  - The WebGL bundle is imported only when the block scrolls into view, and
 *    only on viewports wide enough for the corridor to be legible.
 *  - Below that width the 2D corridor drawing is the primary rendering, not
 *    a consolation: it is the same lattice, drawn orthographically.
 *  - prefers-reduced-motion holds the scene at a fixed camera and freezes the
 *    occupancy pulse mid-corridor, so the architecture is still readable.
 *  - Selection is driven by real buttons. Nothing in this experience depends
 *    on hover, and every layer is reachable by keyboard.
 */

const CorridorScene = dynamic(() => import('./CorridorScene'), {
  ssr: false,
  loading: () => null,
})

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

function useCanRender3D() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 64rem)')
    const check = () => {
      if (!mq.matches) {
        setOk(false)
        return
      }
      // Confirm WebGL is actually available before importing the renderer.
      try {
        const canvas = document.createElement('canvas')
        setOk(Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl')))
      } catch {
        setOk(false)
      }
    }
    check()
    mq.addEventListener('change', check)
    return () => mq.removeEventListener('change', check)
  }, [])
  return ok
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: '220px 0px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])
  return { ref, inView }
}

export function SystemCanvas() {
  const [active, setActive] = useState<string | null>(null)
  const reducedMotion = usePrefersReducedMotion()
  const can3D = useCanRender3D()
  const { ref, inView } = useInView<HTMLDivElement>()

  const activeLayer = systemLayers.find((l) => l.id === active) ?? null
  const show3D = can3D && inView

  return (
    <div ref={ref} className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
      {/* ---------------------------------------------- layer index rail */}
      <div className="lg:col-span-4 xl:col-span-3">
        <p className="border-t border-hairline-strong pt-3 font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
          System stack — select a layer
        </p>

        <ul className="mt-2">
          {systemLayers.map((layer) => {
            const on = active === layer.id
            return (
              <li key={layer.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(on ? null : layer.id)}
                  onMouseEnter={() => setActive(layer.id)}
                  onFocus={() => setActive(layer.id)}
                  className="group flex w-full items-baseline gap-3.5 border-b border-hairline py-3 text-left transition-colors"
                >
                  <span
                    className={cn(
                      'font-mono text-micro tracking-[0.12em] transition-colors',
                      on ? 'text-accent' : 'text-faint',
                    )}
                  >
                    {layer.index}
                  </span>
                  <span className="flex-1">
                    <span
                      className={cn(
                        'block text-h4 font-medium transition-colors',
                        on ? 'text-accent' : 'text-primary group-hover:text-accent',
                      )}
                    >
                      {layer.name}
                    </span>
                    <span className="mt-0.5 block text-small text-tertiary">{layer.role}</span>
                  </span>
                  {/* Signal aspect: the selected layer is the lit one. */}
                  <span
                    aria-hidden
                    className={cn(
                      'mt-2 block h-1.5 w-1.5 shrink-0 transition-colors',
                      on ? 'bg-accent' : 'bg-steel-600',
                    )}
                  />
                </button>
              </li>
            )
          })}
        </ul>

        {/* Active layer detail — live region so keyboard users hear it change */}
        <div aria-live="polite" className="mt-7 min-h-40">
          {activeLayer ? (
            <>
              <p className="ct-measure-tight text-body text-secondary">{activeLayer.body}</p>
              {activeLayer.href ? (
                <Link
                  href={activeLayer.href}
                  className="group mt-5 inline-flex items-center gap-2.5 font-mono text-meta tracking-[0.12em] text-accent uppercase"
                >
                  {activeLayer.hrefLabel}
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ) : null}
            </>
          ) : (
            <p className="ct-measure-tight text-body text-tertiary">
              Seven layers, each depending on the one beneath it. Cosmictech engineers across the
              stack rather than at one level of it — which is what makes turnkey responsibility
              possible.
            </p>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------- corridor */}
      <div className="lg:col-span-8 xl:col-span-9">
        {can3D ? (
          <div
            className="relative min-h-[30rem] w-full lg:min-h-[38rem] xl:min-h-[42rem]"
            // The canvas is a rendering of the diagram described in the list
            // beside it; the list is the accessible content.
            aria-hidden
          >
            {show3D ? (
              <div className="absolute inset-0">
                <CorridorScene activeLayer={active} reducedMotion={reducedMotion} />
              </div>
            ) : null}

            {/* Drawing-sheet frame around the viewport */}
            <span className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t border-l border-hairline-strong" />
            <span className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t border-r border-hairline-strong" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-hairline-strong" />
            <span className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-r border-b border-hairline-strong" />

            <span className="pointer-events-none absolute bottom-4 left-4 font-mono text-micro tracking-[0.12em] text-faint uppercase">
              Fig. 01 — Automatic block corridor, four sections
            </span>
          </div>
        ) : (
          <div className="border-t border-hairline-strong pt-6">
            <CorridorDiagram activeLayer={active} onSelect={setActive} />
            <p className="mt-5 font-mono text-micro tracking-[0.12em] text-faint uppercase">
              Fig. 01 — Automatic block corridor, four sections
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
