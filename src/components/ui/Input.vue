<script setup lang="ts">
import { computed, useAttrs } from 'vue';

interface Props {
	modelValue?: string | number;
	type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
	placeholder?: string;
	label?: string;
	error?: string;
	disabled?: boolean;
	required?: boolean;
	id?: string;
}

const props = withDefaults(defineProps<Props>(), {
	type: 'text',
});

const emit = defineEmits<{
	'update:modelValue': [value: string];
}>();

const attrs = useAttrs();

// Generate aria-label from label prop if available
const ariaLabel = computed(() => {
	// If aria-label is passed via $attrs, don't override it
	if ('aria-label' in attrs) return undefined;
	// Use label prop if available
	return props.label;
});
</script>

<template>
	<div class="input-wrapper">
		<label v-if="label" :for="id" class="input__label">
			{{ label }}
			<span v-if="required" class="input__required">*</span>
		</label>
		<input
			v-bind="$attrs"
			:id="id"
			:type="type"
			:value="modelValue"
			:placeholder="placeholder"
			:disabled="disabled"
			:required="required"
			:aria-invalid="!!error"
			:aria-label="ariaLabel"
			class="input"
			:class="{ 'input--error': error, 'input--disabled': disabled }"
			@input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
		/>
		<span v-if="error" class="input__error">{{ error }}</span>
	</div>
</template>
