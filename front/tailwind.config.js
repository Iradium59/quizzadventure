/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				'maintitle': [
					'-apple-system',
					'BlinkMacSystemFont',
					'"Segoe UI"',
					'Helvetica',
					'Arial',
					'sans-serif',
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
				],
			},

			backgroundColor: {
				'main': '#1A202C',
			}
		},
	},
	plugins: [],
}

