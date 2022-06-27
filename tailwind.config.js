/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.jsx'],
  theme: {
    extend: {
      backgroundImage: {
        main: 'url(/src/assets/main-bg.png)'
      },
    },
  },
  plugins: [],
}
