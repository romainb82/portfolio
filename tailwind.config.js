/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Editorial Code palette
        paper: '#F2EFE6',
        cream: '#FAF8F2',
        ink: '#1A1A1A',
        graphite: '#5C5852',
        border: '#D4CFC1',
        // Accents
        terracotta: {
          DEFAULT: '#C8553D',
          light: '#E07A5F',
        },
        navy: '#1A365D',
        forest: '#0F766E',
        amber: '#D97706',
        // Legacy mapping (some components still use these — kept for compat then phased out)
        black: '#1A1A1A',
        white: '#FAF8F2',
        grey: {
          50: '#5C5852',
          100: '#D4CFC1',
        },
      },
      fontFamily: {
        openSans: ['Open Sans', 'sans-serif'],
        firaCode: ['Fira Code', 'monospace'],
        serif: ['Instrument Serif', 'Times New Roman', 'serif'],
        syne: ['Syne', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
