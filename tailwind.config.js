/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        reelkix: {
          red: "#FF1C1C",
          black: "#2b2b2b"
        }
      }
    }
  },
  plugins: []
}