import { getViteConfig } from 'astro/config';

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
});
