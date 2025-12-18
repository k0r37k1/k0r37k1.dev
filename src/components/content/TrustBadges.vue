<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { motion } from 'motion-v';
import '@/styles/components/TrustBadges.css';

interface Badge {
	id: string;
	type: 'logo' | 'icon' | 'text' | 'stat';
	label: string;
	value?: string;
	imageSrc?: string;
	imageAlt?: string;
	icon?: string;
	link?: string;
}

interface Props {
	badges: Badge[];
	title?: string;
	variant?: 'default' | 'minimal' | 'grid';
	alignment?: 'left' | 'center' | 'right';
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	alignment: 'center',
});
</script>

<template>
	<div :class="['trust-badges', `trust-badges--${variant}`, `trust-badges--${alignment}`]">
		<!-- Title -->
		<h3 v-if="title" class="trust-badges__title">{{ title }}</h3>

		<!-- Badges Container -->
		<div class="trust-badges__container">
			<motion.div
				v-for="(badge, index) in badges"
				:key="badge.id"
				:class="['trust-badges__badge', `trust-badges__badge--${badge.type}`]"
				:initial="{ opacity: 0, scale: 0.9 }"
				:whileInView="{ opacity: 1, scale: 1 }"
				:transition="{ duration: 0.3, delay: index * 0.05 }"
				:viewport="{ once: true, margin: '100px' }"
			>
				<component
					:is="badge.link ? 'a' : 'div'"
					:href="badge.link"
					:target="badge.link ? '_blank' : undefined"
					:rel="badge.link ? 'noopener noreferrer' : undefined"
					class="trust-badges__badge-inner"
				>
					<!-- Logo Type -->
					<img
						v-if="badge.type === 'logo' && badge.imageSrc"
						:src="badge.imageSrc"
						:alt="badge.imageAlt || badge.label"
						class="trust-badges__logo"
						loading="lazy"
					/>

					<!-- Icon Type -->
					<div v-if="badge.type === 'icon'" class="trust-badges__icon-wrapper">
						<Icon v-if="badge.icon" :icon="badge.icon" class="trust-badges__icon" />
						<span class="trust-badges__label">{{ badge.label }}</span>
					</div>

					<!-- Text Type -->
					<div v-if="badge.type === 'text'" class="trust-badges__text-wrapper">
						<span class="trust-badges__label">{{ badge.label }}</span>
						<span v-if="badge.value" class="trust-badges__value">{{ badge.value }}</span>
					</div>

					<!-- Stat Type -->
					<div v-if="badge.type === 'stat'" class="trust-badges__stat-wrapper">
						<div class="trust-badges__stat-value">{{ badge.value }}</div>
						<div class="trust-badges__stat-label">{{ badge.label }}</div>
					</div>
				</component>
			</motion.div>
		</div>
	</div>
</template>
