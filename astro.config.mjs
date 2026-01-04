// @ts-nocheck
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import Components from 'unplugin-vue-components/vite';
import { fileURLToPath } from 'url';
import path from 'path';

import sitemap from '@astrojs/sitemap';

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
    integrations: [
        vue({
            // Vue Compiler Optionen
            template: {
                compilerOptions: {
                    // Whitespace-Handling optimieren
                    whitespace: 'condense',
                },
            },
        }),
        sitemap(),
    ],

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
            // Disable CSS code splitting to prevent duplicate CSS files with different hashes
            cssCodeSplit: false,
            // Chunk size warnings
            chunkSizeWarningLimit: 1000,
            // Optimized output configuration
            rollupOptions: {
                output: {
                    // Separate vendor code for better caching
                    manualChunks(id) {
                        // Don't bundle Astro's internals or server code
                        if (id.includes('astro/dist') || id.includes('/server/')) {
                            return undefined;
                        }
                        // Bundle all node_modules into single vendor chunk
                        if (id.includes('node_modules')) {
                            return 'vendor';
                        }
                        // Bundle ALL components into ONE shared chunk
                        if (id.includes('src/components/')) {
                            return 'components';
                        }
                        // Let Vite handle remaining app code splitting
                        return undefined;
                    },
                    // Organized output structure: _astro/ (Astro standard)
                    entryFileNames: '_astro/[name].[hash].js',
                    chunkFileNames: '_astro/[name].[hash].js',
                    assetFileNames: (assetInfo) => {
                        if (assetInfo.name?.endsWith('.css')) {
                            // Simplified CSS naming: index → style
                            const cssName = assetInfo.name === 'index.css' ? 'style' : assetInfo.name.replace('.css', '');
                            return `_astro/${cssName}.[hash][extname]`;
                        }
                        return '_astro/[name].[hash][extname]';
                    },
                },
            },
        },

        // Dev server optimizations
        server: {
            fs: {
                strict: false,
            },
        },

        // Optimizations for Vue
        optimizeDeps: {
            include: [
                'vue',
                'motion-v',
            ],
        },

        plugins: [
            tailwindcss(),
            // @ts-ignore - Vite plugin type mismatch between Astro and unplugin-vue-components
            Components({
                dts: path.resolve(__dirname, 'types/components.d.ts'),
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
            theme: 'github-dark',
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