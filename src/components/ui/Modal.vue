<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import {
	DialogRoot,
	DialogPortal,
	DialogOverlay,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogClose,
} from 'reka-ui';
import '@/styles/components/Modal.css';

interface Props {
	title?: string;
	description?: string;
	size?: 'sm' | 'md' | 'lg' | 'xl';
}

const props = withDefaults(defineProps<Props>(), {
	size: 'md',
});

// Internal state for demo/standalone usage
const internalOpen = ref(false);
</script>

<template>
	<DialogRoot v-model:open="internalOpen">
		<!-- Trigger wrapper -->
		<div @click="internalOpen = true">
			<slot name="trigger" />
		</div>

		<DialogPortal>
			<DialogOverlay class="modal__overlay" />
			<DialogContent :class="['modal__content', `modal__content--${size}`]">
				<!-- Header -->
				<div v-if="title || description" class="modal__header">
					<DialogTitle v-if="title" class="modal__title">{{ title }}</DialogTitle>
					<DialogDescription v-if="description" class="modal__description">
						{{ description }}
					</DialogDescription>
				</div>

				<!-- Body -->
				<div class="modal__body">
					<slot name="content" />
				</div>

				<!-- Footer Slot -->
				<div v-if="$slots.footer" class="modal__footer">
					<slot name="footer" />
				</div>

				<!-- Close Button -->
				<DialogClose class="modal__close" aria-label="Schließen">
					<Icon icon="tabler:x" />
				</DialogClose>
			</DialogContent>
		</DialogPortal>
	</DialogRoot>
</template>
