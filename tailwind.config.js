const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './modules/**/*.{js,ts,jsx,tsx}',
    './common/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'xs': '300px',
      '3xl': '2189px',
      ...defaultTheme.screens
    },
    extend: {
      screens: {
        'nv': '975px'
      },
      colors: {
        brand: {
          blue: '#2C4696',
          lightblue: '#EBF4F8',
          orange: '#FC8512',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
