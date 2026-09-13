# Design critique

Scored against the twelve criteria after building in a real browser and
inspecting at 1440×900, 1280×800, 390×844 and the full 360–2560 range.
Anything under 8 was redesigned rather than patched.

## Round 1 — after the showcase pages

| # | Criterion | Score |
|---|---|---|
| 1 | Brand identity | 7 |
| 2 | Typography | 9 |
| 3 | Composition | 6 |
| 4 | Information hierarchy | 8 |
| 5 | Interaction quality | 8 |
| 6 | Motion quality | 8 |
| 7 | 3D quality | 5 |
| 8 | Content depth | 9 |
| 9 | Responsiveness | 5 |
| 10 | Enterprise credibility | 8 |
| 11 | Technical polish | 6 |
| 12 | Would a CEO show this? | 7 |

**The five weakest decisions, and what was done about them:**

1. **The emblem was shouting.** Rendered in the accent at `h-7`, it read as
   an ornate flourish beside a small wordmark — the loudest element in the
   header, and the most decorative. *Fixed by inverting the relationship:*
   emblem reduced and moved to a tertiary steel tone, wordmark enlarged. The
   brand now reads as a wordmark with a mark beside it, which is what it is.

2. **The hero's top-right was dead.** The headline occupied the left 60% and
   the metrics sat below the fold line, leaving a void that read as
   unbalanced rather than composed. *Fixed by recomposing, not by filling:*
   headline and instrument readout now share one row of the grid — statement
   left, readout right. The readout also became a column of ruled rows
   rather than a 2×2, so the values align regardless of how a label wraps
   (they had been misaligning at 1440).

3. **The 3D corridor was a thin smudge in the corner of its frame.** The
   corridor ran 72 units into depth, so it converged to a vanishing point and
   occupied perhaps a fifth of the viewport, faintly. *Fixed at the source
   rather than by zooming:* the corridor was shortened to 50 units, the
   camera moved to a lower three-quarter view, line and node contrast raised,
   and the occupancy marker resized. It now fills the frame and reads as an
   engineering visualisation.

4. **The page scrolled sideways on a phone.** The 2D corridor drawing placed
   its labels outside the viewBox with `overflow-visible`. *Fixed* by
   bringing labels inside the drawing's bounds. A second, subtler cause was
   found later — see round 2.

5. **The site contradicted its own data.** A heading read "nine zones and
   agencies" while the computed figure beside it read 11. *Fixed* by deriving
   the heading from the data, so the two cannot diverge again. The lesson was
   applied generally: no count, total or aggregate anywhere on the site is
   written by hand.

**Also corrected in this round:** signal aspects were rendering as hollow
outlines, which is semantically wrong — a green aspect is *lit*. Muted
railway aspect colours were introduced, scoped strictly to signalling
diagrams, with the aspect named in text so colour is never the only cue.

## Round 2 — after propagation and full-site QA

| # | Criterion | Score | Note |
|---|---|---|---|
| 1 | Brand identity | 8.5 | Navy from the supplied emblem, accent as state only, drawing-sheet register. Not a clone of any reference. Held back by the interim emblem. |
| 2 | Typography | 9 | The strongest dimension. Archivo/Inter/Plex Mono, fluid scale, optical tracking, measure discipline. |
| 3 | Composition | 8.5 | Ruled rows and asymmetric grids throughout; no card grids anywhere. A few bands still carry more bottom space than they earn. |
| 4 | Information hierarchy | 9 | Consistent section openings mean a reader always knows their depth. |
| 5 | Interaction quality | 8.5 | Branching nav, filtering explorer with live readout, node-tracing diagrams — all keyboard-operable, none hover-dependent. |
| 6 | Motion quality | 8.5 | One language, no animation library installed, reduced-motion handled in CSS with no JS branch. |
| 7 | 3D quality | 8 | Reads as a real visualisation; the animation is the mechanism rather than ornament. Two draw calls. |
| 8 | Content depth | 9 | 8 capability pages of genuine engineering explanation, 30 project pages, 5 company pages, 4 Prognostix pages. |
| 9 | Responsiveness | 9 | Verified 360–2560. Recomposed, not stacked. |
| 10 | Enterprise credibility | 8.5 | Sourced figures kept distinct, gaps stated plainly, nothing invented. The restraint *is* the credibility. |
| 11 | Technical polish | 9 | Strict TS, 59 prerendered routes, data-driven, no unused dependencies, no third-party requests. |
| 12 | Would a CEO show this? | 8.5 | Yes — with the reserved areas filled first. |

**Issues found and fixed in this round:**

- **A real overflow was hiding behind a guard.** `overflow-x: clip` on
  `body` was masking an 8px escape. Root cause: the emblem carried two
  competing height utilities (`h-full` from the component and `h-5.5` from
  the caller), so its width was indeterminate, and the wordmark's descender
  rule used `flex-1` with no basis, making the lockup report a box twice the
  width it painted. Both fixed at source. A later apparent overflow across
  every page turned out to be a **false positive in my own test** —
  `scrollWidth` over-reports under `clip` in headless Chromium; verified by
  removing the guard and confirming the page still could not be scrolled and
  no element escaped the viewport. The check was corrected to test actual
  scrollability.
- **Keyboard selection on diagram nodes was self-cancelling.** Focus
  selected a node; Enter then toggled it straight back off, so `aria-pressed`
  never became true for a keyboard user. Enter now confirms the selection.
- **The mobile corridor drawing was illegible** — labels rendering at about
  6px. Fixed by narrowing the viewBox (which enlarges type at a given
  rendered width) and removing the role text the adjacent list already
  carries, rather than by shrinking the drawing further.
- **`/projects` skipped from h1 to h3.** The register now has its own
  heading.
- **An unused dependency was shipping in `package.json`.** `motion` was
  declared but never imported — reveals were built on an IntersectionObserver
  instead. Removed, along with its `optimizePackageImports` entry.
- **Duplicate font preloads.** Hand-written preload links were found to
  duplicate what Next already emits for CSS-discovered `@fontsource` faces.
  Removed rather than kept "just in case".

## Known limitations

Stated plainly rather than left to be discovered:

1. **The emblem is interim.** A hairline geometric reduction of the supplied
   orbital mark, drawn in the site's line language. The official vector
   should replace it.
2. **No Open Graph image or favicon set.** Specified in the manifest.
3. **Contact details are absent from the sources**, so both enquiry forms
   disable submission and say why, rather than silently discarding input.
   Filling in `contactChannels` switches them live.
4. **Legal pages are reserved, not drafted.** Text on those pages has legal
   effect; a plausible placeholder risked being published unreviewed.
5. **The 3D corridor has no projected subsystem annotations.** The layer list
   beside it carries that information, but callouts on the geometry itself
   would strengthen it.
6. **Fonts total ~238KB**, of which ~128KB is the latin-ext subset pulled in
   solely by the ₹ sign. Reducible with a custom subset if the budget
   matters more than the correct currency glyph.
7. **The corridor animation runs continuously while in view.** It is two
   draw calls and pauses off-screen, but a visibility-based frameloop pause
   would be a further saving on low-power devices.
