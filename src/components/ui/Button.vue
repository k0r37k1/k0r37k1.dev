<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { motion } from 'motion-v';

interface Props {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger';
	size?: 'sm' | 'md' | 'lg';
	fullWidth?: boolean;
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
	href?: string;
	icon?: string;
	iconPosition?: 'left' | 'right';
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'primary',
	size: 'md',
	fullWidth: false,
	disabled: false,
	type: 'button',
	iconPosition: 'left',
});

const componentTag = props.href ? 'a' : 'button';
</script>

<template>
	<!-- Motion wrapper for button -->
	<motion.button
		v-if="!href"
		:class="[
			'button',
			`button--${variant}`,
			`button--${size}`,
			{ 'button--full-width': fullWidth, 'button--disabled': disabled },
		]"
		:type="type"
		:disabled="disabled"
		:aria-disabled="disabled"
		:whileHover="!disabled ? { y: -2, scale: 1.02 } : undefined"
		:whileTap="!disabled ? { y: 0, scale: 0.98 } : undefined"
		:transition="{ type: 'spring', stiffness: 400, damping: 17 }"
	>
		<Icon
			v-if="icon && iconPosition === 'left'"
			:icon="icon"
			class="button__icon button__icon--left"
		/>
		<span class="button__text">
			<slot />
		</span>
		<Icon
			v-if="icon && iconPosition === 'right'"
			:icon="icon"
			class="button__icon button__icon--right"
		/>
	</motion.button>

	<!-- Motion wrapper for link -->
	<motion.a
		v-else
		role="button"
		:class="[
			'button',
			`button--${variant}`,
			`button--${size}`,
			{ 'button--full-width': fullWidth, 'button--disabled': disabled },
		]"
		:href="href"
		:aria-disabled="disabled"
		:whileHover="!disabled ? { y: -2, scale: 1.02 } : undefined"
		:whileTap="!disabled ? { y: 0, scale: 0.98 } : undefined"
		:transition="{ type: 'spring', stiffness: 400, damping: 17 }"
	>
		<Icon
			v-if="icon && iconPosition === 'left'"
			:icon="icon"
			class="button__icon button__icon--left"
			aria-hidden="true"
		/>
		<span class="button__text">
			<slot />
		</span>
		<Icon
			v-if="icon && iconPosition === 'right'"
			:icon="icon"
			class="button__icon button__icon--right"
			aria-hidden="true"
		/>
	</motion.a>
</template>
