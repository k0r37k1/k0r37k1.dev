<script setup lang="ts">
import { Carousel } from 'motion-plus-vue';
import { motion } from 'motion-v';
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
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

// Load projects from i18n translations
const projects = t.projects.items;

const { prefersReducedMotion } = useReducedMotion();
const motionConfig = computed(() => getMotionConfig(prefersReducedMotion.value));

// Override Carousel's inline styles for equal card heights
const carouselWrapper = ref<HTMLElement>();
let observer: MutationObserver | null = null;
const observerConfig: MutationObserverInit = { childList: true, attributes: true, subtree: true };

function applyCarouselFixes() {
	const wrapper = carouselWrapper.value;
	if (!wrapper) return;

	// Disconnect before modifying observed elements to prevent recursion
	observer?.disconnect();

	const ul = wrapper.querySelector<HTMLElement>('ul');
	if (ul) {
		ul.style.alignItems = 'stretch';
		// Carousel sets role="group" but <li> children require role="list"
		ul.setAttribute('role', 'list');
	}

	wrapper.querySelectorAll<HTMLElement>('.ticker-item').forEach((item) => {
		item.style.height = 'auto';
	});

	// Reconnect to catch future Carousel DOM changes
	if (ul && observer) {
		observer.observe(ul, observerConfig);
	}
}

onMounted(() => {
	nextTick(applyCarouselFixes);

	// Re-apply when Carousel modifies DOM (e.g., cloning items for infinite loop)
	const ul = carouselWrapper.value?.querySelector('ul');
	if (ul) {
		observer = new MutationObserver(applyCarouselFixes);
		observer.observe(ul, observerConfig);
	}
});

onBeforeUnmount(() => {
	observer?.disconnect();
});
</script>

<template>
	<motion.section v-bind="motionConfig" class="motion terminal-section projects-section">
		<!-- Projects Carousel -->
		<div ref="carouselWrapper" class="carousel-wrapper">
			<Carousel :loop="true" :gap="24">
				<motion.div
					v-for="(project, index) in projects"
					:key="project.title"
					:initial="{ scale: 0.95, y: 10 }"
					:whileInView="{ scale: 1, y: 0 }"
					:whileHover="{ scale: 1.02, x: -2, y: -2 }"
					:whileTap="{ scale: 0.98 }"
					:transition="{
						type: 'spring',
						stiffness: 400,
						damping: 17,
						delay: index * 0.1,
					}"
					:viewport="{ once: true }"
					class="motion project-card carousel-card"
				>
					<div class="project-header">
						<Icon icon="tabler:folder-code" class="project-icon" aria-hidden="true" />
						<h3 class="project-name">{{ project.title }}</h3>
					</div>
					<img
						v-if="project.image"
						:src="project.image"
						:alt="t.projects.imageAlt.replace('{title}', project.title)"
						class="project-image"
						loading="lazy"
					/>
					<div v-else class="project-image-placeholder" aria-hidden="true">
						<Icon icon="mdi:image-off-outline" class="placeholder-icon" aria-hidden="true" />
						<span>no img</span>
					</div>
					<div class="project-content">
						<p class="project-description">{{ project.description }}</p>

						<!-- Tech Stack -->
						<div class="tech-stack">
							<span class="stack-label">{{ t.projects.stack }}</span>
							<span v-for="tech in project.stack" :key="tech" class="tech-tag">
								{{ tech }}
							</span>
						</div>

						<!-- Links -->
						<div class="project-links">
							<a
								v-if="project.github"
								:href="project.github"
								target="_blank"
								rel="noopener noreferrer"
								class="terminal-link project-link"
							>
								<Icon icon="simple-icons:github" class="link-icon" aria-hidden="true" />
								{{ t.projects.github }}
							</a>
							<a
								v-if="project.demo"
								:href="project.demo"
								target="_blank"
								rel="noopener noreferrer"
								class="terminal-link project-link"
							>
								<Icon icon="mdi:open-in-new" class="link-icon" aria-hidden="true" />
								{{ t.projects.liveDemo }}
							</a>
							<a
								v-if="project.store"
								:href="project.store"
								target="_blank"
								rel="noopener noreferrer"
								class="terminal-link project-link"
							>
								<Icon icon="mdi:google-play" class="link-icon" aria-hidden="true" />
								{{ t.projects.store }}
							</a>
						</div>
					</div>
				</motion.div>

				<template #after>
					<CarouselControls :prev-label="t.projects.prevPage" :next-label="t.projects.nextPage" />
				</template>
			</Carousel>
		</div>
	</motion.section>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue';
import { useCarousel as useCarouselHook } from 'motion-plus-vue';

const CarouselControls = defineComponent({
	name: 'CarouselControls',
	props: {
		prevLabel: { type: String, default: '◀ Back' },
		nextLabel: { type: String, default: 'Forward ▶' },
	},
	setup() {
		const { prevPage, nextPage, paginationState } = useCarouselHook();
		return { prevPage, nextPage, paginationState };
	},
	render() {
		const { prevPage, nextPage, paginationState, prevLabel, nextLabel } = this;

		return h('div', { class: 'carousel-nav' }, [
			h(
				'button',
				{
					class: 'terminal-btn carousel-btn',
					onClick: prevPage,
					disabled: !paginationState.isPrevActive,
					'aria-label': prevLabel,
				},
				prevLabel
			),
			h(
				'button',
				{
					class: 'terminal-btn carousel-btn',
					onClick: nextPage,
					disabled: !paginationState.isNextActive,
					'aria-label': nextLabel,
				},
				nextLabel
			),
		]);
	},
});
</script>

<style scoped>
/* Carousel wrapper */
.carousel-wrapper {
	position: relative;
}

/* Carousel wraps each card in li.ticker-item — stretch handled via JS */
.carousel-wrapper :deep(.ticker-item) {
	display: flex;
	align-self: stretch;
}

/* Equal-sized cards */
.carousel-card {
	width: 340px;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
}

/* Stretch content to fill card height */
.project-content {
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	flex: 1;
}

/* Push links to bottom */
.project-links {
	display: flex;
	gap: 1rem;
	font-size: 0.875rem;
	padding-top: 1rem;
	border-top: 1px solid var(--color-terminal-border);
	margin-top: auto;
}

.project-image {
	width: 100%;
	max-height: 180px;
	object-fit: cover;
	margin-top: 0.75rem;
	border: 1px solid var(--color-terminal-border);
}

.project-image-placeholder {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	height: 120px;
	margin-top: 0.75rem;
	border: 1px dashed var(--color-terminal-border);
	color: var(--color-terminal-text-dim);
	font-size: 0.75rem;
	text-transform: uppercase;
	letter-spacing: 0.05em;
}

.placeholder-icon {
	font-size: 2rem;
	opacity: 0.5;
}

.project-header {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	padding: 0.75rem 1rem;
	border-bottom: 1px solid var(--color-terminal-border);
	background: var(--color-terminal-surface);
}

.project-icon {
	font-size: 1.5rem;
	color: var(--color-terminal-primary);
}

.project-name {
	color: var(--color-terminal-primary);
	font-weight: 600;
	font-size: 0.875rem;
	letter-spacing: 0.05em;
}

.project-description {
	color: var(--color-terminal-text-dim);
	font-size: 0.875rem;
	line-height: 1.6;
	margin: 0;
}

.tech-stack {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	align-items: center;
}

.stack-label {
	color: var(--color-terminal-secondary);
	font-size: 0.75rem;
	text-transform: uppercase;
	letter-spacing: 0.05em;
}

.tech-tag {
	background: transparent;
	color: var(--color-terminal-text-dim);
	padding: 0.25rem 0.625rem;
	border-radius: 0.25rem;
	font-size: 0.75rem;
	font-weight: 500;
	border: 1px solid var(--color-terminal-border);
}

.project-link {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	text-shadow: none;
}

.link-icon {
	font-size: 1.125rem;
}

/* Carousel Nav — centered below cards (child component, needs :deep) */
.carousel-wrapper :deep(.carousel-nav) {
	display: flex;
	justify-content: center;
	gap: 1rem;
	margin-top: 1.5rem;
}

.carousel-wrapper :deep(.carousel-btn) {
	cursor: pointer;
	font-family: inherit;
	font-size: 0.875rem;
}

@media (width <= 640px) {
	.carousel-card {
		width: 85vw;
	}

	.project-content {
		padding: 1rem;
	}

	.project-name {
		font-size: 0.85rem;
	}

	.project-description {
		font-size: 0.825rem;
	}

	.project-links {
		font-size: 0.825rem;
	}

	.carousel-wrapper :deep(.carousel-btn) {
		font-size: 0.825rem;
	}
}
</style>
