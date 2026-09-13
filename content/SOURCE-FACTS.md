# Source register

Every company-specific statement on this website traces to one of two
supplied documents. This file is the register of what was taken from where,
so any claim on the site can be audited against its origin.

| Tag | Document |
|---|---|
| `[PROFILE]` | *Profile of Cosmictech Builders Private Limited* (.docx) |
| `[DECK]` | *Prognostix AI* presentation (.pdf, 8 pages) |

Anything not in those documents is **not asserted anywhere on the site**. It
renders as a specified content reservation instead. No figure has been
rounded, reinterpreted, combined with another, or inferred.

---

## Company

| Statement | Source | Where it renders |
|---|---|---|
| Established 2016, beginning with supply and installation of axle counters (SSDAC) in Delhi division | `[PROFILE]` | Home, `/company`, `/company/story`, `/capabilities/msdac` |
| Complete S&T turnkey EPC/GCC execution; 100% project success rate; no penalties/LD imposed | `[PROFILE]` | Home, `/company`, `/company/quality-safety`, `/capabilities/epc-gcc` |
| In-house team across the full project life cycle, including retired railway S&T engineers and signalling professionals | `[PROFILE]` | Home, `/company`, `/company/engineering` |
| Long-standing tie-ups with industry leaders; trusted partner for all major S&T suppliers | `[PROFILE]` | `/company`, `/capabilities/epc-gcc` |
| Long-standing relationships with S&T railway executives across IR | `[PROFILE]` | `/company` |
| Sufficient financial strength and technical manpower for larger projects | `[PROFILE]` | `/company` |
| Works completed within stipulated timelines, maintaining quality, safety and coordination with railway officials | `[PROFILE]` | `/company/quality-safety` |
| Experience of working to clients' technical standards, safety norms and operational requirements | `[PROFILE]` | `/company/quality-safety` |
| Delivers large-scale railway S&T EPC projects; expertise in Automatic Signalling, EI, Kavach, and high-speed/metro technologies including ETCS and CBTC | `[DECK p8]` | `/company`, `/capabilities/train-control-systems` |
| In 2025 invested in next-generation deep-tech products for global railway markets — safety, predictive maintenance, operational efficiency | `[DECK p8]` | `/company`, `/technology`, `/prognostix` |
| Descriptor "Railway Signaling & Deep-Tech Innovation" | `[DECK p8]` | Site-wide (hero eyebrow, metadata) |

## Financial figures — three distinct metrics, never merged

| Figure | Exactly what it measures | Source |
|---|---|---|
| **₹114.00 Cr** | Turnover from S&T works, FY 24-25 | `[PROFILE]` |
| **₹137 Cr** | Achieved in FY 25-26 — the source says "till" and the sentence stops. **The period is not stated.** The site records this gap rather than smoothing it. | `[PROFILE]` |
| **₹140 Cr+** | Revenues reached from inception, stated in the CEO biography. **No period given.** | `[DECK p4]` |

These are presented separately with their own captions everywhere they
appear. They are never added, averaged, or described as one number.

## Delivery figures

| Figure | Source |
|---|---|
| ~150 km of automatic section work delivered to IR in FY 25-26 ("approx.") | `[PROFILE]` |
| 100% project success rate | `[PROFILE]` |
| Nil penalties / liquidated damages | `[PROFILE]` |

## Projects

All 30 works in `src/data/projects.ts` are transcribed from the `[PROFILE]`
table — description, zone/agency code, value and status — **including the
source's own spellings** ("Repalcement", "Kahpri", "inconnection"), which are
preserved verbatim in the quoted scope on each project page.

- The source calls this "only an indicative list to give an idea of our
  capability". The site repeats that framing on `/projects` and in the
  homepage scale section rather than presenting it as a complete record.
- The aggregate of **₹597.74 Cr** shown on the site is arithmetic over the
  disclosed figures for these 30 works only, and is always labelled as such.
  It is computed in code from the data, so it cannot drift.
- One project description (`multi-system-gumandev`) is **truncated in the
  source**. The project page says so explicitly.
- `category` and `systems` are classifications derived only from words
  present in each description. They add navigation, not new facts.

## Zone and agency codes

Expanded where certain: NR, NCR, NER, NWR, CR, WR, SWR, SCR, RVNL.

**`MRT` and `TVM` are deliberately left unexpanded.** They appear in the
source, which does not define them, and guessing would be fabrication. The
glossary on `/projects` shows a reservation for each.

## Leadership

Biographies on `/company/leadership` and `/prognostix` are reproduced
statement-for-statement from `[DECK p4]`, titles included. Nothing has been
added, expanded, or rephrased into achievement language.

The deck's page 5 ("Team") and page 6 ("MVIS") contain no extractable
content — no text and no embedded images. Both are recorded as reservations.

## Prognostix AI

| Statement | Source |
|---|---|
| MVIS prototype development, ₹1.77 Cr, awarded 24/04/2026 by RDSO | `[DECK p2]` |
| ABD prototype development, ₹3 Cr, awarded 22/04/2026 by RDSO | `[DECK p2]` |
| Strategic MoUs with CRIS and "a leading global technology company" | `[DECK p3]` |
| Pipeline: RDPMS, Unified Predictive Maintenance Platform — "next working on" | `[DECK p3]` |
| Technology domains (9 listed) | `[DECK p7]` |

The unnamed partner is **not named on the site**. The deck does not identify
it, and the page says so in place of a name.

---

## What is NOT from the sources — and why that is legitimate

The railway engineering explanation throughout `/capabilities`,
`/company/engineering`, `/company/quality-safety` and `/prognostix/technology`
— how axle counters count, why interlocking refuses a route, what an aspect
sequence means, why bearings fail acoustically before thermally — is
**public-domain engineering fact**, written from first principles.

It describes the discipline. It makes no claim about Cosmictech's record,
capacity, or performance. Every sentence that does make such a claim appears
in the table above.
