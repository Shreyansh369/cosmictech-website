import type { Metadata, Viewport } from 'next'
import './globals.css'
import { SiteHeader } from '@/components/shell/SiteHeader'
import { SiteFooter } from '@/components/shell/SiteFooter'
import { organizationJsonLd } from '@/lib/seo'
import { site } from '@/data/site'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} — ${site.descriptor}`,
    template: `%s — ${site.shortName}`,
  },
  description:
    'Cosmictech Builders delivers large-scale railway signalling and telecommunications EPC projects for Indian Railways — automatic signalling, electronic interlocking, axle counter systems and train control.',
  applicationName: site.legalName,
  authors: [{ name: site.legalName }],
  formatDetection: { telephone: false, address: false, email: false },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#0a0d10',
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-surface="graphite">
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only rounded-none focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:border focus:border-accent focus:bg-surface focus:px-4 focus:py-2.5 focus:font-mono focus:text-meta focus:tracking-[0.12em] focus:text-primary focus:uppercase"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main" className="min-h-dvh">
          {children}
        </main>

        <SiteFooter />

        <script
          type="application/ld+json"
          // Static, author-controlled organisation data.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </body>
    </html>
  )
}
