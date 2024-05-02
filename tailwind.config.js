/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        aileorn: ["aileron", "sans-serif"],
        josefin: ["josefin", "serif"],
      },
    },
    colors: {
      mandarin: {
        100: "#ffa500",
        300: "#ffb952",
        // 500: "#ffcd85",
        600: "#ffd79d",
      },
      mandarinDark: "#e69500",
      dark: { 100: "#121212", 200: "#282828", 400: "#575757" },
      mixed: { 100: "#271f16", 200: "#3c342b", 600: "#c9b095" },
      black: colors.black,
      white: colors.white,
      blue: colors.blue,
    },
    extend: {},
  },
  plugins: [],
};
