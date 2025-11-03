/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				"JetBrains-Mono": ["JetBrains Mono", "monospace"],
				"Bitter": ["Bitter", "serif"],
				"Caudex": ["Caudex", "serif"]
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
