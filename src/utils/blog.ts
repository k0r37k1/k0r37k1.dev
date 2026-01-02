import { getCollection, type CollectionEntry } from 'astro:content';

type BlogPost = CollectionEntry<'blog'>;

/**
 * Check if a post is English based on its ID (file path)
 * Uses Astro convention: `post.md` = default (DE), `post.en.md` = English
 */
function isEnglishPost(post: BlogPost): boolean {
	// ID contains the full filename: "welcome.en.md" for English posts
	return post.id.endsWith('.en.md');
}

/**
 * Get blog posts filtered by language
 */
export async function getBlogPosts(lang: 'de' | 'en'): Promise<BlogPost[]> {
	const allPosts = await getCollection('blog', ({ data }) => data.draft !== true);

	const filtered = allPosts.filter((post) =>
		lang === 'en' ? isEnglishPost(post) : !isEnglishPost(post)
	);

	// Sort by date (newest first)
	return filtered.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Get the display slug (clean slug without language suffix)
 * ID is "welcome.md" or "welcome.en.md" -> we want just "welcome"
 */
export function getDisplaySlug(post: BlogPost): string {
	return post.id.replace(/\.en\.md$/, '').replace(/\.md$/, '');
}

/**
 * Get static paths for blog posts
 */
export async function getBlogStaticPaths(lang: 'de' | 'en') {
	const posts = await getBlogPosts(lang);
	return posts.map((post) => ({
		params: { slug: getDisplaySlug(post) },
		props: post,
	}));
}

/**
 * Check if a translation exists for a given post
 * Returns the alternate URL (leads to 404 if no translation exists)
 */
export async function getAlternatePostUrl(
	post: BlogPost,
	targetLang: 'de' | 'en'
): Promise<string> {
	const baseSlug = getDisplaySlug(post);

	// Always return the direct URL - will show 404 if no translation exists
	return targetLang === 'en' ? `/en/blog/${baseSlug}` : `/blog/${baseSlug}`;
}
