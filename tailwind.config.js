/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'Inter', 'sans-serif'],
      },
      colors: {
        black: '#121212',
        white: '#F5F5F5',
        grey: {
          50: '#A6A6A6',
          100: '#3D3D3D',
        },
        accent: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
          glow: 'rgba(139, 92, 246, 0.35)',
        },
      },
      fontFamily: {
        openSans: ['Open Sans', 'sans-serif'],
        firaCode: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
