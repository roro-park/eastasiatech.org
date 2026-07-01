import { en } from './en';
import { ko } from './ko';
import { ja } from './ja';
import { zhTw } from './zh-tw';
import { zhCn } from './zh-cn';
import type { Dictionary } from './ui';

export const defaultLocale = 'en';

// Keys must equal the astro.config.mjs i18n locale codes exactly.
export const dictionaries: Record<string, Dictionary> = {
	en,
	ko,
	ja,
	'zh-TW': zhTw,
	'zh-CN': zhCn,
};

export function useTranslations(lang: string): Dictionary {
	return dictionaries[lang] ?? dictionaries[defaultLocale];
}

export interface LocaleMeta {
	code: string;
	label: string;
}

// `code` is what's passed to astro:i18n's getRelativeLocaleUrl() — it maps
// to the URL path via the { codes, path } config in astro.config.mjs.
export const locales: LocaleMeta[] = [
	{ code: 'en', label: 'English' },
	{ code: 'ko', label: '한국어' },
	{ code: 'ja', label: '日本語' },
	{ code: 'zh-TW', label: '繁體中文' },
	{ code: 'zh-CN', label: '简体中文' },
];
