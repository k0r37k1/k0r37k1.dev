<script setup lang="ts">
import { motion } from 'motion-v';
import { Icon } from '@iconify/vue';

// TODO: Replace with your actual projects
const projects = [
	{
		title: 'Project Alpha',
		description: 'A revolutionary web application built with modern technologies.',
		stack: ['Vue 3', 'TypeScript', 'Tailwind CSS'],
		github: 'https://github.com/yourusername/project-alpha',
		demo: 'https://project-alpha.demo',
	},
	{
		title: 'Project Beta',
		description: 'An innovative solution for real-world problems.',
		stack: ['Astro', 'React', 'Node.js'],
		github: 'https://github.com/yourusername/project-beta',
		demo: null,
	},
	{
		title: 'Project Gamma',
		description: 'A beautiful UI component library for developers.',
		stack: ['Vue 3', 'Vite', 'Storybook'],
		github: 'https://github.com/yourusername/project-gamma',
		demo: 'https://project-gamma.demo',
	},
	{
		title: 'Project Delta',
		description: 'Full-stack application with real-time features.',
		stack: ['TypeScript', 'WebSocket', 'PostgreSQL'],
		github: 'https://github.com/yourusername/project-delta',
		demo: 'https://project-delta.demo',
	},
];
</script>

<template>
	<motion.section
		:initial="{ opacity: 0, y: 20, scale: 0.98 }"
		:whileInView="{ opacity: 1, y: 0, scale: 1 }"
		:transition="{
			type: 'spring',
			stiffness: 200,
			damping: 20,
			duration: 0.4,
		}"
		:viewport="{ once: true, margin: '-100px' }"
		class="terminal-section projects-section"
	>
		<!-- Projects Grid -->
		<div class="projects-grid">
			<motion.div
				v-for="(project, index) in projects"
				:key="project.title"
				:initial="{ opacity: 0, scale: 0.95 }"
				:whileInView="{ opacity: 1, scale: 1 }"
				:transition="{
					type: 'spring',
					stiffness: 400,
					damping: 17,
					delay: index * 0.1,
				}"
				:viewport="{ once: true }"
			>
				<motion.div :whileHover="{ scale: 1.02 }" class="project-card">
					<div class="project-header">
						<Icon icon="tabler:folder-code" class="project-icon" aria-hidden="true" />
						<h3 class="project-name">{{ project.title }}</h3>
					</div>
					<div class="project-content">
						<p class="project-description">{{ project.description }}</p>

						<!-- Tech Stack -->
						<div class="tech-stack">
							<span class="stack-label">Stack:</span>
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
								GitHub
							</a>
							<a
								v-if="project.demo"
								:href="project.demo"
								target="_blank"
								rel="noopener noreferrer"
								class="terminal-link project-link"
							>
								<Icon icon="mdi:open-in-new" class="link-icon" />
								Live Demo
							</a>
							<a
								v-if="project.store"
								:href="project.store"
								target="_blank"
								rel="noopener noreferrer"
								class="terminal-link project-link"
							>
								<Icon icon="mdi:google-play" class="link-icon" />
								Store
							</a>
						</div>
					</div>
				</motion.div>
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
	color: var(--color-terminal-text-muted);
	font-size: 0.75rem;
	text-transform: uppercase;
	letter-spacing: 0.05em;
}

.tech-tag {
	background: transparent;
	color: var(--color-terminal-secondary);
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

@media (max-width: 640px) {
	.projects-grid {
		grid-template-columns: 1fr;
	}

	.project-content {
		padding: 1rem;
	}

	.project-description {
		font-size: 0.8rem;
	}
}
</style>
