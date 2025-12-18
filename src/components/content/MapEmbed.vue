<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { motion } from 'motion-v';
import '@/styles/components/MapEmbed.css';
import { ref } from 'vue';

interface Props {
	embedUrl: string;
	address?: string;
	title?: string;
	height?: string;
	variant?: 'default' | 'minimal' | 'with-info';
	showDirections?: boolean;
	privacyMode?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	height: '400px',
	variant: 'default',
	showDirections: true,
	privacyMode: false,
});

const mapLoaded = ref(!props.privacyMode);

const loadMap = () => {
	mapLoaded.value = true;
};

const directionsUrl = props.address
	? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(props.address)}`
	: '';
</script>

<template>
	<motion.div
		:class="['map-embed', `map-embed--${variant}`]"
		:initial="{ opacity: 0, y: 20 }"
		:whileInView="{ opacity: 1, y: 0 }"
		:transition="{ duration: 0.4 }"
		:viewport="{ once: true, margin: '50px' }"
	>
		<!-- Title -->
		<h3 v-if="title" class="map-embed__title">{{ title }}</h3>

		<div class="map-embed__container">
			<!-- Map Container -->
			<div class="map-embed__map-wrapper" :style="{ height: height }">
				<!-- Privacy Mode Overlay -->
				<div v-if="!mapLoaded" class="map-embed__privacy-overlay">
					<div class="map-embed__privacy-content">
						<Icon icon="tabler:map-pin" class="map-embed__privacy-icon" />
						<h4 class="map-embed__privacy-title">Karte anzeigen</h4>
						<p class="map-embed__privacy-text">
							Mit dem Laden der Karte akzeptieren Sie die Datenschutzerklärung von Google Maps.
						</p>
						<button
							@click="loadMap"
							class="map-embed__privacy-button"
							aria-label="Google Maps Karte laden"
						>
							<Icon icon="tabler:check" class="map-embed__button-icon" />
							Karte laden
						</button>
					</div>
				</div>

				<!-- Google Maps Iframe -->
				<iframe
					v-if="mapLoaded"
					:src="embedUrl"
					class="map-embed__iframe"
					allowfullscreen
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
					title="Google Maps"
				></iframe>
			</div>

			<!-- Address Info (with-info variant) -->
			<div v-if="variant === 'with-info' && address" class="map-embed__info">
				<div class="map-embed__address-wrapper">
					<Icon icon="tabler:map-pin" class="map-embed__address-icon" />
					<div class="map-embed__address-content">
						<h4 class="map-embed__address-title">Adresse</h4>
						<p class="map-embed__address-text">{{ address }}</p>
					</div>
				</div>

				<!-- Directions Link -->
				<a
					v-if="showDirections && directionsUrl"
					:href="directionsUrl"
					target="_blank"
					rel="noopener noreferrer"
					class="map-embed__directions-link"
				>
					<Icon icon="tabler:route" class="map-embed__directions-icon" />
					Route planen
					<Icon icon="tabler:arrow-right" class="map-embed__arrow-icon" />
				</a>
			</div>
		</div>

		<!-- Address Footer (default/minimal variant) -->
		<div v-if="variant !== 'with-info' && address" class="map-embed__footer">
			<div class="map-embed__footer-address">
				<Icon icon="tabler:map-pin" class="map-embed__footer-icon" />
				<span>{{ address }}</span>
			</div>
			<a
				v-if="showDirections && directionsUrl"
				:href="directionsUrl"
				target="_blank"
				rel="noopener noreferrer"
				class="map-embed__footer-link"
			>
				Route planen
				<Icon icon="tabler:arrow-right" class="map-embed__footer-arrow" />
			</a>
		</div>
	</motion.div>
</template>
