<script setup lang="ts">
interface Props {
	htmlFor?: string;
	required?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
	<LabelRoot :for="htmlFor" class="label">
		<slot />
		<span v-if="required" class="label__required">*</span>
	</LabelRoot>
</template>
