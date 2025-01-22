/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customYellow: '#F7DF1E',
        customGray: '#2F3035',
      },
    },
  },
  plugins: [],
};
