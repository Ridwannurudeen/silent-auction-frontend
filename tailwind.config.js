/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
        dark: {
          100: "#1e293b",
          200: "#0f172a",
          300: "#020617",
        },
      },
    },
  },
  plugins: [],
};