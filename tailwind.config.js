/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ed5f1e',
        secondary: '#febf00',
        accent: '#0167a4',
        azure: '#1e3a5f',
        dark: '#0a1929',
        'dark-secondary': '#132f4c',
        'text-on-secondary': '#1a1a1a',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

