<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TypeWriter from '@components/ui/TypeWriter.vue';
import figlet from 'figlet';
import colossalFont from 'figlet/importable-fonts/Colossal.js';
import smallFont from 'figlet/importable-fonts/Small.js';
import { getTranslations, type Language } from '@/i18n';

interface Props {
	isMobile?: boolean;
	lang?: Language;
}

const props = withDefaults(defineProps<Props>(), {
	isMobile: undefined,
	lang: 'de',
});

const t = getTranslations(props.lang);
const asciiArt = ref('');

onMounted(() => {
	// Auto-detect mobile if not provided as prop
	const isMobileDetected = props.isMobile !== undefined ? props.isMobile : window.innerWidth < 640;

	// Parse and load fonts
	figlet.parseFont('Colossal', colossalFont);
	figlet.parseFont('Small', smallFont);

	// Generate ASCII art (responsive: Small font for mobile, Colossal for desktop)
	const text = isMobileDetected ? 'k0r37k1' : 'k0r37k1.dev';
	const font = isMobileDetected ? 'Small' : 'Colossal';

	asciiArt.value = figlet.textSync(text, {
		font,
		horizontalLayout: 'default',
		verticalLayout: 'default',
	});
});
</script>

<template>
	<section class="terminal-section hero-section">
		<!-- Main heading for SEO and screen readers -->
		<h1 class="visually-hidden">k0r37k1.dev - Developer Portfolio</h1>

		<!-- ASCII Art Logo -->
		<div class="ascii-logo-wrapper">
			<pre class="ascii-art holographic-text" aria-hidden="true">{{ asciiArt }}</pre>
		</div>

		<!-- Welcome Message with Typing Animation -->
		<div class="welcome-message text-center">
			<TypeWriter :text="t.hero.welcome" :speed="50" :delay="1000" />
		</div>

		<!-- Tagline -->
		<div class="tagline text-center">{{ t.hero.subtitle }}</div>
	</section>
</template>

<style scoped>
.hero-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 60vh;
	padding: 2rem 0;
	position: relative;
}

.ascii-logo-wrapper {
	position: relative;
	margin-bottom: 1.5rem;
}

.ascii-art {
	font-family: var(--font-mono);
	font-size: 1rem;
	line-height: 1;
	text-align: left;
	margin: 0;

	/* Holographic gradient */
	background: linear-gradient(
		90deg,
		var(--color-terminal-primary) 0%,
		var(--color-accent-purple) 25%,
		var(--color-terminal-secondary) 50%,
		var(--color-accent-orange) 75%,
		var(--color-terminal-primary) 100%
	);
	background-size: 300% auto;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	filter: drop-shadow(0 0 3px rgb(0 217 255 / 10%));

	/* Beide Animationen: Gradient shimmer + CRT flicker */
	animation:
		shimmer-enhanced 4s linear infinite,
		crt-flicker 3s steps(1) infinite;
}

.ascii-decorations {
	position: absolute;
	width: 100%;
	height: 100%;
	pointer-events: none;
	font-family: var(--font-mono);
	color: var(--color-terminal-border);
}

.corner {
	position: absolute;
	font-size: 0.875rem;
	opacity: 0.6;
	color: var(--color-accent-orange);
	text-shadow: 0 0 6px rgb(255 102 0 / 25%);
	transition: all 0.3s ease;
}

.hero-section:hover .corner {
	opacity: 1;
	text-shadow: 0 0 10px rgb(255 102 0 / 40%);
}

.top-left {
	top: 0.5rem;
	left: 0.5rem;
}

.top-right {
	top: 0.5rem;
	right: 0.5rem;
}

.bottom-left {
	bottom: 0.5rem;
	left: 0.5rem;
}

.bottom-right {
	bottom: 0.5rem;
	right: 0.5rem;
}

.welcome-message {
	font-size: 1.25rem;
	color: var(--color-terminal-primary);
	margin: 1rem 0;
}

.tagline {
	font-size: 1rem;
	letter-spacing: 0.05em;
	color: var(--color-terminal-text-dim);
}

/* Accessibility: Visually hidden but available to screen readers */
.visually-hidden {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip-path: inset(50%);
	white-space: nowrap;
	border-width: 0;
}

@media (width <= 640px) {
	.hero-section {
		min-height: 40vh;
		padding: 1rem 0;
	}

	.ascii-art {
		font-size: 0.65rem;
	}

	.corner {
		font-size: 0.6rem;
	}

	.welcome-message {
		font-size: 0.875rem;
		margin: 0.75rem 0;
	}

	.tagline {
		font-size: 0.75rem;
		letter-spacing: 0.02em;
	}
}
</style>
