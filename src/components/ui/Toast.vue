<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import '@/styles/components/Toast.css';

interface Props {
	title?: string;
	description?: string;
	variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
	duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	duration: 5000,
});

const iconMap = {
	default: 'tabler:bell',
	success: 'tabler:circle-check',
	error: 'tabler:alert-circle',
	warning: 'tabler:alert-triangle',
	info: 'tabler:info-circle',
};

const open = ref(false);

const showToast = () => {
	open.value = true;
};
</script>

<template>
	<ToastProvider :duration="duration">
		<!-- Trigger slot -->
		<div @click="showToast">
			<slot name="trigger" />
		</div>

		<!-- Toast notification -->
		<ToastRoot v-model:open="open" :class="['toast', `toast--${variant}`]">
			<div class="toast__content">
				<Icon :icon="iconMap[variant]" class="toast__icon" />
				<div class="toast__text">
					<ToastTitle v-if="title" class="toast__title">{{ title }}</ToastTitle>
					<ToastDescription v-if="description" class="toast__description">
						{{ description }}
					</ToastDescription>
					<slot name="content" />
				</div>
			</div>
			<ToastClose class="toast__close">
				<Icon icon="tabler:x" />
			</ToastClose>
		</ToastRoot>
		<ToastViewport class="toast__viewport" />
	</ToastProvider>
</template>
