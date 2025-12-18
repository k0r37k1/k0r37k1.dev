<script setup lang="ts">
import { Icon } from '@iconify/vue';
import '@/styles/components/CTASection.css';

interface CTAButton {
	label: string;
	href: string;
	variant?: 'primary' | 'secondary';
	icon?: string;
}

interface Props {
	variant?: 'default' | 'centered' | 'split' | 'banner';
	title: string;
	description?: string;
	primaryCta?: CTAButton;
	secondaryCta?: CTAButton;
	imageSrc?: string;
	imageAlt?: string;
	background?: 'white' | 'gray' | 'gradient' | 'primary';
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	background: 'gradient',
});
</script>

<template>
	<div :class="['cta-section', `cta-section--${variant}`, `cta-section--bg-${background}`]">
		<div class="cta-section__container">
			<!-- Content -->
			<div class="cta-section__content">
				<h2 class="cta-section__title">{{ title }}</h2>
				<p v-if="description" class="cta-section__description">{{ description }}</p>

				<!-- CTAs -->
				<div v-if="primaryCta || secondaryCta" class="cta-section__buttons">
					<a
						v-if="primaryCta"
						:href="primaryCta.href"
						:class="[
							'cta-section__button',
							`cta-section__button--${primaryCta.variant || 'primary'}`,
						]"
					>
						<span>{{ primaryCta.label }}</span>
						<Icon v-if="primaryCta.icon" :icon="primaryCta.icon" class="cta-section__button-icon" />
					</a>
					<a
						v-if="secondaryCta"
						:href="secondaryCta.href"
						:class="[
							'cta-section__button',
							`cta-section__button--${secondaryCta.variant || 'secondary'}`,
						]"
					>
						<span>{{ secondaryCta.label }}</span>
						<Icon
							v-if="secondaryCta.icon"
							:icon="secondaryCta.icon"
							class="cta-section__button-icon"
						/>
					</a>
				</div>

				<!-- Slot for additional content -->
				<slot name="content" />
			</div>

			<!-- Image (for split variant) -->
			<div v-if="variant === 'split' && imageSrc" class="cta-section__image">
				<img :src="imageSrc" :alt="imageAlt || ''" loading="lazy" />
			</div>
		</div>

		<!-- Default Slot -->
		<slot />
	</div>
</template>
