<script setup lang="ts">
import { computed } from 'vue';
import { getTranslations } from '@/i18n';

interface Props {
	currentLang: 'de' | 'en';
	currentPath?: string;
}

const props = withDefaults(defineProps<Props>(), {
	currentPath: '/',
});

const t = computed(() => getTranslations(props.currentLang));

const getAlternateUrl = (targetLang: 'de' | 'en') => {
	// Remove language prefix from current path
	const pathWithoutLang = props.currentPath.replace(/^\/(en|de)\//, '/');

	// Generate URL for target language
	if (targetLang === 'de') {
		return pathWithoutLang;
	} else {
		return `/en${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
	}
};
</script>

<template>
	<div class="language-switcher">
		<span v-if="currentLang === 'de'" class="lang-item lang-active" aria-current="true">
			<span class="bracket-left">[ </span>DE<span class="bracket-right"> ]</span>
		</span>
		<a
			v-else
			:href="getAlternateUrl('de')"
			class="lang-item lang-link"
			:aria-label="t.aria.navigation.languageSwitcher.switchToGerman"
		>
			DE
		</a>

		<span class="lang-separator">|</span>

		<span v-if="currentLang === 'en'" class="lang-item lang-active" aria-current="true">
			<span class="bracket-left">[ </span>EN<span class="bracket-right"> ]</span>
		</span>
		<a
			v-else
			:href="getAlternateUrl('en')"
			class="lang-item lang-link"
			:aria-label="t.aria.navigation.languageSwitcher.switchToEnglish"
		>
			EN
		</a>
	</div>
</template>

<style scoped>
.language-switcher {
	display: inline-flex;
	align-items: center;
	gap: 0.375rem;
	font-family: var(--font-mono);
	font-size: 0.875rem;
	font-weight: 600;
}

.lang-item {
	color: var(--color-terminal-text-muted);
	transition: all 0.2s ease;
	position: relative;
	/* Subtle phosphor glow */
	text-shadow:
		0 0 3px rgb(168 168 168 / 30%),
		0 0 6px rgb(168 168 168 / 18%);
}

.lang-active {
	color: var(--color-terminal-primary);
	font-weight: 700;
	cursor: default;
	text-shadow: 0 0 8px rgb(0 217 255 / 40%);
}

.lang-active .bracket-left,
.lang-active .bracket-right {
	color: var(--color-accent-orange);
	font-weight: 700;
	/* Orange phosphor glow */
	text-shadow:
		0 0 3px rgb(255 102 0 / 40%),
		0 0 6px rgb(255 102 0 / 25%);
}

.lang-link {
	text-decoration: none;
	cursor: pointer;
	opacity: 0.6;
}

.lang-link:hover {
	color: var(--color-terminal-text);
	opacity: 1;
	text-shadow: 0 0 5px rgb(255 255 255 / 30%);
}

.lang-link:focus-visible {
	outline: 2px solid var(--color-accent-orange);
	outline-offset: 2px;
	border-radius: 2px;
}

.lang-separator {
	color: var(--color-terminal-text-muted);
	opacity: 0.8;
	font-size: 0.875rem;
	font-weight: 600;
	padding: 0 0.125rem;
	/* Subtle phosphor glow */
	text-shadow:
		0 0 3px rgb(140 140 140 / 30%),
		0 0 6px rgb(140 140 140 / 18%);
}

@media (width <= 640px) {
	.language-switcher {
		font-size: 0.75rem;
		gap: 0.5rem;
	}
}
</style>
