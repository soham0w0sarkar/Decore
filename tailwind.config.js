/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			borderWidth: {
				1: '1px'
			},
			width: {
				88: '88%',
				12: '12%',
				10: '10%',
				90: '90%',
				200: '200vw'
			},
			height: { 100: '30rem', 90: '90%' },
			fontFamily: {
				sans: ['Noto Serif Variable']
			}
		}
	},
	plugins: []
};
