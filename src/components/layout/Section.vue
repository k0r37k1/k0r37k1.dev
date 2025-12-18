<script setup lang="ts">
interface Props {
	spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
	background?: 'white' | 'gray' | 'gradient' | 'none';
}

const props = withDefaults(defineProps<Props>(), {
	spacing: 'md',
	background: 'none',
});
</script>

<template>
	<section
		:class="[
			'section',
			`section--spacing-${spacing}`,
			background !== 'none' && `section--bg-${background}`,
		]"
	>
		<slot />
	</section>
</template>
