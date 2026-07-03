// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://eastasiatech.org',
	// Only English is live for now — the drafted ko/ja/zh-tw/zh-cn translations
	// in src/i18n/ are kept for when the user provides reviewed copy. Re-add
	// them here (and restore src/pages/<locale>/index.astro) at that point.
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	integrations: [sitemap()],
});
