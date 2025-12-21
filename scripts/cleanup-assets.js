#!/usr/bin/env node
/**
 * Cleanup orphaned asset files after Astro build
 *
 * Problem: Astro/Vite generates assets (CSS/JS) through multiple paths, creating
 * orphaned files that are reported in build output but never referenced in HTML.
 *
 * This script:
 * 1. Scans all HTML files for CSS and JS references
 * 2. Finds all CSS/JS files in dist/assets
 * 3. Deletes files that aren't referenced by any HTML
 */

import { readdir, readFile, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { glob } from 'glob';

const DIST_DIR = 'dist';
const CSS_DIR = join(DIST_DIR, 'assets', 'css');
const JS_DIR = join(DIST_DIR, 'assets', 'js');

async function findReferencedAssets() {
	// Find all HTML files
	const htmlFiles = await glob(`${DIST_DIR}/**/*.html`);

	const referencedCSS = new Set();
	const referencedJS = new Set();

	// Scan each HTML file for CSS and JS references
	for (const htmlFile of htmlFiles) {
		const content = await readFile(htmlFile, 'utf-8');

		// Find CSS references: href="/assets/css/foo.css"
		const cssMatches = content.matchAll(/href="\/assets\/css\/([^"]+\.css)"/g);
		for (const match of cssMatches) {
			referencedCSS.add(match[1]);
		}

		// Find JS references in multiple formats:
		// 1. <script src="/assets/js/foo.js">
		// 2. component-url="/assets/js/foo.js" (Astro islands)
		const jsMatches = content.matchAll(
			/(?:src|component-url|renderer-url)="\/assets\/js\/([^"]+\.js)"/g
		);
		for (const match of jsMatches) {
			referencedJS.add(match[1]);
		}
	}

	return { css: referencedCSS, js: referencedJS };
}

async function cleanup() {
	try {
		// Find which assets are actually referenced
		const { css: referencedCSS, js: referencedJS } = await findReferencedAssets();

		let totalDeleted = 0;

		// Cleanup CSS files
		try {
			const cssFiles = await readdir(CSS_DIR);
			const allCSS = cssFiles.filter((file) => file.endsWith('.css'));

			for (const css of allCSS) {
				if (!referencedCSS.has(css)) {
					await unlink(join(CSS_DIR, css));
					console.log(`🗑️  Deleted orphaned CSS: ${css}`);
					totalDeleted++;
				}
			}
		} catch (err) {
			// CSS dir might not exist, skip
		}

		// Cleanup JS files
		try {
			const jsFiles = await readdir(JS_DIR);
			const allJS = jsFiles.filter((file) => file.endsWith('.js'));

			for (const js of allJS) {
				if (!referencedJS.has(js)) {
					await unlink(join(JS_DIR, js));
					console.log(`🗑️  Deleted orphaned JS: ${js}`);
					totalDeleted++;
				}
			}
		} catch (err) {
			// JS dir might not exist, skip
		}

		if (totalDeleted === 0) {
			console.log('✅ No orphaned asset files found');
		} else {
			console.log(`✅ Cleaned up ${totalDeleted} orphaned asset file(s)`);
		}
	} catch (err) {
		console.error('❌ Asset cleanup failed:', err.message);
		process.exit(1);
	}
}

cleanup();
