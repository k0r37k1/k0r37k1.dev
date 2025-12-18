<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

interface NavItem {
	label: string;
	href: string;
}

interface Props {
	logoText?: string;
	navItems?: NavItem[];
}

const props = withDefaults(defineProps<Props>(), {
	logoText: 'Logo',
	navItems: () => [
		{ label: 'Home', href: '/' },
		{ label: 'Über uns', href: '/about' },
		{ label: 'Leistungen', href: '/services' },
		{ label: 'Portfolio', href: '/portfolio' },
		{ label: 'Kontakt', href: '/contact' },
	],
});

const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
	mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>

<template>
	<header class="header">
		<nav class="header__nav" aria-label="Main navigation">
			<!-- Logo -->
			<a href="/" class="header__logo" aria-label="Zur Startseite">
				<span class="header__logo-text">{{ logoText }}</span>
			</a>

			<!-- Desktop Navigation -->
			<NavigationMenuRoot class="header__menu">
				<NavigationMenuList class="header__menu-list">
					<NavigationMenuItem v-for="item in navItems" :key="item.href" class="header__menu-item">
						<NavigationMenuLink :href="item.href" class="header__menu-link">
							{{ item.label }}
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenuRoot>

			<!-- Mobile Menu Toggle -->
			<button
				type="button"
				class="header__mobile-toggle"
				:aria-label="mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'"
				:aria-expanded="mobileMenuOpen"
				@click="toggleMobileMenu"
			>
				<Icon :icon="mobileMenuOpen ? 'tabler:x' : 'tabler:menu-2'" class="header__mobile-icon" />
			</button>
		</nav>

		<!-- Mobile Navigation -->
		<div v-if="mobileMenuOpen" class="header__mobile-menu">
			<ul class="header__mobile-list">
				<li v-for="item in navItems" :key="item.href" class="header__mobile-item">
					<a :href="item.href" class="header__mobile-link" @click="mobileMenuOpen = false">
						{{ item.label }}
					</a>
				</li>
			</ul>
		</div>
	</header>
</template>
