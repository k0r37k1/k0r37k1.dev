/**
 * Test URLs Configuration
 *
 * Centralized list of pages to test for accessibility.
 * Add new pages here to automatically include them in site-wide tests.
 */

export const baseURL = 'http://localhost:4321';

export interface TestPage {
	url: string;
	name: string;
	description?: string;
	/**
	 * Additional selectors to wait for before running tests
	 */
	waitForSelectors?: string[];
}

/**
 * Main pages to test for accessibility
 */
export const testPages: TestPage[] = [
	{
		url: '/',
		name: 'Homepage',
		description: 'Portfolio landing page (German)',
		waitForSelectors: ['text=k0r37k1.dev'],
	},
	{
		url: '/en',
		name: 'Homepage EN',
		description: 'Portfolio landing page (English)',
		waitForSelectors: ['text=k0r37k1.dev'],
	},
	{
		url: '/imprint',
		name: 'Imprint',
		description: 'Legal imprint page',
		waitForSelectors: ['text=Impressum'],
	},
	{
		url: '/privacy',
		name: 'Privacy',
		description: 'Privacy policy page',
		waitForSelectors: ['text=Datenschutz'],
	},
	{
		url: '/blog',
		name: 'Blog DE',
		description: 'Blog index page (German)',
		waitForSelectors: ['text=BLOG'],
	},
	{
		url: '/en/blog',
		name: 'Blog EN',
		description: 'Blog index page (English)',
		waitForSelectors: ['text=BLOG'],
	},
];

/**
 * Critical user flows to test
 * Note: Email is obfuscated and loaded client-side, so we use a different selector
 */
export const criticalFlows: TestPage[] = [
	{
		url: '/',
		name: 'Contact Section',
		description: 'Test contact section accessibility',
		waitForSelectors: ['text=github.com/k0r37k1'],
	},
];
