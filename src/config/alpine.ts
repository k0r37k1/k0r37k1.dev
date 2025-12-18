/**
 * Alpine.js Entrypoint
 * Loads plugins for Alpine.js
 * Used as FALLBACK for problematic Vue/Reka UI Components
 */

import type { Alpine } from 'alpinejs';
import anchor from '@alpinejs/anchor';
import collapse from '@alpinejs/collapse';
import focus from '@alpinejs/focus';
import intersect from '@alpinejs/intersect';

export default (Alpine: Alpine) => {
	// Positioning - Floating UI Wrapper (CRITICAL for Tooltips)
	Alpine.plugin(anchor);

	// UI Components (ACTIVELY USED)
	Alpine.plugin(collapse); // Accordion/Collapsible Animations
	Alpine.plugin(focus); // Modal Focus Trap & Keyboard Navigation

	// Utilities (RECOMMENDED)
	Alpine.plugin(intersect); // Scroll Animations & Lazy Loading
};
