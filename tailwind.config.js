/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        selectedImgblue: '#579DFF', // You can name it anything, e.g., "customBlue"
      },
    },
  },
  plugins: [],
}