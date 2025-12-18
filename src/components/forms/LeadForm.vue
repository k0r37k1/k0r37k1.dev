<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import '@/styles/components/LeadForm.css';

interface Props {
	action?: string;
	method?: 'POST' | 'GET';
	successMessage?: string;
	errorMessage?: string;
	showBudget?: boolean;
	showTimeline?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	action: 'https://formspree.io/f/YOUR_FORM_ID',
	method: 'POST',
	successMessage: 'Vielen Dank! Wir melden uns in Kürze bei Ihnen.',
	errorMessage: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
	showBudget: true,
	showTimeline: true,
});

const formData = ref({
	name: '',
	email: '',
	company: '',
	phone: '',
	service: '',
	budget: '',
	timeline: '',
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
			formData.value = {
				name: '',
				email: '',
				company: '',
				phone: '',
				service: '',
				budget: '',
				timeline: '',
				message: '',
			};
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
	<form class="lead-form" :action="action" :method="method" @submit="handleSubmit">
		<!-- Success/Error Messages -->
		<div v-if="submitStatus === 'success'" class="lead-form__message lead-form__message--success">
			<Icon icon="tabler:circle-check" class="lead-form__message-icon" />
			<p>{{ successMessage }}</p>
		</div>

		<div v-if="submitStatus === 'error'" class="lead-form__message lead-form__message--error">
			<Icon icon="tabler:alert-circle" class="lead-form__message-icon" />
			<p>{{ errorMessage }}</p>
		</div>

		<!-- Form Grid -->
		<div class="lead-form__grid">
			<!-- Name -->
			<div class="lead-form__field">
				<label for="lead-name" class="lead-form__label">
					Name <span class="lead-form__required">*</span>
				</label>
				<input
					id="lead-name"
					v-model="formData.name"
					type="text"
					name="name"
					class="lead-form__input"
					required
					:disabled="isSubmitting"
				/>
			</div>

			<!-- Email -->
			<div class="lead-form__field">
				<label for="lead-email" class="lead-form__label">
					E-Mail <span class="lead-form__required">*</span>
				</label>
				<input
					id="lead-email"
					v-model="formData.email"
					type="email"
					name="email"
					class="lead-form__input"
					required
					:disabled="isSubmitting"
				/>
			</div>

			<!-- Company -->
			<div class="lead-form__field">
				<label for="lead-company" class="lead-form__label"> Unternehmen </label>
				<input
					id="lead-company"
					v-model="formData.company"
					type="text"
					name="company"
					class="lead-form__input"
					:disabled="isSubmitting"
				/>
			</div>

			<!-- Phone -->
			<div class="lead-form__field">
				<label for="lead-phone" class="lead-form__label"> Telefon </label>
				<input
					id="lead-phone"
					v-model="formData.phone"
					type="tel"
					name="phone"
					class="lead-form__input"
					:disabled="isSubmitting"
				/>
			</div>
		</div>

		<!-- Service Selection -->
		<div class="lead-form__field">
			<label for="lead-service" class="lead-form__label">
				Interesse an <span class="lead-form__required">*</span>
			</label>
			<select
				id="lead-service"
				v-model="formData.service"
				name="service"
				class="lead-form__select"
				required
				:disabled="isSubmitting"
			>
				<option value="">Bitte wählen...</option>
				<option value="webdesign">Webdesign</option>
				<option value="development">Entwicklung</option>
				<option value="consulting">Beratung</option>
				<option value="seo">SEO/Marketing</option>
				<option value="other">Sonstiges</option>
			</select>
		</div>

		<!-- Budget & Timeline -->
		<div v-if="showBudget || showTimeline" class="lead-form__grid">
			<!-- Budget -->
			<div v-if="showBudget" class="lead-form__field">
				<label for="lead-budget" class="lead-form__label"> Budget </label>
				<select
					id="lead-budget"
					v-model="formData.budget"
					name="budget"
					class="lead-form__select"
					:disabled="isSubmitting"
				>
					<option value="">Bitte wählen...</option>
					<option value="<5k">< 5.000 €</option>
					<option value="5k-10k">5.000 € - 10.000 €</option>
					<option value="10k-25k">10.000 € - 25.000 €</option>
					<option value="25k+">> 25.000 €</option>
				</select>
			</div>

			<!-- Timeline -->
			<div v-if="showTimeline" class="lead-form__field">
				<label for="lead-timeline" class="lead-form__label"> Zeitrahmen </label>
				<select
					id="lead-timeline"
					v-model="formData.timeline"
					name="timeline"
					class="lead-form__select"
					:disabled="isSubmitting"
				>
					<option value="">Bitte wählen...</option>
					<option value="asap">So schnell wie möglich</option>
					<option value="1-3months">1-3 Monate</option>
					<option value="3-6months">3-6 Monate</option>
					<option value="6months+">6+ Monate</option>
				</select>
			</div>
		</div>

		<!-- Message -->
		<div class="lead-form__field">
			<label for="lead-message" class="lead-form__label">
				Projektbeschreibung <span class="lead-form__required">*</span>
			</label>
			<textarea
				id="lead-message"
				v-model="formData.message"
				name="message"
				rows="5"
				class="lead-form__textarea"
				required
				:disabled="isSubmitting"
			></textarea>
		</div>

		<!-- Submit Button -->
		<button
			type="submit"
			class="lead-form__submit"
			:disabled="isSubmitting"
			:aria-label="isSubmitting ? 'Anfrage wird gesendet' : 'Anfrage senden'"
		>
			<span v-if="!isSubmitting">Anfrage senden</span>
			<span v-else class="lead-form__submit-loading">
				<Icon icon="tabler:loader-2" class="lead-form__submit-spinner" />
				<span>Wird gesendet...</span>
			</span>
		</button>
	</form>
</template>
