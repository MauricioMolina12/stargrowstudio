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
      keyframes: {
        reveal: {
          "0%": { opacity: 0, transform: "translateY(60px) scale(0.98)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        reveal: "reveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      fontFamily: {
        montserrat: ['var(--font-main)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
