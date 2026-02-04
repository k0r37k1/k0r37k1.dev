#!/usr/bin/env node
/**
 * Image Optimization Script
 * Converts PNG images to WebP/AVIF for better performance
 * Einsparung: ~70-80% Dateigröße (180 KB → 50-60 KB)
 */

import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs';

const IMAGES_DIR = 'public/images';
const QUALITY = {
	webp: 80,
	avif: 70,
};

async function optimizeImages() {
	console.log('🖼️  Starting image optimization...\n');

	// Find all PNG/JPG images
	const images = await glob(`${IMAGES_DIR}/**/*.{png,jpg,jpeg}`, {
		ignore: ['**/node_modules/**'],
	});

	if (images.length === 0) {
		console.log('No images found to optimize.');
		return;
	}

	console.log(`Found ${images.length} image(s) to optimize:\n`);

	const results = [];

	for (const imagePath of images) {
		const filename = path.basename(imagePath);
		const dir = path.dirname(imagePath);
		const ext = path.extname(imagePath);
		const nameWithoutExt = path.basename(imagePath, ext);

		console.log(`Processing: ${imagePath}`);

		try {
			// Get original size
			const originalSize = fs.statSync(imagePath).size;
			const originalMB = (originalSize / 1024).toFixed(2);

			// Load image with sharp
			const image = sharp(imagePath);
			const metadata = await image.metadata();

			// Generate WebP
			const webpPath = path.join(dir, `${nameWithoutExt}.webp`);
			await image.clone().webp({ quality: QUALITY.webp, effort: 6 }).toFile(webpPath);
			const webpSize = fs.statSync(webpPath).size;
			const webpMB = (webpSize / 1024).toFixed(2);
			const webpSavings = ((1 - webpSize / originalSize) * 100).toFixed(1);

			// Generate AVIF (smaller but slower to encode/decode)
			const avifPath = path.join(dir, `${nameWithoutExt}.avif`);
			await image.clone().avif({ quality: QUALITY.avif, effort: 4 }).toFile(avifPath);
			const avifSize = fs.statSync(avifPath).size;
			const avifMB = (avifSize / 1024).toFixed(2);
			const avifSavings = ((1 - avifSize / originalSize) * 100).toFixed(1);

			// Generate responsive sizes (400w, 800w, 1200w)
			const sizes = [400, 800, 1200];
			for (const size of sizes) {
				if (metadata.width && metadata.width > size) {
					const resizedPath = path.join(dir, `${nameWithoutExt}-${size}w.webp`);
					await sharp(imagePath)
						.resize(size, null, { withoutEnlargement: true })
						.webp({ quality: QUALITY.webp, effort: 6 })
						.toFile(resizedPath);
				}
			}

			results.push({
				original: imagePath,
				size: {
					original: originalSize,
					webp: webpSize,
					avif: avifSize,
				},
				savings: {
					webp: webpSavings,
					avif: avifSavings,
				},
				dimensions: `${metadata.width}x${metadata.height}`,
			});

			console.log(`  ✅ Original: ${originalMB} KB`);
			console.log(`  📦 WebP: ${webpMB} KB (-${webpSavings}%)`);
			console.log(`  📦 AVIF: ${avifMB} KB (-${avifSavings}%)`);
			console.log(`  📐 Dimensions: ${metadata.width}x${metadata.height}\n`);
		} catch (error) {
			console.error(`  ❌ Error processing ${imagePath}:`, error.message);
			console.log('');
		}
	}

	// Summary
	console.log('\n🎉 Image optimization complete!\n');
	console.log('Summary:');
	console.log('────────────────────────────────────────');

	const totalOriginal = results.reduce((sum, r) => sum + r.size.original, 0);
	const totalWebp = results.reduce((sum, r) => sum + r.size.webp, 0);
	const totalAvif = results.reduce((sum, r) => sum + r.size.avif, 0);
	const totalWebpSavings = ((1 - totalWebp / totalOriginal) * 100).toFixed(1);
	const totalAvifSavings = ((1 - totalAvif / totalOriginal) * 100).toFixed(1);

	console.log(`Total Original Size: ${(totalOriginal / 1024).toFixed(2)} KB`);
	console.log(`Total WebP Size: ${(totalWebp / 1024).toFixed(2)} KB (-${totalWebpSavings}%)`);
	console.log(`Total AVIF Size: ${(totalAvif / 1024).toFixed(2)} KB (-${totalAvifSavings}%)`);
	console.log('');
	console.log('Next steps:');
	console.log('1. Update image references in i18n files (.png → .webp)');
	console.log('2. Add width/height attributes to <img> tags');
	console.log('3. Consider using <picture> for AVIF fallback');
	console.log('4. Keep original PNG for fallback');
}

optimizeImages().catch(console.error);
