import { getViteConfig } from 'astro/config';

// Use type assertion to bypass Astro's incomplete Vite config types
// Vitest test config is valid but not recognized by Astro's UserConfig type
export default getViteConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./tests/setup.ts'],
		include: [
			'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
			'tests/unit/**/*.{test,spec}.{js,ts,jsx,tsx}',
		],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
		},
	},
} as Parameters<typeof getViteConfig>[0]);
