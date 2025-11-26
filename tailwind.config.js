/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32', // Green for farming
        secondary: '#F9A825', // Yellow/Orange for chicks
        accent: '#4E342E', // Brown for earth
      }
    },
  },
  plugins: [],
}
