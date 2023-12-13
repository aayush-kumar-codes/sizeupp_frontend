/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    stroke: {
      'current': 'currentColor',
    },
    extend: {
      colors: {
        'link' : 'var(--color-link)',
        'primary' : 'var(--bg-primary)',
        'secondary' : 'var(--bg-secondary)',
        'accent' : 'var(--bg-accent)',
        'secondary-accent' : 'var(--bg-secondary-accent)',
        'c-gray' : 'var(--color-gray)',
      }
    },
  },
  plugins: [],
}

