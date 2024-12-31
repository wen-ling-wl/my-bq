/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#1a1f2b',
          card: '#252b3b',
          text: '#e5e7eb',
          'text-secondary': '#9ca3af',
          hover: '#323a4b'
        }
      }
    },
  },
  plugins: [],
}

