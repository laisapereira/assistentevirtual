/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-pink': '#822054',
        'main-black': '#000000',
        'main-gray': '#F1F1F1',
        'main-white': '#FFFFFF',
      },

      fontFamily: {
        'fira-code': ['Fira Code', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'source-sans-3': ['Source Sans 3', 'sans-serif'],
      },
    },
  },
  plugins: [],
}