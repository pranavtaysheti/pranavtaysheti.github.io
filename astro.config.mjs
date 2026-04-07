import { defineConfig, fontProviders } from 'astro/config';
import mdx from "@astrojs/mdx";

import preact from "@astrojs/preact";

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  experimental: {},
  site: 'https://pranavtaysheti.github.io',
  integrations: [mdx(), preact()],

  fonts: [
    {
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      provider: fontProviders.google()
    },
    {
      name: 'Lora',
      cssVariable: '--font-lora',
      provider: fontProviders.google()
    },
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});