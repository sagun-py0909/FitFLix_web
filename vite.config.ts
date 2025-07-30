import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    // Fix JSX transform issues in production
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        }
      }
    }
  },
  plugins: [
    react({
      // Configure SWC properly for production
      plugins: [],
    }),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'fitflix-logo.png',
        'placeholder.svg',
        'robots.txt',
        'assets/*.jpg',
        '_redirects',
      ],
      manifest: {
        name: 'Fitflix - Complete Fitness Ecosystem',
        short_name: 'Fitflix',
<<<<<<< HEAD
        description: 'Your comprehensive fitness ecosystem - discover gyms, track nutrition, get AI coaching, and transform your health.',
=======
        description: 'Your comprehensive fitness ecosystem - gyms, apps, nutrition, and community.',
>>>>>>> ed336ac2b9775814e9072f8db356b58b28a96b2a
        theme_color: '#f97316',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
<<<<<<< HEAD
        scope: '/',
=======
>>>>>>> ed336ac2b9775814e9072f8db356b58b28a96b2a
        icons: [
          {
            src: '/fitflix-logo.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: '/fitflix-logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/fitflix-logo.png',
            sizes: '512x512',
            type: 'image/png'
<<<<<<< HEAD
          },
          {
            src: '/fitflix-logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
=======
>>>>>>> ed336ac2b9775814e9072f8db356b58b28a96b2a
          }
        ]
      },
      devOptions: {
        enabled: false // Disable in dev to prevent conflicts
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
        navigateFallback: '/index.html',
<<<<<<< HEAD
        navigateFallbackAllowlist: [/^\/(?!api).*$/], // Exclude API routes
=======
        navigateFallbackAllowlist: [/^\/$/, /^\/about$/, /^\/discover-gym$/, /^\/gym\/.*$/],
>>>>>>> ed336ac2b9775814e9072f8db356b58b28a96b2a
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
      }
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
