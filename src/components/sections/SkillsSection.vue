<script setup lang="ts">
import { motion } from 'motion-v';
import { Icon } from '@iconify/vue';

// TODO: Replace with your actual skills
const skills = {
	languages: [
		{ name: 'JavaScript', icon: 'simple-icons:javascript' },
		{ name: 'TypeScript', icon: 'simple-icons:typescript' },
		{ name: 'PHP', icon: 'simple-icons:php' },
		{ name: 'Swift', icon: 'simple-icons:swift' },
		{ name: 'Kotlin', icon: 'simple-icons:kotlin' },
		{ name: 'HTML', icon: 'simple-icons:html5' },
		{ name: 'CSS', icon: 'simple-icons:css3' },
	],
	frameworks: [
		{ name: 'React', icon: 'simple-icons:react' },
		{ name: 'Next.js', icon: 'simple-icons:nextdotjs' },
		{ name: 'Vue 3', icon: 'simple-icons:vuedotjs' },
		{ name: 'Nuxt', icon: 'simple-icons:nuxtdotjs' },
		{ name: 'React Native', icon: 'simple-icons:react' },
		{ name: 'Expo', icon: 'simple-icons:expo' },
		{ name: 'Flutter', icon: 'simple-icons:flutter' },
		{ name: 'Astro', icon: 'simple-icons:astro' },
		{ name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss' },
	],
	tools: [
		{ name: 'Git', icon: 'simple-icons:git' },
		{ name: 'Docker', icon: 'simple-icons:docker' },
		{ name: 'Vite', icon: 'simple-icons:vite' },
		{ name: 'Creative Suite', icon: 'simple-icons:adobe' },
		{ name: 'VS Code', icon: 'simple-icons:visualstudiocode' },
		{ name: 'Claude Code', icon: 'simple-icons:anthropic' },
	],
	platforms: [
		{ name: 'Desktop', icon: 'mdi:monitor' },
		{ name: 'Mobile', icon: 'mdi:cellphone' },
	],
	concepts: [
		{ name: 'Testing', icon: 'mdi:test-tube' },
		{ name: 'Accessibility', icon: 'mdi:human' },
	],
};
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
		class="terminal-section skills-section"
	>
		<!-- Skills Content -->
		<div class="section-content">
			<!-- Languages -->
			<div class="skill-category">
				<div class="category-title">"languages":</div>
				<div class="skills-list">
					<span v-for="skill in skills.languages" :key="skill.name" class="skill-tag">
						<Icon :icon="skill.icon" class="skill-icon" />
						{{ skill.name }}
					</span>
				</div>
			</div>

			<!-- Frameworks & Libraries -->
			<div class="skill-category">
				<div class="category-title">"frameworks":</div>
				<div class="skills-list">
					<span v-for="skill in skills.frameworks" :key="skill.name" class="skill-tag">
						<Icon :icon="skill.icon" class="skill-icon" />
						{{ skill.name }}
					</span>
				</div>
			</div>

			<!-- Tools -->
			<div class="skill-category">
				<div class="category-title">"tools":</div>
				<div class="skills-list">
					<span v-for="skill in skills.tools" :key="skill.name" class="skill-tag">
						<Icon :icon="skill.icon" class="skill-icon" />
						{{ skill.name }}
					</span>
				</div>
			</div>

			<!-- Platforms -->
			<div class="skill-category">
				<div class="category-title">"platforms":</div>
				<div class="skills-list">
					<span v-for="skill in skills.platforms" :key="skill.name" class="skill-tag">
						<Icon :icon="skill.icon" class="skill-icon" />
						{{ skill.name }}
					</span>
				</div>
			</div>

			<!-- Concepts -->
			<div class="skill-category">
				<div class="category-title">"concepts":</div>
				<div class="skills-list">
					<span v-for="skill in skills.concepts" :key="skill.name" class="skill-tag">
						<Icon :icon="skill.icon" class="skill-icon" />
						{{ skill.name }}
					</span>
				</div>
			</div>
		</div>
	</motion.section>
</template>

<style scoped>
.section-content {
	margin-top: 1rem;
}

.skill-category {
	margin-bottom: 1.5rem;
}

.skill-category:last-child {
	margin-bottom: 0;
}

.category-title {
	color: var(--color-terminal-secondary);
	font-size: 0.875rem;
	font-weight: 600;
	letter-spacing: 0.02em;
	margin-bottom: 0.75rem;
}

.skill-tag {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
}

.skill-icon {
	font-size: 1.125rem;
}

@media (max-width: 640px) {
	.category-title {
		font-size: 0.8rem;
	}
}
</style>
