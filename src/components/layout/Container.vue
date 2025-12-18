<script setup lang="ts">
interface Props {
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
	noPadding?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	size: 'lg',
	noPadding: false,
});
</script>

<template>
	<div :class="['container', `container--${size}`, { 'container--no-padding': noPadding }]">
		<slot />
	</div>
</template>
