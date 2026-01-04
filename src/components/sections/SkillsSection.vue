<script setup lang="ts">
import { motion } from 'motion-v';
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { getTranslations, type Language } from '@/i18n';
import { useReducedMotion, getMotionConfig } from '@/composables/useReducedMotion';

interface Props {
	lang?: Language;
}

const { lang = 'de' } = defineProps<Props>();
const t = getTranslations(lang);
const { prefersReducedMotion } = useReducedMotion();
const motionConfig = computed(() => getMotionConfig(prefersReducedMotion.value));

// Technical skills (global across languages)
const skills = {
	languages: [
		{ name: 'JavaScript', icon: 'simple-icons:javascript' },
		{ name: 'TypeScript', icon: 'simple-icons:typescript' },
		{ name: 'PHP', icon: 'simple-icons:php' },
		{ name: 'Dart', icon: 'simple-icons:dart' },
		{ name: 'SQL', icon: 'simple-icons:postgresql' },
		{ name: 'HTML', icon: 'simple-icons:html5' },
		{ name: 'CSS', icon: 'simple-icons:css3' },
	],
	frameworks: [
		{ name: 'React', icon: 'simple-icons:react' },
		{ name: 'Next.js', icon: 'simple-icons:nextdotjs' },
		{ name: 'Vue 3', icon: 'simple-icons:vuedotjs' },
		{ name: 'Nuxt', icon: 'simple-icons:nuxtdotjs' },
		{ name: 'Laravel', icon: 'simple-icons:laravel' },
		{ name: 'TanStack', icon: 'simple-icons:tanstack' },
		{ name: 'React Native', icon: 'simple-icons:react' },
		{ name: 'Expo', icon: 'simple-icons:expo' },
		{ name: 'Flutter', icon: 'simple-icons:flutter' },
		{ name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss' },
	],
	tools: [
		{ name: 'Git', icon: 'simple-icons:git' },
		{ name: 'Docker', icon: 'simple-icons:docker' },
		{ name: 'Gradle', icon: 'simple-icons:gradle' },
		{ name: 'Vite', icon: 'simple-icons:vite' },
		{ name: 'Node.js', icon: 'simple-icons:nodedotjs' },
		{ name: 'Claude', icon: 'simple-icons:anthropic' },
	],
	platforms: [
		{ key: 'web', icon: 'mdi:web' },
		{ key: 'ios', icon: 'mdi:apple-ios' },
		{ key: 'android', icon: 'mdi:android' },
		{ key: 'macos', icon: 'mdi:apple' },
		{ key: 'windows', icon: 'mdi:microsoft-windows' },
		{ key: 'linux', icon: 'mdi:linux' },
	],
	concepts: [
		{ key: 'testing', icon: 'mdi:test-tube' },
		{ key: 'accessibility', icon: 'mdi:human' },
	],
};
</script>

<template>
	<motion.section v-bind="motionConfig" class="terminal-section skills-section">
		<!-- Skills Content -->
		<div class="section-content">
			<!-- Languages -->
			<div class="skill-category">
				<div class="category-title">"{{ t.skills.categories.languages }}":</div>
				<div class="skills-list">
					<motion.span
						v-for="skill in skills.languages"
						:key="skill.name"
						class="skill-tag"
						:whileHover="{ scale: 1.04 }"
						:whileTap="{ scale: 0.95 }"
						:transition="{ type: 'spring', stiffness: 400, damping: 17 }"
					>
						<Icon :icon="skill.icon" class="skill-icon" />
						{{ skill.name }}
					</motion.span>
				</div>
			</div>

			<!-- Frameworks & Libraries -->
			<div class="skill-category">
				<div class="category-title">"{{ t.skills.categories.frameworks }}":</div>
				<div class="skills-list">
					<motion.span
						v-for="skill in skills.frameworks"
						:key="skill.name"
						class="skill-tag"
						:whileHover="{ scale: 1.04 }"
						:whileTap="{ scale: 0.95 }"
						:transition="{ type: 'spring', stiffness: 400, damping: 17 }"
					>
						<Icon :icon="skill.icon" class="skill-icon" />
						{{ skill.name }}
					</motion.span>
				</div>
			</div>

			<!-- Tools -->
			<div class="skill-category">
				<div class="category-title">"{{ t.skills.categories.tools }}":</div>
				<div class="skills-list">
					<motion.span
						v-for="skill in skills.tools"
						:key="skill.name"
						class="skill-tag"
						:whileHover="{ scale: 1.04 }"
						:whileTap="{ scale: 0.95 }"
						:transition="{ type: 'spring', stiffness: 400, damping: 17 }"
					>
						<Icon :icon="skill.icon" class="skill-icon" />
						{{ skill.name }}
					</motion.span>
				</div>
			</div>

			<!-- Platforms -->
			<div class="skill-category">
				<div class="category-title">"{{ t.skills.categories.platforms }}":</div>
				<div class="skills-list">
					<motion.span
						v-for="skill in skills.platforms"
						:key="skill.key"
						class="skill-tag"
						:whileHover="{ scale: 1.04 }"
						:whileTap="{ scale: 0.95 }"
						:transition="{ type: 'spring', stiffness: 400, damping: 17 }"
					>
						<Icon :icon="skill.icon" class="skill-icon" />
						{{ t.skills.items[skill.key] }}
					</motion.span>
				</div>
			</div>

			<!-- Concepts -->
			<div class="skill-category">
				<div class="category-title">"{{ t.skills.categories.concepts }}":</div>
				<div class="skills-list">
					<motion.span
						v-for="skill in skills.concepts"
						:key="skill.key"
						class="skill-tag"
						:whileHover="{ scale: 1.04 }"
						:whileTap="{ scale: 0.95 }"
						:transition="{ type: 'spring', stiffness: 400, damping: 17 }"
					>
						<Icon :icon="skill.icon" class="skill-icon" />
						{{ t.skills.items[skill.key] }}
					</motion.span>
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
	color: oklch(85% 0.22 125deg);
	font-size: 0.875rem;
	font-weight: 600;
	letter-spacing: 0.02em;
	margin-bottom: 0.75rem;

	/* Radioactive lime glow */
	text-shadow:
		0 0 3px oklch(85% 0.22 125deg / 40%),
		0 0 6px oklch(85% 0.22 125deg / 25%);
}

.skill-tag {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
}

.skill-icon {
	font-size: 1.125rem;
}

@media (width <= 640px) {
	.category-title {
		font-size: 0.85rem; /* Smaller than sub-labels, nested category titles */
	}

	.skill-tag {
		font-size: 0.825rem; /* Compact skill label text size */
	}
}
</style>
