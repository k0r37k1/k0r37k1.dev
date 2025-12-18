import figlet from 'figlet';

/**
 * Generate ASCII art from text using Figlet.js
 * @param text - The text to convert to ASCII art
 * @param font - The Figlet font to use (default: 'Colossal')
 * @param maxWidth - Maximum width in characters (default: 80)
 * @returns ASCII art string
 */
export function generateAsciiArt(
	text: string,
	font: figlet.Fonts = 'Colossal',
	maxWidth = 80
): string {
	try {
		return figlet.textSync(text, {
			font,
			horizontalLayout: 'full',
			verticalLayout: 'default',
			width: maxWidth,
			whitespaceBreak: false,
		});
	} catch (error) {
		console.error('Failed to generate ASCII art:', error);
		return text; // Fallback to plain text
	}
}

/**
 * Generate responsive ASCII art based on viewport width
 * @param text - The text to convert
 * @param isMobile - Whether the viewport is mobile
 * @returns ASCII art optimized for the viewport
 */
export function generateResponsiveAscii(text: string, isMobile: boolean): string {
	const font = isMobile ? 'Small' : 'Colossal';
	const maxWidth = isMobile ? 40 : 80;
	return generateAsciiArt(text, font, maxWidth);
}

/**
 * Trim trailing whitespace from ASCII art and align all lines
 * @param ascii - The ASCII art string
 * @returns Trimmed and aligned ASCII art
 */
export function trimAsciiArt(ascii: string): string {
	const lines = ascii.split('\n').filter((l) => l.trim().length > 0);
	const maxLength = Math.max(...lines.map((l) => l.length));

	// Pad all lines to the same length to prevent visual shifting
	const paddedLines = lines.map((line) => line.padEnd(maxLength, ' '));

	return paddedLines.join('\n');
}

/**
 * Create ASCII art box around text
 * @param text - The text to wrap in a box
 * @param padding - Inner padding (default: 1)
 * @returns Text wrapped in an ASCII box
 */
export function createAsciiBox(text: string, padding = 1): string {
	const lines = text.split('\n');
	const maxLength = Math.max(...lines.map((l) => l.length));
	const width = maxLength + padding * 2;

	const top = '╔' + '═'.repeat(width) + '╗';
	const bottom = '╚' + '═'.repeat(width) + '╝';
	const emptyLine = '║' + ' '.repeat(width) + '║';

	const paddedLines = lines.map((line) => {
		const padded = line.padEnd(maxLength, ' ');
		const leftPad = ' '.repeat(padding);
		const rightPad = ' '.repeat(width - maxLength - padding);
		return `║${leftPad}${padded}${rightPad}║`;
	});

	const result = [top];
	for (let i = 0; i < padding; i++) result.push(emptyLine);
	result.push(...paddedLines);
	for (let i = 0; i < padding; i++) result.push(emptyLine);
	result.push(bottom);

	return result.join('\n');
}

/**
 * Create a horizontal ASCII divider
 * @param width - Width of the divider (default: 60)
 * @param char - Character to use (default: '─')
 * @returns ASCII divider string
 */
export function createDivider(width = 60, char = '─'): string {
	return char.repeat(width);
}

/**
 * Create a simple ASCII header
 * @param text - Header text
 * @returns Formatted header with decorations
 */
export function createHeader(text: string): string {
	const divider = createDivider(text.length + 4, '═');
	return `╔${divider}╗\n║  ${text}  ║\n╚${divider}╝`;
}

/**
 * Available Figlet fonts for different use cases
 */
export const FIGLET_FONTS = {
	hero: 'Colossal' as figlet.Fonts,
	heroMobile: 'Small' as figlet.Fonts,
	standard: 'Standard' as figlet.Fonts,
	big: 'Big' as figlet.Fonts,
	slant: 'Slant' as figlet.Fonts,
	small: 'Small' as figlet.Fonts,
} as const;
