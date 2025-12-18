<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

interface Props {
	title: string;
	defaultOpen?: boolean;
	disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	defaultOpen: false,
	disabled: false,
});

const open = ref(props.defaultOpen);
</script>

<template>
	<CollapsibleRoot v-model:open="open" :disabled="disabled" class="collapsible">
		<CollapsibleTrigger class="collapsible__trigger">
			<span class="collapsible__title">{{ title }}</span>
			<Icon icon="tabler:chevron-down" class="collapsible__icon" />
		</CollapsibleTrigger>

		<CollapsibleContent class="collapsible__content">
			<div class="collapsible__content-inner">
				<slot />
			</div>
		</CollapsibleContent>
	</CollapsibleRoot>
</template>
