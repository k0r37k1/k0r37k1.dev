<script setup lang="ts">
import { Icon } from '@iconify/vue';
import '@/styles/components/FAQSection.css';

interface FAQItem {
	question: string;
	answer: string;
}

interface Props {
	title?: string;
	description?: string;
	items: FAQItem[];
}

const props = withDefaults(defineProps<Props>(), {
	title: 'Häufig gestellte Fragen',
	description: 'Finden Sie Antworten auf die wichtigsten Fragen',
});
</script>

<template>
	<div class="faq-section">
		<!-- Header -->
		<div v-if="title || description" class="faq-section__header">
			<h2 v-if="title" class="faq-section__title">{{ title }}</h2>
			<p v-if="description" class="faq-section__description">{{ description }}</p>
		</div>

		<!-- FAQ Accordion -->
		<AccordionRoot class="faq-section__accordion" type="single" collapsible>
			<AccordionItem
				v-for="(item, index) in items"
				:key="index"
				:value="`item-${index}`"
				class="faq-section__item"
			>
				<AccordionHeader class="faq-section__item-header">
					<AccordionTrigger class="faq-section__trigger">
						<span class="faq-section__question">{{ item.question }}</span>
						<Icon icon="tabler:chevron-down" class="faq-section__icon" />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent class="faq-section__content">
					<div class="faq-section__answer">{{ item.answer }}</div>
				</AccordionContent>
			</AccordionItem>
		</AccordionRoot>

		<!-- Slot for additional content -->
		<slot />
	</div>
</template>
