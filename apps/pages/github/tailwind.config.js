// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.tsx", "./app/**/*.mdx"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
