module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './modules/**/*.{js,ts,jsx,tsx}',
    './common/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
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
