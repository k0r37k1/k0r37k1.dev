<script setup lang="ts">
import { Icon } from '@iconify/vue';
import '@/styles/components/BlogCard.css';

interface Props {
	title: string;
	excerpt?: string;
	imageSrc?: string;
	imageAlt?: string;
	author?: string;
	date?: string;
	readTime?: string;
	category?: string;
	href: string;
	variant?: 'default' | 'horizontal' | 'minimal';
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'default',
});
</script>

<template>
	<article :class="['blog-card', `blog-card--${variant}`]">
		<a :href="href" class="blog-card__link">
			<!-- Image -->
			<div v-if="imageSrc" class="blog-card__image">
				<img :src="imageSrc" :alt="imageAlt || title" loading="lazy" />
				<div v-if="category" class="blog-card__category">{{ category }}</div>
			</div>

			<!-- Content -->
			<div class="blog-card__content">
				<h3 class="blog-card__title">{{ title }}</h3>
				<p v-if="excerpt" class="blog-card__excerpt">{{ excerpt }}</p>

				<!-- Meta -->
				<div class="blog-card__meta">
					<span v-if="author" class="blog-card__author">
						<Icon icon="tabler:user" class="blog-card__meta-icon" />
						{{ author }}
					</span>
					<span v-if="date" class="blog-card__date">
						<Icon icon="tabler:calendar" class="blog-card__meta-icon" />
						{{ date }}
					</span>
					<span v-if="readTime" class="blog-card__read-time">
						<Icon icon="tabler:clock" class="blog-card__meta-icon" />
						{{ readTime }}
					</span>
				</div>
			</div>
		</a>
	</article>
</template>
