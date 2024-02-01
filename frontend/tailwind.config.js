/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-purple': '#5252F1',
        'main-black': '#000000',
        'main-gray': '#F1F1F1',
        'main-white': '#FFFFFF',
      },

      fontFamily: {
        'fira-code': ['Fira Code', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
        'source-sans-3': ['Source Sans 3', 'sans-serif'],
      },
    },
  },
  plugins: [],
}