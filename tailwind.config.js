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
    fontSize: {
      xs:'0.75rem',
      sm: '0.8rem',
      base: '1rem',
      lg:'1.2rem',
      xl: '1.35rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      
      
    },
    extend: {
      colors: {
        'link' : 'var(--color-link)',
        'primary' : 'var(--bg-primary)',
        'secondary' : 'var(--bg-secondary)',
        'accent' : 'var(--bg-accent)',
        'secondary-accent' : 'var(--bg-secondary-accent)',
        'c-gray' : 'var(--color-gray)',
        'primary-color': '#FFFFFF',
        'primary-complementary' : '#000000',
        'secondary-color': '#F1F5F9',
        'hover-color' : '#1E40AF',
        'accent-color' : '#000000',
        'accent-complementary' : '#ffffff'
      },
    },
    
  },
  plugins: [],
}

