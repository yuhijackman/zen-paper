/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#47A3DB",
				secondary: "#226797",
				accent: "#81C3F1",
			},
		},
	},
	plugins: [],
};
