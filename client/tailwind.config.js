/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondaryBackground: "#201F1F",
        mainBackground: "#c28562",
        mainTextColor: "#181b20",
        secondaryTextColor: "#656a70",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
