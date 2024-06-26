/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        'exhibition-a': 'var(--color-exhibition-a)',
        'exhibition-b': 'var(--color-exhibition-b)',
        info: 'var(--color-info)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)'
      }
    }
  },
  plugins: []
}
