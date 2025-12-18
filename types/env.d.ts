/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Alpine.js TypeScript Support
interface Window {
	Alpine: import('alpinejs').Alpine;
}
