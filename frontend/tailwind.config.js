/** @type {import('tailwindcss').Config} */

import fluid, { extract, screens, fontSize } from 'fluid-tailwind'

module.exports = {
  content: {
    files: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    extract
  },
  theme: {
    screens,
    fontSize,
    extend: {
      colors: {
        primary: "#273955",
      },
    },
  },
  plugins: [fluid],
}