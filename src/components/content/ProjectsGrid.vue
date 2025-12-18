<script setup lang="ts">
import { ref, computed } from 'vue';
import ProjectCard from '@components/content/ProjectCard.vue';

interface Project {
	id: string;
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
}

interface Props {
	projects: Project[];
	title?: string;
	description?: string;
	showFilter?: boolean;
	columns?: 2 | 3 | 4;
	variant?: 'default' | 'overlay' | 'minimal';
}

const props = withDefaults(defineProps<Props>(), {
	title: 'Unsere Projekte',
	description: 'Eine Auswahl unserer erfolgreich umgesetzten Projekte',
	showFilter: true,
	columns: 3,
	variant: 'default',
});

// Filter State
const selectedCategory = ref<string>('all');

// Get unique categories
const categories = computed(() => {
	const cats = new Set(props.projects.map((p) => p.category));
	return ['all', ...Array.from(cats)];
});

// Filtered projects
const filteredProjects = computed(() => {
	if (selectedCategory.value === 'all') {
		return props.projects;
	}
	return props.projects.filter((p) => p.category === selectedCategory.value);
});

// Category labels (German)
const categoryLabels: Record<string, string> = {
	all: 'Alle',
	webdesign: 'Webdesign',
	development: 'Entwicklung',
	ecommerce: 'E-Commerce',
	branding: 'Branding',
	marketing: 'Marketing',
	seo: 'SEO',
	consulting: 'Beratung',
};

const getCategoryLabel = (cat: string) => {
	return categoryLabels[cat.toLowerCase()] || cat;
};
</script>

<template>
	<div class="projects-grid">
		<!-- Header -->
		<div v-if="title || description" class="projects-grid__header">
			<h2 v-if="title" class="projects-grid__title">{{ title }}</h2>
			<p v-if="description" class="projects-grid__description">{{ description }}</p>
		</div>

		<!-- Filter -->
		<div v-if="showFilter && categories.length > 1" class="projects-grid__filter">
			<button
				v-for="category in categories"
				:key="category"
				:class="[
					'projects-grid__filter-btn',
					{ 'projects-grid__filter-btn--active': selectedCategory === category },
				]"
				:aria-label="`Filter: ${getCategoryLabel(category)}`"
				:aria-pressed="selectedCategory === category"
				@click="selectedCategory = category"
			>
				{{ getCategoryLabel(category) }}
			</button>
		</div>

		<!-- Grid -->
		<div :class="['projects-grid__grid', `projects-grid__grid--${columns}-cols`]" role="list">
			<ProjectCard
				v-for="project in filteredProjects"
				:key="project.id"
				v-bind="project"
				:variant="variant"
				role="listitem"
			/>
		</div>

		<!-- Empty State -->
		<div v-if="filteredProjects.length === 0" class="projects-grid__empty">
			<p>Keine Projekte in dieser Kategorie gefunden.</p>
		</div>

		<!-- Slot for additional content -->
		<slot />
	</div>
</template>
