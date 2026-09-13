# Cosmictech — digital flagship

The website for **Cosmictech Builders Private Limited**, a railway
signalling and telecommunications (S&T) engineering contractor working
across Indian Railways.

## Running it

```bash
npm install     # .npmrc sets legacy-peer-deps for React 19 + R3F
npm run dev     # http://localhost:3000
npm run build
npm run start
npm run typecheck
npm run lint
```

Node 20+. No environment variables are required; the site makes no
third-party requests at runtime.

## Stack

| | |
|---|---|
| Framework | Next.js 16, App Router, React 19, TypeScript strict |
| Styling | Tailwind CSS v4, CSS-first `@theme` in `src/app/globals.css` |
| 3D | `three` + `@react-three/fiber`, dynamically imported |
| Animation | None installed — reveals are one IntersectionObserver plus a CSS transition |
| Fonts | Self-hosted via `@fontsource` (Archivo, Inter, IBM Plex Mono) |
| Icons | None installed — custom SVG throughout |

## Layout

```
src/
  app/           routes (59, all prerendered bar the project explorer)
  components/
    shell/       header with branching nav, footer
    primitives/  Section, Band, Container, Measure, Reveal, Type, Action
    brand/       wordmarks and emblem
    content/     content reservations, contact channels, legal shell
    data/        metric readouts, status indicators, spec pairs
    diagram/     SystemSchematic (every architecture drawing), AspectSequence
    three/       CorridorScene (WebGL), CorridorDiagram (SVG), SystemCanvas
    projects/    explorer and register rows
    forms/       enquiry form
  data/          THE CONTENT LAYER — see below
  lib/           seo helpers, utilities
content/         IMAGE-MANIFEST.md, SOURCE-FACTS.md
docs/            DESIGN-SYSTEM.md, INFORMATION-ARCHITECTURE.md, CRITIQUE.md
```

## The content layer

Everything the site says lives in `src/data/`. Components render it; they
never hard-code it.

Adding a project to `src/data/projects.ts` adds it to the explorer, its own
prerendered page, the relevant capability pages, the aggregate figures, the
homepage counts and the sitemap — with no component change. The same is true
of capabilities, navigation and the system stack.

### Sourcing rule

**Every company-specific fact is transcribed from supplied source material
and annotated with its origin in the data file.** Nothing is inferred,
rounded, reinterpreted, or invented — see `content/SOURCE-FACTS.md` for the
full register.

Where the sources are silent, the site renders a **content reservation**: a
styled, bounded area stating precisely what is needed, already occupying the
space the real content will occupy. Replacing one is an edit, not a
redesign. `content/IMAGE-MANIFEST.md` lists every reservation on the site.

In particular: no certification, client endorsement, headcount, award or
statistic appears anywhere on this site that is not in the source documents.

## Going live — the short list

1. **Contact details** — fill in `contactChannels` in `src/data/site.ts`.
   The footer links, the contact page and both enquiry forms switch from
   reservations to working `mailto:`/`tel:` links automatically. Until then
   the forms disable submission rather than silently discard input.
2. **`site.url`** in `src/data/site.ts` — drives canonicals, Open Graph and
   the sitemap.
3. **Legal pages** — `/privacy` and `/terms` are reserved for the company's
   advisers and are `noindex` until drafted.
4. **Imagery** — work through `content/IMAGE-MANIFEST.md`, Priority 1 first.
5. **Open Graph image and favicons** — see the manifest.
6. **Two open questions in the source material**: the period for the FY 25-26
   ₹137 Cr figure (the profile says "till" and stops), and the expansion of
   the zone codes `MRT` and `TVM`.

## Accessibility and performance

Verified in a real browser across every route at 360–2560px:

- single `h1` per page, unbroken heading order, no unnamed control
- full keyboard operation: nav opens on focus, Escape closes and restores
  focus, diagram nodes are focusable and operable
- every diagram carries a text equivalent in the DOM
- no interaction anywhere depends on hover
- `prefers-reduced-motion` handled in CSS
- no horizontal scroll at any tested width
- the WebGL corridor loads only when scrolled into view and only above
  1024px; below that the same lattice renders as SVG and three.js is never
  requested at all

## QA scripts

The `.qa-*.mjs` scripts used to verify the above are gitignored working
tools rather than part of the deliverable. They drive the pre-installed
Chromium via Playwright against a running production build.
