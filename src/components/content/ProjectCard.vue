<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { motion } from 'motion-v';
import '@/styles/components/ProjectCard.css';

interface Props {
	title: string;
	category: string;
	description?: string;
	imageSrc: string;
	imageAlt?: string;
	client?: string;
	year?: string;
	tags?: string[];
	results?: string;
	href?: string;
	variant?: 'default' | 'overlay' | 'minimal';
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
});
</script>

<template>
	<motion.article
		:class="['project-card', `project-card--${variant}`]"
		:initial="{ opacity: 0, y: 20 }"
		:whileInView="{ opacity: 1, y: 0 }"
		:transition="{ duration: 0.4 }"
		:viewport="{ once: true, margin: '50px' }"
	>
		<component :is="href ? 'a' : 'div'" :href="href" class="project-card__link">
			<!-- Image Container -->
			<div class="project-card__image-wrapper">
				<img :src="imageSrc" :alt="imageAlt || title" class="project-card__image" loading="lazy" />

				<!-- Overlay (nur bei variant="overlay") -->
				<div v-if="variant === 'overlay'" class="project-card__overlay">
					<div class="project-card__overlay-content">
						<Icon icon="tabler:arrow-right" class="project-card__overlay-icon" />
						<span class="project-card__overlay-text">Projekt ansehen</span>
					</div>
				</div>

				<!-- Category Badge -->
				<div class="project-card__category">{{ category }}</div>
			</div>

			<!-- Content -->
			<div class="project-card__content">
				<!-- Header -->
				<div class="project-card__header">
					<h3 class="project-card__title">{{ title }}</h3>
					<p v-if="description" class="project-card__description">{{ description }}</p>
				</div>

				<!-- Meta Information -->
				<div v-if="client || year || results" class="project-card__meta">
					<div v-if="client" class="project-card__meta-item">
						<Icon icon="tabler:building" class="project-card__meta-icon" />
						<span>{{ client }}</span>
					</div>
					<div v-if="year" class="project-card__meta-item">
						<Icon icon="tabler:calendar" class="project-card__meta-icon" />
						<span>{{ year }}</span>
					</div>
					<div v-if="results" class="project-card__meta-item project-card__meta-item--results">
						<Icon icon="tabler:trending-up" class="project-card__meta-icon" />
						<span>{{ results }}</span>
					</div>
				</div>

				<!-- Tags -->
				<div v-if="tags && tags.length > 0" class="project-card__tags">
					<span v-for="tag in tags" :key="tag" class="project-card__tag">
						{{ tag }}
					</span>
				</div>
			</div>
		</component>
	</motion.article>
</template>
