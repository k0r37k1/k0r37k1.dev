<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { motion } from 'motion-v';
import '@/styles/components/ProcessTimeline.css';

interface ProcessStep {
	id: string;
	number: number;
	icon: string;
	title: string;
	description: string;
	duration?: string;
}

interface Props {
	steps: ProcessStep[];
	title?: string;
	description?: string;
	variant?: 'vertical' | 'horizontal';
}

const props = withDefaults(defineProps<Props>(), {
	title: 'So arbeiten wir',
	description: 'Unser bewährter Prozess in wenigen Schritten',
	variant: 'vertical',
});
</script>

<template>
	<div :class="['process-timeline', `process-timeline--${variant}`]">
		<!-- Header -->
		<div v-if="title || description" class="process-timeline__header">
			<h2 v-if="title" class="process-timeline__title">{{ title }}</h2>
			<p v-if="description" class="process-timeline__description">{{ description }}</p>
		</div>

		<!-- Timeline -->
		<div class="process-timeline__container">
			<motion.div
				v-for="(step, index) in steps"
				:key="step.id"
				:class="[
					'process-timeline__step',
					{ 'process-timeline__step--last': index === steps.length - 1 },
				]"
				:initial="{ opacity: 0, y: 20 }"
				:whileInView="{ opacity: 1, y: 0 }"
				:transition="{ duration: 0.4, delay: index * 0.1 }"
				:viewport="{ once: true, margin: '50px' }"
			>
				<!-- Step Number/Icon -->
				<div class="process-timeline__step-marker">
					<div class="process-timeline__step-icon">
						<Icon :icon="step.icon" class="process-timeline__icon-svg" />
					</div>
					<div class="process-timeline__step-number">{{ step.number }}</div>
				</div>

				<!-- Connector Line -->
				<div v-if="index < steps.length - 1" class="process-timeline__connector"></div>

				<!-- Content -->
				<div class="process-timeline__content">
					<div class="process-timeline__content-header">
						<h3 class="process-timeline__step-title">{{ step.title }}</h3>
						<span v-if="step.duration" class="process-timeline__step-duration">
							<Icon icon="tabler:clock" class="process-timeline__duration-icon" />
							{{ step.duration }}
						</span>
					</div>
					<p class="process-timeline__step-description">{{ step.description }}</p>
				</div>
			</motion.div>
		</div>

		<!-- Slot for additional content -->
		<slot />
	</div>
</template>
