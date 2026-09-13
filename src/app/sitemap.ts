import type { MetadataRoute } from 'next'
import { site } from '@/data/site'
import { capabilities } from '@/data/capabilities'
import { projects } from '@/data/projects'

/**
 * Sitemap generated from the same data that renders the pages, so a new
 * project or capability appears here automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly',
  ) => ({ url: `${site.url}${path}`, lastModified: now, changeFrequency, priority })

  return [
    entry('/', 1, 'weekly'),
    entry('/capabilities', 0.9),
    ...capabilities.map((c) => entry(`/capabilities/${c.slug}`, 0.8)),
    entry('/projects', 0.9, 'weekly'),
    ...projects.map((p) => entry(`/projects/${p.slug}`, 0.7)),
    entry('/company', 0.8),
    entry('/company/story', 0.6),
    entry('/company/engineering', 0.7),
    entry('/company/leadership', 0.7),
    entry('/company/quality-safety', 0.6),
    entry('/technology', 0.8),
    entry('/prognostix', 0.9),
    entry('/prognostix/technology', 0.7),
    entry('/prognostix/solutions', 0.8),
    entry('/prognostix/contact', 0.6),
    entry('/careers', 0.6),
    entry('/contact', 0.8),
  ]
}
