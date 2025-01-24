/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: {
          950: '#F7DF1E',
        },
        gray: {
          950: '#2F3035',
        },
      },
    },
  },
  plugins: [],
};
