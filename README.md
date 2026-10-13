# Andres Obispo Calla — Software & AI

A bilingual engineering portfolio: a short introduction, evidence-led project case studies, an explorable system diagram and a printable résumé. Built with Next.js, TypeScript and local MDX.

Its editorial design includes layered CSS 3D surfaces with optional, pointer-driven perspective. Touch devices, reduced-motion preferences and JavaScript-disabled visits retain a static, usable layout.

## Run locally

Use Node.js 22 or newer and npm. From the project directory:

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Spanish is available at `/es/`.

To review the production build locally:

```bash
npm run build
npm run start
```

## Project map

| Area | Responsibility |
| --- | --- |
| `src/app/` | Routes, document languages, composition and metadata |
| `src/modules/projects/` | Project domain, catalog contract, queries, adapter and presentation |
| `src/modules/profile/` | Profile, homepage sections and résumé |
| `src/content/projects/` | Typed project records and English/Spanish MDX stories |
| `src/shared/` | Design tokens, shared UI, localized paths and SEO |
| `public/projects/`, `public/social/` | Optimized project imagery and social cards |

Read [Architecture](docs/architecture.md) for dependency rules and [Adding a project](docs/content.md) for the publishing workflow.

## Verify a change

```bash
npm run check
npx playwright install chromium --only-shell
npm run test:e2e
```

`check` runs lint, TypeScript, content/behavior tests and the production build. The browser suite uses the production build on port 3210, with one worker. It checks desktop/mobile routes, both languages, image loading, source visibility, a keyboard-operated explorer with JavaScript disabled, metadata, 404s and print layout. Screenshots and a résumé PDF are written to ignored `test-results/` directories.

## Publish manually

The source stays in GitHub. The website is intended for Vercel, deployed manually by its owner. The repository's workflow checks changes; it does not publish them.

Follow [Manual Vercel deployment](docs/deployment.md). Review the local site first, then create a preview before publishing production. No Vercel account, project or Git integration is configured in this repository.

## Content and assets

- GitHub links are shown only for public source repositories. Project progress and publication visibility are separate fields.
- Model results include their scope. The face detector's 76.27% result belongs to an earlier experiment, not the current rebuild.
- RAG, code-review, voice and vision graphics are explanatory illustrations, not fabricated screenshots or live inference results. The code-review terminal represents the repository's deliberately vulnerable fixture.
- Financial RAG API and Code Review Agent lead the selected work. RAG's 19 tests refer to revision `6381c60` with external model calls mocked; the agent remains a prototype with documented false positives and coverage limits.
- The Trilinea image is an actual studio render used in its configurator. The portfolio describes software work, not authorship of the architectural render.
- The résumé combines the shared profile, catalog and structured CV content in `src/modules/profile/resume.ts`. Education and credentials were reconciled with the owner's 2026 CV; technical claims also use the current project evidence. The owner chose to omit retail employment and focus on software/AI. Use **Print / Save as PDF** to download the one-page English or Spanish version.

Optimized assets are included in the project, so normal installation and builds do not depend on other local projects. Social cards can be regenerated with `npm run prepare:images`. To replace the Trilinea preview from a source render:

```bash
npm run prepare:images -- --trilinea-source "/absolute/path/to/render.webp"
```

The image pipeline uses Sharp and preserves the source file.

The About section features a real workspace photograph. To regenerate its optimized WebP copy:

```bash
npm run prepare:workspace -- "/absolute/path/to/workspace.jpeg"
```

This applies proportional resizing and subtle color adjustments while preserving the original. The optimized workspace image in `public/profile/` is sufficient for normal builds.
