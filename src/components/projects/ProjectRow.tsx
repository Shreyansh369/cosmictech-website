import { RowLink } from '@/components/primitives/Action'
import { StatusIndicator } from '@/components/data/Metrics'
import type { Project } from '@/data/projects'
import { projectCategoryLabels } from '@/data/projects'
import { cn } from '@/lib/utils'

/**
 * A portfolio row.
 *
 * Deliberately a ruled row rather than a card: thirty works read as a
 * register, and a register is what a railway executive scans. The value is
 * right-aligned and tabular so the column can be compared down its length.
 */
export function ProjectRow({ project, className }: { project: Project; className?: string }) {
  return (
    <RowLink
      href={`/projects/${project.slug}`}
      ariaLabel={`${project.title} — ${project.valueLabel}, ${project.statusLabel}`}
      className={className}
    >
      <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-2 py-5 md:gap-x-6 md:py-6">
        <div className="col-span-12 md:col-span-6 lg:col-span-5">
          <h3 className="text-h4 font-medium text-primary transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          {project.section ? (
            <p className="mt-1 font-mono text-micro tracking-[0.08em] text-tertiary">
              {project.section}
            </p>
          ) : null}
        </div>

        <div className="col-span-6 md:col-span-2 lg:col-span-3">
          <p className="text-small text-secondary">{projectCategoryLabels[project.category]}</p>
        </div>

        <div className="col-span-6 flex flex-wrap gap-x-2 md:col-span-2 lg:col-span-2">
          {project.zoneCodes.map((code) => (
            <span
              key={code}
              className="font-mono text-micro tracking-[0.12em] text-tertiary uppercase"
            >
              {code}
            </span>
          ))}
        </div>

        <div className="col-span-6 md:col-span-1 lg:col-span-1">
          <p className="tabular font-mono text-small text-primary md:text-right">
            {project.valueLabel}
          </p>
        </div>

        <div className={cn('col-span-6 md:col-span-1 lg:col-span-1 md:flex md:justify-end')}>
          <StatusIndicator status={project.status} label={project.statusLabel} />
        </div>
      </div>
    </RowLink>
  )
}

/** Column headings for the register. Hidden on small viewports. */
export function ProjectRowHeader() {
  return (
    <div className="hidden grid-cols-12 gap-x-6 border-t border-hairline-strong pt-3 pb-1 md:grid">
      {[
        ['Work', 'md:col-span-6 lg:col-span-5'],
        ['Category', 'md:col-span-2 lg:col-span-3'],
        ['Zone / agency', 'md:col-span-2 lg:col-span-2'],
        ['Value', 'md:col-span-1 lg:col-span-1 md:text-right'],
        ['Status', 'md:col-span-1 lg:col-span-1 md:text-right'],
      ].map(([label, cls]) => (
        <span
          key={label}
          className={cn('font-mono text-micro tracking-[0.14em] text-faint uppercase', cls)}
        >
          {label}
        </span>
      ))}
    </div>
  )
}
