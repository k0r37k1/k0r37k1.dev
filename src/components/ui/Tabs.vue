<script setup lang="ts">
export interface TabItem {
	value: string;
	label: string;
	disabled?: boolean;
}

interface Props {
	items: TabItem[];
	defaultValue?: string;
	orientation?: 'horizontal' | 'vertical';
}

const props = withDefaults(defineProps<Props>(), {
	orientation: 'horizontal',
});
</script>

<template>
	<TabsRoot
		:class="['tabs', `tabs--${orientation}`]"
		:default-value="defaultValue || items[0]?.value"
	>
		<TabsList :class="['tabs__list', `tabs__list--${orientation}`]">
			<TabsTrigger
				v-for="item in items"
				:key="item.value"
				:value="item.value"
				:disabled="item.disabled"
				class="tabs__trigger"
			>
				{{ item.label }}
			</TabsTrigger>
		</TabsList>

		<TabsContent
			v-for="item in items"
			:key="`content-${item.value}`"
			:value="item.value"
			class="tabs__content"
		>
			<slot :name="item.value" />
		</TabsContent>
	</TabsRoot>
</template>
