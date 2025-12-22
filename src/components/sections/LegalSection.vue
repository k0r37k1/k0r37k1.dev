<script setup lang="ts">
import { motion } from 'motion-v';
</script>

<template>
	<motion.section
		:initial="{ opacity: 0, y: 20, scale: 0.98 }"
		:whileInView="{ opacity: 1, y: 0, scale: 1 }"
		:transition="{
			type: 'spring',
			stiffness: 200,
			damping: 20,
			duration: 0.4,
		}"
		:viewport="{ once: true, margin: '-100px' }"
		class="terminal-section section-with-corners"
	>
		<slot />
	</motion.section>
</template>
