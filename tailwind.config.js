/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981', // Emerald 500
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        secondary: {
          DEFAULT: '#F59E0B', // Amber 500
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        background: {
          DEFAULT: '#0F172A', // Slate 900
          light: '#F8FAFC', // Slate 50
          dark: '#020617', // Slate 950
        },
        surface: {
          DEFAULT: '#1E293B', // Slate 800
          light: '#FFFFFF',
          dark: '#0F172A', // Slate 900
        },
        text: {
          DEFAULT: '#F8FAFC', // Slate 50
          muted: '#94A3B8', // Slate 400
          dark: '#0F172A', // Slate 900
        },
        border: '#334155', // Slate 700
        error: '#EF4444', // Red 500
        success: '#10B981', // Emerald 500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
