/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				"JetBrains-Mono": "JetBrains Mono",
				"Caudex": "Caudex",
				"Material-Sym": "Material Symbols Outlined"
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
