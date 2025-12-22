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
		<!-- Show only the target language with brackets in terminal style -->
		<a
			v-if="currentLang === 'de'"
			:href="getAlternateUrl('en')"
			class="lang-link"
			:aria-label="t.aria.navigation.languageSwitcher.switchToEnglish"
		>
			<span class="bracket-left">[ </span>EN<span class="bracket-right"> ]</span>
		</a>
		<a
			v-else
			:href="getAlternateUrl('de')"
			class="lang-link"
			:aria-label="t.aria.navigation.languageSwitcher.switchToGerman"
		>
			<span class="bracket-left">[ </span>DE<span class="bracket-right"> ]</span>
		</a>
	</div>
</template>

<style scoped>
.language-switcher {
	display: inline-flex;
	align-items: center;
	font-family: var(--font-mono);
	font-size: 0.875rem;
	font-weight: 600;
}

.lang-link {
	color: var(--color-accent-orange);
	text-decoration: none;
	cursor: pointer;
	transition: all 0.2s ease;

	/* Orange phosphor glow */
	text-shadow:
		0 0 3px rgb(255 102 0 / 40%),
		0 0 6px rgb(255 102 0 / 25%);
}

/* Prevent browser default link colors */
.lang-link:visited,
.lang-link:active,
.lang-link:link {
	color: var(--color-accent-orange);
}

.bracket-left,
.bracket-right {
	color: var(--color-terminal-primary);
	font-weight: 700;

	/* Cyan phosphor glow */
	text-shadow:
		0 0 3px rgb(0 217 255 / 40%),
		0 0 6px rgb(0 217 255 / 25%);
}

.lang-link:hover,
.lang-link:hover:visited,
.lang-link:hover:active {
	color: var(--color-accent-orange);
	/* Orange phosphor glow */
	text-shadow:
		0 0 3px rgb(255 102 0 / 40%),
		0 0 6px rgb(255 102 0 / 25%);
}

.lang-link:hover .bracket-left,
.lang-link:hover .bracket-right {
	color: var(--color-terminal-primary);
	/* Cyan phosphor glow */
	text-shadow:
		0 0 3px rgb(0 217 255 / 40%),
		0 0 6px rgb(0 217 255 / 25%);
}

.lang-link:focus-visible {
	outline: 2px solid var(--color-accent-orange);
	outline-offset: 2px;
	border-radius: 3px;
}

@media (width <= 640px) {
	.language-switcher {
		font-size: 0.75rem;
	}
}
</style>
