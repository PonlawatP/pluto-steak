/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        header: "#69a33b",
      },
      backgroundColor: {
        main_bg: "#1a1a1a",
        main_2_bg: "#2b2b2b",
        main_3_bg: "#333333",
      },
    },
  },
  plugins: [],
};
