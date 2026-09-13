# Image & content manifest

Every reserved area in the site, with the asset it expects. Each entry gives
the intended subject, aspect ratio, rendered location, art direction and a
suggested filename. The reservations are already laid out at the size the
real asset will occupy, so dropping a file in is an edit — never a redesign.

Assets go in `public/media/<path>` and the corresponding `ImageSlot` is
replaced with `next/image` at the same ratio.

---

## Art direction (applies to every photograph)

**Do** — authentic railway infrastructure; field engineering; signalling
equipment; control and relay rooms; technicians actually working; project
sites; railway corridors; equipment close-ups; terminations and cable work;
commissioning at night; real Cosmictech people.

**Don't** — generic train stock photography; staged boardroom shots; stock
"technology" abstracts; anything that implies a project, client or site the
company did not work on.

**Treatment** — available light wherever possible, including at night. Cool
neutral grade to sit with the graphite palette; avoid warm or teal-orange
grading. Documentary framing: the equipment and the work are the subject,
faces incidental unless it is a portrait.

**Delivery** — AVIF or WebP at 2× the largest rendered width, plus an
original. Minimum long edge 2400px. No burned-in captions, logos or borders.

---

## Priority 1 — needed before launch

| # | Location | Subject | Ratio | Filename |
|---|---|---|---|---|
| 1 | `/` — Engineering approach | Commissioning night: engineers at an equipment rack during a traffic block, testing an EI before cut-over. Tight on hands, terminations, test equipment. | 4:5 | `engineering/commissioning-block.jpg` |
| 2 | `/company` — Strengths | The team at a project office or site cabin reviewing a signalling plan or control table. Drawings and equipment visible; not boardroom staging. | 3:4 | `company/team-review.jpg` |
| 3 | `/company/engineering` | Testing in progress: function or correspondence testing against a control table, indoors. | 4:5 | `company/testing.jpg` |
| 4 | `/company/leadership` ×3 | Environmental portraits of Sh. Lalit Goel, Anmol Goel and Dr. Nitin Arora — on site or in the project office, eye-level, available light. Not studio headshots. | 4:5 | `leadership/lalit-goel.jpg`, `leadership/anmol-goel.jpg`, `leadership/nitin-arora.jpg` |
| 5 | `/careers` | A junior engineer working alongside a senior one at a location or equipment room — the apprenticeship the page describes. | 4:5 | `careers/apprenticeship.jpg` |
| 6 | `/prognostix` | MVIS in the field: camera and illumination array at an examination point, or a captured underframe frame with real detections overlaid. | 16:9 | `prognostix/mvis-field.jpg` |
| 7 | `/prognostix/solutions` ×2 | MVIS installation; ABD wayside acoustic array or a spectrogram of a healthy vs. defective bearing. **Use genuine system output — a fabricated visualisation would undermine the claim it illustrates.** | 4:3 | `prognostix/mvis-system.jpg`, `prognostix/abd-system.jpg` |
| 8 | `/projects/[slug]` ×30 | Per project: the site as built. Commissioned equipment in final position, or the yard/corridor in traffic after cut-over. | 4:5 | `projects/<project-slug>.jpg` |

## Priority 2 — strongly desirable

| # | Location | Subject | Ratio | Filename |
|---|---|---|---|---|
| 9 | `/company/story` | Archive frame of the earliest available site work — ideally the 2016 axle counter installation in Delhi division. An archive image carries more weight than a new shot; date it in the caption. | 4:5 | `company/archive-first-work.jpg` |
| 10 | `/company/engineering` | Outdoor installation: cable laying, signal erection or point machine fitting on a live corridor. Wide; show working conditions honestly. | 4:3 | `company/outdoor-installation.jpg` |
| 11 | `/company/leadership` | The wider team on site or at the project office. Group documentary frame, not a formal line-up. | 1:1 | `company/wider-team.jpg` |
| 12 | `/capabilities/[slug]` ×8 | Per capability: the relevant equipment in situ on a Cosmictech site. Equipment sharp, context legible. | 4:3 | `capabilities/<capability-slug>.jpg` |

---

## Brand assets

| Asset | Status | Notes |
|---|---|---|
| Cosmictech wordmark | **Built** | Set as live type in `components/brand/Brand.tsx`, so it stays crisp at every size and inherits the surface colour. |
| Cosmictech emblem | **Interim** | A hairline geometric reduction of the supplied orbital mark, drawn in the site's line language. Replace with the official vector at `public/brand/cosmictech-emblem.svg` and swap the component body. |
| Prognostix wordmark | **Built** | Live type, preserving the heavy/light weight relationship of the supplied logo. |
| Prognostix emblem | **Missing** | The supplied logo's lotus figure has not been reproduced. Supply as SVG at `public/brand/prognostix-emblem.svg`. |
| Open Graph image | **Missing** | 1200×630. Suggested: the corridor lattice on graphite with the wordmark. Add at `public/og.png` and reference in `lib/seo.ts`. |
| Favicon | **Built** | `src/app/icon.svg` — the emblem reduced for legibility at 16px. |
| Apple touch icon | **Missing** | `apple-icon.png` (180×180) in `src/app/`. |

---

## Written content still required

Each reservation states its own specification in the page. Summary:

| Location | What is needed |
|---|---|
| `/projects/[slug]` ×30 | Case-study narrative and outcome per project. The sources give only the tender description. |
| `/company/story` | Narrative company history — founding, first contract, the move into turnkey scopes, team formation. |
| `/company/engineering` | Organisation detail: headcount by discipline, concurrent project teams, site team composition. |
| `/company/leadership` | Senior management below board level. The supplied deck's "Team" slide had no readable content. |
| `/company/quality-safety` | Certifications: ISO numbers and validity, RDSO/zonal vendor approvals, safety management system. The profile mentions enclosed credential certificates; they were not supplied. |
| `/technology` | Roadmap beyond the two RDSO prototypes: milestones, field trial and production dates, target markets. |
| `/prognostix/technology` | Model architectures, training data, edge platform, MLOps, data governance. |
| `/prognostix/solutions` ×2 | Technical specification per product. |
| `/careers` | Live vacancies. |
| `/privacy`, `/terms` | Must be drafted by Cosmictech's legal advisers. Nothing has been drafted — text on those pages has legal effect. |
| `src/data/site.ts` | Contact channels: emails, phone, registered and project office addresses, CIN, GSTIN. Setting these switches the enquiry forms and footer links live automatically. |
| `src/data/site.ts` | Expansion of the zone codes `MRT` and `TVM`, which the source uses but does not define. |
| `src/data/company.ts` | The period for the FY 25-26 figure of ₹137 Cr — the source says "till" and then stops. |
