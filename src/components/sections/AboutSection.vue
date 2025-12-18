<script setup lang="ts">
import { motion } from 'motion-v';
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
		class="terminal-section about-section"
	>
		<div class="nfo-content">
			<!-- Bio Section -->
			<div class="nfo-section">
				<h2 class="nfo-label">[ WHO ]</h2>
				<p class="nfo-text">
					Full-stack developer with passion for building clean, performant web applications.
					Specialized in modern frontend architectures and developer experience.
				</p>
			</div>

			<!-- What I Do -->
			<div class="nfo-section">
				<h2 class="nfo-label">[ WHAT ]</h2>
				<p class="nfo-text">
					Crafting pixel-perfect interfaces with Vue/Nuxt, React, and Flutter.
					Building scalable backends with PHP and TypeScript. Obsessed with
					accessibility, performance, and clean code.
				</p>
			</div>

			<!-- Current Focus -->
			<div class="nfo-section">
				<h2 class="nfo-label">[ NOW ]</h2>
				<p class="nfo-text">
					Exploring AI-assisted development workflows, contributing to open source,
					and pushing the boundaries of what's possible with modern web technologies.
				</p>
			</div>
		</div>
	</motion.section>
</template>

<style scoped>
.nfo-content {
	font-family: var(--font-mono);
	color: var(--color-terminal-text);
	line-height: 1.6;
}

.nfo-section {
	margin-bottom: 1.5rem;
}

.nfo-section:last-of-type {
	margin-bottom: 0;
}

.nfo-label {
	color: var(--color-accent-orange);
	font-family: 'VT323', monospace;
	font-weight: 400;
	font-size: 1.25rem;
	letter-spacing: 0.05em;
	margin-bottom: 0.5rem;
	text-shadow: 0 0 8px rgba(255, 102, 0, 0.4);
}

.nfo-text {
	color: var(--color-terminal-text-dim);
	font-size: 0.875rem;
	margin: 0;
	padding-left: 1rem;
	border-left: 2px solid var(--color-terminal-border);
}

@media (max-width: 640px) {
	.nfo-label {
		font-size: 0.75rem;
	}

	.nfo-text {
		font-size: 0.75rem;
		padding-left: 0.5rem;
	}
}
</style>
