<script setup lang="ts">
import { Icon } from '@iconify/vue';

export interface RadioOption {
	value: string;
	label: string;
	disabled?: boolean;
}

interface Props {
	options: RadioOption[];
	modelValue?: string;
	label?: string;
	orientation?: 'horizontal' | 'vertical';
	disabled?: boolean;
	required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	orientation: 'vertical',
	disabled: false,
	required: false,
});

const emit = defineEmits<{
	'update:modelValue': [value: string];
}>();
</script>

<template>
	<div class="radio-group-wrapper">
		<label v-if="label" class="radio-group__label">
			{{ label }}
			<span v-if="required" class="radio-group__required">*</span>
		</label>

		<RadioGroupRoot
			:model-value="modelValue"
			:orientation="orientation"
			:disabled="disabled"
			:required="required"
			class="radio-group"
			:class="{ 'radio-group--horizontal': orientation === 'horizontal' }"
			@update:model-value="emit('update:modelValue', $event)"
		>
			<div v-for="option in options" :key="option.value" class="radio-item-wrapper">
				<RadioGroupItem
					:value="option.value"
					:disabled="option.disabled || disabled"
					class="radio-item"
					:class="{ 'radio-item--disabled': option.disabled || disabled }"
					:aria-label="option.label"
				>
					<RadioGroupIndicator class="radio-indicator">
						<Icon icon="tabler:circle-filled" class="radio-icon" />
					</RadioGroupIndicator>
				</RadioGroupItem>
				<label
					class="radio-label"
					:class="{ 'radio-label--disabled': option.disabled || disabled }"
				>
					{{ option.label }}
				</label>
			</div>
		</RadioGroupRoot>
	</div>
</template>
