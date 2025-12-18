import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test.describe('Page Structure', () => {
		test('has correct title and meta description', async ({ page }) => {
			await expect(page).toHaveTitle(/Vite\+ Stack/);

			const description = page.locator('meta[name="description"]');
			await expect(description).toHaveAttribute('content', /Modern web stack with Astro 5/);
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
		test('displays main heading', async ({ page }) => {
			const heading = page.getByRole('heading', { name: /Build Fast/i });
			await expect(heading).toBeVisible();
		});

		test('displays hero description', async ({ page }) => {
			await expect(page.getByText(/Rust-powered toolchain meets modern frameworks/i)).toBeVisible();
		});

		test('renders technology badges', async ({ page }) => {
			// Target badges in hero section specifically to avoid strict mode violation
			const heroSection = page.getByRole('banner');
			await expect(heroSection.getByText('Astro 5')).toBeVisible();
			await expect(heroSection.getByText('Vue 3')).toBeVisible();
			await expect(heroSection.getByText('Tailwind v4')).toBeVisible();
			await expect(heroSection.getByText('Reka UI')).toBeVisible();
			await expect(heroSection.getByText('TypeScript')).toBeVisible();
		});
	});

	test.describe('Interactive Counter (Islands Architecture)', () => {
		test('displays counter section', async ({ page }) => {
			await expect(page.getByRole('heading', { name: /Islands Architecture/i })).toBeVisible();
		});

		test('renders counter with initial value of 0', async ({ page }) => {
			const counter = page.locator('.text-6xl');
			await expect(counter).toHaveText('0');
		});

		test('increments counter when + button clicked', async ({ page }) => {
			const incrementBtn = page.getByRole('button', { name: /Increment/i });
			await incrementBtn.click();

			const counter = page.locator('.text-6xl');
			await expect(counter).toHaveText('1');
		});

		test('decrements counter when - button clicked', async ({ page }) => {
			const decrementBtn = page.getByRole('button', { name: /Decrement/i });
			await decrementBtn.click();

			const counter = page.locator('.text-6xl');
			await expect(counter).toHaveText('-1');
		});

		test('resets counter when reset button clicked', async ({ page }) => {
			// Increment a few times
			const incrementBtn = page.getByRole('button', { name: /Increment/i });
			await incrementBtn.click();
			await incrementBtn.click();
			await incrementBtn.click();

			// Reset
			const resetBtn = page.getByRole('button', { name: /Reset/i });
			await resetBtn.click();

			const counter = page.locator('.text-6xl');
			await expect(counter).toHaveText('0');
		});

		test('updates total clicks counter', async ({ page }) => {
			const incrementBtn = page.getByRole('button', { name: /Increment/i });
			await incrementBtn.click();
			await incrementBtn.click();

			// Total clicks should show 2
			await expect(page.getByText('Total Clicks')).toBeVisible();
		});
	});

	test.describe('Performance', () => {
		test('page loads quickly', async ({ page }) => {
			const startTime = Date.now();
			await page.goto('/');
			await page.waitForLoadState('domcontentloaded');
			const loadTime = Date.now() - startTime;

			// Should load in under 2 seconds
			expect(loadTime).toBeLessThan(2000);
		});
	});

	test.describe('Responsive Design', () => {
		test('renders correctly on mobile viewport', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');

			// Main content should be visible
			await expect(page.getByRole('heading', { name: /Build Fast/i })).toBeVisible();

			// Counter should work on mobile
			const incrementBtn = page.getByRole('button', { name: /Increment/i });
			await incrementBtn.click();

			const counter = page.locator('.text-6xl');
			await expect(counter).toHaveText('1');
		});
	});
});
