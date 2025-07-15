/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        dark: 'var(--color-dark)',
        light: 'var(--color-light)',
        yellow: 'var(--color-yellow)',
        gray: 'var(--color-gray)',
        black: 'var(--color-black)',
        white: 'var(--color-white)',
        'primary-light': 'var(--color-primary-light)',
        'primary-tint': 'var(--color-primary-tint)',
      },
      fontFamily: {
        montserrat: ['var(--font-main)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
