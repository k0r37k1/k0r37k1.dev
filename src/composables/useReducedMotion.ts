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
		initial: { opacity: 0, y: 20, scale: 0.98 },
		whileInView: { opacity: 1, y: 0, scale: 1 },
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 20,
		},
		viewport: { once: true, margin: '-100px' },
	};
}
