<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { motion } from 'motion-v';
import '@/styles/components/TeamMember.css';

interface SocialLink {
	platform: string;
	url: string;
	icon: string;
}

interface Props {
	name: string;
	role: string;
	bio?: string;
	imageSrc: string;
	imageAlt?: string;
	email?: string;
	phone?: string;
	socialLinks?: SocialLink[];
	variant?: 'default' | 'centered' | 'horizontal';
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
});
</script>

<template>
	<motion.div
		:class="['team-member', `team-member--${variant}`]"
		:initial="{ opacity: 0, y: 20 }"
		:whileInView="{ opacity: 1, y: 0 }"
		:transition="{ duration: 0.4 }"
		:viewport="{ once: true, margin: '50px' }"
	>
		<div class="team-member__inner">
			<!-- Image -->
			<div class="team-member__image-wrapper">
				<img :src="imageSrc" :alt="imageAlt || name" class="team-member__image" loading="lazy" />
			</div>

			<!-- Content -->
			<div class="team-member__content">
				<!-- Name & Role -->
				<div class="team-member__header">
					<h3 class="team-member__name">{{ name }}</h3>
					<p class="team-member__role">{{ role }}</p>
				</div>

				<!-- Bio -->
				<p v-if="bio" class="team-member__bio">{{ bio }}</p>

				<!-- Contact -->
				<div v-if="email || phone" class="team-member__contact">
					<a
						v-if="email"
						:href="`mailto:${email}`"
						class="team-member__contact-link"
						:aria-label="`E-Mail an ${name}`"
					>
						<Icon icon="tabler:mail" class="team-member__contact-icon" />
						<span class="team-member__contact-text">{{ email }}</span>
					</a>
					<a
						v-if="phone"
						:href="`tel:${phone.replace(/\s/g, '')}`"
						class="team-member__contact-link"
						:aria-label="`Anrufen: ${name}`"
					>
						<Icon icon="tabler:phone" class="team-member__contact-icon" />
						<span class="team-member__contact-text">{{ phone }}</span>
					</a>
				</div>

				<!-- Social Links -->
				<div v-if="socialLinks && socialLinks.length > 0" class="team-member__social">
					<a
						v-for="link in socialLinks"
						:key="link.platform"
						:href="link.url"
						target="_blank"
						rel="noopener noreferrer"
						class="team-member__social-link"
						:aria-label="`${name} auf ${link.platform}`"
					>
						<Icon :icon="link.icon" class="team-member__social-icon" />
					</a>
				</div>
			</div>
		</div>
	</motion.div>
</template>
