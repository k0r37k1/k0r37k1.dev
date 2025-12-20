<script setup lang="ts">
import LanguageSwitcher from '@components/ui/LanguageSwitcher.vue';
import { getTranslations, type Language } from '@/i18n';

interface Props {
	lang?: Language;
	currentPath?: string;
	customTitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
	lang: 'de',
	currentPath: '/',
	customTitle: undefined,
});

const t = getTranslations(props.lang);

// Use custom title if provided, otherwise use default from translations
const displayTitle = props.customTitle || t.header.title;
</script>

<template>
	<header class="terminal-header">
		<span class="terminal-title"
			>{{ displayTitle }}<span class="terminal-cursor" aria-hidden="true">|</span></span
		>
		<span class="header-separator" aria-hidden="true">|</span>
		<LanguageSwitcher
			:current-lang="lang"
			:current-path="currentPath"
			class="header-lang-switcher"
		/>
	</header>
</template>

<style scoped>
/* Terminal Header with Language Switcher */
.terminal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
}

.header-separator {
	color: var(--color-terminal-border);
	opacity: 0.4;
	font-family: var(--font-mono);
	margin: 0 0.5rem;
}

.header-lang-switcher {
	margin-left: auto;
}

@media (width <= 640px) {
	.terminal-header {
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.header-separator {
		display: none;
	}
}
</style>
