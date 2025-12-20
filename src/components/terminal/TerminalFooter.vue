<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { getTranslations, type Language } from '@/i18n';
import { computed } from 'vue';

interface Props {
	lang?: Language;
}

const props = withDefaults(defineProps<Props>(), {
	lang: 'de',
});

const t = getTranslations(props.lang);
const currentYear = new Date().getFullYear();

const imprintLink = computed(() => (props.lang === 'en' ? '/en/imprint' : '/imprint'));
const privacyLink = computed(() => (props.lang === 'en' ? '/en/privacy' : '/privacy'));
</script>

<template>
	<footer class="terminal-footer">
		<div class="footer-content">
			<div class="footer-meta">
				<span>© {{ currentYear }} k0r37k1.dev</span>
				<span class="separator">•</span>
				<span>{{ t.footer.madeWith }} <span class="heart">♥</span></span>
			</div>
			<div class="footer-links">
				<a
					href="https://www.w3.org/WAI/WCAG22/quickref/"
					class="terminal-link footer-link"
					target="_blank"
					rel="noopener noreferrer"
					:aria-label="t.aria.actions.wcagCompliance"
				>
					<Icon icon="mdi:shield-check" class="footer-icon" />
					<span>{{ t.footer.links.wcag }}</span>
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

.separator {
	color: var(--color-terminal-text-muted);
	opacity: 0.5;
}

.terminal-link {
	color: var(--color-terminal-text-dim);
	text-decoration: none;
	transition: color 0.2s ease;
}

.terminal-link:hover {
	color: var(--color-accent-orange);
}

.footer-link {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
}

.footer-icon {
	font-size: 1.125rem;
}

.heart {
	color: #f55;
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
	}

	.footer-cat {
		font-size: 0.6rem;
	}
}
</style>
