/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.{html}"],
  theme: {
    extend: {
      colors: {
        plum: {
          50: "#f8ecf8",
          100: "#f3dbec",
          200: "#e5bada",
          300: "#d9a2d0",
          400: "#bf7eae",
          500: "#b373a3",
          600: "#a46696",
          700: "#8e5381",
          800: "#773769",
          900: "#6c1c5a",
        },
        brand: "#78A1BB",
      },
    },
  },
  plugins: [],
}
