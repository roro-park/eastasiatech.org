# eastasiatech.org

Marketing site for the **East Asia Technology Institute (EATI)** — an independent, Korea-registered research and advisory institute working on emerging technology governance, responsible innovation, and regional cooperation across East Asia.

A single-page site, built to eventually localize into five languages (English, Korean, Japanese, Traditional Chinese, Simplified Chinese) via Astro's built-in i18n routing. **Only English is live right now** — the drafted ko/ja/zh-tw/zh-cn copy needs a review pass before it goes back online (see [Editing copy](#editing-copy)).

## Getting started

```sh
npm install
npm run dev
```

The site runs at `http://localhost:4321`.

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
│   └── PageLayout.astro # <html>/<head> shell: SEO, canonical, favicons
├── components/
│   ├── HomeBody.astro   # Composes the full page for a given `lang`
│   ├── Header.astro
│   ├── Hero.astro, Mission.astro, WhatWeDo.astro, AreasOfExploration.astro,
│   │   HowWeWork.astro, Contact.astro, Footer.astro, Card.astro
│   └── icons/            # Hand-authored inline SVG icons for the card grids
├── assets/logo/          # Logo lockups, imported via astro:assets for optimization
├── styles/global.css     # Design tokens (color, type, spacing) — no CSS framework
└── pages/
    └── index.astro        # English (root) — the only live route right now
```

`index.astro` is a two-line stub — all real markup and composition lives once in `HomeBody.astro` and the section components it renders.

## Editing copy

Edit `src/i18n/en.ts` for the live English copy. `ko.ts`, `ja.ts`, `zh-tw.ts`, and `zh-cn.ts` hold draft translations that are **not currently live** (see below) — edit those once reviewed copy is ready to publish. Every file is typed against the `Dictionary` interface in `src/i18n/ui.ts`, so a missing key is a type error in your editor (or via `npx astro check`, which prompts to install `@astrojs/check` + `typescript` the first time you run it) rather than silently shipping blank text.

The footer's legal block (company name, Korean legal name, business registration number, address, copyright) lives in `src/i18n/legal.ts` and is **not** translated per-locale — it's shared byte-for-byte across all locales so a translation error can never alter the factual/legal text.

## Bringing back other locales

Only English is routed right now (`astro.config.mjs`'s `i18n.locales` is just `['en']`) while the ko/ja/zh-tw/zh-cn translations are reviewed. `src/i18n/ko.ts`/`ja.ts`/`zh-tw.ts`/`zh-cn.ts` still exist and are still imported by `src/i18n/utils.ts` — they're just not reachable via a route. To re-enable a locale once its copy is finalized:

1. Add it back to `astro.config.mjs` under `i18n.locales` (and add the sitemap integration's `i18n.locales` map back).
2. Add it back to the `locales` array in `src/i18n/utils.ts`.
3. Recreate `src/pages/<path>/index.astro` as `<PageLayout lang="..."><HomeBody lang="..." /></PageLayout>` (check git history for the previous versions).
4. Re-add a language switcher to `Header.astro` (previously `src/components/LanguageSwitcher.astro`, removed along with the routes — check git history).

## Design

Visual direction is "warm institutional": a soft cream background, bordered uppercase eyebrow labels, serif display headings, and a navy/blue-green accent sampled from the EATI logo. All tokens live as CSS custom properties in `src/styles/global.css` — there's no Tailwind or CSS framework in this project.

## SEO

`astro.config.mjs` sets `site` and configures `@astrojs/sitemap`, so `npm run build` emits a sitemap for the site. `PageLayout.astro` also sets the page `<title>`/`<meta description>` and canonical URL from `src/i18n/en.ts`'s `seo` fields.

## Deployment

Every push to `main` builds and deploys the site to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). `public/CNAME` points the Pages deployment at the custom domain `eastasiatech.org` (matching the `site` set in `astro.config.mjs`).

One-time setup on GitHub (not something a workflow file can do for you):

1. In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
2. In **Settings → Pages → Custom domain**, enter `eastasiatech.org` and enable **Enforce HTTPS** once DNS has propagated.
3. At your DNS provider, point `eastasiatech.org` at GitHub Pages (an `ALIAS`/`ANAME` record, or the four GitHub Pages `A` records, per [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).

## More context

See [AGENTS.md](./AGENTS.md) (symlinked as `CLAUDE.md`) for deeper implementation notes and gotchas aimed at whoever (human or AI) picks up this codebase next.

Full Astro documentation: https://docs.astro.build
