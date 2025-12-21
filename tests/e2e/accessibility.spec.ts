import { test, expect } from '../fixtures/axe-test';
import { testPages, criticalFlows } from '../config/test-urls';

/**
 * Accessibility Tests
 *
 * Comprehensive accessibility testing using axe-core with @axe-core/playwright.
 * Tests follow industry best practices from Playwright and axe-core documentation.
 *
 * Test Layers:
 * 1. Site-wide tests - All main pages
 * 2. Component-specific tests - Interactive elements
 * 3. Critical flow tests - User interactions
 *
 * @see AXE_CORE_GUIDE.md for detailed best practices
 */

test.describe('Site-wide Accessibility', () => {
	/**
	 * Best Practice: Loop-based testing for multiple pages
	 * Source: Medium article on realistic accessibility testing
	 */
	for (const pageDef of testPages) {
		test(`${pageDef.name} should be accessible`, async ({ page, makeAxeBuilder }) => {
			await page.goto(pageDef.url);

			// Best Practice: Wait for specific content before testing
			// Prevents testing incomplete pages
			if (pageDef.waitForSelectors) {
				for (const selector of pageDef.waitForSelectors) {
					await page.waitForSelector(selector);
				}
			} else {
				await page.waitForLoadState('networkidle');
			}

			const results = await makeAxeBuilder().analyze();

			expect(results.violations).toEqual([]);
		});
	}
});

test.describe('Component-Specific Accessibility', () => {
	test('about section should be accessible', async ({ page, makeAxeBuilder }) => {
		await page.goto('/');

		// Wait for about section to be visible
		await page.waitForSelector('[aria-label="Profil"]');

		// Best Practice: Test specific components with .include()
		// More focused and faster than full page scans
		const results = await makeAxeBuilder()
			.include('section') // Scan only sections
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test('skills section should be accessible', async ({ page, makeAxeBuilder }) => {
		await page.goto('/');

		// Wait for skills section to be visible
		await page.waitForSelector('[aria-label="Entwicklungsumgebung"]');

		// Test skills section specifically
		const results = await makeAxeBuilder().analyze();

		expect(results.violations).toEqual([]);
	});
});

test.describe('Interactive Components', () => {
	test('navigation and interactive elements should be accessible', async ({
		page,
		makeAxeBuilder,
	}) => {
		await page.goto('/');

		// Wait for page to be fully loaded (German page has "Switch to English" link)
		await page.waitForSelector('[aria-label="Zu Englisch wechseln"]');

		// Test all interactive elements
		const results = await makeAxeBuilder().analyze();
		expect(results.violations).toEqual([]);
	});
});

test.describe('Critical User Flows', () => {
	/**
	 * Best Practice: Test critical paths users take through the app
	 * These are higher priority than static page tests
	 */
	for (const flow of criticalFlows) {
		test(`${flow.name} should maintain accessibility`, async ({ page, makeAxeBuilder }) => {
			await page.goto(flow.url);

			if (flow.waitForSelectors) {
				for (const selector of flow.waitForSelectors) {
					await page.waitForSelector(selector);
				}
			}

			// Simulate user interaction
			if (flow.name.includes('Counter')) {
				const incrementBtn = page.locator('button[aria-label="Increment"]');

				// Test multiple interactions
				for (let i = 0; i < 3; i++) {
					await incrementBtn.click();
					await page.waitForTimeout(100); // Allow state update
				}
			}

			const results = await makeAxeBuilder().analyze();
			expect(results.violations).toEqual([]);
		});
	}
});

/**
 * Best Practice: Attach scan results for debugging
 * Source: Playwright documentation
 */
test.describe('Accessibility with Debug Info', () => {
	test('homepage with full scan results attached', async ({ page, makeAxeBuilder }, testInfo) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const results = await makeAxeBuilder().analyze();

		// Attach complete results for debugging
		// Useful when tests fail and you need full context
		await testInfo.attach('accessibility-scan-results', {
			body: JSON.stringify(results, null, 2),
			contentType: 'application/json',
		});

		expect(results.violations).toEqual([]);
	});
});

/**
 * Best Practice: Test WCAG compliance levels separately
 * Allows progressive enhancement: A → AA → AAA
 */
test.describe('WCAG Compliance Levels', () => {
	test('homepage meets WCAG 2.1 Level A', async ({ page, makeAxeBuilder }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const results = await makeAxeBuilder().withTags(['wcag2a', 'wcag21a']).analyze();

		expect(results.violations).toEqual([]);
	});

	test('homepage meets WCAG 2.1 Level AA', async ({ page, makeAxeBuilder }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const results = await makeAxeBuilder()
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test('homepage meets WCAG 2.2 Level AA', async ({ page, makeAxeBuilder }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const results = await makeAxeBuilder().withTags(['wcag22aa']).analyze();

		expect(results.violations).toEqual([]);
	});

	test('homepage follows best practices', async ({ page, makeAxeBuilder }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const results = await makeAxeBuilder().withTags(['best-practice']).analyze();

		expect(results.violations).toEqual([]);
	});
});
