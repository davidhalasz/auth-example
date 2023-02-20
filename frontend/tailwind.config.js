/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'customColor1': '#F6D7A7',
        'customColor2': '#F6EABE',
        'customColor3': '#C8E3D4',
        'customColor4': '#87AAAA',
      }
    },
  },
  plugins: [],
}
