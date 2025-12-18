<script setup lang="ts">
interface Props {
	src?: string;
	alt?: string;
	fallback?: string;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	delayMs?: number;
}

const props = withDefaults(defineProps<Props>(), {
	size: 'md',
	delayMs: 0,
});
</script>

<template>
	<AvatarRoot class="avatar" :class="`avatar--${size}`">
		<AvatarImage v-if="src" :src="src" :alt="alt" class="avatar__image" />
		<AvatarFallback :delay-ms="delayMs" class="avatar__fallback">
			{{ fallback }}
		</AvatarFallback>
	</AvatarRoot>
</template>
