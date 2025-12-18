import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Astro Project
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
	testDir: './tests/e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	// Workers: 4 in CI (via env var), 2 locally for reduced CPU load
	workers: process.env.PLAYWRIGHT_WORKERS
		? parseInt(process.env.PLAYWRIGHT_WORKERS, 10)
		: process.env.CI
			? 1
			: 2,
	reporter: 'html',
	use: {
		baseURL: 'http://localhost:4321',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
		video: 'retain-on-failure',
		// Run headless for better performance
		headless: true,
	},

	// Timeout configuration
	timeout: 30 * 1000,
	expect: {
		timeout: 5000,
	},

	projects: [
		// Default: Only Chromium for fast local tests
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				// Disable some features for performance
				launchOptions: {
					args: [
						'--disable-dev-shm-usage',
						'--disable-blink-features=AutomationControlled',
						'--disable-background-timer-throttling',
						'--disable-backgrounding-occluded-windows',
						'--disable-renderer-backgrounding',
					],
				},
			},
		},
		// Other browsers: Only run in CI or when explicitly requested
		// Use: npx playwright test --project=firefox
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
		// Mobile viewports: CI only
		{
			name: 'Mobile Chrome',
			use: { ...devices['Pixel 5'] },
		},
		{
			name: 'Mobile Safari',
			use: { ...devices['iPhone 12'] },
		},
	],

	// Run dev server before tests
	webServer: {
		command: 'npm run dev',
		url: 'http://localhost:4321',
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000,
	},
});
