<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import '@/styles/components/Popover.css';

interface Props {
	trigger: string;
	side?: 'top' | 'right' | 'bottom' | 'left';
	align?: 'start' | 'center' | 'end';
	sideOffset?: number;
	showArrow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	side: 'bottom',
	align: 'center',
	sideOffset: 8,
	showArrow: false,
});

const open = ref(false);
</script>

<template>
	<PopoverRoot v-model:open="open">
		<PopoverTrigger class="popover__trigger">
			{{ trigger }}
		</PopoverTrigger>

		<PopoverPortal>
			<PopoverContent
				:side="side"
				:align="align"
				:side-offset="sideOffset"
				class="popover__content"
			>
				<slot />

				<PopoverArrow v-if="showArrow" class="popover__arrow" />

				<PopoverClose class="popover__close" aria-label="Close">
					<Icon icon="tabler:x" />
				</PopoverClose>
			</PopoverContent>
		</PopoverPortal>
	</PopoverRoot>
</template>
