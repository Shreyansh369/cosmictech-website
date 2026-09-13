import type { Metadata } from 'next'
import { site } from '@/data/site'

interface PageMetaInput {
  title: string
  description: string
  path: string
  /** Omit for pages that should not advertise a social image. */
  image?: string
}

/**
 * Single source of page metadata. Every route composes its metadata here so
 * that titles, canonicals and Open Graph tags cannot drift apart.
 */
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const url = `${site.url}${path}`
  const fullTitle = path === '/' ? `${site.shortName} — ${site.descriptor}` : `${title} — ${site.shortName}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: site.legalName,
      title: fullTitle,
      description,
      locale: site.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  }
}

/** Organization structured data, emitted once in the root layout. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    alternateName: site.shortName,
    url: site.url,
    foundingDate: String(site.establishedYear),
    description:
      'Cosmictech Builders Private Limited delivers large-scale railway signalling and telecommunications (S&T) EPC projects for Indian Railways, including automatic signalling, electronic interlocking, axle counter and train control systems.',
    knowsAbout: [
      'Automatic Signalling',
      'Electronic Interlocking',
      'Multi-Section Digital Axle Counter',
      'Block Proving by Axle Counter',
      'Railway Telecommunications',
      'Kavach',
      'ETCS',
      'CBTC',
    ],
  }
}
