import { test as base } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

type AxeFixture = {
	makeAxeBuilder: () => AxeBuilder;
};

/**
 * Extend base test with shared axe configuration
 *
 * This fixture provides a pre-configured AxeBuilder instance with:
 * - WCAG 2.1 Level AA tags
 * - Best practice rules
 * - Common third-party exclusions
 *
 * Usage:
 * ```typescript
 * import { test, expect } from './fixtures/axe-test';
 *
 * test('page is accessible', async ({ page, makeAxeBuilder }) => {
 *   await page.goto('/');
 *   const results = await makeAxeBuilder().analyze();
 *   expect(results.violations).toEqual([]);
 * });
 * ```
 */
export const test = base.extend<AxeFixture>({
	makeAxeBuilder: async ({ page }, use) => {
		const makeAxeBuilder = () =>
			new AxeBuilder({ page })
				// Test WCAG 2.1 Level AA compliance
				.withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'])
				// Exclude third-party content we can't control
				.exclude([
					'#ads', // Ad containers
					'.cookie-banner', // Cookie consent (managed by external service)
					'iframe[src*="youtube"]', // YouTube embeds
					'iframe[src*="vimeo"]', // Vimeo embeds
				])
				// Disable specific rules
				.disableRules([
					'aria-hidden-focus', // Astro framework SSR limitation (aria-hidden on un-hydrated islands)
					'color-contrast', // Theme-based colors (Shiki syntax highlighting, design system colors)
					'listitem', // motion-plus-vue Carousel renders <ul role="group"><li> (fixed at runtime via MutationObserver)
					'page-has-heading-one', // Best practice - not strict WCAG requirement
					'region', // Best practice - content landmark requirement
				]);

		await use(makeAxeBuilder);
	},
});

export { expect } from '@playwright/test';
