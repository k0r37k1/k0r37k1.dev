import type { Spec } from 'axe-core';

/**
 * Global axe-core configuration
 *
 * This configuration is used for programmatic axe-core usage
 * (e.g., runtime checks in browser).
 *
 * For Playwright tests, use the test fixture in `tests/fixtures/axe-test.ts`
 */
export const axeConfig: Spec = {
	// Rule-specific configuration
	rules: [
		{
			id: 'color-contrast',
			enabled: true,
		},
		{
			id: 'image-alt',
			enabled: true,
		},
		{
			id: 'label',
			enabled: true,
		},
		{
			id: 'button-name',
			enabled: true,
		},
		{
			id: 'link-name',
			enabled: true,
		},
		{
			id: 'aria-allowed-attr',
			enabled: true,
		},
		{
			id: 'aria-required-attr',
			enabled: true,
		},
	],

	// Global exclusions (elements we can't control)
	exclude: [
		['#ads'], // Ad containers
		['.cookie-banner'], // External cookie consent
		['iframe[src*="youtube"]'], // YouTube embeds
		['iframe[src*="vimeo"]'], // Vimeo embeds
	],
};

/**
 * Impact levels for prioritizing fixes
 */
export const impactLevels = {
	critical: ['critical'],
	serious: ['serious'],
	moderate: ['moderate'],
	minor: ['minor'],
} as const;

/**
 * Helper to filter violations by impact
 */
export function filterByImpact(
	violations: any[],
	impacts: Array<keyof typeof impactLevels>
): any[] {
	const allowedImpacts = impacts.flatMap((key) => impactLevels[key]);
	return violations.filter((v) => allowedImpacts.includes(v.impact));
}
