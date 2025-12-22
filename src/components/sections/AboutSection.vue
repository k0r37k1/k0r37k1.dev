<script setup lang="ts">
import { motion } from 'motion-v';
import { getTranslations, type Language } from '@/i18n';

interface Props {
	lang?: Language;
}

const props = withDefaults(defineProps<Props>(), {
	lang: 'de',
});

const t = getTranslations(props.lang);
</script>

<template>
	<motion.section
		:initial="{ opacity: 0, y: 20, scale: 0.98 }"
		:whileInView="{ opacity: 1, y: 0, scale: 1 }"
		:transition="{
			type: 'spring',
			stiffness: 200,
			damping: 20,
			duration: 0.4,
		}"
		:viewport="{ once: true, margin: '-100px' }"
		class="terminal-section about-section"
	>
		<div class="nfo-content">
			<!-- Bio Section -->
			<div class="nfo-section">
				<h2 class="nfo-label">{{ t.about.who.label }}</h2>
				<p class="nfo-text">
					{{ t.about.who.text }}
				</p>
			</div>

			<!-- What I Do -->
			<div class="nfo-section">
				<h2 class="nfo-label">{{ t.about.what.label }}</h2>
				<p class="nfo-text">
					{{ t.about.what.text }}
				</p>
			</div>

			<!-- Current Focus -->
			<div class="nfo-section">
				<h2 class="nfo-label">{{ t.about.now.label }}</h2>
				<p class="nfo-text">
					{{ t.about.now.text }}
				</p>
			</div>
		</div>
	</motion.section>
</template>

<style scoped>
.nfo-content {
	font-family: var(--font-mono);
	color: var(--color-terminal-text);
	line-height: 1.6;
}

.nfo-section {
	margin-bottom: 1.5rem;
}

.nfo-section:last-of-type {
	margin-bottom: 0;
}

.nfo-label {
	color: var(--color-accent-orange);
	font-family: 'VT323', monospace;
	font-weight: 400;
	font-size: 1.25rem;
	letter-spacing: 0.05em;
	margin-bottom: 0.5rem;
	text-shadow: 0 0 8px rgb(255 102 0 / 40%);
}

.nfo-text {
	color: var(--color-terminal-text-dim);
	font-size: 0.875rem;
	margin: 0;
	padding-left: 1rem;
	border-left: 2px solid var(--color-terminal-border);
}

@media (width <= 640px) {
	.nfo-label {
		font-size: 0.95rem; /* Sub-label size for VT323 */
	}

	.nfo-text {
		font-size: 0.825rem; /* Compact content text size */
		padding-left: 0.5rem;
	}
}
</style>
