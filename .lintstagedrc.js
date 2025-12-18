/**
 * Lint-staged Configuration
 * Runs linters and formatters on staged files before commit
 * @see https://github.com/lint-staged/lint-staged
 */

export default {
	// TypeScript & JavaScript files
	'*.{js,ts,jsx,tsx}': [
		'oxlint --fix', // Fast Rust-based linter
		'prettier --write', // Format with Prettier
	],

	// Vue files
	'*.vue': [
		'oxlint --fix', // Lint Vue files
		'prettier --write', // Format Vue files
	],

	// Astro files
	'*.astro': [
		'prettier --write', // Format Astro files
		'stylelint --fix', // Lint styles in Astro files
	],

	// CSS files
	'*.{css,scss,sass}': [
		'stylelint --fix', // Fix CSS issues
		'prettier --write', // Format CSS
	],

	// Markdown files
	'*.md': [
		'markdownlint-cli2 --fix', // Fix Markdown issues
		'prettier --write', // Format Markdown
	],

	// JSON files
	'*.{json,jsonc}': ['prettier --write'], // Format JSON

	// Spell check removed from pre-commit hook to not block commits
	// Run manually with: npm run spell
};
