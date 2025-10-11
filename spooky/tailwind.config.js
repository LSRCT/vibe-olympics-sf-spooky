/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spooky: {
          purple: '#6B21A8',
          orange: '#F97316',
          dark: '#1a0b2e',
          darker: '#0d0620',
        }
      }
    },
  },
  plugins: [],
}
