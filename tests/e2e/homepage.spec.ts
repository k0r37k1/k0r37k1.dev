import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test.describe('Page Structure', () => {
		test('has correct title and meta description', async ({ page }) => {
			await expect(page).toHaveTitle(/Portfolio k0r37k1\.dev/);

			const description = page.locator('meta[name="description"]');
			await expect(description).toHaveAttribute('content', /Project showcase of k0r37k1\.dev/);
		});

		test('loads without console errors', async ({ page }) => {
			const errors: string[] = [];
			page.on('console', (msg) => {
				if (msg.type() === 'error') {
					errors.push(msg.text());
				}
			});

			await page.waitForLoadState('networkidle');

			// Should have no console errors
			expect(errors).toEqual([]);
		});
	});

	test.describe('Hero Section', () => {
		test('displays hero welcome message', async ({ page }) => {
			// Wait for TypeWriter animation to complete
			await page.waitForTimeout(2000);
			await expect(
				page.getByText(/Willkommen zu meinem Portfolio, wo Ideen Realität werden/i)
			).toBeVisible();
		});

		test('displays hero subtitle', async ({ page }) => {
			// Use the full subtitle text which is unique to the hero section
			await expect(
				page.locator('.tagline').getByText(/Vibe Engineer • KI-Enthusiast/i)
			).toBeVisible();
		});

		test('displays ASCII art name', async ({ page }) => {
			// Check for ASCII art (it contains k0r37k1)
			const asciiArt = page.locator('.ascii-art');
			await expect(asciiArt).toBeVisible();
		});
	});

	test.describe('Portfolio Sections', () => {
		test('displays profile section', async ({ page }) => {
			await expect(
				page
					.locator('.section-title-center')
					.getByText(/PROFIL/i)
					.first()
			).toBeVisible();
		});

		test('displays projects section', async ({ page }) => {
			await expect(
				page
					.locator('.section-title-center')
					.getByText(/PROJEKTE/i)
					.first()
			).toBeVisible();
		});

		test('displays skills section', async ({ page }) => {
			await expect(
				page
					.locator('.section-title-center')
					.getByText(/ENTWICKLUNGSUMGEBUNG/i)
					.first()
			).toBeVisible();
		});

		test('displays contact section', async ({ page }) => {
			await expect(
				page
					.locator('.section-title-center')
					.getByText(/KONTAKT/i)
					.first()
			).toBeVisible();
		});
	});

	test.describe('Contact Links', () => {
		test('displays GitHub link', async ({ page }) => {
			// Multiple GitHub links exist (projects + contact), use more specific selector
			const githubLink = page.getByRole('link', { name: /github\.com\/k0r37k1/i });
			await expect(githubLink).toBeVisible();
			await expect(githubLink).toHaveAttribute('href', /github\.com/);
		});

		test('displays email link', async ({ page }) => {
			// Email link shows the actual email address
			const emailLink = page.getByRole('link', { name: /hello@k0r37k1\.dev/i });
			await expect(emailLink).toBeVisible();
		});
	});

	test.describe('Performance', () => {
		test('page loads quickly', async ({ page }) => {
			const startTime = Date.now();
			await page.goto('/');
			await page.waitForLoadState('domcontentloaded');
			const loadTime = Date.now() - startTime;

			// Should load in under 3 seconds (increased for CI/CD)
			expect(loadTime).toBeLessThan(3000);
		});
	});

	test.describe('Responsive Design', () => {
		test('renders correctly on mobile viewport', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');

			// Main content should be visible - use more specific selector
			await expect(page.getByRole('heading', { name: /k0r37k1\.dev.*Portfolio/i })).toBeVisible();
			await expect(
				page.locator('.tagline').getByText(/Vibe Engineer • KI-Enthusiast/i)
			).toBeVisible();
		});

		test('renders correctly on tablet viewport', async ({ page }) => {
			await page.setViewportSize({ width: 768, height: 1024 });
			await page.goto('/');

			// All sections should be visible
			await expect(
				page
					.locator('.section-title-center')
					.getByText(/PROFIL/i)
					.first()
			).toBeVisible();
			await expect(
				page
					.locator('.section-title-center')
					.getByText(/PROJEKTE/i)
					.first()
			).toBeVisible();
		});
	});

	test.describe('Language Switcher', () => {
		test('displays language switcher', async ({ page }) => {
			// Language switcher shows active language as span, inactive as link
			// On German page: DE is active (visible but not in link), EN is link with brackets
			const languageSwitcher = page.locator('.language-switcher');
			await expect(languageSwitcher).toBeVisible();

			// Check that EN link is visible (inactive language shows as link with brackets)
			await expect(languageSwitcher.getByRole('link', { name: /EN/i })).toBeVisible();

			// Active language (DE) is shown as plain text, verify switcher contains language content
			await expect(languageSwitcher).toBeVisible();
		});

		test('switches to English version', async ({ page }) => {
			// On German page, EN is the clickable link (with brackets)
			const enLink = page.locator('.language-switcher a').filter({ hasText: 'EN' });
			await enLink.click();

			await page.waitForURL(/\/en/);
			await expect(page).toHaveURL(/\/en/);
		});
	});
});
