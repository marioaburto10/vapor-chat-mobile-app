/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vapor: {
          black: '#000000',
          darkGray: '#1a1a1a',
          gray: '#2d2d2d',
          lightGray: '#666666',
          silver: '#999999',
          white: '#ffffff',
        },
      },
    },
  },
  plugins: [],
};

