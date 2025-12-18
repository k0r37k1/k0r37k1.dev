<script setup lang="ts">
interface Props {
	modelValue?: boolean;
	label?: string;
	disabled?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	'update:modelValue': [value: boolean];
}>();
</script>

<template>
	<div class="switch-wrapper">
		<SwitchRoot
			:checked="modelValue"
			:disabled="disabled"
			class="switch"
			:class="{ 'switch--disabled': disabled }"
			:aria-label="label || 'Toggle switch'"
			@update:checked="emit('update:modelValue', $event)"
		>
			<SwitchThumb class="switch__thumb" />
		</SwitchRoot>
		<label v-if="label" class="switch__label" :class="{ 'switch__label--disabled': disabled }">
			{{ label }}
		</label>
	</div>
</template>
