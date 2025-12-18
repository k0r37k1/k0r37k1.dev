<script setup lang="ts">
import { Icon } from '@iconify/vue';

export interface SelectOption {
	value: string;
	label: string;
	disabled?: boolean;
}

interface Props {
	options: SelectOption[];
	modelValue?: string;
	placeholder?: string;
	label?: string;
	error?: string;
	disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	placeholder: 'Select an option...',
});

const emit = defineEmits<{
	'update:modelValue': [value: string];
}>();
</script>

<template>
	<div class="select-wrapper">
		<label v-if="label" class="select__label">{{ label }}</label>
		<SelectRoot
			v-bind="$attrs"
			:model-value="modelValue"
			:disabled="disabled"
			@update:model-value="emit('update:modelValue', $event)"
		>
			<SelectTrigger
				class="select__trigger"
				:class="{ 'select__trigger--error': error }"
				:aria-label="label || placeholder"
			>
				<SelectValue :placeholder="placeholder" />
				<SelectIcon class="select__icon">
					<Icon icon="tabler:chevron-down" />
				</SelectIcon>
			</SelectTrigger>

			<SelectPortal>
				<SelectContent class="select__content" position="popper" :side-offset="4">
					<SelectViewport class="select__viewport">
						<SelectItem
							v-for="option in options"
							:key="option.value"
							:value="option.value"
							:disabled="option.disabled"
							class="select__item"
						>
							<SelectItemText>{{ option.label }}</SelectItemText>
							<SelectItemIndicator class="select__indicator">
								<Icon icon="tabler:check" />
							</SelectItemIndicator>
						</SelectItem>
					</SelectViewport>
				</SelectContent>
			</SelectPortal>
		</SelectRoot>
		<span v-if="error" class="select__error">{{ error }}</span>
	</div>
</template>
