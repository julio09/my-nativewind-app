/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gradientColorStops: theme => ({
        'custom-gradient-start': '#8CA6DB 100%',
        'custom-gradient-end': '#B993D6 0%',
      }),
      colors: {
        "vert" : "#0BCE83",
        "primary": "#2D0C57",
        "secondary": "#9586A8",
        "info": "#06BE77",
        "violet": "#7203FF",
        "background": "#A259FF",
        "bg-violet": "#E2CBFF",
        "violet-secondary": "#6C0EE4"
      }
    },
  },
  plugins: [],
}
