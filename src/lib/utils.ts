export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Format a crore figure for display without altering its precision. */
export function formatCr(value: number): string {
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })
}

/** Two-digit drawing index from a 1-based position. */
export function sheetIndex(n: number): string {
  return String(n).padStart(2, '0')
}
