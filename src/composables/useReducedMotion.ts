import { ref, onMounted } from 'vue';

/**
 * Composable to detect and respect user's prefers-reduced-motion setting
 * @returns {Ref<boolean>} prefersReducedMotion - true if user prefers reduced motion
 */
export function useReducedMotion() {
	const prefersReducedMotion = ref(false);

	onMounted(() => {
		// Check if user prefers reduced motion
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		prefersReducedMotion.value = mediaQuery.matches;

		// Listen for changes
		const handleChange = (e: MediaQueryListEvent) => {
			prefersReducedMotion.value = e.matches;
		};

		mediaQuery.addEventListener('change', handleChange);

		// Cleanup
		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	});

	return { prefersReducedMotion };
}

/**
 * Get motion-safe animation config
 * Returns empty animations if user prefers reduced motion
 *
 * IMPORTANT: We do NOT set opacity: 0 in initial state!
 * Reason: motion-v sets inline styles which cannot be overridden by CSS.
 * If whileInView fails to trigger (SSR hydration timing, JS errors, etc.),
 * content would remain invisible. This is a known issue with motion libraries.
 *
 * Best Practice: Only animate transform properties (y, scale), not opacity.
 * Content stays visible even if animations fail = progressive enhancement.
 *
 * @see https://motion.dev/docs/react-motion-component (SSR section)
 */
export function getMotionConfig(reducedMotion: boolean) {
	if (reducedMotion) {
		return {
			initial: {},
			whileInView: {},
			transition: { duration: 0.01 },
			viewport: { once: true },
		};
	}

	return {
		// NO opacity in initial - content must always be visible!
		// Transform-only animations are safe fallbacks
		initial: { y: 20, scale: 0.98 },
		whileInView: { y: 0, scale: 1 },
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 20,
		},
		viewport: { once: true, margin: '-100px' },
	};
}
