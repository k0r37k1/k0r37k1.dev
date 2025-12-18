<script setup lang="ts">
interface Props {
	orientation?: 'horizontal' | 'vertical';
	decorative?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	orientation: 'horizontal',
	decorative: true,
});
</script>

<template>
	<div
		:data-orientation="orientation"
		:role="decorative ? 'none' : 'separator'"
		:aria-orientation="decorative ? undefined : orientation"
		class="separator"
		:class="`separator--${orientation}`"
	/>
</template>
