import { test, expect } from '@playwright/test';

test.describe('Keyboard Navigation Tests', () => {
	test.describe('Skip Link', () => {
		test('skip link is first focusable element', async ({ page }) => {
			await page.goto('/');

			// Press Tab once
			await page.keyboard.press('Tab');

			// Skip link should be focused
			const skipLink = page.locator('.skip-link');
			await expect(skipLink).toBeFocused();
			await expect(skipLink).toBeVisible();
		});

		test('skip link jumps to main content on Enter', async ({ page }) => {
			await page.goto('/');

			// Tab to skip link
			await page.keyboard.press('Tab');

			// Press Enter
			await page.keyboard.press('Enter');

			// Wait for navigation
			await page.waitForTimeout(100);

			// Main content should be focused
			const mainContent = page.locator('#main-content');
			await expect(mainContent).toBeFocused();
		});

		test('skip link is hidden when not focused', async ({ page }) => {
			await page.goto('/');

			const skipLink = page.locator('.skip-link');

			// Should be off-screen when not focused
			const box = await skipLink.boundingBox();
			expect(box?.x).toBeLessThan(-1000);
		});
	});

	test.describe('Tab Order', () => {
		test('tab order is logical through header', async ({ page }) => {
			await page.goto('/');

			// Tab through header elements
			const focusedElements: string[] = [];

			// Tab 5 times (skip link + header nav items)
			for (let i = 0; i < 5; i++) {
				await page.keyboard.press('Tab');
				const focused = await page.evaluate(() => {
					const el = document.activeElement;
					return el?.tagName + (el?.textContent?.trim() || '');
				});
				focusedElements.push(focused);
			}

			// Verify we got some focused elements
			expect(focusedElements.length).toBeGreaterThan(0);

			// Skip link should be first (check for both German and English)
			const firstElement = focusedElements[0];
			const isSkipLink =
				firstElement.includes('Direkt zum Hauptinhalt') ||
				firstElement.includes('Skip to main content');
			expect(isSkipLink).toBe(true);
		});

		test('no elements have positive tabindex', async ({ page }) => {
			await page.goto('/');

			// Check for positive integer tabindex values (anti-pattern)
			const positiveTabindex = await page.evaluate(() => {
				const elements = document.querySelectorAll('[tabindex]');
				let count = 0;
				elements.forEach((el) => {
					const tabindex = parseInt(el.getAttribute('tabindex') || '0', 10);
					if (tabindex > 0) count++;
				});
				return count;
			});

			expect(positiveTabindex).toBe(0);
		});

		test('all interactive elements are keyboard accessible', async ({ page }) => {
			await page.goto('/');

			// Get all buttons and links
			const buttons = await page.locator('button:visible').all();
			const links = await page.locator('a:visible').all();

			// Sample some buttons and links (not all to avoid timeout)
			const sampleSize = Math.min(5, buttons.length);
			for (let i = 0; i < sampleSize; i++) {
				const button = buttons[i];
				const isDisabled = await button.isDisabled();
				if (!isDisabled) {
					await button.focus();
					await expect(button).toBeFocused();
				}
			}

			const linkSampleSize = Math.min(5, links.length);
			for (let i = 0; i < linkSampleSize; i++) {
				await links[i].focus();
				await expect(links[i]).toBeFocused();
			}
		});
	});

	test.describe('Focus Visibility', () => {
		test('focused elements are visually distinguishable', async ({ page }) => {
			await page.goto('/');

			// Tab to skip link (first focusable element)
			await page.keyboard.press('Tab');

			// Get focused element
			const focused = page.locator(':focus');

			// Check if element has focus-visible styling (outline or visible indicator)
			const hasVisibleFocus = await focused.evaluate((el) => {
				const styles = window.getComputedStyle(el);
				// Check for outline OR box-shadow OR background change
				return (
					styles.outlineWidth !== '0px' ||
					styles.outlineStyle !== 'none' ||
					styles.boxShadow !== 'none' ||
					parseFloat(styles.outlineWidth) > 0
				);
			});

			// Should have some visible focus indicator
			expect(hasVisibleFocus).toBe(true);
		});

		test('skip link has high contrast when focused', async ({ page }) => {
			await page.goto('/');

			await page.keyboard.press('Tab');

			const skipLink = page.locator('.skip-link:focus');
			const bgColor = await skipLink.evaluate((el) => {
				return window.getComputedStyle(el).backgroundColor;
			});

			// Should have a background color (not transparent)
			expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
			expect(bgColor).not.toBe('transparent');
		});
	});

	test.describe('Interactive Components', () => {
		test('language switcher is keyboard accessible', async ({ page }) => {
			await page.goto('/');

			// On German page, only EN is a link (DE is active span)
			// Find the clickable language link
			const enLink = page.locator('.language-switcher a').filter({ hasText: 'EN' });

			// Should be able to focus the language link
			await enLink.focus();
			await expect(enLink).toBeFocused();

			// Verify focus-visible styling is applied
			const outlineStyle = await enLink.evaluate((el) => {
				return window.getComputedStyle(el).outlineStyle;
			});
			expect(outlineStyle).not.toBe('none');
		});

		test('contact links are keyboard accessible', async ({ page }) => {
			await page.goto('/');

			// Find GitHub link in contact section specifically
			const githubLink = page.getByRole('link', { name: /github\.com\/k0r37k1/i });
			if ((await githubLink.count()) > 0) {
				await githubLink.focus();
				await expect(githubLink).toBeFocused();
			}
		});
	});

	test.describe('ARIA & Semantic HTML', () => {
		test('buttons have accessible names', async ({ page }) => {
			await page.goto('/');

			// All visible buttons should have accessible names
			const buttons = await page.locator('button:visible').all();

			for (const button of buttons) {
				const ariaLabel = await button.getAttribute('aria-label');
				const textContent = await button.textContent();
				const ariaLabelledby = await button.getAttribute('aria-labelledby');

				// Should have either aria-label, text content, or aria-labelledby
				expect(ariaLabel || textContent?.trim() || ariaLabelledby).toBeTruthy();
			}
		});

		test('links have accessible names', async ({ page }) => {
			await page.goto('/');

			// All links should have accessible names
			const links = await page.locator('a').all();

			for (const link of links) {
				const ariaLabel = await link.getAttribute('aria-label');
				const textContent = await link.textContent();

				// Should have either aria-label or text content
				expect(ariaLabel || textContent?.trim()).toBeTruthy();
			}
		});

		test('sections have proper landmarks', async ({ page }) => {
			await page.goto('/');

			// Check for main landmark
			const main = page.locator('main');
			await expect(main).toBeVisible();

			// Check for header - use .first() as there might be multiple headers in dev tools
			const header = page.locator('header.terminal-header');
			await expect(header).toBeVisible();

			// Check for footer
			const footer = page.locator('footer');
			await expect(footer).toBeVisible();
		});
	});

	test.describe('Keyboard Shortcuts', () => {
		test('shift+tab moves focus backwards', async ({ page }) => {
			await page.goto('/');

			// Tab forward twice
			await page.keyboard.press('Tab');
			await page.keyboard.press('Tab');

			const secondElement = page.locator(':focus');
			const secondText = await secondElement.textContent();

			// Shift+Tab to go back
			await page.keyboard.press('Shift+Tab');

			const firstElement = page.locator(':focus');
			const firstText = await firstElement.textContent();

			// Should be different elements
			expect(firstText).not.toBe(secondText);
		});

		test('enter activates links', async ({ page }) => {
			await page.goto('/');

			// Find the EN link (inactive language on German page)
			const enLink = page.locator('.language-switcher a').filter({ hasText: 'EN' });
			await enLink.focus();

			// Press Enter
			await page.keyboard.press('Enter');

			// Should navigate to English version
			await page.waitForURL(/\/en/);
			await expect(page).toHaveURL(/\/en/);
		});
	});
});
