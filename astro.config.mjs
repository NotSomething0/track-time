import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import AstroPWA from '@vite-pwa/astro'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    svelte(),
    AstroPWA({
      devOptions: {
        enabled: true
      },
      includeAssets: ['favicon.ico', '192.png', '512.png'],
      manifest: {
        name: "Track Time",
        short_name: "TrackTime",
        description: "Motorsport Tracking",
        theme_color: "#ffffff",
        icons: [
          {
            src: '192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});