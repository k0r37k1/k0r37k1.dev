import { test, expect } from '@playwright/test';

test.describe('Blog', () => {
	test.describe('German Blog Index', () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/blog');
		});

		test('has correct title and meta description', async ({ page }) => {
			await expect(page).toHaveTitle(/Blog.*k0r37k1\.dev/);

			const description = page.locator('meta[name="description"]');
			await expect(description).toHaveAttribute('content', /.+/);
		});

		test('loads without console errors', async ({ page }) => {
			const errors: string[] = [];
			page.on('console', (msg) => {
				if (msg.type() === 'error') {
					errors.push(msg.text());
				}
			});

			await page.waitForLoadState('networkidle');
			expect(errors).toEqual([]);
		});

		test('displays blog section title', async ({ page }) => {
			await expect(page.locator('.section-title-center').getByText(/BLOG/i).first()).toBeVisible();
		});

		test('displays empty state when no posts', async ({ page }) => {
			// Check for either posts list or empty state message
			const hasPosts = await page.locator('.blog-list').count();
			const hasNoPosts = await page.locator('.no-posts').count();

			// Should have either posts or empty state
			expect(hasPosts + hasNoPosts).toBeGreaterThan(0);
		});

		test('has language switcher', async ({ page }) => {
			const languageSwitcher = page.locator('.language-switcher');
			await expect(languageSwitcher).toBeVisible();
		});

		test('can switch to English blog', async ({ page }) => {
			const enLink = page.locator('.language-switcher a').filter({ hasText: 'EN' });
			await enLink.click();

			await page.waitForURL(/\/en\/blog/);
			await expect(page).toHaveURL(/\/en\/blog/);
		});
	});

	test.describe('English Blog Index', () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/en/blog');
		});

		test('has correct title and meta description', async ({ page }) => {
			await expect(page).toHaveTitle(/Blog.*k0r37k1\.dev/);

			const description = page.locator('meta[name="description"]');
			await expect(description).toHaveAttribute('content', /.+/);
		});

		test('loads without console errors', async ({ page }) => {
			const errors: string[] = [];
			page.on('console', (msg) => {
				if (msg.type() === 'error') {
					errors.push(msg.text());
				}
			});

			await page.waitForLoadState('networkidle');
			expect(errors).toEqual([]);
		});

		test('displays blog section title', async ({ page }) => {
			await expect(page.locator('.section-title-center').getByText(/BLOG/i).first()).toBeVisible();
		});

		test('displays empty state when no posts', async ({ page }) => {
			const hasPosts = await page.locator('.blog-list').count();
			const hasNoPosts = await page.locator('.no-posts').count();

			expect(hasPosts + hasNoPosts).toBeGreaterThan(0);
		});

		test('can switch to German blog', async ({ page }) => {
			const deLink = page.locator('.language-switcher a').filter({ hasText: 'DE' });
			await deLink.click();

			await page.waitForURL(/^(?!.*\/en).*\/blog/);
			await expect(page).toHaveURL(/\/blog/);
			await expect(page).not.toHaveURL(/\/en\/blog/);
		});
	});

	test.describe('Blog Navigation', () => {
		test('footer contains blog link on homepage', async ({ page }) => {
			await page.goto('/');

			const footerBlogLink = page.locator('footer').getByRole('link', { name: /blog/i });
			await expect(footerBlogLink).toBeVisible();
		});

		test('can navigate from homepage to blog', async ({ page }) => {
			await page.goto('/');

			const footerBlogLink = page.locator('footer').getByRole('link', { name: /blog/i });
			await footerBlogLink.click();

			await page.waitForURL(/\/blog/);
			await expect(page).toHaveURL(/\/blog/);
		});
	});

	test.describe('Blog Responsive Design', () => {
		test('renders correctly on mobile viewport', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/blog');

			await expect(page.locator('.blog-container')).toBeVisible();
		});

		test('renders correctly on tablet viewport', async ({ page }) => {
			await page.setViewportSize({ width: 768, height: 1024 });
			await page.goto('/blog');

			await expect(page.locator('.blog-container')).toBeVisible();
		});
	});

	test.describe('Blog Performance', () => {
		test('page loads quickly', async ({ page }) => {
			const startTime = Date.now();
			await page.goto('/blog');
			await page.waitForLoadState('domcontentloaded');
			const loadTime = Date.now() - startTime;

			// Should load in under 3 seconds
			expect(loadTime).toBeLessThan(3000);
		});
	});
});
