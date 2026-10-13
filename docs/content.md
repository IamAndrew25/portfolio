# Add a project without rewriting the UI

Each project has one stable slug, a typed metadata file and two narrative files.

## Quick path

1. Create `src/content/projects/<slug>/project.ts`, `en.mdx` and `es.mdx`.
2. Define a record with `satisfies Project`, following an existing project.
3. Register the record in `src/modules/projects/infrastructure/local-project-catalog.ts`.
4. Add a social card to `scripts/prepare-images.mjs` and run `npm run prepare:images`.
5. Run `npm run check` and `npm run test:e2e`, then inspect the case in both languages.

Routes, metadata and the sitemap derive from the catalog. MDX is selected from the published slug and locale. The homepage shows the first three published records by `order`; `/projects/` shows the full catalog.

## Tell a verifiable story

| Field | Content |
| --- | --- |
| `xyz.outcome` | What changed or what capability you delivered |
| `xyz.evidence` | A measured result or a concrete, inspectable artifact |
| `xyz.approach` | What you personally designed or implemented |
| `role` | Your contribution, especially for academic or team projects |
| `stages` | What happens, the engineering decision and a source link when available |
| `evidence` | Context for results, including experimental scope and limitations |

Use actual measurements when they exist. When they do not, describe the observable result and supporting evidence. Do not substitute configuration values for performance measurements.

For model work, identify the dataset, split, experiment version and evaluation context. Historical results must remain distinguishable from a rebuild. Planned comparisons are not completed results.

## Narrative sections

Keep these anchors in both MDX stories so the case navigation remains stable:

```mdx
<h2 id="problem">The problem</h2>

Explain the need and constraints.

<h2 id="decisions">Engineering decisions</h2>

Explain your contribution and tradeoffs.

<h2 id="validation">Validation and results</h2>

Describe evidence and its scope.

<h2 id="next">Limits and next steps</h2>

State what remains to be done.
```

Translate the headings and body in `es.mdx`; keep the anchor IDs unchanged. MDX is trusted, repository-authored content and can contain code, so do not compile unreviewed visitor input as MDX.

## Publishing and source access

`publication: "draft"` hides the record and prevents resolving its route. Changing to `"published"` makes it available on the next build. `status: "in-progress"` remains visible as an honest progress label.

Use `repository: { visibility: "public", url: "https://github.com/..." }` only for accessible code. Private and unavailable records omit the URL. Add `demo` only when there is a working public destination.

## Add a different visual

Current visuals include the financial RAG document stack, code-review terminal, voice workflow, vision protocol and the Trilinea configurator render. The RAG and review scenes use layered CSS in `system-visuals.css` and are explanatory illustrations, not application screenshots. To add a new visual type, extend the `visual` union in the domain and implement it in `ProjectVisual.tsx`. The case-study layout and catalog queries remain unchanged.

For project-specific images, use optimized files in `public/projects/` with meaningful alternative text and a clear source. Update `profile.ts` for shared identity/contact details and `src/modules/profile/resume.ts` for education, résumé-only projects, skills, training and languages. Interface labels remain in the locale messages. Retail employment is intentionally omitted at the owner's request.

The résumé prioritizes the financial RAG project, FintechPay and the catalog's voice integration, with links to the other published cases, including Code Review Agent. The RAG entry links to its full case through `catalogSlug`; FintechPay remains a résumé-only entry. Review both printed languages after editing, since longer content can change pagination.
