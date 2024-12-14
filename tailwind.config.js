/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        move: {
          to: {
            strokeDashoffset: '40',
          },
        },
      },
    },
  },
  plugins: [],
};
