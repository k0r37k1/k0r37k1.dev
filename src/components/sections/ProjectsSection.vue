<script setup lang="ts">
import { motion } from 'motion-v';
import { computed } from 'vue';
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
</script>

<template>
	<motion.section v-bind="motionConfig" class="terminal-section projects-section">
		<!-- Projects Grid -->
		<div class="projects-grid">
			<motion.div
				v-for="(project, index) in projects"
				:key="project.title"
				:initial="{ opacity: 0, scale: 0.95 }"
				:whileInView="{ opacity: 1, scale: 1 }"
				:whileHover="{ scale: 1.02 }"
				:whileTap="{ scale: 0.98 }"
				:transition="{
					type: 'spring',
					stiffness: 400,
					damping: 17,
					delay: index * 0.1,
				}"
				:viewport="{ once: true }"
				class="project-card"
			>
				<div class="project-header">
					<Icon icon="tabler:folder-code" class="project-icon" aria-hidden="true" />
					<h3 class="project-name">{{ project.title }}</h3>
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
							<Icon icon="simple-icons:github" class="link-icon" />
							{{ t.projects.github }}
						</a>
						<a
							v-if="project.demo"
							:href="project.demo"
							target="_blank"
							rel="noopener noreferrer"
							class="terminal-link project-link"
						>
							<Icon icon="mdi:open-in-new" class="link-icon" />
							{{ t.projects.liveDemo }}
						</a>
						<a
							v-if="project.store"
							:href="project.store"
							target="_blank"
							rel="noopener noreferrer"
							class="terminal-link project-link"
						>
							<Icon icon="mdi:google-play" class="link-icon" />
							{{ t.projects.store }}
						</a>
					</div>
				</div>
			</motion.div>
		</div>
	</motion.section>
</template>

<style scoped>
.projects-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 1.5rem;
	margin-top: 1rem;
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

.project-content {
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
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
	color: var(--color-terminal-secondary); /* Magenta */
	font-size: 0.75rem;
	text-transform: uppercase;
	letter-spacing: 0.05em;
}

.tech-tag {
	background: transparent;
	color: var(--color-terminal-text-dim); /* Dimmed text */
	padding: 0.25rem 0.625rem;
	border-radius: 0.25rem;
	font-size: 0.75rem;
	font-weight: 500;
	border: 1px solid var(--color-terminal-border);
}

.project-links {
	display: flex;
	gap: 1rem;
	font-size: 0.875rem;
	padding-top: 1rem;
	border-top: 1px solid var(--color-terminal-border);
}

.project-link {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
}

.link-icon {
	font-size: 1.125rem;
}

@media (width <= 640px) {
	.projects-grid {
		grid-template-columns: 1fr;
	}

	.project-content {
		padding: 1rem;
	}

	.project-name {
		font-size: 0.85rem; /* Slightly smaller card title */
	}

	.project-description {
		font-size: 0.825rem; /* Compact content text size */
	}

	.project-links {
		font-size: 0.825rem; /* Compact link text size */
	}
}
</style>
