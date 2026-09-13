# Information architecture

59 routes, all prerendered except the project explorer (which reads a status
query parameter).

```
/                                   Home — the system stack, the argument
│
├── /company                        Overview: strengths, scale, sub-routes
│   ├── /story                      2016 to now; timeline from dated sources
│   ├── /engineering                Working under traffic; delivery model
│   ├── /leadership                 Editorial bands, not team cards
│   └── /quality-safety             Fail-toward-stop; certification reserved
│
├── /capabilities                   The stack, then the register of eight
│   ├── /automatic-signalling       01
│   ├── /electronic-interlocking    02
│   ├── /msdac                      03
│   ├── /bpac                       04
│   ├── /train-control-systems      05   Kavach · ETCS · CBTC
│   ├── /railway-snt                06
│   ├── /telecommunications         07
│   └── /epc-gcc                    08
│
├── /projects                       Explorer: 4 filters + live readout
│   └── /[slug]                     30 case-study pages
│
├── /technology                     Where the group is heading
│
├── /prognostix                     Navy register — the next layer
│   ├── /technology                 The pipeline, and where difficulty lives
│   ├── /solutions                  MVIS · ABD · in development
│   └── /contact                    Separate enquiry routing
│
├── /careers
├── /contact                        Enquiry form + direct channels
├── /privacy   /terms               Reserved for legal drafting (noindex)
└── 404                             "This route is not set."
```

## Why it is shaped this way

**The stack is the spine.** The homepage argues that a railway is seven
connected layers and that Cosmictech engineers across all of them. Every
capability page is one or more layers of that stack; the technology page
reads the same stack from the top down; Prognostix is its highest layer.
A visitor who understands the homepage can navigate everything else.

**Capabilities and projects are joined by data, not by hand.** Each
capability declares a `systemTag`; each project declares which systems it
used. So a capability page lists its own works and a project page links to
the capability that governs it — automatically, in both directions.

**Prognostix is a register change, not a sub-page.** It has its own ground
colour, its own wordmark, its own contact route and its own leadership
framing, while remaining inside the group's navigation and footer. The
transition is deliberate and reversible: every Prognostix page offers a
route back to the parent.

## Adding content

The data layer drives everything. Adding a project to
`src/data/projects.ts` adds it to: the explorer, its own prerendered page,
the relevant capability pages, the aggregate figures, the homepage counts
and the sitemap. No component is touched.

The same holds for capabilities (`src/data/capabilities.ts`), navigation
(`src/data/navigation.ts`) and the system stack
(`src/data/systemLayers.ts`), which drives both the 3D corridor and its 2D
counterpart from one source.
