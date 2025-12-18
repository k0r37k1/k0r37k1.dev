<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { motion } from 'motion-v';
import '@/styles/components/PhoneButton.css';

interface Props {
	phoneNumber: string;
	label?: string;
	showLabel?: boolean;
	variant?: 'default' | 'outline' | 'minimal';
	size?: 'sm' | 'md' | 'lg';
	fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	label: 'Jetzt anrufen',
	showLabel: true,
	variant: 'default',
	size: 'md',
	fullWidth: false,
});

// Format phone number for display
const formattedPhone = props.phoneNumber;

// Generate tel: URL
const telUrl = `tel:${props.phoneNumber.replace(/\s/g, '')}`;
</script>

<template>
	<motion.a
		:href="telUrl"
		:class="[
			'phone-btn',
			`phone-btn--${variant}`,
			`phone-btn--${size}`,
			{ 'phone-btn--full-width': fullWidth },
		]"
		:aria-label="`${label}: ${formattedPhone}`"
		:whileHover="{ scale: 1.02 }"
		:whileTap="{ scale: 0.98 }"
		:transition="{ type: 'spring', stiffness: 400, damping: 17 }"
	>
		<!-- Icon -->
		<Icon icon="tabler:phone" class="phone-btn__icon" />

		<!-- Content -->
		<span v-if="showLabel" class="phone-btn__content">
			<span class="phone-btn__label">{{ label }}</span>
			<span class="phone-btn__number">{{ formattedPhone }}</span>
		</span>
	</motion.a>
</template>
