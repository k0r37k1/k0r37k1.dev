<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

interface Props {
	/** Email user (before @) */
	user: string;
	/** Email domain (after @, before .) */
	domain: string;
	/** Email TLD (after .) */
	tld: string;
	/** Show as link (default: true) */
	asLink?: boolean;
	/** CSS class for the link */
	linkClass?: string;
	/** Show email icon */
	showIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	asLink: true,
	linkClass: 'terminal-link',
	showIcon: false,
});

const email = ref('');
const isLoaded = ref(false);

const mailto = computed(() => `mailto:${email.value}`);

onMounted(() => {
	// Build email client-side only (bots can't execute JS)
	email.value = `${props.user}@${props.domain}.${props.tld}`;
	isLoaded.value = true;
});
</script>

<template>
	<template v-if="isLoaded">
		<a v-if="asLink" :href="mailto" :class="linkClass">
			<slot name="icon" />
			<span>{{ email }}</span>
		</a>
		<span v-else>{{ email }}</span>
	</template>
	<span v-else aria-hidden="true">[E-Mail wird geladen...]</span>
</template>
