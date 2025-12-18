<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import '@/styles/components/ContactForm.css';

interface Props {
	action?: string;
	method?: 'POST' | 'GET';
	successMessage?: string;
	errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
	action: 'https://formspree.io/f/YOUR_FORM_ID',
	method: 'POST',
	successMessage: 'Vielen Dank! Ihre Nachricht wurde erfolgreich versendet.',
	errorMessage: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
});

const formData = ref({
	name: '',
	email: '',
	subject: '',
	message: '',
});

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
			body: JSON.stringify(formData.value),
		});

		if (response.ok) {
			submitStatus.value = 'success';
			formData.value = { name: '', email: '', subject: '', message: '' };
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
	<form class="contact-form" :action="action" :method="method" @submit="handleSubmit">
		<!-- Success/Error Messages -->
		<div
			v-if="submitStatus === 'success'"
			class="contact-form__message contact-form__message--success"
		>
			<Icon icon="tabler:circle-check" class="contact-form__message-icon" />
			<p>{{ successMessage }}</p>
		</div>

		<div v-if="submitStatus === 'error'" class="contact-form__message contact-form__message--error">
			<Icon icon="tabler:alert-circle" class="contact-form__message-icon" />
			<p>{{ errorMessage }}</p>
		</div>

		<!-- Form Fields -->
		<div class="contact-form__field">
			<label for="name" class="contact-form__label">
				Name <span class="contact-form__required">*</span>
			</label>
			<input
				id="name"
				v-model="formData.name"
				type="text"
				name="name"
				class="contact-form__input"
				required
				:disabled="isSubmitting"
			/>
		</div>

		<div class="contact-form__field">
			<label for="email" class="contact-form__label">
				E-Mail <span class="contact-form__required">*</span>
			</label>
			<input
				id="email"
				v-model="formData.email"
				type="email"
				name="email"
				class="contact-form__input"
				required
				:disabled="isSubmitting"
			/>
		</div>

		<div class="contact-form__field">
			<label for="subject" class="contact-form__label"> Betreff </label>
			<input
				id="subject"
				v-model="formData.subject"
				type="text"
				name="subject"
				class="contact-form__input"
				:disabled="isSubmitting"
			/>
		</div>

		<div class="contact-form__field">
			<label for="message" class="contact-form__label">
				Nachricht <span class="contact-form__required">*</span>
			</label>
			<textarea
				id="message"
				v-model="formData.message"
				name="message"
				rows="5"
				class="contact-form__textarea"
				required
				:disabled="isSubmitting"
			></textarea>
		</div>

		<!-- Submit Button -->
		<button
			type="submit"
			class="contact-form__submit"
			:disabled="isSubmitting"
			:aria-label="isSubmitting ? 'Nachricht wird gesendet' : 'Nachricht senden'"
		>
			<span v-if="!isSubmitting">Nachricht senden</span>
			<span v-else class="contact-form__submit-loading">
				<Icon icon="tabler:loader-2" class="contact-form__submit-spinner" />
				<span>Wird gesendet...</span>
			</span>
		</button>
	</form>
</template>
