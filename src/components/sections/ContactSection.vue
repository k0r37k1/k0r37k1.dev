<script setup lang="ts">
import { motion } from 'motion-v';
import { Icon } from '@iconify/vue';
import { getTranslations, type Language } from '@/i18n';

interface Props {
	lang?: Language;
}

const props = withDefaults(defineProps<Props>(), {
	lang: 'de',
});

const t = getTranslations(props.lang);

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
		class="terminal-section contact-section"
	>
		<!-- Contact Content -->
		<div class="nfo-content">
			<!-- Intro Message -->
			<p class="intro-message">
				{{ t.contact.description }}
			</p>

			<!-- Contact Links -->
			<div class="contact-list">
				<div v-for="contact in contacts" :key="contact.label" class="contact-item">
					<a
						:href="contact.link"
						target="_blank"
						rel="noopener noreferrer"
						class="terminal-link contact-link"
					>
						<Icon :icon="contact.icon" class="contact-icon" />
						<span>{{ contact.value }}</span>
					</a>
				</div>
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
	transition: transform 0.2s ease;
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
}

.contact-icon {
	font-size: 1.125rem;
}

@media (width <= 640px) {
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
