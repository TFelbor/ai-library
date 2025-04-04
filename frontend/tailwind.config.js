/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#1a1a1a',
          800: '#2d2d2d',
          700: '#404040',
          600: '#525252',
          300: '#d4d4d4',
        },
        purple: {
          300: '#d8b4fe',
          400: '#c084fc',
          600: '#9333ea',
          700: '#7e22ce',
        },
      },
    },
  },
  plugins: [],
};
