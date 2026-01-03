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
		<motion.button
			v-if="isVisible"
			key="go-to-top"
			:initial="{ opacity: 0, scale: 0.8 }"
			:animate="{ opacity: 1, scale: 1 }"
			:exit="{ opacity: 0, scale: 0.8 }"
			:whileHover="{ y: -4 }"
			:whileTap="{ scale: 0.98 }"
			:transition="{ type: 'spring', stiffness: 400, damping: 17 }"
			@click="scrollToTop"
			@mouseenter="handleMouseEnter"
			@mouseleave="handleMouseLeave"
			class="go-to-top"
			:aria-label="t.aria.actions.scrollToTop"
		>
			<div class="ascii-frame">
				<span class="frame-line">┌─────┐</span>
				<span class="frame-line">│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│</span>
				<span class="arrow-line">│&nbsp;&nbsp;<span class="arrow">↑</span>&nbsp;&nbsp;│</span>
				<span class="frame-line">│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│</span>
				<span class="frame-line">└─────┘</span>
			</div>
		</motion.button>
	</AnimatePresence>
</template>

<style scoped>
.go-to-top {
	position: fixed;
	bottom: 2rem;
	right: 2rem;
	background: transparent;
	color: var(--color-terminal-primary);
	border: none;
	cursor: pointer;
	z-index: 9999;
	font-family: 'Courier New', Consolas, monospace;
	font-size: 0.875rem;
	line-height: 1;
	padding: 0;
	transition: all 0.2s ease;
	animation: crt-flicker 3s steps(1) infinite;
	will-change: opacity, transform;
}

@media (hover: hover) {
	.go-to-top:hover {
		color: #00ff9f;
	}
}

.go-to-top:focus-visible {
	outline: 3px solid var(--color-accent-orange);
	outline-offset: 2px;
}

.ascii-frame {
	display: flex;
	flex-direction: column;
	gap: 0;
	text-align: left;
	letter-spacing: 0;
	font-variant-ligatures: none;
	font-feature-settings:
		'liga' 0,
		'calt' 0;
	line-height: 1;
}

.frame-line,
.arrow-line {
	display: block;
	white-space: pre;
	font-family: 'Courier New', Consolas, monospace;
	font-variant-numeric: tabular-nums;
	line-height: 1;
	letter-spacing: 0;
}

.arrow {
	font-size: 0.875rem;
	font-weight: 900;
	color: var(--color-terminal-primary);
	display: inline-block;
	vertical-align: middle;
	line-height: 1;
	transform: scale(1.8);
	transform-origin: center center;
	transition: all 0.3s ease;
	will-change: transform;
}

@media (hover: hover) {
	.go-to-top:hover .arrow {
		color: #00ff9f;
		transform: scale(2) translateY(-2px);
	}
}

/* Mobile adjustments */
@media (width <= 640px) {
	.go-to-top {
		bottom: 1.5rem;
		right: 1.5rem;
		font-size: 0.75rem;
	}

	.content {
		font-size: 1rem;
	}
}
</style>
