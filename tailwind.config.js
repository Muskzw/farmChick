/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      primary: '#059669', // Deep Emerald
      secondary: '#34D399', // Emerald 400
      background: '#ECFDF5', // Soft Sage
      surface: '#FFFFFF',
      text: '#1E293B', // Slate 800
    },
  },
  plugins: [],
}
