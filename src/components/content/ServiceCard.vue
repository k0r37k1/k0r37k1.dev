<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { motion } from 'motion-v';
import '@/styles/components/ServiceCard.css';

interface Props {
	icon: string;
	title: string;
	description: string;
	price?: string;
	priceLabel?: string;
	features?: string[];
	ctaText?: string;
	ctaHref?: string;
	variant?: 'default' | 'bordered' | 'elevated';
	iconColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	priceLabel: 'ab',
	ctaText: 'Mehr erfahren',
});
</script>

<template>
	<motion.div
		:class="['service-card', `service-card--${variant}`]"
		:initial="{ opacity: 0, y: 20 }"
		:whileInView="{ opacity: 1, y: 0 }"
		:transition="{ duration: 0.4 }"
		:viewport="{ once: true, margin: '50px' }"
	>
		<motion.div
			:whileHover="{ scale: 1.02 }"
			:transition="{ type: 'spring', stiffness: 400, damping: 17 }"
			class="service-card__inner"
		>
			<!-- Icon -->
			<div class="service-card__icon-wrapper">
				<div class="service-card__icon" :style="iconColor ? { color: iconColor } : undefined">
					<Icon :icon="icon" class="service-card__icon-svg" />
				</div>
			</div>

			<!-- Header -->
			<div class="service-card__header">
				<h3 class="service-card__title">{{ title }}</h3>
				<p class="service-card__description">{{ description }}</p>
			</div>

			<!-- Price (optional) -->
			<div v-if="price" class="service-card__price">
				<span class="service-card__price-label">{{ priceLabel }}</span>
				<span class="service-card__price-value">{{ price }}</span>
			</div>

			<!-- Features List (optional) -->
			<ul v-if="features && features.length > 0" class="service-card__features">
				<li v-for="(feature, index) in features" :key="index" class="service-card__feature">
					<Icon icon="tabler:check" class="service-card__feature-icon" />
					<span>{{ feature }}</span>
				</li>
			</ul>

			<!-- CTA Button (optional) -->
			<a v-if="ctaText && ctaHref" :href="ctaHref" class="service-card__cta">
				{{ ctaText }}
				<Icon icon="tabler:arrow-right" class="service-card__cta-icon" />
			</a>

			<!-- Slot for custom content -->
			<slot />
		</motion.div>
	</motion.div>
</template>
