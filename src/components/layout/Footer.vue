<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface FooterLink {
	label: string;
	href: string;
}

interface FooterSection {
	title: string;
	links: FooterLink[];
}

interface SocialLink {
	icon: string;
	href: string;
	label: string;
}

interface Props {
	sections?: FooterSection[];
	socialLinks?: SocialLink[];
	copyright?: string;
}

const props = withDefaults(defineProps<Props>(), {
	sections: () => [
		{
			title: 'Unternehmen',
			links: [
				{ label: 'Über uns', href: '/about' },
				{ label: 'Team', href: '/team' },
				{ label: 'Karriere', href: '/careers' },
			],
		},
		{
			title: 'Leistungen',
			links: [
				{ label: 'Webdesign', href: '/services/design' },
				{ label: 'Development', href: '/services/development' },
				{ label: 'Consulting', href: '/services/consulting' },
			],
		},
		{
			title: 'Rechtliches',
			links: [
				{ label: 'Impressum', href: '/legal' },
				{ label: 'Datenschutz', href: '/privacy' },
				{ label: 'AGB', href: '/terms' },
			],
		},
	],
	socialLinks: () => [
		{ icon: 'tabler:brand-github', href: '#', label: 'GitHub' },
		{ icon: 'tabler:brand-twitter', href: '#', label: 'Twitter' },
		{ icon: 'tabler:brand-linkedin', href: '#', label: 'LinkedIn' },
	],
	copyright: () => `© ${new Date().getFullYear()} Alle Rechte vorbehalten.`,
});
</script>

<template>
	<footer class="footer">
		<div class="footer__container">
			<!-- Footer Sections -->
			<div class="footer__sections">
				<div v-for="section in sections" :key="section.title" class="footer__section">
					<h3 class="footer__section-title">{{ section.title }}</h3>
					<ul class="footer__section-list">
						<li v-for="link in section.links" :key="link.href" class="footer__section-item">
							<a :href="link.href" class="footer__section-link">
								{{ link.label }}
							</a>
						</li>
					</ul>
				</div>
			</div>

			<!-- Footer Bottom -->
			<div class="footer__bottom">
				<p class="footer__copyright">{{ copyright }}</p>

				<!-- Social Links -->
				<div class="footer__social">
					<a
						v-for="social in socialLinks"
						:key="social.href"
						:href="social.href"
						class="footer__social-link"
						:aria-label="social.label"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Icon :icon="social.icon" class="footer__social-icon" />
					</a>
				</div>
			</div>
		</div>
	</footer>
</template>
