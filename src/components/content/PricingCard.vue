<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { motion } from 'motion-v';
import '@/styles/components/PricingCard.css';

interface Props {
	name: string;
	description?: string;
	price: string;
	priceLabel?: string;
	period?: string;
	features: string[];
	ctaText?: string;
	ctaHref?: string;
	highlighted?: boolean;
	badge?: string;
}

const props = withDefaults(defineProps<Props>(), {
	priceLabel: 'ab',
	period: '',
	ctaText: 'Jetzt buchen',
	highlighted: false,
});
</script>

<template>
	<motion.div
		:class="['pricing-card', { 'pricing-card--highlighted': highlighted }]"
		:initial="{ opacity: 0, y: 20 }"
		:whileInView="{ opacity: 1, y: 0 }"
		:transition="{ duration: 0.4 }"
		:viewport="{ once: true, margin: '50px' }"
	>
		<div class="pricing-card__inner">
			<!-- Badge (optional, e.g., "Beliebt", "Empfohlen") -->
			<div v-if="badge" class="pricing-card__badge">{{ badge }}</div>

			<!-- Header -->
			<div class="pricing-card__header">
				<h3 class="pricing-card__name">{{ name }}</h3>
				<p v-if="description" class="pricing-card__description">{{ description }}</p>
			</div>

			<!-- Price -->
			<div class="pricing-card__price">
				<span class="pricing-card__price-label">{{ priceLabel }}</span>
				<span class="pricing-card__price-value">{{ price }}</span>
				<span v-if="period" class="pricing-card__price-period">{{ period }}</span>
			</div>

			<!-- Features -->
			<ul class="pricing-card__features">
				<li v-for="(feature, index) in features" :key="index" class="pricing-card__feature">
					<Icon icon="tabler:check" class="pricing-card__feature-icon" />
					<span>{{ feature }}</span>
				</li>
			</ul>

			<!-- CTA Button -->
			<a
				v-if="ctaText && ctaHref"
				:href="ctaHref"
				:class="['pricing-card__cta', { 'pricing-card__cta--highlighted': highlighted }]"
			>
				{{ ctaText }}
				<Icon icon="tabler:arrow-right" class="pricing-card__cta-icon" />
			</a>
		</div>
	</motion.div>
</template>
