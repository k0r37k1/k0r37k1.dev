<script setup lang="ts">
import { Icon } from '@iconify/vue';

const currentYear = new Date().getFullYear();
</script>

<template>
	<footer class="terminal-footer">
		<div class="footer-content">
			<div class="footer-meta">
				<span>© {{ currentYear }} k0r37k1.dev</span>
				<span class="separator">•</span>
				<span>built with <span class="heart">♥</span></span>
			</div>
			<div class="footer-links">
				<a href="/imprint" class="terminal-link footer-link">
					<Icon icon="mdi:fingerprint" class="footer-icon" />
					<span>imprint</span>
				</a>
				<span class="separator">•</span>
				<a href="/privacy" class="terminal-link footer-link">
					<Icon icon="mdi:scale-balance" class="footer-icon" />
					<span>privacy</span>
				</a>
			</div>
		</div>
	</footer>
</template>

<style scoped>
.terminal-footer {
	border-top: 1px solid var(--color-terminal-border);
	padding: 2rem 1.5rem;
	margin-top: 4rem;
}

.footer-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 2rem;
	font-family: var(--font-mono);
	font-size: 0.875rem;
	color: var(--color-terminal-text-dim);
	flex-wrap: wrap;
}

.footer-links {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.footer-meta {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.separator {
	color: var(--color-terminal-text-muted);
	opacity: 0.5;
}

.terminal-link {
	color: var(--color-terminal-text-dim);
	text-decoration: none;
	transition: color 0.2s ease;
}

.terminal-link:hover {
	color: var(--color-accent-orange);
}

.footer-link {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
}

.footer-icon {
	font-size: 1.125rem;
}

.heart {
	color: #f55;
}

@media (max-width: 640px) {
	.footer-content {
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
	}
}
</style>
