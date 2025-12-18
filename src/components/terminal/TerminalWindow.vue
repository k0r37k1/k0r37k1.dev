<script setup lang="ts">
import { ref, onMounted } from 'vue';
import HeroSection from '@components/sections/HeroSection.vue';
import AboutSection from '@components/sections/AboutSection.vue';
import ProjectsSection from '@components/sections/ProjectsSection.vue';
import SkillsSection from '@components/sections/SkillsSection.vue';
import ContactSection from '@components/sections/ContactSection.vue';
import TerminalFooter from '@components/terminal/TerminalFooter.vue';
import GoToTop from '@components/ui/GoToTop.vue';

// Responsive detection
const isMobile = ref(false);

onMounted(() => {
	// Check if mobile on mount
	isMobile.value = window.innerWidth < 640;

	// Update on resize
	const handleResize = () => {
		isMobile.value = window.innerWidth < 640;
	};

	window.addEventListener('resize', handleResize);

	return () => {
		window.removeEventListener('resize', handleResize);
	};
});
</script>

<template>
	<div class="terminal-window">
		<!-- Terminal Header (Simple) -->
		<div class="terminal-header">
			<span class="terminal-title">{{ isMobile ? 'visitor@k0r37k1.dev:~$ welcome' : 'visitor@k0r37k1.dev:~$ welcome' }}<span class="terminal-cursor">|</span></span>
		</div>

		<!-- Terminal Content (Scrollable) -->
		<div class="terminal-content">
			<HeroSection :is-mobile="isMobile" />

			<section class="terminal-section section-with-corners" aria-label="Profile">
				<div class="section-title-center" aria-hidden="true">▀▄▀▄ PROFILE ▄▀▄▀</div>
				<div class="ascii-decorations" aria-hidden="true">
					<span class="corner top-left">╔═══════════</span>
					<span class="corner top-right">═══════════╗</span>
					<span class="corner bottom-left">╚═══════════</span>
					<span class="corner bottom-right">═══════════╝</span>
				</div>
				<AboutSection />
			</section>

			<section class="terminal-section section-with-corners" aria-label="Projects">
				<div class="section-title-center" aria-hidden="true">▀▄▀▄ PROJECTS ▄▀▄▀</div>
				<div class="ascii-decorations" aria-hidden="true">
					<span class="corner top-left">╔═══════════</span>
					<span class="corner top-right">═══════════╗</span>
					<span class="corner bottom-left">╚═══════════</span>
					<span class="corner bottom-right">═══════════╝</span>
				</div>
				<ProjectsSection />
			</section>

			<section class="terminal-section section-with-corners" aria-label="Skills">
				<div class="section-title-center" aria-hidden="true">▀▄▀▄ SKILLS ▄▀▄▀</div>
				<div class="ascii-decorations" aria-hidden="true">
					<span class="corner top-left">╔═══════════</span>
					<span class="corner top-right">═══════════╗</span>
					<span class="corner bottom-left">╚═══════════</span>
					<span class="corner bottom-right">═══════════╝</span>
				</div>
				<SkillsSection />
			</section>

			<section class="terminal-section section-with-corners" aria-label="Contact">
				<div class="section-title-center" aria-hidden="true">▀▄▀▄ CONTACT ▄▀▄▀</div>
				<div class="ascii-decorations" aria-hidden="true">
					<span class="corner top-left">╔═══════════</span>
					<span class="corner top-right">═══════════╗</span>
					<span class="corner bottom-left">╚═══════════</span>
					<span class="corner bottom-right">═══════════╝</span>
				</div>
				<ContactSection />
			</section>

			<!-- Footer -->
			<TerminalFooter />
		</div>

		<!-- Go to Top Button -->
		<GoToTop />
	</div>
</template>

<style scoped>
/* Divider styles are now in global terminal.css */
</style>
