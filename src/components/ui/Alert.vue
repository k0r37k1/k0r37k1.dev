<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

interface Props {
	variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
	title?: string;
	description?: string;
	dismissible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
	dismissible: false,
});

const emit = defineEmits<{
	dismiss: [];
}>();

const iconMap = {
	default: 'tabler:info-circle',
	success: 'tabler:circle-check',
	warning: 'tabler:alert-triangle',
	error: 'tabler:alert-circle',
	info: 'tabler:info-circle',
};

const icon = computed(() => iconMap[props.variant]);
</script>

<template>
	<div class="alert" :class="`alert--${variant}`" role="alert">
		<Icon :icon="icon" class="alert__icon" />
		<div class="alert__content">
			<h3 v-if="title" class="alert__title">{{ title }}</h3>
			<div class="alert__description">
				<template v-if="description">{{ description }}</template>
				<slot v-else />
			</div>
		</div>
		<button
			v-if="dismissible"
			class="alert__dismiss"
			aria-label="Dismiss alert"
			@click="emit('dismiss')"
		>
			<Icon icon="tabler:x" />
		</button>
	</div>
</template>
