<script setup lang="ts">
// Legal pages don't need animations - content should be immediately visible
// This prevents opacity:0 issues with motion library hydration timing
</script>

<template>
	<section class="terminal-section section-with-corners legal-section">
		<slot />
	</section>
</template>
