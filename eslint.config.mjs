import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

/**
 * eslint-config-next ships flat config directly from v16, so it is spread
 * here rather than bridged through FlatCompat.
 */
const config = [
  ...coreWebVitals,
  ...typescript,
  { ignores: ['.next/**', 'node_modules/**', 'out/**', '.qa-*.mjs'] },
]

export default config
