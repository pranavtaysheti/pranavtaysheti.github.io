import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  experimental: {},
  site: 'https://pranavtaysheti.github.io',
  integrations: [mdx(), tailwind()]
});