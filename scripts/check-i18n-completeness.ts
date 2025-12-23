/**
 * Check i18n translation completeness
 * Verifies that both DE and EN translations have the same structure
 */
import de from '../src/i18n/de';
import en from '../src/i18n/en';

interface ComparisonResult {
	missingInEN: string[];
	missingInDE: string[];
	typeMismatches: string[];
	arrayLengthMismatches: string[];
}

function compareObjects(
	obj1: any,
	obj2: any,
	path: string = '',
	result: ComparisonResult,
	sourceName: string = 'DE',
	targetName: string = 'EN'
): void {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	// Check for missing keys in target
	for (const key of keys1) {
		const currentPath = path ? `${path}.${key}` : key;

		if (!(key in obj2)) {
			if (sourceName === 'DE') {
				result.missingInEN.push(currentPath);
			} else {
				result.missingInDE.push(currentPath);
			}
			continue;
		}

		const val1 = obj1[key];
		const val2 = obj2[key];

		// Check type mismatch
		if (typeof val1 !== typeof val2) {
			result.typeMismatches.push(
				`${currentPath}: ${sourceName}=${typeof val1}, ${targetName}=${typeof val2}`
			);
			continue;
		}

		// Check array length mismatch
		if (Array.isArray(val1) && Array.isArray(val2)) {
			if (val1.length !== val2.length) {
				result.arrayLengthMismatches.push(
					`${currentPath}: ${sourceName}=${val1.length}, ${targetName}=${val2.length}`
				);
			}
			// Check each array element if it's an object
			for (let i = 0; i < Math.min(val1.length, val2.length); i++) {
				if (typeof val1[i] === 'object' && val1[i] !== null) {
					compareObjects(val1[i], val2[i], `${currentPath}[${i}]`, result, sourceName, targetName);
				}
			}
			continue;
		}

		// Recursively compare nested objects
		if (typeof val1 === 'object' && val1 !== null && !Array.isArray(val1)) {
			compareObjects(val1, val2, currentPath, result, sourceName, targetName);
		}
	}

	// Check for extra keys in target
	for (const key of keys2) {
		const currentPath = path ? `${path}.${key}` : key;
		if (!(key in obj1)) {
			if (sourceName === 'DE') {
				result.missingInDE.push(currentPath);
			} else {
				result.missingInEN.push(currentPath);
			}
		}
	}
}

function main() {
	console.log('🔍 Checking i18n translation completeness...\n');

	const result: ComparisonResult = {
		missingInEN: [],
		missingInDE: [],
		typeMismatches: [],
		arrayLengthMismatches: [],
	};

	// Compare DE → EN
	compareObjects(de, en, '', result, 'DE', 'EN');

	// Print results
	let hasIssues = false;

	if (result.missingInEN.length > 0) {
		hasIssues = true;
		console.log('❌ Missing in EN (present in DE):');
		result.missingInEN.forEach((key) => console.log(`   - ${key}`));
		console.log('');
	}

	if (result.missingInDE.length > 0) {
		hasIssues = true;
		console.log('❌ Missing in DE (present in EN):');
		result.missingInDE.forEach((key) => console.log(`   - ${key}`));
		console.log('');
	}

	if (result.typeMismatches.length > 0) {
		hasIssues = true;
		console.log('❌ Type mismatches:');
		result.typeMismatches.forEach((msg) => console.log(`   - ${msg}`));
		console.log('');
	}

	if (result.arrayLengthMismatches.length > 0) {
		hasIssues = true;
		console.log('⚠️  Array length mismatches:');
		result.arrayLengthMismatches.forEach((msg) => console.log(`   - ${msg}`));
		console.log('');
	}

	if (!hasIssues) {
		console.log('✅ All translations are complete and structurally identical!');
		console.log('');
		console.log('📊 Statistics:');
		console.log(`   - Total translation keys: ${countKeys(de)}`);
		console.log(`   - DE projects: ${de.projects.items.length}`);
		console.log(`   - EN projects: ${en.projects.items.length}`);
		console.log(`   - DE cookie sections: ${de.cookieConsent.preferencesModal.sections.length}`);
		console.log(`   - EN cookie sections: ${en.cookieConsent.preferencesModal.sections.length}`);
	} else {
		console.log('❌ Translation check failed!');
		process.exit(1);
	}
}

function countKeys(obj: any, count = 0): number {
	for (const key in obj) {
		if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
			count = countKeys(obj[key], count);
		} else {
			count++;
		}
	}
	return count;
}

main();
