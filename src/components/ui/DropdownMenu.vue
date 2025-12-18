<script setup lang="ts">
import { Icon } from '@iconify/vue';
import '@/styles/components/DropdownMenu.css';

interface MenuItem {
	label: string;
	icon?: string;
	onClick?: () => void;
	disabled?: boolean;
	separator?: boolean;
}

interface Props {
	trigger: string;
	items: MenuItem[];
	side?: 'top' | 'right' | 'bottom' | 'left';
	align?: 'start' | 'center' | 'end';
	sideOffset?: number;
}

const props = withDefaults(defineProps<Props>(), {
	side: 'bottom',
	align: 'start',
	sideOffset: 4,
});

const handleSelect = (item: MenuItem) => {
	if (item.onClick && !item.disabled) {
		item.onClick();
	}
};
</script>

<template>
	<DropdownMenuRoot>
		<DropdownMenuTrigger class="dropdown__trigger">
			{{ trigger }}
			<Icon icon="tabler:chevron-down" class="dropdown__trigger-icon" />
		</DropdownMenuTrigger>

		<DropdownMenuPortal>
			<DropdownMenuContent
				:side="side"
				:align="align"
				:side-offset="sideOffset"
				class="dropdown__content"
			>
				<template v-for="(item, index) in items" :key="index">
					<DropdownMenuSeparator v-if="item.separator" class="dropdown__separator" />

					<DropdownMenuItem
						v-else
						:disabled="item.disabled"
						class="dropdown__item"
						@select="handleSelect(item)"
					>
						<Icon v-if="item.icon" :icon="item.icon" class="dropdown__item-icon" />
						{{ item.label }}
					</DropdownMenuItem>
				</template>
			</DropdownMenuContent>
		</DropdownMenuPortal>
	</DropdownMenuRoot>
</template>
