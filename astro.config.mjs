// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://eastasiatech.org',
	i18n: {
		defaultLocale: 'en',
		locales: [
			'en',
			'ko',
			'ja',
			{ path: 'zh-tw', codes: ['zh-TW'] },
			{ path: 'zh-cn', codes: ['zh-CN'] },
		],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: {
					en: 'en',
					ko: 'ko',
					ja: 'ja',
					'zh-tw': 'zh-TW',
					'zh-cn': 'zh-CN',
				},
			},
		}),
	],
});
