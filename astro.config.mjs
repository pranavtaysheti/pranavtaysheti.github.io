import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    experimental: {
        assets: true,
    },
    site: 'https://pranavtaysheti.github.io',
    base: '/PTBlog',
});