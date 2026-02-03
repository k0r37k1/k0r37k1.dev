<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import figlet from 'figlet';
import colossalFont from 'figlet/importable-fonts/Colossal.js';
import smallFont from 'figlet/importable-fonts/Small.js';
import { getTranslations, type Language } from '@/i18n';

const asciiArt = ref('');
const detectedLang = ref<Language>('de');

// Detect language - prioritize referrer (where user came from)
const detectLanguage = (): Language => {
	if (typeof window !== 'undefined') {
		const referrer = document.referrer;

		// Prioritize referrer language (the language user was browsing in)
		if (referrer && referrer.includes(window.location.host)) {
			// User came from our site - use referrer's language
			return referrer.includes('/en/') ? 'en' : 'de';
		}

		// Fallback: direct access to 404 URL - use current path
		const path = window.location.pathname;
		if (path.startsWith('/en/')) {
			return 'en';
		}
	}
	return 'de';
};

const t = computed(() => getTranslations(detectedLang.value));
const homeUrl = computed(() => (detectedLang.value === 'en' ? '/en' : '/'));

onMounted(() => {
	// Detect language
	detectedLang.value = detectLanguage();

	const isMobile = window.innerWidth < 640;

	// Parse and load fonts
	figlet.parseFont('Colossal', colossalFont);
	figlet.parseFont('Small', smallFont);

	// Generate ASCII art (responsive)
	const font = isMobile ? 'Small' : 'Colossal';

	asciiArt.value = figlet.textSync('404', {
		font,
		horizontalLayout: 'default',
		verticalLayout: 'default',
	});
});
</script>

<template>
	<section class="terminal-section not-found-section">
		<!-- Hidden heading for accessibility -->
		<h1 class="visually-hidden">{{ t.notFound.title }}</h1>

		<!-- ASCII Art 404 -->
		<div class="ascii-logo-wrapper">
			<pre class="ascii-art" aria-hidden="true">{{ asciiArt }}</pre>
		</div>

		<!-- Error Message -->
		<div class="error-message">
			<p class="error-title">{{ t.notFound.subtitle }}</p>
			<p class="error-description">{{ t.notFound.description }}</p>
		</div>

		<!-- Navigation Links -->
		<div class="error-actions">
			<a :href="homeUrl" class="error-link">
				<Icon icon="mdi:home" class="link-icon" />
				<span>{{ t.notFound.backHome }}</span>
			</a>
		</div>
	</section>
</template>

<style scoped>
.not-found-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 70vh;
	padding: 2rem 1rem;
	text-align: center;
}

.ascii-logo-wrapper {
	position: relative;
	margin-bottom: 2rem;
}

.ascii-art {
	font-family: var(--font-mono);
	font-size: 0.875rem;
	line-height: 1.1;
	white-space: pre;
	color: #39ff14; /* radioactive lime / neon green */
	user-select: none;
}

.error-message {
	margin-bottom: 2rem;
	max-width: 500px;
}

.error-title {
	font-size: 1.5rem;
	font-weight: 600;
	color: var(--color-link);
	margin-bottom: 0.75rem;
}

.error-description {
	font-size: 1rem;
	color: var(--color-terminal-text-dim);
	line-height: 1.6;
}

.error-actions {
	display: flex;
	flex-direction: row;
	gap: 2rem;
	align-items: center;
	justify-content: center;
}

.error-link {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	color: var(--color-link);
	text-decoration: none;
	font-weight: 600;
	border-bottom: 2px solid transparent;
	transition: all 0.2s ease;
}

@media (hover: hover) {
	.error-link:hover {
		color: var(--color-accent-orange);
		border-bottom-color: var(--color-accent-orange);
	}

	.error-link:hover::before {
		content: '[ ';
		color: var(--color-terminal-primary);
	}

	.error-link:hover::after {
		content: ' ]';
		color: var(--color-terminal-primary);
	}
}

.link-icon {
	font-size: 1.25rem;
}

@media (width <= 640px) {
	.ascii-art {
		font-size: 0.625rem;
	}

	.error-title {
		font-size: 1.25rem;
	}

	.error-actions {
		flex-direction: column;
		gap: 1rem;
	}
}
</style>
