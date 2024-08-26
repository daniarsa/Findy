/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'balsamiq': ['Balsamiq Sans', 'sans-serif'],
        'baloo': ['Baloo Thambi 2', 'sans-serif'],
      },
      colors: {
        'color-1': '#FF7674',
        'color-2': '#FF74B7',
        'color-3': '#FF74FC',
        'color-4': '#FFBC74',
        'color-5': '#F8F8F8',
        'font-color-1': '#2F2F2F',
        'font-color-2': '#000000',
      },
      backgroundImage: {
        'custom-gradient': "url('../src/assets/Group 28.jpg')",
      },
    },
  },
  plugins: [],
};

