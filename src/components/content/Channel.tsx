import { cn } from '@/lib/utils'

/**
 * A contact channel.
 *
 * If the value is absent from the supplied sources it renders as a reserved
 * field — never as a dead `mailto:` or a decorative button. This is what
 * keeps the contact surfaces honest while the real details are pending.
 */
export function Channel({
  label,
  value,
  href,
  className,
  spec,
}: {
  label: string
  value: string | null
  /** Builder for the functional href, called only when a value exists. */
  href?: (value: string) => string
  className?: string
  /** What the client must supply, shown when the value is missing. */
  spec: string
}) {
  return (
    <div className={cn('border-t border-hairline py-4', className)}>
      <dt className="font-mono text-micro tracking-[0.14em] text-tertiary uppercase">{label}</dt>
      <dd className="mt-2">
        {value ? (
          href ? (
            <a
              href={href(value)}
              className="text-body text-primary underline decoration-hairline-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {value}
            </a>
          ) : (
            <span className="text-body text-primary">{value}</span>
          )
        ) : (
          <span className="block">
            <span className="font-mono text-micro tracking-[0.14em] text-accent uppercase">
              [ INSERT CONTENT HERE ]
            </span>
            <span className="mt-1.5 block max-w-[36ch] font-mono text-micro leading-relaxed text-faint">
              {spec}
            </span>
          </span>
        )}
      </dd>
    </div>
  )
}
