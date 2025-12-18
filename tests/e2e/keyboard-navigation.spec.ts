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

			// Skip link should be first
			expect(focusedElements[0]).toContain('Skip to main content');
		});

		test('no elements have positive tabindex', async ({ page }) => {
			await page.goto('/');

			// Check for positive integer tabindex values (anti-pattern)
			// tabindex="0" is fine (normal tab order), tabindex="-1" is fine (programmatic focus)
			// tabindex="1", "2", etc. are the problem (override natural tab order)
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

			// Each should be focusable (not disabled)
			for (const button of buttons) {
				const isDisabled = await button.isDisabled();
				if (!isDisabled) {
					// Should be able to focus
					await button.focus();
					await expect(button).toBeFocused();
				}
			}

			for (const link of links) {
				await link.focus();
				await expect(link).toBeFocused();
			}
		});
	});

	test.describe('Focus Visibility', () => {
		test('focused elements are visually distinguishable', async ({ page }) => {
			await page.goto('/');

			// Tab to first button
			await page.keyboard.press('Tab');
			await page.keyboard.press('Tab');

			// Get focused element
			const focused = page.locator(':focus');

			// Should have visible outline or ring
			const outlineWidth = await focused.evaluate((el) => {
				const styles = window.getComputedStyle(el);
				return styles.outlineWidth;
			});

			// Should have some outline (not '0px')
			expect(outlineWidth).not.toBe('0px');
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
		test('counter buttons are keyboard accessible', async ({ page }) => {
			await page.goto('/');

			// Find increment button
			const incrementBtn = page.locator('button[aria-label="Increment"]');
			await incrementBtn.focus();
			await expect(incrementBtn).toBeFocused();

			// Press Enter to increment
			await page.keyboard.press('Enter');

			// Counter should increment
			const counter = page.locator('.text-6xl');
			await expect(counter).toHaveText('1');

			// Space should also work
			await incrementBtn.focus();
			await page.keyboard.press('Space');
			await expect(counter).toHaveText('2');
		});

		test('decrement button works with keyboard', async ({ page }) => {
			await page.goto('/');

			// Increment first
			const incrementBtn = page.locator('button[aria-label="Increment"]');
			await incrementBtn.click();

			// Focus and activate decrement
			const decrementBtn = page.locator('button[aria-label="Decrement"]');
			await decrementBtn.focus();
			await page.keyboard.press('Enter');

			// Counter should decrement
			const counter = page.locator('.text-6xl');
			await expect(counter).toHaveText('0');
		});
	});

	test.describe('Form Controls', () => {
		test('form inputs are keyboard accessible', async ({ page }) => {
			await page.goto('/demo');

			// Wait for input to be visible
			await page.waitForSelector('input[type="text"]', { state: 'visible' });

			// Tab to first input
			const input = page.locator('input[type="text"]').first();
			await input.focus();
			await expect(input).toBeFocused();

			// Type into input
			await page.keyboard.type('Test input');
			await expect(input).toHaveValue('Test input');
		});

		test('checkbox is keyboard accessible', async ({ page }) => {
			await page.goto('/demo');

			// Check if any visible checkboxes exist (exclude Astro dev toolbar)
			const checkboxCount = await page
				.locator('input[type="checkbox"]:not([name="dev-toolbar-toggle"])')
				.count();

			// Skip test if no checkboxes found
			test.skip(checkboxCount === 0, 'No checkboxes found on demo page');

			const checkbox = page
				.locator('input[type="checkbox"]:not([name="dev-toolbar-toggle"])')
				.first();
			await checkbox.scrollIntoViewIfNeeded();
			await checkbox.focus();
			await expect(checkbox).toBeFocused();

			// Get initial state
			const initialChecked = await checkbox.isChecked();

			// Space should toggle checkbox
			await page.keyboard.press('Space');

			// Should be toggled
			const newChecked = await checkbox.isChecked();
			expect(newChecked).toBe(!initialChecked);
		});
	});

	test.describe('Modal/Dialog', () => {
		test('modal can be opened with keyboard', async ({ page }) => {
			await page.goto('/demo');

			// Find modal trigger button
			const modalTrigger = page.locator('button:has-text("Open Modal")').first();

			if ((await modalTrigger.count()) > 0) {
				await modalTrigger.focus();
				await page.keyboard.press('Enter');

				// Modal should be visible
				await expect(page.locator('[role="dialog"]')).toBeVisible();
			}
		});

		test('escape key closes modal', async ({ page }) => {
			await page.goto('/demo');

			const modalTrigger = page.locator('button:has-text("Open Modal")').first();

			if ((await modalTrigger.count()) > 0) {
				// Open modal
				await modalTrigger.click();
				await expect(page.locator('[role="dialog"]')).toBeVisible();

				// Press Escape
				await page.keyboard.press('Escape');

				// Modal should close
				await expect(page.locator('[role="dialog"]')).toBeHidden();
			}
		});

		test('focus is trapped inside modal', async ({ page }) => {
			await page.goto('/demo');

			const modalTrigger = page.locator('button:has-text("Open Modal")').first();

			if ((await modalTrigger.count()) > 0) {
				// Open modal
				await modalTrigger.click();
				await expect(page.locator('[role="dialog"]')).toBeVisible();

				// Tab through modal elements
				const focusableElements = await page.locator('[role="dialog"] button').count();

				// Tab multiple times (more than focusable elements)
				for (let i = 0; i < focusableElements + 3; i++) {
					await page.keyboard.press('Tab');

					// Focus should still be inside modal
					const focusedElement = page.locator(':focus');
					const isInsideModal = await focusedElement.evaluate((el) => {
						return !!el.closest('[role="dialog"]');
					});

					expect(isInsideModal).toBe(true);
				}
			}
		});
	});

	test.describe('ARIA & Semantic HTML', () => {
		test('buttons have accessible names', async ({ page }) => {
			await page.goto('/');

			const buttons = await page.locator('button:visible').all();

			for (const button of buttons) {
				const accessibleName = await button.evaluate((el) => {
					return el.getAttribute('aria-label') || el.textContent?.trim() || '';
				});

				// Every button should have some accessible name
				expect(accessibleName.length).toBeGreaterThan(0);
			}
		});

		test('links have accessible names', async ({ page }) => {
			await page.goto('/');

			const links = await page.locator('a:visible').all();

			for (const link of links) {
				const accessibleName = await link.evaluate((el) => {
					return (
						el.getAttribute('aria-label') ||
						el.textContent?.trim() ||
						el.querySelector('img')?.getAttribute('alt') ||
						''
					);
				});

				// Every link should have some accessible name
				expect(accessibleName.length).toBeGreaterThan(0);
			}
		});

		test('form inputs have labels', async ({ page }) => {
			await page.goto('/demo');

			// Get visible inputs, excluding Astro dev toolbar and search inputs
			const inputs = await page
				.locator('input:visible:not([name="dev-toolbar-toggle"]):not([type="search"])')
				.all();

			for (const input of inputs) {
				const hasLabel = await input.evaluate((el) => {
					const id = el.id;
					const ariaLabel = el.getAttribute('aria-label');
					const ariaLabelledBy = el.getAttribute('aria-labelledby');

					// Check if has aria-label, aria-labelledby, or associated label
					if (ariaLabel || ariaLabelledBy) return true;

					// Check for label with for attribute
					if (id) {
						const label = document.querySelector(`label[for="${id}"]`);
						if (label) return true;
					}

					// Check if wrapped in label
					return !!el.closest('label');
				});

				expect(hasLabel).toBe(true);
			}
		});
	});

	test.describe('Keyboard Shortcuts', () => {
		test('shift+tab moves focus backwards', async ({ page }) => {
			await page.goto('/');

			// Tab forward twice
			await page.keyboard.press('Tab');
			const firstFocus = await page.evaluate(() => document.activeElement?.textContent);

			await page.keyboard.press('Tab');
			const secondFocus = await page.evaluate(() => document.activeElement?.textContent);

			// Shift+Tab should go back
			await page.keyboard.press('Shift+Tab');
			const backFocus = await page.evaluate(() => document.activeElement?.textContent);

			expect(backFocus).toBe(firstFocus);
		});

		test('enter activates buttons', async ({ page }) => {
			await page.goto('/');

			const incrementBtn = page.locator('button[aria-label="Increment"]');
			await incrementBtn.focus();

			// Enter should activate
			await page.keyboard.press('Enter');

			const counter = page.locator('.text-6xl');
			await expect(counter).toHaveText('1');
		});

		test('space activates buttons', async ({ page }) => {
			await page.goto('/');

			const incrementBtn = page.locator('button[aria-label="Increment"]');
			await incrementBtn.focus();

			// Space should activate
			await page.keyboard.press('Space');

			const counter = page.locator('.text-6xl');
			await expect(counter).toHaveText('1');
		});
	});
});
