/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#10b981', // green-500
        dark: {
          bg: '#0a0e1a',
          card: '#0f1419',
          border: '#1a1f2e',
          hover: '#1a1f2e',
        },
        light: {
          bg: '#f9fafb',
          card: '#ffffff',
          border: '#e5e7eb',
          hover: '#f3f4f6',
        }
      }
    },
  },
  plugins: [],
}
