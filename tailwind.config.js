/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,vue}",
	],
	theme: {
		extend: {
			colors: {
				brand: {
					dark: '#045DAD',
					DEFAULT: '#1779ba',
					light: '#1196D8'
				},
			},
		},
	},
	plugins: [],
}
