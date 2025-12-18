/**
 * Commitlint Configuration
 * Enforces Conventional Commits specification
 * @see https://www.conventionalcommits.org/
 */

export default {
	extends: ['@commitlint/config-conventional'],

	// Custom rules
	rules: {
		// Type enum - allowed commit types
		'type-enum': [
			2,
			'always',
			[
				'feat', // New feature
				'fix', // Bug fix
				'docs', // Documentation changes
				'style', // Code style changes (formatting, etc.)
				'refactor', // Code refactoring
				'perf', // Performance improvements
				'test', // Adding or updating tests
				'build', // Build system changes
				'ci', // CI/CD changes
				'chore', // Other changes (tooling, etc.)
				'revert', // Revert previous commit
			],
		],

		// Subject case - allow sentence-case, start-case, pascal-case, upper-case
		'subject-case': [2, 'never', ['upper-case']],

		// Header max length
		'header-max-length': [2, 'always', 100],

		// Body max line length
		'body-max-line-length': [2, 'always', 120],

		// Footer max line length
		'footer-max-line-length': [2, 'always', 120],

		// Scope case
		'scope-case': [2, 'always', 'lower-case'],
	},

	// Help URL for conventional commits
	helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
};
