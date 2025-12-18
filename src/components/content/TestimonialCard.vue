<script setup lang="ts">
import '@/styles/components/TestimonialCard.css';

interface Props {
	quote: string;
	author: string;
	role?: string;
	company?: string;
	avatarSrc?: string;
	rating?: number;
}

const props = withDefaults(defineProps<Props>(), {
	rating: 5,
});
</script>

<template>
	<div class="testimonial-card">
		<!-- Rating Stars -->
		<div v-if="rating" class="testimonial-card__rating">
			<span
				v-for="star in 5"
				:key="star"
				class="testimonial-card__star"
				:class="{ 'testimonial-card__star--filled': star <= rating }"
			>
				★
			</span>
		</div>

		<!-- Quote -->
		<blockquote class="testimonial-card__quote">"{{ quote }}"</blockquote>

		<!-- Author Info -->
		<div class="testimonial-card__author">
			<!-- Avatar -->
			<div class="testimonial-card__avatar">
				<img v-if="avatarSrc" :src="avatarSrc" :alt="author" loading="lazy" />
				<div v-else class="testimonial-card__avatar-placeholder">
					{{ author.charAt(0).toUpperCase() }}
				</div>
			</div>

			<!-- Author Details -->
			<div class="testimonial-card__author-info">
				<div class="testimonial-card__author-name">{{ author }}</div>
				<div v-if="role || company" class="testimonial-card__author-meta">
					<span v-if="role">{{ role }}</span>
					<span v-if="role && company"> • </span>
					<span v-if="company">{{ company }}</span>
				</div>
			</div>
		</div>

		<!-- Slot for additional content -->
		<slot />
	</div>
</template>
