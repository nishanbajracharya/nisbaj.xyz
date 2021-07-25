module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fill: (theme) => ({
      transparent: 'transparent',
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
