/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.jsx'],
	theme: {
		extend: {
			screens: {
				'3xl': '2500px',
			},
		},
	},
};
