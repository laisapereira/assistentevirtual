/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {    
    fontFamily: {
      montSerrat: ['Montserrat', 'sans-serif'],
      'montSerrat-bold': ['Montserrat-bold', 'sans-serif'],
      sourceSansPro: ['Source Sans Pro', 'sans-serif'],
      'sourceSansPro-bold': ['Source Sans Pro Bold', 'sans-serif'],
      'sourceSansPro-black': ['Source Sans Pro Black', 'sans-serif'],
      ubuntuBold: ['Ubuntu-bold', 'sans-serif'],
      ABeeZe: ['ABeeZe', 'sans-serif'],
    },
    extend: {
      fontSize: {
        'title': '50px',
      },         
      colors: {
        'd-secondary': '#3939FF'
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'sombraBalao': '4px 4px 10px rgba(0, 0, 0, 0.3)',
      },
      backgroundColor: {
        'secondary': '#EFEFED',
      }
    },
  },
  plugins: [],
}