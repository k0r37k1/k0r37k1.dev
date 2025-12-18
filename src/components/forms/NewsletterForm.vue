<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import '@/styles/components/NewsletterForm.css';

interface Props {
	action?: string;
	method?: 'POST' | 'GET';
	placeholder?: string;
	buttonText?: string;
	layout?: 'inline' | 'stacked';
	successMessage?: string;
	errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
	action: 'https://formspree.io/f/YOUR_FORM_ID',
	method: 'POST',
	placeholder: 'Ihre E-Mail-Adresse',
	buttonText: 'Abonnieren',
	layout: 'inline',
	successMessage: 'Vielen Dank für Ihre Anmeldung!',
	errorMessage: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
});

const email = ref('');
const isSubmitting = ref(false);
const submitStatus = ref<'idle' | 'success' | 'error'>('idle');

const handleSubmit = async (event: Event) => {
	event.preventDefault();
	isSubmitting.value = true;
	submitStatus.value = 'idle';

	try {
		const response = await fetch(props.action, {
			method: props.method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: email.value }),
		});

		if (response.ok) {
			submitStatus.value = 'success';
			email.value = '';
		} else {
			submitStatus.value = 'error';
		}
	} catch (error) {
		submitStatus.value = 'error';
	} finally {
		isSubmitting.value = false;
	}
};
</script>

<template>
	<div class="newsletter-form">
		<!-- Success/Error Messages -->
		<div
			v-if="submitStatus === 'success'"
			class="newsletter-form__message newsletter-form__message--success"
		>
			<Icon icon="tabler:circle-check" class="newsletter-form__message-icon" />
			<p>{{ successMessage }}</p>
		</div>

		<div
			v-if="submitStatus === 'error'"
			class="newsletter-form__message newsletter-form__message--error"
		>
			<Icon icon="tabler:alert-circle" class="newsletter-form__message-icon" />
			<p>{{ errorMessage }}</p>
		</div>

		<!-- Form -->
		<form
			v-if="submitStatus !== 'success'"
			:class="['newsletter-form__form', `newsletter-form__form--${layout}`]"
			:action="action"
			:method="method"
			@submit="handleSubmit"
		>
			<div class="newsletter-form__input-wrapper">
				<label for="newsletter-email" class="newsletter-form__label"> E-Mail-Adresse </label>
				<input
					id="newsletter-email"
					v-model="email"
					type="email"
					name="email"
					class="newsletter-form__input"
					:placeholder="placeholder"
					required
					:disabled="isSubmitting"
				/>
			</div>

			<button
				type="submit"
				class="newsletter-form__submit"
				:disabled="isSubmitting"
				:aria-label="isSubmitting ? 'Anmeldung wird verarbeitet' : buttonText"
			>
				<span v-if="!isSubmitting">{{ buttonText }}</span>
				<span v-else class="newsletter-form__submit-loading">
					<Icon icon="tabler:loader-2" class="newsletter-form__submit-spinner" />
				</span>
			</button>
		</form>
	</div>
</template>
