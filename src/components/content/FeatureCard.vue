<script setup lang="ts">
import { Icon } from '@iconify/vue';
import '@/styles/components/FeatureCard.css';

interface Props {
	icon?: string;
	iconColor?: string;
	title: string;
	description: string;
	href?: string;
	linkText?: string;
}

const props = withDefaults(defineProps<Props>(), {
	iconColor: 'rgb(217 102 155)',
	linkText: 'Mehr erfahren',
});
</script>

<template>
	<div :class="['feature-card', { 'feature-card--interactive': href }]">
		<!-- Icon -->
		<div v-if="icon" class="feature-card__icon" :style="{ color: iconColor }">
			<Icon :icon="icon" />
		</div>

		<!-- Content -->
		<h3 class="feature-card__title">{{ title }}</h3>
		<p class="feature-card__description">{{ description }}</p>

		<!-- Link -->
		<a v-if="href" :href="href" class="feature-card__link" :aria-label="`${linkText} - ${title}`">
			<span>{{ linkText }}</span>
			<Icon icon="tabler:arrow-right" class="feature-card__link-icon" aria-hidden="true" />
		</a>

		<!-- Slot for custom content -->
		<slot />
	</div>
</template>
