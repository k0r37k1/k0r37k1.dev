<script setup lang="ts">
import { motion } from 'motion-v';
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { getTranslations, type Language } from '@/i18n';
import { useReducedMotion, getMotionConfig } from '@/composables/useReducedMotion';

interface Props {
	lang?: Language;
}

const props = withDefaults(defineProps<Props>(), {
	lang: 'de',
});

const t = getTranslations(props.lang);
const { prefersReducedMotion } = useReducedMotion();
const motionConfig = computed(() => getMotionConfig(prefersReducedMotion.value));

const contacts = [
	{
		label: 'Email',
		value: 'hello@k0r37k1.dev',
		link: 'mailto:hello@k0r37k1.dev',
		icon: 'mdi:email-outline',
	},
	{
		label: 'GitHub',
		value: 'github.com/k0r37k1',
		link: 'https://github.com/k0r37k1',
		icon: 'simple-icons:github',
	},
	{
		label: 'X',
		value: '@k0r37k1',
		link: 'https://x.com/k0r37k1',
		icon: 'simple-icons:x',
	},
	{
		label: 'Buy Me a Coffee',
		value: 'buymeacoffee.com/k0r37k1',
		link: 'https://buymeacoffee.com/k0r37k1',
		icon: 'simple-icons:buymeacoffee',
	},
];
</script>

<template>
	<motion.section v-bind="motionConfig" class="terminal-section contact-section">
		<!-- Contact Content -->
		<div class="nfo-content">
			<!-- Section Label -->
			<h2 class="nfo-label">[ {{ t.contact.title.toUpperCase() }} ]</h2>

			<!-- Intro Message -->
			<p class="intro-message">
				{{ t.contact.description }}
			</p>

			<!-- Contact Links -->
			<div class="contact-list">
				<motion.div
					v-for="contact in contacts"
					:key="contact.label"
					:whileHover="{ x: 4 }"
					class="contact-item"
				>
					<a
						:href="contact.link"
						target="_blank"
						rel="noopener noreferrer"
						class="terminal-link contact-link"
					>
						<Icon :icon="contact.icon" class="contact-icon" aria-hidden="true" />
						<span>{{ contact.value }}</span>
					</a>
				</motion.div>
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

.nfo-label {
	color: var(--color-accent-orange);
	font-family: 'VT323', monospace;
	font-weight: 400;
	font-size: 1.25rem;
	letter-spacing: 0.05em;
	margin: 0 0 1rem;
	text-shadow: 0 0 8px rgb(255 102 0 / 40%);

	/* VT323 bitmap font optimization - disable smoothing for sharp pixels */
	-webkit-font-smoothing: none;
	-moz-osx-font-smoothing: unset;
	text-rendering: optimizeSpeed;
}

.intro-message {
	color: var(--color-terminal-text-dim);
	line-height: 1.6;
	margin: 0 0 1.5rem;
	font-size: 0.875rem;
}

.contact-list {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.contact-item {
	display: flex;
	gap: 0.75rem;
	align-items: baseline;
}

.contact-label {
	color: var(--color-terminal-warning);
	font-weight: 600;
	font-size: 0.875rem;
	min-width: 90px;
}

.contact-link {
	font-size: 0.875rem;
	transition: all 0.2s ease;
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	transform: translateZ(0);
	backface-visibility: hidden;
	filter: blur(0);
	text-shadow: none; /* No glow effect */
}

@media (hover: hover) {
	.contact-link:hover {
		transform: translateZ(0);
		text-shadow: none; /* No glow effect */
	}

	.contact-link:hover .contact-icon {
		transform: scale(1.1) translateZ(0);
	}
}

.contact-icon {
	font-size: 1.125rem;
	transition: transform 0.2s ease;
	transform: translateZ(0);
	backface-visibility: hidden;
	filter: blur(0);
	will-change: transform;
}

@media (width <= 640px) {
	.nfo-label {
		font-size: 0.95rem; /* Sub-label size for VT323 */
	}

	.intro-message {
		font-size: 0.825rem; /* Compact content text size */
	}

	.contact-item {
		flex-direction: column;
		gap: 0.25rem;
	}

	.contact-label {
		min-width: auto;
		font-size: 0.95rem; /* Sub-label size for VT323 */
	}

	.contact-link {
		font-size: 0.825rem; /* Compact content text size */
	}
}
</style>
