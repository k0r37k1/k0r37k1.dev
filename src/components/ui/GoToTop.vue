<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { motion } from 'motion-v';
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
	<Transition name="fade">
		<motion.button
			v-if="isVisible"
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
				<span class="top-border">┌───┐</span>
				<span class="content">│ ↑ │</span>
				<span class="bottom-border">└───┘</span>
			</div>
		</motion.button>
	</Transition>
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
	font-family: var(--font-mono);
	font-size: 0.875rem;
	line-height: 1;
	padding: 0;
	transition: all 0.2s ease;
	/* Subtle cyan phosphor glow */
	text-shadow:
		0 0 3px rgb(0 217 255 / 30%),
		0 0 6px rgb(0 217 255 / 18%);
}

.go-to-top:hover {
	color: var(--color-accent-orange);
	text-shadow: 0 0 10px rgb(255 102 0 / 50%);
}

.ascii-frame {
	display: flex;
	flex-direction: column;
	gap: 0;
	text-align: left;
	letter-spacing: 0;
	font-variant-ligatures: none;
	font-feature-settings: 'liga' 0;
	white-space: pre;
}

.top-border,
.content,
.bottom-border,
.spacer {
	display: block;
	white-space: pre;
	font-family: 'IBM Plex Mono', 'Courier New', monospace;
}

.content {
	font-weight: 600;
}

/* Vue Transition */
.fade-enter-active,
.fade-leave-active {
	transition:
		opacity 0.3s ease,
		transform 0.3s ease;
}

.fade-enter-from {
	opacity: 0;
	transform: scale(0.8);
}

.fade-leave-to {
	opacity: 0;
	transform: scale(0.8);
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
