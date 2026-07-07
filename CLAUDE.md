# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for "Angel Martinez Photography", built as a **static Astro 5 site** (SSG-first) with **zero client-side UI framework** — all interactivity is vanilla JS in Astro component `<script>` tags. Design direction is "Monumental Nocturno" (black/white editorial, Anton display type). Bilingual (Spanish default, English under `/en/`). Content is authored in Spanish and English throughout.

## Commands

Package manager is **pnpm** (`node-linker=hoisted`, see `.npmrc`). Disable telemetry when running Astro CLI.

```bash
pnpm install
pnpm dev                                    # dev server (astro dev)
ASTRO_TELEMETRY_DISABLED=1 pnpm check       # astro check — type/diagnostics gate
ASTRO_TELEMETRY_DISABLED=1 pnpm build       # static build → dist/
pnpm preview                                # serve the built dist/
pnpm analyze:bundle                         # per-filetype weight report (scripts/report-bundle.mjs)
pnpm analyze:images                         # image budget check (scripts/check-image-budget.mjs)
pnpm perf:report                            # build + both analyses
```

There is no test runner and no separate lint script — `pnpm check` (astro check + tsconfig strict) is the correctness gate. The `astro-dev` launch config runs on port **4399** (see `.claude/launch.json`); prefer the preview tools over spawning your own dev server.

The image budget script fails the build if any source image in `src/assets/images/` exceeds **220 KB**. Keep new imagery under that limit.

## Architecture

### Two parallel content systems

Content lives in two distinct places — know which one a given piece of copy belongs to:

1. **`src/data/site-content.ts`** — a single large `marketingContentByLocale: Record<Locale, MarketingContent>` object holding all page/section UI strings and imported hero/gallery/service/portfolio images. Accessed **only** through the `ContentProvider` contract, never imported directly by pages.
   - `src/lib/content/types.ts` defines `MarketingContent` and all its sub-interfaces. When adding a new view's strings, add a new `*UiContent` interface and register it on `MarketingContent` above the `anchor:page-ui-types` line.
   - `src/lib/content/index.ts` → `createContentProvider()` returns a `StaticContentProvider`. This indirection is deliberate: a future `CMSContentProvider` can drop in without touching pages. Pages do `const content = await createContentProvider().getMarketingContent(locale)`.

2. **`src/content/` collections** (Astro content layer, `src/content.config.ts`) — `albums/*.yaml` and `services/*.yaml` for repeatable, per-item content with real images and packages. Every text field is a `localizedText` (`{ es, en }`) or `localizedList`; Zod enforces that both locales are present when you add an item. Accessed via `getCollection('albums' | 'services')`, e.g. in `getStaticPaths()` for the `[slug]` routes.

### i18n

- `src/lib/i18n.ts`: `DEFAULT_LOCALE = 'es'`, `getLocaleFromPath()`, `withLocalePath()`. English routes are physically duplicated under `src/pages/en/`; each ES page has an EN twin that calls the provider with `'en'`.
- Navigation is defined once in `src/lib/content/nav.ts` (`NAV_DEFINITIONS`, `NAV_UI`). This module must stay import-light (no images/heavy content) because the React nav island imports it.

### Pages, layouts, sections

- `src/pages/` — route entry points. `[slug].astro` files (`portfolio/`, `services/`, and their `en/` twins) generate static paths from content collections.
- `src/layouts/BaseLayout.astro` — `<html>` shell, `<ClientRouter>` for view transitions, and two scripts: a `has-js` flag on `<html>` (re-added on `astro:after-swap` — ClientRouter replaces `<html>` attributes and inline scripts don't re-run), and a scroll-reveal system for `[data-reveal]`/`[data-rise]` (in-viewport elements reveal synchronously, below-fold via `IntersectionObserver`; after navigations reveals are delayed ~360ms so they don't compete with the view transition).
- **Mobile view-transition policy** (`global.css`, `@media (hover: none), (pointer: coarse), (max-width: 900px)`): per-element morphs are disabled (`.vt-page-title` and everything with `transition:name` inside `<main>` get `view-transition-name: none`) and the page transition is a pure opacity cross-fade — per-element snapshots at 3x device resolution are too expensive on phones. New `transition:name` morphs are desktop-only by design; don't "fix" this by re-enabling them on mobile.
- `src/components/layout/SiteScaffold.astro` — wraps BaseLayout, mounts the persistent nav/footer (`transition:persist`) and animates `<main>` with a custom window view-transition. Most pages render `<SiteScaffold>` + a sequence of section components.
- `src/components/sections/*.astro` — presentational; receive typed content slices as props.

### Client-side interactivity (no framework)

There is no React/UI framework and no hydration. The only interactive component is `src/components/layout/FloatingNav.astro`, a plain Astro component with a bundled `<script>`. It lives inside a `<div transition:persist>` in `SiteScaffold`, so its DOM (and its once-attached listeners) survive navigations. Server render sets the correct locale/active state for the first page; the script re-syncs locale, links and `aria-current` on every `astro:after-swap`, toggles `.is-scrolled` on scroll, and drives the mobile menu — importing the same `nav.ts`/`i18n.ts` single source of truth. Follow this pattern (Astro `<script>` + `astro:page-load`/`astro:after-swap`, like the reveal script in `BaseLayout.astro`) for any new interactivity; do not add a UI framework back.

## Conventions

- `@/*` path alias → `src/*` (see `tsconfig.json`). TypeScript is `astro/tsconfigs/strict`.
- Design tokens live in `tailwind.config.js`: colors `ink`/`fog`/`muted`/`accent`; font families `display` (Anton), `body`/`caption` (Geist), `meta` (IBM Plex Mono). Only these three families ship — don't add font packages without checking the weight budget. Base Tailwind styles are **not** injected by the integration (`applyBaseStyles: false`); global CSS is `src/styles/global.css`.
- Images: import from `src/assets/images/` and render with `astro:assets` (`Image`/`Picture`). LCP images eager + `fetchpriority="high"`, the rest lazy.
- Hover effects are pointer-only: `hoverOnlyWhenSupported: true` in `tailwind.config.js` gates every `hover:`/`group-hover:` utility behind `@media (hover: hover) and (pointer: fine)`, and custom `:hover` rules in `global.css` are wrapped in the same query. On touch the first tap would otherwise leave `:hover` stuck (e.g. zoomed portfolio covers). Touch feedback is `main a:active` in the mobile media block.
- Comments in code and content are written in Spanish, matching the existing codebase.

## Design source & stale docs

- `website.pen` is the Pencil design source of truth for the "Monumental Nocturno" redesign — a `.pen` file; only ever touch it through the `pencil` MCP tools, never Read/Grep/Edit it directly.
- `README.md` and `info.md` are partially outdated: they reference an `src/components/aceternity/` directory, a `legacy-src/` folder, React islands, and a shadcn/40-component setup that no longer exist in this Astro build. `components.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts` and `eslint.config.js` are leftovers from the pre-Astro Vite/React app — not used by the Astro build (which uses `tsconfig.json`). Trust the actual `src/` tree over those docs.

## Deploy

Static output in `dist/` is served by Nginx (`Dockerfile`, `deploy/nginx.conf`) with `deploy/Caddyfile` as an alternative. `astro.config.mjs` sets `output: 'static'` and `site: 'https://photos.angelmartinez.local'`.
