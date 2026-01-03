<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { getTranslations, type Language } from '@/i18n';
import { computed } from 'vue';

interface Props {
	lang?: Language;
	isBlog?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	lang: 'de',
	isBlog: false,
});

const t = getTranslations(props.lang);
const currentYear = new Date().getFullYear();

const imprintLink = computed(() => (props.lang === 'en' ? '/en/imprint' : '/imprint'));
const privacyLink = computed(() => (props.lang === 'en' ? '/en/privacy' : '/privacy'));
const blogLink = computed(() => (props.lang === 'en' ? '/en/blog' : '/blog'));
const homeLink = computed(() => (props.lang === 'en' ? '/en' : '/'));
</script>

<template>
	<footer class="terminal-footer">
		<div class="footer-content">
			<div class="footer-meta">
				<a :href="lang === 'de' ? '/' : '/en/'" class="logo-link" :aria-label="t.header.title">
					<img src="/logo/logo.svg" alt="k0r37k1 Logo" class="logo" width="24" height="24" />
				</a>
				<span class="separator">•</span>
				<span>© {{ currentYear }} k0r37k1.dev</span>
				<span class="separator">•</span>
				<a
					href="https://astro.build"
					class="astro-link"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Built with Astro"
				>
					<span>Built with</span>
					<Icon icon="simple-icons:astro" class="astro-icon" />
				</a>
			</div>
			<div class="footer-links">
				<a v-if="!isBlog" :href="blogLink" class="terminal-link footer-link">
					<Icon icon="mdi:post-outline" class="footer-icon" />
					<span>{{ t.footer.links.blog }}</span>
				</a>
				<a v-else :href="homeLink" class="terminal-link footer-link">
					<Icon icon="mdi:home" class="footer-icon" />
					<span>{{ t.footer.links.home }}</span>
				</a>
				<span class="separator">•</span>
				<a :href="imprintLink" class="terminal-link footer-link">
					<Icon icon="mdi:fingerprint" class="footer-icon" />
					<span>{{ t.footer.links.imprint }}</span>
				</a>
				<span class="separator">•</span>
				<a :href="privacyLink" class="terminal-link footer-link">
					<Icon icon="mdi:scale-balance" class="footer-icon" />
					<span>{{ t.footer.links.privacy }}</span>
				</a>
			</div>
		</div>
	</footer>
</template>

<style scoped>
.terminal-footer {
	padding: 1.5rem;
	margin-top: 8rem;
	position: relative;
}

.footer-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 2rem;
	font-family: var(--font-mono);
	font-size: 0.875rem;
	color: var(--color-terminal-text-dim);
	flex-wrap: wrap;

	/* Phosphor glow removed for better readability */
}

.footer-links {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.footer-meta {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.logo-link {
	display: flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	transition: opacity 0.2s ease;
}

@media (hover: hover) {
	.logo-link:hover {
		opacity: 0.85;
	}
}

.logo {
	display: block;
}

.separator {
	color: var(--color-terminal-text-muted);
	opacity: 0.5;
}

.terminal-link {
	color: var(--color-terminal-text-dim);
	text-decoration: none;
	transition: color 0.2s ease;
}

@media (hover: hover) {
	.terminal-link:hover {
		color: var(--color-accent-orange);
		text-shadow: none; /* No glow effect */
	}
}

.footer-link {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
}

.footer-icon {
	font-size: 1.125rem;
}

/* Astro link - no hover effect on link, only icon */
.astro-link {
	color: var(--color-terminal-text-dim);
	text-decoration: none;
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
}

@media (hover: hover) {
	.astro-link:hover {
		color: var(--color-terminal-text-dim); /* Keep text color */
		text-shadow: none; /* No glow on text */
	}
}

.astro-icon {
	font-size: 1.125rem;
	color: var(--color-terminal-text-dim);
	transition: color 0.2s ease;
}

@media (hover: hover) {
	.astro-link:hover .astro-icon {
		color: #bc52ee; /* Astro brand purple */
	}
}

.footer-button {
	background: none;
	border: none;
	padding: 0;
	font-family: var(--font-mono);
	font-size: 0.875rem;
	cursor: pointer;
}

@media (width <= 640px) {
	.footer-content {
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
		font-size: 0.75rem;
	}

	.footer-meta {
		flex-wrap: wrap;
		gap: 0.375rem;
		font-size: 0.75rem;
	}

	.footer-links {
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
		width: 100%;
	}

	.footer-link {
		font-size: 0.875rem;
	}

	.separator {
		display: none;
	}

	.footer-icon {
		font-size: 1rem;
	}

	.footer-cat {
		font-size: 0.6rem;
	}
}
</style>
