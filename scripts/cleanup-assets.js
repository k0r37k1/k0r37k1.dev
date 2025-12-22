#!/usr/bin/env node
/**
 * Intelligent cleanup of orphaned asset files after Astro build
 *
 * Strategy:
 * 1. CSS: Delete files not referenced in any HTML
 * 2. JS: Delete server-side chunks (imports from "astro/server")
 * 3. JS: Keep all client-side chunks (referenced in HTML or imported by them)
 */

import { readdir, readFile, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { glob } from 'glob';

const DIST_DIR = 'dist';
const CSS_DIR = join(DIST_DIR, '_astro');
const JS_DIR = join(DIST_DIR, '_astro');

/**
 * Find all CSS files referenced in HTML
 */
async function findReferencedCSS() {
	const htmlFiles = await glob(`${DIST_DIR}/**/*.html`);
	const referencedCSS = new Set();

	for (const htmlFile of htmlFiles) {
		const content = await readFile(htmlFile, 'utf-8');
		const cssMatches = content.matchAll(/href="\/_astro\/([^"]+\.css)"/g);
		for (const match of cssMatches) {
			referencedCSS.add(match[1]);
		}
	}

	return referencedCSS;
}

/**
 * Check if a JS file is a server-side chunk
 */
async function isServerChunk(filePath) {
	try {
		const content = await readFile(filePath, 'utf-8');
		// Server chunks import from astro/server
		return content.includes('astro/server');
	} catch {
		return false;
	}
}

/**
 * Find all JS files referenced in HTML (client chunks)
 */
async function findReferencedJS() {
	const htmlFiles = await glob(`${DIST_DIR}/**/*.html`);
	const referencedJS = new Set();

	for (const htmlFile of htmlFiles) {
		const content = await readFile(htmlFile, 'utf-8');
		// Match src, component-url, renderer-url attributes
		const jsMatches = content.matchAll(
			/(?:src|component-url|renderer-url)="\/_astro\/([^"]+\.js)"/g
		);
		for (const match of jsMatches) {
			referencedJS.add(match[1]);
		}
	}

	return referencedJS;
}

/**
 * Find all JS files imported by referenced JS files (recursive)
 */
async function findImportedJS(referencedFiles) {
	const allReferenced = new Set(referencedFiles);
	const toProcess = [...referencedFiles];
	const processed = new Set();

	while (toProcess.length > 0) {
		const fileName = toProcess.pop();
		if (processed.has(fileName)) continue;
		processed.add(fileName);

		try {
			const filePath = join(JS_DIR, fileName);
			const content = await readFile(filePath, 'utf-8');

			// Find all relative imports: from "./foo.js" or from"./foo.js"
			const importMatches = content.matchAll(/from\s*["']\.\/([^"']+\.js)["']/g);
			for (const match of importMatches) {
				const importedFile = match[1];
				if (!allReferenced.has(importedFile)) {
					allReferenced.add(importedFile);
					toProcess.push(importedFile);
				}
			}
		} catch {
			// File might not exist or be readable, skip
		}
	}

	return allReferenced;
}

async function cleanup() {
	try {
		let totalDeleted = 0;

		// 1. Cleanup CSS files not referenced in HTML
		console.log('\n🔍 Analyzing _astro CSS files...');
		try {
			const referencedCSS = await findReferencedCSS();
			const cssFiles = await readdir(CSS_DIR);
			const allCSS = cssFiles.filter((file) => file.endsWith('.css'));

			for (const css of allCSS) {
				if (!referencedCSS.has(css)) {
					await unlink(join(CSS_DIR, css));
					console.log(`🗑️  Deleted unreferenced CSS: ${css}`);
					totalDeleted++;
				}
			}
		} catch (err) {
			// CSS dir might not exist
		}

		// 2. Cleanup JS files
		console.log('\n🔍 Analyzing _astro JS files...');
		try {
			// Find all client-side JS (referenced in HTML)
			const directlyReferenced = await findReferencedJS();
			console.log(`   Found ${directlyReferenced.size} directly referenced JS files`);

			// Find all imports recursively
			const allClientJS = await findImportedJS(directlyReferenced);
			console.log(`   Found ${allClientJS.size} total client-side JS files (including imports)`);

			// Check all JS files
			const jsFiles = await readdir(JS_DIR);
			const allJS = jsFiles.filter((file) => file.endsWith('.js'));

			for (const js of allJS) {
				const filePath = join(JS_DIR, js);

				// Skip if it's a referenced client chunk
				if (allClientJS.has(js)) {
					continue;
				}

				// Delete orphaned chunks (both server and client)
				const isServer = await isServerChunk(filePath);
				await unlink(filePath);
				console.log(`🗑️  Deleted ${isServer ? 'server-side' : 'orphaned client'} chunk: ${js}`);
				totalDeleted++;
			}
		} catch (err) {
			console.error('❌ JS cleanup failed:', err.message);
		}

		if (totalDeleted === 0) {
			console.log('\n✅ No orphaned asset files found');
		} else {
			console.log(`\n✅ Cleaned up ${totalDeleted} orphaned asset file(s)`);
		}
	} catch (err) {
		console.error('❌ Asset cleanup failed:', err.message);
		process.exit(1);
	}
}

cleanup();
