#!/usr/bin/env node
/**
 * Cleanup orphaned CSS files after Astro build
 *
 * Problem: Astro/Vite generates CSS through multiple paths, creating orphaned files
 * that are reported in build output but never referenced in HTML.
 *
 * This script:
 * 1. Scans all HTML files for CSS references
 * 2. Finds all CSS files in dist/assets
 * 3. Deletes CSS files that aren't referenced by any HTML
 */

import { readdir, readFile, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { glob } from 'glob';

const DIST_DIR = 'dist';
const CSS_DIR = join(DIST_DIR, 'assets', 'css');

async function findReferencedCSS() {
	// Find all HTML files
	const htmlFiles = await glob(`${DIST_DIR}/**/*.html`);

	const referenced = new Set();

	// Scan each HTML file for CSS references
	for (const htmlFile of htmlFiles) {
		const content = await readFile(htmlFile, 'utf-8');
		const cssMatches = content.matchAll(/href="([^"]*\.css)"/g);

		for (const match of cssMatches) {
			// Convert /assets/css/foo.css -> foo.css
			const cssPath = match[1].replace(/^\/assets\/css\//, '');
			referenced.add(cssPath);
		}
	}

	return referenced;
}

async function cleanup() {
	try {
		// Get all CSS files in assets/css
		const cssFiles = await readdir(CSS_DIR);
		const allCSS = cssFiles.filter((file) => file.endsWith('.css'));

		// Find which CSS files are actually referenced
		const referenced = await findReferencedCSS();

		// Delete orphaned files
		let deletedCount = 0;
		for (const css of allCSS) {
			if (!referenced.has(css)) {
				await unlink(join(CSS_DIR, css));
				console.log(`🗑️  Deleted orphaned: ${css}`);
				deletedCount++;
			}
		}

		if (deletedCount === 0) {
			console.log('✅ No orphaned CSS files found');
		} else {
			console.log(`✅ Cleaned up ${deletedCount} orphaned CSS file(s)`);
		}
	} catch (err) {
		console.error('❌ CSS cleanup failed:', err.message);
		process.exit(1);
	}
}

cleanup();
