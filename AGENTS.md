## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project: EATI landing page

Single-page marketing site for East Asia Technology Institute, localized into 5 locales via Astro's built-in i18n routing (configured in `astro.config.mjs`): `en` (default, no path prefix), `ko`, `ja`, `zh-tw` (hreflang `zh-TW`), `zh-cn` (hreflang `zh-CN`).

- **Adding/editing copy**: edit the matching file in `src/i18n/` (`en.ts`, `ko.ts`, `ja.ts`, `zh-tw.ts`, `zh-cn.ts`). Every locale file is typed against the `Dictionary` interface in `src/i18n/ui.ts` — a missing key is a TypeScript compile error, so all 5 locales stay structurally in sync.
- **Footer legal block is intentionally not translated**: `src/i18n/legal.ts` holds the factual company name, Korean legal name, business registration number, address, and copyright, shared byte-identical across all locales so a translation mistake can never alter the legal text. Only small labels (e.g. "Legal", "Contact") come from the per-locale dictionary.
- **Page files are thin stubs**: `src/pages/index.astro` (en) and `src/pages/{ko,ja,zh-tw,zh-cn}/index.astro` each just render `<PageLayout lang="..."><HomeBody lang="..." /></PageLayout>`. All real markup/composition lives once in `src/components/HomeBody.astro` and the section components it renders (`Hero`, `Mission`, `WhatWeDo`, `AreasOfExploration`, `HowWeWork`, `Contact`), plus `Header`/`Footer` in `src/layouts/PageLayout.astro`.
- **Language switcher** (`src/components/LanguageSwitcher.astro`) uses `astro:i18n`'s `getRelativeLocaleUrl` — safe here because every locale has exactly one route (the homepage), so it never needs to preserve a sub-path.
- **Design tokens** live in `src/styles/global.css` as CSS custom properties (cream background, navy text/borders, blue→green gradient accent sampled from the logo, serif display headings) — the intended style is "warm institutional": bordered uppercase eyebrow labels, denser text blocks, less negative space than a minimal SaaS page. Keep new sections consistent with these tokens rather than introducing new ad hoc colors/spacing.
- **Logo assets**: `src/assets/logo/eati-horizontal.png` (used in the header) and `eati-stacked.png` (used in the hero), imported through `astro:assets`' `<Image />` for automatic optimization. Do not use the `-fixed.svg` source files elsewhere on disk — they embed a large ICC color profile and are not web-optimized.
- **Sitemap**: `@astrojs/sitemap` is configured in `astro.config.mjs` with a `i18n.locales` map (URL path → hreflang code) that mirrors the `i18n.locales` block above it. If a locale is ever added or removed, update both blocks together, plus the `locales` array in `src/i18n/utils.ts`.
- **`Astro.site`/`getAbsoluteLocaleUrl` gotcha**: `Astro.site` is a `URL` object, not a string — do not pass it as the `site` override to `getAbsoluteLocaleUrl`/`getAbsoluteLocaleUrl`-family functions (it expects a string internally and will throw `path.endsWith is not a function`). Just call `getAbsoluteLocaleUrl(locale)` with no options; it already reads `site` from `astro.config.mjs` correctly.
- **Favicons**: `public/favicon.ico`, `favicon-16.png`, `favicon-32.png`, `favicon-48.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, and `site.webmanifest` are all cropped from the globe mark in `src/assets/logo/eati-stacked.png` (icon-only region, no wordmark). The crop/regeneration script isn't checked in; if the mark ever changes, re-crop the icon region from the stacked logo (bounding box was roughly x 260–739, y 155–635 out of the 1000×1000 source) and regenerate all sizes with Pillow.
