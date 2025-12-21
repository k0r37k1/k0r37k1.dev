// @ts-nocheck
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import Components from 'unplugin-vue-components/vite';
import RekaResolver from 'reka-ui/resolver';
import { fileURLToPath } from 'url';
import path from 'path';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

import icon from 'astro-icon';

import alpinejs from '@astrojs/alpinejs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Vite+ Stack Configuration
// Using Rolldown (Rust bundler), OXC (parser/minifier), and Lightning CSS
export default defineConfig({
    // Site URL for sitemap generation
    site: 'https://k0r37k1.dev',

    // i18n Configuration - German (default) + English
    i18n: {
        defaultLocale: 'de',
        locales: ['de', 'en'],
        routing: {
            prefixDefaultLocale: false, // / = German, /en/ = English
        },
    },

    // Vue Integration mit Best Practice Settings
    integrations: [vue({
        // Vue Compiler Optionen
        template: {
            compilerOptions: {
                // Whitespace-Handling optimieren
                whitespace: 'condense',
            },
        },
        // JSX Support (optional, falls benötigt)
        // jsx: true,
    }), alpinejs({
        // Alpine.js Config für Plugins (Fallback für problematische Components)
        entrypoint: '/src/config/alpine',
    }), sitemap(), mdx(), icon()],

    vite: {
        // Rolldown-Vite specific optimizations
        resolve: {
            alias: {
                '@': '/src',
                '@components': '/src/components',
                '@layouts': '/src/layouts',
                '@utils': '/src/utils',
            },
        },

        // Lightning CSS configuration
        css: {
            transformer: 'lightningcss',
            lightningcss: {
                drafts: {
                    customMedia: true,
                },
            },
        },

        // Build optimizations for Rolldown
        build: {
            // ES2022 for better browser compatibility while maintaining modern features
            // Supports: Chrome 94+, Safari 15.4+, Firefox 93+, Edge 94+
            target: 'es2022',
            cssMinify: 'lightningcss',
            // Enable CSS code splitting for optimal page loads
            cssCodeSplit: true,
            // Chunk size warnings
            chunkSizeWarningLimit: 1000,
            // Optimized output configuration
            rollupOptions: {
                output: {
                    // Bundle vendor code into single chunk
                    manualChunks(id) {
                        // Don't bundle Astro's internals or server code
                        if (id.includes('astro/dist') || id.includes('/server/')) {
                            return undefined;
                        }
                        // Bundle all node_modules into single vendor chunk
                        if (id.includes('node_modules')) {
                            return 'vendor';
                        }
                        // Let Vite handle app code splitting
                        return undefined;
                    },
                    // Optimized naming with hashes for cache busting
                    entryFileNames: '[name].[hash].js',
                    chunkFileNames: '[name].[hash].js',
                    assetFileNames: 'assets/[name].[hash][extname]',
                },
            },
        },

        // Dev server optimizations
        server: {
            fs: {
                strict: false,
            },
        },

        // Optimizations for Vue + Alpine.js
        optimizeDeps: {
            include: [
                'vue',
                'reka-ui',
                'motion-v',
                'alpinejs',
                '@alpinejs/anchor',
                '@alpinejs/collapse',
                '@alpinejs/focus',
                '@alpinejs/intersect',
            ],
            exclude: ['@astrojs/mdx'],
        },

        plugins: [
            tailwindcss(),
            // @ts-ignore - Vite plugin type mismatch between Astro and unplugin-vue-components
            Components({
                dts: path.resolve(__dirname, 'types/components.d.ts'),
                resolvers: [RekaResolver()],
            }),
        ],
    },

    // Output Konfiguration
    output: 'static',

    // Performance Optimierungen
    compressHTML: true,

    // Image optimization
    image: {
        service: {
            entrypoint: 'astro/assets/services/sharp',
        },
    },

    // Prefetch für bessere Navigation
    prefetch: {
        prefetchAll: true,
        defaultStrategy: 'viewport',
    },

    // Markdown & Syntax Highlighting
    markdown: {
        shikiConfig: {
            theme: 'dracula',
            wrap: true,
        },
    },

    // Experimental Features (Astro 5+)
    experimental: {
        // Client-side prerendering for instant page transitions
        // Lädt verlinkte Seiten im Hintergrund für noch schnelleres Routing
        clientPrerender: true,

        // Weitere experimentelle Features (optional):
        // contentLayer: true,  // Neue Content Collections API
        // actions: true,       // Server Actions (Astro 5.1+)
    },
});