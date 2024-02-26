/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'montSerratBold': ['Montserrat Bold', 'sans-serif'],
        'sourceSansPro': ['Source Sans Pro', 'sans-serif'],
        'sourceSansProBold': ['Source Sans Pro Bold', 'sans-serif'],
        'sourceSansProSemiBold': ['Source Sans Pro SemiBold', 'sans-serif'],
        'abeezee': ['ABeeZee', 'sans-serif'] ,
        'abeezeeItalic': ['AbeeZee Italic', 'sans-serif']            
      },
      colors: {
        'customBlue': '#5252F1',
        'custom-gray': '#EFEFED',
        'custom-black': '#374151',
        'secondaryColor': '#378EF0',        
      }
    },
  },
  plugins: [],
}