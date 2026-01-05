<script setup lang="ts">
import { motion } from 'motion-v';
import { computed } from 'vue';
import { useReducedMotion, getMotionConfig } from '@/composables/useReducedMotion';

const { prefersReducedMotion } = useReducedMotion();
const motionConfig = computed(() => getMotionConfig(prefersReducedMotion.value));
</script>

<template>
	<motion.section v-bind="motionConfig" class="motion terminal-section section-with-corners">
		<slot />
	</motion.section>
</template>
