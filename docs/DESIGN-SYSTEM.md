# Cosmictech design system

## The idea

**Instrumentation.** An engineering drawing sheet rendered as a digital
surface.

Cosmictech is not a construction company; it is a railway systems
engineering company. So the design language is drawn from the discipline
itself rather than applied to it:

| Railway concept | Interface translation |
|---|---|
| Track datum | The hairline rules that register every section |
| Signal aspect | Interface state — the accent marks what is *live*, nothing else |
| Block section | Content bands, separated by a datum rather than a shadow |
| Interlocking | Selecting a node illuminates exactly what it connects to |
| Branching | Navigation: a few trunk routes that open to reveal their sections |
| Drawing sheet | Section indices (`01 /`), figure numbers, callout leader lines |
| Instrumentation | Figures presented as readouts, tabular and labelled |

Nothing in the site exists because it looks modern. If an element cannot be
traced back to this table or to a content requirement, it was removed.

## Type

| Role | Face | Why |
|---|---|---|
| Display | **Archivo Variable** | An industrial grotesque. Tight, confident, engineered at large sizes without becoming decorative. |
| Text | **Inter Variable** | Built for dense technical reading at small sizes. Used at generous leading and a 68ch measure so it reads editorially, not as UI. |
| Mono | **IBM Plex Mono** | Indices, metadata, data labels, annotations, callouts. The drawing-sheet voice. |

All self-hosted via `@fontsource` — the site makes **no third-party
requests** of any kind.

Scale is fluid via `clamp()` and defined once in `@theme`. Display sizes
carry negative tracking (`-0.035em` at the top) because grotesques need it
at scale; mono labels carry `+0.14em` because tracked caps are the
convention of technical annotation.

## Colour

A restrained industrial palette. Graphite and steel carry the structure;
paper carries sustained reading; navy carries the brand and the Prognostix
register.

```
ink      0A0D10 → 313B43    near-black through graphite
steel    3F4A53 → E4E8EA    aluminium neutrals
paper    E8E5DF → FBFAF8    warm off-white
navy     08182B → 2A628F    brand, from the Cosmictech emblem
signal   C4401E → F07A4F    the single accent
```

**The accent is state, never decoration.** It marks the current nav item,
the live project status, the selected diagram node, the active system layer,
and the primary action. Nothing else.

**Aspect colours** (`aspect-green`, `aspect-yellow`, `aspect-red`) exist
only inside signalling diagrams, where green/yellow/red carry defined
operational meaning. They are muted below full saturation to sit inside the
palette, and every diagram that uses them also labels the aspect in text, so
colour is never the sole carrier of meaning.

## Surfaces

Three grounds share one token system. A page or a section declares
`data-surface="graphite|paper|navy"` and every semantic token re-resolves:

```
--surface  --surface-raised  --hairline  --hairline-strong
--text-primary  --text-secondary  --text-tertiary  --text-faint  --accent
```

This is how the site changes register without changing language. Graphite is
the default and carries the argument; paper carries the long technical
passages; navy is Prognostix — crossing into it *is* the transition.

Components never name a palette colour. They name a semantic token, so the
same component is correct on all three grounds.

## Composition

**Cards are banned except where content genuinely needs containment.** The
site uses ruled rows, editorial splits, asymmetric 12-column grids, full
width figures and structured whitespace. The project portfolio is a
*register*, not a grid of tiles, because a register is what an executive
scans.

Radii are effectively zero by system decision. This is an instrument.

## Motion

One language: **a datum line draws, then content rises into it.** 700ms,
`cubic-bezier(0.16, 1, 0.3, 1)` for reveals; 200ms for state.

Nothing floats, bounces, pulses without cause, or animates on hover for
decoration. The only looping animation on the site is the live-status
indicator, which is signalling a real state.

Reveals are one `IntersectionObserver` plus a CSS transition — no animation
library is used or installed. `prefers-reduced-motion` is handled in CSS, so
there is no JS branch to get wrong: reveals become instant, the corridor's
camera locks, and the occupancy pulse freezes mid-corridor with the
architecture still fully readable.

## Diagrams

One component, `SystemSchematic`, renders every system architecture on the
site from a shared `Schematic` data model. Capability pages, project pages
and the Prognostix pipeline all read from it, so adding a diagram never
means adding a rendering component.

Circles are field equipment (a thing on the rail); squares are indoor and
control equipment (a thing in a rack). Line style encodes the connection
kind. Selecting a node illuminates exactly its connections and dims the
rest — interlocking expressed as interface.

Every diagram carries a full text equivalent in the DOM, always, not as an
afterthought.

## Icons

There is no icon library, and none is installed. The site uses a single
arrow glyph for direction, custom SVG for the emblem, geometric marks for
status, and the schematic language for anything explanatory. Icons are not
placed beside text labels for decoration.

## Responsive

Designed at 360, 390, 430, 768, 1024, 1280, 1440, 1920, 2560. Mobile is
recomposed, not stacked: the corridor becomes an orthographic drawing, the
aspect sequence drops to four sections, the register reflows to a two-column
grid, and the wordmark sheds its descender rule.

Nothing critical depends on hover anywhere on the site.
