import de from './de';
import en from './en';

export const languages = {
	de,
	en,
};

export type Language = keyof typeof languages;

/**
 * Get translations for a specific language
 */
export function getTranslations(lang: Language = 'de') {
	return languages[lang] || languages.de;
}

/**
 * Get language from URL path
 * @param url - Current URL or pathname
 * @returns Language code ('de' or 'en')
 */
export function getLangFromUrl(url: URL | string): Language {
	const pathname = typeof url === 'string' ? url : url.pathname;
	const [, lang] = pathname.split('/');

	if (lang === 'en') return 'en';
	return 'de';
}

/**
 * Get localized path
 * @param path - Path without language prefix
 * @param lang - Target language
 * @returns Localized path
 */
export function getLocalizedPath(path: string, lang: Language): string {
	// Remove leading slash
	const cleanPath = path.startsWith('/') ? path.slice(1) : path;

	// German is default, no prefix
	if (lang === 'de') {
		return `/${cleanPath}`;
	}

	// English gets /en/ prefix
	return `/en/${cleanPath}`;
}

/**
 * Get alternate language URL
 * @param currentUrl - Current URL or pathname
 * @returns Alternate language URL
 */
export function getAlternateUrl(currentUrl: URL | string): string {
	const pathname = typeof currentUrl === 'string' ? currentUrl : currentUrl.pathname;
	const currentLang = getLangFromUrl(pathname);
	const alternateLang = currentLang === 'de' ? 'en' : 'de';

	// Remove current language prefix if exists
	const pathWithoutLang = pathname.replace(/^\/(en|de)\//, '/');

	return getLocalizedPath(pathWithoutLang, alternateLang);
}
