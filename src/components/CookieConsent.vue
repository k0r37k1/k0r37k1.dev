<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Language } from '@/i18n';

interface Props {
	lang?: Language;
}

const props = withDefaults(defineProps<Props>(), {
	lang: 'de',
});

const showModal = ref(false);
const analyticsEnabled = ref(false);

const translations = {
	de: {
		modal: {
			title: 'COOKIE-INFORMATION',
			description:
				'Diese Website verwendet nur technisch notwendige Cookies. Keine Tracking- oder Analyse-Cookies.',
			acceptBtn: 'Verstanden',
		},
	},
	en: {
		modal: {
			title: 'COOKIE INFORMATION',
			description:
				'This website only uses technically necessary cookies. No tracking or analytics cookies.',
			acceptBtn: 'Understood',
		},
	},
};

const t = translations[props.lang];

// Check if user has already made a choice
const STORAGE_KEY = 'k0r37k1_cookie_consent';
const CONSENT_DURATION_DAYS = 365;

const loadPreferences = () => {
	if (typeof window === 'undefined') return false;
	const saved = localStorage.getItem(STORAGE_KEY);
	if (saved) {
		const prefs = JSON.parse(saved);
		const timestamp = prefs.timestamp || 0;
		const expirationTime = timestamp + CONSENT_DURATION_DAYS * 24 * 60 * 60 * 1000;

		// Check if consent has expired (365 days)
		if (Date.now() > expirationTime) {
			localStorage.removeItem(STORAGE_KEY);
			return false;
		}

		analyticsEnabled.value = prefs.analytics || false;
		return true;
	}
	return false;
};

const savePreferences = () => {
	if (typeof window === 'undefined') return;
	localStorage.setItem(
		STORAGE_KEY,
		JSON.stringify({
			necessary: true,
			analytics: analyticsEnabled.value,
			timestamp: Date.now(),
		})
	);
	showModal.value = false;
};

const acceptAll = () => {
	analyticsEnabled.value = false; // Keine Analytics
	savePreferences();
};

onMounted(() => {
	// Show modal only if no preference saved
	if (!loadPreferences()) {
		showModal.value = true;
	}
});
</script>

<template>
	<!-- Consent Banner (Bottom Left) -->
	<Teleport to="body">
		<div v-if="showModal" class="cc-banner" role="dialog" aria-labelledby="cc-title">
			<div class="cc-header">
				<h2 id="cc-title" class="cc-title">{{ t.modal.title }}</h2>
			</div>
			<div class="cc-body">
				<p class="cc-description">{{ t.modal.description }}</p>
			</div>
			<div class="cc-footer">
				<button @click="acceptAll" class="cc-btn" type="button">
					{{ t.modal.acceptBtn }}
				</button>
			</div>
		</div>
	</Teleport>
</template>
