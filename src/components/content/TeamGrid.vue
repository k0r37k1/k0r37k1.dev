<script setup lang="ts">
import TeamMember from '@components/content/TeamMember.vue';

interface SocialLink {
	platform: string;
	url: string;
	icon: string;
}

interface TeamMemberData {
	id: string;
	name: string;
	role: string;
	bio?: string;
	imageSrc: string;
	imageAlt?: string;
	email?: string;
	phone?: string;
	socialLinks?: SocialLink[];
}

interface Props {
	members: TeamMemberData[];
	title?: string;
	description?: string;
	columns?: 2 | 3 | 4;
	variant?: 'default' | 'centered' | 'horizontal';
}

const props = withDefaults(defineProps<Props>(), {
	title: 'Unser Team',
	description: 'Lernen Sie die Menschen hinter unserem Unternehmen kennen',
	columns: 3,
	variant: 'default',
});
</script>

<template>
	<div class="team-grid">
		<!-- Header -->
		<div v-if="title || description" class="team-grid__header">
			<h2 v-if="title" class="team-grid__title">{{ title }}</h2>
			<p v-if="description" class="team-grid__description">{{ description }}</p>
		</div>

		<!-- Grid -->
		<div :class="['team-grid__grid', `team-grid__grid--${columns}-cols`]" role="list">
			<TeamMember
				v-for="member in members"
				:key="member.id"
				v-bind="member"
				:variant="variant"
				role="listitem"
			/>
		</div>

		<!-- Slot for additional content (e.g., "Join our team" CTA) -->
		<slot />
	</div>
</template>
