import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true
  },
  site: 'https://pranavtaysheti.github.io',
  integrations: [mdx()]
});