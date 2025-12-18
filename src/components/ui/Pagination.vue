<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface Props {
	total: number;
	itemsPerPage: number;
	siblingCount?: number;
	showEdges?: boolean;
	defaultPage?: number;
}

const props = withDefaults(defineProps<Props>(), {
	siblingCount: 1,
	showEdges: false,
	defaultPage: 1,
});
</script>

<template>
	<PaginationRoot
		:total="total"
		:items-per-page="itemsPerPage"
		:sibling-count="siblingCount"
		:show-edges="showEdges"
		:default-page="defaultPage"
		class="pagination"
		aria-label="Page navigation"
	>
		<PaginationList v-slot="{ items }" class="pagination__list">
			<PaginationFirst class="pagination__button">
				<Icon icon="tabler:chevrons-left" />
			</PaginationFirst>

			<PaginationPrev class="pagination__button">
				<Icon icon="tabler:chevron-left" />
			</PaginationPrev>

			<template v-for="(page, index) in items" :key="index">
				<PaginationListItem
					v-if="page.type === 'page'"
					:value="page.value"
					class="pagination__item"
				>
					{{ page.value }}
				</PaginationListItem>

				<PaginationEllipsis v-else :index="index" class="pagination__ellipsis">
					<Icon icon="tabler:dots" />
				</PaginationEllipsis>
			</template>

			<PaginationNext class="pagination__button">
				<Icon icon="tabler:chevron-right" />
			</PaginationNext>

			<PaginationLast class="pagination__button">
				<Icon icon="tabler:chevrons-right" />
			</PaginationLast>
		</PaginationList>
	</PaginationRoot>
</template>
