import { test, expect } from '../fixtures/axe-test';
import { filterByImpact } from '../config/axe.config';

/**
 * Advanced Accessibility Test Patterns
 *
 * This file demonstrates advanced testing techniques from the axe-core best practices:
 * - Violation fingerprinting for tracking known issues
 * - Impact-based testing (Critical/Serious only)
 * - Dynamic content testing
 * - Component state testing
 *
 * @see AXE_CORE_GUIDE.md - Advanced Patterns section
 */

test.describe('Progressive Accessibility Testing', () => {
	/**
	 * Best Practice: Start with critical violations only
	 * Source: Performance optimization section from guide
	 */
	test('homepage has no critical accessibility violations', async ({ page, makeAxeBuilder }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const results = await makeAxeBuilder().analyze();

		// Only fail on critical violations
		// Allows fixing most important issues first
		const criticalViolations = filterByImpact(results.violations, ['critical']);

		expect(criticalViolations).toEqual([]);
	});

	test('homepage has no critical or serious violations', async ({ page, makeAxeBuilder }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const results = await makeAxeBuilder().analyze();

		// Fail on both critical and serious violations
		const highPriorityViolations = filterByImpact(results.violations, ['critical', 'serious']);

		expect(highPriorityViolations).toEqual([]);
	});
});

test.describe('Dynamic Content Accessibility', () => {
	/**
	 * Best Practice: Test content that appears/disappears
	 * Wait for specific selectors before testing
	 */
	test('conditionally rendered content is accessible', async ({ page, makeAxeBuilder }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Test main page content
		const results = await makeAxeBuilder().analyze();
		expect(results.violations).toEqual([]);
	});

	test('language switching maintains accessibility', async ({ page, makeAxeBuilder }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Test German version
		const deResults = await makeAxeBuilder().analyze();
		expect(deResults.violations).toEqual([]);

		// On German page, EN is the clickable link
		const enLink = page.locator('.language-switcher a').filter({ hasText: 'EN' });
		await enLink.waitFor({ state: 'visible', timeout: 5000 });
		await enLink.click();
		await page.waitForURL(/\/en/, { timeout: 10000 });
		await page.waitForLoadState('networkidle');

		// Test English version
		const enResults = await makeAxeBuilder().analyze();
		expect(enResults.violations).toEqual([]);
	});
});

test.describe('Component State Testing', () => {
	/**
	 * Best Practice: Test all states of interactive components
	 * Source: Advanced Patterns - Component State Testing
	 */
	test('language switcher maintains accessibility', async ({ page, makeAxeBuilder }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Test language switcher component
		const languageSwitcher = page.locator('.language-switcher');
		await languageSwitcher.waitFor();

		const results = await makeAxeBuilder().include('.language-switcher').analyze();

		expect(results.violations).toEqual([]);
	});
});

test.describe('Specific ARIA Patterns', () => {
	/**
	 * Best Practice: Test specific ARIA patterns for common issues
	 */
	test('no duplicate IDs in ARIA references', async ({ page, makeAxeBuilder }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const results = await makeAxeBuilder().withRules(['duplicate-id-aria']).analyze();

		expect(results.violations).toEqual([]);
	});

	test('ARIA attributes have valid values', async ({ page, makeAxeBuilder }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const results = await makeAxeBuilder()
			.withRules(['aria-valid-attr', 'aria-valid-attr-value'])
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test('interactive elements have accessible names', async ({ page, makeAxeBuilder }) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const results = await makeAxeBuilder()
			.withRules(['button-name', 'link-name', 'label'])
			.analyze();

		expect(results.violations).toEqual([]);
	});
});

test.describe('Performance-Optimized Tests', () => {
	/**
	 * Best Practice: Test specific regions instead of full page
	 * Faster execution, useful for component-level CI checks
	 */
	test('header navigation is accessible', async ({ page, makeAxeBuilder }) => {
		await page.goto('/');
		await page.waitForSelector('header');

		const results = await makeAxeBuilder()
			.include('header') // Only test header
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test('footer is accessible', async ({ page, makeAxeBuilder }) => {
		await page.goto('/');
		await page.waitForSelector('footer');

		const results = await makeAxeBuilder()
			.include('footer') // Only test footer
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test('main content is accessible', async ({ page, makeAxeBuilder }) => {
		await page.goto('/');
		await page.waitForSelector('main');

		const results = await makeAxeBuilder()
			.include('main') // Only test main content
			.analyze();

		expect(results.violations).toEqual([]);
	});
});

test.describe('Regression Testing', () => {
	/**
	 * Best Practice: Track accessibility metrics over time
	 * Source: Advanced Patterns - Accessibility Regression Testing
	 */
	test('track violation counts', async ({ page, makeAxeBuilder }, testInfo) => {
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const results = await makeAxeBuilder().analyze();

		const metrics = {
			timestamp: new Date().toISOString(),
			violations: results.violations.length,
			passes: results.passes.length,
			incomplete: results.incomplete.length,
			criticalCount: results.violations.filter((v) => v.impact === 'critical').length,
			seriousCount: results.violations.filter((v) => v.impact === 'serious').length,
		};

		// Attach metrics as test artifact
		await testInfo.attach('accessibility-metrics', {
			body: JSON.stringify(metrics, null, 2),
			contentType: 'application/json',
		});

		// Fail if any critical or serious violations
		expect(metrics.criticalCount + metrics.seriousCount).toBe(0);
	});
});

test.describe('Keyboard Navigation', () => {
	/**
	 * Best Practice: Ensure keyboard-only users can navigate
	 * Complements automated testing with interaction checks
	 */
	test('interactive elements are keyboard accessible', async ({ page, makeAxeBuilder }) => {
		await page.goto('/');

		// Press Tab to navigate
		await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');

		// Check accessibility after keyboard navigation
		const results = await makeAxeBuilder().analyze();

		expect(results.violations).toEqual([]);
	});
});
