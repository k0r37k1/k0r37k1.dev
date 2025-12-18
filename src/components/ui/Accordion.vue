<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface AccordionItem {
	value: string;
	title: string;
	content: string;
}

interface Props {
	items: AccordionItem[];
	type?: 'single' | 'multiple';
	defaultValue?: string | string[];
}

const props = withDefaults(defineProps<Props>(), {
	type: 'single',
});
</script>

<template>
	<AccordionRoot :type="type" :default-value="defaultValue" class="accordion">
		<AccordionItem
			v-for="item in items"
			:key="item.value"
			:value="item.value"
			class="accordion__item"
		>
			<AccordionHeader class="accordion__header">
				<AccordionTrigger class="accordion__trigger">
					<span class="accordion__trigger-text">{{ item.title }}</span>
					<Icon icon="tabler:chevron-down" class="accordion__icon" />
				</AccordionTrigger>
			</AccordionHeader>
			<AccordionContent class="accordion__content">
				<div class="accordion__content-inner">
					{{ item.content }}
				</div>
			</AccordionContent>
		</AccordionItem>
	</AccordionRoot>
</template>
