/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      mandarin: "#ffa500",
      black: colors.black,
      white: colors.white,
      blue: colors.blue,
    },
    extend: {},
  },
  plugins: [],
};
