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
		description: 'Main landing page',
		waitForSelectors: ['text=Lightning-Fast Builds'],
	},
	{
		url: '/demo',
		name: 'Demo Page',
		description: 'Component showcase and demos',
		waitForSelectors: ['text=Component Showcase'],
	},
];

/**
 * Critical user flows to test
 */
export const criticalFlows: TestPage[] = [
	{
		url: '/',
		name: 'Interactive Counter Flow',
		description: 'Test counter interaction',
		waitForSelectors: ['button[aria-label="Increment"]'],
	},
];
