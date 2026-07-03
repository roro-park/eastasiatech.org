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

// Only English is routable for now (see astro.config.mjs). Restore the other
// entries here once ko/ja/zh-tw/zh-cn are re-added to astro.config.mjs.
export const locales: LocaleMeta[] = [{ code: 'en', label: 'English' }];
