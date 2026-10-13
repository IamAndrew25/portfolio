# A content-first portfolio with explicit boundaries

The portfolio uses a small, feature-oriented version of Clean Architecture. Pages are prerendered and content lives in Git. Small client components handle the résumé's print button and optional pointer-driven depth effects; the content passed into those surfaces is still rendered on the server. Next.js also supplies its normal client navigation runtime.

## Dependency direction

```text
Next.js routes (composition root)
  ├─ instantiate the local catalog adapter
  ├─ invoke application queries
  └─ pass project data and compiled MDX to presentation

presentation ───────► domain models
application ────────► catalog port + domain models
infrastructure ─────► catalog port + typed content
```

Domain and application import no React, Next.js, MDX or storage adapters. Presentation receives data through props. ESLint enforces these import boundaries. There is no dependency-injection container; route composition supplies the catalog explicitly.

## Content contract

`Project` defines identity, category, progress, visibility, bilingual text, outcome/evidence/approach, source access and documented system stages.

- `publication` controls whether a project can be listed or resolved by slug.
- `status` describes the project's progress. An in-progress project can be published.
- `repository` is a discriminated union: only public repositories contain a URL.
- A slug is stable even if the display title changes.
- Long-form MDX belongs to presentation. It is loaded only after resolving a published project.

The catalog contains metadata, not React components. Migrating metadata to a CMS would introduce another adapter implementing `ProjectCatalog`. Moving the narrative into a CMS would also require an explicit body renderer/mapping; replacing the catalog alone does not migrate MDX.

## Routes and language

English uses `/`, `/projects/`, `/projects/[slug]/` and `/resume/`. Spanish uses the same paths under `/es/`.

Two route groups have their own root documents, so `html lang` is correct in the initial HTML. Language switching preserves the current page and intentionally performs a document navigation. It does not read local storage or change language after hydration.

`generateStaticParams` includes published slugs only. Unknown slugs return 404. Next.js's experimental `globalNotFound` supplies a complete 404 document for the two-root-layout setup.

## Visual system

Tokens in `src/shared/design-system/tokens.css` define warm graphite, stone beige and muted lavender. `globals.css` contains the shared visual grammar and component styles; `depth.css` adds the layered 3D treatment. Layout is responsive; focus states, reduced motion and print styles are explicit.

`DepthSurface` progressively enhances a static CSS 3D composition. A stationary wrapper measures pointer coordinates while its child transforms, preventing geometry feedback. Pointer events schedule at most one pending animation frame and write CSS variables without React state updates. There is no idle animation loop or WebGL dependency.

Tilt is enabled only for a fine, hovering mouse pointer when reduced motion is off. Leaving a surface, keyboard focus, scrolling, window blur, visibility changes and preference changes reset it. Cleanup aborts listeners and cancels pending frames. Touch and no-JavaScript visitors keep the static depth treatment and normal links.

Layer parents retain `transform-style: preserve-3d` and visible overflow. Clipping, opacity and filters are confined to leaf planes because those properties can flatten a 3D context. Decorative chip faces and lighting do not enter the accessibility tree or intercept input.

The hero's intermediate planes explicitly establish transforms at `translateZ(0)` to prevent intersections during rotation. Its decorative floor and halo are clipped within their own separate stage, keeping narrow viewports free of horizontal scrolling without clipping the interactive content.

Native `details` elements power the system explorer. All stages remain keyboard-accessible and usable without JavaScript. Graphics are labeled as illustrations; API keys and model requests are not needed to explore a case study.

## Hosting boundary

Next.js runs in its normal deployment mode, with all current content routes prerendered. This retains Vercel's supported runtime and image optimization without requiring request-time project data or a database.

Persistent Turbopack build caching is disabled in `next.config.ts`: a local rebuild was observed to serve an obsolete stylesheet until a fresh compile. The portfolio is small, so predictable CSS output takes priority over warm build speed. Development caching retains the framework default.

`NEXT_PUBLIC_SITE_URL` sets the canonical production origin. Vercel's production-domain variable is the fallback, then localhost for local development. Preview deployments and localhost are marked `noindex`; the owner should verify the canonical origin during manual publication.

A future model demo can be a separate module calling a separately deployed service. Model credentials and long-running inference belong on that service, not in client components or the content catalog.

## Reviewable work units

1. Catalog, bilingual routes and evidence-led content, with contract tests.
2. Visual system, project explorer and résumé, with browser checks.
3. Manual publication documentation and check-only CI.

These are delivery boundaries, not commits already created. Publishing is an owner-controlled step.
