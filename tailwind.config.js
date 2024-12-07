/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Arial", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
    },
  },

  plugins: [],
};
