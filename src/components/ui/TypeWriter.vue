<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

interface Props {
	text: string;
	speed?: number; // milliseconds per character
	delay?: number; // initial delay before starting
	showCursor?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	speed: 50,
	delay: 500,
	showCursor: true,
});

const displayText = ref('');
const isComplete = ref(false);

let timeoutId: number | undefined;
let intervalId: number | undefined;

const startTyping = () => {
	let i = 0;

	timeoutId = window.setTimeout(() => {
		intervalId = window.setInterval(() => {
			if (i < props.text.length) {
				displayText.value += props.text[i];
				i++;
			} else {
				if (intervalId) clearInterval(intervalId);
				isComplete.value = true;
			}
		}, props.speed);
	}, props.delay);
};

onMounted(() => {
	startTyping();
});

// Cleanup timers on unmount to prevent memory leaks
onBeforeUnmount(() => {
	if (timeoutId) clearTimeout(timeoutId);
	if (intervalId) clearInterval(intervalId);
});

// Cleanup and restart on text change
watch(
	() => props.text,
	() => {
		if (timeoutId) clearTimeout(timeoutId);
		if (intervalId) clearInterval(intervalId);
		displayText.value = '';
		isComplete.value = false;
		startTyping();
	}
);
</script>

<template>
	<span class="typewriter"> {{ displayText }}<span v-if="showCursor" class="cursor"></span> </span>
</template>

<style scoped>
.typewriter {
	display: inline-block;
}
</style>
