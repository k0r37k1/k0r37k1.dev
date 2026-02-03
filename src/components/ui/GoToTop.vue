<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { motion, AnimatePresence } from 'motion-v';
import { Icon } from '@iconify/vue';
import { getTranslations, type Language } from '@/i18n';

interface Props {
	lang?: Language;
}

const props = withDefaults(defineProps<Props>(), {
	lang: 'de',
});

const t = computed(() => getTranslations(props.lang));

const isVisible = ref(false);
const isHovering = ref(false);
let scrollContainer: HTMLElement | null = null;
let hideTimeout: ReturnType<typeof setTimeout> | null = null;

const checkScroll = () => {
	if (!scrollContainer) return;

	// Clear existing timeout
	if (hideTimeout) {
		clearTimeout(hideTimeout);
	}

	// Show button after scrolling down 300px
	if (scrollContainer.scrollTop > 300) {
		isVisible.value = true;

		// Only start hide timer if not hovering
		if (!isHovering.value) {
			hideTimeout = setTimeout(() => {
				isVisible.value = false;
			}, 3000);
		}
	} else {
		isVisible.value = false;
	}
};

const scrollToTop = () => {
	if (!scrollContainer) return;
	scrollContainer.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
};

const handleMouseEnter = () => {
	isHovering.value = true;
	// Cancel hide timeout when hovering
	if (hideTimeout) {
		clearTimeout(hideTimeout);
	}
};

const handleMouseLeave = () => {
	isHovering.value = false;
	// Restart hide timer when leaving hover
	if (isVisible.value && scrollContainer && scrollContainer.scrollTop > 300) {
		hideTimeout = setTimeout(() => {
			isVisible.value = false;
		}, 3000);
	}
};

onMounted(() => {
	// Find the scrollable container
	scrollContainer = document.querySelector('.terminal-content');

	if (scrollContainer) {
		// Initial check
		checkScroll();
		scrollContainer.addEventListener('scroll', checkScroll);
	}
});

onUnmounted(() => {
	if (scrollContainer) {
		scrollContainer.removeEventListener('scroll', checkScroll);
	}
	if (hideTimeout) {
		clearTimeout(hideTimeout);
	}
});
</script>

<template>
	<AnimatePresence>
		<!-- NO opacity in initial - prevents invisible button if animation fails -->
		<motion.button
			v-if="isVisible"
			key="go-to-top"
			:initial="{ scale: 0.8, y: 10 }"
			:animate="{ scale: 1, y: 0 }"
			:exit="{ scale: 0.8, y: 10 }"
			:whileHover="{ y: -4 }"
			:whileTap="{ scale: 0.98 }"
			:transition="{ type: 'spring', stiffness: 400, damping: 17 }"
			@click="scrollToTop"
			@mouseenter="handleMouseEnter"
			@mouseleave="handleMouseLeave"
			class="motion go-to-top"
			:aria-label="t.aria.actions.scrollToTop"
		>
			<span class="arrow">▲</span>
		</motion.button>
	</AnimatePresence>
</template>

<style scoped>
.go-to-top {
	position: fixed;
	bottom: 2rem;
	right: 2rem;
	display: grid;
	place-items: center;
	width: 2.75rem;
	height: 2.75rem;
	background: color-mix(in oklch, var(--color-terminal-primary) 70%, transparent);
	color: var(--color-terminal-bg, #0a0a0a);
	border: none;
	cursor: pointer;
	z-index: 9999;
	padding: 0;
	transition: background 0.2s ease;
	animation: crt-flicker 3s steps(1) infinite;
	will-change: opacity, transform;
}

@media (hover: hover) {
	.go-to-top:hover {
		background: #00ff9f;
	}
}

.go-to-top:focus-visible {
	outline: 3px solid var(--color-accent-orange);
	outline-offset: 2px;
}

.arrow {
	font-size: 1.125rem;
	font-weight: 900;
	line-height: 1;
	font-family: 'Courier New', Consolas, monospace;
}

@media (width <= 640px) {
	.go-to-top {
		bottom: 1.5rem;
		right: 1.5rem;
		width: 2.5rem;
		height: 2.5rem;
	}
}
</style>
