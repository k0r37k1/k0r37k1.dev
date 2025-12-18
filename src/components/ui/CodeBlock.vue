<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { codeToHtml } from 'shiki';

interface Props {
	code: string;
	lang?: string;
}

const props = withDefaults(defineProps<Props>(), {
	lang: 'html',
});

const highlightedCode = ref('');

onMounted(async () => {
	try {
		const html = await codeToHtml(props.code, {
			lang: props.lang,
			theme: 'dracula',
		});
		highlightedCode.value = html;
	} catch (error) {
		console.error('Shiki highlighting error:', error);
		highlightedCode.value = `<pre><code>${props.code}</code></pre>`;
	}
});
</script>

<template>
	<div class="overflow-hidden rounded-lg" v-html="highlightedCode"></div>
</template>

<style>
/* Shiki pre/code styling */
pre {
	padding: 1rem;
	overflow-x: auto;
	margin: 0;
}

pre code {
	font-family: Menlo, Monaco, 'Courier New', monospace;
	font-size: 0.875rem;
	line-height: 1.5;
}
</style>
