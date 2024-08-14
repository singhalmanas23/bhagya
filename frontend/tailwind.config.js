// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-yellow': '#EFF20C',
        'custom-red':'#AC1221'
      },
    },
  },
  plugins: [],
}
