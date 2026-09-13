'use client'

import { useMemo, useState } from 'react'
import { ProjectRow, ProjectRowHeader } from './ProjectRow'
import {
  projectCategoryLabels,
  projectSystemLabels,
  projects,
  type ProjectCategory,
  type ProjectStatus,
  type ProjectSystem,
} from '@/data/projects'
import { zoneGlossary } from '@/data/site'
import { cn, formatCr } from '@/lib/utils'

/**
 * PROJECT EXPLORER
 *
 * Thirty works presented as a register rather than a wall of cards, with
 * four orthogonal filters and a live readout of what the current selection
 * contains. The readout is the point: a visitor filtering to "Western
 * Railway, electronic interlocking" should immediately see how many works
 * that is and what they are worth, not have to count rows.
 *
 * The data comes from `data/projects.ts`. Adding a work to that file adds it
 * here, to its capability page, and to the sitemap, with no other change.
 */

type SortKey = 'value' | 'status' | 'name'

const ALL = '__all__'

export function ProjectExplorer({
  initialStatus = null,
}: {
  initialStatus?: ProjectStatus | null
}) {
  const [status, setStatus] = useState<ProjectStatus | null>(initialStatus)
  const [category, setCategory] = useState<ProjectCategory | null>(null)
  const [system, setSystem] = useState<ProjectSystem | null>(null)
  const [zone, setZone] = useState<string | null>(null)
  const [sort, setSort] = useState<SortKey>('value')

  const zoneCodes = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.zoneCodes))).sort(),
    [],
  )

  const filtered = useMemo(() => {
    const result = projects.filter(
      (p) =>
        (status === null || p.status === status) &&
        (category === null || p.category === category) &&
        (system === null || p.systems.includes(system)) &&
        (zone === null || p.zoneCodes.includes(zone)),
    )
    return result.sort((a, b) => {
      if (sort === 'value') return b.valueCr - a.valueCr
      if (sort === 'name') return a.title.localeCompare(b.title)
      // status: works under progress first, then by value
      if (a.status !== b.status) return a.status === 'in-progress' ? -1 : 1
      return b.valueCr - a.valueCr
    })
  }, [status, category, system, zone, sort])

  const totals = useMemo(
    () => ({
      count: filtered.length,
      value: Number(filtered.reduce((s, p) => s + p.valueCr, 0).toFixed(2)),
      completed: filtered.filter((p) => p.status === 'completed').length,
      inProgress: filtered.filter((p) => p.status === 'in-progress').length,
    }),
    [filtered],
  )

  const anyFilter = status !== null || category !== null || system !== null || zone !== null

  const reset = () => {
    setStatus(null)
    setCategory(null)
    setSystem(null)
    setZone(null)
  }

  return (
    <div>
      {/* ------------------------------------------------------- filters */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 border-t border-hairline-strong pt-6 md:grid-cols-2 xl:grid-cols-4">
        <FilterGroup label="Status">
          <Chip active={status === null} onClick={() => setStatus(null)}>
            All
          </Chip>
          <Chip active={status === 'in-progress'} onClick={() => setStatus('in-progress')}>
            Under progress
          </Chip>
          <Chip active={status === 'completed'} onClick={() => setStatus('completed')}>
            Completed
          </Chip>
        </FilterGroup>

        <FilterGroup label="Category">
          <Select
            value={category ?? ALL}
            onChange={(v) => setCategory(v === ALL ? null : (v as ProjectCategory))}
            options={[
              { value: ALL, label: 'All categories' },
              ...Object.entries(projectCategoryLabels).map(([value, label]) => ({ value, label })),
            ]}
            ariaLabel="Filter by category"
          />
        </FilterGroup>

        <FilterGroup label="System">
          <Select
            value={system ?? ALL}
            onChange={(v) => setSystem(v === ALL ? null : (v as ProjectSystem))}
            options={[
              { value: ALL, label: 'All systems' },
              ...Object.entries(projectSystemLabels).map(([value, label]) => ({ value, label })),
            ]}
            ariaLabel="Filter by signalling system"
          />
        </FilterGroup>

        <FilterGroup label="Zone / agency">
          <Select
            value={zone ?? ALL}
            onChange={(v) => setZone(v === ALL ? null : v)}
            options={[
              { value: ALL, label: 'All zones & agencies' },
              ...zoneCodes.map((code) => ({
                value: code,
                label: zoneGlossary[code]?.name ? `${code} — ${zoneGlossary[code]!.name}` : code,
              })),
            ]}
            ariaLabel="Filter by railway zone or executing agency"
          />
        </FilterGroup>
      </div>

      {/* -------------------------------------------------------- readout */}
      <div
        aria-live="polite"
        className="mt-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-t border-hairline-strong pt-6"
      >
        <dl className="flex flex-wrap items-end gap-x-10 gap-y-5">
          <Readout label="Works in selection" value={String(totals.count)} />
          <Readout label="Aggregate disclosed value" value={`₹${formatCr(totals.value)} Cr`} />
          <Readout label="Under progress" value={String(totals.inProgress)} />
          <Readout label="Completed" value={String(totals.completed)} />
        </dl>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-3">
            <span className="font-mono text-micro tracking-[0.14em] text-tertiary uppercase">
              Sort
            </span>
            <Select
              value={sort}
              onChange={(v) => setSort(v as SortKey)}
              options={[
                { value: 'value', label: 'Value, high to low' },
                { value: 'status', label: 'Under progress first' },
                { value: 'name', label: 'Name, A–Z' },
              ]}
              ariaLabel="Sort works"
            />
          </label>

          {anyFilter ? (
            <button
              type="button"
              onClick={reset}
              className="font-mono text-micro tracking-[0.14em] text-accent uppercase underline decoration-hairline-strong underline-offset-4 transition-colors hover:decoration-accent"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {/* --------------------------------------------------------- register */}
      <div className="mt-12">
        <h2 className="sr-only">Project register</h2>
        <ProjectRowHeader />
        {filtered.length === 0 ? (
          <p className="border-t border-hairline py-16 text-center text-body text-tertiary">
            No works in the disclosed portfolio match this combination of filters.
          </p>
        ) : (
          filtered.map((p) => <ProjectRow key={p.slug} project={p} />)
        )}
        <div className="border-t border-hairline" />
      </div>
    </div>
  )
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-micro tracking-[0.14em] text-tertiary uppercase">{label}</p>
      <div className="mt-3.5 flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'border px-3.5 py-2 font-mono text-micro tracking-[0.1em] uppercase transition-colors duration-200',
        active
          ? 'border-accent bg-accent text-white'
          : 'border-hairline-strong text-secondary hover:border-accent hover:text-accent',
      )}
    >
      {children}
    </button>
  )
}

function Select({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  ariaLabel: string
}) {
  return (
    <span className="relative inline-flex w-full max-w-xs items-center">
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none border border-hairline-strong bg-surface py-2 pr-9 pl-3.5 font-mono text-micro tracking-[0.08em] text-primary uppercase transition-colors hover:border-accent focus-visible:border-accent"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-surface text-primary normal-case">
            {o.label}
          </option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-3 text-tertiary">
        <svg width="9" height="6" viewBox="0 0 9 6" fill="none">
          <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </span>
    </span>
  )
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-micro tracking-[0.14em] text-faint uppercase">{label}</dt>
      <dd className="tabular mt-1.5 font-display text-h3 leading-none font-semibold text-primary">
        {value}
      </dd>
    </div>
  )
}
