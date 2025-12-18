<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface Props {
	modelValue?: boolean;
	defaultValue?: boolean;
	disabled?: boolean;
	icon?: string;
	variant?: 'default' | 'outline';
}

const props = withDefaults(defineProps<Props>(), {
	disabled: false,
	variant: 'default',
});

const emit = defineEmits<{
	'update:modelValue': [value: boolean];
}>();
</script>

<template>
	<ToggleRoot
		:model-value="modelValue"
		:default-value="defaultValue"
		:disabled="disabled"
		class="toggle"
		:class="[`toggle--${variant}`, { 'toggle--disabled': disabled }]"
		@update:model-value="emit('update:modelValue', $event)"
	>
		<Icon v-if="icon" :icon="icon" class="toggle__icon" />
		<slot />
	</ToggleRoot>
</template>
