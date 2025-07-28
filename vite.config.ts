import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', '/run.png', 'robots.txt'],
      manifest: {
        name: 'VerbUp',
        short_name: 'VerbUp',
        description: 'VerbUp',
        theme_color: '#5E909E',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: 'https://verbup-fe.vercel.app/',
        icons: [
          {
            src: '/run.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/run.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      devOptions: {
        enabled: true, // дозволяє працювати у dev-режимі
      },
    }),
  ],
});
