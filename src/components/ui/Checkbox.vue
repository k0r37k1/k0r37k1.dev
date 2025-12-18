<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

interface Props {
	modelValue?: boolean;
	label?: string;
	disabled?: boolean;
	id?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	'update:modelValue': [value: boolean];
}>();

const checkboxId = computed(
	() => props.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`
);
</script>

<template>
	<div class="checkbox-wrapper">
		<CheckboxRoot
			:id="checkboxId"
			:checked="modelValue"
			:disabled="disabled"
			class="checkbox"
			:class="{ 'checkbox--disabled': disabled }"
			@update:checked="emit('update:modelValue', $event)"
		>
			<CheckboxIndicator class="checkbox__indicator">
				<Icon icon="tabler:check" class="checkbox__icon" />
			</CheckboxIndicator>
		</CheckboxRoot>
		<label
			v-if="label"
			:for="checkboxId"
			class="checkbox__label"
			:class="{ 'checkbox__label--disabled': disabled }"
		>
			{{ label }}
		</label>
	</div>
</template>
