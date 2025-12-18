<script setup lang="ts">
import { motion } from 'motion-v';

interface Props {
	title?: string;
	description?: string;
	image?: string;
	variant?: 'default' | 'bordered' | 'elevated' | 'flat';
	interactive?: boolean;
	href?: string;
	padding?: 'none' | 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	interactive: false,
	padding: 'md',
});

const componentTag = props.href ? 'a' : 'div';
</script>

<template>
	<!-- Motion wrapper for link card -->
	<motion.a
		v-if="href"
		:class="[
			'card',
			`card--${variant}`,
			`card--padding-${padding}`,
			'card--interactive',
		]"
		:href="href"
		:whileHover="{ y: -4, scale: 1.01 }"
		:transition="{ type: 'spring', stiffness: 300, damping: 20 }"
	>
		<img v-if="image" :src="image" alt="" role="presentation" class="card__image" />
		<div class="card__content">
			<h3 v-if="title" class="card__title">{{ title }}</h3>
			<p v-if="description" class="card__description">{{ description }}</p>
			<slot />
		</div>
	</motion.a>

	<!-- Motion wrapper for interactive card -->
	<motion.div
		v-else-if="interactive"
		:class="[
			'card',
			`card--${variant}`,
			`card--padding-${padding}`,
			'card--interactive',
		]"
		:whileHover="{ y: -4, scale: 1.01 }"
		:transition="{ type: 'spring', stiffness: 300, damping: 20 }"
	>
		<img v-if="image" :src="image" alt="" role="presentation" class="card__image" />
		<div class="card__content">
			<h3 v-if="title" class="card__title">{{ title }}</h3>
			<p v-if="description" class="card__description">{{ description }}</p>
			<slot />
		</div>
	</motion.div>

	<!-- Regular div for non-interactive card -->
	<div
		v-else
		:class="[
			'card',
			`card--${variant}`,
			`card--padding-${padding}`,
		]"
	>
		<img v-if="image" :src="image" alt="" role="presentation" class="card__image" />
		<div class="card__content">
			<h3 v-if="title" class="card__title">{{ title }}</h3>
			<p v-if="description" class="card__description">{{ description }}</p>
			<slot />
		</div>
	</div>
</template>
