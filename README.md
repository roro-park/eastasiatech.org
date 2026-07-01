# eastasiatech.org

Marketing site for the **East Asia Technology Institute (EATI)** — an independent, Korea-registered research and advisory institute working on emerging technology governance, responsible innovation, and regional cooperation across East Asia.

A single-page site, fully localized into five languages: English, Korean, Japanese, Traditional Chinese (Taiwan), and Simplified Chinese (Mainland).

## Getting started

```sh
npm install
npm run dev
```

The site runs at `http://localhost:4321`. Available locales during development:

| Locale | Path |
| :--- | :--- |
| English (default) | `/` |
| Korean | `/ko/` |
| Japanese | `/ja/` |
| Traditional Chinese | `/zh-tw/` |
| Simplified Chinese | `/zh-cn/` |

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local dev server |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro ...` | Run Astro CLI commands (e.g. `astro check`) |

## Project structure

```text
src/
├── i18n/               # Per-locale copy + shared types
│   ├── ui.ts            # Dictionary interface every locale is typed against
│   ├── en.ts, ko.ts, ja.ts, zh-tw.ts, zh-cn.ts
│   ├── legal.ts          # Untranslated factual footer text (company name, registration, address)
│   └── utils.ts          # useTranslations(lang), locale metadata for the switcher
├── layouts/
│   └── PageLayout.astro # <html>/<head> shell: SEO, hreflang, favicons
├── components/
│   ├── HomeBody.astro   # Composes the full page for a given `lang`
│   ├── Header.astro, LanguageSwitcher.astro
│   ├── Hero.astro, Mission.astro, WhatWeDo.astro, AreasOfExploration.astro,
│   │   HowWeWork.astro, Contact.astro, Footer.astro, Card.astro
│   └── icons/            # Hand-authored inline SVG icons for the card grids
├── assets/logo/          # Logo lockups, imported via astro:assets for optimization
├── styles/global.css     # Design tokens (color, type, spacing) — no CSS framework
└── pages/
    ├── index.astro        # English (root)
    └── ko/, ja/, zh-tw/, zh-cn/index.astro   # thin per-locale stubs
```

Each locale page file is a two-line stub — all real markup and composition lives once in `HomeBody.astro` and the section components it renders.

## Editing copy

Edit the matching file in `src/i18n/` (`en.ts`, `ko.ts`, `ja.ts`, `zh-tw.ts`, `zh-cn.ts`). Every file is typed against the `Dictionary` interface in `src/i18n/ui.ts`, so a missing translation key is a type error in your editor (or via `npx astro check`, which prompts to install `@astrojs/check` + `typescript` the first time you run it) rather than silently shipping blank text.

The footer's legal block (company name, Korean legal name, business registration number, address, copyright) lives in `src/i18n/legal.ts` and is **not** translated per-locale — it's shared byte-for-byte across all five locales so a translation error can never alter the factual/legal text.

## Adding a locale

1. Add the locale to `astro.config.mjs` under `i18n.locales` (and the sitemap integration's `i18n.locales` map).
2. Add the locale to the `locales` array in `src/i18n/utils.ts`.
3. Create `src/i18n/<locale>.ts` implementing the `Dictionary` type, and register it in `dictionaries` in `src/i18n/utils.ts`.
4. Create `src/pages/<path>/index.astro` following the existing per-locale stubs.

## Design

Visual direction is "warm institutional": a soft cream background, bordered uppercase eyebrow labels, serif display headings, and a navy/blue-green accent sampled from the EATI logo. All tokens live as CSS custom properties in `src/styles/global.css` — there's no Tailwind or CSS framework in this project.

## SEO

`astro.config.mjs` sets `site` and configures `@astrojs/sitemap` with a per-locale `hreflang` map, so `npm run build` emits a sitemap with correct language alternates for all five locales. `PageLayout.astro` also sets per-locale `<title>`/`<meta description>`, canonical URLs, and `hreflang` `<link>` tags.

## Deployment

Every push to `main` builds and deploys the site to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). `public/CNAME` points the Pages deployment at the custom domain `eastasiatech.org` (matching the `site` set in `astro.config.mjs`).

One-time setup on GitHub (not something a workflow file can do for you):

1. In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
2. In **Settings → Pages → Custom domain**, enter `eastasiatech.org` and enable **Enforce HTTPS** once DNS has propagated.
3. At your DNS provider, point `eastasiatech.org` at GitHub Pages (an `ALIAS`/`ANAME` record, or the four GitHub Pages `A` records, per [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).

## More context

See [AGENTS.md](./AGENTS.md) (symlinked as `CLAUDE.md`) for deeper implementation notes and gotchas aimed at whoever (human or AI) picks up this codebase next.

Full Astro documentation: https://docs.astro.build
