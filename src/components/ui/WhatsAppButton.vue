<script setup lang="ts">
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { motion } from 'motion-v';
import '@/styles/components/WhatsAppButton.css';

interface Props {
	phoneNumber: string;
	message?: string;
	label?: string;
	showLabel?: boolean;
	position?: 'bottom-right' | 'bottom-left';
	size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
	message: 'Hallo! Ich habe eine Frage.',
	label: 'Chat mit uns',
	showLabel: true,
	position: 'bottom-right',
	size: 'md',
});

const isHovered = ref(false);

// Generate WhatsApp URL
const whatsappUrl = computed(() => {
	const phone = props.phoneNumber.replace(/\D/g, ''); // Remove non-digits
	const encodedMessage = encodeURIComponent(props.message);
	return `https://wa.me/${phone}?text=${encodedMessage}`;
});

// Size classes
const sizeClasses = computed(() => {
	const sizes = {
		sm: 'whatsapp-btn--sm',
		md: 'whatsapp-btn--md',
		lg: 'whatsapp-btn--lg',
	};
	return sizes[props.size];
});
</script>

<template>
	<motion.div
		:class="['whatsapp-btn', `whatsapp-btn--${position}`, sizeClasses]"
		:initial="{ scale: 0, opacity: 0 }"
		:animate="{ scale: 1, opacity: 1 }"
		:transition="{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }"
	>
		<motion.a
			:href="whatsappUrl"
			target="_blank"
			rel="noopener noreferrer"
			class="whatsapp-btn__link"
			:aria-label="label"
			@mouseenter="isHovered = true"
			@mouseleave="isHovered = false"
			:whileHover="{ scale: 1.05 }"
			:whileTap="{ scale: 0.95 }"
		>
			<!-- Icon -->
			<div class="whatsapp-btn__icon">
				<Icon icon="tabler:brand-whatsapp" class="whatsapp-btn__icon-svg" />
			</div>

			<!-- Label (slides in on hover) -->
			<motion.span
				v-if="showLabel"
				class="whatsapp-btn__label"
				:initial="{ width: 0, opacity: 0 }"
				:animate="{ width: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }"
				:transition="{ duration: 0.2 }"
			>
				{{ label }}
			</motion.span>

			<!-- Pulse Animation (when not hovered) -->
			<span v-if="!isHovered" class="whatsapp-btn__pulse"></span>
		</motion.a>
	</motion.div>
</template>
