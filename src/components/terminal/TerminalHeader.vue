<script setup lang="ts">
import LanguageSwitcher from '@components/ui/LanguageSwitcher.vue';
import { getTranslations, type Language } from '@/i18n';
import { computed } from 'vue';

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
const baseTitle = props.customTitle || t.header.title;

// Split title to hide .txt on mobile via CSS
const titleParts = computed(() => {
	if (baseTitle.includes('.txt')) {
		const parts = baseTitle.split('.txt');
		return {
			main: parts[0],
			extension: '.txt',
			hasExtension: true,
		};
	}
	return {
		main: baseTitle,
		extension: '',
		hasExtension: false,
	};
});
</script>

<template>
	<header class="terminal-header">
		<span class="terminal-title">
			{{ titleParts.main
			}}<span v-if="titleParts.hasExtension" class="txt-extension">{{ titleParts.extension }}</span
			><span class="terminal-cursor" aria-hidden="true">|</span>
		</span>
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

	/* Subtle phosphor glow */
	text-shadow:
		0 0 3px rgb(140 140 140 / 30%),
		0 0 6px rgb(140 140 140 / 18%);
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

	/* Hide .txt extension on mobile */
	.txt-extension {
		display: none;
	}
}
</style>
